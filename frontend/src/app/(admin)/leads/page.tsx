"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Users,
  Plus,
  Phone,
  Mail,
  Calendar,
  ArrowRight,
  MessageSquare,
  Sparkles,
  Search,
  Filter,
  Kanban as KanbanIcon,
  List as ListIcon,
  ChevronDown,
  RefreshCw,
  Clock,
  Star,
  CheckCircle2,
  DollarSign,
  Building2,
  MoreVertical,
  SlidersHorizontal,
  TrendingUp,
  ArrowUpDown,
  MoveVertical,
} from "lucide-react";
import { LeadService, INITIAL_LEADS } from "@/services/lead.service";
import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import type { Lead, LeadStage } from "@/types/lead";
import { toast } from "sonner";

// 5 Estágios do Funil de Vendas (RD Station CRM & Deals Pipeline)
const STAGES: {
  id: LeadStage;
  label: string;
  sublabel: string;
  accentColor: string;
  dotColor: string;
  badgeBg: string;
}[] = [
  {
    id: "NOVO",
    label: "Novo Lead",
    sublabel: "Entrada & Triagem",
    accentColor: "bg-sky-500",
    dotColor: "bg-sky-500",
    badgeBg: "bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300",
  },
  {
    id: "QUALIFICADO",
    label: "Contato Realizado",
    sublabel: "Qualificação & Perfil",
    accentColor: "bg-amber-500",
    dotColor: "bg-amber-500",
    badgeBg: "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
  },
  {
    id: "VISITA_AGENDADA",
    label: "Diagnóstico / Visita",
    sublabel: "Apresentação & Visitas",
    accentColor: "bg-indigo-500",
    dotColor: "bg-indigo-500",
    badgeBg: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300",
  },
  {
    id: "PROPOSTA",
    label: "Proposta Enviada",
    sublabel: "Negociação Comercial",
    accentColor: "bg-emerald-500",
    dotColor: "bg-emerald-500",
    badgeBg: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300",
  },
  {
    id: "FECHADO",
    label: "Negócio Ganho",
    sublabel: "Contrato & Escritura",
    accentColor: "bg-teal-600",
    dotColor: "bg-teal-600",
    badgeBg: "bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300",
  },
];

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBroker, setFilterBroker] = useState("ALL");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [sortBy, setSortBy] = useState<"custom" | "recent" | "value">("custom");

  // Drag and Drop State com Suporte a Reordenação Exata
  const [draggingLeadId, setDraggingLeadId] = useState<string | null>(null);
  const [dragOverStage, setDragOverStage] = useState<LeadStage | null>(null);
  const [dropTarget, setDropTarget] = useState<{
    leadId: string;
    stage: LeadStage;
    position: "before" | "after";
  } | null>(null);

  // Modais
  const [modalOpen, setModalOpen] = useState(false);
  const [taskModalLead, setTaskModalLead] = useState<Lead | null>(null);
  const [newTaskLabel, setNewTaskLabel] = useState("");
  const [newTaskDate, setNewTaskDate] = useState("");

  // Formulário de novo lead
  const [newName, setNewName] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newInterest, setNewInterest] = useState("");
  const [newValue, setNewValue] = useState("");

  async function loadLeads() {
    try {
      const data = await LeadService.list();
      setLeads(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLeads();
  }, []);

  // Filtragem e busca (preserva a ordem manual quando sortBy === 'custom')
  const filteredLeads = useMemo(() => {
    const list = leads.filter((l) => {
      const matchesSearch =
        l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (l.company && l.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (l.propertyInterestTitle &&
          l.propertyInterestTitle.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesBroker =
        filterBroker === "ALL" || l.assignedBrokerName === filterBroker;

      const matchesStatus =
        filterStatus === "ALL" ||
        (filterStatus === "URGENT" && l.nextAction?.isUrgent) ||
        l.statusBadge === filterStatus;

      return matchesSearch && matchesBroker && matchesStatus;
    });

    if (sortBy === "value") {
      return [...list].sort(
        (a, b) => (b.dealValue || b.budgetMax || 0) - (a.dealValue || a.budgetMax || 0)
      );
    }
    if (sortBy === "recent") {
      return [...list].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
    // "custom" -> respeita a ordem exata do array definida pelo usuário no drag and drop
    return list;
  }, [leads, searchQuery, filterBroker, filterStatus, sortBy]);

  // Totais do Pipeline
  const totalDealsCount = filteredLeads.length;
  const totalPipelineValue = useMemo(() => {
    return filteredLeads.reduce((acc, l) => acc + (l.dealValue || l.budgetMax || 0), 0);
  }, [filteredLeads]);

  // Drag and Drop: Início
  const handleDragStart = (e: React.DragEvent, leadId: string, currentStage: LeadStage) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({ leadId, currentStage }));
    e.dataTransfer.effectAllowed = "move";
    setDraggingLeadId(leadId);
  };

  // Drag and Drop: Fim
  const handleDragEnd = () => {
    setDraggingLeadId(null);
    setDragOverStage(null);
    setDropTarget(null);
  };

  // Drag and Drop: Hover sobre a Coluna
  const handleColumnDragOver = (e: React.DragEvent, stageId: LeadStage) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverStage !== stageId) {
      setDragOverStage(stageId);
    }
  };

  const handleColumnDragLeave = (e: React.DragEvent, stageId: LeadStage) => {
    const currentTarget = e.currentTarget as HTMLElement;
    if (!currentTarget.contains(e.relatedTarget as Node)) {
      if (dragOverStage === stageId) {
        setDragOverStage(null);
      }
    }
  };

  // Drag and Drop: Hover sobre um Card específico (para detectar antes/depois)
  const handleCardDragOver = (
    e: React.DragEvent,
    targetLeadId: string,
    targetStage: LeadStage
  ) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";

    if (draggingLeadId === targetLeadId) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const isAfter = e.clientY > rect.top + rect.height / 2;
    const position = isAfter ? "after" : "before";

    if (
      !dropTarget ||
      dropTarget.leadId !== targetLeadId ||
      dropTarget.position !== position
    ) {
      setDropTarget({ leadId: targetLeadId, stage: targetStage, position });
    }
    if (dragOverStage !== targetStage) {
      setDragOverStage(targetStage);
    }
  };

  // Drag and Drop: Soltar sobre um Card específico (Reordenação precisa!)
  const handleCardDrop = async (
    e: React.DragEvent,
    targetLeadId: string,
    targetStage: LeadStage
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const currentDropTarget = dropTarget;
    setDropTarget(null);
    setDragOverStage(null);

    try {
      const rawData = e.dataTransfer.getData("text/plain");
      if (!rawData) return;
      const { leadId: draggedId } = JSON.parse(rawData);

      if (draggedId === targetLeadId) return;

      const draggedLead = leads.find((l) => l.id === draggedId);
      if (!draggedLead) return;

      const remaining = leads.filter((l) => l.id !== draggedId);
      const updatedLead: Lead = { ...draggedLead, stage: targetStage };

      const targetIdx = remaining.findIndex((l) => l.id === targetLeadId);
      if (targetIdx === -1) return;

      const insertIdx =
        currentDropTarget?.position === "after" ? targetIdx + 1 : targetIdx;

      const newLeads = [
        ...remaining.slice(0, insertIdx),
        updatedLead,
        ...remaining.slice(insertIdx),
      ];

      // Muda para ordenação personalizada para que o sort não desfaça o drag do usuário
      if (sortBy !== "custom") {
        setSortBy("custom");
      }

      setLeads(newLeads);

      const targetConfig = STAGES.find((s) => s.id === targetStage);
      const isSameStage = draggedLead.stage === targetStage;

      if (isSameStage) {
        toast.success(`Ordem de "${draggedLead.name}" atualizada em ${targetConfig?.label}!`);
      } else {
        toast.success(`"${draggedLead.name}" posicionado em ${targetConfig?.label}!`);
      }

      await LeadService.updateStage(draggedId, targetStage);
      await LeadService.reorderLeads(newLeads);
    } catch (err) {
      console.error("Drop on card error:", err);
    } finally {
      setDraggingLeadId(null);
    }
  };

  // Drag and Drop: Soltar na Coluna (vai SEMPRE para a PRIMEIRA posição / TOPO da coluna)
  const handleColumnDrop = async (e: React.DragEvent, targetStage: LeadStage) => {
    e.preventDefault();
    setDropTarget(null);
    setDragOverStage(null);

    try {
      const rawData = e.dataTransfer.getData("text/plain");
      if (!rawData) return;
      const { leadId: draggedId } = JSON.parse(rawData);

      const draggedLead = leads.find((l) => l.id === draggedId);
      if (!draggedLead) return;

      const remaining = leads.filter((l) => l.id !== draggedId);
      const updatedLead: Lead = { ...draggedLead, stage: targetStage };

      // Se soltar na coluna, insere no TOPO (primeira posição) daquela etapa
      const firstIdxInTarget = remaining.findIndex((l) => l.stage === targetStage);
      let newLeads: Lead[];
      if (firstIdxInTarget !== -1) {
        newLeads = [
          ...remaining.slice(0, firstIdxInTarget),
          updatedLead,
          ...remaining.slice(firstIdxInTarget),
        ];
      } else {
        newLeads = [updatedLead, ...remaining];
      }

      if (sortBy !== "custom") {
        setSortBy("custom");
      }

      setLeads(newLeads);

      const targetConfig = STAGES.find((s) => s.id === targetStage);
      toast.success(`"${draggedLead.name}" movido para o topo de ${targetConfig?.label}!`);

      await LeadService.updateStage(draggedId, targetStage);
      await LeadService.reorderLeads(newLeads);
    } catch (err) {
      console.error("Drop on column error:", err);
    } finally {
      setDraggingLeadId(null);
    }
  };

  // Avanço rápido por botão (vai para o TOPO da próxima etapa)
  const handleQuickAdvance = async (leadId: string, currentStage: LeadStage) => {
    const stageOrder: LeadStage[] = ["NOVO", "QUALIFICADO", "VISITA_AGENDADA", "PROPOSTA", "FECHADO"];
    const currentIndex = stageOrder.indexOf(currentStage);
    if (currentIndex < stageOrder.length - 1) {
      const nextStage = stageOrder[currentIndex + 1];
      const draggedLead = leads.find((l) => l.id === leadId);
      if (!draggedLead) return;

      const remaining = leads.filter((l) => l.id !== leadId);
      const updatedLead: Lead = { ...draggedLead, stage: nextStage };

      // Insere no TOPO da próxima coluna
      const firstIdxInTarget = remaining.findIndex((l) => l.stage === nextStage);
      let newLeads: Lead[];
      if (firstIdxInTarget !== -1) {
        newLeads = [
          ...remaining.slice(0, firstIdxInTarget),
          updatedLead,
          ...remaining.slice(firstIdxInTarget),
        ];
      } else {
        newLeads = [updatedLead, ...remaining];
      }

      setLeads(newLeads);
      await LeadService.updateStage(leadId, nextStage);
      await LeadService.reorderLeads(newLeads);

      const targetConfig = STAGES.find((s) => s.id === nextStage);
      toast.success(`Avançado para o topo de ${targetConfig?.label}`);
    }
  };

  // Criação de tarefa rápida
  const handleSaveTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskModalLead || !newTaskLabel) return;

    setLeads((prev) =>
      prev.map((l) =>
        l.id === taskModalLead.id
          ? {
              ...l,
              nextAction: {
                type: "TAREFA",
                label: newTaskLabel,
                dateStr: newTaskDate || "Hoje",
                isUrgent: true,
              },
            }
          : l
      )
    );
    toast.success(`Tarefa adicionada para "${taskModalLead.name}"`);
    setTaskModalLead(null);
    setNewTaskLabel("");
    setNewTaskDate("");
  };

  // Criação de novo lead
  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPhone) {
      toast.error("Preencha ao menos o nome e telefone.");
      return;
    }

    const val = parseFloat(newValue.replace(/\D/g, "")) || 350000;

    const created = await LeadService.addLead({
      name: newName,
      company: newCompany || "Negociação Direta",
      phone: newPhone,
      email: newEmail || "contato@cliente.com.br",
      source: "MANUAL",
      stage: "NOVO",
      assignedBrokerName: "Carlos Mendonça",
      propertyInterestTitle: newInterest || "Interesse Geral",
      dealValue: val,
      budgetMax: val,
      statusBadge: "Nova",
      rating: 1,
      nextAction: {
        type: "LIGAR",
        label: "Realizar primeiro contato telefônico",
        dateStr: "Hoje 16:00",
        isUrgent: true,
      },
    });

    setLeads((prev) => [created, ...prev]);
    toast.success("Negociação cadastrada no topo do pipeline!");
    setModalOpen(false);
    setNewName("");
    setNewCompany("");
    setNewPhone("");
    setNewEmail("");
    setNewInterest("");
    setNewValue("");
  };

  return (
    <div className="space-y-4">
      {/* 1. Header do CRM e Funil */}
      <div className="flex flex-col gap-3 pb-2">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Negociações
              </h1>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                Funil de Vendas Imobiliário
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Arraste e solte entre colunas ou reordene a posição dos leads dentro da mesma etapa.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* View Switcher: Kanban vs List */}
            <div className="flex items-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-0.5 shadow-2xs">
              <button
                type="button"
                onClick={() => setViewMode("kanban")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  viewMode === "kanban"
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-2xs"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                }`}
              >
                <KanbanIcon className="h-3.5 w-3.5" />
                <span>Kanban</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  viewMode === "list"
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-2xs"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                }`}
              >
                <ListIcon className="h-3.5 w-3.5" />
                <span>Lista</span>
              </button>
            </div>

            <Button
              onClick={() => setModalOpen(true)}
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-xs"
            >
              <Plus className="h-4 w-4" />
              <span>+ Criar Negociação</span>
            </Button>
          </div>
        </div>

        {/* 2. Barra de Filtros Estilo RD Station CRM & Deals */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 p-2.5 shadow-2xs">
          <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[260px]">
            {/* Search */}
            <div className="relative flex-1 min-w-[180px] max-w-xs">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
              <input
                type="text"
                placeholder="Buscar negociação, empresa ou imóvel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 w-full rounded-lg border border-zinc-200/90 dark:border-zinc-700 bg-zinc-50/70 dark:bg-zinc-800/80 pl-8 pr-3 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* Select Funil */}
            <div className="hidden sm:flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border border-zinc-200/80 dark:border-zinc-700 bg-zinc-50/60 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 font-medium">
              <span>Funil de Vendas (Closer)</span>
              <ChevronDown className="h-3 w-3 text-zinc-400" />
            </div>

            {/* Filtro Status */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="h-8 rounded-lg border border-zinc-200/80 dark:border-zinc-700 bg-zinc-50/60 dark:bg-zinc-800/60 px-2.5 text-xs text-zinc-700 dark:text-zinc-300 font-medium cursor-pointer focus:outline-hidden"
            >
              <option value="ALL">Todos os status</option>
              <option value="Em andamento">Em andamento</option>
              <option value="Nova">Novas</option>
              <option value="URGENT">Com Tarefas Urgentes</option>
              <option value="Vendida">Vendidas / Fechadas</option>
            </select>

            {/* Ordenação - com opção de Ordem Manual (Kanban) */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "custom" | "recent" | "value")}
              className="h-8 rounded-lg border border-zinc-200/80 dark:border-zinc-700 bg-zinc-50/60 dark:bg-zinc-800/60 px-2.5 text-xs text-zinc-700 dark:text-zinc-300 font-medium cursor-pointer focus:outline-hidden"
            >
              <option value="custom">Ordem manual (Kanban)</option>
              <option value="recent">Criadas por último</option>
              <option value="value">Maior valor primeiro</option>
            </select>
          </div>

          {/* Contador de Negociações & Valor Total no Funil */}
          <div className="flex items-center gap-3 text-xs border-t sm:border-t-0 pt-2 sm:pt-0 w-full sm:w-auto justify-between sm:justify-end">
            <span className="font-semibold px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
              {totalDealsCount} Negociações
            </span>
            <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>{formatCurrency(totalPipelineValue)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Modo Kanban: Layout Clean com Drag & Drop de Posição Precisa */}
      {viewMode === "kanban" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3.5 overflow-x-auto pb-4 items-start select-none">
          {STAGES.map((stg) => {
            const stageLeads = filteredLeads.filter((l) => l.stage === stg.id);
            const stageTotalValue = stageLeads.reduce(
              (acc, l) => acc + (l.dealValue || l.budgetMax || 0),
              0
            );
            const isOverThisColumn = dragOverStage === stg.id;

            return (
              <div
                key={stg.id}
                onDragOver={(e) => handleColumnDragOver(e, stg.id)}
                onDragLeave={(e) => handleColumnDragLeave(e, stg.id)}
                onDrop={(e) => handleColumnDrop(e, stg.id)}
                className={`flex flex-col rounded-2xl p-2 sm:p-2.5 min-w-[270px] lg:min-w-0 transition-all duration-200 bg-zinc-100/70 dark:bg-zinc-900/40 border border-transparent ${
                  isOverThisColumn
                    ? "ring-2 ring-emerald-500/60 bg-emerald-50/40 dark:bg-emerald-950/30 shadow-md"
                    : ""
                }`}
              >
                {/* Top Accent Line Color Indicator */}
                <div className={`h-1 w-full rounded-full mb-2.5 ${stg.accentColor}`} />

                {/* Cabeçalho da Coluna Clean */}
                <div className="flex items-center justify-between pb-2 px-1">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate">
                      {stg.label}
                    </span>
                    <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
                      ({stageLeads.length})
                    </span>
                  </div>

                  <span className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 font-mono tracking-tight shrink-0">
                    {formatCurrency(stageTotalValue)}
                  </span>
                </div>

                {/* Subtítulo discreto da etapa */}
                <div className="flex items-center justify-between px-1 mb-2.5 text-[10px] text-zinc-400 uppercase tracking-wider">
                  <span>{stg.sublabel}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setModalOpen(true);
                    }}
                    className="hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                    title={`Adicionar negociação em ${stg.label}`}
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>

                {/* Indicador de soltura no TOPO (quando hover na coluna sem card específico) */}
                {isOverThisColumn && !dropTarget && stageLeads.length > 0 && (
                  <div className="h-8 border-2 border-dashed border-emerald-500/80 bg-emerald-50/70 dark:bg-emerald-950/60 rounded-xl flex items-center justify-center text-[11px] font-bold text-emerald-800 dark:text-emerald-200 animate-in fade-in duration-100 mb-2">
                    ↑ Soltar no topo da etapa
                  </div>
                )}

                {/* Lista de Cards de Negociação com Espaços Super Bem Aproveitados */}
                <div className="space-y-2.5 min-h-[380px] max-h-[750px] overflow-y-auto pr-0.5">
                  {stageLeads.length === 0 ? (
                    <div
                      className={`rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 p-6 text-center text-xs text-zinc-400 transition-colors ${
                        isOverThisColumn
                          ? "bg-emerald-50/50 border-emerald-400 text-emerald-700 dark:bg-emerald-950/40"
                          : ""
                      }`}
                    >
                      {isOverThisColumn
                        ? "Solte a negociação aqui no topo"
                        : "Arraste negociações para cá"}
                    </div>
                  ) : (
                    stageLeads.map((lead) => {
                      const isDraggingThis = draggingLeadId === lead.id;
                      const isDropBefore =
                        dropTarget?.leadId === lead.id && dropTarget.position === "before";
                      const isDropAfter =
                        dropTarget?.leadId === lead.id && dropTarget.position === "after";

                      return (
                        <div key={lead.id} className="relative">
                          {/* Indicador Visual de Inserção Acima do Card */}
                          {isDropBefore && (
                            <div className="h-1.5 w-full bg-emerald-500 rounded-full my-1.5 shadow-sm ring-2 ring-emerald-300 dark:ring-emerald-800 animate-in fade-in zoom-in-95 duration-100" />
                          )}

                          <div
                            draggable
                            onDragStart={(e) => handleDragStart(e, lead.id, stg.id)}
                            onDragEnd={handleDragEnd}
                            onDragOver={(e) => handleCardDragOver(e, lead.id, stg.id)}
                            onDrop={(e) => handleCardDrop(e, lead.id, stg.id)}
                            className={`group relative rounded-xl bg-white dark:bg-zinc-800/90 p-3 sm:p-3.5 shadow-2xs hover:shadow-md transition-all duration-150 cursor-grab active:cursor-grabbing border border-zinc-200/80 dark:border-zinc-700/60 ${
                              isDraggingThis
                                ? "opacity-25 scale-95 ring-2 ring-emerald-500"
                                : "hover:border-zinc-300 dark:hover:border-zinc-600"
                            }`}
                          >
                            {/* Linha 1: Status Pill + Origem / WhatsApp */}
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-teal-700 dark:text-teal-300">
                                <span
                                  className={`h-1.5 w-1.5 rounded-full ${
                                    lead.statusBadge === "Vendida"
                                      ? "bg-emerald-500"
                                      : lead.statusBadge === "Nova"
                                      ? "bg-blue-500"
                                      : "bg-teal-500"
                                  }`}
                                />
                                {lead.statusBadge || "Em andamento"}
                              </span>

                              {lead.source === "WHATSAPP_EVOLUTION" ? (
                                <span
                                  className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[9px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                                  title="Origem: WhatsApp IA Integrado"
                                >
                                  <MessageSquare className="h-2.5 w-2.5" />
                                  WA
                                </span>
                              ) : (
                                <span className="text-[10px] font-medium text-zinc-400">
                                  {lead.source === "PORTAL_ZAP"
                                    ? "ZAP"
                                    : lead.source === "SITE"
                                    ? "Site"
                                    : "Indicação"}
                                </span>
                              )}
                            </div>

                            {/* Linha 2: Título do Lead / Contato */}
                            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-snug tracking-tight">
                              {lead.name}
                            </h4>

                            {/* Linha 3: Empresa ou Imóvel de Interesse */}
                            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium line-clamp-1 mt-0.5">
                              {lead.company ? (
                                <span>{lead.company}</span>
                              ) : (
                                <span>{lead.propertyInterestTitle}</span>
                              )}
                            </p>

                            {/* Linha 4: Avaliação / Prioridade + Valor da Negociação */}
                            <div className="mt-2.5 flex items-center justify-between text-xs pt-2 border-t border-zinc-100 dark:border-zinc-700/60">
                              <div className="flex items-center gap-2">
                                <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
                                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                  <span>{lead.rating || 1}</span>
                                </span>
                                <span
                                  className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-700 text-[10px] font-bold text-zinc-600 dark:text-zinc-300"
                                  title={`Corretor: ${lead.assignedBrokerName}`}
                                >
                                  {lead.assignedBrokerName.charAt(0)}
                                </span>
                              </div>

                              <span className="font-bold font-mono text-zinc-900 dark:text-zinc-100">
                                {formatCurrency(lead.dealValue || lead.budgetMax || 0)}
                              </span>
                            </div>

                            {/* Linha 5: Próxima Tarefa / Lembrete RD Station CRM */}
                            {lead.nextAction && (
                              <div
                                className={`mt-2.5 px-2.5 py-1.5 rounded-lg flex items-center justify-between text-[11px] font-semibold transition-all ${
                                  lead.nextAction.isUrgent
                                    ? "bg-rose-50/90 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900/50 text-rose-800 dark:text-rose-300"
                                    : "bg-zinc-100/90 dark:bg-zinc-700/50 text-zinc-700 dark:text-zinc-300"
                                }`}
                              >
                                <div className="flex items-center gap-1.5 truncate">
                                  <Clock className="h-3 w-3 shrink-0" />
                                  <span className="truncate">{lead.nextAction.label}</span>
                                </div>
                              </div>
                            )}

                            {/* Linha 6: Botões Rápidos: + Criar Tarefa & Avançar */}
                            <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-700/60 text-[11px]">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setTaskModalLead(lead);
                                }}
                                className="inline-flex items-center gap-1 font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors cursor-pointer"
                              >
                                <Plus className="h-3 w-3" />
                                <span>Criar Tarefa</span>
                              </button>

                              {stg.id !== "FECHADO" && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleQuickAdvance(lead.id, lead.stage);
                                  }}
                                  className="inline-flex items-center gap-1 font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors cursor-pointer"
                                  title="Avançar para o topo da próxima etapa"
                                >
                                  <span>Avançar</span>
                                  <ArrowRight className="h-3 w-3" />
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Indicador Visual de Inserção Abaixo do Card */}
                          {isDropAfter && (
                            <div className="h-1.5 w-full bg-emerald-500 rounded-full my-1.5 shadow-sm ring-2 ring-emerald-300 dark:ring-emerald-800 animate-in fade-in zoom-in-95 duration-100" />
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* 4. Modo Lista (Visão em Tabela Compacta) */
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50 dark:bg-zinc-800/60 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-3.5">Negociação / Lead</th>
                <th className="p-3.5">Empresa / Interesse</th>
                <th className="p-3.5">Etapa do Funil</th>
                <th className="p-3.5">Valor do Negócio</th>
                <th className="p-3.5">Corretor</th>
                <th className="p-3.5">Próxima Tarefa</th>
                <th className="p-3.5 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {filteredLeads.map((lead) => {
                const currentStageConfig = STAGES.find((s) => s.id === lead.stage);

                return (
                  <tr
                    key={lead.id}
                    className="hover:bg-zinc-50/70 dark:hover:bg-zinc-800/40 transition-colors"
                  >
                    <td className="p-3.5 font-bold text-zinc-900 dark:text-zinc-100">
                      <div>{lead.name}</div>
                      <div className="text-[11px] font-normal text-zinc-400">{lead.phone}</div>
                    </td>
                    <td className="p-3.5 text-zinc-600 dark:text-zinc-300">
                      <div>{lead.company || "-"}</div>
                      <div className="text-[11px] text-zinc-400 line-clamp-1">
                        {lead.propertyInterestTitle}
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-semibold text-[11px] ${
                          currentStageConfig?.badgeBg || "bg-zinc-100"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            currentStageConfig?.dotColor || "bg-zinc-400"
                          }`}
                        />
                        {currentStageConfig?.label}
                      </span>
                    </td>
                    <td className="p-3.5 font-bold font-mono text-zinc-900 dark:text-zinc-100">
                      {formatCurrency(lead.dealValue || lead.budgetMax || 0)}
                    </td>
                    <td className="p-3.5 text-zinc-600 dark:text-zinc-300">
                      {lead.assignedBrokerName}
                    </td>
                    <td className="p-3.5">
                      {lead.nextAction ? (
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                            lead.nextAction.isUrgent
                              ? "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300"
                              : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                          }`}
                        >
                          {lead.nextAction.label}
                        </span>
                      ) : (
                        <span className="text-zinc-400">-</span>
                      )}
                    </td>
                    <td className="p-3.5 text-right">
                      {lead.stage !== "FECHADO" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleQuickAdvance(lead.id, lead.stage)}
                          className="h-7 text-xs"
                        >
                          <span>Avançar</span>
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal 1: Criar Nova Tarefa para o Lead */}
      <Dialog open={!!taskModalLead} onOpenChange={(open) => !open && setTaskModalLead(null)}>
        <DialogHeader>
          <DialogTitle>Criar Tarefa no Lead</DialogTitle>
          <DialogDescription>
            Agende um follow-up, ligação telefônica ou reunião presencial para{" "}
            <strong>{taskModalLead?.name}</strong>.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSaveTask} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1">
              Descrição da Tarefa *
            </label>
            <Input
              value={newTaskLabel}
              onChange={(e) => setNewTaskLabel(e.target.value)}
              placeholder="Ex: LIGAR 30/10 17:00 para alinhar proposta"
              required
            />
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1">
              Data e Horário Previsto
            </label>
            <Input
              type="text"
              value={newTaskDate}
              onChange={(e) => setNewTaskDate(e.target.value)}
              placeholder="Ex: Amanhã 15:30"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setTaskModalLead(null)}
            >
              Cancelar
            </Button>
            <Button type="submit" size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Salvar Tarefa
            </Button>
          </DialogFooter>
        </form>
      </Dialog>

      {/* Modal 2: Cadastrar Nova Negociação / Lead */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogHeader>
          <DialogTitle>Cadastrar Nova Negociação</DialogTitle>
          <DialogDescription>
            Insira os dados do contato e o valor da oportunidade no pipeline.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleCreateLead} className="space-y-3.5">
          <div>
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1">
              Nome da Oportunidade ou Contato *
            </label>
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Ex: Exact Sales ou Dra. Camila Siqueira"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1">
                Empresa / Razão Social
              </label>
              <Input
                value={newCompany}
                onChange={(e) => setNewCompany(e.target.value)}
                placeholder="Ex: Tech Ventures Ltda"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1">
                Valor Estimado (R$)
              </label>
              <Input
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder="Ex: 1.500.000"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1">
                WhatsApp / Telefone *
              </label>
              <Input
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                placeholder="(11) 98888-7777"
                required
              />
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1">
                E-mail
              </label>
              <Input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="contato@empresa.com"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1">
              Imóvel ou Perfil de Interesse
            </label>
            <Input
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              placeholder="Ex: Cobertura Duplex nos Jardins ou código CB-8012"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Criar Negociação
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
}
