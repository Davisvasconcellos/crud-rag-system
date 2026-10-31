"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  Info,
  X,
  Cookie,
  User,
  Building,
} from "lucide-react";
import { toast } from "sonner";

export function TablerToasts() {
  const [showCookiesToast, setShowCookiesToast] = useState(true);

  return (
    <div className="space-y-6">
      {/* 1. Triggers */}
      <Card>
        <CardHeader>
          <CardTitle>Tabler Toasts (Corner Notifications)</CardTitle>
          <CardDescription>
            Toasts show brief, non-intrusive notifications in the corner of the screen with avatars, action buttons, and auto-dismiss.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              type="button"
              onClick={() =>
                toast.success("Proposta recebida!", {
                  description: "Comprador enviou oferta de R$ 3.800.000 para a Cobertura Jardins.",
                  action: {
                    label: "Ver Proposta",
                    onClick: () => toast.info("Abrindo detalhes da proposta..."),
                  },
                })
              }
              className="px-3.5 py-2 text-xs font-semibold rounded-md bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs cursor-pointer"
            >
              Toast Success
            </button>

            <button
              type="button"
              onClick={() =>
                toast.error("Alerta de Matrícula", {
                  description: "Certidão de ônus com pendência averbada no cartório.",
                })
              }
              className="px-3.5 py-2 text-xs font-semibold rounded-md bg-rose-600 hover:bg-rose-700 text-white shadow-xs cursor-pointer"
            >
              Toast Error
            </button>

            <button
              type="button"
              onClick={() =>
                toast.info("Novo Lead WhatsApp", {
                  description: "Rodrigo Silveira iniciou conversa sobre o Residencial Fasano.",
                })
              }
              className="px-3.5 py-2 text-xs font-semibold rounded-md bg-blue-600 hover:bg-blue-700 text-white shadow-xs cursor-pointer"
            >
              Toast Info / Lead
            </button>

            <button
              type="button"
              onClick={() =>
                toast.warning("Sessão Expirando", {
                  description: "Sua autenticação de corretor expira em 5 minutos.",
                })
              }
              className="px-3.5 py-2 text-xs font-semibold rounded-md bg-amber-500 hover:bg-amber-600 text-white shadow-xs cursor-pointer"
            >
              Toast Warning
            </button>
          </div>
        </CardContent>
      </Card>

      {/* 2. Visual Tabler Toast Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Simple Toast Example */}
        <Card>
          <CardHeader>
            <CardTitle>Simple Toast Layout</CardTitle>
            <CardDescription>Tabler structure with header, avatar, timestamp, and body text.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full max-w-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg p-3 space-y-2">
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
                <div className="flex items-center gap-2">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=60&q=80"
                    alt="User"
                    className="h-6 w-6 rounded-full object-cover"
                  />
                  <strong className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    Rodrigo Silveira
                  </strong>
                </div>
                <div className="flex items-center gap-2">
                  <small className="text-[10px] text-zinc-400">11 min atrás</small>
                  <button type="button" className="text-zinc-400 hover:text-zinc-600">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Olá Davis, confirmo nossa visita amanhã às 15:00 na cobertura dos Jardins!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Cookies / Consent Toast Example */}
        <Card>
          <CardHeader>
            <CardTitle>Cookies Consent Toast</CardTitle>
            <CardDescription>Persistent consent card with Accept and Decline actions.</CardDescription>
          </CardHeader>
          <CardContent>
            {showCookiesToast ? (
              <div className="w-full max-w-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-xs">
                    <Cookie className="h-4 w-4 text-amber-500" />
                    <span>Preferências de Cookies & LGPD</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowCookiesToast(false)}
                    className="text-zinc-400 hover:text-zinc-600 cursor-pointer"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Utilizamos cookies e tecnologias semelhantes para aprimorar sua experiência de navegação e personalizar anúncios de imóveis.
                </p>
                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      toast.success("Cookies aceitos!");
                      setShowCookiesToast(false);
                    }}
                    className="flex-1 py-1.5 text-xs font-semibold rounded bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  >
                    Aceitar Todos
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCookiesToast(false)}
                    className="px-3 py-1.5 text-xs rounded border border-zinc-200 dark:border-zinc-700 font-medium"
                  >
                    Recusar
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowCookiesToast(true)}
                className="px-3 py-1.5 text-xs rounded border border-zinc-200 dark:border-zinc-700 font-medium"
              >
                Reexibir Toast de Cookies
              </button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
