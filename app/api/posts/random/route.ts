import { type NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export interface SuggestedPostsProps {
  excludeSlug?: string;
  count?: number;
  keywords?: string[];
}

export interface PostMetadata {
  title: string;
  slug: string;
  hdWebp: string;
  thumbWebp: string;
  blurDataURL: string;
  resume: string;
  date: string;
  tags: string[];
}

// Calculate relevance score based on keyword matches
function calculateRelevanceScore(post: PostMetadata, keywords: string[]): number {
  if (!keywords || keywords.length === 0) return 0;
  
  const titleLower = post.title.toLowerCase();
  const resumeLower = post.resume.toLowerCase();
  
  let score = 0;
  for (const keyword of keywords) {
    const keywordLower = keyword.toLowerCase();
    // Title matches are worth more
    if (titleLower.includes(keywordLower)) {
      score += 3;
    }
    // Resume matches
    if (resumeLower.includes(keywordLower)) {
      score += 1;
    }
  }
  
  return score;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { count = 3, excludeSlug, keywords = [] } = body as SuggestedPostsProps;

    const files = fs.readdirSync(path.join(process.cwd(), "post-contents"));
    const mdxFiles = files
      .filter((file: string) => file.endsWith(".mdx"))
      .filter((file: string) =>
        excludeSlug ? !file.includes(excludeSlug) : true
      );

    // Load all post metadata
    const allPosts: PostMetadata[] = [];
    for (const file of mdxFiles) {
      try {
        const slug = file.replace(/\.mdx$/, "");
        const mdxModule = await import(`@/post-contents/${file}`);
        if (mdxModule.metadata) {
          allPosts.push({ ...mdxModule.metadata, slug });
        }
      } catch (error) {
        console.error(`Failed to load metadata for ${file}:`, error);
      }
    }

    let selectedPosts: PostMetadata[];

    if (keywords && keywords.length > 0) {
      // Calculate relevance scores and sort
      const scoredPosts = allPosts.map(post => ({
        post,
        score: calculateRelevanceScore(post, keywords)
      }));

      // Sort by score descending
      scoredPosts.sort((a, b) => b.score - a.score);

      // Get top relevant posts (score > 0)
      const relevantPosts = scoredPosts
        .filter(sp => sp.score > 0)
        .map(sp => sp.post);

      if (relevantPosts.length >= count) {
        // We have enough relevant posts
        selectedPosts = relevantPosts.slice(0, count);
      } else {
        // Not enough relevant posts, fill with random ones
        const usedSlugs = new Set(relevantPosts.map(p => p.slug));
        const remainingPosts = allPosts.filter(p => !usedSlugs.has(p.slug));
        const shuffled = remainingPosts.sort(() => 0.5 - Math.random());
        const fillerPosts = shuffled.slice(0, count - relevantPosts.length);
        selectedPosts = [...relevantPosts, ...fillerPosts];
      }
    } else {
      // No keywords, return random posts
      const shuffled = allPosts.sort(() => 0.5 - Math.random());
      selectedPosts = shuffled.slice(0, count);
    }

    return NextResponse.json(selectedPosts, {
      status: 200,
    });
  } catch (_error) {
    return NextResponse.json(
      { message: "error on get posts" },
      {
        status: 400,
      }
    );
  }
}
