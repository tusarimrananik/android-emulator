'use client';

import React, { useState } from 'react';
import {
  ArrowLeft,
  Camera,
  Edit2,
  GraduationCap,
  Image as ImageIcon,
  MapPin,
  MoreHorizontal,
  Plus,
  Radio,
  Search,
  Globe2,
  ThumbsUp,
  MessageCircle,
  Share2,
  Video,
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
  const [activeTab, setActiveTab] = useState<'posts' | 'reels'>('posts');
  const [liked, setLiked] = useState(false);

  return (
    <div className="min-h-full bg-[#d8dadf] text-[#050505] font-sans select-none pb-12">
      {/* 1. NATIVE ANDROID FACEBOOK APP BAR */}
      <header className="sticky top-0 z-30 flex h-[54px] items-center gap-2 border-b border-black/10 bg-white px-2 shadow-xs">
        <button
          type="button"
          aria-label="Back"
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-full active:bg-[#e4e6eb] transition-colors"
        >
          <ArrowLeft size={26} className="text-[#050505]" />
        </button>
        <div className="flex h-[38px] flex-1 items-center gap-2 rounded-full bg-[#f0f2f5] px-3.5 text-[#65676b]">
          <Search size={18} className="text-[#65676b]" />
          <span className="text-[15px] text-[#65676b] font-normal">Search</span>
        </div>
      </header>

      {/* 2. COVER & OVERLAPPING AVATAR HERO (NATIVE FACEBOOK ANDROID APP) */}
      <div className="bg-white pb-4">
        {/* Cover Photo */}
        <div className="relative h-[210px] w-full bg-[#e4e6eb]">
          <img
            src="/facebook/user/lcd-cover.webp"
            alt="Cover"
            className="h-full w-full object-cover"
            decoding="async"
          />
          {/* Cover Camera Button */}
          <button
            type="button"
            aria-label="Edit cover photo"
            className="absolute bottom-3 right-3 flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#e4e6eb] shadow-md border border-white/40 active:bg-[#d8dadf] transition-transform active:scale-95"
          >
            <Camera size={19} className="text-[#050505]" />
          </button>

          {/* Left-Aligned Circular Avatar (Overlapping Cover by -50px) */}
          <div className="absolute -bottom-[50px] left-4">
            <div className="relative h-[140px] w-[140px] rounded-full border-[4px] border-white bg-white shadow-md overflow-hidden">
              <img
                src="/facebook/user/lcd.webp"
                alt="Profile picture"
                className="h-full w-full object-cover"
                decoding="async"
              />
            </div>
            {/* Avatar Camera Badge */}
            <button
              type="button"
              aria-label="Change profile picture"
              className="absolute bottom-1 right-1 flex h-[36px] w-[36px] items-center justify-center rounded-full border-[2px] border-white bg-[#e4e6eb] shadow-md text-[#050505] active:bg-[#d8dadf] transition-transform active:scale-95"
            >
              <Camera size={18} />
            </button>
          </div>
        </div>

        {/* Identity, Bio, Stats */}
        <div className="px-4 pt-[58px]">
          <h1 className="text-[23px] font-bold text-[#050505] leading-tight tracking-tight">
            Lê Công Đắt
          </h1>

          <div className="mt-1 flex items-center gap-1.5 text-[15px]">
            <span className="font-bold text-[#050505]">1.1K</span>
            <span className="text-[#65676b]">friends</span>
          </div>

          <p className="mt-2 text-[15px] font-normal text-[#050505] leading-relaxed">
            I am Dat
          </p>

          {/* NATIVE FACEBOOK ANDROID ACTION BUTTONS */}
          <div className="mt-3.5 flex flex-col gap-2">
            {/* Row 1: Full-width Add to Story */}
            <button
              type="button"
              className="flex h-[38px] w-full items-center justify-center gap-2 rounded-md bg-[#1877f2] px-4 text-[14px] font-semibold text-white active:bg-[#166fe5] shadow-none transition-colors"
            >
              <Plus size={18} strokeWidth={2.5} />
              <span>Add to story</span>
            </button>

            {/* Row 2: Edit Profile + More Options */}
            <div className="flex gap-2">
              <button
                type="button"
                className="flex h-[38px] flex-1 items-center justify-center gap-2 rounded-md bg-[#e4e6eb] px-4 text-[14px] font-semibold text-[#050505] active:bg-[#d8dadf] transition-colors"
              >
                <Edit2 size={16} />
                <span>Edit profile</span>
              </button>

              <button
                type="button"
                aria-label="More profile options"
                className="flex h-[38px] w-[46px] items-center justify-center rounded-md bg-[#e4e6eb] text-[#050505] active:bg-[#d8dadf] transition-colors"
              >
                <MoreHorizontal size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. TABS & DETAILS CARD */}
      <section className="mt-2 bg-white px-4 py-3.5 shadow-xs">
        {/* Tab Pills */}
        <div className="flex gap-2 border-b border-[#ced0d4] pb-3">
          <button
            type="button"
            onClick={() => setActiveTab('posts')}
            className={`rounded-full px-4 py-1.5 text-[14px] font-semibold transition-colors ${
              activeTab === 'posts'
                ? 'bg-[#e7f3ff] text-[#1877f2]'
                : 'bg-transparent text-[#65676b]'
            }`}
          >
            Posts
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('reels')}
            className={`rounded-full px-4 py-1.5 text-[14px] font-semibold transition-colors ${
              activeTab === 'reels'
                ? 'bg-[#e7f3ff] text-[#1877f2]'
                : 'bg-transparent text-[#65676b]'
            }`}
          >
            Reels
          </button>
        </div>

        {/* Details Section */}
        <h2 className="mt-4 text-[19px] font-bold text-[#050505]">Details</h2>
        <div className="mt-3 space-y-3 text-[14px] text-[#050505]">
          <div className="flex items-start gap-3">
            <GraduationCap size={22} className="shrink-0 text-[#65676b] mt-0.5" />
            <div className="leading-snug">
              Studied <b>Software Engineering</b> at <b>University of Science, VNU-HCM</b>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin size={22} className="shrink-0 text-[#65676b]" />
            <div className="leading-snug">
              From <b>Cai Lay District, Tien Giang</b>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Radio size={22} className="shrink-0 text-[#65676b]" />
            <div className="leading-snug">
              Followed by <b>4,820 people</b>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[#65676b] pt-0.5">
            <MoreHorizontal size={22} className="shrink-0 text-[#65676b]" />
            <span className="text-[#1877f2] font-normal cursor-pointer">See your About info</span>
          </div>
        </div>

        {/* Interests */}
        <h3 className="mt-5 text-[16px] font-bold text-[#050505]">Interests</h3>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {hobbies.map((hobby) => (
            <span
              key={hobby}
              className="rounded-full bg-[#f0f2f5] border border-[#ced0d4]/80 px-3.5 py-1.5 text-[13px] font-medium text-[#050505]"
            >
              {hobby}
            </span>
          ))}
        </div>

        <button
          type="button"
          className="mt-4 w-full rounded-md bg-[#e7f3ff] py-2 text-[14px] font-semibold text-[#1877f2] active:bg-[#d8ecff] transition-colors"
        >
          Edit public details
        </button>
      </section>

      {/* 4. FRIENDS CARD */}
      <section className="mt-2 bg-white px-4 py-4 shadow-xs">
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
          className="mt-3.5 w-full rounded-md bg-[#e4e6eb] py-2 text-[14px] font-semibold text-[#050505] active:bg-[#d8dadf] transition-colors"
        >
          See all friends
        </button>
      </section>

      {/* 5. POSTS COMPOSER */}
      <section className="mt-2 bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between">
          <h2 className="text-[19px] font-bold text-[#050505]">Posts</h2>
          <button type="button" className="text-[14px] font-medium text-[#1877f2]">
            Filters
          </button>
        </div>

        <div className="mt-3.5 flex items-center gap-3">
          <img
            src="/facebook/user/lcd.webp"
            alt="User avatar"
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="flex-1 rounded-full bg-[#f0f2f5] px-4 py-2 text-[14px] text-[#65676b]">
            What&apos;s on your mind?
          </div>
          <button type="button" aria-label="Add photo">
            <ImageIcon size={22} className="text-[#45bd62]" />
          </button>
        </div>

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
            <Radio size={17} className="text-[#f3425f]" />
            <span>Live</span>
          </button>
        </div>

        <button
          type="button"
          className="mt-3 w-full rounded-md bg-[#e4e6eb] py-2 text-[14px] font-semibold text-[#050505] active:bg-[#d8dadf] transition-colors"
        >
          Manage posts
        </button>
      </section>

      {/* 6. POST FEED */}
      <article className="mt-2 bg-white text-[#050505] shadow-xs">
        <div className="flex items-center gap-2.5 px-4 pt-3.5">
          <img
            src="/facebook/user/lcd.webp"
            alt="Author avatar"
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
            className={`flex items-center justify-center gap-1.5 py-1.5 transition-colors ${
              liked ? 'text-[#1877f2]' : 'text-[#65676b]'
            }`}
          >
            <ThumbsUp size={16} />
            <span>Like</span>
          </button>
          <button type="button" className="flex items-center justify-center gap-1.5 py-1.5">
            <MessageCircle size={16} />
            <span>Comment</span>
          </button>
          <button type="button" className="flex items-center justify-center gap-1.5 py-1.5">
            <Share2 size={16} />
            <span>Share</span>
          </button>
        </div>
      </article>
    </div>
  );
};
