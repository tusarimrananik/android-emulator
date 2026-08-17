'use client';

import React from 'react';
import { useLawnchair } from '@/context/LawnchairContext';
import { X, Clock, Sun, Music, BatteryCharging, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const WidgetPicker: React.FC = () => {
  const { closeOverlay, setCurrentPage, settings } = useLawnchair();

  const widgetsList = [
    {
      id: 'clock_digital',
      name: 'Google Clock',
      description: 'Material 3 Digital & Weather pill',
      icon: Clock,
      size: '4x2',
    },
    {
      id: 'spotify',
      name: 'Media Player',
      description: 'Spotify / YT Music controller',
      icon: Music,
      size: '4x2',
    },
    {
      id: 'smartspacer_battery',
      name: 'Battery & Smartspacer',
      description: 'Connected devices & status',
      icon: BatteryCharging,
      size: '2x1',
    },
  ];

  const handleAddWidget = () => {
    setCurrentPage(1);
    closeOverlay();
  };

  return (
    <motion.div
      initial={{ y: '100%', opacity: 0.8 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '100%', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
      className="absolute inset-0 z-50 flex flex-col justify-between overflow-y-auto no-scrollbar select-none text-white px-5 pt-8 pb-4"
      style={{
        backgroundColor: settings.isDarkMode
          ? 'rgba(16, 18, 21, 0.96)'
          : 'rgba(240, 244, 248, 0.98)',
        backdropFilter: 'blur(35px)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between py-2 mb-3">
        <div>
          <h2 className="text-[20px] font-display font-bold text-white">Widgets</h2>
          <p className="text-[12px] text-white/60">Smartspacer & Material 3 widgets</p>
        </div>
        <button
          onClick={closeOverlay}
          className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-white/20"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Widget List */}
      <div className="space-y-3 flex-1 overflow-y-auto no-scrollbar">
        {widgetsList.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddWidget}
              className="p-4 rounded-3xl cursor-pointer flex items-center justify-between shadow-md transition-all hover:bg-white/10"
              style={{
                backgroundColor: settings.isDarkMode ? 'rgba(30, 33, 38, 0.85)' : 'rgba(255, 255, 255, 0.9)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-sm"
                  style={{ backgroundColor: 'var(--md-primary)', color: 'var(--md-on-primary)' }}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-white">{item.name}</h4>
                  <p className="text-[12px] text-white/60">{item.description}</p>
                </div>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/10 text-white/80">
                {item.size}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
