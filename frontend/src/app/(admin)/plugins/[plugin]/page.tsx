import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { PluginDetailClient } from "./plugin-detail-client";

export const VALID_PLUGINS = [
  "charts",
  "charts-advanced",
  "colorpicker",
  "datepicker",
  "datatables",
  "dropzone",
  "sortable",
  "fullcalendar",
  "inline-player",
  "lightbox",
  "maps",
  "map-fullsize",
  "map-blocks",
  "maps-vector",
  "tour",
  "wysiwyg",
];

export async function generateStaticParams() {
  return VALID_PLUGINS.map((plugin) => ({
    plugin,
  }));
}

interface PluginPageProps {
  params: Promise<{
    plugin: string;
  }>;
}

async function PluginContent({
  params,
}: {
  params: Promise<{ plugin: string }>;
}) {
  const { plugin } = await params;

  if (!VALID_PLUGINS.includes(plugin)) {
    notFound();
  }

  return <PluginDetailClient slug={plugin} />;
}

export default function PluginDetailPage({ params }: PluginPageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex h-64 items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-900 border-t-transparent dark:border-zinc-100 dark:border-t-transparent" />
        </div>
      }
    >
      <PluginContent params={params} />
    </Suspense>
  );
}
