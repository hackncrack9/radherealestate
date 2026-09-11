import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Users, Compass } from 'lucide-react';
import { AnimatedSection } from '../common/AnimatedSection';

export const TrustIntroSection: React.FC = () => {
  const trustMetrics = [
    {
      value: 'XX+',
      label: 'Years of Market Presence',
      detail: 'Deep institutional roots in Jaipur’s high-value residential sector.',
      icon: Award,
    },
    {
      value: 'XXX+',
      label: 'Curated Properties',
      detail: 'Every villa, plot, and commercial asset thoroughly vetted for title clarity.',
      icon: ShieldCheck,
    },
    {
      value: 'XXXX+',
      label: 'Happy Families & Investors',
      detail: 'Advising homeowners, NRI clients, and corporate business leaders.',
      icon: Users,
    },
    {
      value: '10+',
      label: 'Prime Jaipur Hubs',
      detail: 'Specialized focus across C-Scheme, Civil Lines, Jagatpura, and growth spines.',
      icon: Compass,
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-brand-cream/60 border-b border-brand-sand/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Heading & Brand Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[1px] bg-brand-gold" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-gold">
                THE RADHE REAL ESTATE PHILOSOPHY
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.15] text-brand-dark">
              More Than Property. <br />
              <span className="italic">A Better Way Forward.</span>
            </h2>
          </div>

          <div className="lg:col-span-7 lg:pl-8 space-y-6">
            <p className="text-lg sm:text-xl text-brand-dark/90 font-light leading-relaxed">
              Real estate in Jaipur is more than transactions—it is an art of legacy, community, and capital preservation. At Radhe Real Estate, we strip away the ambiguity of property discovery.
            </p>
            <p className="text-sm sm:text-base text-brand-stone font-light leading-relaxed">
              Whether you are acquiring a generational villa in Civil Lines, seeking an iconic downtown penthouse in C-Scheme, or securing high-yield commercial frontage, our advisory provides absolute transparency, RERA due diligence, and bespoke negotiation.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-gold-dark">
              <span>Trusted Local Brokerage</span>
              <span>•</span>
              <span>Uncompromised Due Diligence</span>
            </div>
          </div>
        </div>

        {/* 4 Trust Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <AnimatedSection
                key={metric.label}
                delay={index * 0.12}
                className="h-full"
              >
                <div className="h-full p-8 bg-white border border-brand-sand/80 hover:border-brand-gold/60 transition-all duration-300 hover:shadow-luxury group flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 bg-brand-cream group-hover:bg-brand-gold/15 transition-colors flex items-center justify-center mb-6">
                      <IconComponent className="w-5 h-5 text-brand-gold" />
                    </div>
                    <div className="font-serif text-3xl sm:text-4xl font-semibold text-brand-dark group-hover:text-brand-gold-dark transition-colors mb-2">
                      {metric.value}
                    </div>
                    <div className="text-xs uppercase tracking-wider font-medium text-brand-dark mb-2">
                      {metric.label}
                    </div>
                  </div>
                  <p className="text-xs text-brand-stone font-light leading-relaxed pt-3 border-t border-brand-cream">
                    {metric.detail}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
};
