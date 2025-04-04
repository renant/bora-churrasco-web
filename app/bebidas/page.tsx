'use client';

import AguaIcon from '@/components/icons/agua-icon';
import CervejaIcon from '@/components/icons/cerveja-icon';
import RefrigeranteIcon from '@/components/icons/refrigerante-icon';
import SucoIcon from '@/components/icons/suco-icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CheckButton from '@/components/ui/check-button';
import churrascoStore from '@/lib/churrascoStore';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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

export default function Bebidas() {
  const router = useRouter();

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
    temBebidas,
  } = churrascoStore();

  useEffect(() => {
    if (!temParticipantes()) {
      router.push('/');
    }
  }, [router, temParticipantes]);

  if (!temParticipantes()) {
    return <></>;
  }

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center">
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="w-full max-w-xl"
      >
        <Card className="border-red-200 bg-white/5 shadow-lg backdrop-blur">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-red-500 md:text-4xl">
              Escolha agora as bebidas do seu churrasco
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <motion.div variants={item}>
              <div className="grid grid-cols-2 gap-4">
                <CheckButton
                  isChecked={cerveja}
                  description="Cerveja"
                  onClick={() => changeCerveja()}
                  className="aspect-square"
                >
                  <CervejaIcon size={50} />
                </CheckButton>
                <CheckButton
                  isChecked={agua}
                  description="Água"
                  onClick={() => changeAgua()}
                  className="aspect-square"
                >
                  <AguaIcon size={50} />
                </CheckButton>
                <CheckButton
                  isChecked={suco}
                  description="Suco"
                  onClick={() => changeSuco()}
                  className="aspect-square"
                >
                  <SucoIcon size={50} />
                </CheckButton>
                <CheckButton
                  isChecked={refrigerante}
                  description="Refrigerante"
                  onClick={() => changeRefrigerante()}
                  className="aspect-square"
                >
                  <RefrigeranteIcon size={50} />
                </CheckButton>
              </div>
            </motion.div>

            <motion.div variants={item} className="flex justify-center pt-6">
              <Link
                href="/tempo"
                className={cn(!temBebidas() && 'pointer-events-none')}
              >
                <Button
                  variant="outline"
                  size="lg"
                  disabled={!temBebidas()}
                  className={cn(
                    'group relative overflow-hidden px-8 py-6 transition-all',
                    temBebidas()
                      ? 'border-red-500 text-red-500 hover:border-red-600 hover:text-red-600'
                      : 'border-red-300 text-red-300 cursor-not-allowed'
                  )}
                >
                  <span className="relative z-10">Avançar</span>
                  <div
                    className={cn(
                      'absolute inset-0 -z-0 transition-transform duration-300',
                      temBebidas()
                        ? 'bg-red-500/10 group-hover:scale-95'
                        : 'bg-red-300/5'
                    )}
                  />
                </Button>
              </Link>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
