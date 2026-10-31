import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { UiElementDetailClient } from "./ui-element-detail-client";

export const VALID_COMPONENTS = [
  // Essenciais
  "alerts",
  "avatars",
  "badge",
  "badges",
  "breadcrumb",
  "buttons",
  "buttons-group",
  "colors",
  "links",
  "tags",
  "social-icons",
  "typography",

  // Cards & Estrutura (Tabler)
  "cards",
  "card-gradients",
  "widgets",
  "users",
  "accordion",
  "datagrid",
  "list",
  "lists",
  "icon-lists",
  "tables",
  "mockup-browser",
  "blank-page",
  "shape",
  "signal",

  // Navegação & Fluxo
  "dropdowns",
  "modals",
  "offcanvas",
  "navigation",
  "nav-overflow",
  "scroll-spy",
  "pagination",
  "steps",
  "tabs",

  // Feedback & Métricas
  "notifications",
  "toasts",
  "popovers",
  "progressbar",
  "progress",
  "sparkline",
  "spinners",
  "stars-rating",
  "tooltips",
  "tracking",
  "legend",

  // Formulários & Controles
  "clipboard",
  "number-input",
  "password-strength",
  "segmented-control",
  "switch-icons",

  // Mídia & Efeitos
  "carousel",
  "confetti",
  "hover-gallery",
  "images",
  "image-labels",
  "placeholder",
  "ribbons",
  "text-shimmer",
  "videos",

  // Telas de Sistema
  "authentication",
  "error-pages",
];

export async function generateStaticParams() {
  return VALID_COMPONENTS.map((component) => ({
    component,
  }));
}

interface UiElementPageProps {
  params: Promise<{
    component: string;
  }>;
}

async function UiElementContent({
  params,
}: {
  params: Promise<{ component: string }>;
}) {
  const { component } = await params;

  if (!VALID_COMPONENTS.includes(component)) {
    notFound();
  }

  return <UiElementDetailClient slug={component} />;
}

export default function UiElementDetailPage({ params }: UiElementPageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex h-64 items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-900 border-t-transparent dark:border-zinc-100 dark:border-t-transparent" />
        </div>
      }
    >
      <UiElementContent params={params} />
    </Suspense>
  );
}
