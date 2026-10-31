"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Star, Heart, ThumbsUp, Award, Check } from "lucide-react";
import { toast } from "sonner";

export function TablerStarsRating() {
  const [rating1, setRating1] = useState(4);
  const [hover1, setHover1] = useState(0);

  const [heartRating, setHeartRating] = useState(3);
  const [heartHover, setHeartHover] = useState(0);

  const [thumbRating, setThumbRating] = useState(5);

  return (
    <div className="space-y-6">
      {/* 1. Basic Interactive Rating */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Interactive Star Rating</CardTitle>
            <CardDescription>
              Hover and click to select a rating. Supports keyboard accessibility and form integration.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = star <= (hover1 || rating1);
                return (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHover1(star)}
                    onMouseLeave={() => setHover1(0)}
                    onClick={() => {
                      setRating1(star);
                      toast.success(`Avaliação registrada: ${star} de 5 estrelas!`);
                    }}
                    className="p-1 cursor-pointer transition-transform hover:scale-115 focus:outline-none"
                  >
                    <Star
                      className={`h-7 w-7 transition-colors ${
                        isFilled
                          ? "fill-amber-400 text-amber-400"
                          : "text-zinc-300 dark:text-zinc-700"
                      }`}
                    />
                  </button>
                );
              })}
              <span className="ml-3 text-sm font-bold text-zinc-900 dark:text-zinc-100">
                {rating1}.0 / 5.0
              </span>
            </div>
            <p className="text-xs text-zinc-500">
              {rating1 === 5
                ? "Excelente! Altamente recomendado."
                : rating1 >= 4
                ? "Muito bom! Superou expectativas."
                : "Regular / Satisfatório."}
            </p>
          </CardContent>
        </Card>

        {/* 2. Different Icons (Hearts & Thumbs) */}
        <Card>
          <CardHeader>
            <CardTitle>Different Icons (Hearts & Thumbs)</CardTitle>
            <CardDescription>
              Use heart or thumbs-up icons for curated favorites and customer satisfaction.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Hearts */}
            <div>
              <span className="text-xs text-zinc-500 block mb-1">Ícone de Coração (Favorito)</span>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((val) => {
                  const isFilled = val <= (heartHover || heartRating);
                  return (
                    <button
                      key={val}
                      type="button"
                      onMouseEnter={() => setHeartHover(val)}
                      onMouseLeave={() => setHeartHover(0)}
                      onClick={() => setHeartRating(val)}
                      className="p-1 cursor-pointer transition-transform hover:scale-115 focus:outline-none"
                    >
                      <Heart
                        className={`h-6 w-6 transition-colors ${
                          isFilled
                            ? "fill-rose-500 text-rose-500"
                            : "text-zinc-300 dark:text-zinc-700"
                        }`}
                      />
                    </button>
                  );
                })}
                <span className="ml-2 text-xs font-semibold text-rose-600 font-mono">
                  {heartRating} de 5
                </span>
              </div>
            </div>

            {/* Thumbs */}
            <div>
              <span className="text-xs text-zinc-500 block mb-1">Ícone de Polegar (Satisfação)</span>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setThumbRating(val)}
                    className="p-1 cursor-pointer transition-transform hover:scale-115 focus:outline-none"
                  >
                    <ThumbsUp
                      className={`h-5 w-5 transition-colors ${
                        val <= thumbRating
                          ? "fill-emerald-500 text-emerald-500"
                          : "text-zinc-300 dark:text-zinc-700"
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-xs font-semibold text-emerald-600 font-mono">
                  100% Recomendado
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. Sizes & Readonly Review Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle>Sizes & Review Summary Card</CardTitle>
          <CardDescription>
            Compact review score for property cards and agent reputation metrics.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/60">
            <div className="text-center sm:text-left">
              <span className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 font-mono">
                4.9
              </span>
              <div className="flex items-center gap-1 mt-1 justify-center sm:justify-start">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs text-zinc-500 mt-1 block">Baseado em 148 avaliações</span>
            </div>

            <div className="flex-1 w-full space-y-1.5">
              {[
                { stars: "5 estrelas", pct: "86%", count: "128" },
                { stars: "4 estrelas", pct: "10%", count: "15" },
                { stars: "3 estrelas", pct: "3%", count: "4" },
                { stars: "2 estrelas", pct: "1%", count: "1" },
                { stars: "1 estrela", pct: "0%", count: "0" },
              ].map((row, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs">
                  <span className="w-16 text-zinc-500 shrink-0">{row.stars}</span>
                  <div className="flex-1 h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div style={{ width: row.pct }} className="h-full bg-amber-400 rounded-full" />
                  </div>
                  <span className="w-8 text-right font-mono text-zinc-400">{row.count}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
