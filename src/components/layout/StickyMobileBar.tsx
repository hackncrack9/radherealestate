import React from 'react';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { getWhatsAppUrl, getTelUrl } from '../../utils/formatters';

interface StickyMobileBarProps {
  propertyTitle?: string;
  priceDisplay?: string;
  onEnquireClick: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({
  propertyTitle = 'Jaipur Property',
  priceDisplay,
  onEnquireClick,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-brand-dark/95 backdrop-blur-lg border-t border-brand-charcoal px-4 py-2.5 shadow-2xl">
      <div className="flex items-center justify-between gap-2">
        {priceDisplay && (
          <div className="pr-2 border-r border-white/10 max-w-[90px]">
            <span className="block text-[9px] uppercase tracking-wider text-brand-gold">Guide</span>
            <span className="text-xs font-serif font-bold text-white truncate block">
              {priceDisplay}
            </span>
          </div>
        )}

        <div className="flex-1 flex items-center justify-end gap-2">
          <a
            href={getTelUrl('+919636412887')}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-brand-surface border border-white/10 text-white text-xs uppercase tracking-wider font-medium"
          >
            <Phone className="w-3.5 h-3.5 text-brand-gold" />
            <span>Call</span>
          </a>

          <a
            href={getWhatsAppUrl(
              '+919636412887',
              `Hello Radhe Real Estate, I am interested in inquiring about ${propertyTitle}.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-emerald-700 text-white text-xs uppercase tracking-wider font-medium"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={onEnquireClick}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-brand-gold text-brand-dark text-xs uppercase tracking-wider font-semibold"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Visit</span>
          </button>
        </div>
      </div>
    </div>
  );
};
