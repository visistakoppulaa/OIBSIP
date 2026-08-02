/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  CalcMode,
  ThemeId,
  HistoryItem,
  MemoryState,
} from './types';
import { THEMES } from './utils/themes';
import { calculateExpression, evaluateSequential } from './utils/calculator';
import { soundManager } from './utils/sound';
import { CalculatorDisplay } from './components/CalculatorDisplay';
import { CalculatorKeypad } from './components/CalculatorKeypad';
import { ScientificPanel } from './components/ScientificPanel';
import { HistoryTape } from './components/HistoryTape';
import { UnitConverter } from './components/UnitConverter';
import { ThemeSelector } from './components/ThemeSelector';
import { DocumentationModal } from './components/DocumentationModal';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';
import {
  Volume2,
  VolumeX,
  Keyboard,
  FileText,
  Calculator as CalcIcon,
  Sparkles,
  SlidersHorizontal,
  Layers,
  Info,
} from 'lucide-react';

export default function App() {
  // Application state
  const [themeId, setThemeId] = useState<ThemeId>('boldTypography');
  const [mode, setMode] = useState<CalcMode>('standard');
  const [expression, setExpression] = useState<string>('');
  const [currentValue, setCurrentValue] = useState<string>('0');
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isNewEntry, setIsNewEntry] = useState<boolean>(true);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [memory, setMemory] = useState<MemoryState>({ value: 0, hasValue: false });
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [showScientific, setShowScientific] = useState<boolean>(false);
  const [showDocs, setShowDocs] = useState<boolean>(false);
  const [showShortcuts, setShowShortcuts] = useState<boolean>(false);
  const [activeKeyPressed, setActiveKeyPressed] = useState<string | null>(null);

  // Active theme styling object
  const currentTheme = THEMES[themeId] || THEMES.boldTypography;

  // Sync sound manager
  useEffect(() => {
    soundManager.enabled = soundEnabled;
  }, [soundEnabled]);

  // Handle digit input (0-9, .)
  const handleDigit = useCallback(
    (digit: string) => {
      soundManager.playClick('number');

      if (isError) {
        setIsError(false);
        setErrorMessage('');
        setExpression('');
        setCurrentValue(digit === '.' ? '0.' : digit);
        setIsNewEntry(false);
        return;
      }

      // Handle decimal point
      if (digit === '.') {
        if (isNewEntry) {
          setCurrentValue('0.');
          setIsNewEntry(false);
          return;
        }
        if (currentValue.includes('.')) {
          return; // Prevent duplicate decimal points
        }
      }

      if (isNewEntry || currentValue === '0') {
        setCurrentValue(digit === '.' ? '0.' : digit);
        setIsNewEntry(false);
      } else {
        // Limit total input length
        if (currentValue.length >= 18) return;
        setCurrentValue(currentValue + digit);
      }
    },
    [currentValue, isError, isNewEntry]
  );

  // Handle operators (+, -, ×, ÷, %, ^)
  const handleOperator = useCallback(
    (op: string) => {
      soundManager.playClick('operator');

      if (isError) {
        setIsError(false);
        setErrorMessage('');
      }

      if (mode === 'sequential') {
        // Sequential immediate operator chaining mode
        if (expression !== '') {
          // Perform chaining step
          const match = expression.match(/(-?\d+\.?\d*)\s*([+−×÷%^])\s*$/);
          if (match) {
            const prevNum = parseFloat(match[1]);
            const prevOp = match[2];
            const currNum = parseFloat(currentValue);

            const seqResult = evaluateSequential(prevNum, currNum, prevOp);
            if (seqResult.isError) {
              setIsError(true);
              setErrorMessage(seqResult.result);
              soundManager.playClick('error');
              return;
            }

            const newNumVal = seqResult.numericValue || 0;
            setExpression(`${seqResult.result} ${op} `);
            setCurrentValue(seqResult.result);
            setIsNewEntry(true);
            return;
          }
        }
        setExpression(`${currentValue} ${op} `);
        setIsNewEntry(true);
      } else {
        // Standard Infix Expression Mode
        let newExpr = expression;

        // If previous action was equals or new expression start
        if (isNewEntry && expression === '') {
          newExpr = `${currentValue} ${op} `;
        } else if (isNewEntry && /\s*([+−×÷%^])\s*$/.test(expression)) {
          // Replace trailing operator if user taps a different operator sequentially
          newExpr = expression.replace(/\s*([+−×÷%^])\s*$/, ` ${op} `);
        } else {
          newExpr = `${expression}${currentValue} ${op} `;
        }

        setExpression(newExpr);
        setIsNewEntry(true);
      }
    },
    [currentValue, expression, isError, isNewEntry, mode]
  );

  // Evaluate Expression (=)
  const handleEqual = useCallback(() => {
    soundManager.playClick('equal');

    if (isError) return;

    let fullExpression = expression + currentValue;
    if (!fullExpression || fullExpression.trim() === '') return;

    // Clean up trailing operators if expression ends with an operator like "5 +"
    if (/\s*([+−×÷%^])\s*$/.test(fullExpression)) {
      fullExpression = fullExpression.replace(/\s*([+−×÷%^])\s*$/, '');
    }

    const calcRes = calculateExpression(fullExpression);

    if (calcRes.isError) {
      setIsError(true);
      setErrorMessage(calcRes.result);
      soundManager.playClick('error');

      // Add failed attempt to history tape marked as error
      const errorHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        expression: fullExpression,
        result: calcRes.result,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        isError: true,
      };
      setHistory((prev) => [errorHistoryItem, ...prev]);
    } else {
      setIsError(false);
      setErrorMessage('');
      setCurrentValue(calcRes.result);
      setExpression(`${fullExpression} =`);
      setIsNewEntry(true);

      // Record successful calculation in history tape
      const historyItem: HistoryItem = {
        id: Date.now().toString(),
        expression: fullExpression,
        result: calcRes.result,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      };
      setHistory((prev) => [historyItem, ...prev]);
    }
  }, [currentValue, expression, isError]);

  // Backspace / Delete last character
  const handleBackspace = useCallback(() => {
    soundManager.playClick('action');

    if (isError) {
      setIsError(false);
      setErrorMessage('');
      setCurrentValue('0');
      setIsNewEntry(true);
      return;
    }

    if (isNewEntry) return;

    if (currentValue.length <= 1) {
      setCurrentValue('0');
      setIsNewEntry(true);
    } else {
      setCurrentValue(currentValue.slice(0, -1));
    }
  }, [currentValue, isError, isNewEntry]);

  // Clear current entry or reset
  const handleClear = useCallback(() => {
    soundManager.playClick('clear');
    setCurrentValue('0');
    setIsError(false);
    setErrorMessage('');
    setIsNewEntry(true);
  }, []);

  // All Clear (AC)
  const handleAllClear = useCallback(() => {
    soundManager.playClick('clear');
    setCurrentValue('0');
    setExpression('');
    setIsError(false);
    setErrorMessage('');
    setIsNewEntry(true);
  }, []);

  // Toggle positive / negative sign (±)
  const handleToggleSign = useCallback(() => {
    soundManager.playClick('action');
    if (isError || currentValue === '0') return;

    if (currentValue.startsWith('-')) {
      setCurrentValue(currentValue.substring(1));
    } else {
      setCurrentValue(`-${currentValue}`);
    }
  }, [currentValue, isError]);

  // Percentage (%)
  const handlePercentage = useCallback(() => {
    soundManager.playClick('action');
    if (isError) return;

    const num = parseFloat(currentValue);
    if (isNaN(num)) return;

    const pct = num / 100;
    setCurrentValue(pct.toString());
    setIsNewEntry(true);
  }, [currentValue, isError]);

  // Memory Actions (MC, MR, M+, M-)
  const handleMemoryAction = useCallback(
    (action: 'MC' | 'MR' | 'M+' | 'M-') => {
      soundManager.playClick('action');
      const currentNum = parseFloat(currentValue) || 0;

      switch (action) {
        case 'MC':
          setMemory({ value: 0, hasValue: false });
          break;
        case 'MR':
          if (memory.hasValue) {
            setCurrentValue(memory.value.toString());
            setIsNewEntry(true);
          }
          break;
        case 'M+':
          setMemory((prev) => ({
            value: prev.value + currentNum,
            hasValue: true,
          }));
          setIsNewEntry(true);
          break;
        case 'M-':
          setMemory((prev) => ({
            value: prev.value - currentNum,
            hasValue: true,
          }));
          setIsNewEntry(true);
          break;
      }
    },
    [currentValue, memory]
  );

  // Scientific function append
  const handleScientificFn = useCallback(
    (fn: string) => {
      soundManager.playClick('action');
      setExpression((prev) => `${prev}${fn}`);
    },
    []
  );

  // Parentheses insert
  const handleInsertParenthesis = useCallback((paren: '(' | ')') => {
    soundManager.playClick('action');
    setExpression((prev) => `${prev}${paren}`);
  }, []);

  // Insert constants (π, e)
  const handleInsertConstant = useCallback(
    (c: 'π' | 'e') => {
      soundManager.playClick('action');
      setCurrentValue(c === 'π' ? Math.PI.toString() : Math.E.toString());
      setIsNewEntry(true);
    },
    []
  );

  // Handle select calculation history item
  const handleSelectHistory = useCallback((item: HistoryItem) => {
    soundManager.playClick('action');
    if (item.isError) return;
    setCurrentValue(item.result);
    setExpression(`${item.expression} =`);
    setIsNewEntry(true);
    setIsError(false);
  }, []);

  // Handle Global Keyboard Event Listeners for seamless physical typing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing inside an input field (e.g. unit converter input)
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'SELECT'
      ) {
        return;
      }

      const key = e.key;

      if (/[0-9]/.test(key)) {
        setActiveKeyPressed(key);
        handleDigit(key);
      } else if (key === '.') {
        setActiveKeyPressed('.');
        handleDigit('.');
      } else if (key === '+') {
        setActiveKeyPressed('+');
        handleOperator('+');
      } else if (key === '-') {
        setActiveKeyPressed('−');
        handleOperator('−');
      } else if (key === '*') {
        setActiveKeyPressed('×');
        handleOperator('×');
      } else if (key === '/') {
        e.preventDefault();
        setActiveKeyPressed('÷');
        handleOperator('÷');
      } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        setActiveKeyPressed('=');
        handleEqual();
      } else if (key === 'Backspace') {
        setActiveKeyPressed('DEL');
        handleBackspace();
      } else if (key === 'Escape' || key.toLowerCase() === 'c') {
        setActiveKeyPressed('AC');
        handleAllClear();
      } else if (key === '(' || key === ')') {
        handleInsertParenthesis(key as '(' | ')');
      } else if (key === '%') {
        handlePercentage();
      }

      // Reset active key highlight after short pulse
      setTimeout(() => setActiveKeyPressed(null), 180);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    handleDigit,
    handleOperator,
    handleEqual,
    handleBackspace,
    handleAllClear,
    handleInsertParenthesis,
    handlePercentage,
  ]);

  return (
    <div
      id="calculator-app-wrapper"
      className={`min-h-screen w-full transition-colors duration-300 ${currentTheme.bgClass} flex flex-col font-sans`}
    >
      {/* Top Header Navigation Bar */}
      <header className="w-full border-b border-[#2A2A2C] bg-[#0A0A0B]/90 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 sticky top-0 z-30">
        {/* Brand & App Title */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <CalcIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.25em] text-[#00F0FF] uppercase">
              <span className="w-3 h-[2px] bg-[#00F0FF]"></span> PRECISION MATH
            </div>
            <h1 className="font-extrabold text-xl sm:text-2xl tracking-tight uppercase text-white flex items-center gap-2">
              CALCULATOR <span className="text-[#00F0FF]">STUDIO</span>
              <span className="text-[10px] uppercase tracking-widest font-mono px-2 py-0.5 rounded bg-[#18181A] text-[#00F0FF] border border-[#2A2A2C] font-bold">
                v2.0
              </span>
            </h1>
          </div>
        </div>

        {/* Header Action Tools */}
        <div className="flex items-center gap-2">
          {/* Sound Mute Toggle */}
          <button
            id="toggle-sound-btn"
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? 'Mute Keypress Audio' : 'Enable Keypress Audio'}
            className="p-2 rounded-xl bg-[#111113] border border-[#2A2A2C] text-slate-300 hover:text-white transition-colors"
          >
            {soundEnabled ? <Volume2 className={`w-4 h-4 ${currentTheme.accentText}`} /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Keyboard Shortcuts Modal trigger */}
          <button
            id="shortcuts-btn"
            onClick={() => setShowShortcuts(true)}
            title="Keyboard Shortcuts"
            className="p-2 rounded-xl bg-[#111113] border border-[#2A2A2C] text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono"
          >
            <Keyboard className="w-4 h-4" />
            <span className="hidden md:inline">Shortcuts</span>
          </button>

          {/* Documentation README Modal trigger */}
          <button
            id="open-docs-btn"
            onClick={() => setShowDocs(true)}
            title="View README Documentation"
            className={`px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${currentTheme.equalBtn}`}
          >
            <FileText className="w-4 h-4" />
            <span>README Docs</span>
          </button>
        </div>
      </header>

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
        {/* Theme Selector & Mode Switcher Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#111113]/80 p-3 rounded-2xl border border-[#2A2A2C] backdrop-blur-sm">
          {/* Theme Selector Component */}
          <ThemeSelector
            currentThemeId={themeId}
            onSelectTheme={setThemeId}
            theme={currentTheme}
          />

          {/* Calculator Mode Tabs */}
          <div className="flex items-center gap-1 bg-[#050506] p-1 rounded-xl border border-[#2A2A2C] text-xs font-mono w-full md:w-auto overflow-x-auto scrollbar-none">
            <button
              onClick={() => {
                setMode('standard');
                setShowScientific(false);
              }}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap font-bold uppercase tracking-wider ${
                mode === 'standard' && !showScientific
                  ? `${currentTheme.equalBtn}`
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Standard
            </button>
            <button
              onClick={() => {
                setMode('sequential');
                setShowScientific(false);
              }}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap font-bold uppercase tracking-wider ${
                mode === 'sequential'
                  ? `${currentTheme.equalBtn}`
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sequential Chaining
            </button>
            <button
              onClick={() => {
                setMode('scientific');
                setShowScientific(true);
              }}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap font-bold uppercase tracking-wider ${
                showScientific
                  ? `${currentTheme.equalBtn}`
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Scientific
            </button>
            <button
              onClick={() => setMode('converter')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap font-bold uppercase tracking-wider ${
                mode === 'converter'
                  ? `${currentTheme.equalBtn}`
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Unit Converter
            </button>
          </div>
        </div>

        {/* Primary Calculator Interface Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Calculator Unit Card (Takes 7 cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div
              id="calculator-main-card"
              className={`p-5 sm:p-6 rounded-3xl border transition-all duration-300 ${currentTheme.cardBg} flex flex-col gap-4`}
            >
              {/* Display Screen */}
              <CalculatorDisplay
                expression={expression}
                currentValue={currentValue}
                isError={isError}
                errorMessage={errorMessage}
                theme={currentTheme}
                mode={mode}
                memory={memory}
                onBackspace={handleBackspace}
                onClear={handleClear}
              />

              {/* Scientific Panel toggle extension */}
              {showScientific && (
                <ScientificPanel
                  theme={currentTheme}
                  onScientificFn={handleScientificFn}
                  onInsertParenthesis={handleInsertParenthesis}
                  onInsertConstant={handleInsertConstant}
                />
              )}

              {/* Primary Keypad Grid */}
              <CalculatorKeypad
                theme={currentTheme}
                onDigit={handleDigit}
                onOperator={handleOperator}
                onEqual={handleEqual}
                onClear={handleClear}
                onAllClear={handleAllClear}
                onBackspace={handleBackspace}
                onToggleSign={handleToggleSign}
                onPercentage={handlePercentage}
                onScientificFn={handleScientificFn}
                onMemoryAction={handleMemoryAction}
                activeKeyPressed={activeKeyPressed}
              />
            </div>

            {/* Quick tips footer box */}
            <div className="p-3 rounded-2xl bg-slate-900/30 border border-slate-800/60 text-xs text-slate-400 flex items-center gap-2">
              <Info className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Tip: You can type calculations directly using your physical keyboard (<code className="text-emerald-300 font-mono">0-9</code>, <code className="text-emerald-300 font-mono">+</code>, <code className="text-emerald-300 font-mono">-</code>, <code className="text-emerald-300 font-mono">*</code>, <code className="text-emerald-300 font-mono">/</code>, <code className="text-emerald-300 font-mono">Enter</code>).
              </span>
            </div>
          </div>

          {/* Side Drawer: History Tape & Extended Unit Converter (Takes 5 cols on desktop) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Calculation Tape History */}
            <HistoryTape
              history={history}
              theme={currentTheme}
              onSelectHistory={handleSelectHistory}
              onClearHistory={() => setHistory([])}
            />

            {/* Converter Widget when tab selected or embedded */}
            {mode === 'converter' && (
              <UnitConverter
                theme={currentTheme}
                onSendToCalculator={(val) => {
                  setCurrentValue(val);
                  setIsNewEntry(true);
                }}
              />
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      <DocumentationModal
        isOpen={showDocs}
        onClose={() => setShowDocs(false)}
        theme={currentTheme}
      />

      <KeyboardShortcutsModal
        isOpen={showShortcuts}
        onClose={() => setShowShortcuts(false)}
        theme={currentTheme}
      />
    </div>
  );
}
