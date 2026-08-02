import React from 'react';
import { THEMES } from '../utils/themes';
import { ThemeId, Theme } from '../types';
import { Palette, Check } from 'lucide-react';

interface ThemeSelectorProps {
  currentThemeId: ThemeId;
  onSelectTheme: (themeId: ThemeId) => void;
  theme: Theme;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentThemeId,
  onSelectTheme,
  theme,
}) => {
  return (
    <div id="theme-selector-bar" className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono pr-1">
        <Palette className="w-3.5 h-3.5" />
        <span>Theme:</span>
      </div>

      {Object.values(THEMES).map((t) => {
        const isSelected = t.id === currentThemeId;
        return (
          <button
            key={t.id}
            id={`theme-btn-${t.id}`}
            onClick={() => onSelectTheme(t.id)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-mono transition-all duration-150 border ${
              isSelected
                ? 'bg-[#18181A] text-white border-[#00F0FF] shadow-sm font-bold uppercase tracking-wider'
                : 'bg-[#111113]/60 text-slate-400 border-[#2A2A2C] hover:text-slate-200 hover:bg-[#18181A]/50'
            }`}
          >
            <span>{t.name}</span>
            {isSelected && <Check className={`w-3 h-3 ${theme.accentText}`} />}
          </button>
        );
      })}
    </div>
  );
};
