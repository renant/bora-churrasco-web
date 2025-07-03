import { CardPost } from "@/components/ui/card-post";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { getPosts } from "./actions";

function getFirstValue(param: string | string[] | undefined): string {
  return Array.isArray(param) ? param[0] : param || "";
}

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export const metadata: Metadata = {
  title: "Bora Churrasco: Dicas, Receitas e Segredos do Mestre Assador",
  description:
    "Descubra os segredos do churrasco perfeito com nosso blog de churrasco. Explore receitas irresistíveis, técnicas de assado, escolha de carnes, e muito mais para tornar-se um mestre no preparo de churrascos memoráveis. Clique agora e leve suas habilidades à brasa a um novo nível!",
  alternates: {
    canonical: "https://www.borachurrasco.app/blog",
  },
  manifest: "https://www.borachurrasco.app/manifest.json",
  keywords: [
    "Churrasco",
    "Receitas de Churrasco",
    "Como Fazer Churrasco",
    "Dicas de Assado",
    "Mestre Assador",
    "Churrasqueira",
    "Carne para Churrasco",
    "Blog de Churrasco",
  ],
  openGraph: {
    title: "Bora Churrasco: Dicas, Receitas e Segredos do Mestre Assador",
    description:
      "Descubra os segredos do churrasco perfeito com nosso blog de churrasco. Explore receitas irresistíveis, técnicas de assado, escolha de carnes, e muito mais para tornar-se um mestre no preparo de churrascos memoráveis. Clique agora e leve suas habilidades à brasa a um novo nível!",
    url: "https://www.borachurrasco.app/blog",
    images: [
      {
        url: "https://www.borachurrasco.app/images/ms-icon-310x310.png",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Bora Churrasco: Dicas, Receitas e Segredos do Mestre Assador",
    description:
      "Descubra os segredos do churrasco perfeito com nosso blog de churrasco.",
    images: ["https://www.borachurrasco.app/images/ms-icon-310x310.png"],
  },
};

export default async function PostsPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(getFirstValue(searchParams.page)) || 1;
  const postsPerPage = Number(getFirstValue(searchParams.limit)) || 6;
  const sort = getFirstValue(searchParams.sort) || "date_desc";
  const searchTerm = getFirstValue(searchParams.search);

  const { posts, totalPosts } = await getPosts({
    limit: postsPerPage,
    page: currentPage,
    searchTerm,
    sort,
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    headline: "Bora Churrasco: Dicas, Receitas e Segredos do Mestre Assador",
    image: ["https://www.borachurrasco.app/images/ms-icon-310x310.png"],
    datePublished: posts[0]?.date,
    author: {
      "@type": "Organization",
      name: "Bora Churrasco",
    },
    publisher: {
      "@type": "Organization",
      name: "Bora Churrasco",
      logo: {
        "@type": "ImageObject",
        url: "https://www.borachurrasco.app/images/ms-icon-310x310.png",
      },
    },
    description: metadata.description,
  };

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const isPreviousDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;
  const disabledLinkStyle = "opacity-50 cursor-not-allowed";

  return (
    <>
      <Script
        id="blog-jsonld"
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-transparent px-9  md:container md:mx-auto md:pt-10">
        <section aria-label="Posts do Blog">
          <div className="flex justify-center mt-8 mb-8">
            <h1 className="text-2xl font-bold">
              Bora Churrasco: Dicas, Receitas e Segredos do Mestre Assador
            </h1>
          </div>
          {searchTerm && (
            <div className="text-center mb-8">
              <p className="text-slate-600">
                Resultados da busca por:{" "}
                <span className="font-medium text-amber-700">{searchTerm}</span>
              </p>
              <Link
                href="/blog"
                className="text-amber-700 hover:text-amber-900 underline text-sm mt-2 inline-block"
              >
                Limpar busca
              </Link>
            </div>
          )}

          {posts.length === 0 ? (
            <div className="text-center mb-8">
              <p className="text-slate-600">Nenhum post encontrado</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => (
                <CardPost key={post?.slug} post={post ?? undefined} />
              ))}
            </div>
          )}

          <div className="flex justify-center mt-8 mb-8">
            <div className="flex space-x-2">
              {!isPreviousDisabled && (
                <Link
                  href={`/blog?limit=${postsPerPage}&page=${currentPage - 1}${
                    searchTerm ? `&search=${searchTerm}` : ""
                  }${sort !== "date_desc" ? `&sort=${sort}` : ""}`}
                  className={`${
                    isPreviousDisabled ? disabledLinkStyle : ""
                  } inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-amber-200 rounded-md shadow-sm hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500`}
                  aria-disabled={isPreviousDisabled}
                  tabIndex={isPreviousDisabled ? -1 : undefined}
                >
                  Anterior
                </Link>
              )}
              <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-amber-50 border border-amber-200 rounded-md">
                {currentPage} de {totalPages}
              </span>
              {!isNextDisabled && (
                <Link
                  href={`/blog?limit=${postsPerPage}&page=${currentPage + 1}${
                    searchTerm ? `&search=${searchTerm}` : ""
                  }${sort !== "date_desc" ? `&sort=${sort}` : ""}`}
                  className={`${
                    isNextDisabled ? disabledLinkStyle : ""
                  } inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-amber-200 rounded-md shadow-sm hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500`}
                  aria-disabled={isNextDisabled}
                  tabIndex={isNextDisabled ? -1 : undefined}
                >
                  Próximo
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
