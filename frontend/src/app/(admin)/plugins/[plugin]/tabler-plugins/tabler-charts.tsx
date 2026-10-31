"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  BarChart3,
  ExternalLink,
  Copy,
  Check,
  ChevronDown,
  Layers,
  Sparkles,
  RefreshCw,
  SlidersHorizontal,
} from "lucide-react";
import { toast } from "sonner";
import {
  CHART_CARDS_LIST,
  TABLER_CHART_CONFIGS,
  ChartCardMeta,
} from "./tabler-charts-data";

// ApexChart Wrapper Component
interface ApexChartBoxProps {
  chartId: string;
  config: any;
  height: number;
}

function ApexChartBox({ chartId, config, height }: ApexChartBoxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<any>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // Load apexcharts dynamically on the client
    import("apexcharts").then((mod) => {
      if (!isMounted || !containerRef.current) return;
      const ApexCharts = mod.default || mod;

      // Clean up any existing chart
      if (chartInstanceRef.current) {
        try {
          chartInstanceRef.current.destroy();
        } catch (e) {
          // ignore
        }
      }

      // Merge config with container height & animations
      const chartOptions = {
        ...config,
        chart: {
          ...config.chart,
          height,
          toolbar: { show: false },
          animations: { enabled: true, easing: "easeinout", speed: 500 },
        },
      };

      try {
        const chart = new ApexCharts(containerRef.current, chartOptions);
        chartInstanceRef.current = chart;
        chart.render().then(() => {
          if (isMounted) setLoaded(true);
        });
      } catch (err) {
        console.error(`Failed to render ApexChart [${chartId}]:`, err);
      }
    });

    return () => {
      isMounted = false;
      if (chartInstanceRef.current) {
        try {
          chartInstanceRef.current.destroy();
        } catch (e) {
          // ignore
        }
      }
    };
  }, [chartId, config, height]);

  return (
    <div className="w-full relative min-h-[200px]" style={{ minHeight: `${height}px` }}>
      <div ref={containerRef} id={chartId} className="w-full" />
      {!loaded && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-muted/20 animate-pulse rounded-lg"
          style={{ height: `${height}px` }}
        >
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-3.5 h-3.5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            Carregando gráfico...
          </div>
        </div>
      )}
    </div>
  );
}

export function TablerCharts() {
  const [activeCategory, setActiveCategory] = useState<
    "All" | "Overview" | "Lines" | "Areas" | "Bars" | "Specialized"
  >("All");
  const [activeUsersTimeframe, setActiveUsersTimeframe] = useState("Last 7 days");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const filteredCards =
    activeCategory === "All"
      ? CHART_CARDS_LIST
      : CHART_CARDS_LIST.filter((c) => c.category === activeCategory);

  const handleCopyConfig = (card: ChartCardMeta) => {
    const cfg = TABLER_CHART_CONFIGS[card.chartId] || {};
    navigator.clipboard.writeText(JSON.stringify(cfg, null, 2));
    setCopiedKey(card.id);
    toast.success(`Configuração ApexCharts de "${card.title}" copiada!`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Tabler Header */}
      <div className="bg-card border border-border/70 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">Charts</h1>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                ApexCharts Plugin (36 Gráficos)
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-2 max-w-3xl">
              Replicação integral dos 36 gráficos oficiais do Tabler com suporte completo a linhas, áreas, colunas agrupadas e empilhadas, rosca, funil, radar, dispersão, linha do tempo, treemap e box plot.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://preview.tabler.io/charts.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-border hover:bg-muted text-foreground transition-colors"
            >
              Preview Oficial Tabler <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
            </a>
          </div>
        </div>

        {/* Filter categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-5 mt-5 border-t border-border/60 pb-1">
          {(["All", "Overview", "Lines", "Areas", "Bars", "Specialized"] as const).map(
            (cat) => {
              const count =
                cat === "All"
                  ? CHART_CARDS_LIST.length
                  : CHART_CARDS_LIST.filter((c) => c.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors shrink-0 ${
                    activeCategory === cat
                      ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* Grid of All 36 Official Cards */}
      <div className="grid grid-cols-12 gap-4">
        {filteredCards.map((card) => {
          const config = TABLER_CHART_CONFIGS[card.chartId];

          return (
            <div
              key={card.id}
              className={`${card.colSpan} bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden flex flex-col justify-between`}
            >
              {/* Card Header */}
              <div className="p-4 sm:p-5 border-b border-border/60 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <h3 className="text-base font-bold text-foreground truncate">
                    {card.title}
                  </h3>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground shrink-0">
                    {card.category}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Dropdown for Active users */}
                  {card.hasDropdown && (
                    <div className="relative">
                      <select
                        value={activeUsersTimeframe}
                        onChange={(e) => setActiveUsersTimeframe(e.target.value)}
                        className="text-xs bg-muted/50 border border-border/80 rounded-lg px-2 py-1 text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                      >
                        <option value="Last 7 days">Last 7 days</option>
                        <option value="Last 30 days">Last 30 days</option>
                        <option value="Last 3 months">Last 3 months</option>
                      </select>
                    </div>
                  )}

                  {/* Copy config button */}
                  <button
                    onClick={() => handleCopyConfig(card)}
                    className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    title="Copiar configuração ApexCharts"
                  >
                    {copiedKey === card.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                {/* Special stats bar for Active Users */}
                {card.stats && (
                  <div className="grid grid-cols-3 gap-2 pb-2 border-b border-border/60">
                    {card.stats.map((s, idx) => (
                      <div key={idx} className="text-center sm:text-left">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <span className={`w-2 h-2 rounded-full ${s.color}`} />
                          {s.label}
                        </div>
                        <div className="text-lg font-bold text-foreground mt-0.5">
                          {s.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Special legend buttons for Chart with legend */}
                {card.legends && (
                  <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-border/60">
                    {card.legends.map((l, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-border/80 bg-muted/30 text-xs font-medium"
                      >
                        <span className="font-semibold text-foreground">{l.label}:</span>
                        <span className={`font-bold ${l.color}`}>{l.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* ApexChart Container */}
                {config ? (
                  <ApexChartBox
                    chartId={card.chartId}
                    config={config}
                    height={card.height}
                  />
                ) : (
                  <div
                    className="w-full flex items-center justify-center border border-dashed border-border rounded-lg text-xs text-muted-foreground"
                    style={{ height: `${card.height}px` }}
                  >
                    Configuração em carregamento...
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
