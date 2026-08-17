'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Smartphone,
  Video,
  Square,
  Download,
  RotateCcw,
  X,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Play,
} from 'lucide-react';

interface ScreenRecorderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScreenRecorderModal: React.FC<ScreenRecorderModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer while recording
  useEffect(() => {
    if (isRecording) {
      setRecordingSeconds(0);
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  // Clean up blob URLs
  useEffect(() => {
    return () => {
      if (recordedUrl) URL.revokeObjectURL(recordedUrl);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [recordedUrl]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  const getMediaStream = async (): Promise<MediaStream> => {
    // 1. Try modern 60 FPS constraints
    try {
      return await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: 60 },
        audio: false,
      });
    } catch (e1) {
      // 2. Fallback to basic display media constraint
      return await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });
    }
  };

  const startRecording = async () => {
    setErrorMsg(null);
    setRecordedBlob(null);
    setRecordedUrl(null);
    setShowPreviewModal(false);
    chunksRef.current = [];

    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
      setErrorMsg('Screen recording is not supported in this browser environment.');
      return;
    }

    try {
      const stream = await getMediaStream();
      streamRef.current = stream;

      // When user clicks the browser native "Stop sharing" button
      stream.getVideoTracks()[0].onended = () => {
        stopRecording();
      };

      // Select best supported high-fps codec
      const mimeTypes = [
        'video/webm;codecs=vp9,opus',
        'video/webm;codecs=vp8,opus',
        'video/webm;codecs=h264',
        'video/webm',
        'video/mp4',
      ];
      let selectedMime = mimeTypes.find((m) => MediaRecorder.isTypeSupported(m)) || '';

      const recorderOptions: MediaRecorderOptions = {};
      if (selectedMime) {
        recorderOptions.mimeType = selectedMime;
      }
      recorderOptions.videoBitsPerSecond = 8000000; // 8 Mbps high-bitrate

      let mediaRecorder: MediaRecorder;
      try {
        mediaRecorder = new MediaRecorder(stream, recorderOptions);
      } catch {
        mediaRecorder = new MediaRecorder(stream);
      }

      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const finalBlob = new Blob(chunksRef.current, {
          type: selectedMime || 'video/webm',
        });
        setRecordedBlob(finalBlob);
        const url = URL.createObjectURL(finalBlob);
        setRecordedUrl(url);
        setIsRecording(false);
        setShowPreviewModal(true); // Automatically show preview modal with download button

        // Stop all track streams
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((t) => t.stop());
        }
      };

      mediaRecorder.start(250);
      setIsRecording(true);
      onClose(); // Automatically close dialog so the device frame is fully visible and interactive!
    } catch (err: any) {
      console.error('Failed to start device recording:', err);
      if (err.name !== 'NotAllowedError') {
        setErrorMsg(err.message || 'Screen capture permission was cancelled or not supported.');
      }
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const downloadRecording = () => {
    if (!recordedUrl) return;
    const a = document.createElement('a');
    a.href = recordedUrl;
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, 19);
    a.download = `lawnchair-14-device-frame-recording-${timestamp}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <>
      {/* 1. Floating Pill While Recording (Full Screen & Device Frame are Active) */}
      <AnimatePresence>
        {isRecording && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 inset-x-0 z-[100] flex justify-center pointer-events-none px-4"
          >
            <div className="pointer-events-auto flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#181a1f]/95 backdrop-blur-2xl border border-red-500/40 shadow-2xl text-white">
              <div className="relative flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-ping absolute" />
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              </div>
              <span className="text-xs font-mono font-bold">{formatTime(recordingSeconds)}</span>
              <div className="w-[1px] h-4 bg-white/15" />
              <span className="text-xs font-semibold text-white/90">
                Recording Device Frame & Screen
              </span>
              <button
                onClick={stopRecording}
                className="ml-2 px-3.5 py-1.5 rounded-full bg-red-500 hover:bg-red-600 font-bold text-xs text-white transition-all shadow-md flex items-center gap-1.5"
              >
                <Square className="w-3 h-3 fill-white" />
                <span>Stop & Download</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Setup / Preview Modal Dialog */}
      <AnimatePresence>
        {(isOpen || showPreviewModal) && !isRecording && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-lg rounded-3xl bg-[#1c1e24] border border-white/10 p-6 shadow-2xl text-white select-none relative overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold font-display tracking-tight leading-tight">
                      {recordedUrl ? 'Recording Ready!' : 'Device Frame + Screen Recording'}
                    </h2>
                    <p className="text-xs text-white/50">
                      {recordedUrl
                        ? 'Preview your recorded video and download the high-fps file'
                        : 'Captures the Pixel 9 Pro device frame & Android screen in 60 FPS'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowPreviewModal(false);
                    onClose();
                  }}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body Content */}
              <div className="py-5 space-y-4">
                {errorMsg && (
                  <div className="p-3.5 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {recordedUrl ? (
                  /* Video Preview */
                  <div className="space-y-3">
                    <div className="relative rounded-2xl overflow-hidden bg-black border border-white/10 aspect-video flex items-center justify-center shadow-inner">
                      <video
                        src={recordedUrl}
                        controls
                        autoPlay
                        loop
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs text-white/60 px-1">
                      <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Ready ({((recordedBlob?.size || 0) / (1024 * 1024)).toFixed(2)} MB)
                      </span>
                      <span>Duration: {formatTime(recordingSeconds)}</span>
                    </div>
                  </div>
                ) : (
                  /* Ready Instructions */
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div className="text-xs text-white/80 space-y-1.5">
                        <p className="font-semibold text-white">How it works:</p>
                        <ol className="list-decimal list-inside space-y-1 text-white/60">
                          <li>Click <strong>Start Recording</strong> below.</li>
                          <li>In the browser prompt, select <strong>Current Tab</strong> (or This Tab) and click <strong>Share</strong>.</li>
                          <li>The dialog will automatically close so you can interact with the phone freely!</li>
                          <li>Click <strong>Stop & Download</strong> at the bottom when finished.</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Footer */}
              <div className="flex items-center justify-end gap-3 pt-2">
                {recordedUrl ? (
                  <div className="flex items-center gap-2 w-full">
                    <button
                      onClick={startRecording}
                      className="py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/20 font-semibold text-xs text-white/80 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Record Again</span>
                    </button>
                    <button
                      onClick={downloadRecording}
                      className="flex-1 py-3 px-5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 font-bold text-sm text-white flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-500/25"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Video File</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={startRecording}
                    className="flex-1 py-3 px-5 rounded-2xl bg-red-500 hover:bg-red-600 font-bold text-sm text-white flex items-center justify-center gap-2 transition-colors shadow-lg shadow-red-500/25"
                  >
                    <Video className="w-4 h-4" />
                    <span>Start Recording</span>
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
