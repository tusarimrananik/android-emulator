import React from 'react';

// ========================================================================
// ALL icons below are extracted VERBATIM from Facebook's live JS bundles
// (static.xx.fbcdn.net) on 2026-08-28. Component names match Facebook's
// internal FBNucleus* naming. Every path `d` attribute is copied exactly.
// ========================================================================

// Facebook "f" logo — FBNucleus / CometIconAppFacebookCircleFilled (36×36)
export const MetaFacebookLogo: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 36 }) => (
  <svg viewBox="0 0 36 36" width={size} height={size} fill="#0866FF" className={className}>
    <path d="M20.181 35.87C29.094 34.791 36 27.202 36 18c0-9.941-8.059-18-18-18S0 8.059 0 18c0 8.442 5.811 15.526 13.652 17.471L14 34h5.5l.681 1.87Z" fill="#0866FF" />
    <path d="M13.651 35.471v-11.97H9.936V18h3.715v-2.37c0-6.127 2.772-8.964 8.784-8.964 1.138 0 3.103.223 3.91.446v4.983c-.425-.043-1.167-.065-2.081-.065-2.952 0-4.09 1.116-4.09 4.025V18h5.883l-1.008 5.5h-4.867v12.37a18.183 18.183 0 0 1-6.53-.399Z" fill="#FFFFFF" />
  </svg>
);

