"use client";

import React, { useState } from "react";
import {
  Bot,
  Send,
  Sparkles,
  FileText,
  Clock,
  Layers,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { KnowledgeService } from "@/services/knowledge.service";
import { Button } from "@/components/ui/button";
import type { RagInteraction, RetrievedChunk } from "@/types/knowledge";
import { toast } from "sonner";

const SAMPLE_PROMPTS = [
  "Qual é a regra e percentual de comissão para corretores em vendas e locações?",
  "Como o piloto unifica os arquivos do Google Drive e salva vetores no pgvector?",
  "Quais são os imóveis de alto padrão disponíveis no Itaim Bibi e quais seus valores?",
];

export default function RagLaboratoryPage() {
  const [question, setQuestion] = useState("");
  const [interaction, setInteraction] = useState<RagInteraction | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (queryText?: string) => {
    const q = queryText || question;
    if (!q.trim()) {
      toast.error("Digite uma pergunta para consultar a base de conhecimento.");
      return;
    }
    setLoading(true);
    try {
      const result = await KnowledgeService.queryRag(q);
      setInteraction(result);
      if (queryText) setQuestion(queryText);
    } catch (e) {
      toast.error("Erro na busca semântica.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-200 pb-5 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Laboratório de Teste RAG
            </h1>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
              pgvector + OpenAI
            </span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Ambiente de validação da inteligência artificial imobiliária com transparência de fontes e fragmentos recuperados.
          </p>
        </div>
      </div>

      {/* Caixa de Entrada de Pergunta */}
      <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 space-y-3">
        <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block">
          Faça uma pergunta sobre contratos, inventário, comissões ou documentos:
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAsk()}
            placeholder="Ex: Como funciona a divisão de comissão entre captador e vendedor?"
            className="flex-1 rounded-md border border-zinc-200 bg-zinc-50/60 px-3.5 py-2 text-sm shadow-2xs focus:border-zinc-400 focus:bg-white focus:outline-hidden dark:border-zinc-800 dark:bg-zinc-800/40 dark:text-zinc-100"
          />
          <Button onClick={() => handleAsk()} isLoading={loading} size="md">
            <Send className="h-4 w-4" />
            <span>Consultar</span>
          </Button>
        </div>

        {/* Sugestões de Perguntas Rápidas */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-[11px] text-zinc-400 font-medium">Sugestões de teste:</span>
          {SAMPLE_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleAsk(prompt)}
              className="rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs text-zinc-600 hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-300 transition-colors cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Resultado da Consulta RAG */}
      {interaction && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
          {/* Resposta do Modelo */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-semibold text-xs">
                  <Bot className="h-4 w-4" />
                  <span>Resposta Fundamentada da IA</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono">
                  <Clock className="h-3 w-3" />
                  <span>{interaction.latencyMs}ms</span>
                </div>
              </div>

              <div className="prose prose-zinc dark:prose-invert max-w-none text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
                {interaction.answer}
              </div>

              <div className="flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800 text-xs text-zinc-400">
                <span>Modelo: <strong className="font-mono text-zinc-600 dark:text-zinc-300">{interaction.model}</strong></span>
                <span className="text-emerald-700 dark:text-emerald-400 font-medium">✓ Evidência encontrada</span>
              </div>
            </div>
          </div>

          {/* Painel de Transparência: Trechos Recuperados (Chunks) */}
          <div className="space-y-4">
            <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800">
                <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  <Layers className="h-4 w-4 text-zinc-500" />
                  <span>Trechos Recuperados ({interaction.retrievedChunks.length})</span>
                </div>
              </div>

              <div className="space-y-3">
                {interaction.retrievedChunks.map((chunk) => (
                  <div
                    key={chunk.id}
                    className="rounded-md border border-zinc-200 bg-zinc-50/70 p-3 text-xs dark:border-zinc-800 dark:bg-zinc-800/40 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5 truncate max-w-[180px]">
                        <FileText className="h-3 w-3 text-emerald-600 shrink-0" />
                        <span className="truncate">{chunk.sourceName}</span>
                      </span>
                      <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        {chunk.relevanceScore}% rel.
                      </span>
                    </div>

                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      Origem: {chunk.pageOrReference}
                    </p>

                    <blockquote className="border-l-2 border-emerald-600 pl-2 text-[11px] text-zinc-700 dark:text-zinc-300 italic">
                      "{chunk.content}"
                    </blockquote>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
