import React from 'react';
import { ArrowRight, ShieldCheck, Scale, Award, Compass, Users } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { AnimatedSection } from '../components/common/AnimatedSection';

export const About: React.FC = () => {
  const values = [
    {
      icon: ShieldCheck,
      title: 'Uncompromised Integrity',
      description:
        'We adhere to rigorous fiduciary standards. Complete title clarity, RERA alignment, and unbiased valuation analysis guide every recommendation.',
    },
    {
      icon: Scale,
      title: 'Transparent Due Diligence',
      description:
        'Zero ambiguity. We furnish complete JDA approvals, encumbrance verifications, and structural engineering insights before any commitment.',
    },
    {
      icon: Compass,
      title: 'Local Market Mastery',
      description:
        'From the stately heritage bungalows of Civil Lines to the high-density growth arteries of Tonk Road and Jagatpura, we understand Jaipur’s urban fabric.',
    },
    {
      icon: Award,
      title: 'Discreet Private Client Service',
      description:
        'We maintain strict confidentiality for high-profile industrialists, NRI investors, and discerning families navigating sensitive acquisitions.',
    },
  ];

  const leadershipPlaceholders = [
    {
      role: 'Owner & Founder',
      name: 'Suresh Sharma',
      bio: 'Pioneering strategic growth and establishing ethical real estate standards across Jaipur’s prime residential and commercial corridors.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
    },
    {
      role: 'Operational Manager',
      name: 'Monu Sharma',
      bio: 'Overseeing client relations, property portfolio curation, site viewings, and seamless transaction execution for Radhe Real Estate.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <>
      <SEO
        title="About Us | Radhe Real Estate Jaipur"
        description="Learn about Radhe Real Estate: our Jaipur market heritage, transparent brokerage standards, and dedication to luxury residential and commercial property."
      />

      <div className="pt-24 sm:pt-28 pb-20 bg-brand-ivory min-h-screen">
        {/* Editorial Hero */}
        <section className="relative py-20 sm:py-28 bg-brand-dark text-brand-ivory overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&auto=format&fit=crop&q=80"
              alt="Jaipur Architecture"
              className="w-full h-full object-cover object-center filter brightness-[0.25]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection direction="up">
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-8 h-[1px] bg-brand-gold" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-gold">
                  OUR ESSENCE & HERITAGE
                </span>
                <span className="w-8 h-[1px] bg-brand-gold" />
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl font-normal text-white leading-[1.15] mb-6">
                Building Trust <br />
                <span className="italic gold-gradient-text">Beyond Property.</span>
              </h1>

              <p className="text-base sm:text-lg text-brand-ivory/85 font-light max-w-2xl mx-auto leading-relaxed">
                Founded in Jaipur with an enduring dedication to transparency, Radhe Real Estate was created to elevate real estate advisory from transactional sales into long-term wealth curation.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Our Story Section with Visual Split */}
        <section className="py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-8 h-[1px] bg-brand-gold" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-gold">
                  THE FOUNDING CHAPTER
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-brand-dark leading-tight">
                Rooted in Jaipur's Timeless Character, Built for Modern Living.
              </h2>

              <p className="text-sm sm:text-base text-brand-stone font-light leading-relaxed">
                Jaipur holds a unique position in India’s urban landscape—an imperial city where heritage palace avenues meet rapid infrastructure expansion, world-class expressways, and high-yielding commercial corridors.
              </p>

              <p className="text-sm sm:text-base text-brand-stone font-light leading-relaxed">
                Too often, property transactions in Rajasthan have been characterized by fragmented information, opaque paperwork, and aggressive sales pitches. Radhe Real Estate was founded with a singular conviction: discerning clients deserve a fiduciary partner who values legal clarity and thoughtful curation above all else.
              </p>

              <div className="pt-4 border-t border-brand-sand">
                <div className="grid grid-cols-2 gap-4 text-xs uppercase tracking-wider font-semibold text-brand-dark">
                  <div>
                    <span className="text-brand-gold font-serif text-2xl block">100%</span>
                    <span>Title Verification</span>
                  </div>
                  <div>
                    <span className="text-brand-gold font-serif text-2xl block">RERA</span>
                    <span>Compliant Portfolios</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] w-full overflow-hidden shadow-luxury">
                <img
                  src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&auto=format&fit=crop&q=80"
                  alt="Jaipur Luxury Courtyard Residence"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="hidden sm:block absolute -bottom-8 -left-8 bg-brand-dark text-white p-6 border border-brand-gold/40 shadow-2xl max-w-xs">
                <p className="font-serif italic text-sm text-brand-gold">
                  "A home in Jaipur is an emotional anchor. It represents generational pride and family stability."
                </p>
                <span className="text-[10px] uppercase tracking-widest text-brand-ivory/60 mt-2 block">
                  — Radhe Real Estate Ethos
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-24 sm:py-32 bg-brand-cream/50 border-y border-brand-sand/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="PILLARS OF PRACTICE"
              title="Our Core Values"
              subtitle="The foundational principles that govern our interactions with clients, builders, and regulatory institutions."
              align="center"
              className="mb-16"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, idx) => {
                const Icon = v.icon;
                return (
                  <AnimatedSection key={v.title} delay={idx * 0.1} className="h-full">
                    <div className="h-full p-8 bg-white border border-brand-sand/80 hover:border-brand-gold/60 transition-all duration-300 hover:shadow-luxury flex flex-col justify-between">
                      <div>
                        <div className="w-12 h-12 bg-brand-cream flex items-center justify-center mb-6">
                          <Icon className="w-6 h-6 text-brand-gold" />
                        </div>
                        <h3 className="font-serif text-xl font-medium text-brand-dark mb-3">
                          {v.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-brand-stone font-light leading-relaxed">
                          {v.description}
                        </p>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        {/* Leadership & Advisory Team Section (Placeholders) */}
        <section className="py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="LEADERSHIP & ADVISORY"
            title="The People Behind the Promise"
            subtitle="Meet the experienced real estate professionals dedicated to guiding your property investments in Jaipur."
            align="center"
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadershipPlaceholders.map((person, idx) => (
              <AnimatedSection key={person.role} delay={idx * 0.1}>
                <div className="bg-white border border-brand-sand overflow-hidden group hover:shadow-luxury transition-all duration-300">
                  <div className="aspect-[4/3] w-full overflow-hidden bg-brand-cream">
                    <img
                      src={person.image}
                      alt={person.role}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] uppercase tracking-widest text-brand-gold font-semibold block mb-1">
                      {person.role}
                    </span>
                    <h3 className="font-serif text-lg font-medium text-brand-dark mb-2">
                      {person.name}
                    </h3>
                    <p className="text-xs text-brand-stone font-light leading-relaxed">
                      {person.bio}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-brand-dark text-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal mb-6">
              Let's Find Your Next Property
            </h2>
            <p className="text-base text-brand-ivory/80 font-light max-w-xl mx-auto mb-8">
              Speak with a senior advisor today to explore confidential listings and schedule private site visits across Jaipur.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/properties" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Explore Properties
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Contact Advisory
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
