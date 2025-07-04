import JsonLd from "@/components/JsonLd";
import { SuggestedContent } from "@/components/ui/suggested-content";
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
    <>
      {/* Hero Section with Cover Image */}
      <div className="relative min-h-[60vh] lg:min-h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            priority
            fill
            sizes="100vw"
            className="object-cover"
            src={metadata.coverImage}
            alt={`Imagem do post ${metadata.title}`}
            quality={90}
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 flex items-end min-h-[60vh] lg:min-h-[70vh]">
          <div className="container mx-auto px-4 md:px-8 lg:px-16 pb-16">
            <div className="max-w-4xl">
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-white/80 text-sm mb-6">
                <a href="/" className="hover:text-white transition-colors">
                  Início
                </a>
                <span>•</span>
                <a href="/blog" className="hover:text-white transition-colors">
                  Blog
                </a>
                <span>•</span>
                <span className="text-white">Post</span>
              </nav>

              {/* Tags */}
              {metadata.tags && metadata.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {metadata.tags.slice(0, 3).map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-orange-500/90 text-white text-xs font-medium rounded-full backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 
                itemProp="headline" 
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-lg"
              >
                {metadata.title}
              </h1>

              {/* Resume */}
              <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-6 max-w-3xl drop-shadow-sm">
                {metadata.resume}
              </p>

              {/* Meta Info */}
              <div className="flex items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <time dateTime={new Date(metadata.date).toISOString()}>
                    {new Date(metadata.date).toLocaleDateString("pt-BR", {
                      timeZone: "America/Sao_Paulo",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                </div>
                
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Bora Churrasco</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="bg-gray-50/30">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Article Content */}
            <article
              className="prose prose-lg max-w-none bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16
                prose-headings:text-gray-900 prose-headings:font-bold
                prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-8
                prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8 prose-h2:border-b prose-h2:border-orange-100 prose-h2:pb-2
                prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-6
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-orange-600 prose-a:font-medium hover:prose-a:text-orange-700 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-ul:space-y-2 prose-li:text-gray-700
                prose-img:rounded-xl prose-img:shadow-md
                prose-blockquote:border-l-4 prose-blockquote:border-orange-300 prose-blockquote:bg-orange-50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg"
              itemScope
              itemType="https://schema.org/Article"
            >
              <meta
                itemProp="datePublished"
                content={new Date(metadata.date).toISOString()}
              />
              <Post />
            </article>

            {/* Engagement Section */}
            <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-8 md:p-12 text-white text-center mb-16 shadow-xl">
              <div className="max-w-2xl mx-auto space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold">
                  🔥 Gostou das dicas?
                </h3>
                <p className="text-lg opacity-90 leading-relaxed">
                  Descubra mais segredos para fazer o churrasco perfeito! Baixe nosso app gratuito 
                  e calcule a quantidade ideal de ingredientes para sua festa.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 bg-white text-orange-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.545 9.273l-5.545 4.727-5.545-4.727 5.545-1.273z"/>
                    </svg>
                    Baixar App Gratuito
                  </a>
                  <a
                    href="/blog"
                    className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-orange-600 transition-all duration-300"
                  >
                    Ver Mais Posts
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Suggested Content */}
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <SuggestedContent type="post-contents" currentSlug={slug} count={3} />
        </div>
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
    </>
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
