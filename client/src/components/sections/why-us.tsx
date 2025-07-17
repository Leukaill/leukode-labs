import { useState } from 'react';
import { GlassmorphismCard } from '@/components/ui/glassmorphism-card';
import { WhyUsModal } from '@/components/ui/why-us-modal';
import { 
  BoltIcon, 
  ShieldCheckIcon, 
  RocketLaunchIcon, 
  TrophyIcon,
  ClockIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const benefits = [
  {
    icon: BoltIcon,
    title: 'Lightning-Fast Development',
    description: 'Our streamlined processes and cutting-edge tools ensure your project launches faster than industry standards without compromising quality.',
    gradient: 'from-blue-600 to-blue-700',
    delay: '0s',
    details: [
      'Advanced development frameworks and automation tools',
      'Pre-built component libraries and design systems',
      'Parallel development workflows and CI/CD pipelines',
      'Rapid prototyping and iterative development cycles',
      'Optimized code deployment and testing procedures'
    ],
    achievements: [
      'Delivered 200+ projects with 40% faster turnaround than industry average',
      'Maintained 99.8% on-time delivery rate over 5 years',
      'Reduced development cycles by implementing agile methodologies',
      'Built proprietary tools that accelerate common development tasks',
      'Achieved same-day deployment capabilities for urgent updates'
    ],
    clientBenefits: [
      'Faster time-to-market for competitive advantage',
      'Reduced development costs through efficiency',
      'Quick response to market changes and opportunities',
      'Rapid bug fixes and feature implementations',
      'Accelerated business growth through technology'
    ],
    metrics: [
      { label: 'Faster Delivery', value: '40%' },
      { label: 'Projects Delivered', value: '200+' },
      { label: 'On-Time Rate', value: '99.8%' },
      { label: 'Client Satisfaction', value: '98%' }
    ]
  },
  {
    icon: ShieldCheckIcon,
    title: 'Enterprise-Grade Security',
    description: 'Multi-layered security protocols protecting your data with the same standards used by Fortune 500 companies.',
    gradient: 'from-green-600 to-green-700',
    delay: '0.1s',
    details: [
      'End-to-end encryption for all data transmissions',
      'Advanced authentication and authorization systems',
      'Regular security audits and penetration testing',
      'GDPR, CCPA, and industry compliance standards',
      'Real-time threat monitoring and response systems'
    ],
    achievements: [
      'Zero security breaches across all client projects',
      'SOC 2 Type II certified development processes',
      'Successfully protected $500M+ in client transactions',
      'Achieved 100% compliance rate for regulated industries',
      'Implemented security for Fortune 500 companies'
    ],
    clientBenefits: [
      'Complete peace of mind with data protection',
      'Regulatory compliance without additional overhead',
      'Customer trust through visible security measures',
      'Reduced liability and risk exposure',
      'Enterprise-level security at any scale'
    ],
    metrics: [
      { label: 'Security Breaches', value: '0' },
      { label: 'Protected Value', value: '$500M+' },
      { label: 'Compliance Rate', value: '100%' },
      { label: 'Uptime', value: '99.9%' }
    ]
  },
  {
    icon: RocketLaunchIcon,
    title: 'Scalable Architecture',
    description: 'Future-proof solutions built to grow with your business, handling everything from startup launches to enterprise expansion.',
    gradient: 'from-purple-600 to-purple-700',
    delay: '0.2s',
    details: [
      'Microservices architecture for independent scaling',
      'Cloud-native infrastructure with auto-scaling capabilities',
      'Database optimization for high-traffic applications',
      'CDN integration for global performance',
      'Load balancing and redundancy systems'
    ],
    achievements: [
      'Scaled applications from 1K to 1M+ users seamlessly',
      'Handled 10,000+ concurrent users without downtime',
      'Reduced infrastructure costs by 60% through optimization',
      'Successfully migrated 50+ legacy systems to modern architecture',
      'Built systems handling millions of transactions daily'
    ],
    clientBenefits: [
      'Seamless growth without architectural limitations',
      'Cost-effective scaling based on actual usage',
      'Global reach with consistent performance',
      'Future-ready technology investments',
      'Competitive advantage through superior performance'
    ],
    metrics: [
      { label: 'Max Users Handled', value: '1M+' },
      { label: 'Cost Reduction', value: '60%' },
      { label: 'Concurrent Users', value: '10K+' },
      { label: 'Uptime', value: '99.99%' }
    ]
  },
  {
    icon: TrophyIcon,
    title: 'Award-Winning Results',
    description: 'Our portfolio speaks for itself - delivering exceptional results that consistently exceed client expectations and industry benchmarks.',
    gradient: 'from-orange-600 to-orange-700',
    delay: '0.3s',
    details: [
      'Recognition from leading industry publications',
      'Award-winning design and development excellence',
      'Client success stories and measurable ROI',
      'Innovation in web development practices',
      'Thought leadership in emerging technologies'
    ],
    achievements: [
      'Winner of 15+ web development and design awards',
      'Featured in top industry publications and conferences',
      'Achieved 250% average ROI increase for clients',
      'Recognized as top development agency by Clutch',
      'Successfully launched 50+ award-winning websites'
    ],
    clientBenefits: [
      'Association with recognized excellence',
      'Proven track record of successful outcomes',
      'Increased brand credibility and prestige',
      'Access to award-winning talent and expertise',
      'Competitive advantage through superior quality'
    ],
    metrics: [
      { label: 'Awards Won', value: '15+' },
      { label: 'ROI Increase', value: '250%' },
      { label: 'Client Retention', value: '95%' },
      { label: 'Referral Rate', value: '85%' }
    ]
  },
  {
    icon: ClockIcon,
    title: '24/7 Premium Support',
    description: 'Round-the-clock dedicated support ensuring your website performs flawlessly with immediate response to any concerns.',
    gradient: 'from-indigo-600 to-indigo-700',
    delay: '0.4s',
    details: [
      'Dedicated support team for each client',
      'Proactive monitoring and issue prevention',
      'Multiple communication channels for urgent issues',
      'Comprehensive documentation and knowledge base',
      'Regular health checks and performance optimization'
    ],
    achievements: [
      'Maintained 99.9% uptime across all client projects',
      'Average response time of 15 minutes for urgent issues',
      'Resolved 95% of issues within 2 hours',
      'Zero critical issues unresolved within 24 hours',
      'Prevented 500+ potential downtime incidents'
    ],
    clientBenefits: [
      'Peace of mind with continuous monitoring',
      'Minimized downtime and revenue loss',
      'Expert guidance for technical decisions',
      'Proactive issue resolution before impact',
      'Dedicated partnership beyond project delivery'
    ],
    metrics: [
      { label: 'Uptime', value: '99.9%' },
      { label: 'Response Time', value: '15min' },
      { label: 'Issue Resolution', value: '2hrs' },
      { label: 'Client Satisfaction', value: '98%' }
    ]
  },
  {
    icon: UserGroupIcon,
    title: 'Expert Development Team',
    description: 'Senior developers with 10+ years experience working exclusively on your project with proven track records of success.',
    gradient: 'from-pink-600 to-pink-700',
    delay: '0.5s',
    details: [
      'Senior developers with 10+ years industry experience',
      'Specialized expertise in cutting-edge technologies',
      'Continuous learning and certification programs',
      'Collaborative approach with transparent communication',
      'Dedicated project managers and technical leads'
    ],
    achievements: [
      'Combined 200+ years of development experience',
      'Certified in 50+ technologies and frameworks',
      'Successfully delivered complex enterprise solutions',
      'Mentored 100+ junior developers to excellence',
      'Contributed to open-source projects used globally'
    ],
    clientBenefits: [
      'Access to top-tier development talent',
      'Reduced risk through proven expertise',
      'Innovative solutions from experienced professionals',
      'Knowledge transfer and team mentoring',
      'Long-term partnership with trusted experts'
    ],
    metrics: [
      { label: 'Experience', value: '200+yrs' },
      { label: 'Certifications', value: '50+' },
      { label: 'Projects Delivered', value: '500+' },
      { label: 'Team Retention', value: '95%' }
    ]
  }
];

export const WhyUsSection = () => {
  const [selectedBenefit, setSelectedBenefit] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBenefitClick = (benefit: any) => {
    setSelectedBenefit(benefit);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBenefit(null);
  };

  return (
    <section id="why-us" className="benefits-section py-20 md:py-32 relative overflow-hidden bg-gradient-to-b from-white via-[hsl(var(--gray-50))] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <div className="cinematic-entrance">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 md:mb-8 tracking-tight">
              Why Choose <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Arc Labs</span>
            </h2>
          </div>
          <div className="cinematic-entrance" style={{ animationDelay: '0.3s' }}>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-700 max-w-3xl md:max-w-4xl mx-auto font-medium leading-relaxed">
              We deliver exceptional results through expertise, innovation, and unwavering commitment to your success.
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div 
                key={index} 
                className="cinematic-entrance benefit-card text-center group"
                style={{ animationDelay: benefit.delay }}
              >
                <GlassmorphismCard 
                  variant="liquid" 
                  className="h-full physics-hover cursor-pointer"
                  onClick={() => handleBenefitClick(benefit)}
                >
                  <div className="relative mb-8">
                    <div className={`w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br ${benefit.gradient} rounded-3xl flex items-center justify-center mx-auto levitating premium-shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                      <IconComponent className="w-10 h-10 md:w-12 md:h-12 text-white" />
                    </div>
                  
                  {/* Floating Energy Dots */}
                  <div className="absolute -inset-6 pointer-events-none">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-[hsl(var(--google-blue))] rounded-full levitating opacity-50"
                        style={{
                          top: `${20 + Math.random() * 60}%`,
                          left: `${20 + Math.random() * 60}%`,
                          animationDelay: `${i * 0.7}s`,
                          animationDuration: `${3 + Math.random() * 2}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
                
                <h3 className="text-2xl font-medium text-[hsl(var(--gray-900))] mb-6 leading-tight group-hover:text-[hsl(var(--google-blue))] transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-[hsl(var(--gray-700))] leading-relaxed font-light">
                  {benefit.description}
                </p>
                
                {/* Neural Connection Indicator */}
                <div className="mt-6 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${benefit.gradient} rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out`}
                  ></div>
                </div>
                </GlassmorphismCard>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-[hsl(var(--google-blue))]/5 to-transparent rounded-full blur-3xl levitating"></div>
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-r from-[hsl(var(--google-green))]/5 to-transparent rounded-full blur-3xl levitating" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Why Us Modal */}
      {selectedBenefit && (
        <WhyUsModal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          feature={{
            title: selectedBenefit.title,
            description: selectedBenefit.description,
            icon: <selectedBenefit.icon className="w-6 h-6" />,
            details: selectedBenefit.details,
            achievements: selectedBenefit.achievements,
            clientBenefits: selectedBenefit.clientBenefits,
            metrics: selectedBenefit.metrics
          }}
        />
      )}
    </section>
  );
};
