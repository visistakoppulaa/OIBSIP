import React from 'react';
import { Keyboard, X } from 'lucide-react';
import { Theme } from '../types';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
  theme,
}) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: '0 - 9', action: 'Input numbers' },
    { key: '.', action: 'Decimal point' },
    { key: '+', action: 'Addition operator' },
    { key: '-', action: 'Subtraction operator' },
    { key: '*', action: 'Multiplication (×)' },
    { key: '/', action: 'Division (÷)' },
    { key: 'Enter or =', action: 'Evaluate result' },
    { key: 'Backspace', action: 'Delete last digit' },
    { key: 'Escape or C', action: 'Clear display (AC)' },
    { key: '(', action: 'Open parenthesis' },
    { key: ')', action: 'Close parenthesis' },
    { key: '%', action: 'Percentage operation' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div
        className={`relative w-full max-w-md rounded-2xl p-5 border ${theme.cardBg} bg-slate-900 text-slate-100 flex flex-col shadow-2xl`}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Keyboard className={`w-5 h-5 ${theme.accentText}`} />
            <h3 className="text-base font-bold">Keyboard Navigation Shortcuts</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-4 grid grid-cols-2 gap-2 text-xs">
          {shortcuts.map((sc, i) => (
            <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
              <span className="font-mono text-slate-400">{sc.action}</span>
              <kbd className="px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-mono font-bold text-[11px] border border-slate-700">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
