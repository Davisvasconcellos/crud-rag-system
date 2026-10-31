"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
      // Fallback de segurança se o router do Next demorar
      const timer = setTimeout(() => {
        if (!isAuthenticated) {
          window.location.href = "/login";
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium animate-pulse">
            {!isAuthenticated ? "Redirecionando para login..." : "Verificando autenticação..."}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
