"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  Layers,
  BarChart3,
  PieChart,
  HardDrive,
  Activity,
  Filter,
} from "lucide-react";
import { toast } from "sonner";

export function TablerLegend() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Card 3: States interactive
  const [activeState, setActiveState] = useState<string>("active");
  const [offState, setOffState] = useState<boolean>(true);

  // Card 11: Large links interactive
  const [largeLinkStates, setLargeLinkStates] = useState<Record<string, "normal" | "active" | "off">>({
    desktop: "active",
    mobile: "normal",
    tablet: "off",
  });

  const toggleLargeLink = (key: string) => {
    setLargeLinkStates((prev) => {
      const current = prev[key];
      const next = current === "active" ? "normal" : current === "normal" ? "off" : "active";
      toast.info(`Série ${key}: agora está ${next === "off" ? "oculta" : next === "active" ? "destacada" : "normal"}`);
      return { ...prev, [key]: next };
    });
  };

  // Card 15: Interactive Legend Chart toggle
  const [chartSeries, setChartSeries] = useState<Record<string, boolean>>({
    visits: true,
    unique: true,
    pageviews: true,
  });

  const toggleChartSeries = (key: string) => {
    setChartSeries((prev) => {
      const next = !prev[key];
      toast.info(`Série "${key}" ${next ? "ativada" : "ocultada"}`);
      return { ...prev, [key]: next };
    });
  };

  // Card 16: Donut hover state
  const [hoveredDonutSlice, setHoveredDonutSlice] = useState<number | null>(null);

  // Card 18: Filter links state
  const [activeFilter, setActiveFilter] = useState("all");

  const handleCopy = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    toast.success("Código copiado!");
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Colors for Card 4
  const tablerPalette = [
    { name: "Blue", class: "bg-blue-500", text: "text-blue-500" },
    { name: "Azure", class: "bg-sky-500", text: "text-sky-500" },
    { name: "Indigo", class: "bg-indigo-500", text: "text-indigo-500" },
    { name: "Purple", class: "bg-purple-500", text: "text-purple-500" },
    { name: "Pink", class: "bg-pink-500", text: "text-pink-500" },
    { name: "Red", class: "bg-red-500", text: "text-red-500" },
    { name: "Orange", class: "bg-orange-500", text: "text-orange-500" },
    { name: "Yellow", class: "bg-amber-400", text: "text-amber-400" },
    { name: "Lime", class: "bg-lime-500", text: "text-lime-500" },
    { name: "Green", class: "bg-emerald-500", text: "text-emerald-500" },
    { name: "Teal", class: "bg-teal-500", text: "text-teal-500" },
    { name: "Cyan", class: "bg-cyan-500", text: "text-cyan-500" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            <span>Tabler UI</span>
            <span>•</span>
            <span className="text-primary font-bold">Data Visualization</span>
            <span>•</span>
            <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">
              1:1 Official Replica (18 Cards)
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Legend</h1>
          <p className="text-muted-foreground text-sm mt-1 max-w-3xl">
            Legendas para séries de dados em gráficos, barras de progresso e estatísticas. Inclui gráficos interativos com toggle de séries, gráfico Donut, layouts divididos, estados de hover e filtros.
            Réplica 100% fiel de <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">https://preview.tabler.io/legend.html</code>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://preview.tabler.io/legend.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border border-border bg-card hover:bg-muted transition-colors text-muted-foreground hover:text-foreground shadow-xs"
          >
            <span>Ver Oficial Tabler</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Grid of all 18 Tabler Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* 1. Basic */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold">Basic</CardTitle>
              <CardDescription className="text-xs">
                A <code>Legend</code> is a marker and a label. Set the series color with <code>color</code>.
              </CardDescription>
            </div>
            <button
              onClick={() => handleCopy('<span class="legend legend-primary"><span class="legend-dot"></span> Primary</span>', 'c1')}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === 'c1' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-wrap gap-4 text-xs font-medium">
              <span className="inline-flex items-center gap-2 text-foreground">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
                Primary
              </span>
              <span className="inline-flex items-center gap-2 text-foreground">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500 shrink-0" />
                Azure
              </span>
              <span className="inline-flex items-center gap-2 text-foreground">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                Green
              </span>
              <span className="inline-flex items-center gap-2 text-foreground">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
                Yellow
              </span>
            </div>
          </CardContent>
        </Card>

        {/* 2. With values */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold">With values</CardTitle>
              <CardDescription className="text-xs">
                Add <code>value</code> to show a number next to the label.
              </CardDescription>
            </div>
            <button
              onClick={() => handleCopy('<span class="legend legend-blue"><span class="legend-dot"></span> Blue <span class="legend-value">1,248</span></span>', 'c2')}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === 'c2' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-wrap gap-4 text-xs">
              <span className="inline-flex items-center gap-2 font-medium text-foreground">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
                <span>Blue</span>
                <span className="font-bold text-muted-foreground ml-1">1,248</span>
              </span>
              <span className="inline-flex items-center gap-2 font-medium text-foreground">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500 shrink-0" />
                <span>Azure</span>
                <span className="font-bold text-muted-foreground ml-1">894</span>
              </span>
              <span className="inline-flex items-center gap-2 font-medium text-foreground">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <span>Green</span>
                <span className="font-bold text-muted-foreground ml-1">630</span>
              </span>
              <span className="inline-flex items-center gap-2 font-medium text-foreground">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
                <span>Yellow</span>
                <span className="font-bold text-muted-foreground ml-1">241</span>
              </span>
            </div>
          </CardContent>
        </Card>

        {/* 3. States */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold">States</CardTitle>
              <CardDescription className="text-xs">
                Links and buttons get a tinted background on hover. Use <code>active</code> to keep it and <code>off</code> for a hidden series.
              </CardDescription>
            </div>
            <button
              onClick={() => handleCopy('<button class="legend legend-primary active">...</button>', 'c3')}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === 'c3' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-wrap gap-2 text-xs">
              <button
                type="button"
                onClick={() => setActiveState("normal")}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
                  activeState === "normal"
                    ? "bg-blue-500/15 text-blue-700 dark:text-blue-300 font-bold"
                    : "hover:bg-muted text-foreground"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                Normal
              </button>
              <button
                type="button"
                onClick={() => setActiveState("active")}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
                  activeState === "active"
                    ? "bg-blue-500/15 text-blue-700 dark:text-blue-300 font-bold"
                    : "hover:bg-muted text-foreground"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                Active
              </button>
              <button
                type="button"
                onClick={() => setOffState(!offState)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
                  offState
                    ? "opacity-40 line-through text-muted-foreground"
                    : "hover:bg-muted text-foreground"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${offState ? "bg-muted-foreground" : "bg-blue-600"}`} />
                Off
              </button>
            </div>
          </CardContent>
        </Card>

        {/* 4. Colors */}
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold">Colors</CardTitle>
              <CardDescription className="text-xs">
                Every palette color works with <code>legend-{`{color}`}</code>.
              </CardDescription>
            </div>
            <button
              onClick={() => handleCopy('<span class="legend legend-blue"><span class="legend-dot"></span> Blue</span>', 'c4')}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === 'c4' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 text-xs">
              {tablerPalette.map((col) => (
                <span key={col.name} className="inline-flex items-center gap-2 text-foreground font-medium">
                  <span className={`w-2.5 h-2.5 rounded-full ${col.class} shrink-0`} />
                  <span>{col.name}</span>
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 5. Vertical */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold">Vertical</CardTitle>
              <CardDescription className="text-xs">
                Add <code>vertical</code> to the list to stack the items.
              </CardDescription>
            </div>
            <button
              onClick={() => handleCopy('<div class="legend-list legend-list-vertical">...</div>', 'c5')}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === 'c5' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-col space-y-2.5 text-xs">
              <span className="inline-flex items-center gap-2 text-foreground font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                Azure
              </span>
              <span className="inline-flex items-center gap-2 text-foreground font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                Indigo
              </span>
              <span className="inline-flex items-center gap-2 text-foreground font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                Purple
              </span>
            </div>
          </CardContent>
        </Card>

        {/* 6. Marker only */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold">Marker only</CardTitle>
              <CardDescription className="text-xs">
                Use a bare <code>legend-dot</code> when the label lives elsewhere.
              </CardDescription>
            </div>
            <button
              onClick={() => handleCopy('<span class="legend-dot legend-blue"></span>', 'c6')}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === 'c6' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-blue-600" title="Blue" />
              <span className="w-3 h-3 rounded-full bg-sky-500" title="Azure" />
              <span className="w-3 h-3 rounded-full bg-indigo-500" title="Indigo" />
              <span className="w-3 h-3 rounded-full bg-purple-500" title="Purple" />
              <span className="w-3 h-3 rounded-full bg-pink-500" title="Pink" />
              <span className="w-3 h-3 rounded-full bg-red-500" title="Red" />
              <span className="w-3 h-3 rounded-full bg-amber-400" title="Yellow" />
              <span className="w-3 h-3 rounded-full bg-emerald-500" title="Green" />
            </div>
          </CardContent>
        </Card>

        {/* 7. Large */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold">Large</CardTitle>
              <CardDescription className="text-xs">
                Set <code>size="lg"</code> to put a big value under the label. Add <code>unit</code> and <code>divided</code>.
              </CardDescription>
            </div>
            <button
              onClick={() => handleCopy('<div class="legend-list legend-list-divided">...</div>', 'c7')}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === 'c7' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-2 gap-3 text-xs divide-x divide-border">
              <div className="pr-2">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span>Requests</span>
                </div>
                <div className="text-xl font-bold text-foreground mt-1">
                  34.1<span className="text-xs font-normal text-muted-foreground ml-0.5">k</span>
                </div>
              </div>

              <div className="pl-3">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                  <span>Latency</span>
                </div>
                <div className="text-xl font-bold text-foreground mt-1">
                  1.4<span className="text-xs font-normal text-muted-foreground ml-0.5">ms</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 8. Under a stat */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold">Under a stat</CardTitle>
              <CardDescription className="text-xs">
                A legend row explains the split behind a single number.
              </CardDescription>
            </div>
            <button
              onClick={() => handleCopy('<div class="subheader">Requests</div>\n<div class="h1 mb-3">341.0k</div>', 'c8')}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === 'c8' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Requests</div>
            <div className="text-2xl font-extrabold text-foreground mb-3">341.0k</div>

            {/* Segmented bar */}
            <div className="w-full h-2 rounded-full flex overflow-hidden mb-3 bg-muted">
              <div className="h-full bg-emerald-500" style={{ width: "84%" }} title="2xx: 84%" />
              <div className="h-full bg-sky-500" style={{ width: "10%" }} title="3xx: 10%" />
              <div className="h-full bg-amber-400" style={{ width: "5%" }} title="4xx: 5%" />
              <div className="h-full bg-red-500" style={{ width: "1%" }} title="5xx: 1%" />
            </div>

            {/* Legends */}
            <div className="flex flex-wrap gap-3 text-[11px] font-medium">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>2xx (84%)</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-500" />
                <span>3xx (10%)</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>4xx (5%)</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span>5xx (1%)</span>
              </span>
            </div>
          </CardContent>
        </Card>

        {/* 9. Above a chart (Multi-line SVG Chart) */}
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                <span>Above a chart</span>
              </CardTitle>
              <CardDescription className="text-xs">
                Large items show the latest value of each series, so the chart needs no legend of its own.
              </CardDescription>
            </div>
            <button
              onClick={() => handleCopy('<div id="chart-legend-latency">...</div>', 'c9')}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === 'c9' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </CardHeader>
          <CardContent className="pt-2 space-y-4">
            {/* Large Top Legend Values */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-2 border-b border-border">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span>p50</span>
                </div>
                <div className="text-lg font-bold text-foreground">
                  1.2 <span className="text-xs font-normal text-muted-foreground">ms</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                  <span>p90</span>
                </div>
                <div className="text-lg font-bold text-foreground">
                  3.8 <span className="text-xs font-normal text-muted-foreground">ms</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>p99</span>
                </div>
                <div className="text-lg font-bold text-foreground">
                  7.4 <span className="text-xs font-normal text-muted-foreground">ms</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>p99.9</span>
                </div>
                <div className="text-lg font-bold text-foreground">
                  14.1 <span className="text-xs font-normal text-muted-foreground">ms</span>
                </div>
              </div>
            </div>

            {/* SVG Interactive Chart */}
            <div className="w-full h-44 relative bg-muted/20 rounded-lg p-2 border border-border/50">
              <svg className="w-full h-full" viewBox="0 0 500 140" preserveAspectRatio="none">
                {/* Gridlines */}
                <line x1="0" y1="35" x2="500" y2="35" stroke="currentColor" strokeDasharray="3 3" className="text-border" />
                <line x1="0" y1="70" x2="500" y2="70" stroke="currentColor" strokeDasharray="3 3" className="text-border" />
                <line x1="0" y1="105" x2="500" y2="105" stroke="currentColor" strokeDasharray="3 3" className="text-border" />

                {/* Curve p99.9 (Yellow) */}
                <path
                  d="M 0,30 Q 80,25 150,45 T 300,35 T 450,20 T 500,25"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="2"
                />

                {/* Curve p99 (Green) */}
                <path
                  d="M 0,60 Q 90,65 170,55 T 310,70 T 420,50 T 500,55"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                />

                {/* Curve p90 (Sky) */}
                <path
                  d="M 0,85 Q 100,90 200,80 T 350,95 T 500,85"
                  fill="none"
                  stroke="#0ea5e9"
                  strokeWidth="2"
                />

                {/* Curve p50 (Blue) with area gradient */}
                <path
                  d="M 0,110 Q 120,115 220,105 T 380,115 T 500,110 L 500,140 L 0,140 Z"
                  fill="rgba(37, 99, 235, 0.12)"
                />
                <path
                  d="M 0,110 Q 120,115 220,105 T 380,115 T 500,110"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2.5"
                />
              </svg>

              <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span>23:59</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 10. Large vertical */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold">Large vertical</CardTitle>
              <CardDescription className="text-xs">
                Combine <code>size="lg"</code> with a <code>vertical</code> list for a side panel.
              </CardDescription>
            </div>
            <button
              onClick={() => handleCopy('<div class="legend-list legend-list-vertical">...</div>', 'c10')}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === 'c10' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-3 divide-y divide-border text-xs">
              <div className="pt-2">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span>Visits</span>
                </div>
                <div className="text-lg font-bold text-foreground mt-0.5">14,290</div>
              </div>

              <div className="pt-2">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Conversion</span>
                </div>
                <div className="text-lg font-bold text-foreground mt-0.5">3.2%</div>
              </div>

              <div className="pt-2">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Bounce rate</span>
                </div>
                <div className="text-lg font-bold text-foreground mt-0.5">42.8%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 11. Large links */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold">Large links</CardTitle>
              <CardDescription className="text-xs">
                Large items work as links and buttons too. Mark the current one with <code>active</code> and hidden with <code>off</code>.
              </CardDescription>
            </div>
            <button
              onClick={() => handleCopy('<button class="legend legend-primary active">...</button>', 'c11')}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === 'c11' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="grid grid-cols-3 gap-2 text-xs">
              {(["desktop", "mobile", "tablet"] as const).map((key) => {
                const state = largeLinkStates[key];
                const label = key.charAt(0).toUpperCase() + key.slice(1);
                const val = key === "desktop" ? "68%" : key === "mobile" ? "24%" : "8%";
                const color = key === "desktop" ? "bg-blue-600" : key === "mobile" ? "bg-emerald-500" : "bg-purple-500";

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleLargeLink(key)}
                    className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                      state === "active"
                        ? "border-primary bg-primary/10 shadow-xs"
                        : state === "off"
                        ? "border-border opacity-40 line-through"
                        : "border-border hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <span className={`w-2 h-2 rounded-full ${color}`} />
                      <span>{label}</span>
                    </div>
                    <div className="font-bold text-foreground text-sm mt-1">{val}</div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* 12. With units */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold">With units</CardTitle>
              <CardDescription className="text-xs">
                Add <code>unit</code> to a regular item to show the unit after the value.
              </CardDescription>
            </div>
            <button
              onClick={() => handleCopy('<span class="legend legend-primary">Primary <span class="legend-value">12</span> <span class="legend-unit">ms</span></span>', 'c12')}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === 'c12' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-wrap gap-4 text-xs font-medium">
              <span className="inline-flex items-center gap-1.5 text-foreground">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <span>Primary</span>
                <span className="font-bold text-foreground ml-1">12</span>
                <span className="text-muted-foreground">ms</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-foreground">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                <span>Azure</span>
                <span className="font-bold text-foreground ml-1">480</span>
                <span className="text-muted-foreground">rpm</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-foreground">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Green</span>
                <span className="font-bold text-foreground ml-1">2.4</span>
                <span className="text-muted-foreground">GHz</span>
              </span>
            </div>
          </CardContent>
        </Card>

        {/* 13. Without lines */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold">Without lines</CardTitle>
              <CardDescription className="text-xs">
                Leave out <code>divided</code> when the items sit in a tight space.
              </CardDescription>
            </div>
            <button
              onClick={() => handleCopy('<div class="legend-list">...</div>', 'c13')}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === 'c13' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-wrap gap-6 text-xs">
              <div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span>CPU</span>
                </div>
                <div className="text-lg font-bold text-foreground mt-0.5">
                  42<span className="text-xs font-normal text-muted-foreground ml-0.5">%</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Memory</span>
                </div>
                <div className="text-lg font-bold text-foreground mt-0.5">
                  3.2<span className="text-xs font-normal text-muted-foreground ml-0.5">GB</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Disk</span>
                </div>
                <div className="text-lg font-bold text-foreground mt-0.5">
                  180<span className="text-xs font-normal text-muted-foreground ml-0.5">GB</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 14. Loading (Placeholder Skeleton) */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold">Loading</CardTitle>
              <CardDescription className="text-xs">
                Use <code>placeholder</code> blocks for the label and value while data loads.
              </CardDescription>
            </div>
            <button
              onClick={() => handleCopy('<div class="placeholder-glow">...</div>', 'c14')}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === 'c14' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-2 gap-4 animate-pulse">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-muted" />
                  <div className="h-3 w-16 bg-muted rounded" />
                </div>
                <div className="h-6 w-20 bg-muted rounded" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-muted" />
                  <div className="h-3 w-16 bg-muted rounded" />
                </div>
                <div className="h-6 w-16 bg-muted rounded" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 15. Interactive Legend (With Interactive Chart) */}
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-2">
            <div>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                <span>Interactive legend</span>
              </CardTitle>
              <CardDescription className="text-xs">
                Button items call <code>toggleSeries()</code> on the chart and toggle <code>legend-off</code>.
              </CardDescription>
            </div>

            {/* Interactive Toggle Buttons */}
            <div className="flex items-center gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => toggleChartSeries("visits")}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-semibold transition-all cursor-pointer ${
                  chartSeries.visits
                    ? "bg-amber-400/15 border-amber-400/40 text-amber-700 dark:text-amber-300"
                    : "opacity-40 line-through border-border text-muted-foreground"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                Total visits
              </button>

              <button
                type="button"
                onClick={() => toggleChartSeries("unique")}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-semibold transition-all cursor-pointer ${
                  chartSeries.unique
                    ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300"
                    : "opacity-40 line-through border-border text-muted-foreground"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Unique visitors
              </button>

              <button
                type="button"
                onClick={() => toggleChartSeries("pageviews")}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-semibold transition-all cursor-pointer ${
                  chartSeries.pageviews
                    ? "bg-blue-600/15 border-blue-600/40 text-blue-700 dark:text-blue-300"
                    : "opacity-40 line-through border-border text-muted-foreground"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                Pageviews
              </button>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            {/* SVG Chart reacting to toggles */}
            <div className="w-full h-44 relative bg-muted/20 rounded-lg p-3 border border-border/50">
              <svg className="w-full h-full" viewBox="0 0 500 130" preserveAspectRatio="none">
                {/* Horizontal Grid */}
                <line x1="0" y1="30" x2="500" y2="30" stroke="currentColor" strokeDasharray="3 3" className="text-border" />
                <line x1="0" y1="65" x2="500" y2="65" stroke="currentColor" strokeDasharray="3 3" className="text-border" />
                <line x1="0" y1="100" x2="500" y2="100" stroke="currentColor" strokeDasharray="3 3" className="text-border" />

                {/* Series 1: Total visits (Yellow) */}
                <path
                  d="M 0,20 Q 100,50 200,25 T 350,40 T 500,20"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="2.5"
                  className={`transition-opacity duration-300 ${chartSeries.visits ? "opacity-100" : "opacity-0"}`}
                />

                {/* Series 2: Unique visitors (Green) */}
                <path
                  d="M 0,60 Q 120,40 240,70 T 380,50 T 500,60"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  className={`transition-opacity duration-300 ${chartSeries.unique ? "opacity-100" : "opacity-0"}`}
                />

                {/* Series 3: Pageviews (Blue) */}
                <path
                  d="M 0,95 Q 110,80 230,105 T 390,90 T 500,85"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2.5"
                  className={`transition-opacity duration-300 ${chartSeries.pageviews ? "opacity-100" : "opacity-0"}`}
                />
              </svg>
            </div>
          </CardContent>
        </Card>

        {/* 16. Next to a donut (Donut Chart + Side Legend) */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <PieChart className="w-4 h-4 text-primary" />
                <span>Next to a donut</span>
              </CardTitle>
              <CardDescription className="text-xs">
                A vertical list beside a chart with its own legend hidden.
              </CardDescription>
            </div>
            <button
              onClick={() => handleCopy('<div id="chart-legend-donut">...</div>', 'c16')}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === 'c16' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="flex items-center gap-4">
              {/* Donut Chart SVG */}
              <div className="w-32 h-32 relative shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  {/* Azure: 44% (circumference ~ 251.2 => 110.5) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#0ea5e9"
                    strokeWidth="18"
                    strokeDasharray="110.5 251.2"
                    strokeDashoffset="0"
                    className={`transition-all duration-200 cursor-pointer ${hoveredDonutSlice === 0 ? "stroke-width-[22]" : ""}`}
                    onMouseEnter={() => setHoveredDonutSlice(0)}
                    onMouseLeave={() => setHoveredDonutSlice(null)}
                  />
                  {/* Primary Blue: 26% (65.3) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="18"
                    strokeDasharray="65.3 251.2"
                    strokeDashoffset="-110.5"
                    className={`transition-all duration-200 cursor-pointer ${hoveredDonutSlice === 1 ? "stroke-width-[22]" : ""}`}
                    onMouseEnter={() => setHoveredDonutSlice(1)}
                    onMouseLeave={() => setHoveredDonutSlice(null)}
                  />
                  {/* Purple: 15% (37.7) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="18"
                    strokeDasharray="37.7 251.2"
                    strokeDashoffset="-175.8"
                    className={`transition-all duration-200 cursor-pointer ${hoveredDonutSlice === 2 ? "stroke-width-[22]" : ""}`}
                    onMouseEnter={() => setHoveredDonutSlice(2)}
                    onMouseLeave={() => setHoveredDonutSlice(null)}
                  />
                  {/* Orange: 10% (25.1) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="18"
                    strokeDasharray="25.1 251.2"
                    strokeDashoffset="-213.5"
                    className={`transition-all duration-200 cursor-pointer ${hoveredDonutSlice === 3 ? "stroke-width-[22]" : ""}`}
                    onMouseEnter={() => setHoveredDonutSlice(3)}
                    onMouseLeave={() => setHoveredDonutSlice(null)}
                  />
                  {/* Green: 5% (12.6) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="18"
                    strokeDasharray="12.6 251.2"
                    strokeDashoffset="-238.6"
                    className={`transition-all duration-200 cursor-pointer ${hoveredDonutSlice === 4 ? "stroke-width-[22]" : ""}`}
                    onMouseEnter={() => setHoveredDonutSlice(4)}
                    onMouseLeave={() => setHoveredDonutSlice(null)}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xs font-bold text-foreground">100%</span>
                  <span className="text-[9px] text-muted-foreground">Total</span>
                </div>
              </div>

              {/* Vertical Side Legend */}
              <div className="flex flex-col space-y-1.5 text-xs flex-1">
                {[
                  { name: "Direct", val: "44%", color: "bg-sky-500", idx: 0 },
                  { name: "Search", val: "26%", color: "bg-blue-600", idx: 1 },
                  { name: "Social", val: "15%", color: "bg-purple-500", idx: 2 },
                  { name: "Referral", val: "10%", color: "bg-orange-500", idx: 3 },
                  { name: "Other", val: "5%", color: "bg-emerald-500", idx: 4 },
                ].map((item) => (
                  <div
                    key={item.name}
                    onMouseEnter={() => setHoveredDonutSlice(item.idx)}
                    onMouseLeave={() => setHoveredDonutSlice(null)}
                    className={`flex items-center justify-between p-1 rounded transition-colors cursor-pointer ${
                      hoveredDonutSlice === item.idx ? "bg-muted font-bold" : ""
                    }`}
                  >
                    <span className="inline-flex items-center gap-1.5 text-foreground">
                      <span className={`w-2 h-2 rounded-full ${item.color}`} />
                      <span>{item.name}</span>
                    </span>
                    <span className="font-semibold text-muted-foreground">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 17. With a progress bar */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-primary" />
                <span>With a progress bar</span>
              </CardTitle>
              <CardDescription className="text-xs">
                Label the segments of a <code>progress-separated</code> bar.
              </CardDescription>
            </div>
            <button
              onClick={() => handleCopy('<div class="progress progress-separated mb-3">...</div>', 'c17')}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === 'c17' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </CardHeader>
          <CardContent className="pt-2">
            <p className="text-xs text-foreground mb-2">
              Using <strong>5.7 GB</strong> of 8 GB
            </p>

            {/* Separated progress bar */}
            <div className="flex gap-1 h-3 rounded-full overflow-hidden mb-3 bg-muted p-0.5">
              <div className="h-full bg-blue-600 rounded-l-full" style={{ width: "38%" }} title="System: 3.1 GB" />
              <div className="h-full bg-sky-500" style={{ width: "22%" }} title="Apps: 1.8 GB" />
              <div className="h-full bg-emerald-500 rounded-r-full" style={{ width: "11%" }} title="Docs: 0.8 GB" />
            </div>

            {/* Legends with values and units */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 text-foreground">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span>System</span>
                <span className="font-bold ml-auto text-muted-foreground">3.1 GB</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-foreground">
                <span className="w-2 h-2 rounded-full bg-sky-500" />
                <span>Apps</span>
                <span className="font-bold ml-auto text-muted-foreground">1.8 GB</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-foreground">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Docs</span>
                <span className="font-bold ml-auto text-muted-foreground">0.8 GB</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-foreground">
                <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                <span>Free</span>
                <span className="font-bold ml-auto text-muted-foreground">2.3 GB</span>
              </span>
            </div>
          </CardContent>
        </Card>

        {/* 18. Filter links */}
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Filter className="w-4 h-4 text-primary" />
                <span>Filter links</span>
              </CardTitle>
              <CardDescription className="text-xs">
                Link items with <code>href</code> work as filters. Mark the current one with <code>active</code>.
              </CardDescription>
            </div>
            <button
              onClick={() => handleCopy('<div class="legend-list"><a href="#" class="legend active">...</a></div>', 'c18')}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === 'c18' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                { id: "all", label: "All leads", count: 142 },
                { id: "high", label: "High priority", count: 28, color: "bg-red-500" },
                { id: "medium", label: "Medium", count: 64, color: "bg-amber-400" },
                { id: "low", label: "Low priority", count: 50, color: "bg-emerald-500" },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActiveFilter(f.id)}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                    activeFilter === f.id
                      ? "border-primary bg-primary text-primary-foreground shadow-xs"
                      : "border-border hover:bg-muted text-foreground"
                  }`}
                >
                  {f.color && <span className={`w-2 h-2 rounded-full ${f.color}`} />}
                  <span>{f.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      activeFilter === f.id ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {f.count}
                  </span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
