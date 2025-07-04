import JsonLd from "@/components/JsonLd";
import SuggestedRecipes from "@/components/suggested-recipes";
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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-yellow-50">
      {/* Hero Section with Enhanced Visual Design */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />
        <main className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-16">
          
          {/* Recipe Image with Modern Design */}
          <div className="relative w-full overflow-hidden rounded-3xl shadow-2xl mb-8 md:mb-12">
            <div className="relative z-0 h-80 w-full lg:h-[500px]">
              <Image
                fill={true}
                priority={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                className="rounded-3xl object-cover"
                src={recipe.imagePath}
                alt={`Foto da receita: ${recipe.title}`}
                itemProp="image"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent rounded-3xl" />
              
              {/* Recipe Title Overlay */}
              <div className="absolute inset-0 flex items-end p-6 md:p-8">
                <div className="text-white">
                  <h1 itemProp="name" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 drop-shadow-2xl">
                    {recipe.title}
                  </h1>
                  <div className="flex items-center gap-4 text-sm md:text-base">
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                      <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">BC</span>
                      </div>
                      <span className="font-medium">Bora Churrasco</span>
                    </div>
                    <time 
                      dateTime={new Date(recipe.date).toISOString()}
                      className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 font-medium"
                    >
                      {new Date(recipe.date).toLocaleDateString("pt-BR", {
                        timeZone: "America/Sao_Paulo",
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recipe Content with Enhanced Design */}
          <article
            itemScope
            itemType="https://schema.org/Recipe"
            className="prose prose-lg max-w-none pb-12 md:pb-16 prose-headings:text-orange-600 prose-headings:font-bold prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl md:prose-h3:text-2xl prose-h3:text-amber-600 prose-p:text-gray-700 prose-p:text-lg prose-p:leading-relaxed prose-a:text-orange-500 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-strong:text-orange-700 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:text-lg prose-blockquote:border-l-orange-500 prose-blockquote:bg-orange-50 prose-blockquote:text-orange-800"
          >
            <meta
              itemProp="datePublished"
              content={new Date(recipe.date).toISOString()}
            />
            
            {/* Recipe Content in Beautiful Container */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 lg:p-12 shadow-lg border border-orange-100 space-y-8">
              <Recipe />
            </div>
          </article>

          {/* Suggested Recipes Section */}
          <div className="mt-16 md:mt-20 mb-12">
            <SuggestedRecipes excludeSlug={slug} count={6} />
          </div>
        </main>
      </div>

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
