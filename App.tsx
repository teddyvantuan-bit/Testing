import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { AgentTable } from './components/AgentTable';
import { CoachingTool } from './components/CoachingTool';
import { SettingsModal } from './components/SettingsModal';
import { MOCK_AGENTS } from './constants';
import { fetchSheetData } from './services/csvService';
import { AgentMetrics } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [agents, setAgents] = useState<AgentMetrics[]>(MOCK_AGENTS);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [sheetUrl, setSheetUrl] = useState(() => localStorage.getItem('bpo_sheet_url') || '');

  // Load data from Sheet if URL exists
  useEffect(() => {
    if (sheetUrl) {
      const loadData = async () => {
        try {
          const data = await fetchSheetData(sheetUrl);
          if (data.length > 0) {
            setAgents(data);
          }
        } catch (error) {
          console.error("Failed to load live data, falling back to mock.", error);
        }
      };
      loadData();
    }
  }, [sheetUrl]);

  const handleSaveSettings = (newUrl: string) => {
    setSheetUrl(newUrl);
    localStorage.setItem('bpo_sheet_url', newUrl);
    setIsSettingsOpen(false);
  };

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen font-sans text-slate-600 selection:bg-blue-100 selection:text-blue-900">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenSettings={() => setIsSettingsOpen(true)}
      />
      
      <main className="flex-1 ml-72 p-10 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
            {activeTab === 'dashboard' && <Dashboard agents={agents} />}
            {activeTab === 'agents' && <AgentTable agents={agents} />}
            {activeTab === 'coaching' && <CoachingTool agents={agents} />}
        </div>
      </main>

      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={handleSaveSettings}
        currentUrl={sheetUrl}
      />
    </div>
  );
};

export default App;