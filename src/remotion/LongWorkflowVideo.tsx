'use client';

import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {LawnchairProvider} from '@/context/LawnchairContext';
import {DeviceFrame} from '@/components/phone/DeviceFrame';
import {StatusBar} from '@/components/phone/StatusBar';
import {NavigationBar} from '@/components/phone/NavigationBar';
import {AtAGlance} from '@/components/home/AtAGlance';
import {Dock} from '@/components/home/Dock';
import {AppSvgIcon} from '@/components/common/AppSvgIcon';
import {INITIAL_APPS} from '@/lib/apps-data';
import {WALLPAPERS} from '@/lib/wallpapers-data';
import {
  ArrowLeft,
  Battery,
  Camera,
  ChevronRight,
  Clock3,
  FileText,
  Image as ImageIcon,
  MoreVertical,
  PhoneCall,
  Search,
  Shield,
  Volume2,
  Wifi,
  Zap,
} from 'lucide-react';

type AppScene = 'calculator' | 'camera' | 'phone' | 'settings' | null;

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

const getAppScene = (frame: number): AppScene => {
  if (frame >= 600 && frame < 870) return 'calculator';
  if (frame >= 960 && frame < 1200) return 'camera';
  if (frame >= 1260 && frame < 1500) return 'phone';
  if (frame >= 1530 && frame < 1740) return 'settings';
  return null;
};

const AppHeader: React.FC<{appId: string; name: string}> = ({appId, name}) => (
  <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
    <div className="flex items-center gap-3">
      <ArrowLeft className="w-5 h-5" />
      <AppSvgIcon appId={appId} isThemed={true} size={28} />
      <span className="font-bold text-[16px]">{name}</span>
    </div>
    <MoreVertical className="w-5 h-5 text-white/60" />
  </div>
);

const CalculatorScene: React.FC<{frame: number}> = ({frame}) => {
  let previous = '';
  let display = '0';
  if (frame >= 655) display = '1';
  if (frame >= 685) display = '12';
  if (frame >= 720) { previous = '12 ×'; display = '8'; }
  if (frame >= 760) { previous = '12 × 8 ='; display = '96'; }

  return (
    <div className="flex-1 flex flex-col justify-between p-4 pb-2 bg-[#17191d]">
      <div className="flex-1 flex flex-col justify-end items-end px-4 py-6">
        <div className="text-white/50 text-[17px] font-medium h-7">{previous}</div>
        <div className="text-[56px] font-light tracking-tight leading-none">{display}</div>
      </div>
      <div className="grid grid-cols-4 gap-2.5 pb-3">
        {['AC', '(', ')', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '=', '⌫'].map((button) => (
          <div
            key={button}
            className={`h-15 rounded-full flex items-center justify-center text-[20px] font-medium ${
              button === '=' ? 'bg-[#004d40] text-[#a8c7fa]' :
              ['÷', '×', '-', '+', 'AC'].includes(button) ? 'bg-[#2d3036] text-[#a8c7fa]' : 'bg-[#1e2023] text-white'
            }`}
          >
            {button}
          </div>
        ))}
      </div>
    </div>
  );
};

const CameraScene: React.FC<{frame: number}> = ({frame}) => {
  const focusScale = interpolate(Math.sin(frame / 18), [-1, 1], [0.88, 1.08]);
  return (
    <div className="flex-1 flex flex-col bg-black">
      <div className="flex items-center justify-between px-6 py-4">
        <ArrowLeft className="w-5 h-5" />
        <div className="flex gap-6"><Zap className="w-5 h-5 text-amber-300" /><Camera className="w-5 h-5" /></div>
      </div>
      <div className="relative flex-1 mx-4 rounded-3xl overflow-hidden bg-gradient-to-b from-[#3c6074] via-[#78939d] to-[#26363d] border border-white/10">
        <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_65%_25%,rgba(255,255,255,0.7),transparent_22%),linear-gradient(150deg,transparent_45%,rgba(25,70,42,0.7)_46%,rgba(16,39,25,0.95)_100%)]" />
        <div style={{transform: `translate(-50%, -50%) scale(${focusScale})`}} className="absolute left-1/2 top-1/2 w-20 h-20 rounded-full border border-white/70 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/50 px-3 py-1 rounded-full text-[12px] font-bold">
          <span className="text-white/60">0.5x</span><span className="bg-white text-black px-2 py-0.5 rounded-full">1x</span><span className="text-white/60">2x</span><span className="text-white/60">5x</span>
        </div>
      </div>
      <div className="flex items-center justify-around py-6 px-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-300 to-emerald-800 flex items-center justify-center"><ImageIcon className="w-5 h-5" /></div>
        <div className="w-18 h-18 rounded-full border-4 border-white p-1"><div className="w-full h-full rounded-full bg-white" /></div>
        <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center"><Camera className="w-5 h-5" /></div>
      </div>
    </div>
  );
};

