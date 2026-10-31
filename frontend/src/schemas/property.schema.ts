import { z } from "zod";

export const PropertyFormSchema = z.object({
  title: z
    .string()
    .min(5, "O título deve ter no mínimo 5 caracteres")
    .max(120, "O título deve ter no máximo 120 caracteres"),
  description: z
    .string()
    .min(20, "A descrição deve conter no mínimo 20 caracteres detalhando o imóvel"),
  type: z.enum([
    "APARTAMENTO",
    "CASA",
    "COBERTURA",
    "SALA_COMERCIAL",
    "TERRENO",
    "GALPAO",
  ]),
  purpose: z.enum(["VENDA", "LOCACAO", "AMBOS"]),
  status: z.enum(["DISPONIVEL", "RESERVADO", "VENDIDO", "INATIVO"]).default("DISPONIVEL"),

  // Valores
  price: z.number().positive("O valor deve ser maior que zero"),
  condoFee: z.number().nonnegative().optional(),
  iptuAnnual: z.number().nonnegative().optional(),

  // Metragens e Cômodos
  usableArea: z.number().positive("Informe a área privativa/útil em m²"),
  totalArea: z.number().positive("Informe a área total em m²"),
  bedrooms: z.number().int().min(0, "Mínimo 0"),
  suites: z.number().int().min(0, "Mínimo 0"),
  bathrooms: z.number().int().min(1, "O imóvel deve ter pelo menos 1 banheiro"),
  parkingSpaces: z.number().int().min(0, "Mínimo 0"),

  // Endereço
  zipCode: z.string().regex(/^\d{5}-?\d{3}$/, "Formato de CEP inválido (Ex: 01452-000)"),
  street: z.string().min(2, "Logradouro obrigatório"),
  number: z.string().min(1, "Número obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, "Bairro obrigatório"),
  city: z.string().min(2, "Cidade obrigatória"),
  state: z.string().length(2, "UF deve conter exatamente 2 letras (Ex: SP)"),

  // Imagens & Características
  coverImage: z.string().url("Informe uma URL válida de imagem para a capa"),
  features: z.array(z.string()).default([]),
});

export type PropertyFormData = z.infer<typeof PropertyFormSchema>;
