import { 
  CpuChipIcon, 
  ShoppingBagIcon, 
  GlobeAltIcon, 
  CloudIcon,
  DevicePhoneMobileIcon,
  CogIcon
} from '@heroicons/react/24/outline';
import { GlassmorphismCard } from '@/components/ui/glassmorphism-card';

const services = [
  {
    icon: CpuChipIcon,
    title: 'Custom Web Applications',
    description: 'Tailored web applications built with cutting-edge technology to meet your specific business requirements and scale with your growth.',
    gradient: 'from-blue-600 to-blue-700',
    delay: '0s'
  },
  {
    icon: ShoppingBagIcon,
    title: 'E-commerce Solutions',
    description: 'Complete online stores with secure payment processing, inventory management, and conversion-optimized design for maximum sales.',
    gradient: 'from-green-600 to-green-700',
    delay: '0.1s'
  },
  {
    icon: GlobeAltIcon,
    title: 'Enterprise Websites',
    description: 'Professional corporate websites with advanced CMS, SEO optimization, and robust security features for established businesses.',
    gradient: 'from-purple-600 to-purple-700',
    delay: '0.2s'
  },
  {
    icon: CloudIcon,
    title: 'Cloud Integration',
    description: 'Seamless cloud architecture with automated scaling, backup solutions, and enterprise-grade security for reliable performance.',
    gradient: 'from-indigo-600 to-indigo-700',
    delay: '0.3s'
  },
  {
    icon: DevicePhoneMobileIcon,
    title: 'Mobile-First Design',
    description: 'Responsive designs that deliver exceptional user experiences across all devices with progressive web app capabilities.',
    gradient: 'from-pink-600 to-pink-700',
    delay: '0.4s'
  },
  {
    icon: CogIcon,
    title: 'API Development',
    description: 'Custom APIs and integrations that connect your systems, automate workflows, and enhance your digital infrastructure.',
    gradient: 'from-orange-600 to-orange-700',
    delay: '0.5s'
  }
];

export const ServicesSection = () => {
  return (
    <section id="services" className="services-section py-32 relative overflow-hidden bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8 tracking-tight">
            Our <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-2xl text-slate-700 max-w-4xl mx-auto font-medium leading-relaxed">
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
                >
                  <div className="relative mb-8">
                    <div className={`w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-3xl flex items-center justify-center mx-auto levitating premium-shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                      <IconComponent className="w-10 h-10 text-white" />
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
    </section>
  );
};
