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
        <div className="sticky top-0 z-10 bg-gradient-to-r from-green-600/20 to-blue-600/20 backdrop-blur-lg border-b border-white/20 p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center text-white shadow-xl">
                {feature.icon}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{feature.title}</h2>
                <p className="text-white/80 text-sm">Our Competitive Advantage</p>
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
            <p className="text-white/90 text-lg leading-relaxed">{feature.description}</p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {feature.metrics.map((metric, index) => (
              <div key={index} className="text-center bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 border border-white/20 backdrop-blur-sm">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {metric.value}
                </div>
                <div className="text-sm text-white/70 font-medium">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* Details */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-blue-500 rounded-full mr-4"></div>
              Why This Matters
            </h3>
            <div className="space-y-4">
              {feature.details.map((detail, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mt-1 flex-shrink-0" />
                  <span className="text-white/80 leading-relaxed">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-4"></div>
              Our Track Record
            </h3>
            <div className="space-y-4">
              {feature.achievements.map((achievement, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-1 flex-shrink-0" />
                  <span className="text-white/80 leading-relaxed">{achievement}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Client Benefits */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full mr-4"></div>
              What You Get
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {feature.clientBenefits.map((benefit, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-xl p-6 border border-white/20 backdrop-blur-sm">
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-1 flex-shrink-0" />
                    <span className="text-white/80 leading-relaxed">{benefit}</span>
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