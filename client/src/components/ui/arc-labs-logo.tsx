import { useEffect, useRef } from 'react';

export const ArcLabsLogo = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' | 'xl' }) => {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!logoRef.current) return;

    // Create sophisticated logo animation on mount
    const logo = logoRef.current;
    logo.style.opacity = '0';
    logo.style.transform = 'scale(0.3) rotateY(180deg) rotateX(45deg)';
    
    setTimeout(() => {
      logo.style.transition = 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
      logo.style.opacity = '1';
      logo.style.transform = 'scale(1) rotateY(0deg) rotateX(0deg)';
    }, 100);
  }, []);

  const sizes = {
    sm: { container: 'w-8 h-8', svg: 'w-5 h-5' },
    md: { container: 'w-12 h-12', svg: 'w-7 h-7' },
    lg: { container: 'w-16 h-16', svg: 'w-10 h-10' },
    xl: { container: 'w-24 h-24', svg: 'w-14 h-14' }
  };

  return (
    <div ref={logoRef} className={`relative ${sizes[size].container}`}>
      {/* Main Logo Container */}
      <div className="absolute inset-0 liquid-glassmorphism rounded-2xl levitating quantum-shimmer premium-shadow-xl">
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl">
          {/* Dynamic Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--google-blue))] via-[hsl(var(--google-green))] to-[hsl(var(--google-yellow))] opacity-90 animate-gradient-flow"></div>
          
          {/* Holographic Overlay */}
          <div className="absolute inset-0 advanced-holographic rounded-2xl opacity-20"></div>
          
          {/* Logo Symbol - Arc with Neural Network */}
          <div className={`relative z-10 ${sizes[size].svg} flex items-center justify-center`}>
            <svg 
              viewBox="0 0 40 40" 
              className="text-white drop-shadow-xl"
              style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))' }}
            >
              <defs>
                <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,1)" />
                  <stop offset="30%" stopColor="rgba(255,255,255,0.9)" />
                  <stop offset="70%" stopColor="rgba(255,255,255,0.95)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.8)" />
                </linearGradient>
                
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                
                <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                  <stop offset="50%" stopColor="rgba(255,255,255,0.8)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
                </linearGradient>
              </defs>
              
              {/* Main Arc - Company Vision */}
              <path
                d="M8 32 Q20 8 32 32"
                stroke="url(#arcGradient)"
                strokeWidth="3.5"
                fill="none"
                strokeLinecap="round"
                filter="url(#glow)"
                className="data-stream"
              />
              
              {/* Secondary Arc - Innovation Layer */}
              <path
                d="M10 30 Q20 12 30 30"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                opacity="0.6"
              />
              
              {/* Neural Network Nodes */}
              <circle cx="8" cy="32" r="2.5" fill="url(#arcGradient)" filter="url(#glow)" className="neural-glow" />
              <circle cx="20" cy="16" r="3" fill="url(#arcGradient)" filter="url(#glow)" className="neural-glow" />
              <circle cx="32" cy="32" r="2.5" fill="url(#arcGradient)" filter="url(#glow)" className="neural-glow" />
              
              {/* Innovation Connections */}
              <circle cx="14" cy="24" r="1.5" fill="rgba(255,255,255,0.7)" className="levitating" />
              <circle cx="26" cy="24" r="1.5" fill="rgba(255,255,255,0.7)" className="levitating" />
              
              {/* Data Flow Lines */}
              <path
                d="M10 30 L14 24 L20 16 L26 24 L30 30"
                stroke="url(#connectionGradient)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                opacity="0.5"
                className="predictive-hint"
              />
              
              {/* Energy Core */}
              <circle 
                cx="20" 
                cy="20" 
                r="1" 
                fill="rgba(255,255,255,0.9)" 
                className="neural-glow"
                style={{ animation: 'neural-pulse 2s ease-in-out infinite' }}
              />
              
              {/* Floating Data Points */}
              <circle cx="12" cy="20" r="0.8" fill="rgba(255,255,255,0.5)" opacity="0.7" className="levitating" />
              <circle cx="28" cy="20" r="0.8" fill="rgba(255,255,255,0.5)" opacity="0.7" className="levitating" />
              <circle cx="16" cy="28" r="0.6" fill="rgba(255,255,255,0.4)" opacity="0.6" className="levitating" />
              <circle cx="24" cy="28" r="0.6" fill="rgba(255,255,255,0.4)" opacity="0.6" className="levitating" />
            </svg>
          </div>
          
          {/* Outer Glow Ring */}
          <div className="absolute inset-0 rounded-2xl border-2 morphing-border opacity-60"></div>
          
          {/* Inner Light Reflection */}
          <div className="absolute top-1 left-1 right-1 h-2 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-t-2xl"></div>
        </div>
      </div>
      
      {/* Floating Energy Particles */}
      <div className="absolute -inset-3 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full levitating opacity-40"
            style={{
              top: `${15 + Math.random() * 70}%`,
              left: `${15 + Math.random() * 70}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
              filter: 'blur(0.5px)'
            }}
          />
        ))}
      </div>
    </div>
  );
};