import React, { useState } from 'react';
import { TributeFigure, FontPairing, ColorMode } from '../types';
import { Logo } from './Logo';
import { 
  CheckCircle2, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Sliders, 
  BookOpen, 
  Clock, 
  Quote as QuoteIcon, 
  Award, 
  HelpCircle,
  Menu,
  X,
  UserCheck
} from 'lucide-react';

interface HeaderProps {
  figures: TributeFigure[];
  selectedFigure: TributeFigure;
  onSelectFigure: (figure: TributeFigure) => void;
  fontPairing: FontPairing;
  onChangeFontPairing: (pairing: FontPairing) => void;
  colorMode: ColorMode;
  onChangeColorMode: (mode: ColorMode) => void;
  isSpeaking: boolean;
  onToggleSpeech: () => void;
  onOpenChecklist: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  figures,
  selectedFigure,
  onSelectFigure,
  fontPairing,
  onChangeFontPairing,
  colorMode,
  onChangeColorMode,
  isSpeaking,
  onToggleSpeech,
  onOpenChecklist,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#16191F]/90 border-b border-[#23262D] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        
        {/* Left: Branding & Subject Title */}
        <div className="flex items-center gap-3">
          <Logo size="md" showText={false} />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-tech-mono text-[#E2FF44] text-[10px] tracking-[0.2em] uppercase font-bold">BHARAT_VIGYAN / IND</span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[9px] font-tech-mono uppercase tracking-widest bg-emerald-900/30 text-emerald-400 border border-emerald-500/40 font-semibold">
                Indian Pioneers
              </span>
            </div>
            <h1 className="text-sm sm:text-base font-bold text-white font-sans-body truncate max-w-[180px] sm:max-w-xs">
              {selectedFigure.shortName}
            </h1>
          </div>
        </div>

        {/* Center: Figure Switcher Desktop */}
        <nav className="hidden lg:flex items-center bg-[#0F1115] p-1.5 border border-[#23262D]">
          {figures.map((fig) => {
            const isActive = fig.id === selectedFigure.id;
            return (
              <button
                key={fig.id}
                onClick={() => onSelectFigure(fig)}
                className={`px-3.5 py-1.5 text-xs font-mono tracking-wider uppercase transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#E2FF44] text-[#0F1115] font-bold shadow-md shadow-[#E2FF44]/20'
                    : 'text-[#A1A1AA] hover:text-white hover:bg-[#16191F]'
                }`}
              >
                <UserCheck className={`w-3.5 h-3.5 ${isActive ? 'text-[#0F1115]' : 'text-[#A1A1AA]'}`} />
                <span>{fig.shortName}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Audio Speech Synthesis Toggle */}
          <button
            onClick={onToggleSpeech}
            title={isSpeaking ? 'Stop Voice Reader' : 'Listen to Voice Overview'}
            className={`px-3 py-2 border text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all ${
              isSpeaking
                ? 'bg-[#E2FF44]/20 text-[#E2FF44] border-[#E2FF44] animate-pulse'
                : 'bg-[#0F1115] text-[#A1A1AA] border-[#23262D] hover:bg-[#121418] hover:text-white'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4 text-[#E2FF44]" /> : <Volume2 className="w-4 h-4 text-[#E2FF44]" />}
            <span className="hidden md:inline">{isSpeaking ? 'Stop Audio' : 'Audio_Listen'}</span>
          </button>

          {/* Requirement Auditor Button */}
          <button
            onClick={onOpenChecklist}
            className="px-3 py-2 bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-500/40 text-emerald-400 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all"
            title="View Oasis Task 2 Evaluation Criteria Verification"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Criteria_Check</span>
          </button>

          {/* Quick Nav Links */}
          <div className="hidden xl:flex items-center gap-1 border-l border-[#23262D] pl-3 text-xs font-mono uppercase tracking-wider">
            <a href="#biography" className="p-2 text-[#A1A1AA] hover:text-[#E2FF44] transition flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" /> Bio
            </a>
            <a href="#timeline" className="p-2 text-[#A1A1AA] hover:text-[#E2FF44] transition flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Timeline
            </a>
            <a href="#quotes" className="p-2 text-[#A1A1AA] hover:text-[#E2FF44] transition flex items-center gap-1">
              <QuoteIcon className="w-3.5 h-3.5" /> Quotes
            </a>
            <a href="#quiz" className="p-2 text-[#A1A1AA] hover:text-[#E2FF44] transition flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5" /> Quiz
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 bg-[#0F1115] text-[#A1A1AA] hover:text-white border border-[#23262D]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F1115] border-b border-[#23262D] px-4 py-4 space-y-4">
          <div className="text-[10px] font-mono text-[#E2FF44] uppercase tracking-widest">// Select_Target_Figure</div>
          <div className="grid grid-cols-1 gap-2 font-mono text-xs">
            {figures.map((fig) => (
              <button
                key={fig.id}
                onClick={() => {
                  onSelectFigure(fig);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 border flex items-center justify-between ${
                  fig.id === selectedFigure.id
                    ? 'bg-[#E2FF44] text-[#0F1115] border-[#E2FF44] font-bold'
                    : 'bg-[#16191F] text-[#A1A1AA] border-[#23262D] hover:bg-[#121418]'
                }`}
              >
                <span>{fig.name}</span>
                <span className="text-[10px] opacity-75">{fig.era}</span>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-[#23262D] flex justify-around text-xs font-mono text-[#A1A1AA]">
            <a href="#biography" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 bg-[#16191F] border border-[#23262D]">Bio</a>
            <a href="#timeline" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 bg-[#16191F] border border-[#23262D]">Timeline</a>
            <a href="#quotes" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 bg-[#16191F] border border-[#23262D]">Quotes</a>
            <a href="#quiz" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 bg-[#16191F] border border-[#23262D]">Quiz</a>
          </div>
        </div>
      )}
    </header>
  );
};
