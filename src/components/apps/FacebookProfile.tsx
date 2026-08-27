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
  Smile,
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

const featured = [
  { name: 'New', image: null },
  { name: 'Featured', image: '/facebook/story/3.webp' },
  { name: '18+', image: '/facebook/story/4.webp' },
  { name: '20+', image: '/facebook/story/1.webp' },
];

function OwnPost({ second = false }: { second?: boolean }) {
  const [liked, setLiked] = useState(false);
  return (
    <article className="mt-2.5 bg-white text-black">
      <div className="flex items-center gap-2.5 px-3 py-3">
        <img
          src="/facebook/user/lcd.webp"
          alt="Profile"
          className="h-10 w-10 rounded-full object-cover"
          decoding="async"
        />
        <div className="min-w-0 flex-1">
          <div className="text-[15px] font-bold text-black leading-tight">Lê Công Đắt</div>
          <div className="flex items-center gap-1 text-[11px] text-zinc-500 mt-0.5">
            <span>3m</span>
            <span>·</span>
            <Globe2 size={11} />
          </div>
        </div>
        <button aria-label="Post options" className="text-zinc-600 p-1">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <p className="whitespace-pre-line px-3 pb-3 text-[14px] leading-snug text-black">
        {second
          ? 'Do you like Phở?\nBecause I can be your Pho-ever ✨✨'
          : '✅ 10 years dedicated to Vietnamese youth football\n✅ First to lead Vietnam to the U20 World Cup 🌏🇻🇳\n✅ Won the first title with U23 Vietnam at the 2023 Southeast Asian U23 Championship 🏆'}
      </p>

      <img
        src={second ? '/facebook/post/3.webp' : '/facebook/post/2.webp'}
        alt=""
        className="max-h-[360px] w-full object-cover"
        loading="lazy"
        decoding="async"
      />

      <div className="flex justify-between px-3 py-2 text-[12px] text-zinc-500">
        <span className="flex items-center gap-1">
          <img src="/facebook/reactions/like.webp" alt="" className="h-4 w-4" />
          <img src="/facebook/reactions/love.webp" alt="" className="-ml-1.5 h-4 w-4" />
          <span className="ml-1 font-medium">{second ? '22.3K' : '187'}</span>
        </span>
        <span>{second ? '258 comments' : '5 comments'}</span>
      </div>

      <div className="mx-3 grid grid-cols-3 border-t border-zinc-200 py-1.5 text-center text-[13px] font-semibold text-zinc-600">
        <button
          onClick={() => setLiked(!liked)}
          className={`flex items-center justify-center gap-1.5 py-1.5 ${liked ? 'text-[#1877f2]' : ''}`}
        >
          <img src="/facebook/like.png" alt="" className="h-4 w-4" />
          <span>Like</span>
        </button>
        <button className="flex items-center justify-center gap-1.5 py-1.5">
          <img src="/facebook/comment.png" alt="" className="h-4 w-4" />
          <span>Comment</span>
        </button>
        <button className="flex items-center justify-center gap-1.5 py-1.5">
          <img src="/facebook/share.png" alt="" className="h-4 w-4" />
          <span>Share</span>
        </button>
      </div>
    </article>
  );
}

