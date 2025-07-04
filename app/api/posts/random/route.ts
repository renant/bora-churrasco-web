import { type NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export interface SuggestedPostsProps {
  excludeSlug?: string;
  count?: number;
}

export interface PostMetadata {
  title: string;
  slug: string;
  coverImage: string;
  resume: string;
  date: string;
  tags: string[];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { count, excludeSlug } = body as SuggestedPostsProps;

    const files = fs.readdirSync(path.join(process.cwd(), "post-contents"));
    const mdxFiles = files
      .filter((file: string) => file.endsWith(".mdx"))
      .filter((file: string) =>
        excludeSlug ? !file.includes(excludeSlug) : true
      );

    const shuffled = mdxFiles.sort(() => 0.5 - Math.random());
    const selectedFiles = shuffled.slice(0, count);

    const posts: PostMetadata[] = [];

    for (const file of selectedFiles) {
      try {
        const slug = file.replace(/\.mdx$/, "");
        const mdxModule = await import(`@/post-contents/${file}`);
        if (mdxModule.metadata) {
          posts.push({ ...mdxModule.metadata, slug });
        }
      } catch (error) {
        console.error(`Failed to load metadata for ${file}:`, error);
      }
    }

    return NextResponse.json(posts, {
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
