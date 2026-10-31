"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  ExternalLink,
  Copy,
  Check,
  CreditCard,
  Clock,
  Presentation,
  Percent,
  MoreVertical,
  Star,
  Download,
  Edit,
  Book,
  MapPin,
  Home as HomeIcon,
  Users,
  Eye,
  Heart,
  Share2,
  Calendar,
  Sparkles,
  Building2,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";

// Radial Gauge Component for Deliverability, Storage, Onboarding
interface RadialGaugeProps {
  value: number;
  label: string;
  color?: string;
  size?: number;
}

function RadialGauge({ value, label, color = "#066fd1", size = 150 }: RadialGaugeProps) {
  const strokeWidth = 10;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center mx-auto" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted/20"
        />
        {/* Progress Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      {/* Center Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
        <span className="text-2xl font-bold tracking-tight text-foreground leading-none">{value}%</span>
        <span className="text-[11px] text-muted-foreground mt-1 capitalize">{label}</span>
      </div>
    </div>
  );
}

export function TablerWidgets() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [subscribedUser, setSubscribedUser] = useState<Record<string, boolean>>({});

  const toggleDropdown = (key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const toggleSubscribe = (user: string) => {
    setSubscribedUser((prev) => {
      const next = !prev[user];
      toast.success(next ? `Inscrito em ${user}!` : `Inscrição cancelada para ${user}`);
      return { ...prev, [user]: next };
    });
  };

  const handleCopy = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    toast.success("Código copiado!");
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            <span>Tabler UI</span>
            <span>•</span>
            <span className="text-primary font-bold">Widgets & Dashboards</span>
            <span>•</span>
            <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">
              1:1 Official Replica (21 Cards)
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Widgets</h1>
          <p className="text-muted-foreground text-sm mt-1 max-w-3xl">
            Coleção completa de widgets de alta densidade do Tabler: contadores com métricas chave, medidores radiais (gauges), barras de progresso de projetos, cartões de equipe, blocos de código e tabelas de configuração do sistema.
            Réplica 100% fiel de <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">https://preview.tabler.io/widgets.html</code>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://preview.tabler.io/widgets.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border border-border bg-card hover:bg-muted transition-colors text-muted-foreground hover:text-foreground shadow-xs"
          >
            <span>Ver Oficial Tabler</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. TOP METRIC COUNTERS (ROW OF 4)                                         */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Earned */}
        <div className="rounded-xl border border-border bg-card p-4 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Earned</div>
            <div className="text-2xl font-black text-foreground">$2,847</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <CreditCard className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Hours logged */}
        <div className="rounded-xl border border-border bg-card p-4 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Hours logged</div>
            <div className="text-2xl font-black text-foreground">42.7 <span className="text-sm font-semibold text-muted-foreground">hrs</span></div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Avg. time */}
        <div className="rounded-xl border border-border bg-card p-4 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Avg. time</div>
            <div className="text-2xl font-black text-foreground">3:28 <span className="text-sm font-semibold text-muted-foreground">hrs</span></div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Presentation className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: Weekly growth */}
        <div className="rounded-xl border border-border bg-card p-4 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Weekly growth</div>
            <div className="text-2xl font-black text-foreground">18.4%</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Percent className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. RADIAL GAUGE WIDGETS (ROW OF 3)                                        */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 5: Deliverability */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold">Deliverability</CardTitle>
          </CardHeader>
          <CardContent className="pt-2 text-center">
            <RadialGauge value={96} label="sent" color="#066fd1" />
            <p className="text-xs text-muted-foreground mt-4 leading-relaxed min-h-[2.5rem]">
              Share of sent emails accepted by receiving servers on first attempt.
            </p>
          </CardContent>
        </Card>

        {/* Card 6: Storage used */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold">Storage used</CardTitle>
          </CardHeader>
          <CardContent className="pt-2 text-center">
            <RadialGauge value={82} label="used" color="#2fb344" />
            <p className="text-xs text-muted-foreground mt-4 leading-relaxed min-h-[2.5rem]">
              Disk space taken by uploads and backups across all projects.
            </p>
          </CardContent>
        </Card>

        {/* Card 7: Onboarding */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold">Onboarding</CardTitle>
          </CardHeader>
          <CardContent className="pt-2 text-center">
            <RadialGauge value={58} label="completed" color="#f59f00" />
            <p className="text-xs text-muted-foreground mt-4 leading-relaxed min-h-[2.5rem]">
              New accounts that finished every setup step within 48 hours.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ========================================================================= */}
      {/* 3. PROJECT PROGRESS CARDS (ROW OF 2)                                      */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 8: Food Deliver UI dashboards */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=160&q=80"
                alt="Food Deliver UI dashboards"
                className="w-24 h-20 rounded-xl object-cover shrink-0 border border-border shadow-2xs"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-foreground truncate">
                  Food Deliver UI dashboards
                </h4>
                <div className="text-xs text-muted-foreground mt-0.5">Updated 2 days ago</div>

                <div className="mt-3 flex items-center gap-3">
                  <span className="text-xs font-bold text-foreground">25%</span>
                  <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: "25%" }} />
                  </div>
                </div>
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => toggleDropdown("p1", e)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
                  title="More actions"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
                {openDropdown === "p1" && (
                  <div className="absolute right-0 top-full mt-1 w-32 bg-popover border border-border rounded-lg shadow-lg py-1 z-50 text-xs">
                    <button onClick={() => { toast.info("Importing..."); setOpenDropdown(null); }} className="w-full text-left px-3 py-1.5 hover:bg-muted">Import</button>
                    <button onClick={() => { toast.info("Exporting..."); setOpenDropdown(null); }} className="w-full text-left px-3 py-1.5 hover:bg-muted">Export</button>
                    <button onClick={() => { toast.info("Downloaded!"); setOpenDropdown(null); }} className="w-full text-left px-3 py-1.5 hover:bg-muted">Download</button>
                    <button onClick={() => { toast.error("Deleted!"); setOpenDropdown(null); }} className="w-full text-left px-3 py-1.5 hover:bg-muted text-red-500">Delete</button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 9: Projects Dashboards */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=160&q=80"
                alt="Projects Dashboards"
                className="w-24 h-20 rounded-xl object-cover shrink-0 border border-border shadow-2xs"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-foreground truncate">
                  Projects Dashboards
                </h4>
                <div className="text-xs text-muted-foreground mt-0.5">Updated 7 days ago</div>

                <div className="mt-3 flex items-center gap-3">
                  <span className="text-xs font-bold text-foreground">76%</span>
                  <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: "76%" }} />
                  </div>
                </div>
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => toggleDropdown("p2", e)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
                  title="More actions"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
                {openDropdown === "p2" && (
                  <div className="absolute right-0 top-full mt-1 w-32 bg-popover border border-border rounded-lg shadow-lg py-1 z-50 text-xs">
                    <button onClick={() => { toast.info("Importing..."); setOpenDropdown(null); }} className="w-full text-left px-3 py-1.5 hover:bg-muted">Import</button>
                    <button onClick={() => { toast.info("Exporting..."); setOpenDropdown(null); }} className="w-full text-left px-3 py-1.5 hover:bg-muted">Export</button>
                    <button onClick={() => { toast.info("Downloaded!"); setOpenDropdown(null); }} className="w-full text-left px-3 py-1.5 hover:bg-muted">Download</button>
                    <button onClick={() => { toast.error("Deleted!"); setOpenDropdown(null); }} className="w-full text-left px-3 py-1.5 hover:bg-muted text-red-500">Delete</button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ========================================================================= */}
      {/* 4. MINI CONTACT CARDS (ROW OF 4)                                          */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Contact 1 */}
        <a
          href="#contact1"
          onClick={(e) => { e.preventDefault(); toast.info("Contato Maryjo Lebarree selecionado!"); }}
          className="rounded-xl border border-border bg-card p-4 shadow-xs hover:border-primary/50 transition-colors flex items-center gap-3 cursor-pointer group"
        >
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
            alt="Maryjo Lebarree"
            className="w-10 h-10 rounded-full object-cover shrink-0"
          />
          <div className="min-w-0">
            <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">
              Maryjo Lebarree
            </div>
            <div className="text-[11px] text-muted-foreground truncate">Civil Engineer</div>
          </div>
        </a>

        {/* Contact 2 */}
        <a
          href="#contact2"
          onClick={(e) => { e.preventDefault(); toast.info("Contato Egan Poetz selecionado!"); }}
          className="rounded-xl border border-border bg-card p-4 shadow-xs hover:border-primary/50 transition-colors flex items-center gap-3 cursor-pointer group"
        >
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
            alt="Egan Poetz"
            className="w-10 h-10 rounded-full object-cover shrink-0"
          />
          <div className="min-w-0">
            <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">
              Egan Poetz
            </div>
            <div className="text-[11px] text-muted-foreground truncate">Research Nurse</div>
          </div>
        </a>

        {/* Contact 3 (Avatar Right) */}
        <a
          href="#contact3"
          onClick={(e) => { e.preventDefault(); toast.info("Contato Kellie Skingley selecionado!"); }}
          className="rounded-xl border border-border bg-card p-4 shadow-xs hover:border-primary/50 transition-colors flex items-center justify-between gap-3 cursor-pointer group"
        >
          <div className="min-w-0">
            <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">
              Kellie Skingley
            </div>
            <div className="text-[11px] text-muted-foreground truncate">Teacher</div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80"
            alt="Kellie Skingley"
            className="w-10 h-10 rounded-full object-cover shrink-0"
          />
        </a>

        {/* Contact 4 (Avatar Right) */}
        <a
          href="#contact4"
          onClick={(e) => { e.preventDefault(); toast.info("Contato Christabel Charlwood selecionado!"); }}
          className="rounded-xl border border-border bg-card p-4 shadow-xs hover:border-primary/50 transition-colors flex items-center justify-between gap-3 cursor-pointer group"
        >
          <div className="min-w-0">
            <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">
              Christabel Charlwood
            </div>
            <div className="text-[11px] text-muted-foreground truncate">Tax Accountant</div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80"
            alt="Christabel Charlwood"
            className="w-10 h-10 rounded-full object-cover shrink-0"
          />
        </a>
      </div>

      {/* ========================================================================= */}
      {/* 5. TEAM PROFILE CARDS WITH ACTIONS (ROW OF 4)                             */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Thatcher Keel */}
        <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden flex flex-col justify-between text-center">
          <div className="p-6">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
              alt="Thatcher Keel"
              className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-border"
            />
            <h4 className="text-sm font-bold text-foreground mb-0.5">Thatcher Keel</h4>
            <div className="text-xs text-muted-foreground">VP Sales</div>
          </div>
          <button
            type="button"
            onClick={() => toast.success("Perfil de Thatcher Keel aberto!")}
            className="w-full py-2.5 px-4 bg-muted/40 hover:bg-muted text-foreground text-xs font-semibold border-t border-border transition-colors cursor-pointer"
          >
            View full profile
          </button>
        </div>

        {/* Dyann Escala */}
        <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden flex flex-col justify-between text-center">
          <div className="p-6">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
              alt="Dyann Escala"
              className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-border"
            />
            <h4 className="text-sm font-bold text-foreground mb-0.5">Dyann Escala</h4>
            <div className="text-xs text-muted-foreground">Mechanical Systems Engineer</div>
          </div>
          <button
            type="button"
            onClick={() => toast.success("Perfil de Dyann Escala aberto!")}
            className="w-full py-2.5 px-4 bg-muted/40 hover:bg-muted text-foreground text-xs font-semibold border-t border-border transition-colors cursor-pointer"
          >
            View full profile
          </button>
        </div>

        {/* Avivah Mugleston */}
        <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden flex flex-col justify-between text-center">
          <div className="p-6">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
              alt="Avivah Mugleston"
              className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-border"
            />
            <h4 className="text-sm font-bold text-foreground mb-0.5">Avivah Mugleston</h4>
            <div className="text-xs text-muted-foreground">Actuary</div>
          </div>
          <button
            type="button"
            onClick={() => toast.success("Perfil de Avivah Mugleston aberto!")}
            className="w-full py-2.5 px-4 bg-muted/40 hover:bg-muted text-foreground text-xs font-semibold border-t border-border transition-colors cursor-pointer"
          >
            View full profile
          </button>
        </div>

        {/* Arlie Armstead */}
        <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden flex flex-col justify-between text-center">
          <div className="p-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 text-primary font-black text-xl flex items-center justify-center mx-auto mb-3 border-2 border-primary/20">
              AA
            </div>
            <h4 className="text-sm font-bold text-foreground mb-0.5">Arlie Armstead</h4>
            <div className="text-xs text-muted-foreground">VP Quality Control</div>
          </div>
          <button
            type="button"
            onClick={() => toast.success("Perfil de Arlie Armstead aberto!")}
            className="w-full py-2.5 px-4 bg-muted/40 hover:bg-muted text-foreground text-xs font-semibold border-t border-border transition-colors cursor-pointer"
          >
            View full profile
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. COVER PHOTO PROFILE CARDS (ROW OF 4)                                   */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            name: "Marsha Labat",
            role: "Real Estate Broker",
            cover: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=400&q=80",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
          },
          {
            name: "Elston Muffett",
            role: "Financial Analyst",
            cover: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
          },
          {
            name: "Leigha Gorce",
            role: "Architecture Lead",
            cover: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=400&q=80",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
          },
          {
            name: "Tallie Bettis",
            role: "Property Appraiser",
            cover: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
          },
        ].map((profile) => (
          <div key={profile.name} className="rounded-xl border border-border bg-card shadow-xs overflow-hidden text-center group">
            {/* Cover photo */}
            <div
              className="h-24 bg-cover bg-center relative"
              style={{ backgroundImage: `url(${profile.cover})` }}
            >
              {/* Overlaid Avatar */}
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-16 h-16 rounded-full object-cover border-4 border-card absolute -bottom-8 left-1/2 -translate-x-1/2 shadow-xs"
              />
            </div>
            {/* Body */}
            <div className="pt-10 pb-5 px-4">
              <h4 className="text-sm font-bold text-foreground">{profile.name}</h4>
              <div className="text-xs text-muted-foreground mt-0.5">{profile.role}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* 7. DETAILED USER PROFILE CARDS (ROW OF 2)                                 */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Paweł Kuna */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80"
                    alt="Paweł Kuna"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-card absolute bottom-0 right-0" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground leading-tight">Paweł Kuna</h4>
                  <div className="text-xs text-muted-foreground">Working in Tabler</div>
                  <div className="text-[11px] text-emerald-600 font-semibold mt-0.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Online
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleSubscribe("Paweł Kuna")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    subscribedUser["Paweł Kuna"]
                      ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/30"
                      : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs"
                  }`}
                >
                  {subscribedUser["Paweł Kuna"] ? "Subscribed" : "Subscribe"}
                </button>
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              Lead UI Designer focused on design systems, component architecture, and clean user experience.
            </p>
          </CardContent>
        </Card>

        {/* Mallory Hulme (With Activity Sparkline) */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                    alt="Mallory Hulme"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-card absolute bottom-0 right-0" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground leading-tight">Mallory Hulme</h4>
                  <div className="text-xs text-muted-foreground">Working in Kare</div>
                  <div className="text-[11px] text-emerald-600 font-semibold mt-0.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Online
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleSubscribe("Mallory Hulme")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    subscribedUser["Mallory Hulme"]
                      ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/30"
                      : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs"
                  }`}
                >
                  {subscribedUser["Mallory Hulme"] ? "Subscribed" : "Subscribe"}
                </button>
              </div>
            </div>

            {/* Sparkline curve */}
            <div className="w-full h-10 mt-3 pt-1">
              <svg className="w-full h-full" viewBox="0 0 300 40" preserveAspectRatio="none">
                <path
                  d="M 0,35 Q 50,10 100,25 T 200,10 T 300,5"
                  fill="none"
                  stroke="#066fd1"
                  strokeWidth="2.5"
                />
              </svg>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ========================================================================= */}
      {/* 8. CODE SNIPPET CARD & PROJECT DUE MILESTONE CARD                         */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 16: Card with code */}
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-border">
            <CardTitle className="text-sm font-bold">Card with code</CardTitle>
            <button
              onClick={() => handleCopy(`.card-footer {\n  background: transparent;\n\n  &:last-child {\n    border-radius: 0 0 4px 4px;\n  }\n}`, "code-card")}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === "code-card" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy</span>
            </button>
          </CardHeader>
          <div className="bg-zinc-950 p-4 text-xs font-mono text-zinc-200 overflow-x-auto">
            <pre><code>{`.card-footer {
  background: transparent;

  &:last-child {
    border-radius: 0 0 4px 4px;
  }
}`}</code></pre>
          </div>
        </Card>

        {/* Card 17: New website due card */}
        <Card className="text-center p-6 flex flex-col justify-center items-center">
          <div className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground font-black text-xl flex items-center justify-center mb-3 shadow-xs">
            W
          </div>
          <h3 className="text-base font-bold text-foreground mb-0.5">New website</h3>
          <p className="text-xs text-muted-foreground">Due to: 28 Aug 2026</p>
          <div className="my-2.5">
            <span className="bg-red-500/10 text-red-600 dark:text-red-400 font-bold text-[10px] px-2.5 py-0.5 rounded-full border border-red-500/20">
              Waiting
            </span>
          </div>

          {/* Stacked avatars */}
          <div className="flex -space-x-2 mt-2">
            {[
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80",
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80",
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80",
            ].map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt="Team"
                className="w-7 h-7 rounded-full object-cover border-2 border-card"
              />
            ))}
          </div>
        </Card>
      </div>

      {/* ========================================================================= */}
      {/* 9. REPOSITORY RELEASE CARDS (ROW OF 2)                                    */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 18: Tabler UI v1.0 */}
        <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
          <div className="w-full h-1 bg-muted">
            <div className="h-full bg-red-500" style={{ width: "30%" }} />
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <span>Tabler UI</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-muted text-muted-foreground">v1.0</span>
              </h3>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>24.1k</span>
              </div>
            </div>

            {/* Stacked avatars */}
            <div className="flex -space-x-1.5 my-3">
              {[
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
              ].map((src, i) => (
                <img key={i} src={src} alt="avatar" className="w-6 h-6 rounded-full object-cover border-2 border-card" />
              ))}
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              Open source HTML Dashboard UI Kit built on Bootstrap. Fully responsive and customizable.
            </p>
          </div>
        </div>

        {/* Card 19: Tabler React */}
        <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
          <div className="w-full h-1 bg-muted">
            <div className="h-full bg-emerald-500" style={{ width: "80%" }} />
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <span>Tabler React</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-muted text-muted-foreground">v2.4</span>
              </h3>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>12.3k</span>
              </div>
            </div>

            {/* Stacked avatars */}
            <div className="flex -space-x-1.5 my-3">
              {[
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80",
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80",
              ].map((src, i) => (
                <img key={i} src={src} alt="avatar" className="w-6 h-6 rounded-full object-cover border-2 border-card" />
              ))}
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              React components for Tabler with TypeScript, Lucide icons and Tailwind CSS utility wrappers.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 10. BASIC INFO & CONFIGURATION TABLE (ROW OF 2)                           */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 20: Basic info list */}
        <Card>
          <CardHeader className="pb-3 border-b border-border">
            <CardTitle className="text-sm font-bold">Basic info</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-3 text-xs">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Book className="w-4 h-4 text-primary shrink-0" />
              <span>Went to: <strong className="text-foreground">University of Ljubljana</strong></span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <HomeIcon className="w-4 h-4 text-primary shrink-0" />
              <span>Lives in: <strong className="text-foreground">Ljubljana, Slovenia</strong></span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span>From: <strong className="text-foreground">San Francisco, CA</strong></span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Users className="w-4 h-4 text-primary shrink-0" />
              <span>Followed by: <strong className="text-foreground">841 people</strong></span>
            </div>
          </CardContent>
        </Card>

        {/* Card 21: Configuration Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-border">
            <CardTitle className="text-sm font-bold">Configuration</CardTitle>
            <button
              onClick={() => toast.info("Edição de parâmetros aberta!")}
              className="text-xs text-primary hover:underline flex items-center gap-1 cursor-pointer font-medium"
            >
              <span>Edit configuration</span>
              <Edit className="w-3.5 h-3.5" />
            </button>
          </CardHeader>
          <CardContent className="pt-2">
            <table className="w-full text-xs">
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="py-2.5 text-muted-foreground">Port</td>
                  <td className="py-2.5 text-right font-mono font-bold text-foreground">80</td>
                </tr>
                <tr>
                  <td className="py-2.5 text-muted-foreground">SSL</td>
                  <td className="py-2.5 text-right font-semibold text-emerald-600">Enabled</td>
                </tr>
                <tr>
                  <td className="py-2.5 text-muted-foreground">Memory limit</td>
                  <td className="py-2.5 text-right font-mono font-bold text-foreground">256 MB</td>
                </tr>
                <tr>
                  <td className="py-2.5 text-muted-foreground">Timeout</td>
                  <td className="py-2.5 text-right font-mono font-bold text-foreground">60s</td>
                </tr>
                <tr>
                  <td className="py-2.5 text-muted-foreground">Worker processes</td>
                  <td className="py-2.5 text-right font-mono font-bold text-foreground">4</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      {/* ========================================================================= */}
      {/* BONUS: REAL ESTATE ECOSYSTEM WIDGETS                                      */}
      {/* ========================================================================= */}
      <div className="pt-6 border-t border-border/40">
        <div className="flex items-center gap-2 text-xs font-bold text-primary mb-3">
          <Sparkles className="w-4 h-4" />
          <span>Aplicação no Painel Imobiliário de Luxo</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-card border border-primary/20 rounded-xl shadow-xs">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-primary" />
              <span>Edifício Horizon Jardins</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Monitoramento em tempo real do pipeline de vendas, certidões forenses e vistorias de entrega de chaves.
            </p>
          </div>

          <div className="space-y-1 text-xs">
            <div className="text-muted-foreground">VGV Comercializado:</div>
            <div className="text-xl font-black text-foreground">R$ 64.200.000</div>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> 84% das unidades vendidas
            </span>
          </div>

          <div className="flex flex-col justify-center gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Habite-se emitido:</span>
              <span className="font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% Regular
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Plantão de Vendas:</span>
              <span className="font-bold text-primary">Ativo (12 Corretores)</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
