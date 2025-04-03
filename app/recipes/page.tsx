import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getRecipes } from '@/services/notion-blog-service'
import { Metadata } from 'next'

import Image from 'next/image'
import Link from 'next/link'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Receitas de Churrasco - Aprenda a Fazer o Melhor Churrasco | Bora Churrasco',
  description: 'Descubra as melhores receitas de churrasco, com passo a passo fácil de seguir para preparar carnes, acompanhamentos e molhos perfeitos. Aprenda técnicas de mestre churrasqueiro e surpreenda a todos com pratos suculentos e saborosos!',
  alternates: {
    canonical: `https://www.borachurrasco.app/recipes`,
  },
  manifest: 'https://www.borachurrasco.app/manifest.json',
  keywords: [
    'Receitas de Churrasco',
    'Como Fazer Churrasco',
    'Receitas Churrasqueiro',
    'Temperos para Churrasco',
    'Dicas de Churrasco',
    'Churrasco Perfeito',
    'Calculadora de Churrasco'
  ],
  openGraph: {
    title: 'Bora Churrasco: Receitas',
    description: 'Descubra as melhores receitas de churrasco, com passo a passo fácil de seguir para preparar carnes, acompanhamentos e molhos perfeitos. Aprenda técnicas de mestre churrasqueiro e surpreenda a todos com pratos suculentos e saborosos!',
    url: `https://www.borachurrasco.app/recipes`,
    siteName: 'Bora Churrasco',
    images: [
      {
        url: 'https://www.borachurrasco.app/images/ms-icon-310x310.png',
        width: 310,
        height: 310,
        alt: 'Logo Bora Churrasco'
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Receitas de Churrasco - Bora Churrasco',
    description: 'Descubra as melhores receitas de churrasco, com passo a passo fácil de seguir.',
    images: ['https://www.borachurrasco.app/images/ms-icon-310x310.png'],
  }
}

export default async function RecipesPage() {
  const result = await getRecipes()
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: result.recipes.map((recipe, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Recipe',
        name: recipe.name,
        image: recipe.imagePath,
        url: `https://www.borachurrasco.app/recipes/${recipe.slug}`
      }
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-transparent px-9 shadow-xl md:container md:mx-auto md:pt-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {result.recipes.map((recipe) => (
            <Link 
              key={recipe.id} 
              href={`/recipes/${recipe.slug}`}
              aria-label={`Ver receita de ${recipe.name}`}
            >
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
                      alt={`Foto da receita de ${recipe.name}`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={true}
                    />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}
