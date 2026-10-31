"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  Info,
  X,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Home,
  User,
  Users,
  Heart,
  Share2,
  ExternalLink,
  ChevronLeft,
  Play,
  Download,
  Copy,
  Sparkles,
  Layers,
  ArrowRight,
  MoreVertical,
  Check,
  Search,
  Star,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Plus,
  Minus,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Shield,
  Globe,
  Calendar,
  Clock,
  Phone,
  MessageCircle,
  FileText,
  Trash2,
  Building2,
  Bot,
  Settings,
  Car,
  Key,
  Briefcase,
  Bell,
  SlidersHorizontal,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge, BusinessStatusBadge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Sheet } from "@/components/ui/sheet";
import { toast } from "sonner";
import { TablerBadges } from "./tabler-components/tabler-badges";
import { TablerButtons } from "./tabler-components/tabler-buttons";
import { TablerCards } from "./tabler-components/tabler-cards";
import { TablerCarousel } from "./tabler-components/tabler-carousel";
import { TablerColors } from "./tabler-components/tabler-colors";
import { TablerConfetti } from "./tabler-components/tabler-confetti";
import { TablerDatagrid } from "./tabler-components/tabler-datagrid";
import { TablerDropdowns } from "./tabler-components/tabler-dropdowns";
import { TablerHoverGallery } from "./tabler-components/tabler-hover-gallery";
import { TablerIconLists } from "./tabler-components/tabler-icon-lists";
import { TablerImageLabels } from "./tabler-components/tabler-image-labels";
import { TablerLegend } from "./tabler-components/tabler-legend";
import { TablerLists } from "./tabler-components/tabler-lists";
import { TablerModals } from "./tabler-components/tabler-modals";
import { TablerNavigation } from "./tabler-components/tabler-navigation";
import { TablerNavOverflow } from "./tabler-components/tabler-nav-overflow";
import { TablerOffcanvas } from "./tabler-components/tabler-offcanvas";
import { TablerProgress } from "./tabler-components/tabler-progress";
import { TablerSegmentedControl } from "./tabler-components/tabler-segmented-control";
import { TablerScrollSpy } from "./tabler-components/tabler-scroll-spy";
import { TablerShape } from "./tabler-components/tabler-shape";
import { TablerSignal } from "./tabler-components/tabler-signal";
import { TablerSocialIcons } from "./tabler-components/tabler-social-icons";
import { TablerSparkline } from "./tabler-components/tabler-sparkline";
import { TablerStarsRating } from "./tabler-components/tabler-stars-rating";
import { TablerSteps } from "./tabler-components/tabler-steps";
import { TablerNumberInput } from "./tabler-components/tabler-number-input";
import { TablerTables } from "./tabler-components/tabler-tables";
import { TablerTabs } from "./tabler-components/tabler-tabs";
import { TablerSwitchIcons } from "./tabler-components/tabler-switch-icons";
import { TablerTags } from "./tabler-components/tabler-tags";
import { TablerTextShimmer } from "./tabler-components/tabler-text-shimmer";
import { TablerToasts } from "./tabler-components/tabler-toasts";
import { TablerTracking } from "./tabler-components/tabler-tracking";
import { TablerTypography } from "./tabler-components/tabler-typography";
import { TablerWidgets } from "./tabler-components/tabler-widgets";
import { TablerUsers } from "./tabler-components/tabler-users";

interface UiElementDetailClientProps {
  slug: string;
}

