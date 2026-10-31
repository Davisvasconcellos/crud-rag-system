"use client";

import React, { useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Sparkles, Play, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface ConfettiParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

export function TablerConfetti() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const targetBoxRef = useRef<HTMLDivElement | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const defaultColors = ["#066fd1", "#d63939", "#2fb344", "#f59f00", "#ae3ec9", "#f76707"];
  const sunsetColors = ["#ff4e50", "#f9d423", "#e100ff", "#ff8008"];
  const mintColors = ["#00b09b", "#96c93d", "#20bf6b", "#0fb9b1"];

  const launchConfetti = ({
    count = 120,
    durationMs = 2500,
    colors = defaultColors,
    speedFactor = 1,
    inTarget = false,
  }: {
    count?: number;
    durationMs?: number;
    colors?: string[];
    speedFactor?: number;
    inTarget?: boolean;
  }) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Sizing
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let originX = canvas.width / 2;
    let originY = canvas.height * 0.4;

    if (inTarget && targetBoxRef.current) {
      const rect = targetBoxRef.current.getBoundingClientRect();
      originX = rect.left + rect.width / 2;
      originY = rect.top + rect.height / 2;
    }

    const particles: ConfettiParticle[] = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = (Math.random() * 8 + 3) * speedFactor;
      particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 3 * speedFactor,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        opacity: 1,
      });
    }

    setIsRunning(true);
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15 * speedFactor; // gravity
        p.rotation += p.rotationSpeed;
        p.opacity = Math.max(0, 1 - progress);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setIsRunning(false);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div className="space-y-6">
      {/* Canvas Global para partículas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-50 h-full w-full"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Amount and length */}
        <Card>
          <CardHeader>
            <CardTitle>Amount and length</CardTitle>
            <CardDescription>
              Set <code className="font-mono text-xs px-1 rounded bg-zinc-100 dark:bg-zinc-800">data-bs-count</code> for the number of pieces and <code className="font-mono text-xs px-1 rounded bg-zinc-100 dark:bg-zinc-800">data-bs-duration</code> for how long they keep pouring, in milliseconds.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => {
                  launchConfetti({ count: 80, durationMs: 1500 });
                  toast.success("Disparo: 80 peças • 1.5s");
                }}
                className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium text-xs hover:bg-blue-700 transition-colors cursor-pointer"
              >
                80 peças • 1.5s
              </button>
              <button
                type="button"
                onClick={() => {
                  launchConfetti({ count: 200, durationMs: 3000 });
                  toast.success("Disparo: 200 peças • 3.0s");
                }}
                className="px-4 py-2 rounded-md bg-indigo-600 text-white font-medium text-xs hover:bg-indigo-700 transition-colors cursor-pointer"
              >
                200 peças • 3.0s
              </button>
              <button
                type="button"
                onClick={() => {
                  launchConfetti({ count: 450, durationMs: 5000 });
                  toast.success("Disparo: 450 peças • 5.0s");
                }}
                className="px-4 py-2 rounded-md bg-purple-600 text-white font-medium text-xs hover:bg-purple-700 transition-colors cursor-pointer"
              >
                450 peças • 5.0s (Mega Burst)
              </button>
            </div>
          </CardContent>
        </Card>

        {/* 2. Colors */}
        <Card>
          <CardHeader>
            <CardTitle>Colors</CardTitle>
            <CardDescription>
              By default the pieces use the Tabler palette. Pass a custom palette to celebrate your brand.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => {
                  launchConfetti({ colors: defaultColors });
                  toast.info("Paleta: Tabler Standard");
                }}
                className="px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 font-medium text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Tabler Standard
              </button>
              <button
                type="button"
                onClick={() => {
                  launchConfetti({ colors: sunsetColors });
                  toast.info("Paleta: Sunset Gold");
                }}
                className="px-4 py-2 rounded-md bg-gradient-to-r from-amber-500 to-rose-500 text-white font-medium text-xs hover:opacity-90 transition-opacity cursor-pointer"
              >
                Sunset Gold
              </button>
              <button
                type="button"
                onClick={() => {
                  launchConfetti({ colors: mintColors });
                  toast.info("Paleta: Mint Forest");
                }}
                className="px-4 py-2 rounded-md bg-emerald-600 text-white font-medium text-xs hover:bg-emerald-700 transition-colors cursor-pointer"
              >
                Mint Emerald
              </button>
            </div>
          </CardContent>
        </Card>

        {/* 3. Speed */}
        <Card>
          <CardHeader>
            <CardTitle>Speed</CardTitle>
            <CardDescription>
              Set <code className="font-mono text-xs px-1 rounded bg-zinc-100 dark:bg-zinc-800">data-bs-speed</code> to scale the fall. 1 is default, lower floats, higher drops.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => {
                  launchConfetti({ speedFactor: 0.5, durationMs: 4000 });
                  toast.info("Velocidade: Suave / Flutuante (0.5x)");
                }}
                className="px-4 py-2 rounded-md bg-sky-500 text-white font-medium text-xs hover:bg-sky-600 transition-colors cursor-pointer"
              >
                Flutuante Leve (0.5x)
              </button>
              <button
                type="button"
                onClick={() => {
                  launchConfetti({ speedFactor: 1.0 });
                  toast.info("Velocidade: Padrão (1.0x)");
                }}
                className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium text-xs hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Padrão (1.0x)
              </button>
              <button
                type="button"
                onClick={() => {
                  launchConfetti({ speedFactor: 2.2, durationMs: 1800 });
                  toast.info("Velocidade: Rápida / Impacto (2.2x)");
                }}
                className="px-4 py-2 rounded-md bg-rose-600 text-white font-medium text-xs hover:bg-rose-700 transition-colors cursor-pointer"
              >
                Explosão Rápida (2.2x)
              </button>
            </div>
          </CardContent>
        </Card>

        {/* 4. Target and events */}
        <Card>
          <CardHeader>
            <CardTitle>Target and events</CardTitle>
            <CardDescription>
              Point at another element to fire the celebration centered on a specific component.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div
              ref={targetBoxRef}
              className="p-4 rounded-lg border-2 border-dashed border-blue-400 bg-blue-50/50 dark:bg-blue-950/20 text-center"
            >
              <p className="text-xs font-semibold text-blue-900 dark:text-blue-200">
                Alvo Especificado: #target-celebration-box
              </p>
              <button
                type="button"
                onClick={() => {
                  launchConfetti({ inTarget: true, count: 100 });
                  toast.success("Confetti disparado a partir do alvo!");
                }}
                className="mt-2.5 px-3.5 py-1.5 rounded-md bg-blue-600 text-white font-medium text-xs hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Disparar no Alvo
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 5. From JavaScript */}
      <Card>
        <CardHeader>
          <CardTitle>From JavaScript</CardTitle>
          <CardDescription>
            Call <code className="font-mono text-xs px-1 rounded bg-zinc-100 dark:bg-zinc-800">burst()</code> on a Confetti instance when something finishes, for example a form that was saved or a contract signed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Simulação: Fechamento de Venda Imobiliária
                </h4>
                <p className="text-xs text-zinc-500">
                  Clique no botão para simular a conclusão do fluxo operacional com celebração visual.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                launchConfetti({ count: 250, durationMs: 3500 });
                toast.success("Proposta do Edifício Lumina homologada com sucesso!", {
                  description: "Comissão creditada e contrato assinado digitalmente.",
                });
              }}
              className="px-5 py-2.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              Concluir & Celebrar
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
