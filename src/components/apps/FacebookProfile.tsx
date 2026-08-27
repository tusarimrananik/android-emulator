'use client';

import React, { useState } from 'react';
import {
  ArrowLeft,
  Search,
  Camera,
  Plus,
  Edit2,
  MoreHorizontal,
  GraduationCap,
  MapPin,
  Radio,
  Image as ImageIcon,
  Globe2,
  Video,
  Radio as LiveIcon,
} from 'lucide-react';

const friends = [
  { name: 'Khánh Vy', avatar: '/facebook/user/khanhvy.webp' },
  { name: 'Leo Messi', avatar: '/facebook/user/messi.webp' },
  { name: 'Minh Hương', avatar: '/facebook/user/minhhuong.webp' },
  { name: 'Bảo Ngân', avatar: '/facebook/user/baongan.webp' },
  { name: 'Hà Linhh', avatar: '/facebook/user/halinh.webp' },
  { name: 'Minh Trí', avatar: '/facebook/user/minhtri.webp' },
];

const hobbies = ['💻 Coding', '📚 Studying', '⚽ Football', '🎮 Gaming', '🎧 Music', '📖 Reading'];

export const FacebookProfile: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'about' | 'reels' | 'photos'>('posts');
  const [liked, setLiked] = useState(false);

  return (
    <div className="min-h-full bg-[#f0f2f5] text-[#050505] font-sans select-none pb-12">
      {/* 1. TOP APP BAR */}
      <div className="sticky top-0 z-30 flex h-[48px] items-center justify-between border-b border-[#ced0d4] bg-white px-3">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            aria-label="Back"
            onClick={onBack}
            className="flex h-9 w-9 items-center justify-center rounded-full active:bg-[#e4e6eb]"
          >
            <ArrowLeft size={22} className="text-[#050505]" />
          </button>
          <span className="text-[17px] font-bold text-[#050505] truncate">Lê Công Đắt</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Search"
            className="flex h-9 w-9 items-center justify-center rounded-full active:bg-[#e4e6eb]"
          >
            <Search size={20} className="text-[#050505]" />
          </button>
        </div>
      </div>

      {/* 2. HEADER & PROFILE CARD */}
      <div className="bg-white">
        {/* Cover Photo */}
        <div className="relative h-[190px] w-full bg-[#e4e6eb]">
          <img
            src="/facebook/user/lcd-cover.webp"
            alt="Cover"
            className="h-full w-full object-cover"
            decoding="async"
          />
          {/* Cover Camera Badge */}
          <button
            type="button"
            aria-label="Edit cover photo"
            className="absolute bottom-3 right-3 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#e4e6eb] shadow-md active:bg-[#d8dadf] border border-white/40"
          >
            <Camera size={18} className="text-[#050505]" />
          </button>

          {/* Profile Picture (Avatar) Overlapping Cover */}
          <div className="absolute -bottom-[50px] left-4">
            <div className="relative h-[132px] w-[132px] rounded-full border-[4px] border-white bg-white shadow-sm overflow-hidden">
              <img
                src="/facebook/user/lcd.webp"
                alt="Profile avatar"
                className="h-full w-full object-cover"
                decoding="async"
              />
            </div>
            {/* Avatar Camera Badge */}
            <button
              type="button"
              aria-label="Change profile picture"
              className="absolute bottom-1 right-1 flex h-[34px] w-[34px] items-center justify-center rounded-full border-[2px] border-white bg-[#e4e6eb] shadow-md active:bg-[#d8dadf]"
            >
              <Camera size={17} className="text-[#050505]" />
            </button>
          </div>
        </div>

        {/* Identity, Stats & Bio */}
        <div className="px-4 pt-[58px] pb-4">
          <h1 className="text-[24px] font-bold text-[#050505] leading-tight">
            Lê Công Đắt
          </h1>

          <div className="mt-1 flex items-center gap-1.5 text-[14px]">
            <span className="font-bold text-[#050505]">1.1K</span>
            <span className="text-[#65676b]">friends</span>
            <span className="text-[#65676b]">•</span>
            <span className="font-bold text-[#050505]">4.8K</span>
            <span className="text-[#65676b]">followers</span>
          </div>

          <p className="mt-2 text-[15px] font-normal text-[#050505] leading-relaxed">
            I am Dat
          </p>

          {/* Action Buttons: Add to Story | Edit Profile | More */}
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              className="flex h-[36px] flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#1877f2] px-3 text-[14px] font-semibold text-white active:bg-[#166fe5] shadow-none"
            >
              <Plus size={18} strokeWidth={2.5} />
              <span>Add to story</span>
            </button>

            <button
              type="button"
              className="flex h-[36px] flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#e4e6eb] px-3 text-[14px] font-semibold text-[#050505] active:bg-[#d8dadf]"
            >
              <Edit2 size={16} />
              <span>Edit profile</span>
            </button>

            <button
              type="button"
              aria-label="More profile options"
              className="flex h-[36px] w-[42px] items-center justify-center rounded-lg bg-[#e4e6eb] text-[#050505] active:bg-[#d8dadf]"
            >
              <MoreHorizontal size={19} />
            </button>
          </div>
        </div>

        {/* 3. PROFILE TABS */}
        <div className="flex border-t border-[#ced0d4] px-2 bg-white">
          {(['posts', 'about', 'reels', 'photos'] as const).map((tabKey) => {
            const labelMap = { posts: 'Posts', about: 'About', reels: 'Reels', photos: 'Photos' };
            const isActive = activeTab === tabKey;
            return (
              <button
                key={tabKey}
                type="button"
                onClick={() => setActiveTab(tabKey)}
                className={`relative flex-1 py-3 text-center text-[14px] font-semibold transition-colors ${
                  isActive ? 'text-[#1877f2]' : 'text-[#65676b]'
                }`}
              >
                {labelMap[tabKey]}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-[#1877f2]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. DETAILS CARD */}
      <div className="mt-2.5 bg-white p-4">
        <h2 className="text-[19px] font-bold text-[#050505]">Details</h2>
        <div className="mt-3.5 space-y-3.5 text-[14px] text-[#050505]">
          <div className="flex items-start gap-3">
            <GraduationCap size={22} className="shrink-0 text-[#65676b] mt-0.5" />
            <div className="leading-snug">
              Studied Software Engineering at{' '}
              <span className="font-semibold text-[#050505]">University of Science, VNU-HCM</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin size={22} className="shrink-0 text-[#65676b]" />
            <div className="leading-snug">
              From <span className="font-semibold text-[#050505]">Cai Lay District, Tien Giang</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Radio size={22} className="shrink-0 text-[#65676b]" />
            <div className="leading-snug">
              Followed by <span className="font-semibold text-[#050505]">4,820 people</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[#65676b]">
            <MoreHorizontal size={22} className="shrink-0 text-[#65676b]" />
            <span className="text-[#1877f2] font-normal cursor-pointer">See your About info</span>
          </div>
        </div>

        {/* Interests */}
        <h3 className="mt-5 text-[15px] font-bold text-[#050505]">Interests</h3>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {hobbies.map((hobby) => (
            <span
              key={hobby}
              className="rounded-full bg-[#f0f2f5] border border-[#ced0d4]/60 px-3.5 py-1.5 text-[13px] font-medium text-[#050505]"
            >
              {hobby}
            </span>
          ))}
        </div>

        {/* Edit public details button */}
        <button
          type="button"
          className="mt-4 w-full rounded-lg bg-[#e7f3ff] py-2 text-[14px] font-semibold text-[#1877f2] active:bg-[#d8ecff]"
        >
          Edit public details
        </button>
      </div>

      {/* 5. FRIENDS SECTION */}
      <div className="mt-2.5 bg-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[19px] font-bold text-[#050505]">Friends</h2>
            <p className="text-[13px] text-[#65676b]">1,150 friends</p>
          </div>
          <button type="button" className="text-[14px] font-medium text-[#1877f2]">
            Find friends
          </button>
        </div>

        <div className="mt-3.5 grid grid-cols-3 gap-2.5">
          {friends.map((friend) => (
            <div key={friend.name} className="space-y-1 cursor-pointer">
              <img
                src={friend.avatar}
                alt={friend.name}
                className="aspect-square w-full rounded-lg object-cover bg-[#e4e6eb]"
                loading="lazy"
                decoding="async"
              />
              <p className="truncate text-[12px] font-semibold text-[#050505]">{friend.name}</p>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="mt-3.5 w-full rounded-lg bg-[#e4e6eb] py-2 text-[14px] font-semibold text-[#050505] active:bg-[#d8dadf]"
        >
          See all friends
        </button>
      </div>

      {/* 6. POSTS / COMPOSER SECTION */}
      <div className="mt-2.5 bg-white p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[19px] font-bold text-[#050505]">Posts</h2>
          <button type="button" className="text-[14px] font-medium text-[#1877f2]">
            Filters
          </button>
        </div>

        {/* What's on your mind input */}
        <div className="mt-3.5 flex items-center gap-3">
          <img
            src="/facebook/user/lcd.webp"
            alt="User"
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="flex-1 rounded-full bg-[#f0f2f5] px-4 py-2 text-[14px] text-[#65676b]">
            What&apos;s on your mind?
          </div>
          <button type="button" aria-label="Add photo">
            <ImageIcon size={22} className="text-[#45bd62]" />
          </button>
        </div>

        {/* Quick Reel & Live action pills */}
        <div className="mt-3.5 flex gap-2 border-t border-[#ced0d4] pt-3">
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#f0f2f5] py-2 text-[13px] font-semibold text-[#050505] active:bg-[#e4e6eb]"
          >
            <Video size={17} className="text-[#f3425f]" />
            <span>Reel</span>
          </button>
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#f0f2f5] py-2 text-[13px] font-semibold text-[#050505] active:bg-[#e4e6eb]"
          >
            <LiveIcon size={17} className="text-[#f3425f]" />
            <span>Live</span>
          </button>
        </div>

        <button
          type="button"
          className="mt-3 w-full rounded-lg bg-[#e4e6eb] py-2 text-[14px] font-semibold text-[#050505] active:bg-[#d8dadf]"
        >
          Manage posts
        </button>
      </div>

      {/* 7. POSTS FEED */}
      <article className="mt-2.5 bg-white text-[#050505]">
        <div className="flex items-center gap-2.5 px-4 pt-3.5">
          <img
            src="/facebook/user/lcd.webp"
            alt="Author"
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="min-w-0 flex-1">
            <div className="text-[15px] font-bold text-[#050505]">Lê Công Đắt</div>
            <div className="flex items-center gap-1 text-[12px] text-[#65676b]">
              <span>3m</span>
              <span>·</span>
              <Globe2 size={12} />
            </div>
          </div>
          <button type="button" aria-label="Options" className="text-[#65676b]">
            <MoreHorizontal size={20} />
          </button>
        </div>

        <p className="px-4 pt-3 pb-2 text-[14px] leading-snug text-[#050505]">
          ✅ 10 years dedicated to Vietnamese youth football 🏆🇻🇳
        </p>

        <img
          src="/facebook/post/2.webp"
          alt="Post media"
          className="max-h-[380px] w-full object-cover"
          loading="lazy"
          decoding="async"
        />

        <div className="flex items-center justify-between px-4 py-2.5 text-[12px] text-[#65676b]">
          <div className="flex items-center">
            <img src="/facebook/reactions/like.webp" alt="Like" className="h-4 w-4" />
            <img src="/facebook/reactions/love.webp" alt="Love" className="-ml-1 h-4 w-4" />
            <span className="ml-1.5 font-medium">187</span>
          </div>
          <div>5 comments · 4 shares</div>
        </div>

        <div className="mx-4 grid grid-cols-3 border-t border-[#ced0d4] py-1.5 text-center text-[13px] font-semibold text-[#65676b]">
          <button
            type="button"
            onClick={() => setLiked(!liked)}
            className={`flex items-center justify-center gap-1.5 py-1.5 ${
              liked ? 'text-[#1877f2]' : ''
            }`}
          >
            <img src="/facebook/like.png" alt="" className="h-4 w-4 object-contain" />
            <span>Like</span>
          </button>
          <button type="button" className="flex items-center justify-center gap-1.5 py-1.5">
            <img src="/facebook/comment.png" alt="" className="h-4 w-4 object-contain" />
            <span>Comment</span>
          </button>
          <button type="button" className="flex items-center justify-center gap-1.5 py-1.5">
            <img src="/facebook/share.png" alt="" className="h-4 w-4 object-contain" />
            <span>Share</span>
          </button>
        </div>
      </article>
    </div>
  );
};
