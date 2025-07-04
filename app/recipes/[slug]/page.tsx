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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      {/* Mobile-First Hero Section */}
      <div className="relative">
        {/* Recipe Image */}
        <div className="relative h-[35vh] sm:h-[40vh] md:h-[50vh] lg:h-[60vh] overflow-hidden">
          <Image
            fill
            priority
            sizes="100vw"
            className="object-cover"
            src={recipe.imagePath}
            alt={`Foto da receita: ${recipe.title}`}
            itemProp="image"
            quality={85}
          />
          {/* Mobile-Optimized Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10"></div>
        </div>
        
        {/* Hero Content - Mobile Optimized */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 md:pb-12">
            <div className="max-w-4xl mx-auto">
              {/* Mobile-Friendly Breadcrumb */}
              <nav className="hidden sm:flex items-center space-x-2 text-white/80 text-sm mb-3 md:mb-4">
                <a href="/" className="hover:text-white transition-colors">Início</a>
                <span>•</span>
                <a href="/recipes" className="hover:text-white transition-colors">Receitas</a>
                <span>•</span>
                <span className="text-white">Receita</span>
              </nav>

              {/* Recipe Badge */}
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <span className="px-2 py-1 sm:px-3 sm:py-1.5 bg-orange-500/90 text-white text-xs sm:text-sm font-medium rounded-full backdrop-blur-sm flex items-center gap-1.5 sm:gap-2">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.1 13.34l2.83-2.83L3.91 3.5a4.008 4.008 0 0 0 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
                  </svg>
                  <span>Receita de Churrasco</span>
                </span>
              </div>

              {/* Mobile-Responsive Title */}
              <h1 
                itemProp="name" 
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight mb-4 sm:mb-6 drop-shadow-lg"
              >
                {recipe.title}
              </h1>

              {/* Simplified Meta Info for Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-white/80 text-xs sm:text-sm">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <time dateTime={new Date(recipe.date).toISOString()}>
                    {new Date(recipe.date).toLocaleDateString("pt-BR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                </div>
                
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Preparo rápido</span>
                </div>
                
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Para toda família</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Mobile-First */}
      <main className="relative -mt-4 sm:-mt-6 md:-mt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Recipe Content Card */}
          <article
            itemScope
            itemType="https://schema.org/Recipe"
            className="bg-white rounded-t-3xl shadow-2xl border border-gray-100 overflow-hidden mb-8 sm:mb-12 relative z-10"
          >
            <meta
              itemProp="datePublished"
              content={new Date(recipe.date).toISOString()}
            />
            
            {/* Recipe Content */}
            <div className="p-4 sm:p-6 md:p-8 lg:p-12">
              <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none
                prose-headings:text-gray-900 prose-headings:font-bold prose-headings:tracking-tight
                prose-h1:text-lg prose-h1:sm:text-xl prose-h1:md:text-2xl prose-h1:mb-3 prose-h1:mt-0
                prose-h2:text-base prose-h2:sm:text-lg prose-h2:md:text-xl prose-h2:mb-3 prose-h2:mt-6 prose-h2:pb-2 prose-h2:border-b prose-h2:border-orange-100
                prose-h3:text-sm prose-h3:sm:text-base prose-h3:md:text-lg prose-h3:mb-2 prose-h3:mt-4
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-3
                prose-ul:my-3 prose-ul:space-y-1 prose-li:text-gray-700 prose-li:my-1
                prose-ol:my-3 prose-ol:space-y-1
                prose-strong:text-gray-900 prose-strong:font-semibold
                
                [&_h2:contains('Ingredientes')]:bg-orange-50 [&_h2:contains('Ingredientes')]:p-3 [&_h2:contains('Ingredientes')]:rounded-lg [&_h2:contains('Ingredientes')]:border [&_h2:contains('Ingredientes')]:border-orange-200 [&_h2:contains('Ingredientes')]:text-orange-900
                [&_h2:contains('Passos')]:bg-blue-50 [&_h2:contains('Passos')]:p-3 [&_h2:contains('Passos')]:rounded-lg [&_h2:contains('Passos')]:border [&_h2:contains('Passos')]:border-blue-200 [&_h2:contains('Passos')]:text-blue-900
                [&_h2:contains('Modo')]:bg-blue-50 [&_h2:contains('Modo')]:p-3 [&_h2:contains('Modo')]:rounded-lg [&_h2:contains('Modo')]:border [&_h2:contains('Modo')]:border-blue-200 [&_h2:contains('Modo')]:text-blue-900

                [&_h2:contains('Ingredientes')~ul]:bg-orange-50/50 [&_h2:contains('Ingredientes')~ul]:p-3 [&_h2:contains('Ingredientes')~ul]:rounded-lg [&_h2:contains('Ingredientes')~ul]:border [&_h2:contains('Ingredientes')~ul]:border-orange-100
                [&_h2:contains('Passos')~ul]:bg-blue-50/50 [&_h2:contains('Passos')~ul]:p-3 [&_h2:contains('Passos')~ul]:rounded-lg [&_h2:contains('Passos')~ul]:border [&_h2:contains('Passos')~ul]:border-blue-100
                [&_h2:contains('Passos')~ol]:bg-blue-50/50 [&_h2:contains('Passos')~ol]:p-3 [&_h2:contains('Passos')~ol]:rounded-lg [&_h2:contains('Passos')~ol]:border [&_h2:contains('Passos')~ol]:border-blue-100
                [&_h2:contains('Modo')~ul]:bg-blue-50/50 [&_h2:contains('Modo')~ul]:p-3 [&_h2:contains('Modo')~ul]:rounded-lg [&_h2:contains('Modo')~ul]:border [&_h2:contains('Modo')~ul]:border-blue-100
                [&_h2:contains('Modo')~ol]:bg-blue-50/50 [&_h2:contains('Modo')~ol]:p-3 [&_h2:contains('Modo')~ol]:rounded-lg [&_h2:contains('Modo')~ol]:border [&_h2:contains('Modo')~ol]:border-blue-100
              ">
                <Recipe />
              </div>
            </div>
          </article>

          {/* Mobile-Optimized Chef Tips */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
            <div className="max-w-3xl mx-auto text-center space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-900 flex items-center justify-center gap-2">
                <span className="text-xl sm:text-2xl">💡</span>
                <span>Dica do Chef</span>
              </h3>
              <p className="text-sm sm:text-base text-blue-800 leading-relaxed">
                Lembre-se: o segredo de um churrasco perfeito está no tempero, no timing e na paixão! 
                Use sempre ingredientes frescos e de qualidade. E não se esqueça: cada churrasqueira 
                tem suas particularidades, então vá ajustando os tempos conforme sua experiência.
              </p>
            </div>
          </div>

          {/* Mobile-Optimized Action Section */}
          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-white text-center mb-8 sm:mb-12 shadow-xl transform hover:scale-[1.02] transition-transform duration-300">
            <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
              <div className="text-4xl sm:text-5xl md:text-6xl">🔥</div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
                Pronto para arrasar no churrasco?
              </h3>
              <p className="text-sm sm:text-base md:text-lg opacity-90 leading-relaxed max-w-xl mx-auto">
                Agora que você tem uma receita incrível, que tal calcular a quantidade perfeita 
                de ingredientes para sua festa? Nosso app gratuito te ajuda a não errar nas compras!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-2 sm:pt-4">
                <a
                  href="/"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-orange-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <span className="text-lg">🧮</span>
                  <span className="text-sm sm:text-base">Calcular Ingredientes</span>
                </a>
                <a
                  href="/recipes"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-orange-600 transition-all duration-300"
                >
                  <span className="text-sm sm:text-base">Ver Mais Receitas</span>
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
            <SuggestedContent type="recipe-contents" currentSlug={slug} count={3} />
          </div>
        </div>

        {/* Mobile-Optimized Quick Actions */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pb-8 sm:pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Save Recipe */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="space-y-3">
                <div className="text-2xl sm:text-3xl">⭐</div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900">
                  Salvar Receita
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Guarde esta receita nos seus favoritos para não perder nunca!
                </p>
                <button
                  type="button"
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-4 py-2.5 rounded-full transition-colors duration-300 text-sm"
                >
                  Salvar nos Favoritos
                </button>
              </div>
            </div>

            {/* Share Recipe */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="space-y-3">
                <div className="text-2xl sm:text-3xl">📤</div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900">
                  Compartilhar
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Compartilhe esta receita incrível com seus amigos!
                </p>
                <button
                  type="button"
                  className="w-full bg-orange-100 hover:bg-orange-200 text-orange-800 font-medium px-4 py-2.5 rounded-full transition-colors duration-300 text-sm"
                >
                  Compartilhar Receita
                </button>
              </div>
            </div>
          </div>
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
    </div>
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
