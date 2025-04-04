'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CheckButton from '@/components/ui/check-button';
import Tempo from '@/enum/tempo-enum';
import churrascoStore from '@/lib/churrascoStore';
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

export default function TempoPage() {
  const router = useRouter();

  const { tempo, setTempo, temParticipantes } = churrascoStore();

  useEffect(() => {
    if (!temParticipantes()) {
      router.push('/');
    }
  }, [temParticipantes, router]);

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
              Diga aproximadamente o tempo do seu churrasco
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <motion.div variants={item}>
              <div className="grid grid-cols-2 gap-4">
                <CheckButton
                  isChecked={tempo === Tempo.quatroHoras}
                  description="Até 4 horas"
                  onClick={() => setTempo(Tempo.quatroHoras)}
                  className="aspect-square"
                >
                  <h2 className="text-5xl font-bold text-red-600">4h</h2>
                </CheckButton>
                <CheckButton
                  isChecked={tempo === Tempo.seisHoras}
                  description="Até 6 horas"
                  onClick={() => setTempo(Tempo.seisHoras)}
                  className="aspect-square"
                >
                  <h2 className="text-5xl font-bold text-red-600">6h</h2>
                </CheckButton>
                <CheckButton
                  isChecked={tempo === Tempo.oitoHoras}
                  description="Até 8 horas"
                  onClick={() => setTempo(Tempo.oitoHoras)}
                  className="aspect-square"
                >
                  <h2 className="text-5xl font-bold text-red-600">8h</h2>
                </CheckButton>
                <CheckButton
                  isChecked={tempo === Tempo.dozeOuMaisHoras}
                  description="12 horas ou mais"
                  onClick={() => setTempo(Tempo.dozeOuMaisHoras)}
                  className="aspect-square"
                >
                  <h2 className="text-5xl font-bold text-red-600">12h</h2>
                </CheckButton>
              </div>
            </motion.div>

            <motion.div variants={item} className="flex justify-center pt-6">
              <Link href="/resultado">
                <Button
                  variant="outline"
                  size="lg"
                  className="group relative overflow-hidden border-red-500 px-8 py-6 text-red-500 transition-all hover:border-red-600 hover:text-red-600"
                >
                  <span className="relative z-10">Avançar</span>
                  <div className="absolute inset-0 -z-0 bg-red-500/10 transition-transform duration-300 group-hover:scale-95" />
                </Button>
              </Link>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
