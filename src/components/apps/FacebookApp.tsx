'use client';

import React, { useState } from 'react';
import {
  MetaSearchIcon,
  MetaMessengerIcon,
  MetaLikeThumbIcon,
  MetaCommentIcon,
  MetaShareIcon,
  MetaMoreDotsIcon,
  MetaNavHomeIcon,
  MetaNavWatchIcon,
  MetaNavGroupsIcon,
  MetaNavBellIcon,
  MetaNavMenuIcon,
  MetaComposerPhotoIcon,
  MetaPlusIcon,
} from './MetaFacebookSvg';
import { FacebookProfile } from './FacebookProfile';
import { Globe2, X } from 'lucide-react';

type Tab = 'feed' | 'watch' | 'groups' | 'notifications' | 'menu';
type Screen = Tab | 'profile';

const stories = [
  { name: 'Create story', cover: '/facebook/user/lcd.webp', avatar: '/facebook/user/lcd.webp', own: true },
  { name: 'Bente Othman', cover: '/facebook/story/1.webp', avatar: '/facebook/user/khanhvy.webp' },
  { name: 'Jordan Jones', cover: '/facebook/story/2.webp', avatar: '/facebook/user/messi.webp' },
  { name: 'Sarah Jenkins', cover: '/facebook/story/3.webp', avatar: '/facebook/user/minhhuong.webp' },
  { name: 'Alex Rivera', cover: '/facebook/story/4.webp', avatar: '/facebook/user/baongan.webp' },
];

const posts = [
  {
    user: 'Becker Threads',
    avatar: '/facebook/user/daiphatthanh.webp',
    time: '2h',
    verified: true,
    text: 'Spring brights, all sustainable! 🌿 Everything shown was made before 1982, except the 🌼 #vintage #fashion',
    image: '/facebook/post/1.webp',
    reactions: '1.4K',
    comments: '128 comments',
    shares: '42 shares',
  },
  {
    user: 'GOAL Football',
    avatar: '/facebook/user/goal.webp',
    time: '4h',
    verified: true,
    text: '🏆 10 years of dedication to youth football\n⚽ The journey to the World Cup begins now 🌏\n🔥 What a historic moment for the team!',
    image: '/facebook/post/2.webp',
    reactions: '3.8K',
    comments: '542 comments',
    shares: '189 shares',
  },
];

function TopBar({ onOpenProfile }: { onOpenProfile?: () => void }) {
  return (
    <div className="flex h-[52px] shrink-0 items-center justify-between bg-white px-3 text-[#080809]">
      <div className="flex items-center">
        <span className="text-[28px] font-extrabold font-['Optimistic_Display',sans-serif] tracking-[-1.5px] text-[#0866FF]">
          facebook
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Create"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E4E6EB] text-[#080809] active:bg-[#d8dadf]"
        >
          <MetaPlusIcon size={18} fill="#050505" />
        </button>
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
    <div className="bg-white px-3 py-2.5 text-[#080809]">
      <div className="flex items-center gap-2.5">
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
          className="flex-1 cursor-pointer rounded-full border border-[#ced0d4] bg-white px-4 py-2 text-[15px] text-[#65676b]"
        >
          What&apos;s on your mind?
        </div>
        <button type="button" aria-label="Photo" className="p-1 shrink-0 active:scale-95 transition-transform">
          <MetaComposerPhotoIcon size={24} />
        </button>
      </div>
    </div>
  );
}

