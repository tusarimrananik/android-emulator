'use client';

import React, { useState } from 'react';
import {
  MetaSearchIcon,
  MetaMessengerIcon,
  MetaLikeThumbIcon,
  MetaCommentIcon,
  MetaShareIcon,
  MetaMoreDotsIcon,
} from './MetaFacebookSvg';
import { FacebookProfile } from './FacebookProfile';
import { Globe2, Plus, X, Video, Image as ImageIcon, Smile } from 'lucide-react';

type Tab = 'feed' | 'watch' | 'market' | 'dating' | 'notifications' | 'menu';
type Screen = Tab | 'profile';

const stories = [
  { name: 'Create Story', cover: '/facebook/user/lcd.webp', avatar: '/facebook/user/lcd.webp', own: true },
  { name: 'Doraemon', cover: '/facebook/story/1.webp', avatar: '/facebook/user/doraemon.webp' },
  { name: 'Old Books', cover: '/facebook/story/2.webp', avatar: '/facebook/user/sachcungoc.webp' },
  { name: 'VAFFC', cover: '/facebook/story/3.webp', avatar: '/facebook/user/vaffc.webp' },
];

const posts = [
  {
    user: 'Radio Station.',
    avatar: '/facebook/user/daiphatthanh.webp',
    time: '16h',
    text: 'Rap Viet Season 3 (2023) has found the Top 9 advancing to the Finals, promising an intense showdown.',
    image: '/facebook/post/1.webp',
    reactions: '10.845',
    comments: '902 comments',
    shares: '98 shares',
  },
  {
    user: 'GOAL Vietnam',
    avatar: '/facebook/user/goal.webp',
    time: '3m',
    verified: true,
    text: '✅ 10 years dedicated to Vietnamese youth football\n✅ First to lead Vietnam to the U20 World Cup 🌏🇻🇳\n✅ Won the first title with U23 Vietnam at the 2023 Southeast Asian U23 Championship 🏆',
    image: '/facebook/post/2.webp',
    reactions: '187',
    comments: '5 comments',
    shares: '4 shares',
  },
];

const nav = [
  { id: 'feed' as const, normal: 'home.png', active: 'home-active.png', label: 'Home' },
  { id: 'watch' as const, normal: 'watch.png', active: 'watch-active.png', label: 'Video' },
  { id: 'market' as const, normal: 'marketplace.png', active: 'marketplace-active.png', label: 'Marketplace' },
  { id: 'dating' as const, normal: 'dating.webp', active: 'dating-active.webp', label: 'Dating' },
  { id: 'notifications' as const, normal: 'noti.webp', active: 'noti-active.webp', label: 'Notifications' },
  { id: 'menu' as const, normal: 'menu.png', active: 'menu-active.png', label: 'Menu' },
];

const navAsset = (file: string) => `/facebook/nav/${file}`;

function TopBar({ onOpenProfile }: { onOpenProfile?: () => void }) {
  return (
    <div className="flex h-[56px] shrink-0 items-center justify-between bg-white px-3 text-black">
      <div className="flex items-center gap-1">
        <div className="text-[28px] font-bold font-['Optimistic_Display',sans-serif] tracking-[-1.5px] text-[#0866FF]">
          facebook
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Search"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E4E6EB] text-[#080809] active:bg-[#d8dadf]"
        >
          <MetaSearchIcon size={18} />
        </button>
        <button
          type="button"
          aria-label="Messenger"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E4E6EB] text-[#080809] active:bg-[#d8dadf]"
        >
          <MetaMessengerIcon size={18} />
        </button>
      </div>
    </div>
  );
}

