import React from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { AnimatedSection } from '../common/AnimatedSection';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Tell Us What You Need',
      description:
        'Share your lifestyle aspirations, preferred micro-markets, spatial specifications, and investment timelines.',
    },
    {
      step: '02',
      title: 'Explore Suitable Properties',
      description:
        'Receive a curated, confidential dossier of verified properties matching your exact parameters—no wasted visits.',
    },
    {
      step: '03',
      title: 'Visit & Evaluate',
      description:
        'Experience private, guided on-site viewings accompanied by our senior partners with complete title documentation.',
    },
    {
      step: '04',
      title: 'Make Your Move',
      description:
        'Seamless closure with transparent registry, bank liaison, structural diligence, and post-acquisition handoff.',
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-brand-cream/50 border-t border-brand-sand/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="THE ACQUISITION JOURNEY"
          title="A Simplified 4-Step Process"
          subtitle="Navigating luxury real estate in Jaipur should be effortless, clear, and reassuring at every milestone."
          align="center"
          className="mb-20"
        />

        {/* Desktop Horizontal Process / Mobile Vertical Timeline */}
        <div className="relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-[1px] bg-brand-sand z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((item, index) => (
              <AnimatedSection key={item.step} delay={index * 0.12}>
                <div className="flex flex-col items-start bg-white lg:bg-transparent p-6 lg:p-2 border lg:border-none border-brand-sand/60">
                  {/* Step Badge */}
                  <div className="w-16 h-16 border border-brand-gold/50 bg-brand-ivory flex items-center justify-center mb-6 shadow-sm">
                    <span className="font-serif text-xl font-bold text-brand-gold">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-medium text-brand-dark mb-3">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-stone font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
