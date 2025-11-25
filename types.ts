export type TeamType = 'HIVA' | 'NON_HIVA';

export interface KPITargets {
  csat: number; // Percentage
  neCrt: number; // Percentage
  aht: number; // Minutes
  triageSla: number; // Percentage
  qaScore: number; // Percentage
  qaGate: number; // Percentage (85%)
  productiveAux: number; // Percentage (90%)
  unplannedLeave: number; // Days (1)
}

export interface AgentMetrics {
  id: string;
  name: string;
  team: TeamType;
  csat: number;
  neCrt: number;
  aht: number;
  triageSla: number;
  qaScore: number;
  productiveAux: number;
  unplannedLeave: number;
  avatarUrl?: string;
}

export interface GateStatus {
  passed: boolean;
  failedReason?: string[];
}

export interface CoachingLog {
  id: string;
  agentId: string;
  date: string;
  metricFocus: string; // e.g., "QA Score"
  observation: string;
  actionPlan: string;
  commitment: string;
}
