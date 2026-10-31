"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Copy, Check, SlidersHorizontal } from "lucide-react";
import { toast } from "sonner";

export function TablerColors() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Gradient Builder States
  const [gradientColor1, setGradientColor1] = useState("#0054a6");
  const [gradientColor2, setGradientColor2] = useState("#206bc4");
  const [gradientAngle, setGradientAngle] = useState(135);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast.success(`Copiado: ${text}`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const palette = [
    { name: "Blue", hex: "#066fd1", lightHex: "#e6f1fb", rgb: "6, 111, 209" },
    { name: "Azure", hex: "#4299e1", lightHex: "#edf5fc", rgb: "66, 153, 225" },
    { name: "Indigo", hex: "#4263eb", lightHex: "#edf0fd", rgb: "66, 99, 235" },
    { name: "Purple", hex: "#ae3ec9", lightHex: "#f7ecfa", rgb: "174, 62, 201" },
    { name: "Pink", hex: "#d6336c", lightHex: "#fbebf0", rgb: "214, 51, 108" },
    { name: "Red", hex: "#d63939", lightHex: "#fbebeb", rgb: "214, 57, 57" },
    { name: "Orange", hex: "#f76707", lightHex: "#fef0e6", rgb: "247, 103, 7" },
    { name: "Yellow", hex: "#f59f00", lightHex: "#fef5e6", rgb: "245, 159, 0" },
    { name: "Lime", hex: "#74b816", lightHex: "#f1f8e8", rgb: "116, 184, 22" },
    { name: "Green", hex: "#2fb344", lightHex: "#eaf7ec", rgb: "47, 179, 68" },
    { name: "Teal", hex: "#0ca678", lightHex: "#e7f6f2", rgb: "12, 166, 120" },
    { name: "Cyan", hex: "#17a2b8", lightHex: "#e8f6f8", rgb: "23, 162, 184" },
  ];

  const grays = [
    { step: "50", hex: "#f8fafc" },
    { step: "100", hex: "#f1f5f9" },
    { step: "200", hex: "#e2e8f0" },
    { step: "300", hex: "#cbd5e1" },
    { step: "400", hex: "#94a3b8" },
    { step: "500", hex: "#64748b" },
    { step: "600", hex: "#475569" },
    { step: "700", hex: "#334155" },
    { step: "800", hex: "#1e293b" },
    { step: "900", hex: "#0f172a" },
    { step: "950", hex: "#020617" },
  ];

  const socialColors = [
    { name: "Facebook", hex: "#1877f2" },
    { name: "Twitter / X", hex: "#000000" },
    { name: "Google", hex: "#ea4335" },
    { name: "Youtube", hex: "#ff0000" },
    { name: "Vimeo", hex: "#1ab7ea" },
    { name: "Dribbble", hex: "#ea4c89" },
    { name: "Github", hex: "#24292e" },
    { name: "Instagram", hex: "#e1306c" },
    { name: "Pinterest", hex: "#bd081c" },
    { name: "Vk", hex: "#4680c2" },
    { name: "Linkedin", hex: "#0a66c2" },
  ];

  const gradientCss = `linear-gradient(${gradientAngle}deg, ${gradientColor1}, ${gradientColor2})`;

  return (
    <div className="space-y-6">
      {/* 1. Theme and Light Colors */}
      <Card>
        <CardHeader>
          <CardTitle>Light colors</CardTitle>
          <CardDescription>A tinted, low-contrast version of each color alongside its solid counterpart.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {palette.map((c) => (
              <div
                key={c.name}
                onClick={() => copyToClipboard(c.hex, c.name)}
                className="group rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2.5 transition-all hover:shadow-md cursor-pointer"
              >
                <div className="flex h-12 w-full rounded overflow-hidden mb-2">
                  <div className="w-1/2 h-full" style={{ backgroundColor: c.hex }} />
                  <div className="w-1/2 h-full" style={{ backgroundColor: c.lightHex }} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">{c.name}</span>
                  {copiedKey === c.name ? (
                    <Check className="h-3 w-3 text-emerald-500" />
                  ) : (
                    <Copy className="h-3 w-3 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
                <div className="text-[11px] font-mono text-zinc-500 mt-0.5">{c.hex}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 2. Gray colors */}
      <Card>
        <CardHeader>
          <CardTitle>Gray colors</CardTitle>
          <CardDescription>The neutral gray scale used for text, borders, and backgrounds.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2">
            {grays.map((g) => (
              <div
                key={g.step}
                onClick={() => copyToClipboard(g.hex, `gray-${g.step}`)}
                className="group rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2 text-center transition-all hover:shadow-sm cursor-pointer"
              >
                <div className="h-10 w-full rounded mb-1.5 shadow-xs" style={{ backgroundColor: g.hex }} />
                <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{g.step}</div>
                <div className="text-[10px] font-mono text-zinc-500">{g.hex}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 3. Social colors */}
      <Card>
        <CardHeader>
          <CardTitle>Social colors</CardTitle>
          <CardDescription>Brand colors for social networks.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {socialColors.map((s) => (
              <div
                key={s.name}
                onClick={() => copyToClipboard(s.hex, s.name)}
                className="group rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2.5 transition-all hover:shadow-md cursor-pointer"
              >
                <div className="h-8 w-full rounded mb-2 shadow-xs" style={{ backgroundColor: s.hex }} />
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">{s.name}</span>
                  <span className="text-[10px] font-mono text-zinc-500">{s.hex}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 4. Gradient (Live Interactive Builder) */}
      <Card>
        <CardHeader>
          <CardTitle>Gradient</CardTitle>
          <CardDescription>Build a gradient from any two colors and preview it live.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className="w-full h-36 rounded-lg shadow-inner flex items-center justify-center transition-all duration-300"
            style={{ background: gradientCss }}
          >
            <div className="bg-white/80 dark:bg-black/60 backdrop-blur-md px-4 py-2 rounded-md shadow-sm text-center">
              <span className="text-xs font-mono font-semibold text-zinc-900 dark:text-zinc-100">
                {gradientCss}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400 block mb-1">Cor Inicial</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={gradientColor1}
                  onChange={(e) => setGradientColor1(e.target.value)}
                  className="h-9 w-12 rounded cursor-pointer border border-zinc-300 dark:border-zinc-700 bg-transparent p-0.5"
                />
                <input
                  type="text"
                  value={gradientColor1}
                  onChange={(e) => setGradientColor1(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs font-mono rounded border border-zinc-300 dark:border-zinc-700 bg-transparent"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400 block mb-1">Cor Final</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={gradientColor2}
                  onChange={(e) => setGradientColor2(e.target.value)}
                  className="h-9 w-12 rounded cursor-pointer border border-zinc-300 dark:border-zinc-700 bg-transparent p-0.5"
                />
                <input
                  type="text"
                  value={gradientColor2}
                  onChange={(e) => setGradientColor2(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs font-mono rounded border border-zinc-300 dark:border-zinc-700 bg-transparent"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Ângulo: {gradientAngle}°</label>
                <button
                  type="button"
                  onClick={() => copyToClipboard(`background: ${gradientCss};`, "gradient-css")}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="h-3 w-3" />
                  Copiar CSS
                </button>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={gradientAngle}
                onChange={(e) => setGradientAngle(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 5. Gradient colors */}
      <Card>
        <CardHeader>
          <CardTitle>Gradient colors</CardTitle>
          <CardDescription>Every color faded to transparent, fading in from the left or the right.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {palette.map((c) => (
              <div key={c.name} className="space-y-1.5">
                <div
                  className="h-8 w-full rounded shadow-xs"
                  style={{ background: `linear-gradient(to right, ${c.hex}, transparent)` }}
                />
                <div className="flex justify-between text-xs text-zinc-500 font-mono">
                  <span>{c.name}</span>
                  <span>to transparent</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
