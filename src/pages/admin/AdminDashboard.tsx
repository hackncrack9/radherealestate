import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  TrendingUp,
  Users,
  Sparkles,
  PlusCircle,
  ArrowUpRight,
  MapPin,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react';
import { useProperties } from '../../context/PropertyContext';
import { useAdminAuth } from './AdminAuthContext';
import { formatIndianCurrency } from '../../utils/formatters';
import { SEO } from '../../components/common/SEO';

export const AdminDashboard: React.FC = () => {
  const { user } = useAdminAuth();
  const { properties, leads, deleteProperty, toggleFeatured } = useProperties();

  // Calculations
  const totalValuation = properties.reduce((acc, p) => acc + (p.price || 0), 0);
  const totalFeatured = properties.filter((p) => p.featured).length;
  const newLeads = leads.filter((l) => l.status === 'New').length;

  const categoryCounts = {
    residential: properties.filter((p) => p.category === 'residential').length,
    commercial: properties.filter((p) => p.category === 'commercial').length,
    plots: properties.filter((p) => p.category === 'plots').length,
    investment: properties.filter((p) => p.category === 'investment').length,
  };

  const recentProperties = properties.slice(0, 5);

  return (
    <>
      <SEO title="Admin Dashboard | Radhe Real Estate" />

      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-gold block mb-1">
              WELCOME BACK
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl text-white">
              {user?.name}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Role: <span className="text-brand-gold">{user?.role}</span> • Radhe Real Estate Jaipur Management Console
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/properties/new"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-gold hover:bg-brand-gold-dark text-brand-dark font-semibold text-xs uppercase tracking-wider transition-all shadow-gold-glow"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add New Property</span>
            </Link>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1 */}
          <div className="bg-[#141A23] border border-slate-800 p-5 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                Total Properties
              </span>
              <div className="w-8 h-8 rounded-full bg-brand-gold/15 flex items-center justify-center text-brand-gold">
                <Building2 className="w-4 h-4" />
              </div>
            </div>
            <div className="font-serif text-3xl font-bold text-white mb-1">
              {properties.length}
            </div>
            <p className="text-[11px] text-slate-400">
              Active live listings across Jaipur
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#141A23] border border-slate-800 p-5 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                Portfolio Valuation
              </span>
              <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-400">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="font-serif text-3xl font-bold text-white mb-1">
              {formatIndianCurrency(totalValuation)}
            </div>
            <p className="text-[11px] text-slate-400">
              Combined asset guide value
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#141A23] border border-slate-800 p-5 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                Client Inquiries
              </span>
              <div className="w-8 h-8 rounded-full bg-blue-500/15 flex items-center justify-center text-blue-400">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="font-serif text-3xl font-bold text-white mb-1 flex items-baseline gap-2">
              <span>{leads.length}</span>
              {newLeads > 0 && (
                <span className="text-xs font-sans font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 border border-emerald-800">
                  {newLeads} New
                </span>
              )}
            </div>
            <Link to="/admin/leads" className="text-[11px] text-brand-gold hover:underline">
              View & follow up leads →
            </Link>
          </div>

          {/* Card 4 */}
          <div className="bg-[#141A23] border border-slate-800 p-5 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                Featured Showcases
              </span>
              <div className="w-8 h-8 rounded-full bg-amber-500/15 flex items-center justify-center text-amber-400">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <div className="font-serif text-3xl font-bold text-white mb-1">
              {totalFeatured}
            </div>
            <p className="text-[11px] text-slate-400">
              Highlighted on Homepage
            </p>
          </div>
        </div>

        {/* Category Distribution Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 bg-[#141A23] border border-slate-800/80 text-center">
            <span className="text-[10px] uppercase tracking-widest text-slate-400 block mb-1">Residential</span>
            <span className="font-serif text-2xl font-bold text-brand-gold">{categoryCounts.residential}</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Villas & Penthouses</span>
          </div>

          <div className="p-4 bg-[#141A23] border border-slate-800/80 text-center">
            <span className="text-[10px] uppercase tracking-widest text-slate-400 block mb-1">Commercial</span>
            <span className="font-serif text-2xl font-bold text-brand-gold">{categoryCounts.commercial}</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Offices & Retail</span>
          </div>

          <div className="p-4 bg-[#141A23] border border-slate-800/80 text-center">
            <span className="text-[10px] uppercase tracking-widest text-slate-400 block mb-1">Plots & Land</span>
            <span className="font-serif text-2xl font-bold text-brand-gold">{categoryCounts.plots}</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">JDA Approved</span>
          </div>

          <div className="p-4 bg-[#141A23] border border-slate-800/80 text-center">
            <span className="text-[10px] uppercase tracking-widest text-slate-400 block mb-1">Investment</span>
            <span className="font-serif text-2xl font-bold text-brand-gold">{categoryCounts.investment}</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">High-Yield Assets</span>
          </div>
        </div>

        {/* Recent Listings Management Table */}
        <div className="bg-[#141A23] border border-slate-800 overflow-hidden">
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg text-white">Recent Listings Portfolio</h3>
              <p className="text-xs text-slate-400">Quick view and editing actions for active properties</p>
            </div>
            <Link
              to="/admin/properties"
              className="text-xs uppercase tracking-wider text-brand-gold hover:underline flex items-center gap-1"
            >
              <span>View All ({properties.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0D1219] text-slate-400 uppercase tracking-wider border-b border-slate-800 text-[10px]">
                <tr>
                  <th className="py-3 px-4">Property</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4 text-center">Featured</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {recentProperties.map((property) => (
                  <tr key={property.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={property.heroImage}
                          alt={property.title}
                          className="w-12 h-10 object-cover border border-slate-700 flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-serif text-sm font-medium text-white truncate max-w-xs">
                            {property.title}
                          </p>
                          <span className="text-[10px] text-brand-gold">{property.status}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-300">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-brand-gold flex-shrink-0" />
                        <span className="truncate">{property.location}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-300">
                      {property.type}
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-white font-serif">
                      {property.priceDisplay}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => toggleFeatured(property.id)}
                        className={`px-2 py-0.5 text-[9px] uppercase tracking-wider font-semibold border ${
                          property.featured
                            ? 'bg-amber-950/60 border-amber-500/60 text-amber-300'
                            : 'bg-slate-900 border-slate-700 text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {property.featured ? '★ Featured' : 'Standard'}
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/properties/${property.slug}`}
                          target="_blank"
                          title="View live page"
                          className="p-1.5 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          to={`/admin/properties/edit/${property.id}`}
                          title="Edit listing"
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
                          title="Delete listing"
                          className="p-1.5 text-red-400 hover:text-red-300 bg-slate-900 border border-slate-800 hover:border-red-500/50"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
