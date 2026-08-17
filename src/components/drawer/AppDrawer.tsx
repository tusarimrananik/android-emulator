'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLawnchair } from '@/context/LawnchairContext';
import { AppItem } from '@/types/launcher';
import { AppIcon } from '@/components/home/AppIcon';
import { AZIndexScrubber } from '@/components/drawer/AZIndexScrubber';
import { Search, X, Mic, ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AppDrawer: React.FC = () => {
  const {
    apps,
    settings,
    closeOverlay,
    drawerSearchQuery,
    setDrawerSearchQuery,
  } = useLawnchair();

  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter apps based on search query
  const filteredApps = apps
    .filter((a) =>
      a.name.toLowerCase().includes(drawerSearchQuery.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  // Recent apps (top 5 apps)
  const recentApps = apps.slice(0, 5);

  // Group apps by starting letter
  const groupedApps: { [letter: string]: AppItem[] } = {};
  filteredApps.forEach((app) => {
    const firstLetter = app.name[0].toUpperCase();
    if (!groupedApps[firstLetter]) {
      groupedApps[firstLetter] = [];
    }
    groupedApps[firstLetter].push(app);
  });

  const availableLetters = Object.keys(groupedApps);

  const handleSelectLetter = (letter: string) => {
    setActiveLetter(letter);
    const element = document.getElementById(`drawer-letter-${letter}`);
    if (element && scrollContainerRef.current) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    if (settings.drawerSearchAutoKeyboard && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [settings.drawerSearchAutoKeyboard]);

  return (
    <motion.div
      initial={{ y: '100%', opacity: 0.8 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '100%', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
      className="absolute inset-0 z-50 flex flex-col justify-between overflow-hidden select-none"
      style={{
        backgroundColor: settings.isDarkMode
          ? 'rgba(18, 20, 23, 0.94)'
          : 'rgba(245, 247, 250, 0.96)',
        backdropFilter: 'blur(30px)',
      }}
    >
      {/* Top Search Bar */}
      <div className="w-full px-4 pt-10 pb-2 z-10">
        <div
          className="w-full h-13 rounded-full flex items-center px-4 gap-3 shadow-md transition-all"
          style={{
            backgroundColor: settings.isDarkMode
              ? 'rgba(40, 44, 49, 0.9)'
              : 'rgba(255, 255, 255, 0.95)',
            border: settings.isDarkMode
              ? '1px solid rgba(255,255,255,0.08)'
              : '1px solid rgba(0,0,0,0.08)',
          }}
        >
          <Search className="w-5 h-5 text-white/50" />
          <input
            ref={searchInputRef}
            type="text"
            value={drawerSearchQuery}
            onChange={(e) => setDrawerSearchQuery(e.target.value)}
            placeholder="Search apps..."
            className="flex-1 bg-transparent border-none text-[15px] font-medium outline-none text-white placeholder:text-white/40"
          />

          {drawerSearchQuery ? (
            <button
              onClick={() => setDrawerSearchQuery('')}
              className="p-1 rounded-full text-white/60 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setDrawerSearchQuery('Voice: ')}
              className="p-1 rounded-full text-white/60 hover:text-white"
            >
              <Mic className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Apps Scroll Area */}
      <div
        ref={scrollContainerRef}
        className="flex-1 w-full overflow-y-auto px-4 pt-2 pb-16 no-scrollbar"
        style={{ scrollBehavior: 'smooth' }}
      >
        {/* Recent / Suggested Apps Section (if not searching) */}
        {!drawerSearchQuery && settings.showRecentApps && (
          <div className="mb-5">
            <div className="text-[12px] font-semibold text-white/50 uppercase tracking-wider px-2 mb-2">
              Recent Apps
            </div>
            <div
              className="grid gap-y-3 gap-x-1 justify-items-center"
              style={{
                gridTemplateColumns: `repeat(${settings.drawerColumns}, minmax(0, 1fr))`,
              }}
            >
              {recentApps.map((app) => (
                <AppIcon key={`recent-${app.id}`} app={app} size={52} />
              ))}
            </div>
            <div className="w-full h-[1px] bg-white/10 my-4" />
          </div>
        )}

        {/* Alphabetical List */}
        {filteredApps.length === 0 ? (
          <div className="w-full py-16 flex flex-col items-center justify-center text-white/50 gap-2">
            <Search className="w-8 h-8 opacity-40" />
            <p className="text-[14px]">No apps found for "{drawerSearchQuery}"</p>
          </div>
        ) : (
          availableLetters.map((letter) => (
            <div key={letter} id={`drawer-letter-${letter}`} className="mb-4">
              {/* Letter Header */}
              <div
                className="text-[13px] font-bold px-3 py-0.5 sticky top-0 z-20 backdrop-blur-md rounded-lg w-fit"
                style={{
                  color: 'var(--md-primary)',
                  backgroundColor: 'rgba(0,0,0,0.2)',
                }}
              >
                {letter}
              </div>

              {/* Apps in this Letter */}
              <div
                className="grid gap-y-3.5 gap-x-1 justify-items-center mt-2"
                style={{
                  gridTemplateColumns: `repeat(${settings.drawerColumns}, minmax(0, 1fr))`,
                }}
              >
                {groupedApps[letter].map((app) => (
                  <AppIcon key={app.id} app={app} size={52} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* A-Z Vertical Fast-Scroll Scrubber */}
      {settings.showAZIndex && !drawerSearchQuery && (
        <AZIndexScrubber
          availableLetters={availableLetters}
          activeLetter={activeLetter}
          onSelectLetter={handleSelectLetter}
        />
      )}

      {/* Bottom Dismiss Chevron */}
      <div className="w-full flex items-center justify-center pb-2">
        <button
          onClick={closeOverlay}
          className="p-1 rounded-full text-white/40 hover:text-white/80 transition-colors"
        >
          <ArrowDown className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};
