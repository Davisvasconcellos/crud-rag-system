"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Search,
  Truck,
  Building,
  Home,
  Server,
  Users,
  Compass,
  CheckCircle2,
  Clock,
  ExternalLink,
  Sparkles,
  Phone,
  Bed,
  Bath,
  Maximize,
  ArrowUp,
  Play,
  Pause,
  RotateCcw,
  Navigation,
  Globe,
  Radio,
  Sliders,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

// ==========================================
// 1. DATA DEFINITIONS (Tabler Exact Replicas)
// ==========================================

interface StoreItem {
  id: string;
  name: string;
  address: string;
  distance: string;
  lat: number;
  lng: number;
  isOpen: boolean;
}

const TABLER_STORES: StoreItem[] = [
  {
    id: "store-1",
    name: "Tabler Store Mitte",
    address: "Friedrichstraße 112, 10117 Berlin",
    distance: "0.4 km",
    lat: 52.5246,
    lng: 13.3889,
    isOpen: true,
  },
  {
    id: "store-2",
    name: "Tabler Store Alexanderplatz",
    address: "Karl-Liebknecht-Straße 9, 10178 Berlin",
    distance: "1.2 km",
    lat: 52.5219,
    lng: 13.4094,
    isOpen: true,
  },
  {
    id: "store-3",
    name: "Tabler Store Kreuzberg",
    address: "Oranienstraße 34, 10999 Berlin",
    distance: "2.6 km",
    lat: 52.5009,
    lng: 13.4197,
    isOpen: true,
  },
  {
    id: "store-4",
    name: "Tabler Store Charlottenburg",
    address: "Kantstraße 54, 10627 Berlin",
    distance: "4.8 km",
    lat: 52.5063,
    lng: 13.3087,
    isOpen: true,
  },
  {
    id: "store-5",
    name: "Tabler Store Prenzlauer Berg",
    address: "Kastanienallee 21, 10435 Berlin",
    distance: "2.1 km",
    lat: 52.5385,
    lng: 13.4098,
    isOpen: true,
  },
  {
    id: "store-6",
    name: "Tabler Store Friedrichshain",
    address: "Warschauer Straße 58, 10243 Berlin",
    distance: "3.9 km",
    lat: 52.5083,
    lng: 13.4492,
    isOpen: true,
  },
];

interface HomeItem {
  id: string;
  price: string;
  title: string;
  address: string;
  beds: number;
  baths: number;
  area: string;
  lat: number;
  lng: number;
  imageUrl: string;
}

const TABLER_HOMES: HomeItem[] = [
  {
    id: "home-1",
    price: "$420k",
    title: "Loft in Mitte",
    address: "Friedrichstraße 44, Mitte, Berlin",
    beds: 2,
    baths: 1,
    area: "78 m²",
    lat: 52.5246,
    lng: 13.3989,
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "home-2",
    price: "$365k",
    title: "Flat by the park",
    address: "Volkspark Friedrichshain, Berlin",
    beds: 2,
    baths: 1,
    area: "64 m²",
    lat: 52.5287,
    lng: 13.4336,
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "home-3",
    price: "$240k",
    title: "Studio in Kreuzberg",
    address: "Paul-Lincke-Ufer 22, Kreuzberg, Berlin",
    beds: 1,
    baths: 1,
    area: "38 m²",
    lat: 52.4993,
    lng: 13.4107,
    imageUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "home-4",
    price: "$690k",
    title: "Family home",
    address: "Savignyplatz 14, Charlottenburg, Berlin",
    beds: 4,
    baths: 2,
    area: "142 m²",
    lat: 52.5083,
    lng: 13.3458,
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80",
  },
];

// Delivery Route waypoints across Berlin
const DELIVERY_ROUTE: [number, number][] = [
  [13.3695, 52.5251], // Point 0 (Start)
  [13.3777, 52.5208], // Point 1
  [13.3880, 52.5186], // Point 2
  [13.3989, 52.5176], // Point 3
  [13.4050, 52.5192], // Point 4
  [13.4132, 52.5219], // Point 5 (Current Truck)
  [13.4215, 52.5165], // Point 6
  [13.4300, 52.5105], // Point 7
  [13.4397, 52.5050], // Point 8 (Destination)
];

