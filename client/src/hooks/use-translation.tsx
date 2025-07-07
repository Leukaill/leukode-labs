import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Translation, translations } from '../lib/translations';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
  isLoading: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [isLoading, setIsLoading] = useState(false);

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('arc-labs-language') as Language;
    if (savedLanguage && ['en', 'fr', 'rw'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference and apply to document
  useEffect(() => {
    localStorage.setItem('arc-labs-language', language);
    document.documentElement.lang = language;
    
    // Set direction for RTL languages if needed (not needed for these languages)
    document.documentElement.dir = 'ltr';
  }, [language]);

  const handleLanguageChange = (newLanguage: Language) => {
    if (newLanguage === language) return;
    
    setIsLoading(true);
    
    // Small delay to show loading state
    setTimeout(() => {
      setLanguage(newLanguage);
      setIsLoading(false);
    }, 300);
  };

  const value: TranslationContextType = {
    language,
    setLanguage: handleLanguageChange,
    t: translations[language],
    isLoading,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

// Hook for getting specific translation keys
export const useT = () => {
  const { t } = useTranslation();
  return t;
};

// Language configuration
export const languages: { code: Language; name: string; flag: string; country: string }[] = [
  { code: 'en', name: 'English', flag: '🇺🇸', country: 'United States' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', country: 'France' },
  { code: 'rw', name: 'Kinyarwanda', flag: '🇷🇼', country: 'Rwanda' },
];