'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Calculator, Zap } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useCallback, type FormEvent } from 'react';

const popularQuantities = [10, 15, 20, 30, 50];

export function QuickLinks() {
  const router = useRouter();
  const [customQuantity, setCustomQuantity] = useState('');
  const [isNavigating, setIsNavigating] = useState(false);

  const handleCustomCalculation = useCallback((e: FormEvent) => {
    e.preventDefault();
    const quantity = Number.parseInt(customQuantity);
    if (quantity > 0 && quantity <= 500) {
      setIsNavigating(true);
      router.push(`/resultado/${quantity}`);
    }
  }, [customQuantity, router]);

  const isValidQuantity = () => {
    const num = Number.parseInt(customQuantity);
    return !Number.isNaN(num) && num > 0 && num <= 500;
  };

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-2 mb-3 px-4 py-2 bg-amber-100 rounded-full">
            <Zap className="h-4 w-4 text-amber-600" />
            <span className="text-sm font-semibold text-amber-700">Cálculo Rápido</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Quantas pessoas no seu churrasco?
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Clique para ver a lista de compras pronta para as quantidades mais populares
          </p>
        </div>

        {/* Popular quantities grid - 2x2 on mobile, row on desktop */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-3 sm:gap-4 max-w-lg sm:max-w-none mx-auto">
          {popularQuantities.map((people) => (
            <Link
              key={people}
              href={`/resultado/${people}`}
              prefetch={true}
              className={cn(
                'group relative overflow-hidden',
                'px-5 py-4 sm:px-6 sm:py-4',
                'rounded-xl border-2 border-red-200',
                'bg-white shadow-sm',
                'hover:border-red-500 hover:shadow-md hover:scale-105',
                'active:scale-[0.98]',
                'transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
                'touch-manipulation',
                'min-h-[72px]'
              )}
            >
              {/* Background effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative flex flex-col items-center justify-center h-full">
                <span className="text-2xl sm:text-3xl font-bold text-red-600 group-hover:text-red-700 transition-colors">
                  {people}
                </span>
                <span className="text-xs sm:text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                  pessoas
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Custom quantity input */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gradient-to-b from-gray-50 to-white px-4 text-sm text-gray-500">
                ou digite a quantidade
              </span>
            </div>
          </div>

          <form onSubmit={handleCustomCalculation} className="mt-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  min="1"
                  max="500"
                  placeholder="Ex: 25"
                  value={customQuantity}
                  onChange={(e) => setCustomQuantity(e.target.value)}
                  className={cn(
                    'w-full h-12 px-4 rounded-xl border-2 border-gray-200',
                    'text-lg font-medium text-gray-900 placeholder:text-gray-400',
                    'focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20',
                    'transition-all duration-200',
                    'touch-manipulation'
                  )}
                  aria-label="Quantidade de pessoas"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 pointer-events-none">
                  pessoas
                </span>
              </div>
              <Button
                type="submit"
                disabled={!isValidQuantity() || isNavigating}
                isLoading={isNavigating}
                loadingText="..."
                className={cn(
                  'h-12 px-6 rounded-xl',
                  'bg-red-600 hover:bg-red-700 text-white',
                  'shadow-lg shadow-red-600/25',
                  'touch-manipulation',
                  'min-w-[100px]'
                )}
              >
                <Calculator className="h-4 w-4 mr-2" />
                Calcular
              </Button>
            </div>
            {customQuantity && !isValidQuantity() && (
              <p className="mt-2 text-sm text-red-600">
                Informe um número entre 1 e 500
              </p>
            )}
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Quer personalizar carnes e bebidas?{' '}
          <Link
            href="/participantes"
            className="text-red-600 hover:text-red-700 font-medium underline underline-offset-2"
          >
            Use a calculadora completa
          </Link>
        </p>
      </div>
    </section>
  );
}
