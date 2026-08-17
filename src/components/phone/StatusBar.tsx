'use client';

import React, { useState, useEffect } from 'react';
import { useLawnchair } from '@/context/LawnchairContext';
import { SystemSvgIcon } from '@/components/common/SystemSvgIcon';

interface StatusBarProps {
  darkIcons?: boolean;
}

export const StatusBar: React.FC<StatusBarProps> = ({ darkIcons = false }) => {
  const { openOverlay } = useLawnchair();
  const [timeStr, setTimeStr] = useState<string>('9:41');
  const batteryLevel = 88;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const formattedMins = minutes < 10 ? `0${minutes}` : `${minutes}`;
      setTimeStr(`${hours}:${formattedMins}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const textColor = darkIcons ? 'text-gray-900' : 'text-white';

  return (
    <div
      onClick={() => openOverlay('quick_settings')}
      className={`w-full h-9 px-5 pt-1.5 flex items-center justify-between z-30 select-none cursor-pointer transition-colors duration-300 ${textColor}`}
      style={{
        textShadow: darkIcons ? 'none' : '0 1px 2px rgba(0,0,0,0.3)',
      }}
    >
      {/* Left side: Time + Official Notification Icons */}
      <div className="flex items-center gap-2">
        <span className="text-[13px] font-semibold tracking-tight font-display pl-0.5">
          {timeStr}
        </span>
        <div className="flex items-center gap-1.5 ml-1 opacity-90">
          <SystemSvgIcon name="status_message" size={14} />
          <SystemSvgIcon name="status_mail" size={13} />
          <SystemSvgIcon name="status_media" size={14} className="animate-spin" style={{ animationDuration: '6s' } as any} />
        </div>
      </div>

      {/* Right side: Official System Status icons + Material 3 Battery Pill */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          {/* 5G */}
          <div className="flex items-center opacity-90">
            <SystemSvgIcon name="status_5g" size={16} />
          </div>

          {/* Wi-Fi */}
          <SystemSvgIcon name="status_wifi" size={15} />

          {/* Battery */}
          <div className="flex items-center gap-1 pl-0.5">
            <SystemSvgIcon name="status_battery" size={15} />
            <span className="text-[10px] font-semibold tracking-tight">
              {batteryLevel}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
