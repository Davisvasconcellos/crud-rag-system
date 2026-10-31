"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import {
  Shield,
  Mail,
  Phone,
  CreditCard,
  Hash,
  LayoutDashboard,
  CheckCircle2,
  Users,
  Building2,
  Bot,
  LogOut,
  ArrowRight,
  Clock,
} from "lucide-react";

export function HomeClient() {
  const { user, logout, isLoading } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (!user || isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
            <div className="h-7 w-64 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
          </div>
          <div className="h-9 w-28 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
        </div>

        {/* Card Skeleton */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
            <div className="space-y-2 flex-1">
              <div className="h-5 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
              <div className="h-6 w-48 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
              <div className="h-4 w-72 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 rounded-xl bg-zinc-100 dark:bg-zinc-800/40" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const roleLabelMap: Record<string, { label: string; color: string }> = {
    master: {
      label: "Master",
      color: "bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800",
    },
    admin: {
      label: "Administrador",
      color: "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    },
    manager: {
      label: "Gerente",
      color: "bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    },
    people: {
      label: "Usuário Padrão",
      color: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700",
    },
    volunteer: {
      label: "Colaborador",
      color: "bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    },
  };

  const roleConfig = roleLabelMap[user.role] || {
    label: user.role.toUpperCase(),
    color: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700",
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header da Página com Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mb-1">
            <span>Plataforma</span>
            <span>/</span>
            <span className="text-zinc-900 dark:text-zinc-100 font-medium">Início</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Painel Inicial & Boas-Vindas
          </h1>
        </div>

        {/* Botão de Logout Rápido */}
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 text-xs font-medium transition-all active:scale-95 disabled:opacity-60 cursor-pointer self-start sm:self-auto"
        >
          <LogOut className="h-4 w-4" />
          <span>{isLoggingOut ? "Encerrando..." : "Encerrar Sessão"}</span>
        </button>
      </div>

      {/* Card Principal de Boas-Vindas */}
      <div className="relative overflow-hidden rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-sm p-6 sm:p-8 backdrop-blur-sm">
        {/* Glow decorativo */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-4 sm:gap-5">
            {user.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.avatar_url}
                alt={user.name}
                className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-cover border-2 border-emerald-500/20 shadow-md shrink-0"
              />
            ) : (
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white font-bold text-2xl shadow-md shrink-0">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${roleConfig.color}`}>
                  {roleConfig.label}
                </span>
                <span className="flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Sessão Ativa
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                Olá, {user.name}!
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                Você está autenticado na plataforma imobiliária com privilégios de <strong className="text-zinc-700 dark:text-zinc-200">{roleConfig.label}</strong>.
              </p>
            </div>
          </div>

          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs sm:text-sm shadow-sm active:scale-95 transition-all shrink-0"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Acessar Dashboard CRM</span>
            <ArrowRight className="h-3.5 w-3.5 ml-0.5" />
          </Link>
        </div>

        {/* Grid de Informações Detalhadas do Usuário */}
        <div className="mt-6">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3.5">
            Dados da Sua Conta & Acesso
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* E-mail */}
            <div className="p-3.5 rounded-xl bg-zinc-50/70 dark:bg-zinc-800/30 border border-zinc-200/60 dark:border-zinc-800/80">
              <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 text-xs mb-1">
                <Mail className="h-3.5 w-3.5 text-emerald-500" />
                <span>E-mail</span>
              </div>
              <div className="font-semibold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 truncate">
                {user.email}
              </div>
            </div>

            {/* Perfil & Grupo */}
            <div className="p-3.5 rounded-xl bg-zinc-50/70 dark:bg-zinc-800/30 border border-zinc-200/60 dark:border-zinc-800/80">
              <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 text-xs mb-1">
                <Shield className="h-3.5 w-3.5 text-emerald-500" />
                <span>Grupo de Acesso</span>
              </div>
              <div className="font-semibold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100">
                {roleConfig.label} ({user.role})
              </div>
            </div>

            {/* Plano Contratado */}
            <div className="p-3.5 rounded-xl bg-zinc-50/70 dark:bg-zinc-800/30 border border-zinc-200/60 dark:border-zinc-800/80">
              <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 text-xs mb-1">
                <CreditCard className="h-3.5 w-3.5 text-emerald-500" />
                <span>Plano Atual</span>
              </div>
              <div className="font-semibold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100">
                {user.plan?.name || "Plano Standard"}
              </div>
              {user.plan?.price && (
                <div className="text-[10px] text-zinc-500 mt-0.5">
                  R$ {Number(user.plan.price).toFixed(2)}/mês
                </div>
              )}
            </div>

            {/* Status Verificação */}
            <div className="p-3.5 rounded-xl bg-zinc-50/70 dark:bg-zinc-800/30 border border-zinc-200/60 dark:border-zinc-800/80">
              <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 text-xs mb-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                <span>Status da Conta</span>
              </div>
              <div className="font-semibold text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Ativo & Verificado
              </div>
            </div>
          </div>
        </div>

        {/* Meta informações / Segurança */}
        <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/60 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-2 truncate">
            <Hash className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
            <span className="truncate font-mono text-[11px]" title={user.id_code}>
              UUID: {user.id_code}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Phone className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
            <span>Telefone: {user.phone || "Não informado"}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
            <span>
              Cadastro:{" "}
              {user.created_at
                ? new Date(user.created_at).toLocaleDateString("pt-BR")
                : "Recente"}
            </span>
          </div>
        </div>
      </div>

      {/* Seção de Atalhos Rápidos para a Plataforma */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3.5">
          Atalhos da Plataforma Imobiliária
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/dashboard"
            className="group p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-emerald-500/40 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 flex items-center justify-center">
                <LayoutDashboard className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-zinc-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
            </div>
            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Dashboard Analítico
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Métricas de VGV, gráficos ApexCharts e visão geral de performance.
            </p>
          </Link>

          <Link
            href="/leads"
            className="group p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-emerald-500/40 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 flex items-center justify-center">
                <Users className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-zinc-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
            </div>
            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Leads & CRM Kanban
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Funil de vendas com reordenação de cards e etapas de negociação.
            </p>
          </Link>

          <Link
            href="/properties"
            className="group p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-emerald-500/40 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400 flex items-center justify-center">
                <Building2 className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-zinc-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
            </div>
            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Gestão de Imóveis
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Vitrine de unidades, valores, fotos e cadastros imobiliários.
            </p>
          </Link>

          <Link
            href="/rag/laboratory"
            className="group p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-emerald-500/40 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-xl bg-teal-50 text-teal-600 dark:bg-teal-950/60 dark:text-teal-400 flex items-center justify-center">
                <Bot className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-zinc-400 group-hover:text-teal-500 group-hover:translate-x-1 transition-all" />
            </div>
            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Laboratório RAG
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Consultas semânticas, busca vetorial e testes com IA generativa.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
