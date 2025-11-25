import React, { useState } from 'react';
import { AgentMetrics } from '../types';
import { HIVA_TARGETS, NON_HIVA_TARGETS } from '../constants';
import { generateCoachingPlan } from '../services/geminiService';
import { Sparkles, Save, RefreshCw, Send, BrainCircuit, MessageSquareText } from 'lucide-react';

interface CoachingToolProps {
  agents: AgentMetrics[];
}

export const CoachingTool: React.FC<CoachingToolProps> = ({ agents }) => {
  const [selectedAgentId, setSelectedAgentId] = useState<string>('');
  const [selectedMetric, setSelectedMetric] = useState<string>('');
  const [generatedPlan, setGeneratedPlan] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [context, setContext] = useState('');

  const selectedAgent = agents.find(a => a.id === selectedAgentId);

  const metrics = [
    { key: 'csat', label: 'CSAT' },
    { key: 'neCrt', label: 'NE CRT' },
    { key: 'aht', label: 'AHT' },
    { key: 'qaScore', label: 'QA Score' },
    { key: 'triageSla', label: 'Triage SLA' },
  ];

  const handleGenerate = async () => {
    if (!selectedAgent || !selectedMetric) return;

    setIsLoading(true);
    const targets = selectedAgent.team === 'HIVA' ? HIVA_TARGETS : NON_HIVA_TARGETS;
    const metricKey = selectedMetric as keyof AgentMetrics;
    const targetKey = selectedMetric as keyof typeof targets;
    
    const actual = selectedAgent[metricKey] as number;
    const target = targets[targetKey] as number;

    const plan = await generateCoachingPlan(
      selectedAgent,
      selectedMetric,
      actual,
      target,
      context
    );

    setGeneratedPlan(plan);
    setIsLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-140px)]">
      {/* Left Panel: Configuration */}
      <div className="lg:col-span-4 space-y-4">
        <div>
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <BrainCircuit className="text-blue-600" />
                AI Coach
            </h2>
            <p className="text-slate-500">Intelligent performance analysis.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col h-full max-h-[600px]">
            <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">1. Select Agent</label>
                    <div className="relative">
                        <select 
                            className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none appearance-none font-medium text-slate-700"
                            value={selectedAgentId}
                            onChange={(e) => setSelectedAgentId(e.target.value)}
                        >
                            <option value="">Choose an agent...</option>
                            {agents.map(agent => (
                                <option key={agent.id} value={agent.id}>{agent.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {selectedAgent && (
                    <div className="animate-fade-in">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">2. Focus Area</label>
                        <div className="grid grid-cols-2 gap-3">
                            {metrics.map(m => {
                                const targets = selectedAgent.team === 'HIVA' ? HIVA_TARGETS : NON_HIVA_TARGETS;
                                const val = selectedAgent[m.key as keyof AgentMetrics] as number;
                                const target = targets[m.key as keyof typeof targets] as number;
                                const isLowerBetter = m.key === 'aht';
                                const isBad = isLowerBetter ? val > target : val < target;
                                
                                return (
                                    <button
                                        key={m.key}
                                        onClick={() => setSelectedMetric(m.key)}
                                        className={`p-3 rounded-xl border text-left transition-all duration-200 relative overflow-hidden ${
                                            selectedMetric === m.key 
                                            ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500 shadow-sm' 
                                            : 'border-slate-100 hover:border-blue-200 hover:bg-slate-50'
                                        }`}
                                    >
                                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">{m.label}</div>
                                        <div className={`text-lg font-bold ${isBad ? 'text-rose-500' : 'text-emerald-500'}`}>
                                            {val}
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                )}

                <div className="animate-fade-in">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">3. Context (Optional)</label>
                    <textarea 
                        className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none h-32 resize-none text-sm transition-all"
                        placeholder="Add notes about specific incidents, attendance, or attitude..."
                        value={context}
                        onChange={(e) => setContext(e.target.value)}
                    ></textarea>
                </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100">
                <button 
                    onClick={handleGenerate}
                    disabled={!selectedAgent || !selectedMetric || isLoading}
                    className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-white transition-all transform active:scale-95 ${
                        !selectedAgent || !selectedMetric || isLoading
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg hover:shadow-blue-500/30'
                    }`}
                >
                    {isLoading ? <RefreshCw className="animate-spin" size={20} /> : <Sparkles size={20} />}
                    {isLoading ? 'Analyzing...' : 'Generate Plan'}
                </button>
            </div>
        </div>
      </div>

      {/* Right Panel: Output */}
      <div className="lg:col-span-8 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col overflow-hidden h-[650px]">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center backdrop-blur-sm">
            <div className="flex items-center gap-2 text-slate-700 font-semibold">
                <MessageSquareText size={18} className="text-blue-500"/>
                <span>Coaching Log</span>
            </div>
            {generatedPlan && (
                <button className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-sm text-slate-600 font-medium flex items-center gap-2 hover:text-blue-600 hover:border-blue-200 transition-colors shadow-sm">
                    <Save size={16} /> Save to Pulse
                </button>
            )}
        </div>
        
        <div className="flex-1 p-8 overflow-y-auto bg-white custom-scrollbar">
            {generatedPlan ? (
                <div 
                    className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-800 prose-p:text-slate-600 prose-li:text-slate-600 prose-strong:text-blue-700"
                    dangerouslySetInnerHTML={{ __html: generatedPlan }}
                />
            ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-300">
                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 animate-pulse">
                        <Send size={40} className="text-slate-200 ml-2" />
                    </div>
                    <p className="font-medium text-lg">Ready to assist.</p>
                    <p className="text-sm">Select metrics to generate a structured coaching plan.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};