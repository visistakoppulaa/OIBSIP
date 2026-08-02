import React, { useState } from 'react';
import { UNIT_CATEGORIES, convertValue } from '../utils/converter';
import { ArrowRightLeft, Scale } from 'lucide-react';
import { Theme } from '../types';

interface UnitConverterProps {
  theme: Theme;
  onSendToCalculator?: (val: string) => void;
}

export const UnitConverter: React.FC<UnitConverterProps> = ({ theme, onSendToCalculator }) => {
  const [selectedCat, setSelectedCat] = useState('length');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('ft');
  const [inputValue, setInputValue] = useState('1');

  const activeCategory = UNIT_CATEGORIES.find((c) => c.id === selectedCat) || UNIT_CATEGORIES[0];

  const handleCategoryChange = (catId: string) => {
    setSelectedCat(catId);
    const cat = UNIT_CATEGORIES.find((c) => c.id === catId);
    if (cat) {
      const keys = Object.keys(cat.units);
      setFromUnit(keys[0] || '');
      setToUnit(keys[1] || keys[0] || '');
    }
  };

  const numericInput = parseFloat(inputValue) || 0;
  const resultValue = convertValue(numericInput, selectedCat, fromUnit, toUnit);

  const formattedResult = Number.isInteger(resultValue)
    ? resultValue.toString()
    : parseFloat(resultValue.toFixed(6)).toString();

  const handleSwapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  return (
    <div
      id="unit-converter-card"
      className={`rounded-2xl p-4 border ${theme.cardBg} flex flex-col gap-4`}
    >
      <div className="flex items-center gap-2 text-sm font-semibold tracking-wide border-b border-slate-800/80 pb-3">
        <Scale className={`w-4 h-4 ${theme.accentText}`} />
        <span>Quick Unit Converter</span>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {UNIT_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCat === cat.id
                ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Inputs & Conversions */}
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-3">
        {/* From Section */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase font-mono text-slate-400">From</label>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 font-mono text-base text-slate-100 focus:outline-none focus:border-emerald-500"
          />
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
          >
            {Object.entries(activeCategory.units).map(([key, u]) => (
              <option key={key} value={key}>
                {u.label}
              </option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={handleSwapUnits}
            title="Swap units"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>
        </div>

        {/* To Section */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase font-mono text-slate-400">To</label>
          <div className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 font-mono text-base font-bold text-emerald-400 truncate">
            {formattedResult}
          </div>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
          >
            {Object.entries(activeCategory.units).map(([key, u]) => (
              <option key={key} value={key}>
                {u.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Send result to calculator button */}
      {onSendToCalculator && (
        <button
          onClick={() => onSendToCalculator(formattedResult)}
          className="w-full py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-mono font-medium text-slate-200 transition-colors border border-slate-700/60"
        >
          Send Result ({formattedResult}) to Calculator Display
        </button>
      )}
    </div>
  );
};
