import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowLeftIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { GlassmorphismCard } from '@/components/ui/glassmorphism-card';
import { MagneticButton } from '@/components/ui/magnetic-button';

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  metrics?: string;
  featured: boolean;
  createdAt: Date;
}

const categories = ['All', 'E-commerce', 'Corporate', 'SaaS', 'Creative', 'Healthcare', 'Finance'];

export default function PortfolioShowcase() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading our masterpieces...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black">
      {/* Header */}
      <div className="relative pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link href="/" className="inline-flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-300 mb-8">
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>

          {/* Title */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              Our <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Masterpieces</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              Exceptional digital experiences crafted for discerning clients who demand nothing less than perfection.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white backdrop-blur-lg'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-transparent rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <GlassmorphismCard 
                variant="impossible" 
                className="h-full overflow-hidden hover:scale-105 transition-all duration-500 cursor-pointer"
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden rounded-t-2xl">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center`;
                    }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 right-4">
                      <ArrowTopRightOnSquareIcon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/20 backdrop-blur-lg rounded-full text-white text-sm">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-white/80 leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Metrics */}
                  {project.metrics && (
                    <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-3 mb-4">
                      <p className="text-white/90 text-sm font-medium">
                        {project.metrics}
                      </p>
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="flex justify-between items-center">
                    <span className="text-white/60 text-sm">
                      {new Date(project.createdAt).getFullYear()}
                    </span>
                    
                    <MagneticButton
                      variant="outline"
                      size="sm"
                      className="text-white border-white/30 hover:bg-white/10"
                    >
                      View Details
                    </MagneticButton>
                  </div>
                </div>
              </GlassmorphismCard>
            </div>
          ))}
        </div>

        {/* Load More Section */}
        <div className="text-center mt-16">
          <MagneticButton
            variant="primary"
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Load More Projects
          </MagneticButton>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Join Our Portfolio?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Let's create something extraordinary together. Your vision, our expertise.
          </p>
          <Link href="/#contact">
            <MagneticButton
              variant="primary"
              size="xl"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Start Your Project
            </MagneticButton>
          </Link>
        </div>
      </div>
    </div>
  );
}