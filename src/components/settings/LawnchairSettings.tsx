'use client';

import React, { useState } from 'react';
import { useLawnchair } from '@/context/LawnchairContext';
import { IconShape } from '@/types/launcher';
import { WALLPAPERS } from '@/lib/wallpapers-data';
import {
  ArrowLeft,
  Palette,
  Sliders,
  LayoutGrid,
  Search,
  Sparkles,
  Smartphone,
  Info,
  ChevronRight,
  Check,
  Moon,
  Sun,
  Shield,
  Layers,
  HelpCircle,
  ExternalLink,
  Github,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type SettingsTab =
  | 'main'
  | 'theme'
  | 'general'
  | 'home_screen'
  | 'dock'
  | 'app_drawer'
  | 'gestures'
  | 'about';

export const LawnchairSettings: React.FC = () => {
  const {
    settings,
    updateSettings,
    closeOverlay,
    currentWallpaper,
    setWallpaper,
  } = useLawnchair();

  const [activeTab, setActiveTab] = useState<SettingsTab>('main');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const shapeOptions: { id: IconShape; label: string }[] = [
    { id: 'circle', label: 'Circle' },
    { id: 'squircle', label: 'Squircle' },
    { id: 'rounded_square', label: 'Rounded Square' },
    { id: 'teardrop', label: 'Teardrop' },
    { id: 'pebble', label: 'Pebble' },
  ];

  const mainCategories = [
    {
      id: 'theme' as SettingsTab,
      title: 'Theme & Colors',
      subtitle: 'Material You, Dark theme, Themed icons, Shapes',
      icon: Palette,
      badge: 'Monet',
    },
    {
      id: 'general' as SettingsTab,
      title: 'General',
      subtitle: 'Icon packs, Icon size, Font family, Labels',
      icon: Sliders,
    },
    {
      id: 'home_screen' as SettingsTab,
      title: 'Home Screen',
      subtitle: 'Grid layout, At a Glance, Smartspacer',
      icon: Smartphone,
    },
    {
      id: 'dock' as SettingsTab,
      title: 'Dock',
      subtitle: 'Dock search bar, Icon count, Background',
      icon: LayoutGrid,
    },
    {
      id: 'app_drawer' as SettingsTab,
      title: 'App Drawer',
      subtitle: 'Columns, Recent apps, A-Z fast scroll index',
      icon: Layers,
    },
    {
      id: 'gestures' as SettingsTab,
      title: 'Gestures',
      subtitle: 'Double tap, Swipe down, Swipe up',
      icon: Zap,
    },
    {
      id: 'about' as SettingsTab,
      title: 'About Lawnchair',
      subtitle: 'Lawnchair 14, Team credits, GitHub repo',
      icon: Info,
      badge: 'v14.0',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
      className="absolute inset-0 z-50 flex flex-col justify-between overflow-hidden select-none bg-[#121417] text-white"
    >
      {/* Top Header */}
      <div className="w-full px-5 pt-8 pb-3 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => (activeTab === 'main' ? closeOverlay() : setActiveTab('main'))}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-[18px] font-display font-bold text-white">
              {activeTab === 'main' ? 'Lawnchair Settings' : mainCategories.find((c) => c.id === activeTab)?.title}
            </h2>
            <p className="text-[11px] text-white/50">Lawnchair 14 · Pixel Launcher Experience</p>
          </div>
        </div>

        {activeTab === 'main' && (
          <div className="w-8 h-8 rounded-full bg-[#00897b] flex items-center justify-center text-white font-bold text-xs shadow-md">
            14
          </div>
        )}
      </div>

      {/* Content Scroll View */}
      <div className="flex-1 w-full overflow-y-auto no-scrollbar p-5 space-y-4">
        {/* ================= MAIN SETTINGS HUB ================= */}
        {activeTab === 'main' && (
          <div className="space-y-3">
            {/* Lawnchair 14 Brand Banner */}
            <div
              className="p-4 rounded-3xl relative overflow-hidden shadow-lg flex items-center justify-between"
              style={{
                backgroundColor: 'var(--md-primary-container)',
                color: 'var(--md-on-primary-container)',
              }}
            >
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider opacity-80">
                  Lawnchair 14
                </span>
                <h3 className="text-[17px] font-bold font-display mt-0.5">
                  Pixel-Perfect Customization
                </h3>
                <p className="text-[12px] opacity-80 mt-1 max-w-[220px]">
                  Customizable launcher inspired by Google Pixel with Material You.
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-black/15 flex items-center justify-center">
                <Sparkles className="w-7 h-7" />
              </div>
            </div>

            {/* Settings Categories List */}
            <div className="space-y-1.5 pt-1">
              {mainCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <motion.button
                    key={cat.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(cat.id)}
                    className="w-full p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 flex items-center justify-between text-left transition-colors border border-white/5"
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: 'var(--md-primary-container)',
                          color: 'var(--md-on-primary-container)',
                        }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[14px] font-semibold text-white flex items-center gap-2">
                          <span>{cat.title}</span>
                          {cat.badge && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                              {cat.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-[11.5px] text-white/55 truncate max-w-[220px]">
                          {cat.subtitle}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/40" />
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= THEME & COLORS ================= */}
        {activeTab === 'theme' && (
          <div className="space-y-4">
            {/* Themed Icons Toggle */}
            <div
              onClick={() => updateSettings({ themedIcons: !settings.themedIcons })}
              className="p-4 rounded-2xl bg-white/5 flex items-center justify-between cursor-pointer hover:bg-white/10"
            >
              <div>
                <div className="text-[14.5px] font-semibold text-white">Themed Icons (Lawnicons)</div>
                <div className="text-[12px] text-white/60">Color icons using Monet system palette</div>
              </div>
              <div className={`w-11 h-6 rounded-full transition-colors flex items-center px-0.5 ${settings.themedIcons ? 'bg-emerald-500' : 'bg-white/20'}`}>
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${settings.themedIcons ? 'translate-x-5' : 'translate-x-0'}`} />
              </div>
            </div>

            {/* Dark Theme Toggle */}
            <div
              onClick={() => updateSettings({ isDarkMode: !settings.isDarkMode })}
              className="p-4 rounded-2xl bg-white/5 flex items-center justify-between cursor-pointer hover:bg-white/10"
            >
              <div>
                <div className="text-[14.5px] font-semibold text-white">Dark Theme</div>
                <div className="text-[12px] text-white/60">Monet dark surface tokens</div>
              </div>
              <div className={`w-11 h-6 rounded-full transition-colors flex items-center px-0.5 ${settings.isDarkMode ? 'bg-emerald-500' : 'bg-white/20'}`}>
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${settings.isDarkMode ? 'translate-x-5' : 'translate-x-0'}`} />
              </div>
            </div>

            {/* Icon Shapes */}
            <div className="p-4 rounded-2xl bg-white/5 space-y-3">
              <div className="text-[14px] font-semibold text-white">Icon Shape</div>
              <div className="grid grid-cols-2 gap-2">
                {shapeOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => updateSettings({ iconShape: opt.id })}
                    className={`p-2.5 rounded-xl text-[12.5px] font-medium flex items-center justify-between border transition-all ${
                      settings.iconShape === opt.id
                        ? 'border-emerald-400 bg-emerald-500/20 text-white'
                        : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {settings.iconShape === opt.id && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= GENERAL ================= */}
        {activeTab === 'general' && (
          <div className="space-y-4">
            {/* Icon Size Slider */}
            <div className="p-4 rounded-2xl bg-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-semibold text-white">Icon Size</span>
                <span className="text-[13px] font-bold text-emerald-400">{settings.iconSizePercent}%</span>
              </div>
              <input
                type="range"
                min="80"
                max="130"
                value={settings.iconSizePercent}
                onChange={(e) => updateSettings({ iconSizePercent: Number(e.target.value) })}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Show Icon Labels Toggle */}
            <div
              onClick={() => updateSettings({ showIconLabels: !settings.showIconLabels })}
              className="p-4 rounded-2xl bg-white/5 flex items-center justify-between cursor-pointer hover:bg-white/10"
            >
              <div>
                <div className="text-[14.5px] font-semibold text-white">Show Icon Labels</div>
                <div className="text-[12px] text-white/60">Display app text under icons</div>
              </div>
              <div className={`w-11 h-6 rounded-full transition-colors flex items-center px-0.5 ${settings.showIconLabels ? 'bg-emerald-500' : 'bg-white/20'}`}>
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${settings.showIconLabels ? 'translate-x-5' : 'translate-x-0'}`} />
              </div>
            </div>

            {/* Font Family */}
            <div className="p-4 rounded-2xl bg-white/5 space-y-2">
              <div className="text-[14px] font-semibold text-white">Font Family</div>
              <div className="flex items-center gap-2">
                {['Google Sans', 'Roboto'].map((f) => (
                  <button
                    key={f}
                    onClick={() => updateSettings({ fontFamily: f as any })}
                    className={`flex-1 py-2 rounded-xl text-[13px] font-bold transition-all ${
                      settings.fontFamily === f ? 'bg-emerald-500 text-white' : 'bg-white/10 text-white/70'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= HOME SCREEN ================= */}
        {activeTab === 'home_screen' && (
          <div className="space-y-4">
            {/* Grid Columns */}
            <div className="p-4 rounded-2xl bg-white/5 flex items-center justify-between">
              <div>
                <div className="text-[14.5px] font-semibold text-white">Grid Columns</div>
                <div className="text-[12px] text-white/60">Number of icons per row</div>
              </div>
              <div className="flex items-center gap-1.5">
                {[4, 5, 6].map((cols) => (
                  <button
                    key={cols}
                    onClick={() => updateSettings({ gridColumns: cols })}
                    className={`px-3 py-1.5 rounded-xl text-[12px] font-bold transition-all ${
                      settings.gridColumns === cols ? 'bg-emerald-500 text-white' : 'bg-white/10 text-white/70'
                    }`}
                  >
                    {cols}
                  </button>
                ))}
              </div>
            </div>

            {/* At a Glance Toggles */}
            <div className="p-4 rounded-2xl bg-white/5 space-y-3">
              <div className="text-[14px] font-semibold text-white">At a Glance / Smartspacer</div>
              {[
                { key: 'showAtAGlance', label: 'Enable At a Glance' },
                { key: 'atAGlanceWeather', label: 'Show Weather Pill' },
                { key: 'atAGlanceEvents', label: 'Show Calendar Events' },
                { key: 'atAGlanceBattery', label: 'Show Battery Level' },
              ].map((item) => (
                <div
                  key={item.key}
                  onClick={() => updateSettings({ [item.key]: !((settings as any)[item.key]) } as any)}
                  className="flex items-center justify-between py-1 cursor-pointer"
                >
                  <span className="text-[13px] text-white/80">{item.label}</span>
                  <div className={`w-9 h-5 rounded-full transition-colors flex items-center px-0.5 ${(settings as any)[item.key] ? 'bg-emerald-500' : 'bg-white/20'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${(settings as any)[item.key] ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= DOCK ================= */}
        {activeTab === 'dock' && (
          <div className="space-y-4">
            {/* Show Dock Search Bar */}
            <div
              onClick={() => updateSettings({ showDockSearchBar: !settings.showDockSearchBar })}
              className="p-4 rounded-2xl bg-white/5 flex items-center justify-between cursor-pointer hover:bg-white/10"
            >
              <div>
                <div className="text-[14.5px] font-semibold text-white">Dock Search Bar</div>
                <div className="text-[12px] text-white/60">Google pill bar with Lens & Voice</div>
              </div>
              <div className={`w-11 h-6 rounded-full transition-colors flex items-center px-0.5 ${settings.showDockSearchBar ? 'bg-emerald-500' : 'bg-white/20'}`}>
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${settings.showDockSearchBar ? 'translate-x-5' : 'translate-x-0'}`} />
              </div>
            </div>

            {/* Dock Icon Count */}
            <div className="p-4 rounded-2xl bg-white/5 flex items-center justify-between">
              <div>
                <div className="text-[14.5px] font-semibold text-white">Dock Icon Count</div>
                <div className="text-[12px] text-white/60">Favorite apps row count</div>
              </div>
              <div className="flex items-center gap-1.5">
                {[4, 5, 6].map((count) => (
                  <button
                    key={count}
                    onClick={() => updateSettings({ dockIconCount: count })}
                    className={`px-3 py-1.5 rounded-xl text-[12px] font-bold transition-all ${
                      settings.dockIconCount === count ? 'bg-emerald-500 text-white' : 'bg-white/10 text-white/70'
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= APP DRAWER ================= */}
        {activeTab === 'app_drawer' && (
          <div className="space-y-4">
            {/* Show Recent Apps */}
            <div
              onClick={() => updateSettings({ showRecentApps: !settings.showRecentApps })}
              className="p-4 rounded-2xl bg-white/5 flex items-center justify-between cursor-pointer hover:bg-white/10"
            >
              <div>
                <div className="text-[14.5px] font-semibold text-white">Recent Apps Row</div>
                <div className="text-[12px] text-white/60">Frequently used apps row at top</div>
              </div>
              <div className={`w-11 h-6 rounded-full transition-colors flex items-center px-0.5 ${settings.showRecentApps ? 'bg-emerald-500' : 'bg-white/20'}`}>
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${settings.showRecentApps ? 'translate-x-5' : 'translate-x-0'}`} />
              </div>
            </div>

            {/* Show A-Z Index Scrubber */}
            <div
              onClick={() => updateSettings({ showAZIndex: !settings.showAZIndex })}
              className="p-4 rounded-2xl bg-white/5 flex items-center justify-between cursor-pointer hover:bg-white/10"
            >
              <div>
                <div className="text-[14.5px] font-semibold text-white">A-Z Fast Scroll Index</div>
                <div className="text-[12px] text-white/60">Alphabet scrubber on right edge</div>
              </div>
              <div className={`w-11 h-6 rounded-full transition-colors flex items-center px-0.5 ${settings.showAZIndex ? 'bg-emerald-500' : 'bg-white/20'}`}>
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${settings.showAZIndex ? 'translate-x-5' : 'translate-x-0'}`} />
              </div>
            </div>
          </div>
        )}

        {/* ================= GESTURES ================= */}
        {activeTab === 'gestures' && (
          <div className="space-y-4">
            <div
              onClick={() => updateSettings({ doubleTapToSleep: !settings.doubleTapToSleep })}
              className="p-4 rounded-2xl bg-white/5 flex items-center justify-between cursor-pointer hover:bg-white/10"
            >
              <div>
                <div className="text-[14.5px] font-semibold text-white">Double Tap to Sleep</div>
                <div className="text-[12px] text-white/60">Lock phone on double tapping desktop</div>
              </div>
              <div className={`w-11 h-6 rounded-full transition-colors flex items-center px-0.5 ${settings.doubleTapToSleep ? 'bg-emerald-500' : 'bg-white/20'}`}>
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${settings.doubleTapToSleep ? 'translate-x-5' : 'translate-x-0'}`} />
              </div>
            </div>
          </div>
        )}

        {/* ================= ABOUT LAWNCHAIR ================= */}
        {activeTab === 'about' && (
          <div className="space-y-4 text-center py-4">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#00897b] to-[#004d40] mx-auto flex items-center justify-center text-white shadow-xl">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-[20px] font-display font-bold text-white">Lawnchair 14</h3>
              <p className="text-[12px] text-white/60 mt-1">Version 14.0.0 (Nightly Build)</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 text-left text-[13px] text-white/80 space-y-2">
              <p>
                Lawnchair is an open-source, community-driven launcher inspired by Google Pixel Launcher with rich Material You customization.
              </p>
              <p className="text-white/50 text-[12px]">
                Built accurately in Next.js/React with full spring physics, Monet theming engine, and isolated recording frame.
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <a
                href="https://github.com/LawnchairLauncher/lawnchair"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center gap-2 text-[13px] font-semibold text-white"
              >
                <Github className="w-4 h-4" /> Lawnchair on GitHub
              </a>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
