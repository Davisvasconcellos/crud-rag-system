"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Heart, Star, MapPin, Eye, Camera, ShieldCheck, Flame } from "lucide-react";
import { toast } from "sonner";

export function TablerImageLabels() {
  const [likedCards, setLikedCards] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string) => {
    setLikedCards((prev) => {
      const next = !prev[id];
      toast.info(next ? "Adicionado aos favoritos" : "Removido dos favoritos");
      return { ...prev, [id]: next };
    });
  };

  const samplePhoto1 = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80";
  const samplePhoto2 = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80";
  const samplePhoto3 = "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80";
  const samplePhoto4 = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="space-y-6">
      {/* 1. Basic */}
      <Card>
        <CardHeader>
          <CardTitle>Basic</CardTitle>
          <CardDescription>
            Image labels pin a short text or an icon to a corner of an image using absolute placement.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="relative inline-block overflow-hidden rounded-lg group">
              <img
                src={samplePhoto1}
                alt="Basic example"
                className="w-64 h-44 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-xs font-semibold bg-zinc-900/80 text-white backdrop-blur-xs">
                Featured
              </span>
            </div>
            <div className="relative inline-block overflow-hidden rounded-lg group">
              <img
                src={samplePhoto2}
                alt="Basic example"
                className="w-64 h-44 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-xs font-semibold bg-blue-600 text-white shadow-xs">
                R$ 4.250.000
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. With an icon */}
      <Card>
        <CardHeader>
          <CardTitle>With an icon</CardTitle>
          <CardDescription>
            A label can hold an icon, a text, or both. Use circular buttons or compact tags.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="relative inline-block overflow-hidden rounded-lg group">
              <img
                src={samplePhoto3}
                alt="With icon"
                className="w-64 h-44 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-semibold bg-emerald-600 text-white shadow-xs">
                <ShieldCheck className="h-3 w-3" />
                Verificado
              </span>
              <button
                type="button"
                onClick={() => toggleLike("icon-1")}
                className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/90 dark:bg-zinc-900/90 text-zinc-700 dark:text-zinc-200 hover:text-red-600 dark:hover:text-red-400 backdrop-blur-xs transition-colors cursor-pointer shadow-xs"
              >
                <Heart
                  className={`h-4 w-4 ${likedCards["icon-1"] ? "fill-red-500 text-red-500" : ""}`}
                />
              </button>
            </div>

            <div className="relative inline-block overflow-hidden rounded-lg group">
              <img
                src={samplePhoto4}
                alt="With icon only"
                className="w-64 h-44 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-zinc-900/75 text-white backdrop-blur-xs">
                <Camera className="h-3 w-3" />
                24 fotos
              </span>
              <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-zinc-900/75 text-white backdrop-blur-xs">
                <Eye className="h-3 w-3" />
                1.420 views
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. Colors */}
      <Card>
        <CardHeader>
          <CardTitle>Colors</CardTitle>
          <CardDescription>
            Labels can use any semantic theme or solid palette color to communicate status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { color: "bg-blue-600 text-white", label: "Primary" },
              { color: "bg-emerald-600 text-white", label: "Success" },
              { color: "bg-amber-500 text-white", label: "Warning" },
              { color: "bg-red-600 text-white", label: "Danger" },
              { color: "bg-purple-600 text-white", label: "Purple" },
              { color: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900", label: "Dark" },
            ].map((item, idx) => (
              <div key={idx} className="relative overflow-hidden rounded-md group">
                <img
                  src={samplePhoto1}
                  alt={item.label}
                  className="w-full h-28 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span
                  className={`absolute top-2 left-2 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${item.color}`}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 4. Position */}
      <Card>
        <CardHeader>
          <CardTitle>Position</CardTitle>
          <CardDescription>
            Place labels in any of the four corners: top-start, top-end, bottom-start, or bottom-end.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative overflow-hidden rounded-lg">
              <img src={samplePhoto2} alt="Top Start" className="w-full h-36 object-cover" />
              <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-xs font-semibold bg-blue-600 text-white">
                Top Start
              </span>
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <img src={samplePhoto2} alt="Top End" className="w-full h-36 object-cover" />
              <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-xs font-semibold bg-emerald-600 text-white">
                Top End
              </span>
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <img src={samplePhoto2} alt="Bottom Start" className="w-full h-36 object-cover" />
              <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded text-xs font-semibold bg-amber-500 text-white">
                Bottom Start
              </span>
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <img src={samplePhoto2} alt="Bottom End" className="w-full h-36 object-cover" />
              <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded text-xs font-semibold bg-purple-600 text-white">
                Bottom End
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 5. Multiple labels & In a list */}
      <Card>
        <CardHeader>
          <CardTitle>Multiple labels & In a list</CardTitle>
          <CardDescription>
            Real-world composition of badges, prices, hot tags, and actionable bookmark icons over property cards.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col sm:flex-row gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
              <div className="relative overflow-hidden rounded-md shrink-0 w-full sm:w-48 h-32">
                <img src={samplePhoto3} alt="Property 1" className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-600 text-white uppercase tracking-wider">
                  <Flame className="h-2.5 w-2.5" />
                  Hot
                </span>
                <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded text-xs font-bold bg-zinc-950/80 text-white backdrop-blur-xs">
                  R$ 1.890.000
                </span>
                <button
                  type="button"
                  onClick={() => toggleLike("list-1")}
                  className="absolute top-2 right-2 p-1 rounded-full bg-white/80 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-300 hover:text-red-500 cursor-pointer"
                >
                  <Heart className={`h-3.5 w-3.5 ${likedCards["list-1"] ? "fill-red-500 text-red-500" : ""}`} />
                </button>
              </div>
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <h4 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                    Apartamento Jardins Duplex
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> Alameda Lorena, Jardins — SP
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400 mt-2">
                  <span>3 Quartos</span>
                  <span>•</span>
                  <span>2 Vagas</span>
                  <span>•</span>
                  <span>142 m²</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
              <div className="relative overflow-hidden rounded-md shrink-0 w-full sm:w-48 h-32">
                <img src={samplePhoto4} alt="Property 2" className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white uppercase tracking-wider">
                  Lançamento
                </span>
                <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded text-xs font-bold bg-zinc-950/80 text-white backdrop-blur-xs">
                  R$ 3.450.000
                </span>
                <button
                  type="button"
                  onClick={() => toggleLike("list-2")}
                  className="absolute top-2 right-2 p-1 rounded-full bg-white/80 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-300 hover:text-red-500 cursor-pointer"
                >
                  <Heart className={`h-3.5 w-3.5 ${likedCards["list-2"] ? "fill-red-500 text-red-500" : ""}`} />
                </button>
              </div>
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <h4 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                    Casa em Condomínio Fechado
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> Tamboré 3, Alphaville — SP
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400 mt-2">
                  <span>4 Suítes</span>
                  <span>•</span>
                  <span>4 Vagas</span>
                  <span>•</span>
                  <span>480 m²</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
