"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  Check,
  X,
  Star,
  Shield,
  Zap,
  Mail,
  Phone,
  MapPin,
  Globe,
  Plus,
  RefreshCw,
  Bug,
  Trash2,
  Lock,
  Sparkles,
} from "lucide-react";

export function TablerIconLists() {
  const [pwd, setPwd] = useState("Imob@2026Master");

  const pwdLengthValid = pwd.length >= 8;
  const pwdNumberValid = /\d/.test(pwd);
  const pwdSpecialValid = /[@$!%*?&#]/.test(pwd);
  const pwdUpperValid = /[A-Z]/.test(pwd);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1. Color */}
        <Card>
          <CardHeader>
            <CardTitle>Color</CardTitle>
            <CardDescription>Color all markers with an accent utility.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-zinc-800 dark:text-zinc-200">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-blue-600 shrink-0" />
                <span>Unlimited API requests</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-blue-600 shrink-0" />
                <span>Vector embeddings index</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-blue-600 shrink-0" />
                <span>WhatsApp channel sync</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* 2. Different icons */}
        <Card>
          <CardHeader>
            <CardTitle>Different icons</CardTitle>
            <CardDescription>Each entry can use its own icon and color, for example a status.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-zinc-800 dark:text-zinc-200">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Operational server</span>
              </li>
              <li className="flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-500 fill-current shrink-0" />
                <span>Featured real estate unit</span>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-600 shrink-0" />
                <span>Encrypted credentials</span>
              </li>
              <li className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-purple-600 fill-current shrink-0" />
                <span>High-speed query engine</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* 3. Included and excluded */}
        <Card>
          <CardHeader>
            <CardTitle>Included and excluded</CardTitle>
            <CardDescription>A check for what the plan has and a muted cross for what it lacks.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-medium">
                <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Up to 10 team members</span>
              </li>
              <li className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-medium">
                <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Real-time webhook notifications</span>
              </li>
              <li className="flex items-center gap-2 text-zinc-400 dark:text-zinc-500 line-through">
                <X className="h-4 w-4 text-zinc-400 shrink-0" />
                <span>Dedicated cloud cluster</span>
              </li>
              <li className="flex items-center gap-2 text-zinc-400 dark:text-zinc-500 line-through">
                <X className="h-4 w-4 text-zinc-400 shrink-0" />
                <span>Custom SLA 99.99%</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* 4. Inline */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Inline</CardTitle>
            <CardDescription>
              Add <code className="font-mono text-xs px-1 rounded bg-zinc-100 dark:bg-zinc-800">.list-icon-inline</code> to show short entries in a row that wraps.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              <li className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-blue-600" /> Piscina Aquecida
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-blue-600" /> Spa Privativo
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-blue-600" /> 4 Vagas Cobertas
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-blue-600" /> Automação Lutron
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-blue-600" /> Vista Mar
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-blue-600" /> Gerador Full
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* 5. Long entries */}
        <Card>
          <CardHeader>
            <CardTitle>Long entries</CardTitle>
            <CardDescription>The marker stays on the first line when an entry wraps.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-zinc-800 dark:text-zinc-200">
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>
                  Todos os contratos são registrados com assinatura eletrônica e certificado digital padrão ICP-Brasil.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>
                  Integração nativa com portais imobiliários ZAP, VivaReal e OLX via feed XML automatizado a cada 30 minutos.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* 6. Small text */}
        <Card>
          <CardHeader>
            <CardTitle>Small text</CardTitle>
            <CardDescription>The marker follows the line height of the list, so it fits small or large text.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
              <li className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                <span>Validade da proposta: 5 dias úteis</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                <span>Taxa de administração: 8% a.m.</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                <span>Garantia locatícia: Seguro Fiança</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* 7. Pros and cons */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Pros and cons</CardTitle>
            <CardDescription>Two lists side by side, green checks against red crosses.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-3.5 rounded-lg border border-emerald-200 dark:border-emerald-950/60 bg-emerald-50/50 dark:bg-emerald-950/20">
                <h5 className="font-semibold text-sm text-emerald-900 dark:text-emerald-200 mb-2">Vantagens (Pros)</h5>
                <ul className="space-y-1.5 text-xs text-emerald-800 dark:text-emerald-300/90">
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" /> Localização nobre no quadrilátero
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" /> Acabamentos em mármore importado
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" /> Elevador com biometria privativo
                  </li>
                </ul>
              </div>

              <div className="p-3.5 rounded-lg border border-rose-200 dark:border-rose-950/60 bg-rose-50/50 dark:bg-rose-950/20">
                <h5 className="font-semibold text-sm text-rose-900 dark:text-rose-200 mb-2">Restrições (Cons)</h5>
                <ul className="space-y-1.5 text-xs text-rose-800 dark:text-rose-300/90">
                  <li className="flex items-center gap-2">
                    <X className="h-3.5 w-3.5 text-rose-600 shrink-0" /> Não permite animais de grande porte
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="h-3.5 w-3.5 text-rose-600 shrink-0" /> Sem vagas extras para visitantes
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="h-3.5 w-3.5 text-rose-600 shrink-0" /> Horário restrito para obras
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grid 2: Password, Release Notes, Contact, Entries with description */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 8. Password requirements */}
        <Card>
          <CardHeader>
            <CardTitle>Password requirements</CardTitle>
            <CardDescription>A checklist under a form field, each rule marked as met or not.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <input
              type="text"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800"
            />
            <ul className="space-y-1.5 text-xs">
              <li className={`flex items-center gap-2 ${pwdLengthValid ? "text-emerald-600 font-medium" : "text-zinc-400"}`}>
                {pwdLengthValid ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                <span>Mínimo 8 caracteres</span>
              </li>
              <li className={`flex items-center gap-2 ${pwdNumberValid ? "text-emerald-600 font-medium" : "text-zinc-400"}`}>
                {pwdNumberValid ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                <span>Pelo menos um número</span>
              </li>
              <li className={`flex items-center gap-2 ${pwdUpperValid ? "text-emerald-600 font-medium" : "text-zinc-400"}`}>
                {pwdUpperValid ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                <span>Letra maiúscula</span>
              </li>
              <li className={`flex items-center gap-2 ${pwdSpecialValid ? "text-emerald-600 font-medium" : "text-zinc-400"}`}>
                {pwdSpecialValid ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                <span>Caractere especial (@, $, !, %)</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* 9. Release notes */}
        <Card>
          <CardHeader>
            <CardTitle>Release notes</CardTitle>
            <CardDescription>An icon per kind of change: added, improved, fixed, removed.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-xs text-zinc-800 dark:text-zinc-200">
              <li className="flex items-center gap-2">
                <span className="p-1 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                  <Plus className="h-3 w-3" />
                </span>
                <span>[Added] Integração Evolution API v2</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="p-1 rounded bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                  <RefreshCw className="h-3 w-3" />
                </span>
                <span>[Improved] Reindexação vetorial RAG</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="p-1 rounded bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
                  <Bug className="h-3 w-3" />
                </span>
                <span>[Fixed] Erro de render em carrossel</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="p-1 rounded bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">
                  <Trash2 className="h-3 w-3" />
                </span>
                <span>[Removed] Dependências depreciadas</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* 10. Contact details */}
        <Card>
          <CardHeader>
            <CardTitle>Contact details</CardTitle>
            <CardDescription>Icons as markers for a list of links.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2.5 text-xs text-zinc-700 dark:text-zinc-300">
              <li className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                <Mail className="h-3.5 w-3.5 text-zinc-400" />
                <a href="mailto:contato@msfimoveis.com.br">contato@msfimoveis.com.br</a>
              </li>
              <li className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                <Phone className="h-3.5 w-3.5 text-zinc-400" />
                <a href="tel:+5511999998888">+55 (11) 99999-8888</a>
              </li>
              <li className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                <MapPin className="h-3.5 w-3.5 text-zinc-400" />
                <span>Av. Brigadeiro Faria Lima, 3477</span>
              </li>
              <li className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                <Globe className="h-3.5 w-3.5 text-zinc-400" />
                <a href="#" className="underline">www.msfimoveis.com.br</a>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* 11. Entries with a description */}
        <Card>
          <CardHeader>
            <CardTitle>Entries with a description</CardTitle>
            <CardDescription>Title and a muted second line in each entry.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <h6 className="font-semibold text-zinc-900 dark:text-zinc-100">Backup em Nuvem Diário</h6>
                  <p className="text-zinc-500 text-[11px] mt-0.5">Snapshots automáticos no Amazon S3 com versionamento.</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <h6 className="font-semibold text-zinc-900 dark:text-zinc-100">Criptografia Ponta a Ponta</h6>
                  <p className="text-zinc-500 text-[11px] mt-0.5">Chaves AES-256 geradas no cofre confidencial.</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Grid 3: Plans Free vs Pro (Pricing Comparison) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 14. Free Plan */}
        <Card>
          <CardHeader>
            <CardTitle>Plano Start (Free)</CardTitle>
            <CardDescription>Para corretores autônomos iniciando na esteira digital.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">
              R$ 0 <span className="text-xs text-zinc-500 font-normal">/ mês</span>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200">
                <Check className="h-4 w-4 text-emerald-600 shrink-0" /> Até 25 imóveis cadastrados
              </li>
              <li className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200">
                <Check className="h-4 w-4 text-emerald-600 shrink-0" /> 1 usuário administrador
              </li>
              <li className="flex items-center gap-2 text-zinc-400 line-through">
                <X className="h-4 w-4 text-zinc-400 shrink-0" /> IA RAG com consulta a documentos PDF
              </li>
              <li className="flex items-center gap-2 text-zinc-400 line-through">
                <X className="h-4 w-4 text-zinc-400 shrink-0" /> Disparo automático via WhatsApp
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* 15. Pro Plan */}
        <Card className="border-blue-500 dark:border-blue-600 relative overflow-hidden shadow-md">
          <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl">
            POPULAR
          </div>
          <CardHeader>
            <CardTitle className="text-blue-600 dark:text-blue-400">Plano Imobiliária Pro</CardTitle>
            <CardDescription>Ecossistema completo com IA, RAG e WhatsApp multicanal.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">
              R$ 499 <span className="text-xs text-zinc-500 font-normal">/ mês</span>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200 font-medium">
                <Check className="h-4 w-4 text-emerald-600 shrink-0" /> Imóveis e leads ilimitados
              </li>
              <li className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200 font-medium">
                <Check className="h-4 w-4 text-emerald-600 shrink-0" /> Até 15 corretores na equipe
              </li>
              <li className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200 font-medium">
                <Check className="h-4 w-4 text-emerald-600 shrink-0" /> Laboratório IA RAG com Google Drive
              </li>
              <li className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200 font-medium">
                <Check className="h-4 w-4 text-emerald-600 shrink-0" /> Integração Evolution API WhatsApp
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
