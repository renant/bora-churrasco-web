import { getPosts } from '@/services/notion-blog-service'
import { getRecipes } from '@/services/recipe-service'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const recipes = await getRecipes({})
  const posts = await getPosts()

  const recipesRoutes = recipes.map((recipe) => {
    return {
      url: recipe.id
        ? `https://www.borachurrasco.app/recipes/${recipe.id}`
        : '',
      lastModified: recipe.createdAt,
    }
  })

  const postsRoutes = posts.map((post) => {
    return {
      url: post.slugId
        ? `https://www.borachurrasco.app/blog/${post.slugId}`
        : '',
      lastModified: post.date,
    }
  })

  const routes = [''].map((route) => {
    return {
      url: `https://www.borachurrasco.app/${route}`,
      lastModified: new Date(),
    }
  })

  return [...recipesRoutes, ...routes, ...postsRoutes]
}
