'use client';

import React from 'react';
import { useLawnchair } from '@/context/LawnchairContext';
import { WALLPAPERS } from '@/lib/wallpapers-data';
import { Sparkles, Moon, Sun, Grid, Check, X, Palette, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export const WallpaperStyle: React.FC = () => {
  const {
    currentWallpaper,
    setWallpaper,
    settings,
    updateSettings,
    closeOverlay,
  } = useLawnchair();

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
          <h2 className="text-[20px] font-display font-bold text-white">Wallpaper & style</h2>
          <p className="text-[12px] text-white/60">Material You dynamic theming</p>
        </div>
        <button
          onClick={closeOverlay}
          className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-white/20"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6 flex-1 overflow-y-auto no-scrollbar pb-6">
        {/* Live Wallpaper Preview Card */}
        <div className="relative w-full h-48 rounded-3xl overflow-hidden shadow-xl border border-white/15">
          <img
            src={currentWallpaper.url}
            alt={currentWallpaper.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
              Active Wallpaper
            </span>
            <span className="text-[16px] font-bold text-white">
              {currentWallpaper.name}
            </span>
          </div>
        </div>

        {/* Wallpaper Picker Swatches */}
        <div>
          <div className="text-[12px] font-bold text-white/60 uppercase tracking-wider mb-2.5">
            Select Wallpaper
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {WALLPAPERS.map((wp) => {
              const isSelected = wp.id === currentWallpaper.id;
              return (
                <motion.button
                  key={wp.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setWallpaper(wp)}
                  className={`relative aspect-[3/4] rounded-2xl overflow-hidden border-2 transition-all ${
                    isSelected ? 'border-emerald-400 scale-[1.03] shadow-lg' : 'border-transparent opacity-80 hover:opacity-100'
                  }`}
                >
                  <img
                    src={wp.thumbnail}
                    alt={wp.name}
                    className="w-full h-full object-cover"
                  />
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div className="absolute bottom-0 inset-x-0 p-1.5 bg-black/60 text-[10px] font-medium truncate text-white">
                    {wp.name.split(' ')[0]}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Monet Dynamic Color Extraction Palette Swatches */}
        <div>
          <div className="text-[12px] font-bold text-white/60 uppercase tracking-wider mb-2.5 flex items-center justify-between">
            <span>Dynamic Colors (Monet)</span>
            <span className="text-emerald-400 text-[11px] font-medium">Auto-Extracted</span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[
              { id: 'p1', color: currentWallpaper.palette.primary, name: 'Primary' },
              { id: 'p2', color: currentWallpaper.palette.secondary, name: 'Secondary' },
              { id: 'p3', color: currentWallpaper.palette.tertiary, name: 'Tertiary' },
              { id: 'p4', color: currentWallpaper.palette.primaryContainer, name: 'Container' },
            ].map((swatch) => (
              <div
                key={swatch.id}
                className="p-2.5 rounded-2xl flex flex-col items-center justify-center gap-1.5 shadow-sm border border-white/10"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
              >
                <div
                  className="w-8 h-8 rounded-full shadow-inner border border-white/20"
                  style={{ backgroundColor: swatch.color }}
                />
                <span className="text-[10.5px] font-medium text-white/70">
                  {swatch.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Controls Toggles */}
        <div className="space-y-3 pt-2">
          {/* Themed Icons Toggle */}
          <div
            onClick={() => updateSettings({ themedIcons: !settings.themedIcons })}
            className="p-3.5 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
            style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--md-primary)', color: 'var(--md-on-primary)' }}
              >
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[14px] font-semibold text-white">Themed icons</div>
                <div className="text-[11.5px] text-white/60">Apply Monet monochrome palette</div>
              </div>
            </div>
            <div
              className={`w-11 h-6 rounded-full transition-colors flex items-center px-0.5 ${
                settings.themedIcons ? 'bg-emerald-500' : 'bg-white/20'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.themedIcons ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </div>
          </div>

          {/* Dark Theme Toggle */}
          <div
            onClick={() => updateSettings({ isDarkMode: !settings.isDarkMode })}
            className="p-3.5 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
            style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--md-primary-container)', color: 'var(--md-on-primary-container)' }}
              >
                {settings.isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </div>
              <div>
                <div className="text-[14px] font-semibold text-white">Dark theme</div>
                <div className="text-[11.5px] text-white/60">Toggle Material dark surface</div>
              </div>
            </div>
            <div
              className={`w-11 h-6 rounded-full transition-colors flex items-center px-0.5 ${
                settings.isDarkMode ? 'bg-emerald-500' : 'bg-white/20'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.isDarkMode ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </div>
          </div>

          {/* App Grid Size Selector */}
          <div
            className="p-3.5 rounded-2xl flex items-center justify-between"
            style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--md-secondary-container)', color: 'var(--md-on-secondary-container)' }}
              >
                <Grid className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[14px] font-semibold text-white">App grid</div>
                <div className="text-[11.5px] text-white/60">Desktop columns & density</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {[4, 5].map((cols) => (
                <button
                  key={cols}
                  onClick={() => updateSettings({ gridColumns: cols })}
                  className={`px-3 py-1.5 rounded-xl text-[12px] font-bold transition-all ${
                    settings.gridColumns === cols
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  {cols}x5
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
