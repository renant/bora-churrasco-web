import { getPosts } from '@/services/notion-blog-service'
import Link from 'next/link'
import { CardPost } from './card-post'

export async function Posts() {
  const limitSize = 4
  const result = await getPosts({ limitSize })

  return (
    <div>
      <div className="prose prose-red mb-4 mt-2 max-w-none">
        <h2 className="pt-4">Blog</h2>
      </div>

      <div className="grid grid-cols-1  gap-4 md:grid-cols-2 xl:grid-cols-4">
        {result.posts.map((post) => (
          <CardPost key={post.id} post={post} />
        ))}
      </div>

      <div className="mt-2 flex w-full justify-end border-b border-red-400 ">
        <Link href="/blog">
          <p className="pb-2 text-red-500 hover:text-red-700">Ver todos os conteúdos</p>
        </Link>
      </div>
    </div>
  )
}
