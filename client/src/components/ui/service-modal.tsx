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
        <div className="sticky top-0 z-10 liquid-glassmorphism border-b border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-blue-600">{service.icon}</div>
              <h2 className="text-2xl font-bold text-black/90">{service.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 flex items-center justify-center text-black/70 hover:text-black/90"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Description */}
          <div>
            <p className="text-black/80 text-lg leading-relaxed">{service.description}</p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-xl font-semibold text-black/90 mb-4">What's Included</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-black/80">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h3 className="text-xl font-semibold text-black/90 mb-4">Key Benefits</h3>
            <div className="space-y-3">
              {service.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-black/80">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Process */}
          <div>
            <h3 className="text-xl font-semibold text-black/90 mb-4">Our Process</h3>
            <div className="space-y-4">
              {service.process.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-black/80 pt-1">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline & Investment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="liquid-glassmorphism rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-black/90 mb-2">Timeline</h4>
              <p className="text-black/80">{service.timeline}</p>
            </div>
            <div className="liquid-glassmorphism rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-black/90 mb-2">Investment</h4>
              <p className="text-black/80">{service.investment}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};