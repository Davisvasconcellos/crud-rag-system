import React from "react";
import { Eye, Edit2, MapPin } from "lucide-react";
import { formatCurrency, formatArea } from "@/lib/utils";
import { BusinessStatusBadge } from "@/components/ui/badge";
import type { Property } from "@/types/property";

interface PropertyTableProps {
  properties: Property[];
  onView: (property: Property) => void;
  onEdit?: (property: Property) => void;
}

export const PropertyTable: React.FC<PropertyTableProps> = ({
  properties,
  onView,
  onEdit,
}) => {
  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-zinc-600 dark:text-zinc-300">
          <thead className="border-b border-zinc-200 bg-zinc-50/80 text-xs font-semibold text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-300">
            <tr>
              <th className="py-3 px-4 font-mono">Código</th>
              <th className="py-3 px-4">Imóvel & Localização</th>
              <th className="py-3 px-4">Tipo / Finalidade</th>
              <th className="py-3 px-4">Área / Configuração</th>
              <th className="py-3 px-4">Valor</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {properties.map((p) => (
              <tr
                key={p.id}
                className="hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40 transition-colors"
              >
                <td className="py-3.5 px-4 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                  {p.code}
                </td>
                <td className="py-3.5 px-4">
                  <div className="font-medium text-zinc-900 dark:text-zinc-100 line-clamp-1">
                    {p.title}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    <MapPin className="h-3 w-3 shrink-0" />
                    <span className="line-clamp-1">
                      {p.neighborhood}, {p.city}
                    </span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-xs">
                  <span className="font-medium text-zinc-900 dark:text-zinc-200">
                    {p.type}
                  </span>
                  <span className="text-zinc-400 mx-1">·</span>
                  <span className="text-zinc-500">{p.purpose}</span>
                </td>
                <td className="py-3.5 px-4 text-xs font-feature-numeric">
                  {formatArea(p.usableArea)} · {p.bedrooms}Q ({p.suites}s) · {p.parkingSpaces}V
                </td>
                <td className="py-3.5 px-4 font-semibold text-zinc-900 dark:text-zinc-100 font-feature-numeric">
                  {formatCurrency(p.price)}
                </td>
                <td className="py-3.5 px-4">
                  <BusinessStatusBadge status={p.status} />
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="inline-flex items-center gap-1">
                    <button
                      onClick={() => onView(p)}
                      className="p-1.5 rounded-md hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors cursor-pointer"
                      title="Visualizar Detalhes"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    {onEdit && (
                      <button
                        onClick={() => onEdit(p)}
                        className="p-1.5 rounded-md hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors cursor-pointer"
                        title="Editar Imóvel"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                    )}
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
