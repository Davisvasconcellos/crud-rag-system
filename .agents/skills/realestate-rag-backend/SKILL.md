---
name: realestate-rag-backend
description: Especialista em arquitetura backend para ecossistemas imobiliários orientados a RAG (Retrieval-Augmented Generation) com Node.js/TypeScript, Express/Fastify, PostgreSQL (pgvector), Redis/BullMQ, integração OpenAI e Webhooks Evolution API (WhatsApp). Use ao construir ou refatorar APIs REST, pipelines de ingestão de documentos (Drive/PDF/Planilhas), busca vetorial semântica, autenticação segura (JWT/RBAC), orquestração de chat RAG e testes automatizados com Vitest.
---

# Real Estate RAG Backend Specialist

Guia definitivo de engenharia backend, arquitetura de software, pipeline de inteligência artificial (RAG) e mensageria WhatsApp para o ecossistema imobiliário.

---

## 🎯 Objetivo & Visão do Projeto

Construir uma API backend robusta, segura e performática em **Node.js + TypeScript** que atue como núcleo de processamento do ecossistema imobiliário e piloto de RAG, conectando:
1. **Frontend Administrativo (Next.js 14+)**: Consumo de métricas VGV, gestão da carteira de imóveis, pipeline Kanban de leads/CRM e laboratório interativo de testes RAG.
2. **Camada de Dados & Vetores (PostgreSQL + pgvector)**: Armazenamento relacional dos imóveis, clientes, corretores e índices vetoriais de fragmentos (chunks) de conhecimento.
3. **Pipeline de Ingestão & Chunking**: Leitura assíncrona de arquivos do Google Drive/locais (.pdf de contratos, .docx, .xlsx de tabelas de vendas, transcrições) com extração semântica e embeddings.
4. **Orquestrador de IA / RAG (OpenAI API)**: Embeddings (`text-embedding-3-small`), busca semântica por similaridade de cosseno, re-ranking e montagem de respostas fundamentadas com citação exata de fontes.
5. **Gateway de Mensageria (Evolution API / WhatsApp)**: Webhook receptor de mensagens de clientes e corretores, deduplicação por idempotência, consulta à base RAG e devolução de respostas fundamentadas via WhatsApp.
6. **Filas & Concorrência (Redis + BullMQ)**: Ingestão pesada e vetorização em background, mantendo o event loop da API com latência P99 < 300ms.

---

## 🛠️ Stack Tecnológica de Referência

| Camada | Tecnologia | Propósito |
|---|---|---|
| **Runtime & Linguagem** | Node.js 20+ (LTS) / TypeScript 5.4+ | Tipagem estrita em todo o fluxo de dados (strict mode) |
| **Framework HTTP** | Express.js ou Fastify | Rotas REST modulares, middlewares de segurança e validação |
| **Banco Relacional & Vetorial** | PostgreSQL 16 + extensão `pgvector` | Dados relacionais (imóveis, leads) e vetores (1536 dimensões) |
| **ORM / Query Builder** | Prisma ou Drizzle ORM | Migrações seguras, tipagem ponta a ponta e queries parametrizadas |
| **Filas & Jobs Assíncronos** | Redis + BullMQ | Ingestão de arquivos, geração de embeddings e webhooks em background |
| **Embeddings & LLM** | OpenAI API (`text-embedding-3-small` / `gpt-4o-mini`) | Geração de representações vetoriais e respostas fundamentadas |
| **Validação de Schemas** | Zod | Validação rígida de payloads HTTP, variáveis de ambiente e DTOs |
| **Autenticação & Segurança** | JWT (RS256 ou HS256 seguro), Argon2/bcrypt, Helmet | Sessões seguras, proteção contra injeções e OWASP Top 10 |
| **Mensageria WhatsApp** | Evolution API (Baileys) | Gateway de comunicação via WhatsApp conectado à IA |
| **Testes Automatizados** | Vitest + Supertest | Testes unitários, mocks de LLM e testes de integração de rotas |

---

## 📁 Estrutura de Pastas Recomendada (Modular Monolith)

