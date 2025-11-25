
// This service is disabled to remove API Key requirements.
// It is kept as a placeholder to prevent build errors if imported elsewhere.

import { AgentMetrics } from "../types";

export const generateCoachingPlan = async (
  agent: AgentMetrics,
  metricName: string,
  actualValue: number,
  targetValue: number,
  context: string = ""
): Promise<string> => {
  return "<p>AI Coaching is currently disabled.</p>";
};
