import JsonLd from '@/components/JsonLd'
import { getRandomAdsContent } from '@/services/ad-service'
import { getPost, getPosts } from '@/services/notion-blog-service'
import { estimateReadingTime } from '@/utils/text-utils'; // Add this utility
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
    postId: post.slug,
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

  const url = `https://www.borachurrasco.app/post/${post.slug}`;
  const readingTime = estimateReadingTime(post.content);

  return {
    title: `${post.title} | Bora Churrasco`,
    description: `${post.resume}`,
    alternates: {
      canonical: url,
    },
    keywords: post.tags,
    images: [
      {
        url: post.firebaseCoverImageUrl,
      },
    ],
    openGraph: {
      title: `${post.title} | Bora Churrasco`,
      description: `${post.resume}`,
      url: url,
      images: [
        {
          url: post.firebaseCoverImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: 'pt_BR',
      type: 'article',
      article: {
        publishedTime: new Date(post.date).toISOString(),
        authors: ['Bora Churrasco'],
        tags: post.tags,
      },
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Bora Churrasco`,
      description: `${post.resume}`,
      images: [post.firebaseCoverImageUrl],
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

  const readingTime = estimateReadingTime(post.content);

  return (
    <main className="min-h-screen bg-white px-9 shadow-xl md:container md:mx-auto md:pt-20 lg:px-64">
      <div className="relative z-0 h-60 w-full lg:h-[450px]">
        <Image
          fill={true}
          className="rounded-md object-cover"
          src={post.firebaseCoverImageUrl}
          alt={`Image do post ${post.title}`}
        />
      </div>
      <article 
        className="prose prose-sm max-w-none pb-44 md:prose-lg prose-headings:my-4 prose-h2:my-4 prose-p:my-2 prose-a:text-blue-700"
        itemScope 
        itemType="https://schema.org/Article"
      >
        <meta itemProp="datePublished" content={new Date(post.date).toISOString()} />

        <h1 itemProp="headline">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <time dateTime={new Date(post.date).toISOString()}>
            {new Date(post.date).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })}
          </time>
          <span>·</span>
          <span>{readingTime} min de leitura</span>
        </div>
        <section itemProp="articleBody" dangerouslySetInnerHTML={{ __html: post.content }} />

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
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.resume,
        "datePublished": new Date(post.date).toISOString(),
        "author": {
          "@type": "Person",
          "name": "Bora Churrasco"
        },
        "image": [post.firebaseCoverImageUrl],
        "publisher": {
          "@type": "Organization",
          "name": "Bora Churrasco",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.borachurrasco.app/images/ms-icon-310x310.png"
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://www.borachurrasco.app/post/${post.slug}`
        },
        "wordCount": post.content.split(/\s+/).length,
        "timeRequired": `PT${Math.ceil(readingTime)}M`,
        "articleSection": post.tags?.[0],
        "keywords": post.tags?.join(", ")
      }} />
    </main>
  )
}
