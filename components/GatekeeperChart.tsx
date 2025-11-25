import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface GatekeeperChartProps {
  qualified: number;
  total: number;
  title: string;
}

export const GatekeeperChart: React.FC<GatekeeperChartProps> = ({ qualified, total, title }) => {
  const data = [
    { name: 'Qualified', value: qualified },
    { name: 'Disqualified', value: total - qualified },
  ];

  const COLORS = ['#10b981', '#f1f5f9']; // Emerald vs Slate-100
  const percent = Math.round((qualified / total) * 100);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100/50 flex items-center justify-between relative overflow-hidden">
      {/* Decorative background blob */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-10 -mt-10 z-0"></div>

      <div className="z-10 relative">
        <h3 className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-1">{title}</h3>
        <div className="text-4xl font-extrabold text-slate-800 mb-1">{percent}%</div>
        <p className="text-sm font-medium text-slate-400">Qualification Rate</p>
        <div className="mt-4 flex items-center gap-2">
            <span className="block w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-xs text-slate-500">{qualified} Agents Passed</span>
        </div>
      </div>

      <div className="h-32 w-32 relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={60}
              startAngle={90}
              endAngle={-270}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
              cornerRadius={10}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* Center Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="text-center">
                 <span className="block text-lg font-bold text-slate-800">{qualified}/{total}</span>
             </div>
        </div>
      </div>
    </div>
  );
};