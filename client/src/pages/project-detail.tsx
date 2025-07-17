import { useState, useEffect } from 'react';
import { useParams, Link } from 'wouter';
import { ArrowLeftIcon, CalendarIcon, TagIcon } from '@heroicons/react/24/outline';
import { GlassmorphismCard } from '@/components/ui/glassmorphism-card';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { Badge } from '@/components/ui/badge';

interface ProjectDetail {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  category: string;
  completionDate: string;
  duration: string;
  challenges: string[];
  solutions: string[];
  results: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
}

const projectDetails: Record<number, ProjectDetail> = {
  1: {
    id: 1,
    title: "TechFlow E-commerce",
    description: "Revolutionary e-commerce platform with AI-powered personalization",
    longDescription: "A sophisticated e-commerce platform that transforms how customers discover and purchase products. Built with cutting-edge technology to deliver an unparalleled shopping experience that adapts to each user's preferences and behaviors.",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800&h=600",
    category: "E-commerce",
    completionDate: "December 2024",
    duration: "4 months",
    challenges: [
      "Complex product catalog management",
      "Real-time inventory synchronization",
      "Personalized recommendation engine",
      "Mobile-first responsive design"
    ],
    solutions: [
      "Advanced caching strategies for optimal performance",
      "AI-driven product recommendation system",
      "Seamless payment integration with multiple gateways",
      "Progressive web app architecture"
    ],
    results: [
      "300% increase in conversion rates",
      "65% reduction in cart abandonment",
      "Superior mobile experience with 40% faster load times",
      "Significant increase in average order value"
    ],
    metrics: [
      { label: "Revenue Increase", value: "+280%" },
      { label: "Page Load Time", value: "0.8s" },
      { label: "Mobile Score", value: "98/100" },
      { label: "User Satisfaction", value: "4.9/5" }
    ],
    testimonial: {
      quote: "The platform exceeded our expectations. The AI personalization has revolutionized how our customers shop.",
      author: "Sarah Chen",
      position: "CEO, TechFlow"
    }
  },
  2: {
    id: 2,
    title: "VitalCare Health App",
    description: "Comprehensive health management platform for modern healthcare",
    longDescription: "A revolutionary health management platform that connects patients, healthcare providers, and medical data in one seamless ecosystem. Designed to improve health outcomes through intelligent monitoring and personalized care.",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&q=80&w=800&h=600",
    category: "Healthcare",
    completionDate: "November 2024",
    duration: "6 months",
    challenges: [
      "HIPAA compliance and data security",
      "Real-time health monitoring integration",
      "Complex appointment scheduling system",
      "Multi-stakeholder user experience"
    ],
    solutions: [
      "End-to-end encryption for all health data",
      "Advanced scheduling algorithms with conflict resolution",
      "Intuitive dashboard for patients and providers",
      "Seamless integration with wearable devices"
    ],
    results: [
      "90% reduction in appointment scheduling time",
      "Improved patient engagement by 250%",
      "Streamlined provider workflows",
      "Enhanced patient health outcomes"
    ],
    metrics: [
      { label: "Patient Satisfaction", value: "4.8/5" },
      { label: "Appointment Efficiency", value: "+90%" },
      { label: "Data Security", value: "100%" },
      { label: "System Uptime", value: "99.9%" }
    ],
    testimonial: {
      quote: "This platform has transformed how we deliver healthcare. Patient engagement has never been higher.",
      author: "Dr. Michael Rodriguez",
      position: "Chief Medical Officer, VitalCare"
    }
  },
  3: {
    id: 3,
    title: "NexGen Finance Dashboard",
    description: "Advanced financial analytics and portfolio management platform",
    longDescription: "A sophisticated financial platform that empowers investment professionals with real-time analytics, advanced portfolio management tools, and comprehensive risk assessment capabilities.",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800&h=600",
    category: "Finance",
    completionDate: "October 2024",
    duration: "5 months",
    challenges: [
      "Real-time market data integration",
      "Complex financial calculations and modeling",
      "Multi-asset portfolio visualization",
      "Regulatory compliance requirements"
    ],
    solutions: [
      "High-frequency data processing architecture",
      "Advanced charting and visualization tools",
      "Automated risk assessment algorithms",
      "Comprehensive audit trail system"
    ],
    results: [
      "450% improvement in decision-making speed",
      "Reduced portfolio risk by 35%",
      "Enhanced client reporting capabilities",
      "Significant increase in assets under management"
    ],
    metrics: [
      { label: "Processing Speed", value: "10ms" },
      { label: "Data Accuracy", value: "99.99%" },
      { label: "Client Satisfaction", value: "4.9/5" },
      { label: "Risk Reduction", value: "35%" }
    ],
    testimonial: {
      quote: "The platform's analytical capabilities have given us a significant competitive advantage in the market.",
      author: "Jennifer Park",
      position: "Portfolio Manager, NexGen Capital"
    }
  },
  9: {
    id: 9,
    title: "Denyse AI Assistant",
    description: "Enterprise-grade AI assistant with complete data privacy through local LLM deployment",
    longDescription: "A revolutionary corporate AI assistant that prioritizes absolute data privacy. Deployed entirely on local infrastructure, Denyse provides intelligent document analysis, report generation, and knowledge management without compromising sensitive corporate information.",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    category: "Enterprise Solutions",
    completionDate: "January 2025",
    duration: "3 months",
    challenges: [
      "Ensuring 100% data privacy with local LLM deployment",
      "Complex document analysis across multiple file formats",
      "Real-time knowledge base integration and management",
      "Scalable enterprise architecture for multiple users"
    ],
    solutions: [
      "Custom local LLM integration with enterprise-grade security",
      "Advanced document processing engine for PDFs, DOCX, and more",
      "Intelligent knowledge sharing system with granular permissions",
      "Seamless user authentication and access control"
    ],
    results: [
      "100% data privacy maintained with zero external data transmission",
      "85% reduction in document analysis time",
      "Enhanced corporate knowledge accessibility and sharing",
      "Significant improvement in decision-making efficiency"
    ],
    metrics: [
      { label: "Data Privacy", value: "100%" },
      { label: "Processing Speed", value: "3x faster" },
      { label: "User Adoption", value: "95%" },
      { label: "Security Score", value: "A+" }
    ],
    testimonial: {
      quote: "Denyse has transformed how we handle sensitive documents while maintaining complete control over our data. The privacy-first approach is exactly what our enterprise needed.",
      author: "Marcus Thompson",
      position: "Chief Information Officer, SecureTech Solutions"
    }
  }
};

