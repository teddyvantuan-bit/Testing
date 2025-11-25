
import React from 'react';
import { AgentMetrics } from '../types';

interface CoachingToolProps {
  agents: AgentMetrics[];
}

export const CoachingTool: React.FC<CoachingToolProps> = () => {
  return (
    <div className="p-10 text-center text-slate-400">
      Feature Disabled.
    </div>
  );
};
