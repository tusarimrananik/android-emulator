'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

import { PhoneShowcaseVideo } from '@/remotion/PhoneShowcaseVideo';
import { LongWorkflowVideo } from '@/remotion/LongWorkflowVideo';
import {
  Clapperboard,
  Download,
  X,
  Clock,
} from 'lucide-react';

const Player = dynamic(
  () => import('@remotion/player').then((mod) => mod.Player),
  { ssr: false }
);

interface RemotionVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RemotionVideoModal: React.FC<RemotionVideoModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedDuration, setSelectedDuration] = useState<4 | 7 | 30>(4);
  const [jobId, setJobId] = useState<string | null>(null);
  const [renderStatus, setRenderStatus] = useState<'idle' | 'queued' | 'rendering' | 'completed' | 'failed'>('idle');
  const [progress, setProgress] = useState(0);
  const [renderError, setRenderError] = useState<string | null>(null);

  const workflows = {
    4: [{type: 'home', duration: 1}, {type: 'openApp', app: 'calculator', duration: 2}, {type: 'tap', value: '7×8=', duration: 0.5}, {type: 'goHome', duration: 0.5}],
    7: [{type: 'home', duration: 1}, {type: 'openApp', app: 'calculator', duration: 2}, {type: 'tap', value: '7×8=', duration: 1}, {type: 'goHome', duration: 1}, {type: 'openDrawer', duration: 1}, {type: 'scrollDrawer', duration: 1}],
    30: [{type: 'home', duration: 3}, {type: 'openDrawer', duration: 2}, {type: 'scrollDrawer', duration: 4}, {type: 'openApp', app: 'calculator', duration: 4}, {type: 'tap', value: '12×8=', duration: 2}, {type: 'goHome', duration: 2}, {type: 'openApp', app: 'camera', duration: 4}, {type: 'goHome', duration: 1}, {type: 'openApp', app: 'phone', duration: 3}, {type: 'tap', value: '01712345678', duration: 2}, {type: 'goHome', duration: 1}, {type: 'openApp', app: 'settings', duration: 2}],
  } as const;

  const startRealtimeRender = async () => {
    setRenderError(null); setProgress(0); setRenderStatus('queued'); setJobId(null);
    try {
      const response = await fetch('/api/renders', {method: 'POST', headers: {'content-type': 'application/json'}, body: JSON.stringify({fps: 60, actions: workflows[selectedDuration]})});
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not create render job');
      setJobId(data.job.id); setRenderStatus(data.job.status);
    } catch (error) { setRenderStatus('failed'); setRenderError(error instanceof Error ? error.message : 'Render failed'); }
  };

  useEffect(() => {
    if (!jobId || !['queued', 'rendering'].includes(renderStatus)) return;
    const timer = window.setInterval(async () => {
      try {
        const response = await fetch(`/api/renders/${jobId}`, {cache: 'no-store'});
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Could not read render status');
        setRenderStatus(data.job.status); setProgress(data.job.progress || 0);
      } catch (error) { setRenderStatus('failed'); setRenderError(error instanceof Error ? error.message : 'Render failed'); }
    }, 1500);
    return () => window.clearInterval(timer);
  }, [jobId, renderStatus]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-4xl max-h-[92vh] rounded-3xl bg-[#14161a] border border-white/10 p-6 shadow-2xl text-white select-none relative flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md">
              <Clapperboard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold font-display tracking-tight leading-tight">
                  Remotion Viewport Video Studio
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                  Zero Prompts · Genuine Video File
                </span>
              </div>
              <p className="text-xs text-white/50">
                1:1 flat screen viewport recording (Home ➔ Opens Calculator ➔ 7×8=56 ➔ Closes)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body with Side-by-Side Remotion Player */}
        <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto flex-1">
          {/* Left Column: Remotion Flat Viewport Player */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[250px] aspect-[9/16] rounded-3xl overflow-hidden bg-[#0a0c10] border border-white/15 shadow-2xl flex items-center justify-center">
              <Player
                component={selectedDuration === 30 ? LongWorkflowVideo : PhoneShowcaseVideo}
                durationInFrames={selectedDuration * 60}
                compositionWidth={824}
                compositionHeight={1830}
                fps={60}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                controls={false}
                loop
                autoPlay
              />
            </div>
          </div>

          {/* Right Column: Settings & Controls */}
          <div className="flex flex-col justify-between space-y-4">
            <div className="space-y-3.5">

              {/* 1. Sequence Duration Selector */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    Showcase Sequence
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { dur: 4 as const, label: '4.0 Seconds (Fast)', sub: 'Opens Calculator ➔ 7×8=56 ➔ Closes' },
                    { dur: 7 as const, label: '7.0 Seconds (Full)', sub: 'Calculator + App Drawer Scroll' },
                    { dur: 30 as const, label: '30 Seconds (Workflow)', sub: 'Drawer scroll + Calculator + Camera + Phone + Settings' },
                  ].map((opt) => (
                    <button
                      key={opt.dur}
                      onClick={() => setSelectedDuration(opt.dur)}
                      className={`p-3 rounded-xl text-left transition-all ${
                        selectedDuration === opt.dur
                          ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/50 shadow-sm'
                          : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-transparent'
                      }`}
                    >
                      <div className="text-xs font-bold text-white">{opt.label}</div>
                      <div className="text-[10px] opacity-60 truncate mt-0.5">{opt.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Specs Pills */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="p-2.5 rounded-2xl bg-white/5 border border-white/5 text-center">
                  <div className="text-white/40 text-[9px] uppercase font-bold">Duration</div>
                  <div className="text-white font-bold mt-0.5">{selectedDuration}.0s</div>
                </div>
                <div className="p-2.5 rounded-2xl bg-white/5 border border-white/5 text-center">
                  <div className="text-white/40 text-[9px] uppercase font-bold">Viewport</div>
                  <div className="text-white font-bold mt-0.5">1:1 Flat</div>
                </div>
                <div className="p-2.5 rounded-2xl bg-white/5 border border-white/5 text-center">
                  <div className="text-white/40 text-[9px] uppercase font-bold">File Size</div>
                  <div className="text-emerald-400 font-bold mt-0.5">Ready</div>
                </div>
              </div>
            </div>

            {/* Export Action */}
            <div className="pt-2 border-t border-white/10">
              <button
                onClick={renderStatus === 'completed' && jobId ? () => { window.location.href = `/api/renders/${jobId}/video`; } : startRealtimeRender}
                disabled={renderStatus === 'queued' || renderStatus === 'rendering'}
                className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 font-bold text-sm text-white flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
              >
                <Download className="w-4 h-4" />
                <span>{renderStatus === 'queued' ? 'Queued…' : renderStatus === 'rendering' ? `Rendering ${Math.round(progress * 100)}%` : renderStatus === 'completed' ? 'Download Generated Video' : `Render ${selectedDuration}.0s Video Now`}</span>
              </button>
              {renderError && <p className="mt-2 text-xs text-red-300">{renderError}</p>}
            </div>
          </div>
        </div>
      </motion.div>

    </div>
  );
};
