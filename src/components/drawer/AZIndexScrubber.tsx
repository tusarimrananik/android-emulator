'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AZIndexScrubberProps {
  availableLetters: string[];
  activeLetter: string | null;
  onSelectLetter: (letter: string) => void;
}

export const AZIndexScrubber: React.FC<AZIndexScrubberProps> = ({
  availableLetters,
  activeLetter,
  onSelectLetter,
}) => {
  const [hoveredLetter, setHoveredLetter] = useState<string | null>(null);
  const [bubbleY, setBubbleY] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relativeY = e.clientY - rect.top;
    const itemHeight = rect.height / letters.length;
    const index = Math.min(
      letters.length - 1,
      Math.max(0, Math.floor(relativeY / itemHeight))
    );
    const selected = letters[index];
    setHoveredLetter(selected);
    setBubbleY(index * itemHeight + itemHeight / 2);
    onSelectLetter(selected);
  };

  const handlePointerLeave = () => {
    setHoveredLetter(null);
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerMove}
      onPointerMove={(e) => e.buttons === 1 && handlePointerMove(e)}
      onPointerUp={handlePointerLeave}
      onPointerLeave={handlePointerLeave}
      className="absolute right-1 top-24 bottom-14 w-6 flex flex-col items-center justify-between z-40 select-none py-2 cursor-pointer touch-none"
    >
      {/* Floating Letter Bubble Indicator */}
      <AnimatePresence>
        {hoveredLetter && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, x: 10 }}
            animate={{ opacity: 1, scale: 1, x: -42 }}
            exit={{ opacity: 0, scale: 0.6, x: 10 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="absolute left-0 w-11 h-11 rounded-full flex items-center justify-center font-bold text-lg shadow-xl pointer-events-none"
            style={{
              top: `${bubbleY - 22}px`,
              backgroundColor: 'var(--md-primary)',
              color: 'var(--md-on-primary)',
            }}
          >
            {hoveredLetter}
          </motion.div>
        )}
      </AnimatePresence>

      {/* A-Z Letters */}
      {letters.map((char) => {
        const isAvailable = availableLetters.includes(char);
        const isActive = activeLetter === char || hoveredLetter === char;
        return (
          <span
            key={char}
            className={`text-[8.5px] font-bold leading-none transition-colors ${
              isActive
                ? 'text-white font-extrabold scale-125'
                : isAvailable
                ? 'text-white/70'
                : 'text-white/25'
            }`}
            style={{
              color: isActive ? 'var(--md-primary)' : undefined,
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};
