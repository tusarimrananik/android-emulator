'use client';

import React, { useRef } from 'react';
import { useLawnchair } from '@/context/LawnchairContext';
import { AtAGlance } from '@/components/home/AtAGlance';
import { AppIcon } from '@/components/home/AppIcon';
import { FolderIcon } from '@/components/home/FolderIcon';
import { DigitalClockWidget, SpotifyMusicWidget } from '@/components/home/Widgets';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';

export const HomeScreen: React.FC = () => {
  const {
    apps,
    folders,
    currentPage,
    setCurrentPage,
    totalPages,
    settings,
    openContextMenu,
    openOverlay,
  } = useLawnchair();

  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Desktop apps for Page 0
  const page0Apps = apps.filter(
    (a) => a.homePosition && a.homePosition.page === 0 && !a.isFavorite
  );

  // Desktop apps for Page 1
  const page1Apps = apps.filter(
    (a) => a.homePosition && a.homePosition.page === 1
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    // Only trigger long press if target is background
    if ((e.target as HTMLElement).closest('button')) return;

    const x = e.clientX;
    const y = e.clientY;
    longPressTimerRef.current = setTimeout(() => {
      openContextMenu({
        isDesktop: true,
        position: { x, y },
      });
    }, 500);
  };

  const handlePointerUp = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }
  };

  const handleDragEnd = (e: any, info: PanInfo) => {
    const threshold = 40;
    const velocity = info.velocity.x;
    const offset = info.offset.x;
    const offsetY = info.offset.y;

    // Vertical gestures (Swipe Up / Swipe Down)
    if (Math.abs(offsetY) > Math.abs(offset) && Math.abs(offsetY) > threshold) {
      if (offsetY < -threshold) {
        // Swipe Up -> App Drawer
        openOverlay('app_drawer');
        return;
      } else if (offsetY > threshold) {
        // Swipe Down -> Quick Settings
        openOverlay('quick_settings');
        return;
      }
    }

    // Horizontal gestures (Swipe Left / Right between pages)
    if (offset < -threshold || velocity < -300) {
      if (currentPage < totalPages - 1) {
        setCurrentPage(currentPage + 1);
      }
    } else if (offset > threshold || velocity > 300) {
      if (currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onContextMenu={(e) => {
        e.preventDefault();
        openContextMenu({
          isDesktop: true,
          position: { x: e.clientX, y: e.clientY },
        });
      }}
      className="relative flex-1 w-full h-full flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Paginated Home Screen Content */}
      <motion.div
        className="flex-1 w-full flex"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.25}
        onDragEnd={handleDragEnd}
        animate={{ x: `-${currentPage * 100}%` }}
        transition={{ type: 'spring', stiffness: 350, damping: 32 }}
        style={{ width: `${totalPages * 100}%` }}
      >
        {/* ================= PAGE 0 (Primary Home Screen) ================= */}
        <div
          className="w-full h-full flex flex-col justify-between"
          style={{ width: '412px' }}
        >
          {/* Smartspacer / At a Glance */}
          <AtAGlance />

          {/* Desktop App Grid (4 or 5 columns) */}
          <div className="flex-1 px-4 py-2 flex flex-col justify-end">
            <div
              className={`grid grid-cols-${settings.gridColumns} gap-y-4 gap-x-2 items-end justify-items-center mb-4`}
              style={{
                gridTemplateColumns: `repeat(${settings.gridColumns}, minmax(0, 1fr))`,
              }}
            >
              {/* Folders on Desktop */}
              {folders.map((folder) => (
                <FolderIcon key={folder.id} folder={folder} size={54} />
              ))}

              {/* Individual Apps on Desktop */}
              {page0Apps.map((app) => (
                <AppIcon key={app.id} app={app} size={54} />
              ))}
            </div>
          </div>
        </div>

        {/* ================= PAGE 1 (Widgets Screen) ================= */}
        <div
          className="w-full h-full flex flex-col justify-start px-5 pt-4 gap-4"
          style={{ width: '412px' }}
        >
          {/* Clock Widget */}
          <DigitalClockWidget />

          {/* Spotify Media Player Widget */}
          <SpotifyMusicWidget />

          {/* Additional Grid Apps on Page 1 */}
          <div
            className="grid gap-y-4 gap-x-2 items-center justify-items-center mt-2"
            style={{
              gridTemplateColumns: `repeat(${settings.gridColumns}, minmax(0, 1fr))`,
            }}
          >
            {apps
              .filter((a) => ['calculator', 'weather', 'keep_notes', 'files'].includes(a.id))
              .map((app) => (
                <AppIcon key={app.id} app={app} size={54} />
              ))}
          </div>
        </div>
      </motion.div>

      {/* Page Indicator Pill Dots */}
      <div className="w-full flex items-center justify-center gap-1.5 py-1 z-10">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`transition-all duration-300 rounded-full ${
              currentPage === index
                ? 'w-5 h-1.5 bg-white shadow-sm'
                : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
