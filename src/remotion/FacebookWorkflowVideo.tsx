'use client';

import React from 'react';
import {AbsoluteFill, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {LawnchairProvider} from '@/context/LawnchairContext';
import {DeviceFrame} from '@/components/phone/DeviceFrame';
import {StatusBar} from '@/components/phone/StatusBar';
import {NavigationBar} from '@/components/phone/NavigationBar';
import {HomeScreen} from '@/components/home/HomeScreen';
import {Dock} from '@/components/home/Dock';
import {WALLPAPERS} from '@/lib/wallpapers-data';
import {
  MetaFacebookLogo,
  MetaSearchIcon,
  MetaMessengerIcon,
  MetaNavHomeIcon,
  MetaNavWatchIcon,
  MetaNavFriendsIcon,
  MetaNavMarketIcon,
  MetaNavBellIcon,
  MetaNavMenuIcon,
  MetaPlusIcon,
  MetaComposerPhotoIcon,
  MetaLikeThumbIcon,
  MetaCommentIcon,
  MetaShareIcon,
  MetaMoreDotsIcon,
  MetaEditPencilIcon,
  MetaCameraIcon,
  MetaArrowBackIcon,
  MetaSettingsGearIcon,
  MetaShieldLockIcon,
  MetaWorkIcon,
  MetaGraduationIcon,
  MetaLocationIcon,
  MetaHomeTownIcon,
  MetaHeartIcon,
  MetaClockIcon,
  MetaGlobeIcon,
  MetaFollowersIcon,
  MetaVerifiedBadge,
} from '@/components/apps/MetaFacebookSvg';
import {Globe2, X, Search} from 'lucide-react';

const renderPostTextWithLinks = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, i) => {
    if (urlRegex.test(part)) {
      return (
        <span key={i} className="text-[#0866FF] break-all">
          {part}
        </span>
      );
    }
    return part;
  });
};

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const asset = (path: string) => staticFile(path);

type FbTab = 'feed' | 'watch' | 'friends' | 'market' | 'notifications' | 'menu' | 'profile';

type FbPost = {
  text: string;
  images: string[];
  time?: string;
  isVideo?: boolean;
  reactions?: string;
  commentsCount?: string;
  sharesCount?: string;
  linkCard?: {
    domain: string;
    title: string;
    url?: string;
  };
  comments?: {author: string; text: string; avatar?: string; likes?: string}[];
};

type FbProfileData = {
  profileName: string;
  isVerified?: boolean;
  coverPicture: string | null;
  profilePicture: string | null;
  bio: string | null;
  friendsCount: string | null;
  followingCount?: string | null;
  category?: string | null;
  isProfessional?: boolean;
  friends: {name: string; avatar: string}[];
  details?: string[];
  isLocked?: boolean;
  facebookUrl?: string;
  posts?: FbPost[];
};

const tabForFrame = (frame: number, hasFbProfile: boolean): FbTab => {
  if (hasFbProfile) {
    if (frame >= 430) return 'profile';
    if (frame >= 390) return 'menu';
    if (frame >= 330) return 'friends';
    if (frame >= 270) return 'watch';
    return 'feed';
  }
  if (frame >= 510) return 'feed';
  if (frame >= 450) return 'menu';
  if (frame >= 390) return 'notifications';
  if (frame >= 330) return 'friends';
  if (frame >= 270) return 'watch';
  return 'feed';
};

const FacebookNav: React.FC<{tab: FbTab; fbProfile?: FbProfileData}> = ({tab, fbProfile}) => {
  const avatar = fbProfile?.profilePicture;
  return (
    <div className="grid h-[48px] shrink-0 grid-cols-6 border-b border-[#ced0d4] bg-white">
      <div className={`relative grid place-items-center ${tab === 'feed' ? 'after:absolute after:bottom-0 after:h-[3.5px] after:w-full after:bg-[#0866FF]' : ''}`}>
        <MetaNavHomeIcon active={tab === 'feed'} size={24} />
      </div>
      <div className={`relative grid place-items-center ${tab === 'watch' ? 'after:absolute after:bottom-0 after:h-[3.5px] after:w-full after:bg-[#0866FF]' : ''}`}>
        <MetaNavWatchIcon active={tab === 'watch'} size={24} />
      </div>
      <div className={`relative grid place-items-center ${tab === 'friends' ? 'after:absolute after:bottom-0 after:h-[3.5px] after:w-full after:bg-[#0866FF]' : ''}`}>
        <MetaNavFriendsIcon active={tab === 'friends'} size={24} />
      </div>
      <div className={`relative grid place-items-center ${tab === 'market' ? 'after:absolute after:bottom-0 after:h-[3.5px] after:w-full after:bg-[#0866FF]' : ''}`}>
        <MetaNavMarketIcon active={tab === 'market'} size={24} />
      </div>
      <div className={`relative grid place-items-center ${tab === 'notifications' ? 'after:absolute after:bottom-0 after:h-[3.5px] after:w-full after:bg-[#0866FF]' : ''}`}>
        <MetaNavBellIcon active={tab === 'notifications'} size={24} />
      </div>
      <div className={`relative grid place-items-center ${tab === 'menu' || tab === 'profile' ? 'after:absolute after:bottom-0 after:h-[3.5px] after:w-full after:bg-[#0866FF]' : ''}`}>
        {avatar ? (
          <div className={`h-7 w-7 rounded-full overflow-hidden border ${tab === 'menu' || tab === 'profile' ? 'border-[#0866FF] ring-2 ring-[#0866FF]/30' : 'border-[#ced0d4]'}`}>
            <img src={avatar.startsWith('http') ? avatar : asset(avatar)} className="h-full w-full object-cover" alt="" />
          </div>
        ) : (
          <MetaNavMenuIcon active={tab === 'menu'} size={24} />
        )}
      </div>
    </div>
  );
};

const TopBar: React.FC = () => (
  <div className="flex h-[52px] shrink-0 items-center justify-between bg-white px-3 text-[#080809]">
    <div className="flex items-center">
      <span className="text-[28px] font-extrabold font-['Optimistic_Display',sans-serif] tracking-[-1.5px] text-[#0866FF]">
        facebook
      </span>
    </div>
    <div className="flex items-center gap-2">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E4E6EB] text-[#080809]">
        <MetaPlusIcon size={18} fill="#050505" />
      </div>
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E4E6EB] text-[#080809]">
        <MetaSearchIcon size={18} />
      </div>
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E4E6EB] text-[#080809]">
        <MetaMessengerIcon size={18} />
      </div>
    </div>
  </div>
);

const Composer: React.FC<{fbProfile?: FbProfileData}> = ({fbProfile}) => {
  const avatar = fbProfile?.profilePicture || asset('/facebook/user/lcd.webp');
  const firstName = fbProfile?.profileName ? fbProfile.profileName.split(' ')[0] : '';
  const placeholder = firstName ? `What's on your mind, ${firstName}?` : "What's on your mind?";
  return (
    <div className="bg-white px-3 py-2.5 text-[#080809]">
      <div className="flex items-center gap-2.5">
        <img
          src={avatar.startsWith('http') ? avatar : asset(avatar)}
          className="h-10 w-10 rounded-full object-cover"
          alt=""
        />
        <div className="flex-1 rounded-full border border-[#ced0d4] bg-white px-4 py-2 text-[15px] text-[#65676b]">
          {placeholder}
        </div>
        <div className="p-1 shrink-0">
          <MetaComposerPhotoIcon size={24} />
        </div>
      </div>
    </div>
  );
};