function Composer({ onOpenProfile }: { onOpenProfile: () => void }) {
  return (
    <div className="bg-white text-[#080809]">
      <div className="flex items-center gap-3 px-3 py-3">
        <button onClick={onOpenProfile} type="button" className="shrink-0">
          <img
            src="/facebook/user/lcd.webp"
            alt="Profile"
            className="h-10 w-10 rounded-full object-cover"
            decoding="async"
          />
        </button>
        <div
          onClick={onOpenProfile}
          className="flex-1 cursor-pointer rounded-full bg-[#F0F2F5] px-4 py-2 text-[14px] text-[#65686C]"
        >
          What&apos;s on your mind?
        </div>
        <button type="button" aria-label="Photo" className="p-1">
          <ImageIcon size={22} className="text-[#45bd62]" />
        </button>
      </div>

      <div className="grid grid-cols-3 border-t border-[#D0D3D7] text-[13px] font-semibold text-[#65686C]">
        <button type="button" className="flex items-center justify-center gap-2 py-2.5 active:bg-[#F0F2F5]">
          <Video size={17} className="text-[#f3425f]" />
          <span>Live</span>
        </button>
        <button type="button" className="flex items-center justify-center gap-2 border-x border-[#D0D3D7] py-2.5 active:bg-[#F0F2F5]">
          <ImageIcon size={17} className="text-[#45bd62]" />
          <span>Photo</span>
        </button>
        <button type="button" className="flex items-center justify-center gap-2 py-2.5 active:bg-[#F0F2F5]">
          <Smile size={17} className="text-[#f7b125]" />
          <span>Feeling</span>
        </button>
      </div>
    </div>
  );
}

function Stories({ onOpenProfile }: { onOpenProfile: () => void }) {
  return (
    <div className="my-2 flex gap-2 overflow-x-auto bg-white px-3 py-3 [scrollbar-width:none] border-y border-[#D0D3D7]/60">
      {stories.map((story) => (
        <button
          key={story.name}
          onClick={story.own ? onOpenProfile : undefined}
          className="relative h-[180px] w-[104px] shrink-0 overflow-hidden rounded-xl border border-[#D0D3D7] bg-white text-left shadow-xs active:scale-95 transition-transform"
        >
          <img
            src={story.cover}
            alt=""
            className={`w-full object-cover ${story.own ? 'h-[125px]' : 'h-full'}`}
            decoding="async"
          />
          {!story.own && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
          )}
          {story.own ? (
            <>
              <div className="absolute left-1/2 top-[106px] grid h-9 w-9 -translate-x-1/2 place-items-center rounded-full border-[3px] border-white bg-[#0866FF] text-white">
                <Plus size={20} />
              </div>
              <div className="absolute bottom-2 w-full text-center text-[12px] font-semibold text-[#080809]">
                Create Story
              </div>
            </>
          ) : (
            <>
              <img
                src={story.avatar}
                alt=""
                className="absolute left-2 top-2 h-9 w-9 rounded-full border-[3px] border-[#0866FF] object-cover"
                decoding="async"
              />
              <div className="absolute bottom-2 left-2 right-1 text-[12px] font-semibold leading-tight text-white">
                {story.name}
              </div>
            </>
          )}
        </button>
      ))}
    </div>
  );
}

function PostCard({ post }: { post: (typeof posts)[number] }) {
  const [liked, setLiked] = useState(false);
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <article className="my-2 bg-white text-[#080809] border-y border-[#D0D3D7]/80">
      <div className="flex items-center gap-2.5 px-3 py-3">
        <img
          src={post.avatar}
          alt=""
          className="h-10 w-10 rounded-full border border-black/10 object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1 text-[15px] font-bold text-[#080809]">
            {post.user}
            {post.verified && <span className="text-[#0866FF] text-xs">●</span>}
          </div>
          <div className="flex items-center gap-1 text-[12px] text-[#65686C]">
            <span>{post.time}</span>
            <span>·</span>
            <Globe2 size={12} />
          </div>
        </div>
        <button type="button" aria-label="More" className="text-[#65686C] p-1">
          <MetaMoreDotsIcon size={18} />
        </button>
        <button type="button" aria-label="Close" onClick={() => setVisible(false)} className="text-[#65686C] p-1">
          <X size={18} />
        </button>
      </div>

      <p className="whitespace-pre-line px-3 pb-3 text-[14px] leading-snug text-[#080809]">
        {post.text}
      </p>

      <img
        src={post.image}
        alt=""
        className="max-h-[380px] w-full object-cover"
        loading="lazy"
        decoding="async"
      />

      <div className="flex items-center justify-between px-3 py-2 text-[12px] text-[#65686C]">
        <div className="flex items-center">
          <img src="/facebook/reactions/like.webp" alt="Like" className="h-4 w-4" />
          <img src="/facebook/reactions/love.webp" alt="Love" className="-ml-1 h-4 w-4" />
          <span className="ml-1.5 font-medium">{post.reactions}</span>
        </div>
        <div>{post.comments} · {post.shares}</div>
      </div>

      <div className="mx-3 grid grid-cols-3 border-t border-[#D0D3D7] py-1 text-center text-[13px] font-semibold text-[#65686C]">
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
        <button type="button" className="flex items-center justify-center gap-1.5 py-1.5 active:bg-[#F0F2F5]">
          <MetaCommentIcon size={17} />
          <span>Comment</span>
        </button>
        <button type="button" className="flex items-center justify-center gap-1.5 py-1.5 active:bg-[#F0F2F5]">
          <MetaShareIcon size={17} />
          <span>Share</span>
        </button>
      </div>
    </article>
  );
}

