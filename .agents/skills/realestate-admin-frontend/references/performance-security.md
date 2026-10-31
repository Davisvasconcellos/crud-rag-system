# Performance & Segurança em Aplicações Frontend Administrativas

Diretrizes práticas aplicadas a Next.js (App Router), React, TypeScript e Tailwind para garantir carregamento instantâneo, estabilidade visual (Zero CLS) e robustez contra vulnerabilidades comuns.

---

## 1. Diretrizes de Performance Extrema

### A. Separação Rigorosa: Server Components vs. Client Components
- **Padrão:** Todo componente deve ser Server Component a menos que explicitamente necessite de interatividade (`useState`, `useEffect`, `useCallback`, eventos de clique).
- **Folhas de Interatividade:** Isole o `'use client'` nos nós folha da árvore de componentes (ex: o botão de alternar status ou o input de filtro, e não a página ou tabela inteira).
- **Streaming com Suspense:**
  ```tsx
  // app/(admin)/properties/page.tsx (Server Component)
  import { Suspense } from 'react';
  import { PropertyGrid } from '@/components/admin/property-grid';
  import { PropertyGridSkeleton } from '@/components/admin/property-grid-skeleton';

  export default function PropertiesPage() {
    return (
      <div className="space-y-6">
        <PageHeader title="Carteira de Imóveis" />
        <Suspense fallback={<PropertyGridSkeleton />}>
          <PropertyGrid />
        </Suspense>
      </div>
    );
  }
  ```

### B. Eliminação de Barrels & Otimização de Bundles
- Importe diretamente do caminho do componente para garantir tree-shaking perfeito:
  ```typescript
  // ❌ EVITAR: Import em massa via barrel que infla o bundle inicial
  import { Button, Input, Dialog, Dropdown } from '@/components/ui';

  // ✅ PREFERIR: Import direto e pontual
  import { Button } from '@/components/ui/button';
  import { Input } from '@/components/ui/input';
  ```

### C. Otimização de Imagens Imobiliárias
- Fotos de imóveis são o maior ofensor de LCP (*Largest Contentful Paint*).
- Use sempre `next/image` com `sizes` responsivos bem calibrados e formatos modernos (WebP/AVIF automáticos do Next.js):
  ```tsx
  <Image
    src={property.coverImage}
    alt={property.title}
    fill
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    className="object-cover"
    priority={isFirstRow} // true apenas para os primeiros 3 cards da tela
  />
  ```

### D. Zero Layout Shift (CLS = 0)
- Todo card, skeleton e tabela deve ter dimensões reservadas idênticas entre o estado de carregamento e o estado final.
- Sempre especifique `aspect-ratio` nos contêineres de imagens (ex: `aspect-16/10` ou `aspect-4/3`).

---

## 2. Padrões de Segurança

### A. Validação Estrita na Borda do Frontend (Zod)
- Nunca confie em inputs do usuário ou em retornos externos sem validação.
- Formulários devem obrigatoriamente usar `zodResolver` com React Hook Form.

### B. Prevenção de XSS (Cross-Site Scripting)
- Jamais utilize `dangerouslySetInnerHTML`.
- Se houver descrições ricas de imóveis cadastradas por corretores, utilize sanitizadores comprovados como `DOMPurify` antes de qualquer renderização HTML.

### C. Gestão Segura de Sessão e Credenciais
- Não guarde tokens JWT ou senhas em `localStorage` ou `sessionStorage` (vulneráveis a roubo via scripts injetados).
- No frontend, prepare a infraestrutura para autenticação baseada em cookies seguros com `httpOnly`, `SameSite=Strict` e `Secure`.

### D. TypeScript Estrito (No Any)
- Ative o modo estrito no `tsconfig.json`:
  ```json
  {
    "compilerOptions": {
      "strict": true,
      "noImplicitAny": true,
      "strictNullChecks": true
    }
  }
  ```
