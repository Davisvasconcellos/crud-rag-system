"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { GuestGuard } from "@/components/auth/guest-guard";
import { Building2, Lock, Mail, Eye, EyeOff, AlertCircle, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    setIsSubmitting(true);
    try {
      await login({ email, password });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Erro inesperado ao realizar login. Tente novamente.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFillDemo = () => {
    setEmail("admin@realestate.com");
    setPassword("Admin@123456");
    setErrorMessage(null);
  };

  return (
    <GuestGuard>
      <div className="relative min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4 sm:p-6 overflow-hidden">
        {/* Glow de fundo estético */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-cyan-500/10 dark:bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative w-full max-w-md">
          {/* Logo & Marca */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="h-13 w-13 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-3 shadow-lg shadow-emerald-500/25 flex items-center justify-center text-white mb-4">
              <Building2 className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Real Estate <span className="text-emerald-600 dark:text-emerald-400">RAG</span>
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Plataforma Imobiliária & Inteligência Artificial
            </p>
          </div>

          {/* Card do Formulário */}
          <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-xl shadow-zinc-200/40 dark:shadow-black/40 p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Acesse sua conta
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Informe suas credenciais para entrar no ecossistema
              </p>
            </div>

            {/* Mensagem de Erro */}
            {errorMessage && (
              <div className="mb-6 flex items-start gap-3 p-3.5 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50/80 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-xs sm:text-sm animate-in fade-in slide-in-from-top-1">
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-red-500" />
                <div className="flex-1 font-medium">{errorMessage}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Campo Email */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase tracking-wider">
                  E-mail
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu.email@exemplo.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-zinc-400"
                  />
                </div>
              </div>

              {/* Campo Senha */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                    Senha
                  </label>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-11 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-zinc-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Botão de Envio */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm shadow-md shadow-emerald-600/20 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Autenticando...</span>
                  </>
                ) : (
                  <>
                    <span>Entrar na Plataforma</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Dica para Teste Rápido */}
            <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800/80">
              <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-zinc-100/70 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>Acesso Demo (Admin)</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                    admin@realestate.com
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="shrink-0 flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100/80 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800/50 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  <Sparkles className="h-3 w-3" />
                  Preencher
                </button>
              </div>
            </div>
          </div>

          {/* Rodapé Seguro */}
          <div className="mt-6 text-center text-xs text-zinc-400 dark:text-zinc-500">
            Conexão protegida com JWT e PostgreSQL Dokploy
          </div>
        </div>
      </div>
    </GuestGuard>
  );
}
