"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  ExternalLink,
  ChevronDown,
  MoreHorizontal,
  Home,
  BarChart3,
  Package,
  Shield,
  Settings,
  HelpCircle,
  Copy,
  Check,
  Sliders,
  Sparkles,
  Building2,
  Users,
  FileText,
  Pin,
} from "lucide-react";
import { toast } from "sonner";

// Tabler SVG icons for exact rendering
const TablerIcons = {
  home: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
      <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
    </svg>
  ),
  chartBar: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M3 13a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -6" />
      <path d="M15 9a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -10" />
      <path d="M9 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -14" />
      <path d="M4 20h14" />
    </svg>
  ),
  package: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" />
      <path d="M12 12l8 -4.5" />
      <path d="M12 12l0 9" />
      <path d="M12 12l-8 -4.5" />
    </svg>
  ),
  shield: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />
    </svg>
  ),
  settings: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
      <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
    </svg>
  ),
  dots: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
    </svg>
  ),
};

export function TablerNavOverflow() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // States for active items
  const [activePill, setActivePill] = useState("Home");
  const [activeTab, setActiveTab] = useState("Overview");
  const [activeUnderline, setActiveUnderline] = useState("Home");
  const [activeDropdownPill, setActiveDropdownPill] = useState("Home");
  const [activeIconToggle, setActiveIconToggle] = useState("Home");
  const [activeNavbar, setActiveNavbar] = useState("Home");
  const [activeColoredNavbar, setActiveColoredNavbar] = useState("Home");

  // Open dropdown states
  const [openMenuKey, setOpenMenuKey] = useState<string | null>(null);

  // Dynamic width simulation (percentage of card)
  const [simulatedWidth, setSimulatedWidth] = useState(100);

  const toggleDropdown = (key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenuKey((prev) => (prev === key ? null : key));
  };

  const closeDropdowns = () => {
    if (openMenuKey) setOpenMenuKey(null);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast.success("Snippet copiado!");
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Close on outside click
  useEffect(() => {
    const handleClick = () => setOpenMenuKey(null);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300" onClick={closeDropdowns}>
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            <span>Tabler UI</span>
            <span>•</span>
            <span className="text-primary font-bold">Navigation</span>
            <span>•</span>
            <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">1:1 Replica</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Nav Overflow</h1>
          <p className="text-muted-foreground text-sm mt-1 max-w-2xl">
            Colapsa automaticamente itens excedentes de listas de navegação horizontais em um menu dropdown <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">Mais...</code> sem quebrar o layout.
            Réplica 100% fiel de <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">https://preview.tabler.io/nav-overflow.html</code>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://preview.tabler.io/nav-overflow.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border border-border bg-card hover:bg-muted transition-colors text-muted-foreground hover:text-foreground shadow-sm"
          >
            <span>Ver Oficial Tabler</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Interactive Responsive Resizer */}
      <Card className="border-primary/20 bg-muted/20 dark:bg-muted/10 shadow-xs">
        <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Sliders className="w-4 h-4 text-primary" />
            <div>
              <span className="text-xs font-bold block">Simulador de Largura do Contêiner</span>
              <span className="text-[11px] text-muted-foreground">
                Arraste o slider para simular o comportamento de overflow em diferentes larguras de viewport.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <input
              type="range"
              min="35"
              max="100"
              value={simulatedWidth}
              onChange={(e) => setSimulatedWidth(Number(e.target.value))}
              className="w-full sm:w-44 accent-primary h-1.5 bg-muted rounded cursor-pointer"
            />
            <span className="font-mono text-xs font-bold w-12 text-right">{simulatedWidth}%</span>
            <button
              onClick={() => setSimulatedWidth(100)}
              className="px-2 py-1 text-[11px] font-medium border border-border rounded bg-background hover:bg-muted"
            >
              Reset
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Grid with 2 columns matching Tabler col-md-6 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* ======================================================== */}
        {/* CARD 1: Pills                                             */}
        {/* ======================================================== */}
        <Card className="shadow-sm hover:shadow transition-shadow">
          <CardHeader className="pb-3 border-b border-border/40">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold">Pills</CardTitle>
                <CardDescription className="text-xs">
                  Wrap a <code className="text-[11px] bg-muted px-1 py-0.5 rounded font-mono">.nav</code> in <code className="text-[11px] bg-muted px-1 py-0.5 rounded font-mono">.nav-overflow</code> with <code className="text-[11px] bg-muted px-1 py-0.5 rounded font-mono">data-bs-toggle="nav-overflow"</code>.
                </CardDescription>
              </div>
              <button
                onClick={() => handleCopy('<div class="nav-overflow" data-bs-toggle="nav-overflow"><ul class="nav nav-pills">...</ul></div>', 'pills')}
                className="p-1.5 text-muted-foreground hover:text-foreground rounded hover:bg-muted transition-colors"
                title="Copiar código"
              >
                {copiedKey === 'pills' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div style={{ width: `${simulatedWidth}%` }} className="transition-all duration-300">
              <div className="flex items-center gap-1 overflow-visible relative">
                {/* Visible items */}
                {["Home", "Dashboard", "Products", "Services", simulatedWidth > 75 ? "Analytics" : null, simulatedWidth > 85 ? "Reports" : null].filter(Boolean).map((item) => (
                  <button
                    key={item}
                    onClick={() => setActivePill(item!)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      activePill === item
                        ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {item}
                  </button>
                ))}

                {/* Overflow Dropdown */}
                <div className="relative">
                  <button
                    onClick={(e) => toggleDropdown("pills-more", e)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors border border-dashed border-border"
                  >
                    <span>More</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>

                  {openMenuKey === "pills-more" && (
                    <div className="absolute right-0 top-full mt-1.5 w-44 rounded-lg bg-popover border border-border shadow-lg z-50 py-1 animate-in fade-in-50 zoom-in-95">
                      {["Analytics", "Reports", "Settings", "Users", "Help", "Community", "Feedback"].map((item) => (
                        <button
                          key={item}
                          onClick={() => {
                            setActivePill(item);
                            setOpenMenuKey(null);
                          }}
                          className={`w-full text-left px-3 py-1.5 text-xs transition-colors flex items-center justify-between ${
                            activePill === item
                              ? "bg-primary/10 text-primary font-bold"
                              : "text-foreground hover:bg-muted"
                          }`}
                        >
                          <span>{item}</span>
                          {activePill === item && <Check className="w-3.5 h-3.5" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ======================================================== */}
        {/* CARD 2: Tabs                                              */}
        {/* ======================================================== */}
        <Card className="shadow-sm hover:shadow transition-shadow">
          <CardHeader className="pb-3 border-b border-border/40">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold">Tabs</CardTitle>
                <CardDescription className="text-xs">
                  Works with <code className="text-[11px] bg-muted px-1 py-0.5 rounded font-mono">.nav-tabs</code> and keeps <code className="text-[11px] bg-muted px-1 py-0.5 rounded font-mono">.active</code> and <code className="text-[11px] bg-muted px-1 py-0.5 rounded font-mono">.disabled</code> in the menu.
                </CardDescription>
              </div>
              <button
                onClick={() => handleCopy('<div class="nav-overflow" data-bs-toggle="nav-overflow"><ul class="nav nav-tabs">...</ul></div>', 'tabs')}
                className="p-1.5 text-muted-foreground hover:text-foreground rounded hover:bg-muted transition-colors"
                title="Copiar código"
              >
                {copiedKey === 'tabs' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div style={{ width: `${simulatedWidth}%` }} className="transition-all duration-300">
              <div className="flex items-center border-b border-border relative">
                {/* Visible Tabs */}
                {["Overview", "Details", "History", simulatedWidth > 75 ? "Activity" : null].filter(Boolean).map((item) => (
                  <button
                    key={item}
                    onClick={() => setActiveTab(item!)}
                    className={`px-3.5 py-2 text-xs font-medium border-b-2 transition-colors -mb-px ${
                      activeTab === item
                        ? "border-primary text-primary font-bold bg-background"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
                    }`}
                  >
                    {item}
                  </button>
                ))}

                {/* Overflow Tab Dropdown */}
                <div className="relative -mb-px">
                  <button
                    onClick={(e) => toggleDropdown("tabs-more", e)}
                    className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium border-b-2 border-transparent text-muted-foreground hover:text-foreground hover:border-muted transition-colors"
                  >
                    <span>More</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>

                  {openMenuKey === "tabs-more" && (
                    <div className="absolute right-0 top-full mt-1 w-44 rounded-lg bg-popover border border-border shadow-lg z-50 py-1 animate-in fade-in-50 zoom-in-95">
                      <button
                        onClick={() => { setActiveTab("Activity"); setOpenMenuKey(null); }}
                        className="w-full text-left px-3 py-1.5 text-xs hover:bg-muted text-foreground flex items-center justify-between"
                      >
                        <span>Activity</span>
                        {activeTab === "Activity" && <Check className="w-3.5 h-3.5 text-primary" />}
                      </button>
                      <button
                        disabled
                        className="w-full text-left px-3 py-1.5 text-xs text-muted-foreground/50 cursor-not-allowed flex items-center justify-between"
                      >
                        <span>Comments</span>
                        <span className="text-[10px] bg-muted px-1 rounded">disabled</span>
                      </button>
                      <button
                        onClick={() => { setActiveTab("Attachments"); setOpenMenuKey(null); }}
                        className="w-full text-left px-3 py-1.5 text-xs hover:bg-muted text-foreground flex items-center justify-between"
                      >
                        <span>Attachments</span>
                        {activeTab === "Attachments" && <Check className="w-3.5 h-3.5 text-primary" />}
                      </button>
                      <button
                        onClick={() => { setActiveTab("Audit Logs"); setOpenMenuKey(null); }}
                        className="w-full text-left px-3 py-1.5 text-xs hover:bg-muted text-foreground flex items-center justify-between"
                      >
                        <span>Audit Logs</span>
                        {activeTab === "Audit Logs" && <Check className="w-3.5 h-3.5 text-primary" />}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ======================================================== */}
        {/* CARD 3: Keep items visible (.nav-overflow-keep)            */}
        {/* ======================================================== */}
        <Card className="shadow-sm hover:shadow transition-shadow">
          <CardHeader className="pb-3 border-b border-border/40">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold">Keep items visible</CardTitle>
                <CardDescription className="text-xs">
                  Add <code className="text-[11px] bg-muted px-1 py-0.5 rounded font-mono">.nav-overflow-keep</code> to items that must never move to the menu.
                </CardDescription>
              </div>
              <button
                onClick={() => handleCopy('<li class="nav-item nav-overflow-keep"><a class="nav-link" href="#">Home</a></li>', 'keep')}
                className="p-1.5 text-muted-foreground hover:text-foreground rounded hover:bg-muted transition-colors"
                title="Copiar código"
              >
                {copiedKey === 'keep' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div style={{ width: `${simulatedWidth}%` }} className="transition-all duration-300">
              <div className="flex items-center justify-between border-b border-border relative">
                <div className="flex items-center">
                  {/* Pinned Home (.nav-overflow-keep) */}
                  <button
                    onClick={() => setActiveUnderline("Home")}
                    className={`inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold border-b-2 transition-colors -mb-px ${
                      activeUnderline === "Home"
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span>Home</span>
                    <span title="nav-overflow-keep (fixado)"><Pin className="w-2.5 h-2.5 text-primary" /></span>
                  </button>

                  {/* Middle items that can overflow */}
                  {["Products", simulatedWidth > 80 ? "Services" : null, simulatedWidth > 90 ? "About" : null].filter(Boolean).map((item) => (
                    <button
                      key={item}
                      onClick={() => setActiveUnderline(item!)}
                      className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors -mb-px ${
                        activeUnderline === item
                          ? "border-primary text-primary font-bold"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item}
                    </button>
                  ))}

                  {/* Overflow dropdown */}
                  <div className="relative -mb-px">
                    <button
                      onClick={(e) => toggleDropdown("keep-more", e)}
                      className="inline-flex items-center gap-1 px-2.5 py-2 text-xs font-medium border-b-2 border-transparent text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span>More</span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>

                    {openMenuKey === "keep-more" && (
                      <div className="absolute left-0 top-full mt-1 w-40 rounded-lg bg-popover border border-border shadow-lg z-50 py-1 animate-in fade-in-50 zoom-in-95">
                        {["Services", "About", "Blog", "Careers"].map((item) => (
                          <button
                            key={item}
                            onClick={() => { setActiveUnderline(item); setOpenMenuKey(null); }}
                            className="w-full text-left px-3 py-1.5 text-xs hover:bg-muted text-foreground"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Pinned Contact on the right (.nav-overflow-keep) */}
                <button
                  onClick={() => setActiveUnderline("Contact")}
                  className={`inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold border-b-2 transition-colors -mb-px shrink-0 ${
                    activeUnderline === "Contact"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span>Contact</span>
                  <span title="nav-overflow-keep (fixado)"><Pin className="w-2.5 h-2.5 text-primary" /></span>
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ======================================================== */}
        {/* CARD 4: With dropdowns                                    */}
        {/* ======================================================== */}
        <Card className="shadow-sm hover:shadow transition-shadow">
          <CardHeader className="pb-3 border-b border-border/40">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold">With dropdowns</CardTitle>
                <CardDescription className="text-xs">
                  A nav item with a dropdown becomes a nested dropdown in the menu.
                </CardDescription>
              </div>
              <button
                onClick={() => handleCopy('<li class="nav-item dropdown"><a class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Products</a></li>', 'dropdowns')}
                className="p-1.5 text-muted-foreground hover:text-foreground rounded hover:bg-muted transition-colors"
                title="Copiar código"
              >
                {copiedKey === 'dropdowns' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div style={{ width: `${simulatedWidth}%` }} className="transition-all duration-300">
              <div className="flex items-center gap-1 relative">
                <button
                  onClick={() => setActiveDropdownPill("Home")}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    activeDropdownPill === "Home"
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  Home
                </button>

                <button
                  onClick={() => setActiveDropdownPill("Dashboard")}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    activeDropdownPill === "Dashboard"
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  Dashboard
                </button>

                {/* Submenu: Products */}
                <div className="relative">
                  <button
                    onClick={(e) => toggleDropdown("sub-products", e)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <span>Products</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  {openMenuKey === "sub-products" && (
                    <div className="absolute left-0 top-full mt-1.5 w-36 rounded-lg bg-popover border border-border shadow-lg z-50 py-1 animate-in fade-in-50 zoom-in-95">
                      <button onClick={() => { toast.info("Laptops"); setOpenMenuKey(null); }} className="w-full text-left px-3 py-1.5 text-xs hover:bg-muted">Laptops</button>
                      <button onClick={() => { toast.info("Phones"); setOpenMenuKey(null); }} className="w-full text-left px-3 py-1.5 text-xs hover:bg-muted">Phones</button>
                      <button onClick={() => { toast.info("Tablets"); setOpenMenuKey(null); }} className="w-full text-left px-3 py-1.5 text-xs hover:bg-muted">Tablets</button>
                    </div>
                  )}
                </div>

                {/* Submenu: Company */}
                <div className="relative">
                  <button
                    onClick={(e) => toggleDropdown("sub-company", e)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <span>Company</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  {openMenuKey === "sub-company" && (
                    <div className="absolute left-0 top-full mt-1.5 w-36 rounded-lg bg-popover border border-border shadow-lg z-50 py-1 animate-in fade-in-50 zoom-in-95">
                      <button onClick={() => { toast.info("About Us"); setOpenMenuKey(null); }} className="w-full text-left px-3 py-1.5 text-xs hover:bg-muted">About Us</button>
                      <button onClick={() => { toast.info("Team"); setOpenMenuKey(null); }} className="w-full text-left px-3 py-1.5 text-xs hover:bg-muted">Team</button>
                      <button onClick={() => { toast.info("Careers"); setOpenMenuKey(null); }} className="w-full text-left px-3 py-1.5 text-xs hover:bg-muted">Careers</button>
                    </div>
                  )}
                </div>

                {/* More... */}
                <div className="relative">
                  <button
                    onClick={(e) => toggleDropdown("nested-more", e)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors border border-dashed border-border"
                  >
                    <span>More</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  {openMenuKey === "nested-more" && (
                    <div className="absolute right-0 top-full mt-1.5 w-40 rounded-lg bg-popover border border-border shadow-lg z-50 py-1 animate-in fade-in-50 zoom-in-95">
                      <button onClick={() => { toast.info("Services"); setOpenMenuKey(null); }} className="w-full text-left px-3 py-1.5 text-xs hover:bg-muted">Services</button>
                      <button onClick={() => { toast.info("Support"); setOpenMenuKey(null); }} className="w-full text-left px-3 py-1.5 text-xs hover:bg-muted">Support</button>
                      <button onClick={() => { toast.info("Contact"); setOpenMenuKey(null); }} className="w-full text-left px-3 py-1.5 text-xs hover:bg-muted">Contact</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ======================================================== */}
        {/* CARD 5: Icon-only toggle                                  */}
        {/* ======================================================== */}
        <Card className="shadow-sm hover:shadow transition-shadow">
          <CardHeader className="pb-3 border-b border-border/40">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold">Icon-only toggle</CardTitle>
                <CardDescription className="text-xs">
                  Set <code className="text-[11px] bg-muted px-1 py-0.5 rounded font-mono">data-bs-more-text="false"</code> to show only the icon.
                </CardDescription>
              </div>
              <button
                onClick={() => handleCopy('<div class="nav-overflow" data-bs-toggle="nav-overflow" data-bs-more-text="false">...</div>', 'icon-only')}
                className="p-1.5 text-muted-foreground hover:text-foreground rounded hover:bg-muted transition-colors"
                title="Copiar código"
              >
                {copiedKey === 'icon-only' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div style={{ width: `${simulatedWidth}%` }} className="transition-all duration-300">
              <div className="flex items-center gap-1 relative">
                {["Home", "Dashboard", "Products", "Services", simulatedWidth > 80 ? "Analytics" : null].filter(Boolean).map((item) => (
                  <button
                    key={item}
                    onClick={() => setActiveIconToggle(item!)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      activeIconToggle === item
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {item}
                  </button>
                ))}

                {/* Icon-Only More Button (Three dots ...) */}
                <div className="relative">
                  <button
                    onClick={(e) => toggleDropdown("dots-more", e)}
                    className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors border border-border flex items-center justify-center"
                    title="Mais opções"
                    aria-label="More"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>

                  {openMenuKey === "dots-more" && (
                    <div className="absolute right-0 top-full mt-1.5 w-36 rounded-lg bg-popover border border-border shadow-lg z-50 py-1 animate-in fade-in-50 zoom-in-95">
                      {["Analytics", "Reports", "Settings", "Help"].map((item) => (
                        <button
                          key={item}
                          onClick={() => { setActiveIconToggle(item); setOpenMenuKey(null); }}
                          className="w-full text-left px-3 py-1.5 text-xs hover:bg-muted text-foreground"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ======================================================== */}
        {/* CARD 6: In a navbar                                       */}
        {/* ======================================================== */}
        <Card className="shadow-sm hover:shadow transition-shadow">
          <CardHeader className="pb-3 border-b border-border/40">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold">In a navbar</CardTitle>
                <CardDescription className="text-xs">
                  Wrap the <code className="text-[11px] bg-muted px-1 py-0.5 rounded font-mono">.navbar-nav</code> of a navbar in <code className="text-[11px] bg-muted px-1 py-0.5 rounded font-mono">.nav-overflow</code>.
                </CardDescription>
              </div>
              <button
                onClick={() => handleCopy('<div class="navbar navbar-expand rounded border"><nav class="nav-overflow">...</nav></div>', 'in-navbar')}
                className="p-1.5 text-muted-foreground hover:text-foreground rounded hover:bg-muted transition-colors"
                title="Copiar código"
              >
                {copiedKey === 'in-navbar' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div style={{ width: `${simulatedWidth}%` }} className="transition-all duration-300">
              <nav className="p-2 rounded-xl border border-border bg-card/80 flex items-center justify-between gap-3 shadow-2xs">
                {/* Brand */}
                <a href="#" className="font-extrabold text-sm text-foreground tracking-tight px-2 shrink-0">
                  Brand
                </a>

                {/* Navbar items */}
                <div className="flex items-center gap-1 relative overflow-visible">
                  <button
                    onClick={() => setActiveNavbar("Home")}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                      activeNavbar === "Home"
                        ? "bg-primary/10 text-primary font-bold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>Home</span>
                  </button>

                  <button
                    onClick={() => setActiveNavbar("Analytics")}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                      activeNavbar === "Analytics"
                        ? "bg-primary/10 text-primary font-bold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span>Analytics</span>
                  </button>

                  {simulatedWidth > 70 && (
                    <button
                      onClick={() => setActiveNavbar("Products")}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                        activeNavbar === "Products"
                          ? "bg-primary/10 text-primary font-bold"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      <Package className="w-3.5 h-3.5" />
                      <span>Products</span>
                    </button>
                  )}

                  {/* Overflow dropdown in navbar */}
                  <div className="relative">
                    <button
                      onClick={(e) => toggleDropdown("navbar-more", e)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors border border-border/60"
                    >
                      <span>More</span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>

                    {openMenuKey === "navbar-more" && (
                      <div className="absolute right-0 top-full mt-1.5 w-40 rounded-lg bg-popover border border-border shadow-lg z-50 py-1 animate-in fade-in-50 zoom-in-95">
                        <button
                          onClick={() => { setActiveNavbar("Products"); setOpenMenuKey(null); }}
                          className="w-full text-left px-3 py-1.5 text-xs hover:bg-muted flex items-center gap-2"
                        >
                          <Package className="w-3.5 h-3.5 text-muted-foreground" />
                          <span>Products</span>
                        </button>
                        <button
                          onClick={() => { setActiveNavbar("Services"); setOpenMenuKey(null); }}
                          className="w-full text-left px-3 py-1.5 text-xs hover:bg-muted flex items-center gap-2"
                        >
                          <Shield className="w-3.5 h-3.5 text-muted-foreground" />
                          <span>Services</span>
                        </button>
                        <button
                          onClick={() => { setActiveNavbar("Settings"); setOpenMenuKey(null); }}
                          className="w-full text-left px-3 py-1.5 text-xs hover:bg-muted flex items-center gap-2"
                        >
                          <Settings className="w-3.5 h-3.5 text-muted-foreground" />
                          <span>Settings</span>
                        </button>
                        <button
                          onClick={() => { setActiveNavbar("Help"); setOpenMenuKey(null); }}
                          className="w-full text-left px-3 py-1.5 text-xs hover:bg-muted flex items-center gap-2"
                        >
                          <HelpCircle className="w-3.5 h-3.5 text-muted-foreground" />
                          <span>Help</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </nav>
            </div>
          </CardContent>
        </Card>

        {/* ======================================================== */}
        {/* CARD 7: Colored navbar                                    */}
        {/* ======================================================== */}
        <div className="md:col-span-2">
          <Card className="shadow-sm hover:shadow transition-shadow">
            <CardHeader className="pb-3 border-b border-border/40">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold">Colored navbar</CardTitle>
                  <CardDescription className="text-xs">
                    The overflow menu follows the theme of the navbar, here <code className="text-[11px] bg-muted px-1 py-0.5 rounded font-mono">data-bs-theme="dark"</code>.
                  </CardDescription>
                </div>
                <button
                  onClick={() => handleCopy('<div class="navbar navbar-expand rounded bg-primary" data-bs-theme="dark">...</div>', 'colored-nav')}
                  className="p-1.5 text-muted-foreground hover:text-foreground rounded hover:bg-muted transition-colors"
                  title="Copiar código"
                >
                  {copiedKey === 'colored-nav' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div style={{ width: `${simulatedWidth}%` }} className="transition-all duration-300">
                <nav className="p-2.5 rounded-xl bg-blue-600 dark:bg-blue-700 text-white flex items-center justify-between gap-3 shadow-md">
                  {/* Brand */}
                  <a href="#" className="font-extrabold text-sm text-white tracking-tight px-2 shrink-0">
                    Brand
                  </a>

                  {/* Navbar items */}
                  <div className="flex items-center gap-1 relative overflow-visible">
                    {["Home", "Analytics", "Products", simulatedWidth > 65 ? "Customers" : null, simulatedWidth > 85 ? "Reports" : null].filter(Boolean).map((item) => (
                      <button
                        key={item}
                        onClick={() => setActiveColoredNavbar(item!)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                          activeColoredNavbar === item
                            ? "bg-white/20 text-white font-bold"
                            : "text-white/80 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        {item}
                      </button>
                    ))}

                    {/* Dark themed overflow dropdown */}
                    <div className="relative">
                      <button
                        onClick={(e) => toggleDropdown("colored-more", e)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors border border-white/20"
                      >
                        <span>More</span>
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>

                      {openMenuKey === "colored-more" && (
                        <div className="absolute right-0 top-full mt-1.5 w-44 rounded-lg bg-zinc-900 text-white border border-zinc-800 shadow-2xl z-50 py-1 animate-in fade-in-50 zoom-in-95">
                          {["Customers", "Reports", "Documentation", "Billing", "Settings"].map((item) => (
                            <button
                              key={item}
                              onClick={() => { setActiveColoredNavbar(item); setOpenMenuKey(null); }}
                              className="w-full text-left px-3 py-1.5 text-xs hover:bg-zinc-800 text-zinc-200 hover:text-white flex items-center justify-between transition-colors"
                            >
                              <span>{item}</span>
                              {activeColoredNavbar === item && <Check className="w-3.5 h-3.5 text-blue-400" />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </nav>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ======================================================== */}
        {/* BONUS: Real Estate Portal Filter Bar                      */}
        {/* ======================================================== */}
        <div className="md:col-span-2">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card shadow-sm">
            <CardHeader className="pb-3 border-b border-border/40">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-primary/10 text-primary">
                  <Sparkles className="w-4 h-4" />
                </span>
                <div>
                  <CardTitle className="text-base font-bold">Aplicação no Portal Imobiliário: Barra de Filtros Inteligente</CardTitle>
                  <CardDescription className="text-xs">
                    Quando o corretor ou cliente adiciona múltiplos filtros de categoria de imóveis, os excedentes são agregados automaticamente no menu de overflow.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="p-3 rounded-xl border border-border bg-card flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-muted-foreground flex items-center gap-1.5 mr-2">
                    <Building2 className="w-3.5 h-3.5 text-primary" />
                    Categorias:
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-primary text-primary-foreground text-xs font-semibold">
                    Todos os Imóveis
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-muted text-foreground text-xs hover:bg-muted/80 cursor-pointer">
                    Coberturas
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-muted text-foreground text-xs hover:bg-muted/80 cursor-pointer">
                    Frente Mar
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-muted text-foreground text-xs hover:bg-muted/80 cursor-pointer hidden sm:inline-block">
                    Casas em Condomínio
                  </span>
                  <button className="px-2.5 py-1 rounded-md border border-dashed border-border text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
                    <span>+4 Filtros</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </div>

                <div className="text-xs text-muted-foreground font-medium">
                  Mostrando <strong className="text-foreground">128</strong> imóveis selecionados
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
