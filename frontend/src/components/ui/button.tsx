import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      primary:
        "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 border border-transparent shadow-xs active:scale-[0.98]",
      secondary:
        "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 border border-transparent active:scale-[0.98]",
      outline:
        "border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800/60 shadow-xs active:scale-[0.98]",
      ghost:
        "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800/50",
      destructive:
        "bg-rose-600 text-white hover:bg-rose-700 dark:bg-rose-700 dark:hover:bg-rose-600 shadow-xs active:scale-[0.98]",
    };

    const sizeStyles = {
      sm: "h-8 px-3 text-xs rounded-md gap-1.5",
      md: "h-9 px-4 text-sm rounded-md gap-2",
      lg: "h-11 px-6 text-base rounded-lg gap-2.5",
      icon: "h-9 w-9 p-0 rounded-md justify-center items-center",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin text-current" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
