import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { useMagneticEffect } from '@/hooks/use-magnetic-effect';

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'impossible';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  magneticStrength?: number;
}

const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ className, variant = 'primary', size = 'md', magneticStrength = 0.4, children, ...props }, _ref) => {
    const magneticRef = useMagneticEffect(magneticStrength);

    const variants = {
      primary: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-xl border border-blue-500/20',
      secondary: 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-900 shadow-lg hover:shadow-xl border border-slate-300/50',
      outline: 'border-2 border-blue-600 bg-transparent text-blue-600 hover:bg-blue-600 hover:text-white shadow-lg',
      impossible: 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl border border-indigo-500/20'
    };

    const sizes = {
      sm: 'px-6 py-3 text-sm font-medium',
      md: 'px-8 py-4 text-base font-medium',
      lg: 'px-12 py-5 text-lg font-medium',
      xl: 'px-16 py-6 text-xl font-medium'
    };

    return (
      <button
        ref={magneticRef as any}
        className={cn(
          'rounded-full relative overflow-hidden transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) transform-gpu predictive-hint',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
        
        {/* Button Inner Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
        
        {/* Ripple Effect */}
        <div className="absolute inset-0 rounded-full opacity-0 hover:opacity-20 transition-opacity duration-300" 
             style={{
               background: 'radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%)'
             }}>
        </div>
      </button>
    );
  }
);

MagneticButton.displayName = 'MagneticButton';

export { MagneticButton };
