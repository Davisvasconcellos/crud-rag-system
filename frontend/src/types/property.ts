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

export interface Property {
  id: string;
  code: string;
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

  // Dimensões & Cômodos
  totalArea: number;
  usableArea: number;
  bedrooms: number;
  suites: number;
  bathrooms: number;
  parkingSpaces: number;

  // Valores
  price: number;
  condoFee?: number;
  iptuAnnual?: number;

  // Mídia
  coverImage: string;
  galleryImages: string[];
  features: string[];

  // Gestão
  brokerId: string;
  brokerName: string;
  ownerName: string;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyFilters {
  search?: string;
  type?: PropertyType | 'TODOS';
  purpose?: PropertyPurpose | 'TODOS';
  status?: PropertyStatus | 'TODOS';
  neighborhood?: string;
  minPrice?: number;
  maxPrice?: number;
}
