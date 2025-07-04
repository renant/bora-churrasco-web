import { type NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export interface SuggestedRecipesProps {
  excludeSlug?: string;
  count?: number;
}

export interface RecipeMetadata {
  title: string;
  slug: string;
  imagePath: string;
  date: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { count, excludeSlug } = body as SuggestedRecipesProps;

    const files = fs.readdirSync(path.join(process.cwd(), "recipe-contents"));
    const mdxFiles = files
      .filter((file: string) => file.endsWith(".mdx"))
      .filter((file: string) =>
        excludeSlug ? !file.includes(excludeSlug) : true
      );

    const shuffled = mdxFiles.sort(() => 0.5 - Math.random());
    const selectedFiles = shuffled.slice(0, count);

    const recipes: RecipeMetadata[] = [];

    for (const file of selectedFiles) {
      try {
        const slug = file.replace(/\.mdx$/, "");
        const mdxModule = await import(`@/recipe-contents/${file}`);
        if (mdxModule.metadata) {
          recipes.push({ ...mdxModule.metadata, slug });
        }
      } catch (error) {
        console.error(`Failed to load metadata for ${file}:`, error);
      }
    }

    return NextResponse.json(recipes, {
      status: 200,
    });
  } catch (_error) {
    return NextResponse.json(
      { message: "error on get recipes" },
      {
        status: 400,
      }
    );
  }
}
