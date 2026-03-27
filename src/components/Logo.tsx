import React from 'react';

export const Logo = ({ className = "w-12 h-12" }: { className?: string }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    {/* The "Point" (Coin/Destination) */}
    <div className="absolute inset-0 bg-cobalt rounded-full shadow-[0_0_20px_rgba(46,91,255,0.4)]" />
    
    {/* The Lightning Bolt */}
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      className="relative z-10 w-3/4 h-3/4 text-cyan drop-shadow-[0_0_5px_rgba(0,245,255,0.8)]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M13 2L3 14H12L11 22L21 10H12L13 2Z" 
        fill="currentColor" 
        stroke="currentColor" 
        strokeWidth="1" 
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

export const LogoText = () => (
  <div className="flex items-center gap-2">
    <Logo className="w-8 h-8" />
    <span className="text-xl font-bold tracking-tighter text-white">
      FLASH<span className="text-cyan">POINT</span>
    </span>
  </div>
);
