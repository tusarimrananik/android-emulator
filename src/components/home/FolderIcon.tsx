'use client';

import React from 'react';
import { FolderItem } from '@/types/launcher';
import { useLawnchair } from '@/context/LawnchairContext';
import { AppSvgIcon } from '@/components/common/AppSvgIcon';
import { motion, AnimatePresence } from 'framer-motion';

interface FolderIconProps {
  folder: FolderItem;
  size?: number;
  showLabel?: boolean;
}

export const FolderIcon: React.FC<FolderIconProps> = ({
  folder,
  size = 54,
  showLabel = true,
}) => {
  const { settings, apps, openFolder } = useLawnchair();
  const folderApps = folder.appIds
    .map((id) => apps.find((a) => a.id === id))
    .filter(Boolean);

  const previewApps = folderApps.slice(0, 4);
  const calculatedSize = Math.round(size * (settings.iconSizePercent / 100));

  return (
    <motion.button
      whileTap={{ scale: 0.88 }}
      transition={{ type: 'spring', stiffness: 450, damping: 25 }}
      onClick={() => openFolder(folder)}
      className="group relative flex flex-col items-center justify-center p-1 focus:outline-none select-none"
    >
      {/* Folder Container Squircle */}
      <div
        className="relative grid grid-cols-2 grid-rows-2 p-1.5 gap-1 items-center justify-items-center rounded-[30%] transition-all duration-300 shadow-md"
        style={{
          width: calculatedSize,
          height: calculatedSize,
          backgroundColor: settings.isDarkMode ? 'rgba(40, 42, 45, 0.75)' : 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.15)',
        }}
      >
        {previewApps.map((app) => (
          <div key={app!.id} className="w-[18px] h-[18px] flex items-center justify-center">
            <AppSvgIcon
              appId={app!.id}
              isThemed={settings.themedIcons}
              shape="circle"
              size={18}
            />
          </div>
        ))}
      </div>

      {/* Folder Name */}
      {showLabel && settings.showIconLabels && (
        <span
          className="mt-1.5 text-[11.5px] font-medium tracking-tight text-center text-white/95 truncate w-full px-0.5 leading-none"
          style={{
            textShadow: '0 1px 3px rgba(0,0,0,0.7)',
            fontFamily: settings.fontFamily,
          }}
        >
          {folder.name}
        </span>
      )}
    </motion.button>
  );
};
