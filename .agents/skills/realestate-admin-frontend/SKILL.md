---
name: realestate-admin-frontend
description: Especialista em arquitetura frontend para painéis administrativos, dashboards e ecossistemas imobiliários de alto padrão usando Next.js 14+ (App Router), React, Tailwind CSS, Shadcn UI e TypeScript estrito. Foco em UX moderna, minimalista e autêntica (sem estética genérica de IA), máxima performance (Zero CLS, Suspense streaming, direct imports), validação rigorosa com Zod e camada de dados desacoplada pronta para integração futura com backend. Use ao criar ou refatorar painéis administrativos, vitrines de imóveis, gestão de corretores, funis de leads/CRM, tabelas filtráveis, cards operacionais e formulários imobiliários.
---

# Real Estate Admin Frontend Specialist

Guia de engenharia e design para construção de painéis administrativos e ecossistemas de gestão imobiliária de alta performance, seguros e com design autêntico.

---

## 🎯 Objetivo & Filosofia

Construir interfaces administrativas para o mercado imobiliário que priorizem:
1. **Identidade Visual Autêntica (Anti-AI Clichés):** Sem cartões idênticos flutuantes, sem sombras pastéis exageradas, sem tags em caixa-alta desnecessárias e sem gradientes decorativos sem função. Tipografia forte, paleta sóbria (Slate/Zinc com toques de Esmeralda corporativo) e densidade de informação profissional.
2. **Performance Extrema:** Server Components como padrão, streaming com `Suspense`, skeletons com dimensões exatas (Zero CLS) e importações diretas para otimização de bundle.
3. **Segurança & Tipagem Estrita:** 100% TypeScript (sem `any`), validação integral de formulários e entradas com Zod, e proteção contra XSS.
4. **Desacoplamento para Backend:** Camada de serviços mockados realista e tipada, permitindo rodar a aplicação imediatamente e plugar uma API REST/GraphQL no futuro apenas alterando o cliente de dados.

---

## 🛠️ Stack Tecnológica Recomendada

- **Framework:** Next.js 14+ (App Router, React Server Components por padrão)
- **Linguagem:** TypeScript (Strict Mode, interfaces completas de DTOs)
- **Estilização:** Tailwind CSS (Tokens estruturados, variáveis CSS limpas)
- **Componentes Base:** Shadcn UI (Radix Primitives) + Lucide React para ícones semânticos
- **Formulários & Validação:** React Hook Form + Zod
- **Estado Global & Servidor:** Zustand (estado de UI leve) e TanStack Query (cache e busca de dados)
- **Otimização de Mídia:** `next/image` configurado para fotos de imóveis em alta resolução

---

## 📁 Estrutura de Pastas Recomendada

```
src/
├── app/
│   ├── (admin)/
│   │   ├── layout.tsx              # Shell administrativo: Sidebar fixa + Navbar superior
│   │   ├── dashboard/page.tsx      # Métricas de VGV, novos leads e resumo de carteira
│   │   ├── properties/
│   │   │   ├── page.tsx            # Listagem de imóveis com filtros e alternador (Grid/Tabela)
│   │   │   ├── [id]/page.tsx       # Detalhes, histórico de visitas e propostas do imóvel
│   │   │   └── new/page.tsx        # Formulário de cadastro de imóvel em abas/etapas
│   │   ├── leads/page.tsx          # Pipeline/Kanban de leads e negociações
│   │   └── brokers/page.tsx        # Gestão de corretores e comissões
│   ├── api/                        # Rotas de API / Handlers (se aplicável)
│   └── globals.css                 # Tokens de design e reset
├── components/
│   ├── ui/                         # Primitivos atômicos (Button, Input, Dialog, Badge)
│   ├── admin/                      # Componentes do painel (Sidebar, Header, MetricCard)
│   └── properties/                 # Componentes de imóveis (PropertyCard, PropertyTable, Filters)
├── schemas/                        # Schemas de validação Zod (PropertyFormSchema, LeadSchema)
├── services/                       # Camada de serviços e mocks desacoplados
└── types/                          # Interfaces TypeScript de domínio
```

---

## 🚀 Fluxo de Trabalho para Criação de Módulos

Sempre que solicitar a criação de uma tela ou módulo do sistema imobiliário, execute o seguinte roteiro:

### 1. Definir o Contrato de Dados & Tipagem
- Inicie declarando os tipos em `src/types/` e o schema de validação em `src/schemas/`.
- Adicione os mocks realistas no serviço correspondente em `src/services/`.
- **[Consulte a Camada de Mocks e Tipagem: references/mock-services.md](references/mock-services.md)**

### 2. Montar os Componentes Atômicos de Apresentação
- Use a paleta de neutros (`zinc`/`slate`) e aplique badges de status imobiliário semânticos (`DISPONIVEL`, `RESERVADO`, `VENDIDO`).
- Mantenha cartões estruturados por bordas discretas em vez de sombras pesadas.
- **[Consulte os Blueprints de Componentes: references/components.md](references/components.md)**
- **[Consulte o Guia de Design e Anti-Clichês: references/design-system.md](references/design-system.md)**

### 3. Implementar a Página com Streaming e Skeletons
- Garanta que a página principal seja um Server Component.
- Envolva as chamadas de busca em `<Suspense fallback={<SkeletonComponent />}>`.
- Reserve a altura e largura exatas nos skeletons para eliminar qualquer Layout Shift (CLS = 0).
- **[Consulte as Regras de Performance e Segurança: references/performance-security.md](references/performance-security.md)**

---

## 📋 Checklist Rápido de Qualidade

Antes de concluir qualquer entrega de código frontend:
- [ ] O layout possui visual limpo, profissional e sem aspecto de template padrão de IA?
- [ ] Todos os botões usam verbos no infinitivo ("Cadastrar Imóvel", "Aplicar Filtros")?
- [ ] A página é um Server Component e apenas os botões/filtros interativos contêm `'use client'`?
- [ ] As fotos de imóveis utilizam `next/image` com `sizes` responsivos e `aspect-ratio` definido?
- [ ] Os formulários utilizam React Hook Form integrado ao Zod?
- [ ] Não há tipos `any` no código TypeScript?
- [ ] O serviço de dados está isolado para facilitar a conexão futura com o backend?

---

## 📚 Guias Detalhados & Referências

- **[Diretrizes Visuais & Anti-AI Design](references/design-system.md)**: Paleta de cores, tipografia, espaçamento e convenções de interface autêntica.
- **[Blueprints de Componentes Imobiliários](references/components.md)**: Códigos de referência para `MetricCard`, `PropertyCard`, `PropertyTable` e `PropertyGridSkeleton`.
- **[Tipagens, Zod & Mocks Desacoplados](references/mock-services.md)**: Schemas completos, interfaces e mocks ricos em `src/services/property.service.ts`.
- **[Performance & Segurança](references/performance-security.md)**: Checklist de bundle size, eliminação de barrels, sanitização e prevenção de vulnerabilidades.
