'use client';

import React, { useState, useEffect } from 'react';
import { useLawnchair } from '@/context/LawnchairContext';
import { CloudSun, Calendar, BatteryCharging, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AtAGlance: React.FC = () => {
  const { settings, launchApp } = useLawnchair();
  const [dateStr, setDateStr] = useState<string>('Monday, Aug 17');
  const [temp, setTemp] = useState<number>(24);
  const [isCelsius, setIsCelsius] = useState<boolean>(true);
  const [activeChip, setActiveChip] = useState<number>(0);

  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'short', day: 'numeric' };
    setDateStr(now.toLocaleDateString('en-US', options));
  }, []);

  if (!settings.showAtAGlance) return null;

  return (
    <div className="w-full px-7 pt-5 pb-3 select-none flex flex-col items-start z-10 text-white">
      {/* Date Header */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => launchApp('calendar')}
        className="flex items-center text-left text-white/95 text-[22px] font-display font-medium tracking-tight hover:text-white transition-colors"
        style={{ textShadow: '0 1px 4px rgba(0,0,0,0.45)' }}
      >
        <span>{dateStr}</span>
      </motion.button>

      {/* Info Pills Row (Weather & Smartspacer target) */}
      <div className="flex items-center flex-wrap gap-2.5 mt-2">
        {/* Weather Chip */}
        {settings.atAGlanceWeather && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setTemp((prev) => (isCelsius ? Math.round(prev * 1.8 + 32) : Math.round((prev - 32) / 1.8)));
              setIsCelsius((prev) => !prev);
            }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/25 backdrop-blur-md border border-white/10 hover:bg-black/40 transition-all text-white/90 text-[13px] font-medium shadow-sm"
          >
            <CloudSun className="w-4 h-4 text-amber-300" />
            <span>{temp}°{isCelsius ? 'C' : 'F'}</span>
          </motion.button>
        )}

        {/* Smartspacer Event / Battery Chip */}
        {settings.atAGlanceEvents && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => launchApp('calendar')}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/25 backdrop-blur-md border border-white/10 hover:bg-black/40 transition-all text-white/90 text-[13px] font-medium shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5 text-blue-300" />
            <span className="truncate max-w-[130px]">Lawnchair Sync</span>
          </motion.button>
        )}

        {settings.atAGlanceBattery && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => launchApp('settings')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/25 backdrop-blur-md border border-white/10 hover:bg-black/40 transition-all text-white/90 text-[12px] font-medium shadow-sm"
          >
            <BatteryCharging className="w-3.5 h-3.5 text-emerald-300" />
            <span>88%</span>
          </motion.button>
        )}
      </div>
    </div>
  );
};
