import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight, Phone } from 'lucide-react';
import { Button } from '../common/Button';

export const HeroSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative h-screen min-h-[680px] w-full flex items-center justify-center overflow-hidden bg-brand-dark">
      {/* Background Image with Slow Parallax & Scale */}
      <motion.div
        initial={shouldReduceMotion ? { scale: 1 } : { scale: 1.08 }}
        animate={shouldReduceMotion ? { scale: 1 } : { scale: 1 }}
        transition={{ duration: 10, ease: 'easeOut' }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=2000&auto=format&fit=crop&q=85"
          alt="Luxury Architecture in Jaipur by Radhe Real Estate"
          className="w-full h-full object-cover object-center"
        />
        {/* Layered cinematic overlays: vignette + deep charcoal bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-brand-dark/40" />
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16">
        {/* Small Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-3 px-4 py-1.5 border border-brand-gold/40 bg-brand-dark/60 backdrop-blur-md mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-gold">
            RADHE REAL ESTATE • JAIPUR
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-white tracking-tight leading-[1.08] mb-6 drop-shadow-md"
        >
          Find a Place <br className="hidden sm:inline" />
          <span className="italic font-normal gold-gradient-text">Worth Calling Home.</span>
        </motion.h1>

        {/* Supporting Sentence */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base sm:text-lg md:text-xl text-brand-ivory/85 font-light max-w-2xl mx-auto leading-relaxed mb-10 drop-shadow-sm"
        >
          Discover handpicked luxury residences, prime investment corridors, and bespoke architectural living across Jaipur’s most coveted enclaves.
        </motion.p>

        {/* Dual CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            href="/properties"
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Explore Properties
          </Button>
          <Button
            href="/contact"
            variant="secondary"
            size="lg"
            icon={<Phone className="w-4 h-4" />}
            iconPosition="left"
          >
            Talk to Us
          </Button>
        </motion.div>
      </div>

      {/* Subtle Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none text-brand-ivory/60"
      >
        <span className="text-[9px] uppercase tracking-[0.25em] font-light">Scroll to Explore</span>
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-brand-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
};
