import { getRecipes } from '@/services/recipe-service'
import Link from 'next/link'
import { CardRecipe } from './card-recipe'

export async function Recipes() {
  const limitSize = 6
  const recipes = await getRecipes({ limitSize })

  return (
    <div className="">
      <div className="mt-2 border-b border-orange-400"></div>
      <div className="prose prose-orange mb-4 mt-2 max-w-none">
        <h1 className="pt-4">Receitas</h1>
      </div>
      <div className="flex flex-row flex-wrap  justify-center gap-1 md:justify-start md:gap-2">
        {recipes.map((recipe) => (
          <CardRecipe key={recipe.id} recipe={recipe} />
        ))}
      </div>

      <div className="mt-2 flex w-full justify-end border-b border-orange-400">
        <Link href="/recipes">
          <p className="pb-2 text-orange-400">Ver todas as receitas</p>
        </Link>
      </div>
    </div>
  )
}
