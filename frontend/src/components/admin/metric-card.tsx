import React from "react";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  description?: string;
  change?: number; // Ex: +14.8 ou -2.3
  periodLabel?: string;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  description,
  change,
  periodLabel = "vs. mês anterior",
  className,
}) => {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  return (
    <div
      className={cn(
        "rounded-lg border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 transition-colors",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-500 uppercase tracking-wide dark:text-zinc-400">
          {title}
        </span>
        {change !== undefined && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full select-none",
              isPositive &&
                "text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/40",
              isNegative &&
                "text-rose-700 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/40",
              !isPositive &&
                !isNegative &&
                "text-zinc-600 bg-zinc-100 dark:text-zinc-400 dark:bg-zinc-800"
            )}
          >
            {isPositive && <ArrowUpRight className="h-3 w-3" />}
            {isNegative && <ArrowDownRight className="h-3 w-3" />}
            {!isPositive && !isNegative && <Minus className="h-3 w-3" />}
            {Math.abs(change)}%
          </span>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-feature-numeric">
          {value}
        </span>
      </div>

      {(description || periodLabel) && (
        <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">
          {description ?? periodLabel}
        </p>
      )}
    </div>
  );
};
