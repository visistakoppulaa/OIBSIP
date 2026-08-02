import React from 'react';
import { Delete, RotateCcw } from 'lucide-react';
import { Theme, KeyButtonConfig } from '../types';

interface CalculatorKeypadProps {
  theme: Theme;
  onDigit: (digit: string) => void;
  onOperator: (op: string) => void;
  onEqual: () => void;
  onClear: () => void;
  onAllClear: () => void;
  onBackspace: () => void;
  onToggleSign: () => void;
  onPercentage: () => void;
  onScientificFn?: (fn: string) => void;
  onMemoryAction?: (action: 'MC' | 'MR' | 'M+' | 'M-') => void;
  activeKeyPressed?: string | null;
}

export const CalculatorKeypad: React.FC<CalculatorKeypadProps> = ({
  theme,
  onDigit,
  onOperator,
  onEqual,
  onClear,
  onAllClear,
  onBackspace,
  onToggleSign,
  onPercentage,
  onScientificFn,
  onMemoryAction,
  activeKeyPressed,
}) => {
  // KeyPad Grid Layout configuration strictly using CSS Grid
  const memoryRow: KeyButtonConfig[] = [
    { id: 'btn-mc', label: 'MC', value: 'MC', type: 'memory', ariaLabel: 'Memory Clear' },
    { id: 'btn-mr', label: 'MR', value: 'MR', type: 'memory', ariaLabel: 'Memory Recall' },
    { id: 'btn-mplus', label: 'M+', value: 'M+', type: 'memory', ariaLabel: 'Memory Add' },
    { id: 'btn-mminus', label: 'M-', value: 'M-', type: 'memory', ariaLabel: 'Memory Subtract' },
  ];

  const keypadRows: KeyButtonConfig[][] = [
    [
      { id: 'btn-ac', label: 'AC', value: 'AC', type: 'clear', ariaLabel: 'All Clear' },
      { id: 'btn-backspace', label: '⌫', value: 'DEL', type: 'action', ariaLabel: 'Backspace' },
      { id: 'btn-percent', label: '%', value: '%', type: 'function', ariaLabel: 'Percentage' },
      { id: 'btn-divide', label: '÷', value: '÷', type: 'operator', ariaLabel: 'Divide' },
    ],
    [
      { id: 'btn-7', label: '7', value: '7', type: 'number', keyCodes: ['7'] },
      { id: 'btn-8', label: '8', value: '8', type: 'number', keyCodes: ['8'] },
      { id: 'btn-9', label: '9', value: '9', type: 'number', keyCodes: ['9'] },
      { id: 'btn-multiply', label: '×', value: '×', type: 'operator', ariaLabel: 'Multiply' },
    ],
    [
      { id: 'btn-4', label: '4', value: '4', type: 'number', keyCodes: ['4'] },
      { id: 'btn-5', label: '5', value: '5', type: 'number', keyCodes: ['5'] },
      { id: 'btn-6', label: '6', value: '6', type: 'number', keyCodes: ['6'] },
      { id: 'btn-subtract', label: '−', value: '−', type: 'operator', ariaLabel: 'Subtract' },
    ],
    [
      { id: 'btn-1', label: '1', value: '1', type: 'number', keyCodes: ['1'] },
      { id: 'btn-2', label: '2', value: '2', type: 'number', keyCodes: ['2'] },
      { id: 'btn-3', label: '3', value: '3', type: 'number', keyCodes: ['3'] },
      { id: 'btn-add', label: '+', value: '+', type: 'operator', ariaLabel: 'Add' },
    ],
    [
      { id: 'btn-plusminus', label: '±', value: '±', type: 'function', ariaLabel: 'Toggle Sign' },
      { id: 'btn-0', label: '0', value: '0', type: 'number', keyCodes: ['0'] },
      { id: 'btn-decimal', label: '.', value: '.', type: 'number', keyCodes: ['.'] },
      { id: 'btn-equal', label: '=', value: '=', type: 'equal', ariaLabel: 'Evaluate Equals' },
    ],
  ];

  const handleButtonClick = (btn: KeyButtonConfig) => {
    switch (btn.value) {
      case 'AC':
        onAllClear();
        break;
      case 'DEL':
        onBackspace();
        break;
      case '%':
        onPercentage();
        break;
      case '±':
        onToggleSign();
        break;
      case '=':
        onEqual();
        break;
      case '÷':
      case '×':
      case '−':
      case '+':
        onOperator(btn.value);
        break;
      case '.':
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        onDigit(btn.value);
        break;
      default:
        break;
    }
  };

  const getButtonClass = (btn: KeyButtonConfig) => {
    let base =
      'flex items-center justify-center font-medium rounded-xl text-lg sm:text-xl transition-all duration-150 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/50 active:scale-95 min-h-[52px] sm:min-h-[58px] border ';

    // Visual pulse effect when matching physical keyboard key pressed
    const isPressed = activeKeyPressed && activeKeyPressed === btn.value;
    const pressedStyle = isPressed ? 'ring-2 ring-emerald-400 scale-95 brightness-125' : '';

    if (btn.type === 'clear') {
      return `${base} ${theme.clearBtn} ${pressedStyle}`;
    }
    if (btn.type === 'equal') {
      return `${base} ${theme.equalBtn} ${pressedStyle}`;
    }
    if (btn.type === 'operator') {
      return `${base} ${theme.opBtn} ${pressedStyle}`;
    }
    if (btn.type === 'function') {
      return `${base} ${theme.fnBtn} ${pressedStyle}`;
    }
    if (btn.type === 'memory') {
      return `flex items-center justify-center text-xs font-mono font-semibold rounded-lg bg-slate-800/50 hover:bg-slate-700/80 active:bg-slate-600 text-slate-300 border border-slate-700/50 py-1.5 transition-all duration-150 active:scale-95 focus:outline-none`;
    }

    return `${base} ${theme.numBtn} ${pressedStyle}`;
  };

  return (
    <div id="calculator-keypad-container" className="w-full flex flex-col gap-2.5">
      {/* Memory Row using CSS Grid */}
      {onMemoryAction && (
        <div id="memory-buttons-grid" className="grid grid-cols-4 gap-2">
          {memoryRow.map((mBtn) => (
            <button
              key={mBtn.id}
              id={mBtn.id}
              aria-label={mBtn.ariaLabel}
              onClick={() => onMemoryAction(mBtn.value as any)}
              className={getButtonClass(mBtn)}
            >
              {mBtn.label}
            </button>
          ))}
        </div>
      )}

      {/* Primary Keypad strictly using CSS Grid layout alignment */}
      <div id="primary-calculator-grid" className="grid grid-cols-4 gap-2 sm:gap-2.5">
        {keypadRows.map((row) =>
          row.map((btn) => (
            <button
              key={btn.id}
              id={btn.id}
              aria-label={btn.ariaLabel || `Button ${btn.label}`}
              onClick={() => handleButtonClick(btn)}
              className={`${getButtonClass(btn)} ${btn.gridSpan || ''}`}
            >
              {btn.label === '⌫' ? (
                <Delete className="w-5 h-5" />
              ) : (
                <span>{btn.label}</span>
              )}
            </button>
          ))
        )}
      </div>
    </div>
  );
};
