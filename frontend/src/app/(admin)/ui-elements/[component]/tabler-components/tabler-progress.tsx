"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Play, RotateCcw } from "lucide-react";

export function TablerProgress() {
  const [liveValue, setLiveValue] = useState(68);

  return (
    <div className="space-y-6">
      {/* 1. Default, With Value, Sizes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Default & Sizes</CardTitle>
            <CardDescription>
              Basic progress bars in multiple heights: xs (2px), sm (4px), md (8px), and lg (16px).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-[11px] text-zinc-500 mb-1">Tamanho XS (2px)</div>
              <div className="h-0.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div style={{ width: "35%" }} className="h-full bg-blue-600 rounded-full" />
              </div>
            </div>
            <div>
              <div className="text-[11px] text-zinc-500 mb-1">Tamanho SM (4px)</div>
              <div className="h-1 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div style={{ width: "55%" }} className="h-full bg-blue-600 rounded-full" />
              </div>
            </div>
            <div>
              <div className="text-[11px] text-zinc-500 mb-1">Tamanho Padrão (8px)</div>
              <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div style={{ width: "70%" }} className="h-full bg-blue-600 rounded-full" />
              </div>
            </div>
            <div>
              <div className="text-[11px] text-zinc-500 mb-1">Tamanho LG com label interno (16px)</div>
              <div className="h-4 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden flex items-center">
                <div
                  style={{ width: "84%" }}
                  className="h-full bg-blue-600 rounded-full flex items-center justify-end pr-2 text-[10px] text-white font-bold"
                >
                  84%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. Colors & Indeterminate */}
        <Card>
          <CardHeader>
            <CardTitle>Colors & Status</CardTitle>
            <CardDescription>Semantic theme colors for success, warning, and danger indicators.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3.5">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>VGV Meta Anual (Primary)</span>
                <span className="font-semibold text-blue-600">65%</span>
              </div>
              <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div style={{ width: "65%" }} className="h-full bg-blue-600 rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Documentações Aprovadas (Success)</span>
                <span className="font-semibold text-emerald-600">92%</span>
              </div>
              <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div style={{ width: "92%" }} className="h-full bg-emerald-500 rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Prazo de Vistoria (Warning)</span>
                <span className="font-semibold text-amber-500">45%</span>
              </div>
              <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div style={{ width: "45%" }} className="h-full bg-amber-500 rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Inadimplência de Contratos (Danger)</span>
                <span className="font-semibold text-rose-600">18%</span>
              </div>
              <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div style={{ width: "18%" }} className="h-full bg-rose-600 rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. Striped, Animated & Multi-value */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Striped & Animated</CardTitle>
            <CardDescription>Diagonal stripes with CSS keyframe animation for active background jobs.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-xs text-zinc-500 mb-1">Listrado Estático (40%)</div>
              <div className="h-3 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div
                  style={{
                    width: "40%",
                    backgroundImage:
                      "linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent)",
                    backgroundSize: "1rem 1rem",
                  }}
                  className="h-full bg-blue-600"
                />
              </div>
            </div>

            <div>
              <div className="text-xs text-zinc-500 mb-1">Animado Interativo (Sincronizando 75%)</div>
              <div className="h-3 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div
                  style={{
                    width: "75%",
                    backgroundImage:
                      "linear-gradient(45deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.2) 75%, transparent 75%, transparent)",
                    backgroundSize: "1rem 1rem",
                  }}
                  className="h-full bg-emerald-600 animate-pulse"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Multi-value & Step Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Multiple Values & Steps</CardTitle>
            <CardDescription>Stacked segments and discrete steps progress bar.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-xs text-zinc-500 mb-1">Stacked Portfólio (Residencial 45%, Comercial 30%, Lotes 15%)</div>
              <div className="h-3 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden flex">
                <div style={{ width: "45%" }} className="h-full bg-blue-600" />
                <div style={{ width: "30%" }} className="h-full bg-emerald-500" />
                <div style={{ width: "15%" }} className="h-full bg-amber-400" />
              </div>
            </div>

            <div>
              <div className="text-xs text-zinc-500 mb-1">Etapas da Venda (3 de 5 concluídas)</div>
              <div className="grid grid-cols-5 gap-1.5 h-2">
                <div className="bg-blue-600 rounded-full" />
                <div className="bg-blue-600 rounded-full" />
                <div className="bg-blue-600 rounded-full" />
                <div className="bg-zinc-200 dark:bg-zinc-800 rounded-full" />
                <div className="bg-zinc-200 dark:bg-zinc-800 rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 4. Live Interactive Control */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive Progress Simulation</CardTitle>
          <CardDescription>Use the slider to control the progress bar in real time.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="100"
              value={liveValue}
              onChange={(e) => setLiveValue(Number(e.target.value))}
              className="flex-1 cursor-pointer accent-blue-600"
            />
            <span className="font-mono text-xs font-bold w-12 text-right">{liveValue}%</span>
          </div>
          <div className="h-3 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              style={{ width: `${liveValue}%` }}
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-150"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
