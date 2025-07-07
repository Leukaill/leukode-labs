import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation, languages } from '../../hooks/use-translation';
import { cn } from '../../lib/utils';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'default' | 'compact';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  className,
  variant = 'default'
}) => {
  const { language, setLanguage, isLoading } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageSelect = (langCode: string) => {
    setLanguage(langCode as any);
    setIsOpen(false);
  };

  if (variant === 'compact') {
    return (
      <div className={cn("relative", className)}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200"
          disabled={isLoading}
        >
          <span className="text-xl">{currentLanguage?.flag}</span>
          {isLoading && (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          )}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 mt-2 w-48 bg-white/95 backdrop-blur-sm rounded-lg border border-white/20 shadow-lg z-50"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className={cn(
                    "w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-100/50 transition-colors",
                    language === lang.code && "bg-blue-50/50",
                    "first:rounded-t-lg last:rounded-b-lg"
                  )}
                >
                  <span className="text-xl">{lang.flag}</span>
                  <div>
                    <div className="font-medium text-gray-900">{lang.name}</div>
                    <div className="text-sm text-gray-600">{lang.country}</div>
                  </div>
                  {language === lang.code && (
                    <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full" />
                  )}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {isOpen && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200 text-white"
        disabled={isLoading}
      >
        <span className="text-2xl">{currentLanguage?.flag}</span>
        <span className="font-medium">{currentLanguage?.name}</span>
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <svg 
            className={cn("w-4 h-4 transition-transform duration-200", isOpen && "rotate-180")}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-sm rounded-xl border border-white/20 shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className={cn(
                    "w-full flex items-center space-x-4 px-4 py-3 text-left rounded-lg hover:bg-gray-100/50 transition-colors",
                    language === lang.code && "bg-blue-50/50 ring-2 ring-blue-500/20"
                  )}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{lang.name}</div>
                    <div className="text-sm text-gray-600">{lang.country}</div>
                  </div>
                  {language === lang.code && (
                    <div className="w-3 h-3 bg-blue-500 rounded-full shadow-sm" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};