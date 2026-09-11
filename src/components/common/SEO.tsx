import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description = 'Radhe Real Estate offers bespoke residential villas, sky penthouses, commercial spaces, and premium plots across Jaipur, Rajasthan.',
}) => {
  useEffect(() => {
    document.title = `${title} | Radhe Real Estate`;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }
  }, [title, description]);

  return null;
};
