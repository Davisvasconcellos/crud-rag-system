"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  Home,
  User,
  MessageSquare,
  Settings,
  Info,
  Phone,
  Briefcase,
  Users,
  FolderKanban,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  ChevronUp,
  ChevronDown,
  Maximize2,
  Minimize2,
  Building2,
  FileText,
  ShieldCheck,
  Compass,
} from "lucide-react";
import { toast } from "sonner";

// 9 Official Sections from https://preview.tabler.io/scroll-spy.html
interface TablerSection {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  paragraphs: string[];
}

const TABLER_SECTIONS: TablerSection[] = [
  {
    id: "pills-home",
    title: "Home",
    icon: Home,
    paragraphs: [
      "Welcome back. Here's a quick look at what's new since your last visit — three updates shipped, two conversations are waiting for a reply, and your weekly summary is ready below.",
      "The dashboard pulls together everything you touched this week: recent files, comments left on your work, and the tasks you marked to revisit. Nothing here requires action unless you want it to.",
    ],
  },
  {
    id: "pills-profile",
    title: "Profile",
    icon: User,
    paragraphs: [
      "Your profile is what teammates see when they open your card — name, role, and a short line about what you're working on. Keep it current; it's the first thing a new collaborator checks before reaching out.",
      "Profile photos update automatically from your workspace avatar. If you'd rather use a different image, upload one from the settings page and it will sync across every app connected to this account.",
    ],
  },
  {
    id: "pills-messages",
    title: "Messages",
    icon: MessageSquare,
    paragraphs: [
      "Conversations are grouped by project, so a thread never gets lost between unrelated channels. Mentions are highlighted, and anything addressed directly to you moves to the top of the list.",
      "Replies you haven't read yet are marked with a dot. Archiving a conversation doesn't delete it — it just clears it from the active list until someone posts in it again.",
    ],
  },
  {
    id: "pills-settings",
    title: "Settings",
    icon: Settings,
    paragraphs: [
      "Most defaults here are fine for everyday use, but a few are worth reviewing: notification frequency, default timezone, and who can see your activity status.",
      "Changes save immediately — there's no separate 'apply' step. If something looks wrong after a change, the history tab keeps the last ten versions of your settings so you can roll back.",
    ],
  },
  {
    id: "pills-about",
    title: "About",
    icon: Info,
    paragraphs: [
      "This project started as an internal tool for a five-person team and grew from there. The goal has stayed the same the whole time: make the boring parts of daily work take less time.",
      "We ship small updates often rather than large releases a few times a year. That means the product changes gradually, but it also means feedback turns into fixes faster.",
    ],
  },
  {
    id: "pills-contact",
    title: "Contact",
    icon: Phone,
    paragraphs: [
      "The fastest way to reach the team is the in-app chat — most questions get a reply within a few hours during business days. For anything urgent, use the priority line in your account settings.",
      "Bug reports and feature requests both go to the same inbox, so include a short description of what you expected versus what happened. Screenshots help more than long explanations.",
    ],
  },
  {
    id: "pills-services",
    title: "Services",
    icon: Briefcase,
    paragraphs: [
      "Onboarding, migration, and training are available as add-ons for teams moving from another tool. A specialist walks through your existing setup and maps it to the equivalent here before anything is switched over.",
      "Ongoing support plans include a monthly check-in call, priority responses, and early access to features still in testing. Most teams start on the standard plan and upgrade once they've settled in.",
    ],
  },
  {
    id: "pills-team",
    title: "Team",
    icon: Users,
    paragraphs: [
      "The team is spread across four time zones, which means someone is usually online to help. Each person owns a specific part of the product, listed on their profile.",
      "We hire slowly and keep the team small on purpose — it's easier to keep quality high and response times short when fewer people need to stay in sync.",
    ],
  },
  {
    id: "pills-work",
    title: "Work",
    icon: FolderKanban,
    paragraphs: [
      "A selection of recent projects is listed below, newest first. Each entry links to a short write-up covering the problem, the approach, and what changed as a result.",
      "Older work is archived rather than deleted, so nothing here disappears — it just moves further down the list as new projects are added.",
    ],
  },
];

