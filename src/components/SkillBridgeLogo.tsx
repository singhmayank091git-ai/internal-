import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const SkillBridgeLogo: React.FC<LogoProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  // Appropriate height sizing for navbar: roughly 40-48px height with auto width
  const heightClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-11 md:h-12', // 40px to 48px
    lg: 'h-12 sm:h-14',
    xl: 'h-14 sm:h-16',
  };

  return (
    <div 
      className={`relative inline-flex items-center select-none ${className}`}
      id="skillbridge-logo"
    >
      <img
        src="/skillbridge-logo.svg"
        alt="SkillBridge"
        className={`${heightClasses[size]} w-auto object-contain drop-shadow-[0_0_24px_rgba(0,229,255,0.25)]`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

