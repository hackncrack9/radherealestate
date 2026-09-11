import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Image as ImageIcon,
  Video,
  CheckCircle2,
  Sparkles,
  MapPin,
  ExternalLink,
  RotateCcw,
} from 'lucide-react';
import { useProperties } from '../../context/PropertyContext';
import { Property, PropertyCategory, PropertyType, PropertyStatus, Landmark } from '../../types/property';
import { JAIPUR_LOCATIONS, PROPERTY_TYPES } from '../../data/properties';
import { formatIndianCurrency } from '../../utils/formatters';
import { SEO } from '../../components/common/SEO';

const COMMON_AMENITIES_PRESETS = [
  'Private Plunge Pool',
  'Italian Marble Flooring',
  'VRV Air Conditioning',
  'Private Elevator',
  'Triple Covered Parking',
  'Rooftop Stargazing Lounge',
  '100% Power Backup',
  '3-Tier Biometric Security',
  '30,000 sq.ft. Clubhouse',
  'Olympic-Length Swimming Pool',
  'Landscaped Zen Garden',
  'EV Charging Stations',
  'Solar Water Heating',
  'Servant Quarters',
  'Double-Glazed Facade',
  'JDA Approved Scheme',
];

const SAMPLE_PHOTO_PRESETS = [
  { label: 'Modern Rajputana Villa', url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&auto=format&fit=crop&q=80' },
  { label: 'Sky Penthouse Terrace', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&auto=format&fit=crop&q=80' },
  { label: 'Contemporary Duplex', url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&auto=format&fit=crop&q=80' },
  { label: 'Luxury Courtyard Living', url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1600&auto=format&fit=crop&q=80' },
  { label: 'Corporate Glass Tower', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&fit=crop&q=80' },
  { label: 'Green Plotted Township', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&auto=format&fit=crop&q=80' },
];

export const AdminPropertyForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { properties, addProperty, updateProperty, getPropertyById } = useProperties();

  const isEditing = !!id;
  const existingProperty = isEditing ? getPropertyById(id) : undefined;

  // Form State
  const [formData, setFormData] = useState<Partial<Property>>({
    title: '',
    slug: '',
    tagline: '',
    category: 'residential',
    type: 'Luxury Villa',
    price: 35000000,
    priceDisplay: '₹ 3.50 Cr',
    pricePerSqFt: '₹ 10,000 / sq.ft.',
    location: 'Civil Lines',
    address: 'Civil Lines, Jaipur, Rajasthan',
    city: 'Jaipur',
    state: 'Rajasthan',
    areaSqFt: 3500,
    carpetAreaSqFt: 3000,
    bedrooms: 4,
    bathrooms: 4,
    parking: 2,
    facing: 'East Facing (Vastu Compliant)',
    furnishing: 'Semi-Furnished',
    status: 'Ready to Move',
    possessionDate: 'Immediate',
    reraNumber: 'RAJ/P/2024/XXXX (Verified)',
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&auto=format&fit=crop&q=80',
    ],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Sample demo walkthrough link
    editorialNote: 'A bespoke residence crafted for discerning families who prize timeless elegance, generous light, and prime connectivity in Jaipur.',
    description: 'Impeccably detailed architecture featuring double-height formal living rooms, imported marble flooring, custom woodwork, and lush private green terraces.',
    architecturalHighlights: [
      'Double-height formal living salon with grand chandelier framing',
      'Private master suite with dedicated walk-in wardrobe and jacuzzi',
      'Integrated home automation for ambient lighting and temperature control',
    ],
    amenities: [
      'Private Plunge Pool',
      'Italian Marble Flooring',
      'VRV Air Conditioning',
      '100% Power Backup',
      '3-Tier Biometric Security',
    ],
    nearbyLandmarks: [
      { name: 'Civil Lines Metro Station', distance: '800 m', category: 'Metro' },
      { name: 'Jaipur International Airport', distance: '11.5 km', category: 'Airport' },
      { name: 'SMS Multi-Specialty Hospital', distance: '4.2 km', category: 'Hospital' },
    ],
  });

  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [newHighlight, setNewHighlight] = useState('');
  const [newCustomAmenity, setNewCustomAmenity] = useState('');
  const [newLandmark, setNewLandmark] = useState<Landmark>({
    name: '',
    distance: '',
    category: 'Leisure',
  });

  const [toastMessage, setToastMessage] = useState('');

  // Load existing property data if editing
  useEffect(() => {
    if (isEditing && existingProperty) {
      setFormData(existingProperty);
    }
  }, [isEditing, existingProperty]);

  // Auto generate slug from title
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: prev.slug ? prev.slug : generateSlug(val),
    }));
  };

  // Price change updates display
  const handlePriceChange = (amount: number) => {
    const area = formData.areaSqFt || 1;
    const perSqFt = `₹ ${Math.round(amount / area).toLocaleString('en-IN')} / sq.ft.`;
    setFormData((prev) => ({
      ...prev,
      price: amount,
      priceDisplay: formatIndianCurrency(amount),
      pricePerSqFt: perSqFt,
    }));
  };

  const handleAreaChange = (area: number) => {
    const price = formData.price || 0;
    const perSqFt = area > 0 ? `₹ ${Math.round(price / area).toLocaleString('en-IN')} / sq.ft.` : '';
    setFormData((prev) => ({
      ...prev,
      areaSqFt: area,
      pricePerSqFt: perSqFt,
    }));
  };

  // Gallery handlers
  const handleAddGalleryImage = (urlToAdd?: string) => {
    const url = urlToAdd || newGalleryUrl.trim();
    if (!url) return;
    setFormData((prev) => ({
      ...prev,
      gallery: [...(prev.gallery || []), url],
    }));
    setNewGalleryUrl('');
  };

  const handleRemoveGalleryImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      gallery: (prev.gallery || []).filter((_, i) => i !== index),
    }));
  };

  // Highlights handlers
  const handleAddHighlight = () => {
    if (!newHighlight.trim()) return;
    setFormData((prev) => ({
      ...prev,
      architecturalHighlights: [...(prev.architecturalHighlights || []), newHighlight.trim()],
    }));
    setNewHighlight('');
  };

  const handleRemoveHighlight = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      architecturalHighlights: (prev.architecturalHighlights || []).filter((_, i) => i !== idx),
    }));
  };

  // Amenities toggle
  const handleToggleAmenity = (amenity: string) => {
    const current = formData.amenities || [];
    if (current.includes(amenity)) {
      setFormData((prev) => ({
        ...prev,
        amenities: current.filter((a) => a !== amenity),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        amenities: [...current, amenity],
      }));
    }
  };

  const handleAddCustomAmenity = () => {
    if (!newCustomAmenity.trim()) return;
    handleToggleAmenity(newCustomAmenity.trim());
    setNewCustomAmenity('');
  };

  // Landmarks handlers
  const handleAddLandmark = () => {
    if (!newLandmark.name.trim() || !newLandmark.distance.trim()) return;
    setFormData((prev) => ({
      ...prev,
      nearbyLandmarks: [...(prev.nearbyLandmarks || []), { ...newLandmark }],
    }));
    setNewLandmark({ name: '', distance: '', category: 'Leisure' });
  };

  const handleRemoveLandmark = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      nearbyLandmarks: (prev.nearbyLandmarks || []).filter((_, i) => i !== idx),
    }));
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title?.trim()) {
      alert('Please provide a property title.');
      return;
    }

    const payload: Omit<Property, 'id'> = {
      title: formData.title || 'Untitled Property',
      slug: formData.slug || generateSlug(formData.title || 'property'),
      tagline: formData.tagline || '',
      category: formData.category || 'residential',
      type: formData.type || 'Luxury Villa',
      price: Number(formData.price) || 0,
      priceDisplay: formData.priceDisplay || formatIndianCurrency(Number(formData.price) || 0),
      pricePerSqFt: formData.pricePerSqFt || '',
      location: formData.location || 'Civil Lines',
      address: formData.address || '',
      city: formData.city || 'Jaipur',
      state: formData.state || 'Rajasthan',
      areaSqFt: Number(formData.areaSqFt) || 0,
      carpetAreaSqFt: Number(formData.carpetAreaSqFt) || undefined,
      bedrooms: formData.bedrooms ? Number(formData.bedrooms) : undefined,
      bathrooms: formData.bathrooms ? Number(formData.bathrooms) : undefined,
      parking: formData.parking ? Number(formData.parking) : undefined,
      facing: formData.facing || '',
      furnishing: formData.furnishing || 'Unfurnished',
      status: formData.status || 'Ready to Move',
      possessionDate: formData.possessionDate || 'Immediate',
      reraNumber: formData.reraNumber || 'RAJ/P/2024/XXXX (Verified)',
      featured: !!formData.featured,
      heroImage: formData.heroImage || 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&auto=format&fit=crop&q=80',
      gallery: formData.gallery && formData.gallery.length > 0 ? formData.gallery : [formData.heroImage || ''],
      videoUrl: formData.videoUrl || '',
      editorialNote: formData.editorialNote || '',
      description: formData.description || '',
      architecturalHighlights: formData.architecturalHighlights || [],
      amenities: formData.amenities || [],
      nearbyLandmarks: formData.nearbyLandmarks || [],
    };

    if (isEditing && id) {
      updateProperty(id, payload);
      setToastMessage('Property listing updated successfully!');
    } else {
      addProperty(payload);
      setToastMessage('New property created successfully!');
    }

    setTimeout(() => {
      navigate('/admin/properties');
    }, 600);
  };

  return (
    <>
      <SEO title={`${isEditing ? 'Edit Property' : 'Add Property'} | Radhe Real Estate Admin`} />

      <div className="space-y-6 max-w-5xl">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <Link
              to="/admin/properties"
              className="p-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-gold block">
                {isEditing ? 'LISTING EDITOR' : 'NEW LISTING CREATOR'}
              </span>
              <h1 className="font-serif text-2xl text-white">
                {isEditing ? `Edit: ${formData.title}` : 'Add New Property Listing'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/admin/properties')}
              className="px-4 py-2 text-xs uppercase tracking-wider text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-5 py-2.5 bg-brand-gold hover:bg-brand-gold-dark text-brand-dark font-semibold text-xs uppercase tracking-wider flex items-center gap-2 shadow-gold-glow"
            >
              <Save className="w-4 h-4" />
              <span>{isEditing ? 'Save Changes' : 'Publish Property'}</span>
            </button>
          </div>
        </div>

        {toastMessage && (
          <div className="p-3 bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8 text-xs">
          {/* SECTION 1: Basic Information */}
          <div className="bg-[#141A23] border border-slate-800 p-6 space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="font-serif text-base text-white">1. Basic Information & Title</h3>
              <p className="text-[11px] text-slate-400">Headline, category, and pricing parameters</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-8">
                <label className="block uppercase tracking-wider text-slate-400 font-medium mb-1">
                  Property Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. The Haveli Courtyard Villa"
                  className="w-full px-3 py-2 bg-[#0D1219] border border-slate-700 focus:border-brand-gold text-white focus:outline-none"
                />
              </div>

              <div className="md:col-span-4">
                <label className="block uppercase tracking-wider text-slate-400 font-medium mb-1">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="the-haveli-courtyard-villa"
                  className="w-full px-3 py-2 bg-[#0D1219] border border-slate-700 focus:border-brand-gold text-white focus:outline-none"
                />
              </div>

              <div className="md:col-span-12">
                <label className="block uppercase tracking-wider text-slate-400 font-medium mb-1">
                  Editorial Tagline
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="e.g. Modern Rajputana Grandeur Meets Stately Civil Lines Living"
                  className="w-full px-3 py-2 bg-[#0D1219] border border-slate-700 focus:border-brand-gold text-white focus:outline-none"
                />
              </div>

              <div className="md:col-span-6">
                <label className="block uppercase tracking-wider text-slate-400 font-medium mb-1">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as PropertyCategory })}
                  className="w-full px-3 py-2 bg-[#0D1219] border border-slate-700 focus:border-brand-gold text-white focus:outline-none"
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="plots">Plots / Land</option>
                  <option value="investment">Investment Properties</option>
                </select>
              </div>

              <div className="md:col-span-6">
                <label className="block uppercase tracking-wider text-slate-400 font-medium mb-1">
                  Property Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as PropertyType })}
                  className="w-full px-3 py-2 bg-[#0D1219] border border-slate-700 focus:border-brand-gold text-white focus:outline-none"
                >
                  {PROPERTY_TYPES.filter((t) => t !== 'All Types').map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price & Display */}
              <div className="md:col-span-4">
                <label className="block uppercase tracking-wider text-slate-400 font-medium mb-1">
                  Price in INR (₹) *
                </label>
                <input
                  type="number"
                  required
                  value={formData.price || ''}
                  onChange={(e) => handlePriceChange(Number(e.target.value))}
                  placeholder="68500000"
                  className="w-full px-3 py-2 bg-[#0D1219] border border-slate-700 focus:border-brand-gold text-white focus:outline-none"
                />
              </div>

              <div className="md:col-span-4">
                <label className="block uppercase tracking-wider text-slate-400 font-medium mb-1">
                  Formatted Guide Display
                </label>
                <input
                  type="text"
                  value={formData.priceDisplay}
                  onChange={(e) => setFormData({ ...formData, priceDisplay: e.target.value })}
                  placeholder="₹ 6.85 Cr"
                  className="w-full px-3 py-2 bg-[#0D1219] border border-slate-700 focus:border-brand-gold text-brand-gold font-semibold focus:outline-none"
                />
              </div>

              <div className="md:col-span-4">
                <label className="block uppercase tracking-wider text-slate-400 font-medium mb-1">
                  Price Per Sq.Ft.
                </label>
                <input
                  type="text"
                  value={formData.pricePerSqFt}
                  onChange={(e) => setFormData({ ...formData, pricePerSqFt: e.target.value })}
                  placeholder="₹ 14,270 / sq.ft."
                  className="w-full px-3 py-2 bg-[#0D1219] border border-slate-700 focus:border-brand-gold text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: Location & Micro-Market */}
          <div className="bg-[#141A23] border border-slate-800 p-6 space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="font-serif text-base text-white">2. Jaipur Location & Address</h3>
              <p className="text-[11px] text-slate-400">Micro-market neighborhood and full street address</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-5">
                <label className="block uppercase tracking-wider text-slate-400 font-medium mb-1">
                  Jaipur Micro-Market *
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0D1219] border border-slate-700 focus:border-brand-gold text-white focus:outline-none"
                >
                  {JAIPUR_LOCATIONS.filter((l) => l !== 'All Locations').map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-7">
                <label className="block uppercase tracking-wider text-slate-400 font-medium mb-1">
                  Full Street Address *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. Near Raj Bhavan Road, Civil Lines, Jaipur"
                  className="w-full px-3 py-2 bg-[#0D1219] border border-slate-700 focus:border-brand-gold text-white focus:outline-none"
                />
              </div>

              <div className="md:col-span-6">
                <label className="block uppercase tracking-wider text-slate-400 font-medium mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0D1219] border border-slate-700 focus:border-brand-gold text-white focus:outline-none"
                />
              </div>

              <div className="md:col-span-6">
                <label className="block uppercase tracking-wider text-slate-400 font-medium mb-1">
                  RERA Registration ID
                </label>
                <input
                  type="text"
                  value={formData.reraNumber}
                  onChange={(e) => setFormData({ ...formData, reraNumber: e.target.value })}
                  placeholder="RAJ/P/2024/0981 (Verified)"
                  className="w-full px-3 py-2 bg-[#0D1219] border border-slate-700 focus:border-brand-gold text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: Key Specifications */}
          <div className="bg-[#141A23] border border-slate-800 p-6 space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="font-serif text-base text-white">3. Specifications & Measurements</h3>
              <p className="text-[11px] text-slate-400">Areas, room counts, parking, and orientation</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block uppercase tracking-wider text-slate-400 font-medium mb-1">
                  Super Area (sq.ft.) *
                </label>
                <input
                  type="number"
                  required
                  value={formData.areaSqFt || ''}
                  onChange={(e) => handleAreaChange(Number(e.target.value))}
                  placeholder="4800"
                  className="w-full px-3 py-2 bg-[#0D1219] border border-slate-700 focus:border-brand-gold text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-slate-400 font-medium mb-1">
                  Carpet Area (sq.ft.)
                </label>
                <input
                  type="number"
                  value={formData.carpetAreaSqFt || ''}
                  onChange={(e) => setFormData({ ...formData, carpetAreaSqFt: Number(e.target.value) })}
                  placeholder="4100"
                  className="w-full px-3 py-2 bg-[#0D1219] border border-slate-700 focus:border-brand-gold text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-slate-400 font-medium mb-1">
                  Bedrooms (BHK)
                </label>
                <input
                  type="number"
                  value={formData.bedrooms || ''}
                  onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                  placeholder="5"
                  className="w-full px-3 py-2 bg-[#0D1219] border border-slate-700 focus:border-brand-gold text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-slate-400 font-medium mb-1">
                  Bathrooms
                </label>
                <input
                  type="number"
                  value={formData.bathrooms || ''}
                  onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                  placeholder="6"
                  className="w-full px-3 py-2 bg-[#0D1219] border border-slate-700 focus:border-brand-gold text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-slate-400 font-medium mb-1">
                  Covered Parking
                </label>
                <input
                  type="number"
                  value={formData.parking || ''}
                  onChange={(e) => setFormData({ ...formData, parking: Number(e.target.value) })}
                  placeholder="3"
                  className="w-full px-3 py-2 bg-[#0D1219] border border-slate-700 focus:border-brand-gold text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-slate-400 font-medium mb-1">
                  Orientation / Facing
                </label>
                <input
                  type="text"
                  value={formData.facing || ''}
                  onChange={(e) => setFormData({ ...formData, facing: e.target.value })}
                  placeholder="East Facing (Vastu Compliant)"
                  className="w-full px-3 py-2 bg-[#0D1219] border border-slate-700 focus:border-brand-gold text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-slate-400 font-medium mb-1">
                  Furnishing
                </label>
                <select
                  value={formData.furnishing}
                  onChange={(e) => setFormData({ ...formData, furnishing: e.target.value as any })}
                  className="w-full px-3 py-2 bg-[#0D1219] border border-slate-700 focus:border-brand-gold text-white focus:outline-none"
                >
                  <option value="Unfurnished">Unfurnished</option>
                  <option value="Semi-Furnished">Semi-Furnished</option>
                  <option value="Fully Furnished">Fully Furnished</option>
                </select>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-slate-400 font-medium mb-1">
                  Possession
                </label>
                <input
                  type="text"
                  value={formData.possessionDate || ''}
                  onChange={(e) => setFormData({ ...formData, possessionDate: e.target.value })}
                  placeholder="Immediate or Dec 2025"
                  className="w-full px-3 py-2 bg-[#0D1219] border border-slate-700 focus:border-brand-gold text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: Media, Photos & Walkthrough Videos */}
          <div className="bg-[#141A23] border border-slate-800 p-6 space-y-5">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="font-serif text-base text-white">4. Photos & Walkthrough Videos</h3>
              <p className="text-[11px] text-slate-400">High-resolution property images and video links</p>
            </div>

            {/* Hero Cover Image */}
            <div>
              <label className="block uppercase tracking-wider text-slate-400 font-medium mb-1">
                Main Hero Cover Photo (URL) *
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  required
                  value={formData.heroImage}
                  onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="flex-1 px-3 py-2 bg-[#0D1219] border border-slate-700 focus:border-brand-gold text-white focus:outline-none"
                />
              </div>
              {formData.heroImage && (
                <div className="mt-2 aspect-[21/9] max-w-sm overflow-hidden border border-slate-700">
                  <img src={formData.heroImage} alt="Hero Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* Video Walkthrough Link */}
            <div>
              <label className="block uppercase tracking-wider text-slate-400 font-medium mb-1 flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-brand-gold" />
                <span>Video Walkthrough URL (YouTube, Vimeo, or MP4)</span>
              </label>
              <input
                type="url"
                value={formData.videoUrl || ''}
                onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-3 py-2 bg-[#0D1219] border border-slate-700 focus:border-brand-gold text-white focus:outline-none"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Leave empty if no video is available. If provided, an interactive video player will appear on the property details page.
              </span>
            </div>

            {/* Multi-Image Gallery Manager */}
            <div>
              <label className="block uppercase tracking-wider text-slate-400 font-medium mb-2">
                Gallery Photos ({formData.gallery?.length || 0})
              </label>

              {/* Add New Gallery Photo */}
              <div className="flex gap-2 mb-3">
                <input
                  type="url"
                  placeholder="Paste Image URL..."
                  value={newGalleryUrl}
                  onChange={(e) => setNewGalleryUrl(e.target.value)}
                  className="flex-1 px-3 py-2 bg-[#0D1219] border border-slate-700 focus:border-brand-gold text-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleAddGalleryImage()}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Photo</span>
                </button>
              </div>

              {/* Quick Preset Photos Selector */}
              <div className="p-3 bg-slate-900/70 border border-slate-800 mb-3">
                <span className="text-[10px] uppercase tracking-widest text-slate-400 block mb-2 font-medium">
                  Quick Add Sample Luxury Photos:
                </span>
                <div className="flex flex-wrap gap-2">
                  {SAMPLE_PHOTO_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => handleAddGalleryImage(preset.url)}
                      className="px-2 py-1 bg-slate-800 hover:bg-brand-gold hover:text-black border border-slate-700 text-[10px] text-slate-300 transition-colors"
                    >
                      + {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gallery Thumbnails Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {formData.gallery?.map((imgUrl, idx) => (
                  <div key={idx} className="relative aspect-video group border border-slate-700 overflow-hidden bg-black">
                    <img src={imgUrl} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryImage(idx)}
                      className="absolute top-1 right-1 p-1 bg-red-600/90 hover:bg-red-600 text-white rounded-none opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 5: Editorial & Descriptions */}
          <div className="bg-[#141A23] border border-slate-800 p-6 space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="font-serif text-base text-white">5. Editorial Story & Highlights</h3>
              <p className="text-[11px] text-slate-400">Curator notes and architectural bullet points</p>
            </div>

            <div>
              <label className="block uppercase tracking-wider text-slate-400 font-medium mb-1">
                Curator's Editorial Perspective
              </label>
              <textarea
                rows={2}
                value={formData.editorialNote}
                onChange={(e) => setFormData({ ...formData, editorialNote: e.target.value })}
                className="w-full p-3 bg-[#0D1219] border border-slate-700 focus:border-brand-gold text-white focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider text-slate-400 font-medium mb-1">
                Full Architectural Description
              </label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-3 bg-[#0D1219] border border-slate-700 focus:border-brand-gold text-white focus:outline-none"
              />
            </div>

            {/* Architectural Highlights */}
            <div>
              <label className="block uppercase tracking-wider text-slate-400 font-medium mb-1">
                Design & Spatial Highlights
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="e.g. Double-height formal living salon overlooking private garden"
                  value={newHighlight}
                  onChange={(e) => setNewHighlight(e.target.value)}
                  className="flex-1 px-3 py-2 bg-[#0D1219] border border-slate-700 focus:border-brand-gold text-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddHighlight}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium"
                >
                  Add Bullet
                </button>
              </div>

              <div className="space-y-1.5">
                {formData.architecturalHighlights?.map((h, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-slate-900 border border-slate-800">
                    <span className="text-slate-300">• {h}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveHighlight(idx)}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 6: Amenities Checklist */}
          <div className="bg-[#141A23] border border-slate-800 p-6 space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="font-serif text-base text-white">6. Curated Amenities</h3>
              <p className="text-[11px] text-slate-400">Select luxury features and add bespoke amenities</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {COMMON_AMENITIES_PRESETS.map((amenity) => {
                const isSelected = formData.amenities?.includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => handleToggleAmenity(amenity)}
                    className={`p-2.5 text-left border text-[11px] transition-colors flex items-center justify-between ${
                      isSelected
                        ? 'bg-brand-gold/15 border-brand-gold text-brand-gold font-medium'
                        : 'bg-[#0D1219] border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span>{amenity}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder="Custom Amenity Name..."
                value={newCustomAmenity}
                onChange={(e) => setNewCustomAmenity(e.target.value)}
                className="flex-1 px-3 py-2 bg-[#0D1219] border border-slate-700 focus:border-brand-gold text-white focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddCustomAmenity}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium"
              >
                + Add Custom
              </button>
            </div>
          </div>

          {/* SECTION 7: Nearby Landmarks */}
          <div className="bg-[#141A23] border border-slate-800 p-6 space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="font-serif text-base text-white">7. Location Landmarks & Proximity</h3>
              <p className="text-[11px] text-slate-400">Key connectivity points in Jaipur (Airport, Metro, Hospital)</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
              <input
                type="text"
                placeholder="Landmark Name (e.g. Jaipur Airport)"
                value={newLandmark.name}
                onChange={(e) => setNewLandmark({ ...newLandmark, name: e.target.value })}
                className="sm:col-span-5 px-3 py-2 bg-[#0D1219] border border-slate-700 focus:border-brand-gold text-white focus:outline-none"
              />
              <input
                type="text"
                placeholder="Distance (e.g. 6.5 km)"
                value={newLandmark.distance}
                onChange={(e) => setNewLandmark({ ...newLandmark, distance: e.target.value })}
                className="sm:col-span-3 px-3 py-2 bg-[#0D1219] border border-slate-700 focus:border-brand-gold text-white focus:outline-none"
              />
              <select
                value={newLandmark.category}
                onChange={(e) => setNewLandmark({ ...newLandmark, category: e.target.value as any })}
                className="sm:col-span-3 px-3 py-2 bg-[#0D1219] border border-slate-700 focus:border-brand-gold text-white focus:outline-none"
              >
                <option value="Airport">Airport</option>
                <option value="Metro">Metro</option>
                <option value="Hospital">Hospital</option>
                <option value="Education">Education</option>
                <option value="Leisure">Leisure</option>
                <option value="Business">Business</option>
              </select>
              <button
                type="button"
                onClick={handleAddLandmark}
                className="sm:col-span-1 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium flex items-center justify-center"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {formData.nearbyLandmarks?.map((landmark, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-900 border border-slate-800">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                    <span className="text-white font-medium">{landmark.name}</span>
                    <span className="text-slate-400">({landmark.distance})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveLandmark(idx)}
                    className="text-red-400 hover:text-red-300 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 8: Status & Visibility */}
          <div className="bg-[#141A23] border border-slate-800 p-6 space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="font-serif text-base text-white">8. Listing Status & Visibility</h3>
              <p className="text-[11px] text-slate-400">Control public visibility and featured homepage showcase</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div>
                <label className="block uppercase tracking-wider text-slate-400 font-medium mb-1">
                  Possession Status *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as PropertyStatus })}
                  className="w-full px-3 py-2 bg-[#0D1219] border border-slate-700 focus:border-brand-gold text-white focus:outline-none"
                >
                  <option value="Ready to Move">Ready to Move</option>
                  <option value="Under Construction">Under Construction</option>
                  <option value="Resale">Resale</option>
                  <option value="Newly Launched">Newly Launched</option>
                </select>
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-900 border border-slate-800">
                <input
                  type="checkbox"
                  id="featured-toggle"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 accent-brand-gold"
                />
                <label htmlFor="featured-toggle" className="cursor-pointer">
                  <span className="text-white font-semibold block">Feature on Homepage</span>
                  <span className="text-[10px] text-slate-400 block">
                    Showcase this listing in the curated featured properties section.
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Bottom Submit Bar */}
          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/admin/properties')}
              className="px-4 py-2.5 text-xs uppercase tracking-wider text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-brand-gold hover:bg-brand-gold-dark text-brand-dark font-semibold text-xs uppercase tracking-wider flex items-center gap-2 shadow-gold-glow"
            >
              <Save className="w-4 h-4" />
              <span>{isEditing ? 'Update Property Listing' : 'Publish New Property'}</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
