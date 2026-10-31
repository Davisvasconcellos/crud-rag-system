"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  Bot,
  Send,
  Loader2,
  Sliders,
  Layers,
  MessageSquare,
  Building2,
} from "lucide-react";
import { toast } from "sonner";

export function TablerTextShimmer() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Card 5: Speed state
  const [speed, setSpeed] = useState<number>(2);

  // Card 6: Contrast state (opacity between sweeps)
  const [opacity, setOpacity] = useState<number>(0.5);

  // Chat message state
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "ai"; text: string; isStreaming?: boolean }>>([
    { sender: "user", text: "Qual a previsão de entrega e condições de habite-se do Edifício Horizon?" },
    { sender: "ai", text: "Thinking…", isStreaming: true },
  ]);

  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const query = inputMessage;
    setInputMessage("");
    setChatMessages((prev) => [
      ...prev,
      { sender: "user", text: query },
      { sender: "ai", text: "Consultando matrículas e habite-se no banco de dados...", isStreaming: true },
    ]);

    setTimeout(() => {
      setChatMessages((prev) =>
        prev.map((msg, i) =>
          i === prev.length - 1
            ? {
                sender: "ai",
                text: "Habite-se emitido em 15/09/2026 pelo 4º Ofício de Imóveis. O empreendimento está 100% liberado para financiamento bancário e escrituração imediata.",
                isStreaming: false,
              }
            : msg
        )
      );
      toast.success("Resposta do Agente RAG gerada!");
    }, 2500);
  };

  const handleCopy = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    toast.success("Código copiado!");
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Inline styles for authentic Tabler text shimmer */}
      <style jsx global>{`
        @keyframes tabler-shimmer-sweep {
          0% {
            background-position: 100% 0;
          }
          100% {
            background-position: -100% 0;
          }
        }
        .text-shimmer-sweep {
          background: linear-gradient(
            90deg,
            currentColor calc(50% - 2.5rem),
            color-mix(in srgb, currentColor 20%, white) 50%,
            currentColor calc(50% + 2.5rem)
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent !important;
          animation: tabler-shimmer-sweep var(--shimmer-duration, 2s) infinite linear;
        }
        .text-shimmer-loader-spinner {
          width: 0.85em;
          height: 0.85em;
          border: 1.5px solid currentColor;
          border-right-color: transparent;
          border-radius: 50%;
          display: inline-block;
          vertical-align: -0.1em;
          animation: spin 0.75s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            <span>Tabler UI</span>
            <span>•</span>
            <span className="text-primary font-bold">Feedback & AI Loading</span>
            <span>•</span>
            <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">
              1:1 Official Replica (7 Cards)
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Text shimmer</h1>
          <p className="text-muted-foreground text-sm mt-1 max-w-3xl">
            Efeito luminoso que varre continuamente o texto enquanto tarefas de IA, consultas RAG ou rotinas assíncronas são processadas em segundo plano.
            Réplica 100% fiel de <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">https://preview.tabler.io/text-shimmer.html</code>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://preview.tabler.io/text-shimmer.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border border-border bg-card hover:bg-muted transition-colors text-muted-foreground hover:text-foreground shadow-xs"
          >
            <span>Ver Oficial Tabler</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Grid with all 7 official Tabler Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* CARD 1: Basic */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold">Basic</CardTitle>
              <CardDescription className="text-xs">
                Add <code>.text-shimmer</code> to a short label that reports work in progress.
              </CardDescription>
            </div>
            <button
              onClick={() => handleCopy('<span class="text-shimmer">Thinking…</span>', 'c1')}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === 'c1' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-col gap-2.5 text-sm text-foreground">
              <span className="text-shimmer-sweep font-medium">Thinking…</span>
              <span className="text-shimmer-sweep font-medium">Indexing files…</span>
              <span className="text-shimmer-sweep font-medium">Generating summary…</span>
            </div>
          </CardContent>
        </Card>

        {/* CARD 2: With a loader */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold">With a loader</CardTitle>
              <CardDescription className="text-xs">
                Put an empty <code>.text-shimmer-loader</code> before the label.
              </CardDescription>
            </div>
            <button
              onClick={() => handleCopy('<span class="text-shimmer"><span class="text-shimmer-loader"></span> Thinking…</span>', 'c2')}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === 'c2' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-col gap-2.5 text-sm text-foreground">
              <span className="text-shimmer-sweep font-medium flex items-center gap-2">
                <span className="text-shimmer-loader-spinner" />
                <span>Thinking…</span>
              </span>
              <span className="text-shimmer-sweep font-medium flex items-center gap-2">
                <span className="text-shimmer-loader-spinner" />
                <span>Indexing files…</span>
              </span>
              <span className="text-shimmer-sweep font-medium flex items-center gap-2">
                <span className="text-shimmer-loader-spinner" />
                <span>Generating summary…</span>
              </span>
            </div>
          </CardContent>
        </Card>

        {/* CARD 3: Colors */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold">Colors</CardTitle>
              <CardDescription className="text-xs">
                The text keeps its own color, so any text utility works.
              </CardDescription>
            </div>
            <button
              onClick={() => handleCopy('<span class="text-shimmer text-primary">Thinking…</span>', 'c3')}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === 'c3' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-col gap-2.5 text-sm font-medium">
              <span className="text-shimmer-sweep text-foreground">Thinking… (Default)</span>
              <span className="text-shimmer-sweep text-blue-600 dark:text-blue-400">Thinking… (Primary)</span>
              <span className="text-shimmer-sweep text-emerald-600 dark:text-emerald-400">Thinking… (Green)</span>
              <span className="text-shimmer-sweep text-red-600 dark:text-red-400">Thinking… (Red)</span>
              <span className="text-shimmer-sweep text-purple-600 dark:text-purple-400">Thinking… (Purple)</span>
              <span className="text-shimmer-sweep text-sky-500">Thinking… (Azure)</span>
            </div>
          </CardContent>
        </Card>

        {/* CARD 4: Sizes */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold">Sizes</CardTitle>
              <CardDescription className="text-xs">
                The shimmer follows the font size automatically.
              </CardDescription>
            </div>
            <button
              onClick={() => handleCopy('<span class="text-shimmer small">Thinking…</span>\n<h1 class="text-shimmer">Thinking…</h1>', 'c4')}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === 'c4' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-col gap-3 text-foreground">
              <span className="text-shimmer-sweep text-xs font-medium">Thinking… (Small)</span>
              <span className="text-shimmer-sweep text-sm font-medium">Thinking… (Default)</span>
              <span className="text-shimmer-sweep text-xl font-bold tracking-tight">Thinking… (H3)</span>
              <span className="text-shimmer-sweep text-2xl font-black tracking-tight">Thinking… (H1)</span>
            </div>
          </CardContent>
        </Card>

        {/* CARD 5: Speed */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Sliders className="w-4 h-4 text-primary" />
                <span>Speed</span>
              </CardTitle>
              <CardDescription className="text-xs">
                Set <code>--tblr-text-shimmer-duration</code> to change sweep speed.
              </CardDescription>
            </div>
            <button
              onClick={() => handleCopy('style="--shimmer-duration: 1.5s;"', 'c5')}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === 'c5' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="flex flex-col gap-2">
              <span
                className="text-shimmer-sweep text-sm font-semibold text-foreground"
                style={{ "--shimmer-duration": `${speed}s` } as React.CSSProperties}
              >
                Thinking… (Velocidade atual: {speed}s)
              </span>
            </div>

            <div className="space-y-2 pt-2 border-t border-border">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Rápido (0.8s)</span>
                <span>Normal (2s)</span>
                <span>Lento (4s)</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="4"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
            </div>
          </CardContent>
        </Card>

        {/* CARD 6: Contrast */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold">Contrast</CardTitle>
              <CardDescription className="text-xs">
                Set <code>--tblr-text-shimmer-opacity</code> to dim text between sweeps.
              </CardDescription>
            </div>
            <button
              onClick={() => handleCopy('style="--shimmer-opacity: 0.5;"', 'c6')}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === 'c6' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="flex flex-col gap-2">
              <span
                className="text-shimmer-sweep text-sm font-semibold text-foreground"
                style={{ opacity } as React.CSSProperties}
              >
                Thinking… (Opacidade: {Math.round(opacity * 100)}%)
              </span>
            </div>

            <div className="space-y-2 pt-2 border-t border-border">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Escuro (0.2)</span>
                <span>Médio (0.5)</span>
                <span>Suave (0.9)</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="1"
                step="0.05"
                value={opacity}
                onChange={(e) => setOpacity(parseFloat(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
            </div>
          </CardContent>
        </Card>

        {/* CARD 7: In a chat */}
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                <span>In a chat (Tabler & Agente RAG Interativo)</span>
              </CardTitle>
              <CardDescription className="text-xs">
                A shimmering label stands in for the reply until it arrives. Envie uma mensagem para testar a resposta ao vivo.
              </CardDescription>
            </div>
            <button
              onClick={() =>
                handleCopy(
                  `<div class="d-flex align-items-center gap-2">\n  <span class="avatar avatar-xs">AI</span>\n  <span class="text-shimmer"><span class="text-shimmer-loader"></span> Thinking…</span>\n</div>`,
                  "c7"
                )
              }
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === 'c7' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            {/* Chat Box */}
            <div className="rounded-xl border border-border bg-muted/20 p-4 space-y-4 max-h-72 overflow-y-auto">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 text-xs ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "ai" && (
                    <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-[10px] shrink-0 shadow-xs">
                      AI
                    </div>
                  )}

                  <div
                    className={`max-w-md p-3 rounded-2xl ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-card border border-border text-foreground rounded-bl-none shadow-xs"
                    }`}
                  >
                    {msg.isStreaming ? (
                      <span className="text-shimmer-sweep font-semibold flex items-center gap-2">
                        <span className="text-shimmer-loader-spinner" />
                        <span>{msg.text}</span>
                      </span>
                    ) : (
                      <p className="leading-relaxed">{msg.text}</p>
                    )}
                  </div>

                  {msg.sender === "user" && (
                    <div className="w-7 h-7 rounded-full bg-zinc-300 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 flex items-center justify-center font-bold text-[10px] shrink-0">
                      DV
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Pergunte algo ao Agente RAG (ex: Verificar habite-se da Cobertura 402)..."
                className="flex-1 text-xs px-3 py-2 bg-background border border-border rounded-lg focus:outline-hidden focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90 transition-colors cursor-pointer shadow-xs"
              >
                <span>Enviar</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
