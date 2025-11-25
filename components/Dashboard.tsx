import React from 'react';
import { AgentMetrics } from '../types';
import { HIVA_TARGETS, NON_HIVA_TARGETS } from '../constants';
import { checkGatekeeper } from '../utils/calculations';
import { KPICard } from './KPICard';
import { GatekeeperChart } from './GatekeeperChart';

interface DashboardProps {
  agents: AgentMetrics[];
}

export const Dashboard: React.FC<DashboardProps> = ({ agents }) => {
  const hivaAgents = agents.filter(a => a.team === 'HIVA');
  const nonHivaAgents = agents.filter(a => a.team === 'NON_HIVA');

  const calculateAvg = (list: AgentMetrics[], key: keyof AgentMetrics) => {
    if (list.length === 0) return 0;
    const sum = list.reduce((acc, curr) => acc + (curr[key] as number), 0);
    return Number((sum / list.length).toFixed(2));
  };

  const hivaStats = {
    csat: calculateAvg(hivaAgents, 'csat'),
    neCrt: calculateAvg(hivaAgents, 'neCrt'),
    aht: calculateAvg(hivaAgents, 'aht'),
    qaScore: calculateAvg(hivaAgents, 'qaScore'),
    triageSla: calculateAvg(hivaAgents, 'triageSla'),
    qualifiedCount: hivaAgents.filter(a => checkGatekeeper(a, HIVA_TARGETS).passed).length
  };

  const nonHivaStats = {
    csat: calculateAvg(nonHivaAgents, 'csat'),
    neCrt: calculateAvg(nonHivaAgents, 'neCrt'),
    aht: calculateAvg(nonHivaAgents, 'aht'),
    qaScore: calculateAvg(nonHivaAgents, 'qaScore'),
    triageSla: calculateAvg(nonHivaAgents, 'triageSla'),
    qualifiedCount: nonHivaAgents.filter(a => checkGatekeeper(a, NON_HIVA_TARGETS).passed).length
  };

  return (
    <div className="space-y-12 animate-fade-in pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
            <h2 className="text-3xl font-bold text-slate-700 tracking-tight">Executive Summary</h2>
            <p className="text-slate-400 mt-1 text-lg font-medium">M11 Performance Review & Audit Status</p>
        </div>
        <div className="flex gap-2">
            <span className="px-4 py-1.5 bg-white border border-slate-100 rounded-xl text-sm font-semibold text-slate-500 shadow-sm text-center min-w-[100px]">
                Nov 2024
            </span>
        </div>
      </div>

      {/* Gatekeeper Section */}
      <section>
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Incentive Gatekeepers</h3>
            <div className="h-px w-full bg-slate-100"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <GatekeeperChart 
                title="HIVA Qualification" 
                qualified={hivaStats.qualifiedCount} 
                total={hivaAgents.length} 
            />
            <GatekeeperChart 
                title="Non-Hiva Qualification" 
                qualified={nonHivaStats.qualifiedCount} 
                total={nonHivaAgents.length} 
            />
          </div>
      </section>

      {/* HIVA Detail Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-600 font-bold">H</span>
                <h3 className="text-xl font-bold text-slate-600">HIVA Team</h3>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-slate-100 shadow-sm">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wide">Target Index</span>
                <span className="text-sm font-bold text-blue-600">81%</span>
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard title="CSAT" value={hivaStats.csat} target={HIVA_TARGETS.csat} />
            <KPICard title="NE CRT" value={hivaStats.neCrt} target={HIVA_TARGETS.neCrt} />
            <KPICard title="AHT" value={hivaStats.aht} target={HIVA_TARGETS.aht} unit="m" type="lowerIsBetter" />
            <KPICard title="QA Score" value={hivaStats.qaScore} target={HIVA_TARGETS.qaScore} />
        </div>
      </section>

       {/* Non-HIVA Detail Section */}
       <section>
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 font-bold">N</span>
                <h3 className="text-xl font-bold text-slate-600">Non-Hiva Team</h3>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-slate-100 shadow-sm">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wide">Target Index</span>
                <span className="text-sm font-bold text-emerald-600">74%</span>
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard title="CSAT" value={nonHivaStats.csat} target={NON_HIVA_TARGETS.csat} />
            <KPICard title="NE CRT" value={nonHivaStats.neCrt} target={NON_HIVA_TARGETS.neCrt} />
            <KPICard title="AHT" value={nonHivaStats.aht} target={NON_HIVA_TARGETS.aht} unit="m" type="lowerIsBetter" />
            <KPICard title="QA Score" value={nonHivaStats.qaScore} target={NON_HIVA_TARGETS.qaScore} />
        </div>
      </section>
    </div>
  );
};