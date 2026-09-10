import React from 'react';
import { IconShape } from '@/types/launcher';
import officialLawnicons from '@/lib/official-lawnicons.json';

interface AppSvgIconProps {
  appId: string;
  isThemed?: boolean;
  shape?: IconShape;
  size?: number;
  className?: string;
}

// App brand accent colors for standard Lawnicons container mode
const APP_BRAND_COLORS: Record<string, { bg: string; fg: string }> = {
  lawnchair_settings: { bg: '#00897b', fg: '#ffffff' },
  phone: { bg: '#1e88e5', fg: '#ffffff' },
  messages: { bg: '#1a73e8', fg: '#ffffff' },
  camera: { bg: '#3c4043', fg: '#ffffff' },
  chrome: { bg: '#ffffff', fg: '#1a73e8' },
  play_store: { bg: '#ffffff', fg: '#0086f8' },
  photos: { bg: '#ffffff', fg: '#ea4335' },
  gmail: { bg: '#ffffff', fg: '#ea4335' },
  settings: { bg: '#5f6368', fg: '#ffffff' },
  maps: { bg: '#ffffff', fg: '#34a853' },
  youtube: { bg: '#ff0000', fg: '#ffffff' },
  spotify: { bg: '#121212', fg: '#1ed760' },
  clock: { bg: '#1a73e8', fg: '#ffffff' },
  calculator: { bg: '#1a73e8', fg: '#ffffff' },
  calendar: { bg: '#ffffff', fg: '#ea4335' },
  drive: { bg: '#ffffff', fg: '#0f9d58' },
  files: { bg: '#4285f4', fg: '#ffffff' },
  weather: { bg: '#0288d1', fg: '#ffffff' },
  keep_notes: { bg: '#fbbc04', fg: '#202124' },
  discord: { bg: '#5865f2', fg: '#ffffff' },
  github: { bg: '#24292e', fg: '#ffffff' },
  whatsapp: { bg: '#25d366', fg: '#ffffff' },
  yt_music: { bg: '#000000', fg: '#ff0000' },
  recorder: { bg: '#ea4335', fg: '#ffffff' },
  contacts: { bg: '#1a73e8', fg: '#ffffff' },
  pixel_tips: { bg: '#ea4335', fg: '#ffffff' },
  telegram: { bg: '#229ed9', fg: '#ffffff' },
  twitter: { bg: '#000000', fg: '#ffffff' },
  instagram: { bg: '#e1306c', fg: '#ffffff' },
  reddit: { bg: '#ff4500', fg: '#ffffff' },
  netflix: { bg: '#e50914', fg: '#ffffff' },
  notion: { bg: '#000000', fg: '#ffffff' },
  slack: { bg: '#4a154b', fg: '#ffffff' },
  twitch: { bg: '#9146ff', fg: '#ffffff' },
  firefox: { bg: '#ff7139', fg: '#ffffff' },
  vlc: { bg: '#ff8800', fg: '#ffffff' },
};

