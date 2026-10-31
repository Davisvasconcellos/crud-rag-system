"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Copy, Check, CheckCircle2, AlertCircle, Clock, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export function TablerDatagrid() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast.success(`Copiado para a área de transferência: ${text}`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* 1. Description list */}
      <Card>
        <CardHeader>
          <CardTitle>Description list</CardTitle>
          <CardDescription>
            Use <code className="font-mono text-xs px-1 rounded bg-zinc-100 dark:bg-zinc-800">dl</code>, <code className="font-mono text-xs px-1 rounded bg-zinc-100 dark:bg-zinc-800">dt</code> and <code className="font-mono text-xs px-1 rounded bg-zinc-100 dark:bg-zinc-800">dd</code> so screen readers announce the pairs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            <div>
              <dt className="text-xs text-zinc-500 font-medium">Registrar</dt>
              <dd className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-1">Third Parties, Inc.</dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-500 font-medium">Port number</dt>
              <dd className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-1">3306</dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-500 font-medium">Creator</dt>
              <dd className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-1 flex items-center gap-1.5">
                <span className="h-5 w-5 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold">
                  PK
                </span>
                Paweł Kuna
              </dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-500 font-medium">Edge network</dt>
              <dd className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-1">
                <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Active
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-500 font-medium">Expiration date</dt>
              <dd className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-1">October 24, 2026</dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-500 font-medium">Status</dt>
              <dd className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-1">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                  Verified
                </span>
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      {/* Grid: Narrow columns & Compact gap */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 2. Narrow columns */}
        <Card>
          <CardHeader>
            <CardTitle>Narrow columns</CardTitle>
            <CardDescription>
              Lower item width to fit more columns in a single row.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <div className="text-xs text-zinc-500">Tier</div>
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">Enterprise</div>
              </div>
              <div>
                <div className="text-xs text-zinc-500">Region</div>
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">sa-east-1</div>
              </div>
              <div>
                <div className="text-xs text-zinc-500">Latency</div>
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">14ms</div>
              </div>
              <div>
                <div className="text-xs text-zinc-500">Backups</div>
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">Hourly</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3. Compact gap */}
        <Card>
          <CardHeader>
            <CardTitle>Compact gap</CardTitle>
            <CardDescription>Lower padding to bring the items closer together.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-1">
              <div className="p-2 rounded bg-zinc-50 dark:bg-zinc-800/40">
                <div className="text-[11px] text-zinc-500">Memory</div>
                <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">16 GB DDR5</div>
              </div>
              <div className="p-2 rounded bg-zinc-50 dark:bg-zinc-800/40">
                <div className="text-[11px] text-zinc-500">CPUs</div>
                <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">8 vCPUs</div>
              </div>
              <div className="p-2 rounded bg-zinc-50 dark:bg-zinc-800/40">
                <div className="text-[11px] text-zinc-500">Storage</div>
                <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">512 GB NVMe</div>
              </div>
              <div className="p-2 rounded bg-zinc-50 dark:bg-zinc-800/40">
                <div className="text-[11px] text-zinc-500">Uptime</div>
                <div className="text-xs font-bold text-emerald-600 mt-0.5">99.98%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grid: Horizontal & Horizontal in columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 4. Horizontal */}
        <Card>
          <CardHeader>
            <CardTitle>Horizontal</CardTitle>
            <CardDescription>
              Add <code className="font-mono text-xs px-1 rounded bg-zinc-100 dark:bg-zinc-800">.datagrid-horizontal</code> to put the label beside the value.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2.5">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/60 pb-2">
              <span className="text-xs text-zinc-500">Organization:</span>
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">MSF Imóveis Corporate</span>
            </div>
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/60 pb-2">
              <span className="text-xs text-zinc-500">Billing Cycle:</span>
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Annual (Renews in Dec)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-500">Primary Contact:</span>
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">davis.vasconcellos@msf.com</span>
            </div>
          </CardContent>
        </Card>

        {/* 5. Horizontal in columns */}
        <Card>
          <CardHeader>
            <CardTitle>Horizontal in columns</CardTitle>
            <CardDescription>Two pairs per row aligned horizontally.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-2 rounded bg-zinc-50 dark:bg-zinc-800/40">
              <span className="text-xs text-zinc-500">Protocol:</span>
              <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">HTTPS / TLS 1.3</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-zinc-50 dark:bg-zinc-800/40">
              <span className="text-xs text-zinc-500">DNSSEC:</span>
              <span className="text-xs font-bold text-emerald-600">Enabled</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-zinc-50 dark:bg-zinc-800/40">
              <span className="text-xs text-zinc-500">CDN:</span>
              <span className="text-xs font-bold text-blue-600">Cloudflare Enterprise</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-zinc-50 dark:bg-zinc-800/40">
              <span className="text-xs text-zinc-500">WAF:</span>
              <span className="text-xs font-bold text-emerald-600">Active</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grid: Single column, Two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 6. Single column */}
        <Card>
          <CardHeader>
            <CardTitle>Single column</CardTitle>
            <CardDescription>
              Add <code className="font-mono text-xs px-1 rounded bg-zinc-100 dark:bg-zinc-800">.datagrid-cols-1</code> to stack the items.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="text-xs text-zinc-500">Database Engine</div>
              <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">PostgreSQL 16.2 with pgvector</div>
            </div>
            <div>
              <div className="text-xs text-zinc-500">Connection String</div>
              <div className="text-xs font-mono text-zinc-700 dark:text-zinc-300 mt-0.5 bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded">
                postgresql://postgres:***@localhost:5432/rag_imob
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 7. Two columns */}
        <Card>
          <CardHeader>
            <CardTitle>Two columns</CardTitle>
            <CardDescription>
              Add <code className="font-mono text-xs px-1 rounded bg-zinc-100 dark:bg-zinc-800">.datagrid-cols-2</code> to keep two columns at any width.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-zinc-500">Embedding Model</div>
              <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">text-embedding-3-small</div>
            </div>
            <div>
              <div className="text-xs text-zinc-500">Vector Dimensions</div>
              <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">1536 dims</div>
            </div>
            <div>
              <div className="text-xs text-zinc-500">Chunk Size</div>
              <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">500 tokens</div>
            </div>
            <div>
              <div className="text-xs text-zinc-500">Chunk Overlap</div>
              <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">50 tokens</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 8. Statuses and progress */}
      <Card>
        <CardHeader>
          <CardTitle>Statuses and progress</CardTitle>
          <CardDescription>A value can hold a status, a badge or a progress bar.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-xs text-zinc-500">Sync Status</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Synchronized</span>
              </div>
            </div>

            <div>
              <div className="text-xs text-zinc-500">Vector Indexing</div>
              <div className="mt-1.5 space-y-1">
                <div className="flex justify-between text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                  <span>84%</span>
                  <span className="text-zinc-400">4,280 / 5,100</span>
                </div>
                <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: "84%" }} />
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs text-zinc-500">Security Audit</div>
              <div className="mt-1">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                  Passed (0 vulnerabilities)
                </span>
              </div>
            </div>

            <div>
              <div className="text-xs text-zinc-500">Cluster Health</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">3/3 Nodes Ready</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 9. Domain details */}
      <Card>
        <CardHeader>
          <CardTitle>Domain details</CardTitle>
          <CardDescription>
            Add a clipboard button to let users easily copy key values.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/60 space-y-1">
              <div className="text-xs text-zinc-500">Nameserver 1</div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono font-semibold text-zinc-900 dark:text-zinc-100">
                  ns1.msfimoveis.com.br
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy("ns1.msfimoveis.com.br", "ns1")}
                  className="p-1 rounded text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  title="Copy"
                >
                  {copiedKey === "ns1" ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/60 space-y-1">
              <div className="text-xs text-zinc-500">Nameserver 2</div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono font-semibold text-zinc-900 dark:text-zinc-100">
                  ns2.msfimoveis.com.br
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy("ns2.msfimoveis.com.br", "ns2")}
                  className="p-1 rounded text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  title="Copy"
                >
                  {copiedKey === "ns2" ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/60 space-y-1">
              <div className="text-xs text-zinc-500">Public IP Gateway</div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono font-semibold text-zinc-900 dark:text-zinc-100">
                  187.45.122.90
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy("187.45.122.90", "ip")}
                  className="p-1 rounded text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  title="Copy"
                >
                  {copiedKey === "ip" ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
