import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroEditorial from '@/components/sections/HeroEditorial';
import PhilosophyStatement from '@/components/sections/PhilosophyStatement';
import SequenceSection from '@/components/sections/SequenceSection';
import BenefitsGrid from '@/components/sections/BenefitsGrid';
import TestimonialsEditorial from '@/components/sections/TestimonialsEditorial';
import CollectionPreview from '@/components/sections/CollectionPreview';
import ClosingCTA from '@/components/sections/ClosingCTA';

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
        {/* 01 - Hero Editorial Triptych */}
        <HeroEditorial />

        {/* 01 - Philosophy Statement */}
        <PhilosophyStatement />

        {/* 02 - Product Reveal Animation */}
        <SequenceSection />

        {/* 03 - Benefits Grid (Bento) */}
        <BenefitsGrid />

        {/* 04 - Editorial Testimonials */}
        <TestimonialsEditorial />

        {/* 05 - Collection Preview */}
        <CollectionPreview />

        {/* 06 - Closing CTA */}
        <ClosingCTA />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
