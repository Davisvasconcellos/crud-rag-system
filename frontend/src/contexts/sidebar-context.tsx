"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface SidebarContextType {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  toggleMobile: () => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  toggleCollapsed: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  // Fecha o menu mobile automaticamente ao navegar
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Tranca o scroll do body apenas em telas pequenas quando o menu mobile está aberto
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const toggleCollapsed = () => setCollapsed((prev) => !prev);

  return (
    <SidebarContext.Provider
      value={{
        mobileOpen,
        setMobileOpen,
        toggleMobile,
        collapsed,
        setCollapsed,
        toggleCollapsed,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