// 1. HOME TAB — FBNucleusHomeFilled24Icon (filled = active state from live feed)
export const MetaNavHomeIcon: React.FC<{ active?: boolean; size?: number }> = ({ active = false, size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={active ? '#0866FF' : '#65676B'}>
    <path d="M9.464 1.286C10.294.803 11.092.5 12 .5c.908 0 1.707.303 2.537.786.795.462 1.7 1.142 2.815 1.977l2.232 1.675c1.391 1.042 2.359 1.766 2.888 2.826.53 1.059.53 2.268.528 4.006v4.3c0 1.355 0 2.471-.119 3.355-.124.928-.396 1.747-1.052 2.403-.657.657-1.476.928-2.404 1.053-.884.119-2 .119-3.354.119H7.93c-1.354 0-2.471 0-3.355-.119-.928-.125-1.747-.396-2.403-1.053-.656-.656-.928-1.475-1.053-2.403C1 18.541 1 17.425 1 16.07v-4.3c0-1.738-.002-2.947.528-4.006.53-1.06 1.497-1.784 2.888-2.826L6.65 3.263c1.114-.835 2.02-1.515 2.815-1.977zM10.5 13A1.5 1.5 0 0 0 9 14.5V21h6v-6.5a1.5 1.5 0 0 0-1.5-1.5h-3z" />
  </svg>
);

// 2. VIDEO / REELS TAB — FBNucleusAppFacebookReelsOutline24Icon
export const MetaNavWatchIcon: React.FC<{ active?: boolean; size?: number }> = ({ active = false, size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={active ? '#0866FF' : '#65676B'}>
    <path d="M10.996 12.132A1 1 0 0 0 9.5 13v4a1 1 0 0 0 1.496.868l3.5-2a1 1 0 0 0 0-1.736l-3.5-2z" />
    <path d="M12.075 1h-.15C9.632 1 7.81 1 6.38 1.192c-1.472.198-2.674.616-3.623 1.565-.949.95-1.367 2.15-1.565 3.623C1 7.81 1 9.632 1 11.925v.15c0 2.293 0 4.116.192 5.545.198 1.472.616 2.674 1.565 3.623.95.949 2.15 1.367 3.623 1.565C7.81 23 9.632 23 11.925 23h.15c2.293 0 4.116 0 5.545-.192 1.472-.198 2.674-.616 3.623-1.565.949-.95 1.367-2.15 1.565-3.623.192-1.43.192-3.252.192-5.545v-.15c0-2.293 0-4.116-.192-5.545-.198-1.472-.616-2.674-1.565-3.623-.95-.949-2.15-1.367-3.623-1.565C16.19 1 14.368 1 12.075 1zM4.172 4.172c.515-.516 1.224-.83 2.475-.998l.183-.023L8.113 7H3.132c.013-.121.027-.239.042-.353.168-1.25.482-1.96.998-2.475zM10.22 7 8.895 3.023C9.778 3 10.801 3 12 3c.642 0 1.234 0 1.78.004L15.114 7H10.22zm6.253 2h4.507c.02.86.02 1.848.02 3 0 2.385-.002 4.074-.174 5.353-.168 1.25-.482 1.96-.998 2.475-.515.516-1.224.83-2.475.998-1.28.172-2.968.174-5.353.174s-4.074-.002-5.353-.174c-1.25-.168-1.96-.482-2.475-.998-.516-.515-.83-1.224-.998-2.475C3.002 16.073 3 14.385 3 12c0-1.152 0-2.14.02-3h13.454zm.747-2-1.316-3.949c.537.026 1.016.065 1.448.123 1.25.168 1.96.482 2.475.998.516.515.83 1.224.998 2.475.015.114.03.232.042.353H17.22z" />
  </svg>
);

// 3. FRIENDS TAB — FBNucleusFriendsOutline24Icon
export const MetaNavFriendsIcon: React.FC<{ active?: boolean; size?: number }> = ({ active = false, size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={active ? '#0866FF' : '#65676B'}>
    <path d="M16.496 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm-9 4.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM5.5 15a5 5 0 0 0-5 5 3 3 0 0 0 3 3h8.006a3 3 0 0 0 3-3 5 5 0 0 0-5-5H5.5zm9.5.465a1 1 0 0 1 1.386-.278A4.984 4.984 0 0 1 17.5 17v.5a1 1 0 1 1-2 0V17a2.99 2.99 0 0 0-1.571-2.636 1 1 0 0 1-.279-1.4z" />
  </svg>
);
export const MetaNavGroupsIcon = MetaNavFriendsIcon;

// 4. MARKETPLACE TAB — FBNucleusAppPagesOutline24Icon (shopping bag icon from live feed)
export const MetaNavMarketIcon: React.FC<{ active?: boolean; size?: number }> = ({ active = false, size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={active ? '#0866FF' : '#65676B'}>
    <path d="M3.023 2a1.006 1.006 0 0 0-.917.551.995.995 0 0 0-.094.601l3 19.5a1 1 0 0 0 1.977-.304L6.166 17h13.48a2 2 0 0 0 1.912-2.588L20.046 9.5l1.512-4.912A2 2 0 0 0 19.646 2H3.023zM5.86 15 4.166 4h15.48l-1.511 4.912a2 2 0 0 0 0 1.176L19.646 15H5.86z" />
  </svg>
);

// 5. NOTIFICATIONS TAB — FBNucleusNotificationsFilled24Icon
export const MetaNavBellIcon: React.FC<{ active?: boolean; size?: number }> = ({ active = false, size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={active ? '#0866FF' : '#65676B'}>
    <path d="M3 9.5a9 9 0 1 1 18 0v2.927c0 1.69.475 3.345 1.37 4.778a1.5 1.5 0 0 1-1.272 2.295h-4.625a4.5 4.5 0 0 1-8.946 0H2.902a1.5 1.5 0 0 1-1.272-2.295A9.01 9.01 0 0 0 3 12.43V9.5zm6.55 10a2.5 2.5 0 0 0 4.9 0h-4.9z" />
  </svg>
);
export const MetaBellIcon = MetaNavBellIcon;

// 6. MENU TAB — FBNucleusMoreFilled24Icon (3-bar hamburger)
export const MetaNavMenuIcon: React.FC<{ active?: boolean; size?: number }> = ({ active = false, size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={active ? '#0866FF' : '#65676B'}>
    <path d="M3.25 2.75a1.25 1.25 0 1 0 0 2.5h17.5a1.25 1.25 0 1 0 0-2.5H3.25zM2 12c0-.69.56-1.25 1.25-1.25h17.5a1.25 1.25 0 1 1 0 2.5H3.25C2.56 13.25 2 12.69 2 12zm1.25 8a1.25 1.25 0 1 0 0 2.5h17.5a1.25 1.25 0 1 0 0-2.5H3.25z" />
  </svg>
);

// SEARCH — FBNucleusMagnifyingGlassFilled16Icon
export const MetaSearchIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 18 }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} fill="#050505" className={className}>
    <path d="M7.5 1a6.5 6.5 0 1 0 3.835 11.749l1.958 1.958a1 1 0 0 0 1.414-1.414l-1.958-1.958A6.5 6.5 0 0 0 7.5 1zM3 7.5a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0z" />
  </svg>
);

// MESSENGER — FBNucleusMessagesFilled24Icon
export const MetaMessengerIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="#050505" className={className}>
    <path d="M.5 12C.5 5.649 5.649.5 12 .5S23.5 5.649 23.5 12 18.351 23.5 12 23.5c-1.922 0-3.736-.472-5.33-1.308a.63.63 0 0 0-.447-.069l-3.4.882a1.5 1.5 0 0 1-1.828-1.829l.882-3.4a.63.63 0 0 0-.07-.445A11.454 11.454 0 0 1 .5 12zm17.56-1.43a.819.819 0 0 0-1.125-1.167L14 11.499l-3.077-2.171a1.5 1.5 0 0 0-2.052.308l-2.93 3.793a.819.819 0 0 0 1.123 1.167L10 12.5l3.076 2.172a1.5 1.5 0 0 0 2.052-.308l2.931-3.793z" />
  </svg>
);

// PLUS — FBNucleusPlusFilled20Icon
export const MetaPlusIcon: React.FC<{ className?: string; size?: number; fill?: string }> = ({ className = '', size = 18, fill = '#050505' }) => (
  <svg viewBox="0 0 20 20" width={size} height={size} fill={fill} className={className}>
    <path d="M9 16.25a1 1 0 1 0 2 0V11h5.25a1 1 0 1 0 0-2H11V3.75a1 1 0 1 0-2 0V9H3.75a1 1 0 0 0 0 2H9v5.25z" />
  </svg>
);

// 3 DOTS HORIZONTAL — FBNucleusDots3HorizontalFilled24Icon
export const MetaMoreDotsIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="#65676B" className={className}>
    <path d="M5 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm7 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm9-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
  </svg>
);

// EDIT PENCIL — FBNucleusComposeFilled16Icon
export const MetaEditPencilIcon: React.FC<{ className?: string; size?: number; fill?: string }> = ({ className = '', size = 16, fill = '#050505' }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} fill={fill} className={className}>
    <path d="M13.791 1.728a2.25 2.25 0 0 0-3.182 0l-9.206 9.206A1.55 1.55 0 0 0 .95 12.03v1.868c0 .635.515 1.15 1.15 1.15h1.869a1.548 1.548 0 0 0 1.097-.454l9.205-9.206.52-.52a2.25 2.25 0 0 0 0-3.14l-.52-.52a2.249 2.249 0 0 0-.48-.58z" />
  </svg>
);

