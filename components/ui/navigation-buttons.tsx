"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface NavigationButtonsProps {
  backHref?: string;
  nextHref?: string;
  onNext?: () => void;
  canAdvance?: boolean;
  nextLabel?: string;
  backLabel?: string;
  isLoading?: boolean;
  loadingLabel?: string;
  className?: string;
}

export function NavigationButtons({
  backHref,
  nextHref,
  onNext,
  canAdvance = true,
  nextLabel = "Avançar",
  backLabel = "Voltar",
  isLoading = false,
  loadingLabel = "Carregando...",
  className,
}: NavigationButtonsProps) {
  const isDisabled = !canAdvance || isLoading;

  return (
    <>
      {/* Spacer to prevent content from being hidden behind fixed buttons on mobile */}
      <div className="h-24 sm:hidden" aria-hidden="true" />

      {/* Fixed navigation bar on mobile, normal flow on desktop */}
      <div
        className={cn(
          // Mobile: fixed at bottom
          "fixed bottom-0 left-0 right-0 z-50 sm:relative sm:bottom-auto sm:left-auto sm:right-auto",
          // Background and shadow for mobile
          "bg-white/95 backdrop-blur-sm shadow-[0_-4px_20px_rgba(0,0,0,0.1)] sm:bg-transparent sm:shadow-none sm:backdrop-blur-none",
          // Padding
          "px-4 py-4 sm:px-0 sm:py-0",
          // Safe area for notched devices
          "pb-[max(1rem,env(safe-area-inset-bottom))]",
          className
        )}
      >
        <div className="flex items-center justify-between gap-3 max-w-xl mx-auto sm:mt-8 mt-0">
          {/* Back button */}
          {backHref ? (
            <Button
              variant="outline"
              size="lg"
              asChild
              className={cn(
                "flex-1 sm:flex-none",
                "min-h-[48px] min-w-[48px]",
                "px-4 sm:px-6 py-3",
                "text-base font-medium",
                "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900",
                "touch-manipulation",
                "active:scale-[0.98] transition-transform"
              )}
            >
              <Link href={backHref}>
                <ChevronLeft className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">{backLabel}</span>
                <span className="sm:hidden">Voltar</span>
              </Link>
            </Button>
          ) : (
            <div className="flex-1 sm:flex-none" />
          )}

          {/* Next button */}
          {nextHref ? (
            <Link
              href={nextHref}
              className={cn(
                "flex-1 sm:flex-none",
                isDisabled && "pointer-events-none"
              )}
              tabIndex={isDisabled ? -1 : undefined}
            >
              <Button
                variant="default"
                size="lg"
                disabled={isDisabled}
                onClick={onNext}
                className={cn(
                  "w-full",
                  "min-h-[48px] min-w-[48px]",
                  "px-6 sm:px-8 py-3",
                  "text-base font-semibold",
                  "bg-red-600 hover:bg-red-700 text-white",
                  "shadow-lg shadow-red-600/25",
                  "touch-manipulation",
                  "active:scale-[0.98] transition-all",
                  isDisabled && "opacity-50 cursor-not-allowed shadow-none"
                )}
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner className="mr-2" />
                    {loadingLabel}
                  </>
                ) : (
                  <>
                    {nextLabel}
                    <ChevronRight className="h-5 w-5 ml-1" />
                  </>
                )}
              </Button>
            </Link>
          ) : onNext ? (
            <Button
              variant="default"
              size="lg"
              disabled={isDisabled}
              onClick={onNext}
              className={cn(
                "flex-1 sm:flex-none",
                "min-h-[48px] min-w-[48px]",
                "px-6 sm:px-8 py-3",
                "text-base font-semibold",
                "bg-red-600 hover:bg-red-700 text-white",
                "shadow-lg shadow-red-600/25",
                "touch-manipulation",
                "active:scale-[0.98] transition-all",
                isDisabled && "opacity-50 cursor-not-allowed shadow-none"
              )}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner className="mr-2" />
                  {loadingLabel}
                </>
              ) : (
                <>
                  {nextLabel}
                  <ChevronRight className="h-5 w-5 ml-1" />
                </>
              )}
            </Button>
          ) : null}
        </div>
      </div>
    </>
  );
}

function LoadingSpinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin h-5 w-5", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
