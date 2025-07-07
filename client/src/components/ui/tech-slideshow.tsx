import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const techImages = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1920&h=1080&fit=crop',
    alt: 'Code on screens showing advanced web development',
    description: 'Cutting-edge development'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&h=1080&fit=crop',
    alt: 'Modern workspace with multiple screens showing web applications',
    description: 'Digital excellence'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop',
    alt: 'Abstract technology visualization representing data flow',
    description: 'Innovation unleashed'
  }
];

export const TechSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % techImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {/* Image with overlay */}
          <div className="relative w-full h-full">
            <img
              src={techImages[currentIndex].url}
              alt={techImages[currentIndex].alt}
              className="w-full h-full object-cover"
            />
            
            {/* Luxury gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
            
            {/* Additional cinematic overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-purple-900/20" />
            
            {/* Animated scan lines for tech effect */}
            <div className="absolute inset-0 opacity-10">
              <div className="h-full w-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-32 animate-scan" />
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {techImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-12 h-1 transition-all duration-500 ${
              index === currentIndex
                ? 'bg-white w-16'
                : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Subtle tech grid overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>
    </div>
  );
};