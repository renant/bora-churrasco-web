'use client';

import BovinaIcon from '@/components/icons/bovina-icon';
import FrangoIcon from '@/components/icons/frango-icon';
import LinguicaIcon from '@/components/icons/linguica-icon';
import PaoDeAlhoIcon from '@/components/icons/pao-de-alho-icon';
import QueijoIcon from '@/components/icons/queijo-icon';
import SuinaIcon from '@/components/icons/suina-icon';
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

export default function Assados() {
  const router = useRouter();

  const {
    bovina,
    changeBovina,
    suina,
    changeSuina,
    linguica,
    changeLinguica,
    frango,
    changeFrango,
    queijo,
    changeQueijo,
    paoDeAlho,
    changePaoDeAlho,
    temAssados,
    temParticipantes,
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
              Agora vamos escolher os seus assados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <motion.div 
              className="grid grid-cols-2 gap-4 md:grid-cols-3"
              variants={container}
            >
              <CheckButton
                isChecked={bovina}
                description="Bovina"
                onClick={() => changeBovina()}
                className="aspect-square"
                variants={item}
              >
                <BovinaIcon size={50} />
              </CheckButton>
              <CheckButton
                isChecked={suina}
                description="Suina"
                onClick={() => changeSuina()}
                className="aspect-square"
                variants={item}
              >
                <SuinaIcon size={50} />
              </CheckButton>
              <CheckButton
                isChecked={linguica}
                description="Linguiça"
                onClick={() => changeLinguica()}
                className="aspect-square"
                variants={item}
              >
                <LinguicaIcon size={50} />
              </CheckButton>
              <CheckButton
                isChecked={frango}
                description="Frango"
                onClick={() => changeFrango()}
                className="aspect-square"
                variants={item}
              >
                <FrangoIcon size={50} />
              </CheckButton>
              <CheckButton
                isChecked={queijo}
                description="Queijo"
                onClick={() => changeQueijo()}
                className="aspect-square"
                variants={item}
              >
                <QueijoIcon size={50} />
              </CheckButton>
              <CheckButton
                isChecked={paoDeAlho}
                description="Pão de Alho"
                onClick={() => changePaoDeAlho()}
                className="aspect-square"
                variants={item}
              >
                <PaoDeAlhoIcon size={50} />
              </CheckButton>
            </motion.div>

            <motion.div variants={item} className="flex justify-center pt-6">
              <Link
                href="/bebidas"
                className={cn(!temAssados() && 'pointer-events-none')}
              >
                <Button
                  variant="outline"
                  size="lg"
                  disabled={!temAssados()}
                  className={cn(
                    'group relative overflow-hidden px-8 py-6 transition-all',
                    temAssados()
                      ? 'border-red-500 text-red-500 hover:border-red-600 hover:text-red-600'
                      : 'border-red-300 text-red-300 cursor-not-allowed'
                  )}
                >
                  <span className="relative z-10">Avançar</span>
                  <div
                    className={cn(
                      'absolute inset-0 -z-0 transition-transform duration-300',
                      temAssados()
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
