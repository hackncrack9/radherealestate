import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.7,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const getDirectionalOffset = () => {
    switch (direction) {
      case 'up':
        return { y: 35, x: 0 };
      case 'down':
        return { y: -35, x: 0 };
      case 'left':
        return { x: 35, y: 0 };
      case 'right':
        return { x: -35, y: 0 };
      case 'none':
      default:
        return { x: 0, y: 0 };
    }
  };

  const offset = getDirectionalOffset();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