const PhoneScene: React.FC<{frame: number}> = ({frame}) => {
  const digits = frame >= 1430 ? '01712 345678' : frame >= 1390 ? '01712 3456' : frame >= 1350 ? '01712' : '017';
  return (
    <div className="flex-1 flex flex-col justify-between p-5 bg-[#121316]">
      <AppHeader appId="phone" name="Phone" />
      <div className="flex-1 flex items-center justify-center"><span className="text-[34px] font-light tracking-wider">{digits}</span></div>
      <div className="grid grid-cols-3 gap-y-3 gap-x-6 justify-items-center mb-5">
        {['1','2','3','4','5','6','7','8','9','*','0','#'].map((digit) => <div key={digit} className="w-16 h-16 rounded-full bg-[#202328] text-[24px] flex items-center justify-center">{digit}</div>)}
      </div>
      <div className="flex justify-center"><div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center"><PhoneCall className="w-7 h-7" /></div></div>
    </div>
  );
};

const SettingsScene: React.FC = () => {
  const rows = [
    {icon: Wifi, title: 'Network & internet', sub: 'Wi-Fi, mobile, data usage'},
    {icon: Battery, title: 'Battery', sub: '88% · About 1 day left'},
    {icon: Volume2, title: 'Sound & vibration', sub: 'Volume, haptics, Do Not Disturb'},
    {icon: Shield, title: 'Security & privacy', sub: 'App security, permissions'},
    {icon: FileText, title: 'Storage', sub: '46 GB of 128 GB used'},
  ];
  return (
    <div className="flex-1 flex flex-col bg-[#121316]">
      <AppHeader appId="settings" name="Settings" />
      <div className="mx-4 mt-4 h-12 rounded-full bg-white/10 flex items-center gap-3 px-4"><Search className="w-4 h-4 text-white/50" /><span className="text-sm text-white/50">Search settings</span></div>
      <div className="p-4 space-y-2">
        {rows.map(({icon: Icon, title, sub}) => <div key={title} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.04]">
          <div className="w-11 h-11 rounded-full bg-emerald-500/15 text-emerald-300 flex items-center justify-center"><Icon className="w-5 h-5" /></div>
          <div className="flex-1"><div className="text-[14px] font-semibold">{title}</div><div className="text-[11px] text-white/50 mt-0.5">{sub}</div></div>
          <ChevronRight className="w-4 h-4 text-white/30" />
        </div>)}
      </div>
    </div>
  );
};

