import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface WhyUsModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: {
    title: string;
    description: string;
    icon: React.ReactNode;
    details: string[];
    achievements: string[];
    clientBenefits: string[];
    metrics: {
      label: string;
      value: string;
    }[];
  };
}

export const WhyUsModal = ({ isOpen, onClose, feature }: WhyUsModalProps) => {
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
              <div className="text-blue-600">{feature.icon}</div>
              <h2 className="text-2xl font-bold text-black/90">{feature.title}</h2>
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
            <p className="text-black/80 text-lg leading-relaxed">{feature.description}</p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {feature.metrics.map((metric, index) => (
              <div key={index} className="text-center liquid-glassmorphism rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-bold text-blue-600 mb-1">{metric.value}</div>
                <div className="text-sm text-black/70">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* Details */}
          <div>
            <h3 className="text-xl font-semibold text-black/90 mb-4">Why This Matters</h3>
            <div className="space-y-3">
              {feature.details.map((detail, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-black/80">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h3 className="text-xl font-semibold text-black/90 mb-4">Our Track Record</h3>
            <div className="space-y-3">
              {feature.achievements.map((achievement, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-black/80">{achievement}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Client Benefits */}
          <div>
            <h3 className="text-xl font-semibold text-black/90 mb-4">What You Get</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {feature.clientBenefits.map((benefit, index) => (
                <div key={index} className="liquid-glassmorphism rounded-xl p-4 border border-white/10">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-black/80">{benefit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};