import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero';
import { ServicesSection } from '@/components/sections/services';
import { WhyUsSection } from '@/components/sections/why-us';
import { PackagesSection } from '@/components/sections/packages';
import { PortfolioSection } from '@/components/sections/portfolio';
import { ContactSection } from '@/components/sections/contact';

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
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
