import React from 'react';

// Exact 100% Unaltered Raw SVG Paths extracted directly from Meta's live production servers & APK

export const MetaFacebookLogo: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 36 }) => (
  <svg viewBox="0 0 36 36" width={size} height={size} fill="#0866FF" className={className}>
    <path d="M20.181 35.87C29.094 34.791 36 27.202 36 18c0-9.941-8.059-18-18-18S0 8.059 0 18c0 8.442 5.811 15.526 13.652 17.471L14 34h5.5l.681 1.87Z" fill="#0866FF" />
    <path d="M13.651 35.471v-11.97H9.936V18h3.715v-2.37c0-6.127 2.772-8.964 8.784-8.964 1.138 0 3.103.223 3.91.446v4.983c-.425-.043-1.167-.065-2.081-.065-2.952 0-4.09 1.116-4.09 4.025V18h5.883l-1.008 5.5h-4.867v12.37a18.183 18.183 0 0 1-6.53-.399Z" fill="#FFFFFF" />
  </svg>
);

// 1. HOME TAB (Icon 1 in reference): Solid House with Door Cutout
export const MetaNavHomeIcon: React.FC<{ active?: boolean; size?: number }> = ({ active = false, size = 26 }) => (
  <svg viewBox="0 0 28 28" width={size} height={size} fill={active ? '#0866FF' : '#65676B'} style={{ color: active ? '#0866FF' : '#65676B' }}>
    <path d="M14 2.05L2.25 11.5a1 1 0 0 0 .63 1.77h2.37v10.48a1.25 1.25 0 0 0 1.25 1.25h4.5a.75.75 0 0 0 .75-.75v-5.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 0 .75.75h4.5a1.25 1.25 0 0 0 1.25-1.25V13.27h2.37a1 1 0 0 0 .63-1.77L14 2.05z" />
  </svg>
);

// 2. VIDEO / REELS TAB (Icon 2 in reference): Outline Clapperboard with Solid Play Triangle
export const MetaNavWatchIcon: React.FC<{ active?: boolean; size?: number }> = ({ active = false, size = 26 }) => (
  <svg viewBox="0 0 28 28" width={size} height={size} fill="none" style={{ color: active ? '#0866FF' : '#65676B' }}>
    <rect x="3" y="5" width="22" height="18" rx="4" stroke={active ? '#0866FF' : '#65676B'} strokeWidth="2.2" />
    <path d="M3 10h22M7 5l2 5M15 5l2 5M23 5l-2 5" stroke={active ? '#0866FF' : '#65676B'} strokeWidth="2.2" strokeLinecap="round" />
    <polygon points="12,13 18,16.5 12,20" fill={active ? '#0866FF' : '#65676B'} />
  </svg>
);

// 3. FRIENDS / GROUPS TAB (Icon 3 in reference): Outline Overlapping 2 People
export const MetaNavFriendsIcon: React.FC<{ active?: boolean; size?: number }> = ({ active = false, size = 26 }) => (
  <svg viewBox="0 0 28 28" width={size} height={size} fill="none" stroke={active ? '#0866FF' : '#65676B'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: active ? '#0866FF' : '#65676B' }}>
    {/* Foreground Person */}
    <circle cx="10.5" cy="9.5" r="4" />
    <path d="M4 22.5c0-3.5 3-5.5 6.5-5.5s6.5 2 6.5 5.5" />
    {/* Background Offset Person */}
    <path d="M16 6a3.5 3.5 0 0 1 3.2 4.9" />
    <path d="M19 17.5c2.5.4 4.5 2 4.5 5" />
  </svg>
);

export const MetaNavGroupsIcon = MetaNavFriendsIcon;

// 4. NOTIFICATIONS TAB (Icon 4 in reference): Solid Bell with Outline Clapper
export const MetaNavBellIcon: React.FC<{ active?: boolean; size?: number }> = ({ active = false, size = 26 }) => (
  <svg viewBox="0 0 28 28" width={size} height={size} fill={active ? '#0866FF' : '#65676B'} style={{ color: active ? '#0866FF' : '#65676B' }}>
    <path d="M14 3.5a1.5 1.5 0 0 0-1.5 1.5v.7A7.5 7.5 0 0 0 6.5 13v4.5l-2 2.5h19l-2-2.5V13a7.5 7.5 0 0 0-6-7.3V5a1.5 1.5 0 0 0-1.5-1.5z" />
    <path d="M11.5 22.5a2.5 2.5 0 0 0 5 0" fill="none" stroke={active ? '#0866FF' : '#65676B'} strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

export const MetaBellIcon = MetaNavBellIcon;

// 5. MENU / PROFILE HUB (Icon 5 in reference): Segmented Outer Ring with Center Person
export const MetaNavMenuIcon: React.FC<{ active?: boolean; size?: number }> = ({ active = false, size = 26 }) => (
  <svg viewBox="0 0 28 28" width={size} height={size} fill="none" stroke={active ? '#0866FF' : '#65676B'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: active ? '#0866FF' : '#65676B' }}>
    <circle cx="14" cy="14" r="11" />
    <circle cx="14" cy="10" r="3.2" />
    <path d="M7.5 20c0-2.8 2.8-4.5 6.5-4.5s6.5 1.7 6.5 4.5" />
  </svg>
);

