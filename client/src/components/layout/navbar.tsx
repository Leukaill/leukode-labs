import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { DivineLogo } from '@/components/ui/divine-logo';
import { SearchModal } from '@/components/ui/search-modal';
import { NewsletterModal } from '@/components/ui/newsletter-modal';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { LocationMap } from '@/components/ui/location-map';
import { MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useTranslation } from '@/hooks/use-translation';

export const Navbar = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const heroHeight = window.innerHeight * 0.8;
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
      {/* Mobile Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="md:hidden fixed top-4 left-4 right-4 z-40"
      >
        <motion.div 
          animate={{
            scale: isMenuOpen ? 1.02 : 1,
            boxShadow: isMenuOpen 
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' 
              : '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="liquid-glassmorphism rounded-full shadow-lg px-4 py-2 border border-white/20 h-12 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between h-full">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/" className="flex items-center">
                <DivineLogo size="sm" />
              </Link>
            </motion.div>
            
            <div className="flex items-center space-x-3">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsSearchOpen(true)}
                className="w-8 h-8 flex items-center justify-center text-black/80 hover:text-blue-600 transition-colors duration-300"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-8 h-8 flex items-center justify-center text-black/80 hover:text-blue-600 transition-all duration-300"
              >
                <motion.svg 
                  animate={{ rotate: isMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </motion.svg>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Desktop Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden md:block fixed top-0 left-0 right-0 z-40"
      >
        <motion.div 
          animate={{
            backgroundColor: isScrolled 
              ? 'rgba(255, 255, 255, 0.95)' 
              : 'rgba(255, 255, 255, 0)',
            backdropFilter: isScrolled ? 'blur(20px)' : 'blur(0px)',
            borderBottomColor: isScrolled ? 'rgba(229, 231, 235, 0.5)' : 'rgba(229, 231, 235, 0)',
            boxShadow: isScrolled 
              ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' 
              : '0 0 0 0 rgba(0, 0, 0, 0)'
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="border-b"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <Link href="/" className="flex items-center space-x-3 group">
                  <DivineLogo size="md" />
                  <span className="text-xl font-semibold tracking-wide text-black/90 group-hover:text-blue-600 transition-colors duration-300">
                    Arc <span className="font-light">Labs</span>
                  </span>
                </Link>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center space-x-8"
              >
                {['services', 'why-us', 'packages', 'portfolio'].map((section, index) => (
                  <motion.button
                    key={section}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    whileHover={{ y: -2 }}
                    onClick={() => scrollToSection(section)}
                    className="text-black/90 hover:text-blue-600 transition-all duration-300 font-medium text-sm relative group"
                  >
                    {section === 'why-us' ? 'Why Us' : 
                     section === 'packages' ? t.nav.packages : 
                     section === 'services' ? t.nav.services :
                     section === 'portfolio' ? t.nav.portfolio :
                     section.charAt(0).toUpperCase() + section.slice(1)}
                    <motion.div 
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"
                      whileHover={{ width: '100%' }}
                    />
                  </motion.button>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  whileHover={{ y: -2 }}
                >
                  <Link href="/about">
                    <button className="text-black/90 hover:text-blue-600 transition-all duration-300 font-medium text-sm relative group">
                      {t.nav.about}
                      <motion.div 
                        className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"
                        whileHover={{ width: '100%' }}
                      />
                    </button>
                  </Link>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsNewsletterOpen(true)}
                  className="text-black/90 hover:text-blue-600 transition-all duration-300 font-medium text-sm"
                >
                  {t.nav.newsletter}
                </motion.button>
                
                <motion.button
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsSearchOpen(true)}
                  className="text-black/90 hover:text-blue-600 transition-colors duration-300"
                >
                  <MagnifyingGlassIcon className="w-5 h-5" />
                </motion.button>

                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.75 }}
                >
                  <LanguageSwitcher variant="compact" />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <MagneticButton 
                    variant="primary"
                    size="sm"
                    onClick={() => scrollToSection('contact')}
                    magneticStrength={0.5}
                  >
                    {t.hero.cta}
                  </MagneticButton>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.nav>
        
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden fixed top-20 left-4 right-4 z-40"
          >
            <div className="liquid-glassmorphism border border-white/20 rounded-2xl py-6 shadow-xl backdrop-blur-xl">
              <div className="flex flex-col space-y-4 px-6">
                {['services', 'why-us', 'packages', 'portfolio'].map((section, index) => (
                  <motion.button
                    key={section}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    whileHover={{ x: 10 }}
                    onClick={() => {
                      scrollToSection(section);
                      setIsMenuOpen(false);
                    }}
                    className="text-left text-black/90 hover:text-blue-600 transition-all duration-300 font-medium text-sm py-2"
                  >
                    {section === 'why-us' ? 'Why Us' : 
                     section === 'packages' ? t.nav.packages : 
                     section === 'services' ? t.nav.services :
                     section === 'portfolio' ? t.nav.portfolio :
                     section.charAt(0).toUpperCase() + section.slice(1)}
                  </motion.button>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <Link href="/about">
                    <button 
                      onClick={() => setIsMenuOpen(false)}
                      className="text-left text-black/90 hover:text-blue-600 transition-all duration-300 font-medium text-sm py-2"
                    >
                      {t.nav.about}
                    </button>
                  </Link>
                </motion.div>
                
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                  whileHover={{ x: 10 }}
                  onClick={() => {
                    setIsNewsletterOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="text-left text-black/90 hover:text-blue-600 transition-all duration-300 font-medium text-sm py-2"
                >
                  {t.nav.newsletter}
                </motion.button>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.65 }}
                  className="py-2"
                >
                  <LanguageSwitcher variant="compact" />
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                  className="pt-2"
                >
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
                    {t.hero.cta}
                  </MagneticButton>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      {/* Newsletter Modal */}
      <NewsletterModal isOpen={isNewsletterOpen} onClose={() => setIsNewsletterOpen(false)} />
      
      {/* Location Map Modal */}
      <LocationMap isOpen={isLocationOpen} onClose={() => setIsLocationOpen(false)} />
    </>
  );
};