"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

export function TablerCarousel() {
  const slides = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      title: "Mansão Contemporânea Lumina",
      caption: "Living com pé direito duplo integrado à área gourmet e piscina com borda infinita.",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      title: "Penthouse Jardins Exclusiva",
      caption: "Vista panorâmica 360° com acabamento em mármore travertino e automação total.",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
      title: "Residencial Alphaville Prime",
      caption: "Projeto biofílico sustentável com painéis solares e reaproveitamento hídrico.",
    },
  ];

  const [activeSlide1, setActiveSlide1] = useState(0);
  const [activeSlide2, setActiveSlide2] = useState(0);
  const [activeSlide3, setActiveSlide3] = useState(0);
  const [activeSlide4, setActiveSlide4] = useState(0);
  const [activeSlide5, setActiveSlide5] = useState(0);
  const [activeSlide6, setActiveSlide6] = useState(0);
  const [activeSlide7, setActiveSlide7] = useState(0);
  const [activeSlide8, setActiveSlide8] = useState(0);

  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setActiveSlide1((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [autoPlay, slides.length]);

  const nextSlide = (current: number, setter: (val: number) => void) => {
    setter((current + 1) % slides.length);
  };

  const prevSlide = (current: number, setter: (val: number) => void) => {
    setter((current - 1 + slides.length) % slides.length);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Carousel (Base com Auto/Play) */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Carousel</CardTitle>
                <CardDescription>A carousel cycles through a set of slides automatically.</CardDescription>
              </div>
              <button
                type="button"
                onClick={() => setAutoPlay(!autoPlay)}
                className="p-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                title={autoPlay ? "Pausar" : "Reproduzir"}
              >
                {autoPlay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-16/9 rounded-lg overflow-hidden bg-zinc-900 shadow-sm">
              <img
                src={slides[activeSlide1].url}
                alt={slides[activeSlide1].title}
                className="w-full h-full object-cover transition-opacity duration-700"
              />
            </div>
          </CardContent>
        </Card>

        {/* 2. Carousel with indicators */}
        <Card>
          <CardHeader>
            <CardTitle>Carousel with indicators</CardTitle>
            <CardDescription>Bar indicators at the bottom showing current active slide.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-16/9 rounded-lg overflow-hidden bg-zinc-900 shadow-sm group">
              <img
                src={slides[activeSlide2].url}
                alt={slides[activeSlide2].title}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              {/* Horizontal line indicators */}
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveSlide2(idx)}
                    className={`h-1 rounded transition-all cursor-pointer ${
                      activeSlide2 === idx ? "w-8 bg-white" : "w-4 bg-white/50 hover:bg-white/75"
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3. Carousel with controls */}
        <Card>
          <CardHeader>
            <CardTitle>Carousel with controls</CardTitle>
            <CardDescription>Prev & next buttons for manual browsing.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-16/9 rounded-lg overflow-hidden bg-zinc-900 shadow-sm group">
              <img
                src={slides[activeSlide3].url}
                alt={slides[activeSlide3].title}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              <button
                type="button"
                onClick={() => prevSlide(activeSlide3, setActiveSlide3)}
                className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => nextSlide(activeSlide3, setActiveSlide3)}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* 4. Carousel with captions */}
        <Card>
          <CardHeader>
            <CardTitle>Carousel with captions</CardTitle>
            <CardDescription>Slide title and description overlay on dark gradient.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-16/9 rounded-lg overflow-hidden bg-zinc-900 shadow-sm group">
              <img
                src={slides[activeSlide4].url}
                alt={slides[activeSlide4].title}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 text-white">
                <h4 className="font-semibold text-base">{slides[activeSlide4].title}</h4>
                <p className="text-xs text-zinc-300 mt-1 line-clamp-2">{slides[activeSlide4].caption}</p>
              </div>
              <button
                type="button"
                onClick={() => prevSlide(activeSlide4, setActiveSlide4)}
                className="absolute left-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/70 cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => nextSlide(activeSlide4, setActiveSlide4)}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/70 cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* 5. Carousel with dot indicators */}
        <Card>
          <CardHeader>
            <CardTitle>Carousel with dot indicators</CardTitle>
            <CardDescription>Circular dots indicating slide position.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-16/9 rounded-lg overflow-hidden bg-zinc-900 shadow-sm">
              <img
                src={slides[activeSlide5].url}
                alt={slides[activeSlide5].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 inset-x-0 flex justify-center gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveSlide5(idx)}
                    className={`h-2.5 w-2.5 rounded-full transition-all cursor-pointer ${
                      activeSlide5 === idx ? "bg-white scale-125" : "bg-white/40 hover:bg-white/70"
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 6. Carousel with thumbnail indicators */}
        <Card>
          <CardHeader>
            <CardTitle>Carousel with thumbnail indicators</CardTitle>
            <CardDescription>Miniature thumbnails aligned beneath the main frame.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="relative aspect-16/9 rounded-lg overflow-hidden bg-zinc-900 shadow-sm">
              <img
                src={slides[activeSlide6].url}
                alt={slides[activeSlide6].title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveSlide6(idx)}
                  className={`aspect-16/10 rounded overflow-hidden border-2 transition-all cursor-pointer ${
                    activeSlide6 === idx ? "border-blue-600 scale-102 shadow-sm" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={s.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 7. Carousel with vertical dot indicators */}
        <Card>
          <CardHeader>
            <CardTitle>Carousel with vertical dot indicators</CardTitle>
            <CardDescription>Dots positioned along the vertical right edge.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-16/9 rounded-lg overflow-hidden bg-zinc-900 shadow-sm">
              <img
                src={slides[activeSlide7].url}
                alt={slides[activeSlide7].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute right-3 inset-y-0 flex flex-col justify-center gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveSlide7(idx)}
                    className={`h-2.5 w-2.5 rounded-full transition-all cursor-pointer ${
                      activeSlide7 === idx ? "bg-white scale-125" : "bg-white/40 hover:bg-white/70"
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 8. Carousel with vertical thumbnail indicators */}
        <Card>
          <CardHeader>
            <CardTitle>Carousel with vertical thumbnail indicators</CardTitle>
            <CardDescription>Miniature thumbnails stacked alongside the main image.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <div className="flex-1 relative aspect-16/10 rounded-lg overflow-hidden bg-zinc-900 shadow-sm">
                <img
                  src={slides[activeSlide8].url}
                  alt={slides[activeSlide8].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-2 w-20 shrink-0">
                {slides.map((s, idx) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActiveSlide8(idx)}
                    className={`aspect-16/10 rounded overflow-hidden border-2 transition-all cursor-pointer ${
                      activeSlide8 === idx ? "border-blue-600 scale-102 shadow-sm" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={s.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
