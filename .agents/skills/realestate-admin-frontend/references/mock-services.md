# Contratos de Dados, Tipagem e Camada de Mock Desacoplada

Este documento contém os modelos de domínio do ecossistema imobiliário, schemas Zod para validação rigorosa e a camada de serviço desacoplada. 

Essa arquitetura permite que o frontend rode 100% interativo, funcional e dinâmico agora com dados mockados, e no momento em que o backend for criado, basta substituir as funções internas de busca por chamadas HTTP reais (`fetch` ou `axios`) sem alterar uma única linha dos componentes de interface.

---

## 1. Tipos e Entidades de Domínio (`src/types/property.ts`)

```typescript
export type PropertyType = 
  | 'APARTAMENTO'
  | 'CASA'
  | 'COBERTURA'
  | 'SALA_COMERCIAL'
  | 'TERRENO'
  | 'GALPAO';

export type PropertyPurpose = 'VENDA' | 'LOCACAO' | 'AMBOS';

export type PropertyStatus = 
  | 'DISPONIVEL'
  | 'RESERVADO'
  | 'VENDIDO'
  | 'INATIVO';

export interface PropertyFeature {
  id: string;
  name: string; // Ex: "Piscina Aquecida", "Varanda Gourmet", "Portaria 24h"
  category: 'IMÓVEL' | 'CONDOMÍNIO';
}

export interface Property {
  id: string;
  code: string; // Ex: "AP-4029"
  title: string;
  description: string;
  type: PropertyType;
  purpose: PropertyPurpose;
  status: PropertyStatus;
  
  // Localização
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  latitude?: number;
  longitude?: number;

  // Dimensões e cômodos
  totalArea: number; // m²
  usableArea: number; // m²
  bedrooms: number;
  suites: number;
  bathrooms: number;
  parkingSpaces: number;

  // Valores (em centavos ou float estrito)
  price: number;
  condoFee?: number;
  iptuAnnual?: number;

  // Mídia
  coverImage: string;
  galleryImages: string[];
  virtualTourUrl?: string;

  // Gestão
  brokerId: string;
  brokerName: string;
  ownerName: string;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyFilters {
  search?: string;
  type?: PropertyType;
  purpose?: PropertyPurpose;
  status?: PropertyStatus;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  neighborhood?: string;
  page?: number;
  limit?: number;
}
```

---

## 2. Schemas de Validação Zod (`src/schemas/property.schema.ts`)

Garante integridade de dados e proteção contra payloads corrompidos.

```typescript
import { z } from 'zod';

export const PropertyFormSchema = z.object({
  title: z.string().min(5, 'O título deve ter pelo menos 5 caracteres').max(120),
  description: z.string().min(20, 'Forneça uma descrição detalhada do imóvel'),
  type: z.enum(['APARTAMENTO', 'CASA', 'COBERTURA', 'SALA_COMERCIAL', 'TERRENO', 'GALPAO']),
  purpose: z.enum(['VENDA', 'LOCACAO', 'AMBOS']),
  status: z.enum(['DISPONIVEL', 'RESERVADO', 'VENDIDO', 'INATIVO']).default('DISPONIVEL'),
  
  price: z.coerce.number().positive('O valor deve ser maior que zero'),
  condoFee: z.coerce.number().nonnegative().optional(),
  iptuAnnual: z.coerce.number().nonnegative().optional(),

  usableArea: z.coerce.number().positive('Informe a área útil'),
  totalArea: z.coerce.number().positive('Informe a área total'),
  bedrooms: z.coerce.number().int().min(0),
  suites: z.coerce.number().int().min(0),
  bathrooms: z.coerce.number().int().min(1, 'Mínimo de 1 banheiro'),
  parkingSpaces: z.coerce.number().int().min(0),

  zipCode: z.string().regex(/^\d{5}-?\d{3}$/, 'CEP inválido'),
  street: z.string().min(2, 'Rua obrigatória'),
  number: z.string().min(1, 'Número obrigatório'),
  neighborhood: z.string().min(2, 'Bairro obrigatório'),
  city: z.string().min(2, 'Cidade obrigatória'),
  state: z.string().length(2, 'UF deve ter 2 letras'),
});

export type PropertyFormData = z.infer<typeof PropertyFormSchema>;
```

---

## 3. Serviço Desacoplado com Dados Mockados Realistas (`src/services/property.service.ts`)

