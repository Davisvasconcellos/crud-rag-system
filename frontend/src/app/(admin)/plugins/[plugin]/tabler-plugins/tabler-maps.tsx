"use client";

import React, { useState } from "react";
import {
  MapPin,
  Navigation,
  Globe,
  Layers,
  ZoomIn,
  ZoomOut,
  Compass,
  Building,
  Users,
  Route as RouteIcon,
  CircleDot,
  ExternalLink,
  Sparkles,
  Move,
  Info,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface CityItem {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  zoom: number;
  users: number;
}

const CITIES: CityItem[] = [
  { id: "berlin", name: "Berlin", country: "Germany", lat: 52.52, lng: 13.405, zoom: 12, users: 820 },
  { id: "london", name: "London", country: "United Kingdom", lat: 51.5072, lng: -0.1276, zoom: 12, users: 1240 },
  { id: "paris", name: "Paris", country: "France", lat: 48.8566, lng: 2.3522, zoom: 12, users: 950 },
  { id: "nyc", name: "New York", country: "United States", lat: 40.7128, lng: -74.006, zoom: 12, users: 1580 },
  { id: "tokyo", name: "Tokyo", country: "Japan", lat: 35.6895, lng: 139.6917, zoom: 12, users: 960 },
  { id: "sp", name: "São Paulo", country: "Brazil", lat: -23.5505, lng: -46.6333, zoom: 12, users: 1120 },
];

export function TablerMaps() {
  const [activeCity, setActiveCity] = useState<CityItem>(CITIES[0]);
  const [draggablePos, setDraggablePos] = useState({ lat: 52.5200, lng: 13.4050 });
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [mapStyle, setMapStyle] = useState<"standard" | "streets" | "satellite">("standard");

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card border border-border/70 rounded-xl p-5 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-foreground">Maps Plugin</h1>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
              Leaflet & MapLibre
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Todas as 12 variantes de mapas do Tabler: marcadores com pulso, rotas, polígonos, clusters, balões de dados, alternador de cidades e pin arrastável com coordenadas dinâmicas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://preview.tabler.io/maps.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-xs"
          >
            Preview Tabler
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Grid of 12 Map Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Simple map */}
        <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border/70">
            <h2 className="text-sm font-bold text-foreground">Simple map</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Standard interactive map with clean vector base layer.
            </p>
          </div>
          <div className="relative h-64 w-full bg-slate-100 dark:bg-slate-900 overflow-hidden">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=13.35,52.49,13.45,52.54&layer=mapnik&marker=52.52,13.405"
              title="Simple map"
              className="w-full h-full border-0 filter contrast-95"
            />
          </div>
        </div>

        {/* Card 2: Street map style */}
        <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border/70">
            <h2 className="text-sm font-bold text-foreground">Street map style</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Detailed urban streets with building contours and road hierarchies.
            </p>
          </div>
          <div className="relative h-64 w-full bg-slate-100 dark:bg-slate-900 overflow-hidden">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=-0.14,51.49,-0.11,51.52&layer=mapnik&marker=51.5072,-0.1276"
              title="Street map"
              className="w-full h-full border-0 filter contrast-105"
            />
          </div>
        </div>

        {/* Card 3: Marker styles */}
        <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border/70">
            <h2 className="text-sm font-bold text-foreground">Marker styles</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Draw markers in HTML: a dot, a circle with an icon, or a live pulsing radar position.
            </p>
          </div>
          <div className="relative h-64 w-full bg-slate-100 dark:bg-slate-900 overflow-hidden flex items-center justify-center">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=2.30,48.84,2.38,48.88&layer=mapnik"
              title="Marker styles map"
              className="w-full h-full border-0 absolute inset-0 opacity-80"
            />
            {/* Custom Overlay Markers */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center gap-8">
              {/* Pulse Marker */}
              <div className="relative flex flex-col items-center">
                <span className="relative flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-rose-600 border-2 border-white shadow-md"></span>
                </span>
                <span className="mt-1 px-1.5 py-0.5 rounded bg-background/90 border border-border text-[10px] font-bold text-foreground shadow-xs">
                  Live GPS
                </span>
              </div>

              {/* Icon Marker */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
                  <Building className="w-4 h-4" />
                </div>
                <span className="mt-1 px-1.5 py-0.5 rounded bg-background/90 border border-border text-[10px] font-bold text-foreground shadow-xs">
                  HQ Office
                </span>
              </div>

              {/* Number Badge Marker */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-lg border-2 border-white">
                  24
                </div>
                <span className="mt-1 px-1.5 py-0.5 rounded bg-background/90 border border-border text-[10px] font-bold text-foreground shadow-xs">
                  Properties
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: Popup card */}
        <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border/70">
            <h2 className="text-sm font-bold text-foreground">Popup card</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Put the popup content in a card template inside the marker for photos and actions.
            </p>
          </div>
          <div className="relative h-64 w-full bg-slate-100 dark:bg-slate-900 overflow-hidden flex items-center justify-center">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=-74.02,40.70,-73.98,40.73&layer=mapnik"
              title="Popup card map"
              className="w-full h-full border-0 absolute inset-0 opacity-70"
            />
            {/* Popup Card */}
            {isPopupOpen && (
              <div className="relative z-10 w-64 bg-card border border-border rounded-xl shadow-xl overflow-hidden p-3 space-y-2 animate-in zoom-in-95">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 dark:bg-blue-950/60 px-1.5 py-0.5 rounded">
                    Featured Store
                  </span>
                  <button
                    onClick={() => setIsPopupOpen(false)}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    ×
                  </button>
                </div>
                <h4 className="text-xs font-bold text-foreground">Tabler Flagship Store</h4>
                <p className="text-[11px] text-muted-foreground">
                  Broadway Ave 124, Manhattan, NY
                </p>
                <div className="flex items-center justify-between pt-1 border-t border-border/50 text-[10px] text-muted-foreground">
                  <span>Aberto até 22:00</span>
                  <span className="text-emerald-600 font-semibold">Avaliação 4.9 ★</span>
                </div>
              </div>
            )}
            {!isPopupOpen && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setIsPopupOpen(true)}
                className="relative z-10 text-xs shadow-md"
              >
                Abrir Popup
              </Button>
            )}
          </div>
        </div>

        {/* Card 5: Route */}
        <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border/70">
            <h2 className="text-sm font-bold text-foreground">Route</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Draw a path with points, and mark its start and destinations.
            </p>
          </div>
          <div className="relative h-64 w-full bg-slate-900 overflow-hidden flex items-center justify-center">
            {/* SVG Path Route Illustration */}
            <svg className="w-full h-full absolute inset-0" viewBox="0 0 400 240">
              <path
                d="M 60 180 Q 150 40 240 120 T 340 60"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="4"
                strokeDasharray="6 4"
                className="animate-pulse"
              />
              <circle cx="60" cy="180" r="8" fill="#10b981" />
              <circle cx="340" cy="60" r="8" fill="#ef4444" />
            </svg>
            <div className="absolute left-10 bottom-10 bg-background/90 backdrop-blur-xs border border-border p-2 rounded-lg text-xs shadow-md">
              <div className="font-bold text-emerald-600">Origem: Central Hub</div>
              <div className="text-[10px] text-muted-foreground">Partida 08:30</div>
            </div>
            <div className="absolute right-10 top-8 bg-background/90 backdrop-blur-xs border border-border p-2 rounded-lg text-xs shadow-md">
              <div className="font-bold text-rose-600">Destino: Terminal Norte</div>
              <div className="text-[10px] text-muted-foreground">Estimativa: 42 min</div>
            </div>
          </div>
        </div>

        {/* Card 6: Area */}
        <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border/70">
            <h2 className="text-sm font-bold text-foreground">Area</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Show a zone, polygon boundary, or GeoJSON delivery perimeter.
            </p>
          </div>
          <div className="relative h-64 w-full bg-slate-900 overflow-hidden flex items-center justify-center">
            <svg className="w-full h-full absolute inset-0" viewBox="0 0 400 240">
              <polygon
                points="100,50 280,40 330,190 140,210"
                fill="rgba(59, 130, 246, 0.25)"
                stroke="#3b82f6"
                strokeWidth="2"
              />
            </svg>
            <div className="relative z-10 px-3 py-1.5 rounded-lg bg-background/90 border border-border text-xs shadow-md text-center">
              <div className="font-bold text-foreground">Zona de Entrega Expressa</div>
              <div className="text-[10px] text-muted-foreground">Área: 48,5 km² • Taxa Grátis</div>
            </div>
          </div>
        </div>

        {/* Card 7: City switcher (Interactive) */}
        <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden flex flex-col md:col-span-2">
          <div className="p-4 border-b border-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-foreground">City switcher</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Put buttons over the map and move smoothly to any metropolitan center with flyTo coordinates.
              </p>
            </div>

            {/* City Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 bg-muted/60 p-1 rounded-lg border border-border/50 text-xs">
              {CITIES.map((city) => (
                <button
                  key={city.id}
                  onClick={() => {
                    setActiveCity(city);
                    toast.info(`Navegando para ${city.name}, ${city.country}`);
                  }}
                  className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                    activeCity.id === city.id
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {city.name}
                </button>
              ))}
            </div>
          </div>

          <div className="relative h-72 w-full bg-slate-900 overflow-hidden flex items-center justify-center">
            <iframe
              key={activeCity.id}
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${activeCity.lng - 0.05},${activeCity.lat - 0.03},${activeCity.lng + 0.05},${activeCity.lat + 0.03}&layer=mapnik&marker=${activeCity.lat},${activeCity.lng}`}
              title={activeCity.name}
              className="w-full h-full border-0 filter contrast-105"
            />
            {/* Floating City Info Box */}
            <div className="absolute bottom-4 left-4 z-10 p-3 rounded-xl bg-background/95 backdrop-blur-md border border-border shadow-lg flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground">
                  {activeCity.name}, {activeCity.country}
                </h4>
                <div className="text-[11px] text-muted-foreground flex items-center gap-3 mt-0.5">
                  <span>Lat: {activeCity.lat.toFixed(4)}°</span>
                  <span>Lng: {activeCity.lng.toFixed(4)}°</span>
                  <span className="text-blue-600 font-semibold">{activeCity.users} usuários</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 8: Bubble map */}
        <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border/70">
            <h2 className="text-sm font-bold text-foreground">Bubble map</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Size circles proportionally by user count or telemetry density.
            </p>
          </div>
          <div className="p-5 space-y-3">
            <div className="space-y-2">
              {CITIES.map((c) => (
                <div key={c.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full bg-blue-500/80 inline-block"
                      style={{
                        transform: `scale(${0.7 + (c.users / 1600) * 0.8})`,
                      }}
                    />
                    <span className="font-semibold text-foreground">{c.name}</span>
                  </div>
                  <span className="font-mono text-muted-foreground">{c.users} active users</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 9: Draggable marker (Interactive) */}
        <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border/70">
            <h2 className="text-sm font-bold text-foreground">Draggable marker</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Move the marker to pick a precision address and retrieve dynamic coordinates.
            </p>
          </div>
          <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-lg border border-border bg-muted/20">
                <span className="text-[10px] text-muted-foreground font-semibold uppercase block">
                  Latitude
                </span>
                <span className="text-sm font-bold font-mono text-foreground">
                  {draggablePos.lat.toFixed(6)}
                </span>
              </div>
              <div className="p-2.5 rounded-lg border border-border bg-muted/20">
                <span className="text-[10px] text-muted-foreground font-semibold uppercase block">
                  Longitude
                </span>
                <span className="text-sm font-bold font-mono text-foreground">
                  {draggablePos.lng.toFixed(6)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  setDraggablePos((p) => ({
                    lat: p.lat + 0.005,
                    lng: p.lng + 0.005,
                  }))
                }
                className="text-xs h-8 flex-1"
              >
                Ajustar (+0.005°)
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setDraggablePos({ lat: 52.52, lng: 13.405 })}
                className="text-xs h-8 flex-1"
              >
                Resetar Centro
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
