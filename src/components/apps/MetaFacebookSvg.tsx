import React from 'react';

// Exact vector path data parsed directly from Meta fb_ic_*.xml files inside com.facebook.katana APK

export const MetaFacebookLogo: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 36 }) => (
  <svg viewBox="0 0 36 36" width={size} height={size} fill="#0866FF" className={className}>
    <path d="M20.181 35.87C29.094 34.791 36 27.202 36 18c0-9.941-8.059-18-18-18S0 8.059 0 18c0 8.442 5.811 15.526 13.652 17.471L14 34h5.5l.681 1.87Z" fill="#0866FF" />
    <path d="M13.651 35.471v-11.97H9.936V18h3.715v-2.37c0-6.127 2.772-8.964 8.784-8.964 1.138 0 3.103.223 3.91.446v4.983c-.425-.043-1.167-.065-2.081-.065-2.952 0-4.09 1.116-4.09 4.025V18h5.883l-1.008 5.5h-4.867v12.37a18.183 18.183 0 0 1-6.53-.399Z" fill="#FFFFFF" />
  </svg>
);

export const MetaNavHomeIcon: React.FC<{ className?: string; size?: number; fill?: string; active?: boolean }> = ({ className = '', size = 24, fill = '#65686C', active }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={active ? '#0866FF' : fill} className={className}>
    <path d="M12 2.1 1 12h3v9h6v-6h4v6h6v-9h3L12 2.1z" />
  </svg>
);

export const MetaNavFriendsIcon: React.FC<{ className?: string; size?: number; fill?: string; active?: boolean }> = ({ className = '', size = 24, fill = '#65686C', active }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={active ? '#0866FF' : fill} className={className}>
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
);

export const MetaNavGroupsIcon: React.FC<{ className?: string; size?: number; fill?: string; active?: boolean }> = ({ className = '', size = 24, fill = '#65686C', active }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={active ? '#0866FF' : fill} className={className}>
    <path d="M12.496 5a4 4 0 1 1 8 0 4 4 0 0 1-8 0zm4-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-9 2.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm-2 4a2 2 0 1 1 4 0 2 2 0 0 1-4 0zM5.5 15a5 5 0 0 0-5 5 3 3 0 0 0 3 3h8.006a3 3 0 0 0 3-3 5 5 0 0 0-5-5H5.5zm-3 5a3 3 0 0 1 3-3h4.006a3 3 0 0 1 3 3 1 1 0 0 1-1 1H3.5a1 1 0 0 1-1-1zm12-9.5a5.04 5.04 0 0 0-.37.014 1 1 0 0 0 .146 1.994c.074-.005.149-.008.224-.008h4.006a3 3 0 0 1 3 3 1 1 0 0 1-1 1h-3.398a1 1 0 1 0 0 2h3.398a3 3 0 0 0 3-3 5 5 0 0 0-5-5H14.5z" />
  </svg>
);

export const MetaNavWatchIcon: React.FC<{ className?: string; size?: number; fill?: string; active?: boolean }> = ({ className = '', size = 24, fill = '#65686C', active }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={active ? '#0866FF' : fill} className={className}>
    <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12zm-11-2 6-4-6-4v8z" />
  </svg>
);

export const MetaNavMarketIcon: React.FC<{ className?: string; size?: number; fill?: string; active?: boolean }> = ({ className = '', size = 24, fill = '#65686C', active }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={active ? '#0866FF' : fill} className={className}>
    <path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z" />
  </svg>
);

export const MetaNavBellIcon: React.FC<{ className?: string; size?: number; fill?: string; active?: boolean }> = ({ className = '', size = 24, fill = '#65686C', active }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={active ? '#0866FF' : fill} className={className}>
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
  </svg>
);

export const MetaBellIcon = MetaNavBellIcon;

export const MetaNavMenuIcon: React.FC<{ className?: string; size?: number; fill?: string; active?: boolean }> = ({ className = '', size = 24, fill = '#65686C', active }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={active ? '#0866FF' : fill} className={className}>
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </svg>
);

export const MetaMenuGridIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
    <path d="M18.5 1A1.5 1.5 0 0 0 17 2.5v3A1.5 1.5 0 0 0 18.5 7h3A1.5 1.5 0 0 0 23 5.5v-3A1.5 1.5 0 0 0 21.5 1h-3zm0 8a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0 21.5 9h-3zm-16 8A1.5 1.5 0 0 0 1 18.5v3A1.5 1.5 0 0 0 2.5 23h3A1.5 1.5 0 0 0 7 21.5v-3A1.5 1.5 0 0 0 5.5 17h-3zm8 0A1.5 1.5 0 0 0 9 18.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3a1.5 1.5 0 0 0-1.5-1.5h-3zm8 0a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3a1.5 1.5 0 0 0-1.5-1.5h-3zm-16-8A1.5 1.5 0 0 0 1 10.5v3A1.5 1.5 0 0 0 2.5 15h3A1.5 1.5 0 0 0 7 13.5v-3A1.5 1.5 0 0 0 5.5 9h-3zm0-8A1.5 1.5 0 0 0 1 2.5v3A1.5 1.5 0 0 0 2.5 7h3A1.5 1.5 0 0 0 7 5.5v-3A1.5 1.5 0 0 0 5.5 1h-3zm8 0A1.5 1.5 0 0 0 9 2.5v3A1.5 1.5 0 0 0 10.5 7h3A1.5 1.5 0 0 0 15 5.5v-3A1.5 1.5 0 0 0 13.5 1h-3zm0 8A1.5 1.5 0 0 0 9 10.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0 13.5 9h-3z" />
  </svg>
);

