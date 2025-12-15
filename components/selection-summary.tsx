'use client';

import churrascoStore from '@/lib/churrascoStore';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Beef, Beer, ChevronRight, Users } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';

interface SelectionSummaryProps {
  currentStep: 'assados' | 'bebidas' | 'tempo';
}

export default function SelectionSummary({
  currentStep,
}: SelectionSummaryProps) {
  const {
    homens,
    mulheres,
    criancas,
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
    temParticipantes,
    temAssados,
    temBebidas,
  } = churrascoStore();

  const participantesText = useMemo(() => {
    const parts: string[] = [];
    if (homens && homens > 0)
      parts.push(`${homens} ${homens === 1 ? 'homem' : 'homens'}`);
    if (mulheres && mulheres > 0)
      parts.push(`${mulheres} ${mulheres === 1 ? 'mulher' : 'mulheres'}`);
    if (criancas && criancas > 0)
      parts.push(`${criancas} ${criancas === 1 ? 'criança' : 'crianças'}`);
    return parts.join(', ');
  }, [homens, mulheres, criancas]);

  const assadosText = useMemo(() => {
    const items: string[] = [];
    if (bovina) items.push('Bovina');
    if (suina) items.push('Suína');
    if (linguica) items.push('Linguiça');
    if (frango) items.push('Frango');
    if (queijo) items.push('Queijo');
    if (paoDeAlho) items.push('Pão de Alho');
    return items.join(', ');
  }, [bovina, suina, linguica, frango, queijo, paoDeAlho]);

  const bebidasText = useMemo(() => {
    const items: string[] = [];
    if (cerveja) items.push('Cerveja');
    if (refrigerante) items.push('Refrigerante');
    if (agua) items.push('Água');
    if (suco) items.push('Suco');
    return items.join(', ');
  }, [cerveja, refrigerante, agua, suco]);

  const showParticipantes = temParticipantes();
  const showAssados =
    temAssados() && (currentStep === 'bebidas' || currentStep === 'tempo');
  const showBebidas = temBebidas() && currentStep === 'tempo';

  if (!showParticipantes && !showAssados && !showBebidas) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl mb-4"
    >
      <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-gray-200/20 overflow-hidden">
        {showParticipantes && (
          <Link
            href="/participantes"
            className={cn(
              'flex items-center justify-between px-4 py-3 transition-all duration-200',
              'hover:bg-gray-500/10 group'
            )}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-500/20">
                <Users className="h-4 w-4 text-gray-600" />
              </div>
              <span className="text-sm text-gray-700 font-medium">
                {participantesText}
              </span>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </Link>
        )}

        {showAssados && (
          <>
            <div className="h-px bg-gray-200/30" />
            <Link
              href="/assados"
              className={cn(
                'flex items-center justify-between px-4 py-3 transition-all duration-200',
                'hover:bg-red-500/10 group'
              )}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/20">
                  <Beef className="h-4 w-4 text-red-600" />
                </div>
                <span className="text-sm text-gray-700 font-medium truncate max-w-[250px]">
                  {assadosText}
                </span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-red-600 transition-colors" />
            </Link>
          </>
        )}

        {showBebidas && (
          <>
            <div className="h-px bg-gray-200/30" />
            <Link
              href="/bebidas"
              className={cn(
                'flex items-center justify-between px-4 py-3 transition-all duration-200',
                'hover:bg-blue-500/10 group'
              )}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20">
                  <Beer className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-sm text-gray-700 font-medium truncate max-w-[250px]">
                  {bebidasText}
                </span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </Link>
          </>
        )}
      </div>
    </motion.div>
  );
}
