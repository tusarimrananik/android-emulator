'use client';

import React, { useRef } from 'react';
import { AppItem } from '@/types/launcher';
import { useLawnchair } from '@/context/LawnchairContext';
import { AppSvgIcon } from '@/components/common/AppSvgIcon';
import { motion } from 'framer-motion';

interface AppIconProps {
  app: AppItem;
  size?: number;
  showLabel?: boolean;
  isDock?: boolean;
  className?: string;
}

export const AppIcon: React.FC<AppIconProps> = ({
  app,
  size = 54,
  showLabel = true,
  isDock = false,
  className = '',
}) => {
  const { settings, launchApp, openContextMenu } = useLawnchair();
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isLongPressRef = useRef<boolean>(false);

  const calculatedSize = Math.round(size * (settings.iconSizePercent / 100));

  const handlePointerDown = (e: React.PointerEvent) => {
    isLongPressRef.current = false;
    const clientX = e.clientX;
    const clientY = e.clientY;

    longPressTimerRef.current = setTimeout(() => {
      isLongPressRef.current = true;
      openContextMenu({
        appId: app.id,
        isDesktop: !isDock,
        position: { x: clientX, y: clientY },
      });
    }, 450);
  };

  const handlePointerUp = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }
  };

  const handlePointerCancel = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isLongPressRef.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    launchApp(app);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.88 }}
      transition={{ type: 'spring', stiffness: 450, damping: 25 }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onContextMenu={(e) => {
        e.preventDefault();
        openContextMenu({
          appId: app.id,
          isDesktop: !isDock,
          position: { x: e.clientX, y: e.clientY },
        });
      }}
      onClick={handleClick}
      className={`group relative flex flex-col items-center justify-center p-1 focus:outline-none select-none ${className}`}
      style={{ touchAction: 'none' }}
    >
      {/* Icon Graphic Container */}
      <div className="relative flex items-center justify-center">
        <AppSvgIcon
          appId={app.id}
          isThemed={settings.themedIcons}
          shape={settings.iconShape}
          size={calculatedSize}
        />

        {/* Notification Badge Dot / Counter */}
        {app.notificationCount && app.notificationCount > 0 ? (
          <div
            className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center text-[10px] font-bold shadow-md border-2"
            style={{
              backgroundColor: 'var(--md-primary)',
              color: 'var(--md-on-primary)',
              borderColor: 'var(--md-surface)',
            }}
          >
            {app.notificationCount}
          </div>
        ) : null}
      </div>

      {/* Label */}
      {showLabel && settings.showIconLabels && (
        <span
          className="mt-1.5 text-[11.5px] font-medium tracking-tight text-center text-white/95 truncate w-full px-0.5 leading-none transition-opacity"
          style={{
            textShadow: '0 1px 3px rgba(0,0,0,0.7)',
            fontFamily: settings.fontFamily,
          }}
        >
          {app.name}
        </span>
      )}
    </motion.button>
  );
};
