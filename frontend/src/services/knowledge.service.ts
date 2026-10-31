import type { KnowledgeSource, RagInteraction, RetrievedChunk } from "@/types/knowledge";

let sourcesStore: KnowledgeSource[] = [
  {
    id: "src-1",
    name: "Estudo_Tecnico_Plataforma_Imobiliaria_RAG_Piloto.docx",
    category: "DOCUMENTOS",
    origin: "GOOGLE_DRIVE",
    drivePath: "/Tenant-01/RAG/documentos/Estudo_Tecnico_Plataforma_Imobiliaria_RAG_Piloto.docx",
    fileSizeBytes: 47944,
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    status: "INDEXED",
    chunksCount: 42,
    tokensCount: 16800,
    updatedAt: "2026-10-30T15:53:00Z",
  },
  {
    id: "src-2",
    name: "Manual_Politica_Comercial_Comissoes_2026.pdf",
    category: "CONTRATOS",
    origin: "GOOGLE_DRIVE",
    drivePath: "/Tenant-01/RAG/contratos/Manual_Politica_Comercial_Comissoes_2026.pdf",
    fileSizeBytes: 284100,
    mimeType: "application/pdf",
    status: "INDEXED",
    chunksCount: 18,
    tokensCount: 7200,
    updatedAt: "2026-10-28T11:20:00Z",
  },
  {
    id: "src-3",
    name: "Inventario_Carteira_Imoveis_Atualizado.xlsx",
    category: "PLANILHAS",
    origin: "GOOGLE_DRIVE",
    drivePath: "/Tenant-01/RAG/planilhas/Inventario_Carteira_Imoveis_Atualizado.xlsx",
    fileSizeBytes: 154200,
    mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    status: "INDEXED",
    chunksCount: 65,
    tokensCount: 24500,
    updatedAt: "2026-10-30T09:00:00Z",
  },
  {
    id: "src-4",
    name: "Transcricoes_Conversas_Qualificacao_WhatsApp.txt",
    category: "CONVERSAS",
    origin: "WHATSAPP_BAILEYS",
    drivePath: "/Tenant-01/RAG/conversas/Transcricoes_Conversas_Qualificacao_WhatsApp.txt",
    fileSizeBytes: 38900,
    mimeType: "text/plain",
    status: "INDEXED",
    chunksCount: 22,
    tokensCount: 8800,
    updatedAt: "2026-10-29T18:45:00Z",
  },
  {
    id: "src-5",
    name: "Minuta_Contrato_Locacao_ShortStay_Garantias.pdf",
    category: "CONTRATOS",
    origin: "UPLOAD_MANUAL",
    fileSizeBytes: 98400,
    mimeType: "application/pdf",
    status: "PROCESSING",
    chunksCount: 0,
    tokensCount: 0,
    updatedAt: "2026-10-30T16:20:00Z",
  }
];

