import React from 'react';
import { cn } from '@/lib/utils';

interface DivineLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const DivineLogo = ({ size = 'md', className }: DivineLogoProps) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  return (
    <div className={cn('relative', sizes[size], className)}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="divine-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4285F4" />
            <stop offset="33%" stopColor="#34A853" />
            <stop offset="66%" stopColor="#FBBC05" />
            <stop offset="100%" stopColor="#EA4335" />
          </linearGradient>
          <linearGradient id="inner-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#D946EF" />
          </linearGradient>
          <filter id="divine-glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="inner-shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000" floodOpacity="0.1"/>
          </filter>
        </defs>
        
        {/* Outer Divine Ring */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="url(#divine-gradient)"
          strokeWidth="2"
          fill="none"
          opacity="0.8"
          className="animate-pulse"
        />
        
        {/* Inner Sacred Geometry */}
        <path
          d="M30 25 L70 25 L85 50 L70 75 L30 75 L15 50 Z"
          fill="url(#inner-gradient)"
          filter="url(#inner-shadow)"
          className="animate-pulse"
          style={{ animationDelay: '0.5s' }}
        />
        
        {/* Central Arc Symbol */}
        <path
          d="M35 40 Q50 25 65 40 Q50 55 35 40"
          fill="white"
          opacity="0.95"
        />
        
        {/* Sacred Dots */}
        <circle cx="40" cy="45" r="2" fill="url(#divine-gradient)" />
        <circle cx="50" cy="38" r="2" fill="url(#divine-gradient)" />
        <circle cx="60" cy="45" r="2" fill="url(#divine-gradient)" />
        
        {/* Divine Text Integration */}
        <text
          x="50"
          y="70"
          textAnchor="middle"
          className="fill-white text-xs font-bold"
          style={{ fontSize: '8px' }}
        >
          ARC
        </text>
        
        {/* Orbital Rings */}
        <circle
          cx="50"
          cy="50"
          r="35"
          stroke="url(#divine-gradient)"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
          className="animate-spin"
          style={{ animationDuration: '20s' }}
        />
        <circle
          cx="50"
          cy="50"
          r="25"
          stroke="url(#divine-gradient)"
          strokeWidth="1"
          fill="none"
          opacity="0.4"
          className="animate-spin"
          style={{ animationDuration: '15s', animationDirection: 'reverse' }}
        />
      </svg>
    </div>
  );
};