import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ArrowUpRight, MessageSquare } from 'lucide-react';
import { getWhatsAppUrl, getTelUrl, getMailtoUrl } from '../../utils/formatters';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-brand-ivory border-t border-brand-charcoal pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          {/* Col 1 & 2: Brand Story & Values */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 border border-brand-gold/70 flex items-center justify-center bg-brand-surface">
                <span className="font-serif font-bold text-xl text-brand-gold">R</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-[0.18em] uppercase text-white leading-none">
                  RADHE
                </span>
                <span className="text-[9px] font-semibold tracking-[0.28em] uppercase text-brand-gold mt-1 leading-none">
                  REAL ESTATE • JAIPUR
                </span>
              </div>
            </Link>

            <p className="text-sm text-brand-muted font-light leading-relaxed max-w-sm">
              Jaipur’s trusted property advisory and brokerage consultancy. Specializing in luxury residential estates, sky penthouses, prime JDA plots, and Grade-A commercial acquisitions across Rajasthan’s royal capital.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={getWhatsAppUrl('+919636412887', 'Hello Radhe Real Estate, I would like to explore luxury properties in Jaipur.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-brand-surface hover:bg-brand-gold/15 border border-brand-charcoal hover:border-brand-gold/40 text-brand-gold text-xs uppercase tracking-wider transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Advisory</span>
              </a>

              <a
                href={getTelUrl('+919636412887')}
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-brand-surface hover:bg-brand-gold/15 border border-brand-charcoal hover:border-brand-gold/40 text-brand-gold text-xs uppercase tracking-wider transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Direct Call</span>
              </a>
            </div>
          </div>

          {/* Col 3: Navigation Links */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-[0.2em] text-brand-gold mb-5">
              Portfolio
            </h4>
            <ul className="space-y-3 text-xs tracking-wider uppercase">
              <li>
                <Link to="/properties" className="text-brand-muted hover:text-white transition-colors">
                  All Properties
                </Link>
              </li>
              <li>
                <Link to="/properties?type=Luxury+Villa" className="text-brand-muted hover:text-white transition-colors">
                  Luxury Villas
                </Link>
              </li>
              <li>
                <Link to="/properties?type=Sky+Penthouse" className="text-brand-muted hover:text-white transition-colors">
                  Sky Penthouses
                </Link>
              </li>
              <li>
                <Link to="/properties?type=Residential+Plot" className="text-brand-muted hover:text-white transition-colors">
                  Plotted Enclaves
                </Link>
              </li>
              <li>
                <Link to="/properties?category=commercial" className="text-brand-muted hover:text-white transition-colors">
                  Commercial Grade-A
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Key Jaipur Micro-Markets */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-[0.2em] text-brand-gold mb-5">
              Jaipur Belts
            </h4>
            <ul className="space-y-3 text-xs tracking-wider uppercase">
              <li>
                <Link to="/properties?location=Civil+Lines" className="text-brand-muted hover:text-white transition-colors">
                  Civil Lines
                </Link>
              </li>
              <li>
                <Link to="/properties?location=C-Scheme" className="text-brand-muted hover:text-white transition-colors">
                  C-Scheme Downtown
                </Link>
              </li>
              <li>
                <Link to="/properties?location=Vaishali+Nagar" className="text-brand-muted hover:text-white transition-colors">
                  Vaishali Nagar
                </Link>
              </li>
              <li>
                <Link to="/properties?location=Jagatpura" className="text-brand-muted hover:text-white transition-colors">
                  Jagatpura Airport Belt
                </Link>
              </li>
              <li>
                <Link to="/properties?location=Tonk+Road" className="text-brand-muted hover:text-white transition-colors">
                  Tonk Road Corridor
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Office Placeholders */}
          <div className="space-y-4 text-xs">
            <h4 className="font-serif text-sm uppercase tracking-[0.2em] text-brand-gold mb-5">
              Jaipur Office
            </h4>

            <div className="flex items-start gap-2.5 text-brand-muted">
              <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Ground Floor, Landmark Tower, Subhash Marg, C-Scheme, Jaipur, Rajasthan 302001 (Placeholder)
              </p>
            </div>

            <div className="flex items-center gap-2.5 text-brand-muted">
              <Phone className="w-4 h-4 text-brand-gold flex-shrink-0" />
              <a href={getTelUrl('+919636412887')} className="hover:text-white transition-colors">
                +91 96364 12887
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-brand-muted">
              <Mail className="w-4 h-4 text-brand-gold flex-shrink-0" />
              <a href={getMailtoUrl('info@radherealestate.placeholder')} className="hover:text-white transition-colors">
                info@radherealestate.placeholder
              </a>
            </div>

            <div className="flex items-start gap-2.5 text-brand-muted pt-1">
              <Clock className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
              <div>
                <p>Mon – Sat: 10:00 AM – 7:30 PM</p>
                <p className="text-[10px] text-brand-gold mt-0.5">Sunday: By Appointment Only</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with RERA Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brand-muted">
          <div className="flex items-center gap-3">
            <p>
              &copy; 2026 Radhe Real Estate. All Rights Reserved. Built for Jaipur, Rajasthan.
            </p>
            <span>•</span>
            <Link to="/admin" className="text-brand-gold hover:underline text-[11px] uppercase tracking-wider">
              Admin Portal
            </Link>
          </div>

          <p className="text-[11px] text-brand-stone max-w-xl text-center md:text-right font-light">
            Notice: All property details, floor measurements, and artistic impressions are sample placeholder representations for Phase 1 architectural showcase and are subject to final RERA verification upon agreement.
          </p>
        </div>
      </div>
    </footer>
  );
};
