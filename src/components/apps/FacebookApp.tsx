'use client';

import React, { useState } from 'react';
import { Globe2, MoreHorizontal, Plus, Search, X } from 'lucide-react';
import { FacebookProfile } from './FacebookProfile';

type Tab = 'feed' | 'watch' | 'market' | 'dating' | 'notifications' | 'menu';
type Screen = Tab | 'profile';

const stories = [
  { name: 'Tạo tin', cover: '/facebook/user/lcd.webp', avatar: '/facebook/user/lcd.webp', own: true },
  { name: 'Doraemon', cover: '/facebook/story/1.webp', avatar: '/facebook/user/doraemon.webp' },
  { name: 'Sách Cũ Ngọc', cover: '/facebook/story/2.webp', avatar: '/facebook/user/sachcungoc.webp' },
  { name: 'VAFFC', cover: '/facebook/story/3.webp', avatar: '/facebook/user/vaffc.webp' },
];

const posts = [
  {
    user: 'Đài Phát Thanh.',
    avatar: '/facebook/user/daiphatthanh.webp',
    time: '16 giờ',
    text: 'Rap Việt Mùa 3 (2023) đã tìm ra Top 9 bước vào Chung Kết, hứa hẹn một trận đại chiến cực căng.',
    image: '/facebook/post/1.webp',
    reactions: '10.845',
    comments: '902 bình luận',
    shares: '98 lượt chia sẻ',
  },
  {
    user: 'GOAL Vietnam',
    avatar: '/facebook/user/goal.webp',
    time: '3 phút',
    verified: true,
    text: '✅ 10 năm cống hiến cho bóng đá trẻ Việt Nam\n✅ Người đầu tiên đưa Việt Nam tham dự World Cup ở cấp độ U20 🌏🇻🇳\n✅ Giành danh hiệu đầu tiên cùng U23 Việt Nam tại giải U23 Đông Nam Á 2023 🏆',
    image: '/facebook/post/2.webp',
    reactions: '187',
    comments: '5 bình luận',
    shares: '4 lượt chia sẻ',
  },
];

const nav = [
  { id: 'feed' as const, normal: 'home.png', active: 'home-active.png', label: 'Trang chủ' },
  { id: 'watch' as const, normal: 'watch.png', active: 'watch-active.png', label: 'Video' },
  { id: 'market' as const, normal: 'marketplace.png', active: 'marketplace-active.png', label: 'Marketplace' },
  { id: 'dating' as const, normal: 'dating.webp', active: 'dating-active.webp', label: 'Hẹn hò' },
  { id: 'notifications' as const, normal: 'noti.webp', active: 'noti-active.webp', label: 'Thông báo' },
  { id: 'menu' as const, normal: 'menu.png', active: 'menu-active.png', label: 'Menu' },
];

const navAsset = (file: string) => `/facebook/nav/${file}`;

function TopBar() {
  return (
    <div className="flex h-[58px] shrink-0 items-center justify-between bg-white px-3 text-black">
      <div className="flex items-center gap-1">
        <img src="/facebook/menu.png" alt="" className="h-8 w-8 object-contain" />
        <div className="text-[27px] font-bold tracking-[-1.2px] text-[#1877f2]">facebook</div>
      </div>
      <div className="flex gap-2">
        <button className="grid h-9 w-9 place-items-center rounded-full bg-black/10"><img src="/facebook/search.png" alt="Search" className="h-[21px] w-[21px]" /></button>
        <button className="grid h-9 w-9 place-items-center rounded-full bg-black/10"><img src="/facebook/message.png" alt="Messenger" className="h-[22px] w-[22px]" /></button>
      </div>
    </div>
  );
}

function Composer() {
  return (
    <div className="bg-white text-black">
      <div className="flex items-center gap-3 px-3 py-3">
        <img src="/facebook/user/lcd.webp" alt="Lê Công Đắt" className="h-11 w-11 rounded-full object-cover" decoding="async" />
        <div className="flex-1 rounded-full border border-zinc-300 px-4 py-2.5 text-[14px]">Bạn đang nghĩ gì?</div>
        <img src="/facebook/friend.png" alt="" className="h-6 w-6 object-contain" />
      </div>
      <div className="grid grid-cols-3 border-t border-zinc-200 text-[13px] font-medium">
        <button className="flex items-center justify-center gap-2 py-2.5"><span className="text-lg text-red-500">▣</span>Phát trực tiếp</button>
        <button className="flex items-center justify-center gap-2 border-x border-zinc-200 py-2.5"><span className="text-lg text-green-500">▧</span>Ảnh</button>
        <button className="flex items-center justify-center gap-2 py-2.5"><span className="text-lg text-purple-500">☺</span>Cảm xúc</button>
      </div>
    </div>
  );
}

