import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  BedDouble,
  Bath,
  Square,
  Car,
  Compass,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageSquare,
  Share2,
  ArrowLeft,
  Clock,
  Sparkles,
  ChevronRight,
  Video,
  Play,
} from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { useProperties } from '../context/PropertyContext';
import { PropertyCard } from '../components/common/PropertyCard';
import { Button } from '../components/common/Button';
import { ScheduleVisitModal } from '../components/common/ScheduleVisitModal';
import { StickyMobileBar } from '../components/layout/StickyMobileBar';
import { formatArea, getWhatsAppUrl, getTelUrl } from '../utils/formatters';

function getEmbedVideoUrl(url?: string): string | null {
  if (!url) return null;
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}`;
  }
  const vimeoMatch = url.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }
  return url;
}

export const PropertyDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { properties, getPropertyBySlug } = useProperties();

  const property = getPropertyBySlug(slug || '');

  // Media view state: 'photos' | 'video'
  const [activeTab, setActiveTab] = useState<'photos' | 'video'>('photos');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!property) {
    return (
      <div className="min-h-screen pt-36 pb-20 bg-brand-ivory text-center px-4">
        <h1 className="font-serif text-3xl text-brand-dark mb-4">Property Not Found</h1>
        <p className="text-sm text-brand-stone max-w-md mx-auto mb-6">
          The requested listing may have been moved, updated, or is currently in private confidential status.
        </p>
        <Button href="/properties" variant="secondary">
          Return to Property Portfolio
        </Button>
      </div>
    );
  }

  const similarProperties = properties.filter(
    (p) => p.id !== property.id && (p.category === property.category || p.location === property.location)
  ).slice(0, 3);

  const videoEmbedUrl = getEmbedVideoUrl(property.videoUrl);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: property.tagline,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <>
      <SEO
        title={`${property.title} | Radhe Real Estate Jaipur`}
        description={property.description?.slice(0, 160) || property.tagline}
      />

      <div className="pt-24 sm:pt-28 pb-24 bg-brand-ivory min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs uppercase tracking-wider text-brand-stone py-4">
            <Link to="/" className="hover:text-brand-dark transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/properties" className="hover:text-brand-dark transition-colors">
              Properties
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-brand-dark font-medium truncate max-w-xs sm:max-w-md">
              {property.title}
            </span>
          </nav>

          {/* Header Title & Price Bar */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 py-6 border-b border-brand-sand">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest bg-brand-dark text-brand-gold">
                  {property.type}
                </span>
                <span className="px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider bg-brand-cream border border-brand-sand text-brand-dark">
                  {property.status}
                </span>
                {property.reraNumber && (
                  <span className="text-xs text-brand-stone flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
                    RERA: {property.reraNumber}
                  </span>
                )}
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-brand-dark leading-tight mb-2">
                {property.title}
              </h1>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-brand-stone">
                <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>{property.address}</span>
              </div>
            </div>

            {/* Price block */}
            <div className="flex flex-col lg:items-end gap-1">
              <span className="text-xs uppercase tracking-widest text-brand-stone font-light">
                Guide Price
              </span>
              <div className="font-serif text-3xl sm:text-4xl font-semibold text-brand-dark">
                {property.priceDisplay}
              </div>
              <span className="text-xs text-brand-stone font-light">
                {property.pricePerSqFt}
              </span>
            </div>
          </div>

          {/* Media Switcher: Photos vs Video Walkthrough */}
          {property.videoUrl && (
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => setActiveTab('photos')}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold border transition-all ${
                  activeTab === 'photos'
                    ? 'bg-brand-dark text-brand-gold border-brand-dark shadow-sm'
                    : 'bg-white text-brand-stone border-brand-sand hover:border-brand-gold'
                }`}
              >
                Photo Gallery ({property.gallery?.length || 0})
              </button>

              <button
                onClick={() => setActiveTab('video')}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold border flex items-center gap-1.5 transition-all ${
                  activeTab === 'video'
                    ? 'bg-brand-gold text-brand-dark border-brand-gold shadow-gold-glow'
                    : 'bg-white text-brand-dark border-brand-sand hover:border-brand-gold'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>Video Walkthrough</span>
              </button>
            </div>
          )}

          {/* Main Media Viewer */}
          <div className="mt-4 space-y-3">
            {activeTab === 'video' && videoEmbedUrl ? (
              /* Video Walkthrough Player */
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-brand-dark shadow-luxury border border-brand-charcoal">
                <iframe
                  src={videoEmbedUrl}
                  title={`${property.title} Video Walkthrough`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            ) : (
              /* Photos Gallery */
              <>
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-brand-dark shadow-luxury">
                  <img
                    src={property.gallery[activeImageIndex] || property.heroImage}
                    alt={`${property.title} - View ${activeImageIndex + 1}`}
                    className="w-full h-full object-cover object-center transition-all duration-700 ease-out"
                  />
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <button
                      onClick={handleShare}
                      className="px-3 py-1.5 bg-brand-dark/80 backdrop-blur-md text-white text-xs uppercase tracking-wider flex items-center gap-1.5 border border-white/20 hover:border-brand-gold transition-colors"
                    >
                      <Share2 className="w-3.5 h-3.5 text-brand-gold" />
                      <span>{copiedLink ? 'Copied Link' : 'Share'}</span>
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 px-3 py-1 bg-brand-dark/80 backdrop-blur-md text-white text-[11px] uppercase tracking-wider border border-white/10">
                    Image {activeImageIndex + 1} of {property.gallery.length}
                  </div>
                </div>

                {/* Thumbnail Strip */}
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                  {property.gallery.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveImageIndex(idx);
                        setActiveTab('photos');
                      }}
                      className={`relative aspect-[16/10] overflow-hidden border-2 transition-all duration-200 ${
                        activeImageIndex === idx && activeTab === 'photos'
                          ? 'border-brand-gold shadow-md'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover object-center"
                      />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Main Content Grid: Specs + Story vs Sticky Enquiry Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-start">
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-12">
              {/* Specifications Card Grid */}
              <div>
                <h3 className="font-serif text-xl sm:text-2xl text-brand-dark mb-6">
                  Key Specifications
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-white border border-brand-sand">
                  {property.bedrooms && (
                    <div className="space-y-1">
                      <span className="text-[11px] uppercase tracking-wider text-brand-stone block">
                        Bedrooms
                      </span>
                      <div className="flex items-center gap-1.5 font-serif text-lg font-medium text-brand-dark">
                        <BedDouble className="w-4 h-4 text-brand-gold" />
                        <span>{property.bedrooms} BHK</span>
                      </div>
                    </div>
                  )}

                  <div className="space-y-1">
                    <span className="text-[11px] uppercase tracking-wider text-brand-stone block">
                      Super Built-up Area
                    </span>
                    <div className="flex items-center gap-1.5 font-serif text-lg font-medium text-brand-dark">
                      <Square className="w-4 h-4 text-brand-gold" />
                      <span>{formatArea(property.areaSqFt)}</span>
                    </div>
                  </div>

                  {property.bathrooms && (
                    <div className="space-y-1">
                      <span className="text-[11px] uppercase tracking-wider text-brand-stone block">
                        Bathrooms
                      </span>
                      <div className="flex items-center gap-1.5 font-serif text-lg font-medium text-brand-dark">
                        <Bath className="w-4 h-4 text-brand-gold" />
                        <span>{property.bathrooms} Baths</span>
                      </div>
                    </div>
                  )}

                  {property.parking && (
                    <div className="space-y-1">
                      <span className="text-[11px] uppercase tracking-wider text-brand-stone block">
                        Car Parking
                      </span>
                      <div className="flex items-center gap-1.5 font-serif text-lg font-medium text-brand-dark">
                        <Car className="w-4 h-4 text-brand-gold" />
                        <span>{property.parking} Reserved</span>
                      </div>
                    </div>
                  )}

                  {property.facing && (
                    <div className="space-y-1">
                      <span className="text-[11px] uppercase tracking-wider text-brand-stone block">
                        Orientation
                      </span>
                      <div className="flex items-center gap-1.5 font-serif text-sm font-medium text-brand-dark">
                        <Compass className="w-4 h-4 text-brand-gold" />
                        <span>{property.facing}</span>
                      </div>
                    </div>
                  )}

                  {property.possessionDate && (
                    <div className="space-y-1">
                      <span className="text-[11px] uppercase tracking-wider text-brand-stone block">
                        Possession
                      </span>
                      <div className="flex items-center gap-1.5 font-serif text-sm font-medium text-brand-dark">
                        <Calendar className="w-4 h-4 text-brand-gold" />
                        <span>{property.possessionDate}</span>
                      </div>
                    </div>
                  )}

                  {property.furnishing && (
                    <div className="space-y-1">
                      <span className="text-[11px] uppercase tracking-wider text-brand-stone block">
                        Furnishing Status
                      </span>
                      <div className="flex items-center gap-1.5 font-serif text-sm font-medium text-brand-dark">
                        <Sparkles className="w-4 h-4 text-brand-gold" />
                        <span>{property.furnishing}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Editorial Curatorial Note */}
              {property.editorialNote && (
                <div className="p-6 sm:p-8 bg-brand-cream/60 border-l-4 border-brand-gold">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-gold-dark block mb-2">
                    CURATOR'S EDITORIAL PERSPECTIVE
                  </span>
                  <p className="font-serif italic text-base sm:text-lg text-brand-dark font-light leading-relaxed">
                    "{property.editorialNote}"
                  </p>
                </div>
              )}

              {/* Overview & Description */}
              <div className="space-y-4">
                <h3 className="font-serif text-2xl text-brand-dark">
                  Architectural Story & Overview
                </h3>
                <p className="text-sm sm:text-base text-brand-stone font-light leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Architectural Highlights */}
              {property.architecturalHighlights && property.architecturalHighlights.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl text-brand-dark">
                    Design & Spatial Highlights
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {property.architecturalHighlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-white border border-brand-sand flex items-start gap-3"
                      >
                        <div className="w-5 h-5 rounded-full bg-brand-gold/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-[10px] font-bold text-brand-gold">{idx + 1}</span>
                        </div>
                        <span className="text-xs sm:text-sm text-brand-dark font-light leading-relaxed">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Amenities List */}
              {property.amenities && property.amenities.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl text-brand-dark">
                    Features & Curated Amenities
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {property.amenities.map((amenity, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 p-3 bg-white border border-brand-sand text-xs font-medium text-brand-dark"
                      >
                        <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Location Highlights & Nearby Landmarks */}
              {property.nearbyLandmarks && property.nearbyLandmarks.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl text-brand-dark">
                    Jaipur Location Connectivity
                  </h3>
                  <p className="text-xs text-brand-stone">
                    Strategic access to airport, major healthcare institutions, business corridors, and transport networks.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {property.nearbyLandmarks.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3.5 bg-white border border-brand-sand text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                          <span className="font-medium text-brand-dark">{item.name}</span>
                        </div>
                        <span className="text-brand-gold-dark font-serif font-semibold">
                          {item.distance}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Desktop Sticky Enquiry Card */}
            <div className="lg:col-span-4 hidden lg:block sticky top-28 space-y-6">
              <div className="bg-white border border-brand-sand shadow-luxury p-6 sm:p-8">
                <div className="mb-6">
                  <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-brand-gold block mb-1">
                    RADHE CONCIERGE DESK
                  </span>
                  <h4 className="font-serif text-2xl text-brand-dark">
                    Arrange a Private Viewing
                  </h4>
                  <p className="text-xs text-brand-stone mt-1 font-light leading-relaxed">
                    Accompanied private tours with Suresh Sharma & Monu Sharma.
                  </p>
                </div>

                <div className="space-y-3">
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full"
                    onClick={() => setIsVisitModalOpen(true)}
                  >
                    Schedule a Visit
                  </Button>

                  <a
                    href={getWhatsAppUrl(
                      '+919636412887',
                      `Hello Radhe Real Estate, I am interested in inquiring about ${property.title} in ${property.location}, Jaipur.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3.5 text-xs uppercase tracking-wider font-medium bg-emerald-700 hover:bg-emerald-800 text-white transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Enquire on WhatsApp</span>
                  </a>

                  <a
                    href={getTelUrl('+919636412887')}
                    className="w-full flex items-center justify-center gap-2 py-3.5 text-xs uppercase tracking-wider font-medium bg-brand-cream hover:bg-brand-sand text-brand-dark border border-brand-sand transition-colors"
                  >
                    <Phone className="w-4 h-4 text-brand-gold" />
                    <span>Call Concierge (+91 96364 12887)</span>
                  </a>
                </div>

                <div className="mt-6 pt-6 border-t border-brand-cream space-y-2 text-[11px] text-brand-stone">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
                    <span>RERA Approved • 100% Clear Title Guarantee</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Response turnaround within 4 business hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Recommended Properties */}
          {similarProperties.length > 0 && (
            <div className="mt-24 pt-16 border-t border-brand-sand">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-brand-gold block mb-1">
                    RECOMMENDED PORTFOLIO
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-brand-dark">
                    Similar Properties in Jaipur
                  </h3>
                </div>
                <Button href="/properties" variant="outline" size="sm">
                  View All Listings
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {similarProperties.map((prop) => (
                  <PropertyCard key={prop.id} property={prop} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sticky Bottom Action Bar */}
      <StickyMobileBar
        propertyTitle={property.title}
        priceDisplay={property.priceDisplay}
        onEnquireClick={() => setIsVisitModalOpen(true)}
      />

      {/* Schedule Visit Modal */}
      <ScheduleVisitModal
        isOpen={isVisitModalOpen}
        onClose={() => setIsVisitModalOpen(false)}
        propertyTitle={property.title}
      />
    </>
  );
};
