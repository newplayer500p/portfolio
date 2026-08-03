import React from 'react';
import { motion } from 'framer-motion';

// Transitions Spring réactives et légères
export const springSmooth = {
  type: 'spring',
  stiffness: 260,
  damping: 24,
  mass: 0.5,
};

export const springBouncy = {
  type: 'spring',
  stiffness: 400,
  damping: 22,
  mass: 0.4,
};

export const springGentle = {
  type: 'spring',
  stiffness: 180,
  damping: 20,
};

// Section animée au scroll légère et rapide (sans lag)
export function MotionSection({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{
        ...springSmooth,
        delay: delay / 1000,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Container pour grilles ou éléments en cascade rapide
export function StaggerContainer({ children, className = '', staggerDelay = 0.04, delayChildren = 0 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-20px' }}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delayChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Élément enfant pour StaggerContainer
export function StaggerItem({ children, className = '' }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 12 },
        show: {
          opacity: 1,
          y: 0,
          transition: springSmooth,
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}


// Overlay de Modal animé avec AnimatePresence
export function ModalOverlay({ children, onClick, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
      exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      transition={{ duration: 0.25 }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Contenu de Modal animé
export function ModalContent({ children, onClick, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 15 }}
      transition={springBouncy}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.div>
  );
}
