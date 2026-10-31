"use client";

import React from "react";
import Link from "next/link";
import { Puzzle, ArrowRight, Sparkles, ExternalLink } from "lucide-react";
import { TABLER_PLUGINS_ITEMS } from "@/lib/tabler-plugins-data";

export default function PluginsHubPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card border border-border/70 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
                <Puzzle className="w-5 h-5" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">Tabler Plugins</h1>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
                Official Plugins Ecosystem
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
              Coleção de plugins e extensões avançadas do ecossistema Tabler (gráficos ApexCharts, mapas vetoriais, datepickers, dropzone, editores e utilitários interativos).
            </p>
          </div>

          <a
            href="https://preview.tabler.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Tabler Preview Oficial <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Grid de Plugins */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TABLER_PLUGINS_ITEMS.map((plugin) => (
          <Link
            key={plugin.slug}
            href={`/plugins/${plugin.slug}`}
            className="group bg-card border border-border/80 rounded-xl p-5 shadow-xs hover:shadow-md hover:border-purple-500/40 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/40">
                  Tabler Plugin
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                  /plugins/{plugin.slug}
                </span>
              </div>
              <h3 className="text-base font-bold text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {plugin.label}
              </h3>
              <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">
                {plugin.description || "Plugin oficial do Tabler pronto para demonstração e integração completa."}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-border/60 text-xs font-medium text-purple-600 dark:text-purple-400">
              <span>Explorar Plugin</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
