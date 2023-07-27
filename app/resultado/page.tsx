"use client"

import { Button, buttonVariants } from "@/components/ui/button";
import churrascoStore from "@/lib/churrascoStore";
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from "react";

enum TipoMedida {
  peso,
  liquido,
}

function getMedida(value: number, tipo: TipoMedida) {
  switch (tipo) {
    case TipoMedida.peso:
      {
        return value! >= 1000 ? `${value / 1000}kg` : `${value}g`;
      }
    case TipoMedida.liquido:
      {
        return value! >= 1000 ? `${value / 1000}L` : `${value}ml`;
      }
  }
}

export default function Resultado() {
  const router = useRouter()

  const {
    getTempo,
    calcular,
    bovina,
    suina,
    linguica,
    frango,
    queijo,
    paoDeAlho,
    temAssados,
    temBebidas,
    cerveja,
    agua,
    refrigerante,
    suco,
    temParticipantes,
    assadosCalculados,
    bebidasCalculadas,
    essenciaisCalculados,
    resetState,
  } = churrascoStore();

  useEffect(() => {
    if (!temParticipantes()) {
      router.push('/');
    } else {
      calcular();
    }
  }, [calcular, temParticipantes, router]);

  const handleCalcularNovamente = useCallback(() => {
    resetState();
    router.push('/');
  }, [resetState, router]);

  if (!temParticipantes()) {
    return <></>;
  }




  return <>
    <main className="flex min-h-screen flex-col items-center p-16 justify-between">
      <div className="flex flex-col">
        <h2 className="text-lg sm:text-4xl leading-relaxed md:leading-snug mb-2 text-orange-300 text-center">
          Lista de Compras!
        </h2>
        <h3 className="text-md md:text-lg leading-relaxed md:leading-snug mb-2 text-orange-300 text-center">
          Lembrando que o resultado é estimado para até {getTempo()} de comes e bebes
        </h3>
        <h4 className="text-sm md:text-md font-thin md:leading-snug mb-2 text-orange-300 text-center">
          (Isso é uma estimativa a quantidade pode variar, conheça seus convidados)
        </h4>

        <div className="flex flex-col items-start mt-4">
          {assadosCalculados &&
            <div>
              <h5 className="text-md md:text-lg leading-relaxed md:leading-snug my-2 text-orange-300">Assados</h5>
              <ul className="list-disc pl-8">
                {bovina && <li className="text-sm md:text-md leading-relaxed md:leading-snug text-orange-300">
                  Bovina: {getMedida(assadosCalculados!.bovina, TipoMedida.peso)}
                </li>}
                {suina && <li className="text-sm md:text-md leading-relaxed md:leading-snug text-orange-300">
                  Suina: {getMedida(assadosCalculados!.suina, TipoMedida.peso)}
                </li>}
                {linguica && <li className="text-sm md:text-md leading-relaxed md:leading-snug text-orange-300">
                  Linguiça: {getMedida(assadosCalculados!.linguica, TipoMedida.peso)}
                </li>}
                {frango && <li className="text-sm md:text-md leading-relaxed md:leading-snug text-orange-300">
                  Frango: {getMedida(assadosCalculados!.frango, TipoMedida.peso)}
                </li>}
                {queijo && <li className="text-sm md:text-md leading-relaxed md:leading-snug text-orange-300">
                  Queijo: {getMedida(assadosCalculados!.queijo, TipoMedida.peso)}
                </li>}
                {paoDeAlho && <li className="text-sm md:text-md leading-relaxed md:leading-snug text-orange-300">
                  Pão de Alho: {getMedida(assadosCalculados!.paoAlho, TipoMedida.peso)}
                </li>}
              </ul>
            </div>
          }

          {temBebidas() && bebidasCalculadas &&
            <div>
              <h5 className="text-md md:text-lg leading-relaxed md:leading-snug my-2 text-orange-300">Bebidas</h5>
              <ul className="list-disc pl-8">
                {cerveja && <li className="text-sm md:text-md leading-relaxed md:leading-snug text-orange-300">
                  Cerveja: {getMedida(bebidasCalculadas!.cerveja, TipoMedida.liquido)}
                </li>}
                {refrigerante && <li className="text-sm md:text-md leading-relaxed md:leading-snug text-orange-300">
                  Refrigerante: {getMedida(bebidasCalculadas!.refrigerante, TipoMedida.liquido)}
                </li>}
                {agua && <li className="text-sm md:text-md leading-relaxed md:leading-snug text-orange-300">
                  Linguiça: {getMedida(bebidasCalculadas!.agua, TipoMedida.liquido)}
                </li>}
                {suco && <li className="text-sm md:text-md leading-relaxed md:leading-snug text-orange-300">
                  Suco: {getMedida(bebidasCalculadas!.suco, TipoMedida.liquido)}
                </li>}
              </ul>
            </div>
          }

          {(temAssados() || temBebidas()) && essenciaisCalculados &&
            <div>
              <h5 className="text-md md:text-lg leading-relaxed md:leading-snug my-2 text-orange-300">Essenciais</h5>
              <ul className="list-disc pl-8">
                {temAssados() && <li className="text-sm md:text-md leading-relaxed md:leading-snug text-orange-300">
                  Sal Grosso: {getMedida(essenciaisCalculados!.salGrosso, TipoMedida.peso)}
                </li>}
                {temAssados() && <li className="text-sm md:text-md leading-relaxed md:leading-snug text-orange-300">
                  Carvão: {getMedida(essenciaisCalculados!.carvao, TipoMedida.peso)}
                </li>}
                {temBebidas() && <li className="text-sm md:text-md leading-relaxed md:leading-snug text-orange-300">
                  Gelo: {getMedida(essenciaisCalculados!.gelo, TipoMedida.peso)}
                </li>}
              </ul>
            </div>
          }

        </div>
      </div>
      <div className="pb-60 flex flex-col justify-center mt-4">
        <Button onClick={() => handleCalcularNovamente()} className={buttonVariants({ variant: "outline" })} >Calcular novamente</Button>
        <div className="flex flex-col justify-center items-center mt-4">
          <h2 className="text-sm md:text-md leading-relaxed md:leading-snug text-orange-300 pb-2">Gostou ? Considere me ajudar com um cafézinho</h2>
          <a href="https://www.buymeacoffee.com/renanteixeira"><img src="https://img.buymeacoffee.com/button-api/?text=Cafezinho&emoji=&slug=renanteixeira&button_colour=FF5F5F&font_colour=ffffff&font_family=Poppins&outline_colour=000000&coffee_colour=FFDD00" /></a>
        </div>
      </div>
    </main>
  </>
}