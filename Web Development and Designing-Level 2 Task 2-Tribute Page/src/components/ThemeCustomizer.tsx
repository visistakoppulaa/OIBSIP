import React from 'react';
import { FontPairing, ColorMode } from '../types';
import { Sliders, Type, Palette, Check } from 'lucide-react';

interface ThemeCustomizerProps {
  fontPairing: FontPairing;
  onChangeFontPairing: (pairing: FontPairing) => void;
  colorMode: ColorMode;
  onChangeColorMode: (mode: ColorMode) => void;
}

export const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({
  fontPairing,
  onChangeFontPairing,
  colorMode,
  onChangeColorMode,
}) => {
  const fontOptions: { id: FontPairing; name: string; desc: string }[] = [
    { id: 'serif-sans', name: 'Playfair + Jakarta', desc: 'Serif headings with clean sans body' },
    { id: 'classic-editorial', name: 'Cinzel + Newsreader', desc: 'Classic display with literary serif body' },
    { id: 'modern-tech', name: 'Space Mono + Jakarta', desc: 'Tech monospace badges with modern body' },
  ];

  const colorOptions: { id: ColorMode; name: string; preview: string }[] = [
    { id: 'historic-amber', name: 'Obsidian & Gold', preview: 'bg-slate-950 border-amber-500' },
    { id: 'emerald-parchment', name: 'Emerald & Warm Parchment', preview: 'bg-emerald-950 border-emerald-400' },
    { id: 'midnight-navy', name: 'Midnight Navy & Cyan', preview: 'bg-indigo-950 border-cyan-400' },
  ];

  return (
    <div className="w-full bg-[#16191F] border-t border-b border-[#23262D] py-8 px-4 sm:px-6 lg:px-8 text-[#E0E0E0] font-mono">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#0F1115] border border-[#23262D] text-[#E2FF44]">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-sans-body">Design & Typography Protocol</h3>
            <p className="text-xs text-[#A1A1AA]">Geometric Balance Theme Enabled (Requirement #6 & #7)</p>
          </div>
        </div>

        {/* Font Pairings Picker */}
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase">
          <span className="font-tech-mono text-[#A1A1AA] flex items-center gap-1 mr-2">
            <Type className="w-3.5 h-3.5 text-[#E2FF44]" /> Typography_Mode:
          </span>
          {fontOptions.map((f) => (
            <button
              key={f.id}
              onClick={() => onChangeFontPairing(f.id)}
              className={`px-3 py-1.5 border font-bold transition ${
                fontPairing === f.id
                  ? 'bg-[#E2FF44] text-[#0F1115] border-[#E2FF44]'
                  : 'bg-[#0F1115] text-[#A1A1AA] border-[#23262D] hover:text-white'
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
