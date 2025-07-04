import { Link } from 'wouter';

export const Footer = () => {
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
              <a href="mailto:hello@arclabs.dev" className="text-gray-400 hover:text-white transition-colors duration-200">
                <span className="material-icons">email</span>
              </a>
              <a href="tel:+1-555-0123" className="text-gray-400 hover:text-white transition-colors duration-200">
                <span className="material-icons">phone</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <span className="material-icons">location_on</span>
              </a>
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
                <button 
                  onClick={() => scrollToSection('why-us')}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  About Us
                </button>
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
            </ul>
          </div>
          
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Arc Labs. All rights reserved. Built with cutting-edge technology and attention to detail.</p>
        </div>
      </div>
    </footer>
  );
};
