"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Quote, BookOpen, Check } from "lucide-react";

export function TablerTypography() {
  return (
    <div className="space-y-6">
      {/* 1. Complete Editorial Prose Article (Tabler Standard) */}
      <Card>
        <CardHeader>
          <CardTitle>Tabler Typography & Editorial Prose</CardTitle>
          <CardDescription>
            Typographic scale, hierarchy, drop caps, blockquotes, code blocks, lists, and caption figures.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <article className="max-w-3xl mx-auto space-y-6 text-zinc-800 dark:text-zinc-200 leading-relaxed text-sm">
            {/* Title & Lead */}
            <div className="space-y-2 border-b border-zinc-200 dark:border-zinc-800 pb-4">
              <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
                O Futuro da Arquitetura de Alto Padrão e Inteligência Artificial
              </h1>
              <p className="text-base text-zinc-500 dark:text-zinc-400 font-normal leading-normal">
                Investimentos imobiliários contemporâneos não dependem apenas de localização privilegiada — exigem <mark className="bg-amber-200 dark:bg-amber-900/60 dark:text-amber-200 px-1 rounded">precisão analítica</mark> e eficiência construtiva sustentável.
              </p>
            </div>

            {/* Drop Cap Paragraph */}
            <p className="first-letter:float-left first-letter:text-5xl first-letter:pr-3 first-letter:font-extrabold first-letter:text-blue-600 first-letter:leading-none text-justify">
              A evolução das grandes metrópoles brasileiras acelerou a demanda por empreendimentos multifuncionais com certificações ambientais LEED e sistemas prediais integrados por IoT. Compradores qualificados buscam unidades que equilibrem segurança privativa e sustentabilidade com retorno de capital acima do CDI.
            </p>

            {/* Figure with Caption */}
            <figure className="my-6 space-y-2">
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
                alt="Mansão Contemporânea"
                className="w-full h-72 object-cover rounded-xl shadow-md"
              />
              <figcaption className="text-xs text-center text-zinc-400 italic">
                Residência contemporânea no Jardim Europa com aproveitamento solar e reuso de águas pluviais.
              </figcaption>
            </figure>

            {/* Blockquote with Citation */}
            <blockquote className="border-l-4 border-blue-600 pl-4 py-2 italic text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-900/60 rounded-r-lg">
              <p className="text-sm">
                &ldquo;A digitalização do processo cartorário e o cruzamento de dados com IA reduzem o tempo médio de fechamento de contratos de 45 dias para menos de 72 horas.&rdquo;
              </p>
              <cite className="block text-xs font-semibold not-italic text-zinc-500 mt-1">
                — Davis Vasconcellos, Gestor de Tecnologia Imobiliária
              </cite>
            </blockquote>

            {/* Headings Hierarchy Showcase */}
            <div className="space-y-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                H2: Análise Macroeconômica do Setor
              </h2>
              <p>
                As taxas de juros e a liquidez nos fundos imobiliários ditam o ritmo dos lançamentos nas capitais.
              </p>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                H3: Bairros com Maior Valorização por m²
              </h3>
              <p>
                Regiões como Itaim Bibi, Jardins e Vila Nova Conceição mantêm preços médios superiores a R$ 25.000/m².
              </p>
            </div>

            {/* Code Block */}
            <div className="space-y-1 pt-2">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Exemplo de Resposta do Agente RAG
              </span>
              <pre className="p-4 rounded-xl bg-zinc-950 text-emerald-400 font-mono text-xs overflow-x-auto">
{`{
  "imovel_id": "SP-JARDINS-104",
  "vgv_estimado": 5800000,
  "zoneamento": "ZEU",
  "coeficiente_aproveitamento": 4.0,
  "regularidade_juridica": "100% Homologado"
}`}
              </pre>
            </div>
          </article>
        </CardContent>
      </Card>
    </div>
  );
}