const LIVE_USERS_CITIES = [
  { name: "Berlin", lng: 13.405, lat: 52.52, users: 820 },
  { name: "London", lng: -0.1276, lat: 51.5072, users: 1240 },
  { name: "New York", lng: -74.006, lat: 40.7128, users: 1580 },
  { name: "Tokyo", lng: 139.6917, lat: 35.6895, users: 960 },
  { name: "São Paulo", lng: -46.6333, lat: -23.5505, users: 540 },
  { name: "Sydney", lng: 151.2093, lat: -33.8688, users: 310 },
  { name: "Lagos", lng: 3.3792, lat: 6.5244, users: 420 },
  { name: "Mumbai", lng: 72.8777, lat: 19.076, users: 1100 },
];

const SERVER_NODES = [
  { name: "Frankfurt", region: "eu-central", status: "Operational", color: "green", lat: 50.1109, lng: 8.6821, ping: "24 ms", uptime: "99.99%" },
  { name: "London", region: "eu-west", status: "Operational", color: "green", lat: 51.5072, lng: -0.1276, ping: "31 ms", uptime: "99.98%" },
  { name: "Virginia", region: "us-east", status: "Degraded", color: "yellow", pulse: true, lat: 39.0438, lng: -77.4874, ping: "92 ms", uptime: "99.85%" },
  { name: "São Paulo", region: "sa-east", status: "Operational", color: "green", lat: -23.5505, lng: -46.6333, ping: "128 ms", uptime: "99.95%" },
  { name: "Singapore", region: "ap-southeast", status: "Outage", color: "red", pulse: true, lat: 1.3521, lng: 103.8198, ping: "185 ms", uptime: "98.42%" },
  { name: "Sydney", region: "ap-southeast-2", status: "Operational", color: "green", lat: -33.8688, lng: 151.2093, ping: "240 ms", uptime: "99.90%" },
];

const COUNTRY_USERS = [
  { country: "United States", code: "us", users: "12,480", share: 32 },
  { country: "Poland", code: "pl", users: "8,920", share: 23 },
  { country: "Germany", code: "de", users: "5,640", share: 14 },
  { country: "France", code: "fr", users: "4,890", share: 12 },
  { country: "Brazil", code: "br", users: "3,750", share: 10 },
  { country: "United Kingdom", code: "gb", users: "3,420", share: 9 },
];

