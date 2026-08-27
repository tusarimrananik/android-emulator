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
  Briefcase,
  Home,
  Heart,
  Clock,
  Globe2,
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
    <article className="mt-2 bg-white text-black">
      <div className="flex items-center gap-2.5 px-3 py-3">
        <img
          src="/facebook/user/lcd.webp"
          alt="Profile"
          className="h-10 w-10 rounded-full object-cover"
          decoding="async"
        />
        <div className="min-w-0 flex-1">
          <div className="text-[14px] font-semibold">Lê Công Đắt</div>
          <div className="flex items-center gap-1 text-[11px] text-zinc-500">
            <span>3m</span>
            <span>·</span>
            <Globe2 size={11} />
          </div>
        </div>
        <button aria-label="Post options" className="text-zinc-600">
          <MoreHorizontal size={20} />
        </button>
      </div>
      <p className="whitespace-pre-line px-3 pb-3 text-[13px] leading-snug">
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
      <div className="flex justify-between px-3 py-2 text-[11px] text-zinc-500">
        <span className="flex items-center gap-1">
          <img src="/facebook/reactions/like.webp" alt="" className="h-4 w-4" />
          <img src="/facebook/reactions/love.webp" alt="" className="-ml-1.5 h-4 w-4" />
          <span className="ml-1">{second ? '22.3K' : '187'}</span>
        </span>
        <span>{second ? '258 comments' : '5 comments'}</span>
      </div>
      <div className="mx-3 grid grid-cols-3 border-t py-2 text-center text-[12px] font-semibold text-zinc-600">
        <button
          onClick={() => setLiked(!liked)}
          className={`flex items-center justify-center gap-1.5 py-1.5 ${liked ? 'text-[#1877f2]' : ''}`}
        >
          <img src="/facebook/like.png" alt="" className="h-4 w-4" />
          Like
        </button>
        <button className="flex items-center justify-center gap-1.5 py-1.5">
          <img src="/facebook/comment.png" alt="" className="h-4 w-4" />
          Comment
        </button>
        <button className="flex items-center justify-center gap-1.5 py-1.5">
          <img src="/facebook/share.png" alt="" className="h-4 w-4" />
          Share
        </button>
      </div>
    </article>
  );
}