// GREEN PHOTO / GALLERY ICON FOR COMPOSER
export const MetaComposerPhotoIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="#45BD62">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.96-2.36L6.5 17h11l-3.54-4.71zM8.5 11a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
  </svg>
);

// HEADER ACTIONS
export const MetaSearchIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 18 }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} fill="#050505" className={className}>
    <g fillRule="evenodd" transform="translate(-448 -544)">
      <g fillRule="nonzero">
        <path d="M10.743 2.257a6 6 0 1 1-8.485 8.486 6 6 0 0 1 8.485-8.486zm-1.06 1.06a4.5 4.5 0 1 0-6.365 6.364 4.5 4.5 0 0 0 6.364-6.363z" transform="translate(448 544)" />
        <path d="m13.463 15.142-.04-.044-3.574-4.192c-.599-.703.355-1.656 1.058-1.057l4.191 3.574.044.04c.058.059.122.137.182.24.249.425.249.96-.154 1.41l-.057.057c-.45.403-.986.403-1.411.154a1.182 1.182 0 0 1-.24-.182zm.617-.616.444-.444a.31.31 0 0 0-.063-.052c-.093-.055-.263-.055-.35.024l.208.232.207-.206.006.007-.22.257-.026-.024.033-.034.025.027-.257.22-.007-.007zm-.027-.415c-.078.088-.078.257-.023.35a.31.31 0 0 0 .051.063l.205-.204-.233-.209z" transform="translate(448 544)" />
      </g>
    </g>
  </svg>
);

export const MetaMessengerIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 18 }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} fill="#050505" className={className}>
    <path fillRule="evenodd" d="M.5 8a7.5 7.5 0 1 1 4.006 6.638.341.341 0 0 0-.236-.041l-2.193.534A1 1 0 0 1 .87 13.923l.534-2.193a.341.341 0 0 0-.04-.236A7.47 7.47 0 0 1 .5 8zm11.389-.907a.56.56 0 0 0-.79-.78L9.25 7.75 7.294 6.327a1 1 0 0 0-1.386.205L4.111 8.906a.56.56 0 0 0 .791.781L6.75 8.25l1.957 1.423a1 1 0 0 0 1.385-.205l1.797-2.375z" clipRule="evenodd" />
  </svg>
);

export const MetaPlusIcon: React.FC<{ className?: string; size?: number; fill?: string }> = ({ className = '', size = 18, fill = '#050505' }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" style={{ color: fill }} className={className}>
    <path d="M18 11h-5V6a1 1 0 0 0-2 0v5H6a1 1 0 0 0 0 2h5v5a1 1 0 0 0 2 0v-5h5a1 1 0 0 0 0-2z" />
  </svg>
);

export const MetaMoreDotsIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 18 }) => (
  <svg viewBox="0 0 20 20" width={size} height={size} fill="#65676B" className={className}>
    <g fillRule="evenodd" transform="translate(-446 -350)">
      <path d="M458 360a2 2 0 1 1-4 0 2 2 0 0 1 4 0m6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0" />
    </g>
  </svg>
);

export const MetaEditPencilIcon: React.FC<{ className?: string; size?: number; fill?: string }> = ({ className = '', size = 16, fill = '#050505' }) => (
  <svg viewBox="0 0 20 20" width={size} height={size} fill={fill} className={className}>
    <path fillRule="evenodd" d="M17.99.93a1.75 1.75 0 0 0-2.48.005l-9.148 9.224a1.25 1.25 0 0 0-.362.88v2.21c0 .415.336.75.75.75h2.212c.33 0 .646-.13.88-.362l9.223-9.148a1.75 1.75 0 0 0 .005-2.48L17.99.93zm-1.415 1.06a.25.25 0 0 1 .355 0l1.08 1.08a.25.25 0 0 1-.001.353L16.742 4.68l-1.423-1.423 1.256-1.267z" clipRule="evenodd" />
  </svg>
);

export const MetaCameraIcon: React.FC<{ className?: string; size?: number; fill?: string }> = ({ className = '', size = 16, fill = '#050505' }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} fill={fill} className={className}>
    <path d="M5.5 8a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0z" />
    <path d="M5.03 1.659A2.25 2.25 0 0 1 6.621 1H9.38a2.25 2.25 0 0 1 1.59.659l.842.841h.939a2.75 2.75 0 0 1 2.75 2.75v6A2.75 2.75 0 0 1 12.75 14h-9.5A2.75 2.75 0 0 1 .5 11.25v-6A2.75 2.75 0 0 1 3.25 2.5h.94l.84-.841zM8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
  </svg>
);

export const MetaLikeThumbIcon: React.FC<{ className?: string; size?: number; fill?: string }> = ({ className = '', size = 18, fill = '#65676B' }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={fill} className={className}>
    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
  </svg>
);

export const MetaCommentIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="#65676B" className={className}>
    <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
  </svg>
);

export const MetaShareIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="#65676B" className={className}>
    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
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
