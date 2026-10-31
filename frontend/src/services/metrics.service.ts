import type { OperationalMetrics } from "@/types/metrics";

export const MetricsService = {
  async getSummary(): Promise<OperationalMetrics> {
    await new Promise((r) => setTimeout(r, 60));
    return {
      vgvTotal: 20900000, // R$ 20.9 Milhões
      vgvChangePercent: 14.8,
      activePropertiesCount: 6,
      activePropertiesChangePercent: 8.2,
      activeLeadsCount: 18,
      activeLeadsChangePercent: 23.5,
      vacancyRatePercent: 4.2,
      vacancyRateChangePercent: -1.1, // Redução de vacância é positivo
      totalRagQueriesMonth: 1240,
      avgRagLatencyMs: 340,
      indexedDocumentsCount: 5,
      knowledgeBaseTokens: 57300,
    };
  },

  async getVgvMonthlyHistory(): Promise<{ month: string; vgvRealizado: number; metaVgv: number }[]> {
    await new Promise((r) => setTimeout(r, 50));
    return [
      { month: "Mai", vgvRealizado: 2800000, metaVgv: 2500000 },
      { month: "Jun", vgvRealizado: 3400000, metaVgv: 3000000 },
      { month: "Jul", vgvRealizado: 3100000, metaVgv: 3200000 },
      { month: "Ago", vgvRealizado: 4200000, metaVgv: 3500000 },
      { month: "Set", vgvRealizado: 4800000, metaVgv: 4000000 },
      { month: "Out", vgvRealizado: 5200000, metaVgv: 4500000 },
    ];
  },

  async getPropertiesDistribution(): Promise<{ name: string; value: number; color: string }[]> {
    await new Promise((r) => setTimeout(r, 40));
    return [
      { name: "Apartamentos", value: 45, color: "#0f3d3e" },
      { name: "Casas em Condomínio", value: 30, color: "#059669" },
      { name: "Coberturas", value: 15, color: "#34d399" },
      { name: "Comercial / Salas", value: 10, color: "#94a3b8" },
    ];
  }
};
