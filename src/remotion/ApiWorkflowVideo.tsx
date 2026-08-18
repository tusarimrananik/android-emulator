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
import {ArrowLeft, Battery, Camera, ChevronRight, Clock, CloudSun, FileText, Folder, Image as ImageIcon, MoreVertical, PhoneCall, Search, Shield, Volume2, Wifi, Zap} from 'lucide-react';

export type WorkflowAction = {type: 'home'|'openDrawer'|'scrollDrawer'|'openApp'|'tap'|'wait'|'goHome'; duration: number; app?: string; value?: string};
export type ApiWorkflowVideoProps = {actions: WorkflowAction[]};

type ActiveAction = WorkflowAction & {start: number; end: number; localFrame: number};
const clamp = {extrapolateLeft:'clamp' as const, extrapolateRight:'clamp' as const};

const resolveAction = (actions: WorkflowAction[], frame: number, fps: number): ActiveAction => {
  let cursor = 0;
  for (const action of actions) {
    const length = Math.max(1, Math.round(action.duration * fps));
    if (frame < cursor + length) return {...action, start: cursor, end: cursor + length, localFrame: frame - cursor};
    cursor += length;
  }
  const fallback = actions.at(-1) ?? {type:'home' as const,duration:1};
  return {...fallback,start:cursor,end:cursor+fps,localFrame:Math.max(0,frame-cursor)};
};

const Header: React.FC<{id:string;name:string}> = ({id,name}) => <div className="flex items-center justify-between px-4 py-3 border-b border-white/10"><div className="flex items-center gap-3"><ArrowLeft className="w-5 h-5"/><AppSvgIcon appId={id} isThemed size={28}/><span className="font-bold text-[16px]">{name}</span></div><MoreVertical className="w-5 h-5 text-white/60"/></div>;

const Calculator: React.FC<{value?:string;progress:number}> = ({value,progress}) => {
  const expression = value || '12×8=';
  const answer = expression.includes('12') && expression.includes('8') ? '96' : '56';
  const typed = expression.slice(0,Math.max(1,Math.ceil(expression.length*progress)));
  return <div className="flex-1 flex flex-col justify-between p-4 pb-2 bg-[#17191d]"><div className="flex-1 flex flex-col justify-end items-end px-4 py-6"><div className="text-white/50 text-[17px] h-7">{progress>.75?expression:typed}</div><div className="text-[56px] font-light leading-none">{progress>.75?answer:typed.replace(/[^0-9]/g,'')||'0'}</div></div><div className="grid grid-cols-4 gap-2.5 pb-3">{['AC','(',')','÷','7','8','9','×','4','5','6','-','1','2','3','+','0','.','=','⌫'].map(b=><div key={b} className={`h-15 rounded-full flex items-center justify-center text-[20px] font-medium ${b==='='?'bg-[#004d40] text-[#a8c7fa]':['÷','×','-','+','AC'].includes(b)?'bg-[#2d3036] text-[#a8c7fa]':'bg-[#1e2023]'}`}>{b}</div>)}</div></div>;
};

const CameraApp: React.FC = () => <div className="flex-1 flex flex-col bg-black"><div className="flex justify-between px-6 py-4"><ArrowLeft/><div className="flex gap-6"><Zap className="text-amber-300"/><Camera/></div></div><div className="relative flex-1 mx-4 rounded-3xl overflow-hidden bg-gradient-to-b from-[#3c6074] via-[#78939d] to-[#26363d]"><div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_65%_25%,rgba(255,255,255,0.7),transparent_22%),linear-gradient(150deg,transparent_45%,rgba(25,70,42,0.7)_46%,rgba(16,39,25,0.95)_100%)]"/><div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-white/70 flex items-center justify-center"><div className="w-1.5 h-1.5 bg-amber-400 rounded-full"/></div><div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full text-xs"><span className="text-white/50">0.5x</span> <b className="bg-white text-black px-2 py-1 rounded-full mx-2">1x</b> <span className="text-white/50">2x 5x</span></div></div><div className="flex items-center justify-around py-6"><div className="w-12 h-12 rounded-xl bg-sky-700 flex items-center justify-center"><ImageIcon/></div><div className="w-18 h-18 rounded-full border-4 p-1"><div className="w-full h-full rounded-full bg-white"/></div><Camera/></div></div>;

