"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Heart,
  Search,
  Edit,
  Trash2,
  Settings,
  MoreVertical,
  Download,
  Plus,
  Share2,
  ExternalLink,
  ChevronRight,
  Check,
} from "lucide-react";
import { toast } from "sonner";

export function TablerButtons() {
  const [heartActive, setHeartActive] = useState(false);

  const themeColors = [
    { name: "Primary", bg: "bg-blue-600 hover:bg-blue-700 text-white", outline: "border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40", ghost: "text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40" },
    { name: "Secondary", bg: "bg-zinc-600 hover:bg-zinc-700 text-white", outline: "border-zinc-500 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800", ghost: "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800" },
    { name: "Success", bg: "bg-emerald-600 hover:bg-emerald-700 text-white", outline: "border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40", ghost: "text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40" },
    { name: "Warning", bg: "bg-amber-500 hover:bg-amber-600 text-white", outline: "border-amber-500 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40", ghost: "text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40" },
    { name: "Danger", bg: "bg-red-600 hover:bg-red-700 text-white", outline: "border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40", ghost: "text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40" },
    { name: "Info", bg: "bg-sky-500 hover:bg-sky-600 text-white", outline: "border-sky-500 text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950/40", ghost: "text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950/40" },
    { name: "Dark", bg: "bg-zinc-900 hover:bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-900", outline: "border-zinc-900 text-zinc-900 dark:border-zinc-200 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800", ghost: "text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800" },
    { name: "Light", bg: "bg-zinc-100 hover:bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700", outline: "border-zinc-300 text-zinc-700 dark:border-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800", ghost: "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800" },
  ];

  const extraColors = [
    { name: "Blue", bg: "bg-blue-600 hover:bg-blue-700 text-white" },
    { name: "Azure", bg: "bg-sky-500 hover:bg-sky-600 text-white" },
    { name: "Indigo", bg: "bg-indigo-600 hover:bg-indigo-700 text-white" },
    { name: "Purple", bg: "bg-purple-600 hover:bg-purple-700 text-white" },
    { name: "Pink", bg: "bg-pink-600 hover:bg-pink-700 text-white" },
    { name: "Red", bg: "bg-red-600 hover:bg-red-700 text-white" },
    { name: "Orange", bg: "bg-orange-500 hover:bg-orange-600 text-white" },
    { name: "Yellow", bg: "bg-amber-400 hover:bg-amber-500 text-zinc-900" },
    { name: "Lime", bg: "bg-lime-500 hover:bg-lime-600 text-white" },
    { name: "Green", bg: "bg-emerald-600 hover:bg-emerald-700 text-white" },
    { name: "Teal", bg: "bg-teal-500 hover:bg-teal-600 text-white" },
    { name: "Cyan", bg: "bg-cyan-500 hover:bg-cyan-600 text-white" },
  ];

  const socialBrands = [
    { name: "Facebook", bg: "bg-[#1877f2] hover:bg-[#166fe5] text-white", icon: "f" },
    { name: "Twitter / X", bg: "bg-black hover:bg-zinc-800 text-white dark:bg-white dark:text-black", icon: "𝕏" },
    { name: "Google", bg: "bg-[#ea4335] hover:bg-[#d93025] text-white", icon: "G" },
    { name: "Youtube", bg: "bg-[#ff0000] hover:bg-[#cc0000] text-white", icon: "▶" },
    { name: "Vimeo", bg: "bg-[#1ab7ea] hover:bg-[#159ec9] text-white", icon: "v" },
    { name: "Dribbble", bg: "bg-[#ea4c89] hover:bg-[#e6357a] text-white", icon: "🏀" },
    { name: "Github", bg: "bg-[#24292e] hover:bg-[#1b1f23] text-white", icon: "🐙" },
    { name: "Instagram", bg: "bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white", icon: "📸" },
    { name: "Pinterest", bg: "bg-[#bd081c] hover:bg-[#a50719] text-white", icon: "P" },
    { name: "Vk", bg: "bg-[#4680c2] hover:bg-[#3a6da6] text-white", icon: "K" },
    { name: "Linkedin", bg: "bg-[#0a66c2] hover:bg-[#084e96] text-white", icon: "in" },
  ];

  return (
    <div className="space-y-6">
      {/* Grid 1: Shapes, Action buttons, Sizes, Animated icon */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 1. Shapes */}
        <Card>
          <CardHeader>
            <CardTitle>Shapes</CardTitle>
            <CardDescription>
              Round the corners with <code className="font-mono text-xs px-1 rounded bg-zinc-100 dark:bg-zinc-800">.btn-pill</code>, or square them off with <code className="font-mono text-xs px-1 rounded bg-zinc-100 dark:bg-zinc-800">.btn-square</code>.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <button
              type="button"
              className="w-full px-4 py-2 rounded-md bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
            >
              Default (Rounded)
            </button>
            <button
              type="button"
              className="w-full px-4 py-2 rounded-full bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
            >
              Pill Button
            </button>
            <button
              type="button"
              className="w-full px-4 py-2 rounded-none bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
            >
              Square Button
            </button>
          </CardContent>
        </Card>

        {/* 2. Action buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Action buttons</CardTitle>
            <CardDescription>Compact, icon-only buttons for card headers and toolbars.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => toast.info("Ação: Editar")}
                className="h-8 w-8 rounded-md border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center transition-colors cursor-pointer"
                title="Edit"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => toast.info("Ação: Configurações")}
                className="h-8 w-8 rounded-md border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center transition-colors cursor-pointer"
                title="Settings"
              >
                <Settings className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => toast.error("Ação: Deletar")}
                className="h-8 w-8 rounded-md border border-red-200 bg-red-50 text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400 hover:bg-red-100 flex items-center justify-center transition-colors cursor-pointer"
                title="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="h-8 w-8 rounded-md border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center transition-colors cursor-pointer"
                title="More"
              >
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                type="button"
                className="h-8 w-8 rounded-full bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center shadow-xs cursor-pointer"
              >
                <Plus className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="h-8 w-8 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 flex items-center justify-center shadow-xs cursor-pointer"
              >
                <Check className="h-4 w-4" />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* 3. Sizes */}
        <Card>
          <CardHeader>
            <CardTitle>Sizes</CardTitle>
            <CardDescription>Scale a button from btn-sm to btn-xl without changing its layout.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <button
              type="button"
              className="w-full px-2.5 py-1 text-xs rounded bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
            >
              Small (btn-sm)
            </button>
            <button
              type="button"
              className="w-full px-3.5 py-2 text-sm rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
            >
              Regular (btn-md)
            </button>
            <button
              type="button"
              className="w-full px-5 py-2.5 text-base rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              Large (btn-lg)
            </button>
            <button
              type="button"
              className="w-full px-6 py-3 text-lg rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors shadow-sm"
            >
              Extra Large (btn-xl)
            </button>
          </CardContent>
        </Card>

        {/* 4. Animated icon */}
        <Card>
          <CardHeader>
            <CardTitle>Animated icon</CardTitle>
            <CardDescription>Small hover animations draw attention to the icon.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <button
              type="button"
              className="group w-full px-4 py-2 rounded-md bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-medium text-sm flex items-center justify-between hover:bg-zinc-800 transition-all cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform duration-200" />
            </button>

            <button
              type="button"
              onClick={() => {
                setHeartActive(!heartActive);
                toast(heartActive ? "Removido dos favoritos" : "Salvo nos favoritos!");
              }}
              className="group w-full px-4 py-2 rounded-md border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 font-medium text-sm flex items-center justify-center gap-2 hover:border-rose-300 dark:hover:border-rose-900 transition-colors cursor-pointer"
            >
              <Heart
                className={`h-4 w-4 group-hover:scale-125 transition-transform duration-200 ${
                  heartActive ? "fill-rose-500 text-rose-500" : "text-zinc-500 group-hover:text-rose-500"
                }`}
              />
              <span>{heartActive ? "Favoritado" : "Favoritar imóvel"}</span>
            </button>

            <button
              type="button"
              className="group w-full px-4 py-2 rounded-md bg-blue-600 text-white font-medium text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors cursor-pointer"
            >
              <Search className="h-4 w-4 group-hover:rotate-45 transition-transform duration-200" />
              <span>Buscar propriedades</span>
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Grid 2: Standard, Outline, Ghost */}
      <div className="space-y-6">
        {/* 5. Standard */}
        <Card>
          <CardHeader>
            <CardTitle>Standard</CardTitle>
            <CardDescription>Fill a button with a theme color to mark its purpose.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2.5">
              {themeColors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => toast.info(`Botão ${c.name} clicado`)}
                  className={`px-4 py-2 rounded-md text-sm font-medium shadow-xs transition-colors cursor-pointer ${c.bg}`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 6. Outline */}
        <Card>
          <CardHeader>
            <CardTitle>Outline</CardTitle>
            <CardDescription>Keep the border colored and the background transparent for a subtler action.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2.5">
              {themeColors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => toast.info(`Outline ${c.name} clicado`)}
                  className={`px-4 py-2 rounded-md text-sm font-medium border bg-transparent transition-colors cursor-pointer ${c.outline}`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 7. Ghost */}
        <Card>
          <CardHeader>
            <CardTitle>Ghost</CardTitle>
            <CardDescription>Drop the border too — color appears only on hover.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2.5">
              {themeColors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => toast.info(`Ghost ${c.name} clicado`)}
                  className={`px-4 py-2 rounded-md text-sm font-medium bg-transparent transition-colors cursor-pointer ${c.ghost}`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 8. Pill */}
        <Card>
          <CardHeader>
            <CardTitle>Pill</CardTitle>
            <CardDescription>
              Combine <code className="font-mono text-xs px-1 rounded bg-zinc-100 dark:bg-zinc-800">.btn-pill</code> with a theme color.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2.5">
              {themeColors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  className={`px-4 py-2 rounded-full text-sm font-medium shadow-xs transition-colors cursor-pointer ${c.bg}`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 9. Square */}
        <Card>
          <CardHeader>
            <CardTitle>Square</CardTitle>
            <CardDescription>
              Combine <code className="font-mono text-xs px-1 rounded bg-zinc-100 dark:bg-zinc-800">.btn-square</code> with a theme color.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2.5">
              {themeColors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  className={`px-4 py-2 rounded-none text-sm font-medium shadow-xs transition-colors cursor-pointer ${c.bg}`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 10. Extra colors */}
        <Card>
          <CardHeader>
            <CardTitle>Extra colors</CardTitle>
            <CardDescription>The full Tabler palette, beyond the standard theme colors.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2.5">
              {extraColors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  className={`px-4 py-2 rounded-md text-sm font-medium shadow-xs transition-colors cursor-pointer ${c.bg}`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 11. Social colors & 12. Icon buttons */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Social colors</CardTitle>
              <CardDescription>Brand colors for linking out to social networks.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {socialBrands.map((b) => (
                  <button
                    key={b.name}
                    type="button"
                    onClick={() => toast.info(`Conectar via ${b.name}`)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-2 shadow-xs transition-opacity hover:opacity-90 cursor-pointer ${b.bg}`}
                  >
                    <span className="font-bold">{b.icon}</span>
                    <span>{b.name}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Icon buttons</CardTitle>
              <CardDescription>Social brand colors without a label, for compact toolbars.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2.5">
                {socialBrands.map((b) => (
                  <button
                    key={b.name}
                    type="button"
                    title={b.name}
                    onClick={() => toast.info(`Aberto: ${b.name}`)}
                    className={`h-9 w-9 rounded-md flex items-center justify-center font-bold text-sm shadow-xs transition-transform hover:scale-105 cursor-pointer ${b.bg}`}
                  >
                    {b.icon}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