```typescript
import type { Property, PropertyFilters } from '@/types/property';

const MOCK_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    code: 'AP-1082',
    title: 'Apartamento Alto Padrão com Vista Panorâmica',
    description: 'Imóvel reformado com projeto luminotécnico, varanda gourmet envidraçada e piso em porcelanato 120x120.',
    type: 'APARTAMENTO',
    purpose: 'VENDA',
    status: 'DISPONIVEL',
    zipCode: '04538-133',
    street: 'Rua Horácio Lafer',
    number: '450',
    neighborhood: 'Itaim Bibi',
    city: 'São Paulo',
    state: 'SP',
    totalArea: 210,
    usableArea: 185,
    bedrooms: 3,
    suites: 3,
    bathrooms: 4,
    parkingSpaces: 3,
    price: 3850000,
    condoFee: 2400,
    iptuAnnual: 12000,
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
    ],
    brokerId: 'brk-1',
    brokerName: 'Carlos Mendonça',
    ownerName: 'Roberto Silveira',
    createdAt: '2026-09-15T10:00:00Z',
    updatedAt: '2026-10-28T14:30:00Z',
  },
  {
    id: 'prop-2',
    code: 'CS-3041',
    title: 'Casa Contemporânea em Condomínio Fechado',
    description: 'Arquitetura moderna com integração total de ambientes, piscina com borda infinita e energia fotovoltaica instalada.',
    type: 'CASA',
    purpose: 'VENDA',
    status: 'DISPONIVEL',
    zipCode: '06540-000',
    street: 'Alameda das Figueiras',
    number: '12',
    neighborhood: 'Alphaville',
    city: 'Santana de Parnaíba',
    state: 'SP',
    totalArea: 520,
    usableArea: 440,
    bedrooms: 4,
    suites: 4,
    bathrooms: 6,
    parkingSpaces: 4,
    price: 5200000,
    condoFee: 1800,
    iptuAnnual: 9500,
    coverImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [],
    brokerId: 'brk-2',
    brokerName: 'Mariana Duarte',
    ownerName: 'Patrícia Albuquerque',
    createdAt: '2026-10-01T09:00:00Z',
    updatedAt: '2026-10-29T11:20:00Z',
  },
  {
    id: 'prop-3',
    code: 'AP-5510',
    title: 'Studio Mobiliado ao lado da Estação de Metrô',
    description: 'Compacto de luxo pronto para morar ou locação short-stay, com fechadura eletrônica e marcenaria planejada.',
    type: 'APARTAMENTO',
    purpose: 'LOCACAO',
    status: 'RESERVADO',
    zipCode: '01310-100',
    street: 'Avenida Paulista',
    number: '1800',
    complement: 'Apto 142',
    neighborhood: 'Bela Vista',
    city: 'São Paulo',
    state: 'SP',
    totalArea: 42,
    usableArea: 38,
    bedrooms: 1,
    suites: 1,
    bathrooms: 1,
    parkingSpaces: 0,
    price: 4200,
    condoFee: 650,
    iptuAnnual: 1800,
    coverImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [],
    brokerId: 'brk-1',
    brokerName: 'Carlos Mendonça',
    ownerName: 'Imob Investimentos',
    createdAt: '2026-10-10T15:00:00Z',
    updatedAt: '2026-10-30T09:10:00Z',
  }
];

export const PropertyService = {
  async list(filters?: PropertyFilters): Promise<{ data: Property[]; total: number }> {
    // Simula latência de rede realista (180ms)
    await new Promise((resolve) => setTimeout(resolve, 180));

    let result = [...MOCK_PROPERTIES];

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q) ||
          p.neighborhood.toLowerCase().includes(q)
      );
    }

    if (filters?.type) {
      result = result.filter((p) => p.type === filters.type);
    }

    if (filters?.status) {
      result = result.filter((p) => p.status === filters.status);
    }

    return {
      data: result,
      total: result.length,
    };
  },

  async getById(id: string): Promise<Property | null> {
    await new Promise((resolve) => setTimeout(resolve, 120));
    return MOCK_PROPERTIES.find((p) => p.id === id) || null;
  },

  async create(data: Omit<Property, 'id' | 'code' | 'createdAt' | 'updatedAt'>): Promise<Property> {
    await new Promise((resolve) => setTimeout(resolve, 250));
    const newProperty: Property = {
      ...data,
      id: `prop-${Date.now()}`,
      code: `IM-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    MOCK_PROPERTIES.unshift(newProperty);
    return newProperty;
  }
};
```
