import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  theme?: 'light' | 'dark';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  theme = 'light',
  className = '',
}) => {
  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  };

  const isDark = theme === 'dark';

  return (
    <div className={`flex flex-col max-w-3xl ${alignClasses[align]} ${className}`}>
      {eyebrow && (
        <div className="flex items-center gap-2 mb-3">
          <span className="w-8 h-[1px] bg-brand-gold"></span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-gold">
            {eyebrow}
          </span>
          {align === 'center' && <span className="w-8 h-[1px] bg-brand-gold"></span>}
        </div>
      )}

      <h2
        className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.15] tracking-tight mb-4 ${
          isDark ? 'text-brand-ivory' : 'text-brand-dark'
        }`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`text-base sm:text-lg font-light leading-relaxed ${
            isDark ? 'text-brand-muted' : 'text-brand-stone'
          } max-w-2xl`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
