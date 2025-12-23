"use client";

import AguaIcon from "@/components/icons/agua-icon";
import CervejaIcon from "@/components/icons/cerveja-icon";
import RefrigeranteIcon from "@/components/icons/refrigerante-icon";
import SucoIcon from "@/components/icons/suco-icon";
import ProgressStepper from "@/components/progress-stepper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CheckButton from "@/components/ui/check-button";
import { NavigationButtons } from "@/components/ui/navigation-buttons";
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
      router.push("/");
    }
  }, [router, temParticipantes]);

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
              Escolha agora as bebidas do seu churrasco
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-0">
            <motion.div className="grid grid-cols-2 gap-4" variants={container}>
              <CheckButton
                isChecked={cerveja}
                description="Cerveja"
                onClick={() => changeCerveja()}
                className="aspect-square"
                variants={item}
              >
                <CervejaIcon size={50} />
              </CheckButton>
              <CheckButton
                isChecked={agua}
                description="Água"
                onClick={() => changeAgua()}
                className="aspect-square"
                variants={item}
              >
                <AguaIcon size={50} />
              </CheckButton>
              <CheckButton
                isChecked={suco}
                description="Suco"
                onClick={() => changeSuco()}
                className="aspect-square"
                variants={item}
              >
                <SucoIcon size={50} />
              </CheckButton>
              <CheckButton
                isChecked={refrigerante}
                description="Refrigerante"
                onClick={() => changeRefrigerante()}
                className="aspect-square"
                variants={item}
              >
                <RefrigeranteIcon size={50} />
              </CheckButton>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <NavigationButtons
        backHref="/assados"
        nextHref="/tempo"
        canAdvance={temBebidas()}
      />
    </main>
  );
}
