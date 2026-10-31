"use client";

import React, { useState } from "react";
import {
  Compass,
  Play,
  ChevronRight,
  ChevronLeft,
  X,
  Sparkles,
  ExternalLink,
  Settings,
  Users,
  BarChart3,
  CheckCircle2,
  Table,
  Layers,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface TourStep {
  targetId: string;
  title: string;
  description: string;
  position: "bottom" | "top" | "left" | "right";
}

const TOUR_STEPS: TourStep[] = [
  {
    targetId: "start-tour",
    title: "Welcome to the Tour!",
    description: "This button starts the interactive tour. Click it to begin exploring the page.",
    position: "bottom",
  },
  {
    targetId: "tour-card-1",
    title: "Welcome Section",
    description: "This is the first card in our tour. It demonstrates how Driver.js highlights elements on the page.",
    position: "bottom",
  },
  {
    targetId: "tour-card-2",
    title: "Features Section",
    description: "This card shows additional features and demonstrates the tour's ability to navigate between different elements.",
    position: "bottom",
  },
  {
    targetId: "tour-card-3",
    title: "Data Table",
    description: "This table shows how Driver.js works with larger elements. You can highlight entire sections of your page.",
    position: "top",
  },
  {
    targetId: "tour-card-4",
    title: "Settings Card",
    description: "This card demonstrates how the tour works with smaller, centered elements.",
    position: "top",
  },
  {
    targetId: "tour-card-5",
    title: "Users Card",
    description: "Another example card showing user management features.",
    position: "top",
  },
  {
    targetId: "tour-card-6",
    title: "Analytics Card",
    description: "The final step of the tour. This card shows analytics features.",
    position: "top",
  },
];

export function TablerTour() {
  const [currentStepIndex, setCurrentStepIndex] = useState<number | null>(null);

  const startTour = () => {
    setCurrentStepIndex(0);
    toast.info("Tour interativo iniciado!");
  };

  const nextStep = () => {
    if (currentStepIndex !== null && currentStepIndex < TOUR_STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      endTour();
    }
  };

  const prevStep = () => {
    if (currentStepIndex !== null && currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const endTour = () => {
    setCurrentStepIndex(null);
    toast.success("Tour concluído com sucesso!");
  };

  const currentStep = currentStepIndex !== null ? TOUR_STEPS[currentStepIndex] : null;

  return (
    <div className="space-y-6 relative">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card border border-border/70 rounded-xl p-5 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-foreground">Tour Plugin</h1>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
              Driver.js / Shepherd
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Guia passo a passo interativo que conduz os usuários pelas seções principais do sistema com foco visual escurecido e popovers instrutivos.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            id="start-tour"
            onClick={startTour}
            className={`text-xs h-9 gap-1.5 bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all ${
              currentStep?.targetId === "start-tour"
                ? "ring-4 ring-blue-500/50 scale-105 z-40"
                : ""
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Iniciar Tour Guiado
          </Button>

          <a
            href="https://preview.tabler.io/tour.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-border hover:bg-muted text-foreground transition-colors shadow-xs"
          >
            Preview Tabler
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Grid of the 6 Tour Cards matching official Tabler tour.html */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Welcome Section */}
        <div
          id="tour-card-1"
          className={`bg-card border rounded-xl shadow-xs overflow-hidden p-5 transition-all ${
            currentStep?.targetId === "tour-card-1"
              ? "border-blue-500 ring-4 ring-blue-500/40 z-40 scale-[1.01]"
              : "border-border/80"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center font-bold">
              1
            </div>
            <h2 className="text-base font-bold text-foreground">Welcome Section</h2>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Bem-vindo ao painel corporativo do Tabler. Este módulo exemplifica como o Driver.js destaca áreas estratégicas sem interromper a navegação da aplicação.
          </p>
        </div>

        {/* Card 2: Features Section */}
        <div
          id="tour-card-2"
          className={`bg-card border rounded-xl shadow-xs overflow-hidden p-5 transition-all ${
            currentStep?.targetId === "tour-card-2"
              ? "border-blue-500 ring-4 ring-blue-500/40 z-40 scale-[1.01]"
              : "border-border/80"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center font-bold">
              2
            </div>
            <h2 className="text-base font-bold text-foreground">Features Section</h2>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Demonstração de alternância dinâmica entre componentes. O tour move o foco de forma suave com cálculo automático de viewport e scroll.
          </p>
        </div>

        {/* Card 3: Data Table */}
        <div
          id="tour-card-3"
          className={`bg-card border rounded-xl shadow-xs overflow-hidden md:col-span-2 transition-all ${
            currentStep?.targetId === "tour-card-3"
              ? "border-blue-500 ring-4 ring-blue-500/40 z-40 scale-[1.01]"
              : "border-border/80"
          }`}
        >
          <div className="p-4 border-b border-border/70 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Table className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-bold text-foreground">Data Table</h2>
            </div>
            <span className="text-[11px] text-muted-foreground">Bloco amplo de dados</span>
          </div>
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-border/70 text-muted-foreground">
                    <th className="py-2 px-3">Módulo</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3">Responsável</th>
                    <th className="py-2 px-3 text-right">Progresso</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  <tr>
                    <td className="py-2 px-3 font-semibold text-foreground">Onboarding Tour</td>
                    <td className="py-2 px-3 text-emerald-600">Ativo</td>
                    <td className="py-2 px-3 text-muted-foreground">Equipe UX</td>
                    <td className="py-2 px-3 text-right font-mono">100%</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-foreground">Analytics Tracker</td>
                    <td className="py-2 px-3 text-blue-600">Em testes</td>
                    <td className="py-2 px-3 text-muted-foreground">DevOps</td>
                    <td className="py-2 px-3 text-right font-mono">85%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Card 4: Settings Card */}
        <div
          id="tour-card-4"
          className={`bg-card border rounded-xl shadow-xs overflow-hidden p-5 transition-all ${
            currentStep?.targetId === "tour-card-4"
              ? "border-blue-500 ring-4 ring-blue-500/40 z-40 scale-[1.01]"
              : "border-border/80"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <Settings className="w-5 h-5 text-purple-600" />
            <h2 className="text-sm font-bold text-foreground">Settings Card</h2>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Painel de preferências gerais, personalização de tema, opções de acessibilidade e notificações.
          </p>
        </div>

        {/* Card 5: Users Card */}
        <div
          id="tour-card-5"
          className={`bg-card border rounded-xl shadow-xs overflow-hidden p-5 transition-all ${
            currentStep?.targetId === "tour-card-5"
              ? "border-blue-500 ring-4 ring-blue-500/40 z-40 scale-[1.01]"
              : "border-border/80"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-indigo-600" />
            <h2 className="text-sm font-bold text-foreground">Users Card</h2>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Gestão de corretores, administradores e clientes compradores com controle de acessos RBAC.
          </p>
        </div>

        {/* Card 6: Analytics Card */}
        <div
          id="tour-card-6"
          className={`bg-card border rounded-xl shadow-xs overflow-hidden p-5 transition-all md:col-span-2 ${
            currentStep?.targetId === "tour-card-6"
              ? "border-blue-500 ring-4 ring-blue-500/40 z-40 scale-[1.01]"
              : "border-border/80"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-5 h-5 text-amber-600" />
            <h2 className="text-sm font-bold text-foreground">Analytics Card</h2>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Passo final do tour com métricas operacionais consolidadas, KPIs de faturamento e taxas de conversão de leads.
          </p>
        </div>
      </div>

      {/* Floating Tour Popover Box */}
      {currentStep && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <div
            onClick={endTour}
            className="fixed inset-0 bg-black/60 pointer-events-auto backdrop-blur-xs transition-opacity"
          />

          {/* Interactive Popover */}
          <div className="relative z-50 pointer-events-auto bg-card border border-border rounded-2xl max-w-sm w-full p-5 shadow-2xl space-y-3 animate-in zoom-in-95">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">
                Passo {currentStepIndex! + 1} de {TOUR_STEPS.length}
              </span>
              <button
                onClick={endTour}
                className="text-muted-foreground hover:text-foreground p-1"
                title="Fechar Tour"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <h3 className="text-sm font-bold text-foreground">{currentStep.title}</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {currentStep.description}
              </p>
            </div>

            {/* Step Progress dots */}
            <div className="flex items-center justify-center gap-1.5 py-1">
              {TOUR_STEPS.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    currentStepIndex === idx
                      ? "w-5 bg-blue-600"
                      : "w-1.5 bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-border/70 text-xs">
              <Button
                variant="outline"
                size="sm"
                disabled={currentStepIndex === 0}
                onClick={prevStep}
                className="h-8 px-2.5 text-xs gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Anterior
              </Button>

              <Button
                size="sm"
                onClick={nextStep}
                className="h-8 px-3 text-xs bg-blue-600 hover:bg-blue-700 text-white gap-1"
              >
                {currentStepIndex === TOUR_STEPS.length - 1 ? "Concluir" : "Próximo"}
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
