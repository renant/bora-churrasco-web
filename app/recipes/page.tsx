import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getRecipes } from '@/services/notion-blog-service'
import { Metadata } from 'next'

import Image from 'next/image'
import Link from 'next/link'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Bora Churrasco: Receitas',
  description: 'Descubra as melhores receitas de churrasco, com passo a passo fácil de seguir para preparar carnes, acompanhamentos e molhos perfeitos. Aprenda técnicas de mestre churrasqueiro e surpreenda a todos com pratos suculentos e saborosos!',
  alternates: {
    canonical: `https://www.borachurrasco.app/recipes`,
  },
  manifest: 'https://www.borachurrasco.app/manifest.json',
  keywords: ['Calculadora de Churraso', 'Churrasco', 'Calculadora'],
  openGraph: {
    title: 'Bora Churrasco: Receitas',
    description: 'Descubra as melhores receitas de churrasco, com passo a passo fácil de seguir para preparar carnes, acompanhamentos e molhos perfeitos. Aprenda técnicas de mestre churrasqueiro e surpreenda a todos com pratos suculentos e saborosos!',
    url: `https://www.borachurrasco.app/recipes`,
    images: [
      {
        url: 'https://www.borachurrasco.app/images/ms-icon-310x310.png',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
}

export default async function RecipesPage() {
  const result = await getRecipes()

  return (
    <main className="min-h-screen bg-white px-9 pt-14 shadow-xl md:container md:mx-auto md:pt-40">
      <div className="grid grid-cols-1  gap-4 md:grid-cols-2 xl:grid-cols-3">
        {result.recipes.map((recipe) => (
          <Link key={recipe.id} href={`/recipes/${recipe.slug}`}>
            <Card>
              <CardHeader>
                <CardTitle>{recipe.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative z-0 h-64 w-full">
                  <Image
                    fill={true}
                    className="rounded-md object-cover"
                    src={recipe.imagePath}
                    alt={`Image da receita ${recipe.name}`}
                  />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  )
}
