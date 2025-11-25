import React, { useState } from 'react';
import { X, Save, Database, AlertCircle } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (url: string) => void;
  currentUrl: string;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onSave, currentUrl }) => {
  const [url, setUrl] = useState(currentUrl);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-slate-700 flex items-center gap-2">
            <Database className="text-blue-600" size={20} />
            Data Source Configuration
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Google Sheet CSV URL
            </label>
            <input 
              type="text" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://docs.google.com/spreadsheets/d/.../pub?output=csv"
              className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm text-slate-700 font-medium"
            />
            <div className="mt-3 p-3 bg-blue-50 rounded-xl flex gap-3 items-start">
              <AlertCircle className="text-blue-500 shrink-0 mt-0.5" size={16} />
              <div className="text-xs text-blue-800 space-y-1">
                <p className="font-bold">How to get this URL:</p>
                <ol className="list-decimal pl-4 space-y-1 opacity-80">
                  <li>Open your Google Sheet</li>
                  <li>Go to <strong>File &gt; Share &gt; Publish to web</strong></li>
                  <li>Change "Web page" to <strong>Comma-separated values (.csv)</strong></li>
                  <li>Click Publish and copy the link</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-slate-500 font-semibold text-sm hover:text-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => onSave(url)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 flex items-center gap-2"
          >
            <Save size={16} />
            Save & Connect
          </button>
        </div>
      </div>
    </div>
  );
};