import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPinIcon, XMarkIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { GlassmorphismCard } from './glassmorphism-card';

interface LocationMapProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocationMap = ({ isOpen, onClose }: LocationMapProps) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-4xl max-h-[90vh] overflow-hidden"
          ></motion.div>
            <GlassmorphismCard className="p-0 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <div className="flex items-center space-x-3">
                    <MapPinIcon className="w-6 h-6 text-blue-400" />
                    <h2 className="text-xl font-semibold text-white">Our Location</h2>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <XMarkIcon className="w-5 h-5 text-white" />
                  </button>
                </div>

              <div className="grid md:grid-cols-2 gap-0">
                {/* Map Section */}
                <div className="relative h-80 md:h-96 bg-gray-200">
                  {!mapLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                      <div className="text-center">
                        <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-white/60">Loading map...</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Embedded Google Map */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31899.475418484686!2d30.058611!3d-1.944436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca425f2145697%3A0x8ab007b6b5e5b88b!2sKigali%2C%20Rwanda!5e0!3m2!1sen!2sus!4v1640995200000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    onLoad={handleMapLoad}
                    className="absolute inset-0"
                  />
                  
                  {/* Custom Map Overlay */}
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center space-x-2 text-white">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">Arc Labs</span>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
                    
                    <div className="space-y-4">
                      {/* Address */}
                      <div className="flex items-start space-x-3">
                        <MapPinIcon className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-white font-medium">Office Location</p>
                          <p className="text-white/70 text-sm">
                            Kigali, Rwanda<br />
                            East Africa
                          </p>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="flex items-start space-x-3">
                        <PhoneIcon className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-white font-medium">Phone</p>
                          <a 
                            href="tel:+250798516334" 
                            className="text-green-400 hover:text-green-300 transition-colors text-sm"
                          >
                            +250 798 516 334
                          </a>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex items-start space-x-3">
                        <EnvelopeIcon className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-white font-medium">Email</p>
                          <a 
                            href="mailto:lucienshungofficial@gmail.com" 
                            className="text-purple-400 hover:text-purple-300 transition-colors text-sm"
                          >
                            lucienshungofficial@gmail.com
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div>
                    <h4 className="text-white font-medium mb-3">Business Hours</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/70">Monday - Friday</span>
                        <span className="text-white">8:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Saturday</span>
                        <span className="text-white">9:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Sunday</span>
                        <span className="text-white/70">Closed</span>
                      </div>
                    </div>
                  </div>

                  {/* Time Zone */}
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-white/60 text-sm">
                      🕒 Central Africa Time (CAT) - GMT+2
                    </p>
                  </div>
                </div>
              </div>
              </GlassmorphismCard>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};