import type { Post, PostContent } from "@/models/post-content";
import fs from "node:fs";
import path from "node:path";
import { remark } from "remark";
import html from "remark-html";

export interface GetPostParams {
  limit?: number;
  page?: number;
  searchTerm?: string;
  sort?: string;
}

const POSTS_PATH = path.join(process.cwd(), "post-contents");

export async function getPosts({
  limit,
  page,
  searchTerm,
  sort = "date_asc",
}: GetPostParams) {
  const files = fs.readdirSync(POSTS_PATH);
  const slugs = files.map((file) => ({
    slug: file.replace(/\.mdx$/, ""),
  }));

  let posts = await Promise.all(
    slugs.map(async ({ slug }) => {
      const metadata = await loadMdxMetadata(slug);
      return metadata;
    })
  );

  posts = posts.filter((post) => post !== null) as Post[];

  if (searchTerm && searchTerm.trim() !== "") {
    posts = posts.filter((post) => {
      if (!post) return false;

      return (
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.resume.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    });
  }

  const totalPosts = posts.length;
  const [sortBy, sortOrder] = sort.split("_");

  posts.sort((a: Post | null, b: Post | null) => {
    if (!a || !b) return 0;

    if (sortBy === "date") {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (Number.isNaN(dateA.getTime()) || Number.isNaN(dateB.getTime())) {
        console.error("Invalid date found", {
          dateA: a.date,
          dateB: b.date,
        });
        return 0;
      }

      return sortOrder === "asc"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    }

    return 0;
  });

  for (const post of posts) {
    if (!post) continue;

    const date = new Date(post.date);
    post.formattedDate = date.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  const start = ((page ?? 1) - 1) * (limit ?? 10);

  if (limit) {
    posts = posts.slice(start, start + limit);
  }

  return {
    posts,
    totalPosts,
    has_more: posts.length === limit,
    next_cursor: (page ?? 1) + 1,
  };
}

export async function getPost(slug: string): Promise<PostContent | null> {
  try {
    const mdxPath = path.join(POSTS_PATH, `${slug}.mdx`);

    if (!fs.existsSync(mdxPath)) {
      return null;
    }
    const mdxModule = await import(`@/post-contents/${slug}.mdx`);

    const fileContent = fs.readFileSync(mdxPath, "utf8");

    const contentWithoutMetadata = fileContent.replace(
      /export const metadata = \{[\s\S]*?\};/,
      ""
    );

    const processedContent = await remark()
      .use(html)
      .process(contentWithoutMetadata);

    const htmlContent = processedContent.value
      .toString()
      .replace(/(?:\r\n|\r|\n)/g, "")
      .replace(/"/g, "'");

    return {
      ...mdxModule.metadata,
      slug,
      content: htmlContent,
    } as PostContent;
  } catch (error) {
    console.error("Failed to load MDX file:", error);
    return null;
  }
}

async function loadMdxMetadata(slug: string): Promise<Post | null> {
  try {
    const mdxPath = path.join(POSTS_PATH, `${slug}.mdx`);

    if (!fs.existsSync(mdxPath)) {
      return null;
    }
    const { metadata } = await import(`@/post-contents/${slug}.mdx`);
    return {
      ...metadata,
      slug,
    } as Post;
  } catch (error) {
    console.error("Failed to load MDX file:", error);
    return null;
  }
}
