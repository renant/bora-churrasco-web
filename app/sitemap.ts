import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";

const BASE_URL = "https://www.borachurrasco.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const recipesFiles = fs.readdirSync(
    path.join(process.cwd(), "recipe-contents")
  );
  const recipesSlugs = recipesFiles.map((file) => file.replace(/\.mdx$/, ""));

  const postsFiles = fs.readdirSync(path.join(process.cwd(), "post-contents"));
  const postsSlugs = postsFiles.map((file) => file.replace(/\.mdx$/, ""));

  const now = new Date();

  // Main pages with highest priority
  const mainRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/participantes`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/recipes`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Recipe pages
  const recipesRoutes: MetadataRoute.Sitemap = recipesSlugs.map((slug) => ({
    url: `${BASE_URL}/recipes/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Blog post pages
  const postsRoutes: MetadataRoute.Sitemap = postsSlugs.map((slug) => ({
    url: `${BASE_URL}/post/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Result pages (lower priority as they are dynamic)
  const resultRoutes: MetadataRoute.Sitemap = Array.from(
    { length: 100 },
    (_, i) => ({
      url: `${BASE_URL}/resultado/${i + 1}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })
  );

  return [...mainRoutes, ...recipesRoutes, ...postsRoutes, ...resultRoutes];
}