export const FacebookProfile: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'reels' | 'photos'>('posts');

  return (
    <div className="min-h-full bg-[#d8dadf] text-black font-sans select-none pb-10">
      {/* Facebook Android Profile Header */}
      <div className="sticky top-0 z-30 flex h-[52px] items-center justify-between border-b border-zinc-200 bg-white px-3">
        <div className="flex items-center gap-3 min-w-0">
          <button
            aria-label="Back to Menu"
            onClick={onBack}
            className="grid h-9 w-9 place-items-center rounded-full active:bg-zinc-100"
          >
            <ArrowLeft size={22} className="text-zinc-800" />
          </button>
          <h1 className="text-[17px] font-bold text-zinc-900 truncate">Lê Công Đắt</h1>
        </div>
        <div className="flex items-center gap-1">
          <button
            aria-label="Search profile"
            className="grid h-9 w-9 place-items-center rounded-full active:bg-zinc-100 text-zinc-700"
          >
            <Search size={19} />
          </button>
          <button
            aria-label="More profile options"
            className="grid h-9 w-9 place-items-center rounded-full active:bg-zinc-100 text-zinc-700"
          >
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* Main Profile Info Section */}
      <section className="bg-white">
        {/* Cover Photo */}
        <div className="relative h-[220px] w-full bg-zinc-200">
          <img
            src="/facebook/user/lcd-cover.webp"
            alt="Cover photo"
            className="h-full w-full object-cover"
            decoding="async"
          />
          {/* Change cover photo button */}
          <button
            aria-label="Change cover photo"
            className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-200/90 shadow-sm backdrop-blur-sm text-zinc-800 active:scale-95"
          >
            <Camera size={18} />
          </button>

          {/* Profile Picture (Avatar) Overlap */}
          <div className="absolute -bottom-[60px] left-4">
            <div className="relative h-[140px] w-[140px] rounded-full border-4 border-white bg-zinc-100 shadow-sm overflow-hidden">
              <img
                src="/facebook/user/lcd.webp"
                alt="Profile"
                className="h-full w-full object-cover"
                decoding="async"
              />
            </div>
            {/* Avatar camera button */}
            <button
              aria-label="Change profile picture"
              className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-zinc-200 shadow-md text-zinc-800 active:scale-95"
            >
              <Camera size={18} />
            </button>
          </div>
        </div>

        {/* Identity, Bio, and Action Buttons */}
        <div className="px-4 pt-[68px] pb-4">
          <div className="flex items-center gap-1.5">
            <h2 className="text-[24px] font-bold tracking-tight text-zinc-900 leading-tight">
              Lê Công Đắt
            </h2>
          </div>

          <div className="mt-1 flex items-center gap-1.5 text-[14px]">
            <span className="font-bold text-zinc-900">1.1K</span>
            <span className="text-zinc-500">friends</span>
          </div>

          <p className="mt-2 text-[15px] text-zinc-800 leading-relaxed font-normal">
            I am Dat
          </p>

          {/* Facebook Official Action Buttons Grid */}
          <div className="mt-4 flex gap-2">
            <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#1877f2] py-2 px-3 text-[14px] font-semibold text-white shadow-sm active:bg-[#166fe5]">
              <Plus size={18} strokeWidth={2.5} />
              <span>Add to story</span>
            </button>

            <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-zinc-200/90 py-2 px-3 text-[14px] font-semibold text-zinc-900 active:bg-zinc-300">
              <Edit2 size={16} />
              <span>Edit profile</span>
            </button>

            <button
              aria-label="Profile options"
              className="flex h-[38px] w-10 items-center justify-center rounded-lg bg-zinc-200/90 text-zinc-900 active:bg-zinc-300"
            >
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>

        {/* Profile Tabs Navigation */}
        <div className="flex border-t border-zinc-200 px-2">
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex-1 py-3 text-center text-[14px] font-semibold relative ${
              activeTab === 'posts'
                ? 'text-[#1877f2] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:rounded-full after:bg-[#1877f2]'
                : 'text-zinc-600'
            }`}
          >
            Posts
          </button>
          <button
            onClick={() => setActiveTab('reels')}
            className={`flex-1 py-3 text-center text-[14px] font-semibold relative ${
              activeTab === 'reels'
                ? 'text-[#1877f2] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:rounded-full after:bg-[#1877f2]'
                : 'text-zinc-600'
            }`}
          >
            Reels
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`flex-1 py-3 text-center text-[14px] font-semibold relative ${
              activeTab === 'photos'
                ? 'text-[#1877f2] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:rounded-full after:bg-[#1877f2]'
                : 'text-zinc-600'
            }`}
          >
            Photos
          </button>
        </div>
      </section>

      {/* Details Section */}
      <section className="mt-2 bg-white px-4 py-4">
        <h3 className="text-[18px] font-bold text-zinc-900">Details</h3>
        <div className="mt-3 space-y-3.5 text-[14px] text-zinc-800">
          <div className="flex items-start gap-3">
            <GraduationCap className="shrink-0 text-zinc-500 mt-0.5" size={20} />
            <span>
              Studied <b>Software Engineering</b> at{' '}
              <b>University of Science, VNU-HCM</b>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="shrink-0 text-zinc-500" size={20} />
            <span>
              From <b>Cai Lay District, Tien Giang</b>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Radio className="shrink-0 text-zinc-500" size={20} />
            <span>
              Followed by <b>4,820 people</b>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <MoreHorizontal className="shrink-0 text-zinc-500" size={20} />
            <span className="text-zinc-600 font-medium">See your About info</span>
          </div>
        </div>

        {/* Interests Chips */}
        <h4 className="mt-5 text-[15px] font-bold text-zinc-900">Interests</h4>
        <div className="mt-2 flex flex-wrap gap-2">
          {hobbies.map((hobby) => (
            <span
              key={hobby}
              className="rounded-full bg-zinc-100 border border-zinc-200/80 px-3 py-1.5 text-[13px] font-medium text-zinc-700"
            >
              {hobby}
            </span>
          ))}
        </div>

        {/* Featured Stories Collection */}
        <h4 className="mt-5 text-[15px] font-bold text-zinc-900">Featured</h4>
        <div className="mt-2.5 flex gap-2.5 overflow-x-auto [scrollbar-width:none]">
          {featured.map((item) => (
            <div key={item.name} className="w-[84px] shrink-0 text-center">
              <div className="relative grid h-[130px] place-items-center overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 shadow-sm">
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
              <div className="mt-1 text-[12px] font-medium text-zinc-700 truncate">{item.name}</div>
            </div>
          ))}
        </div>

        <button className="mt-4 w-full rounded-lg bg-[#e7f3ff] py-2.5 text-[14px] font-semibold text-[#1877f2] active:bg-[#d8ecff]">
          Edit public details
        </button>
      </section>

      {/* Friends Grid Section */}
      <section className="mt-2 bg-white px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[18px] font-bold text-zinc-900">Friends</h3>
            <p className="text-[13px] text-zinc-500">1,150 friends</p>
          </div>
          <button className="text-[14px] font-semibold text-[#1877f2]">Find friends</button>
        </div>

        <div className="mt-3.5 grid grid-cols-3 gap-2.5">
          {friends.map((friend) => (
            <div key={friend.name} className="space-y-1">
              <img
                src={friend.avatar}
                alt={friend.name}
                className="aspect-square w-full rounded-xl object-cover border border-zinc-100"
                loading="lazy"
                decoding="async"
              />
              <p className="truncate text-[12px] font-semibold text-zinc-800">{friend.name}</p>
            </div>
          ))}
        </div>

        <button className="mt-3.5 w-full rounded-lg bg-zinc-200 py-2.5 text-[14px] font-semibold text-zinc-900 active:bg-zinc-300">
          See all friends
        </button>
      </section>

      {/* Posts Section */}
      <section className="mt-2 bg-white py-3">
        <div className="flex items-center justify-between px-4">
          <h3 className="text-[18px] font-bold text-zinc-900">Posts</h3>
          <button className="text-[14px] font-semibold text-[#1877f2]">Filters</button>
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
          <button className="flex items-center gap-1 rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-[12px] font-semibold text-zinc-700">
            <span>🎞️</span> Reels
          </button>
          <button className="flex items-center gap-1 rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-[12px] font-semibold text-zinc-700">
            <span>🔴</span> Live
          </button>
        </div>

        <div className="px-4 mt-3">
          <button className="w-full rounded-lg bg-zinc-200 py-2 text-[14px] font-semibold text-zinc-900">
            Manage posts
          </button>
        </div>
      </section>

      {/* Own Posts List */}
      <OwnPost />
      <OwnPost second />
    </div>
  );
};
