"use client";

import React, { useState } from "react";
import {
  Sliders,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  Pipette,
  RefreshCw,
  Eye,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface ColorItem {
  id: string;
  name: string;
  defaultHex: string;
}

const INITIAL_COLORS: ColorItem[] = [
  { id: "colorpicker-1", name: "Blue", defaultHex: "#066fd1" },
  { id: "colorpicker-2", name: "Azure", defaultHex: "#4299e1" },
  { id: "colorpicker-3", name: "Indigo", defaultHex: "#4263eb" },
  { id: "colorpicker-4", name: "Purple", defaultHex: "#ae3ec9" },
  { id: "colorpicker-5", name: "Pink", defaultHex: "#d6336c" },
  { id: "colorpicker-6", name: "Red", defaultHex: "#d63939" },
  { id: "colorpicker-7", name: "Orange", defaultHex: "#f76707" },
  { id: "colorpicker-8", name: "Yellow", defaultHex: "#f59f00" },
  { id: "colorpicker-9", name: "Lime", defaultHex: "#74b816" },
  { id: "colorpicker-10", name: "Green", defaultHex: "#2fb344" },
  { id: "colorpicker-11", name: "Teal", defaultHex: "#0ca678" },
  { id: "colorpicker-12", name: "Cyan", defaultHex: "#17a2b8" },
];

export function TablerColorpicker() {
  const [colors, setColors] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    INITIAL_COLORS.forEach((c) => {
      map[c.id] = c.defaultHex;
    });
    return map;
  });

  const [activeColorId, setActiveColorId] = useState<string>("colorpicker-1");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleColorChange = (id: string, newHex: string) => {
    setColors((prev) => ({ ...prev, [id]: newHex }));
  };

  const handleCopyHex = (id: string, hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedId(id);
    toast.success(`Código de cor "${hex}" copiado!`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const activeHex = colors[activeColorId] || "#066fd1";
  const activeItem = INITIAL_COLORS.find((c) => c.id === activeColorId);

  return (
    <div className="space-y-6">
      {/* Top Banner / Tabler Header */}
      <div className="bg-card border border-border/70 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
                <Sliders className="w-5 h-5" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Color picker
              </h1>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
                Coloris Plugin
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-2 max-w-3xl">
              Seletor interativo de cores com amostradores (swatches), suporte a canais de cores, códigos hexadecimais em tempo real e visualização de impacto em componentes do tema.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://preview.tabler.io/colorpicker.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-border hover:bg-muted text-foreground transition-colors"
            >
              Preview Oficial Tabler <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Tabler Card: Basic */}
      <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden">
        <div className="p-5 border-b border-border/60">
          <h2 className="text-lg font-bold text-foreground">Basic</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Click a swatch to open the picker and choose any color.
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {INITIAL_COLORS.map((item) => {
              const currentHex = colors[item.id];
              const isSelected = activeColorId === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveColorId(item.id)}
                  className={`border rounded-xl p-3 flex flex-col justify-between space-y-2.5 cursor-pointer transition-all ${
                    isSelected
                      ? "border-purple-600 ring-2 ring-purple-500/20 bg-purple-50/20 dark:bg-purple-950/20 shadow-xs"
                      : "border-border/80 hover:border-border hover:bg-muted/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">{item.name}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyHex(item.id, currentHex);
                      }}
                      className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
                      title="Copiar Hexadecimal"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>

                  {/* Color Input and Preview Swatch */}
                  <div className="flex items-center gap-2">
                    <div className="relative shrink-0">
                      <input
                        type="color"
                        id={item.id}
                        value={currentHex}
                        onChange={(e) => handleColorChange(item.id, e.target.value)}
                        className="w-9 h-9 rounded-lg border border-border/80 p-0.5 cursor-pointer bg-transparent"
                      />
                    </div>
                    <input
                      type="text"
                      value={currentHex}
                      onChange={(e) => handleColorChange(item.id, e.target.value)}
                      className="w-full h-9 px-2 text-xs font-mono font-medium rounded-lg border border-input bg-background text-foreground uppercase focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Theme Preview Card with Active Color */}
      <div className="bg-card border border-border/80 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
          <div>
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <Pipette className="w-4 h-4 text-purple-600" />
              Live Theme Preview: {activeItem?.name} ({activeHex})
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Veja como a cor selecionada se comporta em tempo real em botões, badges, alertas e bordas de destaque.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="w-6 h-6 rounded-full border border-border shadow-2xs"
              style={{ backgroundColor: activeHex }}
            />
            <code className="text-xs font-mono font-bold text-foreground px-2 py-1 rounded bg-muted">
              {activeHex}
            </code>
          </div>
        </div>

        {/* Components rendered with activeHex */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* 1. Primary Button & Outlines */}
          <div className="border border-border/80 rounded-xl p-4 space-y-3 bg-muted/10">
            <div className="text-xs font-bold text-foreground">Botões Interativos</div>
            <div className="space-y-2">
              <button
                className="w-full py-2 px-4 rounded-lg font-medium text-xs text-white shadow-xs transition-opacity hover:opacity-90 cursor-pointer"
                style={{ backgroundColor: activeHex }}
              >
                Botão Primário ({activeItem?.name})
              </button>
              <button
                className="w-full py-2 px-4 rounded-lg font-medium text-xs border transition-colors hover:bg-muted cursor-pointer"
                style={{ borderColor: activeHex, color: activeHex }}
              >
                Botão Borda ({activeHex})
              </button>
            </div>
          </div>

          {/* 2. Badges & Tags */}
          <div className="border border-border/80 rounded-xl p-4 space-y-3 bg-muted/10">
            <div className="text-xs font-bold text-foreground">Badges & Indicadores</div>
            <div className="flex flex-wrap gap-2">
              <span
                className="px-2.5 py-1 rounded-md text-xs font-semibold text-white shadow-2xs"
                style={{ backgroundColor: activeHex }}
              >
                Badge Ativo
              </span>
              <span
                className="px-2.5 py-1 rounded-md text-xs font-semibold border"
                style={{ borderColor: activeHex, color: activeHex }}
              >
                Outline Tag
              </span>
              <span
                className="px-2.5 py-1 rounded-md text-xs font-semibold"
                style={{
                  backgroundColor: `${activeHex}20`,
                  color: activeHex,
                }}
              >
                Soft Tint
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeHex }} />
              Status operacional conectado
            </div>
          </div>

          {/* 3. Alert / Callout */}
          <div
            className="border rounded-xl p-4 space-y-1.5"
            style={{
              borderColor: `${activeHex}60`,
              backgroundColor: `${activeHex}10`,
            }}
          >
            <div className="flex items-center gap-2 font-bold text-xs" style={{ color: activeHex }}>
              <Sparkles className="w-4 h-4" />
              Alerta com Tom Selecionado
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              O tom <strong style={{ color: activeHex }}>{activeHex}</strong> está sendo aplicado dinamicamente neste contêiner informativo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
