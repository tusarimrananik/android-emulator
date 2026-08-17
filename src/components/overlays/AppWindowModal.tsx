'use client';

import React, { useState } from 'react';
import { useLawnchair } from '@/context/LawnchairContext';
import { AppSvgIcon } from '@/components/common/AppSvgIcon';
import { StatusBar } from '@/components/phone/StatusBar';
import { NavigationBar } from '@/components/phone/NavigationBar';
import {
  ArrowLeft,
  Search,
  MoreVertical,
  Plus,
  RefreshCw,
  Share2,
  Camera,
  RotateCcw,
  Zap,
  Phone,
  PhoneCall,
  User,
  Settings as SettingsIcon,
  Wifi,
  Battery,
  Shield,
  Volume2,
  Disc3,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const AppWindowModal: React.FC = () => {
  const { runningApp, closeRunningApp, settings } = useLawnchair();

  // Calculator State
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [calcPrev, setCalcPrev] = useState('');
  const [calcOp, setCalcOp] = useState<string | null>(null);

  // Phone Dialer State
  const [dialNumber, setDialNumber] = useState('');

  // Camera State
  const [cameraZoom, setCameraZoom] = useState('1x');
  const [flashOn, setFlashOn] = useState(false);

  if (!runningApp) return null;

  const handleCalcDigit = (d: string) => {
    setCalcDisplay((prev) => (prev === '0' ? d : prev + d));
  };

  const handleCalcOp = (op: string) => {
    setCalcPrev(calcDisplay);
    setCalcOp(op);
    setCalcDisplay('0');
  };

  const handleCalcEqual = () => {
    const a = parseFloat(calcPrev);
    const b = parseFloat(calcDisplay);
    if (isNaN(a) || isNaN(b) || !calcOp) return;
    let res = 0;
    if (calcOp === '+') res = a + b;
    if (calcOp === '-') res = a - b;
    if (calcOp === '×') res = a * b;
    if (calcOp === '÷') res = b !== 0 ? a / b : 0;
    setCalcDisplay(String(res));
    setCalcOp(null);
    setCalcPrev('');
  };

  const handleCalcClear = () => {
    setCalcDisplay('0');
    setCalcPrev('');
    setCalcOp(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 30 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="absolute inset-0 z-50 flex flex-col justify-between overflow-hidden select-none bg-[#121316] text-white"
    >
      {/* Top Status Bar inside app */}
      <StatusBar darkIcons={runningApp.id === 'chrome' ? false : false} />

      {/* App Content Area */}
      <div className="flex-1 w-full overflow-y-auto no-scrollbar flex flex-col">
        {/* ================= CALCULATOR APP ================= */}
        {runningApp.id === 'calculator' ? (
          <div className="flex-1 flex flex-col justify-between p-4 pb-2">
            {/* Display */}
            <div className="flex-1 flex flex-col justify-end items-end px-4 py-6">
              <div className="text-white/50 text-[16px] font-medium h-6">
                {calcPrev} {calcOp}
              </div>
              <div className="text-[52px] font-display font-light text-white tracking-tight leading-none truncate max-w-full">
                {calcDisplay}
              </div>
            </div>

            {/* Keypad Grid */}
            <div className="grid grid-cols-4 gap-2.5 pb-2">
              {['AC', '(', ')', '÷'].map((btn) => (
                <button
                  key={btn}
                  onClick={() => (btn === 'AC' ? handleCalcClear() : btn === '÷' ? handleCalcOp('÷') : null)}
                  className="h-16 rounded-full bg-[#2d3036] text-[20px] font-medium text-[#a8c7fa] flex items-center justify-center active:scale-90 transition-transform"
                >
                  {btn}
                </button>
              ))}
              {['7', '8', '9', '×'].map((btn) => (
                <button
                  key={btn}
                  onClick={() => (btn === '×' ? handleCalcOp('×') : handleCalcDigit(btn))}
                  className={`h-16 rounded-full text-[22px] font-medium flex items-center justify-center active:scale-90 transition-transform ${
                    btn === '×' ? 'bg-[#2d3036] text-[#a8c7fa]' : 'bg-[#1e2023] text-white'
                  }`}
                >
                  {btn}
                </button>
              ))}
              {['4', '5', '6', '-'].map((btn) => (
                <button
                  key={btn}
                  onClick={() => (btn === '-' ? handleCalcOp('-') : handleCalcDigit(btn))}
                  className={`h-16 rounded-full text-[22px] font-medium flex items-center justify-center active:scale-90 transition-transform ${
                    btn === '-' ? 'bg-[#2d3036] text-[#a8c7fa]' : 'bg-[#1e2023] text-white'
                  }`}
                >
                  {btn}
                </button>
              ))}
              {['1', '2', '3', '+'].map((btn) => (
                <button
                  key={btn}
                  onClick={() => (btn === '+' ? handleCalcOp('+') : handleCalcDigit(btn))}
                  className={`h-16 rounded-full text-[22px] font-medium flex items-center justify-center active:scale-90 transition-transform ${
                    btn === '+' ? 'bg-[#2d3036] text-[#a8c7fa]' : 'bg-[#1e2023] text-white'
                  }`}
                >
                  {btn}
                </button>
              ))}
              {['0', '.', '=', '⌫'].map((btn) => (
                <button
                  key={btn}
                  onClick={() => {
                    if (btn === '=') handleCalcEqual();
                    else if (btn === '⌫') setCalcDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
                    else handleCalcDigit(btn);
                  }}
                  className={`h-16 rounded-full text-[22px] font-medium flex items-center justify-center active:scale-90 transition-transform ${
                    btn === '=' ? 'bg-[#004d40] text-[#a8c7fa]' : 'bg-[#1e2023] text-white'
                  }`}
                >
                  {btn}
                </button>
              ))}
            </div>
          </div>
        ) : runningApp.id === 'camera' ? (
          /* ================= CAMERA APP ================= */
          <div className="flex-1 flex flex-col justify-between bg-black relative">
            {/* Top Camera Controls */}
            <div className="flex items-center justify-between px-6 py-4 z-10">
              <button onClick={closeRunningApp} className="p-2 text-white">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-6">
                <button onClick={() => setFlashOn((p) => !p)} className={`p-2 ${flashOn ? 'text-amber-400' : 'text-white'}`}>
                  <Zap className="w-5 h-5" />
                </button>
                <button className="p-2 text-white">
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Viewfinder simulation */}
            <div className="relative flex-1 mx-4 rounded-3xl overflow-hidden bg-gradient-to-b from-[#1a1e24] via-[#242c38] to-[#12161b] flex items-center justify-center border border-white/10 shadow-inner">
              <div className="text-center text-white/40">
                <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-[13px] font-medium">Pixel 9 Pro Viewfinder (50 MP)</p>
              </div>

              {/* Focus reticle */}
              <div className="w-20 h-20 rounded-full border border-white/40 absolute flex items-center justify-center animate-pulse">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              </div>

              {/* Zoom Switcher */}
              <div className="absolute bottom-4 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[12px] font-bold">
                {['0.5x', '1x', '2x', '5x'].map((z) => (
                  <button
                    key={z}
                    onClick={() => setCameraZoom(z)}
                    className={`px-2 py-0.5 rounded-full transition-colors ${
                      cameraZoom === z ? 'bg-white text-black' : 'text-white/70'
                    }`}
                  >
                    {z}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Shutter Area */}
            <div className="flex items-center justify-around py-6 px-8">
              <div className="w-12 h-12 rounded-full bg-white/15 border border-white/30 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=100&auto=format&fit=crop"
                  alt="Gallery"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Shutter Button */}
              <button className="w-18 h-18 rounded-full border-4 border-white p-1 flex items-center justify-center active:scale-95 transition-transform">
                <div className="w-full h-full rounded-full bg-white shadow-lg" />
              </button>

              <button className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center text-white">
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : runningApp.id === 'phone' ? (
          /* ================= PHONE APP ================= */
          <div className="flex-1 flex flex-col justify-between p-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <button onClick={closeRunningApp} className="p-2 text-white">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-[17px] font-bold">Phone</h2>
              <MoreVertical className="w-5 h-5 text-white/70" />
            </div>

            {/* Number Display */}
            <div className="flex-1 flex items-center justify-center py-4">
              <span className="text-[36px] font-display font-light text-white tracking-widest min-h-[50px]">
                {dialNumber || 'Dial a number'}
              </span>
            </div>

            {/* Dialpad */}
            <div className="grid grid-cols-3 gap-y-3 gap-x-6 justify-items-center mb-4">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((digit) => (
                <button
                  key={digit}
                  onClick={() => setDialNumber((prev) => prev + digit)}
                  className="w-16 h-16 rounded-full bg-[#202328] hover:bg-[#2c3037] text-[24px] font-medium flex flex-col items-center justify-center active:scale-90 transition-transform"
                >
                  <span>{digit}</span>
                </button>
              ))}
            </div>

            {/* Call Button */}
            <div className="flex items-center justify-center gap-6 pb-2">
              <button
                onClick={() => setDialNumber('')}
                className="text-sm font-medium text-white/50 hover:text-white"
              >
                Clear
              </button>
              <button
                onClick={() => alert(`Calling ${dialNumber || 'mom'}...`)}
                className="w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-lg active:scale-90 transition-transform"
              >
                <PhoneCall className="w-6 h-6" />
              </button>
            </div>
          </div>
        ) : (
          /* ================= GENERIC APP SCREEN (Chrome, Settings, etc.) ================= */
          <div className="flex-1 flex flex-col">
            {/* App Action Bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <button onClick={closeRunningApp} className="p-1 text-white hover:text-white/80">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2">
                  <AppSvgIcon appId={runningApp.id} isThemed={settings.themedIcons} size={28} />
                  <span className="font-bold text-[16px] text-white">{runningApp.name}</span>
                </div>
              </div>
              <MoreVertical className="w-5 h-5 text-white/60" />
            </div>

            {/* Content Feed Mockup */}
            <div className="flex-1 p-5 space-y-4 overflow-y-auto no-scrollbar">
              <div className="p-4 rounded-3xl bg-white/5 border border-white/10 space-y-2">
                <h4 className="text-[15px] font-bold text-white">Welcome to {runningApp.name}</h4>
                <p className="text-[13px] text-white/70 leading-relaxed">
                  Lawnchair Launcher recreation running smoothly inside an isolated React component.
                  All gestures, spring physics, and Material You tokens are live!
                </p>
              </div>

              {/* Sample list items */}
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="p-4 rounded-2xl bg-white/5 flex items-center justify-between hover:bg-white/10 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <Disc3 className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-[13px] font-semibold text-white">Feature module #{item}</div>
                      <div className="text-[11px] text-white/50">Active simulated process</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300">
                    Running
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Gesture Navigation Bar */}
      <NavigationBar dark={false} />
    </motion.div>
  );
};
