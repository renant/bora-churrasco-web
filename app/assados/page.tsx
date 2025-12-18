"use client";

import BovinaIcon from "@/components/icons/bovina-icon";
import FrangoIcon from "@/components/icons/frango-icon";
import LinguicaIcon from "@/components/icons/linguica-icon";
import PaoDeAlhoIcon from "@/components/icons/pao-de-alho-icon";
import QueijoIcon from "@/components/icons/queijo-icon";
import SuinaIcon from "@/components/icons/suina-icon";
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
              Agora vamos escolher os seus assados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-0">
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
          </CardContent>
        </Card>
      </motion.div>

      <NavigationButtons
        backHref="/participantes"
        nextHref="/bebidas"
        canAdvance={temAssados()}
      />
    </main>
  );
}
