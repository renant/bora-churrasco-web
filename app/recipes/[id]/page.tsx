import {
  getRecipeById,
  getRecipes,
  getRecipesExceptCurrent,
} from '@/services/recipe-service'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const recipes = await getRecipes({})
  return recipes.map((recipe) => ({
    id: recipe.id,
  }))
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params
  const recipe = await getRecipeById(id)

  if (!recipe) {
    return {
      title: 'Bora Churrasco! - Receita não encontrada',
      description: 'Receita não encontrado',
    }
  }

  return {
    title: `${recipe.name} - Bora Churrasco`,
    description: `Receita de ${recipe.name}`,
  }
}

export default async function RecipePage({
  params,
}: {
  params: { id: string }
}) {
  const recipe = await getRecipeById(params.id)
  const otherRecipes = await getRecipesExceptCurrent(params.id)

  if (!recipe) {
    return notFound()
  }

  return (
    <main className="flex min-h-screen bg-white shadow-xl md:container md:mx-auto md:pt-20">
      <div className=" md:w-full">
        <div className="flex flex-col md:flex-row  md:p-6">
          <div className="md:w-1/2">
            <Image
              className="overflow-hidden shadow-xl md:rounded-3xl "
              src={recipe.imagePath}
              alt={`Foto da receita: ${recipe.name}`}
              width={512}
              height={512}
            />
          </div>
          <div className="pl-4">
            <h1 className="mb-1 text-[22px] font-bold leading-7 text-orange-400">
              {recipe.name}
            </h1>
            <div className="flex flex-row">
              <span className="pr-2 text-[14px] leading-7 text-gray-500">
                Por:{' '}
              </span>
              <p className="p-0">{recipe.createdBy}</p>
            </div>
            <h2 className="py-2 text-gray-700">Ingredientes:</h2>
            <ul className="list-disc pl-4">
              {recipe.ingredients.map((ingredient) => (
                <li
                  key={ingredient}
                  className="mb-1 text-[14px] leading-7 text-gray-500"
                >
                  {ingredient}
                </li>
              ))}
            </ul>

            <h2 className="py-2 text-gray-700">Passos:</h2>
            <ul className="list-disc pl-4">
              {recipe.steps.map((step) => (
                <li
                  key={step}
                  className="mb-1 text-[14px] leading-7 text-gray-500"
                >
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="p-6">
          <h2 className="py-2 text-center font-semibold text-orange-400">
            Confira outras receitas:
          </h2>
          <div className="flex flex-row flex-wrap justify-center gap-2">
            {otherRecipes.map((recipe) => (
              <Link key={recipe.id} href={`/recipes/${recipe.id}`}>
                <div className="relative text-center">
                  <Image
                    className="overflow-hidden rounded-3xl opacity-70 shadow-xl"
                    src={recipe.imagePath}
                    alt={`Foto da receita: ${recipe.name}`}
                    width={200}
                    height={200}
                  />
                  <h3 className="custom-centered text-lg font-extrabold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                    {recipe.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
