import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSplit from '@/components/sections/HeroSplit';
import InsiderSection from '@/components/sections/InsiderSection';
import SequenceSection from '@/components/sections/SequenceSection';
import BenefitSection from '@/components/sections/BenefitSection';
import TestimonialSection from '@/components/sections/TestimonialSection';
import SystemShowcase from '@/components/sections/SystemShowcase';
import PaymentSection from '@/components/sections/PaymentSection';

export default function Home() {
  return (
    <>
      {/* Global CSS Wrapper */}
      <div className="w-embed"></div>
      <div className="global-css"></div>
      <div className="loader"></div>

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <div className="page-wrapper">
        {/* Hero Section */}
        <HeroSplit />

        {/* Insider/Use Cases Section */}
        <InsiderSection />

        {/* Scroll Sequence Animation Section */}
        <SequenceSection />

        {/* Benefits Comparison Section */}
        <BenefitSection />

        {/* Testimonials Section */}
        <TestimonialSection />

        {/* System Showcase Section */}
        <SystemShowcase />

        {/* Payment Methods Section */}
        <PaymentSection />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
