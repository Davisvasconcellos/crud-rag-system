"use client";

import React, { useState } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Film,
  Tv,
  Music,
  ExternalLink,
  Sparkles,
  Info,
  Sliders,
  Settings,
  Share2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function TablerInlinePlayer() {
  const [activeTab, setActiveTab] = useState<"all" | "youtube" | "vimeo" | "html5">("all");

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card border border-border/70 rounded-xl p-5 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-foreground">Inline Player Plugin</h1>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
              Plyr.io Integration
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Player multimídia leve, acessível e responsivo com suporte oficial do Tabler para YouTube, Vimeo, arquivos MP4 e áudio HTML5.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://preview.tabler.io/inline-player.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-xs"
          >
            Preview Tabler
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Grid of Players matching Tabler Official */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Youtube Player */}
        <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden flex flex-col">
          <div className="p-4 sm:p-5 border-b border-border/70 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Tv className="w-4 h-4 text-rose-600" />
              <h2 className="text-base font-bold text-foreground">Youtube Player</h2>
            </div>
            <span className="text-[11px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
              ID: bTqVqk7FSmY
            </span>
          </div>

          <div className="p-5 flex-1 space-y-4">
            <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-border bg-black shadow-inner">
              <iframe
                src="https://www.youtube-nocookie.com/embed/bTqVqk7FSmY?origin=http://localhost:3001&playsinline=1"
                title="Youtube Player Tabler"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
              <span className="font-medium text-foreground">Big Buck Bunny (4K 60fps)</span>
              <span>Open Source Blender Film</span>
            </div>
          </div>
        </div>

        {/* Card 2: Vimeo Player */}
        <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden flex flex-col">
          <div className="p-4 sm:p-5 border-b border-border/70 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Film className="w-4 h-4 text-cyan-600" />
              <h2 className="text-base font-bold text-foreground">Vimeo Player</h2>
            </div>
            <span className="text-[11px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
              ID: 707012696
            </span>
          </div>

          <div className="p-5 flex-1 space-y-4">
            <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-border bg-black shadow-inner">
              <iframe
                src="https://player.vimeo.com/video/707012696?h=0&title=0&byline=0&portrait=0"
                title="Vimeo Player Tabler"
                className="w-full h-full border-0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
              <span className="font-medium text-foreground">Motion Graphics Showcase</span>
              <span>Charlotte / Creative Studio</span>
            </div>
          </div>
        </div>

        {/* Card 3: HTML5 Local Video Player */}
        <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden flex flex-col">
          <div className="p-4 sm:p-5 border-b border-border/70 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Film className="w-4 h-4 text-indigo-600" />
              <h2 className="text-base font-bold text-foreground">HTML5 Video Player</h2>
            </div>
            <span className="text-[11px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
              MP4 / WebM
            </span>
          </div>

          <div className="p-5 flex-1 space-y-4">
            <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-border bg-black shadow-inner">
              <video
                controls
                poster="https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80"
                className="w-full h-full object-cover"
              >
                <source
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                  type="video/mp4"
                />
                Seu navegador não suporta a tag de vídeo.
              </video>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
              <span className="font-medium text-foreground">Native Video Container</span>
              <span>1080p Full HD</span>
            </div>
          </div>
        </div>

        {/* Card 4: Audio Player */}
        <div className="bg-card border border-border/80 rounded-xl shadow-xs overflow-hidden flex flex-col justify-between">
          <div className="p-4 sm:p-5 border-b border-border/70 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Music className="w-4 h-4 text-emerald-600" />
              <h2 className="text-base font-bold text-foreground">Audio Stream Player</h2>
            </div>
            <span className="text-[11px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
              MP3 / AAC
            </span>
          </div>

          <div className="p-5 flex-1 flex flex-col justify-center space-y-4">
            <div className="p-4 rounded-xl border border-border bg-muted/30 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <Music className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">Synthesized Acoustic Podcast</h4>
                  <p className="text-[11px] text-muted-foreground">Episódio #42 • 04:15 de reprodução</p>
                </div>
              </div>

              <audio
                controls
                className="w-full h-10 mt-2"
                src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Code Snippet Card */}
      <div className="bg-card border border-border/80 rounded-xl p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-bold text-foreground">Implementação no Tabler</h3>
        </div>
        <p className="text-xs text-muted-foreground">
          O Tabler utiliza o Plyr para criar uma camada unificada de controles em vídeos do YouTube, Vimeo ou tags <code>&lt;video&gt;</code> HTML5 nativas.
        </p>
        <pre className="p-3 bg-muted/60 border border-border rounded-lg text-[11px] font-mono text-muted-foreground overflow-x-auto">
{`const player = new Plyr('#player-youtube', {
  controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
});`}
        </pre>
      </div>
    </div>
  );
}
