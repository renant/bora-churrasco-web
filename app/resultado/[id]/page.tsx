import JsonLd from "@/components/JsonLd";
import SuggestedPosts from "@/components/suggested-posts";
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
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-orange-50 to-amber-50">
      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/10 via-transparent to-transparent" />
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-red-500/10 rounded-full blur-xl" />
        <div className="absolute top-32 right-16 w-32 h-32 bg-orange-500/10 rounded-full blur-xl" />
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-amber-500/10 rounded-full blur-xl" />

        <main className="relative flex flex-col items-center justify-between w-full max-w-7xl mx-auto px-4 md:px-16 py-8 md:py-16">
          
          {/* Enhanced Title Section */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-red-100 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">🔥</span>
              </div>
              <span className="text-red-600 font-semibold text-sm md:text-base">Resultado da Calculadora</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center leading-tight mb-4">
              <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                Cálculo De Churrasco Para
              </span>
              <br />
              <span className="text-red-500 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                {participante} Pessoas
              </span>
            </h1>
            
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Aqui está tudo que você precisa para fazer um churrasco perfeito! 🍖
            </p>
          </div>

          {/* Results Section with Enhanced Design */}
          <div className="w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-orange-100 p-6 md:p-8 mb-12 md:mb-16">
            <div className="flex flex-col md:flex-row items-center justify-center w-full gap-8">
              <ResultDefault participantes={participante} />
            </div>
          </div>

          {/* Enhanced Guide Content */}
          <div className="w-full max-w-4xl bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-orange-100 p-6 md:p-8 lg:p-12">
            <div className="prose prose-lg md:prose-xl max-w-none prose-headings:text-red-600 prose-headings:font-bold prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mb-6 prose-h3:text-xl md:prose-h3:text-2xl prose-h3:text-orange-600 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-red-500 prose-a:font-semibold prose-strong:text-red-700 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:leading-relaxed">
              <h2 className="text-red-500 flex items-center gap-3">
                <span className="text-2xl">🎯</span>
                Como Calcular a Quantidade de Carne para o Churrasco Perfeito
              </h2>
              <p>
                Churrasco é sinônimo de alegria, confraternização e claro, de uma
                boa carne assada. Mas, quantas vezes você já se pegou na dúvida
                sobre a quantidade de carne a comprar para seu churrasco? Faltou
                carne ou sobrou muito, e agora? Não se preocupe! Este artigo é o seu
                guia definitivo para nunca mais errar na quantidade de carne para
                churrasco. Preparado? Então, vamos nessa!
              </p>
              
              <h3 className="text-red-500 flex items-center gap-2">
                <span className="text-xl">📏</span>
                1. Entendendo o Básico: A Regra dos 400g
              </h3>
              <p>
                Para começar, temos uma regra básica muito simples: considere 400
                gramas de carne por pessoa. Essa é uma boa medida inicial, mas
                lembre-se, existem vários fatores que podem influenciar essa
                quantidade. Na duvida use a calculadora
              </p>

              <h3 className="text-red-500 flex items-center gap-2">
                <span className="text-xl">🎉</span>
                2. Avaliando o Tipo de Evento
              </h3>

              <p>
                O tipo de evento é o primeiro fator a considerar. Nem todo churrasco
                é igual, certo?
              </p>

              <p>
                <strong className="text-red-600"> - Degustação:</strong> Um evento
                rápido, que serve como aperitivo ou encerramento de outro evento.
                Neste caso, 200 a 300 gramas por pessoa são suficientes.
              </p>

              <p>
                <strong className="text-red-600">
                  {" "}
                  - Almoço ou Jantar Prolongado:
                </strong>{" "}
                Aqui, estamos falando de um evento que dura entre 4 a 5 horas. A
                quantidade recomendada aumenta para 400 a 500 gramas por
                participante.
              </p>

              <p>
                <strong className="text-red-600">
                  {" "}
                  - Churrasco sem Hora para Acabar:
                </strong>{" "}
                O famoso churrasco de fim de semana que começa ao meio-dia e só
                termina... bem, quando o último resistente se rende. Neste cenário,
                esteja preparado com 500 a 600 gramas por pessoa.
              </p>

              <h3 className="text-red-500 flex items-center gap-2">
                <span className="text-xl">👥</span>
                3. Quem Vem para o Churrasco?
              </h3>

              <p>
                A composição do grupo também influencia na quantidade de carne
                necessária:
              </p>

              <p>
                <strong className="text-red-600">
                  Maioria de Mulheres e Crianças:
                </strong>{" "}
                Geralmente, esse grupo consome menos carne, então você pode reduzir
                a conta em cerca de 100 gramas por pessoa.
              </p>

              <p>
                <strong className="text-red-600">Maioria de Homens Adultos:</strong>{" "}
                Principalmente se forem amigos reunidos para assistir ao jogo,
                adicione de 100 a 200 gramas extras por pessoa à sua estimativa
                inicial.
              </p>

              <h3 className="text-red-500 flex items-center gap-2">
                <span className="text-xl">🥗</span>
                4. Os Acompanhamentos
              </h3>

              <p>
                Os acompanhamentos podem fazer você economizar ou precisar de mais
                carne. Quanto mais variados e substanciais eles forem, menos carne
                você precisará.
              </p>

              <p>
                <strong className="text-red-600">
                  Almoço Completo com Acompanhamentos:
                </strong>{" "}
                Se vai ter salada, maionese, vinagrete, pão de alho, entre outros,
                você pode reduzir a carne em cerca de 100 gramas por pessoa.
              </p>

              <p>
                <strong className="text-red-600">Churrasco Básico:</strong> Se
                pretende manter tudo simples, talvez só com um vinagrete e pãozinho,
                considere adicionar mais 100 gramas de carne na sua conta.
              </p>

              <h3 className="text-red-500 flex items-center gap-2">
                <span className="text-xl">💎</span>
                5. Dicas de Ouro Para o Sucesso do Churrasco
              </h3>

              <p>
                <strong className="text-red-600">Variedade de Cortes:</strong>{" "}
                Ofereça diferentes tipos de carnes. Isso agrada a vários paladares e
                ajuda a equilibrar o consumo.
              </p>

              <p>
                <strong className="text-red-600">Bebidas e Entradas:</strong>{" "}
                Aperitivos e bebidas podem influenciar na quantidade de carne
                consumida. O ideal é ter um equilíbrio.
              </p>

              <p>
                <strong className="text-red-600">Sobras:</strong> Melhor sobrar do
                que faltar. Se tiver sobras, existem várias receitas deliciosas para
                aproveitar a carne do churrasco no dia seguinte.
              </p>

              <h3 className="text-red-500 flex items-center gap-2">
                <span className="text-xl">✅</span>
                Conclusão
              </h3>

              <p>
                A arte de calcular a quantidade de carne para churrasco exige um
                pouco de prática e conhecimento sobre os seus convidados. Com as
                dicas acima, você estará bem-preparado para fazer um churrasco
                memorável, sem desperdícios ou a frustrante situação de ficar sem
                carne. Lembre-se, o segredo está no planejamento e na adaptação às
                necessidades específicas do seu evento e convidados.
              </p>

              <h3 className="text-red-500 flex items-center gap-2">
                <span className="text-xl">❓</span>
                FAQ
              </h3>

              <h4 className="text-red-500">
                E se eu estiver fazendo um churrasco misto com frango e carne?
              </h4>
              <p>
                A regra dos 400 gramas ainda se aplica, mas você pode dividir entre
                os tipos de carnes. Por exemplo, 200 gramas de carne bovina e 200
                gramas de frango por pessoa.
              </p>

              <h4 className="text-red-500">
                Como calcular a quantidade de carvão?
              </h4>
              <p>
                Uma boa regra é usar 1,5 kg de carvão para cada kg de carne. Isso
                pode variar conforme o tipo de churrasqueira e a duração do
                churrasco.
              </p>

              <h4 className="text-red-500">E as bebidas, como calcular?</h4>
              <p>
                Considere uma média de 1,5 a 2 litros de bebida por pessoa para um
                churrasco de longa duração. Isso inclui água, refrigerante e álcool.
              </p>
            </div>
          </div>

          {/* Suggested Posts Section */}
          <div className="w-full mt-16 md:mt-20 mb-12">
            <SuggestedPosts count={3} />
          </div>
        </main>
      </div>

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
