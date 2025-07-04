import fs from "fs";
import path from "path";

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

export async function getRandomPosts(count = 3, excludeSlug?: string): Promise<PostMetadata[]> {
  try {
    const files = fs.readdirSync(path.join(process.cwd(), "post-contents"));
    const mdxFiles = files
      .filter((file: string) => file.endsWith('.mdx'))
      .filter((file: string) => excludeSlug ? !file.includes(excludeSlug) : true);
    
    // Shuffle array and take requested count
    const shuffled = mdxFiles.sort(() => 0.5 - Math.random());
    const selectedFiles = shuffled.slice(0, count);
    
    const posts: PostMetadata[] = [];
    
    for (const file of selectedFiles) {
      try {
        const slug = file.replace(/\.mdx$/, "");
        const mdxModule = await import(`../post-contents/${file}`);
        if (mdxModule.metadata) {
          posts.push({ ...mdxModule.metadata, slug });
        }
      } catch (error) {
        console.error(`Failed to load metadata for ${file}:`, error);
      }
    }
    
    return posts;
  } catch (error) {
    console.error("Failed to get random posts:", error);
    return [];
  }
}

export async function getRandomRecipes(count = 6, excludeSlug?: string): Promise<RecipeMetadata[]> {
  try {
    const files = fs.readdirSync(path.join(process.cwd(), "recipe-contents"));
    const mdxFiles = files
      .filter((file: string) => file.endsWith('.mdx'))
      .filter((file: string) => excludeSlug ? !file.includes(excludeSlug) : true);
    
    // Shuffle array and take requested count
    const shuffled = mdxFiles.sort(() => 0.5 - Math.random());
    const selectedFiles = shuffled.slice(0, count);
    
    const recipes: RecipeMetadata[] = [];
    
    for (const file of selectedFiles) {
      try {
        const slug = file.replace(/\.mdx$/, "");
        const mdxModule = await import(`../recipe-contents/${file}`);
        if (mdxModule.metadata) {
          recipes.push({ ...mdxModule.metadata, slug });
        }
      } catch (error) {
        console.error(`Failed to load metadata for ${file}:`, error);
      }
    }
    
    return recipes;
  } catch (error) {
    console.error("Failed to get random recipes:", error);
    return [];
  }
}