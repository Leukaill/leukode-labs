import { useEffect } from 'react';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { DivineLogo } from '@/components/ui/divine-logo';
import { ParticleBackground } from '@/components/3d/particle-background';
import { initScrollAnimations } from '@/lib/gsap-animations';
import { useTranslation } from '@/hooks/use-translation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const HeroSection = () => {
  const { t } = useTranslation();
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    initScrollAnimations();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-20 pb-16 md:pt-24 md:pb-20 min-h-screen flex items-center relative overflow-hidden neural-network-bg">
      <ParticleBackground />
      {/* Cinematic Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-[hsl(var(--google-blue))]/10 to-transparent rounded-full blur-3xl levitating"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-[hsl(var(--google-green))]/10 to-transparent rounded-full blur-3xl levitating" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-[hsl(var(--google-yellow))]/8 to-transparent rounded-full blur-3xl levitating" style={{ animationDelay: '4s' }}></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="mb-8 md:mb-16 hero-logo">
            <DivineLogo size="lg" className="md:hidden" />
            <DivineLogo size="xl" className="hidden md:block" />
          </div>
          
          <div className="cinematic-entrance" style={{ animationDelay: '0.3s' }}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-thin mb-6 md:mb-8 leading-tight tracking-tight text-[#080000]">
              {t.hero.title}
            </h1>
          </div>
          
          <div className="cinematic-entrance" style={{ animationDelay: '0.6s' }}>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-12 md:mb-16 max-w-3xl md:max-w-5xl mx-auto font-light leading-relaxed text-[#4f4a4a]">
              {t.hero.subtitle}
            </p>
          </div>
          
          <div className="cinematic-entrance flex flex-col sm:flex-row gap-6 justify-center items-center" style={{ animationDelay: '0.9s' }}>
            <MagneticButton 
              variant="impossible"
              size="xl" 
              onClick={() => scrollToSection('contact')}
              magneticStrength={0.6}
            >
              <span className="flex items-center gap-3">
                <span>{t.hero.cta}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </MagneticButton>
            
            <MagneticButton 
              variant="outline" 
              size="xl"
              onClick={() => scrollToSection('portfolio')}
              magneticStrength={0.5}
            >
              <span className="flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="23 7 16 12 23 17 23 7"/>
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                </svg>
                <span>View Impossible Work</span>
              </span>
            </MagneticButton>
          </div>
        </div>
      </div>
      {/* Data Streams */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute data-stream opacity-30"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 20}%`,
              width: '200px',
              height: '2px',
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
};
