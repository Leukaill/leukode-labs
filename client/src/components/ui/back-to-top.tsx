import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUpIcon } from '@heroicons/react/24/outline';

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDarkBackground, setIsDarkBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setScrollProgress(scrollPercent);
      setIsVisible(scrollTop > 300); // Show after 300px scroll
      
      // Detect background color
      const buttonPosition = window.innerHeight - 120; // Button position from top
      const currentScrollPosition = scrollTop + buttonPosition;
      
      // Get elements at button position
      const elementsAtPosition = document.elementsFromPoint(
        window.innerWidth - 80, // Button X position
        buttonPosition
      );
      
      // Check background colors of elements
      let isDark = false;
      for (const element of elementsAtPosition) {
        const styles = window.getComputedStyle(element);
        const bgColor = styles.backgroundColor;
        const hasGradient = styles.backgroundImage && styles.backgroundImage !== 'none';
        
        // Check if element has dark background
        if (bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
          const rgb = bgColor.match(/\d+/g);
          if (rgb) {
            const [r, g, b] = rgb.map(Number);
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            isDark = brightness < 128;
            break;
          }
        }
        
        // Check for dark gradients or specific classes
        if (hasGradient || element.classList.contains('bg-slate-900') || 
            element.classList.contains('bg-black') || 
            element.classList.contains('bg-gray-900')) {
          isDark = true;
          break;
        }
      }
      
      setIsDarkBackground(isDark);
    };

    const throttledHandleScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', throttledHandleScroll);
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-8 right-8 z-50"
        >
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`relative w-14 h-14 rounded-full group overflow-hidden transition-all duration-300 ${
              isDarkBackground 
                ? 'liquid-glassmorphism border border-white/30 shadow-xl' 
                : 'bg-white/90 border border-gray-200/50 shadow-lg backdrop-blur-xl'
            }`}
          >
            {/* Progress Circle Background */}
            <svg 
              className="absolute inset-0 w-full h-full transform -rotate-90" 
              viewBox="0 0 56 56"
            >
              {/* Background Circle */}
              <circle
                cx="28"
                cy="28"
                r="24"
                fill="none"
                stroke={isDarkBackground ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)"}
                strokeWidth="2"
              />
              {/* Progress Circle */}
              <motion.circle
                cx="28"
                cy="28"
                r="24"
                fill="none"
                stroke={isDarkBackground ? "url(#progressGradientDark)" : "url(#progressGradientLight)"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 24}`}
                strokeDashoffset={`${2 * Math.PI * 24 * (1 - scrollProgress / 100)}`}
                transition={{ duration: 0.1 }}
              />
              {/* Gradient Definitions */}
              <defs>
                <linearGradient id="progressGradientDark" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="50%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
                <linearGradient id="progressGradientLight" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1E40AF" />
                  <stop offset="50%" stopColor="#7C2D12" />
                  <stop offset="100%" stopColor="#BE185D" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Arrow Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <ChevronUpIcon className={`w-6 h-6 transition-colors duration-200 ${
                isDarkBackground 
                  ? 'text-white/90 group-hover:text-white' 
                  : 'text-gray-700 group-hover:text-gray-900'
              }`} />
            </div>
            
            {/* Hover Glow Effect */}
            <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg ${
              isDarkBackground 
                ? 'bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20' 
                : 'bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30'
            }`}></div>
            
            {/* Inner Light Reflection */}
            <div className={`absolute top-1 left-1 right-1 h-3 rounded-full ${
              isDarkBackground 
                ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent' 
                : 'bg-gradient-to-r from-transparent via-white/40 to-transparent'
            }`}></div>
          </motion.button>
          
          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1 h-1 rounded-full ${
                  isDarkBackground ? 'bg-white/40' : 'bg-gray-600/60'
                }`}
                animate={{
                  y: [-10, -30, -10],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.7,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  left: `${30 + i * 15}%`,
                  top: '10%'
                }}
              />
            ))}
          </div>
          
          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className={`absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 text-sm rounded-lg whitespace-nowrap backdrop-blur-sm ${
              isDarkBackground 
                ? 'bg-black/80 text-white' 
                : 'bg-white/90 text-gray-900 border border-gray-200/50'
            }`}
          >
            Back to top
            <div className={`absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent ${
              isDarkBackground 
                ? 'border-l-4 border-l-black/80' 
                : 'border-l-4 border-l-white/90'
            }`}></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};