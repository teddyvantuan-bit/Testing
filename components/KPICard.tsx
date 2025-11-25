import React from 'react';
import { getProgressBarColor } from '../utils/calculations';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: number;
  target: number;
  unit?: string;
  type?: 'higherIsBetter' | 'lowerIsBetter';
}

export const KPICard: React.FC<KPICardProps> = ({ 
  title, 
  value, 
  target, 
  unit = '%', 
  type = 'higherIsBetter',
}) => {
  const isGood = type === 'higherIsBetter' ? value >= target : value <= target;
  const textColor = isGood ? 'text-emerald-600' : 'text-rose-600';
  const bgColor = isGood ? 'bg-emerald-50' : 'bg-rose-50';
  
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-2 z-10 relative">
        <div>
            <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest mb-1">{title}</p>
            <div className="flex items-baseline gap-2">
                <span className={`text-4xl font-black tracking-tight ${textColor}`}>{value}{unit}</span>
            </div>
        </div>
        
        <div className={`flex items-center justify-center w-10 h-10 rounded-2xl ${bgColor} ${textColor} transition-colors`}>
            {isGood ? <TrendingUp size={20} strokeWidth={2.5} /> : <TrendingDown size={20} strokeWidth={2.5} />}
        </div>
      </div>

      {/* Target Subtext */}
      <div className="flex items-center gap-1.5 mb-8 text-xs font-medium text-slate-400">
        <span>Target: {target}{unit}</span>
        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${isGood ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
            {isGood ? 'MET' : 'MISSED'}
        </span>
      </div>

      {/* Progress Footer */}
      <div className="flex items-center gap-3">
          <div className="flex-1 bg-slate-50 rounded-full h-2 overflow-hidden border border-slate-100">
            <div 
                className={`h-full rounded-full ${getProgressBarColor(value, target, type)} transition-all duration-1000 ease-out shadow-sm`} 
                style={{ width: `${type === 'lowerIsBetter' ? Math.min((target/value)*60, 100) : Math.min((value/target)*85, 100)}%` }} 
            ></div>
          </div>
      </div>
    </div>
  );
};