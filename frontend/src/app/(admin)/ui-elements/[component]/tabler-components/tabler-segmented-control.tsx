"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  Layers,
  Home,
  User,
  Settings,
  Bell,
  List,
  LayoutGrid,
  Calendar,
  Clock,
  Sliders,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Building2,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";

export function TablerSegmentedControl() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // States for each card
  const [card1, setCard1] = useState("1");
  const [card2, setCard2] = useState("👦");
  const [card3, setCard3] = useState("home");
  const [card4, setCard4] = useState("list");
  const [card5, setCard5] = useState("list");
  const [card6, setCard6] = useState("home");
  const [card7, setCard7] = useState("Daily");
  const [card8, setCard8] = useState("Daily");
  const [card9, setCard9] = useState("Daily");
  const [card10, setCard10] = useState("Daily");
  const [card11Top, setCard11Top] = useState("Overview");
  const [card11Bottom, setCard11Bottom] = useState("Today");
  const [card12Sm, setCard12Sm] = useState("List");
  const [card12Md, setCard12Md] = useState("List");
  const [card12Lg, setCard12Lg] = useState("List");

  // Real estate showcase state
  const [propertyType, setPropertyType] = useState("residencial");
  const [operation, setOperation] = useState("venda");

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
            <span className="text-primary font-bold">Forms & Navigation</span>
            <span>•</span>
            <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">
              1:1 Official Replica (12 Cards)
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Segmented control</h1>
          <p className="text-muted-foreground text-sm mt-1 max-w-3xl">
            Controles segmentados para alternância rápida entre opções exclusivas. Suporta itens de texto, emojis, ícones, layouts verticais, estados desabilitados, largura total e variações de tamanho.
            Réplica 100% fiel de <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">https://preview.tabler.io/segmented-control.html</code>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://preview.tabler.io/segmented-control.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border border-border bg-card hover:bg-muted transition-colors text-muted-foreground hover:text-foreground shadow-xs"
          >
            <span>Ver Oficial Tabler</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Grid of all 12 Tabler Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* CARD 1: Basic */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold">Basic</CardTitle>
              <CardDescription className="text-xs">
                A <code>nav-segmented</code> with text <code>nav-link</code> items is enough for a plain control.
              </CardDescription>
            </div>
            <button
              onClick={() =>
                handleCopy(
                  `<nav class="nav nav-segmented" role="tablist">\n  <button class="nav-link active">1</button>\n  <button class="nav-link">2</button>\n  <button class="nav-link">3</button>\n</nav>`,
                  "c1"
                )
              }
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === "c1" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="inline-flex p-1 rounded-lg bg-muted border border-border">
              {["1", "2", "3"].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setCard1(val)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    card1 === val
                      ? "bg-card text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CARD 2: Any content */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold">Any content</CardTitle>
              <CardDescription className="text-xs">
                Items can be any short text, including emoji.
              </CardDescription>
            </div>
            <button
              onClick={() =>
                handleCopy(
                  `<nav class="nav nav-segmented">\n  <button class="nav-link active">👦</button>\n  <button class="nav-link">👦🏿</button>\n  <button class="nav-link">👧</button>\n  <button class="nav-link">👧🏿</button>\n</nav>`,
                  "c2"
                )
              }
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === "c2" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="inline-flex p-1 rounded-lg bg-muted border border-border">
              {["👦", "👦🏿", "👧", "👧🏿"].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setCard2(val)}
                  className={`px-3 py-1.5 text-base rounded-md transition-all cursor-pointer ${
                    card2 === val
                      ? "bg-card shadow-xs scale-105"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CARD 3: Icons only */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold">Icons only</CardTitle>
              <CardDescription className="text-xs">
                Put only an icon in each <code>nav-link</code> for an icon-only control.
              </CardDescription>
            </div>
            <button
              onClick={() =>
                handleCopy(
                  `<nav class="nav nav-segmented">\n  <button class="nav-link active"><svg ...></button>\n  ...\n</nav>`,
                  "c3"
                )
              }
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === "c3" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="inline-flex p-1 rounded-lg bg-muted border border-border">
              {[
                { id: "home", icon: Home, label: "Home" },
                { id: "user", icon: User, label: "User" },
                { id: "settings", icon: Settings, label: "Settings" },
                { id: "bell", icon: Bell, label: "Notifications" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCard3(item.id)}
                    className={`p-2 rounded-md transition-all cursor-pointer ${
                      card3 === item.id
                        ? "bg-card text-foreground shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    title={item.label}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* CARD 4: With icons */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold">With icons</CardTitle>
              <CardDescription className="text-xs">
                Combine an icon and text in each <code>nav-link</code> to label each option.
              </CardDescription>
            </div>
            <button
              onClick={() =>
                handleCopy(
                  `<nav class="nav nav-segmented">\n  <button class="nav-link active"><svg ...> List</button>\n  <button class="nav-link"><svg ...> Kanban</button>\n</nav>`,
                  "c4"
                )
              }
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === "c4" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="inline-flex p-1 rounded-lg bg-muted border border-border">
              {[
                { id: "list", icon: List, label: "List" },
                { id: "kanban", icon: LayoutGrid, label: "Kanban" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCard4(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                      card4 === item.id
                        ? "bg-card text-foreground shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* CARD 5: Vertical */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold">Vertical</CardTitle>
              <CardDescription className="text-xs">
                Add <code>nav-segmented-vertical</code> to stack options in a column.
              </CardDescription>
            </div>
            <button
              onClick={() =>
                handleCopy(
                  `<nav class="nav nav-segmented nav-segmented-vertical">\n  <button class="nav-link active">...</button>\n</nav>`,
                  "c5"
                )
              }
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === "c5" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-col p-1 rounded-lg bg-muted border border-border w-36 space-y-1">
              {[
                { id: "list", icon: List, label: "List" },
                { id: "kanban", icon: LayoutGrid, label: "Kanban" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCard5(item.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer text-left ${
                      card5 === item.id
                        ? "bg-card text-foreground shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* CARD 6: Vertical with disabled items */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold">Vertical with disabled items</CardTitle>
              <CardDescription className="text-xs">
                Add <code>disabled</code> to a <code>nav-link</code> to make it unselectable.
              </CardDescription>
            </div>
            <button
              onClick={() =>
                handleCopy(
                  `<nav class="nav nav-segmented nav-segmented-vertical">\n  <button class="nav-link active">Home</button>\n  <button class="nav-link disabled" disabled>User</button>\n</nav>`,
                  "c6"
                )
              }
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === "c6" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-col p-1 rounded-lg bg-muted border border-border w-36 space-y-1">
              {[
                { id: "home", icon: Home, label: "Home", disabled: false },
                { id: "user", icon: User, label: "User", disabled: true },
                { id: "settings", icon: Settings, label: "Settings", disabled: false },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    disabled={item.disabled}
                    onClick={() => !item.disabled && setCard6(item.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-all text-left ${
                      item.disabled
                        ? "opacity-35 cursor-not-allowed text-muted-foreground"
                        : card6 === item.id
                        ? "bg-card text-foreground shadow-xs cursor-pointer"
                        : "text-muted-foreground hover:text-foreground cursor-pointer"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* CARD 7: Disabled items */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold">Disabled items</CardTitle>
              <CardDescription className="text-xs">
                Disabled options stay visible but can't be selected.
              </CardDescription>
            </div>
            <button
              onClick={() =>
                handleCopy(
                  `<nav class="nav nav-segmented">\n  <button class="nav-link active">Daily</button>\n  <button class="nav-link disabled" disabled>Weekly</button>\n  <button class="nav-link">Monthly</button>\n</nav>`,
                  "c7"
                )
              }
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === "c7" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="inline-flex p-1 rounded-lg bg-muted border border-border">
              {[
                { id: "Daily", label: "Daily", disabled: false },
                { id: "Weekly", label: "Weekly", disabled: true },
                { id: "Monthly", label: "Monthly", disabled: false },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  disabled={item.disabled}
                  onClick={() => !item.disabled && setCard7(item.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    item.disabled
                      ? "opacity-35 cursor-not-allowed text-muted-foreground"
                      : card7 === item.id
                      ? "bg-card text-foreground shadow-xs cursor-pointer"
                      : "text-muted-foreground hover:text-foreground cursor-pointer"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CARD 8: Vertical, no icons */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold">Vertical, no icons</CardTitle>
              <CardDescription className="text-xs">
                A vertical control also works with text-only items.
              </CardDescription>
            </div>
            <button
              onClick={() =>
                handleCopy(
                  `<nav class="nav nav-segmented nav-segmented-vertical">\n  <button class="nav-link active">Daily</button>\n  <button class="nav-link">Weekly</button>\n  ...\n</nav>`,
                  "c8"
                )
              }
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === "c8" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-col p-1 rounded-lg bg-muted border border-border w-32 space-y-1">
              {["Daily", "Weekly", "Monthly", "Yearly"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCard8(item)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all text-left cursor-pointer ${
                    card8 === item
                      ? "bg-card text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CARD 9: Independent group */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold">Independent group</CardTitle>
              <CardDescription className="text-xs">
                Use radio inputs with a unique <code>name</code> to prevent state collisions.
              </CardDescription>
            </div>
            <button
              onClick={() =>
                handleCopy(
                  `<nav class="nav nav-segmented">\n  <input type="radio" name="seg-group-1" id="sg-1" checked />\n  <label for="sg-1" class="nav-link">Daily</label>\n  ...\n</nav>`,
                  "c9"
                )
              }
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === "c9" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="inline-flex p-1 rounded-lg bg-muted border border-border">
              {["Daily", "Weekly", "Monthly"].map((opt) => (
                <label
                  key={opt}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer select-none ${
                    card9 === opt
                      ? "bg-card text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <input
                    type="radio"
                    name="segmented-independent-group"
                    value={opt}
                    checked={card9 === opt}
                    onChange={() => setCard9(opt)}
                    className="sr-only"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CARD 10: Full width */}
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold">Full width</CardTitle>
              <CardDescription className="text-xs">
                Add <code>w-100</code> to stretch the control across its container.
              </CardDescription>
            </div>
            <button
              onClick={() =>
                handleCopy(
                  `<nav class="nav nav-segmented w-100" role="tablist">\n  <button class="nav-link active">Daily</button>\n  <button class="nav-link">Weekly</button>\n  <button class="nav-link">Monthly</button>\n  <button class="nav-link">Yearly</button>\n</nav>`,
                  "c10"
                )
              }
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === "c10" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="w-full flex p-1 rounded-lg bg-muted border border-border">
              {["Daily", "Weekly", "Monthly", "Yearly"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCard10(item)}
                  className={`flex-1 text-center py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    card10 === item
                      ? "bg-card text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CARD 11: Full width, stacked */}
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold">Full width, stacked</CardTitle>
              <CardDescription className="text-xs">
                Multiple full-width controls, one above the other.
              </CardDescription>
            </div>
            <button
              onClick={() =>
                handleCopy(
                  `<div class="space-y-2">\n  <nav class="nav nav-segmented w-100">...</nav>\n  <nav class="nav nav-segmented w-100">...</nav>\n</div>`,
                  "c11"
                )
              }
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === "c11" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            {/* Top row */}
            <div className="w-full flex p-1 rounded-lg bg-muted border border-border">
              {["Overview", "Analytics", "Reports"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCard11Top(item)}
                  className={`flex-1 text-center py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    card11Top === item
                      ? "bg-card text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Bottom row */}
            <div className="w-full flex p-1 rounded-lg bg-muted border border-border">
              {["Today", "Last 7 days", "Last 30 days", "Last year"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCard11Bottom(item)}
                  className={`flex-1 text-center py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    card11Bottom === item
                      ? "bg-card text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CARD 12: Sizes */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold">Sizes</CardTitle>
              <CardDescription className="text-xs">
                Add <code>nav-sm</code> or <code>nav-lg</code> to change size.
              </CardDescription>
            </div>
            <button
              onClick={() =>
                handleCopy(
                  `<nav class="nav nav-segmented nav-sm">...</nav>\n<nav class="nav nav-segmented">...</nav>\n<nav class="nav nav-segmented nav-lg">...</nav>`,
                  "c12"
                )
              }
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copiedKey === "c12" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            {/* Small */}
            <div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">
                Small (nav-sm)
              </span>
              <div className="inline-flex p-0.5 rounded-md bg-muted border border-border">
                {["List", "Kanban"].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setCard12Sm(val)}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded transition-all cursor-pointer ${
                      card12Sm === val
                        ? "bg-card text-foreground shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            {/* Medium */}
            <div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">
                Default
              </span>
              <div className="inline-flex p-1 rounded-lg bg-muted border border-border">
                {["List", "Kanban"].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setCard12Md(val)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                      card12Md === val
                        ? "bg-card text-foreground shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            {/* Large */}
            <div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">
                Large (nav-lg)
              </span>
              <div className="inline-flex p-1.5 rounded-xl bg-muted border border-border">
                {["List", "Kanban"].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setCard12Lg(val)}
                    className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                      card12Lg === val
                        ? "bg-card text-foreground shadow-xs font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* ======================================================== */}
      {/* BONUS: Real Estate Segmented Filters Showcase            */}
      {/* ======================================================== */}
      <div className="pt-6 border-t border-border/40">
        <div className="flex items-center gap-2 text-xs font-bold text-primary mb-3">
          <Sparkles className="w-4 h-4" />
          <span>Aplicação no Painel Imobiliário de Luxo</span>
        </div>

        <div className="p-6 bg-card border border-primary/20 rounded-xl shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary" />
                <span>Filtro Rápido de Carteira de Imóveis</span>
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Alternância instantânea de escopo para busca de empreendimentos e unidades disponíveis.
              </p>
            </div>

            {/* Operation Segmented */}
            <div className="inline-flex p-1 rounded-lg bg-muted border border-border">
              {["venda", "locacao", "lancamento"].map((op) => (
                <button
                  key={op}
                  type="button"
                  onClick={() => {
                    setOperation(op);
                    toast.info(`Operação alterada: ${op.toUpperCase()}`);
                  }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all capitalize cursor-pointer ${
                    operation === op
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {op}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border/60">
            <span className="text-xs text-muted-foreground font-medium">Tipo de Imóvel:</span>
            <div className="inline-flex p-1 rounded-lg bg-muted border border-border">
              {[
                { id: "residencial", label: "Residencial" },
                { id: "comercial", label: "Comercial" },
                { id: "cobertura", label: "Coberturas & Penthouses" },
                { id: "fazenda", label: "Fazendas & Terrenos" },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setPropertyType(t.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                    propertyType === t.id
                      ? "bg-card text-foreground shadow-xs font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
