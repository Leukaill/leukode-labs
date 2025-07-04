import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface GlassmorphismCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'holographic' | 'liquid' | 'neural' | 'impossible';
  intensity?: 'subtle' | 'medium' | 'intense';
}

const GlassmorphismCard = forwardRef<HTMLDivElement, GlassmorphismCardProps>(
  ({ className, variant = 'default', intensity = 'medium', children, ...props }, ref) => {
    const variants = {
      default: 'premium-glassmorphism premium-shadow future-magnetic',
      holographic: 'advanced-holographic premium-shadow-xl physics-hover',
      liquid: 'liquid-glassmorphism premium-shadow-xl impossible-glow',
      neural: 'neural-glow premium-glassmorphism premium-shadow-xl future-magnetic',
      impossible: 'liquid-glassmorphism advanced-holographic premium-shadow-xl impossible-glow neural-glow physics-hover quantum-shimmer'
    };

    const intensities = {
      subtle: 'backdrop-blur-sm',
      medium: 'backdrop-blur-lg',
      intense: 'backdrop-blur-xl'
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-3xl p-8 relative overflow-hidden transition-all duration-500 transform-gpu',
          variants[variant],
          intensities[intensity],
          className
        )}
        {...props}
      >
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
        
        {/* Inner Light Effect */}
        <div className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-30 transition-opacity duration-500"
             style={{
               background: 'radial-gradient(circle at 50% 0%, rgba(66, 133, 244, 0.1) 0%, transparent 50%)'
             }}>
        </div>
        
        {/* Border Highlight */}
        <div className="absolute inset-0 rounded-3xl border border-white/20 pointer-events-none"></div>
      </div>
    );
  }
);

GlassmorphismCard.displayName = 'GlassmorphismCard';

export { GlassmorphismCard };
