"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  Activity,
  Edit,
  LogOut,
  Settings,
  Search,
  Bell,
  User,
  Heart,
  ChevronRight,
  Shield,
  Check,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

export function TablerDropdowns() {
  const [radioVal, setRadioVal] = useState("radio-1");
  const [checkVal, setCheckVal] = useState(true);
  const [switchVal, setSwitchVal] = useState(true);
  const [profilePublic, setProfilePublic] = useState(false);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Dropdowns</CardTitle>
          <CardDescription>
            Dropdown menus for actions, filters, and selections, displayed open here for interactive exploration and visual reference.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            {/* Coluna 1: Showcase Completo com Controles Form */}
            <div className="space-y-6">
              <div className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md p-1.5 space-y-1">
                <span className="block px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Dropdown header
                </span>

                <button
                  type="button"
                  onClick={() => toast.info("Item 1 clicado")}
                  className="w-full flex items-center gap-2.5 px-3 py-1.5 text-sm rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 transition-colors cursor-pointer"
                >
                  <Activity className="h-4 w-4 text-zinc-500" />
                  <span>Item 1</span>
                </button>

                <button
                  type="button"
                  onClick={() => toast.info("Item 2 clicado")}
                  className="w-full flex items-center gap-2.5 px-3 py-1.5 text-sm rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 transition-colors cursor-pointer"
                >
                  <Edit className="h-4 w-4 text-zinc-500" />
                  <span>Item 2</span>
                </button>

                {/* Switch interno */}
                <div className="flex items-center justify-between px-3 py-1.5 text-sm text-zinc-800 dark:text-zinc-200">
                  <span>My profile</span>
                  <label className="flex items-center gap-1.5 text-xs text-zinc-500 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profilePublic}
                      onChange={(e) => setProfilePublic(e.target.checked)}
                      className="rounded accent-blue-600"
                    />
                    Public
                  </label>
                </div>

                {/* Radio input */}
                <label className="flex items-center gap-2.5 px-3 py-1.5 text-sm text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded cursor-pointer">
                  <input
                    type="radio"
                    name="drop-demo-radio"
                    checked={radioVal === "radio-1"}
                    onChange={() => setRadioVal("radio-1")}
                    className="accent-blue-600"
                  />
                  <span>Radio input</span>
                </label>

                {/* Checkbox input */}
                <label className="flex items-center gap-2.5 px-3 py-1.5 text-sm text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checkVal}
                    onChange={(e) => setCheckVal(e.target.checked)}
                    className="rounded accent-blue-600"
                  />
                  <span>Checkbox input</span>
                </label>

                {/* Form switch */}
                <div className="flex items-center justify-between px-3 py-1.5 text-sm text-zinc-800 dark:text-zinc-200">
                  <span>Notificações push</span>
                  <button
                    type="button"
                    onClick={() => setSwitchVal(!switchVal)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                      switchVal ? "bg-blue-600" : "bg-zinc-300 dark:bg-zinc-700"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        switchVal ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                <div className="my-1 border-t border-zinc-100 dark:border-zinc-800" />

                <button
                  type="button"
                  className="w-full text-left px-3 py-1.5 text-sm rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 cursor-pointer"
                >
                  Dropdown item 1
                </button>
                <button
                  type="button"
                  disabled
                  className="w-full text-left px-3 py-1.5 text-sm rounded text-zinc-400 dark:text-zinc-600 cursor-not-allowed opacity-60"
                >
                  Dropdown disabled
                </button>
                <button
                  type="button"
                  className="w-full text-left px-3 py-1.5 text-sm rounded bg-blue-600 text-white font-medium cursor-pointer"
                >
                  Dropdown active
                </button>

                <div className="my-1 border-t border-zinc-100 dark:border-zinc-800" />

                {/* Avatares */}
                <button
                  type="button"
                  className="w-full flex items-center gap-2.5 px-3 py-1.5 text-sm rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 cursor-pointer"
                >
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                    alt=""
                    className="h-5 w-5 rounded object-cover"
                  />
                  <span>Paweł Kuna</span>
                </button>
                <button
                  type="button"
                  className="w-full flex items-center gap-2.5 px-3 py-1.5 text-sm rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 cursor-pointer"
                >
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                    alt=""
                    className="h-5 w-5 rounded object-cover"
                  />
                  <span>Jeffie Lewzey</span>
                </button>

                <div className="my-1 border-t border-zinc-100 dark:border-zinc-800" />

                <button
                  type="button"
                  onClick={() => toast.error("Logout efetuado")}
                  className="w-full flex items-center gap-2.5 px-3 py-1.5 text-sm rounded text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {/* Coluna 2: Menus Simples & Ações */}
            <div className="space-y-4">
              <div className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md p-1.5 space-y-1">
                <button
                  type="button"
                  className="w-full text-left px-3 py-1.5 text-sm rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 cursor-pointer"
                >
                  Action
                </button>
                <button
                  type="button"
                  className="w-full text-left px-3 py-1.5 text-sm rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 cursor-pointer"
                >
                  Another action
                </button>
              </div>

              <div className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md p-1.5 space-y-1">
                <button
                  type="button"
                  className="w-full text-left px-3 py-1.5 text-sm rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 cursor-pointer"
                >
                  Action
                </button>
                <button
                  type="button"
                  className="w-full text-left px-3 py-1.5 text-sm rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 cursor-pointer"
                >
                  Another action
                </button>
                <div className="my-1 border-t border-zinc-100 dark:border-zinc-800" />
                <button
                  type="button"
                  className="w-full text-left px-3 py-1.5 text-sm rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 cursor-pointer"
                >
                  Separated link
                </button>
              </div>

              <div className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md p-1.5 space-y-1">
                <span className="block px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Settings header
                </span>
                <button
                  type="button"
                  className="w-full flex items-center gap-2.5 px-3 py-1.5 text-sm rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 cursor-pointer"
                >
                  <Settings className="h-4 w-4 text-zinc-500" />
                  <span>Action</span>
                </button>
                <button
                  type="button"
                  className="w-full text-left px-3 py-1.5 text-sm rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 cursor-pointer"
                >
                  Another action
                </button>
              </div>
            </div>

            {/* Coluna 3: Badges, Busca & Menu Dark */}
            <div className="space-y-4">
              {/* Menu com badges */}
              <div className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md p-1.5 space-y-1">
                <button
                  type="button"
                  className="w-full flex items-center justify-between px-3 py-1.5 text-sm rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 cursor-pointer"
                >
                  <span>Mensagens</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-600 text-white">4</span>
                </button>
                <button
                  type="button"
                  className="w-full flex items-center justify-between px-3 py-1.5 text-sm rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 cursor-pointer"
                >
                  <span>Novo Lead</span>
                  <span className="text-xs font-semibold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                    Novo
                  </span>
                </button>
              </div>

              {/* Menu com busca interna */}
              <div className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md p-2 space-y-2">
                <div className="relative">
                  <Search className="h-3.5 w-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Filtrar opções..."
                    className="w-full pl-8 pr-2.5 py-1 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-0.5">
                  <button
                    type="button"
                    className="w-full text-left px-2.5 py-1.5 text-xs rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 cursor-pointer"
                  >
                    Edifício Lumina
                  </button>
                  <button
                    type="button"
                    className="w-full text-left px-2.5 py-1.5 text-xs rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 cursor-pointer"
                  >
                    Residencial Alphaville
                  </button>
                </div>
              </div>

              {/* Menu Dark */}
              <div className="w-full rounded-lg border border-zinc-800 bg-zinc-950 text-white shadow-lg p-1.5 space-y-1">
                <span className="block px-3 py-1 text-xs font-semibold text-zinc-500 uppercase">
                  Dark Menu
                </span>
                <button
                  type="button"
                  className="w-full text-left px-3 py-1.5 text-sm rounded hover:bg-zinc-800 text-zinc-200 cursor-pointer"
                >
                  Painel de Controle
                </button>
                <button
                  type="button"
                  className="w-full text-left px-3 py-1.5 text-sm rounded bg-blue-600 text-white cursor-pointer"
                >
                  Segurança Ativa
                </button>
                <button
                  type="button"
                  className="w-full text-left px-3 py-1.5 text-sm rounded hover:bg-zinc-800 text-zinc-400 cursor-pointer"
                >
                  Logs de Acesso
                </button>
              </div>
            </div>

            {/* Coluna 4: Card Dropdown & User Profile Dropdown */}
            <div className="space-y-4">
              {/* Card Dropdown com Seta */}
              <div className="relative w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md p-3 space-y-2">
                <div className="flex items-center gap-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                    alt=""
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <h5 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Paweł Kuna</h5>
                    <p className="text-xs text-zinc-500">Diretor de Vendas</p>
                  </div>
                </div>

                <div className="border-t border-zinc-100 dark:border-zinc-800 pt-2 space-y-1">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 cursor-pointer"
                  >
                    <span>Configurações</span>
                    <Settings className="h-3.5 w-3.5 text-zinc-400" />
                  </button>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 cursor-pointer"
                  >
                    <span>Ajuda & Suporte</span>
                    <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
