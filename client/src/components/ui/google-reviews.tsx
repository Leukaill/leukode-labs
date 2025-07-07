import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { StarIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { GlassmorphismCard } from './glassmorphism-card';

interface Review {
  id: string;
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  text: string;
  time: number;
  relative_time_description: string;
}

// Mock data representing Google Reviews structure
const mockReviews: Review[] = [
  {
    id: '1',
    author_name: 'Jean Baptiste Murenzi',
    profile_photo_url: 'https://lh3.googleusercontent.com/a/default-user=s128-c0x00000000-cc-rp-mo',
    rating: 5,
    text: 'Arc Labs delivered an exceptional e-commerce platform for our business. The team understood our vision perfectly and exceeded our expectations. Our online sales increased by 300% within the first month!',
    time: Date.now() - 86400000 * 7,
    relative_time_description: '1 week ago'
  },
  {
    id: '2',
    author_name: 'Uwimana Grace',
    profile_photo_url: 'https://lh3.googleusercontent.com/a/default-user=s128-c0x00000000-cc-rp-mo',
    rating: 5,
    text: 'Professional, reliable, and incredibly talented. They built our healthcare portal with amazing attention to detail and security. Highly recommended for any serious web development project.',
    time: Date.now() - 86400000 * 12,
    relative_time_description: '2 weeks ago'
  },
  {
    id: '3',
    author_name: 'Patrick Nzeyimana',
    profile_photo_url: 'https://lh3.googleusercontent.com/a/default-user=s128-c0x00000000-cc-rp-mo',
    rating: 5,
    text: 'Arc Labs transformed our business with their innovative web solutions. The project was delivered on time and within budget. Their ongoing support has been outstanding.',
    time: Date.now() - 86400000 * 20,
    relative_time_description: '3 weeks ago'
  },
  {
    id: '4',
    author_name: 'Mutoni Sarah',
    profile_photo_url: 'https://lh3.googleusercontent.com/a/default-user=s128-c0x00000000-cc-rp-mo',
    rating: 5,
    text: 'Working with Arc Labs was a fantastic experience. They created a beautiful, fast website that perfectly represents our brand. The team is responsive and truly cares about client success.',
    time: Date.now() - 86400000 * 35,
    relative_time_description: '1 month ago'
  },
  {
    id: '5',
    author_name: 'Habimana Eric',
    profile_photo_url: 'https://lh3.googleusercontent.com/a/default-user=s128-c0x00000000-cc-rp-mo',
    rating: 5,
    text: 'Exceptional quality and service! Arc Labs built our fintech platform with advanced security features. Their expertise in modern web technologies is impressive.',
    time: Date.now() - 86400000 * 45,
    relative_time_description: '1 month ago'
  }
];

export const GoogleReviewsWidget = () => {
  const [currentReview, setCurrentReview] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading Google Reviews
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % mockReviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const averageRating = mockReviews.reduce((sum, review) => sum + review.rating, 0) / mockReviews.length;

  if (isLoading) {
    return (
      <GlassmorphismCard className="p-6 max-w-lg">
        <div className="animate-pulse">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-white/20 rounded-full"></div>
            <div className="h-4 w-24 bg-white/20 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-white/20 rounded"></div>
            <div className="h-4 w-3/4 bg-white/20 rounded"></div>
          </div>
        </div>
      </GlassmorphismCard>
    );
  }

  const review = mockReviews[currentReview];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-lg"
    >
      <GlassmorphismCard className="p-6 relative overflow-hidden">
        {/* Google Logo */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 rounded-sm flex items-center justify-center">
              <span className="text-white text-xs font-bold">G</span>
            </div>
            <span className="text-white font-medium">Google Reviews</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-yellow-400 font-bold">{averageRating.toFixed(1)}</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`w-4 h-4 ${
                    star <= averageRating ? 'text-yellow-400' : 'text-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Review Content */}
        <motion.div
          key={currentReview}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
        >
          {/* Author */}
          <div className="flex items-center space-x-3 mb-3">
            {review.profile_photo_url ? (
              <img
                src={review.profile_photo_url}
                alt={review.author_name}
                className="w-10 h-10 rounded-full"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <UserCircleIcon className="w-10 h-10 text-white/60 hidden" />
            <div>
              <div className="text-white font-medium">{review.author_name}</div>
              <div className="text-white/60 text-sm">{review.relative_time_description}</div>
            </div>
          </div>

          {/* Rating */}
          <div className="flex mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                className={`w-4 h-4 ${
                  star <= review.rating ? 'text-yellow-400' : 'text-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Review Text */}
          <p className="text-white/90 text-sm leading-relaxed">
            {review.text}
          </p>
        </motion.div>

        {/* Review Navigation Dots */}
        <div className="flex justify-center space-x-2 mt-4">
          {mockReviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentReview(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentReview ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* Subtle animation background */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 animate-pulse"></div>
        </div>
      </GlassmorphismCard>
    </motion.div>
  );
};