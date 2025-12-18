'use client';

import churrascoStore from '@/lib/churrascoStore';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Beef, Beer, CheckCircle, Clock, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useEffect, useState } from 'react';

interface Step {
  id: string;
  label: string;
  shortLabel: string;
  path: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    id: 'participantes',
    label: 'Participantes',
    shortLabel: 'Pessoas',
    path: '/participantes',
    icon: <Users className="h-4 w-4" />,
  },
  {
    id: 'assados',
    label: 'Assados',
    shortLabel: 'Carnes',
    path: '/assados',
    icon: <Beef className="h-4 w-4" />,
  },
  {
    id: 'bebidas',
    label: 'Bebidas',
    shortLabel: 'Bebidas',
    path: '/bebidas',
    icon: <Beer className="h-4 w-4" />,
  },
  {
    id: 'tempo',
    label: 'Tempo',
    shortLabel: 'Tempo',
    path: '/tempo',
    icon: <Clock className="h-4 w-4" />,
  },
  {
    id: 'resultado',
    label: 'Resultado',
    shortLabel: 'Resultado',
    path: '/resultado',
    icon: <CheckCircle className="h-4 w-4" />,
  },
];

// Header height - matches the layout spacer (h-14 = 56px on mobile)
const HEADER_HEIGHT = 56;

export default function ProgressStepper() {
  const pathname = usePathname();
  const { temParticipantes, temAssados, temBebidas } = churrascoStore();
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Track header visibility to adjust stepper position
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 10 || currentScrollY < lastScrollY) {
        setHeaderVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 60) {
        setHeaderVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const currentStepIndex = useMemo(() => {
    if (pathname.startsWith('/resultado')) {
      return steps.findIndex((step) => step.id === 'resultado');
    }
    const index = steps.findIndex((step) => step.path === pathname);
    return index >= 0 ? index : 0;
  }, [pathname]);

  const progressPercentage = useMemo(() => {
    return ((currentStepIndex + 1) / steps.length) * 100;
  }, [currentStepIndex]);

  const getStepStatus = (
    stepIndex: number
  ): 'completed' | 'current' | 'upcoming' => {
    if (stepIndex < currentStepIndex) return 'completed';
    if (stepIndex === currentStepIndex) return 'current';
    return 'upcoming';
  };

  const canNavigateToStep = (stepIndex: number): boolean => {
    if (stepIndex < currentStepIndex) return true;
    if (stepIndex > currentStepIndex) return false;
    return true;
  };

  const isStepComplete = (stepId: string): boolean => {
    switch (stepId) {
      case 'participantes':
        return temParticipantes();
      case 'assados':
        return temAssados();
      case 'bebidas':
        return temBebidas();
      case 'tempo':
        return currentStepIndex > 3;
      case 'resultado':
        return false;
      default:
        return false;
    }
  };

  return (
    <>
      {/* Mobile version - Fixed below header, moves to top when header hides */}
      <div 
        className="sm:hidden fixed left-0 right-0 z-40 bg-white/95 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-300"
        style={{ top: headerVisible ? 56 : 0 }}
      >
        {/* Progress bar - full width */}
        <div className="h-1 bg-gray-200">
          <motion.div
            className="h-full bg-gradient-to-r from-red-500 to-red-600"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>

        {/* Full width step indicators */}
        <div className="flex w-full">
          {steps.map((step, index) => {
            const status = getStepStatus(index);
            const canNavigate = canNavigateToStep(index);
            const isComplete = isStepComplete(step.id);

            const StepContent = (
              <div
                className={cn(
                  'flex flex-col items-center justify-center py-2 flex-1 transition-all duration-200',
                  status === 'current' && 'bg-red-50',
                  status === 'completed' && 'bg-green-50/50'
                )}
              >
                {/* Step indicator */}
                <div
                  className={cn(
                    'flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all',
                    status === 'current' &&
                      'bg-red-500 text-white shadow-md shadow-red-500/30',
                    status === 'completed' && 'bg-green-500 text-white',
                    status === 'upcoming' && 'bg-gray-200 text-gray-400'
                  )}
                >
                  {isComplete && status === 'completed' ? (
                    <CheckCircle className="h-3.5 w-3.5" />
                  ) : (
                    step.icon
                  )}
                </div>
                
                {/* Step label - always visible */}
                <span
                  className={cn(
                    'text-[9px] font-medium mt-0.5 text-center leading-tight',
                    status === 'current' && 'text-red-600',
                    status === 'completed' && 'text-green-600',
                    status === 'upcoming' && 'text-gray-400'
                  )}
                >
                  {step.shortLabel}
                </span>
              </div>
            );

            return canNavigate ? (
              <Link
                key={step.id}
                href={step.path}
                className="flex-1 touch-manipulation active:opacity-80"
                aria-label={`Ir para ${step.label}`}
              >
                {StepContent}
              </Link>
            ) : (
              <div key={step.id} className="flex-1 cursor-not-allowed">
                {StepContent}
              </div>
            );
          })}
        </div>
      </div>

      {/* Spacer for mobile - accounts for stepper only (header spacer is in layout) */}
      <div className="sm:hidden h-[60px]" aria-hidden="true" />

      {/* Desktop version - Full stepper */}
      <div className="hidden sm:block w-full max-w-xl mb-6 pt-4">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const status = getStepStatus(index);
            const canNavigate = canNavigateToStep(index);
            const isComplete = isStepComplete(step.id);

            return (
              <div
                key={step.id}
                className="flex items-center flex-1 last:flex-none"
              >
                {/* Step circle */}
                <div className="flex flex-col items-center">
                  {canNavigate ? (
                    <Link href={step.path} className="group">
                      <motion.div
                        whileHover={canNavigate ? { scale: 1.1 } : {}}
                        whileTap={canNavigate ? { scale: 0.95 } : {}}
                        className={cn(
                          'flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200',
                          status === 'current' &&
                            'bg-red-500 text-white shadow-lg shadow-red-500/30',
                          status === 'completed' && 'bg-green-500 text-white',
                          status === 'upcoming' && 'bg-gray-200 text-gray-400',
                          canNavigate &&
                            status !== 'current' &&
                            'group-hover:ring-2 group-hover:ring-red-300'
                        )}
                      >
                        {isComplete && status === 'completed' ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          step.icon
                        )}
                      </motion.div>
                      <span
                        className={cn(
                          'mt-2 text-xs font-medium text-center block',
                          status === 'current' && 'text-red-600',
                          status === 'completed' && 'text-green-600',
                          status === 'upcoming' && 'text-gray-400'
                        )}
                      >
                        {step.label}
                      </span>
                    </Link>
                  ) : (
                    <div className="cursor-not-allowed">
                      <div
                        className={cn(
                          'flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200',
                          status === 'upcoming' && 'bg-gray-200 text-gray-400'
                        )}
                      >
                        {step.icon}
                      </div>
                      <span
                        className={cn(
                          'mt-2 text-xs font-medium text-center block',
                          status === 'upcoming' && 'text-gray-400'
                        )}
                      >
                        {step.label}
                      </span>
                    </div>
                  )}
                </div>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-2">
                    <div
                      className={cn(
                        'h-1 rounded-full transition-all duration-300',
                        index < currentStepIndex ? 'bg-green-500' : 'bg-gray-200'
                      )}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
