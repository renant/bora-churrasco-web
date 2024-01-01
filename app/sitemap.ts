import { getPosts, getRecipes } from '@/services/notion-blog-service'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const recipeResults = await getRecipes({})
  const result = await getPosts()

  const recipesRoutes = recipeResults.recipes.map((recipe) => {
    return {
      url: recipe.id
        ? `https://www.borachurrasco.app/recipes/${recipe.slug}`
        : '',
      lastModified: recipe.createdAt,
    }
  })

  const postsRoutes = result.posts.map((post) => {
    return {
      url: `https://www.borachurrasco.app/post/${post.slug}`,
      lastModified: post.date,
    }
  })

  const routes = ['', 'recipes', 'blog'].map((route) => {
    return {
      url: `https://www.borachurrasco.app/${route}`,
      lastModified: new Date(),
    }
  })

  const routesResults = [5, 10, 15, 20, 25, 30, 35, 40, 50].map((route) => {
    return {
      url: `https://www.borachurrasco.app/resultado/${route}`,
      lastModified: new Date(),
    }
  })

  return [...recipesRoutes, ...routes, ...postsRoutes, ...routesResults]
}
