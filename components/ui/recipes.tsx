import { getRecipes } from '@/services/recipe-service'
import Image from 'next/image'
import Link from 'next/link'

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
          <Link key={recipe.id} href={`/recipes/${recipe.id}`}>
            <div className="relative w-32 text-center md:w-full">
              <Image
                className="overflow-hidden rounded-3xl opacity-70 shadow-xl"
                src={recipe.imagePath}
                alt={`Foto da receita: ${recipe.name}`}
                width={200}
                height={200}
              />
              <h3 className="custom-centered text-sm font-extrabold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] md:text-lg">
                {recipe.name}
              </h3>
            </div>
          </Link>
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
