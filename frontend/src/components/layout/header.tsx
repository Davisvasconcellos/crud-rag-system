"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Bell,
  Sun,
  Moon,
  Plus,
  Command,
  Menu,
  X,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/contexts/sidebar-context";

export const Header: React.FC = () => {
  const { mobileOpen, toggleMobile } = useSidebar();
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Sincroniza tema inicial a partir do DOM / localStorage / prefers-color-scheme
    const isDarkActive =
      document.documentElement.classList.contains("dark") ||
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (isDarkActive) {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-bs-theme", "dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-bs-theme", "light");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-bs-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-bs-theme", "light");
      localStorage.setItem("theme", "light");
    }
    window.dispatchEvent(new Event("themechange"));
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-zinc-200 bg-white/95 px-3.5 sm:px-6 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/95 transition-colors">
      {/* Lado Esquerdo: Botão Mobile Menu + Logo Mobile + Busca */}
      <div className="flex items-center gap-2.5 sm:gap-3 flex-1 max-w-xl">
        {/* Botão Hambúrguer Mobile (lg:hidden) com efeito de transição */}
        <button
          type="button"
          onClick={toggleMobile}
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 transition-all cursor-pointer shrink-0"
        >
          {mobileOpen ? (
            <X className="h-4 w-4 transition-transform duration-200 rotate-90" />
          ) : (
            <Menu className="h-4 w-4 transition-transform duration-200" />
          )}
        </button>

        {/* Brand Logo visível em telas pequenas no header */}
        <Link href="/dashboard" className="flex items-center gap-2 lg:hidden shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs">
            <Building2 className="h-4 w-4" />
          </div>
          <span className="text-xs font-bold tracking-tight text-zinc-900 dark:text-zinc-100 hidden sm:inline">
            IMOB·PLATFORM
          </span>
        </Link>

        {/* Busca Rápida Universal Responsiva */}
        <div className="relative flex-1 min-w-[140px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
          <input
            type="text"
            placeholder="Buscar no RAG..."
            className="h-9 w-full rounded-lg border border-zinc-200 bg-zinc-50/70 pl-8 pr-3 sm:pr-14 text-xs shadow-2xs transition-all placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white focus:outline-hidden dark:border-zinc-800 dark:bg-zinc-800/40 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-700 dark:focus:bg-zinc-900"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-0.5 rounded border border-zinc-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 select-none">
            <Command className="h-2.5 w-2.5" /> K
          </div>
        </div>
      </div>

      {/* Lado Direito: Ações, Status, Alternador de Tema e Notificações */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-2">
        {/* Status da Conexão RAG & WhatsApp (visível em telas médias/grandes) */}
        <div className="hidden md:flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1 text-xs font-medium text-emerald-800 dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-300">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>RAG & WhatsApp Online</span>
        </div>

        {/* Alternador de Tema Dark/Light */}
        <button
          onClick={toggleTheme}
          type="button"
          aria-label={isDark ? "Mudar para modo claro" : "Mudar para modo escuro"}
          className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition-colors cursor-pointer"
          title={isDark ? "Mudar para Modo Claro" : "Mudar para Modo Escuro"}
        >
          {mounted ? (
            isDark ? (
              <Sun className="h-4 w-4 text-amber-500 transition-transform duration-200 rotate-0 hover:rotate-45" />
            ) : (
              <Moon className="h-4 w-4 text-zinc-600 transition-transform duration-200 hover:-rotate-12" />
            )
          ) : (
            <span className="inline-block h-4 w-4" />
          )}
        </button>

        {/* Notificações */}
        <button
          onClick={() => setNotificationsOpen(!notificationsOpen)}
          type="button"
          aria-label="Notificações"
          className="relative rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition-colors cursor-pointer"
          title="Notificações"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-600 ring-2 ring-white dark:ring-zinc-900" />
        </button>

        <div className="hidden sm:block h-5 w-px bg-zinc-200 dark:bg-zinc-800" />

        {/* Botão de Ação Rápida: Novo Imóvel */}
        <Link href="/properties/new">
          <Button size="sm" className="hidden sm:inline-flex cursor-pointer shadow-xs">
            <Plus className="h-3.5 w-3.5" />
            <span>Novo Imóvel</span>
          </Button>
          <button
            type="button"
            className="sm:hidden flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs cursor-pointer"
            title="Novo Imóvel"
          >
            <Plus className="h-4 w-4" />
          </button>
        </Link>
      </div>
    </header>
  );
};
