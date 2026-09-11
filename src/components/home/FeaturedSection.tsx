import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useProperties } from '../../context/PropertyContext';
import { PropertyCard } from '../common/PropertyCard';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { AnimatedSection } from '../common/AnimatedSection';

export const FeaturedSection: React.FC = () => {
  const { properties } = useProperties();
  const featuredProperties = properties.filter((p) => p.featured).slice(0, 6);

  return (
    <section className="py-24 sm:py-32 bg-brand-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <SectionHeading
            eyebrow="CURATED COLLECTION"
            title="Featured Properties"
            subtitle="Explore properties handpicked for bespoke living, verified titles, and enduring capital appreciation across Jaipur."
            align="left"
            className="md:max-w-xl"
          />

          <Button
            href="/properties"
            variant="outline"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
            className="self-start md:self-end"
          >
            Explore All Listings
          </Button>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property, idx) => (
            <AnimatedSection key={property.id} delay={idx * 0.1}>
              <PropertyCard property={property} className="h-full" />
            </AnimatedSection>
          ))}
        </div>

        {/* Bottom Editorial Callout */}
        <div className="mt-16 pt-8 border-t border-brand-sand/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-stone">
          <p>Looking for off-market, confidential listings in Civil Lines or C-Scheme?</p>
          <a
            href="/contact"
            className="font-medium text-brand-dark hover:text-brand-gold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
          >
            <span>Request Private Portfolio Access</span>
            <span className="text-brand-gold">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};
