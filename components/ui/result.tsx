'use client';
import { Button, buttonVariants } from '@/components/ui/button';
import churrascoStore from '@/lib/churrascoStore';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';
import { Skeleton } from './skeleton';
import { createDefaultResult } from './resultDefault';
import ShareButton from './share-button';

enum TipoMedida {
  peso = 0,
  liquido = 1,
}

function getMedida(value: number, tipo: TipoMedida) {
  switch (tipo) {
    case TipoMedida.peso: {
      return value >= 1000 ? `${value / 1000}kg` : `${value}g`;
    }
    case TipoMedida.liquido: {
      return value >= 1000 ? `${value / 1000}L` : `${value}ml`;
    }
  }
}

interface ResultProps {
  participantes?: number | undefined;
}

// Skeleton component with proper dimensions to prevent CLS
function ResultSkeleton() {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 min-h-[600px] border border-gray-200">
        <div className="space-y-4 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
          
          <div className="space-y-6 mt-8">
            {/* Assados skeleton */}
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="h-6 bg-red-200 rounded w-24 mb-3"></div>
              <div className="space-y-2">
                {Array.from({ length: 6 }, (_, i) => (
                  <div key={i} className="flex justify-between items-center py-1">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="h-4 bg-red-200 rounded w-16"></div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Bebidas skeleton */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="h-6 bg-blue-200 rounded w-24 mb-3"></div>
              <div className="space-y-2">
                {Array.from({ length: 4 }, (_, i) => (
                  <div key={i} className="flex justify-between items-center py-1">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-4 bg-blue-200 rounded w-16"></div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Essenciais skeleton */}
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="h-6 bg-green-200 rounded w-24 mb-3"></div>
              <div className="space-y-2">
                {Array.from({ length: 3 }, (_, i) => (
                  <div key={i} className="flex justify-between items-center py-1">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="h-4 bg-green-200 rounded w-16"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Result({ participantes }: ResultProps) {
  const router = useRouter();

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

  // Memoize the calculation to prevent unnecessary re-renders
  const isValidParticipantes = useMemo(() => 
    participantes && participantes > 0, 
    [participantes]
  );

  const hasParticipantes = useMemo(() => 
    temParticipantes(), 
    [temParticipantes]
  );

  // Create a default result function that works with the store
  const handleCreateDefaultResult = useCallback((numParticipantes: number) => {
    // This will create default values in the store
    const defaultData = createDefaultResult(numParticipantes);
    // You would need to populate the store with this data
    // This is a simplified version - you might need to adapt based on how your store works
  }, []);

  useEffect(() => {
    if (isValidParticipantes && participantes) {
      handleCreateDefaultResult(participantes);
    }

    if (!hasParticipantes) {
      router.push('/');
    } else {
      calcular();
    }
  }, [calcular, hasParticipantes, router, handleCreateDefaultResult, participantes, isValidParticipantes]);

  const handleCalcularNovamente = useCallback(() => {
    resetState();
    router.push('/');
  }, [resetState, router]);

  // Format shopping list for sharing
  const formatShoppingList = useCallback(() => {
    let text = `🍖 Lista de Compras - Bora Churrasco\n`;
    text += `Estimado para até ${getTempo()} de comes e bebes\n\n`;

    if (assadosCalculados && temAssados()) {
      text += `🥩 ASSADOS:\n`;
      if (bovina) text += `• Bovina: ${getMedida(assadosCalculados.bovina, TipoMedida.peso)}\n`;
      if (suina) text += `• Suína: ${getMedida(assadosCalculados.suina, TipoMedida.peso)}\n`;
      if (linguica) text += `• Linguiça: ${getMedida(assadosCalculados.linguica, TipoMedida.peso)}\n`;
      if (frango) text += `• Frango: ${getMedida(assadosCalculados.frango, TipoMedida.peso)}\n`;
      if (queijo) text += `• Queijo: ${getMedida(assadosCalculados.queijo, TipoMedida.peso)}\n`;
      if (paoDeAlho) text += `• Pão de Alho: ${getMedida(assadosCalculados.paoAlho, TipoMedida.peso)}\n`;
      text += `\n`;
    }

    if (temBebidas() && bebidasCalculadas) {
      text += `🍻 BEBIDAS:\n`;
      if (cerveja) text += `• Cerveja: ${getMedida(bebidasCalculadas.cerveja, TipoMedida.liquido)}\n`;
      if (refrigerante) text += `• Refrigerante: ${getMedida(bebidasCalculadas.refrigerante, TipoMedida.liquido)}\n`;
      if (agua) text += `• Água: ${getMedida(bebidasCalculadas.agua, TipoMedida.liquido)}\n`;
      if (suco) text += `• Suco: ${getMedida(bebidasCalculadas.suco, TipoMedida.liquido)}\n`;
      text += `\n`;
    }

    if ((temAssados() || temBebidas()) && essenciaisCalculados) {
      text += `✨ ESSENCIAIS:\n`;
      if (temAssados()) text += `• Sal Grosso: ${getMedida(essenciaisCalculados.salGrosso, TipoMedida.peso)}\n`;
      if (temAssados()) text += `• Carvão: ${getMedida(essenciaisCalculados.carvao, TipoMedida.peso)}\n`;
      if (temBebidas()) text += `• Gelo: ${getMedida(essenciaisCalculados.gelo, TipoMedida.peso)}\n`;
      text += `\n`;
    }

    text += `\nCalculado em: www.borachurrasco.app`;
    return text;
  }, [
    getTempo,
    temAssados,
    temBebidas,
    assadosCalculados,
    bebidasCalculadas,
    essenciaisCalculados,
    bovina,
    suina,
    linguica,
    frango,
    queijo,
    paoDeAlho,
    cerveja,
    refrigerante,
    agua,
    suco,
  ]);

  // Show skeleton with proper dimensions to prevent CLS
  if (!hasParticipantes) {
    return <ResultSkeleton />;
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 min-h-[600px] border border-gray-200">
        <div className="flex flex-col h-full">
          <div className="text-center mb-6">
            <h2 className="mb-2 text-lg leading-relaxed text-red-500 sm:text-2xl md:text-3xl font-bold">
              Lista de Compras!
            </h2>
            <h3 className="text-sm md:text-base mb-2 text-center leading-relaxed text-gray-700">
              Lembrando que o resultado é estimado para até {getTempo()} de comes e bebes
            </h3>
            <h4 className="text-xs md:text-sm mb-4 text-center font-light text-gray-600">
              (Isso é uma estimativa a quantidade pode variar, conheça seus
              convidados)
            </h4>
          </div>

          <div className="flex-1 space-y-6">
            {assadosCalculados && temAssados() && (
              <div className="bg-red-50 p-4 rounded-lg">
                <h5 className="text-lg md:text-xl font-semibold text-red-700 mb-3 flex items-center">
                  🥩 Assados
                </h5>
                <ul className="space-y-2">
                  {bovina && (
                    <li className="flex justify-between items-center py-1 border-b border-red-100 last:border-b-0">
                      <span className="text-sm md:text-base text-gray-700 font-medium">Bovina:</span>
                      <span className="text-sm md:text-base text-red-600 font-semibold">
                        {getMedida(assadosCalculados?.bovina, TipoMedida.peso)}
                      </span>
                    </li>
                  )}
                  {suina && (
                    <li className="flex justify-between items-center py-1 border-b border-red-100 last:border-b-0">
                      <span className="text-sm md:text-base text-gray-700 font-medium">Suína:</span>
                      <span className="text-sm md:text-base text-red-600 font-semibold">
                        {getMedida(assadosCalculados?.suina, TipoMedida.peso)}
                      </span>
                    </li>
                  )}
                  {linguica && (
                    <li className="flex justify-between items-center py-1 border-b border-red-100 last:border-b-0">
                      <span className="text-sm md:text-base text-gray-700 font-medium">Linguiça:</span>
                      <span className="text-sm md:text-base text-red-600 font-semibold">
                        {getMedida(assadosCalculados?.linguica, TipoMedida.peso)}
                      </span>
                    </li>
                  )}
                  {frango && (
                    <li className="flex justify-between items-center py-1 border-b border-red-100 last:border-b-0">
                      <span className="text-sm md:text-base text-gray-700 font-medium">Frango:</span>
                      <span className="text-sm md:text-base text-red-600 font-semibold">
                        {getMedida(assadosCalculados?.frango, TipoMedida.peso)}
                      </span>
                    </li>
                  )}
                  {queijo && (
                    <li className="flex justify-between items-center py-1 border-b border-red-100 last:border-b-0">
                      <span className="text-sm md:text-base text-gray-700 font-medium">Queijo:</span>
                      <span className="text-sm md:text-base text-red-600 font-semibold">
                        {getMedida(assadosCalculados?.queijo, TipoMedida.peso)}
                      </span>
                    </li>
                  )}
                  {paoDeAlho && (
                    <li className="flex justify-between items-center py-1 border-b border-red-100 last:border-b-0">
                      <span className="text-sm md:text-base text-gray-700 font-medium">Pão de Alho:</span>
                      <span className="text-sm md:text-base text-red-600 font-semibold">
                        {getMedida(assadosCalculados?.paoAlho, TipoMedida.peso)}
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            )}

            {temBebidas() && bebidasCalculadas && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="text-lg md:text-xl font-semibold text-blue-700 mb-3 flex items-center">
                  🍻 Bebidas
                </h5>
                <ul className="space-y-2">
                  {cerveja && (
                    <li className="flex justify-between items-center py-1 border-b border-blue-100 last:border-b-0">
                      <span className="text-sm md:text-base text-gray-700 font-medium">Cerveja:</span>
                      <span className="text-sm md:text-base text-blue-600 font-semibold">
                        {getMedida(bebidasCalculadas?.cerveja, TipoMedida.liquido)}
                      </span>
                    </li>
                  )}
                  {refrigerante && (
                    <li className="flex justify-between items-center py-1 border-b border-blue-100 last:border-b-0">
                      <span className="text-sm md:text-base text-gray-700 font-medium">Refrigerante:</span>
                      <span className="text-sm md:text-base text-blue-600 font-semibold">
                        {getMedida(bebidasCalculadas?.refrigerante, TipoMedida.liquido)}
                      </span>
                    </li>
                  )}
                  {agua && (
                    <li className="flex justify-between items-center py-1 border-b border-blue-100 last:border-b-0">
                      <span className="text-sm md:text-base text-gray-700 font-medium">Água:</span>
                      <span className="text-sm md:text-base text-blue-600 font-semibold">
                        {getMedida(bebidasCalculadas?.agua, TipoMedida.liquido)}
                      </span>
                    </li>
                  )}
                  {suco && (
                    <li className="flex justify-between items-center py-1 border-b border-blue-100 last:border-b-0">
                      <span className="text-sm md:text-base text-gray-700 font-medium">Suco:</span>
                      <span className="text-sm md:text-base text-blue-600 font-semibold">
                        {getMedida(bebidasCalculadas?.suco, TipoMedida.liquido)}
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            )}

            {(temAssados() || temBebidas()) && essenciaisCalculados && (
              <div className="bg-green-50 p-4 rounded-lg">
                <h5 className="text-lg md:text-xl font-semibold text-green-700 mb-3 flex items-center">
                  ✨ Essenciais
                </h5>
                <ul className="space-y-2">
                  {temAssados() && (
                    <li className="flex justify-between items-center py-1 border-b border-green-100 last:border-b-0">
                      <span className="text-sm md:text-base text-gray-700 font-medium">Sal Grosso:</span>
                      <span className="text-sm md:text-base text-green-600 font-semibold">
                        {getMedida(essenciaisCalculados?.salGrosso, TipoMedida.peso)}
                      </span>
                    </li>
                  )}
                  {temAssados() && (
                    <li className="flex justify-between items-center py-1 border-b border-green-100 last:border-b-0">
                      <span className="text-sm md:text-base text-gray-700 font-medium">Carvão:</span>
                      <span className="text-sm md:text-base text-green-600 font-semibold">
                        {getMedida(essenciaisCalculados?.carvao, TipoMedida.peso)}
                      </span>
                    </li>
                  )}
                  {temBebidas() && (
                    <li className="flex justify-between items-center py-1 border-b border-green-100 last:border-b-0">
                      <span className="text-sm md:text-base text-gray-700 font-medium">Gelo:</span>
                      <span className="text-sm md:text-base text-green-600 font-semibold">
                        {getMedida(essenciaisCalculados?.gelo, TipoMedida.peso)}
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200 space-y-3">
            <Button
              onClick={handleCalcularNovamente}
              className={`${buttonVariants({ variant: 'outline' })} w-full text-sm md:text-base py-3`}
            >
              {participantes && participantes > 0
                ? 'Calcule novamente com mais precisão'
                : 'Calcular novamente'}
            </Button>
            <ShareButton shareText={formatShoppingList()} />
          </div>
        </div>
      </div>
    </div>
  );
}
