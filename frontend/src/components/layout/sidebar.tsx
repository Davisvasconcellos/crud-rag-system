"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  PlusCircle,
  Users,
  Bot,
  HardDrive,
  Component,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Layers,
  Search,
  X,
  Puzzle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const UI_ELEMENTS_CATEGORIES: {
  category: string;
  items: { label: string; slug: string; isNew?: boolean }[];
}[] = [
  {
    category: "Essenciais",
    items: [
      { label: "Alerts", slug: "alerts" },
      { label: "Avatars", slug: "avatars" },
      { label: "Badges", slug: "badges", isNew: true },
      { label: "Breadcrumb", slug: "breadcrumb" },
      { label: "Buttons", slug: "buttons", isNew: true },
      { label: "Buttons Group", slug: "buttons-group" },
      { label: "Colors", slug: "colors", isNew: true },
      { label: "Links", slug: "links" },
      { label: "Social Icons", slug: "social-icons", isNew: true },
      { label: "Tags", slug: "tags", isNew: true },
      { label: "Typography", slug: "typography", isNew: true },
    ],
  },
  {
    category: "Cards & Estrutura (Tabler)",
    items: [
      { label: "Cards (Tabler)", slug: "cards" },
      { label: "Card Gradients", slug: "card-gradients", isNew: true },
      { label: "Widgets", slug: "widgets", isNew: true },
      { label: "Users", slug: "users", isNew: true },
      { label: "Accordion", slug: "accordion" },
      { label: "Data Grid", slug: "datagrid", isNew: true },
      { label: "Icon Lists", slug: "icon-lists", isNew: true },
      { label: "Lists", slug: "lists", isNew: true },
      { label: "Shapes", slug: "shape", isNew: true },
      { label: "Signals", slug: "signal", isNew: true },
      { label: "Tables", slug: "tables", isNew: true },
      { label: "Mockup Browser", slug: "mockup-browser" },
      { label: "Blank Page (Empty)", slug: "blank-page" },
    ],
  },
  {
    category: "Navegação & Fluxo",
    items: [
      { label: "Dropdowns", slug: "dropdowns", isNew: true },
      { label: "Modals", slug: "modals", isNew: true },
      { label: "Navigation", slug: "navigation", isNew: true },
      { label: "Nav Overflow", slug: "nav-overflow", isNew: true },
      { label: "Offcanvas (Drawer)", slug: "offcanvas", isNew: true },
      { label: "Pagination", slug: "pagination" },
      { label: "Scroll Spy", slug: "scroll-spy", isNew: true },
      { label: "Steps", slug: "steps", isNew: true },
      { label: "Tabs", slug: "tabs", isNew: true },
    ],
  },
  {
    category: "Feedback & Métricas",
    items: [
      { label: "Legend", slug: "legend", isNew: true },
      { label: "Notifications & Toasts", slug: "toasts", isNew: true },
      { label: "Popovers", slug: "popovers" },
      { label: "Progress Bar", slug: "progress", isNew: true },
      { label: "Sparkline", slug: "sparkline", isNew: true },
      { label: "Spinners", slug: "spinners" },
      { label: "Stars Rating", slug: "stars-rating", isNew: true },
      { label: "Tooltips", slug: "tooltips" },
      { label: "Tracking", slug: "tracking", isNew: true },
    ],
  },
  {
    category: "Formulários & Controles",
    items: [
      { label: "Clipboard", slug: "clipboard" },
      { label: "Number Input", slug: "number-input", isNew: true },
      { label: "Password Strength", slug: "password-strength" },
      { label: "Segmented Control", slug: "segmented-control", isNew: true },
      { label: "Switch Icons", slug: "switch-icons", isNew: true },
    ],
  },
  {
    category: "Mídia & Efeitos",
    items: [
      { label: "Carousel", slug: "carousel", isNew: true },
      { label: "Confetti", slug: "confetti", isNew: true },
      { label: "Hover Gallery", slug: "hover-gallery", isNew: true },
      { label: "Image Labels", slug: "image-labels", isNew: true },
      { label: "Images", slug: "images" },
      { label: "Placeholder & Shimmer", slug: "placeholder" },
      { label: "Ribbons", slug: "ribbons" },
      { label: "Text Shimmer", slug: "text-shimmer", isNew: true },
      { label: "Videos", slug: "videos" },
    ],
  },
  {
    category: "Telas de Sistema",
    items: [
      { label: "Authentication", slug: "authentication" },
      { label: "Error Pages", slug: "error-pages" },
    ],
  },
];

