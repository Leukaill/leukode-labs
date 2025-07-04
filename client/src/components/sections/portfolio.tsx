import { useQuery } from '@tanstack/react-query';
import { GlassmorphismCard } from '@/components/ui/glassmorphism-card';
import { MagneticButton } from '@/components/ui/magnetic-button';
import type { Project } from '@/types/portfolio';

export const PortfolioSection = () => {
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ['/api/projects/featured'],
  });

  if (error) {
    return (
      <section id="portfolio" className="portfolio-section py-32 neural-network-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <GlassmorphismCard variant="neural" className="max-w-lg mx-auto">
            <div className="text-[hsl(var(--google-red))] mb-6">
              <span className="material-icons text-6xl levitating">error_outline</span>
            </div>
            <h3 className="text-2xl font-medium text-[hsl(var(--gray-900))] mb-4">Portfolio Loading Failed</h3>
            <p className="text-[hsl(var(--gray-700))] font-light">Unable to fetch our impossible creations. The neural network is temporarily offline.</p>
          </GlassmorphismCard>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="portfolio-section py-32 relative overflow-hidden bg-gradient-to-b from-white via-[hsl(var(--gray-50))] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="cinematic-entrance">
            <h2 className="text-5xl md:text-7xl font-thin text-gray-900 mb-8 tracking-tight">
              Impossible <span className="font-medium italic bg-gradient-to-r from-blue-600 via-green-600 to-yellow-600 bg-clip-text text-transparent">Realities</span>
            </h2>
          </div>
          <div className="cinematic-entrance" style={{ animationDelay: '0.3s' }}>
            <p className="text-2xl text-[hsl(var(--gray-700))] max-w-4xl mx-auto font-light leading-relaxed">
              Each project pushes the boundaries of what's possible. These aren't just websites—they're digital revolutions.
            </p>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="cinematic-entrance" style={{ animationDelay: `${index * 0.1}s` }}>
                <GlassmorphismCard variant="liquid" className="h-full">
                  <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl aspect-video mb-6 shimmer levitating"></div>
                  <div className="space-y-3">
                    <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl shimmer"></div>
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-2/3 shimmer"></div>
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-1/2 shimmer"></div>
                  </div>
                </GlassmorphismCard>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects?.map((project, index) => (
                <div 
                  key={project.id} 
                  className="cinematic-entrance" 
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <GlassmorphismCard 
                    variant="impossible" 
                    className="portfolio-item group cursor-pointer h-full overflow-hidden physics-hover"
                  >
                    <div className="relative rounded-3xl overflow-hidden mb-6 aspect-video bg-gradient-to-br from-gray-100 to-gray-200">
                      <img 
                        src={project.imageUrl} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ease-out" 
                        loading="lazy"
                      />
                      
                      {/* Overlay Effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Floating Category Badge */}
                      <div className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium">
                        {project.category}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-2xl font-medium text-[hsl(var(--gray-900))] group-hover:text-[hsl(var(--google-blue))] transition-colors duration-300">
                        {project.title}
                      </h3>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="px-3 py-1 bg-gradient-to-r from-[hsl(var(--google-blue))]/10 to-[hsl(var(--google-green))]/10 text-[hsl(var(--google-blue))] rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      {project.metrics && (
                        <p className="text-[hsl(var(--google-green))] font-medium text-sm flex items-center gap-2">
                          <span className="material-icons text-base">trending_up</span>
                          {project.metrics}
                        </p>
                      )}
                    </div>
                    
                    {/* Progress Line */}
                    <div className="mt-6 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[hsl(var(--google-blue))] to-[hsl(var(--google-green))] rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out"></div>
                    </div>
                  </GlassmorphismCard>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-16">
              <div className="cinematic-entrance" style={{ animationDelay: '0.6s' }}>
                <MagneticButton 
                  variant="impossible"
                  size="xl"
                  magneticStrength={0.6}
                >
                  <span className="flex items-center gap-3">
                    <span>Explore All Impossibilities</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17"/>
                    </svg>
                  </span>
                </MagneticButton>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-[hsl(var(--google-blue))]/5 to-transparent rounded-full blur-3xl levitating"></div>
        <div className="absolute bottom-20 left-20 w-56 h-56 bg-gradient-to-r from-[hsl(var(--google-yellow))]/5 to-transparent rounded-full blur-3xl levitating" style={{ animationDelay: '3s' }}></div>
      </div>
    </section>
  );
};
