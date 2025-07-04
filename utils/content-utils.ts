import fs from "node:fs";
import path from "node:path";

export interface PostMetadata {
  title: string;
  slug: string;
  coverImage: string;
  resume: string;
  date: string;
  tags: string[];
}

export interface RecipeMetadata {
  title: string;
  slug: string;
  imagePath: string;
  date: string;
}

async function loadMdxMetadata(folder: string, filename: string) {
  try {
    const mdxModule = await import(`@/${folder}/${filename}`);
    return mdxModule.metadata;
  } catch (error) {
    console.error(`Failed to load metadata for ${filename}:`, error);
    return null;
  }
}

export async function getRandomPosts(count = 3, excludeSlug?: string): Promise<PostMetadata[]> {
  try {
    const files = fs.readdirSync(path.join(process.cwd(), "post-contents"));
    const mdxFiles = files
      .filter((file: string) => file.endsWith('.mdx'))
      .filter((file: string) => excludeSlug ? !file.includes(excludeSlug) : true);
    
    // Shuffle array and take requested count
    const shuffled = mdxFiles.sort(() => 0.5 - Math.random());
    const selectedFiles = shuffled.slice(0, count);
    
    const posts = await Promise.all(
      selectedFiles.map(async (file: string) => {
        const slug = file.replace(/\.mdx$/, "");
        const metadata = await loadMdxMetadata("post-contents", file);
        return metadata ? { ...metadata, slug } : null;
      })
    );
    
    return posts.filter(Boolean) as PostMetadata[];
  } catch (error) {
    console.error("Failed to get random posts:", error);
    return [];
  }
}

export async function getRandomRecipes(count = 3, excludeSlug?: string): Promise<RecipeMetadata[]> {
  try {
    const files = fs.readdirSync(path.join(process.cwd(), "recipe-contents"));
    const mdxFiles = files
      .filter((file: string) => file.endsWith('.mdx'))
      .filter((file: string) => excludeSlug ? !file.includes(excludeSlug) : true);
    
    // Shuffle array and take requested count
    const shuffled = mdxFiles.sort(() => 0.5 - Math.random());
    const selectedFiles = shuffled.slice(0, count);
    
    const recipes = await Promise.all(
      selectedFiles.map(async (file: string) => {
        const slug = file.replace(/\.mdx$/, "");
        const metadata = await loadMdxMetadata("recipe-contents", file);
        return metadata ? { ...metadata, slug } : null;
      })
    );
    
    return recipes.filter(Boolean) as RecipeMetadata[];
  } catch (error) {
    console.error("Failed to get random recipes:", error);
    return [];
  }
}