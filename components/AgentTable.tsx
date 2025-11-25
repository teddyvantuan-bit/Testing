import React, { useState } from 'react';
import { AgentMetrics } from '../types';
import { HIVA_TARGETS, NON_HIVA_TARGETS } from '../constants';
import { checkGatekeeper } from '../utils/calculations';
import { AlertCircle, CheckCircle2, Search } from 'lucide-react';

interface AgentTableProps {
  agents: AgentMetrics[];
}

export const AgentTable: React.FC<AgentTableProps> = ({ agents }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTeam, setFilterTeam] = useState<'ALL' | 'HIVA' | 'NON_HIVA'>('ALL');

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTeam = filterTeam === 'ALL' || agent.team === filterTeam;
    return matchesSearch && matchesTeam;
  });

  return (
    <div className="space-y-6 animate-fade-in">
       <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Agent Performance Matrix</h2>
            <p className="text-slate-500 mt-1">Detailed breakdown of individual metrics and gatekeeper status.</p>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
        <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
                type="text" 
                placeholder="Search agents by name..." 
                className="w-full pl-10 pr-4 py-3 bg-transparent text-slate-700 placeholder-slate-400 focus:outline-none text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl">
             {(['ALL', 'HIVA', 'NON_HIVA'] as const).map(type => (
                 <button
                    key={type}
                    onClick={() => setFilterTeam(type)}
                    className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm ${
                        filterTeam === type 
                        ? 'bg-white text-blue-600 shadow-md' 
                        : 'bg-transparent text-slate-500 hover:text-slate-700 shadow-none'
                    }`}
                 >
                     {type === 'NON_HIVA' ? 'Non-Hiva' : type === 'ALL' ? 'All' : 'HIVA'}
                 </button>
             ))}
        </div>
      </div>

      {/* Modern Floating Table */}
      <div className="overflow-x-auto pb-4">
            <table className="w-full text-sm text-left border-separate border-spacing-y-3">
            <thead>
                <tr className="text-xs text-slate-400 uppercase tracking-wider">
                    <th className="px-6 py-2 font-medium">Agent</th>
                    <th className="px-6 py-2 font-medium text-center">Gate Status</th>
                    <th className="px-6 py-2 font-medium text-center">CSAT</th>
                    <th className="px-6 py-2 font-medium text-center">NE CRT</th>
                    <th className="px-6 py-2 font-medium text-center">AHT</th>
                    <th className="px-6 py-2 font-medium text-center">Triage</th>
                    <th className="px-6 py-2 font-medium text-center">LG</th>
                </tr>
            </thead>
            <tbody>
                {filteredAgents.map(agent => {
                    const targets = agent.team === 'HIVA' ? HIVA_TARGETS : NON_HIVA_TARGETS;
                    const gateStatus = checkGatekeeper(agent, targets);

                    return (
                        <tr key={agent.id} className="bg-white hover:shadow-md hover:scale-[1.005] transition-all duration-200 group rounded-2xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
                            <td className="px-6 py-4 rounded-l-2xl border-l-4 border-transparent hover:border-blue-500 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 p-0.5 ring-2 ring-white shadow-sm">
                                        <img 
                                            src={agent.avatarUrl || `https://ui-avatars.com/api/?name=${agent.name}&background=random`} 
                                            alt={agent.name} 
                                            className="w-full h-full rounded-full object-cover" 
                                        />
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-700">{agent.name}</div>
                                        <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wide">{agent.team === 'NON_HIVA' ? 'Non-Hiva' : 'HIVA'}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-center">
                                {gateStatus.passed ? (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                                        <CheckCircle2 size={14} /> Qualified
                                    </span>
                                ) : (
                                    <div className="group/tooltip relative inline-flex">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-rose-50 text-rose-600 border border-rose-100 cursor-help">
                                            <AlertCircle size={14} /> Failed
                                        </span>
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs bg-slate-800 text-white text-xs p-3 rounded-xl shadow-xl opacity-0 group-hover/tooltip:opacity-100 transition-opacity z-20 pointer-events-none">
                                            <div className="font-bold mb-1">Gatekeeper Failures:</div>
                                            <ul className="list-disc pl-3 space-y-1">
                                                {gateStatus.failedReason?.map(r => <li key={r}>{r}</li>)}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </td>
                            <td className={`px-6 py-4 text-center font-bold ${agent.csat >= targets.csat ? 'text-emerald-600' : 'text-rose-500'}`}>
                                {agent.csat}%
                            </td>
                            <td className={`px-6 py-4 text-center font-bold ${agent.neCrt >= targets.neCrt ? 'text-emerald-600' : 'text-rose-500'}`}>
                                {agent.neCrt}%
                            </td>
                            <td className={`px-6 py-4 text-center font-bold ${agent.aht <= targets.aht ? 'text-emerald-600' : 'text-rose-500'}`}>
                                {agent.aht}m
                            </td>
                            <td className={`px-6 py-4 text-center font-bold ${agent.triageSla >= targets.triageSla ? 'text-emerald-600' : 'text-rose-500'}`}>
                                {agent.triageSla}%
                            </td>
                            <td className={`px-6 py-4 text-center font-bold rounded-r-2xl ${agent.lg >= targets.lg ? 'text-emerald-600' : 'text-rose-500'}`}>
                                {agent.lg}%
                            </td>
                        </tr>
                    );
                })}
            </tbody>
            </table>
        </div>
    </div>
  );
};