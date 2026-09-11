import React, { useState } from 'react';
import {
  Users,
  Phone,
  MessageSquare,
  Mail,
  Calendar,
  Clock,
  Trash2,
  CheckCircle2,
  Filter,
  Building,
} from 'lucide-react';
import { useProperties } from '../../context/PropertyContext';
import { LeadInquiry } from '../../types/property';
import { getWhatsAppUrl, getTelUrl, getMailtoUrl } from '../../utils/formatters';
import { SEO } from '../../components/common/SEO';

export const AdminLeads: React.FC = () => {
  const { leads, updateLeadStatus, deleteLead } = useProperties();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLeads = leads.filter((lead) => {
    if (filterStatus !== 'all' && lead.status !== filterStatus) return false;
    if (searchTerm.trim() !== '') {
      const q = searchTerm.toLowerCase();
      const matchName = lead.fullName.toLowerCase().includes(q);
      const matchPhone = lead.phone.toLowerCase().includes(q);
      const matchProp = lead.propertyInterest.toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchProp) return false;
    }
    return true;
  });

  const getStatusBadge = (status: LeadInquiry['status']) => {
    switch (status) {
      case 'New':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-600/60 font-semibold';
      case 'Contacted':
        return 'bg-blue-950/80 text-blue-300 border-blue-600/60';
      case 'Closed':
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <>
      <SEO title="Client Inquiries & Leads | Radhe Real Estate Admin" />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-gold block mb-1">
              CLIENT ENGAGEMENT
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl text-white">
              Consultation Inquiries ({leads.length})
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Track incoming property tour requests, consultation forms, and client leads.
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-[#141A23] border border-slate-800 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="w-full sm:w-72">
            <input
              type="text"
              placeholder="Search by client name, phone, property..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 bg-[#0D1219] border border-slate-700 focus:border-brand-gold text-white focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-slate-400 uppercase tracking-wider text-[10px]">Filter Status:</span>
            <div className="flex gap-1">
              {['all', 'New', 'Contacted', 'Closed'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-3 py-1.5 uppercase tracking-wider text-[10px] font-medium border transition-colors ${
                    filterStatus === st
                      ? 'bg-brand-gold text-brand-dark border-brand-gold font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {st === 'all' ? 'All' : st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Inquiries Cards / Table List */}
        <div className="space-y-4">
          {filteredLeads.length > 0 ? (
            filteredLeads.map((lead) => (
              <div
                key={lead.id}
                className="bg-[#141A23] border border-slate-800 p-5 sm:p-6 hover:border-slate-700 transition-colors space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-800/80">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-serif text-lg text-white font-medium">
                        {lead.fullName}
                      </h3>
                      <span
                        className={`px-2 py-0.5 text-[9px] uppercase tracking-wider border ${getStatusBadge(
                          lead.status
                        )}`}
                      >
                        {lead.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                      <span className="text-brand-gold flex items-center gap-1 font-medium">
                        <Building className="w-3.5 h-3.5" />
                        {lead.propertyInterest}
                      </span>
                      {lead.budgetRange && (
                        <span>Budget: <strong className="text-slate-300">{lead.budgetRange}</strong></span>
                      )}
                      <span>
                        Received:{' '}
                        {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Status Dropdown & Delete */}
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <select
                      value={lead.status}
                      onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                      className="px-2.5 py-1.5 bg-[#0D1219] border border-slate-700 text-xs text-brand-gold focus:outline-none"
                    >
                      <option value="New">Status: New</option>
                      <option value="Contacted">Status: Contacted</option>
                      <option value="Closed">Status: Closed</option>
                    </select>

                    <button
                      onClick={() => {
                        if (window.confirm(`Delete inquiry record for ${lead.fullName}?`)) {
                          deleteLead(lead.id);
                        }
                      }}
                      title="Delete Inquiry"
                      className="p-1.5 text-slate-500 hover:text-red-400 bg-slate-900 border border-slate-800"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Tour details & message if present */}
                {(lead.preferredDate || lead.message) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-slate-900/50 p-3.5 border border-slate-800/60">
                    {lead.preferredDate && (
                      <div className="flex items-center gap-3 text-slate-300">
                        <div className="flex items-center gap-1 text-brand-gold">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Tour Date: {lead.preferredDate}</span>
                        </div>
                        {lead.timeSlot && (
                          <div className="flex items-center gap-1 text-slate-400">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{lead.timeSlot}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {lead.message && (
                      <div className="text-slate-300 italic">
                        "{lead.message}"
                      </div>
                    )}
                  </div>
                )}

                {/* Quick Action Contact Bar */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href={getWhatsAppUrl(
                      lead.phone,
                      `Hello ${lead.fullName}, thank you for reaching out to Radhe Real Estate regarding ${lead.propertyInterest}. We would be delighted to assist you.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white text-xs uppercase tracking-wider font-medium"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp ({lead.phone})</span>
                  </a>

                  <a
                    href={getTelUrl(lead.phone)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs uppercase tracking-wider font-medium"
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Call Client</span>
                  </a>

                  {lead.email && (
                    <a
                      href={getMailtoUrl(
                        lead.email,
                        `Radhe Real Estate - Follow-up regarding ${lead.propertyInterest}`
                      )}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs uppercase tracking-wider font-medium"
                    >
                      <Mail className="w-3.5 h-3.5 text-brand-gold" />
                      <span>{lead.email}</span>
                    </a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-[#141A23] border border-slate-800 p-12 text-center text-slate-500 text-xs">
              <Users className="w-8 h-8 text-slate-600 mx-auto mb-3" />
              <p>No client inquiries found matching your current filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
