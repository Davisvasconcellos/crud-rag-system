"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  BarChart3,
  ExternalLink,
  Copy,
  Check,
  TrendingUp,
  Sliders,
  Sparkles,
  Layers,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import {
  ADVANCED_CARDS_LIST,
  TABLER_ADVANCED_CONFIGS,
  AdvancedCardMeta,
} from "./tabler-charts-advanced-data";

// ApexChart Wrapper Component for Advanced Charts
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

    import("apexcharts").then((mod) => {
      if (!isMounted || !containerRef.current) return;
      const ApexCharts = mod.default || mod;

      if (chartInstanceRef.current) {
        try {
          chartInstanceRef.current.destroy();
        } catch (e) {
          // ignore
        }
      }

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
    <div className="w-full relative" style={{ minHeight: `${height}px` }}>
      <div ref={containerRef} id={chartId} className="w-full" />
      {!loaded && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-muted/20 animate-pulse rounded-lg"
          style={{ height: `${height}px` }}
        >
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-3.5 h-3.5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            Carregando gráfico avançado...
          </div>
        </div>
      )}
    </div>
  );
}

export function TablerChartsAdvanced() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopyCard = (card: AdvancedCardMeta) => {
    const configsToCopy = card.charts.map((c) => ({
      chartId: c.id,
      config: TABLER_ADVANCED_CONFIGS[c.id],
    }));
    navigator.clipboard.writeText(JSON.stringify(configsToCopy, null, 2));
    setCopiedKey(card.id);
    toast.success(`Configurações de "${card.title}" copiadas!`);
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
                <TrendingUp className="w-5 h-5" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Charts Advanced
              </h1>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                ApexCharts Multi-Axis & Synced
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-2 max-w-3xl">
              Visualizações analíticas avançadas: escalas duplas com múltiplos eixos Y, linhas de anotação de threshold (SLA), marcadores temporais de releases, brush de zoom interativo e gráficos triplos sincronizados com crosshair simultâneo.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://preview.tabler.io/charts-advanced.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-border hover:bg-muted text-foreground transition-colors"
            >
              Preview Oficial Tabler <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
            </a>
          </div>
        </div>
      </div>

      {/* Grid of All 5 Advanced Cards */}
      <div className="space-y-6">
        {ADVANCED_CARDS_LIST.map((card) => (
          <div
            key={card.id}
            className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden"
          >
            {/* Card Header */}
            <div className="p-5 border-b border-border/60 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-foreground">
                  {card.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {card.description}
                </p>
              </div>

              <button
                onClick={() => handleCopyCard(card)}
                className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex items-center gap-1 text-xs shrink-0"
                title="Copiar configuração"
              >
                {copiedKey === card.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-medium">Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Opções</span>
                  </>
                )}
              </button>
            </div>

            {/* Card Body with paired / multiple charts */}
            <div className="p-5 space-y-4">
              {card.charts.map((subChart, idx) => {
                const config = TABLER_ADVANCED_CONFIGS[subChart.id];

                return (
                  <div key={subChart.id} className="relative">
                    {idx > 0 && (
                      <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-muted-foreground mb-1">
                        {card.id === "brush-and-zoom" ? "Navegador de Brush (Arraste para Zoom)" : `Série Sincronizada ${idx + 1}`}
                      </div>
                    )}
                    {config ? (
                      <ApexChartBox
                        chartId={subChart.id}
                        config={config}
                        height={subChart.height}
                      />
                    ) : (
                      <div
                        className="w-full flex items-center justify-center border border-dashed border-border rounded-lg text-xs text-muted-foreground"
                        style={{ height: `${subChart.height}px` }}
                      >
                        Configuração em carregamento...
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
