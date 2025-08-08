import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUpIcon } from '@heroicons/react/24/outline';

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setScrollProgress(scrollPercent);
      setIsVisible(scrollTop > 300); // Show after 300px scroll
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
            className="relative w-14 h-14 rounded-full liquid-glassmorphism border border-white/30 group overflow-hidden"
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
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="2"
              />
              {/* Progress Circle */}
              <motion.circle
                cx="28"
                cy="28"
                r="24"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 24}`}
                strokeDashoffset={`${2 * Math.PI * 24 * (1 - scrollProgress / 100)}`}
                transition={{ duration: 0.1 }}
              />
              {/* Gradient Definition */}
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="50%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Arrow Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <ChevronUpIcon className="w-6 h-6 text-white/90 group-hover:text-white transition-colors duration-200" />
            </div>
            
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-lg"></div>
            
            {/* Inner Light Reflection */}
            <div className="absolute top-1 left-1 right-1 h-3 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"></div>
          </motion.button>
          
          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/40 rounded-full"
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
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-black/80 text-white text-sm rounded-lg whitespace-nowrap backdrop-blur-sm"
          >
            Back to top
            <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-black/80 border-y-4 border-y-transparent"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};