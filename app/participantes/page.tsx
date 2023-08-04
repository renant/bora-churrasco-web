'use client'

import CriancaIcon from '@/components/icons/crianca-icon'
import HomemIcon from '@/components/icons/homem-icon'
import MulherIcon from '@/components/icons/mulher-icon'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import churrascoStore from '@/lib/churrascoStore'
import Link from 'next/link'

export default function Participantes() {
  const {
    homens,
    setHomens,
    mulheres,
    setMulheres,
    criancas,
    setCriancas,
    temParticipantes,
  } = churrascoStore()

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-16">
        <div className="flex flex-col items-center">
          <h2 className="mb-2 text-center text-lg leading-relaxed text-orange-300 md:text-3xl md:leading-snug">
            Vamos começar com o número de participantes
          </h2>
          <div className="mt-4 max-w-sm">
            <div className="flex flex-row items-center">
              <div className="flex h-20 w-20 items-center justify-center pr-4">
                <HomemIcon size={50} />
              </div>
              <Input
                onChange={(e) => {
                  setHomens(parseInt(e.target.value))
                }}
                value={homens === 0 ? undefined : homens}
                className="mr-auto border-orange-400 bg-transparent text-orange-400 placeholder-orange-100 placeholder-opacity-40"
                placeholder="Participantes homens"
                type="number"
              />
            </div>
            <div className="flex flex-row items-center">
              <div className="flex h-20 w-20 items-center justify-center pr-4">
                <MulherIcon size={40} />
              </div>
              <Input
                onChange={(e) => {
                  setMulheres(parseInt(e.target.value))
                }}
                value={mulheres === 0 ? undefined : mulheres}
                className="border-orange-400 bg-transparent text-orange-400 placeholder-orange-100 placeholder-opacity-40"
                placeholder="Participantes mulheres"
                type="number"
              />
            </div>
            <div className="flex flex-row items-center">
              <div className="flex h-20 w-20 items-center justify-center pr-4">
                <CriancaIcon size={40} />
              </div>
              <Input
                onChange={(e) => {
                  setCriancas(parseInt(e.target.value))
                }}
                value={criancas === 0 ? undefined : criancas}
                className="border-orange-400 bg-transparent text-orange-400 placeholder-orange-100 placeholder-opacity-40"
                placeholder="Participantes crianças"
                type="number"
              />
            </div>
          </div>
        </div>
        <div className="pb-60">
          {temParticipantes() && (
            <Link
              className={buttonVariants({ variant: 'outline' })}
              href="/assados"
            >
              Avançar
            </Link>
          )}
        </div>
      </main>
    </>
  )
}
