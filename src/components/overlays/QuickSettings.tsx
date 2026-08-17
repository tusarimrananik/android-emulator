'use client';

import React, { useState } from 'react';
import { useLawnchair } from '@/context/LawnchairContext';
import { SystemSvgIcon } from '@/components/common/SystemSvgIcon';
import { motion } from 'framer-motion';

export const QuickSettings: React.FC = () => {
  const { settings, updateSettings, closeOverlay, openOverlay, currentWallpaper } = useLawnchair();
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [btEnabled, setBtEnabled] = useState(true);
  const [flashlightEnabled, setFlashlightEnabled] = useState(false);
  const [dndEnabled, setDndEnabled] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [brightness, setBrightness] = useState(78);
  const [isPlayingMusic, setIsPlayingMusic] = useState(true);

  const tiles = [
    {
      id: 'internet',
      label: 'Internet',
      sublabel: wifiEnabled ? 'Pixel_5G_Home' : 'Disconnected',
      iconName: 'qs_internet',
      active: wifiEnabled,
      onClick: () => setWifiEnabled((prev) => !prev),
    },
    {
      id: 'bluetooth',
      label: 'Bluetooth',
      sublabel: btEnabled ? 'Pixel Buds Pro' : 'Off',
      iconName: 'qs_bluetooth',
      active: btEnabled,
      onClick: () => setBtEnabled((prev) => !prev),
    },
    {
      id: 'dark_theme',
      label: 'Dark theme',
      sublabel: settings.isDarkMode ? 'On' : 'Off',
      iconName: 'qs_dark_theme',
      active: settings.isDarkMode,
      onClick: () => updateSettings({ isDarkMode: !settings.isDarkMode }),
    },
    {
      id: 'themed_icons',
      label: 'Themed icons',
      sublabel: settings.themedIcons ? 'Lawnicons' : 'System',
      iconName: 'qs_themed_icons',
      active: settings.themedIcons,
      onClick: () => updateSettings({ themedIcons: !settings.themedIcons }),
    },
    {
      id: 'flashlight',
      label: 'Flashlight',
      sublabel: flashlightEnabled ? 'On' : 'Off',
      iconName: 'qs_flashlight',
      active: flashlightEnabled,
      onClick: () => setFlashlightEnabled((prev) => !prev),
    },
    {
      id: 'lawnchair_monet',
      label: 'Wallpaper & style',
      sublabel: currentWallpaper.name.split(' ')[0],
      iconName: 'qs_wallpaper',
      active: true,
      onClick: () => openOverlay('wallpaper_picker'),
    },
    {
      id: 'dnd',
      label: 'Do Not Disturb',
      sublabel: dndEnabled ? 'Active' : 'Off',
      iconName: 'qs_dnd',
      active: dndEnabled,
      onClick: () => setDndEnabled((prev) => !prev),
    },
    {
      id: 'rotate',
      label: 'Auto-rotate',
      sublabel: autoRotate ? 'On' : 'Off',
      iconName: 'qs_rotate',
      active: autoRotate,
      onClick: () => setAutoRotate((prev) => !prev),
    },
  ];

  return (
    <motion.div
      initial={{ y: '-100%', opacity: 0.8 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '-100%', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
      className="absolute inset-0 z-50 flex flex-col justify-between overflow-y-auto no-scrollbar select-none text-white px-5 pt-7 pb-4"
      style={{
        backgroundColor: settings.isDarkMode
          ? 'rgba(14, 16, 18, 0.95)'
          : 'rgba(235, 238, 242, 0.96)',
        backdropFilter: 'blur(35px)',
      }}
    >
      {/* Top Header Bar */}
      <div className="w-full flex items-center justify-between pt-3 pb-4">
        <div>
          <div className="text-[28px] font-display font-semibold tracking-tight text-white leading-none">
            {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="text-[12px] font-medium text-white/60 mt-1">
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => openOverlay('lawnchair_settings')}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/90 hover:bg-white/20 transition-colors"
            title="Lawnchair Settings"
          >
            <SystemSvgIcon name="qs_settings" size={20} />
          </button>
          <button
            onClick={closeOverlay}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/90 hover:bg-white/20 transition-colors"
            title="Power Menu"
          >
            <SystemSvgIcon name="qs_power" size={20} className="text-red-400" />
          </button>
        </div>
      </div>

      {/* Brightness Slider */}
      <div className="w-full mb-4 px-1 flex items-center gap-3">
        <SystemSvgIcon name="status_wifi" size={18} className="text-white/70" />
        <div className="relative flex-1 h-9 rounded-full bg-white/10 overflow-hidden flex items-center px-3">
          <div
            className="absolute left-0 top-0 bottom-0 transition-all rounded-full"
            style={{
              width: `${brightness}%`,
              backgroundColor: 'var(--md-primary)',
            }}
          />
          <input
            type="range"
            min="10"
            max="100"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
        </div>
      </div>

      {/* Quick Settings Grid (2 columns x 4 rows) */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {tiles.map((tile) => {
          return (
            <motion.button
              key={tile.id}
              whileTap={{ scale: 0.96 }}
              onClick={tile.onClick}
              className={`h-15 p-3 rounded-2xl flex items-center gap-3 transition-all duration-200 text-left shadow-sm ${
                tile.active
                  ? 'text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/15'
              }`}
              style={{
                backgroundColor: tile.active ? 'var(--md-primary)' : undefined,
                color: tile.active ? 'var(--md-on-primary)' : undefined,
              }}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                  tile.active ? 'bg-black/15' : 'bg-white/10'
                }`}
              >
                <SystemSvgIcon name={tile.iconName} size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-semibold truncate leading-tight">
                  {tile.label}
                </div>
                <div className="text-[11px] opacity-75 truncate leading-tight mt-0.5">
                  {tile.sublabel}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Media Player Notification Card */}
      <div
        className="w-full p-3.5 rounded-3xl mb-3 flex items-center justify-between shadow-md"
        style={{
          backgroundColor: settings.isDarkMode ? 'rgba(30, 33, 38, 0.8)' : 'rgba(255, 255, 255, 0.85)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white">
            <SystemSvgIcon name="notif_spotify" size={22} />
          </div>
          <div>
            <div className="text-[13px] font-semibold text-white">Material You Echoes</div>
            <div className="text-[11.5px] text-white/60">Pixel Symphony · Lawnchair</div>
          </div>
        </div>

        <button
          onClick={() => setIsPlayingMusic((prev) => !prev)}
          className="w-9 h-9 rounded-full flex items-center justify-center text-white shadow-sm"
          style={{ backgroundColor: 'var(--md-primary)', color: 'var(--md-on-primary)' }}
        >
          <SystemSvgIcon name="notif_spotify" size={16} />
        </button>
      </div>

      {/* Notifications Stack */}
      <div className="space-y-2 mb-4">
        <div className="text-[12px] font-semibold text-white/50 uppercase tracking-wider px-1">
          Notifications
        </div>

        {/* Message notification */}
        <div
          className="p-3 rounded-2xl flex items-start gap-3 shadow-sm"
          style={{
            backgroundColor: settings.isDarkMode ? 'rgba(30, 33, 38, 0.8)' : 'rgba(255, 255, 255, 0.85)',
          }}
        >
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
            <SystemSvgIcon name="notif_message" size={16} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[12.5px] font-semibold text-white">Alex Rivers</span>
              <span className="text-[10.5px] text-white/50">12m ago</span>
            </div>
            <p className="text-[11.5px] text-white/70 mt-0.5">
              Lawnchair looks pixel-perfect! Dynamic theming is amazing.
            </p>
          </div>
        </div>

        {/* Mail notification */}
        <div
          className="p-3 rounded-2xl flex items-start gap-3 shadow-sm"
          style={{
            backgroundColor: settings.isDarkMode ? 'rgba(30, 33, 38, 0.8)' : 'rgba(255, 255, 255, 0.85)',
          }}
        >
          <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">
            <SystemSvgIcon name="notif_mail" size={16} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[12.5px] font-semibold text-white">GitHub</span>
              <span className="text-[10.5px] text-white/50">28m ago</span>
            </div>
            <p className="text-[11.5px] text-white/70 mt-0.5">
              LawnchairLauncher/lawnchair: 14-dev release build passed.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Dismiss */}
      <div className="w-full flex items-center justify-center pt-2">
        <button
          onClick={closeOverlay}
          className="p-1 rounded-full text-white/40 hover:text-white/80 transition-colors"
        >
          <div className="w-8 h-1 rounded-full bg-white/30" />
        </button>
      </div>
    </motion.div>
  );
};
