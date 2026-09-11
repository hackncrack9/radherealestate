import React from 'react';
import { SEO } from '../components/common/SEO';
import { HeroSection } from '../components/home/HeroSection';
import { TrustIntroSection } from '../components/home/TrustIntroSection';
import { FeaturedSection } from '../components/home/FeaturedSection';
import { CategoriesSection } from '../components/home/CategoriesSection';
import { WhyUsSection } from '../components/home/WhyUsSection';
import { VisualStorySection } from '../components/home/VisualStorySection';
import { ProcessSection } from '../components/home/ProcessSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { FinalCTASection } from '../components/home/FinalCTASection';

export const Home: React.FC = () => {
  return (
    <>
      <SEO
        title="Radhe Real Estate | Premier Properties in Jaipur"
        description="Discover luxury villas, sky penthouses, commercial spaces, and high-value plots in Jaipur, Rajasthan with Radhe Real Estate. Trusted property advisory."
      />

      <div className="w-full">
        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: Trust / Intro */}
        <TrustIntroSection />

        {/* Section 3: Featured Properties */}
        <FeaturedSection />

        {/* Section 4: Property Categories */}
        <CategoriesSection />

        {/* Section 5: Why Radhe Real Estate */}
        <WhyUsSection />

        {/* Section 6: Full-Width Visual Story */}
        <VisualStorySection />

        {/* Section 7: Acquisition Process */}
        <ProcessSection />

        {/* Section 8: Testimonials */}
        <TestimonialsSection />

        {/* Section 9: Final Lead CTA */}
        <FinalCTASection />
      </div>
    </>
  );
};
