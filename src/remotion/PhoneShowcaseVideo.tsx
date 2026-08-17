'use client';

import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
} from 'remotion';
import { LawnchairProvider } from '@/context/LawnchairContext';
import { DeviceFrame } from '@/components/phone/DeviceFrame';
import { StatusBar } from '@/components/phone/StatusBar';
import { NavigationBar } from '@/components/phone/NavigationBar';
import { AtAGlance } from '@/components/home/AtAGlance';
import { Dock } from '@/components/home/Dock';
import { AppSvgIcon } from '@/components/common/AppSvgIcon';
import { INITIAL_APPS } from '@/lib/apps-data';
import { WALLPAPERS } from '@/lib/wallpapers-data';
import { Search } from 'lucide-react';

export interface PhoneShowcaseVideoProps {
  overrideFrame?: number;
}

export const PhoneShowcaseVideo: React.FC<PhoneShowcaseVideoProps> = ({ overrideFrame }) => {
  let frame = 0;
  let fps = 60;

  try {
    const hookFrame = useCurrentFrame();
    const config = useVideoConfig();
    frame = overrideFrame !== undefined ? overrideFrame : hookFrame;
    fps = config?.fps || 60;
  } catch {
    frame = overrideFrame || 0;
    fps = 60;
  }

  // Timeline (Total 420 frames = 7.0 seconds at 60 FPS):
  // 0 - 60 (0s - 1s): Home Screen idle
  // 60 - 180 (1s - 3s): Calculator App opens with spring animation & types 7 × 8 = 56
  // 180 - 240 (3s - 4s): Swipe up to close Calculator back to Home Screen
  // 240 - 360 (4s - 6s): Swipe up to open App Drawer, scroll, and close
  // 360 - 420 (6s - 7s): Clean return to Home Screen

  const wallpaper = WALLPAPERS[0]; // Pixel 9 Horizon Blue

  // --- 1. App Open/Close Spring Animation ---
  const appOpenProgress = spring({
    frame: frame - 60,
    fps,
    config: { damping: 16, stiffness: 120 },
  });

  const appCloseProgress = spring({
    frame: frame - 180,
    fps,
    config: { damping: 16, stiffness: 140 },
  });

  const isAppVisible = frame >= 60 && frame < 220;
  const appScale = interpolate(
    appCloseProgress > 0 ? 1 - appCloseProgress : appOpenProgress,
    [0, 1],
    [0.2, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const appOpacity = interpolate(
    appCloseProgress > 0 ? 1 - appCloseProgress : appOpenProgress,
    [0, 1],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Calculator typing simulation
  let calcText = '0';
  let calcPrev = '';
  if (frame >= 85) calcText = '7';
  if (frame >= 110) {
    calcPrev = '7 ×';
    calcText = '8';
  }
  if (frame >= 140) {
    calcPrev = '7 × 8 =';
    calcText = '56';
  }

  // --- 2. App Drawer Open/Close Animation ---
  const drawerOpenProgress = spring({
    frame: frame - 240,
    fps,
    config: { damping: 16, stiffness: 120 },
  });

  const drawerCloseProgress = spring({
    frame: frame - 330,
    fps,
    config: { damping: 16, stiffness: 140 },
  });

  const isDrawerVisible = frame >= 240 && frame < 380;
  const drawerY = interpolate(
    drawerCloseProgress > 0 ? 1 - drawerCloseProgress : drawerOpenProgress,
    [0, 1],
    [915, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <LawnchairProvider>
      <AbsoluteFill
        style={{
          backgroundColor: '#0a0c10',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* 1:1 Flat Pixel 9 Pro Device Frame & Screen Viewport (0 3D Tilt) */}
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <DeviceFrame isFrameEnabled={true}>
            <div className="relative w-full h-full overflow-hidden bg-black select-none flex flex-col justify-between font-sans">
              {/* Wallpaper Background */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-all"
                style={{
                  backgroundImage: `url(${wallpaper.url})`,
                  filter: isAppVisible ? 'brightness(0.5) blur(4px)' : 'none',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
              </div>

              {/* Top Status Bar */}
              <div className="relative z-30">
                <StatusBar darkIcons={false} />
              </div>

              {/* Main Home Screen Desktop Grid */}
              <div className="relative z-10 flex-1 px-4 pt-4 flex flex-col justify-between pb-2">
                {/* Smartspacer / At a Glance */}
                <div>
                  <AtAGlance />
                </div>

                {/* Home Screen Icons Grid */}
                <div className="grid grid-cols-4 gap-y-6 gap-x-2 justify-items-center py-6">
                  {INITIAL_APPS.slice(0, 12).map((app) => (
                    <div key={app.id} className="flex flex-col items-center gap-1.5">
                      <div
                        className={`transition-transform duration-200 ${
                          app.id === 'calculator' && frame >= 50 && frame < 75
                            ? 'scale-110'
                            : ''
                        }`}
                      >
                        <AppSvgIcon appId={app.id} isThemed={true} size={54} />
                      </div>
                      <span className="text-[11px] font-medium text-white tracking-tight drop-shadow-md text-center truncate max-w-[70px]">
                        {app.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom Dock */}
                <div className="w-full">
                  <Dock />
                </div>
              </div>

              {/* Gesture Navigation Bar */}
              <div className="relative z-30 pb-1">
                <NavigationBar dark={false} />
              </div>

              {/* ================= SIMULATED CALCULATOR APP WINDOW ================= */}
              {isAppVisible && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 40,
                    transform: `scale(${appScale})`,
                    opacity: appOpacity,
                    transformOrigin: '50% 70%',
                    backgroundColor: '#17191d',
                    borderRadius: '40px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '16px',
                    paddingTop: '36px',
                    color: 'white',
                  }}
                >
                  {/* Calculator Display */}
                  <div className="flex-1 flex flex-col justify-end items-end px-4 py-8">
                    <div className="text-white/50 text-[18px] font-medium h-7">
                      {calcPrev}
                    </div>
                    <div className="text-[56px] font-display font-light text-white tracking-tight leading-none">
                      {calcText}
                    </div>
                  </div>

                  {/* Calculator Keypad */}
                  <div className="grid grid-cols-4 gap-2.5 pb-4">
                    {['AC', '(', ')', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '=', '⌫'].map(
                      (btn) => (
                        <div
                          key={btn}
                          className={`h-15 rounded-full flex items-center justify-center text-[20px] font-medium transition-all ${
                            btn === '='
                              ? 'bg-[#004d40] text-[#a8c7fa]'
                              : ['÷', '×', '-', '+', 'AC'].includes(btn)
                              ? 'bg-[#2d3036] text-[#a8c7fa]'
                              : 'bg-[#1e2023] text-white'
                          }`}
                        >
                          {btn}
                        </div>
                      )
                    )}
                  </div>

                  {/* Bottom Gesture Bar inside App */}
                  <div className="w-full flex justify-center pt-2">
                    <div
                      className={`w-32 h-1 rounded-full bg-white/60 transition-transform ${
                        frame >= 170 && frame < 190 ? '-translate-y-2 scale-110' : ''
                      }`}
                    />
                  </div>
                </div>
              )}

              {/* ================= SIMULATED APP DRAWER ================= */}
              {isDrawerVisible && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 45,
                    transform: `translateY(${drawerY}px)`,
                    backgroundColor: 'rgba(18, 20, 24, 0.96)',
                    backdropFilter: 'blur(30px)',
                    borderRadius: '40px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '16px',
                    paddingTop: '40px',
                    color: 'white',
                  }}
                >
                  {/* App Drawer Search */}
                  <div className="w-full h-12 rounded-full bg-white/10 flex items-center px-4 gap-3 mb-6">
                    <Search className="w-4 h-4 text-white/50" />
                    <span className="text-xs text-white/50">Search apps...</span>
                  </div>

                  {/* App Drawer Grid */}
                  <div className="grid grid-cols-4 gap-y-6 gap-x-2 justify-items-center flex-1 overflow-hidden">
                    {INITIAL_APPS.map((app) => (
                      <div key={app.id} className="flex flex-col items-center gap-1.5">
                        <AppSvgIcon appId={app.id} isThemed={true} size={50} />
                        <span className="text-[10.5px] font-medium text-white/90 truncate max-w-[65px]">
                          {app.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </DeviceFrame>
        </div>
      </AbsoluteFill>
    </LawnchairProvider>
  );
};
