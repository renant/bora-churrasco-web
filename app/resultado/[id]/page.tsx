import JsonLd from '@/components/JsonLd';
import Result from '@/components/ui/result';
import { getRandomAdsContent } from '@/services/ad-service';
import Image from 'next/image';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const participante = parseInt(params.id)

  const url = `https://www.borachurrasco.app/resultado/${participante}`;


  return {
    title: `Cálculo De Churrasco Para ${participante} Pessoas`,
    description: `Lista de compras e calculo estimado para um churrasco de ${participante} pessoas`,
    alternates: {
      canonical: url,
    },
    keywords: ['Calculadora de Churraso', 'Churrasco', 'Calculadora'],
    images: [
      {
        url: 'https://www.borachurrasco.app/images/ms-icon-310x310.png',
      },
    ],
    openGraph: {
      title: `Cálculo De Churrasco Para ${participante} Pessoas`,
      description: `Lista de compras e calculo estimado para um churrasco de ${participante} pessoas`,
      url: url,
      images: [
        {
          url: 'https://www.borachurrasco.app/images/ms-icon-310x310.png',
        },
      ],
      locale: 'pt_BR',
      type: 'website',
    },
  }
}

export async function generateStaticParams() {
  return [
    { id: '5' },
    { id: '10' },
    { id: '15' },
    { id: '20' },
    { id: '25' },
    { id: '30' },
    { id: '35' },
    { id: '40' },
    { id: '45' },
    { id: '50' },
    { id: '55' },
    { id: '60' },
    { id: '65' },
    { id: '70' },
    { id: '75' },
    { id: '80' },
    { id: '85' },
    { id: '90' },
    { id: '95' },
    { id: '100' },
  ]
}

