import React from 'react';
import { Theme } from '../types';

interface ScientificPanelProps {
  theme: Theme;
  onScientificFn: (fn: string) => void;
  onInsertParenthesis: (paren: '(' | ')') => void;
  onInsertConstant: (constant: 'π' | 'e') => void;
}

export const ScientificPanel: React.FC<ScientificPanelProps> = ({
  theme,
  onScientificFn,
  onInsertParenthesis,
  onInsertConstant,
}) => {
  const sciButtons = [
    { label: '√x', action: () => onScientificFn('√('), id: 'btn-sqrt' },
    { label: 'x²', action: () => onScientificFn('^2'), id: 'btn-square' },
    { label: 'xʸ', action: () => onScientificFn('^'), id: 'btn-power' },
    { label: '(', action: () => onInsertParenthesis('('), id: 'btn-lparen' },
    { label: ')', action: () => onInsertParenthesis(')'), id: 'btn-rparen' },
    { label: 'sin', action: () => onScientificFn('sin('), id: 'btn-sin' },
    { label: 'cos', action: () => onScientificFn('cos('), id: 'btn-cos' },
    { label: 'tan', action: () => onScientificFn('tan('), id: 'btn-tan' },
    { label: 'log', action: () => onScientificFn('log('), id: 'btn-log' },
    { label: 'ln', action: () => onScientificFn('ln('), id: 'btn-ln' },
    { label: 'π', action: () => onInsertConstant('π'), id: 'btn-pi' },
    { label: 'e', action: () => onInsertConstant('e'), id: 'btn-e' },
  ];

  return (
    <div
      id="scientific-controls-panel"
      className="p-3 rounded-2xl bg-slate-900/40 border border-slate-800/80 mb-3 animate-fade-in"
    >
      <div className="text-[11px] font-mono text-slate-400 mb-2 uppercase tracking-wider font-semibold px-1">
        Scientific Functions
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5">
        {sciButtons.map((btn) => (
          <button
            key={btn.id}
            id={btn.id}
            onClick={btn.action}
            className={`py-2 px-1 text-xs font-mono font-medium rounded-lg border transition-all duration-150 active:scale-95 ${theme.fnBtn}`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};
