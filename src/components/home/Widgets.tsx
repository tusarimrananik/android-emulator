'use client';

import React, { useState, useEffect } from 'react';
import { WidgetItem } from '@/types/launcher';
import { useLawnchair } from '@/context/LawnchairContext';
import { Play, Pause, SkipForward, SkipBack, Music, CloudRain, Sun, Cloud, Battery } from 'lucide-react';
import { motion } from 'framer-motion';

export const DigitalClockWidget: React.FC = () => {
  const { launchApp, settings } = useLawnchair();
  const [time, setTime] = useState<{ hours: string; minutes: string; date: string }>({
    hours: '09',
    minutes: '41',
    date: 'Mon, Aug 17',
  });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes();
      setTime({
        hours: h < 10 ? `0${h}` : `${h}`,
        minutes: m < 10 ? `0${m}` : `${m}`,
        date: now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => launchApp('clock')}
      className="w-full p-4 rounded-3xl cursor-pointer flex flex-col justify-between select-none shadow-lg backdrop-blur-xl transition-all"
      style={{
        backgroundColor: settings.isDarkMode ? 'rgba(30, 32, 36, 0.75)' : 'rgba(255, 255, 255, 0.8)',
        border: '1px solid rgba(255,255,255,0.12)',
        minHeight: '130px',
      }}
    >
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline gap-1 text-[44px] font-bold font-clock tracking-tight text-white/95 leading-none">
          <span style={{ color: 'var(--md-primary)' }}>{time.hours}</span>
          <span className="opacity-60">:</span>
          <span>{time.minutes}</span>
        </div>
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/20 text-white/90 border border-white/10">
          <Sun className="w-3.5 h-3.5 text-amber-300" />
          <span>78°F Sunny</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[12px] font-medium text-white/70 mt-2">
        <span>{time.date}</span>
        <span className="flex items-center gap-1 text-emerald-400">
          <Battery className="w-3.5 h-3.5" /> 88% Charged
        </span>
      </div>
    </motion.div>
  );
};

export const SpotifyMusicWidget: React.FC = () => {
  const { launchApp, settings } = useLawnchair();
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [trackIndex, setTrackIndex] = useState<number>(0);

  const tracks = [
    { title: 'Material You Echoes', artist: 'Pixel Symphony', album: 'Lawnchair Beats' },
    { title: 'Midnight City Glow', artist: 'Monet Grooves', album: 'Android 14 Mix' },
    { title: 'Spring Fluidity', artist: 'Dynamic Color', album: 'Lawnchair Sessions' },
  ];

  const currentTrack = tracks[trackIndex];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="w-full p-3.5 rounded-3xl flex items-center justify-between select-none shadow-lg backdrop-blur-xl transition-all"
      style={{
        backgroundColor: settings.isDarkMode ? 'rgba(25, 27, 30, 0.85)' : 'rgba(255, 255, 255, 0.85)',
        border: '1px solid rgba(255,255,255,0.12)',
        minHeight: '96px',
      }}
    >
      {/* Album Artwork & Info */}
      <div
        onClick={() => launchApp('spotify')}
        className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
      >
        <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md flex-shrink-0">
          <Music className="w-6 h-6" />
          {isPlaying && (
            <div className="absolute inset-0 bg-black/20 flex items-end justify-center pb-1 gap-0.5">
              <span className="w-1 bg-white animate-pulse h-3 rounded-full" />
              <span className="w-1 bg-white animate-pulse h-5 rounded-full" style={{ animationDelay: '0.2s' }} />
              <span className="w-1 bg-white animate-pulse h-2 rounded-full" style={{ animationDelay: '0.4s' }} />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h4 className="text-[13px] font-semibold text-white/95 truncate">
            {currentTrack.title}
          </h4>
          <p className="text-[11.5px] text-white/60 truncate font-medium">
            {currentTrack.artist}
          </p>
        </div>
      </div>

      {/* Media Controls */}
      <div className="flex items-center gap-1 pl-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setTrackIndex((prev) => (prev > 0 ? prev - 1 : tracks.length - 1));
          }}
          className="p-1.5 rounded-full hover:bg-white/10 text-white/80 transition-colors"
        >
          <SkipBack className="w-4 h-4" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsPlaying((prev) => !prev);
          }}
          className="w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-transform active:scale-90"
          style={{
            backgroundColor: 'var(--md-primary)',
            color: 'var(--md-on-primary)',
          }}
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setTrackIndex((prev) => (prev + 1) % tracks.length);
          }}
          className="p-1.5 rounded-full hover:bg-white/10 text-white/80 transition-colors"
        >
          <SkipForward className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};