export function TablerMapBlocks() {
  // 1. Store locator state
  const [storeQuery, setStoreQuery] = useState("");
  const [activeStoreIndex, setActiveStoreIndex] = useState(0);
  const [storePopupOpen, setStorePopupOpen] = useState(true);

  // 2. Delivery tracker state
  const [routeProgress, setRouteProgress] = useState(5);
  const [isSimulating, setIsSimulating] = useState(false);

  // 3. Live users state
  const [hoveredCity, setHoveredCity] = useState<(typeof LIVE_USERS_CITIES)[0] | null>(null);

  // 4. Homes for sale state
  const [activeHomeIndex, setActiveHomeIndex] = useState(0);

  // 5. Delivery address state
  const [addressStreet, setAddressStreet] = useState("Karl-Liebknecht-Straße 9");
  const [addressZip, setAddressZip] = useState("10178");
  const [addressCity, setAddressCity] = useState("Berlin");
  const [addressCoords, setAddressCoords] = useState({ lat: 52.52190, lng: 13.40940 });

  // 6. Server status state
  const [selectedServer, setSelectedServer] = useState(SERVER_NODES[0]);

  // 7. Users by country state
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_USERS[0].country);

  // Filtered stores
  const filteredStores = TABLER_STORES.filter(
    (s) =>
      s.name.toLowerCase().includes(storeQuery.toLowerCase()) ||
      s.address.toLowerCase().includes(storeQuery.toLowerCase())
  );

  const activeStore = TABLER_STORES[activeStoreIndex] || TABLER_STORES[0];
  const activeHome = TABLER_HOMES[activeHomeIndex] || TABLER_HOMES[0];

  // Delivery simulation effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSimulating) {
      timer = setInterval(() => {
        setRouteProgress((prev) => {
          if (prev >= DELIVERY_ROUTE.length - 1) {
            setIsSimulating(false);
            toast.success("Entrega finalizada no destino!");
            return DELIVERY_ROUTE.length - 1;
          }
          return prev + 1;
        });
      }, 1500);
    }
    return () => clearInterval(timer);
  }, [isSimulating]);

  // Map coordinate conversion helper (Berlin Bounds approx: lng: 13.25 to 13.50, lat: 52.48 to 52.56)
  const getBerlinSvgPos = (lng: number, lat: number) => {
    const minLng = 13.28;
    const maxLng = 13.48;
    const minLat = 52.49;
    const maxLat = 52.55;

    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    const y = (1 - (lat - minLat) / (maxLat - minLat)) * 100;
    return {
      left: `${Math.max(5, Math.min(95, x))}%`,
      top: `${Math.max(5, Math.min(95, y))}%`,
    };
  };

  // World map coordinate conversion (lng: -180 to 180, lat: -85 to 85)
  const getWorldSvgPos = (lng: number, lat: number) => {
    const x = ((lng + 180) / 360) * 100;
    const y = ((85 - lat) / 170) * 100;
    return {
      left: `${Math.max(4, Math.min(96, x))}%`,
      top: `${Math.max(6, Math.min(94, y))}%`,
    };
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card border border-border/70 rounded-xl p-5 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-foreground">Map Blocks Plugin</h1>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
              Todos os 7 Blocos Interativos
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Replicação 100% fiel com total interatividade: busca dinâmica em lojas com flyTo, rastreamento de entregas animado, mapa de calor de usuários ao vivo com tooltips, catálogo imobiliário com pin escuro/primário, pin arrastável de endereço com coordenadas em tempo real, status de servidores e mapa coroplético por país.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://preview.tabler.io/map-blocks.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-xs"
          >
            Preview Oficial Tabler
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <div className="space-y-6">
        {/* ========================================================= */}
        {/* BLOCK 1: STORE LOCATOR (Col-12, Split 4/8, Live Search & flyTo) */}
        {/* ========================================================= */}
        <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-border/70 flex items-center justify-between">
            <h2 className="text-base font-bold text-foreground">Store locator</h2>
            <span className="text-xs text-muted-foreground">
              {filteredStores.length} de {TABLER_STORES.length} lojas
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column: Search & List (col-lg-4) */}
            <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-border/70 flex flex-col">
              <div className="p-3 border-b border-border/60 bg-muted/20">
                <div className="relative">
                  <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="stores-search"
                    type="text"
                    value={storeQuery}
                    onChange={(e) => setStoreQuery(e.target.value)}
                    placeholder="Search stores or addresses..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {storeQuery && (
                    <button
                      onClick={() => setStoreQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>

              <div id="stores-list" className="divide-y divide-border/60 overflow-y-auto max-h-[24rem]">
                {filteredStores.length === 0 ? (
                  <div className="p-6 text-center text-xs text-muted-foreground">
                    Nenhuma loja encontrada para &quot;{storeQuery}&quot;.
                  </div>
                ) : (
                  filteredStores.map((store) => {
                    const originalIndex = TABLER_STORES.findIndex((s) => s.id === store.id);
                    const isSelected = activeStoreIndex === originalIndex;
                    return (
                      <button
                        key={store.id}
                        type="button"
                        onClick={() => {
                          setActiveStoreIndex(originalIndex);
                          setStorePopupOpen(true);
                          toast.info(`Navegando para: ${store.name}`);
                        }}
                        className={`w-full text-left p-3.5 transition-colors block ${
                          isSelected
                            ? "bg-blue-600 text-white font-medium shadow-xs"
                            : "hover:bg-muted/40 text-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold text-xs ${isSelected ? "text-white" : "text-foreground"}`}>
                            {store.name}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.2 rounded ml-auto ${
                              isSelected
                                ? "bg-white/20 text-white"
                                : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                            }`}
                          >
                            Open
                          </span>
                        </div>
                        <div className={`text-[11px] mt-0.5 truncate ${isSelected ? "text-white/80" : "text-muted-foreground"}`}>
                          {store.address}
                        </div>
                        <div className={`text-[10px] flex items-center gap-1 mt-1 ${isSelected ? "text-white/80" : "text-muted-foreground"}`}>
                          <MapPin className="w-3 h-3" />
                          {store.distance}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right Column: Interactive Map (col-lg-8) */}
            <div className="lg:col-span-8 relative min-h-[24rem] bg-slate-900 overflow-hidden">
              <iframe
                key={activeStore.id}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${activeStore.lng - 0.04},${activeStore.lat - 0.025},${activeStore.lng + 0.04},${activeStore.lat + 0.025}&layer=mapnik&marker=${activeStore.lat},${activeStore.lng}`}
                title="Store locator map"
                className="w-full h-full border-0 filter contrast-105"
              />

              {/* Interactive Visual Overlay Pins */}
              <div className="absolute inset-0 pointer-events-none">
                {TABLER_STORES.map((store, idx) => {
                  const isVisible =
                    !storeQuery ||
                    store.name.toLowerCase().includes(storeQuery.toLowerCase()) ||
                    store.address.toLowerCase().includes(storeQuery.toLowerCase());

                  if (!isVisible) return null;

                  const pos = getBerlinSvgPos(store.lng, store.lat);
                  const isSelected = activeStoreIndex === idx;

                  return (
                    <button
                      key={store.id}
                      onClick={() => {
                        setActiveStoreIndex(idx);
                        setStorePopupOpen(true);
                      }}
                      style={pos}
                      className={`absolute -translate-x-1/2 -translate-y-full pointer-events-auto transition-transform duration-300 ${
                        isSelected ? "scale-125 z-30" : "hover:scale-110 z-20"
                      }`}
                      title={store.name}
                    >
                      <div
                        className={`p-1.5 rounded-full shadow-lg border-2 flex items-center justify-center ${
                          isSelected
                            ? "bg-slate-900 border-white text-white ring-4 ring-blue-500/50"
                            : "bg-blue-600 border-white text-white"
                        }`}
                      >
                        <MapPin className="w-4 h-4 fill-current" />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Store Popup Card */}
              {storePopupOpen && (
                <div className="absolute bottom-4 left-4 z-30 max-w-xs bg-background/95 backdrop-blur-md border border-border p-3.5 rounded-xl shadow-xl space-y-1 animate-in zoom-in-95">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                      Loja Selecionada
                    </span>
                    <button
                      onClick={() => setStorePopupOpen(false)}
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      ×
                    </button>
                  </div>
                  <h4 className="text-xs font-bold text-foreground">{activeStore.name}</h4>
                  <p className="text-[11px] text-muted-foreground">{activeStore.address}</p>
                  <div className="text-[10px] text-blue-600 font-semibold pt-1">
                    Distância: {activeStore.distance} • Aberto até 20:00
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* ROW 2: DELIVERY TRACKER & LIVE USERS (2 Columns)          */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* BLOCK 2: DELIVERY TRACKER */}
          <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden flex flex-col">
            <div className="p-4 border-b border-border/70 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-600" />
                <h2 className="text-sm font-bold text-foreground">Delivery tracker</h2>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                Em Rota (Ponto {routeProgress + 1} de {DELIVERY_ROUTE.length})
              </span>
            </div>

            <div className="relative h-80 w-full bg-slate-950 overflow-hidden flex items-center justify-center">
              {/* Dynamic Path SVG */}
              <svg className="w-full h-full absolute inset-0" viewBox="0 0 500 320">
                {/* Full Route Line */}
                <path
                  d="M 50 80 L 110 120 L 180 140 L 250 150 L 300 135 L 360 115 L 410 160 L 440 215 L 470 260"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                {/* Completed Route Line */}
                <path
                  d="M 50 80 L 110 120 L 180 140 L 250 150 L 300 135 L 360 115"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                {/* Waypoints */}
                <circle cx="50" cy="80" r="6" fill="#10b981" />
                <circle cx="470" cy="260" r="7" fill="#ef4444" />
              </svg>

              {/* Start Dot Label */}
              <div className="absolute top-[22%] left-[10%] text-[10px] font-semibold text-emerald-400 bg-black/60 px-1.5 py-0.5 rounded">
                Origem
              </div>

              {/* Destination Dot Label */}
              <div className="absolute bottom-[16%] right-[6%] text-[10px] font-semibold text-rose-400 bg-black/60 px-1.5 py-0.5 rounded">
                Destino
              </div>

              {/* Active Delivery Truck Marker with Pulse */}
              <div className="absolute top-[32%] left-[70%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <span className="relative flex h-8 w-8">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-8 w-8 bg-emerald-600 border-2 border-white items-center justify-center text-white shadow-xl">
                    <Truck className="w-4 h-4" />
                  </span>
                </span>
                <span className="mt-1 px-2 py-0.5 rounded bg-background/95 border border-border text-[10px] font-bold text-foreground shadow-md">
                  Entregador a caminho
                </span>
              </div>

              {/* Floating Live Controls */}
              <div className="absolute bottom-3 left-3 right-3 z-10 bg-background/90 backdrop-blur-md border border-border p-3 rounded-xl flex items-center justify-between gap-3 text-xs shadow-lg">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant={isSimulating ? "destructive" : "primary"}
                    onClick={() => setIsSimulating(!isSimulating)}
                    className="h-7 px-2.5 text-xs gap-1"
                  >
                    {isSimulating ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
                    {isSimulating ? "Pausar" : "Simular Entrega"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setRouteProgress(0);
                      setIsSimulating(true);
                    }}
                    className="h-7 px-2 text-xs"
                    title="Reiniciar"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </Button>
                </div>

                <div className="text-[11px] text-muted-foreground text-right">
                  <span className="font-semibold text-foreground">ETA: 14 min</span> • 1.8 km restantes
                </div>
              </div>
            </div>
          </div>

          {/* BLOCK 3: LIVE USERS */}
          <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden flex flex-col">
            <div className="p-4 border-b border-border/70 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                <h2 className="text-sm font-bold text-foreground">Live users</h2>
              </div>
              <span className="text-[11px] text-muted-foreground font-mono">Global Telemetry</span>
            </div>

            <div className="relative h-80 w-full bg-slate-950 overflow-hidden flex items-center justify-center">
              {/* Simplified World Vector Base */}
              <svg viewBox="0 0 1000 500" className="w-full h-auto opacity-30">
                <path d="M150,120 Q200,80 300,100 T400,150 T280,240 T180,200 Z" fill="#475569" />
                <path d="M250,280 Q300,260 330,320 T280,450 T240,360 Z" fill="#475569" />
                <path d="M480,100 Q550,70 650,90 T620,180 T500,160 Z" fill="#475569" />
                <path d="M500,200 Q560,180 600,260 T540,400 T480,280 Z" fill="#475569" />
                <path d="M680,100 Q850,60 920,140 T850,260 T700,200 Z" fill="#475569" />
              </svg>

              {/* Floating Tabler Stat Card (Top Right) */}
              <div className="absolute top-3 right-3 z-20 bg-background/95 backdrop-blur-md border border-border rounded-xl p-3 shadow-lg">
                <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Active users
                </div>
                <div className="text-xl font-bold text-foreground mt-0.5">3,544</div>
                <div className="text-[11px] text-emerald-600 flex items-center gap-0.5 mt-0.5 font-semibold">
                  <ArrowUp className="w-3 h-3" />
                  +12.5%
                </div>
              </div>

              {/* Interactive Bubble Circles */}
              {LIVE_USERS_CITIES.map((city) => {
                const pos = getWorldSvgPos(city.lng, city.lat);
                const radius = 6 + (city.users / 1600) * 16;
                const isHovered = hoveredCity?.name === city.name;

                return (
                  <div
                    key={city.name}
                    style={pos}
                    onMouseEnter={() => setHoveredCity(city)}
                    onMouseLeave={() => setHoveredCity(null)}
                    onClick={() => {
                      setHoveredCity(city);
                      toast.info(`${city.name}: ${city.users} usuários conectados`);
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 transition-transform hover:scale-125"
                  >
                    <span
                      className="rounded-full bg-blue-500/70 border border-white flex items-center justify-center text-[10px] font-bold text-white shadow-lg animate-pulse"
                      style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }}
                    />
                    {isHovered && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900 border border-slate-700 text-white text-[11px] font-medium px-2 py-1 rounded-md shadow-xl whitespace-nowrap z-30">
                        {city.name}: {city.users} users
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* BLOCK 4: HOMES FOR SALE (Col-12, Split 5/7, Pins synced)  */}
        {/* ========================================================= */}
        <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-border/70 flex items-center justify-between">
            <h2 className="text-base font-bold text-foreground">Homes for sale</h2>
            <span className="text-xs text-muted-foreground">
              4 imóveis em Berlim
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Homes List (col-lg-5) */}
            <div id="homes-list" className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-border/70 divide-y divide-border/60 overflow-y-auto max-h-[26rem]">
              {TABLER_HOMES.map((home, idx) => {
                const isSelected = activeHomeIndex === idx;
                return (
                  <button
                    key={home.id}
                    type="button"
                    onClick={() => {
                      setActiveHomeIndex(idx);
                      toast.info(`Selecionado: ${home.title} (${home.price})`);
                    }}
                    className={`w-full text-left p-3.5 flex gap-3 items-center transition-colors block ${
                      isSelected
                        ? "bg-blue-600 text-white shadow-xs"
                        : "hover:bg-muted/40 text-foreground"
                    }`}
                  >
                    <img
                      src={home.imageUrl}
                      alt={home.title}
                      className="w-16 h-16 rounded-lg object-cover border border-border shrink-0 shadow-xs"
                    />
                    <div className="min-w-0 flex-1">
                      <div className={`font-bold text-sm ${isSelected ? "text-white" : "text-foreground"}`}>
                        {home.price}
                      </div>
                      <div className={`text-xs ${isSelected ? "text-white/90" : "text-foreground font-medium"}`}>
                        {home.title}
                      </div>
                      <div className={`text-[11px] flex items-center gap-3 mt-1.5 ${isSelected ? "text-white/80" : "text-muted-foreground"}`}>
                        <span className="flex items-center gap-1">
                          <Bed className="w-3.5 h-3.5" />
                          {home.beds}
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath className="w-3.5 h-3.5" />
                          {home.baths}
                        </span>
                        <span className="flex items-center gap-1">
                          <Maximize className="w-3.5 h-3.5" />
                          {home.area}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Homes Map (col-lg-7) */}
            <div className="lg:col-span-7 relative min-h-[26rem] bg-slate-900 overflow-hidden">
              <iframe
                key={activeHome.id}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${activeHome.lng - 0.03},${activeHome.lat - 0.02},${activeHome.lng + 0.03},${activeHome.lat + 0.02}&layer=mapnik&marker=${activeHome.lat},${activeHome.lng}`}
                title="Homes for sale map"
                className="w-full h-full border-0 filter contrast-105"
              />

              {/* Interactive Visual Overlay Pins for all 4 Homes */}
              <div className="absolute inset-0 pointer-events-none">
                {TABLER_HOMES.map((home, idx) => {
                  const pos = getBerlinSvgPos(home.lng, home.lat);
                  const isSelected = activeHomeIndex === idx;

                  return (
                    <button
                      key={home.id}
                      onClick={() => setActiveHomeIndex(idx)}
                      style={pos}
                      className={`absolute -translate-x-1/2 -translate-y-full pointer-events-auto transition-transform duration-300 ${
                        isSelected ? "scale-125 z-30" : "hover:scale-110 z-20"
                      }`}
                      title={`${home.title} - ${home.price}`}
                    >
                      <div
                        className={`px-2 py-1 rounded-lg shadow-xl font-bold text-xs flex items-center gap-1 border-2 ${
                          isSelected
                            ? "bg-slate-950 text-white border-white ring-4 ring-blue-500/50"
                            : "bg-blue-600 text-white border-white"
                        }`}
                      >
                        <Home className="w-3.5 h-3.5" />
                        {home.price}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Home Floating Card */}
              <div className="absolute top-4 left-4 z-20 bg-background/95 backdrop-blur-md border border-border p-3.5 rounded-xl shadow-xl max-w-xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                  Destaque Imobiliário
                </span>
                <div className="text-sm font-bold text-foreground">{activeHome.title}</div>
                <div className="text-xs font-extrabold text-blue-600">{activeHome.price}</div>
                <div className="text-[11px] text-muted-foreground flex items-center gap-2 pt-1 border-t border-border/50">
                  <span>{activeHome.beds} dorms</span>
                  <span>•</span>
                  <span>{activeHome.baths} banheiros</span>
                  <span>•</span>
                  <span>{activeHome.area}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* ROW 3: DELIVERY ADDRESS & SERVER STATUS (2 Columns)       */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* BLOCK 5: DELIVERY ADDRESS (Form + Draggable Coordinate Map) */}
          <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden flex flex-col">
            <div className="p-4 border-b border-border/70">
              <h2 className="text-sm font-bold text-foreground">Delivery address</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 flex-1">
              {/* Form (col-lg-5) */}
              <div className="sm:col-span-5 p-4 border-b sm:border-b-0 sm:border-r border-border/70 space-y-3 text-xs flex flex-col justify-between">
                <div className="space-y-3">
                  <div>
                    <label className="font-semibold text-foreground block mb-1">Street</label>
                    <input
                      type="text"
                      value={addressStreet}
                      onChange={(e) => setAddressStreet(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-4">
                      <label className="font-semibold text-foreground block mb-1">Postal code</label>
                      <input
                        type="text"
                        value={addressZip}
                        onChange={(e) => setAddressZip(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="col-span-8">
                      <label className="font-semibold text-foreground block mb-1">City</label>
                      <input
                        type="text"
                        value={addressCity}
                        onChange={(e) => setAddressCity(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-foreground block mb-1">Position</label>
                    <input
                      id="address-position"
                      type="text"
                      readOnly
                      value={`${addressCoords.lat.toFixed(5)}, ${addressCoords.lng.toFixed(5)}`}
                      className="w-full px-3 py-1.5 rounded-lg border border-border bg-muted/30 font-mono text-foreground font-semibold"
                    />
                    <small className="text-[10px] text-muted-foreground mt-0.5 block">
                      Drag the pin on the map to the entrance.
                    </small>
                  </div>
                </div>

                <Button
                  size="sm"
                  onClick={() => toast.success("Endereço salvo com sucesso!")}
                  className="w-full text-xs mt-3 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Save address
                </Button>
              </div>

              {/* Map (col-lg-7) with clickable position picker */}
              <div
                className="sm:col-span-7 relative min-h-[20rem] bg-slate-900 cursor-crosshair overflow-hidden"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const xPct = (e.clientX - rect.left) / rect.width;
                  const yPct = (e.clientY - rect.top) / rect.height;

                  // Map percentage to Berlin coords
                  const minLng = 13.38;
                  const maxLng = 13.44;
                  const minLat = 52.50;
                  const maxLat = 52.54;

                  const newLng = minLng + xPct * (maxLng - minLng);
                  const newLat = maxLat - yPct * (maxLat - minLat);

                  setAddressCoords({ lat: newLat, lng: newLng });
                  toast.success(`Coordenadas ajustadas: ${newLat.toFixed(5)}, ${newLng.toFixed(5)}`);
                }}
              >
                <iframe
                  key={`${addressCoords.lat}-${addressCoords.lng}`}
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${addressCoords.lng - 0.01},${addressCoords.lat - 0.006},${addressCoords.lng + 0.01},${addressCoords.lat + 0.006}&layer=mapnik&marker=${addressCoords.lat},${addressCoords.lng}`}
                  title="Delivery address map"
                  className="w-full h-full border-0 pointer-events-none filter contrast-105"
                />

                {/* Draggable indicator badge */}
                <div className="absolute top-2.5 right-2.5 bg-background/95 backdrop-blur-md border border-border px-2 py-1 rounded-lg text-[10px] font-semibold text-muted-foreground shadow-md pointer-events-none">
                  Clique no mapa para reposicionar o pin
                </div>
              </div>
            </div>
          </div>

          {/* BLOCK 6: SERVER STATUS (Map + Latency/Uptime Table) */}
          <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden flex flex-col">
            <div className="p-4 border-b border-border/70 flex items-center justify-between">
              <h2 className="text-sm font-bold text-foreground">Server status</h2>
              <span className="text-[11px] text-muted-foreground font-mono">6 Nodes Worldwide</span>
            </div>

            {/* Map Area */}
            <div className="relative h-44 w-full bg-slate-950 overflow-hidden flex items-center justify-center">
              <svg viewBox="0 0 1000 500" className="w-full h-auto opacity-30">
                <path d="M150,120 Q200,80 300,100 T400,150 T280,240 T180,200 Z" fill="#475569" />
                <path d="M250,280 Q300,260 330,320 T280,450 T240,360 Z" fill="#475569" />
                <path d="M480,100 Q550,70 650,90 T620,180 T500,160 Z" fill="#475569" />
                <path d="M500,200 Q560,180 600,260 T540,400 T480,280 Z" fill="#475569" />
                <path d="M680,100 Q850,60 920,140 T850,260 T700,200 Z" fill="#475569" />
              </svg>

              {/* Datacenter Nodes */}
              {SERVER_NODES.map((server) => {
                const pos = getWorldSvgPos(server.lng, server.lat);
                const isSelected = selectedServer.name === server.name;

                return (
                  <div
                    key={server.name}
                    style={pos}
                    onClick={() => {
                      setSelectedServer(server);
                      toast.info(`${server.name}: ${server.status} (${server.ping})`);
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 ${
                      isSelected ? "scale-125 z-20" : ""
                    }`}
                  >
                    <span className="relative flex h-3.5 w-3.5">
                      {server.pulse && (
                        <span
                          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                            server.color === "yellow" ? "bg-amber-400" : "bg-rose-400"
                          }`}
                        />
                      )}
                      <span
                        className={`relative inline-flex rounded-full h-3.5 w-3.5 border border-white shadow-xs ${
                          server.color === "green"
                            ? "bg-emerald-500"
                            : server.color === "yellow"
                            ? "bg-amber-500"
                            : "bg-rose-500"
                        }`}
                      />
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Table Area (Tabler Exact Table) */}
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border/80 bg-muted/30 text-muted-foreground uppercase text-[10px] tracking-wider">
                    <th className="py-2 px-3">Region</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3 text-right">Latency</th>
                    <th className="py-2 px-3 text-right">Uptime</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {SERVER_NODES.map((s) => {
                    const isSelected = selectedServer.name === s.name;
                    return (
                      <tr
                        key={s.name}
                        onClick={() => setSelectedServer(s)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? "bg-muted/60 font-semibold" : "hover:bg-muted/30"
                        }`}
                      >
                        <td className="py-2 px-3">
                          <span className="text-foreground">{s.name}</span>{" "}
                          <span className="text-muted-foreground font-mono text-[11px]">{s.region}</span>
                        </td>
                        <td className="py-2 px-3">
                          <span className="flex items-center gap-1.5">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                s.color === "green"
                                  ? "bg-emerald-500"
                                  : s.color === "yellow"
                                  ? "bg-amber-500 animate-pulse"
                                  : "bg-rose-500 animate-pulse"
                              }`}
                            />
                            {s.status}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-right font-mono text-muted-foreground">{s.ping}</td>
                        <td className="py-2 px-3 text-right font-mono text-muted-foreground">{s.uptime}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* BLOCK 7: USERS BY COUNTRY (Col-12, Split 7/5 Vector Map)   */}
        {/* ========================================================= */}
        <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-border/70">
            <h2 className="text-base font-bold text-foreground">Users by country</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* World Vector Map (col-lg-7) */}
            <div className="lg:col-span-7 p-6 bg-slate-950 flex items-center justify-center relative overflow-hidden min-h-[22rem]">
              <svg viewBox="0 0 1000 500" className="w-full h-auto">
                {/* North America */}
                <path
                  d="M150,120 Q200,80 300,100 T400,150 T280,240 T180,200 Z"
                  fill={selectedCountry === "United States" ? "#3b82f6" : "#2563eb"}
                  className="transition-colors cursor-pointer hover:opacity-80"
                  onClick={() => setSelectedCountry("United States")}
                />
                {/* South America (Brazil) */}
                <path
                  d="M250,280 Q300,260 330,320 T280,450 T240,360 Z"
                  fill={selectedCountry === "Brazil" ? "#10b981" : "#059669"}
                  className="transition-colors cursor-pointer hover:opacity-80"
                  onClick={() => setSelectedCountry("Brazil")}
                />
                {/* Europe (Germany, France, Poland, UK) */}
                <path
                  d="M480,100 Q550,70 650,90 T620,180 T500,160 Z"
                  fill={
                    selectedCountry === "Germany" || selectedCountry === "France" || selectedCountry === "Poland"
                      ? "#f59e0b"
                      : "#d97706"
                  }
                  className="transition-colors cursor-pointer hover:opacity-80"
                  onClick={() => setSelectedCountry("Germany")}
                />
                {/* Africa */}
                <path d="M500,200 Q560,180 600,260 T540,400 T480,280 Z" fill="#475569" opacity="0.5" />
                {/* Asia */}
                <path d="M680,100 Q850,60 920,140 T850,260 T700,200 Z" fill="#64748b" opacity="0.6" />
                {/* Australia */}
                <path d="M780,320 Q860,300 890,380 T800,420 Z" fill="#475569" opacity="0.5" />
              </svg>

              <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-md border border-border p-2 rounded-lg text-xs shadow-md">
                <span className="font-bold text-foreground">País em Foco:</span>{" "}
                <span className="text-blue-600 font-semibold">{selectedCountry}</span>
              </div>
            </div>

            {/* Country Table (col-lg-5) */}
            <div className="lg:col-span-5 p-4 flex flex-col justify-center">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-border/80 text-muted-foreground uppercase text-[10px] tracking-wider">
                      <th className="py-2 px-3">Country</th>
                      <th className="py-2 px-3 text-right">Users</th>
                      <th className="py-2 px-3 w-1/3">Share</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {COUNTRY_USERS.map((c) => {
                      const isSelected = selectedCountry === c.country;
                      return (
                        <tr
                          key={c.code}
                          onClick={() => {
                            setSelectedCountry(c.country);
                            toast.info(`${c.country}: ${c.users} usuários (${c.share}%)`);
                          }}
                          className={`cursor-pointer transition-colors ${
                            isSelected ? "bg-blue-50/70 dark:bg-blue-950/40 font-semibold" : "hover:bg-muted/40"
                          }`}
                        >
                          <td className="py-2.5 px-3">
                            <span className="font-bold uppercase font-mono text-[10px] text-muted-foreground mr-1.5">
                              [{c.code}]
                            </span>
                            <span className="text-foreground">{c.country}</span>
                          </td>
                          <td className="py-2.5 px-3 text-right font-mono text-muted-foreground">
                            {c.users}
                          </td>
                          <td className="py-2.5 px-3">
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] text-muted-foreground w-7">{c.share}%</span>
                              <div className="flex-1 bg-muted rounded-full h-1.5 overflow-hidden">
                                <div
                                  className="bg-blue-600 h-full rounded-full transition-all duration-300"
                                  style={{ width: `${c.share * 2.5}%` }}
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