const PhoneApp: React.FC<{value?:string;progress:number}> = ({value,progress}) => {const number=(value||'01712345678').replace(/\D/g,'');const shown=number.slice(0,Math.max(1,Math.ceil(number.length*progress)));return <div className="flex-1 flex flex-col justify-between p-5"><Header id="phone" name="Phone"/><div className="flex-1 flex items-center justify-center text-[34px] tracking-wider">{shown}</div><div className="grid grid-cols-3 gap-y-3 gap-x-6 justify-items-center">{['1','2','3','4','5','6','7','8','9','*','0','#'].map(d=><div key={d} className="w-16 h-16 rounded-full bg-[#202328] text-[24px] flex items-center justify-center">{d}</div>)}</div><div className="flex justify-center py-3"><div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center"><PhoneCall/></div></div></div>};

const SettingsApp: React.FC = () => {const rows=[[Wifi,'Network & internet','Wi-Fi, mobile, data usage'],[Battery,'Battery','88% · About 1 day left'],[Volume2,'Sound & vibration','Volume, haptics'],[Shield,'Security & privacy','Permissions and updates'],[FileText,'Storage','46 GB of 128 GB used']] as const;return <div className="flex-1"><Header id="settings" name="Settings"/><div className="m-4 h-12 rounded-full bg-white/10 flex items-center gap-3 px-4"><Search className="w-4 h-4"/><span className="text-white/50">Search settings</span></div><div className="px-4 space-y-2">{rows.map(([I,t,s])=><div key={t} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[.04]"><div className="w-11 h-11 rounded-full bg-emerald-500/15 text-emerald-300 flex items-center justify-center"><I className="w-5 h-5"/></div><div className="flex-1"><b className="text-sm">{t}</b><div className="text-[11px] text-white/50">{s}</div></div><ChevronRight className="w-4 h-4 text-white/30"/></div>)}</div></div>};
const FilesApp: React.FC = () => <div className="flex-1"><Header id="files" name="Files"/><div className="p-5"><div className="text-2xl font-semibold mb-5">Recent</div><div className="grid grid-cols-2 gap-3">{['Downloads','Images','Documents','Videos'].map((x,i)=><div key={x} className="p-5 rounded-3xl bg-white/[.06]"><Folder className="text-sky-300 mb-4"/><b>{x}</b><div className="text-xs text-white/40 mt-1">{12+i*7} items</div></div>)}</div></div></div>;
const WeatherApp: React.FC = () => <div className="flex-1 bg-gradient-to-b from-sky-700 to-[#121316]"><Header id="weather" name="Weather"/><div className="text-center pt-16"><CloudSun className="w-24 h-24 mx-auto text-amber-200"/><div className="text-7xl font-light mt-5">24°</div><div className="text-lg mt-2">Rajshahi · Partly cloudy</div><div className="text-white/60 mt-2">Feels like 26° · H 30° L 21°</div></div></div>;
const ClockApp: React.FC = () => <div className="flex-1"><Header id="clock" name="Clock"/><div className="flex flex-col items-center justify-center h-[650px]"><Clock className="w-24 h-24 text-sky-300"/><div className="text-7xl font-light mt-8">10:09</div><div className="text-white/50 mt-3">Tuesday, August 18</div></div></div>;

const AppScene: React.FC<{app:string;value?:string;progress:number}> = ({app,value,progress}) => {
  if(app==='calculator') return <Calculator value={value} progress={progress}/>;
  if(app==='camera') return <CameraApp/>;
  if(app==='phone') return <PhoneApp value={value} progress={progress}/>;
  if(app==='settings') return <SettingsApp/>;
  if(app==='files') return <FilesApp/>;
  if(app==='weather') return <WeatherApp/>;
  return <ClockApp/>;
};

export const ApiWorkflowVideo: React.FC<ApiWorkflowVideoProps> = ({actions}) => {
  const frame=useCurrentFrame(); const {fps}=useVideoConfig(); const active=resolveAction(actions,frame,fps); const progress=interpolate(active.localFrame,[0,Math.max(1,active.end-active.start-1)],[0,1],clamp);
  let currentApp:string|undefined; let tapValue:string|undefined; let drawer=false; let scroll=0;
  for(const action of actions){if(action===active) break; if(action.type==='openDrawer'||action.type==='scrollDrawer') drawer=true; if(action.type==='scrollDrawer') scroll=-560; if(action.type==='openApp'){currentApp=action.app;drawer=false;} if(action.type==='tap') tapValue=action.value; if(action.type==='goHome'||action.type==='home'){currentApp=undefined;drawer=false;}}
  if(active.type==='openDrawer'){drawer=true;currentApp=undefined;} if(active.type==='scrollDrawer'){drawer=true;currentApp=undefined;scroll=interpolate(progress,[0,1],[0,-560],clamp);} if(active.type==='openApp'){currentApp=active.app;drawer=false;} if(active.type==='tap') tapValue=active.value; if(active.type==='goHome'||active.type==='home'){currentApp=undefined;drawer=false;}
  const transition=spring({frame:active.localFrame,fps,config:{damping:18,stiffness:130}}); const scale=interpolate(transition,[0,1],[.2,1],clamp);
  return <LawnchairProvider><AbsoluteFill style={{background:'#0a0c10',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}><div style={{transform:'scale(2)',transformOrigin:'center'}}><DeviceFrame isFrameEnabled={false}><div className="relative w-full h-full overflow-hidden bg-black text-white flex flex-col font-sans"><div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage:`url(${WALLPAPERS[0].url})`,filter:currentApp?'brightness(.55) blur(3px)':'none'}}/><div className="relative z-20"><StatusBar darkIcons={false}/></div><div className="relative z-10 flex-1 px-4 pt-4 flex flex-col justify-between pb-2"><AtAGlance/><div className="grid grid-cols-4 gap-y-6 gap-x-2 justify-items-center py-6">{INITIAL_APPS.slice(5,17).map(a=><div key={a.id} className="flex flex-col items-center gap-1"><AppSvgIcon appId={a.id} isThemed size={54}/><span className="text-[11px] truncate max-w-[70px]">{a.name}</span></div>)}</div><Dock/></div><NavigationBar dark={false}/>{drawer&&<div className="absolute inset-0 z-40 bg-[#121418]/[.98] rounded-[40px] overflow-hidden p-4 pt-10"><div className="h-12 rounded-full bg-white/10 flex items-center gap-3 px-4 mb-5"><Search className="w-4 h-4"/><span className="text-white/50 text-xs">Search apps</span></div><div className="h-[790px] overflow-hidden"><div style={{transform:`translateY(${scroll}px)`}} className="grid grid-cols-4 gap-y-7 gap-x-2 justify-items-center">{INITIAL_APPS.map(a=><div key={a.id} className="h-[78px] flex flex-col items-center gap-1"><AppSvgIcon appId={a.id} isThemed size={50}/><span className="text-[10px] truncate max-w-[68px]">{a.name}</span></div>)}</div></div></div>}{currentApp&&<div style={{transform:`scale(${scale})`,transformOrigin:'50% 75%'}} className="absolute inset-0 z-50 bg-[#121316] rounded-[40px] overflow-hidden flex flex-col"><StatusBar darkIcons={false}/><AppScene app={currentApp} value={tapValue} progress={progress}/><NavigationBar dark={false}/></div>}</div></DeviceFrame></div></AbsoluteFill></LawnchairProvider>;
};

export const calculateApiWorkflowMetadata = ({props}:{props:ApiWorkflowVideoProps}) => ({durationInFrames:Math.max(1,Math.round(props.actions.reduce((sum,a)=>sum+a.duration,0)*60)),fps:60,width:824,height:1830});
