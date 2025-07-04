import JsonLd from "@/components/JsonLd";
import DynamicSuggestedRecipes from "@/components/dynamic-suggested-recipes";
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
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-16">
        
        {/* Recipe Image */}
        <div className="relative w-full overflow-hidden rounded-lg shadow-lg mb-8 md:mb-12">
          <div className="relative z-0 h-80 w-full lg:h-[500px]">
            <Image
              fill={true}
              priority={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              className="rounded-lg object-cover"
              src={recipe.imagePath}
              alt={`Foto da receita: ${recipe.title}`}
              itemProp="image"
              quality={90}
            />
          </div>
        </div>

        {/* Recipe Content */}
        <article
          itemScope
          itemType="https://schema.org/Recipe"
          className="prose prose-lg max-w-none pb-12 md:pb-16 prose-headings:text-orange-600 prose-headings:font-bold prose-h1:text-3xl md:prose-h1:text-4xl lg:prose-h1:text-5xl prose-h1:leading-tight prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl md:prose-h3:text-2xl prose-h3:text-amber-600 prose-p:text-gray-700 prose-p:text-lg prose-p:leading-relaxed prose-a:text-orange-500 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-strong:text-orange-700 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:text-lg prose-blockquote:border-l-orange-500 prose-blockquote:bg-orange-50 prose-blockquote:text-orange-800"
        >
          <meta
            itemProp="datePublished"
            content={new Date(recipe.date).toISOString()}
          />
          
          {/* Title and Meta */}
          <div className="text-center mb-8 md:mb-12">
            <h1 itemProp="name" className="mb-6 text-orange-600">
              {recipe.title}
            </h1>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-600 bg-gray-50 rounded-lg py-4 px-6 border border-gray-200">
              <time 
                dateTime={new Date(recipe.date).toISOString()}
                className="font-medium"
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
          
          {/* Recipe Content */}
          <div className="bg-white rounded-lg space-y-8">
            <Recipe />
          </div>
        </article>

        {/* Dynamic Suggested Recipes Section */}
        <DynamicSuggestedRecipes excludeSlug={slug} count={6} />
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
