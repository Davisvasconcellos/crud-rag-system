"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Minus, Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface SocialProvider {
  name: string;
  slug: string;
  metric?: {
    stat: string;
    sub: string;
    change: string;
    changeType: "up" | "down" | "neutral";
  };
}

const SOCIAL_PROVIDERS: SocialProvider[] = [
  {
    name: "Dribbble",
    slug: "dribbble",
    metric: { stat: "328 likes", sub: "45 today", change: "8%", changeType: "up" },
  },
  {
    name: "Facebook",
    slug: "facebook",
    metric: { stat: "542 shares", sub: "67 today", change: "0%", changeType: "neutral" },
  },
  {
    name: "Instagram",
    slug: "instagram",
    metric: { stat: "894 followers", sub: "120 today", change: "10%", changeType: "up" },
  },
  {
    name: "X (Twitter)",
    slug: "x",
    metric: { stat: "221 retweets", sub: "34 today", change: "-2%", changeType: "down" },
  },
  {
    name: "YouTube",
    slug: "youtube",
    metric: { stat: "765 views", sub: "98 today", change: "0%", changeType: "neutral" },
  },
  {
    name: "Pinterest",
    slug: "pinterest",
    metric: { stat: "432 pins", sub: "53 today", change: "-4%", changeType: "down" },
  },
  {
    name: "TikTok",
    slug: "tiktok",
    metric: { stat: "612 likes", sub: "76 today", change: "9%", changeType: "up" },
  },
  {
    name: "LinkedIn",
    slug: "linkedin",
    metric: { stat: "305 connections", sub: "29 today", change: "-1%", changeType: "down" },
  },
  { name: "Apple", slug: "apple" },
  { name: "Discord", slug: "discord" },
  { name: "Figma", slug: "figma" },
  { name: "GitHub", slug: "github" },
  { name: "Google", slug: "google" },
  { name: "Medium", slug: "medium" },
  { name: "Meta", slug: "meta" },
  { name: "MetaMask", slug: "metamask" },
  { name: "Reddit", slug: "reddit" },
  { name: "Signal", slug: "signal" },
  { name: "Skype", slug: "skype" },
  { name: "Snapchat", slug: "snapchat" },
  { name: "Spotify", slug: "spotify" },
  { name: "Telegram", slug: "telegram" },
  { name: "Tumblr", slug: "tumblr" },
  { name: "Twitch", slug: "twitch" },
  { name: "VK", slug: "vk" },
];

export function TablerSocialIcons() {
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const copyIcon = (slug: string, name: string) => {
    navigator.clipboard.writeText(`<span class="social social-app-${slug}"></span>`);
    setCopiedSlug(slug);
    toast.success(`Ícone "${name}" copiado para a área de transferência!`);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const metricCards = SOCIAL_PROVIDERS.filter((p) => p.metric);

  return (
    <div className="space-y-6">
      {/* 1. Top Social Metrics Cards (Tabler Exact 8 Cards Grid) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {metricCards.map((item) => {
          const m = item.metric!;
          return (
            <Card key={item.slug} className="p-4 shadow-2xs">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 rounded-lg flex items-center justify-center shrink-0 p-1.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
                    <img
                      src={`/social/${item.slug}.svg`}
                      alt={item.name}
                      className="h-6 w-6 object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-xs text-zinc-900 dark:text-zinc-100 truncate">
                      {m.stat}
                    </div>
                    <div className="text-[11px] text-zinc-500 truncate">{m.sub}</div>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  {m.changeType === "up" && (
                    <span className="inline-flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      {m.change}
                      <ArrowUp className="h-3 w-3 ml-0.5" />
                    </span>
                  )}
                  {m.changeType === "down" && (
                    <span className="inline-flex items-center text-xs font-semibold text-rose-600 dark:text-rose-400">
                      {m.change}
                      <ArrowDown className="h-3 w-3 ml-0.5" />
                    </span>
                  )}
                  {m.changeType === "neutral" && (
                    <span className="inline-flex items-center text-xs font-semibold text-zinc-400">
                      {m.change}
                      <Minus className="h-3 w-3 ml-0.5" />
                    </span>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* 2. Card: Sign in with social media (Tabler Exact All 25 Buttons) */}
      <Card>
        <CardHeader>
          <CardTitle>Sign in with social media</CardTitle>
          <CardDescription>
            A button per provider, for a social sign-in screen.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2.5">
            {SOCIAL_PROVIDERS.map((provider) => (
              <button
                key={provider.slug}
                type="button"
                onClick={() => toast.info(`Autenticando via ${provider.name}...`)}
                className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-xs font-medium text-zinc-800 dark:text-zinc-200 shadow-2xs transition-colors cursor-pointer"
              >
                <img
                  src={`/social/${provider.slug}.svg`}
                  alt={provider.name}
                  className="h-4 w-4 object-contain shrink-0"
                />
                <span>Sign in with {provider.name}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 3. Card: List of all social media icons (Tabler Exact 25 Icons Grid) */}
      <Card>
        <CardHeader>
          <CardTitle>List of all social media icons</CardTitle>
          <CardDescription>
            Every brand icon shipped with the social icons plugin. Click on any icon to copy its snippet.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-3">
            {SOCIAL_PROVIDERS.map((provider) => {
              const isCopied = copiedSlug === provider.slug;
              return (
                <div
                  key={provider.slug}
                  onClick={() => copyIcon(provider.slug, provider.name)}
                  className="group relative flex flex-col items-center justify-center p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 hover:bg-white dark:bg-zinc-900/40 dark:hover:bg-zinc-800 transition-all cursor-pointer shadow-2xs hover:shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 text-center"
                  title={`Clique para copiar ${provider.name}`}
                >
                  <div className="h-10 w-10 flex items-center justify-center transition-transform group-hover:scale-115">
                    <img
                      src={`/social/${provider.slug}.svg`}
                      alt={provider.name}
                      className="h-8 w-8 object-contain"
                    />
                  </div>
                  <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-300 mt-2 truncate max-w-full">
                    {provider.name}
                  </span>
                  {isCopied ? (
                    <span className="absolute top-1 right-1 text-emerald-600">
                      <Check className="h-3 w-3" />
                    </span>
                  ) : (
                    <span className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-zinc-400 transition-opacity">
                      <Copy className="h-3 w-3" />
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
