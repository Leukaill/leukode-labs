import { useState } from 'react';
import { 
  CpuChipIcon, 
  ShoppingBagIcon, 
  GlobeAltIcon, 
  CloudIcon,
  DevicePhoneMobileIcon,
  CogIcon
} from '@heroicons/react/24/outline';
import { GlassmorphismCard } from '@/components/ui/glassmorphism-card';
import { ServiceModal } from '@/components/ui/service-modal';

const services = [
  {
    icon: CpuChipIcon,
    title: 'Custom Web Applications',
    description: 'Tailored web applications built with cutting-edge technology to meet your specific business requirements and scale with your growth.',
    gradient: 'from-blue-600 to-blue-700',
    delay: '0s',
    features: [
      'Custom architecture design',
      'Progressive web app capabilities',
      'Real-time data synchronization',
      'Advanced user authentication',
      'Custom dashboard & analytics',
      'Multi-tenant architecture',
      'API-first development',
      'Automated testing suite'
    ],
    benefits: [
      'Perfectly aligned with your business processes',
      'Scalable architecture that grows with your needs',
      'Enhanced security with custom-built features',
      'Complete ownership of your digital assets',
      'Seamless integration with existing systems'
    ],
    process: [
      'Discovery & requirements analysis',
      'Technical architecture planning',
      'UI/UX design & prototyping',
      'Development & testing phases',
      'Deployment & optimization',
      'Ongoing support & maintenance'
    ],
    timeline: '8-16 weeks',
    investment: 'Starting from $25,000'
  },
  {
    icon: ShoppingBagIcon,
    title: 'E-commerce Solutions',
    description: 'Complete online stores with secure payment processing, inventory management, and conversion-optimized design for maximum sales.',
    gradient: 'from-green-600 to-green-700',
    delay: '0.1s',
    features: [
      'Custom storefront design',
      'Multi-payment gateway integration',
      'Advanced inventory management',
      'Order tracking & fulfillment',
      'Customer account portals',
      'Mobile-optimized checkout',
      'SEO & conversion optimization',
      'Analytics & reporting dashboard'
    ],
    benefits: [
      'Increase sales with optimized user experience',
      'Reduce cart abandonment rates',
      'Streamline inventory and order management',
      'Build customer loyalty with personalized experiences',
      'Scale seamlessly during high-traffic periods'
    ],
    process: [
      'Business model analysis',
      'Platform selection & setup',
      'Custom design & development',
      'Payment & shipping integration',
      'Testing & quality assurance',
      'Launch & performance optimization'
    ],
    timeline: '6-12 weeks',
    investment: 'Starting from $18,000'
  },
  {
    icon: GlobeAltIcon,
    title: 'Enterprise Websites',
    description: 'Professional corporate websites with advanced CMS, SEO optimization, and robust security features for established businesses.',
    gradient: 'from-purple-600 to-purple-700',
    delay: '0.2s',
    features: [
      'Custom CMS development',
      'Multi-language support',
      'Advanced SEO optimization',
      'Enterprise-grade security',
      'Content workflow management',
      'Performance optimization',
      'Third-party integrations',
      'Comprehensive analytics'
    ],
    benefits: [
      'Establish strong digital presence',
      'Improve search engine rankings',
      'Streamline content management',
      'Enhanced security & compliance',
      'Better user engagement & conversion'
    ],
    process: [
      'Brand & content strategy',
      'Information architecture design',
      'Custom development & CMS setup',
      'Content migration & optimization',
      'Security implementation',
      'Launch & ongoing optimization'
    ],
    timeline: '4-8 weeks',
    investment: 'Starting from $12,000'
  },
  {
    icon: CloudIcon,
    title: 'Cloud Integration',
    description: 'Seamless cloud architecture with automated scaling, backup solutions, and enterprise-grade security for reliable performance.',
    gradient: 'from-indigo-600 to-indigo-700',
    delay: '0.3s',
    features: [
      'Multi-cloud architecture',
      'Automated scaling solutions',
      'Disaster recovery planning',
      'Database optimization',
      'Security & compliance setup',
      'Monitoring & alerting',
      'Cost optimization',
      'Migration services'
    ],
    benefits: [
      'Reduce infrastructure costs',
      'Improve application reliability',
      'Enhance security & compliance',
      'Enable global scalability',
      'Minimize downtime risks'
    ],
    process: [
      'Current infrastructure assessment',
      'Cloud strategy development',
      'Migration planning & execution',
      'Security & monitoring setup',
      'Performance optimization',
      'Team training & documentation'
    ],
    timeline: '6-10 weeks',
    investment: 'Starting from $15,000'
  },
  {
    icon: DevicePhoneMobileIcon,
    title: 'Mobile-First Design',
    description: 'Responsive designs that deliver exceptional user experiences across all devices with progressive web app capabilities.',
    gradient: 'from-pink-600 to-pink-700',
    delay: '0.4s',
    features: [
      'Progressive web app development',
      'Cross-platform compatibility',
      'Touch-optimized interfaces',
      'Offline functionality',
      'Push notifications',
      'App store optimization',
      'Performance optimization',
      'User behavior analytics'
    ],
    benefits: [
      'Reach users on any device',
      'Improve user engagement',
      'Reduce development costs',
      'Faster time-to-market',
      'Better conversion rates'
    ],
    process: [
      'Mobile strategy development',
      'User experience design',
      'Progressive enhancement',
      'Performance optimization',
      'Cross-device testing',
      'App store submission'
    ],
    timeline: '4-8 weeks',
    investment: 'Starting from $10,000'
  },
  {
    icon: CogIcon,
    title: 'API Development',
    description: 'Custom APIs and integrations that connect your systems, automate workflows, and enhance your digital infrastructure.',
    gradient: 'from-orange-600 to-orange-700',
    delay: '0.5s',
    features: [
      'RESTful API development',
      'GraphQL implementation',
      'Third-party integrations',
      'Authentication & authorization',
      'Rate limiting & caching',
      'Comprehensive documentation',
      'Testing & monitoring',
      'Version management'
    ],
    benefits: [
      'Streamline business processes',
      'Improve system connectivity',
      'Enable data-driven decisions',
      'Reduce manual work',
      'Enhance scalability'
    ],
    process: [
      'System architecture analysis',
      'API design & specification',
      'Development & implementation',
      'Integration & testing',
      'Documentation & training',
      'Deployment & monitoring'
    ],
    timeline: '3-6 weeks',
    investment: 'Starting from $8,000'
  }
];