export default function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = parseInt(projectId || '0');
    const projectData = projectDetails[id];
    
    if (projectData) {
      setProject(projectData);
    }
    setLoading(false);
  }, [projectId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Project Not Found</h1>
          <Link href="/portfolio">
            <MagneticButton variant="primary">Back to Portfolio</MagneticButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20" />
        <div className="container mx-auto px-4 py-8 relative z-10">
          <Link href="/portfolio">
            <MagneticButton variant="outline" className="mb-8">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Portfolio
            </MagneticButton>
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4">
                <TagIcon className="w-4 h-4 mr-2" />
                {project.category}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {project.title}
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {project.longDescription}
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Completed: {project.completionDate}
                </div>
                <div>Duration: {project.duration}</div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl blur-xl" />
              <img 
                src={project.imageUrl} 
                alt={project.title}
                className="relative rounded-3xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Challenges */}
            <GlassmorphismCard variant="liquid" className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-white">Challenges</h2>
              <div className="space-y-4">
                {project.challenges.map((challenge, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-4 flex-shrink-0" />
                    <p className="text-gray-300">{challenge}</p>
                  </div>
                ))}
              </div>
            </GlassmorphismCard>

            {/* Solutions */}
            <GlassmorphismCard variant="liquid" className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-white">Solutions</h2>
              <div className="space-y-4">
                {project.solutions.map((solution, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-4 flex-shrink-0" />
                    <p className="text-gray-300">{solution}</p>
                  </div>
                ))}
              </div>
            </GlassmorphismCard>

            {/* Results */}
            <GlassmorphismCard variant="liquid" className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-white">Results</h2>
              <div className="space-y-4">
                {project.results.map((result, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-4 flex-shrink-0" />
                    <p className="text-gray-300">{result}</p>
                  </div>
                ))}
              </div>
            </GlassmorphismCard>

            {/* Testimonial */}
            {project.testimonial && (
              <GlassmorphismCard variant="holographic" className="p-8">
                <div className="text-center">
                  <div className="text-4xl text-purple-400 mb-4">"</div>
                  <p className="text-lg text-gray-300 italic mb-6">
                    {project.testimonial.quote}
                  </p>
                  <div className="text-white font-semibold">{project.testimonial.author}</div>
                  <div className="text-gray-400 text-sm">{project.testimonial.position}</div>
                </div>
              </GlassmorphismCard>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Metrics */}
            <GlassmorphismCard variant="neural" className="p-6">
              <h3 className="text-xl font-bold mb-6 text-white">Key Metrics</h3>
              <div className="space-y-4">
                {project.metrics.map((metric, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">{metric.label}</span>
                    <span className="text-white font-bold">{metric.value}</span>
                  </div>
                ))}
              </div>
            </GlassmorphismCard>

            {/* CTA */}
            <GlassmorphismCard variant="liquid" className="p-6 text-center">
              <h3 className="text-xl font-bold mb-4 text-white">Ready to Transform?</h3>
              <p className="text-gray-300 mb-6 text-sm">
                Let's discuss how we can create something extraordinary for your business.
              </p>
              <Link href="/#contact">
                <MagneticButton variant="impossible" className="w-full">
                  Start Your Project
                </MagneticButton>
              </Link>
            </GlassmorphismCard>
          </div>
        </div>
      </div>
    </div>
  );
}