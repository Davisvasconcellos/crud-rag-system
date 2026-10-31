"use client";

import React, { useState, useRef } from "react";
import {
  UploadCloud,
  File,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  X,
  Trash2,
  Download,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  AlertCircle,
  FileArchive,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: "uploading" | "complete" | "error";
  previewUrl?: string;
  zone: "basic" | "multiple" | "custom";
}

export function TablerDropzone() {
  const [files, setFiles] = useState<UploadedFile[]>([
    {
      id: "demo-1",
      name: "dashboard-analytics-wireframe.png",
      size: 2450000,
      type: "image/png",
      progress: 100,
      status: "complete",
      zone: "basic",
    },
    {
      id: "demo-2",
      name: "financial-report-q3.pdf",
      size: 5800000,
      type: "application/pdf",
      progress: 100,
      status: "complete",
      zone: "multiple",
    },
    {
      id: "demo-3",
      name: "contract-annex-signed.docx",
      size: 1120000,
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      progress: 100,
      status: "complete",
      zone: "multiple",
    },
  ]);

  const [dragOverZone, setDragOverZone] = useState<string | null>(null);

  const basicInputRef = useRef<HTMLInputElement>(null);
  const multipleInputRef = useRef<HTMLInputElement>(null);
  const customInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

  const handleFileDrop = (
    e: React.DragEvent<HTMLDivElement>,
    zone: "basic" | "multiple" | "custom"
  ) => {
    e.preventDefault();
    setDragOverZone(null);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files), zone);
    }
  };

  const handleFileInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    zone: "basic" | "multiple" | "custom"
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(Array.from(e.target.files), zone);
    }
    // reset input value so re-selecting same file triggers change
    e.target.value = "";
  };

  const processFiles = (fileList: File[], zone: "basic" | "multiple" | "custom") => {
    const filesToUpload = zone === "basic" ? [fileList[0]] : fileList;

    const newEntries: UploadedFile[] = filesToUpload.map((f) => ({
      id: Math.random().toString(36).substring(2, 9),
      name: f.name,
      size: f.size,
      type: f.type,
      progress: 0,
      status: "uploading",
      previewUrl: f.type.startsWith("image/") ? URL.createObjectURL(f) : undefined,
      zone,
    }));

    if (zone === "basic") {
      // Replace any existing files in basic zone
      setFiles((prev) => [...prev.filter((item) => item.zone !== "basic"), ...newEntries]);
    } else {
      setFiles((prev) => [...prev, ...newEntries]);
    }

    toast.success(`${filesToUpload.length} arquivo(s) adicionado(s) para upload!`);

    // Simulate upload progress
    newEntries.forEach((entry) => {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 20;
        if (currentProgress >= 100) {
          clearInterval(interval);
          setFiles((prev) =>
            prev.map((item) =>
              item.id === entry.id
                ? { ...item, progress: 100, status: "complete" }
                : item
            )
          );
        } else {
          setFiles((prev) =>
            prev.map((item) =>
              item.id === entry.id
                ? { ...item, progress: currentProgress }
                : item
            )
          );
        }
      }, 150);
    });
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((item) => item.id !== id));
    toast.info("Arquivo removido da lista.");
  };

  const clearAllFiles = () => {
    setFiles([]);
    toast.info("Todos os arquivos foram limpos.");
  };

  const renderFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <ImageIcon className="w-5 h-5 text-purple-500" />;
    if (type.includes("pdf")) return <FileText className="w-5 h-5 text-red-500" />;
    if (type.includes("zip") || type.includes("tar") || type.includes("rar"))
      return <FileArchive className="w-5 h-5 text-amber-500" />;
    return <File className="w-5 h-5 text-blue-500" />;
  };

  const basicFiles = files.filter((f) => f.zone === "basic");
  const multipleFiles = files.filter((f) => f.zone === "multiple");
  const customFiles = files.filter((f) => f.zone === "custom");

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card border border-border/70 rounded-xl p-5 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-foreground">Dropzone Plugin</h1>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
              Drag & Drop Upload
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Área de transferência interativa com suporte a arrastar-e-soltar, visualização instantânea de miniaturas, validação de arquivos e barra de progresso.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {files.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFiles}
              className="text-xs h-9 gap-1.5 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Limpar Todos ({files.length})
            </Button>
          )}

          <a
            href="https://preview.tabler.io/dropzone.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-xs"
          >
            Preview Tabler
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Grid of 3 Official Tabler Dropzones */}
      <div className="space-y-6">
        {/* Card 1: Basic Usage */}
        <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-border/70">
            <h2 className="text-base font-bold text-foreground">Basic Usage</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Drag a file in or click to browse — a single drop target for one upload.
            </p>
          </div>

          <div className="p-5 space-y-4">
            <input
              ref={basicInputRef}
              type="file"
              onChange={(e) => handleFileInputChange(e, "basic")}
              className="hidden"
              id="dropzone-default-file"
            />

            <div
              onClick={() => basicInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOverZone("basic");
              }}
              onDragLeave={() => setDragOverZone(null)}
              onDrop={(e) => handleFileDrop(e, "basic")}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
                dragOverZone === "basic"
                  ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 scale-[0.99]"
                  : "border-border/80 hover:border-blue-400 bg-muted/20 hover:bg-muted/40"
              }`}
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
                <UploadCloud className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">
                Drop file here or click to upload
              </h3>
              <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                Selecione ou solte um arquivo do seu computador para iniciar o envio
              </p>
            </div>

            {/* Basic File List Preview */}
            {basicFiles.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Arquivo enviado:
                </div>
                {basicFiles.map((f) => (
                  <div
                    key={f.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {f.previewUrl ? (
                        <img
                          src={f.previewUrl}
                          alt={f.name}
                          className="w-10 h-10 rounded object-cover border border-border"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded bg-background flex items-center justify-center border border-border">
                          {renderFileIcon(f.type)}
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-foreground truncate max-w-xs">
                          {f.name}
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          {formatFileSize(f.size)} • {f.status === "complete" ? "Pronto" : "Enviando..."}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {f.status === "complete" ? (
                        <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Concluído
                        </span>
                      ) : (
                        <div className="w-20 bg-muted rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-blue-600 h-full rounded-full transition-all duration-200"
                            style={{ width: `${f.progress}%` }}
                          />
                        </div>
                      )}

                      <button
                        onClick={() => removeFile(f.id)}
                        className="text-muted-foreground hover:text-destructive p-1 rounded transition-colors"
                        aria-label="Remover arquivo"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Card 2: Multiple File Upload */}
        <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-border/70">
            <h2 className="text-base font-bold text-foreground">Multiple File Upload</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Accept and preview several files at once from the same drop target.
            </p>
          </div>

          <div className="p-5 space-y-4">
            <input
              ref={multipleInputRef}
              type="file"
              multiple
              onChange={(e) => handleFileInputChange(e, "multiple")}
              className="hidden"
              id="dropzone-multiple-file"
            />

            <div
              onClick={() => multipleInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOverZone("multiple");
              }}
              onDragLeave={() => setDragOverZone(null)}
              onDrop={(e) => handleFileDrop(e, "multiple")}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
                dragOverZone === "multiple"
                  ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 scale-[0.99]"
                  : "border-border/80 hover:border-blue-400 bg-muted/20 hover:bg-muted/40"
              }`}
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
                <UploadCloud className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">
                Drop multiple files here or click to browse
              </h3>
              <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                Envie documentos, planilhas, PDFs ou imagens de forma simultânea
              </p>
            </div>

            {/* Multiple Files Grid Preview */}
            {multipleFiles.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-semibold uppercase tracking-wider">
                    Arquivos nesta área ({multipleFiles.length})
                  </span>
                  <span>
                    Total:{" "}
                    {formatFileSize(
                      multipleFiles.reduce((acc, curr) => acc + curr.size, 0)
                    )}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {multipleFiles.map((f) => (
                    <div
                      key={f.id}
                      className="relative p-3 rounded-lg border border-border bg-muted/30 flex flex-col justify-between gap-2"
                    >
                      <button
                        onClick={() => removeFile(f.id)}
                        className="absolute right-2 top-2 text-muted-foreground hover:text-destructive p-1 rounded transition-colors"
                        aria-label="Remover"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-2.5 min-w-0 pr-6">
                        {f.previewUrl ? (
                          <img
                            src={f.previewUrl}
                            alt={f.name}
                            className="w-8 h-8 rounded object-cover border border-border"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded bg-background flex items-center justify-center border border-border">
                            {renderFileIcon(f.type)}
                          </div>
                        )}
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-foreground truncate">
                            {f.name}
                          </div>
                          <div className="text-[11px] text-muted-foreground">
                            {formatFileSize(f.size)}
                          </div>
                        </div>
                      </div>

                      <div className="pt-1">
                        {f.status === "complete" ? (
                          <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Upload finalizado
                          </div>
                        ) : (
                          <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-indigo-600 h-full rounded-full transition-all duration-200"
                              style={{ width: `${f.progress}%` }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Card 3: Custom Dropzone */}
        <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-border/70">
            <h2 className="text-base font-bold text-foreground">Custom Dropzone</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Swap in your own label and helper text for the drop target.
            </p>
          </div>

          <div className="p-5 space-y-4">
            <input
              ref={customInputRef}
              type="file"
              onChange={(e) => handleFileInputChange(e, "custom")}
              className="hidden"
              id="dropzone-custom-file"
            />

            <div
              onClick={() => customInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOverZone("custom");
              }}
              onDragLeave={() => setDragOverZone(null)}
              onDrop={(e) => handleFileDrop(e, "custom")}
              className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-200 ${
                dragOverZone === "custom"
                  ? "border-purple-500 bg-purple-50/50 dark:bg-purple-950/20 scale-[0.99]"
                  : "border-border/80 hover:border-purple-400 bg-gradient-to-b from-muted/20 to-muted/40 hover:from-muted/40 hover:to-muted/60"
              }`}
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3 shadow-xs">
                <UploadCloud className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-foreground">
                Your text here
              </h3>
              <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                Your custom description here
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background border border-border text-xs font-semibold text-foreground">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                Suporta arrastar arquivos ou clicar
              </div>
            </div>

            {/* Custom files preview */}
            {customFiles.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Arquivo Customizado:
                </div>
                {customFiles.map((f) => (
                  <div
                    key={f.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded bg-background flex items-center justify-center border border-border">
                        {renderFileIcon(f.type)}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-foreground truncate max-w-xs">
                          {f.name}
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          {formatFileSize(f.size)} • {f.status === "complete" ? "Enviado com sucesso" : "Carregando..."}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFile(f.id)}
                      className="text-muted-foreground hover:text-destructive p-1 rounded transition-colors"
                      aria-label="Remover arquivo"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Code Snippet Card */}
      <div className="bg-card border border-border/80 rounded-xl p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <h3 className="text-sm font-bold text-foreground">Inicialização no Tabler</h3>
        </div>
        <p className="text-xs text-muted-foreground">
          O Tabler integra o Dropzone.js permitindo transformar formulários HTML com <code>class="dropzone"</code> em zonas interativas com acessibilidade via teclado.
        </p>
        <pre className="p-3 bg-muted/60 border border-border rounded-lg text-[11px] font-mono text-muted-foreground overflow-x-auto">
{`const myDropzone = new Dropzone("#dropzone-default", {
  url: "/upload-endpoint",
  maxFilesize: 10, // MB
  dictDefaultMessage: "Drop files here to upload",
});`}
        </pre>
      </div>
    </div>
  );
}
