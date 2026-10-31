"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  GripVertical,
  Check,
  Trash2,
  Edit2,
  MoreVertical,
  FileText,
  Mail,
  User,
  ExternalLink,
  ChevronRight,
  Clock,
  DollarSign,
  Building,
} from "lucide-react";
import { toast } from "sonner";

export function TablerLists() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    chk1: true,
    chk2: false,
    chk3: true,
  });

  const [switchItems, setSwitchItems] = useState<Record<string, boolean>>({
    sw1: true,
    sw2: false,
  });

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSwitch = (id: string) => {
    setSwitchItems((prev) => {
      const next = !prev[id];
      toast.info(`Configuração ${next ? "ativada" : "desativada"}`);
      return { ...prev, [id]: next };
    });
  };

  return (
    <div className="space-y-6">
      {/* 1. All slots (Avatar + Title + Desc + Meta + Action) & Actions on hover */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>All slots & Rich content</CardTitle>
            <CardDescription>
              Vertical list group row with media avatar, content, timestamp meta, and contextual action.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {[
                {
                  name: "Beatriz Cavalcanti",
                  role: "Corretora Sênior",
                  action: "Enviou proposta para Cobertura Itaim",
                  time: "10 min atrás",
                  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
                  badge: "Proposta",
                  badgeColor: "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300",
                },
                {
                  name: "Rodrigo Silveira",
                  role: "Comprador Qualificado",
                  action: "Agendou visita no Residencial Jardim Europa",
                  time: "42 min atrás",
                  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
                  badge: "Visita",
                  badgeColor: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300",
                },
                {
                  name: "Mariana Fontes",
                  role: "Gerente de Financiamento",
                  action: "Crédito imobiliário aprovado (Itaú Private)",
                  time: "2 horas atrás",
                  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
                  badge: "Crédito",
                  badgeColor: "bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3.5 p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                  <img src={item.avatar} alt={item.name} className="h-10 w-10 rounded-full object-cover shrink-0 ring-1 ring-zinc-200 dark:ring-zinc-700" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 truncate">{item.name}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded uppercase tracking-wider ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">{item.action}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[11px] text-zinc-400 block">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 2. Actions on hover */}
        <Card>
          <CardHeader>
            <CardTitle>Actions on hover</CardTitle>
            <CardDescription>
              Quick actions (edit, delete, link) appear smoothly when the pointer hovers over the item.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {[
                { title: "Matrícula do Imóvel #89.241-SP", subtitle: "PDF assinado digitalmente", size: "2.4 MB" },
                { title: "Contrato de Compromisso de Compra e Venda", subtitle: "Minuta jurídica revisada", size: "580 KB" },
                { title: "Laudo de Avaliação Mercadológica (CRECI)", subtitle: "Avaliação pericial homologada", size: "8.1 MB" },
              ].map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 group hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-9 w-9 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">{file.title}</h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{file.subtitle} • {file.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => toast.success("Visualizando documento")}
                      className="p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300"
                      title="Editar"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => toast.error("Excluído com sucesso")}
                      className="p-1.5 rounded hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 text-zinc-400"
                      title="Excluir"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. Checkboxes, Radios, Switches & Drag Handle */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Checkboxes & Switches in list</CardTitle>
            <CardDescription>Embedded form controls for batch selection and live toggles.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <label className="flex items-center gap-3.5 p-3.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checkedItems.chk1}
                  onChange={() => toggleCheck("chk1")}
                  className="rounded border-zinc-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <div className="flex-1 text-xs">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 block">Notificar novos leads por WhatsApp</span>
                  <span className="text-zinc-500">Disparo automático em até 60 segundos</span>
                </div>
              </label>

              <label className="flex items-center gap-3.5 p-3.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checkedItems.chk2}
                  onChange={() => toggleCheck("chk2")}
                  className="rounded border-zinc-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <div className="flex-1 text-xs">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 block">Sincronização com Portais (ZAP / VivaReal)</span>
                  <span className="text-zinc-500">Atualização de preço e disponibilidade</span>
                </div>
              </label>

              <div className="flex items-center justify-between p-3.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                <div className="text-xs">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 block">Agente IA de Qualificação 24/7</span>
                  <span className="text-zinc-500">Responde dúvidas de clientes fora do expediente</span>
                </div>
                <button
                  type="button"
                  onClick={() => toggleSwitch("sw1")}
                  className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors cursor-pointer ${
                    switchItems.sw1 ? "bg-emerald-600" : "bg-zinc-300 dark:bg-zinc-700"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      switchItems.sw1 ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Drag handle & Nested */}
        <Card>
          <CardHeader>
            <CardTitle>Drag handle & Reorder list</CardTitle>
            <CardDescription>List items with grab icon indicator for drag and drop reordering.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {[
                { step: "1. Contato inicial e sondagem de perfil de investimento", duration: "1º dia" },
                { step: "2. Apresentação de book de imóveis selecionados", duration: "2º dia" },
                { step: "3. Tour presencial guiado com corretor especialista", duration: "3º dia" },
                { step: "4. Elaboração de proposta formal e análise jurídica", duration: "5º dia" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                  <GripVertical className="h-4 w-4 text-zinc-400 cursor-grab shrink-0" />
                  <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200 flex-1">{item.step}</span>
                  <span className="text-[11px] text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded font-mono">
                    {item.duration}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
