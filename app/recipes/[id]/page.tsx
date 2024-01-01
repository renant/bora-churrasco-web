import { getRecipe, getRecipes } from '@/services/notion-blog-service'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const result = await getRecipes({})
  return result.recipes.map((recipe) => ({
    id: recipe.id,
  }))
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params
  const recipe = await getRecipe(id)

  if (!recipe) {
    return {
      title: 'Bora Churrasco! - Receita não encontrada',
      description: 'Receita não encontrado',
    }
  }

  return {
    title: `${recipe.name}`,
    description: `Receita de ${recipe.name}`,
    images: [
      {
        url: recipe.imagePath,
      },
    ],
    openGraph: {
      title: `${recipe.name}`,
      description: `Receita de ${recipe.name}`,
      url: `https://www.borachurrasco.app/recipes/${recipe.id}`,
      images: [
        {
          url: recipe.imagePath,
        },
      ],
      locale: 'pt_BR',
      type: 'website',
    },
  }
}

export default async function RecipePage({
  params,
}: {
  params: { id: string }
}) {
  const recipe = await getRecipe(params.id)

  if (!recipe) {
    return notFound()
  }

  return (
    <main className="min-h-screen bg-white px-9 shadow-xl md:container md:mx-auto md:pt-20 lg:px-64">
      <div className="relative z-0 h-60 w-full lg:h-[450px]">
        <Image
          fill={true}
          className="rounded-md object-cover"
          src={recipe.imagePath}
          alt={`Image do post ${recipe.name}`}
        />
      </div>
      <article className="prose prose-sm max-w-none pb-44 md:prose-lg prose-headings:my-4 prose-h2:my-4 prose-p:my-2 prose-a:text-blue-700">
        <h1>{recipe.name}</h1>
        <section dangerouslySetInnerHTML={{ __html: recipe.content }} />
      </article>
    </main>
  )
}
