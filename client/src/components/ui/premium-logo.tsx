import { useEffect, useRef } from 'react';

export const PremiumLogo = () => {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!logoRef.current) return;

    // Create logo animation on mount
    const logo = logoRef.current;
    logo.style.opacity = '0';
    logo.style.transform = 'scale(0.5) rotateY(180deg)';
    
    setTimeout(() => {
      logo.style.transition = 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
      logo.style.opacity = '1';
      logo.style.transform = 'scale(1) rotateY(0deg)';
    }, 100);
  }, []);

  return (
    <div ref={logoRef} className="relative w-32 h-32 mx-auto mb-12">
      {/* Main Logo Container */}
      <div className="absolute inset-0 liquid-glassmorphism rounded-3xl levitating quantum-shimmer">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Holographic Background */}
          <div className="absolute inset-2 advanced-holographic rounded-2xl"></div>
          
          {/* Logo Symbol */}
          <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-[hsl(var(--google-blue))] via-[hsl(var(--google-green))] to-[hsl(var(--google-yellow))] rounded-2xl flex items-center justify-center premium-shadow-xl">
            <div className="relative">
              {/* Arc Symbol */}
              <svg width="32" height="32" viewBox="0 0 32 32" className="text-white">
                <defs>
                  <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
                    <stop offset="50%" stopColor="rgba(255,255,255,1)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.8)" />
                  </linearGradient>
                </defs>
                
                {/* Arc Path */}
                <path
                  d="M6 26 Q16 6 26 26"
                  stroke="url(#arcGradient)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  className="data-stream"
                />
                
                {/* Connection Points */}
                <circle cx="6" cy="26" r="2" fill="url(#arcGradient)" className="neural-glow" />
                <circle cx="16" cy="14" r="2.5" fill="url(#arcGradient)" className="neural-glow" />
                <circle cx="26" cy="26" r="2" fill="url(#arcGradient)" className="neural-glow" />
                
                {/* Energy Lines */}
                <path
                  d="M8 24 L14 16 L20 20 L24 24"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="1"
                  fill="none"
                  strokeLinecap="round"
                  className="predictive-hint"
                />
              </svg>
            </div>
          </div>
          
          {/* Outer Ring Effect */}
          <div className="absolute inset-0 rounded-3xl border-2 morphing-border"></div>
        </div>
      </div>
      
      {/* Floating Particles */}
      <div className="absolute -inset-4 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[hsl(var(--google-blue))] rounded-full levitating opacity-60"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};