export default async function Resultado({
  params,
}: {
  params: { id: string }
}) {
  const participante = parseInt(params.id)

  const ads = await getRandomAdsContent()

  return (
    <>
      <main className="flex  flex-col items-center justify-between p-16">
        <h1 className="mb-3 text-center text-lg leading-relaxed text-orange-300 sm:text-4xl md:leading-snug">
          Cálculo De Churrasco Para {participante} Pessoas
        </h1>
        <div className="flex flex-col  md:flex-row">
          <div className="flex flex-col pr-8">
            <Result participantes={participante} />
          </div>
          <div className="wrapper max-w-[300px] overflow-hidden rounded-b-md bg-gray-50  shadow-lg">
            <div>
              <Image src={ads.image} height={400} width={400} alt={ads.alt} />
            </div>
            <div className="p-3">
              <h3 className="text-md m-0 font-semibold text-gray-700">
                {ads.alt}
              </h3>
              <p className="leading-sm text-sm text-gray-900">
                {ads.description}
              </p>
            </div>
            <a href={ads.link} target="_blanck" className="no-underline">
              <button className="flex w-full justify-center bg-red-600 py-2 font-semibold text-white transition duration-300 hover:bg-red-500">
                Adquira já
              </button>
            </a>
          </div>
        </div>
        <div className='prose prose-orange mt-4'>
          <h2>Como Calcular a Quantidade de Carne para o Churrasco Perfeito</h2>
          <p>Churrasco é sinônimo de alegria, confraternização e claro, de uma boa carne assada. Mas, quantas vezes você já se pegou na dúvida sobre a quantidade de carne a comprar para seu churrasco? Faltou carne ou sobrou muito, e agora? Não se preocupe! Este artigo é o seu guia definitivo para nunca mais errar na quantidade de carne para churrasco. Preparado? Então, vamos nessa!</p>
          <h3>1. Entendendo o Básico: A Regra dos 400g</h3>
          <p>Para começar, temos uma regra básica muito simples: considere 400 gramas de carne por pessoa. Essa é uma boa medida inicial, mas lembre-se, existem vários fatores que podem influenciar essa quantidade. Na duvida use a calculadora <a href=''></a></p>


          <h3>2. Avaliando o Tipo de Evento</h3>

          <p>O tipo de evento é o primeiro fator a considerar. Nem todo churrasco é igual, certo?</p>

          <p><strong className='text-orange-400'> - Degustação:</strong> Um evento rápido, que serve como aperitivo ou encerramento de outro evento. Neste caso, 200 a 300 gramas por pessoa são suficientes.</p>

          <p><strong className='text-orange-400'> - Almoço ou Jantar Prolongado:</strong> Aqui, estamos falando de um evento que dura entre 4 a 5 horas. A quantidade recomendada aumenta para 400 a 500 gramas por participante.</p>

          <p><strong className='text-orange-400'> - Churrasco sem Hora para Acabar:</strong> O famoso churrasco de fim de semana que começa ao meio-dia e só termina... bem, quando o último resistente se rende. Neste cenário, esteja preparado com 500 a 600 gramas por pessoa.</p>

          <h3>3. Quem Vem para o Churrasco?</h3>

          <p>A composição do grupo também influencia na quantidade de carne necessária:</p>

          <p><strong className='text-orange-400'>Maioria de Mulheres e Crianças:</strong> Geralmente, esse grupo consome menos carne, então você pode reduzir a conta em cerca de 100 gramas por pessoa.</p>

          <p><strong className='text-orange-400'>Maioria de Homens Adultos:</strong> Principalmente se forem amigos reunidos para assistir ao jogo, adicione de 100 a 200 gramas extras por pessoa à sua estimativa inicial.</p>

          <h3>4. Os Acompanhamentos</h3>

          <p>Os acompanhamentos podem fazer você economizar ou precisar de mais carne. Quanto mais variados e substanciais eles forem, menos carne você precisará.</p>

          <p><strong className='text-orange-400'>Almoço Completo com Acompanhamentos:</strong> Se vai ter salada, maionese, vinagrete, pão de alho, entre outros, você pode reduzir a carne em cerca de 100 gramas por pessoa.</p>

          <p><strong className='text-orange-400'>Churrasco Básico:</strong> Se pretende manter tudo simples, talvez só com um vinagrete e pãozinho, considere adicionar mais 100 gramas de carne na sua conta.</p>

          <h3>5. Dicas de Ouro Para o Sucesso do Churrasco</h3>

          <p><strong className='text-orange-400'>Variedade de Cortes:</strong> Ofereça diferentes tipos de carnes. Isso agrada a vários paladares e ajuda a equilibrar o consumo.</p>

          <p><strong className='text-orange-400'>Bebidas e Entradas:</strong> Aperitivos e bebidas podem influenciar na quantidade de carne consumida. O ideal é ter um equilíbrio.</p>

          <p><strong className='text-orange-400'>Sobras:</strong> Melhor sobrar do que faltar. Se tiver sobras, existem várias receitas deliciosas para aproveitar a carne do churrasco no dia seguinte.</p>

          <h3>Conclusão</h3>

          <p>A arte de calcular a quantidade de carne para churrasco exige um pouco de prática e conhecimento sobre os seus convidados. Com as dicas acima, você estará bem-preparado para fazer um churrasco memorável, sem desperdícios ou a frustrante situação de ficar sem carne. Lembre-se, o segredo está no planejamento e na adaptação às necessidades específicas do seu evento e convidados.</p>

          <h3>FAQ</h3>

          <h4>E se eu estiver fazendo um churrasco misto com frango e carne?</h4>
          <p>A regra dos 400 gramas ainda se aplica, mas você pode dividir entre os tipos de carnes. Por exemplo, 200 gramas de carne bovina e 200 gramas de frango por pessoa.</p>

          <h4>Como calcular a quantidade de carvão?</h4>
          <p>Uma boa regra é usar 1,5 kg de carvão para cada kg de carne. Isso pode variar conforme o tipo de churrasqueira e a duração do churrasco.</p>

          <h4>E as bebidas, como calcular?</h4>
          <p>Considere uma média de 1,5 a 2 litros de bebida por pessoa para um churrasco de longa duração. Isso inclui água, refrigerante e álcool.</p>
        </div>

        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": `Cálculo De Churrasco Para ${participante} Pessoas`,
          "description": `Lista de compras e calculo estimado para um churrasco de ${participante} pessoas`,
          "datePublished": new Date().toISOString(),
          "author": {
            "@type": "Person",
            "name": "Bora Churrasco"
          },
          "image": ["https://www.borachurrasco.app/images/ms-icon-310x310.png"],
          "publisher": {
            "@type": "Organization",
            "name": "Bora Churrasco",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.borachurrasco.app/images/ms-icon-310x310.png"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://www.borachurrasco.app/resultado/${participante}`
          }
        }} />
      </main>

    </>
  )
}
