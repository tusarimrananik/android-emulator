'use client';

import React, { useState } from 'react';
import {
  MetaFacebookLogo,
  MetaSearchIcon,
  MetaMenuGridIcon,
  MetaMessengerIcon,
  MetaBellIcon,
  MetaCameraIcon,
  MetaArrowBackIcon,
  MetaPlusIcon,
  MetaEditPencilIcon,
  MetaMoreDotsIcon,
  MetaGraduationIcon,
  MetaLocationIcon,
  MetaFollowersIcon,
  MetaLikeThumbIcon,
  MetaCommentIcon,
  MetaShareIcon,
} from './MetaFacebookSvg';
import {
  Image as ImageIcon,
  Globe2,
  Video,
  Radio as LiveIcon,
  X,
  UserPlus,
} from 'lucide-react';

const friends = [
  { name: 'Khánh Vy', avatar: '/facebook/user/khanhvy.webp' },
  { name: 'Leo Messi', avatar: '/facebook/user/messi.webp' },
  { name: 'Minh Hương', avatar: '/facebook/user/minhhuong.webp' },
  { name: 'Bảo Ngân', avatar: '/facebook/user/baongan.webp' },
  { name: 'Hà Linhh', avatar: '/facebook/user/halinh.webp' },
  { name: 'Minh Trí', avatar: '/facebook/user/minhtri.webp' },
];

const followerCluster = [
  '/facebook/user/khanhvy.webp',
  '/facebook/user/messi.webp',
  '/facebook/user/minhhuong.webp',
  '/facebook/user/baongan.webp',
  '/facebook/user/halinh.webp',
  '/facebook/user/minhtri.webp',
];

