"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Copy, Check, ExternalLink, Radio, Wifi, Zap, Building2, Flame } from "lucide-react";
import { toast } from "sonner";

interface SignalBarProps {
  level: number; // 0 to maxBars
  maxBars?: number;
  size?: "xs" | "sm" | "md" | "lg";
  color?: "primary" | "success" | "warning" | "danger" | "info" | "purple";
  className?: string;
}

const sizeMap = {
  xs: { height: 12, width: 3, gap: 1.5 },
  sm: { height: 16, width: 4, gap: 2 },
  md: { height: 22, width: 5, gap: 2.5 },
  lg: { height: 30, width: 7, gap: 3 },
};

const colorMap = {
  primary: { active: "bg-blue-600", inactive: "bg-blue-200 dark:bg-blue-950/60" },
  success: { active: "bg-emerald-600", inactive: "bg-emerald-200 dark:bg-emerald-950/60" },
  warning: { active: "bg-amber-500", inactive: "bg-amber-200 dark:bg-amber-950/60" },
  danger: { active: "bg-rose-600", inactive: "bg-rose-200 dark:bg-rose-950/60" },
  info: { active: "bg-cyan-600", inactive: "bg-cyan-200 dark:bg-cyan-950/60" },
  purple: { active: "bg-purple-600", inactive: "bg-purple-200 dark:bg-purple-950/60" },
};

function Signal({
  level,
  maxBars = 5,
  size = "md",
  color = "primary",
  className = "",
}: SignalBarProps) {
  const currentSize = sizeMap[size];
  const currentColor = colorMap[color] || colorMap.primary;

  return (
    <span
      className={`inline-flex items-end shrink-0 ${className}`}
      style={{
        height: `${currentSize.height}px`,
        gap: `${currentSize.gap}px`,
      }}
      title={`Nível de sinal: ${level}/${maxBars}`}
    >
      {Array.from({ length: maxBars }).map((_, idx) => {
        const barHeightPercent = ((idx + 1) / maxBars) * 100;
        const isActive = idx < level;

        return (
          <span
            key={idx}
            className={`rounded-sm transition-colors ${
              isActive ? currentColor.active : currentColor.inactive
            }`}
            style={{
              width: `${currentSize.width}px`,
              height: `${barHeightPercent}%`,
            }}
          />
        );
      })}
    </span>
  );
}

