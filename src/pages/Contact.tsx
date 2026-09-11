import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  MessageSquare,
  Building,
  User,
  HelpCircle,
} from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { AnimatedSection } from '../components/common/AnimatedSection';
import { getWhatsAppUrl, getTelUrl, getMailtoUrl } from '../utils/formatters';
import { useProperties } from '../context/PropertyContext';

export const Contact: React.FC = () => {
  const { addLead } = useProperties();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    propertyInterest: 'Luxury Villa',
    budgetRange: '₹ 2.5 Cr - ₹ 5 Cr',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setErrorMsg('Please provide your full name and contact phone number.');
      return;
    }

    setLoading(true);

    addLead({
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      propertyInterest: formData.propertyInterest,
      budgetRange: formData.budgetRange,
      message: formData.message,
    });

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 400);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      propertyInterest: 'Luxury Villa',
      budgetRange: '₹ 2.5 Cr - ₹ 5 Cr',
      message: '',
    });
  };

  return (
    <>
      <SEO
        title="Contact Us | Radhe Real Estate Jaipur"
        description="Connect with Radhe Real Estate for private property viewings, commercial lease advisory, and JDA plot acquisitions in Jaipur, Rajasthan."
      />

      <div className="pt-24 sm:pt-28 pb-24 bg-brand-ivory min-h-screen">
        {/* Header Banner */}
        <div className="bg-brand-dark text-brand-ivory py-16 sm:py-20 border-b border-brand-charcoal">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <SectionHeading
              eyebrow="GET IN TOUCH"
              title="Let's Talk Property."
              subtitle="Whether you are acquiring a private residence, seeking commercial acreage, or exploring high-yield investments in Jaipur, our advisory team is at your disposal."
              align="center"
              theme="dark"
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Interactive Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-brand-sand shadow-luxury p-8 sm:p-10">
                {submitted ? (
                  <div className="py-12 text-center space-y-4 animate-fadeIn">
                    <div className="w-16 h-16 bg-brand-gold/15 text-brand-gold rounded-full flex items-center justify-center mx-auto mb-2">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif text-3xl text-brand-dark">
                      Thank You, {formData.fullName}
                    </h3>
                    <p className="text-sm text-brand-stone max-w-md mx-auto leading-relaxed">
                      Your enquiry regarding{' '}
                      <span className="font-semibold text-brand-dark">
                        {formData.propertyInterest}
                      </span>{' '}
                      has been received. A senior partner from Radhe Real Estate will reach out to you within 4 business hours to discuss your requirements.
                    </p>
                    <div className="pt-6">
                      <Button variant="secondary" onClick={handleReset}>
                        Send Another Enquiry
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-8">
                      <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-brand-gold block mb-1">
                        CONFIDENTIAL ENQUIRY
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl text-brand-dark">
                        Request a Consultation
                      </h3>
                      <p className="text-xs text-brand-stone mt-1">
                        Fill out the details below and we will tailor an exclusive portfolio matching your lifestyle or investment goals.
                      </p>
                    </div>

                    {errorMsg && (
                      <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 text-xs">
                        {errorMsg}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5 text-xs sm:text-sm">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-brand-stone font-medium mb-1.5">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-brand-stone absolute left-3.5 top-3.5" />
                          <input
                            type="text"
                            required
                            placeholder="e.g. Vikramaditya Rathore"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 bg-brand-cream/30 border border-brand-sand focus:border-brand-gold focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-brand-stone font-medium mb-1.5">
                            Phone Number *
                          </label>
                          <div className="relative">
                            <Phone className="w-4 h-4 text-brand-stone absolute left-3.5 top-3.5" />
                            <input
                              type="tel"
                              required
                              placeholder="+91 96364 12887"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full pl-10 pr-4 py-3 bg-brand-cream/30 border border-brand-sand focus:border-brand-gold focus:outline-none transition-colors"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-wider text-brand-stone font-medium mb-1.5">
                            Email Address
                          </label>
                          <div className="relative">
                            <Mail className="w-4 h-4 text-brand-stone absolute left-3.5 top-3.5" />
                            <input
                              type="email"
                              placeholder="vikram@example.com"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full pl-10 pr-4 py-3 bg-brand-cream/30 border border-brand-sand focus:border-brand-gold focus:outline-none transition-colors"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-brand-stone font-medium mb-1.5">
                            Property Interest
                          </label>
                          <select
                            value={formData.propertyInterest}
                            onChange={(e) =>
                              setFormData({ ...formData, propertyInterest: e.target.value })
                            }
                            className="w-full px-4 py-3 bg-brand-cream/30 border border-brand-sand focus:border-brand-gold focus:outline-none transition-colors"
                          >
                            <option value="Luxury Villa">Luxury Villa</option>
                            <option value="Sky Penthouse">Sky Penthouse</option>
                            <option value="Premium High-Rise Apartment">Premium Apartment</option>
                            <option value="JDA Approved Plotted Land">JDA Plotted Enclave</option>
                            <option value="Commercial Office Space">Commercial Office</option>
                            <option value="Retail Showroom Space">Retail Space</option>
                            <option value="General Property Advisory">General Consultation</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-wider text-brand-stone font-medium mb-1.5">
                            Estimated Budget
                          </label>
                          <select
                            value={formData.budgetRange}
                            onChange={(e) =>
                              setFormData({ ...formData, budgetRange: e.target.value })
                            }
                            className="w-full px-4 py-3 bg-brand-cream/30 border border-brand-sand focus:border-brand-gold focus:outline-none transition-colors"
                          >
                            <option value="Under ₹ 1.5 Cr">Under ₹ 1.5 Cr</option>
                            <option value="₹ 1.5 Cr - ₹ 3 Cr">₹ 1.5 Cr - ₹ 3 Cr</option>
                            <option value="₹ 3 Cr - ₹ 6 Cr">₹ 3 Cr - ₹ 6 Cr</option>
                            <option value="₹ 6 Cr - ₹ 10 Cr">₹ 6 Cr - ₹ 10 Cr</option>
                            <option value="₹ 10 Cr +">₹ 10 Cr +</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-brand-stone font-medium mb-1.5">
                          Your Requirements / Specific Locations
                        </label>
                        <textarea
                          rows={4}
                          placeholder="Please mention your preferred micro-markets (e.g. Civil Lines, C-Scheme, Jagatpura), timeline to purchase, or any specific architectural preferences..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full p-4 bg-brand-cream/30 border border-brand-sand focus:border-brand-gold focus:outline-none transition-colors resize-none"
                        />
                      </div>

                      <div className="pt-2">
                        <Button
                          type="submit"
                          variant="primary"
                          size="lg"
                          disabled={loading}
                          className="w-full sm:w-auto"
                          icon={<Send className="w-4 h-4" />}
                        >
                          {loading ? 'Submitting...' : 'Send Enquiry'}
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Office Info, WhatsApp Direct & Map Preview */}
            <div className="lg:col-span-5 space-y-6">
              {/* Direct WhatsApp Quick Card */}
              <div className="bg-brand-dark text-brand-ivory p-8 border border-brand-charcoal relative overflow-hidden">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-emerald-600/30 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-brand-gold font-semibold block">
                      INSTANT MESSAGING
                    </span>
                    <h4 className="font-serif text-xl text-white">
                      WhatsApp Property Concierge
                    </h4>
                  </div>
                </div>

                <p className="text-xs text-brand-muted font-light leading-relaxed mb-6">
                  For immediate brochures, location pins, and video walkthroughs, send a quick message directly to our Jaipur client desk.
                </p>

                <a
                  href={getWhatsAppUrl(
                    '+919636412887',
                    'Hello Radhe Real Estate, I am seeking details on current properties available in Jaipur.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs uppercase tracking-wider font-semibold transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Start WhatsApp Chat (+91 96364 12887)</span>
                </a>
              </div>

              {/* Office Information Details */}
              <div className="bg-white border border-brand-sand p-8 space-y-6">
                <h4 className="font-serif text-xl text-brand-dark border-b border-brand-cream pb-4">
                  Office Headquarters
                </h4>

                <div className="space-y-5 text-xs sm:text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0 mt-1" />
                    <div>
                      <span className="font-semibold text-brand-dark block mb-0.5">
                        Office Location
                      </span>
                      <p className="text-brand-stone leading-relaxed">
                        Ground Floor, Landmark Tower, Subhash Marg, C-Scheme, Jaipur, Rajasthan 302001
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-brand-gold flex-shrink-0 mt-1" />
                    <div>
                      <span className="font-semibold text-brand-dark block mb-0.5">
                        Telephone / Contact
                      </span>
                      <a href={getTelUrl('+919636412887')} className="text-brand-stone hover:text-brand-gold-dark">
                        +91 96364 12887
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-brand-gold flex-shrink-0 mt-1" />
                    <div>
                      <span className="font-semibold text-brand-dark block mb-0.5">
                        Email Advisory (Placeholder)
                      </span>
                      <a href={getMailtoUrl('enquiry@radherealestate.placeholder')} className="text-brand-stone hover:text-brand-gold-dark">
                        enquiry@radherealestate.placeholder
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-brand-gold flex-shrink-0 mt-1" />
                    <div>
                      <span className="font-semibold text-brand-dark block mb-0.5">
                        Hours of Operation
                      </span>
                      <p className="text-brand-stone">Monday – Saturday: 10:00 AM – 7:30 PM</p>
                      <p className="text-brand-gold-dark text-xs mt-0.5 font-medium">Sunday: Exclusively by Prior Appointment</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stylized Jaipur Map Preview Mockup */}
              <div className="bg-white border border-brand-sand p-6 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase tracking-widest text-brand-stone font-semibold">
                    C-SCHEME DOWNTOWN JAIPUR
                  </span>
                  <span className="text-[10px] text-brand-gold font-medium">
                    26.9124° N, 75.7873° E
                  </span>
                </div>

                <div className="relative aspect-[16/9] w-full bg-brand-surface overflow-hidden border border-brand-sand flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&auto=format&fit=crop&q=80"
                    alt="Jaipur C-Scheme Map Location Placeholder"
                    className="w-full h-full object-cover filter contrast-125 opacity-40"
                  />
                  <div className="absolute inset-0 bg-brand-dark/40" />

                  <div className="relative z-10 flex flex-col items-center text-center p-4">
                    <div className="w-8 h-8 rounded-full bg-brand-gold text-brand-dark flex items-center justify-center shadow-gold-glow animate-bounce">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="font-serif text-sm font-semibold text-white mt-2 drop-shadow-md">
                      Radhe Real Estate Office
                    </span>
                    <span className="text-[10px] text-brand-ivory/80">Subhash Marg, C-Scheme</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
