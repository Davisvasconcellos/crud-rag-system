"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Download,
  Copy,
  Check,
  Filter,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Layers,
  Info,
  CheckSquare,
  Square,
  Eye,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface CoasterItem {
  id: string;
  name: string;
  city: string;
  type: string;
  score: number; // e.g. 100.0, 99.3
  scoreText: string;
  dateTimestamp: number;
  dateText: string;
  quantity: number;
  progress: number;
}

const TABLER_DATA: CoasterItem[] = [
  {
    id: "1",
    name: "Steel Vengeance",
    city: "Cedar Point, United States",
    type: "RMC Hybrid",
    score: 100.0,
    scoreText: "100,0%",
    dateTimestamp: 1733619399,
    dateText: "December 08, 2024",
    quantity: 74,
    progress: 30,
  },
  {
    id: "2",
    name: "Fury 325",
    city: "Carowinds, United States",
    type: "B&M Giga, Hyper, Steel",
    score: 99.3,
    scoreText: "99,3%",
    dateTimestamp: 1704067200,
    dateText: "January 01, 2024",
    quantity: 1,
    progress: 0,
  },
  {
    id: "3",
    name: "Wildfire",
    city: "Kolmården Sweden",
    type: "RMC Twister, Wooden, Terrain",
    score: 99.3,
    scoreText: "99,3%",
    dateTimestamp: 1704067200,
    dateText: "January 01, 2024",
    quantity: 1,
    progress: 0,
  },
  {
    id: "4",
    name: "Lightning Rod",
    city: "Dollywood, United States",
    type: "RMC Wooden",
    score: 99.1,
    scoreText: "99,1%",
    dateTimestamp: 1725193849,
    dateText: "September 01, 2024",
    quantity: 104,
    progress: 98,
  },
  {
    id: "5",
    name: "Maverick",
    city: "Cedar Point, United States",
    type: "Intamin Rocket, Steel",
    score: 99.1,
    scoreText: "99,1%",
    dateTimestamp: 1704067200,
    dateText: "January 01, 2024",
    quantity: 1,
    progress: 0,
  },
  {
    id: "6",
    name: "El Toro",
    city: "Six Flags Great Adventure, United States",
    type: "Intamin Twister, Wooden",
    score: 99.0,
    scoreText: "99,0%",
    dateTimestamp: 1721234767,
    dateText: "July 17, 2024",
    quantity: 130,
    progress: 29,
  },
  {
    id: "7",
    name: "Twisted Colossus",
    city: "Six Flags Magic Mountain, United States",
    type: "RMC Hybrid",
    score: 98.9,
    scoreText: "98,9%",
    dateTimestamp: 1732298724,
    dateText: "November 22, 2024",
    quantity: 30,
    progress: 57,
  },
  {
    id: "8",
    name: "Eejanaika new",
    city: "Fuji-Q Highland, Japan",
    type: "S&S Power 4th Dimension, Steel",
    score: 98.6,
    scoreText: "98,6%",
    dateTimestamp: 1732869437,
    dateText: "November 29, 2024",
    quantity: 162,
    progress: 91,
  },
  {
    id: "9",
    name: "Wicked Cyclone",
    city: "Six Flags New England, United States",
    type: "RMC Hybrid",
    score: 98.2,
    scoreText: "98,2%",
    dateTimestamp: 1717088999,
    dateText: "May 30, 2024",
    quantity: 174,
    progress: 3,
  },
  {
    id: "10",
    name: "Shambhala",
    city: "Port Aventura, Spain",
    type: "B&M Hyper, Steel",
    score: 98.2,
    scoreText: "98,2%",
    dateTimestamp: 1704067200,
    dateText: "January 01, 2024",
    quantity: 1,
    progress: 0,
  },
  {
    id: "11",
    name: "Taron",
    city: "Phantasialand, Germany",
    type: "Intamin Sit Down, Steel",
    score: 98.2,
    scoreText: "98,2%",
    dateTimestamp: 1724996222,
    dateText: "August 30, 2024",
    quantity: 130,
    progress: 48,
  },
  {
    id: "12",
    name: "Expedition Ge Force",
    city: "Holiday Park, Germany",
    type: "Intamin Megacoaster, Steel",
    score: 98.2,
    scoreText: "98,2%",
    dateTimestamp: 1704067200,
    dateText: "January 01, 2024",
    quantity: 1,
    progress: 0,
  },
  {
    id: "13",
    name: "Storm Chaser",
    city: "Kentucky Kingdom, United States",
    type: "RMC Steel",
    score: 97.9,
    scoreText: "97,9%",
    dateTimestamp: 1726224515,
    dateText: "September 13, 2024",
    quantity: 43,
    progress: 42,
  },
  {
    id: "14",
    name: "Helix",
    city: "Liseberg, Sweden",
    type: "Mack Looper, Steel, Terrain",
    score: 97.9,
    scoreText: "97,9%",
    dateTimestamp: 1707385463,
    dateText: "February 08, 2024",
    quantity: 151,
    progress: 54,
  },
  {
    id: "15",
    name: "Outlaw Run",
    city: "Silver Dollar City, United States",
    type: "RMC Hybrid",
    score: 96.6,
    scoreText: "96,6%",
    dateTimestamp: 1718595501,
    dateText: "June 17, 2024",
    quantity: 131,
    progress: 64,
  },
];

