import JsonLd from "@/components/JsonLd";
import { getRandomAdsContent } from "@/services/ad-service";
import { getPost, getPosts } from "@/services/notion-blog-service";
import { estimateReadingTime } from "@/utils/text-utils";
import { unstable_cache as unstableCache } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type Params = Promise<{ slug: string }>;

// Improved caching strategy with specific keys and tags
const getCachedPost = unstableCache(
  async (slug: string) => {
    const post = await getPost(slug);
    if (!post) return null;

    return {
      ...post,
      readingTime: estimateReadingTime(post.content),
    };
  },
  ["post-cache"],
  {
    tags: ["post"], // For cache invalidation
    revalidate: 3600, // Revalidate every hour
  }
);

const getCachedAds = unstableCache(
  async () => await getRandomAdsContent(),
  ["ads-cache"],
  {
    revalidate: 300, // Revalidate every 5 minutes
  }
);

export async function generateStaticParams() {
  const result = await getPosts();
  return result.posts.map((post) => ({
    postId: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getCachedPost(slug);

  if (!post) {
    return {
      title: "Bora Churrasco! - Post não encontrado",
      description: "Post não encontrado",
    };
  }

  const url = `https://www.borachurrasco.app/post/${post.slug}`;

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
      locale: "pt_BR",
      type: "article",
      article: {
        publishedTime: new Date(post.date).toISOString(),
        authors: ["Bora Churrasco"],
        tags: post.tags,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Bora Churrasco`,
      description: `${post.resume}`,
      images: [post.firebaseCoverImageUrl],
    },
  };
}

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params;

  const [post, ads] = await Promise.all([getCachedPost(slug), getCachedAds()]);

  if (!post) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-transparent px-4 shadow-xl md:container md:mx-auto md:px-9 md:pt-20 lg:px-64">
      <div className="space-y-6">
        <div
          className="relative w-full overflow-hidden rounded-lg bg-gray-100"
          style={{
            aspectRatio: "16/9",
            contain: "layout paint",
          }}
        >
          <Image
            priority
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
            className="object-cover"
            src={post.firebaseCoverImageUrl}
            alt={`Image do post ${post.title}`}
            quality={85}
            placeholder="blur"
            blurDataURL={`data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLUEwLi0tLTAtQFNGRjpGTUBNYWFhcmJyf36noKCg/39ygYGBgf/2wBDARUXFx4aHh4iHh4iBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYH/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=`}
          />
        </div>

        <article
          className="prose prose-sm max-w-none space-y-4 pb-44 md:prose-lg prose-headings:my-4 prose-h2:my-4 prose-p:my-2 prose-a:text-blue-700"
          itemScope
          itemType="https://schema.org/Article"
        >
          <meta
            itemProp="datePublished"
            content={new Date(post.date).toISOString()}
          />

          <h1 itemProp="headline" className="mb-4 mt-0">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <time dateTime={new Date(post.date).toISOString()}>
              {new Date(post.date).toLocaleDateString("pt-BR", {
                timeZone: "America/Sao_Paulo",
              })}
            </time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime} min de leitura</span>
          </div>

          <Suspense
            fallback={
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
              </div>
            }
          >
            <section
              itemProp="articleBody"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </Suspense>

          <div className="not-prose my-8">
            <div className="max-w-sm overflow-hidden rounded-lg bg-gray-50 shadow-lg">
              <div
                className="relative w-full bg-gray-100"
                style={{
                  aspectRatio: "4/3",
                  contain: "layout paint",
                }}
              >
                <Image
                  src={ads.image}
                  fill
                  sizes="(max-width: 640px) 100vw, 400px"
                  className="object-cover"
                  alt={ads.alt}
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="m-0 text-lg font-semibold text-gray-700">
                  {ads.alt}
                </h3>
                <p className="mt-2 text-sm text-gray-900">{ads.description}</p>
                <a
                  href={ads.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block w-full rounded bg-red-600 px-4 py-2 text-center font-semibold text-white transition duration-300 hover:bg-red-500"
                >
                  Adquira já
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.resume,
          datePublished: new Date(post.date).toISOString(),
          author: {
            "@type": "Person",
            name: "Bora Churrasco",
          },
          image: post.firebaseCoverImageUrl,
          publisher: {
            "@type": "Organization",
            name: "Bora Churrasco",
            logo: {
              "@type": "ImageObject",
              url: "https://www.borachurrasco.app/images/ms-icon-310x310.png",
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://www.borachurrasco.app/post/${post.slug}`,
          },
          wordCount: post.content.split(/\s+/).length,
          timeRequired: `PT${Math.ceil(post.readingTime)}M`,
          articleSection: post.tags?.[0],
          keywords: post.tags?.join(", "),
        }}
      />
    </main>
  );
}
