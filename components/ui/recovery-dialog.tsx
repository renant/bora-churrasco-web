"use client";

import { Button } from "@/components/ui/button";
import churrascoStore from "@/lib/churrascoStore";
import { cn } from "@/lib/utils";
import { ArrowRight, RotateCcw, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

  // Ensure we only run on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check for saved progress on mount
  useEffect(() => {
    if (isClient && hasSavedProgress()) {
      setIsOpen(true);
    }
  }, [isClient, hasSavedProgress]);

  if (!isClient || !isOpen) {
    return null;
  }

  const totalParticipantes = (homens ?? 0) + (mulheres ?? 0) + (criancas ?? 0);
  const currentStep = getCurrentStep();

  const handleContinue = () => {
    setIsOpen(false);
    router.push(currentStep);
  };

  const handleStartNew = () => {
    clearSavedProgress();
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        className={cn(
          "relative w-full sm:max-w-md",
          "bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl",
          "p-6 sm:p-8",
          "animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-300"
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="recovery-title"
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Fechar"
        >
          <X className="h-5 w-5 text-gray-400" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
            <RotateCcw className="h-7 w-7 text-amber-600" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-6">
          <h2
            id="recovery-title"
            className="text-xl font-bold text-gray-900 mb-2"
          >
            Continuar de onde parou?
          </h2>
          <p className="text-gray-600 text-sm">
            Encontramos um cálculo em andamento com{" "}
            <span className="font-semibold text-red-600">
              {totalParticipantes} pessoas
            </span>
            .
          </p>
        </div>

        {/* Actions */}
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
            <ArrowRight className="h-5 w-5 ml-2" />
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
            Começar novo cálculo
          </Button>
        </div>

        {/* Note */}
        <p className="text-xs text-gray-400 text-center mt-4">
          Dados salvos automaticamente por 24 horas
        </p>
      </div>
    </div>
  );
}