const Stories: React.FC<{fbProfile?: FbProfileData}> = ({fbProfile}) => {
  const ownAvatar = fbProfile?.profilePicture || asset('/facebook/user/lcd.webp');
  const stories = [
    { name: 'Create story', cover: ownAvatar, avatar: ownAvatar, own: true },
    { name: 'Google Ads', cover: '/facebook/post/google_ads_creative.webp', avatar: '/facebook/user/google_ads_avatar.webp' },
    { name: 'Leo Messi', cover: '/facebook/story/2.webp', avatar: '/facebook/user/messi.webp' },
    { name: 'National Geographic', cover: '/facebook/story/1.webp', avatar: '/facebook/user/goal.webp' },
  ];
  return (
    <div className="bg-white py-3 border-y border-[#ced0d4]/60">
      <div className="flex gap-2 overflow-x-auto px-3 [scrollbar-width:none]">
        {stories.map((story) => (
          <div key={story.name} className="relative h-[190px] w-[110px] shrink-0 overflow-hidden rounded-2xl border border-[#ced0d4] bg-white text-left shadow-xs">
            <div className="h-[125px] w-full overflow-hidden bg-[#e4e6eb]">
              <img
                src={story.cover.startsWith('http') ? story.cover : asset(story.cover)}
                className="h-full w-full object-cover"
                alt=""
              />
            </div>
            {story.own ? (
              <>
                <div className="absolute left-1/2 top-[107px] grid h-9 w-9 -translate-x-1/2 place-items-center rounded-full border-[3px] border-white bg-[#0866FF] text-white shadow-xs">
                  <MetaPlusIcon size={18} fill="#ffffff" />
                </div>
                <div className="absolute bottom-2.5 w-full px-1 text-center text-[12px] font-bold text-[#050505] leading-tight">
                  Create story
                </div>
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                <div className="absolute left-2.5 top-2.5 h-10 w-10 rounded-full border-[3px] border-[#0866FF] overflow-hidden bg-white shadow-xs">
                  <img
                    src={story.avatar.startsWith('http') ? story.avatar : asset(story.avatar)}
                    className="h-full w-full object-cover"
                    alt=""
                  />
                </div>
                <div className="absolute bottom-2.5 left-2.5 right-1.5 text-[13px] font-bold leading-tight text-white drop-shadow-sm">
                  {story.name}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const Post: React.FC<{second?: boolean}> = ({second}) => (
  <article className="mt-2 bg-white text-[#050505] shadow-xs">
    <div className="flex items-center gap-2.5 px-3.5 pt-3 pb-2">
      <img src={asset(second ? '/facebook/user/messi.webp' : '/facebook/user/google_ads_avatar.webp')} className="h-10 w-10 rounded-full object-cover" alt="" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 text-[15px] font-bold text-[#050505] leading-tight">
          <span>{second ? 'Leo Messi' : 'Google Ads'}</span>
          <MetaVerifiedBadge size={16} />
        </div>
        <div className="flex items-center gap-1 text-[12px] text-[#65676b] pt-0.5">
          <span>{second ? '4h' : 'Sponsored'}</span> · <Globe2 size={12} />
        </div>
      </div>
      <MetaMoreDotsIcon size={18} />
      <X size={18} className="text-[#65676b]" />
    </div>
    <p className="whitespace-pre-line px-3.5 pt-1 pb-2.5 text-[14px] leading-snug text-[#050505]">
      {second 
        ? '🏆 Gran victoria en equipo hoy! Seguimos trabajando juntos para los próximos desafíos. Gracias a todos por el apoyo de siempre! ⚽🔥\n(Great team win today! Moving forward together. Thank you all for the support! 🇦🇷)' 
        : 'Get more out of your advertising budget with Google Ads – pay for results.'}
    </p>
    <img src={asset(second ? '/facebook/post/2.webp' : '/facebook/post/google_ads_creative.webp')} className="max-h-[380px] w-full object-cover" alt="" />

    {/* Sponsored Call-To-Action Link Bar */}
    {!second && (
      <div className="flex items-center justify-between border-t border-[#ced0d4]/60 bg-[#F0F2F5] px-3.5 py-2.5">
        <div className="min-w-0 flex-1 pr-2">
          <div className="text-[11px] font-semibold text-[#65676B] tracking-wider uppercase">ADS.GOOGLE.COM</div>
          <div className="truncate text-[14px] font-bold text-[#050505] leading-snug">Sign up for Google Ads now</div>
        </div>
        <div className="shrink-0 rounded-md bg-[#E4E6EB] px-3.5 py-1.5 text-[13px] font-semibold text-[#050505]">
          Sign up
        </div>
      </div>
    )}

    <div className="flex items-center justify-between px-3.5 py-2.5 text-[13px] text-[#65676b]">
      <div className="flex items-center gap-1.5">
        <div className="flex items-center -space-x-1">
          <img src={asset('/facebook/reactions/like.webp')} className="h-[18px] w-[18px] rounded-full border-[1.5px] border-white" alt="like" />
          <img src={asset('/facebook/reactions/love.webp')} className="h-[18px] w-[18px] rounded-full border-[1.5px] border-white" alt="love" />
          <img src={asset(second ? '/facebook/reactions/care.webp' : '/facebook/reactions/wow.webp')} className="h-[18px] w-[18px] rounded-full border-[1.5px] border-white" alt="reaction" />
        </div>
        <span className="ml-1 font-medium">{second ? '142K' : '650'}</span>
      </div>
      <div>{second ? '8.5K comments · 4.2K shares' : '196 comments · 27 shares'}</div>
    </div>
    <div className="mx-3.5 grid grid-cols-3 border-t border-[#ced0d4] py-1 text-center text-[13px] font-semibold text-[#65676b]">
      <div className="flex items-center justify-center gap-1.5 py-2 text-[#0866FF]">
        <MetaLikeThumbIcon size={18} fill="#0866FF" />
        <span>Like</span>
      </div>
      <div className="flex items-center justify-center gap-1.5 py-2">
        <MetaCommentIcon size={18} />
        <span>Comment</span>
      </div>
      <div className="flex items-center justify-center gap-1.5 py-2">
        <MetaShareIcon size={18} />
        <span>Share</span>
      </div>
    </div>
  </article>
);

const humanFlickEase = Easing.bezier(0.22, 0.1, 0.12, 1);

// Human browsing sequence across 600 frames (20 seconds @ 30fps)
// Starts after the Home Feed -> Profile navigation transition at frame 128.
const HUMAN_SCROLL_GESTURES = [
  // Glance at Header / Bio: frames 128-175 (1.57s)
  // Swipe 1: Scroll past header & details down to top of post 1
  { start: 175, end: 218, from: 0, to: -480 },
  // Pause 1: frames 218-260 (1.4s) - reading post 1

  // Swipe 2: Flick down through post 1 media to center post 2
  { start: 260, end: 308, from: -480, to: -1120 },
  // Pause 2: frames 308-350 (1.4s) - viewing post 2

  // Swipe 3: Flick down through post 2 to post 3 comments & reactions
  { start: 350, end: 402, from: -1120, to: -1820 },
  // Pause 3: frames 402-445 (1.43s) - reading post 3 comments

  // Swipe 4: Flick down through post 3 to post 4
  { start: 445, end: 498, from: -1820, to: -2500 },
  // Pause 4: frames 498-540 (1.4s) - reading post 4

  // Swipe 5: Final gentle swipe settling on older timeline posts
  { start: 540, end: 580, from: -2500, to: -3200 },
  // Pause 5: frames 580-600 (0.67s) - resting at final position
];

const LOCKED_SCROLL_GESTURES = [
  // Glance at Header & Bio: frames 128-185 (1.9s)
  // Swipe 1: Smooth scroll down to reveal Locked Profile Banner & Details
  { start: 185, end: 235, from: 0, to: -220 },
  // Pause 1: frames 235-320 (2.8s) - reading the banner & details
  // Swipe 2: Gentle secondary scroll centering the locked privacy shield card
  { start: 320, end: 375, from: -220, to: -360 },
  // Pause 2: frames 375-600 (7.5s) - resting cleanly on the locked profile privacy shield
];

function getHumanScrollState(frame: number, isLocked = false) {
  const gestures = isLocked ? LOCKED_SCROLL_GESTURES : HUMAN_SCROLL_GESTURES;
  let scrollY = 0;

  if (frame < gestures[0].start) {
    scrollY = 0;
  } else {
    for (let i = 0; i < gestures.length; i++) {
      const g = gestures[i];
      if (frame >= g.start && frame <= g.end) {
        const progress = (frame - g.start) / (g.end - g.start);
        scrollY = g.from + (g.to - g.from) * humanFlickEase(progress);
        break;
      }
      const nextG = gestures[i + 1];
      if (nextG && frame > g.end && frame < nextG.start) {
        scrollY = g.to;
        break;
      }
    }
    if (frame > gestures[gestures.length - 1].end) {
      scrollY = gestures[gestures.length - 1].to;
    }
  }

  // Calculate native Android scrollbar thumb fade & position
  let scrollbarOpacity = 0;
  for (const g of gestures) {
    if (frame >= g.start && frame <= g.end) {
      scrollbarOpacity = frame < g.start + 5 ? (frame - g.start) / 5 : 1;
      break;
    }
    if (frame > g.end && frame <= g.end + 16) {
      scrollbarOpacity = frame <= g.end + 6 ? 1 : 1 - (frame - (g.end + 6)) / 10;
      break;
    }
  }

  const maxScroll = isLocked ? 500 : 3600;
  const trackHeight = 830 - 46;
  const thumbTop = 8 + (Math.min(maxScroll, Math.abs(scrollY)) / maxScroll) * trackHeight;

  return { scrollY, scrollbarOpacity, thumbTop };
}

const Feed: React.FC<{frame: number; fbProfile?: FbProfileData}> = ({frame, fbProfile}) => {
  const scroll = interpolate(frame, [180, 260], [0, -720], { ...clamp, easing: humanFlickEase });
  return (
    <div style={{transform: `translateY(${scroll}px)`}} className="bg-[#f0f2f5] pb-4">
      <Composer fbProfile={fbProfile} />
      <Stories fbProfile={fbProfile} />
      <Post />
      <Post second />
    </div>
  );
};

const Watch: React.FC = () => (
  <div className="min-h-full bg-white p-3 text-[#050505]">
    <div className="flex items-center justify-between"><h2 className="text-2xl font-bold font-['Optimistic_Display',sans-serif]">Video</h2><MetaSearchIcon size={20}/></div>
    <div className="mt-4 overflow-hidden rounded-xl border border-[#ced0d4]"><img src={asset('/facebook/post/3.webp')} className="aspect-video w-full object-cover" alt=""/><div className="p-3"><div className="font-bold text-[15px]">GOAL Football</div><p className="mt-1 text-sm text-[#65676b]">New videos for you · Trending</p></div></div>
  </div>
);

const FriendsTabScreen: React.FC = () => (
  <div className="min-h-full bg-white p-4 text-[#050505]">
    <div className="flex items-center justify-between pb-3"><h2 className="text-2xl font-bold font-['Optimistic_Display',sans-serif]">Friends</h2><MetaSearchIcon size={20}/></div>
    <div className="flex gap-2 pb-3 border-b border-[#ced0d4]"><div className="rounded-full bg-[#e4e6eb] px-4 py-2 text-sm font-semibold">Suggestions</div><div className="rounded-full bg-[#e4e6eb] px-4 py-2 text-sm font-semibold">Your Friends</div></div>
    <div className="pt-3 space-y-3">
      <div className="flex justify-between items-center"><span className="font-bold text-[17px]">Friend Requests</span><span className="text-[14px] text-[#0866FF] font-semibold">See all</span></div>
      {[['Nguyễn Văn Nam','khanhvy.webp','14 mutual friends'],['Trần Thị Mai','minhhuong.webp','3 mutual friends']].map(([n,a,m]) => (
        <div key={n} className="flex gap-3 items-center"><img src={asset(`/facebook/user/${a}`)} className="h-16 w-16 rounded-full object-cover" alt=""/><div className="flex-1"><span className="font-bold text-[15px]">{n}</span><p className="text-xs text-[#65676b]">{m}</p><div className="flex gap-2 mt-1.5"><div className="flex-1 rounded-lg bg-[#0866FF] py-1.5 text-center text-xs font-semibold text-white">Confirm</div><div className="flex-1 rounded-lg bg-[#e4e6eb] py-1.5 text-center text-xs font-semibold text-[#050505]">Delete</div></div></div></div>
      ))}
    </div>
  </div>
);

const Notifications: React.FC = () => (
  <div className="min-h-full bg-white text-[#050505]">
    <h2 className="px-4 py-3 text-2xl font-bold font-['Optimistic_Display',sans-serif]">Notifications</h2>
    {[['Sarah Jenkins','minhhuong.webp'],['GOAL Football','goal.webp'],['Bente Othman','khanhvy.webp']].map(([n,a],i)=><div key={n} className={`flex gap-3 px-4 py-3 border-b border-[#ced0d4]/40 ${i!==1?'bg-[#e7f3ff]/50':''}`}><img src={asset(`/facebook/user/${a}`)} className="h-12 w-12 rounded-full object-cover" alt=""/><div className="flex-1 text-[14px]"><b>{n}</b> added new content.<div className="mt-1 text-xs text-[#0866FF] font-medium">{i+1} h ago</div></div></div>)}
  </div>
);

const MenuScreen: React.FC<{fbProfile?: FbProfileData}> = ({fbProfile}) => {
  const avatar = fbProfile?.profilePicture || asset('/facebook/user/lcd.webp');
  const name = fbProfile?.profileName || 'Facebook User';
  return (
    <div className="min-h-full bg-[#f0f2f5] p-3 text-[#050505]">
      <h2 className="text-2xl font-bold font-['Optimistic_Display',sans-serif]">Menu</h2>
      <div className="my-3 flex items-center gap-3 rounded-xl bg-white p-3 shadow-xs border border-[#ced0d4]/60">
        <img
          src={avatar.startsWith('http') ? avatar : asset(avatar)}
          className="h-12 w-12 rounded-full object-cover"
          alt=""
        />
        <div>
          <div className="font-bold text-[16px]">{name}</div>
          <div className="text-xs text-[#65676b]">See your profile</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">{[['Friends','friends.png'],['Memories','memory.png'],['Saved','saved.png'],['Marketplace','market.png'],['Video','video.png'],['Events','event.png']].map(([n,i])=><div key={n} className="flex items-center gap-3 rounded-xl bg-white p-3 text-[14px] font-semibold shadow-xs border border-[#ced0d4]/60"><img src={asset(`/facebook/menu/${i}`)} className="h-7 w-7 object-contain" alt=""/>{n}</div>)}</div>
    </div>
  );
};

const ProfileSettingsScreen: React.FC<{fbProfile?: FbProfileData; frame: number}> = ({fbProfile, frame}) => {
  const isLocked = Boolean(fbProfile?.isLocked);
  const profileUrl = fbProfile?.facebookUrl || `https://www.facebook.com/${(fbProfile?.profileName || 'user').toLowerCase().replace(/\s+/g, '.')}`;

  const scrollY = interpolate(frame, [475, 545], [0, -260], {
    ...clamp,
    easing: humanFlickEase,
  });

  return (
    <div className="flex h-full w-full flex-col bg-white text-[#050505] font-['Optimistic_Text',sans-serif]">
      {/* Top Header Bar */}
      <div className="flex h-[52px] shrink-0 items-center gap-3 border-b border-[#E4E6EB] bg-white px-3 z-10">
        <div className="flex h-10 w-10 items-center justify-center rounded-full active:bg-[#E4E6EB]">
          <MetaArrowBackIcon size={20} />
        </div>
        <h2 className="text-[20px] font-bold text-[#050505]">Profile settings</h2>
      </div>

      {/* Settings Scrollable List */}
      <div className="flex-1 overflow-hidden">
        <div style={{transform: `translateY(${scrollY}px)`}} className="flex flex-col pb-10">
          {/* 1. Edit profile */}
          <div className="flex items-center gap-4 px-4 py-3.5 hover:bg-[#F2F2F2] active:bg-[#E4E6EB] cursor-pointer">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="#050505" className="shrink-0">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
            </svg>
            <span className="text-[16px] font-medium text-[#050505]">Edit profile</span>
          </div>

          {/* 2. Account status */}
          <div className="flex items-center gap-4 px-4 py-3.5 hover:bg-[#F2F2F2] active:bg-[#E4E6EB] cursor-pointer">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="#050505" className="shrink-0">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
            </svg>
            <span className="text-[16px] font-medium text-[#050505]">Account status</span>
          </div>

          {/* 3. Archive */}
          <div className="flex items-center gap-4 px-4 py-3.5 hover:bg-[#F2F2F2] active:bg-[#E4E6EB] cursor-pointer">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="#050505" className="shrink-0">
              <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM19 19H5V8h14v11zm-8.5-8h3v2.5H16L12 17.5 8 13.5h2.5V11z" />
            </svg>
            <span className="text-[16px] font-medium text-[#050505]">Archive</span>
          </div>

          {/* 4. View as */}
          <div className="flex items-center gap-4 px-4 py-3.5 hover:bg-[#F2F2F2] active:bg-[#E4E6EB] cursor-pointer">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="#050505" className="shrink-0">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
            </svg>
            <span className="text-[16px] font-medium text-[#050505]">View as</span>
          </div>

          {/* 5. Lock profile or Turn off professional mode */}
          <div className="flex items-center justify-between px-4 py-3.5 hover:bg-[#F2F2F2] active:bg-[#E4E6EB] cursor-pointer">
            <div className="flex items-center gap-4 min-w-0 flex-1">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="#050505" className="shrink-0">
                {fbProfile?.isProfessional ? (
                  <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
                ) : (
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                )}
              </svg>
              <div className="min-w-0 flex-1">
                <div className="text-[16px] font-medium text-[#050505]">
                  {fbProfile?.isProfessional ? 'Turn off professional mode' : (isLocked ? 'Unlock profile' : 'Lock profile')}
                </div>
                <div className="text-[13px] text-[#65676B] truncate">
                  {fbProfile?.isProfessional ? 'Manage and review professional tools' : (isLocked ? 'You locked your profile' : 'Lock your profile to help protect photos and posts')}
                </div>
              </div>
            </div>
            {isLocked && !fbProfile?.isProfessional && (
              <span className="shrink-0 rounded-full bg-[#EBF5FF] px-2.5 py-0.5 text-[11px] font-bold text-[#0866FF]">
                Locked
              </span>
            )}
          </div>

          {/* 6. Activity log */}
          <div className="flex items-center gap-4 px-4 py-3.5 hover:bg-[#F2F2F2] active:bg-[#E4E6EB] cursor-pointer">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="#050505" className="shrink-0">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
            </svg>
            <span className="text-[16px] font-medium text-[#050505]">Activity log</span>
          </div>

          {/* 7. Manage posts */}
          <div className="flex items-center gap-4 px-4 py-3.5 hover:bg-[#F2F2F2] active:bg-[#E4E6EB] cursor-pointer">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="#050505" className="shrink-0">
              <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
            </svg>
            <span className="text-[16px] font-medium text-[#050505]">Manage posts</span>
          </div>

          {/* 8. Review posts and tags */}
          <div className="flex items-center gap-4 px-4 py-3.5 hover:bg-[#F2F2F2] active:bg-[#E4E6EB] cursor-pointer">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="#050505" className="shrink-0">
              <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
            </svg>
            <span className="text-[16px] font-medium text-[#050505]">Review posts and tags</span>
          </div>

          {/* 9. Privacy Center */}
          <div className="flex items-center gap-4 px-4 py-3.5 hover:bg-[#F2F2F2] active:bg-[#E4E6EB] cursor-pointer">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="#050505" className="shrink-0">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
            <span className="text-[16px] font-medium text-[#050505]">Privacy Center</span>
          </div>

          {/* 10. Search profile */}
          <div className="flex items-center gap-4 px-4 py-3.5 hover:bg-[#F2F2F2] active:bg-[#E4E6EB] cursor-pointer">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="#050505" className="shrink-0">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
            <span className="text-[16px] font-medium text-[#050505]">Search profile</span>
          </div>

          {/* Grey Section Separator */}
          <div className="h-2 w-full bg-[#F0F2F5] border-y border-[#E4E6EB] my-2" />

          {/* Bottom "Your profile link" Section */}
          <div className="p-4 bg-white">
            <h3 className="text-[16px] font-bold text-[#050505]">Your profile link</h3>
            <p className="mt-1 text-[13px] text-[#65676B]">Your personalized link on Facebook.</p>
            <div className="mt-3 text-[14px] font-bold text-[#050505] break-all select-all">
              {profileUrl}
            </div>
            <button
              type="button"
              className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#E4E6EB] py-2.5 px-4 text-[14px] font-semibold text-[#050505] transition-colors active:bg-[#D8DADF]"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="#050505" className="shrink-0">
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
              </svg>
              <span>Copy link</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileScreen: React.FC<{fbProfile: FbProfileData; frame: number}> = ({fbProfile, frame}) => {
  const isLocked = Boolean(fbProfile.isLocked);
  const { scrollY, scrollbarOpacity, thumbTop } = getHumanScrollState(frame, isLocked);

  const ensureTenPosts = (posts?: FbPost[]): FbPost[] => {
    // Strictly filter out any items that are comments
    const realPosts = (posts || []).filter(p => {
      const t = (p.text || '').toLowerCase();
      return !t.includes('লাইক আয়মান সাদিক') && !t.includes('shamim hasan') && !t.includes('author ayman sadiq') && !t.includes('write a comment') && !t.includes('log in');
    });

    if (fbProfile.isLocked && realPosts.length === 0) return [];

    const name = fbProfile.profileName || 'User';
    const avatar = fbProfile.profilePicture;
    const cover = fbProfile.coverPicture;

    // Ensure every genuine post has baseline engagement numbers if omitted
    const normalized: FbPost[] = realPosts.map((p, idx) => ({
      ...p,
      reactions: (p.reactions && p.reactions !== '0') ? p.reactions : (idx === 0 ? '6.3K' : '2.1K'),
      commentsCount: (p.commentsCount && p.commentsCount !== '0') ? p.commentsCount : (idx === 0 ? '104' : '45'),
      sharesCount: (p.sharesCount && p.sharesCount !== '0') ? p.sharesCount : (idx === 0 ? '488' : '18'),
    }));

    if (normalized.length >= 10) return normalized;

    const fallbackUpdates: FbPost[] = [
      { text: `${name} updated their cover photo.`, images: cover ? [cover] : [], time: '2w', reactions: '8.4K', commentsCount: '210', sharesCount: '45' },
      { text: `${name} updated their profile picture.`, images: avatar ? [avatar] : [], time: '4w', reactions: '14.2K', commentsCount: '520', sharesCount: '120' },
      { text: 'Looking forward to the exciting milestones and projects ahead. Stay tuned! 🚀', images: [], time: '6w', reactions: '9.6K', commentsCount: '280', sharesCount: '65' },
      { text: 'Grateful for all the support and messages from everyone! 🙏✨', images: [], time: '8w', reactions: '11.2K', commentsCount: '412', sharesCount: '94' },
      { text: 'Throwback to an unforgettable journey. Time flies! 📸', images: normalized[0]?.images?.length ? normalized[0].images : (cover ? [cover] : []), time: '12w', reactions: '16.8K', commentsCount: '640', sharesCount: '180' },
      { text: `${name} added a life event.`, images: [], time: '18w', reactions: '22.1K', commentsCount: '980', sharesCount: '350' },
      { text: 'Reflecting on all the lessons and progress so far. The journey continues! 💫', images: [], time: '24w', reactions: '19.5K', commentsCount: '840', sharesCount: '210' },
      { text: 'Great day with amazing people! 🌟', images: [], time: '36w', reactions: '25.4K', commentsCount: '1.2K', sharesCount: '410' },
      { text: `${name} is feeling motivated.`, images: [], time: '48w', reactions: '34.2K', commentsCount: '1.8K', sharesCount: '620' },
    ];

    let idx = 0;
    while (normalized.length < 10 && idx < fallbackUpdates.length) {
      normalized.push(fallbackUpdates[idx]);
      idx++;
    }
    return normalized;
  };

  const displayPosts = ensureTenPosts(fbProfile.posts);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="min-h-full bg-[#F0F2F5] text-[#080809] font-['Optimistic_Text',sans-serif]" style={{transform: `translateY(${scrollY}px)`}}>
      <div className="flex h-[50px] items-center justify-between border-b border-[#D0D3D7] bg-white px-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full"><MetaFacebookLogo size={36} /></div>
        <div className="flex items-center gap-1.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E4E6EB] text-[#080809]"><MetaSearchIcon size={18} /></div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E4E6EB] text-[#080809]"><MetaMessengerIcon size={18} /></div>
        </div>
      </div>

      {/* 1. Header / Hero Section */}
      <div className="relative bg-white pb-3 border-b border-[#ced0d4]/60">
        <div className="relative h-[180px] w-full bg-gradient-to-b from-[#8a919a] to-[#cbd2d9] overflow-hidden">
          {fbProfile.coverPicture ? (
            <img src={fbProfile.coverPicture} className="h-full w-full object-cover" alt="" />
          ) : (
            <img src={asset('/facebook/user/lcd-cover.webp')} className="h-full w-full object-cover" alt="" />
          )}
          <div className="absolute bottom-3 right-3 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white shadow-md border border-[#D0D3D7]/60">
            <MetaCameraIcon size={17} />
          </div>
        </div>
        <div className="relative flex justify-center -mt-[65px]">
          <div className="relative">
            <div className="h-[130px] w-[130px] rounded-full border-[4px] border-white bg-white shadow-md overflow-hidden">
              {fbProfile.profilePicture ? (
                <img src={fbProfile.profilePicture} className="h-full w-full object-cover" alt="" />
              ) : (
                <img src={asset('/facebook/user/lcd.webp')} className="h-full w-full object-cover" alt="" />
              )}
            </div>
            <div className="absolute bottom-1 right-1 flex h-[34px] w-[34px] items-center justify-center rounded-full border-[2px] border-white bg-[#E4E6EB] shadow-md text-[#080809]">
              <MetaCameraIcon size={16} />
            </div>
          </div>
        </div>
        <div className="px-4 pt-2 text-center">
          <h1 className="flex items-center justify-center gap-1.5 text-[24px] font-bold text-[#080809]">
            <span>{fbProfile.profileName || 'Facebook User'}</span>
            {fbProfile.isVerified && <MetaVerifiedBadge size={18} />}
          </h1>
          {/* Followers / Following for Professional, or Friends count for Normal */}
          <div className="mt-1 flex items-center justify-center gap-1.5 text-[14px] text-[#65686C]">
            {fbProfile.isProfessional ? (
              <>
                <span className="font-semibold text-[#080809]">
                  {fbProfile.friendsCount ? `${fbProfile.friendsCount} followers` : '1.2M followers'}
                </span>
                <span>•</span>
                <span className="font-semibold text-[#080809]">
                  {fbProfile.followingCount ? `${fbProfile.followingCount} following` : '480 following'}
                </span>
              </>
            ) : (
              <span className="font-semibold text-[#080809]">
                {fbProfile.friendsCount ? (fbProfile.friendsCount.includes('friend') ? fbProfile.friendsCount : `${fbProfile.friendsCount} friends`) : '1,250 friends'}
              </span>
            )}
          </div>
          {fbProfile.bio && <p className="mt-2 text-[14px] text-[#080809]">{fbProfile.bio}</p>}

          {/* Normal vs Professional profile action buttons */}
          {fbProfile.isProfessional ? (
            <div className="mt-4 flex flex-col gap-2">
              {/* Row 1: Full-width Professional Dashboard button */}
              <div className="flex h-[38px] w-full items-center justify-center gap-2 rounded-lg bg-[#0866FF] px-4 text-[14px] font-semibold text-white shadow-xs">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                </svg>
                <span>Professional dashboard</span>
              </div>
              {/* Row 2: Add to story and More options */}
              <div className="flex gap-2">
                <div className="flex h-[38px] flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#E4E6EB] px-4 text-[14px] font-semibold text-[#080809]">
                  <MetaPlusIcon size={16} fill="#050505" />
                  <span>Add to story</span>
                </div>
                <div className="relative flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-lg bg-[#E4E6EB] text-[#080809]">
                  <MetaMoreDotsIcon size={18} />
                  {frame >= 418 && frame <= 428 && (
                    <div className="pointer-events-none absolute inset-0 rounded-lg bg-[#0866FF]/30 scale-110" />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-4 flex gap-2">
              <div className="flex h-[38px] flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#0866FF] px-4 text-[14px] font-semibold text-white">
                <MetaPlusIcon size={16} fill="#ffffff" />
                <span>Add to story</span>
              </div>
              <div className="flex h-[38px] flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#E4E6EB] px-4 text-[14px] font-semibold text-[#080809]">
                <MetaEditPencilIcon size={16} fill="#050505" />
                <span>Edit profile</span>
              </div>
              <div className="relative flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-lg bg-[#E4E6EB] text-[#080809]">
                <MetaMoreDotsIcon size={18} />
                {frame >= 418 && frame <= 428 && (
                  <div className="pointer-events-none absolute inset-0 rounded-lg bg-[#0866FF]/30 scale-110" />
                )}
              </div>
            </div>
          )}

          {/* Official Facebook Locked Profile Header Notice (Owner Perspective) */}
          {fbProfile.isLocked && (
            <div className="mt-3.5 flex items-start gap-3 rounded-xl bg-[#EBF5FF] p-3 text-left border border-[#0866FF]/20">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0866FF] text-white">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6a3 3 0 0 1 3 3v1h1a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h1v-1a3 3 0 0 1 3-3zm0 2a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1z"/>
                </svg>
              </div>
              <div className="min-w-0 flex-1 pt-0.5">
                <h4 className="text-[14px] font-bold text-[#080809] leading-tight">
                  You locked your profile
                </h4>
                <p className="mt-0.5 text-[12px] text-[#65686C] leading-snug">
                  Only your friends can see the photos, posts and stories on your profile. <span className="font-semibold text-[#0866FF]">Learn more</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Friends Section */}
      {fbProfile.friends && fbProfile.friends.length > 0 && (
        <div className="mt-2.5 w-full bg-white px-4 py-3 border-y border-[#ced0d4]/60">
          <div className="mb-2 flex items-baseline justify-between">
            <div>
              <h3 className="text-[17px] font-bold text-[#080809]">Friends</h3>
              <span className="text-[13px] text-[#65686C]">{fbProfile.friendsCount || `${fbProfile.friends.length} friends`}</span>
            </div>
            <span className="text-[14px] font-semibold text-[#0866FF]">See all</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {fbProfile.friends.slice(0, 6).map((f) => (
              <div key={f.name} className="overflow-hidden">
                <div className="aspect-square w-full overflow-hidden rounded-lg bg-[#e4e6eb]">
                  <img src={f.avatar} className="h-full w-full object-cover" alt="" />
                </div>
                <span className="mt-1 block truncate text-[12px] font-medium text-[#080809]">{f.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Details Section */}
      {fbProfile.details && fbProfile.details.length > 0 && (
        <div className="mt-2.5 w-full bg-white px-4 py-3 border-y border-[#ced0d4]/60">
          <h3 className="mb-2.5 text-[17px] font-bold text-[#080809]">Details</h3>
          <div className="flex flex-col gap-2.5">
            {fbProfile.details.map((d, i) => (
              <div key={i} className="flex items-center gap-3 text-[14px] text-[#080809]">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center text-[#65686C]">
                  {/founder|ceo|works at|worked at|working at|job|manager|director|engineer|developer|specialist/i.test(d) ? (
                    <MetaWorkIcon size={20} />
                  ) : /studied|studies|went to|school|college|university|student|alumnus|graduated/i.test(d) ? (
                    <MetaGraduationIcon size={20} />
                  ) : /lives in|living in|located in|current city/i.test(d) ? (
                    <MetaLocationIcon size={20} />
                  ) : /from|hometown/i.test(d) ? (
                    <MetaHomeTownIcon size={20} />
                  ) : /married|relationship|engaged|single|widowed|partner/i.test(d) ? (
                    <MetaHeartIcon size={20} />
                  ) : /followed by|followers/i.test(d) ? (
                    <MetaFollowersIcon size={20} />
                  ) : /joined/i.test(d) ? (
                    <MetaClockIcon size={20} />
                  ) : /https?:\/\/|\.com|\.org|\.net|\.io/i.test(d) ? (
                    <MetaGlobeIcon size={20} />
                  ) : (
                    <MetaLocationIcon size={20} />
                  )}
                </div>
                <span>{d}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. People You May Know Section */}
      <div className="mt-2.5 w-full bg-white px-4 py-3 border-y border-[#ced0d4]/60">
        <div className="mb-2 flex items-baseline justify-between">
          <h3 className="text-[17px] font-bold text-[#080809]">People you may know</h3>
          <span className="text-[14px] font-semibold text-[#0866FF]">See all</span>
        </div>
        <div className="flex gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none]">
          {[
            { name: 'Tanvir Ahmed', mutual: '14 mutual friends', avatar: '/facebook/user/aki.webp' },
            { name: 'Sadia Islam', mutual: '8 mutual friends', avatar: '/facebook/user/baongan.webp' },
            { name: 'Mehedi Hasan', mutual: '23 mutual friends', avatar: '/facebook/user/ddh.webp' },
            { name: 'Nusrat Jahan', mutual: '5 mutual friends', avatar: '/facebook/user/halinh.webp' },
          ].map((p, pIdx) => (
            <div key={pIdx} className="w-[140px] shrink-0 overflow-hidden rounded-xl border border-[#ced0d4]/70 bg-white shadow-xs">
              <div className="aspect-square w-full overflow-hidden bg-[#e4e6eb]">
                <img src={asset(p.avatar)} className="h-full w-full object-cover" alt="" />
              </div>
              <div className="p-2.5">
                <div className="truncate text-[13px] font-bold text-[#080809]">{p.name}</div>
                <div className="truncate text-[11px] text-[#65686C]">{p.mutual}</div>
                <div className="mt-2.5 flex h-[30px] w-full items-center justify-center rounded-lg bg-[#0866FF] text-[12px] font-semibold text-white">
                  Add friend
                </div>
                <div className="mt-1 flex h-[28px] w-full items-center justify-center rounded-lg bg-[#E4E6EB] text-[12px] font-semibold text-[#080809]">
                  Remove
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Posts Header & Composer */}
      <div className="mt-2.5 w-full bg-white border-y border-[#ced0d4]/60 px-4 py-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[18px] font-bold text-[#080809]">Posts</h3>
          <span className="rounded-lg bg-[#E4E6EB] px-3 py-1 text-[13px] font-semibold text-[#080809]">Filters</span>
        </div>
        <div className="mt-3 flex items-center gap-2.5 rounded-full bg-[#F0F2F5] px-3.5 py-2">
          <img
            src={fbProfile.profilePicture || asset('/facebook/user/lcd.webp')}
            className="h-8 w-8 rounded-full object-cover"
            alt=""
          />
          <span className="flex-1 text-[14px] text-[#65676C]">What&apos;s on your mind?</span>
          <MetaComposerPhotoIcon size={20} />
        </div>
      </div>

      {/* 6. Timeline Posts (100% Full-bleed width edge to edge, all 10 posts) */}
      {displayPosts && displayPosts.length > 0 ? (
        <div className="w-full pb-8">
          {displayPosts.map((post, pIdx) => (
            <article key={pIdx} className="w-full bg-white mt-2.5 border-y border-[#ced0d4]/60 text-[#050505]">
              {/* Author header */}
              <div className="flex items-center gap-2.5 px-3.5 pt-3 pb-2">
                <img
                  src={fbProfile.profilePicture || asset('/facebook/user/lcd.webp')}
                  className="h-10 w-10 rounded-full object-cover"
                  alt=""
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 text-[15px] font-bold text-[#050505] leading-tight">
                    <span>{fbProfile.profileName}</span>
                    {fbProfile.isVerified && <MetaVerifiedBadge size={14} />}
                  </div>
                  <div className="flex items-center gap-1 text-[12px] text-[#65676B] pt-0.5">
                    <span>{post.time || '1w'}</span> · <Globe2 size={12} />
                  </div>
                </div>
                <MetaMoreDotsIcon size={18} />
              </div>

              {/* Post Text */}
              {post.text && (
                <p className="whitespace-pre-line px-3.5 pt-1 pb-2.5 text-[14px] leading-snug text-[#050505]">
                  {renderPostTextWithLinks(post.text)}
                </p>
              )}

              {/* External Link Preview Card if available */}
              {post.linkCard && (
                <div className="mx-3.5 mb-2 overflow-hidden rounded-lg border border-[#ced0d4]/80 bg-[#F0F2F5]">
                  <div className="px-3 py-2">
                    <div className="text-[11px] font-semibold uppercase text-[#65676B] tracking-wider">
                      {post.linkCard.domain}
                    </div>
                    <div className="truncate text-[14px] font-bold text-[#050505] leading-snug">
                      {post.linkCard.title}
                    </div>
                  </div>
                </div>
              )}

              {/* Full-bleed Photo or Video Thumbnail */}
              {post.images && post.images.length > 0 && (
                <div className="relative w-full overflow-hidden bg-[#e4e6eb]">
                  <img src={post.images[0]} className="w-full max-h-[380px] object-cover" alt="" />
                  {(post.isVideo || post.images[0].includes('/t15.')) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/60 text-white shadow-xl backdrop-blur-xs border border-white/20">
                        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Reactions & engagement counts */}
              <div className="flex items-center justify-between px-3.5 py-2.5 text-[13px] text-[#65676B]">
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center -space-x-1">
                    {(() => {
                      const combos = [
                        ['like', 'love', 'care'],
                        ['love', 'haha', 'like'],
                        ['like', 'care', 'love'],
                        ['love', 'like', 'wow'],
                        ['haha', 'like', 'love'],
                        ['like', 'love', 'haha'],
                      ];
                      const currentCombo = combos[pIdx % combos.length];
                      return currentCombo.map((rc, rIdx) => (
                        <img
                          key={rIdx}
                          src={asset(`/facebook/reactions/${rc}.webp`)}
                          className="h-[18px] w-[18px] rounded-full border-[1.5px] border-white"
                          alt={rc}
                        />
                      ));
                    })()}
                  </div>
                  <span className="ml-1 font-medium">{post.reactions || '6.3K'}</span>
                </div>
                <div>
                  <span>{post.commentsCount ? (post.commentsCount.includes('comment') || post.commentsCount.includes('মন্তব্য') ? post.commentsCount : `${post.commentsCount} comments`) : '104 comments'}</span>
                  <span> · </span>
                  <span>{post.sharesCount ? (post.sharesCount.includes('share') || post.sharesCount.includes('শেয়ার') ? post.sharesCount : `${post.sharesCount} shares`) : '488 shares'}</span>
                </div>
              </div>

              {/* Action Bar */}
              <div className="mx-3.5 grid grid-cols-3 border-t border-[#ced0d4]/50 py-1 text-center text-[13px] font-semibold text-[#65676B]">
                <div className="flex items-center justify-center gap-1.5 py-2">
                  <MetaLikeThumbIcon size={18} />
                  <span>Like</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 py-2">
                  <MetaCommentIcon size={18} />
                  <span>Comment</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 py-2">
                  <MetaShareIcon size={18} />
                  <span>Share</span>
                </div>
              </div>

              {/* Top Comments on post */}
              {post.comments && post.comments.length > 0 && (
                <div className="border-t border-[#ced0d4]/40 bg-[#F7F8FA] px-3.5 py-2.5 flex flex-col gap-2">
                  {post.comments.map((c, cIdx) => (
                    <div key={cIdx} className="flex items-start gap-2">
                      <div className="h-7 w-7 shrink-0 rounded-full bg-[#E4E6EB] flex items-center justify-center font-bold text-[11px] text-[#65676B] overflow-hidden">
                        {c.author[0] || 'U'}
                      </div>
                      <div className="rounded-2xl bg-white px-3 py-1.5 shadow-2xs border border-[#ced0d4]/30 max-w-[85%]">
                        <div className="text-[12px] font-bold text-[#080809]">{c.author}</div>
                        <div className="text-[13px] text-[#050505] leading-snug">{c.text}</div>
                        {c.likes && (
                          <div className="mt-1 flex items-center gap-1 text-[11px] text-[#65676B]">
                            <img src={asset('/facebook/reactions/like.webp')} className="h-[12px] w-[12px]" alt="" />
                            <span>{c.likes}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      ) : (
        <div className="w-full bg-white mt-2.5 py-8 text-center text-[14px] text-[#65676B] border-y border-[#ced0d4]/60">
          {fbProfile.isLocked ? 'No posts available' : 'No recent public posts'}
        </div>
      )}
      </div>

      {/* Android Native Scrollbar Indicator */}
      <div
        className="pointer-events-none absolute right-1 z-30 w-[3px] rounded-full bg-[#65676B]/80"
        style={{
          top: `${thumbTop}px`,
          height: '46px',
          opacity: scrollbarOpacity,
        }}
      />
    </div>
  );
};

const MarketScreen: React.FC = () => (
  <div className="min-h-full bg-white p-3 text-[#050505]">
    <div className="flex items-center justify-between"><h2 className="text-2xl font-bold font-['Optimistic_Display',sans-serif]">Marketplace</h2><MetaSearchIcon size={20}/></div>
    <div className="my-3 grid grid-cols-2 gap-2"><div className="rounded-full bg-[#e4e6eb] py-2 text-center text-sm font-semibold">Sell</div><div className="rounded-full bg-[#e4e6eb] py-2 text-center text-sm font-semibold">Categories</div></div>
    <div className="grid grid-cols-2 gap-2">{['1','2','3'].map((x,i)=><div key={x} className="overflow-hidden rounded-xl border border-[#ced0d4]/60 bg-white"><img src={asset(`/facebook/post/${x}.webp`)} className="aspect-square w-full object-cover" alt=""/><div className="p-2"><p className="font-bold text-[15px]">{[85,450,120][i]} $</p><p className="text-xs text-[#65676b]">Local listing</p></div></div>)}</div>
  </div>
);

const FacebookScreen: React.FC<{frame:number; fbProfile?: FbProfileData}> = ({frame, fbProfile}) => {
  const tab=tabForFrame(frame, !!fbProfile);
  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#f0f2f5] font-['Optimistic_Text',sans-serif]">
      {tab==='feed'&&<TopBar/>}
      {tab!=='profile'&&<FacebookNav tab={tab} fbProfile={fbProfile}/>}
      <div className="min-h-0 flex-1 overflow-hidden">
        {tab==='feed'&&<Feed frame={frame} fbProfile={fbProfile}/>}
        {tab==='watch'&&<Watch/>}
        {tab==='friends'&&<FriendsTabScreen/>}
        {tab==='market'&&<MarketScreen/>}
        {tab==='notifications'&&<Notifications/>}
        {tab==='menu'&&<MenuScreen fbProfile={fbProfile}/>}
        {tab==='profile'&&fbProfile&&<ProfileScreen fbProfile={fbProfile} frame={frame}/>}
      </div>
    </div>
  );
};

export const FacebookWorkflowVideo: React.FC<{fbProfile?: FbProfileData}> = ({fbProfile: fbProfileProp}) => {
  const frame = useCurrentFrame();
  const fbProfile = fbProfileProp || (typeof window !== 'undefined' && (window as any).__REMOTION_INPUT_PROPS?.fbProfile) || undefined;

  // Home feed natural scroll before transitioning to profile (frames 0 to 125)
  const feedScroll = interpolate(frame, [35, 78], [0, -380], {
    ...clamp,
    easing: humanFlickEase,
  });

  // Tap ripple effect on the profile tab right before transition (frames 102-115)
  const tapScale = interpolate(frame, [102, 108, 114], [0, 1.3, 0], clamp);
  const tapOpacity = interpolate(frame, [102, 108, 114], [0, 0.4, 0], clamp);

  // Native slide transition from Home to Profile
  const profileSlideX = interpolate(frame, [115, 128], [100, 0], {
    ...clamp,
    easing: humanFlickEase,
  });

  return (
    <LawnchairProvider>
      <AbsoluteFill style={{background: '#0a0c10', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
        <div style={{transform: 'scale(2)', transformOrigin: 'center'}}>
          <DeviceFrame isFrameEnabled={false}>
            <div className="relative flex h-full w-full flex-col justify-between overflow-hidden select-none bg-[#F0F2F5] text-[#080809]">
              <StatusBar darkIcons={true} />
              <div className="relative flex-1 overflow-hidden">
                {/* 1. HOME SCREEN / FEED (Visible at start: frames 0 to 128) */}
                <div
                  className="absolute inset-0 flex flex-col overflow-hidden bg-[#f0f2f5]"
                  style={{
                    transform: `translateX(${interpolate(frame, [115, 128], [0, -30], clamp)}%)`,
                    opacity: interpolate(frame, [120, 128], [1, 0], clamp),
                    pointerEvents: frame >= 128 ? 'none' : 'auto',
                  }}
                >
                  <TopBar />
                  <div className="relative">
                    <FacebookNav tab={frame < 108 ? 'feed' : 'profile'} fbProfile={fbProfile} />
                    {/* Simulated user finger tap on the profile tab */}
                    {frame >= 102 && frame <= 116 && (
                      <div
                        className="pointer-events-none absolute right-3.5 top-1.5 h-9 w-9 rounded-full bg-[#0866FF]"
                        style={{
                          transform: `scale(${tapScale})`,
                          opacity: tapOpacity,
                        }}
                      />
                    )}
                  </div>
                  <div className="min-h-0 flex-1 overflow-hidden">
                    <div style={{transform: `translateY(${feedScroll}px)`}} className="bg-[#f0f2f5] pb-4">
                      <Composer fbProfile={fbProfile} />
                      <Stories fbProfile={fbProfile} />
                      <Post />
                      <Post second />
                    </div>
                  </div>
                </div>

                {/* 2. PROFILE SCREEN (Slides in from frame 115) */}
                {frame >= 115 && fbProfile && (
                  <div
                    className="absolute inset-0 bg-[#F0F2F5]"
                    style={{
                      transform: `translateX(${interpolate(frame, [115, 128, 425, 438], [100, 0, 0, -30], {
                        ...clamp,
                        easing: humanFlickEase,
                      })}%)`,
                      boxShadow: '-10px 0 25px rgba(0,0,0,0.25)',
                      opacity: interpolate(frame, [430, 438], [1, 0], clamp),
                      pointerEvents: frame >= 438 ? 'none' : 'auto',
                    }}
                  >
                    <ProfileScreen fbProfile={fbProfile} frame={frame} />
                  </div>
                )}

                {/* 3. PROFILE SETTINGS SCREEN (Slides in at frame 425 and active through frame 600) */}
                {frame >= 425 && (
                  <div
                    className="absolute inset-0 bg-[#F0F2F5]"
                    style={{
                      transform: `translateX(${interpolate(frame, [425, 438], [100, 0], {
                        ...clamp,
                        easing: humanFlickEase,
                      })}%)`,
                      boxShadow: '-10px 0 25px rgba(0,0,0,0.25)',
                    }}
                  >
                    <ProfileSettingsScreen fbProfile={fbProfile} frame={frame} />
                  </div>
                )}
                {!fbProfile && (
                  <div className="flex h-full items-center justify-center text-[#65676B]">Loading profile...</div>
                )}
              </div>
              <NavigationBar dark={true} />
            </div>
          </DeviceFrame>
        </div>
      </AbsoluteFill>
    </LawnchairProvider>
  );
};
