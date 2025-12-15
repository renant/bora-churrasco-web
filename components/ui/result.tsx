'use client';
import { Button, buttonVariants } from '@/components/ui/button';
import { CountUp } from '@/components/ui/count-up';
import churrascoStore from '@/lib/churrascoStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Share2, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { createDefaultResult } from './resultDefault';
import ShareButton from './share-button';
import { Card, CardContent, CardHeader, CardTitle } from './card';

enum TipoMedida {
  peso = 0,
  liquido = 1,
}

function getMedidaParts(value: number, tipo: TipoMedida) {
  if (value >= 1000) {
    return { value: Number((value / 1000).toFixed(2)), unit: tipo === TipoMedida.peso ? 'kg' : 'L' };
  }
  return { value, unit: tipo === TipoMedida.peso ? 'g' : 'ml' };
}

// Keep backward compatibility for share text
function getMedida(value: number, tipo: TipoMedida) {
  const { value: val, unit } = getMedidaParts(value, tipo);
  return `${val}${unit}`;
}

interface ResultProps {
  participantes?: number | undefined;
}

function ResultSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4 animate-pulse">
        <div className="h-10 bg-gray-200 rounded-lg w-3/4 mx-auto max-w-md"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 h-64 animate-pulse">
            <div className="h-6 bg-gray-100 rounded w-1/3 mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-100 rounded w-full"></div>
              <div className="h-4 bg-gray-100 rounded w-3/4"></div>
              <div className="h-4 bg-gray-100 rounded w-5/6"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Result({ participantes }: ResultProps) {
  const router = useRouter();
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

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

  const isValidParticipantes = useMemo(() => 
    participantes && participantes > 0, 
    [participantes]
  );

  const hasParticipantes = useMemo(() => 
    temParticipantes(), 
    [temParticipantes]
  );

  const handleCreateDefaultResult = useCallback((numParticipantes: number) => {
    createDefaultResult(numParticipantes);
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

  const handleCopyClick = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(text);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopiedItem(text);
        setTimeout(() => setCopiedItem(null), 2000);
      } catch (fallbackErr) {
        // Ignore errors
      }
      document.body.removeChild(textArea);
    }
  }, []);

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

  if (!hasParticipantes) {
    return <ResultSkeleton />;
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={item} className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-red-100 rounded-full mb-2">
            <ShoppingCart className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Sua Lista de Compras
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Estimativa para um evento de até <span className="font-semibold text-red-500">{getTempo()}</span>. 
            Lembre-se que as quantidades podem variar de acordo com o perfil dos seus convidados.
          </p>
        </motion.div>

        {/* Results Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start">
          
          {/* Assados Card */}
          {assadosCalculados && temAssados() && (
            <motion.div variants={item} className="h-full">
              <Card className="h-full border-red-100 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-4 border-b border-red-50 bg-red-50/30">
                  <CardTitle className="flex items-center gap-2 text-xl text-red-700">
                    <span>🥩</span> Assados
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  {[
                    { show: bovina, label: 'Bovina', value: assadosCalculados.bovina },
                    { show: suina, label: 'Suína', value: assadosCalculados.suina },
                    { show: linguica, label: 'Linguiça', value: assadosCalculados.linguica },
                    { show: frango, label: 'Frango', value: assadosCalculados.frango },
                    { show: queijo, label: 'Queijo', value: assadosCalculados.queijo },
                    { show: paoDeAlho, label: 'Pão de Alho', value: assadosCalculados.paoAlho },
                  ]
                    .filter(item => item.show)
                    .map(item => ({
                      ...item,
                      copyText: `${item.label}: ${getMedida(item.value, TipoMedida.peso)}`,
                    }))
                    .map(item => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => handleCopyClick(item.copyText)}
                      className="flex justify-between items-baseline w-full py-1 border-b border-red-100 last:border-b-0 cursor-pointer hover:bg-red-50 transition-all duration-200 relative group"
                      aria-label={`Clique para copiar ${item.label}`}
                    >
                      <span className="text-gray-600 font-medium">{item.label}</span>
                      <span className="text-xl font-bold text-gray-900">
                        <CountUp 
                          end={getMedidaParts(item.value, TipoMedida.peso).value} 
                          decimals={getMedidaParts(item.value, TipoMedida.peso).unit === 'kg' ? 2 : 0}
                          suffix={getMedidaParts(item.value, TipoMedida.peso).unit}
                        />
                      </span>
                      <AnimatePresence>
                        {copiedItem === item.copyText && (
                          <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute right-0 top-1/2 -translate-y-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap"
                          >
                            ✓ Copiado!
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Bebidas Card */}
          {temBebidas() && bebidasCalculadas && (
            <motion.div variants={item} className="h-full">
              <Card className="h-full border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-4 border-b border-blue-50 bg-blue-50/30">
                  <CardTitle className="flex items-center gap-2 text-xl text-blue-700">
                    <span>🍻</span> Bebidas
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  {[
                    { show: cerveja, label: 'Cerveja', value: bebidasCalculadas.cerveja },
                    { show: refrigerante, label: 'Refrigerante', value: bebidasCalculadas.refrigerante },
                    { show: agua, label: 'Água', value: bebidasCalculadas.agua },
                    { show: suco, label: 'Suco', value: bebidasCalculadas.suco },
                  ]
                    .filter(item => item.show)
                    .map(item => ({
                      ...item,
                      copyText: `${item.label}: ${getMedida(item.value, TipoMedida.liquido)}`,
                    }))
                    .map(item => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => handleCopyClick(item.copyText)}
                      className="flex justify-between items-baseline w-full py-1 border-b border-blue-100 last:border-b-0 cursor-pointer hover:bg-blue-50 transition-all duration-200 relative group"
                      aria-label={`Clique para copiar ${item.label}`}
                    >
                      <span className="text-gray-600 font-medium">{item.label}</span>
                      <span className="text-xl font-bold text-gray-900">
                         <CountUp 
                          end={getMedidaParts(item.value, TipoMedida.liquido).value} 
                          decimals={getMedidaParts(item.value, TipoMedida.liquido).unit === 'L' ? 1 : 0}
                          suffix={getMedidaParts(item.value, TipoMedida.liquido).unit}
                        />
                      </span>
                      <AnimatePresence>
                        {copiedItem === item.copyText && (
                          <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute right-0 top-1/2 -translate-y-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap"
                          >
                            ✓ Copiado!
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Essenciais Card */}
          {(temAssados() || temBebidas()) && essenciaisCalculados && (
            <motion.div variants={item} className="h-full">
              <Card className="h-full border-green-100 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-4 border-b border-green-50 bg-green-50/30">
                  <CardTitle className="flex items-center gap-2 text-xl text-green-700">
                    <span>✨</span> Essenciais
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  {[
                    { show: temAssados(), label: 'Sal Grosso', value: essenciaisCalculados.salGrosso },
                    { show: temAssados(), label: 'Carvão', value: essenciaisCalculados.carvao },
                    { show: temBebidas(), label: 'Gelo', value: essenciaisCalculados.gelo },
                  ]
                    .filter(item => item.show)
                    .map(item => ({
                      ...item,
                      copyText: `${item.label}: ${getMedida(item.value, TipoMedida.peso)}`,
                    }))
                    .map(item => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => handleCopyClick(item.copyText)}
                      className="flex justify-between items-baseline w-full py-1 border-b border-green-100 last:border-b-0 cursor-pointer hover:bg-green-50 transition-all duration-200 relative group"
                      aria-label={`Clique para copiar ${item.label}`}
                    >
                      <span className="text-gray-600 font-medium">{item.label}</span>
                      <span className="text-xl font-bold text-gray-900">
                         <CountUp 
                          end={getMedidaParts(item.value, TipoMedida.peso).value} 
                          decimals={getMedidaParts(item.value, TipoMedida.peso).unit === 'kg' ? 2 : 0}
                          suffix={getMedidaParts(item.value, TipoMedida.peso).unit}
                        />
                      </span>
                      <AnimatePresence>
                        {copiedItem === item.copyText && (
                          <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute right-0 top-1/2 -translate-y-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap"
                          >
                            ✓ Copiado!
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Actions */}
        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center pt-8 border-t border-gray-200">
          <Button
            onClick={handleCalcularNovamente}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Recalcular
          </Button>
          <div className="w-full sm:w-auto">
            <ShareButton shareText={formatShoppingList()} />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
