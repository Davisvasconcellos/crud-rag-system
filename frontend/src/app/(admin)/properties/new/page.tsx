"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Check, ChevronRight, Building, DollarSign, Home, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { PropertyFormSchema, type PropertyFormData } from "@/schemas/property.schema";
import { PropertyService } from "@/services/property.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const STEPS = [
  { id: 1, label: "Dados Básicos", icon: Building },
  { id: 2, label: "Cômodos & Dimensões", icon: Home },
  { id: 3, label: "Valores & Endereço", icon: DollarSign },
  { id: 4, label: "Fotos & Mídia", icon: ImageIcon },
];

export default function NewPropertyPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(PropertyFormSchema) as any,
    defaultValues: {
      title: "",
      description: "",
      type: "APARTAMENTO",
      purpose: "VENDA",
      status: "DISPONIVEL",
      price: 0,
      condoFee: 0,
      iptuAnnual: 0,
      usableArea: 0,
      totalArea: 0,
      bedrooms: 2,
      suites: 1,
      bathrooms: 2,
      parkingSpaces: 1,
      zipCode: "01452-000",
      street: "Avenida Brigadeiro Faria Lima",
      number: "2200",
      neighborhood: "Jardim Paulistano",
      city: "São Paulo",
      state: "SP",
      coverImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      features: ["Varanda", "Portaria 24h"],
    },
  });

  const nextStep = async () => {
    let fieldsToValidate: (keyof PropertyFormData)[] = [];
    if (currentStep === 1) fieldsToValidate = ["title", "description", "type", "purpose"];
    if (currentStep === 2) fieldsToValidate = ["usableArea", "totalArea", "bedrooms", "suites", "bathrooms", "parkingSpaces"];
    if (currentStep === 3) fieldsToValidate = ["price", "zipCode", "street", "number", "neighborhood", "city", "state"];

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const onSubmit: SubmitHandler<PropertyFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      await PropertyService.create({
        ...data,
        galleryImages: [],
      });
      toast.success("Imóvel cadastrado com sucesso!");
      router.push("/properties");
    } catch (err) {
      toast.error("Ocorreu um erro ao salvar o imóvel.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 pb-4 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <Link href="/properties">
            <button className="rounded-md p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:text-zinc-400 transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </button>
          </Link>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Cadastrar Novo Imóvel
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Formulário validado com Zod e preparado para integração com o backend.
            </p>
          </div>
        </div>
      </div>

      {/* Indicador de Passos */}
      <div className="grid grid-cols-4 gap-2 border-b border-zinc-200 pb-5 dark:border-zinc-800">
        {STEPS.map((s) => {
          const Icon = s.icon;
          const isActive = currentStep === s.id;
          const isCompleted = currentStep > s.id;

          return (
            <div
              key={s.id}
              className={`flex items-center gap-2 p-2 rounded-lg border text-xs font-medium transition-all ${
                isActive
                  ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                  : isCompleted
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300"
                  : "border-zinc-200 bg-white text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900"
              }`}
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 shrink-0">
                {isCompleted ? <Check className="h-3 w-3" /> : s.id}
              </div>
              <span className="hidden sm:inline truncate">{s.label}</span>
            </div>
          );
        })}
      </div>

      {/* Formulário com Abas */}
      <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg border border-zinc-200 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 space-y-6">
        {/* Passo 1: Informações Básicas */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 border-b pb-2 dark:border-zinc-800">
              1. Identificação Geral
            </h2>

            <div>
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1">
                Título do Anúncio *
              </label>
              <Input
                {...register("title")}
                placeholder="Ex: Apartamento Reformado com Varanda Gourmet no Itaim"
              />
              {errors.title && (
                <p className="mt-1 text-xs text-rose-600">{errors.title.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1">
                  Tipologia do Imóvel *
                </label>
                <select
                  {...register("type")}
                  className="h-9 w-full rounded-md border border-zinc-200 bg-white px-3 text-xs dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
                >
                  <option value="APARTAMENTO">Apartamento</option>
                  <option value="CASA">Casa Residencial</option>
                  <option value="COBERTURA">Cobertura</option>
                  <option value="SALA_COMERCIAL">Sala Comercial</option>
                  <option value="TERRENO">Terreno</option>
                  <option value="GALPAO">Galpão</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1">
                  Finalidade da Transação *
                </label>
                <select
                  {...register("purpose")}
                  className="h-9 w-full rounded-md border border-zinc-200 bg-white px-3 text-xs dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
                >
                  <option value="VENDA">Venda</option>
                  <option value="LOCACAO">Locação</option>
                  <option value="AMBOS">Venda e Locação</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1">
                Descrição Completa *
              </label>
              <textarea
                {...register("description")}
                rows={4}
                placeholder="Descreva acabamentos, orientação solar, vista, diferenciais e comodidades do condomínio..."
                className="w-full rounded-md border border-zinc-200 bg-white p-3 text-xs focus:outline-hidden focus:ring-1 focus:ring-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              />
              {errors.description && (
                <p className="mt-1 text-xs text-rose-600">{errors.description.message}</p>
              )}
            </div>
          </div>
        )}

        {/* Passo 2: Cômodos & Dimensões */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 border-b pb-2 dark:border-zinc-800">
              2. Metragens e Distribuição de Cômodos
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1">
                  Área Útil Privativa (m²) *
                </label>
                <Input type="number" {...register("usableArea", { valueAsNumber: true })} placeholder="185" />
                {errors.usableArea && <p className="mt-1 text-xs text-rose-600">{errors.usableArea.message}</p>}
              </div>
              <div>
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1">
                  Área Total (m²) *
                </label>
                <Input type="number" {...register("totalArea", { valueAsNumber: true })} placeholder="210" />
                {errors.totalArea && <p className="mt-1 text-xs text-rose-600">{errors.totalArea.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1">
                  Quartos Totais
                </label>
                <Input type="number" {...register("bedrooms", { valueAsNumber: true })} />
              </div>
              <div>
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1">
                  Suítes
                </label>
                <Input type="number" {...register("suites", { valueAsNumber: true })} />
              </div>
              <div>
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1">
                  Banheiros
                </label>
                <Input type="number" {...register("bathrooms", { valueAsNumber: true })} />
              </div>
              <div>
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1">
                  Vagas de Garagem
                </label>
                <Input type="number" {...register("parkingSpaces", { valueAsNumber: true })} />
              </div>
            </div>
          </div>
        )}

        {/* Passo 3: Valores & Endereço */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 border-b pb-2 dark:border-zinc-800">
              3. Precificação e Localização
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1">
                  Valor Pretendido (R$) *
                </label>
                <Input type="number" {...register("price", { valueAsNumber: true })} placeholder="3850000" />
                {errors.price && <p className="mt-1 text-xs text-rose-600">{errors.price.message}</p>}
              </div>
              <div>
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1">
                  Condomínio Mensal (R$)
                </label>
                <Input type="number" {...register("condoFee", { valueAsNumber: true })} placeholder="2400" />
              </div>
              <div>
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1">
                  IPTU Anual (R$)
                </label>
                <Input type="number" {...register("iptuAnnual", { valueAsNumber: true })} placeholder="12000" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1">
                  CEP *
                </label>
                <Input {...register("zipCode")} placeholder="04538-133" />
                {errors.zipCode && <p className="mt-1 text-xs text-rose-600">{errors.zipCode.message}</p>}
              </div>
              <div className="col-span-2">
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1">
                  Logradouro *
                </label>
                <Input {...register("street")} placeholder="Rua Horácio Lafer" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1">
                  Número *
                </label>
                <Input {...register("number")} placeholder="450" />
              </div>
              <div>
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1">
                  Bairro *
                </label>
                <Input {...register("neighborhood")} placeholder="Itaim Bibi" />
              </div>
              <div>
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1">
                  Cidade / UF *
                </label>
                <Input {...register("city")} placeholder="São Paulo" />
              </div>
            </div>
          </div>
        )}

        {/* Passo 4: Fotos & Finalização */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 border-b pb-2 dark:border-zinc-800">
              4. Mídia e Diferenciais
            </h2>

            <div>
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1">
                URL da Foto de Capa *
              </label>
              <Input
                {...register("coverImage")}
                placeholder="https://images.unsplash.com/photo-..."
              />
              {errors.coverImage && (
                <p className="mt-1 text-xs text-rose-600">{errors.coverImage.message}</p>
              )}
            </div>

            <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-200 dark:bg-zinc-800/40 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400">
              <p className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                Conexão com Storage / Google Drive:
              </p>
              Em conformidade com o Estudo Técnico, os uploads reais de mídia e plantas são organizados automaticamente em <code>/Tenant/RAG/anuncios/</code> no backend.
            </div>
          </div>
        )}

        {/* Barra de Navegação dos Passos */}
        <div className="flex items-center justify-between border-t border-zinc-100 pt-5 dark:border-zinc-800">
          {currentStep > 1 ? (
            <Button type="button" variant="outline" size="sm" onClick={prevStep}>
              Voltar
            </Button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <Button type="button" size="sm" onClick={nextStep}>
              <span>Próximo Passo</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          ) : (
            <Button type="submit" size="sm" isLoading={isSubmitting}>
              Concluir & Publicar Imóvel
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