export const LongWorkflowVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const wallpaper = WALLPAPERS[0];
  const screenScale = 2;
  const appScene = getAppScene(frame);

  // 0–3s home, 3–10s drawer + scrolling, 10–14.5s calculator,
  // 16–20s camera, 21–25s phone, 25.5–29s settings, 29–30s home.
  const drawerVisible = frame >= 180 && frame < 570;
  const drawerOpen = spring({frame: frame - 180, fps, config: {damping: 18, stiffness: 120}});
  const drawerClose = spring({frame: frame - 525, fps, config: {damping: 18, stiffness: 140}});
  const drawerY = interpolate(drawerClose > 0 ? 1 - drawerClose : drawerOpen, [0, 1], [915, 0], clamp);
  const drawerScroll = interpolate(frame, [280, 500], [0, -570], clamp);

  const appStart = appScene === 'calculator' ? 600 : appScene === 'camera' ? 960 : appScene === 'phone' ? 1260 : appScene === 'settings' ? 1530 : 0;
  const appEnd = appScene === 'calculator' ? 870 : appScene === 'camera' ? 1200 : appScene === 'phone' ? 1500 : appScene === 'settings' ? 1740 : 0;
  const appOpen = appScene ? spring({frame: frame - appStart, fps, config: {damping: 17, stiffness: 125}}) : 0;
  const appClose = appScene ? spring({frame: frame - (appEnd - 45), fps, config: {damping: 18, stiffness: 145}}) : 0;
  const appProgress = appClose > 0 ? 1 - appClose : appOpen;
  const appScale = interpolate(appProgress, [0, 1], [0.2, 1], clamp);
  const appOpacity = interpolate(appProgress, [0, 1], [0, 1], clamp);

  return (
    <LawnchairProvider>
      <AbsoluteFill style={{backgroundColor: '#0a0c10', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
        <div style={{transform: `scale(${screenScale})`, transformOrigin: 'center'}}>
          <DeviceFrame isFrameEnabled={false}>
            <div className="relative w-full h-full overflow-hidden bg-black text-white select-none flex flex-col font-sans">
              <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: `url(${wallpaper.url})`, filter: appScene ? 'brightness(.55) blur(3px)' : 'none'}}>
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
              </div>
              <div className="relative z-20"><StatusBar darkIcons={false} /></div>
              <div className="relative z-10 flex-1 px-4 pt-4 flex flex-col justify-between pb-2">
                <AtAGlance />
                <div className="grid grid-cols-4 gap-y-6 gap-x-2 justify-items-center py-6">
                  {INITIAL_APPS.slice(5, 17).map((app) => <div key={app.id} className="flex flex-col items-center gap-1.5">
                    <AppSvgIcon appId={app.id} isThemed={true} size={54} /><span className="text-[11px] font-medium drop-shadow-md truncate max-w-[70px]">{app.name}</span>
                  </div>)}
                </div>
                <Dock />
              </div>
              <div className="relative z-20 pb-1"><NavigationBar dark={false} /></div>

              {drawerVisible && <div style={{position:'absolute', inset:0, zIndex:40, transform:`translateY(${drawerY}px)`, backgroundColor:'rgba(18,20,24,.98)', borderRadius:'40px', overflow:'hidden', padding:'16px', paddingTop:'40px'}}>
                <div className="w-full h-12 rounded-full bg-white/10 flex items-center px-4 gap-3 mb-5"><Search className="w-4 h-4 text-white/50" /><span className="text-xs text-white/50">Search apps</span></div>
                <div className="relative h-[790px] overflow-hidden">
                  <div style={{transform:`translateY(${drawerScroll}px)`}} className="grid grid-cols-4 gap-y-7 gap-x-2 justify-items-center">
                    {INITIAL_APPS.map((app) => <div key={app.id} className="flex flex-col items-center gap-1.5 h-[78px]">
                      <AppSvgIcon appId={app.id} isThemed={true} size={50} /><span className="text-[10.5px] text-white/90 truncate max-w-[68px]">{app.name}</span>
                    </div>)}
                  </div>
                </div>
              </div>}

              {appScene && <div style={{position:'absolute', inset:0, zIndex:50, transform:`scale(${appScale})`, opacity:appOpacity, transformOrigin:'50% 75%', backgroundColor:'#121316', borderRadius:'40px', overflow:'hidden', display:'flex', flexDirection:'column'}}>
                <StatusBar darkIcons={false} />
                {appScene === 'calculator' && <CalculatorScene frame={frame} />}
                {appScene === 'camera' && <CameraScene frame={frame} />}
                {appScene === 'phone' && <PhoneScene frame={frame} />}
                {appScene === 'settings' && <SettingsScene />}
                <NavigationBar dark={false} />
              </div>}

              <div className="absolute top-10 right-4 z-[60] rounded-full bg-black/30 px-3 py-1.5 text-[10px] font-bold tracking-wide text-white/70 backdrop-blur-md flex items-center gap-1.5">
                <Clock3 className="w-3 h-3" /> LAWNCHAIR WORKFLOW
              </div>
            </div>
          </DeviceFrame>
        </div>
      </AbsoluteFill>
    </LawnchairProvider>
  );
};
