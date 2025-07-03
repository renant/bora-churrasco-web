import JsonLd from "@/components/JsonLd";
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
    <main className="min-h-screen bg-transparent px-9 md:container md:mx-auto md:pt-5 lg:px-64">
      <article
        itemScope
        itemType="https://schema.org/Recipe"
        className="prose prose-sm max-w-none pb-44 md:prose-lg prose-headings:my-4 prose-h2:my-4 prose-p:my-2 prose-a:text-blue-700"
      >
        <meta
          itemProp="datePublished"
          content={new Date(recipe.date).toISOString()}
        />
        <div className="relative z-0 h-60 w-full lg:h-[450px]">
          <Image
            fill={true}
            priority={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            className="rounded-md object-cover"
            src={recipe.imagePath}
            alt={`Foto da receita: ${recipe.title}`}
            itemProp="image"
            quality={85}
          />
        </div>
        <div className="mt-10">
          <h1 itemProp="name" className="text-2xl font-bold">
            {recipe.title}
          </h1>
        </div>
        <Recipe />
      </article>
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
    </main>
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
