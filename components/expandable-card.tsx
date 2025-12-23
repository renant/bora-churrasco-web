"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface ExpandableCardProps {
  title: string;
  icon: React.ReactNode;
  total?: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  variant?: "red" | "blue" | "green";
  className?: string;
}

const variantStyles = {
  red: {
    border: "border-red-100",
    headerBg: "bg-red-50/30",
    headerBorder: "border-red-50",
    titleColor: "text-red-700",
    hoverBg: "hover:bg-red-50/50",
  },
  blue: {
    border: "border-blue-100",
    headerBg: "bg-blue-50/30",
    headerBorder: "border-blue-50",
    titleColor: "text-blue-700",
    hoverBg: "hover:bg-blue-50/50",
  },
  green: {
    border: "border-green-100",
    headerBg: "bg-green-50/30",
    headerBorder: "border-green-50",
    titleColor: "text-green-700",
    hoverBg: "hover:bg-green-50/50",
  },
};

export default function ExpandableCard({
  title,
  icon,
  total,
  children,
  defaultExpanded = false,
  variant = "red",
  className,
}: ExpandableCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        "rounded-lg border shadow-sm transition-shadow",
        styles.border,
        isExpanded && "shadow-md",
        className
      )}
    >
      {/* Header - Always visible, clickable */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "w-full flex items-center justify-between p-4 transition-all duration-200",
          "rounded-t-lg",
          !isExpanded && "rounded-b-lg",
          styles.headerBg,
          styles.hoverBg,
          "focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-inset"
        )}
        aria-expanded={isExpanded}
        aria-controls={`expandable-content-${title}`}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          <span className={cn("text-lg font-semibold", styles.titleColor)}>
            {title}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {total && !isExpanded && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm font-medium text-gray-500"
            >
              {total}
            </motion.span>
          )}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className={cn("h-5 w-5", styles.titleColor)} />
          </motion.div>
        </div>
      </button>

      {/* Content - Expandable */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id={`expandable-content-${title}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className={cn("p-4 pt-2 border-t", styles.headerBorder)}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
