import { useEffect, useRef } from 'react';

export const LeukodeLabsLogo = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' | 'xl' }) => {
  const logoRef = useRef<HTMLDivElement>(null);

  // Removed animations as requested

  const sizes = {
    sm: { container: 'w-12 h-12' },
    md: { container: 'w-16 h-16' },
    lg: { container: 'w-20 h-20' },
    xl: { container: 'w-28 h-28' }
  };

  return (
    <div className={`relative ${sizes[size].container} flex items-center justify-center`}>
      <img 
        src="/leukode-logo.png" 
        alt="Leukode Labs"
        className="w-full h-full object-contain filter drop-shadow-sm hover:drop-shadow-md transition-all duration-200"
      />
    </div>
  );
};