"use client";

import React, { useState, useEffect } from "react";
import {
  HardDrive,
  RefreshCw,
  FileText,
  FileSpreadsheet,
  MessageSquare,
  Upload,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { KnowledgeService } from "@/services/knowledge.service";
import { Button } from "@/components/ui/button";
import { BusinessStatusBadge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { KnowledgeSource } from "@/types/knowledge";
import { toast } from "sonner";

export default function RagSourcesPage() {
  const [sources, setSources] = useState<KnowledgeSource[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadSources() {
    try {
      const data = await KnowledgeService.listSources();
      setSources(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSources();
  }, []);

  const handleReprocess = async (id: string, name: string) => {
    toast.info(`Iniciando reprocessamento de "${name}"...`);
    await KnowledgeService.reprocessSource(id);
    setSources((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "PROCESSING" } : s))
    );
    setTimeout(() => {
      setSources((prev) =>
        prev.map((s) =>
          s.id === id
            ? { ...s, status: "INDEXED", updatedAt: new Date().toISOString() }
            : s
        )
      );
      toast.success(`"${name}" reindexado no pgvector com sucesso!`);
    }, 2000);
  };

  const getCategoryIcon = (category: KnowledgeSource["category"]) => {
    switch (category) {
      case "PLANILHAS":
        return <FileSpreadsheet className="h-4 w-4 text-emerald-600" />;
      case "CONVERSAS":
        return <MessageSquare className="h-4 w-4 text-blue-600" />;
      default:
        return <FileText className="h-4 w-4 text-zinc-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-200 pb-5 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Fontes de Conhecimento & Ingestão
            </h1>
            <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              {sources.length} arquivos monitorados
            </span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Sincronização entre Google Drive, extração de texto, chunking semântico e vetores no PostgreSQL pgvector.
          </p>
        </div>

        <Button size="sm" onClick={() => toast.info("Simulação de sincronização com o Google Drive...")}>
          <RefreshCw className="h-4 w-4" />
          Sincronizar Google Drive
        </Button>
      </div>

      {/* Tabela de Fontes */}
      <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-600 dark:text-zinc-300 min-w-[700px]">
            <thead className="border-b border-zinc-200 bg-zinc-50/80 text-xs font-semibold text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-300">
              <tr>
                <th className="py-3 px-4">Documento / Origem</th>
                <th className="py-3 px-4">Caminho no Drive</th>
                <th className="py-3 px-4">Categoria</th>
                <th className="py-3 px-4">Fragmentos (pgvector)</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Última Indexação</th>
                <th className="py-3 px-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {sources.map((s) => (
                <tr key={s.id} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(s.category)}
                      <span className="font-medium text-zinc-900 dark:text-zinc-100 line-clamp-1">
                        {s.name}
                      </span>
                    </div>
                    <span className="text-[11px] text-zinc-400 block ml-6">
                      {(s.fileSizeBytes / 1024).toFixed(0)} KB · {s.origin}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                    {s.drivePath ?? "Upload Local"}
                  </td>
                  <td className="py-3.5 px-4 text-xs">
                    <span className="rounded bg-zinc-100 px-2 py-0.5 font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                      {s.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-xs font-mono font-feature-numeric">
                    {s.chunksCount > 0 ? (
                      <span><strong>{s.chunksCount}</strong> chunks ({s.tokensCount} tokens)</span>
                    ) : (
                      <span className="text-zinc-400">Em fila</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <BusinessStatusBadge status={s.status} />
                  </td>
                  <td className="py-3.5 px-4 text-xs text-zinc-500">
                    {formatDate(s.updatedAt)}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleReprocess(s.id, s.name)}
                      disabled={s.status === "PROCESSING"}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-600 hover:text-emerald-700 dark:text-zinc-400 dark:hover:text-emerald-400 disabled:opacity-40 cursor-pointer transition-colors"
                    >
                      <RefreshCw className={`h-3 w-3 ${s.status === "PROCESSING" ? "animate-spin" : ""}`} />
                      <span>Reprocessar</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
