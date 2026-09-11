import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { AnimatedSection } from '../common/AnimatedSection';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      quote:
        'Radhe Real Estate handled our villa acquisition in Civil Lines with absolute discretion. From legal title diligence to negotiating directly with the builder, their counsel was invaluable. A truly exemplary brokerage experience in Jaipur.',
      author: 'Rajendra S. Shekhawat',
      designation: 'Managing Director, Industrial Group (Placeholder)',
      location: 'Civil Lines Resident',
      propertyType: '5 BHK Luxury Villa',
      rating: 5,
    },
    {
      id: 2,
      quote:
        'Finding a penthouse overlooking Central Park that offered both quiet and high structural quality felt nearly impossible until we engaged Radhe Real Estate. They presented three off-market options within 48 hours.',
      author: 'Ananya & Dr. K. Mehta',
      designation: 'Senior Healthcare Consultant & NRI Investor (Placeholder)',
      location: 'C-Scheme Resident',
      propertyType: 'Sky Penthouse',
      rating: 5,
    },
    {
      id: 3,
      quote:
        'Their understanding of commercial yields along Tonk Road is unmatched. They helped our family office identify a Grade-A floor with clean lease terms and marquee tenancy. We trust their advice implicitly.',
      author: 'Pradeep Agarwal',
      designation: 'Private Equity Investor (Placeholder)',
      location: 'Tonk Road Commercial Investor',
      propertyType: 'Corporate Office Plate',
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-24 sm:py-32 bg-brand-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="CLIENT EXPERIENCES"
          title="Words of Trust"
          subtitle="Reflections from discerning homeowners, corporate patrons, and investors who have built their Jaipur legacy with us."
          align="center"
          className="mb-16"
        />

        {/* Desktop 3-Column Cards */}
        <div className="hidden lg:grid grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <AnimatedSection key={item.id} delay={idx * 0.1} className="h-full">
              <div className="h-full p-8 bg-white border border-brand-sand/80 hover:border-brand-gold/60 transition-all duration-300 hover:shadow-luxury flex flex-col justify-between relative">
                <Quote className="w-8 h-8 text-brand-gold/25 absolute top-6 right-6" />

                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-brand-gold mb-6">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                    ))}
                  </div>

                  <p className="font-serif italic text-sm sm:text-base text-brand-dark font-light leading-relaxed mb-8">
                    "{item.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-brand-cream">
                  <h4 className="font-serif text-base font-medium text-brand-dark">
                    {item.author}
                  </h4>
                  <p className="text-xs text-brand-stone font-light">{item.designation}</p>
                  <span className="inline-block mt-2 text-[10px] uppercase tracking-wider font-semibold text-brand-gold bg-brand-cream px-2 py-0.5">
                    {item.propertyType} • {item.location}
                  </span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Mobile & Tablet Slider */}
        <div className="lg:hidden">
          <div className="p-8 bg-white border border-brand-sand/80 shadow-luxury relative">
            <Quote className="w-8 h-8 text-brand-gold/25 absolute top-6 right-6" />

            <div className="flex items-center gap-1 text-brand-gold mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
              ))}
            </div>

            <p className="font-serif italic text-base text-brand-dark font-light leading-relaxed mb-8">
              "{testimonials[currentIndex].quote}"
            </p>

            <div className="pt-4 border-t border-brand-cream">
              <h4 className="font-serif text-base font-medium text-brand-dark">
                {testimonials[currentIndex].author}
              </h4>
              <p className="text-xs text-brand-stone font-light">
                {testimonials[currentIndex].designation}
              </p>
              <span className="inline-block mt-2 text-[10px] uppercase tracking-wider font-semibold text-brand-gold bg-brand-cream px-2 py-0.5">
                {testimonials[currentIndex].propertyType} • {testimonials[currentIndex].location}
              </span>
            </div>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center justify-between mt-6">
            <span className="text-xs text-brand-stone font-light">
              0{currentIndex + 1} / 0{testimonials.length} (Sample Placeholders)
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="w-10 h-10 border border-brand-sand bg-white flex items-center justify-center hover:border-brand-gold transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-brand-dark" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next testimonial"
                className="w-10 h-10 border border-brand-sand bg-white flex items-center justify-center hover:border-brand-gold transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-brand-dark" />
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer Note */}
        <p className="text-[11px] text-brand-stone/80 text-center mt-12 font-light">
          Note: Testimonial excerpts and names are sample placeholders representing typical client profiles served by Radhe Real Estate.
        </p>
      </div>
    </section>
  );
};
