import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { DivineLogo } from '@/components/ui/divine-logo';
import { SearchModal } from '@/components/ui/search-modal';
import { NewsletterModal } from '@/components/ui/newsletter-modal';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const heroHeight = window.innerHeight * 0.8; // Approximate hero section height
      setIsScrolled(scrollTop > heroHeight);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Mobile Dynamic Island */}
      <nav className="md:hidden fixed top-4 left-4 right-4 z-50">
        <div className="liquid-glassmorphism rounded-full shadow-lg px-4 py-2 border border-white/20 h-12">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <DivineLogo size="sm" />
            </Link>
            
            {/* Icons Container */}
            <div className="flex items-center space-x-3">
              {/* Search Icon */}
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="w-8 h-8 flex items-center justify-center text-black/80 hover:text-blue-600 transition-colors duration-300"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
              </button>
              
              {/* Hamburger Menu */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-8 h-8 flex items-center justify-center text-black/80 hover:text-blue-600 transition-all duration-300"
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
      </nav>

      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500">
        <div className="liquid-glassmorphism rounded-full shadow-lg px-8 py-4 border border-white/20">
          <div className="flex items-center space-x-12">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group navbar-logo opacity-0 scale-0 transition-all duration-700 ease-out">
              <DivineLogo size="md" />
              <span className="text-xl font-semibold tracking-wide text-black/90 group-hover:text-blue-600 transition-colors duration-300">
                Arc <span className="font-light">Labs</span>
              </span>
            </Link>
            
            {/* Desktop Navigation Items */}
            <div className="flex items-center space-x-8">
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
              <Link href="/about">
                <button className="text-black/90 hover:text-blue-600 transition-all duration-300 font-medium text-sm">
                  About
                </button>
              </Link>
              <button 
                onClick={() => setIsNewsletterOpen(true)}
                className="text-black/90 hover:text-blue-600 transition-all duration-300 font-medium text-sm"
              >
                Newsletter
              </button>
              
              {/* Search Icon */}
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="text-black/90 hover:text-blue-600 transition-colors duration-300"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
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
          </div>
        </div>
      </nav>
        
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-20 left-4 right-4 z-40">
          <div className="liquid-glassmorphism border border-white/20 rounded-2xl py-6 shadow-lg">
            <div className="flex flex-col space-y-4 px-6">
              <button 
                onClick={() => {
                  scrollToSection('services');
                  setIsMenuOpen(false);
                }}
                className="text-left text-black/90 hover:text-blue-600 transition-all duration-300 font-medium text-sm py-2"
              >
                Services
              </button>
              <button 
                onClick={() => {
                  scrollToSection('why-us');
                  setIsMenuOpen(false);
                }}
                className="text-left text-black/90 hover:text-blue-600 transition-all duration-300 font-medium text-sm py-2"
              >
                Why Us
              </button>
              <button 
                onClick={() => {
                  scrollToSection('packages');
                  setIsMenuOpen(false);
                }}
                className="text-left text-black/90 hover:text-blue-600 transition-all duration-300 font-medium text-sm py-2"
              >
                Solutions
              </button>
              <button 
                onClick={() => {
                  scrollToSection('portfolio');
                  setIsMenuOpen(false);
                }}
                className="text-left text-black/90 hover:text-blue-600 transition-all duration-300 font-medium text-sm py-2"
              >
                Portfolio
              </button>
              <Link href="/about">
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-left text-black/90 hover:text-blue-600 transition-all duration-300 font-medium text-sm py-2"
                >
                  About
                </button>
              </Link>
              <button 
                onClick={() => {
                  setIsNewsletterOpen(true);
                  setIsMenuOpen(false);
                }}
                className="text-left text-black/90 hover:text-blue-600 transition-all duration-300 font-medium text-sm py-2"
              >
                Newsletter
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
        </div>
      )}

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      {/* Newsletter Modal */}
      <NewsletterModal isOpen={isNewsletterOpen} onClose={() => setIsNewsletterOpen(false)} />
    </>
  );
};
