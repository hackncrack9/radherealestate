export type PropertyCategory = 'residential' | 'commercial' | 'plots' | 'investment';

export type PropertyType =
  | 'Luxury Villa'
  | 'Sky Penthouse'
  | 'Premium Apartment'
  | 'Residential Plot'
  | 'Commercial Office'
  | 'Retail Space';

export type PropertyStatus =
  | 'Ready to Move'
  | 'Under Construction'
  | 'Resale'
  | 'Newly Launched';

export interface Landmark {
  name: string;
  distance: string;
  category: 'Airport' | 'Metro' | 'Hospital' | 'Education' | 'Leisure' | 'Business';
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  category: PropertyCategory;
  type: PropertyType;
  price: number; // in INR
  priceDisplay: string; // e.g. "₹ 4.85 Cr" or "₹ 95 Lakh"
  pricePerSqFt: string;
  location: string; // Micro-market e.g. "C-Scheme", "Civil Lines"
  address: string;
  city: string;
  state: string;
  areaSqFt: number;
  carpetAreaSqFt?: number;
  bedrooms?: number;
  bathrooms?: number;
  parking?: number;
  facing?: string;
  furnishing?: 'Unfurnished' | 'Semi-Furnished' | 'Fully Furnished';
  status: PropertyStatus;
  possessionDate: string;
  reraNumber: string; // RERA ID
  featured: boolean;
  heroImage: string;
  gallery: string[];
  videoUrl?: string; // Optional YouTube/Vimeo/MP4 Walkthrough Video URL
  description: string;
  editorialNote: string;
  architecturalHighlights: string[];
  amenities: string[];
  nearbyLandmarks: Landmark[];
  createdAt?: string;
}

export interface PropertyFilters {
  category: string;
  type: string;
  location: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms: string;
  status: string;
  search: string;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'area-desc' | 'newest';

export interface EnquiryFormData {
  fullName: string;
  phone: string;
  email: string;
  propertyInterest: string;
  budgetRange?: string;
  preferredDate?: string;
  message: string;
}

export interface LeadInquiry {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  propertyInterest: string;
  budgetRange?: string;
  preferredDate?: string;
  timeSlot?: string;
  message?: string;
  status: 'New' | 'Contacted' | 'Closed';
  createdAt: string;
}

export interface AdminUser {
  id: string;
  name: string;
  role: string;
  email: string;
}
