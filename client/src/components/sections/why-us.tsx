import { GlassmorphismCard } from '@/components/ui/glassmorphism-card';
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
    delay: '0s'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Enterprise-Grade Security',
    description: 'Multi-layered security protocols protecting your data with the same standards used by Fortune 500 companies.',
    gradient: 'from-green-600 to-green-700',
    delay: '0.1s'
  },
  {
    icon: RocketLaunchIcon,
    title: 'Scalable Architecture',
    description: 'Future-proof solutions built to grow with your business, handling everything from startup launches to enterprise expansion.',
    gradient: 'from-purple-600 to-purple-700',
    delay: '0.2s'
  },
  {
    icon: TrophyIcon,
    title: 'Award-Winning Results',
    description: 'Our portfolio speaks for itself - delivering exceptional results that consistently exceed client expectations and industry benchmarks.',
    gradient: 'from-orange-600 to-orange-700',
    delay: '0.3s'
  },
  {
    icon: ClockIcon,
    title: '24/7 Premium Support',
    description: 'Round-the-clock dedicated support ensuring your website performs flawlessly with immediate response to any concerns.',
    gradient: 'from-indigo-600 to-indigo-700',
    delay: '0.4s'
  },
  {
    icon: UserGroupIcon,
    title: 'Expert Development Team',
    description: 'Senior developers with 10+ years experience working exclusively on your project with proven track records of success.',
    gradient: 'from-pink-600 to-pink-700',
    delay: '0.5s'
  }
];

export const WhyUsSection = () => {
  return (
    <section id="why-us" className="benefits-section py-32 relative overflow-hidden bg-gradient-to-b from-white via-[hsl(var(--gray-50))] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="cinematic-entrance">
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8 tracking-tight">
              Why Choose <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Arc Labs</span>
            </h2>
          </div>
          <div className="cinematic-entrance" style={{ animationDelay: '0.3s' }}>
            <p className="text-2xl text-slate-700 max-w-4xl mx-auto font-medium leading-relaxed">
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
                <GlassmorphismCard variant="liquid" className="h-full physics-hover">
                  <div className="relative mb-8">
                    <div className={`w-24 h-24 bg-gradient-to-br ${benefit.gradient} rounded-3xl flex items-center justify-center mx-auto levitating premium-shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                      <IconComponent className="w-12 h-12 text-white" />
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
    </section>
  );
};
