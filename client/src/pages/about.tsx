import { Link } from 'wouter';
import { ArrowLeftIcon, EyeIcon, SparklesIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { GlassmorphismCard } from '@/components/ui/glassmorphism-card';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { ParticleBackground } from '@/components/3d/particle-background';
import { BackToTop } from '@/components/ui/back-to-top';

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <ParticleBackground />
      
      {/* Navigation */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <Link href="/">
          <MagneticButton variant="outline" className="mb-8">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Home
          </MagneticButton>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            The Architects of Digital Impossibilities
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
            Where vision meets execution, and impossibilities become inevitable realities.
          </p>
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
                Our Philosophy
              </h2>
              <div className="space-y-6 text-gray-300">
                <p className="text-lg leading-relaxed">
                  We believe that the most extraordinary solutions emerge from the intersection of 
                  uncompromising craftsmanship and visionary thinking. Every project we undertake 
                  is an opportunity to transcend conventional boundaries.
                </p>
                <p className="text-lg leading-relaxed">
                  Our approach is rooted in the understanding that true innovation requires both 
                  technical mastery and artistic sensibility. We don't just build products; 
                  we craft experiences that leave lasting impressions.
                </p>
                <p className="text-lg leading-relaxed">
                  Excellence is not a destination but a continuous journey of refinement, 
                  where each detail matters and every interaction tells a story.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl blur-xl" />
              <GlassmorphismCard variant="holographic" className="relative p-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <SparklesIcon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                  <p className="text-gray-300 leading-relaxed">
                    To transform ambitious visions into digital realities that not only meet 
                    expectations but fundamentally redefine what's possible.
                  </p>
                </div>
              </GlassmorphismCard>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The principles that guide every decision, every line of code, and every creative choice.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <GlassmorphismCard variant="neural" className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <EyeIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Visionary Thinking</h3>
              <p className="text-gray-300 leading-relaxed">
                We see beyond the present, anticipating needs and possibilities that others haven't 
                yet imagined. Every solution is designed for tomorrow's challenges.
              </p>
            </GlassmorphismCard>

            <GlassmorphismCard variant="liquid" className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <SparklesIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Uncompromising Excellence</h3>
              <p className="text-gray-300 leading-relaxed">
                Perfection is not an accident but the result of meticulous attention to detail, 
                rigorous testing, and an unwavering commitment to quality.
              </p>
            </GlassmorphismCard>

            <GlassmorphismCard variant="impossible" className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheckIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Trusted Partnership</h3>
              <p className="text-gray-300 leading-relaxed">
                We don't just deliver projects; we build lasting relationships based on trust, 
                transparency, and mutual respect for shared ambitions.
              </p>
            </GlassmorphismCard>
          </div>
        </div>
      </div>

      {/* Legacy Section */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
            Crafting Digital Legacies
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Our work speaks through the success of those who dare to dream beyond conventional limits. 
            Each project becomes a testament to what's possible when vision meets execution.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">150+</div>
              <div className="text-gray-300">Impossibilities Realized</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">99.9%</div>
              <div className="text-gray-300">Excellence Standard</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">7+</div>
              <div className="text-gray-300">Years of Innovation</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
            <p className="text-lg text-gray-300 italic mb-4">
              "The future belongs to those who believe in the beauty of their dreams and have the courage to make them reality."
            </p>
            <div className="text-sm text-gray-400">- Leukode Labs Philosophy</div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
            Ready to Create Something Extraordinary?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Let's discuss how we can transform your vision into a digital reality that exceeds all expectations.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/#contact">
              <MagneticButton variant="impossible" size="xl">
                Start Your Journey
              </MagneticButton>
            </Link>
            <Link href="/portfolio">
              <MagneticButton variant="outline" size="xl">
                View Our Work
              </MagneticButton>
            </Link>
          </div>
        </div>
      </div>
      
      <BackToTop />
    </div>
  );
}