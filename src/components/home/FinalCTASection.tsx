import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '../common/Button';
import { AnimatedSection } from '../common/AnimatedSection';

export const FinalCTASection: React.FC = () => {
  return (
    <section className="relative py-28 sm:py-36 bg-brand-dark overflow-hidden">
      {/* Subtle Architectural Ambient Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1800&auto=format&fit=crop&q=80"
          alt="Jaipur Real Estate Consultation"
          loading="lazy"
          className="w-full h-full object-cover object-center filter brightness-[0.25]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-brand-dark/80" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection direction="up" duration={0.8}>
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-8 h-[1px] bg-brand-gold" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-gold">
              START YOUR DISCOVERY
            </span>
            <span className="w-8 h-[1px] bg-brand-gold" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white leading-[1.15] mb-6">
            Looking for the Right Property?
          </h2>

          <p className="text-base sm:text-lg text-brand-ivory/80 font-light max-w-2xl mx-auto leading-relaxed mb-10">
            Let Radhe Real Estate help you find the right opportunity. Connect directly with our senior Jaipur property advisors for confidential consultation and personalized viewing itineraries.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="/properties"
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Explore Properties
            </Button>
            <Button
              href="/contact"
              variant="secondary"
              size="lg"
              icon={<Phone className="w-4 h-4" />}
              iconPosition="left"
            >
              Contact Us
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
