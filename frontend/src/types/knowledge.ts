export type IngestionStatus = 'PENDING' | 'PROCESSING' | 'INDEXED' | 'ERROR';

export type KnowledgeCategory = 
  | 'DOCUMENTOS'
  | 'CONVERSAS'
  | 'ANUNCIOS'
  | 'PLANILHAS'
  | 'CONTRATOS';

export interface KnowledgeSource {
  id: string;
  name: string;
  category: KnowledgeCategory;
  origin: 'GOOGLE_DRIVE' | 'UPLOAD_MANUAL' | 'WHATSAPP_BAILEYS';
  drivePath?: string;
  fileSizeBytes: number;
  mimeType: string;
  status: IngestionStatus;
  chunksCount: number;
  tokensCount?: number;
  errorMessage?: string;
  updatedAt: string;
}

export interface RetrievedChunk {
  id: string;
  sourceId: string;
  sourceName: string;
  category: KnowledgeCategory;
  pageOrReference: string;
  content: string;
  relevanceScore: number; // 0 a 100%
}

export interface RagInteraction {
  id: string;
  question: string;
  answer: string;
  retrievedChunks: RetrievedChunk[];
  latencyMs: number;
  model: string;
  createdAt: string;
}