export function TablerScrollSpy() {
  const [activeSection, setActiveSection] = useState<string>("pills-home");
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<"container" | "full">("container");
  const [scrollProgress, setScrollProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const isManualScrolling = useRef<boolean>(false);

  // Scroll detection within the container
  const handleContainerScroll = useCallback(() => {
    if (isManualScrolling.current || viewMode !== "container") return;
    const container = containerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;

    // Calculate percentage
    const maxScroll = scrollHeight - clientHeight;
    const progress = maxScroll > 0 ? Math.min(100, Math.max(0, Math.round((scrollTop / maxScroll) * 100))) : 0;
    setScrollProgress(progress);

    // If reached bottom, activate last section
    if (scrollTop + clientHeight >= scrollHeight - 25) {
      setActiveSection(TABLER_SECTIONS[TABLER_SECTIONS.length - 1].id);
      return;
    }

    // If near top, activate first section
    if (scrollTop <= 15) {
      setActiveSection(TABLER_SECTIONS[0].id);
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const threshold = containerRect.top + 90; // offset from container top

    let foundActive = TABLER_SECTIONS[0].id;
    for (const sec of TABLER_SECTIONS) {
      const el = document.getElementById(sec.id);
      if (el) {
        const elRect = el.getBoundingClientRect();
        if (elRect.top <= threshold) {
          foundActive = sec.id;
        } else {
          break;
        }
      }
    }

    setActiveSection(foundActive);
  }, [viewMode]);

  // Initial check on mount
  useEffect(() => {
    if (viewMode === "container") {
      handleContainerScroll();
    }
  }, [viewMode, handleContainerScroll]);

  // Scroll detection for full-page mode (listening to <main>)
  useEffect(() => {
    if (viewMode !== "full") return;

    const mainEl = document.querySelector("main");
    if (!mainEl) return;

    const handleMainScroll = () => {
      if (isManualScrolling.current) return;

      const { scrollTop, scrollHeight, clientHeight } = mainEl;
      const maxScroll = scrollHeight - clientHeight;
      const progress = maxScroll > 0 ? Math.min(100, Math.max(0, Math.round((scrollTop / maxScroll) * 100))) : 0;
      setScrollProgress(progress);

      if (scrollTop + clientHeight >= scrollHeight - 30) {
        setActiveSection(TABLER_SECTIONS[TABLER_SECTIONS.length - 1].id);
        return;
      }

      const mainRect = mainEl.getBoundingClientRect();
      const threshold = mainRect.top + 130;

      let foundActive = TABLER_SECTIONS[0].id;
      for (const sec of TABLER_SECTIONS) {
        const el = document.getElementById(sec.id);
        if (el) {
          const elRect = el.getBoundingClientRect();
          if (elRect.top <= threshold) {
            foundActive = sec.id;
          } else {
            break;
          }
        }
      }

      setActiveSection(foundActive);
    };

    mainEl.addEventListener("scroll", handleMainScroll, { passive: true });
    return () => mainEl.removeEventListener("scroll", handleMainScroll);
  }, [viewMode]);

  // Programmatic scroll to section when clicking a sidebar link
  const scrollToSection = (id: string) => {
    setActiveSection(id);
    isManualScrolling.current = true;

    if (viewMode === "container") {
      const container = containerRef.current;
      const targetEl = document.getElementById(id);
      if (container && targetEl) {
        const containerRect = container.getBoundingClientRect();
        const targetRect = targetEl.getBoundingClientRect();
        const targetScrollTop = container.scrollTop + (targetRect.top - containerRect.top) - 16;
        container.scrollTo({
          top: Math.max(0, targetScrollTop),
          behavior: "smooth",
        });
      }
    } else {
      const mainEl = document.querySelector("main");
      const targetEl = document.getElementById(id);
      if (mainEl && targetEl) {
        const mainRect = mainEl.getBoundingClientRect();
        const targetRect = targetEl.getBoundingClientRect();
        const targetScrollTop = mainEl.scrollTop + (targetRect.top - mainRect.top) - 30;
        mainEl.scrollTo({
          top: Math.max(0, targetScrollTop),
          behavior: "smooth",
        });
      }
    }

    setTimeout(() => {
      isManualScrolling.current = false;
    }, 600);
  };

  // Quick navigation helper (previous / next)
  const currentIndex = TABLER_SECTIONS.findIndex((s) => s.id === activeSection);
  const handleNextSection = () => {
    if (currentIndex < TABLER_SECTIONS.length - 1) {
      scrollToSection(TABLER_SECTIONS[currentIndex + 1].id);
    }
  };
  const handlePrevSection = () => {
    if (currentIndex > 0) {
      scrollToSection(TABLER_SECTIONS[currentIndex - 1].id);
    }
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Código copiado para a área de transferência!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            <span>Tabler UI</span>
            <span>•</span>
            <span className="text-primary font-bold">Navigation & Layout</span>
            <span>•</span>
            <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">
              1:1 Official Replica
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Scroll-spy</h1>
          <p className="text-muted-foreground text-sm mt-1 max-w-3xl">
            Atualização automática de links de navegação com base na posição do scroll. Conforme o usuário rola o conteúdo,
            o menu lateral destaca a seção visível em tempo real. Réplica idêntica de{" "}
            <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">
              https://preview.tabler.io/scroll-spy.html
            </code>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Mode Switcher */}
          <div className="inline-flex items-center p-1 rounded-lg bg-muted border border-border text-xs">
            <button
              onClick={() => setViewMode("container")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                viewMode === "container"
                  ? "bg-card text-foreground shadow-xs font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Janela com scroll interno e barra própria"
            >
              <Minimize2 className="w-3.5 h-3.5" />
              <span>Container Scroll</span>
            </button>
            <button
              onClick={() => setViewMode("full")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                viewMode === "full"
                  ? "bg-card text-foreground shadow-xs font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Expande o conteúdo e usa o scroll principal da página"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Página Completa</span>
            </button>
          </div>

          <a
            href="https://preview.tabler.io/scroll-spy.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border border-border bg-card hover:bg-muted transition-colors text-muted-foreground hover:text-foreground shadow-xs"
          >
            <span>Ver Oficial Tabler</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Controller & Live Status Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 bg-card border border-border rounded-xl shadow-xs text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 font-medium">
            <span className="text-muted-foreground">Seção ativa:</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 text-primary font-bold">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              {TABLER_SECTIONS.find((s) => s.id === activeSection)?.title || activeSection}
            </span>
          </div>

          <span className="text-muted-foreground hidden md:inline">•</span>

          <div className="flex items-center gap-2 text-muted-foreground">
            <span>Progresso:</span>
            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden border border-border">
              <div
                className="h-full bg-primary transition-all duration-150"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
            <span className="font-mono font-semibold text-foreground">{scrollProgress}%</span>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={handlePrevSection}
            disabled={currentIndex === 0}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-border bg-background hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Ir para a seção anterior"
          >
            <ChevronUp className="w-3.5 h-3.5" />
            <span>Anterior</span>
          </button>
          <button
            onClick={handleNextSection}
            disabled={currentIndex === TABLER_SECTIONS.length - 1}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-border bg-background hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Ir para a próxima seção"
          >
            <ChevronDown className="w-3.5 h-3.5" />
            <span>Próxima</span>
          </button>
          <button
            onClick={() =>
              handleCopy(
                `<div class="row g-5">
  <div class="col-sm-2">
    <div class="sticky-top">
      <h2>Menu</h2>
      <nav class="nav nav-vertical nav-pills" id="pills">
        <a class="nav-link active" href="#pills-home"> Home </a>
        <a class="nav-link" href="#pills-profile"> Profile </a>
        <a class="nav-link" href="#pills-messages"> Messages </a>
        <a class="nav-link" href="#pills-settings"> Settings </a>
        <a class="nav-link" href="#pills-about"> About </a>
        <a class="nav-link" href="#pills-contact"> Contact </a>
        <a class="nav-link" href="#pills-services"> Services </a>
        <a class="nav-link" href="#pills-team"> Team </a>
        <a class="nav-link" href="#pills-work"> Work </a>
      </nav>
    </div>
  </div>
  <div class="col-sm" data-bs-spy="scroll" data-bs-target="#pills" data-bs-offset="0">
    <div class="card card-lg">
      <div class="card-body">...</div>
    </div>
  </div>
</div>`
              )
            }
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-border bg-background hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>HTML Oficial</span>
          </button>
        </div>
      </div>

      {/* Main Tabler ScrollSpy Grid (2 columns: Sidebar Menu + Content Card) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* ======================================================== */}
        {/* LEFT COLUMN: Sticky Menu with Vertical Pills             */}
        {/* ======================================================== */}
        <div className="md:col-span-3 lg:col-span-2">
          <div className="sticky top-6 space-y-3">
            <h2 className="text-xl font-bold tracking-tight text-foreground">Menu</h2>

            {/* Vertical Nav Pills (Tabler classes: nav nav-vertical nav-pills) */}
            <nav className="flex flex-col space-y-1" id="pills">
              {TABLER_SECTIONS.map((sec) => {
                const Icon = sec.icon;
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className={`group w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-all text-left cursor-pointer ${
                      isActive
                        ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                        }`}
                      />
                      <span className="truncate">{sec.title}</span>
                    </div>

                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground shrink-0 animate-pulse" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Info helper hint */}
            <div className="p-3 bg-muted/40 border border-border/60 rounded-lg text-[11px] text-muted-foreground leading-snug">
              <span className="font-semibold text-foreground">Dica:</span> Role o card ao lado para ver o menu atualizar automaticamente!
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: Content Card with all 9 Tabler Sections    */}
        {/* ======================================================== */}
        <div className="md:col-span-9 lg:col-span-10">
          <div className="card card-lg border border-border bg-card rounded-xl shadow-xs overflow-hidden">
            {/* Scrollable Container with onScroll event */}
            <div
              ref={containerRef}
              onScroll={handleContainerScroll}
              className={`p-6 sm:p-8 space-y-10 ${
                viewMode === "container"
                  ? "max-h-[580px] overflow-y-auto scroll-smooth pr-6"
                  : ""
              }`}
            >
              {TABLER_SECTIONS.map((sec, idx) => {
                const Icon = sec.icon;
                const isActive = activeSection === sec.id;

                return (
                  <div
                    key={sec.id}
                    id={sec.id}
                    className={`scroll-mt-4 pt-2 pb-6 transition-all duration-200 ${
                      idx !== TABLER_SECTIONS.length - 1 ? "border-b border-border/40" : ""
                    } ${isActive ? "relative" : ""}`}
                  >
                    {/* Active Section Indicator Bar */}
                    {isActive && (
                      <div className="absolute -left-6 sm:-left-8 top-2 bottom-6 w-1 bg-primary rounded-r-full" />
                    )}

                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
                        <Icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                        <span>{sec.title}</span>
                      </h2>

                      {isActive && (
                        <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          Seção Visível
                        </span>
                      )}
                    </div>

                    <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                      {sec.paragraphs.map((p, pIdx) => (
                        <p key={pIdx} className={pIdx === sec.paragraphs.length - 1 ? "mb-6" : ""}>
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* BONUS: Real Estate Document Scroll-Spy Showcase          */}
      {/* ======================================================== */}
      <div className="pt-6 border-t border-border/40">
        <div className="flex items-center gap-2 text-xs font-bold text-primary mb-3">
          <Sparkles className="w-4 h-4" />
          <span>Aplicação Imobiliária: Memorial Descritivo & Dossiê do Imóvel</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-card border border-primary/20 rounded-xl shadow-xs">
          <div className="md:col-span-1 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-primary" />
              <span>Dossiê REF: IMB-980</span>
            </div>
            <div className="text-xs text-muted-foreground leading-relaxed">
              O Scroll-Spy organiza contratos de compra e venda, certidões de ônus reais e laudos de vistoria técnica.
            </div>
          </div>

          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-muted/40 rounded-lg border border-border">
              <div className="font-bold flex items-center gap-1.5 mb-1 text-foreground">
                <FileText className="w-3.5 h-3.5 text-blue-500" />
                <span>Matrícula & Habite-se</span>
              </div>
              <p className="text-muted-foreground text-[11px]">Certidão atualizada do 1º RGI sem pendências judiciais.</p>
            </div>

            <div className="p-3 bg-muted/40 rounded-lg border border-border">
              <div className="font-bold flex items-center gap-1.5 mb-1 text-foreground">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Laudo Estrutural</span>
              </div>
              <p className="text-muted-foreground text-[11px]">Vistoria predial com ART registrada e garantia de 5 anos.</p>
            </div>

            <div className="p-3 bg-muted/40 rounded-lg border border-border">
              <div className="font-bold flex items-center gap-1.5 mb-1 text-foreground">
                <Compass className="w-3.5 h-3.5 text-amber-500" />
                <span>Planta Humanizada</span>
              </div>
              <p className="text-muted-foreground text-[11px]">Croquis e distribuição de ambientes com layout decorado.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
