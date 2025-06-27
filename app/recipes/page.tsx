import { LoadingPage } from "@/components/ui/loading";
import { getRecipes } from "@/services/notion-blog-service";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

// Dynamically import heavy components
const Card = dynamic(
  () => import("@/components/ui/card").then((mod) => mod.Card),
  {
    loading: () => <LoadingPage />,
    ssr: true,
  }
);

const CardHeader = dynamic(
  () => import("@/components/ui/card").then((mod) => mod.CardHeader),
  {
    ssr: true,
  }
);

const CardTitle = dynamic(
  () => import("@/components/ui/card").then((mod) => mod.CardTitle),
  {
    ssr: true,
  }
);

const CardContent = dynamic(
  () => import("@/components/ui/card").then((mod) => mod.CardContent),
  {
    ssr: true,
  }
);

export const revalidate = 3600;

export const metadata: Metadata = {
  title:
    "Receitas de Churrasco - Aprenda a Fazer o Melhor Churrasco | Bora Churrasco",
  description:
    "Descubra as melhores receitas de churrasco, com passo a passo fácil de seguir para preparar carnes, acompanhamentos e molhos perfeitos. Aprenda técnicas de mestre churrasqueiro e surpreenda a todos com pratos suculentos e saborosos!",
  alternates: {
    canonical: "https://www.borachurrasco.app/recipes",
  },
  manifest: "https://www.borachurrasco.app/manifest.json",
  keywords: [
    "Receitas de Churrasco",
    "Como Fazer Churrasco",
    "Receitas Churrasqueiro",
    "Temperos para Churrasco",
    "Dicas de Churrasco",
    "Churrasco Perfeito",
    "Calculadora de Churrasco",
  ],
  openGraph: {
    title: "Bora Churrasco: Receitas",
    description:
      "Descubra as melhores receitas de churrasco, com passo a passo fácil de seguir para preparar carnes, acompanhamentos e molhos perfeitos. Aprenda técnicas de mestre churrasqueiro e surpreenda a todos com pratos suculentos e saborosos!",
    url: "https://www.borachurrasco.app/recipes",
    siteName: "Bora Churrasco",
    images: [
      {
        url: "https://www.borachurrasco.app/images/ms-icon-310x310.png",
        width: 310,
        height: 310,
        alt: "Logo Bora Churrasco",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Receitas de Churrasco - Bora Churrasco",
    description:
      "Descubra as melhores receitas de churrasco, com passo a passo fácil de seguir.",
    images: ["https://www.borachurrasco.app/images/ms-icon-310x310.png"],
  },
};

export default async function RecipesPage() {
  const result = await getRecipes();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: result.recipes.map((recipe, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Recipe",
        name: recipe.name,
        image: recipe.imagePath,
        url: `https://www.borachurrasco.app/recipes/${recipe.slug}`,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-transparent px-9 shadow-xl md:container md:mx-auto md:pt-10">
        <Suspense fallback={<LoadingPage />}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {result.recipes.map((recipe) => (
              <Link
                key={recipe.id}
                href={`/recipes/${recipe.slug}`}
                aria-label={`Ver receita de ${recipe.name}`}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{recipe.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative z-0 h-64 w-full">
                      <Image
                        fill={true}
                        className="rounded-md object-cover"
                        src={recipe.imagePath}
                        alt={`Foto da receita de ${recipe.name}`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciPjxzdG9wIHN0b3AtY29sb3I9IiNmNmY3ZjgiIG9mZnNldD0iMCUiIC8+PHN0b3Agc3RvcC1jb2xvcj0iI2VkZWVmMSIgb2Zmc2V0PSIyMCUiIC8+PHN0b3Agc3RvcC1jb2xvcj0iI2Y2ZjdmOCIgb2Zmc2V0PSI0MCUiIC8+PHN0b3Agc3RvcC1jb2xvcj0iI2Y2ZjdmOCIgb2Zmc2V0PSI3MCUiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjcwMCIgaGVpZ2h0PSI0NzUiIGZpbGw9IiNmNmY3ZjgiIC8+PHJlY3QgaWQ9InIiIHdpZHRoPSI3MDAiIGhlaWdodD0iNDc1IiBmaWxsPSJ1cmwoI2cpIiAvPjxhbmltYXRlIHhsaW5rOmhyZWY9IiNyIiBhdHRyaWJ1dGVOYW1lPSJ4IiBmcm9tPSItNzAwIiB0bz0iNzAwIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgIC8+PC9zdmc+"
                        quality={75}
                      />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Suspense>
      </main>
    </>
  );
}
