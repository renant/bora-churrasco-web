'use client';

import churrascoStore from '@/lib/churrascoStore';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Beef, Beer, CheckCircle, Clock, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

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
    shortLabel: 'Part.',
    path: '/participantes',
    icon: <Users className="h-4 w-4" />,
  },
  {
    id: 'assados',
    label: 'Assados',
    shortLabel: 'Assa.',
    path: '/assados',
    icon: <Beef className="h-4 w-4" />,
  },
  {
    id: 'bebidas',
    label: 'Bebidas',
    shortLabel: 'Beb.',
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
    shortLabel: 'Result.',
    path: '/resultado',
    icon: <CheckCircle className="h-4 w-4" />,
  },
];

export default function ProgressStepper() {
  const pathname = usePathname();
  const { temParticipantes, temAssados, temBebidas } = churrascoStore();

  const currentStepIndex = useMemo(() => {
    // Handle resultado page which can be /resultado or /resultado/[id]
    if (pathname.startsWith('/resultado')) {
      return steps.findIndex((step) => step.id === 'resultado');
    }
    const index = steps.findIndex((step) => step.path === pathname);
    return index >= 0 ? index : 0;
  }, [pathname]);

  const getStepStatus = (
    stepIndex: number
  ): 'completed' | 'current' | 'upcoming' => {
    if (stepIndex < currentStepIndex) return 'completed';
    if (stepIndex === currentStepIndex) return 'current';
    return 'upcoming';
  };

  const canNavigateToStep = (stepIndex: number): boolean => {
    // Can always navigate to previous steps
    if (stepIndex < currentStepIndex) return true;
    // Can't skip to future steps
    if (stepIndex > currentStepIndex) return false;
    // Current step is always accessible
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
    <div className="w-full max-w-xl mb-6">
      {/* Desktop version */}
      <div className="hidden sm:flex items-center justify-between">
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

      {/* Mobile version - compact */}
      <div className="flex sm:hidden items-center justify-between px-2">
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
                        'flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 text-xs font-bold',
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
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </motion.div>
                  </Link>
                ) : (
                  <div
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 text-xs font-bold cursor-not-allowed',
                      status === 'upcoming' && 'bg-gray-200 text-gray-400'
                    )}
                  >
                    <span>{index + 1}</span>
                  </div>
                )}
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-1">
                  <div
                    className={cn(
                      'h-0.5 rounded-full transition-all duration-300',
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
  );
}
