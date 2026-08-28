import React from 'react';

const KATANA_ICON_ROOT = '/facebook/katana-current';

const KatanaMask: React.FC<{
  asset: string;
  size: number;
  color: string;
  className?: string;
}> = ({ asset, size, color, className = '' }) => (
  <span
    aria-hidden="true"
    className={`inline-block shrink-0 ${className}`}
    style={{
      width: size,
      height: size,
      backgroundColor: color,
      WebkitMaskImage: `url(${KATANA_ICON_ROOT}/${asset}.png)`,
      maskImage: `url(${KATANA_ICON_ROOT}/${asset}.png)`,
      WebkitMaskPosition: 'center',
      maskPosition: 'center',
      WebkitMaskRepeat: 'no-repeat',
      maskRepeat: 'no-repeat',
      WebkitMaskSize: 'contain',
      maskSize: 'contain',
    }}
  />
);

// Facebook logo retained separately; interface glyphs use exact Katana APK masks.

export const MetaFacebookLogo: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 36 }) => (
  <svg viewBox="0 0 36 36" width={size} height={size} fill="#0866FF" className={className}>
    <path d="M20.181 35.87C29.094 34.791 36 27.202 36 18c0-9.941-8.059-18-18-18S0 8.059 0 18c0 8.442 5.811 15.526 13.652 17.471L14 34h5.5l.681 1.87Z" fill="#0866FF" />
    <path d="M13.651 35.471v-11.97H9.936V18h3.715v-2.37c0-6.127 2.772-8.964 8.784-8.964 1.138 0 3.103.223 3.91.446v4.983c-.425-.043-1.167-.065-2.081-.065-2.952 0-4.09 1.116-4.09 4.025V18h5.883l-1.008 5.5h-4.867v12.37a18.183 18.183 0 0 1-6.53-.399Z" fill="#FFFFFF" />
  </svg>
);

// 1. HOME TAB — current Katana active/inactive density-split masks.
export const MetaNavHomeIcon: React.FC<{ active?: boolean; size?: number }> = ({ active = false, size = 24 }) => (
  <KatanaMask
    asset={active ? 'fb_ic_house_filled_24' : 'fb_ic_house_outline_24'}
    size={size}
    color={active ? '#0866FF' : '#65676B'}
  />
);

