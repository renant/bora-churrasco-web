'use client'

import BovinaIcon from '@/components/icons/bovina-icon'
import FrangoIcon from '@/components/icons/frango-icon'
import LinguicaIcon from '@/components/icons/linguica-icon'
import PaoDeAlhoIcon from '@/components/icons/pao-de-alho-icon'
import QueijoIcon from '@/components/icons/queijo-icon'
import SuinaIcon from '@/components/icons/suina-icon'
import { buttonVariants } from '@/components/ui/button'
import CheckButton from '@/components/ui/check-button'
import churrascoStore from '@/lib/churrascoStore'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Assados() {
  const router = useRouter()

  const {
    bovina,
    changeBovina,
    suina,
    changeSuina,
    linguica,
    changeLinguica,
    frango,
    changeFrango,
    queijo,
    changeQueijo,
    paoDeAlho,
    changePaoDeAlho,
    temAssados,
    temParticipantes,
  } = churrascoStore()

  useEffect(() => {
    if (!temParticipantes()) {
      router.push('/')
    }
  }, [router, temParticipantes])

  if (!temParticipantes()) {
    return <></>
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-16">
        <div className="flex flex-col items-center">
          <h2 className="mb-2 text-center text-lg leading-relaxed text-orange-300 md:text-3xl md:leading-snug">
            Agora vamos escolher os seus assados
          </h2>
          <div className="mt-4 max-w-sm">
            <div className="flex flex-row items-center">
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                <CheckButton
                  isChecked={bovina}
                  description="Bovina"
                  onClick={() => changeBovina()}
                >
                  <BovinaIcon size={50} />
                </CheckButton>
                <CheckButton
                  isChecked={suina}
                  description="Suina"
                  onClick={() => changeSuina()}
                >
                  <SuinaIcon size={50} />
                </CheckButton>
                <CheckButton
                  isChecked={linguica}
                  description="Linguiça"
                  onClick={() => changeLinguica()}
                >
                  <LinguicaIcon size={50} />
                </CheckButton>
                <CheckButton
                  isChecked={frango}
                  description="Frango"
                  onClick={() => changeFrango()}
                >
                  <FrangoIcon size={50} />
                </CheckButton>
                <CheckButton
                  isChecked={queijo}
                  description="Queijo"
                  onClick={() => changeQueijo()}
                >
                  <QueijoIcon size={50} />
                </CheckButton>
                <CheckButton
                  isChecked={paoDeAlho}
                  description="Pão de Alho"
                  onClick={() => changePaoDeAlho()}
                >
                  <PaoDeAlhoIcon className="mr-2" size={50} />
                </CheckButton>
              </div>
            </div>
          </div>
        </div>
        <div className="pb-60">
          {temAssados() && (
            <Link
              className={buttonVariants({ variant: 'outline' })}
              href="/bebidas"
            >
              Avançar
            </Link>
          )}
        </div>
      </main>
    </>
  )
}
