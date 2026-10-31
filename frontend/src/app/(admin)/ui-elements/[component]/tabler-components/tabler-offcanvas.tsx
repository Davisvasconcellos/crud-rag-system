"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  X,
  Sliders,
  Filter,
  Building,
  Check,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

export function TablerOffcanvas() {
  const [activeDrawer, setActiveDrawer] = useState<string | null>(null);

  const closeDrawer = () => setActiveDrawer(null);

  return (
    <div className="space-y-6">
      {/* 1. Triggers */}
      <Card>
        <CardHeader>
          <CardTitle>Offcanvas Positions & Variants</CardTitle>
          <CardDescription>
            An offcanvas panel slides in from an edge of the screen for navigation or supplementary content, such as advanced filters and settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              type="button"
              onClick={() => setActiveDrawer("start")}
              className="flex items-center justify-center gap-2 px-3.5 py-2.5 text-xs font-semibold rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="h-3.5 w-3.5 text-zinc-400" />
              Offcanvas Start (Esquerda)
            </button>
            <button
              type="button"
              onClick={() => setActiveDrawer("end")}
              className="flex items-center justify-center gap-2 px-3.5 py-2.5 text-xs font-semibold rounded-md bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-xs"
            >
              <ArrowRight className="h-3.5 w-3.5" />
              Offcanvas End (Direita - Filtros)
            </button>
            <button
              type="button"
              onClick={() => setActiveDrawer("top")}
              className="flex items-center justify-center gap-2 px-3.5 py-2.5 text-xs font-semibold rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 cursor-pointer shadow-2xs"
            >
              <ArrowUp className="h-3.5 w-3.5 text-zinc-400" />
              Offcanvas Top (Superior)
            </button>
            <button
              type="button"
              onClick={() => setActiveDrawer("bottom")}
              className="flex items-center justify-center gap-2 px-3.5 py-2.5 text-xs font-semibold rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 cursor-pointer shadow-2xs"
            >
              <ArrowDown className="h-3.5 w-3.5 text-zinc-400" />
              Offcanvas Bottom (Inferior)
            </button>
          </div>
        </CardContent>
      </Card>

      {/* 2. Floating Offcanvas Trigger */}
      <Card>
        <CardHeader>
          <CardTitle>Floating Offcanvas</CardTitle>
          <CardDescription>
            Detached panel styling with margin and rounded borders from the screen edge.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <button
            type="button"
            onClick={() => setActiveDrawer("floating-end")}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90 cursor-pointer shadow-xs"
          >
            <Sliders className="h-3.5 w-3.5" />
            Abrir Floating Panel (Filtro Rápido)
          </button>
        </CardContent>
      </Card>

      {/* 3. Live Sliding Panels */}
      {activeDrawer && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-zinc-950/50 backdrop-blur-2xs transition-opacity animate-in fade-in duration-200"
            onClick={closeDrawer}
          />

          {/* End (Right Drawer) - Filtro Imobiliário */}
          {activeDrawer === "end" && (
            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              <div className="w-screen max-w-md bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-250">
                <div className="p-6 overflow-y-auto">
                  <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-blue-600" />
                      <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
                        Filtros Avançados
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={closeDrawer}
                      className="p-1 rounded text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="space-y-4 py-4 text-xs">
                    <div>
                      <label className="font-semibold block mb-1.5 text-zinc-700 dark:text-zinc-300">Faixa de Preço (R$)</label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Mín: R$ 800.000"
                          className="px-3 py-2 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                        />
                        <input
                          type="text"
                          placeholder="Máx: R$ 15.000.000"
                          className="px-3 py-2 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold block mb-1.5 text-zinc-700 dark:text-zinc-300">Bairro / Região</label>
                      <select className="w-full px-3 py-2 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                        <option>Todos os Bairros Nobres</option>
                        <option>Jardins & Cerqueira César</option>
                        <option>Itaim Bibi & Vila Nova Conceição</option>
                        <option>Alphaville & Tamboré</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-semibold block mb-1.5 text-zinc-700 dark:text-zinc-300">Quartos / Suítes</label>
                      <div className="grid grid-cols-4 gap-2">
                        {["1+", "2+", "3+", "4+"].map((q) => (
                          <button
                            key={q}
                            type="button"
                            className="py-1.5 text-center font-medium rounded border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 cursor-pointer"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      toast.info("Filtros resetados");
                      closeDrawer();
                    }}
                    className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 cursor-pointer"
                  >
                    Limpar tudo
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      toast.success("Filtros aplicados! 42 imóveis encontrados.");
                      closeDrawer();
                    }}
                    className="px-4 py-2 text-xs font-semibold rounded bg-blue-600 hover:bg-blue-700 text-white shadow-xs cursor-pointer"
                  >
                    Aplicar Filtros
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Floating End Drawer */}
          {activeDrawer === "floating-end" && (
            <div className="absolute top-4 right-4 bottom-4 w-96 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 flex flex-col justify-between animate-in slide-in-from-right duration-250 z-20">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                  <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Painel Flutuante</h3>
                  <button type="button" onClick={closeDrawer} className="text-zinc-400 hover:text-zinc-600 cursor-pointer">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-zinc-500 mt-3">
                  Configuração rápida de visualização da grade e preferências de notificação sem bloquear a rolagem de fundo.
                </p>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                className="w-full py-2 text-xs font-semibold rounded bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
              >
                Salvar Preferências
              </button>
            </div>
          )}

          {/* Start (Left Drawer) */}
          {activeDrawer === "start" && (
            <div className="absolute inset-y-0 left-0 max-w-full flex pr-10">
              <div className="w-80 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 animate-in slide-in-from-left duration-250 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                    <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Menu Lateral Offcanvas</h3>
                    <button type="button" onClick={closeDrawer} className="text-zinc-400 hover:text-zinc-600 cursor-pointer">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <ul className="mt-4 space-y-2 text-xs">
                    <li className="p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer font-medium">Dashboard Principal</li>
                    <li className="p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer font-medium">Portfólio de Imóveis</li>
                    <li className="p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer font-medium">Agenda de Visitas</li>
                    <li className="p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer font-medium">Contratos & Assinaturas</li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={closeDrawer}
                  className="w-full py-2 text-xs font-semibold rounded border border-zinc-200 dark:border-zinc-700"
                >
                  Fechar Menu
                </button>
              </div>
            </div>
          )}

          {/* Top (Superior Drawer) */}
          {activeDrawer === "top" && (
            <div className="absolute top-0 inset-x-0 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 animate-in slide-in-from-top duration-250">
              <div className="max-w-4xl mx-auto flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Aviso do Sistema / Notificação Global</h3>
                  <p className="text-xs text-zinc-500 mt-1">Sincronização agendada para hoje às 23:00 com os birôs de crédito imobiliário.</p>
                </div>
                <button
                  type="button"
                  onClick={closeDrawer}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                >
                  Entendido
                </button>
              </div>
            </div>
          )}

          {/* Bottom (Inferior Drawer) */}
          {activeDrawer === "bottom" && (
            <div className="absolute bottom-0 inset-x-0 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 animate-in slide-in-from-bottom duration-250">
              <div className="max-w-4xl mx-auto flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Barra de Ações em Lote (3 selecionados)</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">Selecione uma ação para os imóveis marcados na tabela.</p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      toast.success("Status alterado para Ativo em lote!");
                      closeDrawer();
                    }}
                    className="px-3.5 py-1.5 text-xs font-semibold rounded bg-blue-600 text-white"
                  >
                    Publicar Selecionados
                  </button>
                  <button
                    type="button"
                    onClick={closeDrawer}
                    className="px-3.5 py-1.5 text-xs rounded border border-zinc-200 dark:border-zinc-700"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