export const FacebookProfile: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-full bg-[#d8dadf] text-black font-sans select-none pb-12">
      {/* 1. APP BAR */}
      <div className="sticky top-0 z-30 flex h-[60px] items-center gap-2 border-b border-black/10 bg-white px-2">
        <button
          type="button"
          aria-label="Back to Menu"
          onClick={onBack}
          className="grid h-10 w-10 place-items-center rounded-full active:bg-zinc-100"
        >
          <ArrowLeft size={28} className="text-black" />
        </button>
        <div className="flex h-[41px] flex-1 items-center gap-2 rounded-full bg-zinc-200/80 px-3 text-zinc-500">
          <Search size={22} className="text-zinc-500" />
          <span className="text-[16px] text-zinc-600">Search</span>
        </div>
      </div>

      {/* 2. STACKED COVER & AVATAR SECTION */}
      <section className="bg-white">
        <div className="relative h-[270px] w-full">
          {/* Cover Image */}
          <div className="h-[220px] w-full overflow-hidden bg-zinc-300">
            <img
              src="/facebook/user/lcd-cover.webp"
              alt="Cover photo"
              className="h-full w-full object-cover"
              decoding="async"
            />
          </div>

          {/* Right Action Buttons on Cover (Avatar creator + Camera) */}
          <div className="absolute right-3.5 bottom-[65px] flex flex-col items-center gap-2.5">
            <button
              type="button"
              aria-label="Create avatar"
              className="grid h-[38px] w-[38px] place-items-center rounded-full bg-[#1877f2] text-white shadow-md active:scale-95"
            >
              <Smile size={20} />
            </button>
            <button
              type="button"
              aria-label="Change cover photo"
              className="grid h-[36px] w-[36px] place-items-center rounded-full bg-zinc-200 text-black shadow-md active:scale-95"
            >
              <Camera size={20} />
            </button>
          </div>

          {/* Large Overlapping Circular Avatar */}
          <div className="absolute bottom-0 left-[15px]">
            <div className="relative h-[150px] w-[150px] rounded-full border-[5px] border-white bg-white shadow-sm overflow-hidden">
              <img
                src="/facebook/user/lcd.webp"
                alt="Profile"
                className="h-full w-full object-cover"
                decoding="async"
              />
            </div>
            {/* Avatar Camera Badge */}
            <button
              type="button"
              aria-label="Change profile picture"
              className="absolute bottom-0 right-0 grid h-[36px] w-[36px] place-items-center rounded-full border-2 border-white bg-zinc-200 text-black shadow-md active:scale-95"
            >
              <Camera size={19} />
            </button>
          </div>
        </div>

        {/* 3. USER INFO & ACTION BUTTONS */}
        <div className="px-[15px] pt-3 pb-4">
          <h1 className="text-[23px] font-bold text-black leading-tight">
            Lê Công Đắt
          </h1>

          <div className="mt-1 flex items-center gap-1 text-[16px]">
            <span className="font-semibold text-black">1,1K</span>
            <span className="text-zinc-500 font-normal">friends</span>
          </div>

          <p className="mt-2 text-[15px] text-zinc-800 font-normal">
            I am Dat
          </p>

          {/* Action Buttons Stack */}
          <div className="mt-3 flex flex-col gap-2">
            {/* Row 1: Full-width Add to Story */}
            <button
              type="button"
              className="flex h-[40px] w-full items-center justify-center gap-1.5 rounded-[5px] bg-[#1877f2] text-[15px] font-semibold text-white shadow-none active:bg-[#166fe5]"
            >
              <Plus size={18} strokeWidth={2.5} />
              <span>Add to story</span>
            </button>

            {/* Row 2: Edit Profile + Overflow More Button */}
            <div className="flex gap-2">
              <button
                type="button"
                className="flex h-[40px] flex-1 items-center justify-center gap-2 rounded-[5px] bg-zinc-200 text-[15px] font-semibold text-black active:bg-zinc-300"
              >
                <Edit2 size={16} />
                <span>Edit profile</span>
              </button>

              <button
                type="button"
                aria-label="More profile options"
                className="grid h-[40px] w-[48px] place-items-center rounded-[5px] bg-zinc-200 text-black active:bg-zinc-300"
              >
                <MoreHorizontal size={22} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TABS & DETAILS SECTION */}
      <section className="mt-2 bg-white px-4 py-3.5">
        <div className="flex gap-2 border-b border-zinc-200 pb-3">
          <button
            type="button"
            className="rounded-full bg-[#e7f3ff] px-4 py-2 text-[14px] font-semibold text-[#1877f2]"
          >
            Posts
          </button>
          <button
            type="button"
            className="rounded-full px-4 py-2 text-[14px] font-semibold text-zinc-500"
          >
            Reels
          </button>
        </div>

        <h2 className="mt-4 text-[19px] font-bold text-black">Details</h2>
        <div className="mt-3 space-y-3.5 text-[14px] text-black">
          <div className="flex items-start gap-3">
            <GraduationCap className="shrink-0 text-zinc-500 mt-0.5" size={23} />
            <span>
              Studied <b>Software Engineering</b> at <b>University of Science, VNU-HCM</b>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="shrink-0 text-zinc-500" size={23} />
            <span>
              From <b>Cai Lay District, Tien Giang</b>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Radio className="shrink-0 text-zinc-500" size={23} />
            <span>
              Followed by <b>4,820 people</b>
            </span>
          </div>

          <div className="flex items-center gap-3 text-zinc-500">
            <MoreHorizontal size={23} className="shrink-0 text-zinc-500" />
            <span className="text-zinc-600">See your About info</span>
          </div>
        </div>

        {/* Interests */}
        <h3 className="mt-5 text-[17px] font-bold text-black">Interests</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {hobbies.map((hobby) => (
            <span
              key={hobby}
              className="rounded-full bg-zinc-200 px-3.5 py-2 text-[13px] font-medium text-black"
            >
              {hobby}
            </span>
          ))}
        </div>

        {/* Featured Stories Collection */}
        <h3 className="mt-5 text-[17px] font-bold text-black">Featured</h3>
        <div className="mt-2.5 flex gap-2.5 overflow-x-auto [scrollbar-width:none]">
          {featured.map((item) => (
            <div key={item.name} className="w-[84px] shrink-0 text-center">
              <div className="relative grid h-[136px] place-items-center overflow-hidden rounded-xl bg-zinc-200 shadow-sm">
                {item.image ? (
                  <img
                    src={item.image}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <Plus className="text-zinc-500" size={24} />
                )}
              </div>
              <div className="mt-1 text-[13px] font-medium text-zinc-800 truncate">{item.name}</div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="mt-4 w-full rounded-md bg-[#e7f3ff] py-2.5 text-[14px] font-semibold text-[#1877f2] active:bg-[#d8ecff]"
        >
          Edit public details
        </button>
      </section>

      {/* 5. FRIENDS SECTION */}
      <section className="mt-2 bg-white px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[19px] font-bold text-black">Friends</h2>
            <p className="text-[13px] text-zinc-500">1,150 friends</p>
          </div>
          <button type="button" className="text-[14px] font-semibold text-[#1877f2]">
            Find friends
          </button>
        </div>

        <div className="mt-3.5 grid grid-cols-3 gap-2.5">
          {friends.map((friend) => (
            <div key={friend.name} className="space-y-1">
              <img
                src={friend.avatar}
                alt={friend.name}
                className="aspect-square w-full rounded-lg object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="truncate text-[12px] font-semibold text-black">{friend.name}</div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="mt-4 w-full rounded-md bg-zinc-200 py-2.5 text-[14px] font-semibold text-black active:bg-zinc-300"
        >
          See all friends
        </button>
      </section>

      {/* 6. POSTS COMPOSER */}
      <section className="mt-2 bg-white py-3">
        <div className="flex items-center justify-between px-4">
          <h2 className="text-[18px] font-bold text-black">Posts</h2>
          <button type="button" className="text-[14px] font-semibold text-[#1877f2]">
            Filters
          </button>
        </div>

        <div className="mt-3 flex items-center gap-3 px-4">
          <img
            src="/facebook/user/lcd.webp"
            alt=""
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="flex-1 rounded-full border border-zinc-300 px-4 py-2 text-[14px] text-zinc-500">
            What&apos;s on your mind?
          </div>
          <ImageIcon className="text-green-600" size={22} />
        </div>

        <div className="mt-3 flex gap-2 border-y border-zinc-200 bg-zinc-50 px-4 py-2.5">
          <button
            type="button"
            className="rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-[12px] font-semibold text-zinc-700"
          >
            🎞️ Reels
          </button>
          <button
            type="button"
            className="rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-[12px] font-semibold text-zinc-700"
          >
            🔴 Live
          </button>
        </div>

        <div className="px-4 mt-3">
          <button
            type="button"
            className="w-full rounded-md bg-zinc-200 py-2.5 text-[14px] font-semibold text-black active:bg-zinc-300"
          >
            💬 Manage posts
          </button>
        </div>
      </section>

      {/* 7. FEED POSTS */}
      <OwnPost />
      <OwnPost second />
    </div>
  );
};