import { TABLER_PLUGINS_ITEMS } from "@/lib/tabler-plugins-data";
export { TABLER_PLUGINS_ITEMS };

import { useSidebar } from "@/contexts/sidebar-context";

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { mobileOpen, setMobileOpen, collapsed, setCollapsed } = useSidebar();
  const [uiElementsOpen, setUiElementsOpen] = useState(true);
  const [filterQuery, setFilterQuery] = useState("");
  const [pluginsOpen, setPluginsOpen] = useState(false);
  const [pluginFilterQuery, setPluginFilterQuery] = useState("");

  useEffect(() => {
    if (pathname.startsWith("/ui-elements")) {
      setUiElementsOpen(true);
    }
    if (pathname.startsWith("/plugins")) {
      setPluginsOpen(true);
    }
  }, [pathname]);

  const menuGroups = [
    {
      title: "Imobiliária",
      items: [
        { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { label: "Imóveis", href: "/properties", icon: Building2 },
        { label: "Novo Imóvel", href: "/properties/new", icon: PlusCircle },
        { label: "Leads & CRM", href: "/leads", icon: Users },
      ],
    },
    {
      title: "Inteligência & RAG",
      items: [
        { label: "Laboratório RAG", href: "/rag/laboratory", icon: Bot, badge: "Piloto" },
        { label: "Fontes & Drive", href: "/rag/sources", icon: HardDrive },
      ],
    },
  ];

  // Total de componentes e plugins
  const totalComponents =
    UI_ELEMENTS_CATEGORIES.reduce((acc, cat) => acc + cat.items.length, 0) +
    TABLER_PLUGINS_ITEMS.length;

  const filteredPlugins = TABLER_PLUGINS_ITEMS.filter((p) =>
    p.label.toLowerCase().includes(pluginFilterQuery.toLowerCase())
  );

  return (
    <>
      {/* Backdrop para Mobile com efeito suave de fade in/out e blur */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-zinc-950/60 backdrop-blur-xs transition-opacity duration-300 ease-in-out lg:hidden",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={cn(
          "flex flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 select-none",
          // Mobile Drawer: Desliza da esquerda com efeito suave
          "fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          // Desktop: Estático no layout, transição de largura suave e z-40 acima do header (z-30) para nunca cortar o botão
          "lg:static lg:inset-y-auto lg:relative lg:z-40 lg:shadow-none lg:translate-x-0 lg:transition-[width] lg:duration-300 lg:ease-[cubic-bezier(0.16,1,0.3,1)] lg:shrink-0",
          collapsed ? "lg:w-18" : "lg:w-68"
        )}
      >
        {/* Brand Header */}
        <div
          className={cn(
            "relative flex h-16 items-center px-3.5 border-b border-zinc-100 dark:border-zinc-800 shrink-0 overflow-visible",
            collapsed ? "justify-between lg:justify-center" : "justify-between"
          )}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Ícone do Logo - Clicar alterna o menu (expandir/recolher) no desktop */}
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined" && window.innerWidth >= 1024) {
                  setCollapsed(!collapsed);
                } else {
                  setMobileOpen(false);
                }
              }}
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs transition-all duration-200 cursor-pointer",
                "hover:scale-105 active:scale-95 hover:bg-zinc-800 dark:hover:bg-white",
                collapsed && "ring-2 ring-emerald-500/40 hover:ring-emerald-500"
              )}
              title={
                collapsed
                  ? "Clique no logo para expandir o menu"
                  : "Clique no logo para recolher o menu"
              }
              aria-label="Alternar menu lateral"
            >
              <Building2 className="h-5 w-5" />
            </button>

            {/* Texto do Logo - Navega para o Dashboard */}
            <Link
              href="/dashboard"
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex flex-col min-w-0 transition-all duration-200 group",
                collapsed ? "lg:hidden" : "block"
              )}
              title="Ir para o Dashboard"
            >
              <span className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100 block whitespace-nowrap group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                IMOB·PLATFORM
              </span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-medium whitespace-nowrap">
                RAG Ecosystem
              </span>
            </Link>
          </div>

          {/* Botão Fechar no Mobile */}
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="lg:hidden flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 cursor-pointer"
            aria-label="Fechar menu"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Toggle Button no Desktop - Nunca é cortado pois aside possui z-40 e botão z-50 */}
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              "hidden lg:flex h-6 w-6 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 shadow-md transition-all duration-200 cursor-pointer",
              collapsed
                ? "absolute -right-3 top-5 z-50 ring-2 ring-white dark:ring-zinc-900"
                : "relative z-10"
            )}
            title={collapsed ? "Expandir menu lateral" : "Recolher menu lateral"}
          >
            {collapsed ? (
              <ChevronRight className="h-3.5 w-3.5" />
            ) : (
              <ChevronLeft className="h-3.5 w-3.5" />
            )}
          </button>
        </div>

        {/* Navigation Groups com Rolagem Independente */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {menuGroups.map((group) => (
            <div key={group.title}>
              <h3
                className={cn(
                  "px-3 mb-2 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider dark:text-zinc-500",
                  collapsed && "lg:hidden"
                )}
              >
                {group.title}
              </h3>
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/dashboard" && pathname.startsWith(item.href));

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all group",
                          isActive
                            ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-2xs font-semibold"
                            : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-100"
                        )}
                        title={collapsed ? item.label : undefined}
                      >
                        <Icon
                          className={cn(
                            "h-4 w-4 shrink-0",
                            isActive
                              ? "text-current"
                              : "text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200"
                          )}
                        />
                        <span
                          className={cn(
                            "flex-1 truncate",
                            collapsed ? "lg:hidden" : "block"
                          )}
                        >
                          {item.label}
                        </span>
                        {item.badge && (
                          <span
                            className={cn(
                              "rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-tight",
                              collapsed ? "lg:hidden" : "inline-block",
                              isActive
                                ? "bg-white/20 text-white dark:bg-zinc-900/20 dark:text-zinc-900"
                                : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                            )}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {/* Grupo UI Elements & Plugins */}
          <div>
            <h3
              className={cn(
                "px-3 mb-2 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider dark:text-zinc-500 flex items-center justify-between",
                collapsed && "lg:hidden"
              )}
            >
              <span>Design System</span>
              <span className="text-[10px] bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 px-1.5 py-0.5 rounded font-mono font-medium">
                {totalComponents}
              </span>
            </h3>

            <ul className="space-y-1">
              {/* Accordion / Dropdown de Plugins */}
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (collapsed) setCollapsed(false);
                    setPluginsOpen(!pluginsOpen);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-all cursor-pointer",
                    pathname.startsWith("/plugins")
                      ? "text-zinc-900 font-semibold dark:text-zinc-100 bg-zinc-100/60 dark:bg-zinc-800/40"
                      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-100"
                  )}
                  title={collapsed ? "Plugins" : undefined}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Puzzle className="h-4 w-4 shrink-0 text-purple-600 dark:text-purple-400" />
                    <span className={cn("truncate", collapsed ? "lg:hidden" : "block")}>
                      Plugins
                    </span>
                  </div>
                  <div className={cn("items-center gap-1.5", collapsed ? "hidden" : "flex")}>
                    <span className="text-[10px] rounded bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 px-1 py-0.2 font-semibold">
                      Tabler
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 text-zinc-400 transition-transform duration-200",
                        pluginsOpen ? "rotate-180" : ""
                      )}
                    />
                  </div>
                </button>

                {/* Lista Desdobrada de Plugins */}
                {pluginsOpen && (
                  <div
                    className={cn(
                      "mt-2 ml-2 pl-3 border-l border-zinc-200 dark:border-zinc-800 space-y-2 animate-in slide-in-from-top-1 duration-150",
                      collapsed && "lg:hidden"
                    )}
                  >
                    {/* Busca Rápida de Plugins */}
                    <div className="relative pr-1">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
                      <input
                        type="text"
                        placeholder="Filtrar plugin..."
                        value={pluginFilterQuery}
                        onChange={(e) => setPluginFilterQuery(e.target.value)}
                        className="w-full rounded-md border border-zinc-200 bg-zinc-50/50 py-1 pl-8 pr-6 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-zinc-800/40 dark:text-zinc-100 dark:placeholder-zinc-500"
                      />
                      {pluginFilterQuery && (
                        <button
                          type="button"
                          onClick={() => setPluginFilterQuery("")}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </div>

                    <ul className="space-y-0.5">
                      {filteredPlugins.map((plugin) => {
                        const pluginHref = `/plugins/${plugin.slug}`;
                        const isPluginActive = pathname === pluginHref;

                        return (
                          <li key={plugin.slug}>
                            <Link
                              href={pluginHref}
                              onClick={() => setMobileOpen(false)}
                              className={cn(
                                "flex items-center justify-between rounded-md px-2.5 py-1.5 text-xs transition-colors",
                                isPluginActive
                                  ? "bg-zinc-900 text-white font-semibold dark:bg-zinc-100 dark:text-zinc-900 shadow-2xs"
                                  : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800/50"
                              )}
                            >
                              <span className="truncate">{plugin.label}</span>
                              {plugin.isNew && (
                                <span
                                  className={cn(
                                    "rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ml-1.5 shrink-0 transition-colors",
                                    isPluginActive
                                      ? "bg-white/20 text-white dark:bg-zinc-900/20 dark:text-zinc-900"
                                      : "bg-purple-50 text-purple-600 border border-purple-200/80 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800/60"
                                  )}
                                >
                                  new
                                </span>
                              )}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </li>

              {/* Accordion / Dropdown de UI Elements */}
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (collapsed) setCollapsed(false);
                    setUiElementsOpen(!uiElementsOpen);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-all cursor-pointer",
                    pathname.startsWith("/ui-elements")
                      ? "text-zinc-900 font-semibold dark:text-zinc-100 bg-zinc-100/60 dark:bg-zinc-800/40"
                      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-100"
                  )}
                  title={collapsed ? "UI Elements" : undefined}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Layers className="h-4 w-4 shrink-0 text-zinc-400" />
                    <span className={cn("truncate", collapsed ? "lg:hidden" : "block")}>
                      UI Elements
                    </span>
                  </div>
                  <div className={cn("items-center gap-1.5", collapsed ? "hidden" : "flex")}>
                    <span className="text-[10px] rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 px-1 py-0.2 font-semibold">
                      Tabler
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 text-zinc-400 transition-transform duration-200",
                        uiElementsOpen ? "rotate-180" : ""
                      )}
                    />
                  </div>
                </button>

                {/* Lista Desdobrada e Categorizada de Subitens */}
                {uiElementsOpen && (
                  <div
                    className={cn(
                      "mt-2 ml-2 pl-3 border-l border-zinc-200 dark:border-zinc-800 space-y-3 animate-in slide-in-from-top-1 duration-150",
                      collapsed && "lg:hidden"
                    )}
                  >
                    {/* Busca Rápida de Componentes */}
                    <div className="relative pr-1">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
                      <input
                        type="text"
                        placeholder="Filtrar elemento..."
                        value={filterQuery}
                        onChange={(e) => setFilterQuery(e.target.value)}
                        className="w-full rounded-md border border-zinc-200 bg-zinc-50/50 py-1 pl-8 pr-6 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-zinc-800/40 dark:text-zinc-100 dark:placeholder-zinc-500"
                      />
                      {filterQuery && (
                        <button
                          type="button"
                          onClick={() => setFilterQuery("")}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </div>

                    {UI_ELEMENTS_CATEGORIES.map((cat) => {
                      const filteredItems = cat.items.filter((item) =>
                        item.label.toLowerCase().includes(filterQuery.toLowerCase())
                      );

                      if (filteredItems.length === 0) return null;

                      return (
                        <div key={cat.category} className="space-y-1">
                          <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 px-1.5 pt-1">
                            {cat.category}
                          </div>
                          <ul className="space-y-0.5">
                            {filteredItems.map((sub) => {
                              const subHref = `/ui-elements/${sub.slug}`;
                              const isSubActive = pathname === subHref;

                              return (
                                <li key={sub.slug}>
                                  <Link
                                    href={subHref}
                                    onClick={() => setMobileOpen(false)}
                                    className={cn(
                                      "flex items-center justify-between rounded-md px-2.5 py-1.5 text-xs transition-colors",
                                      isSubActive
                                        ? "bg-zinc-900 text-white font-semibold dark:bg-zinc-100 dark:text-zinc-900 shadow-2xs"
                                        : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800/50"
                                    )}
                                  >
                                    <span className="truncate">{sub.label}</span>
                                    {sub.isNew && (
                                      <span
                                        className={cn(
                                          "rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ml-1.5 shrink-0 transition-colors",
                                          isSubActive
                                            ? "bg-white/20 text-white dark:bg-zinc-900/20 dark:text-zinc-900"
                                            : "bg-blue-50 text-blue-600 border border-blue-200/80 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800/60"
                                        )}
                                      >
                                        new
                                      </span>
                                    )}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Perfil */}
        <div className="p-3 border-t border-zinc-100 dark:border-zinc-800 shrink-0">
          <div
            className={cn(
              "flex items-center gap-3 rounded-lg p-2 bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800",
              collapsed ? "justify-start lg:justify-center" : "justify-start"
            )}
          >
            <div className="h-8 w-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
              DV
            </div>
            <div className={cn("min-w-0 flex-1", collapsed ? "lg:hidden" : "block")}>
              <p className="truncate text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                Davis Vasconcellos
              </p>
              <p className="truncate text-[10px] text-zinc-500 dark:text-zinc-400">
                Gestor Imobiliário / Tenant-01
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
