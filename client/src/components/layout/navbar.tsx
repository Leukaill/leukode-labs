import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { DivineLogo } from '@/components/ui/divine-logo';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const heroHeight = window.innerHeight * 0.8; // Approximate hero section height
      setIsScrolled(scrollTop > heroHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500">
      <div className="liquid-glassmorphism rounded-full shadow-lg px-8 py-4 border border-white/20">
        <div className="flex items-center space-x-12">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group navbar-logo opacity-0 scale-0 transition-all duration-700 ease-out">
            <DivineLogo size="md" />
            <span className="text-xl font-semibold tracking-wide text-black/90 group-hover:text-blue-600 transition-colors duration-300">
              Arc <span className="font-light">Labs</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('services')}
              className="text-black/90 hover:text-blue-600 transition-all duration-300 font-medium text-sm"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('why-us')}
              className="text-black/90 hover:text-blue-600 transition-all duration-300 font-medium text-sm"
            >
              Why Us
            </button>
            <button 
              onClick={() => scrollToSection('packages')}
              className="text-black/90 hover:text-blue-600 transition-all duration-300 font-medium text-sm"
            >
              Solutions
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="text-black/90 hover:text-blue-600 transition-all duration-300 font-medium text-sm"
            >
              Portfolio
            </button>
            <MagneticButton 
              variant="primary"
              size="sm"
              onClick={() => scrollToSection('contact')}
              magneticStrength={0.5}
            >
              Start Project
            </MagneticButton>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative w-10 h-10 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center text-white/90 hover:text-blue-300 transition-all duration-300"
            >
              <svg className={`w-5 h-5 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
        
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-1/2 transform -translate-x-1/2 liquid-glassmorphism border border-white/20 rounded-2xl py-6 shadow-lg min-w-[280px]">
          <div className="flex flex-col space-y-4 px-6">
            <button 
              onClick={() => {
                scrollToSection('services');
                setIsMenuOpen(false);
              }}
              className="text-left text-white/90 hover:text-blue-300 transition-all duration-300 font-medium text-sm py-2 drop-shadow-lg"
            >
              Services
            </button>
            <button 
              onClick={() => {
                scrollToSection('why-us');
                setIsMenuOpen(false);
              }}
              className="text-left text-white/90 hover:text-blue-300 transition-all duration-300 font-medium text-sm py-2 drop-shadow-lg"
            >
              Why Us
            </button>
            <button 
              onClick={() => {
                scrollToSection('packages');
                setIsMenuOpen(false);
              }}
              className="text-left text-white/90 hover:text-blue-300 transition-all duration-300 font-medium text-sm py-2 drop-shadow-lg"
            >
              Solutions
            </button>
            <button 
              onClick={() => {
                scrollToSection('portfolio');
                setIsMenuOpen(false);
              }}
              className="text-left text-white/90 hover:text-blue-300 transition-all duration-300 font-medium text-sm py-2 drop-shadow-lg"
            >
              Portfolio
            </button>
            <div className="pt-2">
              <MagneticButton 
                variant="primary"
                size="sm"
                onClick={() => {
                  scrollToSection('contact');
                  setIsMenuOpen(false);
                }}
                className="w-full"
                magneticStrength={0.3}
              >
                Start Project
              </MagneticButton>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
