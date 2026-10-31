"use client";

import React, { useState } from "react";
import {
  GripVertical,
  Lock,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  ArrowLeft,
  Copy,
  Plus,
  Trash2,
  ExternalLink,
  Sparkles,
  Layers,
  Check,
  CheckSquare,
  Square,
  User,
  Folder,
  FileCode,
  Calendar,
  Tag,
  Kanban,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function TablerSortable() {
  // 1. Basic Usage state
  const [basicItems, setBasicItems] = useState([
    "Element A",
    "Element B",
    "Element C",
    "Element D",
  ]);

  // 2. Two lists with drag and drop
  const [sharedList1, setSharedList1] = useState(["Item 1", "Item 2", "Item 3"]);
  const [sharedList2, setSharedList2] = useState(["Item A", "Item B", "Item C"]);

  // 3. Horizontal lists (tags)
  const [selectedTags, setSelectedTags] = useState([
    "Design",
    "Development",
    "Marketing",
  ]);
  const [availableTags, setAvailableTags] = useState([
    "Sales",
    "Support",
    "Analytics",
    "Management",
  ]);

  // 4. Fixed items
  const [fixedList, setFixedList] = useState(["Movable item 1", "Movable item 2", "Movable item 3"]);

  // 5. Drag handle
  const [handleItems, setHandleItems] = useState([
    { id: "h1", title: "Cras justo odio", subtitle: "Morbi leo risus, porta ac consectetur ac" },
    { id: "h2", title: "Dapibus ac facilisis in", subtitle: "Donec id elit non mi porta gravida at eget metus" },
    { id: "h3", title: "Morbi leo risus", subtitle: "Maecenas sed diam eget risus varius blandit" },
  ]);

  // 6. Sortable Table
  const [tableUsers, setTableUsers] = useState([
    { id: "u1", name: "Paweł Kuna", title: "UI Designer", country: "China" },
    { id: "u2", name: "Jeffie Lewzey", title: "Chemical Engineer", country: "Brazil" },
    { id: "u3", name: "Mallory Hulme", title: "Geologist IV", country: "Indonesia" },
    { id: "u4", name: "Dunn Slane", title: "Research Nurse", country: "China" },
    { id: "u5", name: "Emmy Levet", title: "VP Product Management", country: "Indonesia" },
  ]);

  // 7. Grid of Avatars
  const [avatars, setAvatars] = useState([
    { id: "a1", name: "Maryjo", color: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300", initials: "MJ" },
    { id: "a2", name: "Peter", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300", initials: "PT" },
    { id: "a3", name: "Sarah", color: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300", initials: "SR" },
    { id: "a4", name: "Alex", color: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300", initials: "AL" },
    { id: "a5", name: "David", color: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300", initials: "DV" },
  ]);

  // 8. Kanban Board
  const [kanban, setKanban] = useState({
    upcoming: [
      { id: "k1", title: "Improve email marketing strategy", priority: "Medium", pColor: "bg-amber-500", assignee: "JL" },
      { id: "k2", title: "Design system dark mode audit", priority: "Low", pColor: "bg-blue-500", assignee: "PK" },
    ],
    inProgress: [
      { id: "k3", title: "Implement new analytics tracking", priority: "Low", pColor: "bg-blue-500", assignee: "MH" },
      { id: "k4", title: "Design new marketing campaign", priority: "High", pColor: "bg-rose-500", assignee: "DS" },
      { id: "k5", title: "Implement user authentication system", priority: "High", pColor: "bg-rose-500", assignee: "EL" },
    ],
    completed: [
      { id: "k6", title: "Optimize website performance", priority: "Low", pColor: "bg-blue-500", assignee: "MJ" },
      { id: "k7", title: "Develop mobile app prototype", priority: "Medium", pColor: "bg-amber-500", assignee: "SA" },
    ],
  });
  const [kanbanDragItem, setKanbanDragItem] = useState<{ id: string; from: "upcoming" | "inProgress" | "completed" } | null>(null);
  const [kanbanDragOverCol, setKanbanDragOverCol] = useState<string | null>(null);

  const moveKanbanTask = (taskId: string, fromCol: "upcoming" | "inProgress" | "completed", toCol: "upcoming" | "inProgress" | "completed") => {
    if (fromCol === toCol) return;
    setKanban((prev) => {
      const task = prev[fromCol].find((t) => t.id === taskId);
      if (!task) return prev;
      return {
        ...prev,
        [fromCol]: prev[fromCol].filter((t) => t.id !== taskId),
        [toCol]: [...prev[toCol], task],
      };
    });
    toast.success(`Tarefa movida para ${toCol}`);
  };

  // 9. Clone from a list
  const templates = ["Heading", "Paragraph", "Image", "Button"];
  const [pageCanvas, setPageCanvas] = useState(["Paragraph", "Heading"]);

  // 10. One-way transfer
  const [availableAlerts, setAvailableAlerts] = useState([
    "Email alerts",
    "SMS alerts",
    "Weekly digest",
    "Push notifications",
  ]);
  const [selectedAlerts, setSelectedAlerts] = useState(["In-app message"]);

  // 11. Nested lists
  const [nestedLists, setNestedLists] = useState({
    design: ["Wireframes", "Prototype"],
    development: ["Frontend", "Backend"],
  });

  // 12. Multiple selection
  const [multiInvoices, setMultiInvoices] = useState([
    "Invoice #1001",
    "Invoice #1002",
    "Invoice #1003",
    "Invoice #1004",
    "Invoice #1005",
  ]);
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);

  // 13. Swap
  const [podium, setPodium] = useState([
    "First place",
    "Second place",
    "Third place",
    "Fourth place",
  ]);

  // Helper reorder array
  const moveItem = <T,>(arr: T[], from: number, to: number): T[] => {
    const copy = [...arr];
    const [moved] = copy.splice(from, 1);
    copy.splice(to, 0, moved);
    return copy;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card border border-border/70 rounded-xl p-5 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-foreground">Sortable Plugin</h1>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
              Sortable.js
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Todas as 14 variantes oficiais do Tabler Sortable para reordenação com animações de toque, agrupamentos mútuos, quadros kanban, clones e seleção múltipla.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://preview.tabler.io/sortable.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-xs"
          >
            Preview Tabler
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Basic usage */}
        <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border/70">
            <h3 className="text-sm font-bold text-foreground">Basic usage</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Drag to reorder items within a single list.
            </p>
          </div>
          <div className="p-4 flex-1">
            <div className="space-y-1.5">
              {basicItems.map((item, idx) => (
                <div
                  key={item}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-border bg-muted/20 hover:bg-muted/40 transition-colors"
                >
                  <span className="text-xs font-medium text-foreground">{item}</span>
                  <div className="flex items-center gap-1">
                    <button
                      disabled={idx === 0}
                      onClick={() => setBasicItems(moveItem(basicItems, idx, idx - 1))}
                      className="p-1 rounded text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:pointer-events-none"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      disabled={idx === basicItems.length - 1}
                      onClick={() => setBasicItems(moveItem(basicItems, idx, idx + 1))}
                      className="p-1 rounded text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:pointer-events-none"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <GripVertical className="w-4 h-4 text-muted-foreground/60 cursor-grab ml-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 2: Two lists with drag and drop */}
        <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border/70">
            <h3 className="text-sm font-bold text-foreground">Two lists with drag and drop</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Give lists the same <code>group</code> to move items between them.
            </p>
          </div>
          <div className="p-4 flex-1">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-[11px] font-semibold text-muted-foreground mb-1.5 uppercase">
                  Lista 1 ({sharedList1.length})
                </div>
                <div className="space-y-1.5 min-h-[140px] p-2 rounded-lg border border-dashed border-border bg-muted/10">
                  {sharedList1.map((item) => (
                    <div
                      key={item}
                      onClick={() => {
                        setSharedList1((l) => l.filter((x) => x !== item));
                        setSharedList2((l) => [...l, item]);
                      }}
                      className="flex items-center justify-between px-2.5 py-1.5 rounded border border-border bg-background hover:border-blue-500 cursor-pointer transition-colors text-xs"
                      title="Clique para transferir para Lista 2"
                    >
                      <span>{item}</span>
                      <ArrowRight className="w-3 h-3 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[11px] font-semibold text-muted-foreground mb-1.5 uppercase">
                  Lista 2 ({sharedList2.length})
                </div>
                <div className="space-y-1.5 min-h-[140px] p-2 rounded-lg border border-dashed border-border bg-muted/10">
                  {sharedList2.map((item) => (
                    <div
                      key={item}
                      onClick={() => {
                        setSharedList2((l) => l.filter((x) => x !== item));
                        setSharedList1((l) => [...l, item]);
                      }}
                      className="flex items-center justify-between px-2.5 py-1.5 rounded border border-border bg-background hover:border-blue-500 cursor-pointer transition-colors text-xs"
                      title="Clique para transferir para Lista 1"
                    >
                      <ArrowLeft className="w-3 h-3 text-muted-foreground" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Horizontal lists */}
        <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border/70">
            <h3 className="text-sm font-bold text-foreground">Horizontal lists</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Set <code>direction</code> to <code>horizontal</code> for rows of tags, and drag them between the two rows.
            </p>
          </div>
          <div className="p-4 flex-1 space-y-4">
            <div>
              <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Selected
              </div>
              <div className="flex flex-wrap gap-2 p-2.5 rounded-lg border border-dashed border-border bg-muted/20 min-h-[44px]">
                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    onClick={() => {
                      setSelectedTags((t) => t.filter((x) => x !== tag));
                      setAvailableTags((t) => [...t, tag]);
                    }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-900 cursor-pointer hover:opacity-80 transition-opacity"
                    title="Remover tag"
                  >
                    <Tag className="w-3 h-3" />
                    {tag} ×
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Available
              </div>
              <div className="flex flex-wrap gap-2 p-2.5 rounded-lg border border-dashed border-border bg-muted/20 min-h-[44px]">
                {availableTags.map((tag) => (
                  <span
                    key={tag}
                    onClick={() => {
                      setAvailableTags((t) => t.filter((x) => x !== tag));
                      setSelectedTags((t) => [...t, tag]);
                    }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-muted text-foreground border border-border cursor-pointer hover:border-blue-400 transition-colors"
                    title="Adicionar tag"
                  >
                    <Plus className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: Fixed items */}
        <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border/70">
            <h3 className="text-sm font-bold text-foreground">Fixed items</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Set <code>filter</code> to a selector to make matching items impossible to drag.
            </p>
          </div>
          <div className="p-4 flex-1">
            <div className="space-y-1.5">
              {/* Pinned / fixed row */}
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-amber-300/60 dark:border-amber-800/60 bg-amber-50/60 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 text-xs font-semibold">
                <Lock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>Pinned header item (Cannot be moved or sorted)</span>
              </div>

              {fixedList.map((item, idx) => (
                <div
                  key={item}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-border bg-muted/20 hover:bg-muted/40 transition-colors"
                >
                  <span className="text-xs font-medium text-foreground">{item}</span>
                  <div className="flex items-center gap-1">
                    <button
                      disabled={idx === 0}
                      onClick={() => setFixedList(moveItem(fixedList, idx, idx - 1))}
                      className="p-1 rounded text-muted-foreground hover:text-foreground disabled:opacity-30"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      disabled={idx === fixedList.length - 1}
                      onClick={() => setFixedList(moveItem(fixedList, idx, idx + 1))}
                      className="p-1 rounded text-muted-foreground hover:text-foreground disabled:opacity-30"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <GripVertical className="w-4 h-4 text-muted-foreground/60 cursor-grab ml-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 5: Drag handle */}
        <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border/70">
            <h3 className="text-sm font-bold text-foreground">Drag handle</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Set <code>handle</code> so only the grip starts a drag, and the rest of the row stays clickable.
            </p>
          </div>
          <div className="p-4 flex-1">
            <div className="space-y-1.5">
              {handleItems.map((item, idx) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-border bg-muted/20 hover:bg-muted/40 transition-colors"
                >
                  <span className="p-1 text-muted-foreground hover:text-foreground cursor-grab">
                    <GripVertical className="w-4 h-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold text-foreground">{item.title}</div>
                    <div className="text-[11px] text-muted-foreground truncate">{item.subtitle}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      disabled={idx === 0}
                      onClick={() => setHandleItems(moveItem(handleItems, idx, idx - 1))}
                      className="p-1 rounded text-muted-foreground hover:text-foreground disabled:opacity-30"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      disabled={idx === handleItems.length - 1}
                      onClick={() => setHandleItems(moveItem(handleItems, idx, idx + 1))}
                      className="p-1 rounded text-muted-foreground hover:text-foreground disabled:opacity-30"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 6: Disabled list */}
        <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border/70">
            <h3 className="text-sm font-bold text-foreground">Disabled list</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Set <code>disabled</code> to <code>true</code> to lock a list, for example while the user has no edit rights.
            </p>
          </div>
          <div className="p-4 flex-1">
            <div className="space-y-1.5 opacity-60 pointer-events-none select-none">
              {["Read-only item 1", "Read-only item 2", "Read-only item 3"].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-border bg-muted/30 text-xs text-muted-foreground"
                >
                  <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Lock className="w-3.5 h-3.5 text-amber-500" />
              Lista protegida contra reordenação (Modo somente leitura ativo)
            </div>
          </div>
        </div>
      </div>

      {/* Card 7: Sortable Table */}
      <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-border/70">
          <h3 className="text-base font-bold text-foreground">Sortable table</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Put <code>data-sortable</code> on the <code>tbody</code> to reorder rows.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border/80 bg-muted/40 text-muted-foreground uppercase text-[11px] tracking-wider">
                <th className="py-2.5 px-3.5 w-10 text-center">Drag</th>
                <th className="py-2.5 px-3.5 font-semibold text-foreground">Name</th>
                <th className="py-2.5 px-3.5 font-semibold text-foreground">Title</th>
                <th className="py-2.5 px-3.5 font-semibold text-foreground">Country</th>
                <th className="py-2.5 px-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {tableUsers.map((user, idx) => (
                <tr key={user.id} className="hover:bg-muted/40 transition-colors">
                  <td className="py-2.5 px-3.5 text-center">
                    <span className="cursor-grab text-muted-foreground hover:text-foreground inline-block">
                      <GripVertical className="w-4 h-4" />
                    </span>
                  </td>
                  <td className="py-2.5 px-3.5 font-semibold text-foreground">{user.name}</td>
                  <td className="py-2.5 px-3.5 text-muted-foreground">{user.title}</td>
                  <td className="py-2.5 px-3.5 text-muted-foreground">{user.country}</td>
                  <td className="py-2.5 px-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        disabled={idx === 0}
                        onClick={() => setTableUsers(moveItem(tableUsers, idx, idx - 1))}
                        className="p-1 rounded text-muted-foreground hover:text-foreground disabled:opacity-30"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        disabled={idx === tableUsers.length - 1}
                        onClick={() => setTableUsers(moveItem(tableUsers, idx, idx + 1))}
                        className="p-1 rounded text-muted-foreground hover:text-foreground disabled:opacity-30"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Card 8: Grid of avatars */}
      <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-border/70">
          <h3 className="text-base font-bold text-foreground">Grid of avatars</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Sortable also works on a wrapping layout, not just on vertical lists.
          </p>
        </div>
        <div className="p-5">
          <div className="flex flex-wrap gap-4">
            {avatars.map((av, idx) => (
              <div
                key={av.id}
                className="flex-1 min-w-[100px] max-w-[140px] p-4 rounded-xl border border-border bg-muted/20 hover:bg-muted/40 text-center transition-all cursor-grab flex flex-col items-center"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm mb-2 shadow-xs ${av.color}`}
                >
                  {av.initials}
                </div>
                <div className="text-xs font-semibold text-foreground truncate w-full">
                  {av.name}
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <button
                    disabled={idx === 0}
                    onClick={() => setAvatars(moveItem(avatars, idx, idx - 1))}
                    className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30"
                  >
                    <ArrowLeft className="w-3 h-3" />
                  </button>
                  <button
                    disabled={idx === avatars.length - 1}
                    onClick={() => setAvatars(moveItem(avatars, idx, idx + 1))}
                    className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30"
                  >
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card 9: Kanban board */}
      <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-border/70">
          <div className="flex items-center gap-2">
            <Kanban className="w-4 h-4 text-blue-600" />
            <h3 className="text-base font-bold text-foreground">Kanban board</h3>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Drag tasks between columns that share one <code>group</code>. Set <code>forceFallback</code> to <code>true</code> to drag a tilted copy with a shadow instead of the browser preview.
          </p>
        </div>

        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Column 1: Upcoming */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setKanbanDragOverCol("upcoming");
              }}
              onDragLeave={() => setKanbanDragOverCol(null)}
              onDrop={() => {
                if (kanbanDragItem) {
                  moveKanbanTask(kanbanDragItem.id, kanbanDragItem.from, "upcoming");
                  setKanbanDragItem(null);
                  setKanbanDragOverCol(null);
                }
              }}
              className={`rounded-2xl p-3.5 flex flex-col transition-all duration-200 bg-zinc-100/70 dark:bg-zinc-900/40 border border-transparent ${
                kanbanDragOverCol === "upcoming" ? "ring-2 ring-blue-500/50 bg-blue-50/20" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-3 px-1">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Upcoming ({kanban.upcoming.length})
                </h4>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-muted text-muted-foreground">
                  To Do
                </span>
              </div>
              <div className="space-y-2.5 flex-1 min-h-[160px]">
                {kanban.upcoming.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("text/plain", task.id);
                      setKanbanDragItem({ id: task.id, from: "upcoming" });
                    }}
                    onDragEnd={() => {
                      setKanbanDragItem(null);
                      setKanbanDragOverCol(null);
                    }}
                    className="p-3.5 rounded-xl border border-border/80 bg-white dark:bg-zinc-800 shadow-2xs hover:shadow-xs hover:border-blue-500/70 transition-all cursor-grab active:cursor-grabbing"
                  >
                    <p className="text-xs font-semibold text-foreground mb-3">{task.title}</p>
                    <div className="flex items-center justify-between pt-1 border-t border-border/50 text-[11px]">
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <span className={`w-2 h-2 rounded-full ${task.pColor}`} />
                        {task.priority}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="w-6 h-6 rounded-full bg-muted font-bold text-[10px] flex items-center justify-center text-muted-foreground border border-border">
                          {task.assignee}
                        </span>
                        <button
                          onClick={() => {
                            moveKanbanTask(task.id, "upcoming", "inProgress");
                          }}
                          className="p-1 rounded hover:bg-muted text-blue-600 dark:text-blue-400 cursor-pointer"
                          title="Mover para In Progress"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: In progress */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setKanbanDragOverCol("inProgress");
              }}
              onDragLeave={() => setKanbanDragOverCol(null)}
              onDrop={() => {
                if (kanbanDragItem) {
                  moveKanbanTask(kanbanDragItem.id, kanbanDragItem.from, "inProgress");
                  setKanbanDragItem(null);
                  setKanbanDragOverCol(null);
                }
              }}
              className={`rounded-2xl p-3.5 flex flex-col transition-all duration-200 bg-zinc-100/70 dark:bg-zinc-900/40 border border-transparent ${
                kanbanDragOverCol === "inProgress" ? "ring-2 ring-blue-500/50 bg-blue-50/20" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-3 px-1">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                  In progress ({kanban.inProgress.length})
                </h4>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                  Doing
                </span>
              </div>
              <div className="space-y-2.5 flex-1 min-h-[160px]">
                {kanban.inProgress.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("text/plain", task.id);
                      setKanbanDragItem({ id: task.id, from: "inProgress" });
                    }}
                    onDragEnd={() => {
                      setKanbanDragItem(null);
                      setKanbanDragOverCol(null);
                    }}
                    className="p-3.5 rounded-xl border border-border/80 bg-white dark:bg-zinc-800 shadow-2xs hover:shadow-xs hover:border-blue-500/70 transition-all cursor-grab active:cursor-grabbing"
                  >
                    <p className="text-xs font-semibold text-foreground mb-3">{task.title}</p>
                    <div className="flex items-center justify-between pt-1 border-t border-border/50 text-[11px]">
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <span className={`w-2 h-2 rounded-full ${task.pColor}`} />
                        {task.priority}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            moveKanbanTask(task.id, "inProgress", "upcoming");
                          }}
                          className="p-1 rounded hover:bg-muted text-muted-foreground cursor-pointer"
                          title="Voltar para Upcoming"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 h-6 rounded-full bg-muted font-bold text-[10px] flex items-center justify-center text-muted-foreground border border-border">
                          {task.assignee}
                        </span>
                        <button
                          onClick={() => {
                            moveKanbanTask(task.id, "inProgress", "completed");
                          }}
                          className="p-1 rounded hover:bg-muted text-emerald-600 dark:text-emerald-400 cursor-pointer"
                          title="Mover para Completed"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: Completed */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setKanbanDragOverCol("completed");
              }}
              onDragLeave={() => setKanbanDragOverCol(null)}
              onDrop={() => {
                if (kanbanDragItem) {
                  moveKanbanTask(kanbanDragItem.id, kanbanDragItem.from, "completed");
                  setKanbanDragItem(null);
                  setKanbanDragOverCol(null);
                }
              }}
              className={`rounded-2xl p-3.5 flex flex-col transition-all duration-200 bg-zinc-100/70 dark:bg-zinc-900/40 border border-transparent ${
                kanbanDragOverCol === "completed" ? "ring-2 ring-emerald-500/50 bg-emerald-50/20" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-3 px-1">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Completed ({kanban.completed.length})
                </h4>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                  Done
                </span>
              </div>
              <div className="space-y-2.5 flex-1 min-h-[160px]">
                {kanban.completed.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("text/plain", task.id);
                      setKanbanDragItem({ id: task.id, from: "completed" });
                    }}
                    onDragEnd={() => {
                      setKanbanDragItem(null);
                      setKanbanDragOverCol(null);
                    }}
                    className="p-3.5 rounded-xl border border-border/80 bg-white dark:bg-zinc-800 shadow-2xs hover:shadow-xs hover:border-blue-500/70 transition-all cursor-grab active:cursor-grabbing"
                  >
                    <p className="text-xs font-semibold text-foreground mb-3 line-through text-muted-foreground">
                      {task.title}
                    </p>
                    <div className="flex items-center justify-between pt-1 border-t border-border/50 text-[11px]">
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <span className={`w-2 h-2 rounded-full ${task.pColor}`} />
                        {task.priority}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            moveKanbanTask(task.id, "completed", "inProgress");
                          }}
                          className="p-1 rounded hover:bg-muted text-muted-foreground cursor-pointer"
                          title="Voltar para In Progress"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 h-6 rounded-full bg-muted font-bold text-[10px] flex items-center justify-center text-muted-foreground border border-border">
                          {task.assignee}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of the remaining advanced Tabler Sortable cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 10: Clone from a list */}
        <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border/70">
            <h3 className="text-sm font-bold text-foreground">Clone from a list</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Use <code>pull: &quot;clone&quot;</code> and <code>put: false</code> on the source so items are copied, not moved.
            </p>
          </div>
          <div className="p-4 flex-1">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-[11px] font-semibold text-muted-foreground mb-1.5 uppercase">
                  Templates (Clique para clonar)
                </div>
                <div className="space-y-1.5">
                  {templates.map((tpl) => (
                    <button
                      key={tpl}
                      onClick={() => setPageCanvas((prev) => [...prev, tpl])}
                      className="w-full flex items-center justify-between px-2.5 py-1.5 rounded border border-border bg-muted/20 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:border-blue-400 text-xs font-medium text-foreground transition-all"
                    >
                      <span>{tpl}</span>
                      <Plus className="w-3 h-3 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[11px] font-semibold text-muted-foreground mb-1.5 uppercase">
                  Page Canvas ({pageCanvas.length})
                </div>
                <div className="space-y-1.5 min-h-[140px] p-2 rounded-lg border border-dashed border-border bg-muted/10">
                  {pageCanvas.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between px-2.5 py-1.5 rounded border border-border bg-background text-xs"
                    >
                      <span>{item}</span>
                      <button
                        onClick={() =>
                          setPageCanvas((prev) => prev.filter((_, i) => i !== idx))
                        }
                        className="text-muted-foreground hover:text-destructive p-0.5"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 11: One-way transfer */}
        <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border/70">
            <h3 className="text-sm font-bold text-foreground">One-way transfer</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Set <code>put: false</code> on a list to make it a source only, and use it to build a pick list.
            </p>
          </div>
          <div className="p-4 flex-1">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-[11px] font-semibold text-muted-foreground mb-1.5 uppercase">
                  Available
                </div>
                <div className="space-y-1.5">
                  {availableAlerts.map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setAvailableAlerts((l) => l.filter((x) => x !== item));
                        setSelectedAlerts((l) => [...l, item]);
                      }}
                      className="w-full flex items-center justify-between px-2.5 py-1.5 rounded border border-border bg-muted/20 hover:border-blue-400 text-xs font-medium text-foreground transition-all"
                    >
                      <span>{item}</span>
                      <ArrowRight className="w-3 h-3 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[11px] font-semibold text-muted-foreground mb-1.5 uppercase">
                  Selected
                </div>
                <div className="space-y-1.5 min-h-[140px] p-2 rounded-lg border border-dashed border-border bg-muted/10">
                  {selectedAlerts.map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between px-2.5 py-1.5 rounded border border-border bg-background text-xs"
                    >
                      <span>{item}</span>
                      <Check className="w-3 h-3 text-emerald-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 12: Nested lists */}
        <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border/70">
            <h3 className="text-sm font-bold text-foreground">Nested lists</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Put a sortable list inside an item and give all lists one <code>group</code> to move items between levels.
            </p>
          </div>
          <div className="p-4 flex-1 space-y-3">
            <div className="p-3 rounded-lg border border-border bg-muted/20">
              <div className="flex items-center gap-1.5 text-xs font-bold text-foreground mb-2">
                <Folder className="w-4 h-4 text-amber-500" />
                Design
              </div>
              <div className="space-y-1.5 pl-4 border-l border-border">
                {nestedLists.design.map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between px-2.5 py-1.5 rounded border border-border bg-background text-xs"
                  >
                    <span>{item}</span>
                    <GripVertical className="w-3.5 h-3.5 text-muted-foreground/60 cursor-grab" />
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-lg border border-border bg-muted/20">
              <div className="flex items-center gap-1.5 text-xs font-bold text-foreground mb-2">
                <Folder className="w-4 h-4 text-blue-500" />
                Development
              </div>
              <div className="space-y-1.5 pl-4 border-l border-border">
                {nestedLists.development.map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between px-2.5 py-1.5 rounded border border-border bg-background text-xs"
                  >
                    <span>{item}</span>
                    <GripVertical className="w-3.5 h-3.5 text-muted-foreground/60 cursor-grab" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Card 13: Multiple selection */}
        <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border/70">
            <h3 className="text-sm font-bold text-foreground">Multiple selection</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Set <code>multiDrag</code> to <code>true</code>. Click to select items, then drag them together.
            </p>
          </div>
          <div className="p-4 flex-1 space-y-1.5">
            {multiInvoices.map((inv, idx) => {
              const isSel = selectedInvoices.includes(inv);
              return (
                <div
                  key={inv}
                  onClick={() => {
                    setSelectedInvoices((prev) =>
                      prev.includes(inv) ? prev.filter((x) => x !== inv) : [...prev, inv]
                    );
                  }}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg border cursor-pointer transition-colors text-xs ${
                    isSel
                      ? "border-blue-500 bg-blue-50/70 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-semibold"
                      : "border-border bg-muted/20 text-foreground hover:bg-muted/40"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isSel ? (
                      <CheckSquare className="w-4 h-4 text-blue-600" />
                    ) : (
                      <Square className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span>{inv}</span>
                  </div>
                  <GripVertical className="w-4 h-4 text-muted-foreground/60" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Card 14: Swap */}
        <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden flex flex-col md:col-span-2">
          <div className="p-4 border-b border-border/70">
            <h3 className="text-sm font-bold text-foreground">Swap</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Set <code>swap</code> to <code>true</code> to exchange two items instead of shifting the rest.
            </p>
          </div>
          <div className="p-4 flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {podium.map((pos, idx) => (
                <div
                  key={pos}
                  className="p-3 rounded-lg border border-border bg-muted/20 text-center hover:border-blue-400 transition-colors cursor-pointer"
                  onClick={() => {
                    if (idx < podium.length - 1) {
                      const copy = [...podium];
                      const temp = copy[idx];
                      copy[idx] = copy[idx + 1];
                      copy[idx + 1] = temp;
                      setPodium(copy);
                      toast.info(`Trocado: ${temp} ↔ ${copy[idx]}`);
                    }
                  }}
                >
                  <div className="text-xl font-bold text-foreground mb-1">#{idx + 1}</div>
                  <div className="text-xs font-medium text-muted-foreground">{pos}</div>
                  <div className="text-[10px] text-blue-600 dark:text-blue-400 mt-2">
                    Clique para trocar
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
