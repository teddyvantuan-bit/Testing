import { AgentMetrics, GateStatus, KPITargets } from '../types';

export const checkGatekeeper = (agent: AgentMetrics, targets: KPITargets): GateStatus => {
  const reasons: string[] = [];
  
  if (agent.unplannedLeave > targets.unplannedLeave) {
    reasons.push(`Unplanned Leave: ${agent.unplannedLeave} days (Max ${targets.unplannedLeave})`);
  }
  
  if (agent.productiveAux < targets.productiveAux) {
    reasons.push(`Productive Aux: ${agent.productiveAux}% (Min ${targets.productiveAux}%)`);
  }
  
  // Gatekeeper QA score is often strict 85%, while incentive target might be 90%
  if (agent.qaScore < targets.qaGate) {
    reasons.push(`QA Score: ${agent.qaScore}% (Gate ${targets.qaGate}%)`);
  }

  return {
    passed: reasons.length === 0,
    failedReason: reasons
  };
};

export const getStatusColor = (val: number, target: number, type: 'higherIsBetter' | 'lowerIsBetter' = 'higherIsBetter') => {
  const isGood = type === 'higherIsBetter' ? val >= target : val <= target;
  // Simple Red/Green for now, could add Amber for "near miss"
  return isGood ? 'text-emerald-600' : 'text-rose-600';
};

export const getProgressBarColor = (val: number, target: number, type: 'higherIsBetter' | 'lowerIsBetter' = 'higherIsBetter') => {
    const isGood = type === 'higherIsBetter' ? val >= target : val <= target;
    return isGood ? 'bg-emerald-500' : 'bg-rose-500';
}
