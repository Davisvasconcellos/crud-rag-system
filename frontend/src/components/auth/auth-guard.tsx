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
      const timer = setTimeout(() => {
        if (!isAuthenticated) {
          window.location.href = "/login";
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading, isAuthenticated, router]);

  return <>{children}</>;
}
