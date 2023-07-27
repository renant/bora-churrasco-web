import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faq() {
  return (
    <div className="prose max-w-none prose-orange">
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
    </div>
  )
}