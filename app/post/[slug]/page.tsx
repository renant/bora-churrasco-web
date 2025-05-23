import JsonLd from "@/components/JsonLd";
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

  const post = await getCachedPost(slug);

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
            width={1200}
            height={675}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
            className="object-cover"
            src={post.firebaseCoverImageUrl}
            alt={`Image do post ${post.title}`}
            quality={85}
            placeholder="blur"
            blurDataURL={post.blurDataURL}
            fetchPriority="high"
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
