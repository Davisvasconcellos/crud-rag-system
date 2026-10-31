import type { Property, PropertyFilters } from "@/types/property";

const INITIAL_PROPERTIES: Property[] = [
  {
    id: "prop-1",
    code: "AP-1082",
    title: "Apartamento de Alto Padrão com Varanda Gourmet",
    description: "Imóvel reformado com projeto luminotécnico assinado, varanda gourmet envidraçada, marcenaria de alto padrão e piso em porcelanato 120x120.",
    type: "APARTAMENTO",
    purpose: "VENDA",
    status: "DISPONIVEL",
    zipCode: "04538-133",
    street: "Rua Horácio Lafer",
    number: "450",
    neighborhood: "Itaim Bibi",
    city: "São Paulo",
    state: "SP",
    totalArea: 210,
    usableArea: 185,
    bedrooms: 3,
    suites: 3,
    bathrooms: 4,
    parkingSpaces: 3,
    price: 3850000,
    condoFee: 2400,
    iptuAnnual: 12000,
    coverImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
    ],
    features: ["Piscina Aquecida", "Varanda Gourmet", "Ar Condicionado", "Portaria 24h", "Academia"],
    brokerId: "brk-1",
    brokerName: "Carlos Mendonça",
    ownerName: "Roberto Silveira",
    createdAt: "2026-09-15T10:00:00Z",
    updatedAt: "2026-10-28T14:30:00Z",
  },
  {
    id: "prop-2",
    code: "CS-3041",
    title: "Casa Contemporânea Integrada à Natureza",
    description: "Arquitetura modernista com pé-direito duplo, integração total de ambientes com o jardim, piscina com borda infinita e energia fotovoltaica instalada.",
    type: "CASA",
    purpose: "VENDA",
    status: "DISPONIVEL",
    zipCode: "06540-000",
    street: "Alameda das Figueiras",
    number: "12",
    neighborhood: "Alphaville",
    city: "Santana de Parnaíba",
    state: "SP",
    totalArea: 540,
    usableArea: 440,
    bedrooms: 4,
    suites: 4,
    bathrooms: 6,
    parkingSpaces: 4,
    price: 5200000,
    condoFee: 1800,
    iptuAnnual: 9500,
    coverImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [],
    features: ["Piscina com Borda Infinita", "Energia Solar", "Churrasqueira", "Lareira Ecológica"],
    brokerId: "brk-2",
    brokerName: "Mariana Duarte",
    ownerName: "Patrícia Albuquerque",
    createdAt: "2026-10-01T09:00:00Z",
    updatedAt: "2026-10-29T11:20:00Z",
  },
  {
    id: "prop-3",
    code: "CB-8012",
    title: "Cobertura Duplex com Vista 360° para os Jardins",
    description: "Piso superior com spa privativo, deck em cumaru, solarium e lounge gourmet. Suíte master com closet walk-in e hidromassagem.",
    type: "COBERTURA",
    purpose: "VENDA",
    status: "RESERVADO",
    zipCode: "01426-001",
    street: "Alameda Lorena",
    number: "1280",
    complement: "Cob 221",
    neighborhood: "Jardins",
    city: "São Paulo",
    state: "SP",
    totalArea: 380,
    usableArea: 320,
    bedrooms: 4,
    suites: 4,
    bathrooms: 5,
    parkingSpaces: 4,
    price: 8900000,
    condoFee: 4200,
    iptuAnnual: 22000,
    coverImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [],
    features: ["Spa Privativo", "Vista Panorâmica", "Elevador com Biometria", "Depósito no Subsolo"],
    brokerId: "brk-1",
    brokerName: "Carlos Mendonça",
    ownerName: "Fernando Guimarães",
    createdAt: "2026-08-20T14:00:00Z",
    updatedAt: "2026-10-30T09:10:00Z",
  },
  {
    id: "prop-4",
    code: "AP-5510",
    title: "Studio Design Próximo ao Metrô e Parque Ibirapuera",
    description: "Totalmente mobiliado e equipado com eletrodomésticos embutidos, fechadura digital biométrica e condomínio com coworking e lavanderia coletiva.",
    type: "APARTAMENTO",
    purpose: "LOCACAO",
    status: "DISPONIVEL",
    zipCode: "04012-010",
    street: "Rua Cubatão",
    number: "720",
    complement: "Apto 84",
    neighborhood: "Vila Mariana",
    city: "São Paulo",
    state: "SP",
    totalArea: 44,
    usableArea: 40,
    bedrooms: 1,
    suites: 1,
    bathrooms: 1,
    parkingSpaces: 0,
    price: 4500,
    condoFee: 680,
    iptuAnnual: 1600,
    coverImage: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [],
    features: ["Mobiliado", "Coworking", "Academia", "Lavanderia OMO"],
    brokerId: "brk-3",
    brokerName: "Ana Paula Rios",
    ownerName: "InvestSmart Imóveis",
    createdAt: "2026-10-10T15:00:00Z",
    updatedAt: "2026-10-30T10:00:00Z",
  },
  {
    id: "prop-5",
    code: "SL-9921",
    title: "Conjunto Comercial Triplo em Torre Corporativa Triple A",
    description: "Piso elevado com cabeamento estruturado, ar-condicionado VRF central, 6 vagas com manobrista e heliponto homologado.",
    type: "SALA_COMERCIAL",
    purpose: "LOCACAO",
    status: "DISPONIVEL",
    zipCode: "04571-010",
    street: "Avenida Engenheiro Luís Carlos Berrini",
    number: "1680",
    complement: "14º Andar",
    neighborhood: "Brooklin",
    city: "São Paulo",
    state: "SP",
    totalArea: 290,
    usableArea: 260,
    bedrooms: 0,
    suites: 0,
    bathrooms: 4,
    parkingSpaces: 6,
    price: 24000,
    condoFee: 3900,
    iptuAnnual: 16800,
    coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [],
    features: ["Piso Elevado", "Heliponto", "Catracas Eletrônicas", "Fibra Óptica"],
    brokerId: "brk-2",
    brokerName: "Mariana Duarte",
    ownerName: "Fundo Prime Real Estate",
    createdAt: "2026-09-05T11:00:00Z",
    updatedAt: "2026-10-25T16:00:00Z",
  },
  {
    id: "prop-6",
    code: "CS-4190",
    title: "Residência em Estilo Rústico Chique na Vila Madalena",
    description: "Com pátio arborizado, árvores frutíferas preservadas, atelier independente e excelente iluminação natural em rua calma sem saída.",
    type: "CASA",
    purpose: "VENDA",
    status: "VENDIDO",
    zipCode: "05436-000",
    street: "Rua Aspicuelta",
    number: "910",
    neighborhood: "Vila Madalena",
    city: "São Paulo",
    state: "SP",
    totalArea: 310,
    usableArea: 240,
    bedrooms: 3,
    suites: 2,
    bathrooms: 3,
    parkingSpaces: 2,
    price: 2950000,
    condoFee: 0,
    iptuAnnual: 7200,
    coverImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [],
    features: ["Jardim com Frutíferas", "Atelier", "Espaço Gourmet"],
    brokerId: "brk-1",
    brokerName: "Carlos Mendonça",
    ownerName: "Eduardo Fontes",
    createdAt: "2026-07-12T08:00:00Z",
    updatedAt: "2026-10-18T17:30:00Z",
  }
];

