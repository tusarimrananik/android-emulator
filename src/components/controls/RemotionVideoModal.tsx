'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import * as htmlToImage from 'html-to-image';
import { PhoneShowcaseVideo } from '@/remotion/PhoneShowcaseVideo';
import {
  Clapperboard,
  Download,
  Play,
  RotateCcw,
  X,
  Sparkles,
  CheckCircle2,
  Film,
  Zap,
  AlertCircle,
  Clock,
  Gauge,
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
  const [selectedDuration, setSelectedDuration] = useState<4 | 7>(4); // Default 4 seconds
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportFrame, setExportFrame] = useState<number>(0);
  const [recordedFileSize, setRecordedFileSize] = useState<string>('');
  const [exportedUrl, setExportedUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (exportedUrl) URL.revokeObjectURL(exportedUrl);
    };
  }, [exportedUrl]);

  // Robust, Real-Pixel Frame-by-Frame Video Exporter
  const renderAndDownloadVideo = async () => {
    setIsExporting(true);
    setExportProgress(0);
    setExportedUrl(null);
    setErrorMsg(null);
    setRecordedFileSize('');

    try {
      const renderContainer = document.getElementById('remotion-export-canvas-source');
      if (!renderContainer) {
        throw new Error('Export canvas container element not found.');
      }

      // 1. Create recording canvas (540x960 for crisp 9:16 vertical video)
      const width = 540;
      const height = 960;
      const recordCanvas = document.createElement('canvas');
      recordCanvas.width = width;
      recordCanvas.height = height;
      const ctx = recordCanvas.getContext('2d', { alpha: false });

      if (!ctx) {
        throw new Error('Could not initialize 2D canvas context.');
      }

      // Initial black fill
      ctx.fillStyle = '#0a0c10';
      ctx.fillRect(0, 0, width, height);

      // 2. Prepare canvas stream and MediaRecorder
      const stream = recordCanvas.captureStream(30);
      const mimeTypes = [
        'video/webm;codecs=vp9',
        'video/webm;codecs=vp8',
        'video/webm',
        'video/mp4',
      ];
      const selectedMime = mimeTypes.find((m) => MediaRecorder.isTypeSupported(m)) || 'video/webm';

      const chunks: Blob[] = [];
      const recorder = new MediaRecorder(stream, {
        mimeType: selectedMime,
        videoBitsPerSecond: 8000000, // 8 Mbps high-bitrate
      });

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      const recordPromise = new Promise<Blob>((resolve) => {
        recorder.onstop = () => {
          const finalBlob = new Blob(chunks, { type: selectedMime });
          resolve(finalBlob);
        };
      });

      recorder.start(100); // chunk every 100ms

      // 3. Step through keyframes (4 seconds = 240 frames total)
      const totalFrames = selectedDuration * 60;
      const step = 8; // Sample every 8th frame for ultra-fast, reliable capture
      const frameList: number[] = [];
      for (let f = 0; f < totalFrames; f += step) {
        frameList.push(f);
      }

      for (let i = 0; i < frameList.length; i++) {
        const currentF = frameList[i];
        setExportFrame(currentF);

        // Wait small tick for React DOM commit
        await new Promise((r) => setTimeout(r, 40));

        try {
          // Render genuine DOM snapshot into HTMLCanvasElement
          const capturedCanvas = await htmlToImage.toCanvas(renderContainer, {
            quality: 0.95,
            pixelRatio: 1.2,
            backgroundColor: '#0a0c10',
          });

          // Draw real pixels onto the recording stream canvas
          ctx.fillStyle = '#0a0c10';
          ctx.fillRect(0, 0, width, height);

          const scale = Math.min(width / capturedCanvas.width, height / capturedCanvas.height) * 0.96;
          const x = (width - capturedCanvas.width * scale) / 2;
          const y = (height - capturedCanvas.height * scale) / 2;

          ctx.drawImage(capturedCanvas, x, y, capturedCanvas.width * scale, capturedCanvas.height * scale);
        } catch (captureErr) {
          console.warn(`Frame ${currentF} raster warning:`, captureErr);
        }

        setExportProgress(Math.round(((i + 1) / frameList.length) * 100));
      }

      // 4. Finalize recording and download genuine video file
      recorder.stop();
      const finalBlob = await recordPromise;

      const sizeMB = (finalBlob.size / (1024 * 1024)).toFixed(2);
      setRecordedFileSize(`${sizeMB} MB`);

      const url = URL.createObjectURL(finalBlob);
      setExportedUrl(url);
      setExportProgress(100);
      setIsExporting(false);

      // Auto trigger download
      const a = document.createElement('a');
      a.href = url;
      const now = new Date();
      const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, 19);
      a.download = `lawnchair-14-viewport-${timestamp}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err: any) {
      console.error('Export error:', err);
      setErrorMsg(err.message || 'Export encountered an issue.');
      setIsExporting(false);
    }
  };

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
                component={PhoneShowcaseVideo}
                durationInFrames={selectedDuration * 60}
                compositionWidth={1080}
                compositionHeight={1920}
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
              {errorMsg && (
                <div className="p-3 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* 1. Sequence Duration Selector */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    Showcase Sequence
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { dur: 4 as const, label: '4.0 Seconds (Fast)', sub: 'Opens Calculator ➔ 7×8=56 ➔ Closes' },
                    { dur: 7 as const, label: '7.0 Seconds (Full)', sub: 'Calculator + App Drawer Scroll' },
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
                  <div className="text-emerald-400 font-bold mt-0.5">{recordedFileSize || '~1-3 MB'}</div>
                </div>
              </div>
            </div>

            {/* Export Action */}
            <div className="pt-2 border-t border-white/10">
              {isExporting ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-emerald-400 flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 animate-pulse" />
                      Capturing & Encoding Video Frames...
                    </span>
                    <span className="font-mono text-white/70">{exportProgress}%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-100"
                      style={{ width: `${exportProgress}%` }}
                    />
                  </div>
                </div>
              ) : exportedUrl ? (
                <div className="space-y-2">
                  <button
                    onClick={renderAndDownloadVideo}
                    className="w-full py-3.5 px-5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 font-bold text-sm text-white flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-500/25"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Video ({recordedFileSize})</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={renderAndDownloadVideo}
                  className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 font-bold text-sm text-white flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
                >
                  <Film className="w-4 h-4" />
                  <span>Export Video ({selectedDuration}.0s Sequence)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Frame Renderer Viewport (Active in DOM for valid pixel rendering) */}
      <div
        id="remotion-export-canvas-source"
        style={{
          position: 'fixed',
          left: '-9999px',
          top: '-9999px',
          width: '450px',
          height: '800px',
          overflow: 'hidden',
          backgroundColor: '#0a0c10',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <PhoneShowcaseVideo overrideFrame={exportFrame} />
      </div>
    </div>
  );
};
