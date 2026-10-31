"use client";

import React, { useState } from "react";
import {
  MapPin,
  Search,
  Layers,
  ZoomIn,
  ZoomOut,
  Navigation,
  Compass,
  Maximize2,
  ExternalLink,
  Sparkles,
  Phone,
  Clock,
  Star,
  Share2,
  Crosshair,
  Map,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function TablerMapFullsize() {
  const [zoom, setZoom] = useState(12);
  const [activeLayer, setActiveLayer] = useState<"standard" | "streets" | "dark">("standard");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDetailOpen, setIsDetailOpen] = useState(true);

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card border border-border/70 rounded-xl p-5 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-foreground">Map Fullsize Plugin</h1>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
              Immersive View
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Exibição de mapa em tela cheia (full-width e flex-fill) com coordenadas de Berlim (13.4049, 52.5188), controles flutuantes de busca, camada, bússola e card de informações.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://preview.tabler.io/map-fullsize.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-xs"
          >
            Preview Tabler
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Fullsize Map Container */}
      <div className="relative w-full h-[620px] rounded-2xl border border-border/80 overflow-hidden shadow-md bg-slate-900">
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=13.35,52.48,13.46,52.55&layer=mapnik&marker=52.518827,13.4049"
          title="Full size map of Berlin"
          className="w-full h-full border-0 filter contrast-105"
        />

        {/* Floating Search Bar */}
        <div className="absolute top-4 left-4 z-10 w-full max-w-sm">
          <div className="relative shadow-lg">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar bairros, avenidas ou CEP..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border/80 bg-background/95 backdrop-blur-md text-xs text-foreground placeholder:text-muted-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Floating Layer Controls (Top Right) */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-background/95 backdrop-blur-md border border-border p-1 rounded-xl shadow-lg text-xs">
          <button
            onClick={() => {
              setActiveLayer("standard");
              toast.info("Camada Padrão ativa");
            }}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeLayer === "standard"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Standard
          </button>
          <button
            onClick={() => {
              setActiveLayer("streets");
              toast.info("Camada Ruas e Trânsito ativa");
            }}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeLayer === "streets"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Streets
          </button>
          <button
            onClick={() => {
              setActiveLayer("dark");
              toast.info("Camada Dark Mode ativa");
            }}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeLayer === "dark"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Dark
          </button>
        </div>

        {/* Floating Zoom & Orientation Controls (Right Middle) */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-1.5 bg-background/95 backdrop-blur-md border border-border p-1 rounded-xl shadow-lg">
          <button
            onClick={() => {
              setZoom((z) => Math.min(18, z + 1));
              toast.info(`Zoom: ${zoom + 1}`);
            }}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setZoom((z) => Math.max(2, z - 1));
              toast.info(`Zoom: ${zoom - 1}`);
            }}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <div className="w-full h-px bg-border my-0.5" />
          <button
            onClick={() => toast.info("Orientação para o Norte (0°)")}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            title="Norte"
          >
            <Compass className="w-4 h-4 text-blue-600" />
          </button>
          <button
            onClick={() => toast.success("Localização atual identificada!")}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            title="Minha Localização"
          >
            <Crosshair className="w-4 h-4 text-emerald-600" />
          </button>
        </div>

        {/* Floating Location Card (Bottom Left) */}
        {isDetailOpen && (
          <div className="absolute bottom-4 left-4 z-10 w-80 bg-background/95 backdrop-blur-md border border-border rounded-2xl p-4 shadow-xl space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">
                  Ponto de Interesse
                </span>
                <h3 className="text-sm font-bold text-foreground mt-1">Mitte District, Berlin</h3>
                <p className="text-[11px] text-muted-foreground">Alexanderplatz & Unter den Linden</p>
              </div>
              <button
                onClick={() => setIsDetailOpen(false)}
                className="text-xs text-muted-foreground hover:text-foreground p-1"
              >
                ×
              </button>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1 border-t border-border/50">
              <span className="flex items-center gap-1 font-semibold text-amber-500">
                <Star className="w-3.5 h-3.5 fill-current" />
                4.8 (1.2k avaliações)
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Aberto agora
              </span>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <Button size="sm" className="text-xs h-8 flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                Como Chegar
              </Button>
              <Button size="sm" variant="outline" className="text-xs h-8">
                <Share2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        )}

        {!isDetailOpen && (
          <Button
            size="sm"
            onClick={() => setIsDetailOpen(true)}
            className="absolute bottom-4 left-4 z-10 text-xs shadow-lg bg-background/95 text-foreground hover:bg-background border border-border"
          >
            <MapPin className="w-3.5 h-3.5 mr-1 text-blue-600" />
            Exibir Detalhes de Berlim
          </Button>
        )}
      </div>
    </div>
  );
}
