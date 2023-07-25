"use client"

import { buttonVariants } from "@/components/ui/button";
import CheckButton from "@/components/ui/check-button";
import Tempo from "@/enum/tempo-enum";
import churrascoStore from "@/lib/churrascoStore";
import Link from "next/link";

export default function Assados() {
  const {
    tempo,
    setTempo,
  } = churrascoStore();

  return <>
    <main className="flex min-h-screen flex-col items-center p-16 justify-between">
      <div className="flex flex-col items-center">
        <h2 className="text-lg md:text-3xl leading-relaxed md:leading-snug mb-2 text-orange-300 text-center">
          Diga aproximadamente o tempo do seu churrasco
        </h2>
        <div className="max-w-sm mt-4">
          <div className="flex flex-row items-center">
            <div className="grid gap-3 grid-cols-2">
              <CheckButton
                isChecked={tempo == Tempo.quatroHoras}
                description="Até 4 horas"
                onClick={() => setTempo(Tempo.quatroHoras)}>
                <h2 className="text-orange-400 text-5xl">4h</h2>
              </CheckButton>
              <CheckButton
                isChecked={tempo == Tempo.seisHoras}
                description="Até 6 horas"
                onClick={() => setTempo(Tempo.seisHoras)}>
                <h2 className="text-orange-400 text-5xl">6h</h2>
              </CheckButton>
              <CheckButton
                isChecked={tempo == Tempo.oitoHoras}
                description="Até 8 horas"
                onClick={() => setTempo(Tempo.oitoHoras)}>
                <h2 className="text-orange-400 text-5xl">8h</h2>
              </CheckButton>
              <CheckButton
                isChecked={tempo == Tempo.dozeOuMaisHoras}
                description="12 horas ou mais"
                onClick={() => setTempo(Tempo.dozeOuMaisHoras)}>
                <h2 className="text-orange-400 text-5xl">12h</h2>
              </CheckButton>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-60">
        <Link className={buttonVariants({ variant: "outline" })} href="/resultado">Avançar</Link>
      </div>
    </main>
  </>
}