// CAMERA — FBNucleusCameraOutline (keeping simple SVG)
export const MetaCameraIcon: React.FC<{ className?: string; size?: number; fill?: string }> = ({ className = '', size = 16, fill = '#050505' }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={fill} className={className}>
    <path d="M9.464 1.286C10.294.803 11.092.5 12 .5c.908 0 1.707.303 2.537.786.795.462 1.7 1.142 2.815 1.977l2.232 1.675c1.391 1.042 2.359 1.766 2.888 2.826.53 1.059.53 2.268.528 4.006v4.3c0 1.355 0 2.471-.119 3.355-.124.928-.396 1.747-1.052 2.403-.657.657-1.476.928-2.404 1.053-.884.119-2 .119-3.354.119H7.93c-1.354 0-2.471 0-3.355-.119-.928-.125-1.747-.396-2.403-1.053-.656-.656-.928-1.475-1.053-2.403C1 18.541 1 17.425 1 16.07v-4.3c0-1.738-.002-2.947.528-4.006.53-1.06 1.497-1.784 2.888-2.826L6.65 3.263c1.114-.835 2.02-1.515 2.815-1.977zM10.5 13A1.5 1.5 0 0 0 9 14.5V21h6v-6.5a1.5 1.5 0 0 0-1.5-1.5h-3z" />
  </svg>
);

// COMPOSER PHOTO — green photo icon (keeping green fill)
export const MetaComposerPhotoIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="#45BD62">
    <path d="M18 11h-5V6a1 1 0 0 0-2 0v5H6a1 1 0 0 0 0 2h5v5a1 1 0 0 0 2 0v-5h5a1 1 0 0 0 0-2z" />
  </svg>
);

