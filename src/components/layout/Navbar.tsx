import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ArrowUpRight } from 'lucide-react';
import { Button } from '../common/Button';
import { ScheduleVisitModal } from '../common/ScheduleVisitModal';
import { getWhatsAppUrl, getTelUrl } from '../../utils/formatters';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [enquireModalOpen, setEnquireModalOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  // If on homepage and not scrolled: dark/transparent overlay styling
  // Otherwise: crisp light ivory glassmorphism
  const headerBg = isHome && !isScrolled
    ? 'bg-transparent text-white border-transparent'
    : 'luxury-glass-light text-brand-dark shadow-sm';

  const logoColor = isHome && !isScrolled ? 'text-white' : 'text-brand-dark';
  const logoSubColor = isHome && !isScrolled ? 'text-brand-gold-light' : 'text-brand-gold';
  const linkColor = isHome && !isScrolled
    ? 'text-white/80 hover:text-brand-gold'
    : 'text-brand-dark/80 hover:text-brand-gold-dark';
  const activeLinkColor = isHome && !isScrolled ? 'text-brand-gold font-medium' : 'text-brand-gold-dark font-medium';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${headerBg} py-3.5 sm:py-4`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo / Wordmark */}
            <Link to="/" className="group flex items-center gap-3 focus:outline-none">
              <div className="w-10 h-10 border border-brand-gold/60 flex items-center justify-center bg-brand-dark/80 group-hover:border-brand-gold transition-colors">
                <span className="font-serif font-bold text-lg text-brand-gold tracking-widest">R</span>
              </div>
              <div className="flex flex-col">
                <span className={`font-serif text-lg sm:text-xl font-bold tracking-[0.18em] uppercase ${logoColor} transition-colors leading-none`}>
                  RADHE
                </span>
                <span className={`text-[9px] font-semibold tracking-[0.28em] uppercase ${logoSubColor} mt-1 leading-none`}>
                  REAL ESTATE • JAIPUR
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-xs uppercase tracking-widest font-medium transition-colors relative py-1 ${
                      isActive ? activeLinkColor : linkColor
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-gold rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Desktop CTA */}
            <div className="hidden md:flex items-center space-x-3">
              <a
                href={getTelUrl('+919636412887')}
                className={`flex items-center gap-1.5 text-xs font-medium tracking-wide ${linkColor} transition-colors`}
              >
                <Phone className="w-3.5 h-3.5 text-brand-gold" />
                <span>+91 96364 12887</span>
              </a>
              <Button
                variant={isHome && !isScrolled ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setEnquireModalOpen(true)}
              >
                Enquire Now
              </Button>
              <Link
                to="/admin"
                title="Admin Portal"
                className={`p-2 transition-colors ${
                  isHome && !isScrolled ? 'text-white/60 hover:text-brand-gold' : 'text-brand-stone hover:text-brand-dark'
                }`}
              >
                <span className="text-[11px] uppercase tracking-wider font-semibold border border-current px-2 py-1">Admin</span>
              </Link>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex md:hidden items-center space-x-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className={`p-2 transition-colors ${
                  isHome && !isScrolled ? 'text-white' : 'text-brand-dark'
                }`}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-brand-dark/95 backdrop-blur-xl flex flex-col justify-between p-6 animate-fadeIn text-brand-ivory">
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <Link to="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
              <div className="w-9 h-9 border border-brand-gold/60 flex items-center justify-center bg-brand-dark">
                <span className="font-serif font-bold text-base text-brand-gold">R</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold tracking-widest text-white">
                  RADHE
                </span>
                <span className="text-[8px] font-semibold tracking-widest text-brand-gold">
                  REAL ESTATE
                </span>
              </div>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-white/80 hover:text-white"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col space-y-6 py-8">
            {navLinks.map((link, idx) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-2xl tracking-wide text-brand-ivory hover:text-brand-gold transition-colors flex items-center justify-between border-b border-white/5 pb-3"
              >
                <span>{link.name}</span>
                <span className="text-xs text-brand-gold font-sans font-light">0{idx + 1}</span>
              </Link>
            ))}
          </nav>

          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="text-xs text-white/60 space-y-1">
              <p className="uppercase tracking-widest text-brand-gold text-[10px]">Direct Office Line</p>
              <p className="font-sans text-sm text-white">+91 96364 12887 (Jaipur)</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <a
                href={getWhatsAppUrl('+919636412887', 'Hello Radhe Real Estate, I would like to enquire about properties in Jaipur.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-2.5 text-[11px] uppercase tracking-wider font-medium bg-emerald-700/80 text-white rounded-none border border-emerald-500/30"
              >
                WhatsApp
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setEnquireModalOpen(true);
                }}
                className="w-full text-center py-2.5 text-[11px] uppercase tracking-wider font-medium bg-brand-gold text-brand-dark"
              >
                Enquire
              </button>
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-[11px] uppercase tracking-wider font-medium bg-slate-800 text-slate-300 border border-slate-700"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Global Enquire Modal */}
      <ScheduleVisitModal
        isOpen={enquireModalOpen}
        onClose={() => setEnquireModalOpen(false)}
        propertyTitle="Exclusive Jaipur Portfolio Consultation"
      />
    </>
  );
};
