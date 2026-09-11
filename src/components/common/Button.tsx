import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'dark' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  isExternal?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  isExternal,
  children,
  icon,
  iconPosition = 'right',
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-sans font-medium transition-all duration-300 tracking-wide select-none rounded-none focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2';

  const sizeStyles = {
    sm: 'text-xs uppercase tracking-widest px-4 py-2 gap-1.5',
    md: 'text-xs uppercase tracking-widest px-6 py-3.5 gap-2',
    lg: 'text-sm uppercase tracking-widest px-8 py-4 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-brand-gold text-brand-dark hover:bg-brand-gold-dark hover:text-white shadow-sm hover:shadow-gold-glow active:scale-[0.98]',
    secondary:
      'bg-brand-dark text-brand-ivory hover:bg-brand-surface border border-brand-charcoal hover:border-brand-gold/50 active:scale-[0.98]',
    dark:
      'bg-brand-dark text-brand-gold hover:bg-brand-surface border border-brand-gold/30 hover:border-brand-gold active:scale-[0.98]',
    outline:
      'bg-transparent text-brand-dark border border-brand-dark/30 hover:border-brand-dark hover:bg-brand-dark hover:text-brand-ivory active:scale-[0.98]',
    ghost:
      'bg-transparent text-brand-gold hover:text-brand-gold-dark hover:bg-brand-gold/10 p-0',
  };

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${disabledStyles} ${className}`;

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="transition-transform duration-300 group-hover:-translate-x-0.5">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>}
    </>
  );

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`group ${combinedClasses}`}
        >
          {content}
        </a>
      );
    }
    return (
      <Link to={href} className={`group ${combinedClasses}`}>
        {content}
      </Link>
    );
  }

  return (
    <button className={`group ${combinedClasses}`} disabled={disabled} {...props}>
      {content}
    </button>
  );
};
