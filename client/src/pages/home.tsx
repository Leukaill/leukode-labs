import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero';
import { ServicesSection } from '@/components/sections/services';
import { WhyUsSection } from '@/components/sections/why-us';
import { PackagesSection } from '@/components/sections/packages';
import { PortfolioSection } from '@/components/sections/portfolio';
import { ContactSection } from '@/components/sections/contact';
import { GoogleReviewsWidget } from '@/components/ui/google-reviews';
import { BackToTop } from '@/components/ui/back-to-top';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <WhyUsSection />
        <PackagesSection />
        <PortfolioSection />
        
        {/* Google Reviews Section */}
        <section className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12 md:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 md:mb-8 tracking-tight">
                Client <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Testimonials</span>
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-3xl md:max-w-4xl mx-auto font-medium leading-relaxed">
                Real feedback from our satisfied clients across Rwanda and beyond.
              </p>
            </div>
            
            <div className="flex justify-center">
              <GoogleReviewsWidget />
            </div>
          </div>
        </section>
        
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
