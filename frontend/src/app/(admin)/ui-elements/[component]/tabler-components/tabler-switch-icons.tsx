"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  Heart,
  Star,
  Bookmark,
  Bell,
  BellOff,
  ThumbsUp,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Pin,
} from "lucide-react";
import { toast } from "sonner";

export function TablerSwitchIcons() {
  const [switches, setSwitches] = useState<Record<string, boolean>>({
    heart: true,
    star: false,
    bookmark: true,
    bell: true,
    volume: false,
    eye: true,
    pin: false,
  });

  const [likeCount, setLikeCount] = useState(48);
  const [isLiked, setIsLiked] = useState(false);

  const toggle = (key: string) => {
    setSwitches((prev) => {
      const next = !prev[key];
      toast.info(`Estado de "${key}": ${next ? "Ativado" : "Desativado"}`);
      return { ...prev, [key]: next };
    });
  };

  const handleLikeButton = () => {
    if (isLiked) {
      setLikeCount((c) => c - 1);
      setIsLiked(false);
      toast.info("Removido dos favoritos");
    } else {
      setLikeCount((c) => c + 1);
      setIsLiked(true);
      toast.success("Adicionado aos favoritos!");
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Basic Switch Icons Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Tabler Switch Icons (Animated Two-State Toggles)</CardTitle>
          <CardDescription>
            Switch icons animate the transition between two icons or states, ideal for bookmarking, favoriting, mute/unmute, and alerts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {/* Heart */}
            <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-center">
              <button
                type="button"
                onClick={() => toggle("heart")}
                className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-transform active:scale-90 cursor-pointer"
              >
                <Heart
                  className={`h-6 w-6 transition-all duration-200 ${
                    switches.heart
                      ? "fill-rose-500 text-rose-500 scale-110"
                      : "text-zinc-400 hover:text-zinc-600"
                  }`}
                />
              </button>
              <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Favorito</span>
            </div>

            {/* Star */}
            <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-center">
              <button
                type="button"
                onClick={() => toggle("star")}
                className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-transform active:scale-90 cursor-pointer"
              >
                <Star
                  className={`h-6 w-6 transition-all duration-200 ${
                    switches.star
                      ? "fill-amber-400 text-amber-400 scale-110"
                      : "text-zinc-400 hover:text-zinc-600"
                  }`}
                />
              </button>
              <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Destaque</span>
            </div>

            {/* Bookmark */}
            <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-center">
              <button
                type="button"
                onClick={() => toggle("bookmark")}
                className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-transform active:scale-90 cursor-pointer"
              >
                <Bookmark
                  className={`h-6 w-6 transition-all duration-200 ${
                    switches.bookmark
                      ? "fill-blue-600 text-blue-600 scale-110"
                      : "text-zinc-400 hover:text-zinc-600"
                  }`}
                />
              </button>
              <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Salvar</span>
            </div>

            {/* Bell */}
            <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-center">
              <button
                type="button"
                onClick={() => toggle("bell")}
                className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-transform active:scale-90 cursor-pointer"
              >
                {switches.bell ? (
                  <Bell className="h-6 w-6 text-emerald-600 fill-emerald-500/20" />
                ) : (
                  <BellOff className="h-6 w-6 text-zinc-400" />
                )}
              </button>
              <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Notificações</span>
            </div>

            {/* Eye */}
            <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-center">
              <button
                type="button"
                onClick={() => toggle("eye")}
                className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-transform active:scale-90 cursor-pointer"
              >
                {switches.eye ? (
                  <Eye className="h-6 w-6 text-blue-600" />
                ) : (
                  <EyeOff className="h-6 w-6 text-zinc-400" />
                )}
              </button>
              <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Visibilidade</span>
            </div>

            {/* Pin */}
            <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-center">
              <button
                type="button"
                onClick={() => toggle("pin")}
                className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-transform active:scale-90 cursor-pointer"
              >
                <Pin
                  className={`h-6 w-6 transition-all duration-200 ${
                    switches.pin
                      ? "fill-purple-600 text-purple-600 rotate-45"
                      : "text-zinc-400 hover:text-zinc-600"
                  }`}
                />
              </button>
              <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Fixar</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. In an Action Button with Counter */}
      <Card>
        <CardHeader>
          <CardTitle>In an Action Button with Counter</CardTitle>
          <CardDescription>Integrated inside standard button components for listing cards.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={handleLikeButton}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer shadow-2xs ${
                isLiked
                  ? "bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/40 dark:border-rose-900"
                  : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50"
              }`}
            >
              <Heart
                className={`h-4 w-4 transition-transform ${isLiked ? "fill-rose-500 text-rose-500 scale-110" : ""}`}
              />
              <span>{isLiked ? "Favoritado" : "Favoritar"}</span>
              <span className="font-mono bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.2 rounded text-[10px]">
                {likeCount}
              </span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
