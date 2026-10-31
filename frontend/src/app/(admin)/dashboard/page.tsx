"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  Bot,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { MetricCard } from "@/components/admin/metric-card";
import { MetricsService } from "@/services/metrics.service";
import { PropertyService } from "@/services/property.service";
import { LeadService } from "@/services/lead.service";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BusinessStatusBadge } from "@/components/ui/badge";
import type { OperationalMetrics } from "@/types/metrics";
import type { Property } from "@/types/property";
import type { Lead } from "@/types/lead";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<OperationalMetrics | null>(null);
  const [vgvHistory, setVgvHistory] = useState<any[]>([]);
  const [recentProperties, setRecentProperties] = useState<Property[]>([]);
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [m, hist, propsRes, leadsRes] = await Promise.all([
          MetricsService.getSummary(),
          MetricsService.getVgvMonthlyHistory(),
          PropertyService.list(),
          LeadService.list(),
        ]);
        setMetrics(m);
        setVgvHistory(hist);
        setRecentProperties(propsRes.data.slice(0, 4));
        setRecentLeads(leadsRes.slice(0, 4));
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Banner / Boas-vindas */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-200 pb-5 dark:border-zinc-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Painel Executivo
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Visão consolidada de performance imobiliária, atendimento de leads e base de conhecimento RAG.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Link href="/rag/laboratory">
            <Button variant="outline" size="sm">
              <Bot className="h-4 w-4 text-emerald-600" />
              Laboratório RAG
            </Button>
          </Link>
          <Link href="/properties/new">
            <Button size="sm">
              + Cadastrar Imóvel
            </Button>
          </Link>
        </div>
      </div>

      {/* Grid de Métricas Principais (KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="VGV Acumulado (2026)"
          value={metrics ? formatCurrency(metrics.vgvTotal) : "R$ --"}
          change={metrics?.vgvChangePercent}
          periodLabel="vs. mês anterior"
        />
        <MetricCard
          title="Imóveis Ativos na Carteira"
          value={metrics ? `${metrics.activePropertiesCount} unidades` : "--"}
          change={metrics?.activePropertiesChangePercent}
          periodLabel="novas captações"
        />
        <MetricCard
          title="Leads em Atendimento (CRM)"
          value={metrics ? `${metrics.activeLeadsCount} contatos` : "--"}
          change={metrics?.activeLeadsChangePercent}
          periodLabel="via WhatsApp & Web"
        />
        <MetricCard
          title="Taxa de Vacância (Locação)"
          value={metrics ? `${metrics.vacancyRatePercent}%` : "--"}
          change={metrics?.vacancyRateChangePercent}
          periodLabel="redução contínua"
        />
      </div>

      {/* Seção Gráficos de Desempenho */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico 1: Evolução VGV Mensal */}
        <div className="lg:col-span-2 rounded-lg border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Evolução do VGV Realizado vs. Meta (R$)
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Histórico semestral de volume transacionado
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-zinc-500">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-700" />
                Realizado
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                Meta
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={vgvHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="vgvGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  tickFormatter={(val) => `R$ ${(val / 1000000).toFixed(1)}M`}
                />
                <Tooltip
                  formatter={(value: any) => [formatCurrency(Number(value)), "Valor"]}
                  contentStyle={{
                    backgroundColor: "#18181b",
                    borderRadius: "8px",
                    border: "none",
                    color: "#f4f4f5",
                    fontSize: "12px",
                  }}
                />
                <Area type="monotone" dataKey="vgvRealizado" stroke="#059669" strokeWidth={2} fillOpacity={1} fill="url(#vgvGrad)" />
                <Area type="monotone" dataKey="metaVgv" stroke="#cbd5e1" strokeDasharray="4 4" strokeWidth={1.5} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card Destaque RAG Assistant */}
        <div className="flex flex-col justify-between rounded-lg border border-zinc-200 bg-linear-to-b from-white to-zinc-50/50 p-5 shadow-xs dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-900/60">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              <Sparkles className="h-3.5 w-3.5" />
              Piloto RAG Ativo
            </div>
            <h3 className="mt-3 text-base font-bold text-zinc-900 dark:text-zinc-100">
              Conhecimento Semântico & WhatsApp
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              A IA está indexando documentos do Google Drive e transcrições de conversas. Corretores e clientes podem consultar detalhes de contratos e inventário instantaneamente.
            </p>

            <div className="mt-4 space-y-2.5 border-t border-zinc-200/80 pt-4 dark:border-zinc-800 text-xs">
              <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                <span>Fontes no Google Drive:</span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">5 arquivos</span>
              </div>
              <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                <span>Fragmentos (Chunks) no pgvector:</span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">147 chunks</span>
              </div>
              <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                <span>Latência média de busca:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">~340ms</span>
              </div>
            </div>
          </div>

          <Link href="/rag/laboratory" className="mt-5">
            <Button variant="outline" className="w-full justify-between text-xs">
              <span>Testar perguntas no laboratório</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Tabelas de Visão Rápida: Últimos Imóveis e Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Últimos Imóveis Cadastrados */}
        <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Últimas Captações de Imóveis
            </h3>
            <Link href="/properties" className="text-xs font-medium text-emerald-700 hover:underline dark:text-emerald-400">
              Ver todos →
            </Link>
          </div>

          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {recentProperties.map((p) => (
              <div key={p.id} className="py-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {p.title}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {p.code} · {p.neighborhood} · {formatCurrency(p.price)}
                  </p>
                </div>
                <BusinessStatusBadge status={p.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Últimos Leads em Atendimento */}
        <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Leads Recentes em Atendimento
            </h3>
            <Link href="/leads" className="text-xs font-medium text-emerald-700 hover:underline dark:text-emerald-400">
              Acessar funil CRM →
            </Link>
          </div>

          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {recentLeads.map((l) => (
              <div key={l.id} className="py-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {l.name}
                  </p>
                  <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                    Interesse: {l.propertyInterestCode ?? "Geral"} · {l.assignedBrokerName}
                  </p>
                </div>
                <span className="rounded-md border px-2 py-0.5 text-[11px] font-medium border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 shrink-0">
                  {l.stage.replace("_", " ")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
