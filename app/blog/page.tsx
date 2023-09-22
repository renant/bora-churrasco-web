import { CardPost } from '@/components/ui/card-post'
import { getPosts } from '@/services/notion-blog-service'

export const revalidate = 3600

export default async function PostsPage() {
  const result = await getPosts()

  return (
    <main className="min-h-screen bg-white px-9  pt-8 shadow-xl md:container md:mx-auto md:pt-40">
      <div className="grid grid-cols-1  gap-4 md:grid-cols-2 xl:grid-cols-3">
        {result.posts.map((post) => (
          <CardPost key={post.id} post={post} />
        ))}
      </div>
    </main>
  )
}
