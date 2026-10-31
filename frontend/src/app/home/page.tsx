"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { AuthGuard } from "@/components/auth/auth-guard";
import {
  Building2,
  LogOut,
  Shield,
  User as UserIcon,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  Hash,
  LayoutDashboard,
  CheckCircle2,
  ExternalLink,
  Moon,
  Sun,
} from "lucide-react";

export default function HomePage() {
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Inicializa tema escuro a partir do HTML
  React.useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
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
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (!user) return null;

  const roleLabelMap: Record<string, { label: string; color: string }> = {
    master: { label: "Master", color: "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800" },
    admin: { label: "Administrador", color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800" },
    manager: { label: "Gerente", color: "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800" },
    people: { label: "Usuário Padrão", color: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700" },
    volunteer: { label: "Colaborador", color: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800" },
  };

  const roleConfig = roleLabelMap[user.role] || {
    label: user.role.toUpperCase(),
    color: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700",
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-zinc-50/80 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col">
        {/* Topbar Minimalista */}
        <header className="sticky top-0 z-30 border-b border-zinc-200 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold text-sm sm:text-base tracking-tight text-zinc-900 dark:text-white">
                Real Estate <span className="text-emerald-600 dark:text-emerald-400">RAG</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 font-medium">
                Home
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Toggle de Tema */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title="Alternar Tema"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Botão de Logout */}
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-xl border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 text-xs font-medium transition-all active:scale-95 disabled:opacity-60 cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>{isLoggingOut ? "Saindo..." : "Sair"}</span>
            </button>
          </div>
        </header>

        {/* Conteúdo Central */}
        <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8 flex flex-col justify-center">
          <div className="rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-xl shadow-zinc-200/30 dark:shadow-black/50 p-6 sm:p-10 backdrop-blur-sm transition-all">
            
            {/* Header do Card com Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-4">
                {user.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.avatar_url}
                    alt={user.name}
                    className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-cover border-2 border-emerald-500/20 shadow-md"
                  />
                ) : (
                  <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white font-bold text-2xl shadow-md">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${roleConfig.color}`}>
                      {roleConfig.label}
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Ativo
                    </span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    Bem-vindo(a), {user.name}!
                  </h1>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                    Sua sessão está ativa e autenticada com sucesso.
                  </p>
                </div>
              </div>

              {/* Botão de Ação Primária */}
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs sm:text-sm shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Ir para o Dashboard CRM</span>
                <ExternalLink className="h-3.5 w-3.5 ml-0.5 opacity-70" />
              </Link>
            </div>

            {/* Informações Relevantes do Usuário */}
            <div className="mt-8">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4">
                Informações da Conta & Perfil
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {/* E-mail */}
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800">
                  <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs mb-1">
                    <Mail className="h-3.5 w-3.5 text-emerald-500" />
                    <span>E-mail</span>
                  </div>
                  <div className="font-medium text-sm text-zinc-900 dark:text-zinc-100 truncate">
                    {user.email}
                  </div>
                </div>

                {/* Grupo / Perfil */}
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800">
                  <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs mb-1">
                    <Shield className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Grupo / Nível</span>
                  </div>
                  <div className="font-medium text-sm text-zinc-900 dark:text-zinc-100">
                    {roleConfig.label} ({user.role})
                  </div>
                </div>

                {/* Telefone */}
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800">
                  <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs mb-1">
                    <Phone className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Telefone</span>
                  </div>
                  <div className="font-medium text-sm text-zinc-900 dark:text-zinc-100">
                    {user.phone || "Não informado"}
                  </div>
                </div>

                {/* Plano */}
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800">
                  <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs mb-1">
                    <CreditCard className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Plano Contratado</span>
                  </div>
                  <div className="font-medium text-sm text-zinc-900 dark:text-zinc-100">
                    {user.plan?.name || "Plano Standard"}
                  </div>
                  {user.plan?.price && (
                    <div className="text-[11px] text-zinc-500 mt-0.5">
                      R$ {Number(user.plan.price).toFixed(2)}/mês
                    </div>
                  )}
                </div>

                {/* Status E-mail */}
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800">
                  <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs mb-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Verificação</span>
                  </div>
                  <div className="font-medium text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    {user.email_verified ? "E-mail Verificado" : "Pendente"}
                  </div>
                </div>

                {/* ID Code */}
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800">
                  <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs mb-1">
                    <Hash className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Código ID (UUID)</span>
                  </div>
                  <div className="font-mono text-xs text-zinc-700 dark:text-zinc-300 truncate" title={user.id_code}>
                    {user.id_code}
                  </div>
                </div>
              </div>
            </div>

            {/* Ações Inferiores */}
            <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500">
                <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                <span>
                  Cadastrado em:{" "}
                  {user.created_at
                    ? new Date(user.created_at).toLocaleDateString("pt-BR")
                    : "Data recente"}
                </span>
              </div>

              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-800 text-xs font-medium transition-all active:scale-95 disabled:opacity-60 cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>{isLoggingOut ? "Encerrando sessão..." : "Encerrar Sessão"}</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