```
backend/
├── src/
│   ├── config/                     # Configurações de ambiente validadas com Zod (env.ts, database.ts)
│   ├── database/
│   │   ├── migrations/             # Migrações SQL versionadas (incluindo CREATE EXTENSION vector)
│   │   ├── prisma/                 # Schema Prisma / Drizzle
│   │   └── client.ts               # Conexão singleton com PostgreSQL / pgvector
│   ├── modules/
│   │   ├── auth/                   # Autenticação, emissão e rotação de tokens JWT, RBAC
│   │   ├── properties/             # Gestão de imóveis (CRUD, tipologias, valores, filtros avançados)
│   │   ├── leads/                  # CRM imobiliário, estágios do funil Kanban e histórico de interações
│   │   ├── rag/                    # Motor de Inteligência Artificial:
│   │   │   ├── ingestion/          # Parsers de PDF, DOCX, XLSX e chunking semântico
│   │   │   ├── embeddings/         # Cliente OpenAI para text-embedding-3-small
│   │   │   ├── retrieval/          # Busca vetorial no pgvector (cosine distance <=>), filtros e rerank
│   │   │   └── prompt/             # Prompts de grounding, contextualização e formatação de citações
│   │   ├── evolution/              # Integração WhatsApp (Evolution API):
│   │   │   ├── webhook.controller.ts # Receptor de webhooks de mensagens
│   │   │   ├── evolution.service.ts  # Envio de mensagens e status de conexão
│   │   │   └── session.manager.ts    # Gestão da instância e QR Code
│   │   └── metrics/                # Métricas operacionais (VGV consolidado, vacância, latência RAG)
│   ├── shared/
│   │   ├── middlewares/            # AuthMiddleware, RateLimiter, ErrorHandler, Logging
│   │   ├── errors/                 # Classes padronizadas de erro (AppError, ValidationError, NotFoundError)
│   │   ├── queue/                  # Configuração BullMQ (document-ingestion-queue, whatsapp-queue)
│   │   └── utils/                  # Formatadores de moeda, cálculo de tokens, helpers
│   ├── app.ts                      # Instanciação da aplicação Express/Fastify com middlewares
│   └── server.ts                   # Bootstrapping do servidor HTTP
├── tests/
│   ├── unit/                       # Testes de chunking, cálculo de VGV, validação de schemas
│   ├── integration/                # Testes de endpoints REST e persistência no banco
│   └── mocks/                      # Mocks do OpenAI, Evolution API e Google Drive
├── package.json
├── tsconfig.json
└── vitest.config.ts
```

---

## 🧠 Arquitetura do Pipeline RAG Imobiliário

```mermaid
flowchart TD
    A[Fontes de Conhecimento\nGoogle Drive / PDFs / Planilhas] -->|Upload / Sync| B(Job Queue BullMQ\nRedis)
    B --> C[Document Parser\nPDF/DOCX/XLSX Extractor]
    C --> D[Text Splitter Semântico\n500-1000 tokens / 15% overlap]
    D --> E[OpenAI text-embedding-3-small\n1536 dimensões]
    E --> F[(PostgreSQL + pgvector\nTabela document_chunks)]

    G[Mensagem WhatsApp\nEvolution API] --> H[Webhook Gateway]
    I[Pergunta no Painel\nLaboratório RAG] --> J[REST API Gateway]

    H --> K[Orquestrador RAG]
    J --> K[Orquestrador RAG]

    K --> L[Gera Embedding da Pergunta]
    L --> M[Busca Vetorial por Cosseno\n<=> operator no pgvector]
    M --> N[Filtragem por Metadata\nCategoria / Status / Permissão]
    N --> O[Top Chunks Recuperados\n+ Relevância Score]
    O --> P[Geração Fundamentada\nOpenAI GPT-4o-mini]
    P --> Q[Resposta com Citações Exatas\n[Doc: Contrato Venda, pág 3]]
    Q -->|Retorno HTTP| I
    Q -->|Disparo WhatsApp| G
```

---

## 📑 Modelo de Dados Essencial (PostgreSQL + pgvector)

### 1. Habilitando a Extensão e Tipos Vetoriais
```sql
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

### 2. Tabela de Fontes e Documentos
```sql
CREATE TABLE knowledge_sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    origin VARCHAR(50) NOT NULL, -- 'DRIVE', 'UPLOAD', 'WHATSAPP'
    drive_file_id VARCHAR(255),
    file_size_bytes BIGINT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'CONTRATOS', 'PLANILHAS', 'MANUAIS', 'CONVERSAS'
    status VARCHAR(30) NOT NULL DEFAULT 'PENDING', -- 'PROCESSING', 'INDEXED', 'ERROR'
    chunks_count INT DEFAULT 0,
    tokens_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Tabela de Fragmentos (Chunks) com pgvector
