import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

interface DynamicIslandProps {
  isScrolled: boolean;
  onSearchOpen: () => void;
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export const DynamicIsland = ({ isScrolled, onSearchOpen, onMenuToggle, isMenuOpen }: DynamicIslandProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const islandVariants = {
    collapsed: {
      width: 140,
      height: 36,
      borderRadius: 18,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(20px)',
      transition: { duration: 0.3, ease: 'easeInOut' }
    },
    expanded: {
      width: 280,
      height: 56,
      borderRadius: 28,
      background: 'rgba(0, 0, 0, 0.9)',
      backdropFilter: 'blur(30px)',
      transition: { duration: 0.4, ease: 'easeInOut' }
    }
  };

  const contentVariants = {
    collapsed: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2 }
    },
    expanded: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, delay: 0.1 }
    }
  };

  return (
    <motion.div
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 cursor-pointer"
      initial="collapsed"
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={islandVariants}
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => setIsExpanded(false)}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <motion.div
        className="flex items-center justify-between h-full px-4"
        variants={contentVariants}
      >
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-between w-full"
            >
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white text-sm font-mono">{currentTime}</span>
              <div className="w-3 h-3 bg-blue-400 rounded-full" />
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center justify-between w-full"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSearchOpen();
                }}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <MagnifyingGlassIcon className="w-5 h-5 text-white" />
              </button>
              
              <div className="text-center">
                <div className="text-white text-xs font-medium">Arc Labs</div>
                <div className="text-white/60 text-xs">{currentTime}</div>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMenuToggle();
                }}
                className="p-2 rounded-full hover:bg-white/10 transition-colors md:hidden"
              >
                {isMenuOpen ? (
                  <XMarkIcon className="w-5 h-5 text-white" />
                ) : (
                  <Bars3Icon className="w-5 h-5 text-white" />
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Subtle glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-20"
        animate={{
          background: isExpanded 
            ? 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(34, 197, 94, 0.2) 0%, transparent 70%)'
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};