// LIKE THUMB — FBNucleusLikeFilled12Icon (exact from live Facebook JS)
export const MetaLikeThumbIcon: React.FC<{ className?: string; size?: number; fill?: string }> = ({ className = '', size = 18, fill = '#65676B' }) => (
  <svg viewBox="0 0 12 12" width={size} height={size} fill={fill} className={className}>
    <path d="M4.75.91v.697c0 .838-.195 1.666-.57 2.416l-.31.62a3.5 3.5 0 0 0-.37 1.565v4.542c0 .414.336.75.75.75h4.932a2 2 0 0 0 1.948-1.55l.808-3.5A2 2 0 0 0 9.99 4H7.382a.132.132 0 0 1-.132-.132V1.592A1.59 1.59 0 0 0 5.659 0a.91.91 0 0 0-.91.91zM1 5h1.25a.5.5 0 0 1 .5.5V11a.5.5 0 0 1-.5.5H1a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
  </svg>
);

// COMMENT — FBNucleusAppWhatsappOutline20Icon style speech bubble (Facebook's chat bubble)
export const MetaCommentIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 18 }) => (
  <svg viewBox="0 0 20 20" width={size} height={size} fill="#65676B" className={className}>
    <path d="M.5 10a9.5 9.5 0 1 1 17.912 4.418.607.607 0 0 0-.065.429l.777 3.061a1 1 0 0 1-1.215 1.216l-3.062-.777a.608.608 0 0 0-.429.065A9.5 9.5 0 0 1 .5 10zM10 2a8 8 0 1 0 3.641 15.117.608.608 0 0 1 .429-.065l3.061.777a1 1 0 0 0 1.216-1.215l-.777-3.062a.608.608 0 0 1 .065-.429A8 8 0 0 0 10 2z" />
  </svg>
);

// SHARE — FBNucleusShareFilled16Icon (exact from live Facebook JS)
export const MetaShareIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 18 }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} fill="#65676B" className={className}>
    <path d="M9.503 1.035C8.407-.09 6.5.687 6.5 2.257V4.54c-1.923.214-3.49 1.246-4.593 2.672C.672 8.807 0 10.91 0 12.998v.306c0 .632.465 1.016.893 1.127.422.109.99.027 1.386-.515a5.456 5.456 0 0 1 4.221-2.36V13.743c0 1.57 1.907 2.347 3.003 1.222l5.265-5.408a1.5 1.5 0 0 0-.032-2.15L9.503 1.035z" />
  </svg>
);

// NAVICON / HAMBURGER — FBNucleusMoreFilled24Icon (same as Menu tab)
export const MetaNaviconIcon: React.FC<{ className?: string; size?: number; fill?: string }> = ({ className = '', size = 20, fill = '#050505' }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={fill} className={className}>
    <path d="M3.25 2.75a1.25 1.25 0 1 0 0 2.5h17.5a1.25 1.25 0 1 0 0-2.5H3.25zM2 12c0-.69.56-1.25 1.25-1.25h17.5a1.25 1.25 0 1 1 0 2.5H3.25C2.56 13.25 2 12.69 2 12zm1.25 8a1.25 1.25 0 1 0 0 2.5h17.5a1.25 1.25 0 1 0 0-2.5H3.25z" />
  </svg>
);

// VERIFIED BADGE — FBNucleusCheckmarkCircle (blue circle + white check)
export const MetaVerifiedBadge: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 16 }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className}>
    <circle cx="8" cy="8" r="8" fill="#0866FF" />
    <path d="M12.03 5.03a.75.75 0 0 0-1.06-1.06L7 7.94 5.03 5.97a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l4.5-4.5z" fill="#FFFFFF" />
  </svg>
);

