"use client";

import CriancaIcon from "@/components/icons/crianca-icon";
import HomemIcon from "@/components/icons/homem-icon";
import MulherIcon from "@/components/icons/mulher-icon";
import ProgressStepper from "@/components/progress-stepper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NavigationButtons } from "@/components/ui/navigation-buttons";

import churrascoStore from "@/lib/churrascoStore";
import { motion } from "framer-motion";
import { useCallback, useState } from "react";

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

export default function Participantes() {
  const {
    homens,
    setHomens,
    mulheres,
    setMulheres,
    criancas,
    setCriancas,
    temParticipantes,
  } = churrascoStore();

  const [showValidation, setShowValidation] = useState(false);
  const [touched, setTouched] = useState({
    homens: false,
    mulheres: false,
    criancas: false,
  });

  const handleNumberInput = (value: string, setter: (val: number) => void) => {
    const num = Number.parseInt(value);
    if (!Number.isNaN(num) && num >= 0) {
      setter(num);
    } else if (value === "") {
      setter(0);
    }
  };

  const handleBlur = useCallback(
    (field: "homens" | "mulheres" | "criancas") => {
      setTouched((prev) => ({ ...prev, [field]: true }));
    },
    []
  );

  const handleTryAdvance = useCallback(() => {
    if (!temParticipantes()) {
      setShowValidation(true);
      setTouched({ homens: true, mulheres: true, criancas: true });
    }
  }, [temParticipantes]);

  const hasParticipantes = temParticipantes();
  const showError = showValidation && !hasParticipantes;

  // Check if any field has a value
  const homensValue = homens ?? 0;
  const mulheresValue = mulheres ?? 0;
  const criancasValue = criancas ?? 0;

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center px-4 pb-4">
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
              Vamos começar com o número de participantes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-0">
            {/* Error message at the top */}
            {showError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg bg-red-50 border border-red-200 p-3 text-center"
              >
                <p className="text-sm text-red-600 font-medium">
                  Informe pelo menos 1 participante para continuar
                </p>
              </motion.div>
            )}

            <motion.div variants={item} className="space-y-4">
              <div className="group relative space-y-2">
                <Label htmlFor="homens" className="text-red-400 font-medium">
                  Homens
                </Label>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-500/10 transition-colors group-focus-within:bg-red-500/20">
                    <HomemIcon size={30} />
                  </div>
                  <Input
                    id="homens"
                    type="number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    min="0"
                    onChange={(e) =>
                      handleNumberInput(e.target.value, setHomens)
                    }
                    onBlur={() => handleBlur("homens")}
                    value={homensValue === 0 ? "" : homensValue}
                    className="flex-1 border-red-400 bg-transparent text-lg text-red-600 placeholder-red-400/40 transition-all focus:border-red-500 focus-visible:ring-red-500"
                    placeholder="0"
                    showValidation={touched.homens && hasParticipantes}
                    isValid={homensValue > 0}
                  />
                </div>
              </div>

              <div className="group relative space-y-2">
                <Label htmlFor="mulheres" className="text-red-400 font-medium">
                  Mulheres
                </Label>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-500/10 transition-colors group-focus-within:bg-red-500/20">
                    <MulherIcon size={30} />
                  </div>
                  <Input
                    id="mulheres"
                    type="number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    min="0"
                    onChange={(e) =>
                      handleNumberInput(e.target.value, setMulheres)
                    }
                    onBlur={() => handleBlur("mulheres")}
                    value={mulheresValue === 0 ? "" : mulheresValue}
                    className="flex-1 border-red-400 bg-transparent text-lg text-red-600 placeholder-red-400/40 transition-all focus:border-red-500 focus-visible:ring-red-500"
                    placeholder="0"
                    showValidation={touched.mulheres && hasParticipantes}
                    isValid={mulheresValue > 0}
                  />
                </div>
              </div>

              <div className="group relative space-y-2">
                <Label htmlFor="criancas" className="text-red-400 font-medium">
                  Crianças
                </Label>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-500/10 transition-colors group-focus-within:bg-red-500/20">
                    <CriancaIcon size={30} />
                  </div>
                  <Input
                    id="criancas"
                    type="number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    min="0"
                    onChange={(e) =>
                      handleNumberInput(e.target.value, setCriancas)
                    }
                    onBlur={() => handleBlur("criancas")}
                    value={criancasValue === 0 ? "" : criancasValue}
                    className="flex-1 border-red-400 bg-transparent text-lg text-red-600 placeholder-red-400/40 transition-all focus:border-red-500 focus-visible:ring-red-500"
                    placeholder="0"
                    showValidation={touched.criancas && hasParticipantes}
                    isValid={criancasValue > 0}
                  />
                </div>
              </div>
            </motion.div>

            {/* Total participants indicator */}
            {hasParticipantes && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="pt-2 text-center"
              >
                <p className="text-sm text-gray-600">
                  Total:{" "}
                  <span className="font-semibold text-red-600">
                    {homensValue + mulheresValue + criancasValue}
                  </span>{" "}
                  participantes
                </p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <NavigationButtons
        nextHref="/assados"
        canAdvance={hasParticipantes}
        onNext={handleTryAdvance}
      />
    </div>
  );
}

