import { useState } from 'react';
import { Link } from 'wouter';
import { NewsletterModal } from '@/components/ui/newsletter-modal';
import { LocationMap } from '@/components/ui/location-map';
import { MapPinIcon } from '@heroicons/react/24/outline';

export const Footer = () => {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[hsl(var(--gray-900))] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-[hsl(var(--google-blue))] rounded-full flex items-center justify-center">
                <span className="material-icons text-white text-lg">rocket_launch</span>
              </div>
              <span className="text-xl font-medium">Arc Labs</span>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              Premier web development agency specializing in modern, scalable solutions that drive business growth and exceed expectations.
            </p>
            <div className="flex space-x-4">
              <a href="mailto:lucienshungofficial@gmail.com" className="text-gray-400 hover:text-white transition-colors duration-200">
                <span className="material-icons">email</span>
              </a>
              <a href="tel:+250798516334" className="text-gray-400 hover:text-white transition-colors duration-200">
                <span className="material-icons">phone</span>
              </a>
              <button 
                onClick={() => setIsLocationOpen(true)}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <MapPinIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-medium mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Web Applications
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  E-commerce
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Mobile Development
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Consulting
                </button>
              </li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="text-lg font-medium mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about">
                  <button className="text-gray-300 hover:text-white transition-colors duration-200">
                    About Us
                  </button>
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('portfolio')}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Portfolio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Careers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Contact
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsNewsletterOpen(true)}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Newsletter
                </button>
              </li>
            </ul>
          </div>
          
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Arc Labs. All rights reserved. Built with cutting-edge technology and attention to detail.</p>
        </div>
      </div>
      
      {/* Newsletter Modal */}
      <NewsletterModal isOpen={isNewsletterOpen} onClose={() => setIsNewsletterOpen(false)} />
      
      {/* Location Map Modal */}
      <LocationMap isOpen={isLocationOpen} onClose={() => setIsLocationOpen(false)} />
    </footer>
  );
};
