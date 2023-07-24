"use client"

import CriancaIcon from "@/components/icons/crianca-icon";
import HomemIcon from "@/components/icons/homem-icon";
import MulherIcon from "@/components/icons/mulher-icon";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import churrascoStore from "@/lib/churrascoStore";
import Link from "next/link";

export default function Assados() {
  const {
    homens,
    setHomens,
    mulheres,
    setMulheres,
    criancas,
    setCriancas,
    temParticipantes
  } = churrascoStore();

  return <>
    <main className="flex min-h-screen flex-col items-center p-16 justify-between">
      <div className="flex flex-col items-center">
        <h2 className="text-lg md:text-3xl leading-relaxed md:leading-snug mb-2 text-orange-300 text-center">Vamos começar com o número de participantes</h2>
        <div className="max-w-sm mt-4">
          <div className="flex flex-row items-center">
            <div className="w-20 h-20 pr-4 flex items-center justify-center">
              <HomemIcon size={50} />
            </div>
            <Input onChange={
              (e) => {
                setHomens(parseInt(e.target.value));
              }
            }
              value={homens == 0 ? undefined : homens}
              className="mr-auto bg-transparent text-orange-400 border-orange-400 placeholder-orange-100 placeholder-opacity-40" placeholder="Participantes homens" type="number" />
          </div>
          <div className="flex flex-row items-center">
            <div className="w-20 h-20 pr-4 flex items-center justify-center">
              <MulherIcon size={40} />
            </div>
            <Input
              onChange={
                (e) => {
                  setMulheres(parseInt(e.target.value));
                }
              }
              value={mulheres == 0 ? undefined : mulheres}
              className="bg-transparent text-orange-400 border-orange-400 placeholder-orange-100 placeholder-opacity-40" placeholder="Participantes mulheres" type="number" />
          </div>
          <div className="flex flex-row items-center">
            <div className="w-20 h-20 pr-4 flex items-center justify-center">
              <CriancaIcon size={40} />
            </div>
            <Input
              onChange={
                (e) => {
                  setCriancas(parseInt(e.target.value));
                }
              }
              value={criancas == 0 ? undefined : criancas}
              className="bg-transparent text-orange-400 border-orange-400 placeholder-orange-100 placeholder-opacity-40" placeholder="Participantes crianças" type="number" />
          </div>
        </div>
      </div>
      <div className="pb-60">
        {temParticipantes() && <Link className={buttonVariants({ variant: "outline" })} href={""}>Avançar</Link>}
      </div>
    </main>
  </>
}