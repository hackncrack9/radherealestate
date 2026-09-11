import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { AnimatedSection } from '../common/AnimatedSection';

export const CategoriesSection: React.FC = () => {
  const categories = [
    {
      title: 'Residential',
      subtitle: 'Luxury Villas, Penthouses & Sky Residences',
      count: '18+ Properties',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80',
      link: '/properties?category=residential',
    },
    {
      title: 'Commercial',
      subtitle: 'Grade-A Offices & High-Street Retail Spaces',
      count: '12+ Spaces',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
      link: '/properties?category=commercial',
    },
    {
      title: 'Plots / Land',
      subtitle: 'JDA Approved Freehold Plotted Townships',
      count: '15+ Enclaves',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop&q=80',
      link: '/properties?category=plots',
    },
    {
      title: 'Investment Properties',
      subtitle: 'High-Yield Assets & Growth Corridors',
      count: '9+ Opportunities',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80',
      link: '/properties?category=investment',
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-brand-cream/40 border-y border-brand-sand/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="PORTFOLIO BY SECTOR"
          title="Explore by Category"
          subtitle="Whether acquiring your primary family estate or securing capital-accretive commercial frontage, navigate our core property sectors."
          align="center"
          className="mb-16"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <AnimatedSection key={cat.title} delay={idx * 0.1}>
              <Link
                to={cat.link}
                className="group relative block aspect-[3/4] w-full overflow-hidden bg-brand-dark cursor-pointer shadow-luxury"
              >
                {/* Background Image */}
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Dark Cinematic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-black/20 opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Top Count Tag */}
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 text-[10px] uppercase tracking-widest font-semibold text-brand-gold bg-brand-dark/80 backdrop-blur-md border border-brand-gold/30">
                    {cat.count}
                  </span>
                </div>

                {/* Bottom Content with Upward Shift & Arrow */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end transition-transform duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif text-2xl font-normal text-white group-hover:text-brand-gold transition-colors duration-300">
                      {cat.title}
                    </h3>
                    <div className="w-8 h-8 rounded-full border border-white/20 group-hover:border-brand-gold group-hover:bg-brand-gold group-hover:text-brand-dark text-white flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-xs text-brand-ivory/70 font-light leading-relaxed group-hover:text-brand-ivory transition-colors">
                    {cat.subtitle}
                  </p>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};
