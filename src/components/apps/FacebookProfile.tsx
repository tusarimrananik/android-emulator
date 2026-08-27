'use client';

import React, { useState } from 'react';

const friends = [
  { name: 'Khánh Vy', avatar: '/facebook/user/khanhvy.webp' },
  { name: 'Leo Messi', avatar: '/facebook/user/messi.webp' },
  { name: 'Minh Hương', avatar: '/facebook/user/minhhuong.webp' },
  { name: 'Bảo Ngân', avatar: '/facebook/user/baongan.webp' },
  { name: 'Hà Linhh', avatar: '/facebook/user/halinh.webp' },
  { name: 'Minh Trí', avatar: '/facebook/user/minhtri.webp' },
];

export const FacebookProfile: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'photos' | 'reels'>('posts');
  const [liked, setLiked] = useState(false);

  return (
    <div className="min-h-full bg-white text-black font-['Roboto',sans-serif] select-none pb-8">
      {/* PROFILE NAVIGATION BAR */}
      <div className="sticky top-0 z-30 flex h-[48px] items-center justify-between border-b border-[#C9CCD1] bg-white px-3">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            aria-label="Back"
            onClick={onBack}
            className="flex items-center justify-center p-1 active:opacity-70"
          >
            <img
              src="/facebook/profile-assets/left-arrow.png"
              alt="Back"
              className="h-[18px] w-[18px] object-contain"
            />
          </button>
          <div className="text-[16px] font-bold text-black truncate">Lê Công Đắt</div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="text-[14px] font-normal text-[#1877f2] active:opacity-70"
          >
            Your profiles
          </button>
          <button
            type="button"
            aria-label="Search"
            className="flex items-center justify-center p-1 active:opacity-70"
          >
            <img
              src="/facebook/profile-assets/search.png"
              alt="Search"
              className="h-[18px] w-[18px] object-contain"
            />
          </button>
        </div>
      </div>

      {/* COVER AND DP SECTION */}
      <div>
        {/* Cover Photo */}
        <div className="relative h-[165px] w-full bg-[#e4e6eb]">
          <img
            src="/facebook/user/lcd-cover.webp"
            alt="Cover"
            className="h-full w-full object-cover"
            decoding="async"
          />
          <div className="absolute bottom-[10px] right-[10px] h-[36px] w-[36px] cursor-pointer">
            <img
              src="/facebook/profile-assets/cameraIcon.png"
              alt="Change cover"
              className="h-full w-full object-contain drop-shadow"
            />
          </div>
        </div>

        {/* Profile Picture (Avatar) */}
        <div className="relative px-[17px]">
          <div className="relative -mt-[85px] inline-block">
            <img
              src="/facebook/user/lcd.webp"
              alt="Profile"
              className="h-[145px] w-[145px] rounded-full border-[4px] border-white object-cover bg-white shadow-sm"
              decoding="async"
            />
            <div className="absolute bottom-[4px] right-[4px] h-[36px] w-[36px] cursor-pointer">
              <img
                src="/facebook/profile-assets/cameraIcon.png"
                alt="Change avatar"
                className="h-full w-full object-contain rounded-full border-2 border-white drop-shadow"
              />
            </div>
          </div>
        </div>
      </div>

      {/* PROFILE INFORMATION */}
      <div className="px-[17px] pt-1">
        <h1 className="text-[22px] font-bold text-black leading-tight">Lê Công Đắt</h1>

        {/* Connection / Friends / Followers */}
        <div className="mt-1 flex items-center gap-2 text-[14px]">
          <span className="font-bold text-black">1.1K</span>
          <span className="text-[#65676B]">friends</span>
          <span className="text-[#65676B]">•</span>
          <span className="font-bold text-black">4.8K</span>
          <span className="text-[#65676B]">followers</span>
        </div>

        {/* Bio */}
        <div className="mt-2 text-[14px] font-normal text-black leading-relaxed">
          I am Dat
        </div>
      </div>

      {/* BUTTONS SECTION */}
      <div className="mt-3 flex items-center gap-2 px-[17px]">
        <button
          type="button"
          className="flex h-[36px] flex-1 items-center justify-center gap-2 rounded-[6px] bg-[#1877f2] px-3 text-[13px] font-bold text-white shadow-none active:bg-[#166fe5]"
        >
          <img
            src="/facebook/profile-assets/plus.png"
            alt=""
            className="h-[14px] w-[14px] object-contain invert"
          />
          <span>Add to story</span>
        </button>

        <button
          type="button"
          className="flex h-[36px] flex-1 items-center justify-center gap-2 rounded-[6px] bg-[#e4e6eb] px-3 text-[13px] font-bold text-black active:bg-[#d8dadf]"
        >
          <img
            src="/facebook/profile-assets/pencil.png"
            alt=""
            className="h-[14px] w-[14px] object-contain"
          />
          <span>Edit profile</span>
        </button>

        <button
          type="button"
          aria-label="More options"
          className="flex h-[36px] w-[44px] items-center justify-center rounded-[6px] bg-[#e4e6eb] text-black font-black text-[18px] tracking-[-2px] active:bg-[#d8dadf]"
        >
          ...
        </button>
      </div>

      {/* DIVIDER */}
      <div className="mt-4 h-[1px] w-full bg-[#ddd]" />

      {/* TABS CONTAINER */}
      <div className="flex border-b border-[#ddd] bg-white">
        <button
          type="button"
          onClick={() => setActiveTab('posts')}
          className={`flex-1 py-3 text-center text-[14px] font-bold transition-all ${
            activeTab === 'posts'
              ? 'border-b-[2px] border-[#1877f2] text-[#1877f2]'
              : 'text-[#65676B] font-normal'
          }`}
        >
          Posts
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('photos')}
          className={`flex-1 py-3 text-center text-[14px] font-bold transition-all ${
            activeTab === 'photos'
              ? 'border-b-[2px] border-[#1877f2] text-[#1877f2]'
              : 'text-[#65676B] font-normal'
          }`}
        >
          Photos
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('reels')}
          className={`flex-1 py-3 text-center text-[14px] font-bold transition-all ${
            activeTab === 'reels'
              ? 'border-b-[2px] border-[#1877f2] text-[#1877f2]'
              : 'text-[#65676B] font-normal'
          }`}
        >
          Reels
        </button>
      </div>

      {/* TAB CONTENT */}
      <div className="px-[17px] pt-3">
        {/* DETAILS / ABOUT SECTION */}
        <div className="space-y-3">
          <div className="text-[17px] font-bold text-black">Details</div>

          <div className="flex items-center gap-3 text-[14px] text-black">
            <span className="text-lg">🎓</span>
            <div>
              Studied Software Engineering at{' '}
              <span className="font-bold">University of Science, VNU-HCM</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[14px] text-black">
            <span className="text-lg">📍</span>
            <div>
              From <span className="font-bold">Cai Lay District, Tien Giang</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[14px] text-black">
            <span className="text-lg">📡</span>
            <div>
              Followed by <span className="font-bold">4,820 people</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[14px] text-[#65676B] pt-1">
            <img
              src="/facebook/profile-assets/more.png"
              alt=""
              className="h-[18px] w-[18px] object-contain opacity-60"
            />
            <span className="text-[#1877f2] font-normal">See more about yourself</span>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-4 h-[1px] w-full bg-[#ddd]" />

        {/* FRIENDS SECTION */}
        <div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[17px] font-bold text-black">Friends</div>
              <div className="text-[13px] text-[#65676B]">1,150 friends</div>
            </div>
            <button type="button" className="text-[14px] font-normal text-[#1877f2]">
              Find friends
            </button>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2.5">
            {friends.map((friend) => (
              <div key={friend.name} className="space-y-1">
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="aspect-square w-full rounded-[7px] object-cover border border-[#dcdcdc]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="truncate text-[12px] font-medium text-black">{friend.name}</div>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="mt-3.5 w-full rounded-[6px] bg-[#e4e6eb] py-2 text-[14px] font-bold text-black active:bg-[#d8dadf]"
          >
            See all friends
          </button>
        </div>

        {/* DIVIDER */}
        <div className="my-4 h-[1px] w-full bg-[#ddd]" />

        {/* POSTS TAB STATUS COMPOSER */}
        <div className="space-y-3">
          <div className="text-[17px] font-bold text-black">Posts</div>

          {/* Status update box */}
          <div className="flex items-center justify-between gap-2.5">
            <img
              src="/facebook/user/lcd.webp"
              alt=""
              className="h-[36px] w-[36px] rounded-full object-cover"
            />
            <div className="flex-1 rounded-[20px] bg-[#f0f2f5] px-3.5 py-2 text-[14px] text-[#3e4042]">
              Post a status update
            </div>
            <div className="flex h-[30px] w-[30px] items-center justify-center">
              <img
                src="/facebook/profile-assets/postImage.png"
                alt="Photos"
                className="h-[22px] w-[22px] object-contain"
              />
            </div>
          </div>

          {/* Other status pills */}
          <div className="flex items-center justify-around border-t border-[#ddd] py-2 text-[13px] text-zinc-700">
            <div className="flex items-center gap-1.5 cursor-pointer">
              <img src="/facebook/profile-assets/photo.png" alt="" className="h-[16px] w-[16px]" />
              <span>Photo</span>
            </div>
            <div className="h-4 w-[1px] bg-[#ddd]" />
            <div className="flex items-center gap-1.5 cursor-pointer">
              <img src="/facebook/profile-assets/check-in.png" alt="" className="h-[16px] w-[16px]" />
              <span>Check In</span>
            </div>
            <div className="h-4 w-[1px] bg-[#ddd]" />
            <div className="flex items-center gap-1.5 cursor-pointer">
              <img src="/facebook/profile-assets/life-event.png" alt="" className="h-[16px] w-[16px]" />
              <span>Life Event</span>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-3 h-[1px] w-full bg-[#ddd]" />

        {/* SAMPLE FEED POST */}
        <div className="rounded-lg border border-[#ddd] bg-white p-3 shadow-none">
          <div className="flex items-center gap-2.5">
            <img
              src="/facebook/user/lcd.webp"
              alt=""
              className="h-[38px] w-[38px] rounded-full object-cover"
            />
            <div>
              <div className="text-[14px] font-bold text-black">Lê Công Đắt</div>
              <div className="text-[11px] text-[#65676B]">3m · 🌐</div>
            </div>
          </div>
          <p className="mt-2 text-[13px] text-black leading-snug">
            ✅ 10 years dedicated to Vietnamese youth football 🏆
          </p>
          <img
            src="/facebook/post/2.webp"
            alt=""
            className="mt-2 max-h-[300px] w-full rounded-md object-cover"
          />
          <div className="mt-2 flex justify-between text-[11px] text-[#65676B]">
            <span>👍 ❤️ 187</span>
            <span>5 comments · 4 shares</span>
          </div>
          <div className="mt-2 grid grid-cols-3 border-t border-[#ddd] pt-2 text-center text-[12px] font-semibold text-[#65676B]">
            <button
              type="button"
              onClick={() => setLiked(!liked)}
              className={liked ? 'text-[#1877f2]' : ''}
            >
              👍 Like
            </button>
            <button type="button">◯ Comment</button>
            <button type="button">↗ Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};
