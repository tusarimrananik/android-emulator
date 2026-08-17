'use client';

import React, { ReactNode } from 'react';

interface DeviceFrameProps {
  children: ReactNode;
  isFrameEnabled?: boolean;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  children,
  isFrameEnabled = true,
}) => {
  if (!isFrameEnabled) {
    // Pure Screen / Recording Mode (100% borderless, exact pixel canvas)
    return (
      <div
        id="lawnchair-recording-canvas"
        className="relative overflow-hidden bg-black select-none shadow-2xl"
        style={{
          width: '412px',
          height: '915px',
          aspectRatio: '412 / 915',
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className="relative flex items-center justify-center p-3 transition-all duration-300"
      style={{
        filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.45)) drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3))',
      }}
    >
      {/* Outer Titanium Frame */}
      <div
        className="relative rounded-[54px] p-[10px] bg-gradient-to-b from-[#43464a] via-[#2d3033] to-[#1e2022] border border-[#555a60]/50"
        style={{
          boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.25), inset 0 -2px 4px rgba(0,0,0,0.6)',
        }}
      >
        {/* Right side physical buttons (Power + Volume) */}
        <div className="absolute -right-[4px] top-[140px] w-[4px] h-[48px] rounded-r-md bg-gradient-to-r from-[#2d3033] to-[#43464a] border-y border-r border-[#60656a]" />
        <div className="absolute -right-[4px] top-[210px] w-[4px] h-[96px] rounded-r-md bg-gradient-to-r from-[#2d3033] to-[#43464a] border-y border-r border-[#60656a]" />

        {/* Inner Black Bezel Frame */}
        <div className="relative rounded-[44px] bg-[#0c0d0e] p-[4px] overflow-hidden">
          {/* Top Speaker Earpiece Grill */}
          <div className="absolute top-[8px] left-1/2 -translate-x-1/2 w-16 h-[3.5px] rounded-full bg-[#1e2022] z-50 shadow-inner" />

          {/* Screen Content Container */}
          <div
            id="lawnchair-recording-canvas"
            className="relative rounded-[40px] overflow-hidden bg-black select-none"
            style={{
              width: '412px',
              height: '915px',
            }}
          >
            {/* Front Camera Punch-hole (Pixel 9 Pro centered camera) */}
            <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[13px] h-[13px] rounded-full bg-[#050608] border border-[#1a1c1e] z-50 flex items-center justify-center pointer-events-none shadow-sm">
              <div className="w-[4px] h-[4px] rounded-full bg-[#1b2535] opacity-80" />
            </div>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
