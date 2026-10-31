"use client";

import React, { useState } from "react";
import {
  Globe,
  MapPin,
  Compass,
  Layers,
  ZoomIn,
  ZoomOut,
  ExternalLink,
  Sparkles,
  Share2,
  Users,
  CheckCircle2,
  Activity,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface CountryStat {
  code: string;
  name: string;
  users: number;
  percentage: number;
  color: string;
}

const COUNTRY_DATA: CountryStat[] = [
  { code: "US", name: "United States", users: 14250, percentage: 38, color: "bg-blue-600" },
  { code: "BR", name: "Brazil", users: 8900, percentage: 24, color: "bg-emerald-600" },
  { code: "DE", name: "Germany", users: 5400, percentage: 15, color: "bg-amber-600" },
  { code: "UK", name: "United Kingdom", users: 4300, percentage: 12, color: "bg-purple-600" },
  { code: "JP", name: "Japan", users: 2800, percentage: 7, color: "bg-rose-600" },
  { code: "OTHER", name: "Other Countries", users: 1500, percentage: 4, color: "bg-slate-400" },
];

export function TablerMapsVector() {
  const [selectedCountry, setSelectedCountry] = useState<string>("BR");
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card border border-border/70 rounded-xl p-5 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-foreground">Map Vector Plugin</h1>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
              jsVectorMap
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Renderização vetorial SVG de mapas globais com escala de cores (choropleth), linhas de conexão entre hubs mundiais, marcadores dinâmicos e seleção de países.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://preview.tabler.io/maps-vector.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-xs"
          >
            Preview Tabler
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Grid of Vector Map Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: World map */}
        <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border/70">
            <h3 className="text-sm font-bold text-foreground">World map</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Standard vector map with smooth SVG paths and theme-aware contrast.
            </p>
          </div>
          <div className="p-4 flex-1 flex items-center justify-center bg-slate-950 min-h-[220px] relative overflow-hidden">
            <svg viewBox="0 0 1000 500" className="w-full h-auto opacity-70">
              {/* Simplified world map shapes */}
              <path
                d="M150,120 Q200,80 300,100 T400,150 T280,240 T180,200 Z"
                fill="#3b82f6"
                opacity="0.6"
              />
              <path
                d="M250,280 Q300,260 330,320 T280,450 T240,360 Z"
                fill="#10b981"
                opacity="0.6"
              />
              <path
                d="M480,100 Q550,70 650,90 T620,180 T500,160 Z"
                fill="#8b5cf6"
                opacity="0.6"
              />
              <path
                d="M500,200 Q560,180 600,260 T540,400 T480,280 Z"
                fill="#f59e0b"
                opacity="0.6"
              />
              <path
                d="M680,100 Q850,60 920,140 T850,260 T700,200 Z"
                fill="#ec4899"
                opacity="0.6"
              />
              <path
                d="M780,320 Q860,300 890,380 T800,420 Z"
                fill="#06b6d4"
                opacity="0.6"
              />
            </svg>
            <div className="absolute bottom-3 right-3 text-[10px] text-muted-foreground font-mono">
              Mercator SVG Projection
            </div>
          </div>
        </div>

        {/* Card 2: Map with markers */}
        <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border/70">
            <h3 className="text-sm font-bold text-foreground">Map with markers</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Highlight key server locations or branch offices with pulsing pins.
            </p>
          </div>
          <div className="p-4 flex-1 flex items-center justify-center bg-slate-950 min-h-[220px] relative overflow-hidden">
            <svg viewBox="0 0 1000 500" className="w-full h-auto opacity-40">
              <rect width="1000" height="500" fill="#090d16" />
              <path
                d="M150,120 Q200,80 300,100 T400,150 T280,240 T180,200 Z"
                fill="#1e293b"
              />
              <path
                d="M250,280 Q300,260 330,320 T280,450 T240,360 Z"
                fill="#1e293b"
              />
              <path
                d="M480,100 Q550,70 650,90 T620,180 T500,160 Z"
                fill="#1e293b"
              />
              <path
                d="M500,200 Q560,180 600,260 T540,400 T480,280 Z"
                fill="#1e293b"
              />
              <path
                d="M680,100 Q850,60 920,140 T850,260 T700,200 Z"
                fill="#1e293b"
              />
            </svg>

            {/* Marker 1: New York */}
            <div className="absolute top-[32%] left-[26%] flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-500 animate-ping absolute" />
              <span className="w-3 h-3 rounded-full bg-blue-600 border border-white shadow-xs relative" />
              <span className="text-[10px] font-bold text-white bg-black/70 px-1.5 py-0.5 rounded backdrop-blur-xs">
                New York (1,580)
              </span>
            </div>

            {/* Marker 2: London */}
            <div className="absolute top-[28%] left-[51%] flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping absolute" />
              <span className="w-3 h-3 rounded-full bg-emerald-600 border border-white shadow-xs relative" />
              <span className="text-[10px] font-bold text-white bg-black/70 px-1.5 py-0.5 rounded backdrop-blur-xs">
                London (1,240)
              </span>
            </div>

            {/* Marker 3: São Paulo */}
            <div className="absolute top-[68%] left-[32%] flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-500 animate-ping absolute" />
              <span className="w-3 h-3 rounded-full bg-amber-600 border border-white shadow-xs relative" />
              <span className="text-[10px] font-bold text-white bg-black/70 px-1.5 py-0.5 rounded backdrop-blur-xs">
                São Paulo (1,120)
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Map with markers and lines */}
        <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border/70">
            <h3 className="text-sm font-bold text-foreground">Map with markers and lines</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Connect international data centers and transit routes with curved arcs.
            </p>
          </div>
          <div className="p-4 flex-1 flex items-center justify-center bg-slate-950 min-h-[220px] relative overflow-hidden">
            <svg viewBox="0 0 1000 500" className="w-full h-auto">
              {/* World outline */}
              <rect width="1000" height="500" fill="#090d16" />
              {/* Connecting Arcs */}
              <path
                d="M 260 160 Q 380 90 510 140"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="animate-pulse"
              />
              <path
                d="M 510 140 Q 660 80 820 180"
                fill="none"
                stroke="#a855f7"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="animate-pulse"
              />
              <path
                d="M 260 160 Q 290 260 320 340"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="animate-pulse"
              />

              {/* Hub Dots */}
              <circle cx="260" cy="160" r="5" fill="#38bdf8" />
              <circle cx="510" cy="140" r="5" fill="#a855f7" />
              <circle cx="820" cy="180" r="5" fill="#ec4899" />
              <circle cx="320" cy="340" r="5" fill="#10b981" />
            </svg>
            <div className="absolute top-3 left-3 text-[10px] text-cyan-400 font-mono flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              Global Backbone Fiber Sync
            </div>
          </div>
        </div>

        {/* Card 4: Map with a color scale & Selection */}
        <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border/70 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-foreground">Map with a color scale</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Choropleth color gradient reflecting user density per nation.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">
              Total: 37,150
            </span>
          </div>

          <div className="p-4 flex-1 space-y-3">
            <div className="space-y-2">
              {COUNTRY_DATA.map((c) => (
                <div
                  key={c.code}
                  onClick={() => {
                    setSelectedCountry(c.code);
                    toast.info(`Selecionado: ${c.name} (${c.users.toLocaleString()} usuários)`);
                  }}
                  className={`p-2 rounded-lg border cursor-pointer transition-colors flex items-center justify-between text-xs ${
                    selectedCountry === c.code
                      ? "border-blue-500 bg-blue-50/70 dark:bg-blue-950/40"
                      : "border-border/60 hover:bg-muted/40"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[11px] text-muted-foreground w-6">
                      {c.code}
                    </span>
                    <span className="font-semibold text-foreground">{c.name}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-muted-foreground">
                      {c.users.toLocaleString()}
                    </span>
                    <div className="w-16 bg-muted rounded-full h-1.5 overflow-hidden">
                      <div className={`${c.color} h-full rounded-full`} style={{ width: `${c.percentage}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
