import React, { useState } from 'react';
import { TributeFigure, Quote } from '../types';
import { Quote as QuoteIcon, Volume2, Copy, Check, Sparkles, BookOpen, Share2 } from 'lucide-react';

interface QuotesSectionProps {
  figure: TributeFigure;
  isSpeaking: boolean;
  onToggleSpeech: () => void;
}

export const QuotesSection: React.FC<QuotesSectionProps> = ({
  figure,
  isSpeaking,
  onToggleSpeech,
}) => {
  const [activeQuote, setActiveQuote] = useState<Quote>(figure.featuredQuote);
  const [copied, setCopied] = useState(false);

  const handleCopyQuote = () => {
    const textToCopy = `"${activeQuote.text}" — ${figure.name} (${activeQuote.context})`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section 
      id="quotes" 
      className="relative w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#0F1115] border-b border-[#23262D] text-[#E0E0E0]"
    >
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#16191F] border border-[#23262D] text-[#E2FF44] text-xs font-tech-mono uppercase tracking-widest font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#E2FF44]" />
            <span>Notable_Words & Wisdom</span>
            <span className="text-[#23262D]">//</span>
            <span>Requirement #5 Satisfied</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans-body font-black text-white">
            Words That Inspired Generations
          </h2>
        </div>

        {/* Featured Quote Callout Card (Requirement #5) */}
        <div className="relative p-8 sm:p-12 bg-[#16191F] border-2 border-[#23262D] hover:border-[#E2FF44] transition-colors shadow-2xl overflow-hidden backdrop-blur-xl">
          
          {/* Decorative Giant Background Quote Mark */}
          <div className="absolute -top-6 -left-6 text-[#E2FF44]/10 font-serif-display text-[160px] leading-none pointer-events-none select-none">
            “
          </div>

          <div className="relative z-10 space-y-6 text-center sm:text-left">
            
            <p className="text-xl sm:text-2xl lg:text-3xl font-editorial italic font-semibold text-white leading-relaxed">
              "{activeQuote.text}"
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[#23262D]">
              <div>
                <h4 className="text-base font-bold text-white font-sans-body">{figure.name}</h4>
                <p className="text-xs text-[#E2FF44] font-tech-mono mt-0.5 uppercase tracking-wider">
                  {activeQuote.context} {activeQuote.year && `(${activeQuote.year})`}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center sm:justify-end gap-3 font-mono text-xs uppercase">
                <button
                  onClick={onToggleSpeech}
                  className={`p-2.5 border font-bold flex items-center gap-2 transition ${
                    isSpeaking
                      ? 'bg-[#E2FF44] text-[#0F1115] border-[#E2FF44] animate-pulse'
                      : 'bg-[#0F1115] text-[#A1A1AA] border-[#23262D] hover:text-white'
                  }`}
                  title="Listen to Quote Speech"
                >
                  <Volume2 className="w-4 h-4 text-[#E2FF44]" />
                  <span className="hidden sm:inline">Listen</span>
                </button>

                <button
                  onClick={handleCopyQuote}
                  className="p-2.5 bg-[#0F1115] text-[#A1A1AA] hover:text-white border border-[#23262D] font-bold flex items-center gap-2 transition"
                  title="Copy Quote"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Quote Archive Carousel / Selector */}
        {figure.quoteArchive.length > 1 && (
          <div className="space-y-4">
            <h3 className="text-xs font-tech-mono uppercase tracking-widest text-[#A1A1AA] text-center font-bold">
              // Quote_Archive_Selector ({figure.quoteArchive.length} Entries)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {figure.quoteArchive.map((q) => (
                <button
                  key={q.id}
                  onClick={() => setActiveQuote(q)}
                  className={`p-4 text-left transition border ${
                    q.id === activeQuote.id
                      ? 'bg-[#16191F] border-[#E2FF44] text-white shadow-md'
                      : 'bg-[#0F1115] border-[#23262D] text-[#A1A1AA] hover:text-white'
                  }`}
                >
                  <p className="text-xs font-editorial italic line-clamp-2 text-white">"{q.text}"</p>
                  <div className="mt-2 text-[10px] font-tech-mono text-[#E2FF44] uppercase">{q.context}</div>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
