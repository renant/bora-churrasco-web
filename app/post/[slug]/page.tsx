import { getPost, getPosts } from '@/services/notion-blog-service'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const result = await getPosts()
  return result.posts.map((post) => ({
    postId: post.slugId,
  }))
}

export const revalidate = 900

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPost(params.slug)

  if (!post) {
    return {
      title: 'Bora Churrasco! - Post não encontrado',
      description: 'Post não encontrado',
    }
  }

  return {
    title: `${post.title} - Bora Churrasco`,
    description: `${post.resume}`,
  }
}

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPost(params.slug)

  if (!post) {
    return notFound()
  }

  return (
    <main className="min-h-screen bg-white px-9 shadow-xl md:container md:mx-auto md:pt-20 lg:px-64">
      <div className="relative z-0 h-64 w-full">
        <Image
          fill={true}
          className="rounded-md object-cover"
          src={post.firebaseCoverImageUrl}
          alt={`Image do post ${post.title}`}
        />
      </div>
      <article className="prose prose-sm max-w-none pb-44 md:prose-lg prose-headings:my-4 prose-h2:my-4 prose-p:my-2 prose-a:text-blue-700">
        <h1>{post.title}</h1>
        <p>{new Date(post.date).toLocaleDateString('pt-BR')}</p>
        <section dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </main>
  )
}