// 2. VIDEO / REELS TAB (SVG 5)
export const MetaNavWatchIcon: React.FC<{ active?: boolean; size?: number }> = ({ active = false, size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={active ? '#0866FF' : '#65676B'}>
    <path d="M10.996 12.132A1 1 0 0 0 9.5 13v4a1 1 0 0 0 1.496.868l3.5-2a1 1 0 0 0 0-1.736l-3.5-2z" />
    <path d="M12.075 1h-.15C9.632 1 7.81 1 6.38 1.192c-1.472.198-2.674.616-3.623 1.565-.949.95-1.367 2.15-1.565 3.623C1 7.81 1 9.632 1 11.925v.15c0 2.293 0 4.116.192 5.545.198 1.472.616 2.674 1.565 3.623.95.949 2.15 1.367 3.623 1.565C7.81 23 9.632 23 11.925 23h.15c2.293 0 4.116 0 5.545-.192 1.472-.198 2.674-.616 3.623-1.565.949-.95 1.367-2.15 1.565-3.623.192-1.43.192-3.252.192-5.545v-.15c0-2.293 0-4.116-.192-5.545-.198-1.472-.616-2.674-1.565-3.623-.95-.949-2.15-1.367-3.623-1.565C16.19 1 14.368 1 12.075 1zM4.172 4.172c.515-.516 1.224-.83 2.475-.998l.183-.023L8.113 7H3.132c.013-.121.027-.239.042-.353.168-1.25.482-1.96.998-2.475zM10.22 7 8.895 3.023C9.778 3 10.801 3 12 3c.642 0 1.234 0 1.78.004L15.114 7H10.22zm6.253 2h4.507c.02.86.02 1.848.02 3 0 2.385-.002 4.074-.174 5.353-.168 1.25-.482 1.96-.998 2.475-.515.516-1.224.83-2.475.998-1.28.172-2.968.174-5.353.174s-4.074-.002-5.353-.174c-1.25-.168-1.96-.482-2.475-.998-.516-.515-.83-1.224-.998-2.475C3.002 16.073 3 14.385 3 12c0-1.152 0-2.14.02-3h13.454zm.747-2-1.316-3.949c.537.026 1.016.065 1.448.123 1.25.168 1.96.482 2.475.998.516.515.83 1.224.998 2.475.015.114.03.232.042.353H17.22z" />
  </svg>
);

// 3. FRIENDS / GROUPS TAB (SVG 6)
export const MetaNavFriendsIcon: React.FC<{ active?: boolean; size?: number }> = ({ active = false, size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={active ? '#0866FF' : '#65676B'}>
    <path d="M12.496 5a4 4 0 1 1 8 0 4 4 0 0 1-8 0zm4-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-9 2.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm-2 4a2 2 0 1 1 4 0 2 2 0 0 1-4 0zM5.5 15a5 5 0 0 0-5 5 3 3 0 0 0 3 3h8.006a3 3 0 0 0 3-3 5 5 0 0 0-5-5H5.5zm-3 5a3 3 0 0 1 3-3h4.006a3 3 0 0 1 3 3 1 1 0 0 1-1 1H3.5a1 1 0 0 1-1-1zm12-9.5a5.04 5.04 0 0 0-.37.014 1 1 0 0 0 .146 1.994c.074-.005.149-.008.224-.008h4.006a3 3 0 0 1 3 3 1 1 0 0 1-1 1h-3.398a1 1 0 1 0 0 2h3.398a3 3 0 0 0 3-3 5 5 0 0 0-5-5H14.5z" />
  </svg>
);

export const MetaNavGroupsIcon = MetaNavFriendsIcon;

// 4. STORE / MARKETPLACE TAB (SVG 7)
export const MetaNavMarketIcon: React.FC<{ active?: boolean; size?: number }> = ({ active = false, size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={active ? '#0866FF' : '#65676B'}>
    <path d="M1.588 3.227A3.125 3.125 0 0 1 4.58 1h14.84c1.38 0 2.597.905 2.993 2.227l.816 2.719a6.47 6.47 0 0 1 .272 1.854A5.183 5.183 0 0 1 22 11.455v4.615c0 1.355 0 2.471-.119 3.355-.125.928-.396 1.747-1.053 2.403-.656.657-1.475.928-2.403 1.053-.884.12-2 .119-3.354.119H8.929c-1.354 0-2.47 0-3.354-.119-.928-.125-1.747-.396-2.403-1.053-.657-.656-.929-1.475-1.053-2.403-.12-.884-.119-2-.119-3.354V11.5l.001-.045A5.184 5.184 0 0 1 .5 7.8c0-.628.092-1.252.272-1.854l.816-2.719zM10 21h4v-3.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V21zm6-.002c.918-.005 1.608-.025 2.159-.099.706-.095 1.033-.262 1.255-.485.223-.222.39-.55.485-1.255.099-.735.101-1.716.101-3.159v-3.284a5.195 5.195 0 0 1-1.7.284 5.18 5.18 0 0 1-3.15-1.062A5.18 5.18 0 0 1 12 13a5.18 5.18 0 0 1-3.15-1.062A5.18 5.18 0 0 1 5.7 13a5.2 5.2 0 0 1-1.7-.284V16c0 1.442.002 2.424.1 3.159.096.706.263 1.033.486 1.255.222.223.55.39 1.255.485.551.074 1.24.094 2.159.1V17.5a2.5 2.5 0 0 1 2.5-2.5h3a2.5 2.5 0 0 1 2.5 2.5v3.498zM4.581 3c-.497 0-.935.326-1.078.802l-.815 2.72A4.45 4.45 0 0 0 2.5 7.8a3.2 3.2 0 0 0 5.6 2.117 1 1 0 0 1 1.5 0A3.19 3.19 0 0 0 12 11a3.19 3.19 0 0 0 2.4-1.083 1 1 0 0 1 1.5 0A3.2 3.2 0 0 0 21.5 7.8c0-.434-.063-.865-.188-1.28l-.816-2.72A1.125 1.125 0 0 0 19.42 3H4.58z" />
  </svg>
);

// 5. NOTIFICATIONS TAB — current Katana active/inactive density-split masks.
export const MetaNavBellIcon: React.FC<{ active?: boolean; size?: number }> = ({ active = false, size = 24 }) => (
  <KatanaMask
    asset={active ? 'fb_ic_bell_filled_24' : 'fb_ic_bell_outline_24'}
    size={size}
    color={active ? '#0866FF' : '#65676B'}
  />
);

export const MetaBellIcon = MetaNavBellIcon;

// 6. MENU TAB (SVG 8)
export const MetaNavMenuIcon: React.FC<{ active?: boolean; size?: number }> = ({ active = false, size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={active ? '#0866FF' : '#65676B'}>
    <path d="M.5 12c0 6.351 5.149 11.5 11.5 11.5S23.5 18.351 23.5 12 18.351.5 12 .5.5 5.649.5 12zm2 0c0-.682.072-1.348.209-1.99a2 2 0 0 1 0 3.98A9.539 9.539 0 0 1 2.5 12zm.84-3.912A9.502 9.502 0 0 1 12 2.5a9.502 9.502 0 0 1 8.66 5.588 4.001 4.001 0 0 0 0 7.824 9.514 9.514 0 0 1-1.755 2.613A5.002 5.002 0 0 0 14 14.5h-4a5.002 5.002 0 0 0-4.905 4.025 9.515 9.515 0 0 1-1.755-2.613 4.001 4.001 0 0 0 0-7.824zM12 5a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm-2 4a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm11.291 1.01a9.538 9.538 0 0 1 0 3.98 2 2 0 0 1 0-3.98zM16.99 20.087A9.455 9.455 0 0 1 12 21.5c-1.83 0-3.54-.517-4.99-1.414a1.004 1.004 0 0 1-.01-.148V19.5a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v.438a1 1 0 0 1-.01.148z" />
  </svg>
);

// OFFICIAL SEARCH SVG (SVG 3)
export const MetaSearchIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 18 }) => (
  <KatanaMask asset="fb_ic_magnifying_glass_filled_24" size={size} color="#050505" className={className} />
);

// OFFICIAL MESSENGER SVG (SVG 10)
export const MetaMessengerIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 18 }) => (
  <KatanaMask asset="fb_ic_app_messenger_outline_24" size={size} color="#050505" className={className} />
);