export const MetaPlusIcon: React.FC<{ className?: string; size?: number; fill?: string }> = ({ className = '', size = 16, fill = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={fill} className={className}>
    <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" />
  </svg>
);

export const MetaEditPencilIcon: React.FC<{ className?: string; size?: number; fill?: string }> = ({ className = '', size = 16, fill = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={fill} className={className}>
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  </svg>
);

export const MetaCameraIcon: React.FC<{ className?: string; size?: number; fill?: string }> = ({ className = '', size = 16, fill = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={fill} className={className}>
    <path d="M12 15c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0-8c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm7-2h-3.17L14.4 3.5c-.37-.5-.96-.8-1.58-.8h-3.64c-.62 0-1.21.3-1.58.8L6.17 5H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2z" />
  </svg>
);

export const MetaLikeThumbIcon: React.FC<{ className?: string; size?: number; fill?: string }> = ({ className = '', size = 18, fill = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={fill} className={className}>
    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
  </svg>
);

export const MetaSearchIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 20 }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} fill="currentColor" className={className}>
    <g fillRule="evenodd" transform="translate(-448 -544)">
      <g fillRule="nonzero">
        <path d="M10.743 2.257a6 6 0 1 1-8.485 8.486 6 6 0 0 1 8.485-8.486zm-1.06 1.06a4.5 4.5 0 1 0-6.365 6.364 4.5 4.5 0 0 0 6.364-6.363z" transform="translate(448 544)" />
        <path d="m13.463 15.142-.04-.044-3.574-4.192c-.599-.703.355-1.656 1.058-1.057l4.191 3.574.044.04c.058.059.122.137.182.24.249.425.249.96-.154 1.41l-.057.057c-.45.403-.986.403-1.411.154a1.182 1.182 0 0 1-.24-.182zm.617-.616.444-.444a.31.31 0 0 0-.063-.052c-.093-.055-.263-.055-.35.024l.208.232.207-.206.006.007-.22.257-.026-.024.033-.034.025.027-.257.22-.007-.007zm-.027-.415c-.078.088-.078.257-.023.35a.31.31 0 0 0 .051.063l.205-.204-.233-.209z" transform="translate(448 544)" />
      </g>
    </g>
  </svg>
);

export const MetaMessengerIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 20 }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M.5 8a7.5 7.5 0 1 1 4.006 6.638.341.341 0 0 0-.236-.041l-2.193.534A1 1 0 0 1 .87 13.923l.534-2.193a.341.341 0 0 0-.04-.236A7.47 7.47 0 0 1 .5 8zm11.389-.907a.56.56 0 0 0-.79-.78L9.25 7.75 7.294 6.327a1 1 0 0 0-1.386.205L4.111 8.906a.56.56 0 0 0 .791.781L6.75 8.25l1.957 1.423a1 1 0 0 0 1.385-.205l1.797-2.375z" clipRule="evenodd" />
  </svg>
);

export const MetaCommentIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
    <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
  </svg>
);

export const MetaShareIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
  </svg>
);

export const MetaMoreDotsIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 20 }) => (
  <svg viewBox="0 0 20 20" width={size} height={size} fill="currentColor" className={className}>
    <circle cx="4" cy="10" r="2" />
    <circle cx="10" cy="10" r="2" />
    <circle cx="16" cy="10" r="2" />
  </svg>
);

export const MetaArrowBackIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 20 }) => (
  <svg viewBox="0 0 20 20" width={size} height={size} fill="currentColor" className={className}>
    <path d="M8.043 3.043a1 1 0 1 1 1.414 1.414c-.638.639-1.32 1.32-2.018 2.015-.84.836-1.701 1.696-2.532 2.528H17.25a1 1 0 1 1 0 2H4.912l2.556 2.554.003.003 1.986 1.986a1 1 0 1 1-1.414 1.414l-1.987-1.986a7265.663 7265.663 0 0 1-3.21-3.209 2.495 2.495 0 0 1-.003-3.526C3.87 7.206 4.97 6.11 6.03 5.051a1339 1339 0 0 0 2.013-2.008z" />
  </svg>
);

export const MetaGraduationIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
    <path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3zM3.45 13.47 12 18.13l8.55-4.66v3.13L12 21.26 3.45 16.6v-3.13z" />
  </svg>
);

export const MetaLocationIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

export const MetaFollowersIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
);