export const KnowledgeService = {
  async listSources(): Promise<KnowledgeSource[]> {
    await new Promise((r) => setTimeout(r, 90));
    return [...sourcesStore];
  },

  async reprocessSource(id: string): Promise<KnowledgeSource | null> {
    await new Promise((r) => setTimeout(r, 150));
    const index = sourcesStore.findIndex((s) => s.id === id);
    if (index === -1) return null;
    sourcesStore[index] = {
      ...sourcesStore[index],
      status: "PROCESSING",
      updatedAt: new Date().toISOString(),
    };
    return sourcesStore[index];
  },

  async queryRag(question: string): Promise<RagInteraction> {
    const start = Date.now();
    await new Promise((r) => setTimeout(r, 380)); // Simula latência de embedding + pgvector

    const qLower = question.toLowerCase();

    let answer = "Com base nos documentos indexados da imobiliária, identifiquei as diretrizes operacionais correspondentes.";
    let chunks: RetrievedChunk[] = [];

    if (qLower.includes("comiss") || qLower.includes("corretor") || qLower.includes("valor")) {
      answer = "A política comercial de 2026 estabelece que a taxa padrão de corretagem para venda de imóveis urbanos residenciais é de 6% sobre o VGV da transação, rateada entre o corretor captador (40%) e o corretor vendedor (60%). Para contratos de locação residencial, o valor corresponde a 100% do primeiro aluguel.";
      chunks = [
        {
          id: "chk-1",
          sourceId: "src-2",
          sourceName: "Manual_Politica_Comercial_Comissoes_2026.pdf",
          category: "CONTRATOS",
          pageOrReference: "Página 4, Seção 2.1 (Tabela de Repasse)",
          content: "A comissão padrão incidente sobre alienações imobiliárias homologadas é de 6,0% (seis por cento), distribuída na proporção de 40% ao captador e 60% ao fechador.",
          relevanceScore: 97.4,
        },
        {
          id: "chk-2",
          sourceId: "src-1",
          sourceName: "Estudo_Tecnico_Plataforma_Imobiliaria_RAG_Piloto.docx",
          category: "DOCUMENTOS",
          pageOrReference: "Seção 14 (Modelo de Dados - Payments e Contracts)",
          content: "Entidades transacionais como imoveis, clientes, contratos e pagamentos devem continuar em tabelas proprias, com colunas tipadas e relacionamentos.",
          relevanceScore: 88.2,
        }
      ];
    } else if (qLower.includes("rag") || qLower.includes("piloto") || qLower.includes("whatsapp") || qLower.includes("drive")) {
      answer = "O piloto da plataforma unifica arquivos heterogêneos mantendo os originais no Google Drive organizados por tenant (/Tenant/RAG/documentos). A camada de ingestão extrai texto, divide em fragmentos semânticos e armazena os embeddings no PostgreSQL com extensão pgvector. O assistente responde diretamente com citação exata da fonte consultada.";
      chunks = [
        {
          id: "chk-3",
          sourceId: "src-1",
          sourceName: "Estudo_Tecnico_Plataforma_Imobiliaria_RAG_Piloto.docx",
          category: "DOCUMENTOS",
          pageOrReference: "Seção 4 (Como unificar fontes diferentes)",
          content: "O desenho recomendado é uma camada de ingestão com conectores específicos por origem e um modelo canônico de conhecimento, preservando o arquivo original no Google Drive.",
          relevanceScore: 98.8,
        },
        {
          id: "chk-4",
          sourceId: "src-1",
          sourceName: "Estudo_Tecnico_Plataforma_Imobiliaria_RAG_Piloto.docx",
          category: "DOCUMENTOS",
          pageOrReference: "Seção 13 (Frontend do piloto)",
          content: "A visualização dos trechos recuperados é essencial no piloto para entender se a resposta foi fundamentada em evidências reais.",
          relevanceScore: 95.1,
        }
      ];
    } else {
      answer = `Analisando a base documental para a questão "${question}", o sistema recuperou trechos de inventário de imóveis e especificações operacionais com alta similaridade semântica.`;
      chunks = [
        {
          id: "chk-5",
          sourceId: "src-3",
          sourceName: "Inventario_Carteira_Imoveis_Atualizado.xlsx",
          category: "PLANILHAS",
          pageOrReference: "Aba 'Imoveis_Ativos', Linhas 12 a 28",
          content: "AP-1082: Itaim Bibi, 185m2, 3 suites, 3 vagas, R$ 3.850.000, Cond. R$ 2.400. Status: Disponivel para visitas agendadas.",
          relevanceScore: 92.5,
        }
      ];
    }

    return {
      id: `rag-${Date.now()}`,
      question,
      answer,
      retrievedChunks: chunks,
      latencyMs: Date.now() - start,
      model: "text-embedding-3-small + gpt-4o",
      createdAt: new Date().toISOString(),
    };
  }
};
