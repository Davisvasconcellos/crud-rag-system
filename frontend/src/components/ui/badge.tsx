import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "success"
    | "warning"
    | "info"
    | "destructive";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variantStyles = {
    default:
      "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-transparent",
    secondary:
      "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700",
    outline:
      "text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 bg-transparent",
    success:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/80",
    warning:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/80",
    info:
      "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/80",
    destructive:
      "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/80",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium tracking-tight select-none",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

export function BusinessStatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; variant: BadgeProps["variant"] }> = {
    DISPONIVEL: { label: "Disponível", variant: "success" },
    RESERVADO: { label: "Reservado", variant: "warning" },
    VENDIDO: { label: "Vendido", variant: "info" },
    INATIVO: { label: "Inativo", variant: "secondary" },
    INDEXED: { label: "Indexado no RAG", variant: "success" },
    PROCESSING: { label: "Em Processamento", variant: "warning" },
    PENDING: { label: "Aguardando Ingestão", variant: "secondary" },
    ERROR: { label: "Falha na Indexação", variant: "destructive" },
  };

  const item = map[status] || { label: status, variant: "secondary" };
  return <Badge variant={item.variant}>{item.label}</Badge>;
}
