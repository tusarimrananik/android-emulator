'use client';

import React from 'react';
import { useLawnchair } from '@/context/LawnchairContext';
import { motion } from 'framer-motion';

interface NavigationBarProps {
  dark?: boolean;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ dark = false }) => {
  const { goToHome, activeOverlay, runningApp } = useLawnchair();

  return (
    <div className="w-full h-7 flex items-center justify-center relative z-40 select-none pb-1">
      <motion.button
        whileHover={{ scale: 1.1, opacity: 1 }}
        whileTap={{ scale: 0.9, opacity: 0.7 }}
        onClick={goToHome}
        aria-label="Home Navigation Bar"
        className="group relative py-2 px-6 flex items-center justify-center cursor-pointer focus:outline-none"
      >
        <div
          className={`w-28 h-[4px] rounded-full transition-all duration-300 ${
            dark ? 'bg-black/60 group-hover:bg-black/90' : 'bg-white/70 group-hover:bg-white/95'
          } shadow-sm backdrop-blur-sm`}
        />
      </motion.button>
    </div>
  );
};
