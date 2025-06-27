import JsonLd from "@/components/JsonLd";
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
    <>
      <main className="flex flex-col items-center justify-between w-full max-w-7xl mx-auto md:p-16 p-4">
        <h1 className="mb-3 text-center text-lg leading-relaxed text-red-500 sm:text-4xl md:leading-snug">
          Cálculo De Churrasco Para {participante} Pessoas
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-center w-full gap-8">
          <ResultDefault participantes={participante} />
        </div>
        <div className="prose prose-base mt-8 w-full max-w-3xl">
          <h2 className="text-red-500">
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
          <h3 className="text-red-500">
            1. Entendendo o Básico: A Regra dos 400g
          </h3>
          <p>
            Para começar, temos uma regra básica muito simples: considere 400
            gramas de carne por pessoa. Essa é uma boa medida inicial, mas
            lembre-se, existem vários fatores que podem influenciar essa
            quantidade. Na duvida use a calculadora
          </p>

          <h3 className="text-red-500">2. Avaliando o Tipo de Evento</h3>

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

          <h3 className="text-red-500">3. Quem Vem para o Churrasco?</h3>

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

          <h3 className="text-red-500">4. Os Acompanhamentos</h3>

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

          <h3 className="text-red-500">
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

          <h3 className="text-red-500">Conclusão</h3>

          <p>
            A arte de calcular a quantidade de carne para churrasco exige um
            pouco de prática e conhecimento sobre os seus convidados. Com as
            dicas acima, você estará bem-preparado para fazer um churrasco
            memorável, sem desperdícios ou a frustrante situação de ficar sem
            carne. Lembre-se, o segredo está no planejamento e na adaptação às
            necessidades específicas do seu evento e convidados.
          </p>

          <h3 className="text-red-500">FAQ</h3>

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
      </main>
    </>
  );
}
