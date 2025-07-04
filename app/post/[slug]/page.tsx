import JsonLd from "@/components/JsonLd";
import SuggestedPosts from "@/components/suggested-posts";
import Image from "next/image";
import { notFound } from "next/navigation";
import fs from "node:fs";
import path from "node:path";

type Params = Promise<{ slug: string }>;

async function loadMdxFile(slug: string) {
  try {
    const mdxPath = path.join(process.cwd(), "post-contents", `${slug}.mdx`);

    if (!fs.existsSync(mdxPath)) {
      return null;
    }
    const mdxModule = await import(`@/post-contents/${slug}.mdx`);
    return mdxModule;
  } catch (error) {
    console.error("Failed to load MDX file:", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Params }) {
  if (!params || !(await params).slug) {
    throw new Error("Slug is required");
  }

  const { slug } = await params;
  const mdxModule = await loadMdxFile(slug);

  if (!mdxModule) {
    return {
      title: "Bora Churrasco! - Post não encontrado",
      description: "Post não encontrado",
    };
  }

  const { metadata } = mdxModule;

  const url = `https://www.borachurrasco.app/post/${metadata.slug}`;

  return {
    title: `${metadata.title} | Bora Churrasco`,
    description: `${metadata.resume}`,
    alternates: {
      canonical: url,
    },
    keywords: metadata.tags,
    images: [
      {
        url: metadata.coverImage,
      },
    ],
    openGraph: {
      title: `${metadata.title} | Bora Churrasco`,
      description: `${metadata.resume}`,
      url: url,
      images: [
        {
          url: metadata.coverImage,
          width: 1200,
          height: 630,
          alt: metadata.title,
        },
      ],
      locale: "pt_BR",
      type: "article",
      article: {
        publishedTime: new Date(metadata.date).toISOString(),
        authors: ["Bora Churrasco"],
        tags: metadata.tags,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: `${metadata.title} | Bora Churrasco`,
      description: `${metadata.resume}`,
      images: [metadata.coverImage],
    },
  };
}

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const { metadata, default: Post } = await loadMdxFile(slug);

  if (!metadata) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-16">
        
        {/* Cover Image */}
        <div className="relative w-full overflow-hidden rounded-lg shadow-lg mb-8 md:mb-12">
          <div
            className="relative w-full bg-gray-100"
            style={{
              aspectRatio: "16/9",
              contain: "layout paint",
            }}
          >
            <Image
              priority
              width={1200}
              height={675}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
              className="object-cover"
              src={metadata.coverImage}
              alt={`Imagem do post ${metadata.title}`}
              quality={90}
              fetchPriority="high"
            />
          </div>
        </div>

        {/* Article Content */}
        <article
          className="prose prose-lg max-w-none space-y-6 pb-12 md:pb-16 prose-headings:text-red-600 prose-headings:font-bold prose-h1:text-3xl md:prose-h1:text-4xl lg:prose-h1:text-5xl prose-h1:leading-tight prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl md:prose-h3:text-2xl prose-h3:text-orange-600 prose-p:text-gray-700 prose-p:text-lg prose-p:leading-relaxed prose-a:text-red-500 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-strong:text-red-700 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:text-lg prose-blockquote:border-l-red-500 prose-blockquote:bg-red-50 prose-blockquote:text-red-800"
          itemScope
          itemType="https://schema.org/Article"
        >
          <meta
            itemProp="datePublished"
            content={new Date(metadata.date).toISOString()}
          />

          {/* Title and Meta */}
          <div className="text-center mb-8 md:mb-12">
            <h1 itemProp="headline" className="mb-6 text-red-600">
              {metadata.title}
            </h1>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-600 bg-gray-50 rounded-lg py-4 px-6 border border-gray-200">
              <time 
                dateTime={new Date(metadata.date).toISOString()}
                className="font-medium"
              >
                {new Date(metadata.date).toLocaleDateString("pt-BR", {
                  timeZone: "America/Sao_Paulo",
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              {metadata.tags?.[0] && (
                <>
                  <div className="w-1 h-1 bg-gray-400 rounded-full hidden sm:block" />
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {metadata.tags[0]}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg">
            <Post />
          </div>
        </article>

        {/* Suggested Posts Section */}
        <SuggestedPosts excludeSlug={slug} count={3} />
      </main>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: metadata.title,
          description: metadata.resume,
          datePublished: new Date(metadata.date).toISOString(),
          author: {
            "@type": "Person",
            name: "Bora Churrasco",
          },
          image: metadata.coverImage,
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
            "@id": `https://www.borachurrasco.app/post/${metadata.slug}`,
          },
          articleSection: metadata.tags?.[0],
          keywords: metadata.tags?.join(", "),
        }}
      />
    </div>
  );
}

export function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), "post-contents"));
  const slugs = files.map((file) => ({
    slug: file.replace(/\.mdx$/, ""),
  }));

  return slugs;
}

export const dynamicParams = false;
