import React from 'react';
import { ArrowLeft, Home, Building2 } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Button } from '../components/common/Button';

export const NotFound: React.FC = () => {
  return (
    <>
      <SEO
        title="Page Not Found | Radhe Real Estate"
        description="The requested page could not be located."
      />

      <div className="min-h-screen pt-36 pb-24 bg-brand-ivory flex items-center justify-center px-4">
        <div className="max-w-xl w-full text-center p-8 sm:p-12 bg-white border border-brand-sand shadow-luxury">
          <span className="font-serif text-6xl sm:text-8xl font-light text-brand-gold block mb-4">
            404
          </span>

          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-brand-dark mb-4">
            Address Not Found
          </h1>

          <p className="text-sm text-brand-stone font-light leading-relaxed mb-8 max-w-md mx-auto">
            The destination or listing you are looking for has been relocated, privatized, or is no longer accessible. Let us guide you back to our curated portfolio.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="/"
              variant="primary"
              size="md"
              icon={<Home className="w-4 h-4" />}
              iconPosition="left"
            >
              Return Home
            </Button>
            <Button
              href="/properties"
              variant="secondary"
              size="md"
              icon={<Building2 className="w-4 h-4" />}
            >
              Browse Properties
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
