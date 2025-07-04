import { MagneticButton } from '@/components/ui/magnetic-button';
import { Link } from 'wouter';
import { 
  RocketLaunchIcon, 
  CpuChipIcon, 
  SparklesIcon,
  CheckCircleIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const packages = [
  {
    name: 'Professional Starter',
    description: 'Premium Web Solutions',
    price: '$15,000',
    icon: RocketLaunchIcon,
    gradient: 'from-blue-600 to-blue-700',
    features: [
      'Custom responsive design',
      'Advanced SEO optimization',
      'Performance optimization',
      'Mobile-first development',
      'Content management system',
      '6 months premium support',
      'Analytics integration',
      'Security implementation'
    ],
    variant: 'primary' as const,
    buttonText: 'Start Project',
    delay: '0s',
    slug: 'professional-starter'
  },
  {
    name: 'Enterprise Professional',
    description: 'Complete Digital Transformation',
    price: '$45,000',
    icon: CpuChipIcon,
    gradient: 'from-indigo-600 to-indigo-700',
    features: [
      'Everything in Professional Starter',
      'Advanced API integrations',
      'Custom web applications',
      'Database architecture',
      'User authentication systems',
      'Real-time functionality',
      '12 months dedicated support',
      'DevOps and deployment',
      'Performance monitoring'
    ],
    variant: 'impossible' as const,
    buttonText: 'Transform Business',
    popular: true,
    delay: '0.1s',
    slug: 'enterprise-professional'
  },
  {
    name: 'Divine Impossible',
    description: 'Transcendent Digital Experience',
    price: '$100,000',
    icon: StarIcon,
    gradient: 'from-purple-600 to-purple-700',
    features: [
      'Everything in Enterprise Professional',
      'AI-powered features',
      'Advanced 3D graphics',
      'Real-time collaboration',
      'Custom integrations',
      'Blockchain integration',
      'IoT connectivity',
      'Quantum-ready architecture',
      'Lifetime premium support'
    ],
    variant: 'primary' as const,
    buttonText: 'Transcend Reality',
    delay: '0.2s',
    slug: 'divine-impossible'
  }
];

export const PackagesSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="packages" className="py-32 relative overflow-hidden bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8 tracking-tight">
            Professional <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Solutions</span>
          </h2>
          <p className="text-2xl text-slate-700 max-w-4xl mx-auto font-medium leading-relaxed">
            Choose the perfect package for your business needs. Each solution delivers exceptional results.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => {
            const IconComponent = pkg.icon;
            return (
              <div 
                key={index} 
                className="relative group" 
              >
                {pkg.popular && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      <StarIcon className="w-4 h-4 inline mr-1" />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <Link href={`/package/${pkg.slug}`} className="block h-full">
                  <div className={`relative bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 h-full cursor-pointer ${pkg.popular ? 'ring-2 ring-indigo-500/20' : ''}`}>
                    <div className="p-8">
                    <div className="text-center mb-8">
                      <div className={`w-20 h-20 bg-gradient-to-br ${pkg.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                        {pkg.name}
                      </h3>
                      <p className="text-slate-600 mb-6 font-medium text-lg">{pkg.description}</p>
                      <div className="mb-8">
                        <span className="text-5xl font-bold text-slate-900">{pkg.price}</span>
                        <span className="text-slate-600 ml-2 text-lg">project</span>
                      </div>
                    </div>
                    
                    <ul className="space-y-4 mb-8">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700 font-medium leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                      <div className="text-center">
                        <p className="text-slate-600 text-sm font-medium">Click card for full details</p>
                      </div>
                    </div>
                    
                    {/* Elegant gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${pkg.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}></div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-100 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-indigo-100 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-purple-100 to-transparent rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};
