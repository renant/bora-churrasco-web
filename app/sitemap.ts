import fs from "node:fs";
import path from "node:path";

export default async function sitemap() {
  const recipesFiles = fs.readdirSync(
    path.join(process.cwd(), "recipe-contents")
  );

  const recipesSlugs = recipesFiles.map((file) => ({
    slug: file.replace(/\.mdx$/, ""),
  }));

  const postsFiles = fs.readdirSync(path.join(process.cwd(), "post-contents"));
  const postsSlugs = postsFiles.map((file) => ({
    slug: file.replace(/\.mdx$/, ""),
  }));

  const recipesRoutes = recipesSlugs.map((recipe) => {
    return {
      url: `https://www.borachurrasco.app/recipes/${recipe.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.8,
    };
  });

  const postsRoutes = postsSlugs.map((post) => {
    return {
      url: `https://www.borachurrasco.app/blog/${post.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.8,
    };
  });

  const routes = ["", "recipes", "blog"].map((route) => {
    return {
      url: `https://www.borachurrasco.app/${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 1,
    };
  });

  const routesResults = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
    60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78,
    79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97,
    98, 99, 100,
  ].map((route) => {
    return {
      url: `https://www.borachurrasco.app/resultado/${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "yearly",
      priority: 1,
    };
  });

  return [...recipesRoutes, ...routes, ...postsRoutes, ...routesResults];
}