// OFFICIAL PLUS SVG (SVG 18)
export const MetaPlusIcon: React.FC<{ className?: string; size?: number; fill?: string }> = ({ className = '', size = 18, fill = '#050505' }) => (
  <KatanaMask asset="fb_ic_plus_filled_24" size={size} color={fill} className={className} />
);

// OFFICIAL 3 DOTS (SVG 21)
export const MetaMoreDotsIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 18 }) => (
  <KatanaMask asset="fb_ic_more_filled_24" size={size} color="#65676B" className={className} />
);

// OFFICIAL EDIT PENCIL (SVG 26)
export const MetaEditPencilIcon: React.FC<{ className?: string; size?: number; fill?: string }> = ({ className = '', size = 16, fill = '#050505' }) => (
  <KatanaMask asset="fb_ic_pencil_outline_24" size={size} color={fill} className={className} />
);

// OFFICIAL COMPOSER PHOTO SVG
export const MetaComposerPhotoIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <KatanaMask asset="fb_ic_photo_filled_24" size={size} color="#45BD62" />
);

// OFFICIAL CAMERA
export const MetaCameraIcon: React.FC<{ className?: string; size?: number; fill?: string }> = ({ className = '', size = 16, fill = '#050505' }) => (
  <KatanaMask asset="fb_ic_camera_outline_24" size={size} color={fill} className={className} />
);

