import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, Phone, Mail, User, Clock } from 'lucide-react';
import { Button } from './Button';
import { useProperties } from '../../context/PropertyContext';

interface ScheduleVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle?: string;
}

export const ScheduleVisitModal: React.FC<ScheduleVisitModalProps> = ({
  isOpen,
  onClose,
  propertyTitle = 'General Property Consultation',
}) => {
  const { addLead } = useProperties();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    preferredDate: '',
    timeSlot: 'Morning (10:00 AM - 1:00 PM)',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    addLead({
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      propertyInterest: propertyTitle,
      preferredDate: formData.preferredDate,
      timeSlot: formData.timeSlot,
      message: formData.message,
    });

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 400);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      preferredDate: '',
      timeSlot: 'Morning (10:00 AM - 1:00 PM)',
      message: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-lg bg-brand-ivory border border-brand-sand shadow-2xl p-6 sm:p-8 overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top gold bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-gold-dark via-brand-gold to-brand-gold-light" />

        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 p-1 text-brand-stone hover:text-brand-dark transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-brand-gold/15 text-brand-gold rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-brand-dark">
              Private Tour Requested
            </h3>
            <p className="text-sm text-brand-stone max-w-sm mx-auto leading-relaxed">
              Thank you, <span className="font-medium text-brand-dark">{formData.fullName}</span>. A senior property concierge from Radhe Real Estate will contact you shortly to confirm your viewing of <span className="font-medium text-brand-dark">{propertyTitle}</span>.
            </p>
            <div className="pt-4">
              <Button variant="secondary" onClick={handleResetAndClose}>
                Close Window
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[10px] font-semibold tracking-[0.25em] text-brand-gold uppercase block mb-1">
                RADHE REAL ESTATE CONCIERGE
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-brand-dark">
                Schedule a Private Visit
              </h3>
              <p className="text-xs text-brand-stone mt-1 line-clamp-1">
                Property: <span className="font-medium text-brand-dark">{propertyTitle}</span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs uppercase tracking-wider text-brand-stone font-medium mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-brand-stone absolute left-3 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya Rathore"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-brand-sand focus:border-brand-gold focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-stone font-medium mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-brand-stone absolute left-3 top-3.5" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 96364 12887"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-brand-sand focus:border-brand-gold focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-stone font-medium mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-brand-stone absolute left-3 top-3.5" />
                    <input
                      type="email"
                      placeholder="vikram@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-brand-sand focus:border-brand-gold focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-stone font-medium mb-1">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-brand-stone absolute left-3 top-3.5" />
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-brand-sand focus:border-brand-gold focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-stone font-medium mb-1">
                    Time Preference
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-brand-stone absolute left-3 top-3.5 pointer-events-none" />
                    <select
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-brand-sand focus:border-brand-gold focus:outline-none transition-colors"
                    >
                      <option>Morning (10:00 AM - 1:00 PM)</option>
                      <option>Afternoon (1:00 PM - 4:00 PM)</option>
                      <option>Evening (4:00 PM - 7:00 PM)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-brand-stone font-medium mb-1">
                  Specific Requirements / Questions
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell us about your timing preferences or specific unit interests..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 bg-white border border-brand-sand focus:border-brand-gold focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2.5 text-xs uppercase tracking-wider text-brand-stone hover:text-brand-dark transition-colors"
                >
                  Cancel
                </button>
                <Button type="submit" variant="primary" disabled={loading}>
                  {loading ? 'Submitting...' : 'Confirm Request'}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
