"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Plus, Minus, Bed, Car, Bath, DollarSign } from "lucide-react";

export function TablerNumberInput() {
  const [val1, setVal1] = useState(3);
  const [valQuartos, setValQuartos] = useState(4);
  const [valSuites, setValSuites] = useState(2);
  const [valVagas, setValVagas] = useState(3);
  const [stepVal, setStepVal] = useState(250);

  return (
    <div className="space-y-6">
      {/* 1. Basic & At bounds */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic with Decrease and Increase</CardTitle>
            <CardDescription>
              A number input is a field with increment and decrement buttons, for values changed in fixed steps.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-xs text-zinc-500 block mb-1">Quantidade Simples (Min: 0, Max: 10)</span>
              <div className="inline-flex items-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs">
                <button
                  type="button"
                  disabled={val1 <= 0}
                  onClick={() => setVal1((v) => Math.max(0, v - 1))}
                  className="p-2 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 rounded-l-lg cursor-pointer"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <input
                  type="text"
                  readOnly
                  value={val1}
                  className="w-14 text-center font-bold text-sm bg-transparent text-zinc-900 dark:text-zinc-100 focus:outline-none"
                />
                <button
                  type="button"
                  disabled={val1 >= 10}
                  onClick={() => setVal1((v) => Math.min(10, v + 1))}
                  className="p-2 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 rounded-r-lg cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div>
              <span className="text-xs text-zinc-500 block mb-1">Passo com Incremento de 50 (m² de área útil)</span>
              <div className="inline-flex items-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setStepVal((v) => Math.max(50, v - 50))}
                  className="p-2 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-l-lg cursor-pointer"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-24 text-center font-bold text-xs font-mono text-zinc-900 dark:text-zinc-100">
                  {stepVal} m²
                </span>
                <button
                  type="button"
                  onClick={() => setStepVal((v) => v + 50)}
                  className="p-2 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-r-lg cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. Real Estate Attributes with Labels & Icons */}
        <Card>
          <CardHeader>
            <CardTitle>Real Estate Property Specs</CardTitle>
            <CardDescription>
              Specialized Steppers with icons for property attributes (Dormitórios, Suítes, Vagas).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3.5">
            {/* Quartos */}
            <div className="flex items-center justify-between p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center">
                  <Bed className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-semibold text-xs text-zinc-900 dark:text-zinc-100 block">Dormitórios</span>
                  <span className="text-[10px] text-zinc-500">Mínimo para o filtro</span>
                </div>
              </div>
              <div className="inline-flex items-center rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
                <button
                  type="button"
                  onClick={() => setValQuartos((v) => Math.max(1, v - 1))}
                  className="px-2 py-1 text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  -
                </button>
                <span className="w-8 text-center font-bold text-xs text-zinc-900 dark:text-zinc-100 font-mono">
                  {valQuartos}
                </span>
                <button
                  type="button"
                  onClick={() => setValQuartos((v) => v + 1)}
                  className="px-2 py-1 text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Suítes */}
            <div className="flex items-center justify-between p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded bg-purple-50 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center">
                  <Bath className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-semibold text-xs text-zinc-900 dark:text-zinc-100 block">Suítes</span>
                  <span className="text-[10px] text-zinc-500">Com banheiro privativo</span>
                </div>
              </div>
              <div className="inline-flex items-center rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
                <button
                  type="button"
                  onClick={() => setValSuites((v) => Math.max(0, v - 1))}
                  className="px-2 py-1 text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  -
                </button>
                <span className="w-8 text-center font-bold text-xs text-zinc-900 dark:text-zinc-100 font-mono">
                  {valSuites}
                </span>
                <button
                  type="button"
                  onClick={() => setValSuites((v) => v + 1)}
                  className="px-2 py-1 text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Vagas */}
            <div className="flex items-center justify-between p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
                  <Car className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-semibold text-xs text-zinc-900 dark:text-zinc-100 block">Vagas de Garagem</span>
                  <span className="text-[10px] text-zinc-500">Cobertas e demarcadas</span>
                </div>
              </div>
              <div className="inline-flex items-center rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
                <button
                  type="button"
                  onClick={() => setValVagas((v) => Math.max(0, v - 1))}
                  className="px-2 py-1 text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  -
                </button>
                <span className="w-8 text-center font-bold text-xs text-zinc-900 dark:text-zinc-100 font-mono">
                  {valVagas}
                </span>
                <button
                  type="button"
                  onClick={() => setValVagas((v) => v + 1)}
                  className="px-2 py-1 text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
