import { getRecipes } from '@/services/recipe-service';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const recipes = await getRecipes({});

  const recipesRoutes = recipes.map(recipe => {
    return {
      url: recipe.id ? `/recipe/${recipe.id}` : '',
      lastModified: recipe.createdAt,
    }
  });

  const routes = [''].map(route => {
    return {
      url: route,
      lastModified: new Date(),
    }
  });

  return [...recipesRoutes, ...routes]
}