```sql
CREATE TABLE document_chunks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_id UUID NOT NULL REFERENCES knowledge_sources(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    chunk_index INT NOT NULL,
    tokens_count INT NOT NULL,
    page_or_reference VARCHAR(100),
    metadata JSONB DEFAULT '{}'::jsonb,
    embedding vector(1536) NOT NULL, -- Dimensões do text-embedding-3-small
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índice HNSW para busca vetorial de altíssima velocidade (< 20ms)
CREATE INDEX idx_document_chunks_embedding_hnsw 
ON document_chunks 
USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- Índice GIN para metadados JSONB (filtragem híbrida rápida)
CREATE INDEX idx_document_chunks_metadata ON document_chunks USING gin (metadata);
```

### 4. Query Canônica de Busca Semântica
```sql
SELECT 
    c.id,
    c.content,
    c.page_or_reference,
    s.name AS source_name,
    s.category,
    1 - (c.embedding <=> $1::vector) AS similarity_score
FROM document_chunks c
JOIN knowledge_sources s ON s.id = c.source_id
WHERE (c.metadata->>'tenant_id' = $2 OR $2 IS NULL)
  AND (1 - (c.embedding <=> $1::vector)) >= $3 -- Threshold mínimo (ex: 0.72)
ORDER BY c.embedding <=> $1::vector ASC
LIMIT $4;
```

---

## 🔒 Princípios Inegociáveis de Segurança & Robustez (OWASP)

1. **Validação Rígida de Entrada (Zero Trust Input)**:
   - Toda rota que recebe dados **deve** validar o payload através de um schema Zod antes de qualquer chamada a serviços ou banco de dados.
   - Rejeição imediata (`400 Bad Request`) com detalhamento claro de campos inválidos.

2. **Prevenção a SQL Injection**:
   - Jamais interpolar strings em comandos SQL (`SELECT ... + userInput`).
   - Usar query builders com parâmetros nomeados (`$1, $2`) ou ORM tipado.

3. **Proteção de Segredos & Variáveis de Ambiente**:
   - Variáveis críticas (`DATABASE_URL`, `OPENAI_API_KEY`, `JWT_SECRET`, `EVOLUTION_API_KEY`) validadas no boot via schema Zod. Se alguma estiver ausente ou incorreta, o servidor recusa iniciar.
   - Nunca expor chaves de API ou tokens em respostas de erro ou logs.

4. **Rate Limiting & Anti-Abuso**:
   - Rate limiting global na API (`100 req / min`).
   - Rate limiting restritivo em rotas de IA/RAG (`20 req / min por IP/usuário`) e webhooks para evitar estouro de custos com OpenAI.

5. **Idempotência no Webhook do WhatsApp**:
   - Armazenar o `message_id` recebido no Redis com TTL de 24h. Se a Evolution API reenviar o mesmo webhook, ignorar processamento duplicado imediatamente.

---

## 🧪 Estratégia de Testes Automatizados (Vitest)

Para cada módulo backend construído, seguir a pirâmide de testes:
1. **Testes Unitários**:
   - Algoritmo de chunking (garantir overlap e tamanho máximo sem quebrar sentenças).
   - Validação de DTOs e Schemas Zod (happy path, campos vazios, tipos errados).
   - Cálculo de métricas financeiras (VGV, taxas de comissão 6% e divisão captador/vendedor).
2. **Testes de Integração**:
   - Endpoints REST com banco PostgreSQL em memória ou container de teste.
   - Mocking do cliente OpenAI e da Evolution API para garantir determinismo e zero custo em CI/CD.
3. **Critérios de Sucesso (DoD)**:
   - Zero erros em `npx tsc --noEmit`.
   - 100% de passagem nos testes da suíte (`npm run test`).
   - Respostas de erro no formato padronizado com código HTTP correto.

---

## 📋 Padrão de Respostas HTTP

### Sucesso:
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "timestamp": "2026-10-30T23:30:00.000Z",
    "requestId": "req-98fa-12bc"
  }
}
```

### Erro:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Parâmetros inválidos na requisição.",
    "details": [
      { "field": "price", "message": "O preço do imóvel deve ser maior que zero." }
    ]
  },
  "meta": {
    "timestamp": "2026-10-30T23:30:00.000Z",
    "requestId": "req-98fa-12bc"
  }
}
```
