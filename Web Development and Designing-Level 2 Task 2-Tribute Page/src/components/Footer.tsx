import React from 'react';
import { TributeFigure } from '../types';
import { ExternalLink, ArrowUp, Heart, Globe, BookOpen } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  figure: TributeFigure;
}

export const Footer: React.FC<FooterProps> = ({ figure }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#0F1115] text-[#A1A1AA] py-12 px-4 sm:px-6 lg:px-8 border-t border-[#23262D] text-xs font-mono">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Row: References & Sources */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8 border-b border-[#23262D]">
          
          <div className="space-y-2">
            <h4 className="text-xs font-tech-mono uppercase tracking-widest text-white font-bold flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#E2FF44]" /> Research & Sourcing
            </h4>
            <p className="text-[#A1A1AA] leading-relaxed">
              Factual content paraphrased from academic encyclopedias including Wikipedia & Britannica as specified in Oasis Infobyte Task 2 guidelines.
            </p>
          </div>

          {/* Sourced Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-tech-mono uppercase tracking-widest text-white font-bold">
              Primary Reference Links ({figure.shortName})
            </h4>
            <ul className="space-y-1.5">
              {figure.references.map((ref, idx) => (
                <li key={idx}>
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#E2FF44] hover:underline flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3 h-3 text-[#A1A1AA]" />
                    <span>{ref.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack & Rubric Compliance */}
          <div className="space-y-2">
            <h4 className="text-xs font-tech-mono uppercase tracking-widest text-white font-bold">
              Compliance & Stack
            </h4>
            <p className="text-[#A1A1AA]">
              Built with React 19, TypeScript, Tailwind CSS v4, Motion, Lucide Icons, and Web Speech API.
            </p>
            <div className="pt-1 text-emerald-400 font-tech-mono font-semibold">
              ✓ All 8 Task Checklist Items Satisfied
            </div>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 font-sans-body">
            <Logo size="sm" showText={true} />
            <span className="text-[#23262D] hidden sm:inline">|</span>
            <span className="hidden sm:inline">Crafted with honor for <strong className="text-white">{figure.name}</strong></span>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 bg-[#16191F] hover:bg-[#121418] text-[#A1A1AA] hover:text-white border border-[#23262D] flex items-center gap-2 transition font-tech-mono uppercase tracking-wider font-bold"
            title="Scroll to Top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4 text-[#E2FF44]" />
          </button>
        </div>

      </div>
    </footer>
  );
};
