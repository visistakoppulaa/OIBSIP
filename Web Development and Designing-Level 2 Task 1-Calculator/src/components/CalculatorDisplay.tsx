import React, { useState } from 'react';
import { Copy, Check, Delete, MemoryStick, AlertTriangle } from 'lucide-react';
import { Theme, CalcMode, MemoryState } from '../types';

interface CalculatorDisplayProps {
  expression: string;
  currentValue: string;
  isError: boolean;
  errorMessage?: string;
  theme: Theme;
  mode: CalcMode;
  memory: MemoryState;
  onBackspace: () => void;
  onClear: () => void;
}

export const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({
  expression,
  currentValue,
  isError,
  errorMessage,
  theme,
  mode,
  memory,
  onBackspace,
  onClear,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = isError ? errorMessage || 'Error' : currentValue || '0';
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Adjust font size based on input string length to avoid overflow
  const getFontSizeClass = (str: string) => {
    const len = str.length;
    if (len > 18) return 'text-xl sm:text-2xl';
    if (len > 14) return 'text-2xl sm:text-3xl';
    if (len > 10) return 'text-3xl sm:text-4xl';
    return 'text-4xl sm:text-5xl';
  };

  return (
    <div
      id="calculator-display-card"
      className={`relative w-full rounded-2xl p-4 sm:p-5 border transition-all duration-300 ${theme.displayBg} shadow-inner flex flex-col justify-between min-h-[140px] sm:min-h-[160px]`}
    >
      {/* Top status bar & badges */}
      <div className="flex items-center justify-between gap-2 text-xs mb-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Mode Badge */}
          <span className="px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-300 font-mono uppercase tracking-wider text-[10px] border border-slate-700/60">
            {mode}
          </span>

          {/* Memory Indicator */}
          {memory.hasValue && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-mono animate-pulse">
              <MemoryStick className="w-3 h-3" />
              M ({memory.value})
            </span>
          )}

          {/* Error Indicator */}
          {isError && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-medium">
              <AlertTriangle className="w-3 h-3" />
              Math Error
            </span>
          )}
        </div>

        {/* Action icons (Copy & Backspace) */}
        <div className="flex items-center gap-1">
          <button
            id="copy-result-btn"
            onClick={handleCopy}
            title="Copy current value"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            id="display-backspace-btn"
            onClick={onBackspace}
            title="Backspace (Delete last character)"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
          >
            <Delete className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Expression history line */}
      <div
        id="expression-display-line"
        className={`text-right ${theme.subDisplayText} min-h-[22px] text-xs sm:text-sm font-mono tracking-wide overflow-x-auto whitespace-nowrap scrollbar-none opacity-80`}
      >
        {expression || '\u00A0'}
      </div>

      {/* Primary Value / Error Display */}
      <div
        id="main-value-display-line"
        className={`text-right font-mono font-bold tracking-tight transition-all duration-150 overflow-x-auto whitespace-nowrap scrollbar-none ${
          isError ? 'text-rose-400 text-2xl sm:text-3xl font-semibold' : theme.displayText
        } ${getFontSizeClass(currentValue)}`}
      >
        {isError ? errorMessage || 'Error' : currentValue || '0'}
      </div>

      {/* Copy Toast Alert */}
      {copied && (
        <div className="absolute top-2 right-12 bg-emerald-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded shadow-md animate-fade-in">
          Copied to clipboard!
        </div>
      )}
    </div>
  );
};
