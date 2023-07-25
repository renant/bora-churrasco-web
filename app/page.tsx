import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between md:p-24">
        <section>
          <div className="text-white">
            <div className="container mx-auto flex flex-col md:flex-row items-center">
              <div className="flex flex-col w-full lg:w-1/3 justify-center items-start p-4 md:p-8">
                <h1 className="text-3xl md:text-5xl text-orange-300 tracking-loose">Bora Churrasco</h1>
                <h2 className="text-3xl md:text-5xl leading-relaxed md:leading-snug mb-2">Seu app Android para calcular churrasco
                </h2>
                <p className="text-sm md:text-base text-gray-50 mb-4">Churrascômetro, uma calculadora ideal para para não deixa que seu churrasco falte nada.</p>
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
              <div className="flex p-8  mb-6 md:mb-0 md:mt-0 ml-0 md:ml-12 lg:w-2/3  justify-center">
                <div>
                  <Image className="inline-block md:mt-0 p-8 md:p-0" src="/app-sample.png" alt="Foto do aplicativo" width={300} height={200} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <div className="container mx-auto mb-20 grid grid-cols-1 gap-2 md:gap-8">
        <p className="text-jusitfy text-orange-400 font-light">
          Bora Churrasco é uma ferramenta incrível no estilo churrascômetro, uma calculadora perfeita para garantir o sucesso absoluto do seu churrasco, sem deixar faltar absolutamente nada.
        </p>

        <p className="text-jusitfy text-orange-400 font-light">
          Aqui está como funciona: você fornece o número de participantes do seu churrasco, seleciona os pratos e bebidas desejados, e pronto! Você receberá uma lista de compras completa e detalhada, que pode facilmente ser compartilhada com seus convidados ou usada para uma nova análise, se necessário.
        </p>

        <p className="text-jusitfy text-orange-400 font-light">
          O aplicativo também possui uma seção de receitas e a capacidade de personalizar a lista de compras com as quantidades desejadas.
        </p>

        <h4 className="text-3xl text-orange-400 font-extrabold">FAQ</h4>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Porque não calcular também o preço estimado?</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 gap-2 text-orange-400 text-justify font-light">
                <p>Porque o preço varia muito de região para região, e também depende muito da qualidade dos produtos escolhidos. Por isso, preferimos deixar essa parte com você.</p>
                <p>Você também pode encontrar outros app na store com essa proposta mais complexa, por hora pensamos na simplicidade do processo.</p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Alguma previsão para o lancamento para IOS?</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 gap-2 text-orange-400 text-justify font-light">
                <p>No momento não temos uma previsão para o lançamento para IOS, mas estamos trabalhando para que isso aconteça o mais breve possível
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Como funciona o calculo?</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 gap-2 text-orange-400 text-justify font-light">
                <p>
                  O cálculo é fundamentado em uma média de consumo de cada participante. Por exemplo, um homem costuma consumir em média 400g de carne, uma mulher 300g e uma criança 200g. Com base nisso, o aplicativo calcula a quantidade necessária de cada item para a compra.
                </p>
                <p>
                  No caso das cervejas, o cálculo leva em conta o total de adultos presentes. Para cada adulto, é calculada uma média de 1L de cerveja. Quanto aos refrigerantes e sucos, considera-se uma média de 600ml por pessoa, e para a água, 200ml por pessoa.
                </p>
                <p>
                  Além disso, o cálculo também considera a duração do churrasco. A cada duas horas além das 4 horas, é adicionado um fator multiplicador de 0,2 aos itens consumíveis.
                </p>
                <p>
                  Essas estimativas são baseadas em estudos e pesquisas realizadas para determinar as médias, mas, naturalmente, podem variar de acordo com as particularidades do seu churrasco.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div >
    </>
  )
}
