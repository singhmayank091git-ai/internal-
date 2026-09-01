import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SkillBridgeLogo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`} id="skillbridge-logo">
      <div className={`relative ${iconSizes[size]} flex items-center justify-center`}>
        {/* Glow ambient background behind logo */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-xl blur-[6px] opacity-70" />
        
        {/* Crisp vector badge */}
        <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-white/15 flex items-center justify-center shadow-lg shadow-indigo-950/50 backdrop-blur-md overflow-hidden">
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5/6 h-5/6"
          >
            <defs>
              <linearGradient id="logo-grad-1" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                <stop stopColor="#60A5FA" />
                <stop offset="0.5" stopColor="#818CF8" />
                <stop offset="1" stopColor="#C084FC" />
              </linearGradient>
              <linearGradient id="logo-grad-arc" x1="6" y1="20" x2="26" y2="12" gradientUnits="userSpaceOnUse">
                <stop stopColor="#38BDF8" />
                <stop offset="1" stopColor="#A855F7" />
              </linearGradient>
            </defs>

            {/* Bridge Arch Paths */}
            <path
              d="M 6 22 C 10 14, 22 14, 26 22"
              stroke="url(#logo-grad-arc)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M 10 18 L 10 24 M 16 16 L 16 24 M 22 18 L 22 24"
              stroke="url(#logo-grad-arc)"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeOpacity="0.75"
            />

            {/* Connecting Top Sparks / Nodes */}
            <circle cx="16" cy="10" r="2.5" fill="url(#logo-grad-1)" />
            <circle cx="9" cy="12" r="1.5" fill="#60A5FA" fillOpacity="0.8" />
            <circle cx="23" cy="12" r="1.5" fill="#C084FC" fillOpacity="0.8" />
            
            {/* Spark ray */}
            <path
              d="M 16 6 L 16 8 M 16 12 L 16 14"
              stroke="#E0E7FF"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-col">
        <div className={`font-bold tracking-tight text-white flex items-center ${textSizes[size]}`}>
          <span>Skill</span>
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent ml-0.5">
            Bridge
          </span>
        </div>
      </div>
    </div>
  );
};
