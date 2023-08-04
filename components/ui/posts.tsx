import { getPosts } from '@/services/notion-blog-service'
import Link from 'next/link'
import { CardPost } from './card-post'

export const revalidate = 900

export async function Posts() {
  const limitSize = 4
  const result = await getPosts()

  const posts = result.slice(0, limitSize)

  return (
    <div>
      <div className="prose prose-orange mb-4 mt-2 max-w-none">
        <h1 className="pt-4">Blog</h1>
      </div>

      <div className="grid grid-cols-1  gap-4 md:grid-cols-2 xl:grid-cols-4">
        {posts.map((post) => (
          <CardPost key={post.id} post={post} />
        ))}
      </div>

      <div className="mt-2 flex w-full justify-end border-b border-orange-400 ">
        <Link href="/blog">
          <p className="pb-2 text-orange-400">Ver tododos os conteúdos</p>
        </Link>
      </div>
    </div>
  )
}
