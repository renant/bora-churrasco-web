import { getRandomAdsContent } from '@/services/ad-service'
import { getPost, getPosts } from '@/services/notion-blog-service'
import { unstable_cache as unstableCache } from 'next/cache'
import Image from 'next/image'
import { notFound } from 'next/navigation'

const getCachedPost = unstableCache(
  async (slug) => getPost(slug),
  ['cache-post'],
)

export async function generateStaticParams() {
  const result = await getPosts()
  return result.posts.map((post) => ({
    postId: post.slugId,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getCachedPost(params.slug)

  if (!post) {
    return {
      title: 'Bora Churrasco! - Post não encontrado',
      description: 'Post não encontrado',
    }
  }

  return {
    title: `${post.title}`,
    description: `${post.resume}`,
    keywords: post.tags,
    images: [
      {
        url: post.firebaseCoverImageUrl,
      },
    ],
    openGraph: {
      title: `${post.title}`,
      description: `${post.resume}`,
      url: `https://www.borachurrasco.app/post/${post.slugId}`,
      images: [
        {
          url: post.firebaseCoverImageUrl,
        },
      ],
      locale: 'pt_BR',
      type: 'website',
    },
  }
}

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getCachedPost(params.slug)
  const ads = await getRandomAdsContent()

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
  )
}
