"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { RefreshCw, TrendingUp, TrendingDown, DollarSign } from "lucide-react";

export function TablerSparkline() {
  const [dataPoints, setDataPoints] = useState([14, 22, 18, 30, 24, 38, 32, 45, 52]);

  const randomize = () => {
    setDataPoints(Array.from({ length: 9 }, () => Math.floor(Math.random() * 50) + 10));
  };

  return (
    <div className="space-y-6">
      {/* 1. Overview */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Tabler Sparklines (Tiny Inline SVG Charts)</CardTitle>
            <CardDescription>
              Sparklines are lightweight inline vector charts designed to fit inside table rows, KPI summaries, and compact cards.
            </CardDescription>
          </div>
          <button
            type="button"
            onClick={randomize}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer shadow-2xs"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Atualizar Dados
          </button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Line Sparkline */}
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
              <span className="text-xs text-zinc-500">Leads no Mês</span>
              <div className="flex items-baseline justify-between my-1">
                <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">1.840</span>
                <span className="text-xs font-semibold text-emerald-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-0.5" /> +18%
                </span>
              </div>
              {/* SVG Line */}
              <svg className="w-full h-10 overflow-visible" viewBox="0 0 100 30">
                <polyline
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={dataPoints
                    .map((val, idx) => `${(idx / (dataPoints.length - 1)) * 100},${30 - (val / 65) * 30}`)
                    .join(" ")}
                />
              </svg>
            </div>

            {/* Area with Spot */}
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
              <span className="text-xs text-zinc-500">Visitas Agendadas</span>
              <div className="flex items-baseline justify-between my-1">
                <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">420</span>
                <span className="text-xs font-semibold text-emerald-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-0.5" /> +8.4%
                </span>
              </div>
              {/* SVG Area */}
              <svg className="w-full h-10 overflow-visible" viewBox="0 0 100 30">
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polygon
                  fill="url(#areaGrad)"
                  points={`0,30 ${dataPoints
                    .map((val, idx) => `${(idx / (dataPoints.length - 1)) * 100},${30 - (val / 65) * 30}`)
                    .join(" ")} 100,30`}
                />
                <polyline
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                  points={dataPoints
                    .map((val, idx) => `${(idx / (dataPoints.length - 1)) * 100},${30 - (val / 65) * 30}`)
                    .join(" ")}
                />
              </svg>
            </div>

            {/* Bars Sparkline */}
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
              <span className="text-xs text-zinc-500">Propostas Emitidas</span>
              <div className="flex items-baseline justify-between my-1">
                <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">86</span>
                <span className="text-xs font-semibold text-amber-500 flex items-center">Estável</span>
              </div>
              {/* SVG Bar Chart */}
              <div className="flex items-end gap-1.5 h-10 pt-2">
                {dataPoints.map((val, idx) => (
                  <div
                    key={idx}
                    style={{ height: `${(val / 65) * 100}%` }}
                    className="flex-1 bg-amber-500/80 hover:bg-amber-500 rounded-xs transition-all"
                  />
                ))}
              </div>
            </div>

            {/* Signed Bars (Win/Loss) */}
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
              <span className="text-xs text-zinc-500">Variação Diária (Win/Loss)</span>
              <div className="flex items-baseline justify-between my-1">
                <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">+R$ 2.4M</span>
                <span className="text-xs font-semibold text-emerald-600">+12%</span>
              </div>
              <div className="flex items-center gap-1.5 h-10">
                {[1, -1, 1, 1, -1, 1, -1, 1, 1].map((sign, idx) => (
                  <div
                    key={idx}
                    style={{ height: "60%" }}
                    className={`flex-1 rounded-xs ${sign > 0 ? "bg-emerald-500" : "bg-rose-500"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Sparklines In a Table */}
      <Card>
        <CardHeader>
          <CardTitle>Sparklines in a Data Table</CardTitle>
          <CardDescription>
            Embedding sparklines directly into table rows to visualize temporal trends alongside numeric values.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-xs text-left">
            <thead className="bg-zinc-50 dark:bg-zinc-800/60 text-zinc-500 uppercase tracking-wider font-semibold border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="px-4 py-3">Bairro / Região</th>
                <th className="px-4 py-3">Preço Médio (m²)</th>
                <th className="px-4 py-3">Tendência (6 Meses)</th>
                <th className="px-4 py-3 text-right">Imóveis Ativos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {[
                { name: "Jardins (São Paulo)", price: "R$ 24.500/m²", trend: [12, 14, 15, 18, 22, 25], color: "#2563eb", count: "312" },
                { name: "Itaim Bibi (São Paulo)", price: "R$ 28.900/m²", trend: [20, 22, 21, 26, 28, 30], color: "#10b981", count: "245" },
                { name: "Alphaville (Barueri)", price: "R$ 14.800/m²", trend: [10, 11, 13, 14, 15, 16], color: "#8b5cf6", count: "189" },
                { name: "Leblon (Rio de Janeiro)", price: "R$ 38.000/m²", trend: [30, 32, 33, 35, 36, 39], color: "#f59e0b", count: "98" },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                  <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">{row.name}</td>
                  <td className="px-4 py-3 font-mono">{row.price}</td>
                  <td className="px-4 py-3 w-40">
                    <svg className="w-28 h-6" viewBox="0 0 100 25">
                      <polyline
                        fill="none"
                        stroke={row.color}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        points={row.trend
                          .map((val, i) => `${(i / (row.trend.length - 1)) * 100},${25 - (val / 40) * 25}`)
                          .join(" ")}
                      />
                    </svg>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold">{row.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
