"use client";

import React, { useState, useRef } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  RotateCcw,
  RotateCw,
  Eye,
  FileCode,
  Check,
  Copy,
  ExternalLink,
  Sparkles,
  Save,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function TablerWysiwyg() {
  const [userName, setUserName] = useState("Jane Doe");
  const [contentHtml, setContentHtml] = useState(
    `<p>Hello, <b>Tabler</b>!</p><p>This rich text editor provides a powerful formatting toolbar for headings, bullet points, blockquotes, and links, seamlessly integrated into a standard form layout.</p><ul><li>Zero external bulky dependencies</li><li>Instant HTML markup generator</li><li>Full dark mode support</li></ul>`
  );
  const [viewSource, setViewSource] = useState(false);
  const [copied, setCopied] = useState(false);

  const editorRef = useRef<HTMLDivElement>(null);

  const applyFormat = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setContentHtml(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      setContentHtml(editorRef.current.innerHTML);
    }
  };

  const copyHtml = () => {
    navigator.clipboard.writeText(contentHtml);
    setCopied(true);
    toast.success("Código HTML copiado!");
    setTimeout(() => setCopied(false), 2000);
  };

  const calculateWordCount = () => {
    const text = contentHtml.replace(/<[^>]+>/g, " ").trim();
    return text ? text.split(/\s+/).length : 0;
  };

  const calculateCharCount = () => {
    return contentHtml.replace(/<[^>]+>/g, "").length;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card border border-border/70 rounded-xl p-5 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-foreground">WYSIWYG Editor Plugin</h1>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
              TinyMCE / HugeRTE
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Barra de ferramentas de formatação rica para títulos, listas, links e blocos de citação perfeitamente integrada aos campos de formulário do Tabler.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={copyHtml}
            className="text-xs h-9 gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            Copiar HTML
          </Button>

          <a
            href="https://preview.tabler.io/wysiwyg.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-xs"
          >
            Preview Tabler
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Main Rich text editor Card matching Tabler official */}
      <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-border/70">
          <h2 className="text-base font-bold text-foreground">Rich text editor</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            A formatting toolbar for headings, lists, and links, dropped into a normal form field.
          </p>
        </div>

        <div className="p-5 space-y-4">
          {/* Field 1: Your name */}
          <div>
            <label className="text-xs font-semibold text-foreground block mb-1.5">
              Your name
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Name"
              className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Field 2: Description (WYSIWYG Editor) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-foreground">
                Description
              </label>

              <button
                type="button"
                onClick={() => setViewSource(!viewSource)}
                className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
              >
                {viewSource ? <Eye className="w-3 h-3" /> : <FileCode className="w-3 h-3" />}
                {viewSource ? "Visualizar Editor" : "Ver Código HTML"}
              </button>
            </div>

            <div className="rounded-xl border border-border overflow-hidden bg-background shadow-xs">
              {/* Toolbar */}
              <div className="p-2 border-b border-border bg-muted/30 flex flex-wrap items-center gap-1">
                <button
                  type="button"
                  onClick={() => applyFormat("bold")}
                  className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  title="Negrito (Ctrl+B)"
                >
                  <Bold className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => applyFormat("italic")}
                  className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  title="Itálico (Ctrl+I)"
                >
                  <Italic className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => applyFormat("underline")}
                  className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  title="Sublinhado (Ctrl+U)"
                >
                  <Underline className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => applyFormat("strikeThrough")}
                  className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  title="Tachado"
                >
                  <Strikethrough className="w-3.5 h-3.5" />
                </button>

                <div className="w-px h-4 bg-border mx-1" />

                <button
                  type="button"
                  onClick={() => applyFormat("formatBlock", "<h1>")}
                  className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors text-xs font-bold"
                  title="Heading 1"
                >
                  H1
                </button>
                <button
                  type="button"
                  onClick={() => applyFormat("formatBlock", "<h2>")}
                  className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors text-xs font-bold"
                  title="Heading 2"
                >
                  H2
                </button>
                <button
                  type="button"
                  onClick={() => applyFormat("formatBlock", "<p>")}
                  className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors text-xs font-medium"
                  title="Parágrafo"
                >
                  P
                </button>

                <div className="w-px h-4 bg-border mx-1" />

                <button
                  type="button"
                  onClick={() => applyFormat("insertUnorderedList")}
                  className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  title="Lista com marcadores"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => applyFormat("insertOrderedList")}
                  className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  title="Lista numerada"
                >
                  <ListOrdered className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => applyFormat("formatBlock", "<blockquote>")}
                  className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  title="Citação"
                >
                  <Quote className="w-3.5 h-3.5" />
                </button>

                <div className="w-px h-4 bg-border mx-1" />

                <button
                  type="button"
                  onClick={() => {
                    const url = prompt("Digite a URL do link:");
                    if (url) applyFormat("createLink", url);
                  }}
                  className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  title="Inserir Link"
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => applyFormat("undo")}
                  className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  title="Desfazer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => applyFormat("redo")}
                  className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  title="Refazer"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Editor Workspace Area */}
              {viewSource ? (
                <textarea
                  value={contentHtml}
                  onChange={(e) => setContentHtml(e.target.value)}
                  className="w-full h-56 p-4 font-mono text-xs text-foreground bg-muted/20 border-0 focus:outline-none resize-y"
                />
              ) : (
                <div
                  ref={editorRef}
                  contentEditable
                  onInput={handleInput}
                  dangerouslySetInnerHTML={{ __html: contentHtml }}
                  className="w-full min-h-[220px] p-4 text-xs text-foreground focus:outline-none prose dark:prose-invert max-w-none"
                  style={{ minHeight: "220px" }}
                />
              )}

              {/* Editor Footer: Word & Char Counter */}
              <div className="px-4 py-2 bg-muted/20 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span>{calculateWordCount()} palavras</span>
                  <span>•</span>
                  <span>{calculateCharCount()} caracteres</span>
                </div>
                <span className="font-mono text-[10px]">HTML5 ContentEditable</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setContentHtml("<p>Hello, <b>Tabler</b>!</p>");
                if (editorRef.current) {
                  editorRef.current.innerHTML = "<p>Hello, <b>Tabler</b>!</p>";
                }
                toast.info("Conteúdo resetado para o padrão!");
              }}
              className="text-xs"
            >
              Resetar Conteúdo
            </Button>

            <Button
              type="button"
              size="sm"
              onClick={() => toast.success("Formulário salvo com sucesso!")}
              className="text-xs bg-blue-600 hover:bg-blue-700 text-white gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              Salvar Formulário
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
