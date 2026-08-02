import React from 'react';
import { HistoryItem, Theme } from '../types';
import { Trash2, Download, CornerDownLeft, Clock } from 'lucide-react';

interface HistoryTapeProps {
  history: HistoryItem[];
  theme: Theme;
  onSelectHistory: (item: HistoryItem) => void;
  onClearHistory: () => void;
}

export const HistoryTape: React.FC<HistoryTapeProps> = ({
  history,
  theme,
  onSelectHistory,
  onClearHistory,
}) => {
  const handleExport = () => {
    if (history.length === 0) return;

    const logText = history
      .map((item) => `[${item.timestamp}] ${item.expression} = ${item.result}`)
      .join('\n');

    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `calculator_history_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      id="history-tape-container"
      className={`rounded-2xl p-4 border ${theme.cardBg} flex flex-col h-full max-h-[420px]`}
    >
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
        <div className="flex items-center gap-2 text-sm font-semibold tracking-wide">
          <Clock className={`w-4 h-4 ${theme.accentText}`} />
          <span>Calculation Tape</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
            {history.length}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {history.length > 0 && (
            <>
              <button
                id="export-history-btn"
                onClick={handleExport}
                title="Export history as text log"
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
              <button
                id="clear-history-btn"
                onClick={onClearHistory}
                title="Clear calculation tape"
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* List of past calculations */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-2 scrollbar-thin scrollbar-thumb-slate-700">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-center text-slate-500 text-xs">
            <Clock className="w-8 h-8 mb-2 opacity-30" />
            <p>No previous calculations yet.</p>
            <p className="text-[10px] text-slate-600 mt-1">Calculations will appear here automatically.</p>
          </div>
        ) : (
          history.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectHistory(item)}
              className="group p-2.5 rounded-xl bg-slate-900/40 hover:bg-slate-800/60 border border-slate-800/60 transition-all duration-150 cursor-pointer flex flex-col gap-1"
            >
              <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span>{item.timestamp}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-emerald-400 flex items-center gap-0.5">
                  Load <CornerDownLeft className="w-2.5 h-2.5" />
                </span>
              </div>
              <div className="text-xs font-mono text-slate-400 text-right truncate">
                {item.expression} =
              </div>
              <div
                className={`text-base font-mono font-bold text-right truncate ${
                  item.isError ? 'text-rose-400' : theme.accentText
                }`}
              >
                {item.result}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
