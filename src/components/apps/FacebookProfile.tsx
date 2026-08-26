'use client';

import React, {useState} from 'react';
import {
  ArrowLeft,
  Camera,
  Edit3,
  Github,
  GraduationCap,
  Image as ImageIcon,
  Linkedin,
  MapPin,
  MoreHorizontal,
  Plus,
  Radio,
  Search,
} from 'lucide-react';

const friends = [
  {name: 'Khánh Vy', avatar: '/facebook/user/khanhvy.webp'},
  {name: 'Leo Messi', avatar: '/facebook/user/messi.webp'},
  {name: 'Minh Hương', avatar: '/facebook/user/minhhuong.webp'},
  {name: 'Bảo Ngân', avatar: '/facebook/user/baongan.webp'},
  {name: 'Hà Linhh', avatar: '/facebook/user/halinh.webp'},
  {name: 'Minh Trí', avatar: '/facebook/user/minhtri.webp'},
];

const hobbies = ['💻 Viết mã', '📚 Học tập', '⚽ Bóng đá', '🎮 Trò chơi điện tử', '🎧 Nghe nhạc', '📖 Đọc sách'];

const featured = [
  {name: 'Mới', image: null},
  {name: 'Featured', image: '/facebook/story/3.webp'},
  {name: '18+', image: '/facebook/story/4.webp'},
  {name: '20+', image: '/facebook/story/1.webp'},
];

function OwnPost({second = false}: {second?: boolean}) {
  const [liked, setLiked] = useState(false);
  return (
    <article className="mt-2 bg-white text-black">
      <div className="flex items-center gap-2.5 px-3 py-3">
        <img src="/facebook/user/lcd.webp" alt="Lê Công Đắt" className="h-10 w-10 rounded-full object-cover" decoding="async" />
        <div className="min-w-0 flex-1">
          <div className="text-[14px] font-semibold">Lê Công Đắt</div>
          <div className="text-[11px] text-zinc-500">3 phút · 🌐</div>
        </div>
        <MoreHorizontal size={22} />
      </div>
      <p className="whitespace-pre-line px-3 pb-3 text-[13px] leading-snug">
        {second
          ? 'Do you like Phở?\nBecause I can be your Pho-ever ✨✨'
          : '✅ 10 năm cống hiến cho bóng đá trẻ Việt Nam\n✅ Người đầu tiên đưa Việt Nam tham dự World Cup ở cấp độ U20 🌏🇻🇳\n✅ Giành danh hiệu đầu tiên cùng U23 Việt Nam tại giải U23 Đông Nam Á 2023 🏆'}
      </p>
      <img src={second ? '/facebook/post/3.webp' : '/facebook/post/2.webp'} alt="" className="max-h-[360px] w-full object-cover" loading="lazy" decoding="async" />
      <div className="flex justify-between px-3 py-2 text-[11px] text-zinc-500"><span>👍 ❤️ {second ? '22.300' : '187'}</span><span>{second ? '258' : '5'} bình luận</span></div>
      <div className="mx-3 grid grid-cols-3 border-t py-2 text-center text-[12px] font-semibold text-zinc-600">
        <button onClick={() => setLiked(!liked)} className={liked ? 'text-[#1877f2]' : ''}>👍 Thích</button><button>◯ Bình luận</button><button>↗ Chia sẻ</button>
      </div>
    </article>
  );
}

