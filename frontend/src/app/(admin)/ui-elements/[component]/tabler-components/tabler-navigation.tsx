"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  ExternalLink,
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  MessageSquare,
  Heart,
  GitFork,
  Sliders,
  Sparkles,
  Building2,
  Copy,
  Check,
} from "lucide-react";
import { toast } from "sonner";

// Tabler Star SVG
const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
    <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873l-6.158 -3.245" />
  </svg>
);

// Tabler Logo SVG
const TablerLogo = ({ color = "#066fd1", width = 28, height = 28 }: { color?: string; width?: number; height?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 68" width={width} height={height} className="shrink-0">
    <path
      d="M64.6 16.2C63 9.9 58.1 5 51.8 3.4 40 1.5 28 1.5 16.2 3.4 9.9 5 5 9.9 3.4 16.2 1.5 28 1.5 40 3.4 51.8 5 58.1 9.9 63 16.2 64.6c11.8 1.9 23.8 1.9 35.6 0C58.1 63 63 58.1 64.6 51.8c1.9-11.8 1.9-23.8 0-35.6zM33.3 36.3c-2.8 4.4-6.6 8.2-11.1 11-1.5.9-3.3.9-4.8.1s-2.4-2.3-2.5-4c0-1.7.9-3.3 2.4-4.1 2.3-1.4 4.4-3.2 6.1-5.3-1.8-2.1-3.8-3.8-6.1-5.3-2.3-1.3-3-4.2-1.7-6.4s4.3-2.9 6.5-1.6c4.5 2.8 8.2 6.5 11.1 10.9 1 1.4 1 3.3.1 4.7zM49.2 46H37.8c-2.1 0-3.8-1-3.8-3s1.7-3 3.8-3h11.4c2.1 0 3.8 1 3.8 3s-1.7 3-3.8 3z"
      fill={color}
    />
  </svg>
);

export function TablerNavigation() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Active nav item states
  const [activeNav1, setActiveNav1] = useState("First");
  const [activeNav2, setActiveNav2] = useState("First");
  const [activeNav3, setActiveNav3] = useState("First");
  const [activeNav4, setActiveNav4] = useState("First");
  const [activeNav5, setActiveNav5] = useState("First");
  const [activeNav6, setActiveNav6] = useState("First");
  const [activeNav7, setActiveNav7] = useState("First");

  // Open dropdown states
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast.success("Snippet copiado!");
    setTimeout(() => setCopiedKey(null), 2000);
  };

  useEffect(() => {
    const handleOutsideClick = () => setOpenDropdown(null);
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            <span>Tabler UI</span>
            <span>•</span>
            <span className="text-primary font-bold">Headers & Menus</span>
            <span>•</span>
            <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">1:1 Replica</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Navigation</h1>
          <p className="text-muted-foreground text-sm mt-1 max-w-3xl">
            Variações oficiais de barras de navegação do Tabler com temas transparente, claro, escuro, cores de marca (roxo e primário) e layout de dois níveis com subnavegação.
            Réplica 100% fiel de <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">https://preview.tabler.io/navigation.html</code>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://preview.tabler.io/navigation.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border border-border bg-card hover:bg-muted transition-colors text-muted-foreground hover:text-foreground shadow-sm"
          >
            <span>Ver Oficial Tabler</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Navbars Stack */}
      <div className="space-y-6">

        {/* ======================================================== */}
        {/* NAVBAR 1: Transparent Navbar                              */}
        {/* ======================================================== */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              1. Transparent Navbar (navbar-transparent)
            </span>
            <button
              onClick={() => handleCopy('<header class="navbar navbar-expand-md navbar-transparent d-print-none">...</header>', 'nav1')}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === 'nav1' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copiar HTML</span>
            </button>
          </div>

          <div className="rounded-xl border border-dashed border-border/80 bg-muted/20 dark:bg-muted/5 p-1">
            <header className="w-full flex items-center justify-between px-4 py-2.5 bg-transparent rounded-lg">
              <div className="flex items-center gap-6">
                <a href="#" className="flex items-center gap-2 font-bold text-sm tracking-tight text-foreground">
                  <TablerLogo />
                  <span>Tabler</span>
                </a>

                {/* Nav Links */}
                <div className="hidden lg:flex items-center gap-1 text-xs">
                  <button
                    onClick={() => setActiveNav1("First")}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
                      activeNav1 === "First"
                        ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                    }`}
                  >
                    <StarIcon />
                    <span>First</span>
                  </button>

                  <button
                    onClick={() => setActiveNav1("Second")}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
                      activeNav1 === "Second"
                        ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                    }`}
                  >
                    <StarIcon />
                    <span>Second</span>
                    <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 rounded-full">2</span>
                  </button>

                  {/* Dropdown: Third */}
                  <div className="relative">
                    <button
                      onClick={(e) => toggleDropdown("nav1-third", e)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                    >
                      <StarIcon />
                      <span>Third</span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    {openDropdown === "nav1-third" && (
                      <div className="absolute left-0 top-full mt-1.5 w-36 bg-popover border border-border rounded-lg shadow-lg py-1 z-50 animate-in fade-in-50 zoom-in-95">
                        <button onClick={() => { toast.info("First"); setOpenDropdown(null); }} className="w-full text-left px-3 py-1.5 text-xs hover:bg-muted">First</button>
                        <button onClick={() => { toast.info("Second"); setOpenDropdown(null); }} className="w-full text-left px-3 py-1.5 text-xs hover:bg-muted">Second</button>
                        <button onClick={() => { toast.info("Third"); setOpenDropdown(null); }} className="w-full text-left px-3 py-1.5 text-xs hover:bg-muted">Third</button>
                      </div>
                    )}
                  </div>

                  <span className="px-3 py-1.5 text-muted-foreground/40 cursor-not-allowed">
                    Disabled
                  </span>
                </div>
              </div>

              {/* Right side: Search, Bell, Profile */}
              <div className="flex items-center gap-3">
                <div className="relative hidden sm:block w-44">
                  <input
                    type="text"
                    placeholder="Search…"
                    className="w-full text-xs pl-8 pr-3 py-1.5 bg-background/80 border border-border rounded-md focus:outline-hidden focus:ring-1 focus:ring-primary"
                  />
                  <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-2.5 top-2" />
                </div>

                <button
                  onClick={() => toast.info("Notificações transparentes")}
                  className="p-1.5 rounded-md border border-border/60 hover:bg-muted/60 text-muted-foreground hover:text-foreground relative"
                >
                  <Bell className="w-4 h-4" />
                  <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1 right-1" />
                </button>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={(e) => toggleDropdown("nav1-user", e)}
                    className="flex items-center gap-2 p-1 rounded-md hover:bg-muted/60 transition-colors"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                      alt="Mallory Hulme"
                      className="w-7 h-7 rounded-full object-cover border border-border"
                    />
                    <div className="hidden xl:block text-left">
                      <div className="text-xs font-semibold leading-tight">Mallory Hulme</div>
                      <div className="text-[10px] text-muted-foreground">Geologist IV</div>
                    </div>
                  </button>

                  {openDropdown === "nav1-user" && (
                    <div className="absolute right-0 top-full mt-1.5 w-44 bg-popover border border-border rounded-lg shadow-lg py-1 z-50 text-xs animate-in fade-in-50 zoom-in-95">
                      <button onClick={() => toast.info("Perfil")} className="w-full text-left px-3 py-1.5 hover:bg-muted flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-muted-foreground" />
                        <span>Profile</span>
                      </button>
                      <button onClick={() => toast.info("Feedback")} className="w-full text-left px-3 py-1.5 hover:bg-muted flex items-center gap-2">
                        <MessageSquare className="w-3.5 h-3.5 text-muted-foreground" />
                        <span>Feedback</span>
                      </button>
                      <div className="border-t border-border my-1" />
                      <button onClick={() => toast.info("Configurações")} className="w-full text-left px-3 py-1.5 hover:bg-muted flex items-center gap-2">
                        <Settings className="w-3.5 h-3.5 text-muted-foreground" />
                        <span>Settings</span>
                      </button>
                      <button onClick={() => toast.info("Saindo...")} className="w-full text-left px-3 py-1.5 hover:bg-muted flex items-center gap-2 text-rose-600">
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </header>
          </div>
        </div>

        {/* ======================================================== */}
        {/* NAVBAR 2: Default Light Solid Navbar                     */}
        {/* ======================================================== */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              2. Default Solid Navbar (Light Theme)
            </span>
            <button
              onClick={() => handleCopy('<header class="navbar navbar-expand-md d-print-none">...</header>', 'nav2')}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === 'nav2' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copiar HTML</span>
            </button>
          </div>

          <header className="w-full flex items-center justify-between px-4 py-2.5 bg-card border border-border rounded-xl shadow-xs">
            <div className="flex items-center gap-6">
              <a href="#" className="flex items-center gap-2 font-bold text-sm tracking-tight text-foreground">
                <TablerLogo />
                <span>Tabler</span>
              </a>

              <div className="hidden lg:flex items-center gap-1 text-xs">
                <button
                  onClick={() => setActiveNav2("First")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
                    activeNav2 === "First"
                      ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <StarIcon />
                  <span>First</span>
                </button>

                <button
                  onClick={() => setActiveNav2("Second")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
                    activeNav2 === "Second"
                      ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <StarIcon />
                  <span>Second</span>
                  <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 rounded-full">2</span>
                </button>

                <div className="relative">
                  <button
                    onClick={(e) => toggleDropdown("nav2-third", e)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <StarIcon />
                    <span>Third</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  {openDropdown === "nav2-third" && (
                    <div className="absolute left-0 top-full mt-1.5 w-36 bg-popover border border-border rounded-lg shadow-lg py-1 z-50 animate-in fade-in-50 zoom-in-95">
                      <button onClick={() => { toast.info("First"); setOpenDropdown(null); }} className="w-full text-left px-3 py-1.5 text-xs hover:bg-muted">First</button>
                      <button onClick={() => { toast.info("Second"); setOpenDropdown(null); }} className="w-full text-left px-3 py-1.5 text-xs hover:bg-muted">Second</button>
                      <button onClick={() => { toast.info("Third"); setOpenDropdown(null); }} className="w-full text-left px-3 py-1.5 text-xs hover:bg-muted">Third</button>
                    </div>
                  )}
                </div>

                <span className="px-3 py-1.5 text-muted-foreground/40 cursor-not-allowed">
                  Disabled
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden sm:block w-44">
                <input
                  type="text"
                  placeholder="Search…"
                  className="w-full text-xs pl-8 pr-3 py-1.5 bg-background border border-border rounded-md focus:outline-hidden focus:ring-1 focus:ring-primary"
                />
                <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-2.5 top-2" />
              </div>

              <button
                onClick={() => toast.info("Notificações Tabler")}
                className="p-1.5 rounded-md border border-border hover:bg-muted text-muted-foreground hover:text-foreground relative shadow-2xs"
              >
                <Bell className="w-4 h-4" />
                <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1 right-1" />
              </button>

              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80"
                  alt="Mallory Hulme"
                  className="w-7 h-7 rounded-full object-cover border border-border"
                />
                <div className="hidden xl:block text-left">
                  <div className="text-xs font-semibold leading-tight">Mallory Hulme</div>
                  <div className="text-[10px] text-muted-foreground">Geologist IV</div>
                </div>
              </div>
            </div>
          </header>
        </div>

        {/* ======================================================== */}
        {/* NAVBAR 3: Dark Theme Navbar                              */}
        {/* ======================================================== */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              3. Dark Navbar (data-bs-theme="dark")
            </span>
            <button
              onClick={() => handleCopy('<header class="navbar navbar-expand-md d-print-none" data-bs-theme="dark">...</header>', 'nav3')}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === 'nav3' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copiar HTML</span>
            </button>
          </div>

          <header className="w-full flex items-center justify-between px-4 py-2.5 bg-zinc-900 text-white rounded-xl shadow-md border border-zinc-800">
            <div className="flex items-center gap-6">
              <a href="#" className="flex items-center gap-2 font-bold text-sm tracking-tight text-white">
                <TablerLogo color="#38bdf8" />
                <span>Tabler</span>
              </a>

              {/* Text-only links in dark navbar */}
              <div className="hidden lg:flex items-center gap-1 text-xs">
                <button
                  onClick={() => setActiveNav3("First")}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                    activeNav3 === "First"
                      ? "bg-white/20 text-white font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  First
                </button>

                <button
                  onClick={() => setActiveNav3("Second")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
                    activeNav3 === "Second"
                      ? "bg-white/20 text-white font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span>Second</span>
                  <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 rounded-full">2</span>
                </button>

                <div className="relative">
                  <button
                    onClick={(e) => toggleDropdown("nav3-third", e)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md font-medium text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <span>Third</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  {openDropdown === "nav3-third" && (
                    <div className="absolute left-0 top-full mt-1.5 w-36 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl py-1 z-50 animate-in fade-in-50 zoom-in-95 text-xs text-zinc-200">
                      <button onClick={() => { toast.info("First"); setOpenDropdown(null); }} className="w-full text-left px-3 py-1.5 hover:bg-zinc-800">First</button>
                      <button onClick={() => { toast.info("Second"); setOpenDropdown(null); }} className="w-full text-left px-3 py-1.5 hover:bg-zinc-800">Second</button>
                      <button onClick={() => { toast.info("Third"); setOpenDropdown(null); }} className="w-full text-left px-3 py-1.5 hover:bg-zinc-800">Third</button>
                    </div>
                  )}
                </div>

                <span className="px-3 py-1.5 text-zinc-600 cursor-not-allowed">
                  Disabled
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden sm:block w-44">
                <input
                  type="text"
                  placeholder="Search…"
                  className="w-full text-xs pl-8 pr-3 py-1.5 bg-zinc-800/80 border border-zinc-700 text-white rounded-md focus:outline-hidden focus:ring-1 focus:ring-sky-500 placeholder-zinc-500"
                />
                <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-2" />
              </div>

              <button
                onClick={() => toast.info("Notificações Dark")}
                className="p-1.5 rounded-md border border-zinc-700 hover:bg-zinc-800 text-zinc-300 hover:text-white relative"
              >
                <Bell className="w-4 h-4" />
                <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1 right-1" />
              </button>

              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                  alt="Mallory Hulme"
                  className="w-7 h-7 rounded-full object-cover border border-zinc-700"
                />
                <div className="hidden xl:block text-left">
                  <div className="text-xs font-semibold leading-tight text-white">Mallory Hulme</div>
                  <div className="text-[10px] text-zinc-400">Geologist IV</div>
                </div>
              </div>
            </div>
          </header>
        </div>

        {/* ======================================================== */}
        {/* NAVBAR 4: Purple Brand Theme Navbar                       */}
        {/* ======================================================== */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              4. Brand Colored Navbar (Bootstrap Purple #7952b3)
            </span>
            <button
              onClick={() => handleCopy('<header class="navbar navbar-expand-md" style="background: #7952b3" data-bs-theme="dark">...</header>', 'nav4')}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === 'nav4' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copiar HTML</span>
            </button>
          </div>

          <header className="w-full flex items-center justify-between px-4 py-2.5 bg-[#7952b3] text-white rounded-xl shadow-md">
            <div className="flex items-center gap-6">
              <a href="#" className="flex items-center gap-2 font-bold text-sm tracking-tight text-white">
                <TablerLogo color="#ffffff" />
                <span>Tabler</span>
              </a>

              <div className="hidden lg:flex items-center gap-1 text-xs">
                <button
                  onClick={() => setActiveNav4("First")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
                    activeNav4 === "First"
                      ? "bg-white/20 text-white font-semibold"
                      : "text-purple-200 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <StarIcon />
                  <span>First</span>
                </button>

                <button
                  onClick={() => setActiveNav4("Second")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
                    activeNav4 === "Second"
                      ? "bg-white/20 text-white font-semibold"
                      : "text-purple-200 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <StarIcon />
                  <span>Second</span>
                  <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 rounded-full">2</span>
                </button>

                <button
                  onClick={() => setActiveNav4("Third")}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md font-medium text-purple-200 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <StarIcon />
                  <span>Third</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                <span className="px-3 py-1.5 text-purple-300/50 cursor-not-allowed">
                  Disabled
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => toast.info("Notificações")}
                className="p-1.5 rounded-md border border-white/20 hover:bg-white/10 text-white relative"
              >
                <Bell className="w-4 h-4" />
                <span className="w-2 h-2 rounded-full bg-red-400 absolute top-1 right-1" />
              </button>

              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                  alt="Mallory Hulme"
                  className="w-7 h-7 rounded-full object-cover border border-white/30"
                />
                <div className="hidden xl:block text-left">
                  <div className="text-xs font-semibold leading-tight text-white">Mallory Hulme</div>
                  <div className="text-[10px] text-purple-200">Geologist IV</div>
                </div>
              </div>
            </div>
          </header>
        </div>

        {/* ======================================================== */}
        {/* NAVBAR 5: Primary Blue Navbar (bg-primary)                */}
        {/* ======================================================== */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              5. Primary Colored Navbar (bg-primary / Tabler Blue)
            </span>
            <button
              onClick={() => handleCopy('<header class="navbar navbar-expand-md bg-primary" data-bs-theme="dark">...</header>', 'nav5')}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === 'nav5' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copiar HTML</span>
            </button>
          </div>

          <header className="w-full flex items-center justify-between px-4 py-2.5 bg-blue-600 dark:bg-blue-700 text-white rounded-xl shadow-md">
            <div className="flex items-center gap-6">
              <a href="#" className="flex items-center gap-2 font-bold text-sm tracking-tight text-white">
                <TablerLogo color="#ffffff" />
                <span>Tabler</span>
              </a>

              <div className="hidden lg:flex items-center gap-1 text-xs">
                <button
                  onClick={() => setActiveNav5("First")}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                    activeNav5 === "First"
                      ? "bg-white/20 text-white font-semibold"
                      : "text-blue-100 hover:text-white hover:bg-white/10"
                  }`}
                >
                  First
                </button>

                <button
                  onClick={() => setActiveNav5("Second")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
                    activeNav5 === "Second"
                      ? "bg-white/20 text-white font-semibold"
                      : "text-blue-100 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span>Second</span>
                  <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 rounded-full">2</span>
                </button>

                <button
                  onClick={() => setActiveNav5("Third")}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md font-medium text-blue-100 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <span>Third</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                <span className="px-3 py-1.5 text-blue-200/50 cursor-not-allowed">
                  Disabled
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden sm:block w-44">
                <input
                  type="text"
                  placeholder="Search…"
                  className="w-full text-xs pl-8 pr-3 py-1.5 bg-white/15 border border-white/25 text-white placeholder-blue-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-white"
                />
                <Search className="w-3.5 h-3.5 text-blue-200 absolute left-2.5 top-2" />
              </div>

              <button
                onClick={() => toast.info("Notificações")}
                className="p-1.5 rounded-md border border-white/25 hover:bg-white/10 text-white relative"
              >
                <Bell className="w-4 h-4" />
                <span className="w-2 h-2 rounded-full bg-red-400 absolute top-1 right-1" />
              </button>

              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                  alt="Mallory Hulme"
                  className="w-7 h-7 rounded-full object-cover border border-white/30"
                />
                <div className="hidden xl:block text-left">
                  <div className="text-xs font-semibold leading-tight text-white">Mallory Hulme</div>
                  <div className="text-[10px] text-blue-100">Geologist IV</div>
                </div>
              </div>
            </div>
          </header>
        </div>

        {/* ======================================================== */}
        {/* NAVBAR 6: Two-Tier Header with Action Buttons (Light)     */}
        {/* ======================================================== */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              6. Two-Tier Header with Action Buttons & Subnav (Light)
            </span>
            <button
              onClick={() => handleCopy('<header class="navbar navbar-expand-md d-print-none">...</header>', 'nav6')}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === 'nav6' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copiar HTML</span>
            </button>
          </div>

          <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
            {/* Top Tier */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-border/40">
              <a href="#" className="flex items-center gap-2 font-extrabold text-base tracking-tight text-foreground">
                <TablerLogo />
                <span>Dashboard</span>
              </a>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => toast.success("Sponsor Tabler!")}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-rose-500/30 text-rose-600 dark:text-rose-400 bg-rose-500/10 rounded-md hover:bg-rose-500/20 transition-colors shadow-2xs"
                >
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                  <span>Sponsor</span>
                </button>

                <button
                  onClick={() => toast.info("Source code no GitHub")}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-border bg-background hover:bg-muted text-foreground rounded-md transition-colors shadow-2xs"
                >
                  <GitFork className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>Source code</span>
                </button>

                <button
                  onClick={() => toast.info("Notificações")}
                  className="p-1.5 rounded-md border border-border hover:bg-muted text-muted-foreground hover:text-foreground relative shadow-2xs"
                >
                  <Bell className="w-4 h-4" />
                  <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1 right-1" />
                </button>

                <div className="flex items-center gap-2 pl-1">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                    alt="Mallory Hulme"
                    className="w-7 h-7 rounded-full object-cover border border-border"
                  />
                  <div className="hidden xl:block text-left">
                    <div className="text-xs font-semibold leading-tight">Mallory Hulme</div>
                    <div className="text-[10px] text-muted-foreground">Geologist IV</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Tier: Sub-navigation & Customize button */}
            <div className="flex items-center justify-between px-5 py-2 bg-muted/20 dark:bg-muted/10 text-xs">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveNav6("First")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
                    activeNav6 === "First"
                      ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <StarIcon />
                  <span>First</span>
                </button>

                <button
                  onClick={() => setActiveNav6("Second")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
                    activeNav6 === "Second"
                      ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <StarIcon />
                  <span>Second</span>
                  <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 rounded-full">2</span>
                </button>

                <button
                  onClick={() => setActiveNav6("Third")}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <StarIcon />
                  <span>Third</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                <span className="px-3 py-1.5 text-muted-foreground/40 cursor-not-allowed">
                  Disabled
                </span>
              </div>

              {/* Subnav Search & Customize */}
              <div className="flex items-center gap-2">
                <div className="relative hidden md:block w-48">
                  <input
                    type="text"
                    placeholder="Search in website…"
                    className="w-full text-xs pl-8 pr-3 py-1 bg-background border border-border rounded-md focus:outline-hidden focus:ring-1 focus:ring-primary"
                  />
                  <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-2.5 top-1.5" />
                </div>

                <button
                  onClick={() => toast.success("Painel de Customização Aberto!")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-background hover:bg-muted font-medium transition-colors shadow-2xs"
                >
                  <Sliders className="w-3.5 h-3.5 text-primary" />
                  <span>Customize</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* NAVBAR 7: Two-Tier Header with Action Buttons (Dark)      */}
        {/* ======================================================== */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              7. Two-Tier Header with Full Vector Logo (Dark Theme)
            </span>
            <button
              onClick={() => handleCopy('<header class="navbar navbar-expand-md d-print-none" data-bs-theme="dark">...</header>', 'nav7')}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === 'nav7' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copiar HTML</span>
            </button>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 text-white shadow-lg overflow-hidden">
            {/* Top Tier Dark */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800">
              <a href="#" className="flex items-center gap-2 font-extrabold text-base tracking-tight text-white">
                <TablerLogo color="#38bdf8" />
                <span className="text-white font-extrabold text-base">Tabler UI</span>
              </a>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => toast.success("Sponsor Tabler!")}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-rose-500/40 text-rose-400 bg-rose-500/10 rounded-md hover:bg-rose-500/20 transition-colors"
                >
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                  <span>Sponsor</span>
                </button>

                <button
                  onClick={() => toast.info("Source code no GitHub")}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-zinc-700 bg-zinc-800 text-zinc-200 rounded-md hover:bg-zinc-700 transition-colors"
                >
                  <GitFork className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Source code</span>
                </button>

                <button
                  onClick={() => toast.info("Notificações")}
                  className="p-1.5 rounded-md border border-zinc-700 hover:bg-zinc-800 text-zinc-300 relative"
                >
                  <Bell className="w-4 h-4" />
                  <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1 right-1" />
                </button>

                <div className="flex items-center gap-2 pl-1">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                    alt="Mallory Hulme"
                    className="w-7 h-7 rounded-full object-cover border border-zinc-700"
                  />
                  <div className="hidden xl:block text-left">
                    <div className="text-xs font-semibold leading-tight text-white">Mallory Hulme</div>
                    <div className="text-[10px] text-zinc-400">Geologist IV</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Tier: Sub-navigation & Customize in Dark */}
            <div className="flex items-center justify-between px-5 py-2 bg-zinc-950/60 text-xs">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveNav7("First")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
                    activeNav7 === "First"
                      ? "bg-blue-600 text-white font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                  }`}
                >
                  <StarIcon />
                  <span>First</span>
                </button>

                <button
                  onClick={() => setActiveNav7("Second")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
                    activeNav7 === "Second"
                      ? "bg-blue-600 text-white font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                  }`}
                >
                  <StarIcon />
                  <span>Second</span>
                  <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 rounded-full">2</span>
                </button>

                <button
                  onClick={() => setActiveNav7("Third")}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  <StarIcon />
                  <span>Third</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                <span className="px-3 py-1.5 text-zinc-600 cursor-not-allowed">
                  Disabled
                </span>
              </div>

              {/* Subnav Search & Customize */}
              <div className="flex items-center gap-2">
                <div className="relative hidden md:block w-48">
                  <input
                    type="text"
                    placeholder="Search in website…"
                    className="w-full text-xs pl-8 pr-3 py-1 bg-zinc-900 border border-zinc-700 text-white rounded-md focus:outline-hidden focus:ring-1 focus:ring-blue-500 placeholder-zinc-500"
                  />
                  <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1.5" />
                </div>

                <button
                  onClick={() => toast.success("Painel de Customização Dark Aberto!")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 font-medium text-zinc-200 transition-colors"
                >
                  <Sliders className="w-3.5 h-3.5 text-blue-400" />
                  <span>Customize</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* BONUS: Real Estate Navbar Showcase                        */}
        {/* ======================================================== */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-1 text-xs font-bold text-primary">
            <Sparkles className="w-4 h-4" />
            <span>Aplicação no Portal Imobiliário de Luxo</span>
          </div>

          <header className="w-full flex items-center justify-between px-5 py-3 bg-card border border-primary/20 rounded-xl shadow-xs">
            <div className="flex items-center gap-6">
              <a href="#" className="flex items-center gap-2 font-black text-sm tracking-tight text-foreground">
                <div className="w-7 h-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shadow-xs">
                  <Building2 className="w-4 h-4" />
                </div>
                <span>Imobiliária Prime</span>
              </a>

              <div className="hidden lg:flex items-center gap-1 text-xs font-medium text-muted-foreground">
                <span className="px-3 py-1.5 rounded-md bg-primary/10 text-primary font-bold">
                  Empreendimentos
                </span>
                <span className="px-3 py-1.5 rounded-md hover:bg-muted text-foreground cursor-pointer">
                  Carteira de Imóveis
                </span>
                <span className="px-3 py-1.5 rounded-md hover:bg-muted text-foreground cursor-pointer">
                  CRM & Leads
                </span>
                <span className="px-3 py-1.5 rounded-md hover:bg-muted text-foreground cursor-pointer">
                  Contratos
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden sm:block w-52">
                <input
                  type="text"
                  placeholder="Buscar REF (ex: IMB-902)..."
                  className="w-full text-xs pl-8 pr-3 py-1.5 bg-background border border-border rounded-md focus:outline-hidden focus:ring-1 focus:ring-primary font-mono"
                />
                <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-2.5 top-2" />
              </div>

              <div className="flex items-center gap-2.5 pl-2 border-l border-border">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                    alt="Corretora Especialista"
                    className="w-8 h-8 rounded-full object-cover border border-primary/40 shadow-xs"
                  />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-card absolute -bottom-0.5 -right-0.5" />
                </div>
                <div className="text-left hidden md:block">
                  <div className="text-xs font-bold leading-tight">Dra. Heloísa Ramos</div>
                  <div className="text-[10px] text-muted-foreground">Corretora Platinum • Online</div>
                </div>
              </div>
            </div>
          </header>
        </div>

      </div>
    </div>
  );
}
