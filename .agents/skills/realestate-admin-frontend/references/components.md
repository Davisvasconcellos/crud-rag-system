# Blueprints de Componentes Administrativos para Imobiliária

Componentes desenhados especificamente para o ecossistema imobiliário com alta densidade informativa, acessibilidade e performance nativa.

---

## 1. Card de Métrica Operacional (`MetricCard`)

Evita cards infantis coloridos; usa tipografia clara, comparação percentual de período e micro-gráficos/badges textuais objetivos.

```tsx
// src/components/admin/metric-card.tsx
import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  description?: string;
  change?: number; // Ex: +12.4% ou -3.1%
  periodLabel?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  description,
  change,
  periodLabel = 'vs. mês anterior',
}) => {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-500 uppercase tracking-wide dark:text-zinc-400">
          {title}
        </span>
        {change !== undefined && (
          <span
            className={`inline-flex items-center gap-0.5 text-xs font-semibold ${
              isPositive
                ? 'text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/40'
                : isNegative
                ? 'text-rose-700 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/40'
                : 'text-zinc-600 bg-zinc-100 dark:text-zinc-400 dark:bg-zinc-800'
            } px-2 py-0.5 rounded-full`}
          >
            {isPositive && <ArrowUpRight className="h-3 w-3" />}
            {isNegative && <ArrowDownRight className="h-3 w-3" />}
            {!isPositive && !isNegative && <Minus className="h-3 w-3" />}
            {Math.abs(change)}%
          </span>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {value}
        </span>
      </div>

      {(description || periodLabel) && (
        <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">
          {description ?? periodLabel}
        </p>
      )}
    </div>
  );
};
```

---

## 2. Card de Imóvel para Vitrine Administrativa (`PropertyCard`)

Apresenta as especificações indispensáveis de corretagem (área privativa, quartos, suítes, vagas, condomínio, IPTU e corretor responsável).

```tsx
// src/components/admin/property-card.tsx
import React from 'react';
import Image from 'next/image';
import { Bed, Bath, Car, Maximize, MapPin } from 'lucide-react';
import type { Property } from '@/types/property';

interface PropertyCardProps {
  property: Property;
  onSelect?: (id: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onSelect }) => {
  const statusStyles: Record<Property['status'], string> = {
    DISPONIVEL: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
    RESERVADO: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
    VENDIDO: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800',
    INATIVO: 'bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700',
  };

  return (
    <div
      onClick={() => onSelect?.(property.id)}
      className="group relative cursor-pointer overflow-hidden rounded-lg border border-zinc-200 bg-white transition-all hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
    >
      {/* Imagem de Capa com Badge */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <img
          src={property.coverImage || '/placeholder-property.jpg'}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-102"
          loading="lazy"
        />
        <div className="absolute top-2.5 left-2.5 flex gap-1.5">
          <span className={`rounded-md border px-2 py-0.5 text-xs font-semibold ${statusStyles[property.status]}`}>
            {property.status}
          </span>
          <span className="rounded-md border border-zinc-200/90 bg-white/90 px-2 py-0.5 text-xs font-medium text-zinc-800 backdrop-blur-xs dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-200">
            {property.type}
          </span>
        </div>
        <div className="absolute bottom-2.5 right-2.5 rounded bg-zinc-900/80 px-2 py-0.5 font-mono text-xs text-white">
          {property.code}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="line-clamp-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {property.title}
            </h3>
            <p className="mt-1 flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="line-clamp-1">{property.neighborhood}, {property.city}</span>
            </p>
          </div>
        </div>

        {/* Especificações Técnicas */}
        <div className="mt-3.5 grid grid-cols-4 gap-1 border-y border-zinc-100 py-2.5 text-xs text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
          <div className="flex items-center gap-1.5" title="Área Útil">
            <Maximize className="h-3.5 w-3.5 text-zinc-400" />
            <span>{property.usableArea} m²</span>
          </div>
          <div className="flex items-center gap-1.5" title="Quartos (Suítes)">
            <Bed className="h-3.5 w-3.5 text-zinc-400" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1.5" title="Banheiros">
            <Bath className="h-3.5 w-3.5 text-zinc-400" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1.5" title="Vagas">
            <Car className="h-3.5 w-3.5 text-zinc-400" />
            <span>{property.parkingSpaces}</span>
          </div>
        </div>

        {/* Preço e Detalhes Financeiros */}
        <div className="mt-3 flex items-baseline justify-between">
          <div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 block">
              {property.purpose === 'VENDA' ? 'Venda' : 'Aluguel / mês'}
            </span>
            <span className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(property.price)}
            </span>
          </div>
          {property.condoFee && (
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Cond. {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(property.condoFee)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
```

