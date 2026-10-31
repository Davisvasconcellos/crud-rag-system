export type LeadStage = 
  | 'NOVO'
  | 'QUALIFICADO'
  | 'VISITA_AGENDADA'
  | 'PROPOSTA'
  | 'FECHADO'
  | 'PERDIDO';

export interface NextAction {
  type: 'LIGAR' | 'VISITA' | 'PROPOSTA' | 'FUP' | 'TAREFA';
  label: string;
  dateStr: string;
  isUrgent?: boolean;
}

export interface Lead {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone: string;
  source: 'WHATSAPP_EVOLUTION' | 'SITE' | 'PORTAL_ZAP' | 'INDICACAO' | 'MANUAL';
  stage: LeadStage;
  propertyInterestCode?: string;
  propertyInterestTitle?: string;
  budgetMax?: number;
  dealValue?: number;
  assignedBrokerName: string;
  lastContactAt: string;
  notes?: string;
  createdAt: string;
  statusBadge?: string;
  rating?: number;
  nextAction?: NextAction;
}
