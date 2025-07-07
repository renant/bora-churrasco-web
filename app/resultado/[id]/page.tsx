import JsonLd from "@/components/JsonLd";
import ClientSuggestedPosts from "@/components/client-suggested-posts";
import ComoCalcularComponent from "@/components/como-calcular-component";
import ResultDefault from "@/components/ui/resultDefault";

type Params = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { id } = await params;
  const participante = Number.parseInt(id);
  const url = `https://www.borachurrasco.app/resultado/${participante}`;

  return {
    title: `Calculadora de Churrasco: Quantidade Para ${participante} Pessoas | Bora Churrasco`,
    description: `Descubra a quantidade exata de carne e acompanhamentos para um churrasco de ${participante} pessoas. Cálculo preciso de carnes, acompanhamentos e bebidas para seu evento.`,
    alternates: {
      canonical: url,
    },
    keywords: [
      "Calculadora de Churrasco",
      "Churrasco para Grupos",
      "Quantidade de Carne por Pessoa",
      "Planejamento de Churrasco",
      `Churrasco ${participante} pessoas`,
      "Cálculo de Carne",
      "Organização de Churrasco",
      "Dicas de Churrasco",
    ],
    images: [
      {
        url: "https://www.borachurrasco.app/images/ms-icon-310x310.png",
        width: 310,
        height: 310,
        alt: "Bora Churrasco - Calculadora de Churrasco",
      },
    ],
    openGraph: {
      title: `Calculadora de Churrasco: Quantidade Para ${participante} Pessoas | Bora Churrasco`,
      description: `Descubra a quantidade exata de carne e acompanhamentos para um churrasco de ${participante} pessoas. Cálculo preciso de carnes, acompanhamentos e bebidas para seu evento.`,
      url: url,
      images: [
        {
          url: "https://www.borachurrasco.app/images/ms-icon-310x310.png",
          width: 310,
          height: 310,
          alt: "Bora Churrasco - Calculadora de Churrasco",
        },
      ],
      locale: "pt_BR",
      type: "article",
      siteName: "Bora Churrasco",
      article: {
        publishedTime: new Date().toISOString(),
        authors: ["Bora Churrasco"],
        tags: ["Churrasco", "Calculadora", "Planejamento", "Carnes"],
      },
    },
    twitter: {
      card: "summary_large_image",
      title: `Calculadora de Churrasco: Quantidade Para ${participante} Pessoas`,
      description: `Descubra a quantidade exata de carne e acompanhamentos para um churrasco de ${participante} pessoas`,
      images: ["https://www.borachurrasco.app/images/ms-icon-310x310.png"],
    },
  };
}

export async function generateStaticParams() {
  return [
    { id: "5" },
    { id: "10" },
    { id: "15" },
    { id: "20" },
    { id: "25" },
    { id: "30" },
    { id: "35" },
    { id: "40" },
    { id: "45" },
    { id: "50" },
    { id: "55" },
    { id: "60" },
    { id: "65" },
    { id: "70" },
    { id: "75" },
    { id: "80" },
    { id: "85" },
    { id: "90" },
    { id: "95" },
    { id: "100" },
  ];
}

export default async function Resultado({ params }: { params: Params }) {
  const { id } = await params;
  const participante = Number.parseInt(id);

  return (
    <div className="min-h-screen">
      <main className="flex flex-col items-center justify-between w-full max-w-7xl mx-auto px-4 md:px-16 py-8 md:py-16">
        <div className="text-center mb-4 md:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center leading-tight mb-4">
            <span className="text-red-600">Cálculo De Churrasco Para</span>
            <br />
            <span className="text-red-500 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              {participante} Pessoas
            </span>
          </h1>

          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Aqui está tudo que você precisa para fazer um churrasco perfeito! 🍖
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center w-full gap-8">
          <ResultDefault participantes={participante} />
        </div>
        <div className=" mb-4 md:mb-12">
          <ClientSuggestedPosts count={3} />
        </div>

        <ComoCalcularComponent />
      </main>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `Cálculo De Churrasco Para ${participante} Pessoas`,
          description: `Lista de compras e cálculo estimado para um churrasco de ${participante} pessoas. Guia completo com quantidades de carnes, acompanhamentos e dicas.`,
          datePublished: new Date().toISOString(),
          dateModified: new Date().toISOString(),
          author: {
            "@type": "Organization",
            name: "Bora Churrasco",
            url: "https://www.borachurrasco.app",
          },
          image: {
            "@type": "ImageObject",
            url: "https://www.borachurrasco.app/images/ms-icon-310x310.png",
            width: 310,
            height: 310,
          },
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
            "@id": `https://www.borachurrasco.app/resultado/${participante}`,
          },
          keywords:
            "Calculadora de Churrasco, Quantidade de Carne, Churrasco para Grupos, Planejamento de Churrasco",
          articleSection: "Calculadora",
          wordCount: "1000",
        }}
      />
    </div>
  );
}
