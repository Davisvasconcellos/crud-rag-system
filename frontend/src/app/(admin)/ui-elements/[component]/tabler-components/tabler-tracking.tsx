"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle, ShieldCheck, Server } from "lucide-react";

export function TablerTracking() {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  // 45 days of status simulation
  const days = Array.from({ length: 45 }, (_, i) => {
    const isDegraded = i === 12;
    const isDown = i === 28;
    return {
      day: 45 - i,
      status: isDown ? "downtime" : isDegraded ? "degraded" : "operational",
      label: isDown ? "Interrupção (12 min)" : isDegraded ? "Latência Elevada (Portal ZAP)" : "100% Operacional",
      date: `Dia ${45 - i} atrás`,
    };
  });

  return (
    <div className="space-y-6">
      {/* 1. Basic Tracking Block */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Tabler Tracking (Uptime & Activity History)</CardTitle>
              <CardDescription>
                Tracking blocks display service health or sync activity as a dense row of colored status bars.
              </CardDescription>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 px-2.5 py-1 rounded">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>99.96% Uptime</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Service 1: API de Integração com Portais */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Server className="h-3.5 w-3.5 text-blue-600" />
                API de Sincronização de Anúncios (ZAP / VivaReal / OLX)
              </span>
              <span className="text-zinc-400 font-mono">Últimos 45 dias</span>
            </div>

            {/* Dense Bars */}
            <div className="flex items-center gap-1 h-8 p-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              {days.map((item, idx) => {
                const color =
                  item.status === "downtime"
                    ? "bg-rose-500 hover:bg-rose-600"
                    : item.status === "degraded"
                    ? "bg-amber-400 hover:bg-amber-500"
                    : "bg-emerald-500 hover:bg-emerald-600";

                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredBar(`${item.date}: ${item.label}`)}
                    onMouseLeave={() => setHoveredBar(null)}
                    className={`flex-1 h-full rounded-2xs transition-all cursor-pointer ${color}`}
                  />
                );
              })}
            </div>

            {/* Legend & Hover Tooltip */}
            <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-1">
              <span>45 dias atrás</span>
              <span className="font-mono text-zinc-700 dark:text-zinc-300 font-semibold min-h-[16px]">
                {hoveredBar || "Passe o cursor sobre as barras para ver o histórico"}
              </span>
              <span>Hoje</span>
            </div>
          </div>

          {/* Service 2: RAG Inteligência Artificial */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-purple-600" />
                Agente RAG de Análise Cartorária
              </span>
              <span className="text-zinc-400 font-mono">100.0% Operacional</span>
            </div>
            <div className="flex items-center gap-1 h-6 p-1 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              {days.map((_, idx) => (
                <div
                  key={idx}
                  className="flex-1 h-full rounded-2xs bg-emerald-500 hover:bg-emerald-400 transition-colors"
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Squares Variant (Contribution Grid) */}
      <Card>
        <CardHeader>
          <CardTitle>Squares Variant (Weekly Matrix)</CardTitle>
          <CardDescription>
            Heatmap grid of visits and customer engagements over the past weeks.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1.5 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            {Array.from({ length: 70 }).map((_, i) => {
              const intensity = (i * 7) % 5;
              const bg = [
                "bg-zinc-200 dark:bg-zinc-800",
                "bg-emerald-200 dark:bg-emerald-950",
                "bg-emerald-400 dark:bg-emerald-800",
                "bg-emerald-500 dark:bg-emerald-600",
                "bg-emerald-600 dark:bg-emerald-500",
              ][intensity];

              return (
                <div
                  key={i}
                  className={`h-4 w-4 rounded-xs transition-transform hover:scale-125 cursor-pointer ${bg}`}
                  title={`Atividade: Nível ${intensity}`}
                />
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
