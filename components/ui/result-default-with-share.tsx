'use client';

import { useMemo } from 'react';
import ShareButton from './share-button';
import { calculateDefaultResult } from '@/utils/calculation-utils';

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

interface ResultDefaultWithShareProps {
  participantes: number;
}

export default function ResultDefaultWithShare({ participantes }: ResultDefaultWithShareProps) {
  // Memoize the shopping list text to avoid recalculating on every render
  const shareText = useMemo(() => {
    const { assadosCalculados, bebidasCalculadas, essenciaisCalculados } =
      calculateDefaultResult(participantes);

    let text = `🍖 Lista de Compras - Bora Churrasco\n`;
    text += `Estimado para até 4h de comes e bebes\n\n`;

    // All items are always included in default result
    text += `🥩 ASSADOS:\n`;
    text += `• Bovina: ${getMedida(assadosCalculados.bovina, TipoMedida.peso)}\n`;
    text += `• Suína: ${getMedida(assadosCalculados.suina, TipoMedida.peso)}\n`;
    text += `• Linguiça: ${getMedida(assadosCalculados.linguica, TipoMedida.peso)}\n`;
    text += `• Frango: ${getMedida(assadosCalculados.frango, TipoMedida.peso)}\n`;
    text += `• Queijo: ${getMedida(assadosCalculados.queijo, TipoMedida.peso)}\n`;
    text += `• Pão de Alho: ${getMedida(assadosCalculados.paoAlho, TipoMedida.peso)}\n`;
    text += `\n`;

    text += `🍻 BEBIDAS:\n`;
    text += `• Cerveja: ${getMedida(bebidasCalculadas.cerveja, TipoMedida.liquido)}\n`;
    text += `• Refrigerante: ${getMedida(bebidasCalculadas.refrigerante, TipoMedida.liquido)}\n`;
    text += `• Água: ${getMedida(bebidasCalculadas.agua, TipoMedida.liquido)}\n`;
    text += `• Suco: ${getMedida(bebidasCalculadas.suco, TipoMedida.liquido)}\n`;
    text += `\n`;

    text += `✨ ESSENCIAIS:\n`;
    text += `• Sal Grosso: ${getMedida(essenciaisCalculados.salGrosso, TipoMedida.peso)}\n`;
    text += `• Carvão: ${getMedida(essenciaisCalculados.carvao, TipoMedida.peso)}\n`;
    text += `• Gelo: ${getMedida(essenciaisCalculados.gelo, TipoMedida.peso)}\n`;
    text += `\n`;

    text += `\nCalculado em: www.borachurrasco.app`;
    return text;
  }, [participantes]);

  return <ShareButton shareText={shareText} />;
}