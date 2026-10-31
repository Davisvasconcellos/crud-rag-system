# Real Estate Admin Design System: Anti-AI & Human-Centric UI

Este documento estabelece a linguagem visual, identidade e convenções de interface para a plataforma imobiliária administrativa, garantindo sofisticação, densidade informativa e eliminando qualquer aspecto de interface genérica gerada por IA.

---

## 1. Eliminação de Clichês de IA (Anti-Patterns)

| Clichê Típico de IA (EVITAR) | Solução Profissional & Autêntica (USAR) |
|---|---|
| Cartões brancos idênticos com cantos super arredondados (`rounded-2xl`) e sombras cinzas flutuantes (`shadow-lg`). | Divisões limpas usando bordas sutis (`border border-zinc-200/80 dark:border-zinc-800`), cantos disciplinados (`rounded-md` ou `rounded-lg`) e sombras mínimas e precisas (`shadow-xs` ou `shadow-sm`). |
| Tags e títulos em ALL CAPS espaçados (`tracking-widest text-xs`) sobre todos os títulos. | Hierarquia tipográfica natural com pesos bem calibrados, títulos em Sentence case e identificadores claros. |
| Gradientes coloridos aleatórios em fundos, botões e cards sem função semântica. | Cores sólidas, deliberadas e funcionais. Destaques apenas para status do negócio (Disponível, Reservado, Vendido, Em Análise). |
| Destacar uma única palavra no meio de um título com itálico ou cor diferente. | Títulos diretos, sóbrios e informativos, sem maneirismos decorativos. |
| Ícones flutuantes coloridos dentro de círculos pastéis ao lado de cada número. | Métricas integradas ao contexto, com rótulos claros, unidades legíveis (ex.: `R$`, `m²`) e comparativos com períodos anteriores. |
| Botões genéricos com texto passivo ("Enviar", "Salvar", "Continuar"). | Botões de ação com verbos precisos no infinitivo ("Publicar Imóvel", "Cadastrar Lead", "Gerar Contrato", "Filtrar Resultados"). |

---

## 2. Paleta de Cores e Tokens Visuais

A interface imobiliária deve transmitir solidez, transparência e profissionalismo de alta renda.

### Paleta Base (Neutros Refinados)
- **Background Principal:** `#F8FAFC` (Light) / `#09090B` (Dark Zinc)
- **Superfície de Cards/Paineis:** `#FFFFFF` (Light) / `#121215` (Dark)
- **Bordas e Divisores:** `#E2E8F0` / `#27272A`
- **Texto Principal:** `#0F172A` / `#F8FAFC`
- **Texto Secundário / Labels:** `#64748B` / `#A1A1AA`

### Cor de Acento e Identidade (Imobiliária Premium)
- **Primary / Brand (Deep Slate & Emerald):** 
  - Acento primário para ações principais: `#0F3D3E` (Verde Esmeralda Profundo Corporativo) ou `#1E293B` (Slate Profundo)
  - Hover: `#0A2B2C`
- **Status Semânticos de Negócio (Propriedades e Leads):**
  - **Disponível / Ativo:** `#059669` (Emerald 600) com fundo suave `#ECFDF5`
  - **Em Negociação / Reservado:** `#D97706` (Amber 600) com fundo `#FFFBEB`
  - **Vendido / Alugado:** `#2563EB` (Blue 600) com fundo `#EFF6FF`
  - **Inativo / Cancelado / Desistência:** `#DC2626` (Red 600) com fundo `#FEF2F2`
  - **Em Rascunho / Vistoria:** `#64748B` (Slate 500) com fundo `#F1F5F9`

---

## 3. Tipografia e Densidade de Informação

- **Família Tipográfica Principal:** `Inter`, `Geist Sans` ou `Plus Jakarta Sans`.
- **Família Monospaçada (Para Códigos e Valores Numéricos Exatos):** `JetBrains Mono` ou `Geist Mono` para códigos de referência de imóveis (ex: `REF-7049`), valores de IPTU e áreas de matrícula.
- **Tamanhos e Pesos:**
  - `Page Title`: `text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50`
  - `Section Header`: `text-base font-semibold text-zinc-900 dark:text-zinc-100`
  - `Metric Value`: `text-3xl font-bold tracking-tight font-feature-numeric`
  - `Body / Table Text`: `text-sm font-normal text-zinc-700 dark:text-zinc-300`
  - `Metadata / Helper`: `text-xs font-medium text-zinc-500 dark:text-zinc-400`

---

## 4. Estrutura de Layout do Painel Administrativo

```
+-----------------------------------------------------------------------+
|  LOGO IMÓVEIS   |  [🔍 Buscar imóvel por código, rua ou lead...]  🔔  👤 |
+-----------------+-----------------------------------------------------+
| 🧭 Dashboard    | 🏠 Painel de Imóveis (2.418 ativos)   [+ Novo Imóvel] |
| 🏢 Imóveis      | --------------------------------------------------- |
| 👥 Leads / CRM  | [Filtros: Tipo ▾] [Bairro ▾] [Faixa Preço ▾] [Limpar] |
| 📑 Contratos    | --------------------------------------------------- |
| 🤝 Corretores   | [ Tabela / Cards com ordenação por data e valor ]   |
| ⚙️ Configurações|                                                     |
+-----------------+-----------------------------------------------------+
```

- **Sidebar Persistente:** Fixa ou retrátil em telas menores, sem poluição visual, destacando a seção ativa através de background discreto e indicador lateral sutil.
- **Header Global:** Contém busca contextual com atalho de teclado (`Cmd+K` / `Ctrl+K`), atalhos de notificações operacionais e perfil de acesso.
- **Área de Trabalho Focada:** Sem margens laterais exageradas; preenchimento ideal para permitir visualização de tabelas e múltiplos dados simultâneos sem scroll horizontal indevido.
