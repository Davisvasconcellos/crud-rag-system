"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  Copy,
  Check,
  Code2,
  ExternalLink,
  Layers,
  Sparkles,
  Sliders,
  Building2,
  Car,
  Wifi,
  ShieldAlert,
  Dumbbell,
  Coffee,
} from "lucide-react";
import { toast } from "sonner";

// Tabler SVG Icons embedded directly for 100% exact vector fidelity
const TablerIcons = {
  star: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873l-6.158 -3.245" />
    </svg>
  ),
  devices: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M13 9a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1v-10" />
      <path d="M18 8v-3a1 1 0 0 0 -1 -1h-13a1 1 0 0 0 -1 1v12a1 1 0 0 0 1 1h9" />
      <path d="M16 9h2" />
    </svg>
  ),
  mailbox: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M10 21v-6.5a3.5 3.5 0 0 0 -7 0v6.5h18v-6a4 4 0 0 0 -4 -4h-10.5" />
      <path d="M12 11v-8h4l2 2l-2 2h-4" />
      <path d="M6 15h1" />
    </svg>
  ),
  palette: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M12 21a9 9 0 0 1 0 -18c4.97 0 9 3.582 9 8c0 1.06 -.474 2.078 -1.318 2.828c-.844 .75 -1.989 1.172 -3.182 1.172h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25" />
      <path d="M7.5 10.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M11.5 7.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M15.5 10.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
    </svg>
  ),
  tools: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M3 21h4l13 -13a1.5 1.5 0 0 0 -4 -4l-13 13v4" />
      <path d="M14.5 5.5l4 4" />
      <path d="M12 8l-5 -5l-4 4l5 5" />
      <path d="M7 8l-1.5 1.5" />
      <path d="M16 12l5 5l-4 4l-5 -5" />
      <path d="M16 17l-1.5 1.5" />
    </svg>
  ),
  brandBootstrap: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M2 12a2 2 0 0 0 2 -2v-4a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2" />
      <path d="M2 12a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-4a2 2 0 0 1 2 -2" />
      <path d="M9 16v-8h3.5a2 2 0 1 1 0 4h-3.5h4a2 2 0 1 1 0 4h-4" />
    </svg>
  ),
  paint: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M5 5a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2l0 -2" />
      <path d="M19 6h1a2 2 0 0 1 2 2a5 5 0 0 1 -5 5l-5 0v2" />
      <path d="M10 16a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1l0 -4" />
    </svg>
  ),
  rocket: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3 -5a9 9 0 0 0 6 -8a3 3 0 0 0 -3 -3a9 9 0 0 0 -8 6a6 6 0 0 0 -5 3" />
      <path d="M7 14a6 6 0 0 0 -3 6a6 6 0 0 0 6 -3" />
      <path d="M14 9a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
    </svg>
  ),
  shieldCheck: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M11.46 20.846a12 12 0 0 1 -7.96 -14.846a12 12 0 0 0 8.5 -3a12 12 0 0 0 8.5 3a12 12 0 0 1 -.09 7.06" />
      <path d="M15 19l2 2l4 -4" />
    </svg>
  ),
};

