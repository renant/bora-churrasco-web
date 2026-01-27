"use client";

import { Button } from "@/components/ui/button";
import churrascoStore from "@/lib/churrascoStore";
import { cn } from "@/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, RotateCcw, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export function RecoveryDialog() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const {
    hasSavedProgress,
    getCurrentStep,
    clearSavedProgress,
    homens,
    mulheres,
    criancas,
  } = churrascoStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && hasSavedProgress()) {
      setIsOpen(true);
    }
  }, [isClient, hasSavedProgress]);

  const totalParticipantes = useMemo(
    () => (homens ?? 0) + (mulheres ?? 0) + (criancas ?? 0),
    [homens, mulheres, criancas]
  );

  const handleContinue = () => {
    const currentStep = getCurrentStep();
    setIsOpen(false);
    router.push(currentStep);
  };

  const handleStartNew = () => {
    clearSavedProgress();
    setIsOpen(false);
  };

  if (!isClient) {
    return null;
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content
          className={cn(
            "fixed inset-x-0 bottom-0 z-50 w-full sm:inset-auto sm:left-1/2 sm:top-1/2 sm:w-full sm:max-w-md sm:-translate-x-1/2 sm:-translate-y-1/2",
            "bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl",
            "p-6 sm:p-8",
            "focus:outline-none"
          )}
          aria-describedby="recovery-description"
        >
          <Dialog.Close asChild>
            <button
              type="button"
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
              aria-label="Fechar"
            >
              <X className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </button>
          </Dialog.Close>

          <div className="flex justify-center mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
              <RotateCcw className="h-7 w-7 text-amber-600" aria-hidden="true" />
            </div>
          </div>

          <div className="text-center mb-6">
            <Dialog.Title className="text-xl font-bold text-gray-900 mb-2">
              Continuar de onde parou?
            </Dialog.Title>
            <Dialog.Description
              id="recovery-description"
              className="text-gray-600 text-sm"
            >
              Encontramos um calculo em andamento com{" "}
              <span className="font-semibold text-red-600">
                {totalParticipantes} pessoas
              </span>
              .
            </Dialog.Description>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              onClick={handleContinue}
              className={cn(
                "w-full h-12",
                "bg-red-600 hover:bg-red-700 text-white",
                "font-semibold text-base",
                "shadow-lg shadow-red-600/25"
              )}
            >
              Continuar
              <ArrowRight className="h-5 w-5 ml-2" aria-hidden="true" />
            </Button>

            <Button
              onClick={handleStartNew}
              variant="outline"
              className={cn(
                "w-full h-12",
                "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900",
                "font-medium text-base"
              )}
            >
              Comecar novo calculo
            </Button>
          </div>

          <p className="text-xs text-gray-400 text-center mt-4">
            Dados salvos automaticamente por 24 horas
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