export function TablerSignal() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [interactiveLevel, setInteractiveLevel] = useState(4);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast.success("Snippet copiado!");
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            <span>Tabler UI</span>
            <span>•</span>
            <span className="text-primary font-bold">Base Elements</span>
            <span>•</span>
            <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">1:1 Replica</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Signal</h1>
          <p className="text-muted-foreground text-sm mt-1 max-w-2xl">
            Indicadores de intensidade escalonada de sinal, prioridade, disponibilidade de rede e temperatura operacional.
            Réplica fiel de <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">https://preview.tabler.io/signal.html</code>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://preview.tabler.io/signal.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border border-border bg-card hover:bg-muted transition-colors text-muted-foreground hover:text-foreground shadow-sm"
          >
            <span>Ver Oficial Tabler</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">

        {/* ======================================================== */}
        {/* CARD 1: By priority (col-md-6 col-lg-6)                   */}
        {/* ======================================================== */}
        <div className="lg:col-span-6">
          <Card className="h-full flex flex-col justify-between shadow-sm hover:shadow transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold">By priority</CardTitle>
                <button
                  onClick={() => handleCopy('<span class="signal signal-highest"></span>', 'priority')}
                  className="p-1.5 text-muted-foreground hover:text-foreground rounded hover:bg-muted transition-colors"
                >
                  {copiedKey === 'priority' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <CardDescription className="text-xs">
                Display levels from None up to Highest with 5 incremental steps.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-3 p-4 bg-muted/20 dark:bg-muted/10 rounded-xl border border-dashed border-border/60">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Highest (5/5)</span>
                  <Signal level={5} maxBars={5} size="md" color="primary" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">High (4/5)</span>
                  <Signal level={4} maxBars={5} size="md" color="primary" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Medium (3/5)</span>
                  <Signal level={3} maxBars={5} size="md" color="primary" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Low (2/5)</span>
                  <Signal level={2} maxBars={5} size="md" color="primary" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Lowest (1/5)</span>
                  <Signal level={1} maxBars={5} size="md" color="primary" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">None (0/5)</span>
                  <Signal level={0} maxBars={5} size="md" color="primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ======================================================== */}
        {/* CARD 2: Number of bars (col-md-6 col-lg-6)                */}
        {/* ======================================================== */}
        <div className="lg:col-span-6">
          <Card className="h-full flex flex-col justify-between shadow-sm hover:shadow transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold">Number of bars</CardTitle>
                <button
                  onClick={() => handleCopy('<span class="signal signal-3-bars"></span>', 'bars')}
                  className="p-1.5 text-muted-foreground hover:text-foreground rounded hover:bg-muted transition-colors"
                >
                  {copiedKey === 'bars' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <CardDescription className="text-xs">
                Configure the total granularity of bars (3, 4, or 5 bars).
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-4 p-4 bg-muted/20 dark:bg-muted/10 rounded-xl border border-dashed border-border/60">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold block">3 Bars</span>
                    <span className="text-[10px] text-muted-foreground">Níveis compactos</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Signal level={1} maxBars={3} size="md" color="primary" />
                    <Signal level={2} maxBars={3} size="md" color="primary" />
                    <Signal level={3} maxBars={3} size="md" color="primary" />
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-border/40 pt-3">
                  <div>
                    <span className="text-xs font-semibold block">4 Bars</span>
                    <span className="text-[10px] text-muted-foreground">Padrão telecom</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Signal level={1} maxBars={4} size="md" color="primary" />
                    <Signal level={2} maxBars={4} size="md" color="primary" />
                    <Signal level={3} maxBars={4} size="md" color="primary" />
                    <Signal level={4} maxBars={4} size="md" color="primary" />
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-border/40 pt-3">
                  <div>
                    <span className="text-xs font-semibold block">5 Bars</span>
                    <span className="text-[10px] text-muted-foreground">Padrão Tabler</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Signal level={1} maxBars={5} size="md" color="primary" />
                    <Signal level={3} maxBars={5} size="md" color="primary" />
                    <Signal level={5} maxBars={5} size="md" color="primary" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ======================================================== */}
        {/* CARD 3: Sizes (col-md-6 col-lg-6)                         */}
        {/* ======================================================== */}
        <div className="lg:col-span-6">
          <Card className="h-full flex flex-col justify-between shadow-sm hover:shadow transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold">Sizes</CardTitle>
                <button
                  onClick={() => handleCopy('<span class="signal signal-sm"></span>', 'sizes')}
                  className="p-1.5 text-muted-foreground hover:text-foreground rounded hover:bg-muted transition-colors"
                >
                  {copiedKey === 'sizes' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <CardDescription className="text-xs">
                Signal bars available from extra-small (<code className="font-mono text-[11px]">xs</code>) to large (<code className="font-mono text-[11px]">lg</code>).
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex flex-wrap items-end justify-around gap-6 p-6 bg-muted/20 dark:bg-muted/10 rounded-xl border border-dashed border-border/60">
                <div className="text-center">
                  <Signal level={3} maxBars={5} size="xs" color="primary" />
                  <span className="text-[10px] font-mono text-muted-foreground block mt-2">xs (12px)</span>
                </div>
                <div className="text-center">
                  <Signal level={3} maxBars={5} size="sm" color="primary" />
                  <span className="text-[10px] font-mono text-muted-foreground block mt-2">sm (16px)</span>
                </div>
                <div className="text-center">
                  <Signal level={3} maxBars={5} size="md" color="primary" />
                  <span className="text-[10px] font-mono text-muted-foreground block mt-2">md (22px)</span>
                </div>
                <div className="text-center">
                  <Signal level={3} maxBars={5} size="lg" color="primary" />
                  <span className="text-[10px] font-mono text-muted-foreground block mt-2">lg (30px)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ======================================================== */}
        {/* CARD 4: Colors (col-md-6 col-lg-6)                        */}
        {/* ======================================================== */}
        <div className="lg:col-span-6">
          <Card className="h-full flex flex-col justify-between shadow-sm hover:shadow transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold">Colors</CardTitle>
                <button
                  onClick={() => handleCopy('<span class="signal signal-success"></span>', 'colors')}
                  className="p-1.5 text-muted-foreground hover:text-foreground rounded hover:bg-muted transition-colors"
                >
                  {copiedKey === 'colors' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <CardDescription className="text-xs">
                Contextual color states for success, warning, danger, and custom tones.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-muted/20 dark:bg-muted/10 rounded-xl border border-dashed border-border/60">
                <div className="flex items-center justify-between p-2 rounded bg-background border border-border">
                  <span className="text-xs font-medium">Primary</span>
                  <Signal level={4} maxBars={5} size="sm" color="primary" />
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-background border border-border">
                  <span className="text-xs font-medium">Success</span>
                  <Signal level={5} maxBars={5} size="sm" color="success" />
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-background border border-border">
                  <span className="text-xs font-medium">Warning</span>
                  <Signal level={3} maxBars={5} size="sm" color="warning" />
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-background border border-border">
                  <span className="text-xs font-medium">Danger</span>
                  <Signal level={1} maxBars={5} size="sm" color="danger" />
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-background border border-border">
                  <span className="text-xs font-medium">Info</span>
                  <Signal level={4} maxBars={5} size="sm" color="info" />
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-background border border-border">
                  <span className="text-xs font-medium">Purple</span>
                  <Signal level={4} maxBars={5} size="sm" color="purple" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ======================================================== */}
        {/* INTERACTIVE SHOWCASE FOR REAL ESTATE                       */}
        {/* ======================================================== */}
        <div className="lg:col-span-12">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-500" />
                    Temperatura de Lead & Qualidade Imobiliária
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Controle interativo para qualificação de leads e prontidão de negociação.
                  </CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setInteractiveLevel(Math.max(0, interactiveLevel - 1))}
                    className="px-2.5 py-1 text-xs border border-border rounded hover:bg-muted font-bold"
                  >
                    -
                  </button>
                  <span className="font-mono text-xs font-bold w-12 text-center">
                    {interactiveLevel} / 5
                  </span>
                  <button
                    onClick={() => setInteractiveLevel(Math.min(5, interactiveLevel + 1))}
                    className="px-2.5 py-1 text-xs border border-border rounded hover:bg-muted font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-xl border border-border bg-card flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Signal
                    level={interactiveLevel}
                    maxBars={5}
                    size="lg"
                    color={
                      interactiveLevel >= 4
                        ? "success"
                        : interactiveLevel >= 2
                        ? "warning"
                        : "danger"
                    }
                  />
                  <div>
                    <h4 className="text-sm font-bold">
                      {interactiveLevel === 5 && "Lead Super Aquecido (Visita Agendada)"}
                      {interactiveLevel === 4 && "Lead Qualificado com Proposta Formal"}
                      {interactiveLevel === 3 && "Interesse Médio / Em Avaliação Financeira"}
                      {interactiveLevel === 2 && "Contato Inicial Realizado"}
                      {interactiveLevel === 1 && "Lead Frio / Apenas Cadastro"}
                      {interactiveLevel === 0 && "Sem Engajamento"}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Prioridade alta no funil de atendimento dos corretores especialistas.
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-muted-foreground block">Score Algorítmico</span>
                  <span className="text-xl font-mono font-extrabold text-primary">
                    {interactiveLevel * 20}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
