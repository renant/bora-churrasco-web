import { getRecipeById, getRecipes } from "@/services/recipe-service";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const recipes = await getRecipes({});
  return recipes.map((recipe) => ({
    id: recipe.id
  }))
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params;
  const recipe = await getRecipeById(id);

  if (!recipe) {
    return {
      title: "Bora Churrasco! - Receita não encontrada",
      description: "Receita não encontrado"
    }
  }

  return {
    title: `${recipe.name} - Bora Churrasco`,
    description: `Receita de ${recipe.name}`
  }
}

export default async function RecipePage({ params }: { params: { id: string } }) {
  const recipe = await getRecipeById(params.id);

  if (!recipe) {
    return notFound();
  }

  return (
    <main className="flex min-h-screen md:container md:mx-auto md:pt-40">

      <div className=' md:w-full'>
        <div className='flex flex-col md:flex-row  md:p-6 bg-white md:rounded-3xl shadow-xl overflow-hidden'>
          <div className="md:w-1/2">
            <Image className="shadow-xl overflow-hidden md:rounded-3xl " src={recipe.imagePath} alt={`Foto da receita: ${recipe.name}`} width={512} height={512} />
          </div>
          <div className="pl-4">
            <h1 className='font-bold text-orange-400 text-[22px] leading-7 mb-1'>{recipe.name}</h1>
            <div className="flex flex-row">
              <span className='text-gray-500 text-[14px] leading-7 pr-2'>Por: </span>
              <p className="p-0">{recipe.createdBy}</p>
            </div>
            <h2 className="text-gray-700 py-2">Ingredientes:</h2>
            <ul className="pl-4 list-disc">
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient} className='text-gray-500 text-[14px] leading-7 mb-1'>{ingredient}</li>
              ))}
            </ul>

            <h2 className="text-gray-700 py-2">Passos:</h2>
            <ul className="pl-4 list-disc">
              {recipe.steps.map((step) => (
                <li key={step} className='text-gray-500 text-[14px] leading-7 mb-1'>{step}</li>
              ))}
            </ul>


          </div>

        </div>
      </div>

    </main>

  )

}