---

## 3. Tabela Administrativa Otimizada com Filtros Rápidos (`PropertyTable`)

Projetada com largura de colunas otimizada, paginação minimalista e sem renderizações redundantes.

```tsx
// src/components/admin/property-table.tsx
import React from 'react';
import type { Property } from '@/types/property';
import { Eye, Edit2, MoreHorizontal } from 'lucide-react';

interface PropertyTableProps {
  properties: Property[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
}

export const PropertyTable: React.FC<PropertyTableProps> = ({ properties, onView, onEdit }) => {
  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-zinc-600 dark:text-zinc-300">
          <thead className="border-b border-zinc-200 bg-zinc-50/75 text-xs font-semibold text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-300">
            <tr>
              <th className="py-3 px-4">Código</th>
              <th className="py-3 px-4">Imóvel & Localização</th>
              <th className="py-3 px-4">Tipo / Finalidade</th>
              <th className="py-3 px-4">Área / Config.</th>
              <th className="py-3 px-4">Valor</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {properties.map((p) => (
              <tr key={p.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40 transition-colors">
                <td className="py-3 px-4 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                  {p.code}
                </td>
                <td className="py-3 px-4">
                  <div className="font-medium text-zinc-900 dark:text-zinc-100 line-clamp-1">{p.title}</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">{p.neighborhood}, {p.city}</div>
                </td>
                <td className="py-3 px-4 text-xs">
                  <span className="font-medium text-zinc-900 dark:text-zinc-200">{p.type}</span>
                  <span className="text-zinc-400 mx-1">·</span>
                  <span className="text-zinc-500">{p.purpose}</span>
                </td>
                <td className="py-3 px-4 text-xs font-mono">
                  {p.usableArea}m² · {p.bedrooms}Q · {p.parkingSpaces}V
                </td>
                <td className="py-3 px-4 font-semibold text-zinc-900 dark:text-zinc-100">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(p.price)}
                </td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium border bg-zinc-50 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700">
                    {p.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="inline-flex items-center gap-1">
                    <button
                      onClick={() => onView(p.id)}
                      className="p-1 rounded hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:text-zinc-400"
                      title="Visualizar Detalhes"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onEdit(p.id)}
                      className="p-1 rounded hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:text-zinc-400"
                      title="Editar"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
```

---

## 4. Skeleton de Carregamento Imobiliário (Zero CLS)

Preserva exatamente as dimensões do grid e tabela durante o streaming do `Suspense`.

```tsx
// src/components/admin/property-grid-skeleton.tsx
export const PropertyGridSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-lg border border-zinc-200 bg-white p-0 dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden">
          <div className="aspect-16/10 w-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-zinc-200 rounded w-3/4 dark:bg-zinc-800" />
            <div className="h-3 bg-zinc-100 rounded w-1/2 dark:bg-zinc-800/60" />
            <div className="h-6 bg-zinc-100 rounded dark:bg-zinc-800/60" />
            <div className="flex justify-between items-center pt-2">
              <div className="h-5 bg-zinc-200 rounded w-1/3 dark:bg-zinc-800" />
              <div className="h-3 bg-zinc-100 rounded w-1/4 dark:bg-zinc-800/60" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
```
