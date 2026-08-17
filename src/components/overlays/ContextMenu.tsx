'use client';

import React from 'react';
import { useLawnchair } from '@/context/LawnchairContext';
import {
  Info,
  Edit2,
  Hourglass,
  Trash2,
  Palette,
  LayoutGrid,
  Settings,
  Share2,
  X,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const ContextMenu: React.FC = () => {
  const {
    contextMenu,
    closeContextMenu,
    apps,
    settings,
    openOverlay,
    launchApp,
  } = useLawnchair();

  if (!contextMenu) return null;

  const app = contextMenu.appId
    ? apps.find((a) => a.id === contextMenu.appId)
    : null;

  return (
    <div
      onClick={closeContextMenu}
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 select-none"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 10 }}
        transition={{ type: 'spring', stiffness: 450, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[290px] rounded-3xl p-2 shadow-2xl overflow-hidden text-white"
        style={{
          backgroundColor: settings.isDarkMode
            ? 'rgba(32, 35, 39, 0.95)'
            : 'rgba(255, 255, 255, 0.96)',
          border: settings.isDarkMode
            ? '1px solid rgba(255,255,255,0.1)'
            : '1px solid rgba(0,0,0,0.1)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        }}
      >
        {/* ================= DESKTOP LONG PRESS MENU ================= */}
        {contextMenu.isDesktop && !app && (
          <div className="flex flex-col py-1">
            <div className="px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white/50">
              Lawnchair Desktop
            </div>

            <button
              onClick={() => {
                closeContextMenu();
                openOverlay('wallpaper_picker');
              }}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/10 text-left transition-colors"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--md-primary-container)', color: 'var(--md-on-primary-container)' }}
              >
                <Palette className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[13.5px] font-semibold text-white">Wallpaper & style</div>
                <div className="text-[11px] text-white/60">Change colors, theme, icons</div>
              </div>
            </button>

            <button
              onClick={() => {
                closeContextMenu();
                openOverlay('widget_picker');
              }}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/10 text-left transition-colors"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--md-primary-container)', color: 'var(--md-on-primary-container)' }}
              >
                <LayoutGrid className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[13.5px] font-semibold text-white">Widgets</div>
                <div className="text-[11px] text-white/60">Add Smartspacer & widgets</div>
              </div>
            </button>

            <button
              onClick={() => {
                closeContextMenu();
                openOverlay('lawnchair_settings');
              }}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/10 text-left transition-colors"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--md-primary)', color: 'var(--md-on-primary)' }}
              >
                <Settings className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[13.5px] font-semibold text-white">Home settings</div>
                <div className="text-[11px] text-white/60">Lawnchair 14 configuration</div>
              </div>
            </button>
          </div>
        )}

        {/* ================= APP ICON LONG PRESS MENU ================= */}
        {app && (
          <div className="flex flex-col py-1">
            {/* App Header */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 mb-1">
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-bold text-white">{app.name}</span>
                <span className="text-[11px] text-white/50">{app.category}</span>
              </div>
              <button
                onClick={closeContextMenu}
                className="p-1 text-white/50 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* App Shortcuts (if defined) */}
            {app.shortcuts && app.shortcuts.length > 0 && (
              <div className="mb-2 space-y-0.5">
                {app.shortcuts.map((shortcut) => (
                  <button
                    key={shortcut.id}
                    onClick={() => {
                      closeContextMenu();
                      launchApp(app);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/10 text-left transition-colors text-[13px] font-medium text-white/90"
                  >
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>{shortcut.label}</span>
                  </button>
                ))}
                <div className="w-full h-[1px] bg-white/10 my-1" />
              </div>
            )}

            {/* Core Actions */}
            <div className="grid grid-cols-4 gap-1 p-1">
              <button
                onClick={() => {
                  closeContextMenu();
                  launchApp('settings');
                }}
                className="flex flex-col items-center justify-center p-2 rounded-2xl hover:bg-white/10 text-center text-white/80 hover:text-white"
              >
                <Info className="w-4 h-4 mb-1" />
                <span className="text-[10px] font-medium">App info</span>
              </button>

              <button
                onClick={() => {
                  closeContextMenu();
                  openOverlay('lawnchair_settings');
                }}
                className="flex flex-col items-center justify-center p-2 rounded-2xl hover:bg-white/10 text-center text-white/80 hover:text-white"
              >
                <Edit2 className="w-4 h-4 mb-1" />
                <span className="text-[10px] font-medium">Edit</span>
              </button>

              <button
                onClick={closeContextMenu}
                className="flex flex-col items-center justify-center p-2 rounded-2xl hover:bg-white/10 text-center text-white/80 hover:text-white"
              >
                <Hourglass className="w-4 h-4 mb-1" />
                <span className="text-[10px] font-medium">Pause</span>
              </button>

              <button
                onClick={closeContextMenu}
                className="flex flex-col items-center justify-center p-2 rounded-2xl hover:bg-red-500/20 text-center text-red-300 hover:text-red-200"
              >
                <Trash2 className="w-4 h-4 mb-1 text-red-400" />
                <span className="text-[10px] font-medium">Uninstall</span>
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
