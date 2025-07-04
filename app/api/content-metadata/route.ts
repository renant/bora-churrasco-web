import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

interface PostMetadata {
  title: string;
  slug: string;
  resume: string;
  coverImage: string;
  date: string;
  tags: string[];
}

interface RecipeMetadata {
  title: string;
  slug: string;
  imagePath: string;
  date: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  if (!type || !["post-contents", "recipe-contents"].includes(type)) {
    return NextResponse.json({ error: "Invalid type parameter" }, { status: 400 });
  }

  try {
    const contentDir = path.join(process.cwd(), type);
    const files = fs.readdirSync(contentDir);
    
    const metadata = await Promise.all(
      files.map(async (file) => {
        try {
          const slug = file.replace(/\.mdx$/, "");
          const mdxModule = await import(`@/${type}/${slug}.mdx`);
          return mdxModule.metadata;
        } catch (error) {
          console.error(`Error loading ${file}:`, error);
          return null;
        }
      })
    );
    
    const filteredMetadata = metadata.filter(Boolean);
    return NextResponse.json(filteredMetadata);
  } catch (error) {
    console.error("Error loading content metadata:", error);
    return NextResponse.json({ error: "Failed to load content" }, { status: 500 });
  }
}