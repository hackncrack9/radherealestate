import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, BedDouble, Bath, Square, ArrowUpRight } from 'lucide-react';
import { Property } from '../../types/property';
import { formatArea } from '../../utils/formatters';

interface PropertyCardProps {
  property: Property;
  className?: string;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, className = '' }) => {
  return (
    <article
      className={`property-card-animated group relative flex flex-col bg-white border border-brand-sand/70 hover:border-brand-gold/60 transition-all duration-500 hover:shadow-luxury-hover overflow-hidden ${className}`}
    >
      {/* Image Container with Zoom & Badges */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-cream">
        <img
          src={property.heroImage}
          alt={property.title}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Ambient Dark Gradient for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-black/20 opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase bg-brand-dark/90 text-brand-gold backdrop-blur-md border border-brand-gold/30">
            {property.type}
          </span>
          <span className="px-2.5 py-1 text-[10px] font-medium tracking-wide uppercase bg-brand-ivory/95 text-brand-dark shadow-sm">
            {property.status}
          </span>
        </div>

        {/* Bottom Price in Image for High Impact */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
          <div>
            <span className="block text-[10px] tracking-widest uppercase text-brand-gold-light/90">
              Guide Price
            </span>
            <div className="text-xl sm:text-2xl font-serif font-semibold tracking-tight text-white drop-shadow-sm">
              {property.priceDisplay}
            </div>
          </div>
          <span className="text-[11px] text-brand-ivory/80 font-light">
            {property.pricePerSqFt}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6 justify-between bg-white">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1.5 text-brand-stone text-xs tracking-wide uppercase mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
            <span className="font-medium truncate">{property.location}, {property.city}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg sm:text-xl font-medium text-brand-dark group-hover:text-brand-gold-dark transition-colors line-clamp-1 mb-2">
            <Link to={`/properties/${property.slug}`}>
              <span className="absolute inset-0 z-10" />
              {property.title}
            </Link>
          </h3>

          {/* Tagline / Subtitle */}
          <p className="text-xs text-brand-stone line-clamp-2 font-light leading-relaxed mb-4">
            {property.tagline}
          </p>

          {/* Specs Row */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-brand-cream text-xs text-brand-stone">
            {property.bedrooms ? (
              <div className="flex items-center gap-1.5">
                <BedDouble className="w-3.5 h-3.5 text-brand-gold" />
                <span>{property.bedrooms} BHK</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <span className="text-brand-gold font-serif">◈</span>
                <span>Commercial</span>
              </div>
            )}

            <div className="flex items-center gap-1.5">
              <Square className="w-3.5 h-3.5 text-brand-gold" />
              <span>{formatArea(property.areaSqFt)}</span>
            </div>

            {property.bathrooms ? (
              <div className="flex items-center gap-1.5">
                <Bath className="w-3.5 h-3.5 text-brand-gold" />
                <span>{property.bathrooms} Baths</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <span className="text-brand-gold font-serif">✓</span>
                <span>RERA Cleared</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer Link & Arrow */}
        <div className="mt-4 pt-2 flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-brand-dark group-hover:text-brand-gold transition-colors">
          <span>View Residence Details</span>
          <div className="w-7 h-7 rounded-full bg-brand-cream group-hover:bg-brand-gold group-hover:text-white flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-0.5">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </article>
  );
};
