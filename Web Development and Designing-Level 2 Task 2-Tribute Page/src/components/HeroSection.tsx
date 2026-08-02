import React, { useState } from 'react';
import { TributeFigure } from '../types';
import { 
  Sparkles, 
  Volume2, 
  Maximize2, 
  MapPin, 
  Calendar, 
  Award, 
  Quote as QuoteIcon, 
  ArrowDown, 
  CheckCircle2,
  ExternalLink,
  X
} from 'lucide-react';

interface HeroSectionProps {
  figure: TributeFigure;
  isSpeaking: boolean;
  onToggleSpeech: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  figure,
  isSpeaking,
  onToggleSpeech,
}) => {
  const [imageModalOpen, setImageModalOpen] = useState(false);

  return (
    <section className="relative w-full bg-[#0F1115] text-[#E0E0E0] pt-8 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#23262D] overflow-hidden">
      
      {/* Geometric Grid Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#E2FF44]/5 via-[#23262D]/10 to-transparent blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Eyebrow Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#16191F] border border-[#23262D] text-[#E2FF44] text-xs font-tech-mono uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#E2FF44]" />
            <span>Xenon_Tribute_Archive</span>
            <span className="text-[#23262D]">//</span>
            <span className="text-white">{figure.era}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#A1A1AA] font-tech-mono uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-[#E2FF44]" />
            <span>Origin: {figure.birthplace}</span>
          </div>
        </div>

        {/* Main Grid: Title & Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Title & Tagline & Quote Snippet */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-sans-body text-white tracking-tight leading-[1.1]">
                {figure.name}
              </h1>
              
              {/* One-Line Tagline (Requirement #1) */}
              <p className="text-lg sm:text-xl font-editorial italic text-amber-100/90 leading-relaxed border-l-2 border-[#E2FF44] pl-4">
                "{figure.tagline}"
              </p>
            </div>

            {/* Quick Audio Narration Button */}
            <div className="flex flex-wrap items-center gap-3 pt-2 font-tech-mono uppercase text-xs">
              <button
                onClick={onToggleSpeech}
                className={`px-5 py-3.5 tracking-wider font-bold flex items-center gap-2.5 transition-all shadow-lg ${
                  isSpeaking
                    ? 'bg-[#E2FF44] text-[#0F1115] shadow-[#E2FF44]/20 animate-pulse'
                    : 'bg-[#E2FF44] hover:bg-[#d0f030] text-[#0F1115] shadow-lg shadow-[#E2FF44]/10'
                }`}
              >
                <Volume2 className="w-4 h-4 text-[#0F1115]" />
                <span>{isSpeaking ? 'Pause Audio Reader' : 'Listen to Audio Tribute'}</span>
              </button>

              <a
                href="#biography"
                className="px-5 py-3.5 bg-[#16191F] hover:bg-[#121418] text-white border border-[#23262D] tracking-wider font-bold flex items-center gap-2 transition-all"
              >
                <span>Read Biography</span>
                <ArrowDown className="w-4 h-4 text-[#E2FF44]" />
              </a>
            </div>

            {/* Fast Stats Bar */}
            <div className="pt-6 border-t border-[#23262D] grid grid-cols-2 sm:grid-cols-3 gap-3">
              {figure.quickStats.slice(0, 3).map((stat, idx) => (
                <div key={idx} className="p-3 bg-[#16191F] border border-[#23262D]">
                  <div className="text-[10px] font-tech-mono text-[#A1A1AA] uppercase tracking-wider">{stat.label}</div>
                  <div className="text-xs sm:text-sm font-bold text-white font-sans-body truncate mt-0.5">{stat.value}</div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Prominent Royalty-Free Image (Requirement #2) */}
          <div className="lg:col-span-5">
            <div className="relative group p-2 bg-[#16191F] border border-[#23262D] shadow-2xl overflow-hidden">
              
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#0F1115]">
                <img
                  src={figure.heroImage}
                  alt={figure.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-[#0F1115]/20 to-transparent opacity-80" />

                {/* View Image Lightbox Button */}
                <button
                  onClick={() => setImageModalOpen(true)}
                  className="absolute top-3 right-3 p-2.5 bg-[#0F1115]/90 text-white backdrop-blur-md hover:bg-[#E2FF44] hover:text-[#0F1115] transition-all border border-[#23262D]"
                  title="Expand Full Resolution Portrait"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                {/* Caption & Source Overlay */}
                <div className="absolute bottom-3 left-3 right-3 p-3 bg-[#0F1115]/95 backdrop-blur-md border border-[#23262D] text-xs">
                  <p className="text-white line-clamp-2">{figure.imageCaption}</p>
                  <div className="mt-1 flex items-center justify-between text-[10px] font-tech-mono text-[#E2FF44]">
                    <span>Source: {figure.imageSource}</span>
                    <span className="text-emerald-400 font-semibold">Royalty-Free Sourced</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Image Lightbox Modal */}
      {imageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F1115]/95 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-4xl w-full bg-[#16191F] border border-[#23262D] p-3 shadow-2xl">
            <button
              onClick={() => setImageModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-[#0F1115] text-white hover:bg-[#E2FF44] hover:text-[#0F1115] transition border border-[#23262D]"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-h-[80vh] flex items-center justify-center bg-[#0F1115] overflow-hidden">
              <img
                src={figure.heroImage}
                alt={figure.name}
                referrerPolicy="no-referrer"
                className="max-h-[80vh] w-auto object-contain"
              />
            </div>
            <div className="p-4 text-center text-xs text-[#A1A1AA] font-tech-mono uppercase tracking-wider">
              {figure.imageCaption} — <span className="text-[#E2FF44]">{figure.imageSource}</span>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
