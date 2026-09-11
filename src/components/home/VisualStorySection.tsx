import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';
import { AnimatedSection } from '../common/AnimatedSection';

export const VisualStorySection: React.FC = () => {
  return (
    <section className="relative py-36 sm:py-48 w-full overflow-hidden bg-brand-dark flex items-center justify-center">
      {/* Immersive Full-Width Parallax Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=2000&auto=format&fit=crop&q=85"
          alt="Jaipur Luxury Estate Architecture"
          loading="lazy"
          className="w-full h-full object-cover object-center filter brightness-[0.7] transform scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Layered cinematic dark filters */}
        <div className="absolute inset-0 bg-brand-dark/65 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/70" />
      </div>

      {/* Center Story Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection direction="up" duration={0.8}>
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-8 h-[1px] bg-brand-gold" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-gold">
              TIMELESS JAIPUR RESIDENCES
            </span>
            <span className="w-8 h-[1px] bg-brand-gold" />
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-white leading-[1.1] mb-6">
            Your next address <br />
            <span className="italic gold-gradient-text font-normal">starts here.</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-brand-ivory/85 font-light max-w-2xl mx-auto leading-relaxed mb-10">
            From the historic quiet of Civil Lines to the dynamic heights of C-Scheme, discover an extraordinary standard of residential living built to endure generations.
          </p>

          <Button
            href="/properties"
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Explore Properties
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
};
