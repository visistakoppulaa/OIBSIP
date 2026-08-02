import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14'
  };

  return (
    <div className="flex items-center gap-3 group cursor-pointer select-none">
      {/* Outer Geometric Container */}
      <div className={`relative flex items-center justify-center ${sizeClasses[size]}`}>
        {/* Glowing background halo on hover */}
        <div className="absolute inset-0 bg-[#E2FF44]/20 rounded-md blur-md group-hover:bg-[#E2FF44]/40 transition-all duration-300 opacity-60" />

        {/* Rotated Diamond Base */}
        <div className="absolute inset-0 bg-[#E2FF44] rounded-sm rotate-45 border border-[#0F1115] shadow-lg group-hover:rotate-90 transition-all duration-500 ease-out flex items-center justify-center">
          {/* Inner dark core */}
          <div className="w-[70%] h-[70%] bg-[#0F1115] border border-[#E2FF44]/50 flex items-center justify-center">
            {/* Center dot */}
            <div className="w-1.5 h-1.5 bg-[#E2FF44] rounded-full animate-ping" />
          </div>
        </div>

        {/* Overlaid SVG Geometric Orbit & Chakra Motif */}
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 w-full h-full text-[#0F1115] group-hover:scale-105 transition-transform duration-300"
        >
          {/* Outer Ring */}
          <circle cx="20" cy="20" r="14" stroke="#0F1115" strokeWidth="1.5" strokeDasharray="2 2" className="animate-[spin_12s_linear_infinite]" />
          
          {/* Orbit Loop (Space/Sarabhai) */}
          <ellipse cx="20" cy="20" rx="16" ry="6" stroke="#0F1115" strokeWidth="1.2" transform="rotate(-30 20 20)" opacity="0.8" />
          
          {/* Infinity / Theta Loop (Ramanujan) */}
          <path
            d="M 14 20 C 14 16 18 16 20 20 C 22 24 26 24 26 20 C 26 16 22 16 20 20 C 18 24 14 24 14 20 Z"
            stroke="#0F1115"
            strokeWidth="1.2"
            fill="none"
            opacity="0.9"
          />

          {/* Central Missile/Star Trajectory Point (Kalam) */}
          <polygon points="20,10 22,18 30,20 22,22 20,30 18,22 10,20 18,18" fill="#0F1115" opacity="0.85" />
          
          <circle cx="20" cy="20" r="2.5" fill="#0F1115" />
        </svg>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-tech-mono text-[#E2FF44] text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-extrabold group-hover:text-white transition-colors">
              BHARAT_VIGYAN
            </span>
            <span className="px-1.5 py-0.2 text-[8px] font-tech-mono uppercase tracking-widest bg-[#E2FF44]/20 text-[#E2FF44] border border-[#E2FF44]/40 font-bold">
              IND
            </span>
          </div>
          <span className="text-xs font-bold text-white tracking-wide font-sans-body group-hover:text-[#E2FF44] transition-colors">
            Pioneers of Indian Science
          </span>
        </div>
      )}
    </div>
  );
};