export function UiElementDetailClient({ slug }: UiElementDetailClientProps) {
  // Estados para interatividade
  const [modalOpen, setModalOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [offcanvasOpen, setOffcanvasOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tab-1");
  const [cardHeaderTab, setCardHeaderTab] = useState("specs");
  const [activePill, setActivePill] = useState("venda");
  const [activePage, setActivePage] = useState(2);
  const [dismissAlert, setDismissAlert] = useState(false);
  const [dismissedAlerts, setDismissedAlerts] = useState<Record<string, boolean>>({});
  const [cardCollapsed, setCardCollapsed] = useState(false);

  const toggleDismissAlert = (id: string) => {
    setDismissedAlerts((prev) => ({ ...prev, [id]: true }));
    toast("Alerta dispensado", {
      action: {
        label: "Desfazer",
        onClick: () => {
          setDismissedAlerts((prev) => {
            const next = { ...prev };
            delete next[id];
            return next;
          });
        },
      },
    });
  };

  const resetDismissedAlerts = () => {
    setDismissedAlerts({});
    toast.success("Todos os alertas foram restaurados!");
  };

  // Estados dos novos elementos Tabler
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [userRating, setUserRating] = useState(4);
  const [ratingHover, setRatingHover] = useState(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [stepperQuartos, setStepperQuartos] = useState(3);
  const [stepperVagas, setStepperVagas] = useState(2);
  const [passwordInput, setPasswordInput] = useState("Imob@2026Master");
  const [showPassword, setShowPassword] = useState(false);
  const [switchState1, setSwitchState1] = useState(true);
  const [switchState2, setSwitchState2] = useState(false);
  const [switchState3, setSwitchState3] = useState(true);
  const [tagsList, setTagsList] = useState(["Cobertura", "Frente Mar", "Mobiliado", "Piscina Privativa", "Smart Home"]);

  const carouselPhotos = [
    { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80", title: "Fachada Contemporânea com Iluminação" },
    { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80", title: "Living Amplo Integrado com Varanda" },
    { url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80", title: "Suíte Master com Piso em Madeira Maciça" },
  ];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast.success("Copiado para a área de transferência!");
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const removeTag = (tagToRemove: string) => {
    setTagsList(tagsList.filter((t) => t !== tagToRemove));
  };

  const renderComponentContent = () => {
    switch (slug) {
      /* ================= 25 NOVOS ELEMENTOS TABLER ================= */
      case "cards":
        return <TablerCards defaultTab="cards" />;
      case "card-gradients":
        return <TablerCards defaultTab="gradients" />;
      case "widgets":
        return <TablerWidgets />;
      case "users":
        return <TablerUsers />;
      case "image-labels":
        return <TablerImageLabels />;
      case "legend":
        return <TablerLegend />;
      case "list":
      case "lists":
        return <TablerLists />;
      case "modals":
        return <TablerModals />;
      case "navigation":
        return <TablerNavigation />;
      case "nav-overflow":
        return <TablerNavOverflow />;
      case "offcanvas":
        return <TablerOffcanvas />;
      case "progress":
      case "progressbar":
        return <TablerProgress />;
      case "segmented-control":
        return <TablerSegmentedControl />;
      case "scroll-spy":
        return <TablerScrollSpy />;
      case "shape":
        return <TablerShape />;
      case "signal":
        return <TablerSignal />;
      case "social-icons":
        return <TablerSocialIcons />;
      case "sparkline":
        return <TablerSparkline />;
      case "stars-rating":
        return <TablerStarsRating />;
      case "steps":
        return <TablerSteps />;
      case "number-input":
        return <TablerNumberInput />;
      case "tables":
        return <TablerTables />;
      case "tabs":
        return <TablerTabs />;
      case "switch-icons":
        return <TablerSwitchIcons />;
      case "tags":
        return <TablerTags />;
      case "text-shimmer":
        return <TablerTextShimmer />;
      case "toasts":
      case "notifications":
        return <TablerToasts />;
      case "tracking":
        return <TablerTracking />;
      case "typography":
        return <TablerTypography />;

      /* ================= ANTERIORES TABLER ================= */
      case "badges":
      case "badge":
        return <TablerBadges />;
      case "buttons":
        return <TablerButtons />;
      case "carousel":
        return <TablerCarousel />;
      case "colors":
        return <TablerColors />;
      case "confetti":
        return <TablerConfetti />;
      case "datagrid":
        return <TablerDatagrid />;
      case "dropdowns":
        return <TablerDropdowns />;
      case "hover-gallery":
        return <TablerHoverGallery />;
      case "icon-lists":
        return <TablerIconLists />;

      /* ================= ALERTS (TABLER COMPLETO) ================= */
      case "alerts":
        return (
          <div className="space-y-6">
            {/* Banner de restauração interativa quando há alertas fechados */}
            {Object.keys(dismissedAlerts).length > 0 && (
              <div className="flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50/90 dark:border-zinc-800 dark:bg-zinc-900/80 px-4 py-2.5 text-xs text-zinc-700 dark:text-zinc-300">
                <span>
                  <strong>{Object.keys(dismissedAlerts).length}</strong> alerta(s) fechado(s) interativamente.
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetDismissedAlerts}
                  className="h-7 text-xs gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="h-3 w-3" />
                  Restaurar todos
                </Button>
              </div>
            )}

            {/* 1. Basic */}
            <Card>
              <CardHeader>
                <CardTitle>Basic</CardTitle>
                <CardDescription>
                  A title and a color are enough to show the status of an action.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div
                  className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50/70 p-3.5 text-sm font-medium text-red-900 dark:border-red-900/50 dark:bg-red-950/25 dark:text-red-200"
                  role="alert"
                >
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0" />
                  <span>An error occurred!</span>
                </div>

                <div
                  className="flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50/70 p-3.5 text-sm font-medium text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/25 dark:text-amber-200"
                  role="alert"
                >
                  <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>Some information is missing!</span>
                </div>

                <div
                  className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50/70 p-3.5 text-sm font-medium text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/25 dark:text-emerald-200"
                  role="alert"
                >
                  <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Completed successfully!</span>
                </div>

                <div
                  className="flex items-center gap-3 rounded-lg border border-sky-200 bg-sky-50/70 p-3.5 text-sm font-medium text-sky-900 dark:border-sky-900/50 dark:bg-sky-950/25 dark:text-sky-200"
                  role="alert"
                >
                  <Info className="h-5 w-5 text-sky-600 dark:text-sky-400 shrink-0" />
                  <span>Just a quick note!</span>
                </div>
              </CardContent>
            </Card>

            {/* 2. With action */}
            <Card>
              <CardHeader>
                <CardTitle>With action</CardTitle>
                <CardDescription>
                  Add an{" "}
                  <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold">
                    alert-action
                  </code>{" "}
                  link to give users something to do next.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {!dismissedAlerts["action-danger"] && (
                  <div
                    className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50/70 p-3.5 text-sm font-medium text-red-900 dark:border-red-900/50 dark:bg-red-950/25 dark:text-red-200"
                    role="alert"
                  >
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0" />
                    <span>An error occurred!</span>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        toast.error("Ação disparada: An error occurred!");
                      }}
                      className="ml-auto font-medium text-sm underline decoration-red-400 hover:text-red-950 dark:hover:text-red-100 transition-colors"
                    >
                      Link
                    </a>
                    <button
                      type="button"
                      onClick={() => toggleDismissAlert("action-danger")}
                      className="p-1 rounded text-red-700/70 hover:text-red-900 hover:bg-red-100 dark:text-red-300/70 dark:hover:text-red-100 dark:hover:bg-red-900/40 transition-colors cursor-pointer"
                      aria-label="close"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {!dismissedAlerts["action-warning"] && (
                  <div
                    className="flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50/70 p-3.5 text-sm font-medium text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/25 dark:text-amber-200"
                    role="alert"
                  >
                    <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>Some information is missing!</span>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        toast.warning("Ação disparada: Some information is missing!");
                      }}
                      className="ml-auto font-medium text-sm underline decoration-amber-400 hover:text-amber-950 dark:hover:text-amber-100 transition-colors"
                    >
                      Link
                    </a>
                    <button
                      type="button"
                      onClick={() => toggleDismissAlert("action-warning")}
                      className="p-1 rounded text-amber-700/70 hover:text-amber-900 hover:bg-amber-100 dark:text-amber-300/70 dark:hover:text-amber-100 dark:hover:bg-amber-900/40 transition-colors cursor-pointer"
                      aria-label="close"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {!dismissedAlerts["action-success"] && (
                  <div
                    className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50/70 p-3.5 text-sm font-medium text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/25 dark:text-emerald-200"
                    role="alert"
                  >
                    <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Completed successfully!</span>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        toast.success("Ação disparada: Completed successfully!");
                      }}
                      className="ml-auto font-medium text-sm underline decoration-emerald-400 hover:text-emerald-950 dark:hover:text-emerald-100 transition-colors"
                    >
                      Link
                    </a>
                    <button
                      type="button"
                      onClick={() => toggleDismissAlert("action-success")}
                      className="p-1 rounded text-emerald-700/70 hover:text-emerald-900 hover:bg-emerald-100 dark:text-emerald-300/70 dark:hover:text-emerald-100 dark:hover:bg-emerald-900/40 transition-colors cursor-pointer"
                      aria-label="close"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {!dismissedAlerts["action-info"] && (
                  <div
                    className="flex items-center gap-3 rounded-lg border border-sky-200 bg-sky-50/70 p-3.5 text-sm font-medium text-sky-900 dark:border-sky-900/50 dark:bg-sky-950/25 dark:text-sky-200"
                    role="alert"
                  >
                    <Info className="h-5 w-5 text-sky-600 dark:text-sky-400 shrink-0" />
                    <span>Just a quick note!</span>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        toast.info("Ação disparada: Just a quick note!");
                      }}
                      className="ml-auto font-medium text-sm underline decoration-sky-400 hover:text-sky-950 dark:hover:text-sky-100 transition-colors"
                    >
                      Link
                    </a>
                    <button
                      type="button"
                      onClick={() => toggleDismissAlert("action-info")}
                      className="p-1 rounded text-sky-700/70 hover:text-sky-900 hover:bg-sky-100 dark:text-sky-300/70 dark:hover:text-sky-100 dark:hover:bg-sky-900/40 transition-colors cursor-pointer"
                      aria-label="close"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 3. Dismissible */}
            <Card>
              <CardHeader>
                <CardTitle>Dismissible</CardTitle>
                <CardDescription>
                  Add{" "}
                  <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold">
                    alert-dismissible
                  </code>{" "}
                  and a{" "}
                  <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold">
                    btn-close
                  </code>{" "}
                  button to let users close the alert.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {!dismissedAlerts["dismiss-danger"] && (
                  <div
                    className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50/70 p-3.5 text-sm font-medium text-red-900 dark:border-red-900/50 dark:bg-red-950/25 dark:text-red-200"
                    role="alert"
                  >
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0" />
                      <span>An error occurred!</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleDismissAlert("dismiss-danger")}
                      className="p-1 rounded text-red-700/70 hover:text-red-900 hover:bg-red-100 dark:text-red-300/70 dark:hover:text-red-100 dark:hover:bg-red-900/40 transition-colors cursor-pointer"
                      aria-label="close"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {!dismissedAlerts["dismiss-warning"] && (
                  <div
                    className="flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50/70 p-3.5 text-sm font-medium text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/25 dark:text-amber-200"
                    role="alert"
                  >
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0" />
                      <span>Some information is missing!</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleDismissAlert("dismiss-warning")}
                      className="p-1 rounded text-amber-700/70 hover:text-amber-900 hover:bg-amber-100 dark:text-amber-300/70 dark:hover:text-amber-100 dark:hover:bg-amber-900/40 transition-colors cursor-pointer"
                      aria-label="close"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {!dismissedAlerts["dismiss-success"] && (
                  <div
                    className="flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50/70 p-3.5 text-sm font-medium text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/25 dark:text-emerald-200"
                    role="alert"
                  >
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Completed successfully!</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleDismissAlert("dismiss-success")}
                      className="p-1 rounded text-emerald-700/70 hover:text-emerald-900 hover:bg-emerald-100 dark:text-emerald-300/70 dark:hover:text-emerald-100 dark:hover:bg-emerald-900/40 transition-colors cursor-pointer"
                      aria-label="close"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {!dismissedAlerts["dismiss-info"] && (
                  <div
                    className="flex items-center justify-between rounded-lg border border-sky-200 bg-sky-50/70 p-3.5 text-sm font-medium text-sky-900 dark:border-sky-900/50 dark:bg-sky-950/25 dark:text-sky-200"
                    role="alert"
                  >
                    <div className="flex items-center gap-3">
                      <Info className="h-5 w-5 text-sky-600 dark:text-sky-400 shrink-0" />
                      <span>Just a quick note!</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleDismissAlert("dismiss-info")}
                      className="p-1 rounded text-sky-700/70 hover:text-sky-900 hover:bg-sky-100 dark:text-sky-300/70 dark:hover:text-sky-100 dark:hover:bg-sky-900/40 transition-colors cursor-pointer"
                      aria-label="close"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 4. With a description */}
            <Card>
              <CardHeader>
                <CardTitle>With a description</CardTitle>
                <CardDescription>
                  Add an{" "}
                  <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold">
                    alert-description
                  </code>{" "}
                  or an{" "}
                  <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold">
                    alert-list
                  </code>{" "}
                  when the title alone isn't enough context.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {!dismissedAlerts["desc-danger"] && (
                  <div
                    className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50/70 p-4 text-red-900 dark:border-red-900/50 dark:bg-red-950/25 dark:text-red-200"
                    role="alert"
                  >
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm text-red-900 dark:text-red-100">
                        Password does not meet requirements:
                      </h3>
                      <div className="mt-1.5 text-xs text-red-800 dark:text-red-300/90">
                        <ul className="list-disc list-inside space-y-1">
                          <li>Minimum 8 characters</li>
                          <li>Include a special character</li>
                        </ul>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleDismissAlert("desc-danger")}
                      className="p-1 rounded text-red-700/70 hover:text-red-900 hover:bg-red-100 dark:text-red-300/70 dark:hover:text-red-100 dark:hover:bg-red-900/40 transition-colors cursor-pointer shrink-0"
                      aria-label="close"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {!dismissedAlerts["desc-warning"] && (
                  <div
                    className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50/70 p-4 text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/25 dark:text-amber-200"
                    role="alert"
                  >
                    <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm text-amber-900 dark:text-amber-100">
                        Some information is missing!
                      </h3>
                      <div className="mt-1 text-xs text-amber-800 dark:text-amber-300/90">
                        This is a custom alert box with a description.
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleDismissAlert("desc-warning")}
                      className="p-1 rounded text-amber-700/70 hover:text-amber-900 hover:bg-amber-100 dark:text-amber-300/70 dark:hover:text-amber-100 dark:hover:bg-amber-900/40 transition-colors cursor-pointer shrink-0"
                      aria-label="close"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {!dismissedAlerts["desc-success"] && (
                  <div
                    className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50/70 p-4 text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/25 dark:text-emerald-200"
                    role="alert"
                  >
                    <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm text-emerald-900 dark:text-emerald-100">
                        Completed successfully!
                      </h3>
                      <div className="mt-1 text-xs text-emerald-800 dark:text-emerald-300/90">
                        This is a custom alert box with a description.
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleDismissAlert("desc-success")}
                      className="p-1 rounded text-emerald-700/70 hover:text-emerald-900 hover:bg-emerald-100 dark:text-emerald-300/70 dark:hover:text-emerald-100 dark:hover:bg-emerald-900/40 transition-colors cursor-pointer shrink-0"
                      aria-label="close"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {!dismissedAlerts["desc-info"] && (
                  <div
                    className="flex items-start gap-3 rounded-lg border border-sky-200 bg-sky-50/70 p-4 text-sky-900 dark:border-sky-900/50 dark:bg-sky-950/25 dark:text-sky-200"
                    role="alert"
                  >
                    <Info className="h-5 w-5 text-sky-600 dark:text-sky-400 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm text-sky-900 dark:text-sky-100">
                        Just a quick note!
                      </h3>
                      <div className="mt-1 text-xs text-sky-800 dark:text-sky-300/90">
                        This is a custom alert box with a description.
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleDismissAlert("desc-info")}
                      className="p-1 rounded text-sky-700/70 hover:text-sky-900 hover:bg-sky-100 dark:text-sky-300/70 dark:hover:text-sky-100 dark:hover:bg-sky-900/40 transition-colors cursor-pointer shrink-0"
                      aria-label="close"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 5. Important */}
            <Card>
              <CardHeader>
                <CardTitle>Important</CardTitle>
                <CardDescription>
                  Add{" "}
                  <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold">
                    alert-important
                  </code>{" "}
                  for a bolder style that stands out from the rest of the page.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {!dismissedAlerts["imp-danger"] && (
                  <div
                    className="flex items-start gap-3 rounded-lg bg-red-600 dark:bg-red-600 text-white p-4 shadow-sm"
                    role="alert"
                  >
                    <AlertCircle className="h-5 w-5 text-white mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm text-white">
                        Password does not meet requirements:
                      </h3>
                      <div className="mt-1.5 text-xs text-white/90">
                        <ul className="list-disc list-inside space-y-1">
                          <li>Minimum 8 characters</li>
                          <li>Include a special character</li>
                        </ul>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleDismissAlert("imp-danger")}
                      className="p-1 rounded text-white/70 hover:text-white hover:bg-white/20 transition-colors cursor-pointer shrink-0"
                      aria-label="close"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {!dismissedAlerts["imp-success"] && (
                  <div
                    className="flex items-start gap-3 rounded-lg bg-emerald-600 dark:bg-emerald-600 text-white p-4 shadow-sm"
                    role="alert"
                  >
                    <Check className="h-5 w-5 text-white mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm text-white">
                        This is a custom alert box!
                      </h3>
                      <div className="mt-1 text-xs text-white/90">
                        This is a custom alert box with a description.
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleDismissAlert("imp-success")}
                      className="p-1 rounded text-white/70 hover:text-white hover:bg-white/20 transition-colors cursor-pointer shrink-0"
                      aria-label="close"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {!dismissedAlerts["imp-warning"] && (
                  <div
                    className="flex items-start gap-3 rounded-lg bg-amber-500 dark:bg-amber-500 text-white p-4 shadow-sm"
                    role="alert"
                  >
                    <AlertTriangle className="h-5 w-5 text-white mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm text-white">
                        This is a custom alert box!
                      </h3>
                      <div className="mt-1 text-xs text-white/90">
                        This is a custom alert box with a description.
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleDismissAlert("imp-warning")}
                      className="p-1 rounded text-white/70 hover:text-white hover:bg-white/20 transition-colors cursor-pointer shrink-0"
                      aria-label="close"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {!dismissedAlerts["imp-info"] && (
                  <div
                    className="flex items-start gap-3 rounded-lg bg-sky-600 dark:bg-sky-600 text-white p-4 shadow-sm"
                    role="alert"
                  >
                    <Info className="h-5 w-5 text-white mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm text-white">
                        This is a custom alert box!
                      </h3>
                      <div className="mt-1 text-xs text-white/90">
                        This is a custom alert box with a description.
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleDismissAlert("imp-info")}
                      className="p-1 rounded text-white/70 hover:text-white hover:bg-white/20 transition-colors cursor-pointer shrink-0"
                      aria-label="close"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {!dismissedAlerts["imp-action-danger"] && (
                  <div
                    className="flex items-center gap-3 rounded-lg bg-red-600 dark:bg-red-600 text-white p-3.5 shadow-sm"
                    role="alert"
                  >
                    <AlertCircle className="h-5 w-5 text-white shrink-0" />
                    <span className="font-medium text-sm">An error occurred!</span>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        toast.error("Ação disparada: An error occurred!");
                      }}
                      className="ml-auto font-medium text-sm underline text-white/90 hover:text-white transition-opacity"
                    >
                      Link
                    </a>
                    <button
                      type="button"
                      onClick={() => toggleDismissAlert("imp-action-danger")}
                      className="p-1 rounded text-white/70 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
                      aria-label="close"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {!dismissedAlerts["imp-action-info"] && (
                  <div
                    className="flex items-center gap-3 rounded-lg bg-sky-600 dark:bg-sky-600 text-white p-3.5 shadow-sm"
                    role="alert"
                  >
                    <Info className="h-5 w-5 text-white shrink-0" />
                    <span className="font-medium text-sm">Just a quick note!</span>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        toast.info("Ação disparada: Just a quick note!");
                      }}
                      className="ml-auto font-medium text-sm underline text-white/90 hover:text-white transition-opacity"
                    >
                      Link
                    </a>
                    <button
                      type="button"
                      onClick={() => toggleDismissAlert("imp-action-info")}
                      className="p-1 rounded text-white/70 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
                      aria-label="close"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 6. Minor */}
            <Card>
              <CardHeader>
                <CardTitle>Minor</CardTitle>
                <CardDescription>
                  Add{" "}
                  <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold">
                    alert-minor
                  </code>{" "}
                  for a quieter style that fits inline with other content.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {!dismissedAlerts["minor-danger"] && (
                  <div
                    className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-white/70 p-4 dark:border-zinc-800 dark:bg-zinc-900/60 shadow-xs"
                    role="alert"
                  >
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                        Password does not meet requirements:
                      </h3>
                      <div className="mt-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                        <ul className="list-disc list-inside space-y-1">
                          <li>Minimum 8 characters</li>
                          <li>Include a special character</li>
                        </ul>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleDismissAlert("minor-danger")}
                      className="p-1 rounded text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 dark:hover:text-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
                      aria-label="close"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {!dismissedAlerts["minor-success"] && (
                  <div
                    className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-white/70 p-4 dark:border-zinc-800 dark:bg-zinc-900/60 shadow-xs"
                    role="alert"
                  >
                    <Check className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                        This is a custom alert box!
                      </h3>
                      <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                        This is a custom alert box with a description.
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleDismissAlert("minor-success")}
                      className="p-1 rounded text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 dark:hover:text-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
                      aria-label="close"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {!dismissedAlerts["minor-warning"] && (
                  <div
                    className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-white/70 p-4 dark:border-zinc-800 dark:bg-zinc-900/60 shadow-xs"
                    role="alert"
                  >
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                        This is a custom alert box!
                      </h3>
                      <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                        This is a custom alert box with a description.
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleDismissAlert("minor-warning")}
                      className="p-1 rounded text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 dark:hover:text-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
                      aria-label="close"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {!dismissedAlerts["minor-info"] && (
                  <div
                    className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-white/70 p-4 dark:border-zinc-800 dark:bg-zinc-900/60 shadow-xs"
                    role="alert"
                  >
                    <Info className="h-5 w-5 text-sky-500 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                        This is a custom alert box!
                      </h3>
                      <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                        This is a custom alert box with a description.
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleDismissAlert("minor-info")}
                      className="p-1 rounded text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 dark:hover:text-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
                      aria-label="close"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      /* ================= AVATARS (TABLER COMPLETO) ================= */
      case "avatars":
        return (
          <div className="space-y-8">
            {/* 1. Default & Simple Avatars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Default Avatar</CardTitle>
                  <CardDescription>O elemento base com ícone de usuário ou foto.</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-md bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 border border-zinc-200 dark:border-zinc-700">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 border border-zinc-200 dark:border-zinc-700">
                    <User className="h-5 w-5" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Avatar Placeholders (Iniciais)</CardTitle>
                  <CardDescription>Fallback tipográfico elegante na ausência de foto.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap items-center gap-2">
                  {["DV", "MA", "JL", "RC", "FP", "KS"].map((initials, i) => (
                    <div
                      key={initials}
                      className={`h-9 w-9 rounded-md flex items-center justify-center font-bold text-xs border ${
                        i === 0
                          ? "bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900"
                          : "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700"
                      }`}
                    >
                      {initials}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Avatar Shapes (Formatos)</CardTitle>
                  <CardDescription>Quadrado arredondado, circular ou plano.</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-md bg-zinc-200 overflow-hidden ring-1 ring-zinc-300">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="Avatar" className="h-full w-full object-cover" />
                  </div>
                  <div className="h-10 w-10 rounded-full bg-zinc-200 overflow-hidden ring-1 ring-zinc-300">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="Avatar" className="h-full w-full object-cover" />
                  </div>
                  <div className="h-10 w-10 rounded-none bg-zinc-200 overflow-hidden ring-1 ring-zinc-300">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="Avatar" className="h-full w-full object-cover" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 2. Avatar with icon (Tabler Style) */}
            <Card>
              <CardHeader>
                <CardTitle>Avatar with icon</CardTitle>
                <CardDescription>Coloque um ícone funcional dentro do elemento avatar em vez de uma fotografia.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="h-10 w-10 rounded-md bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 shadow-2xs hover:bg-zinc-200 transition-colors" title="Usuário / Perfil">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="h-10 w-10 rounded-md bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 shadow-2xs hover:bg-zinc-200 transition-colors" title="Configurações">
                    <Settings className="h-5 w-5" />
                  </div>
                  <div className="h-10 w-10 rounded-md bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 shadow-2xs hover:bg-zinc-200 transition-colors" title="Garagem / Veículo">
                    <Car className="h-5 w-5" />
                  </div>
                  <div className="h-10 w-10 rounded-md bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 shadow-2xs hover:bg-zinc-200 transition-colors" title="Empreendimento / Imóvel">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div className="h-10 w-10 rounded-md bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 shadow-2xs hover:bg-zinc-200 transition-colors" title="Equipe / Corretores">
                    <Users className="h-5 w-5" />
                  </div>
                  <div className="h-10 w-10 rounded-md bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 shadow-2xs hover:bg-zinc-200 transition-colors" title="Chaves / Entrega">
                    <Key className="h-5 w-5" />
                  </div>
                  <div className="h-10 w-10 rounded-md bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 shadow-2xs hover:bg-zinc-200 transition-colors" title="Comercial / Negócios">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div className="h-10 w-10 rounded-md bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 shadow-2xs hover:bg-zinc-200 transition-colors" title="Notificações">
                    <Bell className="h-5 w-5" />
                  </div>
                  <div className="h-10 w-10 rounded-md bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 shadow-2xs hover:bg-zinc-200 transition-colors" title="Segurança Jurídica">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div className="h-10 w-10 rounded-md bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 shadow-2xs hover:bg-zinc-200 transition-colors" title="Assistente Copilot IA">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div className="h-10 w-10 rounded-md bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 shadow-2xs hover:bg-zinc-200 transition-colors" title="Contrato / Matrícula">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="h-10 w-10 rounded-md bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 shadow-2xs hover:bg-zinc-200 transition-colors" title="Destaques">
                    <Sparkles className="h-5 w-5" />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                  <span className="text-xs font-semibold text-zinc-400 block w-full mb-1">Versão Circular (rounded-full):</span>
                  <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">
                    <Key className="h-5 w-5" />
                  </div>
                  <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">
                    <Sparkles className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 3. Avatar icon colors (Tabler 12-Color Theme Palette) */}
            <Card>
              <CardHeader>
                <CardTitle>Avatar icon colors</CardTitle>
                <CardDescription>Combine avatares de ícones com todo o espectro de cores do tema (Light Tint & Sólido).</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <span className="text-xs font-semibold text-zinc-400 block mb-2">Paleta Pastel (Light Tint - Padrão Tabler)</span>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300 flex items-center justify-center border border-blue-200 dark:border-blue-900" title="Blue">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="h-10 w-10 rounded-md bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-300 flex items-center justify-center border border-sky-200 dark:border-sky-900" title="Azure / Sky">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="h-10 w-10 rounded-md bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300 flex items-center justify-center border border-indigo-200 dark:border-indigo-900" title="Indigo">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="h-10 w-10 rounded-md bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-300 flex items-center justify-center border border-purple-200 dark:border-purple-900" title="Purple">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="h-10 w-10 rounded-md bg-pink-50 text-pink-600 dark:bg-pink-950/40 dark:text-pink-300 flex items-center justify-center border border-pink-200 dark:border-pink-900" title="Pink">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="h-10 w-10 rounded-md bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300 flex items-center justify-center border border-rose-200 dark:border-rose-900" title="Red / Rose">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="h-10 w-10 rounded-md bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-300 flex items-center justify-center border border-orange-200 dark:border-orange-900" title="Orange">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="h-10 w-10 rounded-md bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-300 flex items-center justify-center border border-amber-200 dark:border-amber-900" title="Yellow / Amber">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="h-10 w-10 rounded-md bg-lime-50 text-lime-600 dark:bg-lime-950/40 dark:text-lime-300 flex items-center justify-center border border-lime-200 dark:border-lime-900" title="Lime">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="h-10 w-10 rounded-md bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300 flex items-center justify-center border border-emerald-200 dark:border-emerald-900" title="Green / Emerald">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="h-10 w-10 rounded-md bg-teal-50 text-teal-600 dark:bg-teal-950/40 dark:text-teal-300 flex items-center justify-center border border-teal-200 dark:border-teal-900" title="Teal">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="h-10 w-10 rounded-md bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-300 flex items-center justify-center border border-cyan-200 dark:border-cyan-900" title="Cyan">
                      <User className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-zinc-400 block mb-2">Paleta Sólida de Alto Destaque (Full Saturation)</span>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-blue-600 text-white flex items-center justify-center shadow-2xs" title="Solid Blue">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="h-10 w-10 rounded-md bg-sky-600 text-white flex items-center justify-center shadow-2xs" title="Solid Sky">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="h-10 w-10 rounded-md bg-indigo-600 text-white flex items-center justify-center shadow-2xs" title="Solid Indigo">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="h-10 w-10 rounded-md bg-purple-600 text-white flex items-center justify-center shadow-2xs" title="Solid Purple">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="h-10 w-10 rounded-md bg-rose-600 text-white flex items-center justify-center shadow-2xs" title="Solid Rose">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="h-10 w-10 rounded-md bg-amber-500 text-white flex items-center justify-center shadow-2xs" title="Solid Amber">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="h-10 w-10 rounded-md bg-emerald-600 text-white flex items-center justify-center shadow-2xs" title="Solid Emerald">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="h-10 w-10 rounded-md bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 flex items-center justify-center shadow-2xs" title="Solid Neutral">
                      <User className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 3. Escala de Tamanhos (xxs a 2xl) */}
            <Card>
              <CardHeader>
                <CardTitle>Escala Completa de Tamanhos (avatar-xxs a avatar-2xl)</CardTitle>
                <CardDescription>Desde miniaturas para tags e tabelas até fotos grandes de perfil.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <span className="text-xs font-semibold text-zinc-400 block mb-2">Com Fotos de Alta Resolução</span>
                  <div className="flex flex-wrap items-end gap-3">
                    <div className="h-5 w-5 rounded-full overflow-hidden bg-zinc-200 ring-1 ring-zinc-300" title="xxs (20px)">
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" alt="xxs" className="h-full w-full object-cover" />
                    </div>
                    <div className="h-6 w-6 rounded-full overflow-hidden bg-zinc-200 ring-1 ring-zinc-300" title="xs (24px)">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="xs" className="h-full w-full object-cover" />
                    </div>
                    <div className="h-8 w-8 rounded-full overflow-hidden bg-zinc-200 ring-1 ring-zinc-300" title="sm (32px)">
                      <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80" alt="sm" className="h-full w-full object-cover" />
                    </div>
                    <div className="h-10 w-10 rounded-full overflow-hidden bg-zinc-200 ring-2 ring-zinc-300" title="md (40px)">
                      <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80" alt="md" className="h-full w-full object-cover" />
                    </div>
                    <div className="h-12 w-12 rounded-full overflow-hidden bg-zinc-200 ring-2 ring-zinc-300" title="lg (48px)">
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" alt="lg" className="h-full w-full object-cover" />
                    </div>
                    <div className="h-16 w-16 rounded-full overflow-hidden bg-zinc-200 ring-2 ring-zinc-300" title="xl (64px)">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" alt="xl" className="h-full w-full object-cover" />
                    </div>
                    <div className="h-20 w-20 rounded-full overflow-hidden bg-zinc-200 ring-2 ring-emerald-600" title="2xl (80px)">
                      <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80" alt="2xl" className="h-full w-full object-cover" />
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-zinc-400 block mb-2">Com Iniciais Textuais</span>
                  <div className="flex flex-wrap items-end gap-3">
                    <div className="h-5 w-5 rounded bg-zinc-200 flex items-center justify-center font-bold text-[9px]">PK</div>
                    <div className="h-6 w-6 rounded bg-zinc-200 flex items-center justify-center font-bold text-[10px]">PK</div>
                    <div className="h-8 w-8 rounded-md bg-zinc-200 flex items-center justify-center font-bold text-xs">PK</div>
                    <div className="h-10 w-10 rounded-md bg-zinc-200 flex items-center justify-center font-bold text-sm">PK</div>
                    <div className="h-12 w-12 rounded-md bg-zinc-200 flex items-center justify-center font-bold text-base">PK</div>
                    <div className="h-16 w-16 rounded-lg bg-zinc-200 flex items-center justify-center font-bold text-xl">PK</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 4. Avatar Stack & Lists (Empilhados) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Avatar Lists Stacked (Circulares)</CardTitle>
                  <CardDescription>Para equipes de corretores atribuídos à mesma unidade.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex -space-x-3 overflow-hidden p-1">
                    {["1507003211169-0a1dd7228f2d", "1534528741775-53994a69daeb", "1573496359142-b8d87734a5a2", "1500648767791-00dcc994a43e"].map((id, i) => (
                      <img
                        key={i}
                        className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-zinc-900 object-cover"
                        src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=120&q=80`}
                        alt="Corretor"
                      />
                    ))}
                    <button
                      onClick={() => toast.success("Modal de atribuição de corretores aberto!")}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-xs font-semibold text-white ring-2 ring-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:ring-zinc-900 cursor-pointer transition-colors"
                      title="Adicionar corretor"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Avatar Upload Control</CardTitle>
                  <CardDescription>Botão estilizado como avatar para seleção de nova foto de perfil.</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-4">
                  <button
                    onClick={() => toast.info("Seletor de imagem acionado...")}
                    className="h-16 w-16 rounded-full border-2 border-dashed border-zinc-300 hover:border-zinc-900 flex flex-col items-center justify-center text-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:hover:border-zinc-100 dark:hover:text-zinc-100 transition-colors cursor-pointer"
                  >
                    <Plus className="h-5 w-5" />
                    <span className="text-[9px] font-semibold mt-0.5">Upload</span>
                  </button>

                  <button
                    onClick={() => toast.info("Seletor de imagem acionado...")}
                    className="h-12 w-12 rounded-md border-2 border-dashed border-zinc-300 hover:border-zinc-900 flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:hover:border-zinc-100 dark:hover:text-zinc-100 transition-colors cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </CardContent>
              </Card>
            </div>

            {/* 5. Avatar Statuses & Brands / Badges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Status Dots de Presença (Tabler Statuses)</CardTitle>
                  <CardDescription>Indicador dinâmico de atendimento e disponibilidade do corretor.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap items-center gap-6">
                  {/* Online */}
                  <div className="relative">
                    <div className="h-12 w-12 rounded-full overflow-hidden bg-zinc-200 ring-2 ring-zinc-200">
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" alt="Online" className="h-full w-full object-cover" />
                    </div>
                    <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900" title="Online" />
                  </div>

                  {/* Ocupado / Em Atendimento */}
                  <div className="relative">
                    <div className="h-12 w-12 rounded-full overflow-hidden bg-zinc-200 ring-2 ring-zinc-200">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" alt="Em Atendimento" className="h-full w-full object-cover" />
                    </div>
                    <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-rose-500 ring-2 ring-white dark:ring-zinc-900" title="Em Atendimento" />
                  </div>

                  {/* Ausente / Em Vistoria */}
                  <div className="relative">
                    <div className="h-12 w-12 rounded-full overflow-hidden bg-zinc-200 ring-2 ring-zinc-200">
                      <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80" alt="Em Vistoria" className="h-full w-full object-cover" />
                    </div>
                    <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-amber-400 ring-2 ring-white dark:ring-zinc-900" title="Em Vistoria" />
                  </div>

                  {/* Offline */}
                  <div className="relative">
                    <div className="h-12 w-12 rounded-full overflow-hidden bg-zinc-200 ring-2 ring-zinc-200">
                      <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80" alt="Offline" className="h-full w-full object-cover" />
                    </div>
                    <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-zinc-400 ring-2 ring-white dark:ring-zinc-900" title="Offline" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Avatar Brands & Badges (Canais & Verificação)</CardTitle>
                  <CardDescription>Ícone do canal integrado sobreposto no canto inferior do avatar.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap items-center gap-6">
                  {/* WhatsApp Brand Badge */}
                  <div className="relative">
                    <div className="h-12 w-12 rounded-full overflow-hidden bg-zinc-200 ring-2 ring-zinc-200">
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" alt="WhatsApp" className="h-full w-full object-cover" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-600 text-white flex items-center justify-center ring-2 ring-white dark:ring-zinc-900 shadow-2xs">
                      <MessageCircle className="h-3 w-3" />
                    </div>
                  </div>

                  {/* Verified Check Badge */}
                  <div className="relative">
                    <div className="h-12 w-12 rounded-full overflow-hidden bg-zinc-200 ring-2 ring-zinc-200">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" alt="Verificado" className="h-full w-full object-cover" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-sky-600 text-white flex items-center justify-center ring-2 ring-white dark:ring-zinc-900 shadow-2xs">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </div>
                  </div>

                  {/* RAG Bot Badge */}
                  <div className="relative">
                    <div className="h-12 w-12 rounded-full overflow-hidden bg-zinc-200 ring-2 ring-zinc-200">
                      <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80" alt="IA" className="h-full w-full object-cover" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-purple-600 text-white flex items-center justify-center ring-2 ring-white dark:ring-zinc-900 shadow-2xs">
                      <Bot className="h-3 w-3" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      /* ================= BADGE (TABLER COMPLETO) ================= */
      case "badge":
      case "badges":
        return <TablerBadges />;

      /* ================= BREADCRUMB ================= */
      case "breadcrumb":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Trilhas de Navegação Hierárquica</CardTitle>
              <CardDescription>Localização contextual no catálogo de unidades.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <nav className="flex items-center space-x-2 text-xs text-zinc-500">
                <Link href="/dashboard" className="flex items-center gap-1 hover:text-zinc-900 dark:hover:text-zinc-100">
                  <Home className="h-3.5 w-3.5" /> Início
                </Link>
                <ChevronRight className="h-3 w-3 text-zinc-400" />
                <Link href="/properties" className="hover:text-zinc-900 dark:hover:text-zinc-100">
                  Imóveis
                </Link>
                <ChevronRight className="h-3 w-3 text-zinc-400" />
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  AP-1082 (Itaim Bibi)
                </span>
              </nav>
            </CardContent>
          </Card>
        );

      /* ================= BUTTONS (TABLER COMPLETO) ================= */
      case "buttons":
        return <TablerButtons />;

      /* ================= COLORS (TABLER COMPLETO) ================= */
      case "colors":
        return <TablerColors />;

      /* ================= BUTTONS GROUP ================= */
      case "buttons-group":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Grupos de Botões (Segmented Controls)</CardTitle>
              <CardDescription>Agrupamentos de filtros e visões temporais.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="inline-flex rounded-md shadow-2xs">
                {["VENDA", "LOCACAO", "LANCAMENTOS"].map((item, idx) => (
                  <button
                    key={item}
                    onClick={() => setActivePill(item.toLowerCase())}
                    className={`px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                      idx === 0 ? "rounded-l-md border" : idx === 2 ? "rounded-r-md border border-l-0" : "border-t border-b border-r"
                    } ${
                      activePill === item.toLowerCase()
                        ? "bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100"
                        : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      /* ================= CARDS (TABLER STYLE COMPLETO) ================= */
      case "cards-legacy":
        return (
          <div className="space-y-8">
            {/* Seção 1: Headers & Body Styles */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
                1. Headers & Body Styles (Padrão Tabler)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Standard Card */}
                <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="border-b border-zinc-100 dark:border-zinc-800 pb-2 mb-3">
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Card Padrão</h4>
                  </div>
                  <p className="text-xs text-zinc-500">Conteúdo com cabeçalho simples e linha divisória.</p>
                </div>

                {/* Light Header Card */}
                <div className="rounded-lg border border-zinc-200 bg-white overflow-hidden shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="bg-zinc-50 dark:bg-zinc-800/60 px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-800">
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Header Light Tint</h4>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-zinc-500">Cabeçalho com fundo suave e tom institucional.</p>
                  </div>
                </div>

                {/* Borderless Card */}
                <div className="rounded-lg bg-zinc-100/70 p-4 dark:bg-zinc-800/40">
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Card Borderless</h4>
                  <p className="text-xs text-zinc-500">Sem bordas, utilizando contraste de plano de fundo.</p>
                </div>

                {/* Title with Subtitle */}
                <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    VGV Geral <span className="text-[10px] text-zinc-400 block font-normal">Metas Q3 2026</span>
                  </h4>
                  <p className="text-xs text-zinc-500 mt-2">Card com título e subtítulo combinados.</p>
                </div>
              </div>
            </div>

            {/* Seção 2: Card Status Accents (Top & Side Borders) */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
                2. Status Borders (Card Status Top & Side)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-lg border border-zinc-200 border-t-4 border-t-emerald-500 bg-white p-4 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">Disponível</span>
                  <h5 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 mt-0.5">Status Top Verde</h5>
                  <p className="text-xs text-zinc-500 mt-1">Imóvel liberado para visitação presencial imediata.</p>
                </div>

                <div className="rounded-lg border border-zinc-200 border-t-4 border-t-rose-500 bg-white p-4 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
                  <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wide">Vendido</span>
                  <h5 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 mt-0.5">Status Top Vermelho</h5>
                  <p className="text-xs text-zinc-500 mt-1">Escritura e transferência averbadas em cartório.</p>
                </div>

                <div className="rounded-lg border border-zinc-200 border-t-4 border-t-amber-500 bg-white p-4 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wide">Em Negociação</span>
                  <h5 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 mt-0.5">Status Top Âmbar</h5>
                  <p className="text-xs text-zinc-500 mt-1">Proposta recebida sob análise do proprietário.</p>
                </div>

                <div className="rounded-lg border border-zinc-200 border-l-4 border-l-sky-500 bg-white p-4 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
                  <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wide">Lançamento</span>
                  <h5 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 mt-0.5">Status Start Lateral</h5>
                  <p className="text-xs text-zinc-500 mt-1">Abertura de vendas com tabela promocional.</p>
                </div>
              </div>
            </div>

            {/* Seção 3: Card Stamps & Decorative Accents */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
                3. Card Stamps (Marca d'água com Ícone)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative overflow-hidden rounded-lg border border-zinc-200 bg-white p-5 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="absolute -right-3 -top-3 h-20 w-20 rounded-full bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600/30">
                    <Shield className="h-10 w-10" />
                  </div>
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 relative z-10">
                    Segurança Jurídica
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1 relative z-10 pr-12">
                    Certidões negativas dos 10 cartórios conferidas e auditadas pelo sistema RAG.
                  </p>
                </div>

                <div className="relative overflow-hidden rounded-lg border border-zinc-200 bg-white p-5 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="absolute -right-3 -top-3 h-20 w-20 rounded-full bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center text-amber-600/30">
                    <Star className="h-10 w-10" />
                  </div>
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 relative z-10">
                    Unidade Exclusiva
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1 relative z-10 pr-12">
                    Contrato de exclusividade firmado por 180 dias com comissão integral de 6%.
                  </p>
                </div>

                <div className="relative overflow-hidden rounded-lg border border-zinc-200 bg-white p-5 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="absolute -right-3 -top-3 h-20 w-20 rounded-full bg-sky-50 dark:bg-sky-950/40 flex items-center justify-center text-sky-600/30">
                    <Building2 className="h-10 w-10" />
                  </div>
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 relative z-10">
                    Empreendimento Premium
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1 relative z-10 pr-12">
                    Torre única assinada por arquiteto de renome internacional com vista para o parque.
                  </p>
                </div>
              </div>
            </div>

            {/* Seção 4: Card Actions, Tabs & Progress */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
                4. Card Actions, Tabs & Barra de Progresso Anexada
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Card with Collapsible & Actions */}
                <div className="rounded-lg border border-zinc-200 bg-white shadow-2xs dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden">
                  <div className="flex items-center justify-between p-4 border-b border-zinc-100 dark:border-zinc-800">
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      Card com Ações & Colapso
                    </h4>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setCardCollapsed(!cardCollapsed)}
                        className="h-7 w-7 rounded flex items-center justify-center text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                        title={cardCollapsed ? "Expandir" : "Recolher"}
                      >
                        {cardCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                      </button>
                      <button className="h-7 w-7 rounded flex items-center justify-center text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  {!cardCollapsed && (
                    <div className="p-4 space-y-3">
                      <p className="text-xs text-zinc-500">
                        Este card permite recolhimento dinâmico do conteúdo para otimização de espaço em dashboards densos.
                      </p>
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline">Cancelar</Button>
                        <Button size="sm">Salvar Alterações</Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card with Tabs in Header & Progress Bar */}
                <div className="rounded-lg border border-zinc-200 bg-white shadow-2xs dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden">
                  {/* Top Progress Bar */}
                  <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800">
                    <div className="h-full bg-emerald-500 w-[78%]" />
                  </div>
                  {/* Header with Tabs */}
                  <div className="flex items-center justify-between px-4 pt-3 border-b border-zinc-100 dark:border-zinc-800">
                    <div className="flex space-x-4">
                      {["specs", "financial", "docs"].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setCardHeaderTab(tab)}
                          className={`pb-2.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer border-b-2 -mb-[1px] ${
                            cardHeaderTab === tab
                              ? "border-zinc-900 text-zinc-900 dark:border-zinc-100 dark:text-zinc-100"
                              : "border-transparent text-zinc-400 hover:text-zinc-600"
                          }`}
                        >
                          {tab === "specs" ? "Ficha" : tab === "financial" ? "Financeiro" : "Documentos"}
                        </button>
                      ))}
                    </div>
                    <span className="text-[10px] text-zinc-400 font-mono">78% vendido</span>
                  </div>
                  <div className="p-4 text-xs text-zinc-600 dark:text-zinc-300">
                    {cardHeaderTab === "specs" && (
                      <p>Área privativa: 245 m² | 4 Suítes | 3 Vagas determinadas com ponto elétrico.</p>
                    )}
                    {cardHeaderTab === "financial" && (
                      <p>Valor de Condomínio: R$ 2.450/mês | IPTU Anual: R$ 8.900 | Comissão Imob: 6%.</p>
                    )}
                    {cardHeaderTab === "docs" && (
                      <p>Matrícula do RI nº 142.981 disponível e baixada via sistema RAG.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Seção 5: Card with Flush Table (Tabler Table Card) */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
                5. Card com Tabela Embutida (Flush Table)
              </h3>
              <div className="rounded-lg border border-zinc-200 bg-white shadow-2xs dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden">
                <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      Últimas Propostas Cadastradas
                    </h4>
                    <p className="text-xs text-zinc-400">Atualizado em tempo real pelo canal do WhatsApp.</p>
                  </div>
                  <Button size="sm" variant="outline">Ver Todas</Button>
                </div>
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-50/75 dark:bg-zinc-800/40 text-zinc-500 border-b border-zinc-100 dark:border-zinc-800">
                    <tr>
                      <th className="px-4 py-2.5 font-semibold">Cliente</th>
                      <th className="px-4 py-2.5 font-semibold">Imóvel</th>
                      <th className="px-4 py-2.5 font-semibold">Valor Ofertado</th>
                      <th className="px-4 py-2.5 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                      <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">Juliana Alencar</td>
                      <td className="px-4 py-3 text-zinc-500">AP-1082 (Itaim Bibi)</td>
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">R$ 3.150.000</td>
                      <td className="px-4 py-3">
                        <span className="rounded bg-emerald-50 text-emerald-700 px-2 py-0.5 text-[10px] font-semibold">Aceita</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                      <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">Marcelo Prado</td>
                      <td className="px-4 py-3 text-zinc-500">COB-304 (Vila Nova)</td>
                      <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">R$ 5.800.000</td>
                      <td className="px-4 py-3">
                        <span className="rounded bg-amber-50 text-amber-700 px-2 py-0.5 text-[10px] font-semibold">Em Análise</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Seção 6: Hover & Motion Link Cards */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
                6. Link Hover Effects (Pop & Rotate)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a
                  href="#cards"
                  className="rounded-lg border border-zinc-200 bg-white p-4 shadow-2xs hover:-translate-y-1 hover:shadow-md transition-all duration-200 dark:border-zinc-800 dark:bg-zinc-900 block"
                >
                  <h5 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Efeito Pop (Elevação)</h5>
                  <p className="text-xs text-zinc-500 mt-1">Sobe suavemente ao passar o mouse com sombra refinada.</p>
                </a>

                <a
                  href="#cards"
                  className="rounded-lg border border-zinc-200 bg-white p-4 shadow-2xs hover:rotate-1 hover:shadow-md transition-all duration-200 dark:border-zinc-800 dark:bg-zinc-900 block"
                >
                  <h5 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Efeito Rotate (Inclinação)</h5>
                  <p className="text-xs text-zinc-500 mt-1">Inclinação sutil com sensação tátil contemporânea.</p>
                </a>

                <div className="relative rounded-lg overflow-hidden border border-zinc-200 shadow-2xs dark:border-zinc-800">
                  <div className="absolute top-2 right-2 z-10 rounded bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white uppercase">
                    Exclusivo
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
                    alt="Card Cover"
                    className="h-28 w-full object-cover"
                  />
                  <div className="p-3 bg-white dark:bg-zinc-900">
                    <h5 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Card com Imagem & Ribbon</h5>
                    <p className="text-xs text-zinc-500 mt-0.5">Selo no canto superior sobreposto à fotografia.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      /* ================= ACCORDION (NOVO TABLER) ================= */
      case "accordion":
        const accordionItems = [
          {
            q: "Como funciona a ingestão e leitura de contratos pelo RAG?",
            a: "Os documentos armazenados na pasta vinculada do Google Drive são divididos em chunks de texto, convertidos em embeddings vetoriais com pgvector e indexados para respostas instantâneas no laboratório e no bot de WhatsApp.",
          },
          {
            q: "Quais são os prazos médios de aprovação jurídica de um imóvel?",
            a: "Com a validação automatizada de certidões, o prazo cai de 5 dias úteis para menos de 4 horas, restando apenas a conferência final humana.",
          },
          {
            q: "Como o split de comissão entre corretores é calculado?",
            a: "O sistema divide automaticamente os percentuais pactuados entre o corretor captador (30%), o corretor vendedor (50%) e a imobiliária (20%) assim que o contrato é assinado.",
          },
        ];

        return (
          <Card>
            <CardHeader>
              <CardTitle>Accordion Interativo (Perguntas Frequentes & Detalhes)</CardTitle>
              <CardDescription>Expansão suave com chevron animado e foco acessível.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {accordionItems.map((item, index) => {
                const isOpen = openAccordion === index;
                return (
                  <div
                    key={index}
                    className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenAccordion(isOpen ? null : index)}
                      className="flex w-full items-center justify-between p-4 text-left text-sm font-semibold text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 cursor-pointer transition-colors"
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-zinc-400 transition-transform duration-200 shrink-0 ml-2 ${
                          isOpen ? "rotate-180 text-zinc-900 dark:text-zinc-100" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-zinc-100 dark:border-zinc-800 pt-3">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        );

      /* ================= DATA GRID (TABLER COMPLETO) ================= */
      case "datagrid":
        return <TablerDatagrid />;

      /* ================= STEPS (NOVO TABLER) ================= */
      case "steps":
        const steps = [
          { num: 1, title: "Proposta", desc: "Enviada via WhatsApp", status: "completed" },
          { num: 2, title: "Análise de Crédito", desc: "Aprovada pelo banco", status: "completed" },
          { num: 3, title: "Minuta Contratual", desc: "Em revisão jurídica", status: "active" },
          { num: 4, title: "Assinatura Digital", desc: "Pendente token", status: "pending" },
          { num: 5, title: "Entrega de Chaves", desc: "Agendamento de vistoria", status: "pending" },
        ];

        return (
          <Card>
            <CardHeader>
              <CardTitle>Steps (Jornada de Fechamento de Venda)</CardTitle>
              <CardDescription>Progresso visual sequencial com ícones e status de cada etapa.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {steps.map((s, idx) => (
                  <div key={s.num} className="relative flex flex-col items-center text-center p-3 rounded-lg border border-zinc-100 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-800/20">
                    <div
                      className={`h-9 w-9 rounded-full flex items-center justify-center font-bold text-xs mb-2 ${
                        s.status === "completed"
                          ? "bg-emerald-600 text-white"
                          : s.status === "active"
                          ? "bg-zinc-900 text-white ring-4 ring-zinc-200 dark:bg-zinc-100 dark:text-zinc-900 dark:ring-zinc-700"
                          : "bg-zinc-200 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                      }`}
                    >
                      {s.status === "completed" ? <Check className="h-4 w-4" /> : s.num}
                    </div>
                    <h5 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">{s.title}</h5>
                    <p className="text-[10px] text-zinc-400 mt-0.5">{s.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      /* ================= STARS RATING (NOVO TABLER) ================= */
      case "stars-rating":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Classificação por Estrelas Interativa</CardTitle>
                <CardDescription>Passe o mouse e clique para registrar a pontuação de atendimento do corretor.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => {
                          setUserRating(star);
                          toast.success(`Avaliação registrada: ${star} estrelas!`);
                        }}
                        onMouseEnter={() => setRatingHover(star)}
                        onMouseLeave={() => setRatingHover(0)}
                        className="p-1 cursor-pointer transition-transform hover:scale-110"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            (ratingHover || userRating) >= star
                              ? "fill-amber-400 text-amber-400"
                              : "text-zinc-300 dark:text-zinc-600"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    {userRating}.0 de 5.0
                  </span>
                  <span className="text-xs text-zinc-400">(48 avaliações de compradores)</span>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      /* ================= SEGMENTED CONTROL (NOVO TABLER) ================= */
      case "segmented-control":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Controle Segmentado (Pílulas Deslizantes)</CardTitle>
              <CardDescription>Seletor em estilo iOS/Tabler para alternância rápida de filtros.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="inline-flex rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800">
                {["Hoje", "Esta Semana", "Este Mês", "Ano 2026"].map((period) => (
                  <button
                    key={period}
                    onClick={() => setActiveTab(period)}
                    className={`rounded-md px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === period
                        ? "bg-white text-zinc-900 shadow-2xs dark:bg-zinc-900 dark:text-zinc-100"
                        : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      /* ================= OFFCANVAS (NOVO TABLER) ================= */
      case "offcanvas":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Offcanvas (Painel Lateral Gaveta)</CardTitle>
              <CardDescription>Gaveta deslizante lateral para filtros complexos ou detalhes rápidos sem perder o contexto.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setOffcanvasOpen(true)}>
                <SlidersHorizontal className="h-4 w-4" /> Abrir Painel Lateral Offcanvas
              </Button>

              <Sheet
                open={offcanvasOpen}
                onOpenChange={setOffcanvasOpen}
                title="Filtros Avançados de Imóveis"
                description="Selecione as faixas de valor e atributos arquitetônicos desejados."
              >
                <div className="space-y-4 py-2">
                  <div>
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                      Faixa de Valor de Venda
                    </label>
                    <select className="w-full rounded-md border border-zinc-200 bg-white p-2 text-xs dark:border-zinc-800 dark:bg-zinc-900">
                      <option>R$ 1.000.000 a R$ 2.500.000</option>
                      <option>R$ 2.500.000 a R$ 5.000.000</option>
                      <option>Acima de R$ 5.000.000</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                      Bairro de Interesse
                    </label>
                    <Input placeholder="Ex: Itaim Bibi, Jardins, Vila Nova Conceição" />
                  </div>
                  <div className="pt-4 flex gap-2">
                    <Button className="w-full" onClick={() => setOffcanvasOpen(false)}>
                      Aplicar Filtros
                    </Button>
                    <Button variant="outline" onClick={() => setOffcanvasOpen(false)}>
                      Limpar
                    </Button>
                  </div>
                </div>
              </Sheet>
            </CardContent>
          </Card>
        );

      /* ================= CLIPBOARD (NOVO TABLER) ================= */
      case "clipboard":
        const sampleUrl = "https://imob-platform.com.br/proposta/token-8921-itaim";
        const sampleApiKey = "rag_live_pk_992140a872bfb1928374";

        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Clipboard & Copiar com Feedback</CardTitle>
                <CardDescription>Cópia instantânea com retorno visual e mensagem de confirmação.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-zinc-500 block mb-1">Link Público da Proposta</label>
                  <div className="flex gap-2">
                    <Input value={sampleUrl} readOnly className="font-mono text-xs bg-zinc-50 dark:bg-zinc-800/40" />
                    <Button
                      variant="outline"
                      onClick={() => handleCopy(sampleUrl, "url")}
                      className="shrink-0"
                    >
                      {copiedKey === "url" ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                      {copiedKey === "url" ? "Copiado!" : "Copiar"}
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-zinc-500 block mb-1">Chave de API do Starter RAG</label>
                  <div className="flex gap-2">
                    <Input value={sampleApiKey} readOnly className="font-mono text-xs bg-zinc-50 dark:bg-zinc-800/40" />
                    <Button
                      variant="outline"
                      onClick={() => handleCopy(sampleApiKey, "key")}
                      className="shrink-0"
                    >
                      {copiedKey === "key" ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                      {copiedKey === "key" ? "Copiado!" : "Copiar Token"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      /* ================= SPARKLINES (NOVO TABLER) ================= */
      case "sparkline":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sparklines (Minigráficos Inline de Tendência)</CardTitle>
                <CardDescription>Evolução visual leve de KPIs e métricas sem peso de gráficos pesados.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Sparkline 1 */}
                <div className="p-4 rounded-lg border border-zinc-200 bg-white shadow-2xs dark:border-zinc-800 dark:bg-zinc-900 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-medium text-zinc-400 uppercase">Leads / Semana</span>
                    <h4 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">142</h4>
                    <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-0.5">
                      <TrendingUp className="h-3 w-3" /> +14.2%
                    </span>
                  </div>
                  {/* Inline SVG Sparkline Line */}
                  <svg className="w-24 h-10 text-emerald-500" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M 0,35 Q 20,25 40,30 T 70,15 T 100,5" />
                  </svg>
                </div>

                {/* Sparkline 2 */}
                <div className="p-4 rounded-lg border border-zinc-200 bg-white shadow-2xs dark:border-zinc-800 dark:bg-zinc-900 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-medium text-zinc-400 uppercase">VGV Contratado</span>
                    <h4 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">R$ 18.4M</h4>
                    <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-0.5">
                      <TrendingUp className="h-3 w-3" /> +8.1%
                    </span>
                  </div>
                  <svg className="w-24 h-10 text-sky-500" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M 0,30 L 25,28 L 50,18 L 75,22 L 100,8" />
                  </svg>
                </div>

                {/* Sparkline 3 (Bars) */}
                <div className="p-4 rounded-lg border border-zinc-200 bg-white shadow-2xs dark:border-zinc-800 dark:bg-zinc-900 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-medium text-zinc-400 uppercase">Tempo de Resposta</span>
                    <h4 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">1.8s</h4>
                    <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-0.5">
                      RAG OpenAI Mini
                    </span>
                  </div>
                  <div className="flex items-end gap-1 h-8">
                    {[12, 18, 14, 22, 19, 28, 24, 30].map((h, i) => (
                      <div key={i} style={{ height: `${h}px` }} className="w-2 rounded-xs bg-emerald-500/80" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      /* ================= TRACKING (NOVO TABLER) ================= */
      case "tracking":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Tracking (Disponibilidade & Uptime no Tempo)</CardTitle>
              <CardDescription>Barra de monitoramento operacional das instâncias de WhatsApp e RAG (estilo GitHub/Tabler).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  Instância WhatsApp (Evolution API)
                </span>
                <span className="font-mono text-emerald-600 font-semibold">99.96% Uptime</span>
              </div>

              {/* Barra de 40 blocos diários */}
              <div className="flex gap-1 overflow-x-auto py-1">
                {Array.from({ length: 45 }).map((_, i) => (
                  <div
                    key={i}
                    title={`Dia ${45 - i} atrás: Operacional`}
                    className={`h-7 w-2 rounded-xs shrink-0 transition-opacity hover:opacity-80 cursor-pointer ${
                      i === 18 ? "bg-amber-400" : i === 34 ? "bg-emerald-400" : "bg-emerald-500"
                    }`}
                  />
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-zinc-400 font-medium">
                <span>45 dias atrás</span>
                <span>Hoje (100% operacional)</span>
              </div>
            </CardContent>
          </Card>
        );

      /* ================= PASSWORD STRENGTH (NOVO TABLER) ================= */
      case "password-strength":
        const hasMinLen = passwordInput.length >= 8;
        const hasUpper = /[A-Z]/.test(passwordInput);
        const hasNumber = /[0-9]/.test(passwordInput);
        const hasSpecial = /[^A-Za-z0-9]/.test(passwordInput);
        const score = [hasMinLen, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;

        return (
          <Card>
            <CardHeader>
              <CardTitle>Medidor de Força de Senha</CardTitle>
              <CardDescription>Validação visual e checklist interativo para cadastro de corretores.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 max-w-md">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Digite a nova senha..."
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Barra de Progresso de Força */}
              <div className="space-y-1.5">
                <div className="flex gap-1.5 h-1.5">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={`h-full flex-1 rounded-full transition-colors ${
                        score >= step
                          ? score === 1
                            ? "bg-rose-500"
                            : score === 2
                            ? "bg-amber-500"
                            : score === 3
                            ? "bg-sky-500"
                            : "bg-emerald-500"
                          : "bg-zinc-100 dark:bg-zinc-800"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[11px] font-semibold text-zinc-500">
                  <span>Força da Senha:</span>
                  <span className={score === 4 ? "text-emerald-600" : "text-zinc-700 dark:text-zinc-300"}>
                    {score === 1 ? "Fraca" : score === 2 ? "Razoável" : score === 3 ? "Boa" : "Excelente (Imbatível)"}
                  </span>
                </div>
              </div>

              {/* Checklist */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className={`flex items-center gap-1.5 ${hasMinLen ? "text-emerald-600" : "text-zinc-400"}`}>
                  <Check className="h-3.5 w-3.5" /> 8+ caracteres
                </div>
                <div className={`flex items-center gap-1.5 ${hasUpper ? "text-emerald-600" : "text-zinc-400"}`}>
                  <Check className="h-3.5 w-3.5" /> Letra maiúscula
                </div>
                <div className={`flex items-center gap-1.5 ${hasNumber ? "text-emerald-600" : "text-zinc-400"}`}>
                  <Check className="h-3.5 w-3.5" /> Número
                </div>
                <div className={`flex items-center gap-1.5 ${hasSpecial ? "text-emerald-600" : "text-zinc-400"}`}>
                  <Check className="h-3.5 w-3.5" /> Caractere especial
                </div>
              </div>
            </CardContent>
          </Card>
        );

      /* ================= NUMBER INPUT (NOVO TABLER) ================= */
      case "number-input":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Number Input (Controle de Passo / Stepper)</CardTitle>
              <CardDescription>Controles numéricos ergonômicos com botões de incremento e limites de segurança.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg">
              {/* Stepper Quartos */}
              <div>
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1.5">
                  Número de Dormitórios
                </label>
                <div className="flex items-center border border-zinc-200 rounded-md bg-white dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden w-36">
                  <button
                    onClick={() => setStepperQuartos((v) => Math.max(1, v - 1))}
                    className="h-9 w-9 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 cursor-pointer"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="flex-1 text-center text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    {stepperQuartos}
                  </span>
                  <button
                    onClick={() => setStepperQuartos((v) => Math.min(10, v + 1))}
                    className="h-9 w-9 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Stepper Vagas */}
              <div>
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1.5">
                  Vagas de Garagem
                </label>
                <div className="flex items-center border border-zinc-200 rounded-md bg-white dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden w-36">
                  <button
                    onClick={() => setStepperVagas((v) => Math.max(0, v - 1))}
                    className="h-9 w-9 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 cursor-pointer"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="flex-1 text-center text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    {stepperVagas}
                  </span>
                  <button
                    onClick={() => setStepperVagas((v) => Math.min(8, v + 1))}
                    className="h-9 w-9 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      /* ================= SWITCH ICONS (NOVO TABLER) ================= */
      case "switch-icons":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Switch Icons (Interruptores com Ícone Embutido)</CardTitle>
              <CardDescription>Toggles liga/desliga com feedback visual claro de estado ativo.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg border border-zinc-100 dark:border-zinc-800">
                <div>
                  <h5 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    Notificações de Propostas no WhatsApp
                  </h5>
                  <p className="text-[11px] text-zinc-400">Receba alerta imediato quando um cliente enviar proposta.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSwitchState1(!switchState1)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                    switchState1 ? "bg-emerald-600" : "bg-zinc-200 dark:bg-zinc-700"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out flex items-center justify-center text-[10px] ${
                      switchState1 ? "translate-x-5 text-emerald-600" : "translate-x-0 text-zinc-400"
                    }`}
                  >
                    {switchState1 ? <Check className="h-3 w-3 stroke-[3]" /> : <X className="h-3 w-3" />}
                  </span>
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-zinc-100 dark:border-zinc-800">
                <div>
                  <h5 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    Auto-sincronização do Google Drive (RAG)
                  </h5>
                  <p className="text-[11px] text-zinc-400">Indexação contínua a cada alteração de arquivo.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSwitchState2(!switchState2)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                    switchState2 ? "bg-emerald-600" : "bg-zinc-200 dark:bg-zinc-700"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out flex items-center justify-center text-[10px] ${
                      switchState2 ? "translate-x-5 text-emerald-600" : "translate-x-0 text-zinc-400"
                    }`}
                  >
                    {switchState2 ? <Check className="h-3 w-3 stroke-[3]" /> : <X className="h-3 w-3" />}
                  </span>
                </button>
              </div>
            </CardContent>
          </Card>
        );

      /* ================= TAGS (NOVO TABLER) ================= */
      case "tags":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tags Removíveis & Etiquetas Imobiliárias</CardTitle>
                <CardDescription>Para classificação de comodidades, bairros e atributos arquitetônicos.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {tagsList.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  {tagsList.length === 0 && (
                    <Button size="sm" variant="outline" onClick={() => setTagsList(["Cobertura", "Frente Mar", "Piscina"])}>
                      Restaurar Tags de Demonstração
                    </Button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                  <span className="rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 px-2.5 py-1 text-xs font-semibold">
                    #AltoPadrao
                  </span>
                  <span className="rounded-md bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300 px-2.5 py-1 text-xs font-semibold">
                    #VistaLivre
                  </span>
                  <span className="rounded-md bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 px-2.5 py-1 text-xs font-semibold">
                    #Decorado
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      /* ================= PLACEHOLDER & SHIMMER (NOVO TABLER) ================= */
      case "placeholder":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Placeholder (Skeletons de Carregamento com Shimmer)</CardTitle>
              <CardDescription>Estruturas transitórias para evitar Content Layout Shift (Zero CLS).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="rounded-lg border border-zinc-200 p-4 space-y-3 dark:border-zinc-800 animate-pulse">
                    <div className="aspect-16/10 rounded-md bg-zinc-200 dark:bg-zinc-800" />
                    <div className="h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
                    <div className="h-3 w-1/2 rounded bg-zinc-200 dark:bg-zinc-800" />
                    <div className="pt-2 flex justify-between items-center">
                      <div className="h-5 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
                      <div className="h-7 w-16 rounded bg-zinc-200 dark:bg-zinc-800" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      /* ================= MOCKUP BROWSER (NOVO TABLER) ================= */
      case "mockup-browser":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Mockup Browser (Moldura de Navegador macOS/Tabler)</CardTitle>
              <CardDescription>Apresentação visual para exibir páginas públicas de imóveis ou portal do cliente.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border border-zinc-200 bg-white shadow-md dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden">
                {/* Browser Top Bar */}
                <div className="flex items-center gap-3 px-4 py-3 bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-rose-500" />
                    <span className="h-3 w-3 rounded-full bg-amber-400" />
                    <span className="h-3 w-3 rounded-full bg-emerald-500" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="flex items-center justify-center rounded-md bg-white dark:bg-zinc-900 px-3 py-1 text-xs text-zinc-500 font-mono shadow-2xs border border-zinc-200/60 dark:border-zinc-800">
                      <Lock className="h-3 w-3 text-emerald-600 mr-1.5" />
                      https://imob-platform.com.br/imoveis/itaim-bibi-cobertura
                    </div>
                  </div>
                </div>
                {/* Content Inside Browser */}
                <div className="p-6 bg-zinc-50 dark:bg-zinc-950 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">Lançamento Exclusivo</span>
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Residencial Fasano Itaim</h3>
                      <p className="text-xs text-zinc-500">Rua Pedroso Alvarenga, 1100 - São Paulo, SP</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-zinc-400">A partir de</span>
                      <div className="text-lg font-bold text-zinc-900 dark:text-zinc-100">R$ 4.800.000</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      /* ================= TEXT SHIMMER (NOVO TABLER) ================= */
      case "text-shimmer":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Text Shimmer (Gradiente Animado de Luz)</CardTitle>
              <CardDescription>Destaque elegante para processos de IA em tempo real.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-6 rounded-lg bg-zinc-900 text-center dark:bg-zinc-950">
                <p className="text-lg font-bold tracking-tight bg-linear-to-r from-zinc-400 via-white to-zinc-400 bg-clip-text text-transparent animate-pulse">
                  ✨ Copilot RAG analisando conformidade jurídica do documento...
                </p>
                <p className="text-xs text-zinc-500 mt-2">Processamento de 14 páginas via OpenAI GPT-4o e pgvector</p>
              </div>
            </CardContent>
          </Card>
        );

      /* ================= ICON LISTS (TABLER COMPLETO) ================= */
      case "icon-lists":
        return <TablerIconLists />;

      /* ================= LEGEND (NOVO TABLER) ================= */
      case "legend":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Legend (Legendas para Métricas e Mapas)</CardTitle>
              <CardDescription>Identificadores de categorias com cores e indicadores numéricos.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-6 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/40">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Disponíveis (42)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-amber-500" />
                  <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Propostas em Análise (18)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-500" />
                  <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Vendidos no Mês (9)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-zinc-400" />
                  <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Em Reforma / Vistoria (5)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      /* ================= TABLES (NOVO TABLER) ================= */
      case "tables":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Tables (Tabela Tabler com Ações & Badges)</CardTitle>
              <CardDescription>Tabela responsiva de corretores e métricas com hover sutil.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-50 dark:bg-zinc-800/60 text-zinc-500 font-semibold border-b border-zinc-200 dark:border-zinc-800">
                    <tr>
                      <th className="p-3">Corretor</th>
                      <th className="p-3">E-mail / WhatsApp</th>
                      <th className="p-3">Imóveis Ativos</th>
                      <th className="p-3">VGV Fechado</th>
                      <th className="p-3 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                      <td className="p-3 font-semibold text-zinc-900 dark:text-zinc-100">Lucas Meirelles</td>
                      <td className="p-3 text-zinc-500">lucas@imob.com.br</td>
                      <td className="p-3 font-mono">14 unidades</td>
                      <td className="p-3 font-bold text-emerald-600">R$ 12.8M</td>
                      <td className="p-3 text-right">
                        <Button size="sm" variant="outline">Ver Perfil</Button>
                      </td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                      <td className="p-3 font-semibold text-zinc-900 dark:text-zinc-100">Mariana Fontes</td>
                      <td className="p-3 text-zinc-500">mariana@imob.com.br</td>
                      <td className="p-3 font-mono">9 unidades</td>
                      <td className="p-3 font-bold text-emerald-600">R$ 9.4M</td>
                      <td className="p-3 text-right">
                        <Button size="sm" variant="outline">Ver Perfil</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        );

      /* ================= SOCIAL ICONS (NOVO TABLER) ================= */
      case "social-icons":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Social Icons & Canais de Atendimento</CardTitle>
              <CardDescription>Botões de contato direto para envio de propostas e atendimento.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <button
                onClick={() => toast.success("Iniciando conversa no WhatsApp...")}
                className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 shadow-2xs transition-colors cursor-pointer"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp Oficial
              </button>
              <button className="inline-flex items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-800 shadow-2xs transition-colors cursor-pointer dark:bg-zinc-100 dark:text-zinc-900">
                <Globe className="h-4 w-4" /> Portal Web
              </button>
              <button className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 shadow-2xs transition-colors cursor-pointer dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
                <Mail className="h-4 w-4" /> E-mail Jurídico
              </button>
              <button className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 shadow-2xs transition-colors cursor-pointer dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
                <Phone className="h-4 w-4" /> Central Telefônica
              </button>
            </CardContent>
          </Card>
        );

      /* ================= BLANK PAGE / EMPTY STATE (NOVO TABLER) ================= */
      case "blank-page":
        return (
          <Card className="text-center py-12">
            <CardContent className="max-w-md mx-auto space-y-4">
              <div className="h-16 w-16 mx-auto rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
                <Building2 className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Nenhum Imóvel Encontrado
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Não existem registros com os filtros aplicados. Tente ajustar o valor ou cadastre um novo imóvel para começar.
              </p>
              <div className="pt-2">
                <Button>
                  <Plus className="h-4 w-4" /> Cadastrar Novo Imóvel
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      /* ================= AUTHENTICATION (NOVO TABLER) ================= */
      case "authentication":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Login Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-6 w-6 rounded bg-zinc-900 text-white flex items-center justify-center font-bold text-xs dark:bg-zinc-100 dark:text-zinc-900">
                    IM
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Portal do Corretor</span>
                </div>
                <CardTitle>Entrar na Plataforma</CardTitle>
                <CardDescription>Digite suas credenciais corporativas.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1">E-mail</label>
                  <Input defaultValue="corretor@imobiliaria.com.br" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Senha</label>
                    <a href="#auth" className="text-[11px] text-emerald-600 hover:underline">Esqueceu?</a>
                  </div>
                  <Input type="password" defaultValue="••••••••••••" />
                </div>
                <Button className="w-full mt-2">Acessar Painel</Button>
              </CardContent>
            </Card>

            {/* Lock Screen Card */}
            <Card className="text-center">
              <CardHeader>
                <CardTitle>Tela de Bloqueio (Lock Screen)</CardTitle>
                <CardDescription>Sessão temporariamente pausada por inatividade.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 max-w-xs mx-auto">
                <div className="h-16 w-16 rounded-full overflow-hidden mx-auto ring-2 ring-emerald-500">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" alt="Davis" className="h-full w-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Davis Vasconcellos</h4>
                  <p className="text-xs text-zinc-400">davis@imob.com.br</p>
                </div>
                <Input type="password" placeholder="Digite sua senha para desbloquear" />
                <Button className="w-full">Desbloquear Sessão</Button>
              </CardContent>
            </Card>
          </div>
        );

      /* ================= ERROR PAGES (NOVO TABLER) ================= */
      case "error-pages":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* 404 Preview */}
            <Card className="text-center py-8">
              <CardContent className="space-y-3">
                <div className="text-5xl font-black text-zinc-200 dark:text-zinc-800 font-mono">404</div>
                <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Página Não Encontrada</h4>
                <p className="text-xs text-zinc-500">O imóvel solicitado pode ter sido arquivado ou vendido.</p>
                <Button size="sm" variant="outline">Voltar ao Catálogo</Button>
              </CardContent>
            </Card>

            {/* 500 Preview */}
            <Card className="text-center py-8">
              <CardContent className="space-y-3">
                <div className="text-5xl font-black text-rose-200 dark:text-rose-950/60 font-mono">500</div>
                <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Erro Interno do Servidor</h4>
                <p className="text-xs text-zinc-500">Houve uma instabilidade na consulta vetorial do pgvector.</p>
                <Button size="sm">Tentar Novamente</Button>
              </CardContent>
            </Card>
          </div>
        );

      /* ================= CAROUSEL (TABLER COMPLETO) ================= */
      case "carousel":
        return <TablerCarousel />;

      /* ================= CONFETTI (TABLER COMPLETO) ================= */
      case "confetti":
        return <TablerConfetti />;

      /* ================= DROPDOWNS (TABLER COMPLETO) ================= */
      case "dropdowns":
        return <TablerDropdowns />;

      /* ================= HOVER GALLERY (TABLER COMPLETO) ================= */
      case "hover-gallery":
        return <TablerHoverGallery />;

      /* ================= IMAGES ================= */
      case "images":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Proporções & Enquadramentos de Imóveis</CardTitle>
                <CardDescription>Aspect ratios 16:9, 4:3 e 1:1 com cantos arredondados.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <span className="text-xs text-zinc-400 block mb-1">16:9 (Fachadas)</span>
                  <div className="aspect-16/9 rounded-lg overflow-hidden bg-zinc-100">
                    <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80" alt="16:9" className="h-full w-full object-cover" />
                  </div>
                </div>
                <div>
                  <span className="text-xs text-zinc-400 block mb-1">4:3 (Interiores)</span>
                  <div className="aspect-4/3 rounded-lg overflow-hidden bg-zinc-100">
                    <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80" alt="4:3" className="h-full w-full object-cover" />
                  </div>
                </div>
                <div>
                  <span className="text-xs text-zinc-400 block mb-1">1:1 (Detalhes)</span>
                  <div className="aspect-square rounded-lg overflow-hidden bg-zinc-100">
                    <img src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=600&q=80" alt="1:1" className="h-full w-full object-cover" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      /* ================= LINKS ================= */
      case "links":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Links de Navegação & Ações</CardTitle>
              <CardDescription>Tratamento tipográfico com transição e ícones auxiliares.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-6 items-center text-sm">
                <Link href="/properties" className="text-zinc-900 font-semibold hover:underline dark:text-zinc-100">
                  Link Padrão Sublinhado
                </Link>
                <Link href="/dashboard" className="text-emerald-700 font-semibold hover:text-emerald-800 dark:text-emerald-400 flex items-center gap-1">
                  Link Primário com Seta <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <a href="https://tabler.io" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-zinc-900 flex items-center gap-1 dark:hover:text-zinc-100">
                  Link Externo <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </CardContent>
          </Card>
        );

      /* ================= LIST ================= */
      case "list":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Listas Estruturadas de Atributos</CardTitle>
              <CardDescription>Comodidades de alto padrão com checagem.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                "Piscina de raia aquecida de 25 metros com borda infinita",
                "Gerador full atendendo 100% da área comum e privativa",
                "Isolamento acústico com piso vinílico e vidros duplos laminados",
                "Adega climatizada individual para 120 garrafas",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-800/40 text-xs text-zinc-700 dark:text-zinc-300">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        );

      /* ================= MODALS ================= */
      case "modals":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Janelas Modais (Dialogs Acessíveis)</CardTitle>
              <CardDescription>Caixas de diálogo com foco preso, backdrop escurecido e tecla ESC.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setModalOpen(true)}>
                Abrir Modal de Envio de Proposta
              </Button>

              <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogHeader>
                  <DialogTitle>Formalizar Proposta Imobiliária</DialogTitle>
                  <DialogDescription>
                    Os valores serão validados pelo corretor gestor antes do envio para o proprietário.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 py-2">
                  <div>
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                      Valor Ofertado (R$)
                    </label>
                    <Input defaultValue="R$ 3.850.000,00" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                      Condições de Pagamento
                    </label>
                    <Input defaultValue="40% de entrada + saldo via financiamento bancário" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setModalOpen(false)}>
                    Cancelar
                  </Button>
                  <Button
                    onClick={() => {
                      setModalOpen(false);
                      toast.success("Proposta submetida com sucesso!");
                    }}
                  >
                    Confirmar e Assinar
                  </Button>
                </DialogFooter>
              </Dialog>
            </CardContent>
          </Card>
        );

      /* ================= NOTIFICATIONS ================= */
      case "notifications":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Toasters & Notificações Reativas (Sonner)</CardTitle>
              <CardDescription>Feedback sonoro e visual instantâneo para ações críticas.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button onClick={() => toast.success("Imóvel publicado no portal com sucesso!")}>
                Disparar Sucesso
              </Button>
              <Button variant="outline" onClick={() => toast.warning("Índice de vacância aumentou no setor Sul.")}>
                Disparar Alerta
              </Button>
              <Button variant="destructive" onClick={() => toast.error("Falha ao gerar o contrato em PDF.")}>
                Disparar Erro
              </Button>
            </CardContent>
          </Card>
        );

      /* ================= PAGINATION ================= */
      case "pagination":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Paginação de Registros</CardTitle>
              <CardDescription>Para tabelas densas com muitos imóveis ou leads.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-xs text-zinc-500">Exibindo 11 a 20 de 184 imóveis</span>
              <div className="flex items-center gap-1">
                <Button size="sm" variant="outline" disabled={activePage === 1} onClick={() => setActivePage((p) => p - 1)}>
                  <ChevronLeft className="h-3.5 w-3.5" /> Anterior
                </Button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    onClick={() => setActivePage(page)}
                    className={`h-8 w-8 rounded text-xs font-semibold cursor-pointer transition-colors ${
                      activePage === page
                        ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                        : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <Button size="sm" variant="outline" disabled={activePage === 5} onClick={() => setActivePage((p) => p + 1)}>
                  Próxima <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      /* ================= POPOVERS ================= */
      case "popovers":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Popovers Contextuais</CardTitle>
              <CardDescription>Informações ricas exibidas sob demanda com clique.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative inline-block">
                <Button variant="outline" onClick={() => setPopoverOpen(!popoverOpen)}>
                  Cálculo de Split de Comissão
                </Button>

                {popoverOpen && (
                  <div className="absolute top-full mt-2 left-0 w-72 rounded-lg border border-zinc-200 bg-white p-4 shadow-lg dark:border-zinc-800 dark:bg-zinc-900 z-20">
                    <h5 className="font-semibold text-xs text-zinc-900 dark:text-zinc-100 mb-2">
                      Divisão de Honorários (6%)
                    </h5>
                    <div className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                      <div className="flex justify-between">
                        <span>Corretor Captador (30%):</span>
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">R$ 57.000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Corretor Vendedor (50%):</span>
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">R$ 95.000</span>
                      </div>
                      <div className="flex justify-between border-t border-zinc-100 dark:border-zinc-800 pt-1">
                        <span>Imobiliária (20%):</span>
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">R$ 38.000</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );

      /* ================= PROGRESSBAR ================= */
      case "progressbar":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Barras de Progresso Linear</CardTitle>
              <CardDescription>Para metas de VGV, upload de mídias e etapas de vistoria.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Meta de Vendas do Mês (R$ 25M)</span>
                  <span className="text-emerald-700 dark:text-emerald-400">76%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full w-[76%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Indexação de Vetores RAG</span>
                  <span>42%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  <div className="h-full bg-zinc-900 dark:bg-zinc-100 rounded-full w-[42%]" />
                </div>
              </div>
            </CardContent>
          </Card>
        );

      /* ================= RIBBONS ================= */
      case "ribbons":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative rounded-lg border border-zinc-200 bg-white p-6 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden">
              <div className="absolute top-3 right-3 rounded bg-zinc-900 px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider dark:bg-zinc-100 dark:text-zinc-900">
                Lançamento
              </div>
              <h4 className="font-semibold text-sm">Ribbon Superior Canto</h4>
              <p className="text-xs text-zinc-500 mt-1">Selo minimalista em badge sólida.</p>
            </div>

            <div className="relative rounded-lg border border-zinc-200 bg-white p-6 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden">
              <div className="absolute top-0 right-0 rounded-bl-lg bg-emerald-600 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                Exclusividade
              </div>
              <h4 className="font-semibold text-sm">Ribbon Integrado</h4>
              <p className="text-xs text-zinc-500 mt-1">Conectado na borda superior direita.</p>
            </div>

            <div className="relative rounded-lg border border-zinc-200 bg-white p-6 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden">
              <div className="absolute top-0 left-0 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-br">
                Oportunidade
              </div>
              <h4 className="font-semibold text-sm mt-3">Ribbon Inicial</h4>
              <p className="text-xs text-zinc-500 mt-1">Destaque imediato no topo esquerdo.</p>
            </div>
          </div>
        );

      /* ================= SPINNERS ================= */
      case "spinners":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Indicadores de Carregamento (Spinners)</CardTitle>
              <CardDescription>Para transições assíncronas e uploads de arquivos.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-6">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-900 border-t-transparent dark:border-zinc-100 dark:border-t-transparent" />
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
              <div className="h-8 w-8 animate-spin rounded-full border-3 border-zinc-900 border-t-transparent dark:border-zinc-100 dark:border-t-transparent" />
            </CardContent>
          </Card>
        );

      /* ================= TABS ================= */
      case "tabs":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Abas de Visualização (Tabs)</CardTitle>
              <CardDescription>Alternância de visões sem recarregar a página.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-b border-zinc-200 dark:border-zinc-800 flex gap-6 text-sm font-medium">
                {["tab-1", "tab-2", "tab-3"].map((t, idx) => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className={`pb-2.5 transition-colors cursor-pointer border-b-2 -mb-[1px] ${
                      activeTab === t
                        ? "border-zinc-900 text-zinc-900 font-semibold dark:border-zinc-100 dark:text-zinc-100"
                        : "border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                    }`}
                  >
                    {idx === 0 ? "Visão Geral" : idx === 1 ? "Especificações Técnicas" : "Histórico de Propostas"}
                  </button>
                ))}
              </div>
              <div className="text-xs text-zinc-600 dark:text-zinc-400 p-2">
                {activeTab === "tab-1" && <p>Conteúdo da Visão Geral do Imóvel.</p>}
                {activeTab === "tab-2" && <p>Área útil: 180 m² | 3 Vagas | IPTU: R$ 850/mês.</p>}
                {activeTab === "tab-3" && <p>3 propostas recebidas nos últimos 15 dias.</p>}
              </div>
            </CardContent>
          </Card>
        );

      /* ================= TOOLTIPS ================= */
      case "tooltips":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Tooltips Informativas</CardTitle>
              <CardDescription>Explicações contextuais para termos imobiliários e métricas.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <div className="group relative inline-block">
                <Button variant="outline" size="sm">Passe o mouse aqui</Button>
                <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block rounded bg-zinc-900 px-2.5 py-1 text-[11px] text-white shadow-md dark:bg-zinc-100 dark:text-zinc-900 whitespace-nowrap z-20">
                  VGV = Valor Geral de Vendas acumulado
                </div>
              </div>
            </CardContent>
          </Card>
        );

      /* ================= VIDEOS ================= */
      case "videos":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Card de Vídeo Tour Virtual</CardTitle>
              <CardDescription>Com botão de reprodução, duração e resolução 4K.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-16/9 max-w-2xl rounded-lg overflow-hidden bg-zinc-900 shadow-md group">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                  alt="Tour Virtual"
                  className="h-full w-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  onClick={() => toast.success("Iniciando reprodução do Tour 4K...")}
                  className="absolute inset-0 m-auto h-14 w-14 rounded-full bg-white/90 text-zinc-900 flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer"
                >
                  <Play className="h-6 w-6 ml-0.5 fill-current" />
                </button>
                <div className="absolute top-3 right-3 rounded bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-white">
                  4K ULTRA HD
                </div>
                <div className="absolute bottom-3 left-3 text-white text-xs font-semibold">
                  Tour Virtual Completo • 03:42 min
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return <div>Elemento não encontrado.</div>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header do Componente com Breadcrumb */}
      <div className="flex flex-col gap-2 border-b border-zinc-200 pb-4 dark:border-zinc-800">
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <Link href="/ui-elements" className="hover:text-zinc-900 dark:hover:text-zinc-100">
            UI Elements
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/ui-elements" className="hover:text-zinc-900 dark:hover:text-zinc-100">
            UI Elements
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-semibold text-zinc-900 dark:text-zinc-100 capitalize">
            {slug.replace("-", " ")}
          </span>
        </div>

        {(() => {
          const tablerMeta: Record<string, { title: string; subtitle: string; docsUrl: string }> = {
            alerts: {
              title: "Alerts",
              subtitle: "Alert messages inform users about the status of an action, in success, info, warning, or danger states.",
              docsUrl: "https://docs.tabler.io/ui/components/alert",
            },
            avatars: {
              title: "Avatars",
              subtitle: "Avatars are user profile pictures and icons in multiple styles, sizes, badges, and color variations.",
              docsUrl: "https://docs.tabler.io/ui/components/avatars",
            },
            badge: {
              title: "Badges",
              subtitle: "Badges highlight a count, status, or short label attached to text, buttons, or menu items.",
              docsUrl: "https://docs.tabler.io/ui/components/badges",
            },
            badges: {
              title: "Badges",
              subtitle: "Badges highlight a count, status, or short label attached to text, buttons, or menu items.",
              docsUrl: "https://docs.tabler.io/ui/components/badges",
            },
            buttons: {
              title: "Buttons",
              subtitle: "Buttons are used to trigger actions in a user interface.",
              docsUrl: "https://docs.tabler.io/ui/components/buttons",
            },
            carousel: {
              title: "Carousel",
              subtitle: "A carousel cycles through a set of slides, with optional indicators and controls.",
              docsUrl: "https://docs.tabler.io/ui/components/carousel",
            },
            colors: {
              title: "Colors",
              subtitle: "The full color palette, with hex values, and a gradient builder.",
              docsUrl: "https://docs.tabler.io/ui/base/colors",
            },
            cards: {
              title: "Cards",
              subtitle: "Cards are flexible containers used to display content, media, status indicators, and actions on a single subject.",
              docsUrl: "https://preview.tabler.io/cards.html",
            },
            "card-gradients": {
              title: "Card Gradients",
              subtitle: "Cards with rich gradient backgrounds and lateral accent borders across 16 thematic styles.",
              docsUrl: "https://preview.tabler.io/card-gradients.html",
            },
            widgets: {
              title: "Widgets",
              subtitle: "All 21 official Tabler widgets: metric counters, circular gauges, team cards, code blocks, and configuration panels.",
              docsUrl: "https://preview.tabler.io/widgets.html",
            },
            users: {
              title: "Users",
              subtitle: "Team directory roster with member cards, presence status, roles, real-time search filter, and contact actions.",
              docsUrl: "https://preview.tabler.io/users.html",
            },
            confetti: {
              title: "Confetti",
              subtitle: "Confetti pours a short shower of colored pieces over the page to celebrate a finished task, a signup or a first success.",
              docsUrl: "https://docs.tabler.io/ui/plugins/confetti",
            },
            datagrid: {
              title: "Data grid",
              subtitle: "A data grid lays out label/value pairs in a compact, aligned grid.",
              docsUrl: "https://docs.tabler.io/ui/components/datagrid",
            },
            dropdowns: {
              title: "Dropdowns",
              subtitle: "Dropdown menus for actions, filters, and selections, always shown open here for reference.",
              docsUrl: "https://docs.tabler.io/ui/components/dropdown",
            },
            "hover-gallery": {
              title: "Hover gallery",
              subtitle: "Hover galleries show one image and switch to the next ones as the pointer moves across.",
              docsUrl: "https://docs.tabler.io/ui/components/hover-gallery",
            },
            "icon-lists": {
              title: "Icon lists",
              subtitle: "Icon lists replace the bullets of a list with icons, such as a checklist of features.",
              docsUrl: "https://docs.tabler.io/ui/components/icon-lists",
            },
            "image-labels": {
              title: "Image labels",
              subtitle: "Image labels pin a short text or an icon to a corner of an image.",
              docsUrl: "https://docs.tabler.io/ui/components/image-labels",
            },
            legend: {
              title: "Legend",
              subtitle: "Legends label the series of a chart or a progress bar with a colored marker, a name and an optional value.",
              docsUrl: "https://docs.tabler.io/ui/components/legend",
            },
            lists: {
              title: "Lists",
              subtitle: "Vertical lists built from list-group items: media, content, meta and actions in one row.",
              docsUrl: "https://docs.tabler.io/ui/components/lists",
            },
            list: {
              title: "Lists",
              subtitle: "Vertical lists built from list-group items: media, content, meta and actions in one row.",
              docsUrl: "https://docs.tabler.io/ui/components/lists",
            },
            modals: {
              title: "Modals",
              subtitle: "Modals interrupt the page to ask for input, confirmation, or a focused action.",
              docsUrl: "https://docs.tabler.io/ui/components/modals",
            },
            navigation: {
              title: "Navigation",
              subtitle: "Navbar variants — condensed, dark, colored, and with different logo and search layouts.",
              docsUrl: "https://docs.tabler.io/ui/components/navigation",
            },
            "nav-overflow": {
              title: "Nav overflow",
              subtitle: "Nav overflow moves nav items that do not fit into a More dropdown.",
              docsUrl: "https://docs.tabler.io/ui/components/nav-overflow",
            },
            offcanvas: {
              title: "Offcanvas",
              subtitle: "An offcanvas panel slides in from an edge of the screen for navigation or supplementary content.",
              docsUrl: "https://docs.tabler.io/ui/components/offcanvas",
            },
            progress: {
              title: "Progress bar",
              subtitle: "Progress bars indicate the completion percentage of a task, process, or metric.",
              docsUrl: "https://docs.tabler.io/ui/components/progress",
            },
            progressbar: {
              title: "Progress bar",
              subtitle: "Progress bars indicate the completion percentage of a task, process, or metric.",
              docsUrl: "https://docs.tabler.io/ui/components/progress",
            },
            "segmented-control": {
              title: "Segmented control",
              subtitle: "A segmented control lets users pick one option from a small, always-visible set.",
              docsUrl: "https://docs.tabler.io/ui/components/segmented-control",
            },
            "scroll-spy": {
              title: "Scroll spy",
              subtitle: "Scroll-spy automatically updates navigation links based on scroll position.",
              docsUrl: "https://docs.tabler.io/ui/components/scroll-spy",
            },
            shape: {
              title: "Shapes",
              subtitle: "Shapes put an icon on a soft, tinted square, for feature lists and value indicators.",
              docsUrl: "https://docs.tabler.io/ui/components/shape",
            },
            signal: {
              title: "Signals",
              subtitle: "Signals show a level, such as priority or strength, as a small row of stepped bars.",
              docsUrl: "https://docs.tabler.io/ui/components/signal",
            },
            "social-icons": {
              title: "Social icons",
              subtitle: "Branded icons and helpers for linking out to, or signing in with, social networks.",
              docsUrl: "https://docs.tabler.io/ui/components/social-icons",
            },
            sparkline: {
              title: "Sparklines",
              subtitle: "Sparklines are tiny inline SVG charts rendered from data attributes.",
              docsUrl: "https://docs.tabler.io/ui/components/sparkline",
            },
            "stars-rating": {
              title: "Stars rating",
              subtitle: "Interactive star ratings for reviews, satisfaction surveys, and property feedback.",
              docsUrl: "https://docs.tabler.io/ui/components/stars-rating",
            },
            steps: {
              title: "Steps",
              subtitle: "Steps show progress through a numbered or labeled sequence, as a horizontal bar or timeline.",
              docsUrl: "https://docs.tabler.io/ui/components/steps",
            },
            "number-input": {
              title: "Number input",
              subtitle: "A number input is a field with a decrease and an increase button for quantities and values.",
              docsUrl: "https://docs.tabler.io/ui/components/number-input",
            },
            tables: {
              title: "Tables",
              subtitle: "Tables organize and present data with formatted values, status badges, and action menus.",
              docsUrl: "https://docs.tabler.io/ui/components/tables",
            },
            tabs: {
              title: "Tabs",
              subtitle: "Tabs switch between related panels of content inside a card or workflow.",
              docsUrl: "https://docs.tabler.io/ui/components/tabs",
            },
            "switch-icons": {
              title: "Switch icons",
              subtitle: "Switch icons animate the change between two icons, for likes, favorites and status toggles.",
              docsUrl: "https://docs.tabler.io/ui/components/switch-icons",
            },
            tags: {
              title: "Tags",
              subtitle: "Tags are compact labels for filters, categories, and keywords.",
              docsUrl: "https://docs.tabler.io/ui/components/tags",
            },
            "text-shimmer": {
              title: "Text shimmer",
              subtitle: "A highlight that sweeps across a label while an AI agent thinks or a task runs.",
              docsUrl: "https://docs.tabler.io/ui/components/text-shimmer",
            },
            toasts: {
              title: "Toasts",
              subtitle: "Toasts show a brief, dismissible notification in the corner of the screen.",
              docsUrl: "https://docs.tabler.io/ui/components/toasts",
            },
            notifications: {
              title: "Toasts & Notifications",
              subtitle: "Toasts show a brief, dismissible notification in the corner of the screen.",
              docsUrl: "https://docs.tabler.io/ui/components/toasts",
            },
            tracking: {
              title: "Tracking",
              subtitle: "Tracking blocks show an uptime or activity history as a row of colored bars.",
              docsUrl: "https://docs.tabler.io/ui/components/tracking",
            },
            typography: {
              title: "Typography",
              subtitle: "Typographic scale, hierarchy, drop caps, blockquotes, code blocks, lists, and prose styling.",
              docsUrl: "https://docs.tabler.io/ui/base/typography",
            },
          };

          const currentMeta = tablerMeta[slug];
          const NEW_SLUGS = [
            "badges",
            "badge",
            "buttons",
            "cards",
            "card-gradients",
            "widgets",
            "users",
            "carousel",
            "colors",
            "confetti",
            "datagrid",
            "dropdowns",
            "hover-gallery",
            "icon-lists",
            "image-labels",
            "legend",
            "lists",
            "list",
            "modals",
            "navigation",
            "nav-overflow",
            "offcanvas",
            "progress",
            "progressbar",
            "segmented-control",
            "scroll-spy",
            "shape",
            "signal",
            "social-icons",
            "sparkline",
            "stars-rating",
            "steps",
            "number-input",
            "tables",
            "tabs",
            "switch-icons",
            "tags",
            "text-shimmer",
            "toasts",
            "notifications",
            "tracking",
            "typography",
          ];
          const isNew = NEW_SLUGS.includes(slug);

          return (
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 capitalize">
                    {currentMeta?.title || slug.replace("-", " ")}
                  </h1>
                  {isNew && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800/80 tracking-wider uppercase">
                      New
                    </span>
                  )}
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                  {currentMeta?.subtitle || "Exemplo interativo com padrões de excelência estética, sem clichês de IA."}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {currentMeta?.docsUrl && (
                  <a
                    href={currentMeta.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 border border-zinc-200 dark:border-zinc-800 rounded px-2.5 py-1 transition-colors"
                  >
                    Docs
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
                <span className="text-xs bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 px-2.5 py-1 rounded font-mono">
                  /ui-elements/{slug}
                </span>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Conteúdo Renderizado */}
      {renderComponentContent()}
    </div>
  );
}
