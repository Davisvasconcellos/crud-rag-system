"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  Home,
  User,
  Activity,
  Settings,
  ChevronDown,
  Building,
  Key,
  Shield,
  FileText,
} from "lucide-react";
import { toast } from "sonner";

export function TablerTabs() {
  const [cardTab, setCardTab] = useState("home");
  const [verticalTab, setVerticalTab] = useState("perfil");
  const [pillTab, setPillTab] = useState("tab1");

  return (
    <div className="space-y-6">
      {/* 1. Tabs in Card Header */}
      <Card>
        <div className="border-b border-zinc-200 dark:border-zinc-800 px-4 flex items-center justify-between">
          <div className="flex items-center gap-1 -mb-px">
            {[
              { id: "home", label: "Geral", icon: Home, count: null },
              { id: "profile", label: "Ficha Cadastral", icon: User, count: "Novo" },
              { id: "activity", label: "Histórico de Propostas", icon: Activity, count: "12" },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = cardTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCardTab(tab.id)}
                  className={`flex items-center gap-2 py-3 px-3.5 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                    isActive
                      ? "border-blue-600 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                  {tab.count && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                          : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <span className="text-xs text-zinc-400">Card Header Tabs</span>
        </div>
        <CardContent className="pt-6">
          {cardTab === "home" && (
            <div className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
              <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Visão Geral da Unidade</h4>
              <p>
                Apartamento finamente decorado na Rua Haddock Lobo. Amplo living integrado para 3 ambientes com lareira ecológica e projeto luminotécnico assinado.
              </p>
              <div className="flex gap-4 pt-2 font-medium">
                <span>Área: 280 m²</span>
                <span>•</span>
                <span>Suítes: 4</span>
                <span>•</span>
                <span>Vagas: 4 demarcadas</span>
              </div>
            </div>
          )}
          {cardTab === "profile" && (
            <div className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
              <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Dados do Proprietário & Creci</h4>
              <p>Vendedor: Grupo Imobiliário Brasil S/A • Registro R-4 na Matrícula 148.902 do 13º CRI/SP.</p>
              <p>IPTU Anual: R$ 18.400,00 • Condomínio Mensal: R$ 3.850,00.</p>
            </div>
          )}
          {cardTab === "activity" && (
            <div className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
              <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Registro de Negociações</h4>
              <p>• Proposta de R$ 5.200.000 recebida em 24/10/2026 (Recusada).</p>
              <p>• Contraproposta de R$ 5.500.000 enviada em 26/10/2026 (Em análise pelo comprador).</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 2. Vertical Tabs inside Card */}
      <Card>
        <CardHeader>
          <CardTitle>Vertical Tabs</CardTitle>
          <CardDescription>
            Tab buttons arranged vertically on the left column with corresponding content on the right.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1 space-y-1 border-r border-zinc-200 dark:border-zinc-800 pr-3">
              {[
                { id: "perfil", label: "Dados do Corretor", icon: User },
                { id: "imoveis", label: "Imóveis Vinculados", icon: Building },
                { id: "permissoes", label: "Segurança & Chaves", icon: Key },
                { id: "contratos", label: "Contratos Digitais", icon: FileText },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = verticalTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setVerticalTab(tab.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg transition-all text-left cursor-pointer ${
                      isActive
                        ? "bg-blue-600 text-white font-semibold shadow-xs"
                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="md:col-span-3 text-xs text-zinc-600 dark:text-zinc-400 space-y-3">
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 capitalize">
                Painel: {verticalTab}
              </h4>
              <p>
                Configure os parâmetros de visualização, limites operacionais de envio de propostas e chaves de acesso à API do portal imobiliário.
              </p>
              <div className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40">
                <span className="font-semibold text-zinc-800 dark:text-zinc-200 block">Status do Módulo:</span>
                <span className="text-emerald-600 font-medium">Ativo e sincronizado com o banco central do CRM</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
