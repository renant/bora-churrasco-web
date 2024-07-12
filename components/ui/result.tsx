'use client'
import { Button, buttonVariants } from '@/components/ui/button'
import churrascoStore from '@/lib/churrascoStore'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { Skeleton } from './skeleton'

enum TipoMedida {
  peso,
  liquido,
}

function getMedida(value: number, tipo: TipoMedida) {
  switch (tipo) {
    case TipoMedida.peso: {
      return value! >= 1000 ? `${value / 1000}kg` : `${value}g`
    }
    case TipoMedida.liquido: {
      return value! >= 1000 ? `${value / 1000}L` : `${value}ml`
    }
  }
}

interface ResultProps {
  participantes?: number | undefined
}

export default function Result({ participantes }: ResultProps) {
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
    createDefaultResult,
  } = churrascoStore()

  useEffect(() => {
    if (participantes && participantes > 0) {
      createDefaultResult(participantes)
    }

    if (!temParticipantes()) {
      router.push('/')
    } else {
      calcular()
    }
  }, [calcular, temParticipantes, router, createDefaultResult, participantes])

  const handleCalcularNovamente = useCallback(() => {
    resetState()
    router.push('/')
  }, [resetState, router])

  if (!temParticipantes()) {
    return <div>
      <Skeleton className="md:w-96 md:h-[610px] h-[669px] rounded-xl" />
    </div>
  }

  return (
    <div className='md:w-96 md:h-[610px] h-full'>
      <div className="flex flex-col">
        <h2 className="mb-2 text-center text-lg leading-relaxed text-orange-300 sm:text-4xl md:leading-snug">
          Lista de Compras!
        </h2>
        <h3 className="text-md mb-2 text-center leading-relaxed text-orange-300 md:text-lg md:leading-snug">
          Lembrando que o resultado é estimado para até {getTempo()} de comes e
          bebes
        </h3>
        <h4 className="md:text-md mb-2 text-center text-sm font-thin text-orange-300 md:leading-snug">
          (Isso é uma estimativa a quantidade pode variar, conheça seus
          convidados)
        </h4>

        <div className="mt-4 flex flex-col items-start">
          {assadosCalculados && (
            <div>
              <h5 className="text-md my-2 leading-relaxed text-orange-300 md:text-lg md:leading-snug">
                Assados
              </h5>
              <ul className="list-disc pl-8">
                {bovina && (
                  <li className="md:text-md text-sm leading-relaxed text-orange-300 md:leading-snug">
                    Bovina:{' '}
                    {getMedida(assadosCalculados!.bovina, TipoMedida.peso)}
                  </li>
                )}
                {suina && (
                  <li className="md:text-md text-sm leading-relaxed text-orange-300 md:leading-snug">
                    Suina:{' '}
                    {getMedida(assadosCalculados!.suina, TipoMedida.peso)}
                  </li>
                )}
                {linguica && (
                  <li className="md:text-md text-sm leading-relaxed text-orange-300 md:leading-snug">
                    Linguiça:{' '}
                    {getMedida(assadosCalculados!.linguica, TipoMedida.peso)}
                  </li>
                )}
                {frango && (
                  <li className="md:text-md text-sm leading-relaxed text-orange-300 md:leading-snug">
                    Frango:{' '}
                    {getMedida(assadosCalculados!.frango, TipoMedida.peso)}
                  </li>
                )}
                {queijo && (
                  <li className="md:text-md text-sm leading-relaxed text-orange-300 md:leading-snug">
                    Queijo:{' '}
                    {getMedida(assadosCalculados!.queijo, TipoMedida.peso)}
                  </li>
                )}
                {paoDeAlho && (
                  <li className="md:text-md text-sm leading-relaxed text-orange-300 md:leading-snug">
                    Pão de Alho:{' '}
                    {getMedida(assadosCalculados!.paoAlho, TipoMedida.peso)}
                  </li>
                )}
              </ul>
            </div>
          )}

          {temBebidas() && bebidasCalculadas && (
            <div>
              <h5 className="text-md my-2 leading-relaxed text-orange-300 md:text-lg md:leading-snug">
                Bebidas
              </h5>
              <ul className="list-disc pl-8">
                {cerveja && (
                  <li className="md:text-md text-sm leading-relaxed text-orange-300 md:leading-snug">
                    Cerveja:{' '}
                    {getMedida(bebidasCalculadas!.cerveja, TipoMedida.liquido)}
                  </li>
                )}
                {refrigerante && (
                  <li className="md:text-md text-sm leading-relaxed text-orange-300 md:leading-snug">
                    Refrigerante:{' '}
                    {getMedida(
                      bebidasCalculadas!.refrigerante,
                      TipoMedida.liquido,
                    )}
                  </li>
                )}
                {agua && (
                  <li className="md:text-md text-sm leading-relaxed text-orange-300 md:leading-snug">
                    Água:{' '}
                    {getMedida(bebidasCalculadas!.agua, TipoMedida.liquido)}
                  </li>
                )}
                {suco && (
                  <li className="md:text-md text-sm leading-relaxed text-orange-300 md:leading-snug">
                    Suco:{' '}
                    {getMedida(bebidasCalculadas!.suco, TipoMedida.liquido)}
                  </li>
                )}
              </ul>
            </div>
          )}

          {(temAssados() || temBebidas()) && essenciaisCalculados && (
            <div>
              <h5 className="text-md my-2 leading-relaxed text-orange-300 md:text-lg md:leading-snug">
                Essenciais
              </h5>
              <ul className="list-disc pl-8">
                {temAssados() && (
                  <li className="md:text-md text-sm leading-relaxed text-orange-300 md:leading-snug">
                    Sal Grosso:{' '}
                    {getMedida(
                      essenciaisCalculados!.salGrosso,
                      TipoMedida.peso,
                    )}
                  </li>
                )}
                {temAssados() && (
                  <li className="md:text-md text-sm leading-relaxed text-orange-300 md:leading-snug">
                    Carvão:{' '}
                    {getMedida(essenciaisCalculados!.carvao, TipoMedida.peso)}
                  </li>
                )}
                {temBebidas() && (
                  <li className="md:text-md text-sm leading-relaxed text-orange-300 md:leading-snug">
                    Gelo:{' '}
                    {getMedida(essenciaisCalculados!.gelo, TipoMedida.peso)}
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 flex flex-col justify-center pb-2">
        <Button
          onClick={() => handleCalcularNovamente()}
          className={buttonVariants({ variant: 'outline' })}
        >
          {participantes && participantes > 0
            ? 'Calcule novamente com mais precisão'
            : 'Calcular novamente'}
        </Button>
      </div>
    </div>
  )
}
