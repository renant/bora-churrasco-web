"use client"

import { buttonVariants } from "@/components/ui/button";
import churrascoStore from "@/lib/churrascoStore";
import Link from "next/link";
import { useEffect } from "react";

export default function Assados() {

  const {
    getTempo,
    calcular,
    assadosCalculados,
    bebidasCalculadas
  } = churrascoStore();

  useEffect(() => {
    calcular();
  }, []);

  return <>
    <main className="flex min-h-screen flex-col items-center p-16 justify-between">
      <div className="flex flex-col items-center">
        <h2 className="text-lg sm:text-4xl leading-relaxed md:leading-snug mb-2 text-orange-300 text-center">
          Lista de Compras!
        </h2>
        <h3 className="text-md md:text-lg leading-relaxed md:leading-snug mb-2 text-orange-300 text-center">
          Lembrando que o resultado é estimado para até {getTempo()} de comes e bebes
        </h3>
        <h4 className="text-sm md:text-md font-thin md:leading-snug mb-2 text-orange-300 text-center">
          (Isso é uma estimativa a quantidade pode variar, conheça seus convidados)
        </h4>
        <div className="max-w-sm mt-4">
          <div className="flex flex-col items-center">
            <pre>
              {JSON.stringify(assadosCalculados)}
            </pre>
            <pre>
              {JSON.stringify(bebidasCalculadas)}
            </pre>
          </div>
        </div>
      </div>
      <div className="pb-60">
        <Link className={buttonVariants({ variant: "outline" })} href="/resultado">Calcular novamente</Link>
      </div>
    </main>
  </>
}