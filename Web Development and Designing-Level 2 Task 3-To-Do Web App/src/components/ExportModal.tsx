import React, { useState } from 'react';
import { X, Download, Upload, Copy, Check, FileJson, FileText } from 'lucide-react';
import { Task } from '../types';

interface ExportModalProps {
  tasks: Task[];
  onClose: () => void;
  onImportTasks: (imported: Task[]) => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  tasks,
  onClose,
  onImportTasks,
}) => {
  const [copied, setCopied] = useState(false);
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState('');
  const [activeTab, setActiveTab] = useState<'export' | 'import'>('export');

  const jsonString = JSON.stringify(tasks, null, 2);

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `taskflow_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePerformImport = () => {
    setImportError('');
    try {
      const parsed = JSON.parse(importText);
      if (!Array.isArray(parsed)) {
        throw new Error('Imported data must be an array of task objects.');
      }
      onImportTasks(parsed);
      onClose();
    } catch (err: any) {
      setImportError(err.message || 'Invalid JSON format. Please check your data.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 dark:bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-stone-200/90 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-stone-900 dark:text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 dark:text-slate-500 hover:text-stone-700 dark:hover:text-slate-200 rounded-full hover:bg-stone-100 dark:hover:bg-slate-800 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-stone-900 dark:text-slate-100 font-display tracking-tight mb-1">
          Backup & Data Transfer
        </h2>
        <p className="text-xs text-stone-500 dark:text-slate-400 mb-6">Export tasks for backup or restore state</p>

        {/* Tabs */}
        <div className="flex border-b border-stone-200/80 dark:border-slate-800 mb-4">
          <button
            onClick={() => setActiveTab('export')}
            className={`pb-2.5 px-4 text-xs font-semibold uppercase tracking-wider flex items-center space-x-1.5 border-b-2 transition cursor-pointer ${
              activeTab === 'export'
                ? 'border-indigo-600 dark:border-indigo-500 text-indigo-700 dark:text-indigo-400'
                : 'border-transparent text-stone-400 dark:text-slate-500 hover:text-stone-700 dark:hover:text-slate-200'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Tasks</span>
          </button>
          <button
            onClick={() => setActiveTab('import')}
            className={`pb-2.5 px-4 text-xs font-semibold uppercase tracking-wider flex items-center space-x-1.5 border-b-2 transition cursor-pointer ${
              activeTab === 'import'
                ? 'border-indigo-600 dark:border-indigo-500 text-indigo-700 dark:text-indigo-400'
                : 'border-transparent text-stone-400 dark:text-slate-500 hover:text-stone-700 dark:hover:text-slate-200'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Import Tasks</span>
          </button>
        </div>

        {activeTab === 'export' ? (
          <div className="space-y-4">
            <div className="relative">
              <textarea
                readOnly
                value={jsonString}
                rows={8}
                className="w-full p-3 font-mono text-xs bg-stone-50 dark:bg-slate-950 text-stone-800 dark:text-slate-200 border border-stone-200 dark:border-slate-800 rounded-2xl focus:outline-none resize-none"
              />
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleDownloadFile}
                className="flex-1 flex items-center justify-center space-x-1.5 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs tracking-wider transition cursor-pointer shadow-md shadow-indigo-600/20"
              >
                <Download className="w-4 h-4" />
                <span>Download .JSON</span>
              </button>
              <button
                onClick={handleCopyJSON}
                className="flex-1 flex items-center justify-center space-x-1.5 py-3 px-4 rounded-xl bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 border border-stone-200 dark:border-slate-700 text-stone-700 dark:text-slate-200 font-semibold text-xs transition cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                <span>{copied ? 'Copied!' : 'Copy Clipboard'}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xs text-stone-500 dark:text-slate-400">
              Paste valid TaskFlow JSON data below to restore your task backup.
            </p>
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="Paste JSON array here..."
              rows={8}
              className="w-full p-3 font-mono text-xs bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:border-indigo-600 text-stone-800 dark:text-slate-200 placeholder-stone-400 dark:placeholder-slate-500"
            />

            {importError && (
              <p className="text-xs text-rose-600 dark:text-rose-400 font-semibold">
                {importError}
              </p>
            )}

            <button
              onClick={handlePerformImport}
              disabled={!importText.trim()}
              className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-semibold text-xs tracking-wider transition cursor-pointer shadow-md shadow-indigo-600/20"
            >
              Restore & Replace Tasks
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
