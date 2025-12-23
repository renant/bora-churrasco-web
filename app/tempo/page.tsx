"use client";

import ProgressStepper from "@/components/progress-stepper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CheckButton from "@/components/ui/check-button";
import { NavigationButtons } from "@/components/ui/navigation-buttons";
import Tempo from "@/enum/tempo-enum";
import churrascoStore from "@/lib/churrascoStore";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
      router.push("/");
    }
  }, [temParticipantes, router]);

  if (!temParticipantes()) {
    return <></>;
  }

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center px-4 pb-4">
      <ProgressStepper />
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="w-full max-w-xl"
      >
        <Card className="border-none bg-transparent">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-bold text-red-500 md:text-3xl">
              Diga aproximadamente o tempo do seu churrasco
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-0">
            <motion.div className="grid grid-cols-2 gap-4" variants={container}>
              <CheckButton
                isChecked={tempo === Tempo.quatroHoras}
                description="Até 4 horas"
                onClick={() => setTempo(Tempo.quatroHoras)}
                className="aspect-square"
                variants={item}
              >
                <h2 className="text-5xl font-bold text-red-600">4h</h2>
              </CheckButton>
              <CheckButton
                isChecked={tempo === Tempo.seisHoras}
                description="Até 6 horas"
                onClick={() => setTempo(Tempo.seisHoras)}
                className="aspect-square"
                variants={item}
              >
                <h2 className="text-5xl font-bold text-red-600">6h</h2>
              </CheckButton>
              <CheckButton
                isChecked={tempo === Tempo.oitoHoras}
                description="Até 8 horas"
                onClick={() => setTempo(Tempo.oitoHoras)}
                className="aspect-square"
                variants={item}
              >
                <h2 className="text-5xl font-bold text-red-600">8h</h2>
              </CheckButton>
              <CheckButton
                isChecked={tempo === Tempo.dozeOuMaisHoras}
                description="12 horas ou mais"
                onClick={() => setTempo(Tempo.dozeOuMaisHoras)}
                className="aspect-square"
                variants={item}
              >
                <h2 className="text-5xl font-bold text-red-600">12h</h2>
              </CheckButton>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <NavigationButtons
        backHref="/bebidas"
        nextHref="/resultado"
        nextLabel="Ver Resultado"
      />
    </main>
  );
}
