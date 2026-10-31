"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  X,
  CheckCircle,
  AlertTriangle,
  Users,
  FileText,
  Trash2,
  Send,
  Building,
  Sparkles,
  Info,
} from "lucide-react";
import { toast } from "sonner";

export function TablerModals() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const closeModal = () => setActiveModal(null);

  return (
    <div className="space-y-6">
      {/* 1. Modal triggers grid */}
      <Card>
        <CardHeader>
          <CardTitle>Tabler Modals Showcase</CardTitle>
          <CardDescription>
            Modals interrupt the page to ask for input, confirmation, or a focused action. Click any button to preview the live dialog.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            <button
              type="button"
              onClick={() => setActiveModal("simple")}
              className="px-3.5 py-2 text-xs font-semibold rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 cursor-pointer shadow-2xs"
            >
              Simple modal
            </button>
            <button
              type="button"
              onClick={() => setActiveModal("small")}
              className="px-3.5 py-2 text-xs font-semibold rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 cursor-pointer shadow-2xs"
            >
              Small modal
            </button>
            <button
              type="button"
              onClick={() => setActiveModal("large")}
              className="px-3.5 py-2 text-xs font-semibold rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 cursor-pointer shadow-2xs"
            >
              Large modal
            </button>
            <button
              type="button"
              onClick={() => setActiveModal("full-width")}
              className="px-3.5 py-2 text-xs font-semibold rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 cursor-pointer shadow-2xs"
            >
              Full-width modal
            </button>
            <button
              type="button"
              onClick={() => setActiveModal("report")}
              className="px-3.5 py-2 text-xs font-semibold rounded-md bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-xs"
            >
              Modal with form (Report)
            </button>
            <button
              type="button"
              onClick={() => setActiveModal("success")}
              className="px-3.5 py-2 text-xs font-semibold rounded-md bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-xs"
            >
              Success modal
            </button>
            <button
              type="button"
              onClick={() => setActiveModal("danger")}
              className="px-3.5 py-2 text-xs font-semibold rounded-md bg-rose-600 hover:bg-rose-700 text-white cursor-pointer shadow-xs"
            >
              Danger modal
            </button>
            <button
              type="button"
              onClick={() => setActiveModal("team")}
              className="px-3.5 py-2 text-xs font-semibold rounded-md bg-purple-600 hover:bg-purple-700 text-white cursor-pointer shadow-xs"
            >
              Team invite modal
            </button>
          </div>
        </CardContent>
      </Card>

      {/* 2. Live Modal Overlays */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          {/* Backdrop click */}
          <div className="absolute inset-0" onClick={closeModal} />

          {/* Simple Modal */}
          {activeModal === "simple" && (
            <div className="relative w-full max-w-md rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-2xl z-10 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Atualização do Sistema</h3>
                <button type="button" onClick={closeModal} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Uma nova versão dos filtros de busca e integração com os portais imobiliários foi implementada com sucesso.
              </p>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-3 py-1.5 text-xs font-medium rounded border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  Fechar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    toast.success("Alterações salvas!");
                    closeModal();
                  }}
                  className="px-3 py-1.5 text-xs font-semibold rounded bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-xs"
                >
                  Confirmar
                </button>
              </div>
            </div>
          )}

          {/* Small Modal */}
          {activeModal === "small" && (
            <div className="relative w-full max-w-xs rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 shadow-2xl z-10 text-center space-y-3">
              <div className="mx-auto h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center">
                <Info className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Confirmar Operação</h3>
              <p className="text-xs text-zinc-500">Deseja duplicar este anúncio de imóvel para a filial Alphaville?</p>
              <div className="flex justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-3 py-1.5 text-xs font-medium rounded border border-zinc-200 dark:border-zinc-700"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    toast.success("Imóvel duplicado com sucesso!");
                    closeModal();
                  }}
                  className="px-3 py-1.5 text-xs font-semibold rounded bg-blue-600 text-white"
                >
                  Duplicar
                </button>
              </div>
            </div>
          )}

          {/* Large Modal */}
          {activeModal === "large" && (
            <div className="relative w-full max-w-2xl rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-2xl z-10 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Termos de Intermediação e Honorários</h3>
                <button type="button" onClick={closeModal} className="text-zinc-400 hover:text-zinc-600 cursor-pointer">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="max-h-60 overflow-y-auto text-xs text-zinc-600 dark:text-zinc-400 space-y-2 pr-2">
                <p>
                  O presente instrumento regula a prestação de serviços de corretagem imobiliária e assessoria documental para o imóvel matriculado sob nº 140.291 do 4º Cartório de Registro de Imóveis de São Paulo/SP.
                </p>
                <p>
                  A comissão de corretagem devida pelo Contratante na hipótese de conclusão do negócio será de 6% (seis por cento) calculada sobre o valor final de venda pactuado entre as partes.
                </p>
                <p>
                  O Contratado obriga-se a prestar aos Contratantes todos os esclarecimentos acerca da segurança ou do risco do negócio, das alterações de valores e de outros fatores que possam influir na tomada de decisão.
                </p>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-xs rounded border border-zinc-200 dark:border-zinc-700 font-medium"
                >
                  Recusar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    toast.success("Contrato aceito digitalmente!");
                    closeModal();
                  }}
                  className="px-4 py-2 text-xs font-semibold rounded bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                >
                  Aceitar e Assinar
                </button>
              </div>
            </div>
          )}

          {/* Form Report Modal */}
          {activeModal === "report" && (
            <div className="relative w-full max-w-lg rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-2xl z-10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Criar Novo Relatório de Vendas</h3>
                  <p className="text-xs text-zinc-500">Configure os parâmetros de exportação executiva</p>
                </div>
                <button type="button" onClick={closeModal} className="text-zinc-400 hover:text-zinc-600 cursor-pointer">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold block mb-1 text-zinc-700 dark:text-zinc-300">Título do Relatório</label>
                  <input
                    type="text"
                    defaultValue="Desempenho Q3 - Imóveis de Alto Padrão Jardins"
                    className="w-full px-3 py-2 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold block mb-1 text-zinc-700 dark:text-zinc-300">Tipo</label>
                    <select className="w-full px-3 py-2 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                      <option>VGV & Comissões</option>
                      <option>Conversão de Leads</option>
                      <option>Tempo Médio de Venda</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold block mb-1 text-zinc-700 dark:text-zinc-300">Período</label>
                    <select className="w-full px-3 py-2 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                      <option>Últimos 30 dias</option>
                      <option>Trimestre Atual</option>
                      <option>Ano Completo (2026)</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={closeModal} className="px-3.5 py-2 text-xs rounded border border-zinc-200 dark:border-zinc-700">
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    toast.success("Relatório gerado e enviado ao seu e-mail!");
                    closeModal();
                  }}
                  className="px-3.5 py-2 text-xs font-semibold rounded bg-blue-600 text-white"
                >
                  Gerar Relatório
                </button>
              </div>
            </div>
          )}

          {/* Success Modal */}
          {activeModal === "success" && (
            <div className="relative w-full max-w-sm rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-2xl z-10 text-center space-y-3">
              <div className="mx-auto h-12 w-12 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Negócio Fechado com Sucesso!</h3>
              <p className="text-xs text-zinc-500">
                A proposta de compra da Cobertura Triplex foi aprovada por ambas as partes. Os contratos foram emitidos para assinatura.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full py-2 text-xs font-semibold rounded bg-emerald-600 text-white shadow-xs cursor-pointer"
                >
                  Ir para Painel de Vendas
                </button>
              </div>
            </div>
          )}

          {/* Danger Modal */}
          {activeModal === "danger" && (
            <div className="relative w-full max-w-sm rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-2xl z-10 text-center space-y-3">
              <div className="mx-auto h-12 w-12 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Excluir Imóvel do Portfólio?</h3>
              <p className="text-xs text-zinc-500">
                Esta ação é irreversível. Todas as fotos, histórico de visitas e propostas vinculadas a este imóvel serão excluídas permanentemente.
              </p>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-2 text-xs rounded border border-zinc-200 dark:border-zinc-700 font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    toast.error("Imóvel excluído com sucesso.");
                    closeModal();
                  }}
                  className="flex-1 py-2 text-xs font-semibold rounded bg-rose-600 text-white shadow-xs cursor-pointer"
                >
                  Sim, Excluir
                </button>
              </div>
            </div>
          )}

          {/* Team Invite Modal */}
          {activeModal === "team" && (
            <div className="relative w-full max-w-md rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-2xl z-10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Convidar Membro para a Equipe</h3>
                    <p className="text-[11px] text-zinc-500">Atribua permissões operacionais no CRM</p>
                  </div>
                </div>
                <button type="button" onClick={closeModal} className="text-zinc-400 hover:text-zinc-600 cursor-pointer">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold block mb-1 text-zinc-700 dark:text-zinc-300">E-mail Corporativo</label>
                  <input
                    type="email"
                    placeholder="corretor@imobiliaria.com.br"
                    className="w-full px-3 py-2 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1 text-zinc-700 dark:text-zinc-300">Papel / Acesso</label>
                  <select className="w-full px-3 py-2 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                    <option>Corretor Associado (Apenas seus leads)</option>
                    <option>Gerente de Vendas (Todos os leads da filial)</option>
                    <option>Administrador Geral (Acesso irrestrito)</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={closeModal} className="px-3.5 py-1.5 text-xs rounded border border-zinc-200 dark:border-zinc-700">
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    toast.success("Convite enviado com sucesso!");
                    closeModal();
                  }}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded bg-purple-600 text-white"
                >
                  Enviar Convite
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
