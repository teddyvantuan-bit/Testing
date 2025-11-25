export type TeamType = 'HIVA' | 'NON_HIVA';

export interface KPITargets {
  csat: number; // Percentage
  neCrt: number; // Percentage
  aht: number; // Minutes
  triageSla: number; // Percentage
  lg: number; // Percentage (New metric, Target 42%)
  qaScore: number; // Percentage
  qaGate: number; // Percentage (85%)
  productiveAux: number; // Percentage (90%)
  unplannedLeave: number; // Days (1)
  raScore?: number; 
  hvaIsTimeSla?: number;
}

export interface AgentMetrics {
  id: string;
  name: string;
  team: TeamType;
  csat: number;
  neCrt: number;
  aht: number;
  triageSla: number;
  lg: number; // New metric
  qaScore: number;
  productiveAux: number;
  unplannedLeave: number;
  raScore?: number;
  hvaIsTimeSla?: number;
  avatarUrl?: string;
}

export interface GateStatus {
  passed: boolean;
  failedReason?: string[];
}