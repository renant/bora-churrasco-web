import Recipe from "@/models/recipe";
import { getRecipeById, getRecipes } from "@/services/recipe-service";
import Image from "next/image";
import Link from "next/link";
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
  const response = await fetch(`${process.env.URL}/api/recipes/${params.id}`);
  const recipe = await response.json() as Recipe | null;

  const responseOthers = await fetch(`${process.env.URL}/api/recipes/others/${params.id}`);
  const otherRecipes = await responseOthers.json() as Recipe[];

  if (!recipe) {
    return notFound();
  }

  return (
    <main className="flex min-h-screen md:container md:mx-auto md:pt-20 bg-white shadow-xl">

      <div className=' md:w-full'>
        <div className='flex flex-col md:flex-row  md:p-6'>
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
        <div className="p-6">
          <h2 className="py-2 text-orange-400 font-semibold text-center">Confira outras receitas:</h2>
          <div className="flex flex-row flex-wrap gap-2 justify-center">
            {otherRecipes.map((recipe) => (
              <Link key={recipe.id} href={`/recipes/${recipe.id}`}>
                <div className="relative text-center">
                  <Image className="shadow-xl overflow-hidden rounded-3xl opacity-70" src={recipe.imagePath} alt={`Foto da receita: ${recipe.name}`} width={200} height={200} />
                  <h3 className="custom-centered font-extrabold text-lg text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{recipe.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

    </main>

  )

}