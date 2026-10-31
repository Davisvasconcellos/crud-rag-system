"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { X, Tag, Plus, Check, MapPin, Building, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export function TablerTags() {
  const [tags, setTags] = useState([
    "Cobertura Duplex",
    "Frente Mar",
    "Piscina Privativa",
    "Mobiliado",
    "Smart Home",
    "Heliponto",
    "Condomínio Fechado",
  ]);

  const [inputVal, setInputVal] = useState("");

  const removeTag = (t: string) => {
    setTags((prev) => prev.filter((item) => item !== t));
    toast.info(`Tag "${t}" removida.`);
  };

  const addTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    if (tags.includes(inputVal.trim())) {
      toast.error("Tag já existente.");
      return;
    }
    setTags((prev) => [...prev, inputVal.trim()]);
    setInputVal("");
    toast.success("Nova tag adicionada!");
  };

  return (
    <div className="space-y-6">
      {/* 1. Default & Removable Tags */}
      <Card>
        <CardHeader>
          <CardTitle>Default & Removable Tags</CardTitle>
          <CardDescription>
            Compact keyword labels for search filters, listing categories, and metadata tags.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 shadow-2xs"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-zinc-400 hover:text-rose-500 rounded-xs p-0.5 transition-colors cursor-pointer"
                  title="Remover tag"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>

          <form onSubmit={addTag} className="flex gap-2 max-w-sm">
            <input
              type="text"
              placeholder="Adicionar nova característica..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 px-3 py-1.5 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
            />
            <button
              type="submit"
              className="px-3.5 py-1.5 text-xs font-semibold rounded bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 flex items-center gap-1 shadow-xs"
            >
              <Plus className="h-3.5 w-3.5" />
              Adicionar
            </button>
          </form>
        </CardContent>
      </Card>

      {/* 2. Tags with Icons, Avatars & Status */}
      <Card>
        <CardHeader>
          <CardTitle>Tags with Icons, Avatars & Status</CardTitle>
          <CardDescription>
            Enrich tags with contextual avatars, status dots, and badges with counts.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* With Status Dot */}
          <div>
            <span className="text-xs text-zinc-500 block mb-2">Com Status Dot</span>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Disponível para Visita</span>
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                <span>Proposta em Análise</span>
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                <span>Vendido / Reservado</span>
              </span>
            </div>
          </div>

          {/* With Avatar */}
          <div>
            <span className="text-xs text-zinc-500 block mb-2">Com Avatar de Responsável</span>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-2 pr-3 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-medium">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=60&q=80"
                  alt="Avatar"
                  className="h-6 w-6 rounded-full object-cover"
                />
                <span>Mariana Fontes (Gerente Jardins)</span>
              </span>
              <span className="inline-flex items-center gap-2 pr-3 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-medium">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=60&q=80"
                  alt="Avatar"
                  className="h-6 w-6 rounded-full object-cover"
                />
                <span>Rodrigo Silveira (Especialista Alphaville)</span>
              </span>
            </div>
          </div>

          {/* With Badge Count */}
          <div>
            <span className="text-xs text-zinc-500 block mb-2">Com Contagem</span>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 font-medium">
                <span>Apartamentos Jardins</span>
                <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  84
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 font-medium">
                <span>Casas em Condomínio</span>
                <span className="bg-emerald-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  32
                </span>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
