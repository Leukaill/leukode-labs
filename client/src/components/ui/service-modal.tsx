import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    title: string;
    description: string;
    icon: React.ReactNode;
    features: string[];
    benefits: string[];
    process: string[];
    timeline: string;
    investment: string;
  };
}

export const ServiceModal = ({ isOpen, onClose, service }: ServiceModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto liquid-glassmorphism rounded-3xl border border-white/20 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-lg border-b border-white/20 p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center text-white shadow-xl">
                {service.icon}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{service.title}</h2>
                <p className="text-white/80 text-sm">Premium Service Experience</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 flex items-center justify-center text-white/70 hover:text-white backdrop-blur-sm border border-white/20"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-10">
          {/* Description */}
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <p className="text-white/90 text-lg leading-relaxed">{service.description}</p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full mr-4"></div>
              What's Included
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mt-1 flex-shrink-0" />
                  <span className="text-white/80 leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-green-500 rounded-full mr-4"></div>
              Key Benefits
            </h3>
            <div className="space-y-4">
              {service.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mt-1 flex-shrink-0" />
                  <span className="text-white/80 leading-relaxed">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Process */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-teal-500 rounded-full mr-4"></div>
              Our Process
            </h3>
            <div className="space-y-6">
              {service.process.map((step, index) => (
                <div key={index} className="flex items-start space-x-6 p-6 bg-white/5 rounded-xl border border-white/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0 shadow-lg">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <span className="text-white/80 text-lg leading-relaxed">{step}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline & Investment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl p-8 border border-white/20 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-3">Timeline</h4>
              <p className="text-white/80 text-lg">{service.timeline}</p>
            </div>
            <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-2xl p-8 border border-white/20 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-3">Investment</h4>
              <p className="text-white/80 text-lg">{service.investment}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};