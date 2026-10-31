"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Check, ArrowRight, Star, Bell, MoreVertical } from "lucide-react";
import { toast } from "sonner";

export function TablerBadges() {
  const [dropdownOpen, setDropdownOpen] = useState(true);

  const colors = [
    { name: "Blue", bg: "bg-blue-600 text-white", light: "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300", border: "border-blue-500 text-blue-600 dark:text-blue-400" },
    { name: "Azure", bg: "bg-sky-500 text-white", light: "bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300", border: "border-sky-500 text-sky-600 dark:text-sky-400" },
    { name: "Indigo", bg: "bg-indigo-600 text-white", light: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300", border: "border-indigo-500 text-indigo-600 dark:text-indigo-400" },
    { name: "Purple", bg: "bg-purple-600 text-white", light: "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300", border: "border-purple-500 text-purple-600 dark:text-purple-400" },
    { name: "Pink", bg: "bg-pink-600 text-white", light: "bg-pink-100 text-pink-700 dark:bg-pink-950/60 dark:text-pink-300", border: "border-pink-500 text-pink-600 dark:text-pink-400" },
    { name: "Red", bg: "bg-red-600 text-white", light: "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300", border: "border-red-500 text-red-600 dark:text-red-400" },
    { name: "Orange", bg: "bg-orange-500 text-white", light: "bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300", border: "border-orange-500 text-orange-600 dark:text-orange-400" },
    { name: "Yellow", bg: "bg-amber-400 text-zinc-900", light: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300", border: "border-amber-400 text-amber-600 dark:text-amber-400" },
    { name: "Lime", bg: "bg-lime-500 text-white", light: "bg-lime-100 text-lime-800 dark:bg-lime-950/60 dark:text-lime-300", border: "border-lime-500 text-lime-600 dark:text-lime-400" },
    { name: "Green", bg: "bg-emerald-600 text-white", light: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300", border: "border-emerald-500 text-emerald-600 dark:text-emerald-400" },
    { name: "Teal", bg: "bg-teal-500 text-white", light: "bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300", border: "border-teal-500 text-teal-600 dark:text-teal-400" },
    { name: "Cyan", bg: "bg-cyan-500 text-white", light: "bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300", border: "border-cyan-500 text-cyan-600 dark:text-cyan-400" },
    { name: "Dark", bg: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900", light: "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100", border: "border-zinc-800 text-zinc-900 dark:border-zinc-300 dark:text-zinc-100" },
    { name: "Light", bg: "bg-zinc-100 text-zinc-800 border border-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700", light: "bg-zinc-50 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400", border: "border-zinc-300 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400" },
  ];

  return (
    <div className="space-y-6">
      {/* Grid Superior: Headings, Sizes, Positioned, In a dropdown, On buttons, Notification dot, Blinking notification */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1. In headings */}
        <Card>
          <CardHeader>
            <CardTitle>In headings</CardTitle>
            <CardDescription>A badge scales with the heading level it sits next to.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-2xl font-bold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
              Example heading <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-600 text-white">New</span>
            </div>
            <div className="text-xl font-bold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
              Example heading <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-600 text-white">New</span>
            </div>
            <div className="text-lg font-semibold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
              Example heading <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-600 text-white">New</span>
            </div>
            <div className="text-base font-semibold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
              Example heading <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-blue-600 text-white">New</span>
            </div>
            <div className="text-sm font-medium flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
              Example heading <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-blue-600 text-white">New</span>
            </div>
            <div className="text-xs font-medium flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
              Example heading <span className="text-[9px] font-semibold px-1 py-0.5 rounded bg-blue-600 text-white">New</span>
            </div>
          </CardContent>
        </Card>

        {/* 2. Sizes */}
        <Card>
          <CardHeader>
            <CardTitle>Sizes</CardTitle>
            <CardDescription>Three sizes, with an optional icon before or after the label.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Small */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                Default
              </span>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 inline-flex items-center gap-1">
                <Check className="h-3 w-3" /> Left icon
              </span>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 inline-flex items-center gap-1">
                Right icon <ArrowRight className="h-3 w-3" />
              </span>
              <span className="text-[10px] font-medium p-1 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 inline-flex items-center justify-center">
                <Star className="h-3 w-3 fill-current" />
              </span>
            </div>

            {/* Medium (Default) */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium px-2.5 py-1 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                Default
              </span>
              <span className="text-xs font-medium px-2.5 py-1 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5" /> Left icon
              </span>
              <span className="text-xs font-medium px-2.5 py-1 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 inline-flex items-center gap-1.5">
                Right icon <ArrowRight className="h-3.5 w-3.5" />
              </span>
              <span className="text-xs font-medium p-1.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 inline-flex items-center justify-center">
                <Star className="h-3.5 w-3.5 fill-current" />
              </span>
            </div>

            {/* Large */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold px-3 py-1.5 rounded-md bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                Default
              </span>
              <span className="text-sm font-semibold px-3 py-1.5 rounded-md bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 inline-flex items-center gap-2">
                <Check className="h-4 w-4" /> Left icon
              </span>
              <span className="text-sm font-semibold px-3 py-1.5 rounded-md bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 inline-flex items-center gap-2">
                Right icon <ArrowRight className="h-4 w-4" />
              </span>
              <span className="text-sm font-semibold p-2 rounded-md bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 inline-flex items-center justify-center">
                <Star className="h-4 w-4 fill-current" />
              </span>
            </div>
          </CardContent>
        </Card>

        {/* 3. Positioned */}
        <Card>
          <CardHeader>
            <CardTitle>Positioned</CardTitle>
            <CardDescription>
              Attach a count or a dot to a button with <code className="font-mono text-xs px-1 rounded bg-zinc-100 dark:bg-zinc-800">.badge-notification</code>.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="px-3 py-1.5 rounded-md border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors inline-flex items-center cursor-pointer"
              >
                Notifications <span className="ml-2 text-xs font-semibold px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200">4</span>
              </button>

              <button
                type="button"
                className="relative px-3 py-1.5 rounded-md border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors inline-flex items-center cursor-pointer"
              >
                Inbox
                <span className="absolute -top-1.5 -right-1.5 text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-red-600 text-white shadow-sm">
                  9+
                </span>
              </button>

              <button
                type="button"
                className="relative px-3 py-1.5 rounded-md border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors inline-flex items-center cursor-pointer"
              >
                Profile
                <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-red-600 border-2 border-white dark:border-zinc-900" />
              </button>

              <button
                type="button"
                className="relative px-3 py-1.5 rounded-md border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors inline-flex items-center cursor-pointer"
              >
                Settings
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600 border-2 border-white dark:border-zinc-900" />
                </span>
              </button>

              <button
                type="button"
                className="relative h-9 w-9 rounded-md border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600 border-2 border-white dark:border-zinc-900" />
                </span>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* 4. In a dropdown */}
        <Card>
          <CardHeader>
            <CardTitle>In a dropdown</CardTitle>
            <CardDescription>A badge inside a dropdown item.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-56 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md p-1.5 space-y-1">
              <button
                type="button"
                className="w-full flex items-center justify-between px-3 py-1.5 text-sm rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 transition-colors cursor-pointer"
              >
                <span>Action</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-600 text-white">12</span>
              </button>
              <button
                type="button"
                className="w-full flex items-center justify-between px-3 py-1.5 text-sm rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 transition-colors cursor-pointer"
              >
                <span>Another action</span>
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* 5. On buttons */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>On buttons</CardTitle>
            <CardDescription>Pair any badge color with a button label.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {colors.map((c, i) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => toast.info(`Botão clicado: ${c.name}`)}
                  className="px-3 py-1.5 rounded-md border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors inline-flex items-center cursor-pointer shadow-xs"
                >
                  {c.name} badge
                  <span className={`ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded ${c.bg}`}>
                    {i + 1}
                  </span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 6. Notification dot */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Notification dot</CardTitle>
            <CardDescription>A pill-shaped counter positioned on the corner of a button.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {colors.map((c, i) => (
                <button
                  key={c.name}
                  type="button"
                  className="relative px-3.5 py-2 rounded-md border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer shadow-xs"
                >
                  {c.name} badge
                  <span
                    className={`absolute -top-1.5 -right-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${c.bg} shadow-sm border border-white dark:border-zinc-900`}
                  >
                    {i + 1}
                  </span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 7. Blinking notification */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Blinking notification</CardTitle>
            <CardDescription>
              Add <code className="font-mono text-xs px-1 rounded bg-zinc-100 dark:bg-zinc-800">.badge-blink</code> to draw attention to unread activity.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  className="relative px-3.5 py-2 rounded-md border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer shadow-xs"
                >
                  {c.name} badge
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${c.bg.split(" ")[0]}`} />
                    <span className={`relative inline-flex rounded-full h-2.5 w-2.5 border-2 border-white dark:border-zinc-900 ${c.bg.split(" ")[0]}`} />
                  </span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grid Inferior: Paletas de Cores (Basic, Light, Outline, With icons) */}
      <div className="space-y-6">
        {/* 8. Basic */}
        <Card>
          <CardHeader>
            <CardTitle>Basic</CardTitle>
            <CardDescription>Fill a badge with a theme or extended color.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-2">
              {colors.map((c) => (
                <span
                  key={c.name}
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded shadow-xs ${c.bg}`}
                >
                  {c.name}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 9. Light */}
        <Card>
          <CardHeader>
            <CardTitle>Light</CardTitle>
            <CardDescription>A tinted background for a softer, secondary badge.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-2">
              {colors.map((c) => (
                <span
                  key={c.name}
                  className={`text-xs font-medium px-2.5 py-0.5 rounded ${c.light}`}
                >
                  {c.name}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 10. Outline */}
        <Card>
          <CardHeader>
            <CardTitle>Outline</CardTitle>
            <CardDescription>A colored border with a transparent background.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-2">
              {colors.map((c) => (
                <span
                  key={c.name}
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded border bg-transparent ${c.border}`}
                >
                  {c.name}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 11. With icons */}
        <Card>
          <CardHeader>
            <CardTitle>With icons</CardTitle>
            <CardDescription>Add an icon before the label to reinforce its meaning.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-2">
              {colors.map((c) => (
                <span
                  key={c.name}
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded inline-flex items-center gap-1.5 shadow-xs ${c.bg}`}
                >
                  <Star className="h-3 w-3 fill-current" />
                  {c.name}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
