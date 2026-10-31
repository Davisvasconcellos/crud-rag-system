import React from "react";

export const PropertyGridSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden animate-pulse"
        >
          {/* Proporção 16:10 idêntica ao card real (Zero CLS) */}
          <div className="aspect-[16/10] w-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-zinc-200 rounded-md w-3/4 dark:bg-zinc-800" />
            <div className="h-3 bg-zinc-100 rounded-md w-1/2 dark:bg-zinc-800/60" />
            <div className="h-7 bg-zinc-100 rounded-md dark:bg-zinc-800/60" />
            <div className="flex justify-between items-center pt-2">
              <div className="h-5 bg-zinc-200 rounded-md w-1/3 dark:bg-zinc-800" />
              <div className="h-3 bg-zinc-100 rounded-md w-1/4 dark:bg-zinc-800/60" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
