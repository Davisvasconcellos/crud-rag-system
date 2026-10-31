"use client";

import React, { useState } from "react";
import {
  Component,
  Bell,
  Eye,
  CheckCircle,
  AlertTriangle,
  Info,
  XCircle,
  BarChart3,
  Layers,
  Table as TableIcon,
  Sliders,
  Sparkles,
  Download,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge, BusinessStatusBadge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Sheet } from "@/components/ui/sheet";
import { toast } from "sonner";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const SAMPLE_CHART_DATA = [
  { name: "Seg", leads: 12, visitas: 4 },
  { name: "Ter", leads: 19, visitas: 7 },
  { name: "Qua", leads: 15, visitas: 5 },
  { name: "Qui", leads: 22, visitas: 9 },
  { name: "Sex", leads: 28, visitas: 14 },
  { name: "Sáb", leads: 34, visitas: 18 },
];

const SAMPLE_PIE_DATA = [
  { name: "Itaim Bibi", value: 35, color: "#0f3d3e" },
  { name: "Jardins", value: 25, color: "#059669" },
  { name: "Alphaville", value: 20, color: "#10b981" },
  { name: "Vila Mariana", value: 20, color: "#94a3b8" },
];

export default function ComponentsShowcasePage() {
  const [activeTab, setActiveTab] = useState<"buttons" | "tables" | "charts" | "modals" | "toasts" | "forms" | "badges">("buttons");

  // Estados de Modais
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  // Estados de Form
  const [switchActive, setSwitchActive] = useState(true);
  const [sliderValue, setSliderValue] = useState(5000000);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-zinc-200 pb-5 dark:border-zinc-800">
        <div className="flex items-center gap-2.5">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Showcase de Componentes UI
          </h1>
          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
            Estilo TailAdmin & Anti-IA
          </span>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Catálogo interativo com exemplos de botões, modais, gráficos, toasters, tabelas e formulários reutilizáveis.
        </p>

        {/* Abas Superiores no estilo TailAdmin */}
        <div className="flex flex-wrap items-center gap-2 mt-5">
          {[
            { id: "buttons", label: "Botões & Ações" },
            { id: "tables", label: "Tabelas & Dados" },
            { id: "charts", label: "Gráficos (Charts)" },
            { id: "modals", label: "Modais & Sheets" },
            { id: "toasts", label: "Toasters & Alertas" },
            { id: "forms", label: "Formulários & Controles" },
            { id: "badges", label: "Badges de Negócio" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-2xs font-semibold"
                  : "bg-white text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. SEÇÃO DE BOTÕES */}
      {activeTab === "buttons" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Variantes de Botões</CardTitle>
              <CardDescription>Cores funcionais sólidas sem gradientes aleatórios.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2.5">
                <Button variant="primary">Primário (Ação Principal)</Button>
                <Button variant="secondary">Secundário</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destrutivo</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tamanhos & Estados de Carregamento</CardTitle>
              <CardDescription>Consistência de altura e feedback visual para requisições.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <Button size="sm">Pequeno (sm)</Button>
                <Button size="md">Padrão (md)</Button>
                <Button size="lg">Grande (lg)</Button>
                <Button isLoading size="md">
                  Processando
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Grupos de Botões (Button Groups)</CardTitle>
              <CardDescription>Para alternâncias de visualização, exportações e filtros rápidos.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="inline-flex rounded-md shadow-2xs">
                <button className="rounded-l-md border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
                  Diário
                </button>
                <button className="border-t border-b border-zinc-200 bg-zinc-900 px-3.5 py-1.5 text-xs font-medium text-white dark:border-zinc-800 dark:bg-zinc-100 dark:text-zinc-900">
                  Semanal
                </button>
                <button className="border border-l-0 border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
                  Mensal
                </button>
                <button className="rounded-r-md border border-l-0 border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
                  Anual
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 2. SEÇÃO DE TABELAS */}
      {activeTab === "tables" && (
        <Card>
          <CardHeader>
            <CardTitle>Exemplo de Tabela Administrativa Densa</CardTitle>
            <CardDescription>Otimizada para grandes volumes com paginação e status.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-50/80 border-b border-zinc-200 text-zinc-700 font-semibold dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-300">
                  <tr>
                    <th className="py-2.5 px-3">Cliente / Lead</th>
                    <th className="py-2.5 px-3">Origem</th>
                    <th className="py-2.5 px-3">Imóvel Pretendido</th>
                    <th className="py-2.5 px-3">Corretor</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-600 dark:text-zinc-300">
                  {[
                    { name: "Dr. Marcelo Fagundes", source: "WhatsApp (Evolution)", prop: "AP-1082 (Itaim Bibi)", broker: "Carlos Mendonça", status: "DISPONIVEL" },
                    { name: "Juliana Becker", source: "Portal Zap", prop: "CS-3041 (Alphaville)", broker: "Mariana Duarte", status: "RESERVADO" },
                    { name: "Felipe Nogueira", source: "Site Oficial", prop: "CB-8012 (Jardins)", broker: "Carlos Mendonça", status: "VENDIDO" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30">
                      <td className="py-2.5 px-3 font-medium text-zinc-900 dark:text-zinc-100">{row.name}</td>
                      <td className="py-2.5 px-3">{row.source}</td>
                      <td className="py-2.5 px-3 font-mono">{row.prop}</td>
                      <td className="py-2.5 px-3">{row.broker}</td>
                      <td className="py-2.5 px-3"><BusinessStatusBadge status={row.status} /></td>
                      <td className="py-2.5 px-3 text-right">
                        <button className="text-emerald-700 font-semibold hover:underline dark:text-emerald-400">Ver</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 3. SEÇÃO DE GRÁFICOS */}
      {activeTab === "charts" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Gráfico de Barras: Leads vs. Visitas</CardTitle>
              <CardDescription>Comparativo semanal de conversão de atendimento.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={SAMPLE_CHART_DATA}>
                    <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: "#18181b", borderRadius: "6px", border: "none", color: "#fff", fontSize: "11px" }} />
                    <Bar dataKey="leads" fill="#0f3d3e" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="visitas" fill="#059669" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Distribuição da Carteira por Bairro</CardTitle>
              <CardDescription>Concentração de estoque por região nobre.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <div className="h-60 w-60">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={SAMPLE_PIE_DATA} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={3}>
                      {SAMPLE_PIE_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "#18181b", borderRadius: "6px", border: "none", color: "#fff", fontSize: "11px" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 4. SEÇÃO DE MODAIS & SHEETS */}
      {activeTab === "modals" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Diálogos Modais (Dialog / Modal)</CardTitle>
              <CardDescription>Com fechamento por tecla ESC e foco acessível.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={() => setDialogOpen(true)}>
                Abrir Modal de Exemplo
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gavetas Laterais (Sheet / Drawer)</CardTitle>
              <CardDescription>Ideais para visualização de ficha completa de imóvel.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" onClick={() => setSheetOpen(true)}>
                Abrir Gaveta Lateral (Sheet)
              </Button>
            </CardContent>
          </Card>

          {/* Modal Central */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogHeader>
              <DialogTitle>Confirmar Atualização de Status</DialogTitle>
              <DialogDescription>
                Deseja marcar o imóvel como <strong>RESERVADO</strong>? Essa alteração notificará os corretores associados.
              </DialogDescription>
            </DialogHeader>
            <div className="p-3 bg-zinc-50 rounded border text-xs text-zinc-600 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300">
              A proposta vinculada é de R$ 3.850.000 em nome do Dr. Marcelo Fagundes.
            </div>
            <DialogFooter>
              <Button variant="outline" size="sm" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button size="sm" onClick={() => { setDialogOpen(false); toast.success("Imóvel marcado como Reservado!"); }}>
                Confirmar Reserva
              </Button>
            </DialogFooter>
          </Dialog>

          {/* Gaveta Lateral */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen} title="Ficha Rápida do Imóvel" description="Código AP-1082">
            <div className="space-y-4 text-xs">
              <div className="aspect-16/10 rounded-md overflow-hidden bg-zinc-100">
                <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80" alt="Capa" className="h-full w-full object-cover" />
              </div>
              <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
                Apartamento Alto Padrão no Itaim Bibi
              </p>
              <p className="text-zinc-600 dark:text-zinc-400">
                Varanda gourmet envidraçada, marcenaria completa e 3 vagas de garagem.
              </p>
              <Button className="w-full" size="sm" onClick={() => { setSheetOpen(false); toast.success("Ficha exportada em PDF!"); }}>
                <Download className="h-3.5 w-3.5 mr-1" />
                Baixar Ficha Técnica
              </Button>
            </div>
          </Sheet>
        </div>
      )}

      {/* 5. SEÇÃO DE TOASTERS */}
      {activeTab === "toasts" && (
        <Card>
          <CardHeader>
            <CardTitle>Notificações Sonner (Toasters)</CardTitle>
            <CardDescription>Dispare alertas operacionais contextuais em tempo real.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                onClick={() => toast.success("Proposta aceita e registrada no sistema!")}
              >
                Toast de Sucesso
              </Button>
              <Button
                variant="outline"
                onClick={() => toast.error("Falha ao sincronizar pasta do Google Drive.")}
              >
                Toast de Erro
              </Button>
              <Button
                variant="outline"
                onClick={() => toast.warning("Documento ainda em fila de processamento no pgvector.")}
              >
                Toast de Aviso
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  toast("Lead transferido de corretor", {
                    action: {
                      label: "Desfazer",
                      onClick: () => toast.info("Ação desfeita com sucesso!"),
                    },
                  })
                }
              >
                Toast com Ação de Desfazer
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 6. SEÇÃO DE FORMULÁRIOS & CONTROLES */}
      {activeTab === "forms" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Campos de Texto & Seletores</CardTitle>
              <CardDescription>Inputs com acessibilidade e foco nítido.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1">
                  Input Padrão com Placeholder
                </label>
                <Input placeholder="Digite o nome do condomínio..." />
              </div>
              <div>
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1">
                  Input Desabilitado
                </label>
                <Input disabled value="Campo travado por permissão de acesso" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Controles Especiais (Switch & Slider)</CardTitle>
              <CardDescription>Para filtros de busca por faixa de preço e ativações de anúncio.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 block">
                    Publicar no Portal Zap & VivaReal
                  </span>
                  <span className="text-[11px] text-zinc-500">
                    Sincronização automática via XML do sistema.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSwitchActive(!switchActive)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                    switchActive ? "bg-emerald-600" : "bg-zinc-200 dark:bg-zinc-700"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      switchActive ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-zinc-700 dark:text-zinc-300">Faixa Máxima de Valor:</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">
                    {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(sliderValue)}
                  </span>
                </div>
                <input
                  type="range"
                  min="500000"
                  max="15000000"
                  step="250000"
                  value={sliderValue}
                  onChange={(e) => setSliderValue(Number(e.target.value))}
                  className="w-full accent-emerald-700 cursor-pointer"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 7. SEÇÃO DE BADGES */}
      {activeTab === "badges" && (
        <Card>
          <CardHeader>
            <CardTitle>Badges Semânticos de Negócio</CardTitle>
            <CardDescription>Indicadores padronizados para status de imóveis e da esteira RAG.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                Status de Imóveis & Vendas
              </h4>
              <div className="flex flex-wrap gap-2">
                <BusinessStatusBadge status="DISPONIVEL" />
                <BusinessStatusBadge status="RESERVADO" />
                <BusinessStatusBadge status="VENDIDO" />
                <BusinessStatusBadge status="INATIVO" />
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                Status de Ingestão no RAG (Google Drive & pgvector)
              </h4>
              <div className="flex flex-wrap gap-2">
                <BusinessStatusBadge status="INDEXED" />
                <BusinessStatusBadge status="PROCESSING" />
                <BusinessStatusBadge status="PENDING" />
                <BusinessStatusBadge status="ERROR" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