type SortKey = "name" | "city" | "type" | "score" | "date" | "quantity" | "progress";
type SortDirection = "asc" | "desc" | null;

export function TablerDatatables() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(null);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  // Sorting toggle
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      if (sortDir === "asc") setSortDir("desc");
      else if (sortDir === "desc") {
        setSortKey(null);
        setSortDir(null);
      }
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  // Filtered & Sorted Data
  const processedData = useMemo(() => {
    let result = [...TABLER_DATA];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.city.toLowerCase().includes(q) ||
          item.type.toLowerCase().includes(q) ||
          item.scoreText.toLowerCase().includes(q) ||
          item.dateText.toLowerCase().includes(q)
      );
    }

    if (typeFilter !== "all") {
      result = result.filter((item) =>
        item.type.toLowerCase().includes(typeFilter.toLowerCase())
      );
    }

    if (sortKey && sortDir) {
      result.sort((a, b) => {
        let valA: string | number = 0;
        let valB: string | number = 0;

        switch (sortKey) {
          case "name":
            valA = a.name.toLowerCase();
            valB = b.name.toLowerCase();
            break;
          case "city":
            valA = a.city.toLowerCase();
            valB = b.city.toLowerCase();
            break;
          case "type":
            valA = a.type.toLowerCase();
            valB = b.type.toLowerCase();
            break;
          case "score":
            valA = a.score;
            valB = b.score;
            break;
          case "date":
            valA = a.dateTimestamp;
            valB = b.dateTimestamp;
            break;
          case "quantity":
            valA = a.quantity;
            valB = b.quantity;
            break;
          case "progress":
            valA = a.progress;
            valB = b.progress;
            break;
        }

        if (valA < valB) return sortDir === "asc" ? -1 : 1;
        if (valA > valB) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [search, typeFilter, sortKey, sortDir]);

  // Pagination
  const totalPages = Math.ceil(processedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return processedData.slice(start, start + pageSize);
  }, [processedData, currentPage, pageSize]);

  // Selection
  const allPageSelected =
    paginatedData.length > 0 &&
    paginatedData.every((item) => selectedIds.includes(item.id));

  const toggleSelectAllPage = () => {
    if (allPageSelected) {
      setSelectedIds((prev) =>
        prev.filter((id) => !paginatedData.some((item) => item.id === id))
      );
    } else {
      const pageIds = paginatedData.map((item) => item.id);
      setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])));
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const exportCSV = () => {
    const headers = ["Name", "City", "Type", "Score", "Date", "Quantity", "Progress"];
    const rows = processedData.map((d) => [
      `"${d.name}"`,
      `"${d.city}"`,
      `"${d.type}"`,
      `"${d.scoreText}"`,
      `"${d.dateText}"`,
      d.quantity,
      `"${d.progress}%"`,
    ]);
    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "tabler_datatables_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV exportado com sucesso!");
  };

  const copyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(processedData, null, 2));
    setCopied(true);
    toast.success("Dados copiados em formato JSON!");
    setTimeout(() => setCopied(false), 2000);
  };

  const renderSortIcon = (key: SortKey) => {
    if (sortKey !== key) {
      return <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground/50 opacity-60 ml-1 inline" />;
    }
    if (sortDir === "asc") {
      return <ArrowUp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 ml-1 inline" />;
    }
    return <ArrowDown className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 ml-1 inline" />;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card border border-border/70 rounded-xl p-5 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-foreground">Datatables Plugin</h1>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
              List.js & Tables
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Tabela interativa oficial do Tabler com ordenação multiclasse, busca instantânea em tempo real, paginação responsiva e barras de progresso.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={copyJSON}
            className="text-xs h-9 gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            Copiar JSON
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={exportCSV}
            className="text-xs h-9 gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Exportar CSV
          </Button>

          <a
            href="https://preview.tabler.io/datatables.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-xs"
          >
            Preview Tabler
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-card border border-border/70 rounded-xl p-3.5">
          <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            Total de Registros
          </div>
          <div className="text-xl font-bold text-foreground mt-0.5">{TABLER_DATA.length}</div>
          <div className="text-[11px] text-muted-foreground mt-0.5">Roller coasters cadastradas</div>
        </div>

        <div className="bg-card border border-border/70 rounded-xl p-3.5">
          <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            Registros Filtrados
          </div>
          <div className="text-xl font-bold text-blue-600 dark:text-blue-400 mt-0.5">
            {processedData.length}
          </div>
          <div className="text-[11px] text-muted-foreground mt-0.5">Visíveis na exibição</div>
        </div>

        <div className="bg-card border border-border/70 rounded-xl p-3.5">
          <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            Média de Pontuação
          </div>
          <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
            {(
              processedData.reduce((acc, curr) => acc + curr.score, 0) /
              (processedData.length || 1)
            ).toFixed(1)}
            %
          </div>
          <div className="text-[11px] text-muted-foreground mt-0.5">Satisfação calculada</div>
        </div>

        <div className="bg-card border border-border/70 rounded-xl p-3.5">
          <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            Linhas Selecionadas
          </div>
          <div className="text-xl font-bold text-purple-600 dark:text-purple-400 mt-0.5">
            {selectedIds.length}
          </div>
          <div className="text-[11px] text-muted-foreground mt-0.5">Para ações em lote</div>
        </div>
      </div>

      {/* Main Sortable Table Card - Tabler Replica */}
      <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden">
        {/* Card Header matching Tabler official */}
        <div className="p-4 sm:p-5 border-b border-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-foreground">Sortable table</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Click a column header to sort the rows by that value.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Filter Pills */}
            <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-lg border border-border/50 text-xs">
              <button
                onClick={() => {
                  setTypeFilter("all");
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  typeFilter === "all"
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                All
              </button>
              <button
                onClick={() => {
                  setTypeFilter("RMC");
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  typeFilter === "RMC"
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                RMC
              </button>
              <button
                onClick={() => {
                  setTypeFilter("Intamin");
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  typeFilter === "Intamin"
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Intamin
              </button>
              <button
                onClick={() => {
                  setTypeFilter("B&M");
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  typeFilter === "B&M"
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                B&M
              </button>
            </div>

            {/* Compact Mode Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCompact(!isCompact)}
              className="text-xs h-8 px-2.5"
            >
              {isCompact ? "Normal" : "Compacto"}
            </Button>
          </div>
        </div>

        {/* Toolbar: Search & Per Page */}
        <div className="p-3.5 bg-muted/20 border-b border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search coaster, city, type or date..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>Show</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              aria-label="Records per page"
              className="py-1 px-2.5 rounded-md border border-border bg-background text-xs text-foreground font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15 (All)</option>
            </select>
            <span>entries</span>
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border/80 bg-muted/40 text-muted-foreground">
                <th className="py-3 px-3.5 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={allPageSelected}
                    onChange={toggleSelectAllPage}
                    className="rounded border-border text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                    aria-label="Select all rows on page"
                  />
                </th>
                <th className="py-3 px-3.5 font-semibold text-foreground">
                  <button
                    onClick={() => handleSort("name")}
                    className="flex items-center gap-1 hover:text-blue-600 transition-colors uppercase tracking-wider text-[11px]"
                  >
                    Name
                    {renderSortIcon("name")}
                  </button>
                </th>
                <th className="py-3 px-3.5 font-semibold text-foreground">
                  <button
                    onClick={() => handleSort("city")}
                    className="flex items-center gap-1 hover:text-blue-600 transition-colors uppercase tracking-wider text-[11px]"
                  >
                    City
                    {renderSortIcon("city")}
                  </button>
                </th>
                <th className="py-3 px-3.5 font-semibold text-foreground">
                  <button
                    onClick={() => handleSort("type")}
                    className="flex items-center gap-1 hover:text-blue-600 transition-colors uppercase tracking-wider text-[11px]"
                  >
                    Type
                    {renderSortIcon("type")}
                  </button>
                </th>
                <th className="py-3 px-3.5 font-semibold text-foreground">
                  <button
                    onClick={() => handleSort("score")}
                    className="flex items-center gap-1 hover:text-blue-600 transition-colors uppercase tracking-wider text-[11px]"
                  >
                    Score
                    {renderSortIcon("score")}
                  </button>
                </th>
                <th className="py-3 px-3.5 font-semibold text-foreground">
                  <button
                    onClick={() => handleSort("date")}
                    className="flex items-center gap-1 hover:text-blue-600 transition-colors uppercase tracking-wider text-[11px]"
                  >
                    Date
                    {renderSortIcon("date")}
                  </button>
                </th>
                <th className="py-3 px-3.5 font-semibold text-foreground">
                  <button
                    onClick={() => handleSort("quantity")}
                    className="flex items-center gap-1 hover:text-blue-600 transition-colors uppercase tracking-wider text-[11px]"
                  >
                    Quantity
                    {renderSortIcon("quantity")}
                  </button>
                </th>
                <th className="py-3 px-3.5 font-semibold text-foreground">
                  <button
                    onClick={() => handleSort("progress")}
                    className="flex items-center gap-1 hover:text-blue-600 transition-colors uppercase tracking-wider text-[11px]"
                  >
                    Progress
                    {renderSortIcon("progress")}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-muted-foreground">
                    <p className="text-sm font-medium">Nenhum resultado encontrado.</p>
                    <p className="text-xs mt-1">Tente ajustar seus termos de busca ou filtros.</p>
                  </td>
                </tr>
              ) : (
                paginatedData.map((item) => {
                  const isSelected = selectedIds.includes(item.id);
                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-muted/40 transition-colors ${
                        isSelected ? "bg-blue-50/60 dark:bg-blue-950/20" : ""
                      }`}
                    >
                      <td className="py-2.5 px-3.5 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectRow(item.id)}
                          className="rounded border-border text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                          aria-label={`Select row for ${item.name}`}
                        />
                      </td>

                      {/* Name */}
                      <td className={`font-semibold text-foreground whitespace-nowrap ${isCompact ? "py-1.5 px-3.5" : "py-3 px-3.5"}`}>
                        {item.name}
                      </td>

                      {/* City */}
                      <td className={`text-muted-foreground whitespace-nowrap ${isCompact ? "py-1.5 px-3.5" : "py-3 px-3.5"}`}>
                        {item.city}
                      </td>

                      {/* Type */}
                      <td className={`whitespace-nowrap ${isCompact ? "py-1.5 px-3.5" : "py-3 px-3.5"}`}>
                        <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-muted text-foreground border border-border/50">
                          {item.type}
                        </span>
                      </td>

                      {/* Score */}
                      <td className={`font-semibold text-foreground tabular-nums whitespace-nowrap ${isCompact ? "py-1.5 px-3.5" : "py-3 px-3.5"}`}>
                        {item.scoreText}
                      </td>

                      {/* Date */}
                      <td className={`text-muted-foreground whitespace-nowrap tabular-nums ${isCompact ? "py-1.5 px-3.5" : "py-3 px-3.5"}`}>
                        {item.dateText}
                      </td>

                      {/* Quantity */}
                      <td className={`font-medium text-foreground tabular-nums whitespace-nowrap ${isCompact ? "py-1.5 px-3.5" : "py-3 px-3.5"}`}>
                        {item.quantity}
                      </td>

                      {/* Progress bar matching Tabler official */}
                      <td className={`whitespace-nowrap ${isCompact ? "py-1.5 px-3.5" : "py-3 px-3.5"}`}>
                        <div className="flex items-center gap-2.5">
                          <span className="w-8 text-[11px] text-muted-foreground tabular-nums">
                            {item.progress}%
                          </span>
                          <div className="w-20 sm:w-24 bg-muted rounded-full h-1.5 overflow-hidden border border-border/40">
                            <div
                              className="bg-blue-600 h-full rounded-full transition-all duration-300"
                              style={{ width: `${item.progress}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Card Footer: Pagination Controls */}
        <div className="p-3.5 sm:p-4 border-t border-border/70 bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {processedData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-foreground">
              {Math.min(currentPage * pageSize, processedData.length)}
            </span>{" "}
            of <span className="font-semibold text-foreground">{processedData.length}</span> entries
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="h-8 px-2.5 text-xs gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Prev
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-md text-xs font-semibold transition-colors ${
                    currentPage === page
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="h-8 px-2.5 text-xs gap-1"
            >
              Next
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Code Snippet Card */}
      <div className="bg-card border border-border/80 rounded-xl p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-bold text-foreground">Como funciona no Tabler</h3>
        </div>
        <p className="text-xs text-muted-foreground">
          O Tabler usa o List.js para fornecer ordenação rápida e busca no cliente sem dependências pesadas. O botão de ordenação no cabeçalho dispara o evento <code>new List(tableId, &#123; sortClass, listClass, valueNames &#125;)</code>.
        </p>
        <pre className="p-3 bg-muted/60 border border-border rounded-lg text-[11px] font-mono text-muted-foreground overflow-x-auto">
{`const list = new List('table-default', {
  sortClass: 'table-sort',
  listClass: 'table-tbody',
  valueNames: ['sort-name', 'sort-type', 'sort-city', 'sort-score', { attr: 'data-date', name: 'sort-date' }, { attr: 'data-progress', name: 'sort-progress' }, 'sort-quantity']
});`}
        </pre>
      </div>
    </div>
  );
}
