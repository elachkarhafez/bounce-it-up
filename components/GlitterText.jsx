'use client';

import { motion } from 'framer-motion';

export default function GlitterText({ children, delay = 0 }) {
  // Create array of characters for staggered animation
  const characters = children.split('');

  return (
    <motion.span
      className="inline-block relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay }}
    >
      {/* Glitter shimmer layer */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent blur-sm"
        initial={{ opacity: 0, x: '-100%' }}
        animate={{ opacity: [0, 1, 0], x: ['100%', '-100%'] }}
        transition={{
          duration: 1.2,
          delay: delay + 0.2,
          ease: 'easeInOut',
        }}
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Text with glitter */}
      <motion.span
        className="relative inline-block"
        initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {/* Main text */}
        {children}

        {/* Glitter particles */}
        <svg
          className="absolute inset-0 pointer-events-none"
          width="100%"
          height="100%"
          style={{ overflow: 'visible' }}
        >
          {characters.map((_, i) => (
            <motion.circle
              key={`glitter-${i}`}
              cx={`${(i / characters.length) * 100}%`}
              cy="50%"
              r={Math.random() * 1.5 + 0.5}
              fill="currentColor"
              opacity={0.6}
              initial={{
                opacity: 0,
                scale: 0,
                y: Math.random() * 20 - 10,
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: [0, 1, 0.8, 0],
                y: [Math.random() * 20 - 10, -20, -40],
              }}
              transition={{
                duration: 1.4,
                delay: delay + 0.3 + (i * 0.05),
                ease: 'easeOut',
              }}
            />
          ))}
        </svg>
      </motion.span>
    </motion.span>
  );
}