let propertiesStore = [...INITIAL_PROPERTIES];

export const PropertyService = {
  async list(filters?: PropertyFilters): Promise<{ data: Property[]; total: number }> {
    // Simulação de latência de rede realista
    await new Promise((r) => setTimeout(r, 120));

    let result = [...propertiesStore];

    if (filters?.search) {
      const q = filters.search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q) ||
          p.neighborhood.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q)
      );
    }

    if (filters?.type && filters.type !== "TODOS") {
      result = result.filter((p) => p.type === filters.type);
    }

    if (filters?.purpose && filters.purpose !== "TODOS") {
      result = result.filter((p) => p.purpose === filters.purpose || p.purpose === "AMBOS");
    }

    if (filters?.status && filters.status !== "TODOS") {
      result = result.filter((p) => p.status === filters.status);
    }

    if (filters?.neighborhood) {
      result = result.filter((p) =>
        p.neighborhood.toLowerCase().includes(filters.neighborhood!.toLowerCase())
      );
    }

    if (filters?.minPrice) {
      result = result.filter((p) => p.price >= filters.minPrice!);
    }

    if (filters?.maxPrice) {
      result = result.filter((p) => p.price <= filters.maxPrice!);
    }

    return {
      data: result,
      total: result.length,
    };
  },

  async getById(id: string): Promise<Property | null> {
    await new Promise((r) => setTimeout(r, 80));
    return propertiesStore.find((p) => p.id === id) || null;
  },

  async create(data: Omit<Property, "id" | "code" | "createdAt" | "updatedAt" | "brokerId" | "brokerName" | "ownerName">): Promise<Property> {
    await new Promise((r) => setTimeout(r, 200));
    const newProp: Property = {
      ...data,
      id: `prop-${Date.now()}`,
      code: `IM-${Math.floor(1000 + Math.random() * 9000)}`,
      brokerId: "brk-current",
      brokerName: "Corretor Responsável",
      ownerName: "Proprietário Cadastrado",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    propertiesStore.unshift(newProp);
    return newProp;
  },

  async updateStatus(id: string, status: Property["status"]): Promise<Property | null> {
    await new Promise((r) => setTimeout(r, 100));
    const index = propertiesStore.findIndex((p) => p.id === id);
    if (index === -1) return null;
    propertiesStore[index] = {
      ...propertiesStore[index],
      status,
      updatedAt: new Date().toISOString(),
    };
    return propertiesStore[index];
  }
};
