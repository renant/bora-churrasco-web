
import Faq from "@/components/ui/faq";
import { Guide } from "@/components/ui/guide";
import { Recipes } from "@/components/ui/recipes";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <>
      <main className="flex min-h-screen container mx-auto mb-20 md:pt-40">
        <section>
          <div className="text-white">
            <div className="container mx-auto flex flex-col lg:flex-row items-center">
              <div className="flex flex-col w-full lg:w-1/3 justify-center items-start p-4 md:p-8">
                <h1 className="text-3xl md:text-5xl text-orange-300 tracking-loose hidden md:block">Bora Churrasco</h1>
                <h2 className="text-3xl md:text-5xl leading-relaxed md:leading-snug mb-2 mt-8 md:mt-0">Seu app Android para calcular churrasco
                </h2>
                <p className="text-sm md:text-base text-gray-50 mb-4">Churrascômetro (Calculadora de Churrasco), uma calculadora ideal para para não deixa que seu churrasco falte nada.</p>
                <div className="flex flex-col md:flex-row justify-center content-center">
                  <div className="flex flex-col justify-center pr-4 min-w-[144px] w-[144px]">
                    <Link href="/participantes"
                      className="bg-transparent hover:bg-orange-300 text-orange-300 hover:text-black rounded shadow hover:shadow-lg py-2 px-4 border border-orange-300 hover:border-transparent">
                      Teste online</Link>
                  </div>
                  <div className="flex flex-col justify-center pr-4 min-w-[144px] w-[144px]">
                    <a href='https://play.google.com/store/apps/details?id=io.ionic.bora.churras&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><Image width={150} height={150} alt='Disponível no Google Play' src='/google-play-badge.png' /></a>
                  </div>
                  <div className="flex flex-col justify-center pr-4 min-w-[144px] w-[144px]">
                    <a href="https://www.buymeacoffee.com/renanteixeira"><img src="https://img.buymeacoffee.com/button-api/?text=Cafezinho&emoji=&slug=renanteixeira&button_colour=FF5F5F&font_colour=ffffff&font_family=Poppins&outline_colour=000000&coffee_colour=FFDD00" /></a>
                  </div>
                </div>
              </div>
              <div className="flex p-8  mb-6 md:mb-0 md:mt-0 ml-0 md:ml-12 w-full md:w-1/2 lg:w-2/3  justify-center">
                <div>
                  <Image className="inline-block w-full lg:w-1/2 xl:w-2/3 md:mt-0 p-8 md:p-0" src="/app-sample.png" alt="Foto do aplicativo" width={300} height={200} />
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <div className="container mx-auto mb-20 grid grid-cols-1 gap-2 md:gap-8">
        <div className="prose max-w-none prose-orange">
          <p>
            Bora Churrasco é uma ferramenta incrível no estilo churrascômetro (Calculadora de Churrasco), uma calculadora perfeita para garantir o sucesso absoluto do seu churrasco, sem deixar faltar absolutamente nada.
          </p>

          <p>
            A Calculadora de Churrasco é uma poderosa aliada para garantir o sucesso do seu evento, pois fornece informações precisas e detalhadas para calculadora churrasco por pessoa, permitindo que você faça ajustes de acordo com as particularidades do seu churrasco.
          </p>

          <p>
            Aqui está como funciona: você fornece o número de participantes do seu churrasco, seleciona os pratos e bebidas desejados, e pronto! Você receberá uma lista de compras completa e detalhada, que pode facilmente ser compartilhada com seus convidados ou usada para uma nova análise, se necessário.
          </p>

          <p>
            O aplicativo também possui uma seção de receitas e a capacidade de personalizar a lista de compras com as quantidades desejadas.
          </p>
        </div>

        <Recipes />
        <Guide />
        <Faq />

      </div >
    </>
  )
}
