import React from "react";
import { Bed, Bath, Car, Maximize, MapPin } from "lucide-react";
import { formatCurrency, formatArea } from "@/lib/utils";
import { BusinessStatusBadge } from "@/components/ui/badge";
import type { Property } from "@/types/property";

interface PropertyCardProps {
  property: Property;
  onSelect?: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelect,
}) => {
  return (
    <div
      onClick={() => onSelect?.(property)}
      className="group relative cursor-pointer overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-2xs transition-all hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
    >
      {/* Imagem de Capa com Proporção Fixa 16:10 (Zero CLS) */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <img
          src={property.coverImage}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <BusinessStatusBadge status={property.status} />
          <span className="rounded-md border border-zinc-200/90 bg-white/90 px-2 py-0.5 text-xs font-medium text-zinc-800 backdrop-blur-xs dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-200">
            {property.type}
          </span>
        </div>
        <div className="absolute bottom-2.5 right-2.5 rounded bg-zinc-900/85 px-2 py-0.5 font-mono text-xs font-medium text-white shadow-xs">
          {property.code}
        </div>
      </div>

      {/* Detalhes do Imóvel */}
      <div className="p-4">
        <h3 className="line-clamp-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          {property.title}
        </h3>
        <p className="mt-1 flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
          <MapPin className="h-3 w-3 shrink-0" />
          <span className="line-clamp-1">
            {property.neighborhood}, {property.city} - {property.state}
          </span>
        </p>

        {/* Especificações Técnicas */}
        <div className="mt-3.5 grid grid-cols-4 gap-1 border-y border-zinc-100 py-2.5 text-xs text-zinc-600 dark:border-zinc-800 dark:text-zinc-400 font-feature-numeric">
          <div className="flex items-center gap-1.5" title="Área Útil">
            <Maximize className="h-3.5 w-3.5 text-zinc-400" />
            <span>{formatArea(property.usableArea)}</span>
          </div>
          <div className="flex items-center gap-1.5" title="Quartos (Suítes)">
            <Bed className="h-3.5 w-3.5 text-zinc-400" />
            <span>{property.bedrooms} ({property.suites}s)</span>
          </div>
          <div className="flex items-center gap-1.5" title="Banheiros">
            <Bath className="h-3.5 w-3.5 text-zinc-400" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1.5" title="Vagas de Garagem">
            <Car className="h-3.5 w-3.5 text-zinc-400" />
            <span>{property.parkingSpaces}</span>
          </div>
        </div>

        {/* Valores e Finalidade */}
        <div className="mt-3 flex items-baseline justify-between">
          <div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 block">
              {property.purpose === "VENDA" ? "Venda" : "Locação / mês"}
            </span>
            <span className="text-base font-bold text-zinc-900 dark:text-zinc-100 font-feature-numeric">
              {formatCurrency(property.price)}
            </span>
          </div>
          {property.condoFee && property.condoFee > 0 && (
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-feature-numeric">
              Cond. {formatCurrency(property.condoFee)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
