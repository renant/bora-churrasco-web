import Faq from '@/components/ui/faq'
import { Guide } from '@/components/ui/guide'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
  return (
    <main>
      <div className="container relative mx-auto mb-20 min-h-screen pt-8 md:pt-40">
        <section>
          <div className="text-white">
            <div className="container mx-auto flex flex-col items-center lg:flex-row">
              <div className="flex w-full flex-col items-start justify-center p-4 md:p-8 lg:w-1/3">
                <h1 className="tracking-loose hidden text-xl text-orange-300 md:block md:text-xl">
                  Calculadora de Churrasco - Bora Churrasco
                </h1>
                <h3 className="mb-2 mt-8 text-3xl leading-relaxed md:mt-0 md:text-5xl md:leading-snug">
                  Seu app Android para calcular churrasco
                </h3>
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
                        src="/google-play-badge.png"
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="mb-6 ml-0  flex w-full justify-center p-8 md:mb-0 md:ml-12 md:mt-0 md:w-1/2  lg:w-2/3">
                <div>
                  <Image
                    className="inline-block w-full p-8 md:mt-0 md:p-0 lg:w-1/2 xl:w-2/3"
                    src="/app-sample.png"
                    placeholder="blur"
                    blurDataURL="/blur-image.png"
                    alt="Calculadora de Churrasco do Bora Churrasco"
                    width={300}
                    height={200}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="absolute bottom-0 left-0 w-full pb-8">
          <Link
            className="flex flex-col items-center justify-center font-bold text-orange-400"
            href="#content"
          >
            <p>Confira nossos conteúdos</p>
            <svg
              width="30"
              height="30"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </Link>
        </div>
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
      </div>
    </main>
  )
}
