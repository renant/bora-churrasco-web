import { cn } from '@/lib/utils';
import { Zap } from 'lucide-react';
import Link from 'next/link';

const popularQuantities = [10, 15, 20, 30, 50];

export function QuickLinks() {
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

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {popularQuantities.map((people) => (
            <Link
              key={people}
              href={`/resultado/${people}`}
              prefetch={true}
              className={cn(
                'group relative overflow-hidden',
                'px-5 py-3 sm:px-6 sm:py-4',
                'rounded-xl border-2 border-red-200',
                'bg-white shadow-sm',
                'hover:border-red-500 hover:shadow-md hover:scale-105',
                'active:scale-[0.98]',
                'transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
              )}
            >
              {/* Background effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative flex flex-col items-center">
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

        <p className="text-center text-sm text-gray-500 mt-6">
          Ou{' '}
          <Link
            href="/participantes"
            className="text-red-600 hover:text-red-700 font-medium underline underline-offset-2"
          >
            personalize seu cálculo
          </Link>{' '}
          com o número exato de participantes
        </p>
      </div>
    </section>
  );
}
