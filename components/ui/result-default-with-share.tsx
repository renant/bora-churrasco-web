'use client';

import { useCallback } from 'react';
import ShareButton from './share-button';
import { createDefaultResult } from './resultDefault';

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
  // Format shopping list for sharing
  const formatShoppingList = useCallback(() => {
    const defaultResult = createDefaultResult(participantes);
    defaultResult.calcular();

    const {
      bovina,
      suina,
      linguica,
      frango,
      queijo,
      paoDeAlho,
      cerveja,
      agua,
      refrigerante,
      suco,
      assadosCalculados,
      bebidasCalculadas,
      essenciaisCalculados,
    } = defaultResult;

    let text = `🍖 Lista de Compras - Bora Churrasco\n`;
    text += `Estimado para até 4h de comes e bebes\n\n`;

    if (assadosCalculados) {
      text += `🥩 ASSADOS:\n`;
      if (bovina) text += `• Bovina: ${getMedida(assadosCalculados.bovina, TipoMedida.peso)}\n`;
      if (suina) text += `• Suína: ${getMedida(assadosCalculados.suina, TipoMedida.peso)}\n`;
      if (linguica) text += `• Linguiça: ${getMedida(assadosCalculados.linguica, TipoMedida.peso)}\n`;
      if (frango) text += `• Frango: ${getMedida(assadosCalculados.frango, TipoMedida.peso)}\n`;
      if (queijo) text += `• Queijo: ${getMedida(assadosCalculados.queijo, TipoMedida.peso)}\n`;
      if (paoDeAlho) text += `• Pão de Alho: ${getMedida(assadosCalculados.paoAlho, TipoMedida.peso)}\n`;
      text += `\n`;
    }

    if (bebidasCalculadas) {
      text += `🍻 BEBIDAS:\n`;
      if (cerveja) text += `• Cerveja: ${getMedida(bebidasCalculadas.cerveja, TipoMedida.liquido)}\n`;
      if (refrigerante) text += `• Refrigerante: ${getMedida(bebidasCalculadas.refrigerante, TipoMedida.liquido)}\n`;
      if (agua) text += `• Água: ${getMedida(bebidasCalculadas.agua, TipoMedida.liquido)}\n`;
      if (suco) text += `• Suco: ${getMedida(bebidasCalculadas.suco, TipoMedida.liquido)}\n`;
      text += `\n`;
    }

    if (essenciaisCalculados) {
      text += `✨ ESSENCIAIS:\n`;
      text += `• Sal Grosso: ${getMedida(essenciaisCalculados.salGrosso, TipoMedida.peso)}\n`;
      text += `• Carvão: ${getMedida(essenciaisCalculados.carvao, TipoMedida.peso)}\n`;
      text += `• Gelo: ${getMedida(essenciaisCalculados.gelo, TipoMedida.peso)}\n`;
      text += `\n`;
    }

    text += `\nCalculado em: www.borachurrasco.app`;
    return text;
  }, [participantes]);

  return <ShareButton shareText={formatShoppingList()} />;
}