function Feed({ onOpenProfile }: { onOpenProfile: () => void }) {
  return (
    <>
      <Composer onOpenProfile={onOpenProfile} />
      <Stories onOpenProfile={onOpenProfile} />
      {posts.map((post) => (
        <PostCard key={post.user} post={post} />
      ))}
    </>
  );
}

function Watch() {
  return (
    <div className="min-h-full bg-white p-3 text-[#080809]">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-['Optimistic_Display',sans-serif]">Video</h2>
        <MetaSearchIcon size={20} className="text-[#080809]" />
      </div>
      <div className="mt-4 overflow-hidden rounded-xl border border-[#D0D3D7]">
        <img src="/facebook/post/3.webp" alt="" className="aspect-video w-full object-cover" />
        <div className="p-3">
          <div className="font-bold text-[15px]">GOAL Vietnam</div>
          <p className="mt-1 text-sm text-[#65686C]">New videos for you · Trending</p>
        </div>
      </div>
    </div>
  );
}

function Market() {
  const products = [
    '/facebook/post/1.webp',
    '/facebook/post/2.webp',
    '/facebook/post/3.webp',
    '/facebook/story/4.webp',
  ];
  return (
    <div className="min-h-full bg-white p-3 text-[#080809]">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-['Optimistic_Display',sans-serif]">Marketplace</h2>
        <MetaSearchIcon size={20} className="text-[#080809]" />
      </div>
      <div className="my-3 grid grid-cols-2 gap-2">
        <button className="rounded-full bg-[#E4E6EB] py-2 text-sm font-semibold text-[#080809]">
          Sell
        </button>
        <button className="rounded-full bg-[#E4E6EB] py-2 text-sm font-semibold text-[#080809]">
          Categories
        </button>
      </div>
      <h3 className="mb-3 font-bold text-[16px]">Today&apos;s picks</h3>
      <div className="grid grid-cols-2 gap-2">
        {products.map((src, i) => (
          <div key={src} className="space-y-1">
            <img src={src} alt="" className="aspect-square w-full rounded-lg object-cover" />
            <div className="text-sm font-bold">{[250, 480, 150, 320][i]} $</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Dating() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center bg-white p-8 text-center text-black">
      <div className="mb-4 text-6xl">❤</div>
      <h2 className="text-2xl font-bold font-['Optimistic_Display',sans-serif] text-[#0866FF]">
        Facebook Dating
      </h2>
      <p className="mt-2 text-sm text-[#65686C]">Connect with people who share your interests.</p>
      <button className="mt-5 rounded-lg bg-[#0866FF] px-6 py-2.5 font-semibold text-white">
        Get Started
      </button>
    </div>
  );
}

function Notifications() {
  const notes = [
    { n: 'Doraemon', t: 'added a new story.', a: 'doraemon.webp' },
    { n: 'GOAL Vietnam', t: 'posted a new photo.', a: 'goal.webp' },
    { n: 'Khánh Vy', t: 'mentioned you in a comment.', a: 'khanhvy.webp' },
  ];
  return (
    <div className="min-h-full bg-white text-[#080809]">
      <h2 className="px-4 py-3 text-2xl font-bold font-['Optimistic_Display',sans-serif]">
        Notifications
      </h2>
      {notes.map((n, i) => (
        <div
          key={n.n}
          className={`flex gap-3 px-4 py-3 border-b border-[#D0D3D7]/40 ${
            i !== 1 ? 'bg-[#E7F3FF]/40' : ''
          }`}
        >
          <img src={`/facebook/user/${n.a}`} alt="" className="h-12 w-12 rounded-full object-cover" />
          <div className="flex-1 text-[14px]">
            <b>{n.n}</b> {n.t}
            <div className="mt-1 text-xs text-[#0866FF] font-medium">{i + 1} h ago</div>
          </div>
          <MetaMoreDotsIcon size={18} className="text-[#65686C]" />
        </div>
      ))}
    </div>
  );
}

function MenuScreen({ onOpenProfile }: { onOpenProfile: () => void }) {
  const items = [
    { n: 'Friends', i: 'friends.png' },
    { n: 'Memories', i: 'memory.png' },
    { n: 'Saved', i: 'saved.png' },
    { n: 'Marketplace', i: 'market.png' },
    { n: 'Video', i: 'video.png' },
    { n: 'Events', i: 'event.png' },
    { n: 'Gaming', i: 'game.png' },
    { n: 'Groups', i: 'group.png' },
  ];
  return (
    <div className="min-h-full bg-[#F0F2F5] p-3 text-[#080809]">
      <h2 className="text-2xl font-bold font-['Optimistic_Display',sans-serif]">Menu</h2>
      <button
        onClick={onOpenProfile}
        className="my-3 flex w-full items-center gap-3 rounded-xl bg-white p-3 text-left shadow-xs active:bg-[#E4E6EB] transition-colors border border-[#D0D3D7]/60"
      >
        <img
          src="/facebook/user/lcd.webp"
          alt="Profile"
          className="h-12 w-12 rounded-full object-cover"
          decoding="async"
        />
        <div>
          <div className="font-bold text-[16px] text-[#080809]">Lê Công Đắt</div>
          <div className="text-xs text-[#65686C]">See your profile</div>
        </div>
      </button>
      <h3 className="mb-2 font-bold text-[15px]">All shortcuts</h3>
      <div className="grid grid-cols-2 gap-2">
        {items.map((item) => (
          <button
            key={item.n}
            className="flex items-center gap-3 rounded-xl bg-white p-3 text-left text-[14px] font-semibold shadow-xs active:bg-[#E4E6EB] transition-colors border border-[#D0D3D7]/60"
          >
            <img
              src={`/facebook/menu/${item.i}`}
              alt=""
              className="h-7 w-7 object-contain"
              loading="lazy"
              decoding="async"
            />
            {item.n}
          </button>
        ))}
      </div>
    </div>
  );
}

export const FacebookApp: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('feed');
  const tab = screen === 'profile' ? 'menu' : screen;

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[#F0F2F5] font-['Optimistic_Text',-apple-system,sans-serif]">
      {screen !== 'profile' && tab === 'feed' && <TopBar onOpenProfile={() => setScreen('profile')} />}
      {screen !== 'profile' && (
        <nav className="grid h-[48px] shrink-0 grid-cols-6 border-b border-[#D0D3D7] bg-white">
          {nav.map((item) => (
            <button
              key={item.id}
              aria-label={item.label}
              onClick={() => setScreen(item.id)}
              className={`relative grid place-items-center ${
                tab === item.id
                  ? 'after:absolute after:bottom-0 after:h-[3px] after:w-[80%] after:rounded-full after:bg-[#0866FF]'
                  : ''
              }`}
            >
              <img
                src={navAsset(tab === item.id ? item.active : item.normal)}
                alt=""
                className="h-[26px] w-[26px] object-contain"
              />
            </button>
          ))}
        </nav>
      )}
      <div className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:none]">
        {screen === 'profile' ? (
          <FacebookProfile onBack={() => setScreen('menu')} />
        ) : (
          <>
            {tab === 'feed' && <Feed onOpenProfile={() => setScreen('profile')} />}
            {tab === 'watch' && <Watch />}
            {tab === 'market' && <Market />}
            {tab === 'dating' && <Dating />}
            {tab === 'notifications' && <Notifications />}
            {tab === 'menu' && <MenuScreen onOpenProfile={() => setScreen('profile')} />}
          </>
        )}
      </div>
    </div>
  );
};
