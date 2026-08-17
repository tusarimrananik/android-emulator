'use client';

import React, { useState } from 'react';
import { useLawnchair } from '@/context/LawnchairContext';
import { ScreenRecorderModal } from './ScreenRecorderModal';
import { RemotionVideoModal } from './RemotionVideoModal';
import {
  Smartphone,
  Video,
  Clapperboard,
  Sparkles,
  Moon,
  Sun,
  Palette,
  Sliders,
  RotateCcw,
  Github,
  CircleDot,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const StudioControls: React.FC = () => {
  const {
    isPhoneFrameMode,
    togglePhoneFrameMode,
    settings,
    updateSettings,
    openOverlay,
    goToHome,
  } = useLawnchair();

  const [isRecorderOpen, setIsRecorderOpen] = useState(false);
  const [isRemotionOpen, setIsRemotionOpen] = useState(false);

  return (
    <>
      <div className="fixed top-4 inset-x-0 z-50 flex flex-col items-center pointer-events-none px-4">
        {/* Floating Pill Toolbar */}
        <div className="pointer-events-auto flex items-center gap-2 p-1.5 rounded-full bg-[#181a1f]/90 backdrop-blur-2xl border border-white/10 shadow-2xl text-white">
          {/* Lawnchair Brand */}
          <div className="flex items-center gap-2 pl-3 pr-2 py-1">
            <div className="w-6 h-6 rounded-full bg-[#00897b] flex items-center justify-center text-white font-bold text-[10px] shadow-sm">
              14
            </div>
            <span className="font-display font-bold text-sm tracking-tight hidden sm:inline text-white/90">
              Lawnchair 14
            </span>
          </div>

          <div className="w-[1px] h-5 bg-white/15 mx-0.5" />

          {/* Remotion Video Studio Button (Zero Prompts, 60fps) */}
          <button
            onClick={() => setIsRemotionOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs font-bold transition-all shadow-md shadow-emerald-500/25"
            title="Create Remotion 60 FPS Showcase Video (Zero Prompts)"
          >
            <Clapperboard className="w-3.5 h-3.5" />
            <span>Remotion Video</span>
          </button>

          {/* Screen Record Video Button */}
          <button
            onClick={() => setIsRecorderOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 text-xs font-semibold transition-all"
            title="Record Screen Live"
          >
            <CircleDot className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden md:inline">Live Record</span>
          </button>

          {/* Phone Frame Toggle */}
          <button
            onClick={togglePhoneFrameMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              isPhoneFrameMode
                ? 'bg-white/10 text-white/80 hover:bg-white/15'
                : 'bg-emerald-500 text-white shadow-md'
            }`}
            title="Switch to Pure Screen (Recording Mode)"
          >
            {isPhoneFrameMode ? <Smartphone className="w-3.5 h-3.5" /> : <Video className="w-3.5 h-3.5" />}
            <span>{isPhoneFrameMode ? 'Device Frame' : 'Recording Mode (412×915)'}</span>
          </button>

          {/* Themed Icons Toggle */}
          <button
            onClick={() => updateSettings({ themedIcons: !settings.themedIcons })}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              settings.themedIcons
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-white/10 text-white/70 hover:bg-white/15'
            }`}
            title="Toggle Material You Themed Icons"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Themed Icons</span>
          </button>

          {/* Dark / Light Switch */}
          <button
            onClick={() => updateSettings({ isDarkMode: !settings.isDarkMode })}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 transition-colors"
            title="Toggle Dark / Light Theme"
          >
            {settings.isDarkMode ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
          </button>

          {/* Quick Wallpaper Switcher */}
          <button
            onClick={() => openOverlay('wallpaper_picker')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white/90 transition-colors"
            title="Change Wallpaper & Monet Palette"
          >
            <Palette className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden lg:inline">Wallpaper & Style</span>
          </button>

          {/* Lawnchair Settings Shortcut */}
          <button
            onClick={() => openOverlay('lawnchair_settings')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white/90 transition-colors"
            title="Open Lawnchair 14 Settings"
          >
            <Sliders className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden lg:inline">Settings</span>
          </button>

          {/* Home Reset */}
          <button
            onClick={goToHome}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 transition-colors"
            title="Return to Home Screen"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <div className="w-[1px] h-5 bg-white/15 mx-0.5" />

          {/* GitHub Repository */}
          <a
            href="https://github.com/LawnchairLauncher/lawnchair"
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 transition-colors"
            title="Official Lawnchair GitHub"
          >
            <Github className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Helper Notification Banner in Recording Mode */}
        <AnimatePresence>
          {!isPhoneFrameMode && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="pointer-events-auto mt-2 px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-xl border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-2 shadow-lg"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Screen-Recording Mode active: Phone canvas is isolated at 412 × 915 px (19.5:9)</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Remotion Video Modal */}
      <RemotionVideoModal
        isOpen={isRemotionOpen}
        onClose={() => setIsRemotionOpen(false)}
      />

      {/* Screen Recorder Modal */}
      <ScreenRecorderModal
        isOpen={isRecorderOpen}
        onClose={() => setIsRecorderOpen(false)}
      />
    </>
  );
};