function Stories({ onOpenProfile }: { onOpenProfile: () => void }) {
  return (
    <div className="bg-white py-3 border-y border-[#ced0d4]/60">
      <div className="flex gap-2 overflow-x-auto px-3 [scrollbar-width:none]">
        {stories.map((story) => {
          if (story.own) {
            return (
              <button
                key={story.name}
                onClick={onOpenProfile}
                className="relative h-[190px] w-[110px] shrink-0 overflow-hidden rounded-2xl border border-[#ced0d4] bg-white text-left shadow-xs active:scale-95 transition-transform"
              >
                <div className="h-[125px] w-full overflow-hidden bg-[#e4e6eb]">
                  <img
                    src={story.cover}
                    alt=""
                    className="h-full w-full object-cover"
                    decoding="async"
                  />
                </div>
                <div className="absolute left-1/2 top-[107px] grid h-9 w-9 -translate-x-1/2 place-items-center rounded-full border-[3px] border-white bg-[#0866FF] text-white shadow-xs">
                  <MetaPlusIcon size={18} fill="#ffffff" />
                </div>
                <div className="absolute bottom-2.5 w-full px-1 text-center text-[12px] font-bold text-[#050505] leading-tight">
                  Create story
                </div>
              </button>
            );
          }

          return (
            <button
              key={story.name}
              className="relative h-[190px] w-[110px] shrink-0 overflow-hidden rounded-2xl border border-black/10 bg-[#e4e6eb] text-left shadow-xs active:scale-95 transition-transform"
            >
              <img
                src={story.cover}
                alt=""
                className="h-full w-full object-cover"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              <div className="absolute left-2.5 top-2.5 h-10 w-10 rounded-full border-[3px] border-[#0866FF] overflow-hidden bg-white shadow-xs">
                <img
                  src={story.avatar}
                  alt=""
                  className="h-full w-full object-cover"
                  decoding="async"
                />
              </div>
              <div className="absolute bottom-2.5 left-2.5 right-1.5 text-[13px] font-bold leading-tight text-white drop-shadow-sm">
                {story.name}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PostCard({ post }: { post: (typeof posts)[number] }) {
  const [liked, setLiked] = useState(false);
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <article className="mt-2 bg-white text-[#050505] shadow-xs">
      <div className="flex items-center gap-2.5 px-3.5 pt-3 pb-2">
        <img
          src={post.avatar}
          alt=""
          className="h-10 w-10 rounded-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 text-[15px] font-bold text-[#050505] leading-tight">
            <span>{post.user}</span>
            {post.verified && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#0866FF] text-white text-[9px] font-bold">
                ✓
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-[12px] text-[#65676b] pt-0.5">
            <span>{post.time}</span>
            <span>·</span>
            <Globe2 size={12} />
          </div>
        </div>
        <button type="button" aria-label="More" className="text-[#65676b] p-1">
          <MetaMoreDotsIcon size={18} />
        </button>
        <button type="button" aria-label="Close" onClick={() => setVisible(false)} className="text-[#65676b] p-1">
          <X size={18} />
        </button>
      </div>

      <p className="whitespace-pre-line px-3.5 pt-1 pb-2.5 text-[14px] leading-snug text-[#050505]">
        {post.text}
      </p>

      <img
        src={post.image}
        alt=""
        className="max-h-[380px] w-full object-cover"
        loading="lazy"
        decoding="async"
      />

      <div className="flex items-center justify-between px-3.5 py-2.5 text-[13px] text-[#65676b]">
        <div className="flex items-center gap-1">
          <div className="flex items-center -space-x-1">
            <img src="/facebook/reactions/like.webp" alt="Like" className="h-[18px] w-[18px]" />
            <img src="/facebook/reactions/love.webp" alt="Love" className="h-[18px] w-[18px]" />
          </div>
          <span className="ml-1 font-medium">{post.reactions}</span>
        </div>
        <div>{post.comments} · {post.shares}</div>
      </div>

      <div className="mx-3.5 grid grid-cols-3 border-t border-[#ced0d4] py-1 text-center text-[13px] font-semibold text-[#65686b]">
        <button
          type="button"
          onClick={() => setLiked(!liked)}
          className={`flex items-center justify-center gap-1.5 py-2 transition-colors ${
            liked ? 'text-[#0866FF]' : 'text-[#65686C]'
          }`}
        >
          <MetaLikeThumbIcon size={18} />
          <span>Like</span>
        </button>
        <button type="button" className="flex items-center justify-center gap-1.5 py-2 active:bg-[#f0f2f5]">
          <MetaCommentIcon size={18} />
          <span>Comment</span>
        </button>
        <button type="button" className="flex items-center justify-center gap-1.5 py-2 active:bg-[#f0f2f5]">
          <MetaShareIcon size={18} />
          <span>Share</span>
        </button>
      </div>
    </article>
  );
}

function Feed({ onOpenProfile }: { onOpenProfile: () => void }) {
  return (
    <div className="bg-[#f0f2f5] pb-4">
      <Composer onOpenProfile={onOpenProfile} />
      <Stories onOpenProfile={onOpenProfile} />
      {posts.map((post) => (
        <PostCard key={post.user} post={post} />
      ))}
    </div>
  );
}

function Watch() {
  return (
    <div className="min-h-full bg-white p-3 text-[#050505]">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-['Optimistic_Display',sans-serif]">Video</h2>
        <MetaSearchIcon size={20} />
      </div>
      <div className="mt-4 overflow-hidden rounded-xl border border-[#ced0d4]">
        <img src="/facebook/post/3.webp" alt="" className="aspect-video w-full object-cover" />
        <div className="p-3">
          <div className="font-bold text-[15px]">GOAL Football</div>
          <p className="mt-1 text-sm text-[#65676b]">New videos for you · Trending</p>
        </div>
      </div>
    </div>
  );
}

function GroupsScreen() {
  const groups = [
    { name: 'React & Next.js Developers', members: '142K members · 10+ posts a day', image: '/facebook/story/1.webp' },
    { name: 'Design & UI/UX Creators', members: '89K members · 5 posts a day', image: '/facebook/story/2.webp' },
  ];
  return (
    <div className="min-h-full bg-white p-4 text-[#050505]">
      <div className="flex items-center justify-between pb-3">
        <h2 className="text-2xl font-bold font-['Optimistic_Display',sans-serif]">Groups</h2>
        <MetaSearchIcon size={20} />
      </div>
      <div className="flex gap-2 pb-3 border-b border-[#ced0d4]">
        <button className="rounded-full bg-[#e4e6eb] px-4 py-2 text-sm font-semibold text-[#050505]">Your groups</button>
        <button className="rounded-full bg-[#e4e6eb] px-4 py-2 text-sm font-semibold text-[#050505]">Discover</button>
      </div>
      <div className="pt-3 space-y-4">
        {groups.map(g => (
          <div key={g.name} className="flex gap-3 items-center">
            <img src={g.image} alt="" className="h-14 w-14 rounded-xl object-cover" />
            <div className="flex-1">
              <p className="font-bold text-[15px]">{g.name}</p>
              <p className="text-xs text-[#65676b]">{g.members}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Notifications() {
  const notes = [
    { n: 'Sarah Jenkins', t: 'added a new story.', a: 'minhhuong.webp' },
    { n: 'GOAL Football', t: 'posted a new video.', a: 'goal.webp' },
    { n: 'Bente Othman', t: 'mentioned you in a comment.', a: 'khanhvy.webp' },
  ];
  return (
    <div className="min-h-full bg-white text-[#050505]">
      <h2 className="px-4 py-3 text-2xl font-bold font-['Optimistic_Display',sans-serif]">
        Notifications
      </h2>
      {notes.map((n, i) => (
        <div
          key={n.n}
          className={`flex gap-3 px-4 py-3 border-b border-[#ced0d4]/40 ${
            i !== 1 ? 'bg-[#e7f3ff]/50' : ''
          }`}
        >
          <img src={`/facebook/user/${n.a}`} alt="" className="h-12 w-12 rounded-full object-cover" />
          <div className="flex-1 text-[14px]">
            <b>{n.n}</b> {n.t}
            <div className="mt-1 text-xs text-[#0866FF] font-medium">{i + 1} h ago</div>
          </div>
          <MetaMoreDotsIcon size={18} />
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
    <div className="min-h-full bg-[#f0f2f5] p-3 text-[#050505]">
      <h2 className="text-2xl font-bold font-['Optimistic_Display',sans-serif]">Menu</h2>
      <button
        onClick={onOpenProfile}
        className="my-3 flex w-full items-center gap-3 rounded-xl bg-white p-3 text-left shadow-xs active:bg-[#e4e6eb] transition-colors border border-[#ced0d4]/60"
      >
        <img
          src="/facebook/user/lcd.webp"
          alt="Profile"
          className="h-12 w-12 rounded-full object-cover"
          decoding="async"
        />
        <div>
          <div className="font-bold text-[16px] text-[#050505]">Lê Công Đắt</div>
          <div className="text-xs text-[#65676b]">See your profile</div>
        </div>
      </button>
      <h3 className="mb-2 font-bold text-[15px]">All shortcuts</h3>
      <div className="grid grid-cols-2 gap-2">
        {items.map((item) => (
          <button
            key={item.n}
            className="flex items-center gap-3 rounded-xl bg-white p-3 text-left text-[14px] font-semibold shadow-xs active:bg-[#e4e6eb] transition-colors border border-[#ced0d4]/60"
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
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[#f0f2f5] font-['Optimistic_Text',-apple-system,sans-serif]">
      {screen !== 'profile' && tab === 'feed' && <TopBar onOpenProfile={() => setScreen('profile')} />}
      {screen !== 'profile' && (
        <nav className="grid h-[48px] shrink-0 grid-cols-5 border-b border-[#ced0d4] bg-white">
          <button
            aria-label="Home"
            onClick={() => setScreen('feed')}
            className={`relative grid place-items-center ${
              tab === 'feed'
                ? 'after:absolute after:bottom-0 after:h-[3.5px] after:w-full after:bg-[#0866FF]'
                : ''
            }`}
          >
            <MetaNavHomeIcon active={tab === 'feed'} size={25} />
          </button>
          <button
            aria-label="Video"
            onClick={() => setScreen('watch')}
            className={`relative grid place-items-center ${
              tab === 'watch'
                ? 'after:absolute after:bottom-0 after:h-[3.5px] after:w-full after:bg-[#0866FF]'
                : ''
            }`}
          >
            <MetaNavWatchIcon active={tab === 'watch'} size={24} />
          </button>
          <button
            aria-label="Groups"
            onClick={() => setScreen('groups')}
            className={`relative grid place-items-center ${
              tab === 'groups'
                ? 'after:absolute after:bottom-0 after:h-[3.5px] after:w-full after:bg-[#0866FF]'
                : ''
            }`}
          >
            <MetaNavGroupsIcon active={tab === 'groups'} size={24} />
          </button>
          <button
            aria-label="Notifications"
            onClick={() => setScreen('notifications')}
            className={`relative grid place-items-center ${
              tab === 'notifications'
                ? 'after:absolute after:bottom-0 after:h-[3.5px] after:w-full after:bg-[#0866FF]'
                : ''
            }`}
          >
            <MetaNavBellIcon active={tab === 'notifications'} size={24} />
          </button>
          <button
            aria-label="Menu"
            onClick={() => setScreen('menu')}
            className={`relative grid place-items-center ${
              tab === 'menu'
                ? 'after:absolute after:bottom-0 after:h-[3.5px] after:w-full after:bg-[#0866FF]'
                : ''
            }`}
          >
            <MetaNavMenuIcon active={tab === 'menu'} size={24} />
          </button>
        </nav>
      )}
      <div className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:none]">
        {screen === 'profile' ? (
          <FacebookProfile onBack={() => setScreen('menu')} />
        ) : (
          <>
            {tab === 'feed' && <Feed onOpenProfile={() => setScreen('profile')} />}
            {tab === 'watch' && <Watch />}
            {tab === 'groups' && <GroupsScreen />}
            {tab === 'notifications' && <Notifications />}
            {tab === 'menu' && <MenuScreen onOpenProfile={() => setScreen('profile')} />}
          </>
        )}
      </div>
    </div>
  );
};
