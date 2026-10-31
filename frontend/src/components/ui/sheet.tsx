"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export function Sheet({
  open,
  onOpenChange,
  title,
  description,
  children,
}: SheetProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-2xs transition-opacity animate-in fade-in duration-200"
        onClick={() => onOpenChange(false)}
      />

      {/* Slide-over panel */}
      <div className="relative z-50 flex h-full w-full max-w-md flex-col border-l border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 animate-in slide-in-from-right duration-250">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <div>
            {title && (
              <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                {description}
              </p>
            )}
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pt-4">{children}</div>
      </div>
    </div>
  );
}
