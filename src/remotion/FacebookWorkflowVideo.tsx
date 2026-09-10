'use client';

import React from 'react';
import {AbsoluteFill, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
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
  MetaGraduationIcon,
  MetaLocationIcon,
  MetaFollowersIcon,
  MetaVerifiedBadge,
} from '@/components/apps/MetaFacebookSvg';
import {Globe2, X, Search} from 'lucide-react';

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const asset = (path: string) => staticFile(path);

type FbTab = 'feed' | 'watch' | 'friends' | 'market' | 'notifications' | 'menu' | 'profile';

type FbPost = {
  text: string;
  images: string[];
  time?: string;
  reactions?: string;
  commentsCount?: string;
  sharesCount?: string;
  comments?: {author: string; text: string}[];
};

type FbProfileData = {
  profileName: string;
  isVerified?: boolean;
  coverPicture: string | null;
  profilePicture: string | null;
  bio: string | null;
  friendsCount: string | null;
  friends: {name: string; avatar: string}[];
  details?: string[];
  isLocked?: boolean;
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
    { name: 'Bente Othman', cover: '/facebook/story/1.webp', avatar: '/facebook/user/khanhvy.webp' },
    { name: 'Jordan Jones', cover: '/facebook/story/2.webp', avatar: '/facebook/user/messi.webp' },
    { name: 'Sarah Jenkins', cover: '/facebook/story/3.webp', avatar: '/facebook/user/minhhuong.webp' },
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
      <img src={asset(second ? '/facebook/user/goal.webp' : '/facebook/user/daiphatthanh.webp')} className="h-10 w-10 rounded-full object-cover" alt="" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 text-[15px] font-bold text-[#050505] leading-tight">
          <span>{second ? 'GOAL Football' : 'Becker Threads'}</span>
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#0866FF] text-white text-[9px] font-bold">✓</span>
        </div>
        <div className="flex items-center gap-1 text-[12px] text-[#65676b] pt-0.5">
          <span>{second ? '4h' : '2h'}</span> · <Globe2 size={12} />
        </div>
      </div>
      <MetaMoreDotsIcon size={18} />
      <X size={18} className="text-[#65676b]" />
    </div>
    <p className="whitespace-pre-line px-3.5 pt-1 pb-2.5 text-[14px] leading-snug text-[#050505]">
      {second ? '🏆 10 years of dedication to youth football\n⚽ The journey to the World Cup begins now 🌏' : 'Spring brights, all sustainable! 🌿 Everything shown was made before 1982, except the 🌼 #vintage #fashion'}
    </p>
    <img src={asset(second ? '/facebook/post/2.webp' : '/facebook/post/1.webp')} className="max-h-[380px] w-full object-cover" alt="" />
    <div className="flex items-center justify-between px-3.5 py-2.5 text-[13px] text-[#65676b]">
      <div className="flex items-center gap-1">
        <div className="flex items-center -space-x-1">
          <img src={asset('/facebook/reactions/like.webp')} className="h-[18px] w-[18px]" alt="" />
          <img src={asset('/facebook/reactions/love.webp')} className="h-[18px] w-[18px]" alt="" />
        </div>
        <span className="ml-1 font-medium">{second ? '3.8K' : '1.4K'}</span>
      </div>
      <div>{second ? '542 comments · 189 shares' : '128 comments · 42 shares'}</div>
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

const Feed: React.FC<{frame: number; fbProfile?: FbProfileData}> = ({frame, fbProfile}) => {
  const scroll = interpolate(frame, [180, 260], [0, -720], clamp);
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

const ProfileScreen: React.FC<{fbProfile: FbProfileData; frame: number}> = ({fbProfile, frame}) => {
  const scroll = interpolate(frame, [450, 560], [0, -680], clamp);
  return (
    <div className="min-h-full bg-[#F0F2F5] text-[#080809] font-['Optimistic_Text',sans-serif]" style={{transform: `translateY(${scroll}px)`}}>
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
          <div className="mt-1 flex items-center justify-center gap-1.5 text-[14px] text-[#65686C]">
            <span className="font-semibold text-[#080809]">{fbProfile.friendsCount ? `${fbProfile.friendsCount} followers` : '1,150 followers'}</span>
            <span>•</span>
            <span className="font-semibold text-[#080809]">480 following</span>
          </div>
          {fbProfile.bio && <p className="mt-2 text-[14px] text-[#080809]">{fbProfile.bio}</p>}
          <div className="mt-4 flex gap-2">
            <div className="flex h-[38px] flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#0866FF] px-4 text-[14px] font-semibold text-white">
              <MetaPlusIcon size={16} fill="#ffffff" />
              <span>Add to story</span>
            </div>
            <div className="flex h-[38px] flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#E4E6EB] px-4 text-[14px] font-semibold text-[#080809]">
              <MetaEditPencilIcon size={16} fill="#050505" />
              <span>Edit profile</span>
            </div>
          </div>
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
                  {/studied|studies|went to/i.test(d) ? (
                    <MetaGraduationIcon size={20} />
                  ) : /lives in|from/i.test(d) ? (
                    <MetaLocationIcon size={20} />
                  ) : /followed by/i.test(d) ? (
                    <MetaFollowersIcon size={20} />
                  ) : (
                    <span className="text-[14px]">ℹ</span>
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
        <div className="mb-2.5 flex items-center justify-between">
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
          <span className="flex-1 text-[14px] text-[#65686C]">What&apos;s on your mind?</span>
          <MetaComposerPhotoIcon size={20} />
        </div>
      </div>

      {/* 6. Timeline Posts (100% Full-bleed width edge to edge) */}
      {fbProfile.posts && fbProfile.posts.length > 0 ? (
        <div className="w-full pb-8">
          {fbProfile.posts.map((post, pIdx) => (
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
                  {post.text}
                </p>
              )}

              {/* Full-bleed Photo */}
              {post.images && post.images.length > 0 && (
                <div className="w-full overflow-hidden bg-[#e4e6eb]">
                  <img src={post.images[0]} className="w-full max-h-[380px] object-cover" alt="" />
                </div>
              )}

              {/* Reactions & engagement counts */}
              <div className="flex items-center justify-between px-3.5 py-2.5 text-[13px] text-[#65676B]">
                <div className="flex items-center gap-1">
                  <div className="flex items-center -space-x-1">
                    <img src={asset('/facebook/reactions/like.webp')} className="h-[18px] w-[18px]" alt="" />
                    <img src={asset('/facebook/reactions/love.webp')} className="h-[18px] w-[18px]" alt="" />
                  </div>
                  <span className="ml-1 font-medium">{post.reactions || '1.4K'}</span>
                </div>
                <div>{post.commentsCount ? `${post.commentsCount} comments` : '84 comments'} · {post.sharesCount ? `${post.sharesCount} shares` : '12 shares'}</div>
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
            </article>
          ))}
        </div>
      ) : (
        <div className="w-full bg-white mt-2.5 py-8 text-center text-[14px] text-[#65676B] border-y border-[#ced0d4]/60">
          {fbProfile.isLocked ? 'No posts available' : 'No recent public posts'}
        </div>
      )}
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
  const {fps} = useVideoConfig();
  const fbProfile = fbProfileProp || (typeof window !== 'undefined' && (window as any).__REMOTION_INPUT_PROPS?.fbProfile) || undefined;
  const facebookVisible = frame >= 45;
  const appOpen = spring({frame: frame - 45, fps, config: {damping: 18, stiffness: 125}});
  const appScale = interpolate(appOpen, [0, 1], [0.18, 1], clamp);

  return (
    <LawnchairProvider>
      <AbsoluteFill style={{background: '#0a0c10', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
        <div style={{transform: 'scale(2)', transformOrigin: 'center'}}>
          <DeviceFrame isFrameEnabled={false}>
            <div className="relative flex h-full w-full flex-col justify-between overflow-hidden select-none bg-black text-white">
              <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${WALLPAPERS[0].url})`,
                  filter: facebookVisible ? 'brightness(.55) blur(3px)' : 'none',
                }}
              />
              <StatusBar darkIcons={false} />
              <HomeScreen />
              <Dock />
              <NavigationBar dark={false} />
              {facebookVisible && (
                <div
                  style={{transform: `scale(${appScale})`, transformOrigin: 'center'}}
                  className="absolute inset-0 z-30"
                >
                  <FacebookScreen frame={frame} fbProfile={fbProfile} />
                </div>
              )}
            </div>
          </DeviceFrame>
        </div>
      </AbsoluteFill>
    </LawnchairProvider>
  );
};
