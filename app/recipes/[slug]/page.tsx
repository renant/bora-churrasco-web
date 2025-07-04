import JsonLd from "@/components/JsonLd";
import { SuggestedContent } from "@/components/ui/suggested-content";
import Image from "next/image";
import { notFound } from "next/navigation";
import fs from "node:fs";
import path from "node:path";

type Params = Promise<{ slug: string }>;

async function loadMdxFile(slug: string) {
  try {
    console.log("slug", slug);
    const mdxPath = path.join(process.cwd(), "recipe-contents", `${slug}.mdx`);

    if (!fs.existsSync(mdxPath)) {
      return null;
    }
    const mdxModule = await import(`@/recipe-contents/${slug}.mdx`);
    return mdxModule;
  } catch (error) {
    console.error("Failed to load MDX file:", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const mdxModule = await loadMdxFile(slug);

  if (!mdxModule) {
    return {
      title: "Bora Churrasco! - Receita não encontrada",
      description: "Receita não encontrado",
    };
  }

  const { metadata } = mdxModule;

  const recipe = metadata;

  const url = `https://www.borachurrasco.app/recipes/${recipe.slug}`;

  return {
    title: `${recipe.title} - Receita | Bora Churrasco`,
    description: `Aprenda a fazer ${recipe.title}. Receita completa com ingredientes e modo de preparo passo a passo.`,
    alternates: {
      canonical: url,
    },
    keywords: ["receita", "churrasco", "como fazer", recipe.title],
    authors: [{ name: "Bora Churrasco" }],
    robots: {
      index: true,
      follow: true,
    },
    images: [
      {
        url: recipe.imagePath,
      },
    ],
    openGraph: {
      title: `${recipe.title}`,
      description: `Receita de ${recipe.title}`,
      url: url,
      images: [
        {
          url: recipe.imagePath,
        },
      ],
      locale: "pt_BR",
      type: "website",
    },
  };
}

export default async function RecipePage({ params }: { params: Params }) {
  const { slug } = await params;
  const { metadata, default: Recipe } = await loadMdxFile(slug);

  const recipe = metadata;

  if (!metadata) {
    return notFound();
  }

  return (
    <>
      {/* Hero Section with Recipe Image */}
      <div className="relative min-h-[50vh] lg:min-h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            fill
            priority
            sizes="100vw"
            className="object-cover"
            src={recipe.imagePath}
            alt={`Foto da receita: ${recipe.title}`}
            itemProp="image"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 flex items-end min-h-[50vh] lg:min-h-[60vh]">
          <div className="container mx-auto px-4 md:px-8 lg:px-16 pb-16">
            <div className="max-w-4xl">
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-white/80 text-sm mb-6">
                <a href="/" className="hover:text-white transition-colors">
                  Início
                </a>
                <span>•</span>
                <a href="/recipes" className="hover:text-white transition-colors">
                  Receitas
                </a>
                <span>•</span>
                <span className="text-white">Receita</span>
              </nav>

              {/* Recipe Badge */}
              <div className="flex items-center gap-3 mb-4">
                <span className="px-4 py-2 bg-orange-500/90 text-white text-sm font-medium rounded-full backdrop-blur-sm flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.1 13.34l2.83-2.83L3.91 3.5a4.008 4.008 0 0 0 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
                  </svg>
                  Receita de Churrasco
                </span>
              </div>

              {/* Title */}
              <h1 
                itemProp="name" 
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-lg"
              >
                {recipe.title}
              </h1>

              {/* Meta Info */}
              <div className="flex items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <time dateTime={new Date(recipe.date).toISOString()}>
                    {new Date(recipe.date).toLocaleDateString("pt-BR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                </div>
                
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Tempo de preparo variável</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Para toda família</span>
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
            {/* Recipe Content */}
            <article
              itemScope
              itemType="https://schema.org/Recipe"
              className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16"
            >
              <meta
                itemProp="datePublished"
                content={new Date(recipe.date).toISOString()}
              />
              
              {/* Recipe Content */}
              <div className="p-8 md:p-12">
                <div className="prose prose-lg max-w-none
                  prose-headings:text-gray-900 prose-headings:font-bold
                  prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-0
                  prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8 prose-h2:border-b prose-h2:border-orange-100 prose-h2:pb-2
                  prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-6
                  prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                  prose-ul:space-y-2 prose-li:text-gray-700
                  prose-strong:text-gray-900 prose-strong:font-semibold
                  prose-ul:bg-orange-50 prose-ul:p-4 prose-ul:rounded-lg prose-ul:border prose-ul:border-orange-100
                  prose-ol:bg-blue-50 prose-ol:p-4 prose-ol:rounded-lg prose-ol:border prose-ol:border-blue-100
                ">
                  <Recipe />
                </div>
              </div>
            </article>

            {/* Recipe Actions */}
            <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-8 md:p-12 text-white text-center mb-16 shadow-xl">
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="text-6xl mb-4">🔥</div>
                <h3 className="text-2xl md:text-3xl font-bold">
                  Pronto para arrasar no churrasco?
                </h3>
                <p className="text-lg opacity-90 leading-relaxed">
                  Agora que você tem uma receita incrível, que tal calcular a quantidade perfeita 
                  de ingredientes para sua festa? Nosso app gratuito te ajuda a não errar nas compras!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                  <a
                    href="/"
                    className="inline-flex items-center gap-2 bg-white text-orange-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    🧮 Calcular Ingredientes
                  </a>
                  <a
                    href="/recipes"
                    className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-orange-600 transition-all duration-300"
                  >
                    Ver Mais Receitas
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Recipe Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 mb-16">
              <div className="max-w-3xl mx-auto text-center space-y-4">
                <h3 className="text-2xl font-bold text-blue-900 flex items-center justify-center gap-2">
                  💡 Dica do Chef
                </h3>
                <p className="text-blue-800 leading-relaxed">
                  Lembre-se: o segredo de um churrasco perfeito está no tempero, no timing e na paixão! 
                  Use sempre ingredientes frescos e de qualidade. E não se esqueça: cada churrasqueira 
                  tem suas particularidades, então vá ajustando os tempos conforme sua experiência.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Suggested Content */}
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <SuggestedContent type="recipe-contents" currentSlug={slug} count={3} />
        </div>
      </main>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Recipe",
          name: recipe.title,
          description: `Receita de ${recipe.title}`,
          datePublished: new Date(recipe.date).toISOString(),
          author: {
            "@type": "Organization",
            name: "Bora Churrasco",
            url: "https://www.borachurrasco.app",
          },
          image: [recipe.imagePath],
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
            "@id": `https://www.borachurrasco.app/recipes/${slug}`,
          },
          isAccessibleForFree: "True",
          inLanguage: "pt-BR",
        }}
      />
    </>
  );
}

export function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), "recipe-contents"));
  const slugs = files.map((file) => ({
    slug: file.replace(/\.mdx$/, ""),
  }));

  return slugs;
}

export const dynamicParams = false;
