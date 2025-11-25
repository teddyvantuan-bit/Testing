
import React from 'react';
import { LayoutDashboard, Users, Settings, BarChart2 } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSettings: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onOpenSettings }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { id: 'agents', label: 'Agent Matrix', icon: <Users size={20} /> },
  ];

  return (
    <aside className="w-72 bg-slate-900 text-slate-300 flex flex-col h-screen fixed left-0 top-0 shadow-2xl z-50">
      {/* Brand Section */}
      <div className="p-8 pb-4">
        <div className="flex items-center gap-3 text-white mb-6">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/50">
            <BarChart2 size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">BPO Pulse</h1>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Performance Hub</p>
          </div>
        </div>
        <div className="h-px w-full bg-gradient-to-r from-slate-800 to-transparent"></div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-2">Menu</p>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group ${
              activeTab === item.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20 translate-x-1'
                : 'hover:bg-slate-800/50 hover:text-white hover:translate-x-1'
            }`}
          >
            <span className={`${activeTab === item.id ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
                {item.icon}
            </span>
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer / Settings */}
      <div className="p-4 m-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
        <button 
          onClick={onOpenSettings}
          className="w-full flex items-center gap-3 px-2 py-2 text-slate-400 hover:text-white transition-colors"
        >
          <Settings size={18} />
          <span className="text-sm font-medium">System Settings</span>
        </button>
      </div>
    </aside>
  );
};
