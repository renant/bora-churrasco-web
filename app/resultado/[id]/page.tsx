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
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
    { id: "7" },
    { id: "8" },
    { id: "9" },
    { id: "10" },
    { id: "11" },
    { id: "12" },
    { id: "13" },
    { id: "14" },
    { id: "15" },
    { id: "16" },
    { id: "17" },
    { id: "18" },
    { id: "19" },
    { id: "20" },
    { id: "21" },
    { id: "22" },
    { id: "23" },
    { id: "24" },
    { id: "25" },
    { id: "26" },
    { id: "27" },
    { id: "28" },
    { id: "29" },
    { id: "30" },
    { id: "31" },
    { id: "32" },
    { id: "33" },
    { id: "34" },
    { id: "35" },
    { id: "36" },
    { id: "37" },
    { id: "38" },
    { id: "39" },
    { id: "40" },
    { id: "41" },
    { id: "42" },
    { id: "43" },
    { id: "44" },
    { id: "45" },
    { id: "46" },
    { id: "47" },
    { id: "48" },
    { id: "49" },
    { id: "50" },
    { id: "51" },
    { id: "52" },
    { id: "53" },
    { id: "54" },
    { id: "55" },
    { id: "56" },
    { id: "57" },
    { id: "58" },
    { id: "59" },
    { id: "60" },
    { id: "61" },
    { id: "62" },
    { id: "63" },
    { id: "64" },
    { id: "65" },
    { id: "66" },
    { id: "67" },
    { id: "68" },
    { id: "69" },
    { id: "70" },
    { id: "71" },
    { id: "72" },
    { id: "73" },
    { id: "74" },
    { id: "75" },
    { id: "76" },
    { id: "77" },
    { id: "78" },
    { id: "79" },
    { id: "80" },
    { id: "81" },
    { id: "82" },
    { id: "83" },
    { id: "84" },
    { id: "85" },
    { id: "86" },
    { id: "87" },
    { id: "88" },
    { id: "89" },
    { id: "90" },
    { id: "91" },
    { id: "92" },
    { id: "93" },
    { id: "94" },
    { id: "95" },
    { id: "96" },
    { id: "97" },
    { id: "98" },
    { id: "99" },
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
