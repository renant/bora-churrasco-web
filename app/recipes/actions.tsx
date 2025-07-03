import type Recipe from "@/models/recipe";
import fs from "node:fs";
import path from "node:path";
import { remark } from "remark";
import html from "remark-html";

export interface GetRecipeParams {
  limit?: number;
  page?: number;
  searchTerm?: string;
  sort?: string;
}

const RECIPES_PATH = path.join(process.cwd(), "recipe-contents");

export async function getRecipes({
  limit,
  page,
  searchTerm,
  sort = "date_desc",
}: GetRecipeParams) {
  const files = fs.readdirSync(RECIPES_PATH);
  const slugs = files.map((file) => ({
    slug: file.replace(/\.mdx$/, ""),
  }));

  let recipes = await Promise.all(
    slugs.map(async ({ slug }) => {
      const metadata = await loadMdxMetadata(slug);
      return metadata;
    })
  );

  recipes = recipes.filter((recipe) => recipe !== null) as Recipe[];

  if (searchTerm && searchTerm.trim() !== "") {
    recipes = recipes.filter((recipe) => {
      if (!recipe) return false;
      return recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  const totalRecipes = recipes.length;
  const [sortBy, sortOrder] = sort.split("_");

  recipes.sort((a: Recipe | null, b: Recipe | null) => {
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

  for (const recipe of recipes) {
    if (!recipe) continue;

    const date = new Date(recipe.date);
    recipe.formattedDate = date.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  const start = ((page ?? 1) - 1) * (limit ?? 10);

  if (limit) {
    recipes = recipes.slice(start, start + limit);
  }

  recipes = recipes.map((recipe) => {
    if (!recipe) return null;
    return {
      ...recipe,
      name: recipe.title,
    };
  });

  return {
    recipes,
    totalRecipes,
    has_more: recipes.length === limit,
    next_cursor: String((page ?? 1) + 1),
  };
}

async function loadMdxMetadata(slug: string): Promise<Recipe | null> {
  try {
    const mdxPath = path.join(RECIPES_PATH, `${slug}.mdx`);

    if (!fs.existsSync(mdxPath)) {
      return null;
    }
    const { metadata } = await import(`@/recipe-contents/${slug}.mdx`);
    return {
      ...metadata,
      slug,
    } as Recipe;
  } catch (error) {
    console.error("Failed to load MDX file:", error);
    return null;
  }
}

export async function getRecipe(slug: string): Promise<Recipe | null> {
  try {
    const mdxPath = path.join(RECIPES_PATH, `${slug}.mdx`);

    if (!fs.existsSync(mdxPath)) {
      return null;
    }
    const mdxModule = await import(`@/recipe-contents/${slug}.mdx`);

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
      name: mdxModule.metadata.title,
      content: htmlContent,
    } as Recipe;
  } catch (error) {
    console.error("Failed to load MDX file:", error);
    return null;
  }
}