// LIKE THUMB — APK meta_brand_design_system_icons_vector_hand_thumbs_up_outline_24
export const MetaLikeThumbIcon: React.FC<{ className?: string; size?: number; fill?: string }> = ({ className = '', size = 18, fill = '#65676B' }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={fill} className={className}>
    <path d="M20.87,9.43C20.4,9.15 19.86,9 19.31,9h-5.85c0.44,-1.14 0.79,-2.33 1.04,-3.52 0.18,-0.85 -0.03,-1.73 -0.58,-2.41A2.87,2.87 0,0 0,11.68 2c-0.76,0 -1.45,0.42 -1.79,1.11L8.21,6.47 6.88,8.59C6.33,9.47 5.38,10 4.34,10H2.99c-0.55,0 -1,0.45 -1,1s0.45,1 1,1h1.35c1.73,0 3.32,-0.88 4.24,-2.35l1.37,-2.2L11.67,4c0.37,0 0.59,0.2 0.69,0.33 0.1,0.12 0.25,0.38 0.18,0.74 -0.23,1.09 -0.55,2.18 -0.96,3.22l-0.26,0.67a1.497,1.497 0,0 0,1.4 2.04h6.58c0.19,0 0.37,0.05 0.53,0.15 0.18,0.11 0.22,0.28 0.23,0.37s0,0.26 -0.17,0.4l-0.41,0.33c-0.53,0.42 -0.65,1.2 -0.28,1.76 0.13,0.19 0.08,0.45 -0.1,0.59l-0.49,0.37c-0.53,0.4 -0.7,1.12 -0.41,1.71 0.18,0.36 0.03,0.81 -0.39,1.02 -0.56,0.28 -0.84,0.95 -0.63,1.57a0.546,0.546 0,0 1,-0.52 0.72h-5.09c-1.34,0 -2.59,-0.52 -3.54,-1.46l-0.07,-0.07C7.02,17.52 5.76,17 4.42,17H3c-0.55,0 -1,0.45 -1,1s0.45,1 1,1h1.42c0.79,0 1.56,0.32 2.12,0.88l0.07,0.07A6.96,6.96 0,0 0,11.56 22h5.09a2.55,2.55 0,0 0,2.53 -2.8c0.89,-0.67 1.29,-1.83 0.99,-2.91l0.12,-0.09c0.86,-0.64 1.18,-1.75 0.85,-2.73 0.63,-0.5 0.97,-1.28 0.91,-2.09 -0.05,-0.81 -0.5,-1.54 -1.19,-1.95z" />
  </svg>
);

// COMMENT — APK meta_brand_design_system_icons_vector_speech_bubble_outline_24
export const MetaCommentIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="#65676B" className={className}>
    <path d="M5,18.67V21c0,0.32 0.15,0.62 0.42,0.81 0.17,0.12 0.38,0.19 0.58,0.19 0.11,0 0.21,-0.02 0.32,-0.05l3.3,-1.1c0.16,-0.05 0.33,-0.06 0.53,-0.02 0.62,0.12 1.25,0.17 1.86,0.17 5.5,0 9.97,-4.26 9.97,-9.5S17.51,2 12.01,2s-9.97,4.26 -9.97,9.5c0,2.43 0.97,4.75 2.74,6.52 0.15,0.15 0.24,0.39 0.24,0.65zM11.998,4c4.4,0 7.97,3.36 7.97,7.5 0,4.59 -4.43,8.29 -9.47,7.36 -0.53,-0.1 -1.04,-0.07 -1.52,0.09l-1.98,0.66v-0.94c0,-0.8 -0.29,-1.53 -0.82,-2.06 -1.39,-1.4 -2.15,-3.21 -2.15,-5.11C4.029,7.36 7.609,4 12,4" />
  </svg>
);

// SHARE — APK-style forward arrow
export const MetaShareIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="#65676B" className={className}>
    <path d="M12.3 2.3a1 1 0 0 1 1.4 0l5 5a1 1 0 0 1-1.4 1.4L14 5.42V15a1 1 0 1 1-2 0V5.41L8.7 8.7a1 1 0 0 1-1.4-1.4l5-5zM5 14a1 1 0 0 0-2 0v4.5A2.5 2.5 0 0 0 5.5 21h13a2.5 2.5 0 0 0 2.5-2.5V14a1 1 0 1 0-2 0v4.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V14z" />
  </svg>
);

// NAVICON / HAMBURGER — 3-bar menu icon
export const MetaNaviconIcon: React.FC<{ className?: string; size?: number; fill?: string }> = ({ className = '', size = 20, fill = '#050505' }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={fill} className={className}>
    <path d="M3 5.5a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm0 6.5a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm0 6.5a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1z" />
  </svg>
);

// VERIFIED BADGE — blue circle with white checkmark
export const MetaVerifiedBadge: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 16 }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className}>
    <circle cx="8" cy="8" r="8" fill="#0866FF" />
    <path d="M6.53 11.53a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06L6 9.94l4.47-4.47a.75.75 0 1 1 1.06 1.06l-5 5z" fill="#FFFFFF" />
  </svg>
);

