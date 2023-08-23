import Faq from '@/components/ui/faq'
import { Guide } from '@/components/ui/guide'
import { Posts } from '@/components/ui/posts'
import { Recipes } from '@/components/ui/recipes'
import Image from 'next/image'
import Link from 'next/link'

export const revalidate = 900

export default function Home() {
  return (
    <>
      <main className="container relative mx-auto mb-20 min-h-screen pt-8 md:pt-40">
        <section>
          <div className="text-white">
            <div className="container mx-auto flex flex-col items-center lg:flex-row">
              <div className="flex w-full flex-col items-start justify-center p-4 md:p-8 lg:w-1/3">
                <h1 className="tracking-loose hidden text-3xl text-orange-300 md:block md:text-5xl">
                  Bora Churrasco - Calculadora de Churrasco
                </h1>
                <h3 className="mb-2 mt-8 text-3xl leading-relaxed md:mt-0 md:text-5xl md:leading-snug">
                  Seu app Android para calcular churrasco
                </h3>
                <p className="mb-4 text-sm text-gray-50 md:text-base">
                  Churrascômetro (Calculadora de Churrasco), uma calculadora
                  ideal para para não deixa que seu churrasco falte nada.
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
                    alt="Foto do aplicativo"
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
            href="#receitas"
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
      </main>
      <div className="container mx-auto mb-20 grid grid-cols-1 gap-2 md:gap-8">
        <div className="prose prose-orange max-w-none">
          <p>
            Bora Churrasco é uma ferramenta incrível no estilo churrascômetro
            (Calculadora de Churrasco), uma calculadora perfeita para garantir o
            sucesso absoluto do seu churrasco, sem deixar faltar absolutamente
            nada.
          </p>

          <p>
            A Calculadora de Churrasco é uma poderosa aliada para garantir o
            sucesso do seu evento, pois fornece informações precisas e
            detalhadas para calculadora churrasco por pessoa, permitindo que
            você faça ajustes de acordo com as particularidades do seu
            churrasco.
          </p>

          <p>
            Aqui está como funciona: você fornece o número de participantes do
            seu churrasco, seleciona os pratos e bebidas desejados, e pronto!
            Você receberá uma lista de compras completa e detalhada, que pode
            facilmente ser compartilhada com seus convidados ou usada para uma
            nova análise, se necessário.
          </p>

          <p>
            O aplicativo também possui uma seção de receitas e a capacidade de
            personalizar a lista de compras com as quantidades desejadas.
          </p>
        </div>

        <div id="receitas"></div>
        <Recipes />
        <Posts />
        <Guide />
        <Faq />
      </div>
    </>
  )
}
