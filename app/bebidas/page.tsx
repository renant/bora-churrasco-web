'use client'

import AguaIcon from '@/components/icons/agua-icon'
import CervejaIcon from '@/components/icons/cerveja-icon'
import RefrigeranteIcon from '@/components/icons/refrigerante-icon'
import SucoIcon from '@/components/icons/suco-icon'
import { buttonVariants } from '@/components/ui/button'
import CheckButton from '@/components/ui/check-button'
import churrascoStore from '@/lib/churrascoStore'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Assados() {
  const router = useRouter()

  const {
    agua,
    changeAgua,
    cerveja,
    changeCerveja,
    suco,
    changeSuco,
    refrigerante,
    changeRefrigerante,
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
            Escolha agora as bebidas do seu churrasco
          </h2>
          <div className="mt-4 max-w-sm">
            <div className="flex flex-row items-center">
              <div className="grid grid-cols-2 gap-3">
                <CheckButton
                  isChecked={cerveja}
                  description="Cerveja"
                  onClick={() => changeCerveja()}
                >
                  <CervejaIcon size={50} />
                </CheckButton>
                <CheckButton
                  isChecked={agua}
                  description="Água"
                  onClick={() => changeAgua()}
                >
                  <AguaIcon size={50} />
                </CheckButton>
                <CheckButton
                  isChecked={suco}
                  description="Suco"
                  onClick={() => changeSuco()}
                >
                  <SucoIcon size={50} />
                </CheckButton>
                <CheckButton
                  isChecked={refrigerante}
                  description="Refrigerante"
                  onClick={() => changeRefrigerante()}
                >
                  <RefrigeranteIcon size={50} />
                </CheckButton>
              </div>
            </div>
          </div>
        </div>
        <div className="pb-60">
          <Link
            className={buttonVariants({ variant: 'outline' })}
            href="/tempo"
          >
            Avançar
          </Link>
        </div>
      </main>
    </>
  )
}
