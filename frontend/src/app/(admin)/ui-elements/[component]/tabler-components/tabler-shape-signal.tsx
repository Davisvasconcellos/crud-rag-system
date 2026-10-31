"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  Building2,
  Key,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Sparkles,
  Award,
  Layers,
  Smartphone,
  CheckCircle,
} from "lucide-react";

export function TablerShapeSignal() {
  const [signalLevel, setSignalLevel] = useState(3);

  return (
    <div className="space-y-6">
      {/* ================= SHAPES ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Tabler Shapes (Icon Containers)</CardTitle>
          <CardDescription>
            Shapes put an icon on a soft, tinted square or circle, ideal for feature grids, metric cards, and value propositions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Sizes & Colors */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">Sizes & Colors</h4>
            <div className="flex flex-wrap items-center gap-4">
              {/* XS */}
              <div className="h-7 w-7 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center">
                <Building2 className="h-3.5 w-3.5" />
              </div>
              {/* SM */}
              <div className="h-9 w-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="h-4 w-4" />
              </div>
              {/* MD */}
              <div className="h-11 w-11 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center">
                <Key className="h-5 w-5" />
              </div>
              {/* LG */}
              <div className="h-14 w-14 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
                <TrendingUp className="h-7 w-7" />
              </div>
              {/* XL (Circle) */}
              <div className="h-16 w-16 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center">
                <Sparkles className="h-8 w-8" />
              </div>
            </div>
          </div>

          {/* Feature list with shapes */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">Feature List with Shapes</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
                <div className="h-10 w-10 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">Portfólio Exclusivo</h5>
                  <p className="text-xs text-zinc-500 mt-1">Imóveis de altíssimo padrão com curadoria especializada.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
                <div className="h-10 w-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">Due Diligence Jurídica</h5>
                  <p className="text-xs text-zinc-500 mt-1">Certidões forenses e análise de risco cartorário 100% digital.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
                <div className="h-10 w-10 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">RAG Inteligência Artificial</h5>
                  <p className="text-xs text-zinc-500 mt-1">Assistente com busca semântica em normas técnicas e contratos.</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ================= SIGNALS ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Tabler Signals (Priority & Strength Bars)</CardTitle>
          <CardDescription>
            Signals show a level, such as lead warmth, priority, or connection strength, as a compact row of stepped vertical bars.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Priority Levels */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Baixa Prioridade", level: 1, color: "bg-zinc-400" },
              { label: "Média Prioridade", level: 2, color: "bg-blue-600" },
              { label: "Alta Prioridade", level: 3, color: "bg-amber-500" },
              { label: "Urgente / Crítico", level: 4, color: "bg-rose-600" },
            ].map((p, idx) => (
              <div key={idx} className="p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 block">{p.label}</span>
                  <span className="text-[10px] text-zinc-500">Nível {p.level}/4</span>
                </div>
                {/* 4 Stepped Bars */}
                <div className="flex items-end gap-1 h-5">
                  <div className={`w-1 rounded-xs h-1.5 ${p.level >= 1 ? p.color : "bg-zinc-200 dark:bg-zinc-700"}`} />
                  <div className={`w-1 rounded-xs h-2.5 ${p.level >= 2 ? p.color : "bg-zinc-200 dark:bg-zinc-700"}`} />
                  <div className={`w-1 rounded-xs h-3.5 ${p.level >= 3 ? p.color : "bg-zinc-200 dark:bg-zinc-700"}`} />
                  <div className={`w-1 rounded-xs h-5 ${p.level >= 4 ? p.color : "bg-zinc-200 dark:bg-zinc-700"}`} />
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Signal Control */}
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 block">
                Temperatura de Fechamento do Lead
              </span>
              <span className="text-xs text-zinc-500">Clique para alternar a intensidade de interesse do comprador:</span>
            </div>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSignalLevel(lvl)}
                  className={`px-3 py-1 text-xs font-semibold rounded cursor-pointer ${
                    signalLevel === lvl
                      ? "bg-blue-600 text-white"
                      : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                  }`}
                >
                  {lvl}
                </button>
              ))}
              <div className="flex items-end gap-1 h-6 ml-3">
                {[1, 2, 3, 4, 5].map((bar) => (
                  <div
                    key={bar}
                    style={{ height: `${bar * 5}px` }}
                    className={`w-1.5 rounded-xs transition-all ${
                      signalLevel >= bar ? "bg-emerald-500" : "bg-zinc-200 dark:bg-zinc-800"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
