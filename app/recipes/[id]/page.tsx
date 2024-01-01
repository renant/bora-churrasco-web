import { getRandomAdsContent } from '@/services/ad-service'
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
  const ads = await getRandomAdsContent()
  // const otherRecipes = await getRecipesExceptCurrent(params.id)

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

        <div className="wrapper max-w-sm overflow-hidden rounded-b-md bg-gray-50  shadow-lg">
          <div>
            <Image src={ads.image} height={400} width={400} alt={ads.alt} />
          </div>
          <div className="p-3">
            <h3 className="text-md m-0 font-semibold text-gray-700">
              {ads.alt}
            </h3>
            <p className="leading-sm text-sm text-gray-900">
              {ads.description}
            </p>
          </div>
          <a href={ads.link} target="_blanck" className="no-underline">
            <button className="flex w-full justify-center bg-red-600 py-2 font-semibold text-white transition duration-300 hover:bg-red-500">
              Adquira já
            </button>
          </a>
        </div>
        {/* <a href={ads.link} target="_blank" rel="noreferrer">
          <section className="flex flex-row items-center justify-center">
            <div className="w-[270px] min-w-[270px]">
              <Image
                alt={ads.alt ?? ''}
                src={ads.image}
                height={300}
                width={300}
              ></Image>
            </div>
            <p className="text-md ml-4">{ads.description}</p>
          </section>
        </a> */}
      </article>
    </main>

    // <main className="flex min-h-screen bg-white shadow-xl md:container md:mx-auto md:pt-20">
    //   <div className=" md:w-full">
    //     <div className="flex flex-col md:flex-row  md:p-6">
    //       <div className="md:w-1/2">
    //         <Image
    //           className="overflow-hidden shadow-xl md:rounded-3xl "
    //           src={recipe.imagePath}
    //           alt={`Foto da receita: ${recipe.name}`}
    //           width={512}
    //           height={512}
    //         />
    //       </div>
    //       <div className="pl-4">
    //         <h1 className="mb-1 text-[22px] font-bold leading-7 text-orange-400">
    //           {recipe.name}
    //         </h1>
    //         <div className="flex flex-row">
    //           <span className="pr-2 text-[14px] leading-7 text-gray-500">
    //             Por:{' '}
    //           </span>
    //           <p className="p-0">{recipe.createdBy}</p>
    //         </div>
    //         <h2 className="py-2 text-gray-700">Ingredientes:</h2>
    //         <ul className="list-disc pl-4">
    //           {recipe.ingredients.map((ingredient) => (
    //             <li
    //               key={ingredient}
    //               className="mb-1 text-[14px] leading-7 text-gray-500"
    //             >
    //               {ingredient}
    //             </li>
    //           ))}
    //         </ul>

    //         <h2 className="py-2 text-gray-700">Passos:</h2>
    //         <ul className="list-disc pl-4">
    //           {recipe.steps.map((step) => (
    //             <li
    //               key={step}
    //               className="mb-1 text-[14px] leading-7 text-gray-500"
    //             >
    //               {step}
    //             </li>
    //           ))}
    //         </ul>
    //       </div>
    //     </div>
    //     <div className="p-6">
    //       <h2 className="py-2 text-center font-semibold text-orange-400">
    //         Confira outras receitas:
    //       </h2>
    //       <div className="flex flex-row flex-wrap justify-center gap-2">
    //         {otherRecipes.map((recipe) => (
    //           <Link key={recipe.id} href={`/recipes/${recipe.id}`}>
    //             <div className="relative text-center">
    //               <Image
    //                 className="overflow-hidden rounded-3xl opacity-70 shadow-xl"
    //                 src={recipe.imagePath}
    //                 alt={`Foto da receita: ${recipe.name}`}
    //                 width={200}
    //                 height={200}
    //               />
    //               <h3 className="custom-centered text-lg font-extrabold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
    //                 {recipe.name}
    //               </h3>
    //             </div>
    //           </Link>
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    // </main>
  )
}
