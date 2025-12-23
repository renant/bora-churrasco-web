"use client";

import churrascoStore from "@/lib/churrascoStore";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useCallback } from "react";

interface CustomizeCtaProps {
  participantes: number;
  className?: string;
}

export default function CustomizeCta({
  participantes,
  className,
}: CustomizeCtaProps) {
  const { setParticipantesFromUrl } = churrascoStore();

  const handleClick = useCallback(() => {
    setParticipantesFromUrl(participantes);
  }, [participantes, setParticipantesFromUrl]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className={cn("w-full max-w-md mx-auto", className)}
    >
      <div className="relative overflow-hidden rounded-xl border-2 border-dashed border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 p-6 shadow-sm">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-amber-200/30 blur-2xl" />
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-20 w-20 rounded-full bg-orange-200/30 blur-2xl" />

        <div className="relative">
          {/* Icon */}
          <div className="mb-4 inline-flex items-center justify-center p-2 bg-amber-100 rounded-full">
            <Sparkles className="h-5 w-5 text-amber-600" />
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Quer personalizar seu churrasco?
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4">
            Este cálculo é para um churrasco padrão com todos os tipos de carnes
            e bebidas. Clique abaixo para escolher tipos específicos!
          </p>

          {/* CTA Button */}
          <Link
            href="/participantes"
            onClick={handleClick}
            className={cn(
              "inline-flex items-center justify-center gap-2 w-full",
              "px-4 py-3 rounded-lg font-semibold text-sm",
              "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
              "shadow-md shadow-amber-500/25",
              "hover:from-amber-600 hover:to-orange-600",
              "active:scale-[0.98]",
              "transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            )}
          >
            Personalizar meu churrasco
            <ArrowRight className="h-4 w-4" />
          </Link>

          {/* Hint text */}
          <p className="mt-3 text-xs text-gray-500 text-center">
            Número de participantes já preenchido: {participantes}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
