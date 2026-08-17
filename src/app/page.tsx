'use client';

import React from 'react';
import { LawnchairProvider, useLawnchair } from '@/context/LawnchairContext';
import { LawnchairPhone } from '@/components/phone/LawnchairPhone';
import { StudioControls } from '@/components/controls/StudioControls';

function LauncherWorkspace() {
  const { currentWallpaper, isPhoneFrameMode } = useLawnchair();

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden bg-[#0a0c0f]">
      {/* Dynamic Ambient Background Glow based on active wallpaper */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none transition-all duration-700 blur-[120px]"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 40%, var(--md-primary), transparent 70%)`,
        }}
      />

      {/* Grid Pattern Studio Floor */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Top Floating Studio Toolbar */}
      <StudioControls />

      {/* Center Phone / Screen Canvas Container */}
      <div className="relative z-10 flex items-center justify-center my-auto pt-10 sm:pt-14 pb-4">
        <LawnchairPhone />
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <LawnchairProvider>
      <LauncherWorkspace />
    </LawnchairProvider>
  );
}
