"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  LayoutGrid,
  Table as TableIcon,
  Search,
  Filter,
  Plus,
  X,
  Building,
  Bed,
  Bath,
  Car,
  Maximize,
  DollarSign,
  User,
  Calendar,
} from "lucide-react";
import { PropertyCard } from "@/components/admin/property-card";
import { PropertyTable } from "@/components/admin/property-table";
import { PropertyGridSkeleton } from "@/components/admin/property-grid-skeleton";
import { PropertyService } from "@/services/property.service";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import { BusinessStatusBadge } from "@/components/ui/badge";
import { formatCurrency, formatArea, formatDate } from "@/lib/utils";
import type { Property, PropertyFilters, PropertyType, PropertyPurpose, PropertyStatus } from "@/types/property";
import { toast } from "sonner";

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Filtros
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<PropertyType | "TODOS">("TODOS");
  const [purposeFilter, setPurposeFilter] = useState<PropertyPurpose | "TODOS">("TODOS");
  const [statusFilter, setStatusFilter] = useState<PropertyStatus | "TODOS">("TODOS");

  async function loadData() {
    setLoading(true);
    try {
      const filters: PropertyFilters = {
        search: search || undefined,
        type: typeFilter,
        purpose: purposeFilter,
        status: statusFilter,
      };
      const res = await PropertyService.list(filters);
      setProperties(res.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [typeFilter, purposeFilter, statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadData();
  };

  const handleClearFilters = () => {
    setSearch("");
    setTypeFilter("TODOS");
    setPurposeFilter("TODOS");
    setStatusFilter("TODOS");
  };

  const hasActiveFilters =
    search !== "" ||
    typeFilter !== "TODOS" ||
    purposeFilter !== "TODOS" ||
    statusFilter !== "TODOS";

  return (
    <div className="space-y-6">
      {/* Header da Página */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-200 pb-5 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Carteira de Imóveis
            </h1>
            <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              {properties.length} imóveis
            </span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Gestão operacional de unidades disponíveis, reservadas e vendidas com filtros em tempo real.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Alternador de Modo de Visualização */}
          <div className="flex items-center rounded-lg border border-zinc-200 bg-white p-0.5 dark:border-zinc-800 dark:bg-zinc-900 shadow-2xs">
            <button
              onClick={() => setViewMode("grid")}
              className={`rounded-md p-1.5 transition-colors cursor-pointer ${
                viewMode === "grid"
                  ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 font-medium"
                  : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
              }`}
              title="Visualização em Grid"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`rounded-md p-1.5 transition-colors cursor-pointer ${
                viewMode === "table"
                  ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 font-medium"
                  : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
              }`}
              title="Visualização em Tabela"
            >
              <TableIcon className="h-4 w-4" />
            </button>
          </div>

          <Link href="/properties/new">
            <Button size="sm">
              <Plus className="h-4 w-4" />
              Novo Imóvel
            </Button>
          </Link>
        </div>
      </div>

      {/* Barra de Filtros Rápidos */}
      <div className="flex flex-col lg:flex-row gap-3 rounded-lg border border-zinc-200 bg-white p-3.5 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
        {/* Campo de Busca Textual */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por código (AP-1082), título ou bairro..."
            className="h-9 w-full rounded-md border border-zinc-200 bg-zinc-50/60 pl-9 pr-4 text-xs transition-colors placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white focus:outline-hidden dark:border-zinc-800 dark:bg-zinc-800/40 dark:text-zinc-100 dark:placeholder:text-zinc-500"
          />
        </form>

        {/* Filtros Suspensos */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Tipo de Imóvel */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="h-9 rounded-md border border-zinc-200 bg-white px-3 text-xs text-zinc-700 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 focus:outline-hidden cursor-pointer"
          >
            <option value="TODOS">Todas as Tipologias</option>
            <option value="APARTAMENTO">Apartamentos</option>
            <option value="CASA">Casas</option>
            <option value="COBERTURA">Coberturas</option>
            <option value="SALA_COMERCIAL">Salas Comerciais</option>
          </select>

          {/* Finalidade (Venda / Locação) */}
          <select
            value={purposeFilter}
            onChange={(e) => setPurposeFilter(e.target.value as any)}
            className="h-9 rounded-md border border-zinc-200 bg-white px-3 text-xs text-zinc-700 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 focus:outline-hidden cursor-pointer"
          >
            <option value="TODOS">Venda & Locação</option>
            <option value="VENDA">Somente Venda</option>
            <option value="LOCACAO">Somente Locação</option>
          </select>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="h-9 rounded-md border border-zinc-200 bg-white px-3 text-xs text-zinc-700 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 focus:outline-hidden cursor-pointer"
          >
            <option value="TODOS">Todos os Status</option>
            <option value="DISPONIVEL">Disponível</option>
            <option value="RESERVADO">Reservado</option>
            <option value="VENDIDO">Vendido</option>
          </select>

          {/* Limpar Filtros */}
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:text-zinc-400 cursor-pointer transition-colors"
            >
              <X className="h-3.5 w-3.5" />
              Limpar
            </button>
          )}
        </div>
      </div>

      {/* Exibição de Conteúdo (Grid ou Tabela) */}
      {loading ? (
        <PropertyGridSkeleton count={6} />
      ) : properties.length === 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-800">
          <Building className="mx-auto h-8 w-8 text-zinc-400" />
          <h3 className="mt-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Nenhum imóvel encontrado
          </h3>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Tente ajustar os filtros selecionados ou limpe a busca.
          </p>
          <Button onClick={handleClearFilters} variant="outline" size="sm" className="mt-4">
            Limpar Filtros
          </Button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {properties.map((p) => (
            <PropertyCard
              key={p.id}
              property={p}
              onSelect={(item) => setSelectedProperty(item)}
            />
          ))}
        </div>
      ) : (
        <PropertyTable
          properties={properties}
          onView={(item) => setSelectedProperty(item)}
          onEdit={(item) => toast.info(`Abertura de edição para o código ${item.code}`)}
        />
      )}

      {/* Drawer Lateral de Detalhes do Imóvel */}
      <Sheet
        open={Boolean(selectedProperty)}
        onOpenChange={(open) => !open && setSelectedProperty(null)}
        title={selectedProperty?.code}
        description={`${selectedProperty?.neighborhood}, ${selectedProperty?.city}`}
      >
        {selectedProperty && (
          <div className="space-y-5 pb-6">
            <div className="aspect-[16/10] w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
              <img
                src={selectedProperty.coverImage}
                alt={selectedProperty.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <BusinessStatusBadge status={selectedProperty.status} />
                <span className="text-xs font-semibold text-zinc-500">
                  {selectedProperty.purpose}
                </span>
              </div>
              <h3 className="mt-2 text-base font-bold text-zinc-900 dark:text-zinc-50">
                {selectedProperty.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                {selectedProperty.description}
              </p>
            </div>

            {/* Ficha Técnica */}
            <div className="rounded-lg border border-zinc-200 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-800/30 space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-500">Valor Pretendido:</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">
                  {formatCurrency(selectedProperty.price)}
                </span>
              </div>
              {selectedProperty.condoFee && (
                <div className="flex justify-between">
                  <span className="text-zinc-500">Taxa de Condomínio:</span>
                  <span className="font-medium">{formatCurrency(selectedProperty.condoFee)}/mês</span>
                </div>
              )}
              {selectedProperty.iptuAnnual && (
                <div className="flex justify-between">
                  <span className="text-zinc-500">IPTU Anual:</span>
                  <span className="font-medium">{formatCurrency(selectedProperty.iptuAnnual)}/ano</span>
                </div>
              )}
              <div className="flex justify-between border-t border-zinc-200 pt-2 dark:border-zinc-700">
                <span className="text-zinc-500">Área Privativa / Total:</span>
                <span className="font-medium">
                  {formatArea(selectedProperty.usableArea)} / {formatArea(selectedProperty.totalArea)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Dormitórios (Suítes):</span>
                <span className="font-medium">
                  {selectedProperty.bedrooms} ({selectedProperty.suites} suítes)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Vagas de Garagem:</span>
                <span className="font-medium">{selectedProperty.parkingSpaces} vagas</span>
              </div>
            </div>

            {/* Características */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Diferenciais do Imóvel
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedProperty.features.map((f, i) => (
                  <span
                    key={i}
                    className="rounded-md border border-zinc-200 bg-white px-2 py-1 text-xs text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Gestão */}
            <div className="border-t border-zinc-200 pt-4 dark:border-zinc-800 text-xs text-zinc-500 space-y-1">
              <p>Corretor responsável: <strong className="text-zinc-800 dark:text-zinc-200">{selectedProperty.brokerName}</strong></p>
              <p>Proprietário: <strong className="text-zinc-800 dark:text-zinc-200">{selectedProperty.ownerName}</strong></p>
              <p>Última atualização: {formatDate(selectedProperty.updatedAt)}</p>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                variant="primary"
                className="flex-1"
                onClick={() => toast.success("Link público do anúncio copiado para o clipboard!")}
              >
                Compartilhar Anúncio
              </Button>
            </div>
          </div>
        )}
      </Sheet>
    </div>
  );
}
