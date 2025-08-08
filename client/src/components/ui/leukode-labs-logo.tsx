import { useEffect, useRef } from 'react';

export const LeukodeLabsLogo = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' | 'xl' }) => {
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
          {/* Dynamic Background - Clean white for logo visibility */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm opacity-90"></div>
          
          {/* Holographic Overlay */}
          <div className="absolute inset-0 advanced-holographic rounded-2xl opacity-10"></div>
          
          {/* Leukode Labs Logo */}
          <div className={`relative z-10 ${sizes[size].svg} flex items-center justify-center`}>
            <img 
              src="/leukode-logo.png" 
              alt="Leukode Labs"
              className="w-full h-full object-contain"
              style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))' }}
            />

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