import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PlusCircle,
  Search,
  MapPin,
  Eye,
  Edit,
  Trash2,
  SlidersHorizontal,
  ExternalLink,
  Video,
} from 'lucide-react';
import { useProperties } from '../../context/PropertyContext';
import { JAIPUR_LOCATIONS } from '../../data/properties';
import { SEO } from '../../components/common/SEO';

export const AdminPropertyList: React.FC = () => {
  const { properties, deleteProperty, toggleFeatured } = useProperties();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');

  const filteredProperties = properties.filter((p) => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    if (selectedLocation !== 'All Locations' && p.location !== selectedLocation) return false;
    if (searchTerm.trim() !== '') {
      const q = searchTerm.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchLoc = p.location.toLowerCase().includes(q);
      const matchType = p.type.toLowerCase().includes(q);
      if (!matchTitle && !matchLoc && !matchType) return false;
    }
    return true;
  });

  return (
    <>
      <SEO title="Manage Properties | Radhe Real Estate Admin" />

      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-gold block mb-1">
              PORTFOLIO INVENTORY
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl text-white">
              All Properties ({properties.length})
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Manage, edit specifications, photos, walkthrough videos, and visibility.
            </p>
          </div>

          <Link
            to="/admin/properties/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-gold hover:bg-brand-gold-dark text-brand-dark font-semibold text-xs uppercase tracking-wider transition-all shadow-gold-glow self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Property</span>
          </Link>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#141A23] border border-slate-800 p-4 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center text-xs">
          {/* Search Box */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by title, location, type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#0D1219] border border-slate-700 focus:border-brand-gold focus:outline-none text-white"
            />
          </div>

          {/* Category Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-[#0D1219] border border-slate-700 focus:border-brand-gold focus:outline-none text-white"
            >
              <option value="all">All Categories</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="plots">Plots & Land</option>
              <option value="investment">Investment</option>
            </select>
          </div>

          {/* Location Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-3 py-2 bg-[#0D1219] border border-slate-700 focus:border-brand-gold focus:outline-none text-white"
            >
              {JAIPUR_LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Properties Table */}
        <div className="bg-[#141A23] border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0D1219] text-slate-400 uppercase tracking-wider border-b border-slate-800 text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Listing Details</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Type & Category</th>
                  <th className="py-3.5 px-4">Guide Price</th>
                  <th className="py-3.5 px-4">Media</th>
                  <th className="py-3.5 px-4 text-center">Featured</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredProperties.length > 0 ? (
                  filteredProperties.map((property) => (
                    <tr key={property.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={property.heroImage}
                            alt={property.title}
                            className="w-14 h-12 object-cover border border-slate-700 flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <Link
                              to={`/admin/properties/edit/${property.id}`}
                              className="font-serif text-sm font-medium text-white hover:text-brand-gold transition-colors line-clamp-1"
                            >
                              {property.title}
                            </Link>
                            <p className="text-[11px] text-slate-400 line-clamp-1 font-light">
                              {property.tagline}
                            </p>
                            <span className="inline-block mt-0.5 px-1.5 py-0.2 text-[9px] uppercase bg-slate-900 text-brand-gold border border-slate-800">
                              {property.status}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-slate-300">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                          <span className="font-medium">{property.location}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 block truncate max-w-[150px]">
                          {property.address}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <span className="text-white font-medium block">{property.type}</span>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                          {property.category}
                        </span>
                      </td>

                      <td className="py-4 px-4 font-semibold text-white font-serif text-sm">
                        {property.priceDisplay}
                        <span className="text-[10px] text-slate-400 font-sans block font-normal">
                          {property.pricePerSqFt}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-slate-400">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] bg-slate-900 px-1.5 py-0.5 border border-slate-800">
                            📷 {property.gallery.length} Photos
                          </span>
                          {property.videoUrl && (
                            <span className="text-[10px] bg-red-950/60 text-red-300 border border-red-800/60 px-1.5 py-0.5 flex items-center gap-1">
                              <Video className="w-3 h-3" />
                              Video
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => toggleFeatured(property.id)}
                          className={`px-2 py-1 text-[9px] uppercase tracking-wider font-semibold border ${
                            property.featured
                              ? 'bg-amber-950/60 border-amber-500/60 text-amber-300'
                              : 'bg-slate-900 border-slate-700 text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          {property.featured ? '★ Featured' : 'Standard'}
                        </button>
                      </td>

                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/properties/${property.slug}`}
                            target="_blank"
                            title="View on Live Website"
                            className="p-1.5 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <Link
                            to={`/admin/properties/edit/${property.id}`}
                            title="Edit Listing"
                            className="p-1.5 text-brand-gold hover:text-brand-gold-light bg-slate-900 border border-slate-800 hover:border-brand-gold/50"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to delete "${property.title}"?`)) {
                                deleteProperty(property.id);
                              }
                            }}
                            title="Delete Listing"
                            className="p-1.5 text-red-400 hover:text-red-300 bg-slate-900 border border-slate-800 hover:border-red-500/50"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500">
                      No properties found matching your search or filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