function Stories() {
  return (
    <div className="mt-2 flex gap-2 overflow-x-auto bg-white px-3 py-3 [scrollbar-width:none]">
      {stories.map((story) => (
        <button key={story.name} className="relative h-[180px] w-[104px] shrink-0 overflow-hidden rounded-xl border border-black/10 bg-white text-left shadow-sm">
          <img src={story.cover} alt="" className={`w-full object-cover ${story.own ? 'h-[125px]' : 'h-full'}`} decoding="async" />
          {!story.own && <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />}
          {story.own ? (
            <><div className="absolute left-1/2 top-[106px] grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full border-[3px] border-white bg-[#1877f2] text-white"><Plus size={23} /></div><div className="absolute bottom-2 w-full text-center text-[12px] font-semibold text-black">Tạo tin</div></>
          ) : (
            <><img src={story.avatar} alt="" className="absolute left-2 top-2 h-10 w-10 rounded-full border-[3px] border-[#1877f2] object-cover" decoding="async" /><div className="absolute bottom-2 left-2 right-1 text-[12px] font-semibold leading-tight text-white">{story.name}</div></>
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
    <article className="mt-2 bg-white pb-1 text-black">
      <div className="flex items-center gap-2.5 px-3 py-3">
        <img src={post.avatar} alt="" className="h-10 w-10 rounded-full border border-black/10 object-cover" loading="lazy" decoding="async" />
        <div className="min-w-0 flex-1"><div className="flex items-center gap-1 text-[15px] font-semibold">{post.user}{post.verified && <span className="text-[#1877f2]">●</span>}</div><div className="flex items-center gap-1 text-[12px] text-zinc-500">{post.time} · <Globe2 size={13} /></div></div>
        <button><MoreHorizontal size={23} /></button><button onClick={() => setVisible(false)}><X size={21} /></button>
      </div>
      <p className="whitespace-pre-line px-3 pb-3 text-[14px] leading-[1.35]">{post.text}</p>
      <img src={post.image} alt="" className="max-h-[360px] w-full object-cover" loading="lazy" decoding="async" />
      <div className="flex items-center justify-between px-3 py-2 text-[12px] text-zinc-500">
        <div className="flex items-center"><img src="/facebook/reactions/like.webp" alt="" className="h-5 w-5"/><img src="/facebook/reactions/love.webp" alt="" className="-ml-1 h-5 w-5"/><span className="ml-1">{post.reactions}</span></div>
        <div>{post.comments} · {post.shares}</div>
      </div>
      <div className="mx-3 grid grid-cols-3 border-t border-zinc-200 text-[13px] font-semibold text-zinc-600">
        <button onClick={() => setLiked(!liked)} className={`flex items-center justify-center gap-2 py-2.5 ${liked ? 'text-[#1877f2]' : ''}`}><img src="/facebook/like.png" alt="" className="h-5 w-5"/>Thích</button>
        <button className="flex items-center justify-center gap-2 py-2.5"><img src="/facebook/comment.png" alt="" className="h-5 w-5"/>Bình luận</button>
        <button className="flex items-center justify-center gap-2 py-2.5"><img src="/facebook/share.png" alt="" className="h-5 w-5"/>Chia sẻ</button>
      </div>
    </article>
  );
}

function Feed() { return <><Composer /><Stories />{posts.map((post) => <PostCard key={post.user} post={post} />)}</>; }

function Watch() {
  return <div className="min-h-full bg-white p-3 text-black"><div className="flex items-center justify-between"><h2 className="text-2xl font-bold">Video</h2><Search size={22}/></div><div className="mt-4 overflow-hidden rounded-xl border"><img src="/facebook/post/3.webp" alt="" className="aspect-video w-full object-cover" loading="lazy" decoding="async"/><div className="p-3"><div className="font-semibold">GOAL Vietnam</div><p className="mt-1 text-sm">Video mới dành cho bạn · Đang thịnh hành</p></div></div></div>;
}

function Market() {
  const products = ['/facebook/post/1.webp','/facebook/post/2.webp','/facebook/post/3.webp','/facebook/story/4.webp'];
  return <div className="min-h-full bg-white p-3 text-black"><div className="flex items-center justify-between"><h2 className="text-2xl font-bold">Marketplace</h2><Search size={22}/></div><div className="my-3 grid grid-cols-2 gap-2"><button className="rounded-full bg-zinc-200 py-2 text-sm font-semibold">Bán</button><button className="rounded-full bg-zinc-200 py-2 text-sm font-semibold">Danh mục</button></div><h3 className="mb-3 font-semibold">Gợi ý hôm nay</h3><div className="grid grid-cols-2 gap-2">{products.map((src,i)=><div key={src}><img src={src} alt="" className="aspect-square w-full rounded-lg object-cover" loading="lazy" decoding="async"/><div className="mt-1 text-sm font-semibold">{[250000,480000,150000,320000][i].toLocaleString('vi-VN')} ₫</div></div>)}</div></div>;
}

function Dating() { return <div className="flex min-h-full flex-col items-center justify-center bg-white p-8 text-center text-black"><div className="mb-4 text-6xl">❤</div><h2 className="text-2xl font-bold text-[#1877f2]">Facebook Dating</h2><p className="mt-2 text-sm text-zinc-600">Kết nối với những người có cùng sở thích với bạn.</p><button className="mt-5 rounded-lg bg-[#1877f2] px-6 py-2.5 font-semibold text-white">Bắt đầu</button></div>; }

function Notifications() {
  const notes = [{n:'Doraemon',t:'đã thêm một tin mới.',a:'doraemon.webp'},{n:'GOAL Vietnam',t:'đã đăng một ảnh mới.',a:'goal.webp'},{n:'Khánh Vy',t:'đã nhắc đến bạn trong một bình luận.',a:'khanhvy.webp'}];
  return <div className="min-h-full bg-white text-black"><h2 className="px-4 py-3 text-2xl font-bold">Thông báo</h2>{notes.map((n,i)=><div key={n.n} className={`flex gap-3 px-4 py-3 ${i !== 1 ? 'bg-[#e7f3ff]' : ''}`}><img src={`/facebook/user/${n.a}`} alt="" className="h-14 w-14 rounded-full object-cover" loading="lazy" decoding="async"/><div className="flex-1 text-sm"><b>{n.n}</b> {n.t}<div className="mt-1 text-xs text-[#1877f2]">{i+1} giờ</div></div><MoreHorizontal size={20}/></div>)}</div>;
}

function MenuScreen({ onOpenProfile }: { onOpenProfile: () => void }) {
  const items = [{n:'Bạn bè',i:'friends.png'},{n:'Kỷ niệm',i:'memory.png'},{n:'Đã lưu',i:'saved.png'},{n:'Marketplace',i:'market.png'},{n:'Video',i:'video.png'},{n:'Sự kiện',i:'event.png'},{n:'Chơi game',i:'game.png'},{n:'Nhóm',i:'group.png'}];
  return <div className="min-h-full bg-[#f0f2f5] p-3 text-black"><h2 className="text-2xl font-bold">Menu</h2><button onClick={onOpenProfile} className="my-3 flex w-full items-center gap-3 rounded-xl bg-white p-3 text-left shadow-sm"><img src="/facebook/user/lcd.webp" alt="Lê Công Đắt" className="h-12 w-12 rounded-full object-cover" decoding="async"/><div><div className="font-semibold">Lê Công Đắt</div><div className="text-xs text-zinc-500">Xem trang cá nhân của bạn</div></div></button><h3 className="mb-2 font-semibold">Tất cả lối tắt</h3><div className="grid grid-cols-2 gap-2">{items.map(item=><button key={item.n} className="flex items-center gap-3 rounded-xl bg-white p-3 text-left text-[13px] font-semibold shadow-sm"><img src={`/facebook/menu/${item.i}`} alt="" className="h-7 w-7 object-contain" loading="lazy" decoding="async"/>{item.n}</button>)}</div></div>;
}

export const FacebookApp: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('feed');
  const tab = screen === 'profile' ? 'menu' : screen;
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[#d8dadf] font-sans">
      {screen !== 'profile' && tab === 'feed' && <TopBar />}
      {screen !== 'profile' && <nav className="grid h-[47px] shrink-0 grid-cols-6 border-b border-zinc-200 bg-white">
        {nav.map((item) => <button key={item.id} aria-label={item.label} onClick={() => setScreen(item.id)} className={`relative grid place-items-center ${tab === item.id ? 'after:absolute after:bottom-0 after:h-[3px] after:w-[80%] after:rounded-full after:bg-[#1877f2]' : ''}`}><img src={navAsset(tab === item.id ? item.active : item.normal)} alt="" className="h-[27px] w-[27px] object-contain"/></button>)}
      </nav>}
      <div className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:none]">
        {screen === 'profile' ? <FacebookProfile onBack={() => setScreen('menu')} /> : <>{tab === 'feed' && <Feed />}{tab === 'watch' && <Watch />}{tab === 'market' && <Market />}{tab === 'dating' && <Dating />}{tab === 'notifications' && <Notifications />}{tab === 'menu' && <MenuScreen onOpenProfile={() => setScreen('profile')} />}</>}
      </div>
    </div>
  );
};