export const FacebookProfile: React.FC<{onBack: () => void}> = ({onBack}) => (
  <div className="min-h-full bg-[#d8dadf] text-black">
    <div className="sticky top-0 z-20 flex h-[54px] items-center gap-2 border-b border-zinc-200 bg-white px-2">
      <button aria-label="Quay lại Menu" onClick={onBack} className="grid h-10 w-10 place-items-center"><ArrowLeft size={28}/></button>
      <div className="flex h-10 flex-1 items-center gap-2 rounded-full bg-zinc-100 px-3 text-zinc-500"><Search size={20}/><span className="text-[15px]">Tìm kiếm</span></div>
    </div>

    <section className="bg-white">
      <div className="relative h-[270px]">
        <img src="/facebook/user/lcd-cover.webp" alt="Ảnh bìa của Lê Công Đắt" className="h-[220px] w-full object-cover" decoding="async" />
        <button aria-label="Đổi ảnh bìa" className="absolute bottom-[58px] right-3 grid h-10 w-10 place-items-center rounded-full bg-zinc-200"><Camera size={21}/></button>
        <div className="absolute bottom-0 left-4 h-[154px] w-[154px] rounded-full border-[5px] border-white bg-white">
          <img src="/facebook/user/lcd.webp" alt="Lê Công Đắt" className="h-full w-full rounded-full object-cover" decoding="async" />
          <button aria-label="Đổi ảnh đại diện" className="absolute bottom-0 right-0 grid h-10 w-10 place-items-center rounded-full bg-zinc-200"><Camera size={20}/></button>
        </div>
        <button aria-label="Tạo avatar" className="absolute bottom-[60px] right-3 grid h-10 w-10 place-items-center rounded-full bg-[#1877f2] text-white">☺</button>
      </div>

      <div className="px-4 pb-4 pt-3">
        <h1 className="text-[23px] font-bold">Lê Công Đắt</h1>
        <div className="mt-1 text-[15px]"><b>1,1K</b> <span className="text-zinc-500">bạn bè</span></div>
        <p className="mt-1 text-[15px]">I am Dat</p>
        <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-md bg-[#1877f2] py-2.5 text-[14px] font-semibold text-white"><Plus size={17}/>Thêm vào tin</button>
        <div className="mt-2 flex gap-2">
          <button className="flex flex-1 items-center justify-center gap-2 rounded-md bg-zinc-200 py-2.5 text-[14px] font-semibold"><Edit3 size={16}/>Chỉnh sửa trang cá nhân</button>
          <button aria-label="Tùy chọn trang cá nhân" className="grid w-12 place-items-center rounded-md bg-zinc-200"><MoreHorizontal size={20}/></button>
        </div>
      </div>
    </section>

    <section className="mt-2 bg-white px-4 py-3">
      <div className="flex gap-2 border-b pb-3"><button className="rounded-full bg-[#e7f3ff] px-4 py-2 text-[14px] font-semibold text-[#1877f2]">Bài viết</button><button className="rounded-full px-4 py-2 text-[14px] font-semibold text-zinc-500">Reels</button></div>
      <h2 className="mt-4 text-[19px] font-bold">Chi tiết</h2>
      <div className="mt-3 space-y-3 text-[14px]">
        <div className="flex gap-3"><GraduationCap className="shrink-0 text-zinc-500" size={23}/><span>Học <b>Software Engineering</b> tại <b>Trường Đại học Khoa học Tự nhiên, Đại học Quốc gia TP.HCM</b></span></div>
        <div className="flex gap-3"><MapPin className="shrink-0 text-zinc-500" size={23}/><span>Đến từ <b>Cai Lậy (huyện)</b></span></div>
        <div className="flex gap-3"><Radio className="shrink-0 text-zinc-500" size={23}/><span>Có <b>4.820 người theo dõi</b></span></div>
        <div className="flex gap-3"><Github className="shrink-0 text-zinc-500" size={23}/><span>Dat-TG</span></div>
        <div className="flex gap-3"><Linkedin className="shrink-0 text-zinc-500" size={23}/><span>ddawst</span></div>
        <div className="flex gap-3"><MoreHorizontal className="shrink-0 text-zinc-500" size={23}/><span>Xem thông tin giới thiệu của bạn</span></div>
      </div>
      <h3 className="mt-5 text-[17px] font-bold">Sở thích</h3>
      <div className="mt-2 flex flex-wrap gap-2">{hobbies.map(hobby => <span key={hobby} className="rounded-full bg-zinc-200 px-3 py-2 text-[13px]">{hobby}</span>)}</div>

      <h3 className="mt-5 text-[17px] font-bold">Tin nổi bật</h3>
      <div className="mt-2 flex gap-3 overflow-x-auto [scrollbar-width:none]">{featured.map(item => <div key={item.name} className="w-[78px] shrink-0 text-center"><div className="grid h-[136px] place-items-center overflow-hidden rounded-xl bg-zinc-200">{item.image ? <img src={item.image} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async"/> : <Plus className="text-zinc-500"/>}</div><div className="mt-1 text-[13px]">{item.name}</div></div>)}</div>
      <button className="mt-4 w-full rounded-md bg-[#e7f3ff] py-2.5 text-[14px] font-semibold text-[#1877f2]">Chỉnh sửa chi tiết công khai</button>
    </section>

    <section className="mt-2 bg-white px-4 py-4">
      <div className="flex items-center justify-between"><h2 className="text-[19px] font-bold">Bạn bè</h2><button className="text-[14px] text-[#1877f2]">Tìm bạn bè</button></div>
      <p className="text-[14px] text-zinc-500">1.150 người bạn</p>
      <div className="mt-3 grid grid-cols-3 gap-x-2 gap-y-4">{friends.map(friend => <div key={friend.name}><img src={friend.avatar} alt={friend.name} className="aspect-square w-full rounded-lg object-cover" loading="lazy" decoding="async"/><div className="mt-1 truncate text-[12px] font-semibold">{friend.name}</div></div>)}</div>
      <button className="mt-4 w-full rounded-md bg-zinc-200 py-2.5 text-[14px] font-semibold">Xem tất cả bạn bè</button>
    </section>

    <section className="mt-2 bg-white py-3">
      <div className="flex items-center justify-between px-4"><h2 className="text-[18px] font-bold">Bài viết</h2><button className="text-[14px] text-[#1877f2]">Bộ lọc</button></div>
      <div className="mt-3 flex items-center gap-3 px-4"><img src="/facebook/user/lcd.webp" alt="" className="h-10 w-10 rounded-full object-cover"/><div className="flex-1 text-[14px]">Bạn đang nghĩ gì?</div><ImageIcon className="text-green-600" size={21}/></div>
      <div className="mt-3 flex gap-2 border-y bg-zinc-50 px-4 py-3"><button className="rounded-full border bg-white px-3 py-2 text-[12px] font-semibold">🎞️ Thước phim</button><button className="rounded-full border bg-white px-3 py-2 text-[12px] font-semibold">🔴 Phát trực tiếp</button></div>
      <button className="mx-4 mt-3 flex w-[calc(100%-2rem)] items-center justify-center gap-2 rounded-md bg-zinc-200 py-2.5 text-[14px] font-semibold">💬 Quản lý bài viết</button>
    </section>
    <OwnPost/><OwnPost second/>
  </div>
);
