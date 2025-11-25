import { AgentMetrics, KPITargets } from './types';

export const HIVA_TARGETS: KPITargets = {
  csat: 81,
  neCrt: 85,
  aht: 24,
  triageSla: 90,
  qaScore: 90,
  qaGate: 85,
  productiveAux: 90,
  unplannedLeave: 1,
};

export const NON_HIVA_TARGETS: KPITargets = {
  csat: 74,
  neCrt: 85,
  aht: 24,
  triageSla: 90,
  qaScore: 90,
  qaGate: 85,
  productiveAux: 90,
  unplannedLeave: 1,
};

// Mock Data simulating the "M11 Performance"
export const MOCK_AGENTS: AgentMetrics[] = [
  {
    id: '1',
    name: 'Thi My Duyen Truong',
    team: 'HIVA',
    csat: 75.0,
    neCrt: 93.0,
    aht: 22.11,
    triageSla: 85.71,
    qaScore: 76.2, // Below gate
    productiveAux: 92,
    unplannedLeave: 0,
    avatarUrl: 'https://picsum.photos/seed/duyen/200',
  },
  {
    id: '2',
    name: 'Nguyen Van A',
    team: 'HIVA',
    csat: 85.0,
    neCrt: 88.0,
    aht: 19.5,
    triageSla: 95.0,
    qaScore: 88.0,
    productiveAux: 95,
    unplannedLeave: 0,
    avatarUrl: 'https://picsum.photos/seed/nguyen/200',
  },
  {
    id: '3',
    name: 'Tran Thi B',
    team: 'HIVA',
    csat: 60.0,
    neCrt: 80.0,
    aht: 25.0,
    triageSla: 80.0,
    qaScore: 82.0, // Below gate
    productiveAux: 88, // Below gate
    unplannedLeave: 2, // Below gate
    avatarUrl: 'https://picsum.photos/seed/tran/200',
  },
  {
    id: '4',
    name: 'Le Van C',
    team: 'NON_HIVA',
    csat: 80.0,
    neCrt: 87.0,
    aht: 19.13,
    triageSla: 86.96,
    qaScore: 95.24,
    productiveAux: 91,
    unplannedLeave: 0,
    avatarUrl: 'https://picsum.photos/seed/le/200',
  },
  {
    id: '5',
    name: 'Pham Thi D',
    team: 'NON_HIVA',
    csat: 72.0, // Below target but might pass gate
    neCrt: 86.0,
    aht: 23.0,
    triageSla: 92.0,
    qaScore: 84.0, // Fail gate
    productiveAux: 93,
    unplannedLeave: 1,
    avatarUrl: 'https://picsum.photos/seed/pham/200',
  },
  {
    id: '6',
    name: 'Hoang Van E',
    team: 'NON_HIVA',
    csat: 78.0,
    neCrt: 89.0,
    aht: 21.0,
    triageSla: 94.0,
    qaScore: 87.0,
    productiveAux: 96,
    unplannedLeave: 0,
    avatarUrl: 'https://picsum.photos/seed/hoang/200',
  },
  // Adding more to match the 10 HIVA / 7 Non-HIVA count roughly
  { id: '7', name: 'Agent H1', team: 'HIVA', csat: 82, neCrt: 86, aht: 20, triageSla: 91, qaScore: 91, productiveAux: 92, unplannedLeave: 0 },
  { id: '8', name: 'Agent H2', team: 'HIVA', csat: 83, neCrt: 87, aht: 21, triageSla: 92, qaScore: 84, productiveAux: 90, unplannedLeave: 0 },
  { id: '9', name: 'Agent H3', team: 'HIVA', csat: 79, neCrt: 84, aht: 23, triageSla: 89, qaScore: 86, productiveAux: 91, unplannedLeave: 1 },
  { id: '10', name: 'Agent N1', team: 'NON_HIVA', csat: 75, neCrt: 86, aht: 22, triageSla: 91, qaScore: 88, productiveAux: 94, unplannedLeave: 0 },
];
