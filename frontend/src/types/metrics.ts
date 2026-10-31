export interface OperationalMetrics {
  vgvTotal: number;
  vgvChangePercent: number;
  activePropertiesCount: number;
  activePropertiesChangePercent: number;
  activeLeadsCount: number;
  activeLeadsChangePercent: number;
  vacancyRatePercent: number;
  vacancyRateChangePercent: number;
  
  // RAG & IA Metrics
  totalRagQueriesMonth: number;
  avgRagLatencyMs: number;
  indexedDocumentsCount: number;
  knowledgeBaseTokens: number;
}