// GLOBE — public audience indicator
export const MetaGlobeIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 12 }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} fill="#65676B" className={className}>
    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm-.5 1.56v2.6l-2.31.28C6.22 2.8 7.07 1.94 7.5 1.55zm1 0c.43.39 1.28 1.25 2.31 2.89l-2.31-.28v-2.6zM5.02 4.72 7.5 5.03v2.44H3.06a6.49 6.49 0 0 1 1.96-2.75zm5.96 0a6.49 6.49 0 0 1 1.96 2.75H8.5V5.03l2.48-.31zM3.06 8.53H7.5v2.44l-2.48.31A6.49 6.49 0 0 1 3.06 8.53zm5.44 0h4.44a6.49 6.49 0 0 1-1.96 2.75L8.5 10.97V8.53zm-1 3.32v2.6c-.43-.39-1.28-1.25-2.31-2.88l2.31.28zm1 0 2.31-.28c-1.03 1.63-1.88 2.49-2.31 2.88v-2.6z" />
  </svg>
);

// CLOSE X — inline SVG, no Lucide dependency
export const MetaCloseIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="#65676B" className={className}>
    <path d="M18.36 5.64a1 1 0 0 0-1.41 0L12 10.59 7.05 5.64a1 1 0 0 0-1.41 1.41L10.59 12l-4.95 4.95a1 1 0 1 0 1.41 1.41L12 13.41l4.95 4.95a1 1 0 0 0 1.41-1.41L13.41 12l4.95-4.95a1 1 0 0 0 0-1.41z" />
  </svg>
);

export const MetaArrowBackIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 20 }) => (
  <svg viewBox="0 0 20 20" width={size} height={size} fill="#050505" className={className}>
    <path d="M8.043 3.043a1 1 0 1 1 1.414 1.414c-.638.639-1.32 1.32-2.018 2.015-.84.836-1.701 1.696-2.532 2.528H17.25a1 1 0 1 1 0 2H4.912l2.556 2.554.003.003 1.986 1.986a1 1 0 1 1-1.414 1.414l-1.987-1.986a7265.663 7265.663 0 0 1-3.21-3.209 2.495 2.495 0 0 1-.003-3.526C3.87 7.206 4.97 6.11 6.03 5.051a1339 1339 0 0 0 2.013-2.008z" />
  </svg>
);

export const MetaGraduationIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="#65676B" className={className}>
    <path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3zM3.45 13.47 12 18.13l8.55-4.66v3.13L12 21.26 3.45 16.6v-3.13z" />
  </svg>
);

export const MetaLocationIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="#65676B" className={className}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

export const MetaFollowersIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="#65676B" className={className}>
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
);

export const MetaMenuGridIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="#050505" className={className}>
    <path d="M18.5 1A1.5 1.5 0 0 0 17 2.5v3A1.5 1.5 0 0 0 18.5 7h3A1.5 1.5 0 0 0 23 5.5v-3A1.5 1.5 0 0 0 21.5 1h-3zm0 8a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0 21.5 9h-3zm-16 8A1.5 1.5 0 0 0 1 18.5v3A1.5 1.5 0 0 0 2.5 23h3A1.5 1.5 0 0 0 7 21.5v-3A1.5 1.5 0 0 0 5.5 17h-3zm8 0A1.5 1.5 0 0 0 9 18.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3a1.5 1.5 0 0 0-1.5-1.5h-3zm8 0a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3a1.5 1.5 0 0 0-1.5-1.5h-3zm-16-8A1.5 1.5 0 0 0 1 10.5v3A1.5 1.5 0 0 0 2.5 15h3A1.5 1.5 0 0 0 7 13.5v-3A1.5 1.5 0 0 0 5.5 9h-3zm0-8A1.5 1.5 0 0 0 1 2.5v3A1.5 1.5 0 0 0 2.5 7h3A1.5 1.5 0 0 0 7 5.5v-3A1.5 1.5 0 0 0 5.5 1h-3zm8 0A1.5 1.5 0 0 0 9 2.5v3A1.5 1.5 0 0 0 10.5 7h3A1.5 1.5 0 0 0 15 5.5v-3A1.5 1.5 0 0 0 13.5 1h-3zm0 8A1.5 1.5 0 0 0 9 10.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0 13.5 9h-3z" />
  </svg>
);
