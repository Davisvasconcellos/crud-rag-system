"use client";

import React, { useState, useEffect } from "react";
import {
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  ExternalLink,
  Sparkles,
  ZoomIn,
  ZoomOut,
  Download,
  Share2,
  Layers,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface LightboxPhoto {
  id: number;
  title: string;
  category: "people" | "work" | "lifestyle" | "architecture";
  imageUrl: string;
}

const PHOTOS: LightboxPhoto[] = [
  {
    id: 1,
    title: "Beautiful blonde woman relaxing with a can of coke on a tree stump by the beach",
    category: "lifestyle",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Brainstorming session with creative designers",
    category: "work",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Finances - US Dollars and Bitcoins - Currency - Money",
    category: "work",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Group of people brainstorming and taking notes",
    category: "work",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Blue sofa with pillows in a designer living room interior",
    category: "architecture",
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Home office desk with Macbook, iPhone, calendar, watch & organizer",
    category: "work",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    title: "Young woman working in a cafe",
    category: "people",
    imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    title: "Everything you need to work from your bed",
    category: "lifestyle",
    imageUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 9,
    title: "Young Entrepreneur Working from a Modern Cafe",
    category: "work",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 10,
    title: "Woman working on a laptop while enjoying breakfast coffee",
    category: "lifestyle",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 11,
    title: "Businesswoman Working at Her Laptop",
    category: "work",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 12,
    title: "Cup of coffee on table in cafe",
    category: "lifestyle",
    imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 13,
    title: "Young woman sitting on the sofa and working on her laptop",
    category: "people",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 14,
    title: "Man looking out to sea",
    category: "lifestyle",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 15,
    title: "Cup of coffee and an open book",
    category: "lifestyle",
    imageUrl: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 16,
    title: "Workplace with laptop on table at home",
    category: "work",
    imageUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 17,
    title: "Stylish workspace with Macbook Pro",
    category: "architecture",
    imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 18,
    title: "A visit to the bookstore",
    category: "lifestyle",
    imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 19,
    title: "Books and purple flowers on a wooden stool by the bed",
    category: "lifestyle",
    imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 20,
    title: "People watching a presentation in a room",
    category: "work",
    imageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 21,
    title: "Making Magic with Fairy Lights",
    category: "lifestyle",
    imageUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 22,
    title: "Modern Architectural Glass Pavilion",
    category: "architecture",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 23,
    title: "Creative Studio Workspace with Plants",
    category: "architecture",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 24,
    title: "Woman drinking tea and reading book",
    category: "people",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
  },
];

export function TablerLightbox() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredPhotos =
    activeCategory === "all"
      ? PHOTOS
      : PHOTOS.filter((p) => p.category === activeCategory);

  const currentPhoto =
    selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === "Escape") setSelectedPhotoIndex(null);
      if (e.key === "ArrowLeft") {
        setSelectedPhotoIndex((i) =>
          i !== null ? (i > 0 ? i - 1 : filteredPhotos.length - 1) : null
        );
        setIsZoomed(false);
      }
      if (e.key === "ArrowRight") {
        setSelectedPhotoIndex((i) =>
          i !== null ? (i < filteredPhotos.length - 1 ? i + 1 : 0) : null
        );
        setIsZoomed(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhotoIndex, filteredPhotos.length]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card border border-border/70 rounded-xl p-5 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-foreground">Lightbox Plugin</h1>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
              fslightbox
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Galeria interativa oficial do Tabler em grade responsiva 1x1 com visualização em tela cheia, zoom, navegação por teclado e filtros por categoria.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://preview.tabler.io/lightbox.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-xs"
          >
            Preview Tabler
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-card border border-border/70 rounded-xl p-3 shadow-xs">
        <div className="flex items-center gap-1.5 bg-muted/60 p-1 rounded-lg border border-border/50 text-xs">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-3 py-1 rounded-md font-semibold transition-colors ${
              activeCategory === "all"
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Todas as Fotos ({PHOTOS.length})
          </button>
          <button
            onClick={() => setActiveCategory("work")}
            className={`px-3 py-1 rounded-md font-semibold transition-colors ${
              activeCategory === "work"
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Work & Office
          </button>
          <button
            onClick={() => setActiveCategory("lifestyle")}
            className={`px-3 py-1 rounded-md font-semibold transition-colors ${
              activeCategory === "lifestyle"
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Lifestyle & Cafe
          </button>
          <button
            onClick={() => setActiveCategory("architecture")}
            className={`px-3 py-1 rounded-md font-semibold transition-colors ${
              activeCategory === "architecture"
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Architecture
          </button>
          <button
            onClick={() => setActiveCategory("people")}
            className={`px-3 py-1 rounded-md font-semibold transition-colors ${
              activeCategory === "people"
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            People
          </button>
        </div>

        <div className="text-xs text-muted-foreground">
          Exibindo <span className="font-semibold text-foreground">{filteredPhotos.length}</span> fotos
        </div>
      </div>

      {/* Official Tabler Responsive Lightbox Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {filteredPhotos.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => {
              setSelectedPhotoIndex(index);
              setIsZoomed(false);
            }}
            className="group relative aspect-square rounded-xl overflow-hidden border border-border/80 bg-muted/40 cursor-pointer shadow-xs hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
          >
            <img
              src={photo.imageUrl}
              alt={photo.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-2.5">
              <div className="flex justify-end">
                <span className="p-1.5 rounded-full bg-black/50 text-white backdrop-blur-xs">
                  <Maximize2 className="w-3.5 h-3.5" />
                </span>
              </div>
              <p className="text-[10px] text-white font-medium line-clamp-2 leading-tight drop-shadow-sm">
                {photo.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal Overlay (fslightbox replica) */}
      {selectedPhotoIndex !== null && currentPhoto && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 select-none animate-in fade-in duration-200">
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white/90">
            <div className="text-xs font-medium">
              <span className="font-bold text-white">{selectedPhotoIndex + 1}</span> / {filteredPhotos.length}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title={isZoomed ? "Zoom Out" : "Zoom In"}
              >
                {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
              </button>

              <button
                onClick={() => {
                  toast.success("Link da foto copiado!");
                }}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Compartilhar"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => setSelectedPhotoIndex(null)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Fechar (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Center Image Container */}
          <div className="relative flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden">
            {/* Prev Button */}
            <button
              onClick={() => {
                setSelectedPhotoIndex((i) =>
                  i !== null ? (i > 0 ? i - 1 : filteredPhotos.length - 1) : null
                );
                setIsZoomed(false);
              }}
              className="absolute left-2 sm:left-4 z-10 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors backdrop-blur-xs"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Image */}
            <div className="max-w-4xl max-h-[75vh] flex items-center justify-center">
              <img
                src={currentPhoto.imageUrl}
                alt={currentPhoto.title}
                className={`rounded-lg object-contain max-h-[70vh] transition-all duration-300 shadow-2xl ${
                  isZoomed ? "scale-125 cursor-zoom-out" : "cursor-zoom-in"
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              />
            </div>

            {/* Next Button */}
            <button
              onClick={() => {
                setSelectedPhotoIndex((i) =>
                  i !== null ? (i < filteredPhotos.length - 1 ? i + 1 : 0) : null
                );
                setIsZoomed(false);
              }}
              className="absolute right-2 sm:right-4 z-10 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors backdrop-blur-xs"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Bar: Caption & Thumbnails */}
          <div className="max-w-3xl mx-auto w-full space-y-3">
            <p className="text-center text-xs text-white/90 font-medium truncate px-4">
              {currentPhoto.title}
            </p>

            {/* Thumbnail Strip */}
            <div className="flex items-center justify-center gap-2 overflow-x-auto py-1 px-2">
              {filteredPhotos.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedPhotoIndex(idx);
                    setIsZoomed(false);
                  }}
                  className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                    selectedPhotoIndex === idx
                      ? "border-blue-500 scale-105 opacity-100"
                      : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                >
                  <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
