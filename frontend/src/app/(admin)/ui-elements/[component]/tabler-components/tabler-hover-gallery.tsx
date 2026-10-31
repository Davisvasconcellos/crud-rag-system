"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Bed, Bath, Car, Maximize, Heart, MapPin } from "lucide-react";
import { toast } from "sonner";

export function TablerHoverGallery() {
  const images = [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80",
  ];

  const [activeIdx1, setActiveIdx1] = useState(0);
  const [activeIdx2, setActiveIdx2] = useState(0);
  const [activeIdx3, setActiveIdx3] = useState(0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. With indicators */}
        <Card>
          <CardHeader>
            <CardTitle>With indicators</CardTitle>
            <CardDescription>
              Add <code className="font-mono text-xs px-1 rounded bg-zinc-100 dark:bg-zinc-800">.hover-gallery-indicators</code> to show which image is currently on display as the pointer moves across.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-16/10 rounded-lg overflow-hidden bg-zinc-900 shadow-sm group">
              <img
                src={images[activeIdx1]}
                alt="Hover Gallery Preview"
                className="w-full h-full object-cover transition-all duration-300"
              />

              {/* Invisible interactive hover segments */}
              <div className="absolute inset-0 flex z-10">
                {images.map((_, i) => (
                  <div
                    key={i}
                    onMouseEnter={() => setActiveIdx1(i)}
                    className="flex-1 h-full cursor-pointer"
                  />
                ))}
              </div>

              {/* Segment Indicators at bottom */}
              <div className="absolute bottom-3 inset-x-4 flex gap-1.5 z-20 pointer-events-none">
                {images.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-all duration-200 ${
                      activeIdx1 === i ? "bg-white shadow-sm" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-zinc-500 mt-2 text-center">
              Passe o cursor sobre os lados da imagem para alternar os ângulos.
            </p>
          </CardContent>
        </Card>

        {/* 2. Aspect ratio */}
        <Card>
          <CardHeader>
            <CardTitle>Aspect ratio</CardTitle>
            <CardDescription>
              Set <code className="font-mono text-xs px-1 rounded bg-zinc-100 dark:bg-zinc-800">--tblr-hover-gallery-aspect-ratio</code> to change the shape (e.g. 4:3 or 1:1).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-4/3 rounded-lg overflow-hidden bg-zinc-900 shadow-sm group max-w-sm mx-auto">
              <img
                src={images[activeIdx2]}
                alt="Hover Gallery 4:3"
                className="w-full h-full object-cover transition-all duration-300"
              />

              {/* Hover segments */}
              <div className="absolute inset-0 flex z-10">
                {images.map((_, i) => (
                  <div
                    key={i}
                    onMouseEnter={() => setActiveIdx2(i)}
                    className="flex-1 h-full cursor-pointer"
                  />
                ))}
              </div>

              {/* Indicators */}
              <div className="absolute bottom-3 inset-x-4 flex gap-1.5 z-20 pointer-events-none">
                {images.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-all duration-200 ${
                      activeIdx2 === i ? "bg-white shadow-sm" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. Product card */}
      <Card>
        <CardHeader>
          <CardTitle>Product card</CardTitle>
          <CardDescription>
            Use the gallery with <code className="font-mono text-xs px-1 rounded bg-zinc-100 dark:bg-zinc-800">.card-img-top</code> in place of a static card image on real estate listings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-w-md rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md overflow-hidden">
            {/* Top Hover Gallery */}
            <div className="relative aspect-16/10 bg-zinc-900 overflow-hidden group">
              <img
                src={images[activeIdx3]}
                alt="Card Gallery"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />

              {/* Hover segments */}
              <div className="absolute inset-0 flex z-10">
                {images.map((_, i) => (
                  <div
                    key={i}
                    onMouseEnter={() => setActiveIdx3(i)}
                    className="flex-1 h-full cursor-pointer"
                  />
                ))}
              </div>

              {/* Tag & Favorite */}
              <div className="absolute top-3 left-3 z-20">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-600 text-white shadow-sm">
                  Exclusividade
                </span>
              </div>
              <button
                type="button"
                onClick={() => toast.success("Adicionado aos favoritos")}
                className="absolute top-3 right-3 z-20 h-8 w-8 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur text-rose-500 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
              >
                <Heart className="h-4 w-4 fill-current" />
              </button>

              {/* Indicators */}
              <div className="absolute bottom-2.5 inset-x-3 flex gap-1 z-20 pointer-events-none">
                {images.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-all duration-200 ${
                      activeIdx3 === i ? "bg-white shadow-sm" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Card Body */}
            <div className="p-4 space-y-3">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-1">
                  <MapPin className="h-3.5 w-3.5 text-zinc-400" />
                  Jardins, São Paulo • SP
                </div>
                <h4 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
                  Edifício Lumina Residencial
                </h4>
              </div>

              <div className="flex items-baseline justify-between border-y border-zinc-100 dark:border-zinc-800/80 py-2.5">
                <div>
                  <span className="text-xs text-zinc-500">Valor de Venda</span>
                  <div className="text-lg font-extrabold text-blue-600 dark:text-blue-400">
                    R$ 3.850.000
                  </div>
                </div>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                  Condomínio: R$ 1.950
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400 pt-1">
                <span className="flex items-center gap-1">
                  <Bed className="h-4 w-4 text-zinc-400" /> 4 Suítes
                </span>
                <span className="flex items-center gap-1">
                  <Bath className="h-4 w-4 text-zinc-400" /> 5 Banh
                </span>
                <span className="flex items-center gap-1">
                  <Car className="h-4 w-4 text-zinc-400" /> 3 Vagas
                </span>
                <span className="flex items-center gap-1">
                  <Maximize className="h-4 w-4 text-zinc-400" /> 245 m²
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
