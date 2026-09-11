import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, X, ArrowUpDown, SlidersHorizontal, Building2 } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { SectionHeading } from '../components/common/SectionHeading';
import { PropertyCard } from '../components/common/PropertyCard';
import { Button } from '../components/common/Button';
import { AnimatedSection } from '../components/common/AnimatedSection';
import { useProperties } from '../context/PropertyContext';
import { JAIPUR_LOCATIONS, PROPERTY_TYPES } from '../data/properties';
import { SortOption } from '../types/property';

export const Properties: React.FC = () => {
  const { properties } = useProperties();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('All Types');
  const [selectedLocation, setSelectedLocation] = useState<string>('All Locations');
  const [selectedBedrooms, setSelectedBedrooms] = useState<string>('any');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  // Sync initial filters with URL parameters
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);

    const loc = searchParams.get('location');
    if (loc && JAIPUR_LOCATIONS.includes(loc)) setSelectedLocation(loc);

    const type = searchParams.get('type');
    if (type && PROPERTY_TYPES.includes(type)) setSelectedType(type);
  }, [searchParams]);

  // Quick Category Buttons
  const categoryTabs = [
    { label: 'All Portfolio', value: 'all' },
    { label: 'Residential', value: 'residential' },
    { label: 'Commercial', value: 'commercial' },
    { label: 'Plots / Land', value: 'plots' },
    { label: 'Investment', value: 'investment' },
  ];

  // Filtering Logic
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      // Category filter
      if (selectedCategory !== 'all' && prop.category !== selectedCategory) {
        return false;
      }

      // Type filter
      if (selectedType !== 'All Types' && prop.type !== selectedType) {
        return false;
      }

      // Location filter
      if (selectedLocation !== 'All Locations' && prop.location !== selectedLocation) {
        return false;
      }

      // Bedrooms filter
      if (selectedBedrooms !== 'any') {
        const requiredBeds = parseInt(selectedBedrooms, 10);
        if (requiredBeds === 5) {
          if (!prop.bedrooms || prop.bedrooms < 5) return false;
        } else {
          if (prop.bedrooms !== requiredBeds) return false;
        }
      }

      // Status filter
      if (selectedStatus !== 'all' && prop.status !== selectedStatus) {
        return false;
      }

      // Keyword Search (title, location, address, description)
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const matchesTitle = prop.title.toLowerCase().includes(query);
        const matchesLoc = prop.location.toLowerCase().includes(query);
        const matchesAddr = prop.address.toLowerCase().includes(query);
        const matchesType = prop.type.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLoc && !matchesAddr && !matchesType) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'area-desc') return b.areaSqFt - a.areaSqFt;
      if (sortBy === 'newest') return b.id.localeCompare(a.id);
      // default: featured first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [
    selectedCategory,
    selectedType,
    selectedLocation,
    selectedBedrooms,
    selectedStatus,
    searchTerm,
    sortBy,
  ]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedType('All Types');
    setSelectedLocation('All Locations');
    setSelectedBedrooms('any');
    setSelectedStatus('all');
    setSearchTerm('');
    setSortBy('featured');
    setSearchParams({});
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedType !== 'All Types' ||
    selectedLocation !== 'All Locations' ||
    selectedBedrooms !== 'any' ||
    selectedStatus !== 'all' ||
    searchTerm.trim() !== '';

  return (
    <>
      <SEO
        title="Explore Properties | Radhe Real Estate Jaipur"
        description="Search vetted luxury villas, penthouses, commercial spaces, and residential plots in Jaipur. Filter by C-Scheme, Civil Lines, Vaishali Nagar, and Jagatpura."
      />

      <div className="pt-24 sm:pt-28 pb-20 bg-brand-ivory min-h-screen">
        {/* Page Header */}
        <div className="bg-brand-dark text-brand-ivory py-16 sm:py-20 border-b border-brand-charcoal">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="PREMIER JAIPUR PORTFOLIO"
              title="Explore Properties"
              subtitle="Discover curated architectural residences, prime residential enclaves, and trophy commercial investments across Jaipur."
              align="center"
              theme="dark"
            />

            {/* Quick Category Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-10">
              {categoryTabs.map((tab) => {
                const isActive = selectedCategory === tab.value;
                return (
                  <button
                    key={tab.value}
                    onClick={() => {
                      setSelectedCategory(tab.value);
                      if (tab.value === 'all') {
                        searchParams.delete('category');
                        setSearchParams(searchParams);
                      } else {
                        setSearchParams({ ...Object.fromEntries(searchParams), category: tab.value });
                      }
                    }}
                    className={`px-5 py-2.5 text-xs font-medium uppercase tracking-widest transition-all duration-300 border ${
                      isActive
                        ? 'bg-brand-gold text-brand-dark border-brand-gold font-semibold shadow-gold-glow'
                        : 'bg-brand-surface text-brand-ivory/80 border-white/10 hover:border-brand-gold/50 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Filter Bar & Search Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <div className="bg-white border border-brand-sand shadow-luxury p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Keyword Search Input */}
              <div className="md:col-span-4 relative">
                <Search className="w-4 h-4 text-brand-stone absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Search by locality, project name or keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-brand-cream/40 border border-brand-sand focus:border-brand-gold focus:outline-none text-xs sm:text-sm text-brand-dark transition-colors"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-3 text-brand-stone hover:text-brand-dark"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Location Select */}
              <div className="md:col-span-3">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2.5 bg-brand-cream/40 border border-brand-sand focus:border-brand-gold focus:outline-none text-xs sm:text-sm text-brand-dark transition-colors"
                >
                  {JAIPUR_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Property Type Select */}
              <div className="md:col-span-3">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2.5 bg-brand-cream/40 border border-brand-sand focus:border-brand-gold focus:outline-none text-xs sm:text-sm text-brand-dark transition-colors"
                >
                  {PROPERTY_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Toggle More Filters */}
              <div className="md:col-span-2 flex items-center justify-end gap-2">
                <button
                  onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                  className={`w-full py-2.5 px-3 flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-medium border transition-colors ${
                    isFilterPanelOpen || selectedBedrooms !== 'any' || selectedStatus !== 'all'
                      ? 'bg-brand-dark text-brand-gold border-brand-dark'
                      : 'bg-white text-brand-dark border-brand-sand hover:border-brand-gold'
                  }`}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Filters</span>
                </button>
              </div>
            </div>

            {/* Expandable Advanced Filters Drawer */}
            {isFilterPanelOpen && (
              <div className="mt-4 pt-4 border-t border-brand-cream grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 animate-fadeIn text-xs">
                {/* Bedrooms Filter */}
                <div>
                  <label className="block uppercase tracking-wider text-brand-stone font-medium mb-1.5">
                    Bedrooms (BHK)
                  </label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {['any', '3', '4', '5', '6'].map((bed) => (
                      <button
                        key={bed}
                        onClick={() => setSelectedBedrooms(bed)}
                        className={`py-1.5 text-center border font-medium uppercase tracking-wider transition-colors ${
                          selectedBedrooms === bed
                            ? 'bg-brand-gold text-brand-dark border-brand-gold'
                            : 'bg-white text-brand-stone border-brand-sand hover:border-brand-gold'
                        }`}
                      >
                        {bed === 'any' ? 'Any' : `${bed} BHK`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Construction Status */}
                <div>
                  <label className="block uppercase tracking-wider text-brand-stone font-medium mb-1.5">
                    Possession Status
                  </label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-3 py-2 bg-brand-cream/40 border border-brand-sand focus:border-brand-gold focus:outline-none"
                  >
                    <option value="all">All Statuses</option>
                    <option value="Ready to Move">Ready to Move</option>
                    <option value="Under Construction">Under Construction</option>
                  </select>
                </div>

                {/* Reset Filters */}
                <div className="flex items-end justify-end">
                  <button
                    onClick={resetFilters}
                    className="py-2 px-4 text-brand-stone hover:text-brand-dark uppercase tracking-wider font-medium text-xs flex items-center gap-1.5"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Reset All Filters</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Metadata & Sort Controls */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-sand/60">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-brand-dark">
                Showing {filteredProperties.length} Properties
              </span>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-brand-gold-dark hover:underline flex items-center gap-1"
                >
                  Clear all filters
                </button>
              )}
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-brand-stone" />
              <span className="text-xs text-brand-stone font-medium uppercase tracking-wider">
                Sort By:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-1.5 bg-white border border-brand-sand focus:border-brand-gold focus:outline-none text-xs text-brand-dark font-medium"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="area-desc">Area: Largest First</option>
                <option value="newest">Newly Listed</option>
              </select>
            </div>
          </div>

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 pt-4">
              <span className="text-[11px] uppercase tracking-wider text-brand-stone font-medium">
                Active:
              </span>
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-brand-cream border border-brand-sand text-brand-dark">
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory('all')}>
                    <X className="w-3 h-3 text-brand-stone hover:text-brand-dark" />
                  </button>
                </span>
              )}
              {selectedLocation !== 'All Locations' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-brand-cream border border-brand-sand text-brand-dark">
                  Location: {selectedLocation}
                  <button onClick={() => setSelectedLocation('All Locations')}>
                    <X className="w-3 h-3 text-brand-stone hover:text-brand-dark" />
                  </button>
                </span>
              )}
              {selectedType !== 'All Types' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-brand-cream border border-brand-sand text-brand-dark">
                  Type: {selectedType}
                  <button onClick={() => setSelectedType('All Types')}>
                    <X className="w-3 h-3 text-brand-stone hover:text-brand-dark" />
                  </button>
                </span>
              )}
              {selectedBedrooms !== 'any' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-brand-cream border border-brand-sand text-brand-dark">
                  {selectedBedrooms} BHK
                  <button onClick={() => setSelectedBedrooms('any')}>
                    <X className="w-3 h-3 text-brand-stone hover:text-brand-dark" />
                  </button>
                </span>
              )}
              {searchTerm && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-brand-cream border border-brand-sand text-brand-dark">
                  "{searchTerm}"
                  <button onClick={() => setSearchTerm('')}>
                    <X className="w-3 h-3 text-brand-stone hover:text-brand-dark" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Properties Grid */}
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {filteredProperties.map((property, idx) => (
                <AnimatedSection key={property.id} delay={idx * 0.07}>
                  <PropertyCard property={property} className="h-full" />
                </AnimatedSection>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="py-20 text-center bg-white border border-brand-sand/70 p-12 mt-8">
              <Building2 className="w-12 h-12 text-brand-gold mx-auto mb-4" />
              <h3 className="font-serif text-2xl text-brand-dark mb-2">
                No Matching Properties Found
              </h3>
              <p className="text-sm text-brand-stone max-w-md mx-auto mb-6">
                We could not find any properties matching your current filter criteria. Try broadening your location, category, or search keywords.
              </p>
              <Button variant="secondary" onClick={resetFilters}>
                Reset All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
