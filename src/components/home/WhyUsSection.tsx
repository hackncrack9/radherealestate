import React from 'react';
import {
  Compass,
  MapPin,
  CheckCircle2,
  FileText,
  TrendingUp,
  UserCheck,
} from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { AnimatedSection } from '../common/AnimatedSection';

export const WhyUsSection: React.FC = () => {
  const pillars = [
    {
      icon: Compass,
      title: 'Trusted Guidance',
      description:
        'Ethical stewardship backed by disciplined counsel. We navigate negotiations and approvals with your best interests at heart.',
    },
    {
      icon: MapPin,
      title: 'Local Market Knowledge',
      description:
        'Unrivaled insight into Jaipur’s historic enclaves and fast-emerging infrastructural corridors, from C-Scheme to Tonk Road.',
    },
    {
      icon: CheckCircle2,
      title: 'Curated Properties',
      description:
        'We filter out 85% of listings. Every property presented has passed strict title search, RERA compliance, and build quality reviews.',
    },
    {
      icon: FileText,
      title: 'Transparent Process',
      description:
        'Zero concealed charges or ambiguous commitments. Clear documentation, verified land registry, and legal transparency from day one.',
    },
    {
      icon: TrendingUp,
      title: 'Investment-Focused Approach',
      description:
        'We evaluate rental yields, capital growth trajectories, and infrastructure developments to maximize long-term asset value.',
    },
    {
      icon: UserCheck,
      title: 'Personalized Service',
      description:
        'Direct consultation with senior partners. Bespoke viewing arrangements, discreet off-market transactions, and after-sale support.',
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-brand-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="DISTINCTIVE EXCELLENCE"
          title="Why Radhe Real Estate"
          subtitle="A heritage of discretion, institutional standards, and intimate mastery of Jaipur’s premier property market."
          align="center"
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <AnimatedSection
                key={pillar.title}
                delay={index * 0.08}
                className="h-full"
              >
                <div className="h-full p-8 bg-white border border-brand-sand/70 hover:border-brand-gold/60 transition-all duration-300 hover:shadow-luxury group">
                  <div className="w-12 h-12 bg-brand-cream group-hover:bg-brand-gold/15 flex items-center justify-center transition-colors mb-6">
                    <Icon className="w-6 h-6 text-brand-gold" />
                  </div>
                  <h3 className="font-serif text-xl font-medium text-brand-dark group-hover:text-brand-gold-dark transition-colors mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-stone font-light leading-relaxed">
                    {pillar.description}
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
