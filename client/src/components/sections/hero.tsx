import { useEffect } from 'react';
import { MagneticButton } from '@/components/ui/magnetic-button';

import { ParticleBackground } from '@/components/3d/particle-background';
import { TechSlideshow } from '@/components/ui/tech-slideshow';
import { initScrollAnimations } from '@/lib/gsap-animations';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const HeroSection = () => {
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
    <section className="pt-20 pb-16 md:pt-24 md:pb-20 min-h-screen flex items-center relative overflow-hidden">
      {/* Tech Slideshow Background */}
      <TechSlideshow />
      
      {/* Particle effects on top of slideshow */}
      <div className="absolute inset-0 z-[1]">
        <ParticleBackground />
      </div>
      
      {/* Static Background Effects - Better Performance */}
      <div className="absolute inset-0 overflow-hidden z-[2]">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-[hsl(var(--google-blue))]/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-[hsl(var(--google-green))]/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-[hsl(var(--google-yellow))]/8 to-transparent rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="cinematic-entrance" style={{ animationDelay: '0.3s' }}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-thin mb-6 md:mb-8 leading-tight tracking-tight text-white" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 8px 40px rgba(0,0,0,0.6)' }}>
              The <span className="font-light italic">Future</span> of
              <br />
              <span className="font-semibold bg-gradient-to-r from-blue-400 via-green-300 to-yellow-300 bg-clip-text text-transparent" style={{ filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.8)) drop-shadow(0 8px 40px rgba(0,0,0,0.6))' }}>
                Web Development
              </span>
            </h1>
          </div>
          
          <div className="cinematic-entrance" style={{ animationDelay: '0.6s' }}>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-12 md:mb-16 max-w-3xl md:max-w-5xl mx-auto font-light leading-relaxed text-gray-200" style={{ textShadow: '0 4px 16px rgba(0,0,0,0.7), 0 6px 30px rgba(0,0,0,0.5)' }}>
              We craft <span className="font-medium text-blue-300">impossible</span> digital experiences that 
              transcend expectations and redefine what's possible in web development.
            </p>
          </div>
          
          <div className="cinematic-entrance flex flex-col sm:flex-row gap-6 justify-center items-center" style={{ animationDelay: '0.9s' }}>
            <MagneticButton 
              variant="impossible"
              size="xl" 
              onClick={() => scrollToSection('contact')}
              magneticStrength={0.2}
            >
              <span className="flex items-center gap-3">
                <span>Experience the Impossible</span>
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
