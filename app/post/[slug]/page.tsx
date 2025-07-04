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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Mobile-First Hero Section */}
      <div className="relative">
        {/* Cover Image */}
        <div className="relative h-[40vh] sm:h-[45vh] md:h-[55vh] lg:h-[65vh] overflow-hidden">
          <Image
            priority
            fill
            sizes="100vw"
            className="object-cover"
            src={metadata.coverImage}
            alt={`Imagem do post ${metadata.title}`}
            quality={85}
            fetchPriority="high"
          />
          {/* Responsive gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"></div>
        </div>

        {/* Hero Content - Mobile Optimized */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 md:pb-12">
            <div className="max-w-4xl mx-auto">
              {/* Mobile-Friendly Breadcrumb */}
              <nav className="hidden sm:flex items-center space-x-2 text-white/80 text-sm mb-3 md:mb-4">
                <a href="/" className="hover:text-white transition-colors">Início</a>
                <span>•</span>
                <a href="/blog" className="hover:text-white transition-colors">Blog</a>
                <span>•</span>
                <span className="text-white">Post</span>
              </nav>

              {/* Responsive Tags */}
              {metadata.tags && metadata.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {metadata.tags.slice(0, 2).map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2 py-1 sm:px-3 bg-orange-500/90 text-white text-xs font-medium rounded-full backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Mobile-Responsive Title */}
              <h1 
                itemProp="headline" 
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight mb-3 sm:mb-4 md:mb-6 drop-shadow-lg"
              >
                {metadata.title}
              </h1>

              {/* Mobile-Optimized Resume */}
              <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed mb-4 sm:mb-6 max-w-3xl drop-shadow-sm line-clamp-3 sm:line-clamp-none">
                {metadata.resume}
              </p>

              {/* Simplified Meta Info for Mobile */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <time dateTime={new Date(metadata.date).toISOString()}>
                    {new Date(metadata.date).toLocaleDateString("pt-BR", {
                      timeZone: "America/Sao_Paulo",
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                </div>
                
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="truncate">Bora Churrasco</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Mobile-First */}
      <main className="relative -mt-6 sm:-mt-8 md:-mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Article Content Card */}
          <article
            className="bg-white rounded-t-3xl shadow-2xl border border-gray-100 overflow-hidden mb-8 sm:mb-12 relative z-10"
            itemScope
            itemType="https://schema.org/Article"
          >
            <meta
              itemProp="datePublished"
              content={new Date(metadata.date).toISOString()}
            />
            
            {/* Content */}
            <div className="p-4 sm:p-6 md:p-8 lg:p-12">
              <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none
                prose-headings:text-gray-900 prose-headings:font-bold prose-headings:tracking-tight
                prose-h1:text-xl prose-h1:sm:text-2xl prose-h1:md:text-3xl prose-h1:mb-4 prose-h1:mt-6
                prose-h2:text-lg prose-h2:sm:text-xl prose-h2:md:text-2xl prose-h2:mb-3 prose-h2:mt-6 prose-h2:pb-2 prose-h2:border-b prose-h2:border-orange-100
                prose-h3:text-base prose-h3:sm:text-lg prose-h3:md:text-xl prose-h3:mb-2 prose-h3:mt-4
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                prose-a:text-orange-600 prose-a:font-medium hover:prose-a:text-orange-700 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-ul:my-4 prose-ul:space-y-2 prose-li:text-gray-700 prose-li:my-1
                prose-ol:my-4 prose-ol:space-y-2
                prose-img:rounded-xl prose-img:shadow-lg prose-img:my-6
                prose-blockquote:border-l-4 prose-blockquote:border-orange-300 prose-blockquote:bg-orange-50/50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg prose-blockquote:my-6
                prose-code:text-sm prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded
                prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:p-4"
              >
                <Post />
              </div>
            </div>
          </article>

          {/* Mobile-Optimized Engagement Section */}
          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-white text-center mb-8 sm:mb-12 shadow-xl transform hover:scale-[1.02] transition-transform duration-300">
            <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
              <div className="text-4xl sm:text-5xl md:text-6xl">🔥</div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
                Gostou das dicas?
              </h3>
              <p className="text-sm sm:text-base md:text-lg opacity-90 leading-relaxed max-w-xl mx-auto">
                Descubra mais segredos para fazer o churrasco perfeito! Baixe nosso app gratuito 
                e calcule a quantidade ideal de ingredientes para sua festa.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-2 sm:pt-4">
                <a
                  href="#"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-orange-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <span className="text-lg">📱</span>
                  <span className="text-sm sm:text-base">Baixar App Gratuito</span>
                </a>
                <a
                  href="/blog"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-orange-600 transition-all duration-300"
                >
                  <span className="text-sm sm:text-base">Ver Mais Posts</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Suggested Content Section */}
        <div className="bg-gradient-to-br from-gray-50 to-orange-50/30 py-8 sm:py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <SuggestedContent type="post-contents" currentSlug={slug} count={3} />
          </div>
        </div>

        {/* Newsletter Signup Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pb-8 sm:pb-12">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg border border-gray-100 text-center">
            <div className="max-w-xl mx-auto space-y-4">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                📧 Receba mais dicas de churrasco
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Cadastre-se para receber as melhores dicas, receitas e novidades do mundo do churrasco 
                diretamente no seu email.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Seu melhor email"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                />
                <button
                  type="button"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-full transition-colors duration-300 text-sm sm:text-base whitespace-nowrap"
                >
                  Cadastrar
                </button>
              </div>
            </div>
          </div>
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