export const AppSvgIcon: React.FC<AppSvgIconProps> = ({
  appId,
  isThemed = true,
  shape = 'circle',
  size = 54,
  className = '',
}) => {
  const getShapeBorderRadius = (s: IconShape) => {
    switch (s) {
      case 'circle':
        return 'rounded-full';
      case 'squircle':
        return 'rounded-[32%]';
      case 'rounded_square':
        return 'rounded-[22%]';
      case 'teardrop':
        return 'rounded-tl-full rounded-tr-full rounded-br-full rounded-bl-[20%]';
      case 'pebble':
        return 'rounded-[40%_25%_40%_25%]';
      default:
        return 'rounded-full';
    }
  };

  const shapeClass = getShapeBorderRadius(shape);
  const rawSvg = (officialLawnicons as Record<string, string>)[appId];
  const brand = APP_BRAND_COLORS[appId] || { bg: '#1e88e5', fg: '#ffffff' };

  if (appId === 'facebook') {
    const fbSvg = (
      <svg viewBox="0 0 192 192" width="100%" height="100%" fill="currentColor">
        <path d="M125.8 107.5l4.3-28.3h-27.1v-18.4c0-7.8 3.8-15.4 16.1-15.4h12.5V41.3c-2.6-.4-11.6-1.3-22-1.3-22.5 0-37.1 13.7-37.1 38.3v20.9H47.5v28.3h25v68.5h30.9v-68.5h22.4z" />
      </svg>
    );

    if (isThemed) {
      return (
        <div
          className={`relative flex items-center justify-center transition-all duration-300 ${shapeClass} ${className}`}
          style={{
            width: size,
            height: size,
            backgroundColor: 'var(--md-primary-container)',
            color: 'var(--md-on-primary-container)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}
        >
          <div className="w-[58%] h-[58%] flex items-center justify-center fill-current">
            {fbSvg}
          </div>
        </div>
      );
    }

    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden transition-all duration-300 shadow-md ${shapeClass} ${className}`}
        style={{
          width: size,
          height: size,
          backgroundColor: '#1877f2',
          color: '#ffffff',
          boxShadow: '0 3px 10px rgba(24,119,242,0.35)',
        }}
      >
        <div className="w-[58%] h-[58%] flex items-center justify-center fill-current">
          {fbSvg}
        </div>
      </div>
    );
  }

  // 1. Themed Icons (Material You Monet monochrome dynamic styling)
  if (isThemed) {
    return (
      <div
        className={`relative flex items-center justify-center transition-all duration-300 ${shapeClass} ${className}`}
        style={{
          width: size,
          height: size,
          backgroundColor: 'var(--md-primary-container)',
          color: 'var(--md-on-primary-container)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        {rawSvg ? (
          <div
            className="w-[58%] h-[58%] flex items-center justify-center fill-current stroke-current"
            style={{ color: 'var(--md-on-primary-container)' }}
            dangerouslySetInnerHTML={{
              __html: cleanLawniconsSvg(rawSvg, 'currentColor'),
            }}
          />
        ) : (
          <div className="w-[50%] h-[50%] rounded-full bg-current opacity-70" />
        )}
      </div>
    );
  }

  // 2. Standard Lawnicons Brand Container mode (Official icon on branded squircle/circle)
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden transition-all duration-300 shadow-md ${shapeClass} ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: brand.bg,
        color: brand.fg,
        boxShadow: '0 3px 10px rgba(0,0,0,0.18)',
      }}
    >
      {rawSvg ? (
        <div
          className="w-[58%] h-[58%] flex items-center justify-center fill-current stroke-current"
          style={{ color: brand.fg }}
          dangerouslySetInnerHTML={{
            __html: cleanLawniconsSvg(rawSvg, brand.fg),
          }}
        />
      ) : (
        <span className="text-xs font-bold uppercase">{appId.slice(0, 2)}</span>
      )}
    </div>
  );
};

// Clean Lawnicons SVG to adapt cleanly to strokes and fills
function cleanLawniconsSvg(svgText: string, color: string): string {
  let cleaned = svgText
    .replace(/stroke="#[0-9a-fA-F]+"/gi, `stroke="${color}"`)
    .replace(/stroke="black"/gi, `stroke="${color}"`)
    .replace(/stroke="#000"/gi, `stroke="${color}"`)
    .replace(/fill="#[0-9a-fA-F]+"/gi, `fill="${color}"`)
    .replace(/fill="black"/gi, `fill="${color}"`)
    .replace(/fill="#000"/gi, `fill="${color}"`);

  // Extract inner SVG content while maintaining viewBox
  const viewBoxMatch = svgText.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 192 192';

  const innerContent = cleaned
    .replace(/<svg[^>]*>/i, '')
    .replace(/<\/svg>/i, '');

  return `<svg viewBox="${viewBox}" width="100%" height="100%" fill="none" stroke="${color}" stroke-linecap="round" stroke-linejoin="round">${innerContent}</svg>`;
}
