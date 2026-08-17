'use client';

import React from 'react';
import { useLawnchair } from '@/context/LawnchairContext';
import { DeviceFrame } from '@/components/phone/DeviceFrame';
import { StatusBar } from '@/components/phone/StatusBar';
import { NavigationBar } from '@/components/phone/NavigationBar';
import { HomeScreen } from '@/components/home/HomeScreen';
import { Dock } from '@/components/home/Dock';
import { AppDrawer } from '@/components/drawer/AppDrawer';
import { QuickSettings } from '@/components/overlays/QuickSettings';
import { ContextMenu } from '@/components/overlays/ContextMenu';
import { WallpaperStyle } from '@/components/overlays/WallpaperStyle';
import { WidgetPicker } from '@/components/overlays/WidgetPicker';
import { FolderModal } from '@/components/home/FolderModal';
import { AppWindowModal } from '@/components/overlays/AppWindowModal';
import { LawnchairSettings } from '@/components/settings/LawnchairSettings';
import { AnimatePresence } from 'framer-motion';

export const LawnchairPhone: React.FC = () => {
  const {
    currentWallpaper,
    activeOverlay,
    isPhoneFrameMode,
  } = useLawnchair();

  return (
    <DeviceFrame isFrameEnabled={isPhoneFrameMode}>
      <div
        id="lawnchair-phone-screen"
        className="relative w-full h-full flex flex-col justify-between overflow-hidden select-none bg-black"
        style={{
          width: '412px',
          height: '915px',
        }}
      >
        {/* Dynamic Wallpaper Background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={currentWallpaper.url}
            alt={currentWallpaper.name}
            className="w-full h-full object-cover transition-all duration-500 transform scale-105"
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35" />
        </div>

        {/* Top Status Bar (Live Clock, 5G, Wi-Fi, Battery Pill) */}
        <StatusBar />

        {/* Home Screen Multi-Page Workspace */}
        <HomeScreen />

        {/* Bottom Dock (5 Favorites + Google Pill Search Bar) */}
        <Dock />

        {/* Bottom Android Gesture Navigation Bar */}
        <NavigationBar />

        {/* ================= MODALS & OVERLAYS ================= */}
        <AnimatePresence>
          {activeOverlay === 'app_drawer' && <AppDrawer key="app_drawer" />}
          {activeOverlay === 'quick_settings' && <QuickSettings key="quick_settings" />}
          {activeOverlay === 'wallpaper_picker' && <WallpaperStyle key="wallpaper_picker" />}
          {activeOverlay === 'widget_picker' && <WidgetPicker key="widget_picker" />}
          {activeOverlay === 'folder_modal' && <FolderModal key="folder_modal" />}
          {activeOverlay === 'running_app' && <AppWindowModal key="running_app" />}
          {activeOverlay === 'lawnchair_settings' && <LawnchairSettings key="lawnchair_settings" />}
          {activeOverlay === 'context_menu' && <ContextMenu key="context_menu" />}
        </AnimatePresence>
      </div>
    </DeviceFrame>
  );
};