// Shape component helper
interface ShapeProps {
  size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  color?: string; // class name or color key
  borderRadius?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const sizeConfig = {
  xxs: { box: "w-4 h-4", icon: "w-2 h-2", px: "16px" },
  xs: { box: "w-5 h-5", icon: "w-3 h-3", px: "20px" },
  sm: { box: "w-8 h-8", icon: "w-4 h-4", px: "32px" },
  md: { box: "w-10 h-10", icon: "w-5 h-5", px: "40px" },
  lg: { box: "w-12 h-12", icon: "w-6 h-6", px: "48px" },
  xl: { box: "w-20 h-20", icon: "w-10 h-10", px: "80px" },
  "2xl": { box: "w-28 h-28", icon: "w-16 h-16", px: "112px" },
};

const colorConfig: Record<string, { bg: string; text: string; label: string }> = {
  default: { bg: "bg-blue-500/10 text-blue-600 dark:text-blue-400", text: "text-blue-600 dark:text-blue-400", label: "Default" },
  blue: { bg: "bg-blue-500/10 text-blue-600 dark:text-blue-400", text: "text-blue-600 dark:text-blue-400", label: "Blue" },
  azure: { bg: "bg-sky-500/10 text-sky-600 dark:text-sky-400", text: "text-sky-600 dark:text-sky-400", label: "Azure" },
  indigo: { bg: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400", text: "text-indigo-600 dark:text-indigo-400", label: "Indigo" },
  purple: { bg: "bg-purple-500/10 text-purple-600 dark:text-purple-400", text: "text-purple-600 dark:text-purple-400", label: "Purple" },
  pink: { bg: "bg-pink-500/10 text-pink-600 dark:text-pink-400", text: "text-pink-600 dark:text-pink-400", label: "Pink" },
  red: { bg: "bg-red-500/10 text-red-600 dark:text-red-400", text: "text-red-600 dark:text-red-400", label: "Red" },
  orange: { bg: "bg-orange-500/10 text-orange-600 dark:text-orange-400", text: "text-orange-600 dark:text-orange-400", label: "Orange" },
  yellow: { bg: "bg-amber-500/15 text-amber-600 dark:text-amber-400", text: "text-amber-600 dark:text-amber-400", label: "Yellow" },
  lime: { bg: "bg-lime-500/15 text-lime-600 dark:text-lime-400", text: "text-lime-600 dark:text-lime-400", label: "Lime" },
  green: { bg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", text: "text-emerald-600 dark:text-emerald-400", label: "Green" },
  teal: { bg: "bg-teal-500/10 text-teal-600 dark:text-teal-400", text: "text-teal-600 dark:text-teal-400", label: "Teal" },
  cyan: { bg: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400", text: "text-cyan-600 dark:text-cyan-400", label: "Cyan" },
};

function Shape({
  size = "md",
  color = "default",
  borderRadius,
  className = "",
  style,
  children,
}: ShapeProps) {
  const currentSize = sizeConfig[size];
  const currentColor = colorConfig[color] || colorConfig.default;

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 transition-transform hover:scale-105 ${currentSize.box} ${currentColor.bg} ${className}`}
      style={{
        borderRadius: borderRadius !== undefined ? borderRadius : "35%",
        ...style,
      }}
    >
      <span className={`inline-flex items-center justify-center ${currentSize.icon}`}>
        {children}
      </span>
    </span>
  );
}

export function TablerShape() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [interactiveRadius, setInteractiveRadius] = useState(35);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast.success("Snippet copiado!");
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
            <span className="text-primary font-bold">Base Elements</span>
            <span>•</span>
            <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">1:1 Replica</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Shape</h1>
          <p className="text-muted-foreground text-sm mt-1 max-w-2xl">
            Contêiner geométrico suave para ícones e glifos com proporção 1:1 e curvatura customizável via border-radius.
            Réplica 100% fiel de <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">https://preview.tabler.io/shape.html</code>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://preview.tabler.io/shape.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border border-border bg-card hover:bg-muted transition-colors text-muted-foreground hover:text-foreground shadow-sm"
          >
            <span>Ver Oficial Tabler</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Main Grid matching Tabler 12-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">

        {/* ======================================================== */}
        {/* CARD 1: Sizes (col-md-6 col-lg-4)                         */}
        {/* ======================================================== */}
        <div className="lg:col-span-4">
          <Card className="h-full flex flex-col justify-between shadow-sm hover:shadow transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold">Sizes</CardTitle>
                <button
                  onClick={() => handleCopy('<span class="shape shape-md"><svg class="icon">...</svg></span>', 'sizes')}
                  className="p-1.5 text-muted-foreground hover:text-foreground rounded hover:bg-muted transition-colors"
                  title="Copiar código"
                >
                  {copiedKey === 'sizes' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <CardDescription className="text-xs">
                Add <code className="text-[11px] bg-muted px-1 py-0.5 rounded font-mono">.shape-&#123;size&#125;</code>, from <code className="text-[11px] bg-muted px-1 py-0.5 rounded font-mono">xxs</code> to <code className="text-[11px] bg-muted px-1 py-0.5 rounded font-mono">2xl</code>, the same sizes as an avatar.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex flex-wrap items-end gap-3 p-4 bg-muted/20 dark:bg-muted/10 rounded-xl border border-dashed border-border/60">
                {/* xxs */}
                <div className="flex flex-col items-center gap-1">
                  <Shape size="xxs">{TablerIcons.star}</Shape>
                  <span className="text-[9px] text-muted-foreground font-mono">xxs</span>
                </div>
                {/* xs */}
                <div className="flex flex-col items-center gap-1">
                  <Shape size="xs">{TablerIcons.star}</Shape>
                  <span className="text-[9px] text-muted-foreground font-mono">xs</span>
                </div>
                {/* sm */}
                <div className="flex flex-col items-center gap-1">
                  <Shape size="sm">{TablerIcons.star}</Shape>
                  <span className="text-[9px] text-muted-foreground font-mono">sm</span>
                </div>
                {/* md */}
                <div className="flex flex-col items-center gap-1">
                  <Shape size="md">{TablerIcons.star}</Shape>
                  <span className="text-[9px] text-muted-foreground font-mono">md</span>
                </div>
                {/* lg */}
                <div className="flex flex-col items-center gap-1">
                  <Shape size="lg">{TablerIcons.star}</Shape>
                  <span className="text-[9px] text-muted-foreground font-mono">lg</span>
                </div>
                {/* xl */}
                <div className="flex flex-col items-center gap-1">
                  <Shape size="xl">{TablerIcons.star}</Shape>
                  <span className="text-[9px] text-muted-foreground font-mono">xl</span>
                </div>
                {/* 2xl */}
                <div className="flex flex-col items-center gap-1">
                  <Shape size="2xl">{TablerIcons.star}</Shape>
                  <span className="text-[9px] text-muted-foreground font-mono">2xl</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ======================================================== */}
        {/* CARD 2: Colors (col-md-6 col-lg-4)                        */}
        {/* ======================================================== */}
        <div className="lg:col-span-4">
          <Card className="h-full flex flex-col justify-between shadow-sm hover:shadow transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold">Colors</CardTitle>
                <button
                  onClick={() => handleCopy('<span class="shape shape-blue">...</span>', 'colors')}
                  className="p-1.5 text-muted-foreground hover:text-foreground rounded hover:bg-muted transition-colors"
                  title="Copiar código"
                >
                  {copiedKey === 'colors' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <CardDescription className="text-xs">
                Add <code className="text-[11px] bg-muted px-1 py-0.5 rounded font-mono">.shape-&#123;color&#125;</code> to use another palette color.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex flex-wrap gap-2.5 p-4 bg-muted/20 dark:bg-muted/10 rounded-xl border border-dashed border-border/60">
                <Shape color="default" size="md">{TablerIcons.brandBootstrap}</Shape>
                <Shape color="blue" size="md">{TablerIcons.brandBootstrap}</Shape>
                <Shape color="azure" size="md">{TablerIcons.brandBootstrap}</Shape>
                <Shape color="indigo" size="md">{TablerIcons.brandBootstrap}</Shape>
                <Shape color="purple" size="md">{TablerIcons.brandBootstrap}</Shape>
                <Shape color="pink" size="md">{TablerIcons.brandBootstrap}</Shape>
                <Shape color="red" size="md">{TablerIcons.brandBootstrap}</Shape>
                <Shape color="orange" size="md">{TablerIcons.brandBootstrap}</Shape>
                <Shape color="yellow" size="md">{TablerIcons.brandBootstrap}</Shape>
                <Shape color="lime" size="md">{TablerIcons.brandBootstrap}</Shape>
                <Shape color="green" size="md">{TablerIcons.brandBootstrap}</Shape>
                <Shape color="teal" size="md">{TablerIcons.brandBootstrap}</Shape>
                <Shape color="cyan" size="md">{TablerIcons.brandBootstrap}</Shape>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ======================================================== */}
        {/* CARD 3: With icons (col-md-6 col-lg-4)                    */}
        {/* ======================================================== */}
        <div className="lg:col-span-4">
          <Card className="h-full flex flex-col justify-between shadow-sm hover:shadow transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold">With icons</CardTitle>
                <button
                  onClick={() => handleCopy('<span class="shape shape-md"><svg class="icon">...</svg></span>', 'icons')}
                  className="p-1.5 text-muted-foreground hover:text-foreground rounded hover:bg-muted transition-colors"
                  title="Copiar código"
                >
                  {copiedKey === 'icons' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <CardDescription className="text-xs">
                Put one <code className="text-[11px] bg-muted px-1 py-0.5 rounded font-mono">.icon</code> inside the shape; it is sized with the square.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex flex-wrap gap-3 p-4 bg-muted/20 dark:bg-muted/10 rounded-xl border border-dashed border-border/60">
                <Shape size="md">{TablerIcons.devices}</Shape>
                <Shape size="md">{TablerIcons.mailbox}</Shape>
                <Shape size="md">{TablerIcons.palette}</Shape>
                <Shape size="md">{TablerIcons.tools}</Shape>
                <Shape size="md">{TablerIcons.brandBootstrap}</Shape>
                <Shape size="md">{TablerIcons.paint}</Shape>
                <Shape size="md">{TablerIcons.rocket}</Shape>
                <Shape size="md">{TablerIcons.shieldCheck}</Shape>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ======================================================== */}
        {/* CARD 4: Corner radius (col-md-6 col-lg-4)                 */}
        {/* ======================================================== */}
        <div className="lg:col-span-4">
          <Card className="h-full flex flex-col justify-between shadow-sm hover:shadow transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold">Corner radius</CardTitle>
                <button
                  onClick={() => handleCopy('style="--tblr-shape-border-radius: 50%"', 'radius')}
                  className="p-1.5 text-muted-foreground hover:text-foreground rounded hover:bg-muted transition-colors"
                  title="Copiar código"
                >
                  {copiedKey === 'radius' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <CardDescription className="text-xs">
                Set <code className="text-[11px] bg-muted px-1 py-0.5 rounded font-mono">--tblr-shape-border-radius</code> to change the corners; the default is <code className="text-[11px] bg-muted px-1 py-0.5 rounded font-mono">35%</code>.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2 space-y-4">
              <div className="flex flex-wrap items-center justify-around gap-4 p-4 bg-muted/20 dark:bg-muted/10 rounded-xl border border-dashed border-border/60">
                {/* Square */}
                <div className="text-center">
                  <Shape size="lg" borderRadius="0%">{TablerIcons.palette}</Shape>
                  <div className="text-muted-foreground text-xs font-medium mt-1.5">Square</div>
                  <span className="text-[10px] text-zinc-400 font-mono">0%</span>
                </div>
                {/* Default */}
                <div className="text-center">
                  <Shape size="lg" borderRadius="35%">{TablerIcons.palette}</Shape>
                  <div className="text-muted-foreground text-xs font-medium mt-1.5">Default</div>
                  <span className="text-[10px] text-zinc-400 font-mono">35%</span>
                </div>
                {/* Circle */}
                <div className="text-center">
                  <Shape size="lg" borderRadius="50%">{TablerIcons.palette}</Shape>
                  <div className="text-muted-foreground text-xs font-medium mt-1.5">Circle</div>
                  <span className="text-[10px] text-zinc-400 font-mono">50%</span>
                </div>
              </div>

              {/* Interactive Tester */}
              <div className="px-3 py-2.5 bg-background rounded-lg border border-border text-xs flex items-center justify-between gap-3">
                <span className="font-medium text-muted-foreground flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-primary" />
                  Teste Dinâmico:
                </span>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={interactiveRadius}
                  onChange={(e) => setInteractiveRadius(Number(e.target.value))}
                  className="w-28 accent-primary h-1.5 bg-muted rounded cursor-pointer"
                />
                <span className="font-mono text-xs w-8 text-right font-semibold">{interactiveRadius}%</span>
                <Shape size="sm" borderRadius={`${interactiveRadius}%`}>{TablerIcons.palette}</Shape>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ======================================================== */}
        {/* CARD 5: Feature list (col-lg-8)                           */}
        {/* ======================================================== */}
        <div className="lg:col-span-8">
          <Card className="h-full flex flex-col justify-between shadow-sm hover:shadow transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold">Feature list</CardTitle>
                <button
                  onClick={() => handleCopy('<div class="row g-4 text-center">...</div>', 'feature-list')}
                  className="p-1.5 text-muted-foreground hover:text-foreground rounded hover:bg-muted transition-colors"
                  title="Copiar código"
                >
                  {copiedKey === 'feature-list' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <CardDescription className="text-xs">
                A shape above each heading, with the same size and color on every item.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center p-6 bg-muted/20 dark:bg-muted/10 rounded-xl border border-dashed border-border/60">
                {/* Item 1 */}
                <div className="flex flex-col items-center">
                  <Shape size="md" className="mb-3">{TablerIcons.devices}</Shape>
                  <h3 className="text-base font-bold tracking-tight mb-1">Mobile-optimized</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Every page works on any screen size, from a phone to a wide monitor.
                  </p>
                </div>

                {/* Item 2 */}
                <div className="flex flex-col items-center">
                  <Shape size="md" className="mb-3">{TablerIcons.mailbox}</Shape>
                  <h3 className="text-base font-bold tracking-tight mb-1">Tested email clients</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Checked in more than 90 email clients and devices.
                  </p>
                </div>

                {/* Item 3 */}
                <div className="flex flex-col items-center">
                  <Shape size="md" className="mb-3">{TablerIcons.palette}</Shape>
                  <h3 className="text-base font-bold tracking-tight mb-1">Minimal design</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Clean layouts based on Bootstrap and Material Design principles.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ======================================================== */}
        {/* CARD 6: Feature list, inline (col-12)                     */}
        {/* ======================================================== */}
        <div className="lg:col-span-12">
          <Card className="shadow-sm hover:shadow transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold">Feature list, inline</CardTitle>
                <button
                  onClick={() => handleCopy('<div class="row g-4"><div class="col-md-4">...</div></div>', 'feature-inline')}
                  className="p-1.5 text-muted-foreground hover:text-foreground rounded hover:bg-muted transition-colors"
                  title="Copiar código"
                >
                  {copiedKey === 'feature-inline' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <CardDescription className="text-xs">
                A colored shape next to each heading, in a <code className="text-[11px] bg-muted px-1 py-0.5 rounded font-mono">.row</code> with an auto column.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-muted/20 dark:bg-muted/10 rounded-xl border border-dashed border-border/60">
                {/* Item 1 */}
                <div className="flex items-start gap-3.5">
                  <Shape size="md" color="blue" className="shrink-0">{TablerIcons.tools}</Shape>
                  <div>
                    <h3 className="text-sm font-bold tracking-tight mb-0.5">Easy to customize</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Change colors, fonts and spacing with Sass or CSS variables.
                    </p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex items-start gap-3.5">
                  <Shape size="md" color="purple" className="shrink-0">{TablerIcons.brandBootstrap}</Shape>
                  <div>
                    <h3 className="text-sm font-bold tracking-tight mb-0.5">Built on Bootstrap</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Every Bootstrap component works out of the box.
                    </p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex items-start gap-3.5">
                  <Shape size="md" color="green" className="shrink-0">{TablerIcons.paint}</Shape>
                  <div>
                    <h3 className="text-sm font-bold tracking-tight mb-0.5">Dark mode</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      One attribute switches the whole interface to a dark theme.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ======================================================== */}
        {/* BONUS: Real Estate Domain Application                     */}
        {/* ======================================================== */}
        <div className="lg:col-span-12">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-primary/10 text-primary">
                  <Sparkles className="w-4 h-4" />
                </span>
                <CardTitle className="text-base font-bold">Aplicação no Ecossistema Imobiliário</CardTitle>
              </div>
              <CardDescription className="text-xs">
                Exemplo prático de shapes na ficha de empreendimentos para destacar comodidades e lazer do condomínio.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="p-3.5 rounded-xl border border-border bg-card/60 flex flex-col items-center text-center gap-2 hover:border-primary/40 transition-colors">
                  <Shape size="md" color="blue">
                    <Building2 className="w-5 h-5" />
                  </Shape>
                  <span className="text-xs font-bold">Rooftop Lounge</span>
                  <span className="text-[10px] text-muted-foreground">Vista Panorâmica 360°</span>
                </div>

                <div className="p-3.5 rounded-xl border border-border bg-card/60 flex flex-col items-center text-center gap-2 hover:border-primary/40 transition-colors">
                  <Shape size="md" color="green">
                    <Car className="w-5 h-5" />
                  </Shape>
                  <span className="text-xs font-bold">Vagas Elétricas</span>
                  <span className="text-[10px] text-muted-foreground">Carregamento Rápido</span>
                </div>

                <div className="p-3.5 rounded-xl border border-border bg-card/60 flex flex-col items-center text-center gap-2 hover:border-primary/40 transition-colors">
                  <Shape size="md" color="azure">
                    <Wifi className="w-5 h-5" />
                  </Shape>
                  <span className="text-xs font-bold">Wi-Fi Predial</span>
                  <span className="text-[10px] text-muted-foreground">Fibra Dedicada 1Gbps</span>
                </div>

                <div className="p-3.5 rounded-xl border border-border bg-card/60 flex flex-col items-center text-center gap-2 hover:border-primary/40 transition-colors">
                  <Shape size="md" color="red">
                    <ShieldAlert className="w-5 h-5" />
                  </Shape>
                  <span className="text-xs font-bold">Segurança 24h</span>
                  <span className="text-[10px] text-muted-foreground">Biometria e CFTV AI</span>
                </div>

                <div className="p-3.5 rounded-xl border border-border bg-card/60 flex flex-col items-center text-center gap-2 hover:border-primary/40 transition-colors">
                  <Shape size="md" color="orange">
                    <Dumbbell className="w-5 h-5" />
                  </Shape>
                  <span className="text-xs font-bold">Fitness Center</span>
                  <span className="text-[10px] text-muted-foreground">Equipamentos LifeFitness</span>
                </div>

                <div className="p-3.5 rounded-xl border border-border bg-card/60 flex flex-col items-center text-center gap-2 hover:border-primary/40 transition-colors">
                  <Shape size="md" color="purple">
                    <Coffee className="w-5 h-5" />
                  </Shape>
                  <span className="text-xs font-bold">Coworking Privativo</span>
                  <span className="text-[10px] text-muted-foreground">Salas de Reunião acústicas</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
