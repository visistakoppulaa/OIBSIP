import React, { useState } from 'react';
import { TributeFigure } from '../types';
import { 
  BookOpen, 
  Volume2, 
  VolumeX, 
  Type, 
  Bookmark, 
  BookmarkCheck, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight,
  Share2,
  Copy,
  Check
} from 'lucide-react';

interface BiographySectionProps {
  figure: TributeFigure;
  isSpeaking: boolean;
  onToggleSpeech: () => void;
}

export const BiographySection: React.FC<BiographySectionProps> = ({
  figure,
  isSpeaking,
  onToggleSpeech,
}) => {
  const [fontSizeLevel, setFontSizeLevel] = useState<'sm' | 'md' | 'lg'>('md');
  const [bookmarked, setBookmarked] = useState(false);
  const [copiedParagraph, setCopiedParagraph] = useState<number | null>(null);

  const getFontSizeClass = () => {
    switch (fontSizeLevel) {
      case 'sm': return 'text-base leading-relaxed';
      case 'lg': return 'text-xl leading-loose';
      default: return 'text-lg leading-relaxed';
    }
  };

  const handleCopyParagraph = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedParagraph(index);
    setTimeout(() => setCopiedParagraph(null), 2000);
  };

  return (
    <section 
      id="biography" 
      className="relative w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#0F1115] text-[#E0E0E0] border-b border-[#23262D]"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#23262D]">
          <div>
            <div className="flex items-center gap-2 text-xs font-tech-mono uppercase tracking-widest text-[#E2FF44] font-bold mb-2">
              <BookOpen className="w-4 h-4 text-[#E2FF44]" />
              <span>Original_Written_Biography</span>
              <span className="px-2 py-0.5 bg-[#16191F] text-[#E2FF44] border border-[#23262D] text-[10px] font-bold">
                5 Chapter Protocol
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans-body font-black text-white tracking-tight">
              Life, Legacy & Impact
            </h2>
          </div>

          {/* Reader Accessibility Controls */}
          <div className="flex items-center gap-3 bg-[#16191F] p-2 border border-[#23262D]">
            <span className="text-xs font-tech-mono text-[#A1A1AA] px-2 uppercase">Scale:</span>
            <div className="flex items-center bg-[#0F1115] border border-[#23262D] p-1 font-mono">
              <button
                onClick={() => setFontSizeLevel('sm')}
                className={`px-2.5 py-1 text-xs font-bold transition ${
                  fontSizeLevel === 'sm' ? 'bg-[#E2FF44] text-[#0F1115]' : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                A-
              </button>
              <button
                onClick={() => setFontSizeLevel('md')}
                className={`px-2.5 py-1 text-xs font-bold transition ${
                  fontSizeLevel === 'md' ? 'bg-[#E2FF44] text-[#0F1115]' : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                A
              </button>
              <button
                onClick={() => setFontSizeLevel('lg')}
                className={`px-2.5 py-1 text-xs font-bold transition ${
                  fontSizeLevel === 'lg' ? 'bg-[#E2FF44] text-[#0F1115]' : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                A+
              </button>
            </div>

            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-2 transition border ${
                bookmarked 
                  ? 'bg-[#E2FF44] text-[#0F1115] border-[#E2FF44]' 
                  : 'bg-[#0F1115] text-[#A1A1AA] border-[#23262D] hover:text-white'
              }`}
              title="Bookmark Biography Chapter"
            >
              {bookmarked ? <BookmarkCheck className="w-4 h-4 text-[#0F1115]" /> : <Bookmark className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-10">
          
          {/* Main Biography Text Column */}
          <div className="lg:col-span-8 space-y-10">
            {figure.biographyParagraphs.map((paragraph, index) => (
              <article 
                key={index} 
                className="group relative p-6 sm:p-8 bg-[#16191F] border border-[#23262D] transition-all duration-300"
              >
                {/* Chapter Heading */}
                <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-[#23262D]">
                  <h3 className="text-xl sm:text-2xl font-sans-body font-bold text-white">
                    {paragraph.heading}
                  </h3>
                  
                  <button
                    onClick={() => handleCopyParagraph(paragraph.content, index)}
                    className="p-1.5 text-[#A1A1AA] hover:text-[#E2FF44] hover:bg-[#0F1115] border border-[#23262D] transition text-xs flex items-center gap-1 font-mono"
                    title="Copy Paragraph Text"
                  >
                    {copiedParagraph === index ? (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Copied
                      </span>
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Paragraph Text */}
                <p className={`font-editorial text-[#E0E0E0] ${getFontSizeClass()}`}>
                  {paragraph.content}
                </p>
              </article>
            ))}
          </div>

          {/* Sticky Right Sidebar: Quick Facts & Chapter Index */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-6">
              
              {/* Chapter Navigator Box */}
              <div className="p-6 bg-[#16191F] border border-[#23262D]">
                <h4 className="text-xs font-tech-mono uppercase tracking-wider text-[#E2FF44] font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#E2FF44]" />
                  <span>Biography Index</span>
                </h4>
                <ul className="space-y-2">
                  {figure.biographyParagraphs.map((p, idx) => (
                    <li key={idx}>
                      <a 
                        href={`#bio-ch-${idx}`}
                        className="text-xs font-mono font-medium text-[#A1A1AA] hover:text-[#E2FF44] flex items-center gap-2 py-1.5 px-2 bg-[#0F1115] border border-[#23262D] hover:border-[#E2FF44] transition"
                      >
                        <ChevronRight className="w-3 h-3 text-[#E2FF44] flex-shrink-0" />
                        <span className="truncate">{p.heading}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Facts Sidebar Card */}
              <div className="p-6 bg-[#16191F] border border-[#23262D] space-y-4">
                <div className="text-[10px] font-tech-mono text-[#E2FF44] uppercase tracking-widest font-bold">// Fast_Facts_Card</div>
                <h4 className="text-lg font-sans-body font-bold text-white">{figure.name}</h4>
                
                <div className="space-y-3 text-xs font-mono divide-y divide-[#23262D]">
                  {figure.quickStats.map((stat, idx) => (
                    <div key={idx} className="pt-2 flex justify-between items-center gap-2">
                      <span className="text-[#A1A1AA]">{stat.label}:</span>
                      <span className="font-semibold text-white text-right">{stat.value}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#23262D] text-[10px] text-emerald-400 font-tech-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Verified Public Domain Sourced</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
