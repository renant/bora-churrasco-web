import { getPost, getPosts } from "@/services/notion-blog-service";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    postId: post.slugId,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: "Bora Churrasco! - Post não encontrado",
      description: "Post não encontrado"
    }
  }

  return {
    title: `${post.title} - Bora Churrasco`,
    description: `${post.resume}`
  }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    return notFound();
  }

  return (
    <main className="min-h-screen md:container md:mx-auto md:pt-20 bg-white shadow-xl px-9 lg:px-64">
      <div className="relative w-full h-64 z-0">
        <Image src={post.coverImage} fill={true} objectFit="cover" alt={`Image do post ${post.title}`} />
      </div>
      <article className="prose md:prose-lg max-w-none prose-sm prose-headings:my-4 prose-p:my-2 prose-h2:my-4 pb-44 prose-a:text-blue-700">

        <h1>{post.title}</h1>
        <p>{new Date(post.date).toLocaleDateString('pt-BR')}</p>
        <section dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>

    </main>
  )
}