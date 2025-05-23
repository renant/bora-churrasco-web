import JsonLd from "@/components/JsonLd";
import { getRecipe } from "@/services/notion-blog-service";
import Image from "next/image";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { id } = await params;
  const recipe = await getRecipe(id);

  if (!recipe) {
    return {
      title: "Bora Churrasco! - Receita não encontrada",
      description: "Receita não encontrado",
    };
  }

  const url = `https://www.borachurrasco.app/recipes/${recipe.slug}`;

  return {
    title: `${recipe.name} - Receita | Bora Churrasco`,
    description: `Aprenda a fazer ${recipe.name}. Receita completa com ingredientes e modo de preparo passo a passo.`,
    alternates: {
      canonical: url,
    },
    keywords: ["receita", "churrasco", "como fazer", recipe.name],
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
      title: `${recipe.name}`,
      description: `Receita de ${recipe.name}`,
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
  const { id } = await params;
  const recipe = await getRecipe(id);

  if (!recipe) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-transparent px-9 shadow-xl md:container md:mx-auto md:pt-5 lg:px-64">
      <article
        itemScope
        itemType="https://schema.org/Recipe"
        className="prose prose-sm max-w-none pb-44 md:prose-lg prose-headings:my-4 prose-h2:my-4 prose-p:my-2 prose-a:text-blue-700"
      >
        <meta
          itemProp="datePublished"
          content={new Date(recipe.createdAt).toISOString()}
        />
        <div className="relative z-0 h-60 w-full lg:h-[450px]">
          <Image
            fill={true}
            priority={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            className="rounded-md object-cover"
            src={recipe.imagePath}
            alt={`Foto da receita: ${recipe.name}`}
            itemProp="image"
            quality={85}
          />
        </div>
        <div className="mt-10">
          <h1 itemProp="name" className="text-2xl font-bold">
            {recipe.name}
          </h1>
        </div>
        <div itemProp="articleBody">
          {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
          <section dangerouslySetInnerHTML={{ __html: recipe.content }} />
        </div>
      </article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Recipe",
          name: recipe.name,
          description: `Receita de ${recipe.name}`,
          datePublished: new Date(recipe.createdAt).toISOString(),
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
            "@id": `https://www.borachurrasco.app/recipes/${id}`,
          },
          isAccessibleForFree: "True",
          inLanguage: "pt-BR",
        }}
      />
    </main>
  );
}
