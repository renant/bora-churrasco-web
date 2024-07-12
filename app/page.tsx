import JsonLd from '@/components/JsonLd'
import Faq from '@/components/ui/faq'
import { Guide } from '@/components/ui/guide'
import appSampleImg from '@/public/app-sample.avif'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
  return (
    <main>
      <div className="container relative mx-auto mb-10 min-h-screen pt-8 md:pt-40">
        <section>
          <div className="text-white">
            <div className="container mx-auto flex flex-col items-center lg:flex-row">
              <div className="flex w-full flex-col items-start justify-center p-4 md:p-8 lg:w-1/3">
                <h1 className="tracking-loose hidden text-xl text-orange-300 md:block md:text-xl">
                  Calculadora de Churrasco - Bora Churrasco
                </h1>
                <h2 className="mb-2 mt-8 text-3xl leading-relaxed md:mt-0 md:text-5xl md:leading-snug">
                  Seu app Android para calcular churrasco
                </h2>
                <p className="mb-4 text-sm text-gray-50 md:text-base">
                  calculadora ideal para não deixar que falte nada no seu churrasco
                </p>
                <div className="flex flex-col content-center justify-center md:flex-row">
                  <div className="flex w-[144px] min-w-[144px] flex-col justify-center pr-4">
                    <Link
                      href="/participantes"
                      className="rounded border border-orange-300 bg-transparent px-4 py-2 text-orange-300 shadow hover:border-transparent hover:bg-orange-300 hover:text-black hover:shadow-lg"
                    >
                      Teste online
                    </Link>
                  </div>
                  <div className="flex w-[144px] min-w-[144px] flex-col justify-center pr-4">
                    <a href="https://play.google.com/store/apps/details?id=io.ionic.bora.churras&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
                      <Image
                        width={150}
                        height={150}
                        alt="Disponível no Google Play"
                        src="/google-play-badge.avif"
                        priority
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="md:ml-32 inline-block w-full p-8 md:mt-0 md:p-0 lg:w-1/2 xl:w-2/3 max-w-xs">
                <Image
                  src={appSampleImg}
                  alt="Calculadora de Churrasco do Bora Churrasco"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

      </div>
      <div className="container mx-auto mb-20 grid grid-cols-1 gap-2 md:gap-8">
        <div className="prose prose-orange max-w-none" id="content">
          <h2>Calculadora de Churrasco: Planeje Seu Evento com a Ferramenta do Bora Churrasco</h2>
          <p>
            Descobrir a quantidade certa de comida e bebida para um churrasco pode ser um verdadeiro desafio. Com a exclusiva <strong className='text-orange-400'>Calculadora de Churrasco do Bora Churrasco</strong>, nunca foi tão fácil acertar em cheio no cálculo e garantir que todos os seus convidados saiam satisfeitos. Acompanhe a seguir como nossa ferramenta inovadora em cinco passos pode revolucionar a maneira como você planeja seu churrasco:
          </p>

          <h3>
            Número de Participantes
          </h3>

          <p>O primeiro passo para um planejamento perfeito começa com o número exato de participantes. Nossa calculadora ajusta as proporções garantindo que haja abundância sem desperdícios.</p>

          <h3>
            Escolha de Carnes e Assados
          </h3>

          <p>
            No segundo passo, apresentamos uma variedade rica de carnes e assados, permitindo que você customise seu evento com opções que vão agradar a todos os gostos, desde os apreciadores dos cortes tradicionais até os amantes de novidades no mundo do churrasco.
          </p>

          <h3>
            Seleção de Bebidas
          </h3>

          <p>
            Um bom churrasco também pede uma seleção adequada de bebidas. Dependendo do perfil dos seus convidados e do tempo estimado do evento, ajudamos você a calcular tanto as opções alcoólicas quanto as não alcoólicas.
          </p>

          <h3>
            Tempo Estimado de Churrasco
          </h3>

          <p>
            Ajustar a quantidade de comida e bebida também depende do tempo que você planeja para o seu evento. Nosso sistema considera o tempo estimado do churrasco para garantir que todos estejam bem servidos do início ao fim com a ajuda da <strong className='text-orange-400'>calculadora de churrasco.</strong>
          </p>

          <h3>
            Resultado com Lista de Compras Compartilhável
          </h3>

          <p>
            Por fim, após inserir as informações necessárias, nossa calculadora gera uma lista de compras detalhada, incluindo tudo o que você precisará para o seu evento. O mais incrível? Você pode compartilhá-la facilmente com quem estiver ajudando nos preparativos, seja por e-mail ou aplicativos de mensagens.
          </p>

          <p>
            Com a <strong className='text-orange-400'>Calculadora de Churrasco do Bora Churrasco</strong>, o planejamento do seu evento fica mais simples e eficiente. Nossa ferramenta foi pensada para os entusiastas do churrasco que não querem se preocupar com complexos cálculos e preferem focar no que realmente importa: desfrutar de bons momentos ao lado de amigos e familiares.
          </p>

          <p>
            <strong className='text-orange-400'>Bora Churrasco</strong> não é apenas o destino para quem quer acertar no churrasco; é o começo de uma experiência inesquecível que começa com o planejamento. Explore agora nossa <a href='https://www.borachurrasco.app'>Calculadora de Churrasco</a> e faça do seu próximo evento um sucesso absoluto!
          </p>

          <p>
            <strong className='text-orange-400'>Importante:</strong> Diversos fatores podem impactar o consumo estimado para o seu evento, incluindo o horário da realização, condições climáticas e outros aspectos relevantes.
          </p>
        </div>

        <Guide />
        <Faq />

        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity":
            [
              {
                "@type": "Question",
                "name": "Qual a quantidade de carne para um churrasco?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A quantidade de carne para um churrasco varia conforme o perfil dos convidados e o tempo estimado do evento. Em média, considera-se 400 gramas por homem e 300 gramas por mulher. Para crianças, a quantidade é de 200 gramas."
                }
              },
              {
                "@type": "Question",
                "name": "Como calcular a quantidade de carvão para um churrasco?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Uma boa regra é usar 1,5 kg de carvão para cada kg de carne. Isso pode variar conforme o tipo de churrasqueira e a duração do churrasco."
                }
              },
            ]
        }} />
      </div>
    </main>
  )
}
