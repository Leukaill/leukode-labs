import { useEffect, useRef } from 'react';

export const LeukodeLabsLogo = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' | 'xl' }) => {
  const logoRef = useRef<HTMLDivElement>(null);

  // Removed animations as requested

  const sizes = {
    sm: { container: 'w-8 h-8', svg: 'w-5 h-5' },
    md: { container: 'w-12 h-12', svg: 'w-7 h-7' },
    lg: { container: 'w-16 h-16', svg: 'w-10 h-10' },
    xl: { container: 'w-24 h-24', svg: 'w-14 h-14' }
  };

  return (
    <div className={`relative ${sizes[size].container}`}>
      <img 
        src="/leukode-logo.png" 
        alt="Leukode Labs"
        className="w-full h-full object-contain"
      />
    </div>
  );
};