export const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleServiceClick = (service: any) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  return (
    <section id="services" className="services-section py-20 md:py-32 relative overflow-hidden bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 md:mb-8 tracking-tight">
            Our <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-700 max-w-3xl md:max-w-4xl mx-auto font-medium leading-relaxed">
            We deliver comprehensive web solutions that drive business growth and exceed expectations.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="cinematic-entrance"
                style={{ animationDelay: service.delay }}
              >
                <GlassmorphismCard 
                  variant="impossible" 
                  className="service-card text-center h-full group cursor-pointer"
                  onClick={() => handleServiceClick(service)}
                >
                  <div className="relative mb-6 md:mb-8">
                    <div className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${service.gradient} rounded-3xl flex items-center justify-center mx-auto levitating premium-shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                      <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                  
                  {/* Floating Particles */}
                  <div className="absolute -inset-4 pointer-events-none">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-[hsl(var(--google-blue))] rounded-full levitating opacity-40"
                        style={{
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          animationDelay: `${i * 0.5}s`,
                          animationDuration: `${3 + Math.random() * 2}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
                
                <h3 className="text-2xl font-medium text-[hsl(var(--gray-900))] mb-6 leading-tight">
                  {service.title}
                </h3>
                <p className="text-[hsl(var(--gray-700))] leading-relaxed font-light">
                  {service.description}
                </p>
                
                {/* Progress Indicator */}
                <div className="mt-6 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${service.gradient} rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out`}
                  ></div>
                </div>
                </GlassmorphismCard>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-[hsl(var(--google-blue))]/5 to-transparent rounded-full blur-3xl levitating"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-[hsl(var(--google-green))]/5 to-transparent rounded-full blur-3xl levitating" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Service Modal */}
      {selectedService && (
        <ServiceModal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          service={{
            title: selectedService.title,
            description: selectedService.description,
            icon: <selectedService.icon className="w-6 h-6" />,
            features: selectedService.features,
            benefits: selectedService.benefits,
            process: selectedService.process,
            timeline: selectedService.timeline,
            investment: selectedService.investment
          }}
        />
      )}
    </section>
  );
};
