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

  const recipesRoutes = recipesSlugs.map((slug) => {
    return {
      url: `https://www.borachurrasco.app/recipes/${slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.8,
    };
  });

  const postsRoutes = postsSlugs.map((slug) => {
    return {
      url: `https://www.borachurrasco.app/blog/${slug}`,
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
    5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95,
    100,
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
