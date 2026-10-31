"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  Check,
  ChevronRight,
  ExternalLink,
  Copy,
  Sparkles,
  Layers,
  ArrowRight,
  Building2,
  Calendar,
  FileCheck,
  CreditCard,
  User,
  Home,
} from "lucide-react";
import { toast } from "sonner";

export function TablerSteps() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // States for interactive cards
  const [currentStep, setCurrentStep] = useState(2);
  const [activeStep1, setActiveStep1] = useState(2);
  const [activeStep2, setActiveStep2] = useState(2);
  const [activeStep3, setActiveStep3] = useState("Billing Information");
  const [activeBreadcrumb1, setActiveBreadcrumb1] = useState(2);
  const [activeBreadcrumb2, setActiveBreadcrumb2] = useState(3);
  const [activeBreadcrumb3, setActiveBreadcrumb3] = useState(3);
  const [activeVertical1, setActiveVertical1] = useState(3);
  const [activeVertical2, setActiveVertical2] = useState(3);

  const handleCopy = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    toast.success("Código copiado!");
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Imobiliário steps
  const realEstateSteps = [
    { num: 1, title: "Dados Pessoais", desc: "Qualificação do comprador" },
    { num: 2, title: "Seleção do Imóvel", desc: "Escolha da unidade e vaga" },
    { num: 3, title: "Análise de Crédito", desc: "Aprovação bancária" },
    { num: 4, title: "Contrato & Chaves", desc: "Assinatura digital e vistoria" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            <span>Tabler UI</span>
            <span>•</span>
            <span className="text-primary font-bold">Navigation & Progress</span>
            <span>•</span>
            <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">
              1:1 Official Replica
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Steps</h1>
          <p className="text-muted-foreground text-sm mt-1 max-w-3xl">
            Indicadores de fluxo linear, etapas numeradas, contadores visuais, breadcrumbs com setas e timelines verticais.
            Réplica completa de <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">https://preview.tabler.io/steps.html</code> mantendo todas as opções locais existentes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://preview.tabler.io/steps.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border border-border bg-card hover:bg-muted transition-colors text-muted-foreground hover:text-foreground shadow-xs"
          >
            <span>Ver Oficial Tabler</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SEÇÃO 1: VARIAÇÕES OFICIAIS DO TABLER (8 CARDS)          */}
      {/* ======================================================== */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 px-1 text-sm font-bold text-foreground">
          <Layers className="w-4 h-4 text-primary" />
          <span>Variações Oficiais do Tabler (preview.tabler.io/steps.html)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CARD 1: Horizontal */}
          <Card>
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div>
                <CardTitle className="text-base font-bold">Horizontal</CardTitle>
                <CardDescription className="text-xs">
                  Numbered steps for a linear process, with the current step highlighted.
                </CardDescription>
              </div>
              <button
                onClick={() =>
                  handleCopy(
                    `<ul class="steps steps-green my-4">\n  <li class="step-item">1</li>\n  <li class="step-item active">2</li>\n  <li class="step-item">3</li>\n</ul>`,
                    "card1"
                  )
                }
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                {copiedKey === "card1" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copiar</span>
              </button>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="relative flex items-center justify-between w-full my-4 px-4">
                {/* Connecting Line */}
                <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-border z-0">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-300"
                    style={{ width: `${((activeStep1 - 1) / 2) * 100}%` }}
                  />
                </div>

                {[1, 2, 3].map((step) => {
                  const isCompleted = step < activeStep1;
                  const isActive = step === activeStep1;
                  return (
                    <button
                      key={step}
                      onClick={() => setActiveStep1(step)}
                      className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all cursor-pointer ${
                        isActive
                          ? "bg-emerald-500 text-white ring-4 ring-emerald-500/20 shadow-xs"
                          : isCompleted
                          ? "bg-emerald-500 text-white"
                          : "bg-card border-2 border-border text-muted-foreground hover:border-foreground/40"
                      }`}
                    >
                      {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : step}
                    </button>
                  );
                })}
              </div>
              <div className="text-center text-xs text-muted-foreground mt-3">
                Etapa selecionada: <strong className="text-foreground">{activeStep1}</strong> de 3
              </div>
            </CardContent>
          </Card>

          {/* CARD 2: Horizontal counter */}
          <Card>
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div>
                <CardTitle className="text-base font-bold">Horizontal counter</CardTitle>
                <CardDescription className="text-xs">
                  The same steps without numbers, for a more minimal look.
                </CardDescription>
              </div>
              <button
                onClick={() =>
                  handleCopy(
                    `<ol class="steps steps-green steps-counter my-4" aria-label="Progress">\n  <li class="step-item"><a href="#">...</a></li>\n  <li class="step-item active"><a href="#">...</a></li>\n  <li class="step-item"><span>...</span></li>\n</ol>`,
                    "card2"
                  )
                }
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                {copiedKey === "card2" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copiar</span>
              </button>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="relative flex items-center justify-between w-full my-4 px-6">
                {/* Connecting Line */}
                <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-0.5 bg-border z-0">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-300"
                    style={{ width: `${((activeStep2 - 1) / 2) * 100}%` }}
                  />
                </div>

                {[1, 2, 3].map((step) => {
                  const isCompleted = step < activeStep2;
                  const isActive = step === activeStep2;
                  return (
                    <button
                      key={step}
                      onClick={() => setActiveStep2(step)}
                      className={`relative z-10 rounded-full transition-all cursor-pointer ${
                        isActive
                          ? "w-4 h-4 bg-emerald-500 ring-4 ring-emerald-500/25"
                          : isCompleted
                          ? "w-3.5 h-3.5 bg-emerald-500"
                          : "w-3.5 h-3.5 bg-card border-2 border-border hover:border-foreground/40"
                      }`}
                      title={`Step ${step}`}
                    />
                  );
                })}
              </div>
              <div className="text-center text-xs text-muted-foreground mt-3">
                Progresso: <strong className="text-foreground">{activeStep2 === 1 ? "Início (1/3)" : activeStep2 === 2 ? "Em progresso (2/3)" : "Finalizado (3/3)"}</strong>
              </div>
            </CardContent>
          </Card>

          {/* CARD 3: With labels */}
          <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div>
                <CardTitle className="text-base font-bold">With labels</CardTitle>
                <CardDescription className="text-xs">
                  Give each step a title instead of a number.
                </CardDescription>
              </div>
              <button
                onClick={() =>
                  handleCopy(
                    `<ul class="steps steps-green steps-counter my-4">\n  <li class="step-item">Cart</li>\n  <li class="step-item active">Billing Information</li>\n  <li class="step-item">Confirmation</li>\n</ul>`,
                    "card3"
                  )
                }
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                {copiedKey === "card3" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copiar</span>
              </button>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="relative flex items-center justify-between w-full my-2 px-12">
                {/* Connecting Line */}
                <div className="absolute left-16 right-16 top-3 h-0.5 bg-border z-0">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-300"
                    style={{
                      width: activeStep3 === "Cart" ? "0%" : activeStep3 === "Billing Information" ? "50%" : "100%",
                    }}
                  />
                </div>

                {[
                  { label: "Cart", desc: "Revisão dos itens" },
                  { label: "Billing Information", desc: "Dados de faturamento" },
                  { label: "Confirmation", desc: "Pedido confirmado" },
                ].map((item, idx) => {
                  const stepIndex = idx + 1;
                  const currentIdx = activeStep3 === "Cart" ? 1 : activeStep3 === "Billing Information" ? 2 : 3;
                  const isCompleted = stepIndex < currentIdx;
                  const isActive = stepIndex === currentIdx;

                  return (
                    <div
                      key={item.label}
                      onClick={() => setActiveStep3(item.label)}
                      className="relative z-10 flex flex-col items-center cursor-pointer group"
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] transition-all mb-2 ${
                          isActive
                            ? "bg-emerald-500 text-white ring-4 ring-emerald-500/20"
                            : isCompleted
                            ? "bg-emerald-500 text-white"
                            : "bg-card border-2 border-border text-muted-foreground group-hover:border-foreground/50"
                        }`}
                      >
                        {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : stepIndex}
                      </div>
                      <span
                        className={`text-xs font-semibold tracking-tight transition-colors ${
                          isActive
                            ? "text-emerald-600 dark:text-emerald-400 font-bold"
                            : isCompleted
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {item.label}
                      </span>
                      <span className="text-[10px] text-muted-foreground hidden sm:block">{item.desc}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* CARD 4: Breadcrumb arrows */}
          <Card>
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div>
                <CardTitle className="text-base font-bold">Breadcrumb arrows</CardTitle>
                <CardDescription className="text-xs">
                  Chevron-style steps, useful for wizards and checkouts.
                </CardDescription>
              </div>
              <button
                onClick={() =>
                  handleCopy(
                    `<ol class="breadcrumb breadcrumb-arrows">\n  <li class="breadcrumb-item"><a href="#">Step one</a></li>\n  <li class="breadcrumb-item active"><a href="#">Step two</a></li>\n  <li class="breadcrumb-item disabled"><a href="#">Step three</a></li>\n  <li class="breadcrumb-item disabled"><a href="#">Step four</a></li>\n</ol>`,
                    "card4"
                  )
                }
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                {copiedKey === "card4" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copiar</span>
              </button>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex flex-wrap items-center gap-1 text-xs">
                {["Step one", "Step two", "Step three", "Step four"].map((step, idx) => {
                  const stepNum = idx + 1;
                  const isActive = stepNum === activeBreadcrumb1;
                  const isPast = stepNum < activeBreadcrumb1;
                  const isDisabled = stepNum > 2 && activeBreadcrumb1 <= 2 && stepNum !== activeBreadcrumb1;

                  return (
                    <React.Fragment key={step}>
                      <button
                        onClick={() => setActiveBreadcrumb1(stepNum)}
                        className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                          isActive
                            ? "bg-primary text-primary-foreground font-bold shadow-xs"
                            : isPast
                            ? "bg-muted text-foreground hover:bg-muted/80"
                            : isDisabled
                            ? "text-muted-foreground/40 hover:text-muted-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {step}
                      </button>
                      {idx < 3 && <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60 shrink-0" />}
                    </React.Fragment>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* CARD 5: Breadcrumb numbered */}
          <Card>
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div>
                <CardTitle className="text-base font-bold">Breadcrumb numbered</CardTitle>
                <CardDescription className="text-xs">
                  Number each step and mute the ones not yet reached.
                </CardDescription>
              </div>
              <button
                onClick={() =>
                  handleCopy(
                    `<ol class="breadcrumb">\n  <li class="breadcrumb-item"><a href="#">1. Step one</a></li>\n  <li class="breadcrumb-item"><a href="#">2. Step two</a></li>\n  <li class="breadcrumb-item active"><a href="#">3. Step three</a></li>\n  <li class="breadcrumb-item disabled"><a href="#">4. Step four</a></li>\n  <li class="breadcrumb-item disabled"><a href="#">5. Step five</a></li>\n</ol>`,
                    "card5"
                  )
                }
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                {copiedKey === "card5" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copiar</span>
              </button>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                {["1. Step one", "2. Step two", "3. Step three", "4. Step four", "5. Step five"].map((step, idx) => {
                  const stepNum = idx + 1;
                  const isActive = stepNum === activeBreadcrumb2;
                  const isPast = stepNum < activeBreadcrumb2;

                  return (
                    <React.Fragment key={step}>
                      <button
                        onClick={() => setActiveBreadcrumb2(stepNum)}
                        className={`transition-colors cursor-pointer ${
                          isActive
                            ? "text-foreground font-bold underline underline-offset-4 decoration-primary"
                            : isPast
                            ? "text-foreground hover:underline"
                            : "text-muted-foreground/50 hover:text-muted-foreground"
                        }`}
                      >
                        {step}
                      </button>
                      {idx < 4 && <span className="text-muted-foreground/40 font-mono">/</span>}
                    </React.Fragment>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* CARD 6: Breadcrumb muted */}
          <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div>
                <CardTitle className="text-base font-bold">Breadcrumb muted</CardTitle>
                <CardDescription className="text-xs">
                  A quieter style for steps that shouldn't compete with the rest of the page.
                </CardDescription>
              </div>
              <button
                onClick={() =>
                  handleCopy(
                    `<ol class="breadcrumb breadcrumb-muted">\n  <li class="breadcrumb-item"><a href="#">1. Step one</a></li>\n  <li class="breadcrumb-item"><a href="#">2. Step two</a></li>\n  <li class="breadcrumb-item active"><a href="#">3. Step three</a></li>\n  <li class="breadcrumb-item disabled"><a href="#">4. Step four</a></li>\n  <li class="breadcrumb-item disabled"><a href="#">5. Step five</a></li>\n</ol>`,
                    "card6"
                  )
                }
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                {copiedKey === "card6" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copiar</span>
              </button>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex flex-wrap items-center gap-2 text-xs py-2 px-3 rounded-lg bg-muted/40 border border-border/50">
                {["1. Step one", "2. Step two", "3. Step three", "4. Step four", "5. Step five"].map((step, idx) => {
                  const stepNum = idx + 1;
                  const isActive = stepNum === activeBreadcrumb3;
                  const isPast = stepNum < activeBreadcrumb3;

                  return (
                    <React.Fragment key={step}>
                      <button
                        onClick={() => setActiveBreadcrumb3(stepNum)}
                        className={`text-xs transition-colors cursor-pointer ${
                          isActive
                            ? "text-primary font-bold"
                            : isPast
                            ? "text-muted-foreground hover:text-foreground"
                            : "text-muted-foreground/40"
                        }`}
                      >
                        {step}
                      </button>
                      {idx < 4 && <ChevronRight className="w-3 h-3 text-muted-foreground/30" />}
                    </React.Fragment>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* CARD 7: Vertical */}
          <Card>
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div>
                <CardTitle className="text-base font-bold">Vertical</CardTitle>
                <CardDescription className="text-xs">
                  A title and description per step, for a detailed timeline.
                </CardDescription>
              </div>
              <button
                onClick={() =>
                  handleCopy(
                    `<ul class="steps steps-vertical">\n  <li class="step-item">\n    <div class="h4 m-0">Order received</div>\n    <div class="text-secondary">The order was placed...</div>\n  </li>\n  ...\n</ul>`,
                    "card7"
                  )
                }
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                {copiedKey === "card7" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copiar</span>
              </button>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-6 relative pl-7 before:absolute before:left-3 before:top-2 before:bottom-3 before:w-0.5 before:bg-border">
                {[
                  {
                    step: 1,
                    title: "Order received",
                    desc: "The order was placed and payment was confirmed. A confirmation email is on its way.",
                  },
                  {
                    step: 2,
                    title: "Preparing",
                    desc: "The warehouse picked and packed the items.",
                  },
                  {
                    step: 3,
                    title: "Out for delivery",
                    desc: "The courier has the package and is on the way.",
                  },
                  {
                    step: 4,
                    title: "Delivered",
                    desc: "Signed for at the delivery address.",
                  },
                ].map((item) => {
                  const isCompleted = item.step < activeVertical1;
                  const isActive = item.step === activeVertical1;

                  return (
                    <div
                      key={item.step}
                      onClick={() => setActiveVertical1(item.step)}
                      className="relative cursor-pointer group"
                    >
                      <div
                        className={`absolute -left-7 top-0.5 w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] transition-all ${
                          isActive
                            ? "bg-emerald-500 text-white ring-4 ring-emerald-500/20"
                            : isCompleted
                            ? "bg-emerald-500 text-white"
                            : "bg-card border-2 border-border text-muted-foreground group-hover:border-foreground/40"
                        }`}
                      >
                        {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : item.step}
                      </div>
                      <div className="text-xs">
                        <div
                          className={`font-bold transition-colors ${
                            isActive ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"
                          }`}
                        >
                          {item.title}
                        </div>
                        <div className="text-muted-foreground text-[11px] mt-0.5 leading-relaxed">{item.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* CARD 8: Vertical counter */}
          <Card>
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div>
                <CardTitle className="text-base font-bold">Vertical counter</CardTitle>
                <CardDescription className="text-xs">
                  Numbered steps in a vertical list, without descriptions.
                </CardDescription>
              </div>
              <button
                onClick={() =>
                  handleCopy(
                    `<ul class="steps steps-counter steps-vertical">\n  <li class="step-item">Step one</li>\n  <li class="step-item">Step two</li>\n  <li class="step-item active">Step three</li>\n  <li class="step-item">Step four</li>\n  <li class="step-item">Step five</li>\n</ul>`,
                    "card8"
                  )
                }
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                {copiedKey === "card8" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copiar</span>
              </button>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4 relative pl-7 before:absolute before:left-3 before:top-2 before:bottom-3 before:w-0.5 before:bg-border">
                {["Step one", "Step two", "Step three", "Step four", "Step five"].map((label, idx) => {
                  const stepNum = idx + 1;
                  const isCompleted = stepNum < activeVertical2;
                  const isActive = stepNum === activeVertical2;

                  return (
                    <div
                      key={label}
                      onClick={() => setActiveVertical2(stepNum)}
                      className="relative flex items-center gap-2 text-xs cursor-pointer group"
                    >
                      <div
                        className={`absolute -left-7 top-0 w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] transition-all ${
                          isActive
                            ? "bg-emerald-500 text-white ring-4 ring-emerald-500/20"
                            : isCompleted
                            ? "bg-emerald-500 text-white"
                            : "bg-card border-2 border-border text-muted-foreground group-hover:border-foreground/40"
                        }`}
                      >
                        {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : stepNum}
                      </div>
                      <span
                        className={`font-medium transition-colors ${
                          isActive
                            ? "text-emerald-600 dark:text-emerald-400 font-bold"
                            : isCompleted
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SEÇÃO 2: OPÇÕES LOCAIS ORIGINAIS (MANTIDAS 100%)         */}
      {/* ======================================================== */}
      <div className="space-y-6 pt-6 border-t border-border/40">
        <div className="flex items-center gap-2 px-1 text-sm font-bold text-primary">
          <Sparkles className="w-4 h-4" />
          <span>Opções Locais Interativas & Aplicação Imobiliária</span>
        </div>

        {/* 1. Horizontal Steps & Counter (Original) */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-bold">Horizontal Steps with Labels (Interativo)</CardTitle>
            <CardDescription className="text-xs">
              Steps show progress through a numbered sequence with descriptive status indicators.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {realEstateSteps.map((step) => {
                const isCompleted = step.num < currentStep;
                const isCurrent = step.num === currentStep;

                return (
                  <div
                    key={step.num}
                    onClick={() => setCurrentStep(step.num)}
                    className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                      isCurrent
                        ? "border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 shadow-xs"
                        : isCompleted
                        ? "border-emerald-500/60 bg-emerald-50/30 dark:bg-emerald-950/10"
                        : "border-zinc-200 dark:border-zinc-800 opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`h-7 w-7 rounded-full flex items-center justify-center font-bold text-xs ${
                          isCompleted
                            ? "bg-emerald-600 text-white"
                            : isCurrent
                            ? "bg-blue-600 text-white shadow-xs"
                            : "bg-zinc-200 dark:bg-zinc-800 text-zinc-500"
                        }`}
                      >
                        {isCompleted ? <Check className="h-4 w-4" /> : step.num}
                      </div>
                      <div>
                        <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100 block">
                          {step.title}
                        </span>
                        <span className="text-[10px] text-zinc-500">{step.desc}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                disabled={currentStep === 1}
                onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                className="px-3.5 py-1.5 text-xs font-semibold rounded border border-zinc-200 dark:border-zinc-700 disabled:opacity-40 cursor-pointer"
              >
                Etapa Anterior
              </button>
              <span className="text-xs text-zinc-500">
                Etapa <strong>{currentStep}</strong> de <strong>4</strong>
              </span>
              <button
                type="button"
                disabled={currentStep === 4}
                onClick={() => setCurrentStep((prev) => Math.min(4, prev + 1))}
                className="px-3.5 py-1.5 text-xs font-semibold rounded bg-blue-600 text-white disabled:opacity-40 cursor-pointer shadow-xs"
              >
                Próxima Etapa
              </button>
            </div>
          </CardContent>
        </Card>

        {/* 2. Breadcrumb Arrows & Vertical Timeline (Original) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-bold">Breadcrumb Arrows Imobiliário</CardTitle>
              <CardDescription className="text-xs">Chevron arrow sequence indicating flow progression.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1 overflow-x-auto text-xs py-2">
                <span className="px-3 py-1.5 rounded-l-md bg-blue-600 text-white font-semibold flex items-center gap-1 shrink-0">
                  <Check className="h-3 w-3" /> 1. Triagem
                </span>
                <ChevronRight className="h-4 w-4 text-zinc-400 shrink-0" />
                <span className="px-3 py-1.5 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold shrink-0 border border-blue-200 dark:border-blue-800">
                  2. Visita Técnica
                </span>
                <ChevronRight className="h-4 w-4 text-zinc-400 shrink-0" />
                <span className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-400 shrink-0 rounded-r-md">
                  3. Proposta
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Vertical Timeline Steps (Original) */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-bold">Vertical Timeline Steps</CardTitle>
              <CardDescription className="text-xs">Vertical sequence with connected progress line.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 relative pl-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-zinc-200 dark:before:bg-zinc-800">
                {[
                  { title: "Visita realizada com o comprador", time: "Hoje, 14:30", status: "completed" },
                  { title: "Elaboração de proposta com 10% de entrada", time: "Hoje, 16:00", status: "completed" },
                  { title: "Aguardando aceite do proprietário vendedor", time: "Em andamento", status: "current" },
                  { title: "Assinatura digital e pagamento de sinal", time: "Pendente", status: "pending" },
                ].map((item, idx) => (
                  <div key={idx} className="relative flex items-start gap-3 text-xs">
                    <div
                      className={`absolute -left-6 top-1 h-3.5 w-3.5 rounded-full ring-4 ring-white dark:ring-zinc-900 ${
                        item.status === "completed"
                          ? "bg-emerald-500"
                          : item.status === "current"
                          ? "bg-blue-600 animate-pulse"
                          : "bg-zinc-300 dark:bg-zinc-700"
                      }`}
                    />
                    <div>
                      <h5 className="font-semibold text-zinc-900 dark:text-zinc-100">{item.title}</h5>
                      <span className="text-[10px] text-zinc-500">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
