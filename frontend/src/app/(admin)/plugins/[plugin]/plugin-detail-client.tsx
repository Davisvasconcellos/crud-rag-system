"use client";

import React from "react";
import Link from "next/link";
import {
  Puzzle,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Layers,
  ArrowRight,
  Clock,
  Code2,
  Calendar,
  BarChart3,
  MapPin,
  Move,
  Film,
  Maximize2,
  HelpCircle,
  FileText,
  Sliders,
  UploadCloud,
  Table,
} from "lucide-react";
import { TABLER_PLUGINS_ITEMS } from "@/lib/tabler-plugins-data";

import { TablerCharts } from "./tabler-plugins/tabler-charts";
import { TablerChartsAdvanced } from "./tabler-plugins/tabler-charts-advanced";
import { TablerColorpicker } from "./tabler-plugins/tabler-colorpicker";
import { TablerDatepicker } from "./tabler-plugins/tabler-datepicker";
import { TablerDatatables } from "./tabler-plugins/tabler-datatables";
import { TablerDropzone } from "./tabler-plugins/tabler-dropzone";
import { TablerSortable } from "./tabler-plugins/tabler-sortable";
import { TablerFullcalendar } from "./tabler-plugins/tabler-fullcalendar";
import { TablerInlinePlayer } from "./tabler-plugins/tabler-inline-player";
import { TablerLightbox } from "./tabler-plugins/tabler-lightbox";
import { TablerMaps } from "./tabler-plugins/tabler-maps";
import { TablerMapFullsize } from "./tabler-plugins/tabler-map-fullsize";
import { TablerMapBlocks } from "./tabler-plugins/tabler-map-blocks";
import { TablerMapsVector } from "./tabler-plugins/tabler-maps-vector";
import { TablerTour } from "./tabler-plugins/tabler-tour";
import { TablerWysiwyg } from "./tabler-plugins/tabler-wysiwyg";

interface PluginDetailClientProps {
  slug: string;
}

export function PluginDetailClient({ slug }: PluginDetailClientProps) {
  const currentPlugin = TABLER_PLUGINS_ITEMS.find((p) => p.slug === slug);
  const title = currentPlugin?.label || slug.charAt(0).toUpperCase() + slug.slice(1).replace("-", " ");
  const subtitle = currentPlugin?.description || "Extensão oficial do ecossistema Tabler Plugins.";
  const previewUrl = currentPlugin?.previewUrl || `https://preview.tabler.io/${slug}.html`;
  const docsUrl = currentPlugin?.docsUrl || `https://docs.tabler.io/ui/plugins/${slug}`;

  const renderPluginIcon = () => {
    switch (slug) {
      case "charts":
      case "charts-advanced":
        return <BarChart3 className="w-7 h-7" />;
      case "datepicker":
      case "fullcalendar":
        return <Calendar className="w-7 h-7" />;
      case "colorpicker":
        return <Sliders className="w-7 h-7" />;
      case "dropzone":
        return <UploadCloud className="w-7 h-7" />;
      case "datatables":
        return <Table className="w-7 h-7" />;
      case "sortable":
        return <Move className="w-7 h-7" />;
      case "inline-player":
        return <Film className="w-7 h-7" />;
      case "lightbox":
        return <Maximize2 className="w-7 h-7" />;
      case "maps":
      case "map-fullsize":
      case "map-blocks":
      case "maps-vector":
        return <MapPin className="w-7 h-7" />;
      case "tour":
        return <HelpCircle className="w-7 h-7" />;
      case "wysiwyg":
        return <FileText className="w-7 h-7" />;
      default:
        return <Puzzle className="w-7 h-7" />;
    }
  };

  const renderPluginContent = () => {
    switch (slug) {
      case "charts":
        return <TablerCharts />;
      case "charts-advanced":
        return <TablerChartsAdvanced />;
      case "colorpicker":
        return <TablerColorpicker />;
      case "datepicker":
        return <TablerDatepicker />;
      case "datatables":
        return <TablerDatatables />;
      case "dropzone":
        return <TablerDropzone />;
      case "sortable":
        return <TablerSortable />;
      case "fullcalendar":
        return <TablerFullcalendar />;
      case "inline-player":
        return <TablerInlinePlayer />;
      case "lightbox":
        return <TablerLightbox />;
      case "maps":
        return <TablerMaps />;
      case "map-fullsize":
        return <TablerMapFullsize />;
      case "map-blocks":
        return <TablerMapBlocks />;
      case "maps-vector":
        return <TablerMapsVector />;
      case "tour":
        return <TablerTour />;
      case "wysiwyg":
        return <TablerWysiwyg />;
      default:
        return (
          <div className="bg-card border border-border/80 rounded-2xl p-10 text-center space-y-4 shadow-xs">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 flex items-center justify-center shadow-xs">
              {renderPluginIcon()}
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-1">
                <h2 className="text-xl font-bold text-foreground">
                  {title}
                </h2>
                {currentPlugin?.isNew && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                    New
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1 max-w-lg mx-auto">
                {subtitle}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors shadow-xs"
              >
                Abrir Preview Oficial do Tabler
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg border border-border hover:bg-muted text-foreground transition-colors"
              >
                Documentação do Plugin
                <Code2 className="w-3.5 h-3.5 text-muted-foreground" />
              </a>
            </div>

            <div className="bg-muted/40 border border-border/60 rounded-xl p-4 max-w-md mx-auto text-left text-xs text-muted-foreground mt-4">
              <div className="flex items-center gap-2 font-semibold text-foreground mb-1">
                <Sparkles className="w-4 h-4 text-purple-600" />
                Estrutura Pronta para Replicação
              </div>
              O arquivo HTML oficial já está baixado localmente em:
              <code className="block mt-1 p-2 rounded bg-background border border-border text-purple-600 dark:text-purple-400 font-mono text-[11px] truncate">
                tabler_plugins_html/{slug}.html
              </code>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb Header */}
      <div className="flex flex-col gap-2 border-b border-border/80 pb-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/plugins" className="hover:text-foreground transition-colors">
            Plugins
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-semibold text-foreground">{title}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-1">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {title}
              </h1>
              {currentPlugin?.isNew && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                  New
                </span>
              )}
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
                Tabler Plugin
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
              {subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Preview Oficial <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Conteúdo Dinâmico do Plugin */}
      {renderPluginContent()}
    </div>
  );
}
