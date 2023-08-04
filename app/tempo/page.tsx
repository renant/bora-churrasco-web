'use client'

import { buttonVariants } from '@/components/ui/button'
import CheckButton from '@/components/ui/check-button'
import Tempo from '@/enum/tempo-enum'
import churrascoStore from '@/lib/churrascoStore'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function TempoPage() {
  const router = useRouter()

  const { tempo, setTempo, temParticipantes } = churrascoStore()

  useEffect(() => {
    if (!temParticipantes()) {
      router.push('/')
    }
  }, [temParticipantes, router])

  if (!temParticipantes()) {
    return <></>
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-16">
        <div className="flex flex-col items-center">
          <h2 className="mb-2 text-center text-lg leading-relaxed text-orange-300 md:text-3xl md:leading-snug">
            Diga aproximadamente o tempo do seu churrasco
          </h2>
          <div className="mt-4 max-w-sm">
            <div className="flex flex-row items-center">
              <div className="grid grid-cols-2 gap-3">
                <CheckButton
                  isChecked={tempo === Tempo.quatroHoras}
                  description="Até 4 horas"
                  onClick={() => setTempo(Tempo.quatroHoras)}
                >
                  <h2 className="text-5xl text-orange-400">4h</h2>
                </CheckButton>
                <CheckButton
                  isChecked={tempo === Tempo.seisHoras}
                  description="Até 6 horas"
                  onClick={() => setTempo(Tempo.seisHoras)}
                >
                  <h2 className="text-5xl text-orange-400">6h</h2>
                </CheckButton>
                <CheckButton
                  isChecked={tempo === Tempo.oitoHoras}
                  description="Até 8 horas"
                  onClick={() => setTempo(Tempo.oitoHoras)}
                >
                  <h2 className="text-5xl text-orange-400">8h</h2>
                </CheckButton>
                <CheckButton
                  isChecked={tempo === Tempo.dozeOuMaisHoras}
                  description="12 horas ou mais"
                  onClick={() => setTempo(Tempo.dozeOuMaisHoras)}
                >
                  <h2 className="text-5xl text-orange-400">12h</h2>
                </CheckButton>
              </div>
            </div>
          </div>
        </div>
        <div className="pb-60">
          <Link
            className={buttonVariants({ variant: 'outline' })}
            href="/resultado"
          >
            Avançar
          </Link>
        </div>
      </main>
    </>
  )
}
