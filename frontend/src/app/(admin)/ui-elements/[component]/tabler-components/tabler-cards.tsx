"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import {
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  Layers,
  ChevronRight,
  MoreVertical,
  Star,
  Bookmark,
  Share2,
  Heart,
  TrendingUp,
  TrendingDown,
  Building2,
  User,
  Users,
  Eye,
  Calendar,
  Clock,
  ArrowRight,
  Sliders,
  DollarSign,
  Palette,
} from "lucide-react";
import { toast } from "sonner";

interface TablerCardsProps {
  defaultTab?: "cards" | "gradients";
}

export function TablerCards({ defaultTab = "cards" }: TablerCardsProps) {
  const [activeTab, setActiveTab] = useState<"cards" | "gradients">(defaultTab);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Header tabs state
  const [headerNavTab, setHeaderNavTab] = useState("overview");
  const [headerPillTab, setHeaderPillTab] = useState("all");

  const handleCopy = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    toast.success("Código copiado!");
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            <span>Tabler UI</span>
            <span>•</span>
            <span className="text-primary font-bold">Containers & Layout</span>
            <span>•</span>
            <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">
              1:1 Official Replica (cards.html + card-gradients.html)
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Cards & Card Gradients</h1>
          <p className="text-muted-foreground text-sm mt-1 max-w-3xl">
            Catálogo completo de cards do Tabler: headers, efeitos de link e rotação, indicadores de status, fitas (ribbons), barras de progresso, imagens com diferentes alinhamentos, rodapés com botões e a coleção completa de 16 gradientes exclusivos.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Main Tab Switcher */}
          <div className="inline-flex p-1 rounded-lg bg-muted border border-border text-xs">
            <button
              onClick={() => setActiveTab("cards")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                activeTab === "cards"
                  ? "bg-card text-foreground shadow-xs font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Cards Oficiais (cards.html)</span>
            </button>
            <button
              onClick={() => setActiveTab("gradients")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                activeTab === "gradients"
                  ? "bg-card text-foreground shadow-xs font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Card Gradients (card-gradients.html)</span>
            </button>
          </div>

          <a
            href={activeTab === "cards" ? "https://preview.tabler.io/cards.html" : "https://preview.tabler.io/card-gradients.html"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border border-border bg-card hover:bg-muted transition-colors text-muted-foreground hover:text-foreground shadow-xs"
          >
            <span>Ver no Tabler</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ABA 1: TABLER CARDS OFICIAIS (preview.tabler.io/cards.html)                */}
      {/* ========================================================================= */}
      {activeTab === "cards" && (
        <div className="space-y-10 animate-in fade-in-50 duration-200">

          {/* 1. HEADERS & BODY STYLES */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                1. Headers & Body Styles
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Standard Card */}
              <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
                <div className="border-b border-border pb-3 mb-3 flex items-center justify-between">
                  <h4 className="text-sm font-bold text-foreground">Card title</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Conteúdo padrão com cabeçalho simples e linha divisória sutil.
                </p>
              </div>

              {/* Light Header Card */}
              <div className="rounded-xl border border-border bg-card overflow-hidden shadow-xs">
                <div className="bg-muted/50 px-5 py-3 border-b border-border">
                  <h4 className="text-sm font-bold text-foreground">Card title</h4>
                </div>
                <div className="p-5">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Cabeçalho com fundo suave em tom institucional neutro.
                  </p>
                </div>
              </div>

              {/* Borderless Card */}
              <div className="rounded-xl bg-muted/40 p-5">
                <h4 className="text-sm font-bold text-foreground mb-2">Card borderless</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Sem bordas rígidas, utilizando o contraste de plano de fundo da superfície.
                </p>
              </div>

              {/* Title with Subtitle */}
              <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
                <div>
                  <h4 className="text-sm font-bold text-foreground">Card title</h4>
                  <span className="text-[11px] text-muted-foreground block mt-0.5">Subtitle</span>
                </div>
                <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                  Combinação de título e subtítulo com hierarquia tipográfica precisa.
                </p>
              </div>
            </div>
          </div>

          {/* 2. LINK HOVER EFFECTS & ROTATION */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              2. Link Hover Effects & Rotation (card-link & card-rotate)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card link */}
              <a
                href="#cards"
                onClick={(e) => { e.preventDefault(); toast.info("Clicou no card-link!"); }}
                className="group rounded-xl border border-border bg-card p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-primary/50 cursor-pointer block"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                    Card com Link
                  </h4>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs text-muted-foreground">
                  Efeito de elevação suave (*hover lift*) com destaque de borda.
                </p>
              </a>

              {/* Card link rotate */}
              <a
                href="#cards"
                onClick={(e) => { e.preventDefault(); toast.info("Clicou no card-link-rotate!"); }}
                className="group rounded-xl border border-border bg-card p-5 shadow-xs transition-all duration-200 hover:rotate-1 hover:scale-[1.02] hover:shadow-md cursor-pointer block"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-foreground group-hover:text-blue-500 transition-colors">
                    Link com Rotação 3D
                  </h4>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:rotate-45 transition-transform" />
                </div>
                <p className="text-xs text-muted-foreground">
                  Gira sutilmente (+1deg) e amplia em escala ao passar o cursor.
                </p>
              </a>

              {/* Card rotate state */}
              <div className="group rounded-xl border border-border bg-card p-5 shadow-xs transition-all duration-300 hover:-rotate-1 hover:border-emerald-500/50 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-foreground group-hover:text-emerald-500 transition-colors">
                    Micro-inclinação (-1deg)
                  </h4>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                </div>
                <p className="text-xs text-muted-foreground">
                  Perfeito para cards interativos de produtos, imóveis ou anúncios.
                </p>
              </div>
            </div>
          </div>

          {/* 3. STATUS INDICATORS (TOP, BOTTOM, SIDE) */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              3. Status Indicators (Top, Bottom & Side Borders)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Card with top status primary */}
              <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
                <div className="h-1 bg-primary w-full" />
                <div className="p-5">
                  <h4 className="text-sm font-bold text-foreground mb-1">Status no Topo</h4>
                  <p className="text-xs text-muted-foreground">Borda primária no topo indicando prioridade.</p>
                </div>
              </div>

              {/* Card with top status success */}
              <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
                <div className="h-1 bg-emerald-500 w-full" />
                <div className="p-5">
                  <h4 className="text-sm font-bold text-foreground mb-1">Status Ativo</h4>
                  <p className="text-xs text-muted-foreground">Verde esmeralda para contratos vigentes e vendas.</p>
                </div>
              </div>

              {/* Card with bottom status */}
              <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden flex flex-col justify-between">
                <div className="p-5">
                  <h4 className="text-sm font-bold text-foreground mb-1">Status na Base</h4>
                  <p className="text-xs text-muted-foreground">Faixa inferior âmbar para pendências e vistorias.</p>
                </div>
                <div className="h-1 bg-amber-400 w-full" />
              </div>

              {/* Card with side status */}
              <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden flex">
                <div className="w-1.5 bg-red-500 shrink-0" />
                <div className="p-5">
                  <h4 className="text-sm font-bold text-foreground mb-1">Status Lateral</h4>
                  <p className="text-xs text-muted-foreground">Indicador lateral vermelho para alertas críticos.</p>
                </div>
              </div>
            </div>
          </div>

          {/* 4. RIBBONS & PROGRESS */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              4. Ribbons & Progress Bars
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card with text ribbon */}
              <div className="relative rounded-xl border border-border bg-card p-5 shadow-xs overflow-hidden">
                <div className="absolute top-3 -right-8 bg-red-500 text-white text-[10px] font-extrabold uppercase py-0.5 px-8 rotate-45 shadow-xs">
                  Novo
                </div>
                <h4 className="text-sm font-bold text-foreground mb-1">Card com Ribbon Diagonal</h4>
                <p className="text-xs text-muted-foreground pr-8">
                  Destaque comercial para lançamentos de empreendimentos ou ofertas especiais.
                </p>
              </div>

              {/* Card with bookmark ribbon */}
              <div className="relative rounded-xl border border-border bg-card p-5 shadow-xs">
                <div className="absolute top-0 right-4 bg-primary text-primary-foreground p-1.5 rounded-b-md shadow-xs">
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <h4 className="text-sm font-bold text-foreground mb-1">Ribbon com Ícone</h4>
                <p className="text-xs text-muted-foreground pr-8">
                  Marcador tipo marcador de livro para itens favoritados ou VIP.
                </p>
              </div>

              {/* Card with progress bar */}
              <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
                <div className="p-5 pb-3">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-sm font-bold text-foreground">Card com Progresso</h4>
                    <span className="text-xs font-bold text-primary">68%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Metas de vendas de unidades residenciais no trimestre.</p>
                </div>
                <div className="w-full h-1.5 bg-muted">
                  <div className="h-full bg-primary" style={{ width: "68%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* 5. CARD IMAGES (TOP, BOTTOM, LEFT, RIGHT) */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              5. Card Images (Top, Bottom, Left & Right Side)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Image Top */}
              <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80"
                  alt="Mansão"
                  className="w-full h-36 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-sm font-bold text-foreground">Imagem no Topo</h4>
                  <p className="text-xs text-muted-foreground mt-1">Layout tradicional de vitrine de imóveis.</p>
                </div>
              </div>

              {/* Image Bottom */}
              <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden flex flex-col justify-between">
                <div className="p-4">
                  <h4 className="text-sm font-bold text-foreground">Imagem na Base</h4>
                  <p className="text-xs text-muted-foreground mt-1">Texto e especificações antes do croqui.</p>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80"
                  alt="Living"
                  className="w-full h-36 object-cover"
                />
              </div>

              {/* Horizontal Media: Left Side Image */}
              <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden flex md:col-span-2">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80"
                  alt="Apartamento"
                  className="w-1/3 object-cover shrink-0"
                />
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase">Lançamento</span>
                    <h4 className="text-sm font-bold text-foreground mt-0.5">Residencial Grand Palais</h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      Apartamentos de 4 suítes com vista panorâmica definitiva no bairro nobre.
                    </p>
                  </div>
                  <div className="text-xs font-bold text-foreground mt-2">R$ 4.850.000</div>
                </div>
              </div>
            </div>
          </div>

          {/* 6. FOOTERS & ACTION BUTTONS */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              6. Footers & Action Buttons
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card with footer text */}
              <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden flex flex-col justify-between">
                <div className="p-5">
                  <h4 className="text-sm font-bold text-foreground mb-1">Card com Rodapé</h4>
                  <p className="text-xs text-muted-foreground">Informações cadastrais e dados da matrícula do imóvel.</p>
                </div>
                <div className="px-5 py-3 bg-muted/30 border-t border-border text-xs text-muted-foreground flex items-center justify-between">
                  <span>Atualizado há 2h</span>
                  <span className="text-emerald-600 font-semibold">Ativo</span>
                </div>
              </div>

              {/* Card with single footer button */}
              <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden flex flex-col justify-between">
                <div className="p-5">
                  <h4 className="text-sm font-bold text-foreground mb-1">Botão de Ação Único</h4>
                  <p className="text-xs text-muted-foreground">Ação de largura total ocupando toda a base do card.</p>
                </div>
                <button
                  type="button"
                  onClick={() => toast.success("Ação executada!")}
                  className="w-full py-2.5 px-4 bg-muted/40 hover:bg-muted text-foreground text-xs font-bold border-t border-border transition-colors cursor-pointer"
                >
                  Ver Ficha Técnica Completa
                </button>
              </div>

              {/* Card with button group */}
              <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden flex flex-col justify-between">
                <div className="p-5">
                  <h4 className="text-sm font-bold text-foreground mb-1">Grupo de Botões</h4>
                  <p className="text-xs text-muted-foreground">Múltiplas opções divididas igualmente na base.</p>
                </div>
                <div className="grid grid-cols-3 border-t border-border divide-x divide-border bg-muted/20 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => toast.info("Editando...")}
                    className="py-2 text-center hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => toast.info("Compartilhado!")}
                    className="py-2 text-center hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    Enviar
                  </button>
                  <button
                    type="button"
                    onClick={() => toast.info("Arquivado!")}
                    className="py-2 text-center hover:bg-muted text-red-500 transition-colors cursor-pointer"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 7. HEADER TABS & PILLS */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              7. Header Tabs & Navigation Pills
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card with Nav Tabs in Header */}
              <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
                <div className="px-5 pt-3 border-b border-border flex items-center justify-between">
                  <div className="flex gap-4 text-xs font-semibold">
                    {[
                      { id: "overview", label: "Visão Geral" },
                      { id: "plantas", label: "Plantas & Metragens" },
                      { id: "financeiro", label: "Tabela de Preços" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setHeaderNavTab(tab.id)}
                        className={`pb-2.5 transition-colors cursor-pointer relative ${
                          headerNavTab === tab.id
                            ? "text-primary font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="p-5 text-xs text-muted-foreground leading-relaxed">
                  {headerNavTab === "overview" && "Resumo executivo do empreendimento, infraestrutura de lazer e amenidades inclusas."}
                  {headerNavTab === "plantas" && "Croquis das tipologias de 3 e 4 dormitórios com opções de cozinha integrada e varanda gourmet."}
                  {headerNavTab === "financeiro" && "Condições de entrada de 20%, parcelamento direto durante as obras e saldo via financiamento SFH."}
                </div>
              </div>

              {/* Card with Nav Pills in Header */}
              <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
                <div className="px-5 py-3 border-b border-border flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase text-foreground">Filtro de Leads</h4>
                  <div className="inline-flex p-0.5 rounded-lg bg-muted border border-border text-[11px]">
                    {["all", "hot", "pending"].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setHeaderPillTab(p)}
                        className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer capitalize ${
                          headerPillTab === p
                            ? "bg-card text-foreground shadow-xs font-bold"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {p === "all" ? "Todos" : p === "hot" ? "Quentes" : "Em análise"}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="p-5 text-xs text-muted-foreground">
                  Exibindo leads correspondentes ao filtro ativo no cabeçalho do card.
                </div>
              </div>
            </div>
          </div>

          {/* 8. SPECIAL STATES (EMPTY & SKELETON) */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              8. Special States (Loading Skeleton & Empty State)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Empty state card */}
              <div className="rounded-xl border border-dashed border-border bg-card p-8 text-center shadow-xs">
                <div className="w-12 h-12 rounded-full bg-muted/60 text-muted-foreground mx-auto flex items-center justify-center mb-3">
                  <Users className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-foreground">Nenhum corretor associado</h4>
                <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                  Vincule corretores autorizados para gerenciar as visitas e o plantão de vendas deste imóvel.
                </p>
                <button
                  type="button"
                  onClick={() => toast.success("Modal de vinculação aberto!")}
                  className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground text-xs font-bold rounded-lg shadow-xs hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  <span>Adicionar Corretor</span>
                </button>
              </div>

              {/* Loading Skeleton Card */}
              <div className="rounded-xl border border-border bg-card p-6 shadow-xs animate-pulse space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted" />
                  <div className="space-y-2 flex-1">
                    <div className="h-3.5 w-32 bg-muted rounded" />
                    <div className="h-2.5 w-20 bg-muted rounded" />
                  </div>
                </div>
                <div className="space-y-2 pt-2">
                  <div className="h-2.5 w-full bg-muted rounded" />
                  <div className="h-2.5 w-4/5 bg-muted rounded" />
                </div>
                <div className="h-8 w-28 bg-muted rounded-lg mt-4" />
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* ABA 2: CARD GRADIENTS (preview.tabler.io/card-gradients.html)              */}
      {/* ========================================================================= */}
      {activeTab === "gradients" && (
        <div className="space-y-8 animate-in fade-in-50 duration-200">
          <div className="border-b border-border/40 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-foreground">
                Coleção de Gradientes Oficiais do Tabler
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Fundos com gradientes cromáticos sofisticados para destacar cards de métricas, call-to-actions e planos premium.
              </p>
            </div>
            <button
              onClick={() => handleCopy('<div class="card card-gradient card-gradient-ocean card-gradient-end">...</div>', 'grad-all')}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === 'grad-all' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copiar Classes</span>
            </button>
          </div>

          {/* Large Hero Gradient Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* 1. card-gradient-ocean */}
            <div className="rounded-2xl p-6 text-white shadow-lg bg-gradient-to-br from-cyan-500 via-sky-600 to-blue-700 relative overflow-hidden group">
              <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
              <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-100">card-gradient-ocean</div>
              <h4 className="text-xl font-black mt-2 mb-1 tracking-tight">Oceano Profundo</h4>
              <p className="text-xs text-cyan-100 leading-relaxed mb-4">
                Transição de ciano e azul elétrico para dashboards modernos de tecnologia e métricas.
              </p>
              <div className="text-2xl font-black">R$ 14.8M</div>
            </div>

            {/* 2. card-gradient-love */}
            <div className="rounded-2xl p-6 text-white shadow-lg bg-gradient-to-br from-pink-500 via-rose-500 to-purple-700 relative overflow-hidden">
              <div className="text-[11px] font-bold uppercase tracking-wider text-pink-100">card-gradient-love</div>
              <h4 className="text-xl font-black mt-2 mb-1 tracking-tight">Love Romance</h4>
              <p className="text-xs text-pink-100 leading-relaxed mb-4">
                Tons de rosa e magenta quentes para conversões de leads e promoções de alto impacto.
              </p>
              <div className="text-2xl font-black">+42.8% Leads</div>
            </div>

            {/* 3. card-gradient-success */}
            <div className="rounded-2xl p-6 text-white shadow-lg bg-gradient-to-br from-emerald-400 via-teal-600 to-green-800 relative overflow-hidden">
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-100">card-gradient-success</div>
              <h4 className="text-xl font-black mt-2 mb-1 tracking-tight">Esmeralda & Sucesso</h4>
              <p className="text-xs text-emerald-100 leading-relaxed mb-4">
                Verde esmeralda institucional ideal para indicadores financeiros positivos e lucros.
              </p>
              <div className="text-2xl font-black">98.4% Meta Atingida</div>
            </div>

            {/* 4. card-gradient-gold */}
            <div className="rounded-2xl p-6 text-zinc-950 shadow-lg bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-600 relative overflow-hidden">
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-amber-950">card-gradient-gold</div>
              <h4 className="text-xl font-black mt-2 mb-1 tracking-tight">Ouro Platinum VIP</h4>
              <p className="text-xs text-amber-950/80 leading-relaxed mb-4 font-medium">
                Estética metálica dourada refinada para clientes Private Banking e imóveis de altíssimo padrão.
              </p>
              <div className="text-2xl font-black">REF: PENTHOUSE-901</div>
            </div>

            {/* 5. card-gradient-danger */}
            <div className="rounded-2xl p-6 text-white shadow-lg bg-gradient-to-br from-amber-500 via-red-600 to-rose-700 relative overflow-hidden">
              <div className="text-[11px] font-bold uppercase tracking-wider text-red-100">card-gradient-danger</div>
              <h4 className="text-xl font-black mt-2 mb-1 tracking-tight">Sunset Danger</h4>
              <p className="text-xs text-red-100 leading-relaxed mb-4">
                Degradê quente de pôr do sol para alertas urgentes e prazos de contrato expirando.
              </p>
              <div className="text-2xl font-black">3 Pendências Urgentes</div>
            </div>

            {/* 6. card-gradient-rainbow */}
            <div className="rounded-2xl p-6 text-white shadow-lg bg-gradient-to-r from-red-500 via-purple-500 via-blue-500 to-emerald-500 relative overflow-hidden">
              <div className="text-[11px] font-bold uppercase tracking-wider text-white/90">card-gradient-rainbow</div>
              <h4 className="text-xl font-black mt-2 mb-1 tracking-tight">Rainbow Cromático</h4>
              <p className="text-xs text-white/90 leading-relaxed mb-4 font-medium">
                Espectro completo multicolorido para celebração de metas de equipe e premiações.
              </p>
              <div className="text-2xl font-black">Top Imobiliária 2026</div>
            </div>

            {/* 7. card-gradient-sun */}
            <div className="rounded-2xl p-6 text-white shadow-lg bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 relative overflow-hidden">
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-100">card-gradient-sun</div>
              <h4 className="text-xl font-black mt-2 mb-1 tracking-tight">Nascer do Sol</h4>
              <p className="text-xs text-amber-100 leading-relaxed mb-4">
                Energia e vigor para novidades e campanhas de lançamento imobiliário.
              </p>
              <div className="text-2xl font-black">1.250 Visitas Hoje</div>
            </div>

            {/* 8. card-gradient-snow */}
            <div className="rounded-2xl p-6 text-zinc-900 dark:text-zinc-100 shadow-lg bg-gradient-to-br from-zinc-100 via-slate-200 to-zinc-300 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-700 relative overflow-hidden border border-border">
              <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">card-gradient-snow</div>
              <h4 className="text-xl font-black mt-2 mb-1 tracking-tight">Snow & Frost</h4>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                Elegância monocromática suave para ambientes escuros e claros com contraste elegante.
              </p>
              <div className="text-2xl font-black">Mínimo Ruído</div>
            </div>

            {/* 9. card-gradient-yellow */}
            <div className="rounded-2xl p-6 text-zinc-950 shadow-lg bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-500 relative overflow-hidden">
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-950">card-gradient-yellow</div>
              <h4 className="text-xl font-black mt-2 mb-1 tracking-tight">Citrus Yellow</h4>
              <p className="text-xs text-amber-950/80 leading-relaxed mb-4 font-medium">
                Amarelo vibrante com alta legibilidade para cards de notificação instantânea.
              </p>
              <div className="text-2xl font-black">Plantão Aberto</div>
            </div>

          </div>

          {/* Metric Small Cards with Gradient Ends (card-sm card-gradient-end) */}
          <div className="space-y-3 pt-6 border-t border-border/40">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Cards Compactos com Gradiente Lateral (card-sm card-gradient-end)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Primary Blue Gradient End */}
              <div className="rounded-xl border border-border bg-card p-4 shadow-xs relative overflow-hidden flex items-center justify-between">
                <div className="relative z-10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">VGV Total</span>
                  <div className="text-lg font-black text-foreground mt-0.5">R$ 84.5M</div>
                  <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-0.5 mt-0.5">
                    <TrendingUp className="w-3 h-3" /> +14.2% vs mês anterior
                  </span>
                </div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 opacity-20 blur-md pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-b from-blue-500 to-indigo-600" />
              </div>

              {/* Green Gradient End */}
              <div className="rounded-xl border border-border bg-card p-4 shadow-xs relative overflow-hidden flex items-center justify-between">
                <div className="relative z-10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Contratos Fechados</span>
                  <div className="text-lg font-black text-foreground mt-0.5">38 Unidades</div>
                  <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-0.5 mt-0.5">
                    <TrendingUp className="w-3 h-3" /> 100% meta batida
                  </span>
                </div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 opacity-20 blur-md pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-b from-emerald-400 to-teal-600" />
              </div>

              {/* Red Gradient End */}
              <div className="rounded-xl border border-border bg-card p-4 shadow-xs relative overflow-hidden flex items-center justify-between">
                <div className="relative z-10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Aguardando Vistoria</span>
                  <div className="text-lg font-black text-foreground mt-0.5">4 Imóveis</div>
                  <span className="text-[10px] font-semibold text-amber-500 flex items-center gap-0.5 mt-0.5">
                    <Clock className="w-3 h-3" /> Prazo: 48 horas
                  </span>
                </div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-red-600 opacity-20 blur-md pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-b from-rose-500 to-red-600" />
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
