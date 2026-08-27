'use client';

import React from 'react';
import {AbsoluteFill, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {LawnchairProvider} from '@/context/LawnchairContext';
import {DeviceFrame} from '@/components/phone/DeviceFrame';
import {StatusBar} from '@/components/phone/StatusBar';
import {NavigationBar} from '@/components/phone/NavigationBar';
import {AtAGlance} from '@/components/home/AtAGlance';
import {Dock} from '@/components/home/Dock';
import {AppSvgIcon} from '@/components/common/AppSvgIcon';
import {INITIAL_APPS} from '@/lib/apps-data';
import {WALLPAPERS} from '@/lib/wallpapers-data';
import {Globe2, MoreHorizontal, Plus, Search, X, Camera, Edit2} from 'lucide-react';

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const asset = (path: string) => staticFile(path);

type FbTab = 'feed' | 'watch' | 'market' | 'notifications' | 'menu' | 'profile';

type FbProfileData = {
  profileName: string;
  coverPicture: string | null;
  profilePicture: string | null;
  bio: string | null;
  friendsCount: string | null;
  friends: {name: string; avatar: string}[];
};

const tabForFrame = (frame: number, hasFbProfile: boolean): FbTab => {
  if (hasFbProfile) {
    // With profile: feed → watch → market → menu → profile → feed
    if (frame >= 510) return 'feed';
    if (frame >= 430) return 'profile';
    if (frame >= 390) return 'menu';
    if (frame >= 330) return 'market';
    if (frame >= 270) return 'watch';
    return 'feed';
  }
  if (frame >= 510) return 'feed';
  if (frame >= 450) return 'menu';
  if (frame >= 390) return 'notifications';
  if (frame >= 330) return 'market';
  if (frame >= 270) return 'watch';
  return 'feed';
};

const fbNav = [
  ['feed', 'home.png', 'home-active.png'],
  ['watch', 'watch.png', 'watch-active.png'],
  ['market', 'marketplace.png', 'marketplace-active.png'],
  ['notifications', 'noti.webp', 'noti-active.webp'],
  ['menu', 'menu.png', 'menu-active.png'],
] as const;

const FacebookNav: React.FC<{tab: FbTab}> = ({tab}) => (
  <div className="grid h-[48px] shrink-0 grid-cols-5 border-b border-zinc-200 bg-white">
    {fbNav.map(([id, normal, active]) => (
      <div key={id} className={`relative grid place-items-center ${tab === id ? 'after:absolute after:bottom-0 after:h-[3px] after:w-[70%] after:rounded-full after:bg-[#1877f2]' : ''}`}>
        <img src={asset(`/facebook/nav/${tab === id ? active : normal}`)} className="h-[27px] w-[27px] object-contain" alt="" />
      </div>
    ))}
  </div>
);

const TopBar: React.FC = () => (
  <div className="flex h-[58px] shrink-0 items-center justify-between bg-white px-3 text-black">
    <div className="flex items-center gap-1"><img src={asset('/facebook/menu.png')} className="h-8 w-8" alt=""/><div className="text-[27px] font-bold tracking-[-1.2px] text-[#1877f2]">facebook</div></div>
    <div className="flex gap-2"><div className="grid h-9 w-9 place-items-center rounded-full bg-black/10"><img src={asset('/facebook/search.png')} className="h-5 w-5" alt=""/></div><div className="grid h-9 w-9 place-items-center rounded-full bg-black/10"><img src={asset('/facebook/message.png')} className="h-5 w-5" alt=""/></div></div>
  </div>
);

const Composer: React.FC = () => <div className="bg-white text-black"><div className="flex items-center gap-3 px-3 py-3"><img src={asset('/facebook/user/lcd.webp')} className="h-11 w-11 rounded-full object-cover" alt=""/><div className="flex-1 rounded-full border border-zinc-300 px-4 py-2.5 text-[14px]">What's on your mind?</div></div><div className="grid grid-cols-3 border-t border-zinc-200 text-[12px] font-medium"><div className="py-2 text-center">🔴 Live</div><div className="border-x py-2 text-center">🖼️ Photo</div><div className="py-2 text-center">☺ Feeling</div></div></div>;

const Stories: React.FC = () => {
  const stories = [['Create Story','/facebook/user/lcd.webp'],['Doraemon','/facebook/story/1.webp'],['Old Books','/facebook/story/2.webp'],['VAFFC','/facebook/story/3.webp']];
  return <div className="mt-2 flex gap-2 bg-white px-3 py-3">{stories.map(([name,src],i)=><div key={name} className="relative h-[180px] w-[104px] shrink-0 overflow-hidden rounded-xl border bg-white"><img src={asset(src)} className="h-full w-full object-cover" alt=""/><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"/>{i===0?<div className="absolute left-2 top-2 grid h-9 w-9 place-items-center rounded-full border-2 border-white bg-[#1877f2] text-white"><Plus/></div>:<div className="absolute left-2 top-2 h-10 w-10 rounded-full border-[3px] border-[#1877f2] bg-white"/>}<div className="absolute bottom-2 left-2 right-1 text-[12px] font-semibold text-white">{name}</div></div>)}</div>;
};

const Post: React.FC<{second?: boolean}> = ({second}) => <div className="mt-2 bg-white text-black"><div className="flex items-center gap-2.5 px-3 py-3"><img src={asset(second?'/facebook/user/goal.webp':'/facebook/user/daiphatthanh.webp')} className="h-10 w-10 rounded-full object-cover" alt=""/><div className="flex-1"><b className="text-[14px]">{second?'GOAL Vietnam':'Radio Station.'}</b><div className="flex items-center gap-1 text-[11px] text-zinc-500">{second?'3m':'16h'} · <Globe2 size={12}/></div></div><MoreHorizontal/><X size={20}/></div><p className="px-3 pb-3 text-[13px] leading-snug">{second?'✅ 10 years dedicated to Vietnamese youth football 🌏🇻🇳 🏆':'Rap Viet Season 3 has found the Top 9 advancing to the Finals, promising an intense showdown.'}</p><img src={asset(second?'/facebook/post/2.webp':'/facebook/post/1.webp')} className="max-h-[350px] w-full object-cover" alt=""/><div className="flex justify-between px-3 py-2 text-[11px] text-zinc-500"><span>👍 ❤️ {second?'187':'10.845'}</span><span>{second?'5':'902'} comments</span></div><div className="mx-3 grid grid-cols-3 border-t py-2 text-center text-[12px] font-semibold text-zinc-600"><span>👍 Like</span><span>◯ Comment</span><span>↗ Share</span></div></div>;

const Feed: React.FC<{frame: number}> = ({frame}) => {
  const scroll = interpolate(frame,[180,260],[0,-720],clamp);
  return <div style={{transform:`translateY(${scroll}px)`}}><Composer/><Stories/><Post/><Post second/></div>;
};

const Watch: React.FC = () => <div className="min-h-full bg-white p-3 text-black"><div className="flex justify-between"><h2 className="text-2xl font-bold">Video</h2><Search/></div><div className="mt-4 overflow-hidden rounded-xl border"><img src={asset('/facebook/post/3.webp')} className="aspect-video w-full object-cover" alt=""/><div className="p-3"><b>GOAL Vietnam</b><p className="text-sm">New videos for you · Trending</p></div></div></div>;
const Market: React.FC = () => <div className="min-h-full bg-white p-3 text-black"><h2 className="text-2xl font-bold">Marketplace</h2><div className="my-3 grid grid-cols-2 gap-2"><div className="rounded-full bg-zinc-200 py-2 text-center font-semibold">Sell</div><div className="rounded-full bg-zinc-200 py-2 text-center font-semibold">Categories</div></div><div className="grid grid-cols-2 gap-2">{['1','2','3'].map((x,i)=><div key={x}><img src={asset(`/facebook/post/${x}.webp`)} className="aspect-square w-full rounded-lg object-cover" alt=""/><b className="text-sm">{[250000,480000,150000][i].toLocaleString('en-US')} $</b></div>)}</div></div>;
const Notifications: React.FC = () => <div className="min-h-full bg-white text-black"><h2 className="p-4 text-2xl font-bold">Notifications</h2>{[['Doraemon','doraemon.webp'],['GOAL Vietnam','goal.webp'],['Khánh Vy','khanhvy.webp']].map(([n,a],i)=><div key={n} className={`flex gap-3 p-4 ${i!==1?'bg-[#e7f3ff]':''}`}><img src={asset(`/facebook/user/${a}`)} className="h-14 w-14 rounded-full object-cover" alt=""/><div className="text-sm"><b>{n}</b> added new content.<div className="text-xs text-[#1877f2]">{i+1} h ago</div></div></div>)}</div>;
const MenuScreen: React.FC = () => <div className="min-h-full bg-[#f0f2f5] p-3 text-black"><h2 className="text-2xl font-bold">Menu</h2><div className="my-3 flex items-center gap-3 rounded-xl bg-white p-3"><img src={asset('/facebook/user/lcd.webp')} className="h-12 w-12 rounded-full object-cover" alt=""/><b>Lê Công Đắt</b></div><div className="grid grid-cols-2 gap-2">{[['Friends','friends.png'],['Memories','memory.png'],['Saved','saved.png'],['Marketplace','market.png'],['Video','video.png'],['Events','event.png']].map(([n,i])=><div key={n} className="flex items-center gap-3 rounded-xl bg-white p-3 font-semibold"><img src={asset(`/facebook/menu/${i}`)} className="h-7 w-7" alt=""/>{n}</div>)}</div></div>;

const ProfileScreen: React.FC<{fbProfile: FbProfileData; frame: number}> = ({fbProfile, frame}) => {
  const scroll = interpolate(frame, [440, 500], [0, -400], clamp);
  return (
    <div className="min-h-full bg-[#f0f2f5] text-[#050505] font-sans" style={{transform: `translateY(${scroll}px)`}}>
      {/* 1. Top App Bar */}
      <div className="flex h-[48px] items-center justify-between border-b border-[#ced0d4] bg-white px-3">
        <div className="flex items-center gap-3 truncate">
          <img src={asset('/facebook/profile-assets/left-arrow.png')} className="h-[18px] w-[18px]" alt="" />
          <span className="text-[17px] font-bold text-[#050505] truncate">{fbProfile.profileName || 'Facebook User'}</span>
        </div>
        <div className="flex items-center gap-2 text-[#050505]">
          <Search size={19} />
        </div>
      </div>

      {/* 2. Header & Profile Card */}
      <div className="bg-white">
        {/* Cover */}
        <div className="relative h-[190px] w-full bg-[#e4e6eb]">
          {fbProfile.coverPicture ? (
            <img src={fbProfile.coverPicture} className="h-full w-full object-cover" alt="" />
          ) : (
            <img src={asset('/facebook/user/lcd-cover.webp')} className="h-full w-full object-cover" alt="" />
          )}
          {/* Cover Camera Button */}
          <div className="absolute bottom-3 right-3 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#e4e6eb] shadow-md border border-white/40">
            <Camera size={18} className="text-[#050505]" />
          </div>

          {/* Avatar overlay */}
          <div className="absolute -bottom-[50px] left-4">
            <div className="relative h-[132px] w-[132px] rounded-full border-[4px] border-white bg-white shadow-sm overflow-hidden">
              {fbProfile.profilePicture ? (
                <img src={fbProfile.profilePicture} className="h-full w-full object-cover" alt="" />
              ) : (
                <img src={asset('/facebook/user/lcd.webp')} className="h-full w-full object-cover" alt="" />
              )}
            </div>
            {/* Avatar camera badge */}
            <div className="absolute bottom-1 right-1 flex h-[34px] w-[34px] items-center justify-center rounded-full border-[2px] border-white bg-[#e4e6eb] shadow-md">
              <Camera size={17} className="text-[#050505]" />
            </div>
          </div>
        </div>

        {/* Identity & Bio */}
        <div className="px-4 pt-[58px] pb-4">
          <h1 className="text-[24px] font-bold text-[#050505] leading-tight">{fbProfile.profileName || 'Facebook User'}</h1>
          {fbProfile.friendsCount && (
            <div className="mt-1 flex items-center gap-1.5 text-[14px]">
              <span className="font-bold text-[#050505]">{fbProfile.friendsCount}</span>
              <span className="text-[#65676b]">friends</span>
            </div>
          )}
          {fbProfile.bio && <p className="mt-2 text-[15px] text-[#050505] leading-relaxed">{fbProfile.bio}</p>}

          {/* Action buttons */}
          <div className="mt-4 flex gap-2">
            <div className="flex h-[36px] flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#1877f2] px-3 text-[14px] font-semibold text-white shadow-none">
              <Plus size={18} strokeWidth={2.5} />
              <span>Add to story</span>
            </div>
            <div className="flex h-[36px] flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#e4e6eb] px-3 text-[14px] font-semibold text-[#050505]">
              <Edit2 size={16} />
              <span>Edit profile</span>
            </div>
            <div className="flex h-[36px] w-[42px] items-center justify-center rounded-lg bg-[#e4e6eb] text-[#050505]">
              <MoreHorizontal size={19} />
            </div>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="flex border-t border-[#ced0d4] px-2 bg-white">
          <div className="flex-1 py-3 text-center text-[14px] font-semibold text-[#1877f2] relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:rounded-full after:bg-[#1877f2]">
            Posts
          </div>
          <div className="flex-1 py-3 text-center text-[14px] font-semibold text-[#65676b]">About</div>
          <div className="flex-1 py-3 text-center text-[14px] font-semibold text-[#65676b]">Reels</div>
          <div className="flex-1 py-3 text-center text-[14px] font-semibold text-[#65676b]">Photos</div>
        </div>
      </div>

      {/* Friends Grid */}
      {fbProfile.friends && fbProfile.friends.length > 0 && (
        <div className="mt-2.5 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[19px] font-bold text-[#050505]">Friends</h2>
              {fbProfile.friendsCount && <p className="text-[13px] text-[#65676b]">{fbProfile.friendsCount} friends</p>}
            </div>
            <span className="text-[14px] font-medium text-[#1877f2]">Find friends</span>
          </div>
          <div className="mt-3.5 grid grid-cols-3 gap-2.5">
            {fbProfile.friends.slice(0, 6).map((f, i) => (
              <div key={i} className="space-y-1">
                <img src={f.avatar} className="aspect-square w-full rounded-lg object-cover bg-[#e4e6eb]" alt="" />
                <p className="truncate text-[12px] font-semibold text-[#050505]">{f.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const FacebookScreen: React.FC<{frame:number; fbProfile?: FbProfileData}> = ({frame, fbProfile}) => {const tab=tabForFrame(frame, !!fbProfile);return <div className="flex h-full flex-col overflow-hidden bg-[#d8dadf]">{tab==='feed'&&<TopBar/>}{tab!=='profile'&&<FacebookNav tab={tab}/>}<div className="min-h-0 flex-1 overflow-hidden">{tab==='feed'&&<Feed frame={frame}/>} {tab==='watch'&&<Watch/>}{tab==='market'&&<Market/>}{tab==='notifications'&&<Notifications/>}{tab==='menu'&&<MenuScreen/>}{tab==='profile'&&fbProfile&&<ProfileScreen fbProfile={fbProfile} frame={frame}/>}</div></div>};

export const FacebookWorkflowVideo: React.FC<{fbProfile?: FbProfileData}> = ({fbProfile: fbProfileProp}) => {
  const frame=useCurrentFrame(); const {fps}=useVideoConfig();
  const fbProfile = fbProfileProp || (typeof window !== 'undefined' && (window as any).__REMOTION_INPUT_PROPS?.fbProfile) || undefined;
  const drawerVisible=frame>=45&&frame<120;
  const drawerOpen=spring({frame:frame-45,fps,config:{damping:18,stiffness:125}});
  const drawerScroll=interpolate(frame,[70,112],[0,-430],clamp);
  const facebookVisible=frame>=120;
  const appOpen=spring({frame:frame-120,fps,config:{damping:18,stiffness:125}});
  const appScale=interpolate(appOpen,[0,1],[.18,1],clamp);
  return <LawnchairProvider><AbsoluteFill style={{background:'#0a0c10',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}><div style={{transform:'scale(2)',transformOrigin:'center'}}><DeviceFrame isFrameEnabled={false}><div className="relative flex h-full w-full flex-col overflow-hidden bg-black text-white"><div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage:`url(${WALLPAPERS[0].url})`,filter:facebookVisible?'brightness(.55) blur(3px)':'none'}}/><div className="relative z-20"><StatusBar darkIcons={false}/></div><div className="relative z-10 flex flex-1 flex-col justify-between px-4 pb-2 pt-4"><AtAGlance/><div className="grid grid-cols-4 gap-x-2 gap-y-6 py-6">{INITIAL_APPS.slice(5,17).map(a=><div key={a.id} className="flex flex-col items-center gap-1"><AppSvgIcon appId={a.id} isThemed size={54}/><span className="max-w-[70px] truncate text-[11px]">{a.name}</span></div>)}</div><Dock/></div><div className="relative z-20"><NavigationBar dark={false}/></div>{drawerVisible&&<div style={{transform:`translateY(${interpolate(drawerOpen,[0,1],[915,0],clamp)}px)`}} className="absolute inset-0 z-40 overflow-hidden rounded-[40px] bg-[#121418]/[.98] p-4 pt-10"><div className="mb-5 flex h-12 items-center gap-3 rounded-full bg-white/10 px-4"><Search size={17}/><span className="text-xs text-white/50">Search apps</span></div><div className="h-[790px] overflow-hidden"><div style={{transform:`translateY(${drawerScroll}px)`}} className="grid grid-cols-4 gap-x-2 gap-y-7">{INITIAL_APPS.map(a=><div key={a.id} className={`flex h-[78px] flex-col items-center gap-1 ${a.id==='facebook'&&frame>100?'scale-110':''}`}>{a.id==='facebook'?<img src={asset('/app-icons/facebook.png')} className="h-[50px] w-[50px] rounded-full object-cover" alt="Facebook"/>:<AppSvgIcon appId={a.id} isThemed size={50}/>}<span className="max-w-[68px] truncate text-[10px]">{a.name}</span></div>)}</div></div></div>}{facebookVisible&&<div style={{transform:`scale(${appScale})`,transformOrigin:'center'}} className="absolute inset-0 z-30"><FacebookScreen frame={frame} fbProfile={fbProfile}/></div>}</div></DeviceFrame></div></AbsoluteFill></LawnchairProvider>;
};
