import { CardPost } from '@/components/ui/card-post'
import { getPosts } from '@/services/notion-blog-service'
import { Metadata } from 'next'
import { unstable_cache as unstableCache } from 'next/cache'

const getCachedPosts = unstableCache(async () => getPosts(), ['cache-posts'])

export const metadata: Metadata = {
  title: 'Bora Churrasco: Dicas, Receitas e Segredos do Mestre Assador',
  description: 'Descubra os segredos do churrasco perfeito com nosso blog de churrasco. Explore receitas irresistíveis, técnicas de assado, escolha de carnes, e muito mais para tornar-se um mestre no preparo de churrascos memoráveis. Clique agora e leve suas habilidades à brasa a um novo nível!',
  alternates: {
    canonical: `https://www.borachurrasco.app/blog`,
  },
  manifest: 'https://www.borachurrasco.app/manifest.json',
  keywords: [
    'Churrasco', 'Receitas de Churrasco', 'Como Fazer Churrasco', 'Dicas de Assado', 'Mestre Assador', 'Churrasqueira', 'Carne para Churrasco', 'Blog de Churrasco'
  ],
  openGraph: {
    title: 'Bora Churrasco: Dicas, Receitas e Segredos do Mestre Assador',
    description: 'Descubra os segredos do churrasco perfeito com nosso blog de churrasco. Explore receitas irresistíveis, técnicas de assado, escolha de carnes, e muito mais para tornar-se um mestre no preparo de churrascos memoráveis. Clique agora e leve suas habilidades à brasa a um novo nível!',
    url: `https://www.borachurrasco.app/blog`,
    images: [
      {
        url: 'https://www.borachurrasco.app/images/ms-icon-310x310.png',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
}

export default async function PostsPage() {
  const result = await getCachedPosts()

  return (
    <main className="min-h-screen bg-white px-9  pt-8 shadow-xl md:container md:mx-auto md:pt-40">
      <div className="grid grid-cols-1  gap-4 md:grid-cols-2 xl:grid-cols-3">
        {result.posts.map((post) => (
          <CardPost key={post.slug} post={post} />
        ))}
      </div>
    </main>
  )
}