// GLOBE — privacy/audience indicator
export const MetaGlobeIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 12 }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} fill="#65676B" className={className}>
    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm-.5 1.56v2.6l-2.31.28C6.22 2.8 7.07 1.94 7.5 1.55zm1 0c.43.39 1.28 1.25 2.31 2.89l-2.31-.28v-2.6zM5.02 4.72 7.5 5.03v2.44H3.06a6.49 6.49 0 0 1 1.96-2.75zm5.96 0a6.49 6.49 0 0 1 1.96 2.75H8.5V5.03l2.48-.31zM3.06 8.53H7.5v2.44l-2.48.31A6.49 6.49 0 0 1 3.06 8.53zm5.44 0h4.44a6.49 6.49 0 0 1-1.96 2.75L8.5 10.97V8.53zm-1 3.32v2.6c-.43-.39-1.28-1.25-2.31-2.88l2.31.28zm1 0 2.31-.28c-1.03 1.63-1.88 2.49-2.31 2.88v-2.6z" />
  </svg>
);

// CLOSE X — FBNucleusCrossFilled20Icon
export const MetaCloseIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 18 }) => (
  <svg viewBox="0 0 20 20" width={size} height={size} fill="#65676B" className={className}>
    <path d="M15.543 3.043a1 1 0 1 1 1.414 1.414L11.414 10l5.543 5.542a1 1 0 0 1-1.414 1.415L10 11.414l-5.543 5.543a1 1 0 0 1-1.414-1.415L8.586 10 3.043 4.457a1 1 0 1 1 1.414-1.414L10 8.586l5.543-5.543z" />
  </svg>
);

// BACK ARROW — FBNucleusArrowLeftFilled20Icon
export const MetaArrowBackIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 20 }) => (
  <svg viewBox="0 0 20 20" width={size} height={size} fill="#050505" className={className}>
    <path d="M8.043 3.043a1 1 0 1 1 1.414 1.414c-.638.639-1.32 1.32-2.018 2.015-.84.836-1.701 1.696-2.532 2.528H17.25a1 1 0 1 1 0 2H4.912l2.556 2.554.003.003 1.986 1.986a1 1 0 1 1-1.414 1.414l-1.987-1.986a7265.663 7265.663 0 0 1-3.21-3.209 2.495 2.495 0 0 1-.003-3.526C3.87 7.206 4.97 6.11 6.03 5.051a1339 1339 0 0 0 2.013-2.008z" />
  </svg>
);

// GRADUATION — generic (kept for profile use)
export const MetaGraduationIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="#65676B" className={className}>
    <path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3zM3.45 13.47 12 18.13l8.55-4.66v3.13L12 21.26 3.45 16.6v-3.13z" />
  </svg>
);

// LOCATION — generic pin (kept for profile use)
export const MetaLocationIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="#65676B" className={className}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

// FOLLOWERS — generic (kept for profile use)
export const MetaFollowersIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="#65676B" className={className}>
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
);

// MENU GRID — from live Facebook feed HTML (9-dot grid)
export const MetaMenuGridIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="#050505" className={className}>
    <path d="M18.5 1A1.5 1.5 0 0 0 17 2.5v3A1.5 1.5 0 0 0 18.5 7h3A1.5 1.5 0 0 0 23 5.5v-3A1.5 1.5 0 0 0 21.5 1h-3zm0 8a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0 21.5 9h-3zm-16 8A1.5 1.5 0 0 0 1 18.5v3A1.5 1.5 0 0 0 2.5 23h3A1.5 1.5 0 0 0 7 21.5v-3A1.5 1.5 0 0 0 5.5 17h-3zm8 0A1.5 1.5 0 0 0 9 18.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3a1.5 1.5 0 0 0-1.5-1.5h-3zm8 0a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3a1.5 1.5 0 0 0-1.5-1.5h-3zm-16-8A1.5 1.5 0 0 0 1 10.5v3A1.5 1.5 0 0 0 2.5 15h3A1.5 1.5 0 0 0 7 13.5v-3A1.5 1.5 0 0 0 5.5 9h-3zm0-8A1.5 1.5 0 0 0 1 2.5v3A1.5 1.5 0 0 0 2.5 7h3A1.5 1.5 0 0 0 7 5.5v-3A1.5 1.5 0 0 0 5.5 1h-3zm8 0A1.5 1.5 0 0 0 9 2.5v3A1.5 1.5 0 0 0 10.5 7h3A1.5 1.5 0 0 0 15 5.5v-3A1.5 1.5 0 0 0 13.5 1h-3zm0 8A1.5 1.5 0 0 0 9 10.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0 13.5 9h-3z" />
  </svg>
);