export const FacebookProfile: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'about' | 'reels' | 'photos'>('posts');
  const [liked, setLiked] = useState(false);

  return (
    <div className="min-h-full bg-white text-[#080809] font-['Optimistic_Text',-apple-system,sans-serif] select-none pb-16">
      {/* 1. OFFICIAL META TOP HEADER BAR (DIRECT FROM APK) */}
      <header className="sticky top-0 z-30 flex h-[50px] items-center justify-between border-b border-[#D0D3D7] bg-white px-3 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="flex h-9 w-9 items-center justify-center rounded-full active:scale-95 transition-transform"
          >
            <MetaFacebookLogo size={36} />
          </button>
        </div>

        {/* Official Meta Header Icons */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Search"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E4E6EB] text-[#080809] active:bg-[#d8dadf]"
          >
            <MetaSearchIcon size={18} />
          </button>
          <button
            type="button"
            aria-label="Menu grid"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E4E6EB] text-[#080809] active:bg-[#d8dadf]"
          >
            <MetaMenuGridIcon size={18} />
          </button>
          <button
            type="button"
            aria-label="Messenger"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E4E6EB] text-[#080809] active:bg-[#d8dadf]"
          >
            <MetaMessengerIcon size={18} />
          </button>
          <button
            type="button"
            aria-label="Notifications"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E4E6EB] text-[#080809] active:bg-[#d8dadf]"
          >
            <MetaBellIcon size={18} />
          </button>
          <div className="h-9 w-9 overflow-hidden rounded-full border border-[#D0D3D7]">
            <img src="/facebook/user/lcd.webp" alt="Account" className="h-full w-full object-cover" />
          </div>
        </div>
      </header>

      {/* 2. COVER & CENTERED AVATAR HERO (OFFICIAL META KATANA LAYOUT) */}
      <div className="relative bg-white pb-3">
        {/* Cover Photo */}
        <div className="relative h-[180px] w-full bg-gradient-to-b from-[#8a919a] to-[#cbd2d9] overflow-hidden">
          <img
            src="/facebook/user/lcd-cover.webp"
            alt="Cover"
            className="h-full w-full object-cover"
            decoding="async"
          />
          {/* Cover Camera Button with Meta SVG */}
          <button
            type="button"
            aria-label="Edit cover"
            className="absolute bottom-3 right-3 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white shadow-md active:bg-[#E4E6EB] border border-[#D0D3D7]/60"
          >
            <MetaCameraIcon size={17} className="text-[#080809]" />
          </button>

          {/* Floating "Share a thought..." pill */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full bg-white/95 px-4 py-1.5 shadow-md border border-[#D0D3D7]/50 flex items-center gap-1.5 backdrop-blur-sm">
            <span className="text-[13px] font-medium text-[#65686C]">Share a thought...</span>
          </div>
        </div>

        {/* Centered Avatar Overlapping Cover */}
        <div className="relative flex justify-center -mt-[65px]">
          <div className="relative">
            <div className="h-[130px] w-[130px] rounded-full border-[4px] border-white bg-white shadow-md overflow-hidden">
              <img
                src="/facebook/user/lcd.webp"
                alt="Profile picture"
                className="h-full w-full object-cover"
                decoding="async"
              />
            </div>
            {/* Avatar Camera Badge with Meta SVG */}
            <button
              type="button"
              aria-label="Change profile picture"
              className="absolute bottom-1 right-1 flex h-[34px] w-[34px] items-center justify-center rounded-full border-[2px] border-white bg-[#E4E6EB] shadow-md text-[#080809] active:bg-[#d8dadf]"
            >
              <MetaCameraIcon size={16} />
            </button>
          </div>
        </div>

        {/* 3. CENTERED IDENTITY, METRICS & AVATAR CLUSTER */}
        <div className="px-4 pt-2 text-center">
          <h1 className="text-[24px] font-bold font-['Optimistic_Display',sans-serif] text-[#080809] leading-tight tracking-tight">
            Lê Công Đắt
          </h1>

          <div className="mt-1 flex items-center justify-center gap-1.5 text-[14px] text-[#65686C]">
            <span className="font-semibold text-[#080809]">1,150 followers</span>
            <span>•</span>
            <span className="font-semibold text-[#080809]">480 following</span>
          </div>

          {/* Overlapping Follower Avatar Stack */}
          <div className="mt-2.5 flex items-center justify-center -space-x-2">
            {followerCluster.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="h-7 w-7 rounded-full border-2 border-white object-cover shadow-xs"
              />
            ))}
            <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-black text-[10px] font-bold text-white shadow-xs">
              •••
            </div>
          </div>

          <p className="mt-2.5 text-[14px] text-[#080809] font-normal leading-relaxed">
            I am Dat • Software Engineer 💻
          </p>

          {/* Action Buttons: Add to story | Edit | More */}
          <div className="mt-4 flex gap-2 px-2">
            <button
              type="button"
              className="flex h-[38px] flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#0866FF] px-4 text-[14px] font-semibold text-white active:bg-[#0055d4] shadow-none"
            >
              <MetaPlusIcon size={16} />
              <span>Add to story</span>
            </button>

            <button
              type="button"
              className="flex h-[38px] flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#E4E6EB] px-4 text-[14px] font-semibold text-[#080809] active:bg-[#d8dadf]"
            >
              <MetaEditPencilIcon size={16} />
              <span>Edit profile</span>
            </button>

            <button
              type="button"
              aria-label="More profile options"
              className="flex h-[38px] w-[42px] items-center justify-center rounded-lg bg-[#E4E6EB] text-[#080809] active:bg-[#d8dadf]"
            >
              <MetaMoreDotsIcon size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* 4. DETAILS SECTION */}
      <section className="bg-white p-4 border-y border-[#D0D3D7]/80 my-2">
        <h2 className="text-[18px] font-bold font-['Optimistic_Display',sans-serif] text-[#080809]">Details</h2>
        <div className="mt-3.5 space-y-3.5 text-[14px] text-[#080809]">
          <div className="flex items-start gap-3">
            <span className="text-[#65686C] mt-0.5"><MetaGraduationIcon size={20} /></span>
            <div className="leading-snug">
              Studied Software Engineering at{' '}
              <span className="font-bold text-[#080809]">University of Science, VNU-HCM</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[#65686C]"><MetaLocationIcon size={20} /></span>
            <div className="leading-snug">
              From <span className="font-bold text-[#080809]">Cai Lay District, Tien Giang</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[#65686C]"><MetaFollowersIcon size={20} /></span>
            <div className="leading-snug">
              Followed by <span className="font-bold text-[#080809]">4,820 people</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[#65686C] pt-0.5">
            <MetaMoreDotsIcon size={18} className="text-[#65686C]" />
            <span className="text-[#0064D1] font-medium cursor-pointer">
              See your About info
            </span>
          </div>
        </div>

        <button
          type="button"
          className="mt-4 w-full rounded-lg bg-[#E7F3FF] py-2 text-[14px] font-semibold text-[#0866FF] active:bg-[#d8ecff]"
        >
          Edit public details
        </button>
      </section>

      {/* 5. POSTS COMPOSER */}
      <section className="my-2 bg-white p-4 border-y border-[#D0D3D7]/80">
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-bold font-['Optimistic_Display',sans-serif] text-[#080809]">Posts</h2>
          <button type="button" className="text-[14px] font-medium text-[#0064D1]">
            Filters
          </button>
        </div>

        <div className="mt-3.5 flex items-center gap-3">
          <img
            src="/facebook/user/lcd.webp"
            alt="User avatar"
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="flex-1 rounded-full bg-[#F0F2F5] px-4 py-2 text-[14px] text-[#65686C]">
            What&apos;s on your mind?
          </div>
          <button type="button" aria-label="Add photo">
            <ImageIcon size={22} className="text-[#45bd62]" />
          </button>
        </div>

        <div className="mt-3.5 flex gap-2 border-t border-[#D0D3D7] pt-3">
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#F0F2F5] py-2 text-[13px] font-semibold text-[#080809] active:bg-[#E4E6EB]"
          >
            <Video size={17} className="text-[#f3425f]" />
            <span>Reel</span>
          </button>
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#F0F2F5] py-2 text-[13px] font-semibold text-[#080809] active:bg-[#E4E6EB]"
          >
            <LiveIcon size={17} className="text-[#f3425f]" />
            <span>Live</span>
          </button>
        </div>
      </section>

      {/* 6. SAMPLE FEED POST WITH OFFICIAL META ICONS */}
      <article className="bg-white text-[#080809] border-y border-[#D0D3D7]/80">
        <div className="flex items-center gap-2.5 px-4 pt-3.5">
          <img
            src="/facebook/user/lcd.webp"
            alt="Author avatar"
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="min-w-0 flex-1">
            <div className="text-[15px] font-bold text-[#080809]">Lê Công Đắt</div>
            <div className="flex items-center gap-1 text-[12px] text-[#65686C]">
              <span>3m</span>
              <span>·</span>
              <Globe2 size={12} />
            </div>
          </div>
          <button type="button" aria-label="Options" className="text-[#65686C]">
            <MetaMoreDotsIcon size={18} />
          </button>
        </div>

        <p className="px-4 pt-3 pb-2 text-[14px] leading-snug text-[#080809]">
          ✅ 10 years dedicated to Vietnamese youth football 🏆🇻🇳
        </p>

        <img
          src="/facebook/post/2.webp"
          alt="Post media"
          className="max-h-[380px] w-full object-cover"
          loading="lazy"
          decoding="async"
        />

        <div className="flex items-center justify-between px-4 py-2.5 text-[12px] text-[#65686C]">
          <div className="flex items-center">
            <img src="/facebook/reactions/like.webp" alt="Like" className="h-4 w-4" />
            <img src="/facebook/reactions/love.webp" alt="Love" className="-ml-1 h-4 w-4" />
            <span className="ml-1.5 font-medium">187</span>
          </div>
          <div>5 comments · 4 shares</div>
        </div>

        <div className="mx-4 grid grid-cols-3 border-t border-[#D0D3D7] py-1.5 text-center text-[13px] font-semibold text-[#65686C]">
          <button
            type="button"
            onClick={() => setLiked(!liked)}
            className={`flex items-center justify-center gap-1.5 py-1.5 transition-colors ${
              liked ? 'text-[#0866FF]' : 'text-[#65686C]'
            }`}
          >
            <MetaLikeThumbIcon size={17} />
            <span>Like</span>
          </button>
          <button type="button" className="flex items-center justify-center gap-1.5 py-1.5">
            <MetaCommentIcon size={17} />
            <span>Comment</span>
          </button>
          <button type="button" className="flex items-center justify-center gap-1.5 py-1.5">
            <MetaShareIcon size={17} />
            <span>Share</span>
          </button>
        </div>
      </article>
    </div>
  );
};
