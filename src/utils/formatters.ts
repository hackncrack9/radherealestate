/**
 * Utility functions for currency, area, and link formatting
 */

export function formatIndianCurrency(amount: number): string {
  if (amount >= 10000000) {
    const cr = amount / 10000000;
    return `₹ ${cr.toFixed(2).replace(/\.00$/, '')} Cr`;
  }
  if (amount >= 100000) {
    const lakh = amount / 100000;
    return `₹ ${lakh.toFixed(2).replace(/\.00$/, '')} Lakh`;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatArea(sqFt: number): string {
  return `${sqFt.toLocaleString('en-IN')} sq.ft.`;
}

export function getWhatsAppUrl(phonePlaceholder = '+919636412887', text = 'Hello Radhe Real Estate, I am interested in exploring properties in Jaipur.'): string {
  const cleanPhone = phonePlaceholder.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

export function getTelUrl(phonePlaceholder = '+919636412887'): string {
  return `tel:${phonePlaceholder}`;
}

export function getMailtoUrl(emailPlaceholder = 'enquiry@radherealestate.com', subject = 'Property Enquiry - Radhe Real Estate'): string {
  return `mailto:${emailPlaceholder}?subject=${encodeURIComponent(subject)}`;
}
