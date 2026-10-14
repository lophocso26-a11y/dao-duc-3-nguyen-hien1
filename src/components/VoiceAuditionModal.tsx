import React, { useState, useEffect } from 'react';
import { AUDITION_VOICE_SAMPLES } from '../data/bookData';
import { CharacterRole } from '../types/book';
import { soundService } from '../utils/audio';
import {
  Volume2,
  Square,
  Upload,
  RotateCcw,
  Sparkles,
  CheckCircle,
  X,
  FileAudio,
} from 'lucide-react';

interface VoiceAuditionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceAuditionModal: React.FC<VoiceAuditionModalProps> = ({ isOpen, onClose }) => {
  const [playingRole, setPlayingRole] = useState<CharacterRole | null>(null);
  const [activeSubtitle, setActiveSubtitle] = useState<string | null>(null);
  const [backendStatus, setBackendStatus] = useState<{
    hasKey: boolean;
    model: string;
    cachedCount: number;
  }>({ hasKey: false, model: 'gemini-3.8-flash-lite-tts', cachedCount: 0 });
  const [customAudioUploaded, setCustomAudioUploaded] = useState<Record<string, boolean>>({});

  // Check backend status on open
  useEffect(() => {
    if (!isOpen) {
      soundService.stopCurrentVoice();
      setPlayingRole(null);
      setActiveSubtitle(null);
      return;
    }

    fetch('/api/tts/status')
      .then((res) => res.json())
      .then((data) => setBackendStatus(data))
      .catch((err) => console.warn('Could not check TTS status:', err));

    // Check if custom audio exists for any audition samples
    const statusObj: Record<string, boolean> = {};
    AUDITION_VOICE_SAMPLES.forEach((sample) => {
      const customKey = `custom_audio_${sample.role}_${sample.text.trim().substring(0, 40)}`;
      statusObj[sample.role] = Boolean(localStorage.getItem(customKey));
    });
    setCustomAudioUploaded(statusObj);
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePlaySample = (sample: (typeof AUDITION_VOICE_SAMPLES)[0]) => {
    if (playingRole === sample.role) {
      soundService.stopCurrentVoice();
      setPlayingRole(null);
      setActiveSubtitle(null);
      return;
    }

    soundService.stopCurrentVoice();
    setPlayingRole(sample.role);
    setActiveSubtitle(sample.text);

    soundService.playVoiceLine({
      text: sample.text,
      role: sample.role,
      speed: 1.0,
      onStart: () => {
        setPlayingRole(sample.role);
        setActiveSubtitle(sample.text);
      },
      onEnd: () => {
        setPlayingRole(null);
        setActiveSubtitle(null);
      },
      onError: (err) => {
        console.warn('Playback error:', err);
        setPlayingRole(null);
        setActiveSubtitle(null);
      },
    });
  };

  const handleFileUpload = (role: CharacterRole, text: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = reader.result as string;
      const customKey = `custom_audio_${role}_${text.trim().substring(0, 40)}`;
      localStorage.setItem(customKey, base64Data);

      // Also sync to server cache
      fetch('/api/tts/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: `${role}:${text.trim()}`, audioBase64: base64Data.split(',')[1] || base64Data }),
      }).catch(() => {});

      setCustomAudioUploaded((prev) => ({ ...prev, [role]: true }));
      soundService.playStarChime();
    };
    reader.readAsDataURL(file);
  };

  const handleResetCustom = (role: CharacterRole, text: string) => {
    const customKey = `custom_audio_${role}_${text.trim().substring(0, 40)}`;
    localStorage.removeItem(customKey);
    setCustomAudioUploaded((prev) => ({ ...prev, [role]: false }));
    soundService.playStarChime();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-gradient-to-b from-[#2a1a12] via-[#20120a] to-[#180d07] border-2 border-amber-500 rounded-2xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl text-amber-100 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-800/80 pb-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl text-stone-950 font-bold shadow">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg font-serif-vintage text-amber-200">
                KIỂM TRA GIỌNG NHÂN VẬT (BỐN VAI LỒNG TIẾNG)
              </h3>
              <p className="text-[11px] text-amber-300/80">
                Công nghệ Gemini TTS Tiếng Việt tự nhiên & Tải tệp giọng đọc giáo viên
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundService.stopCurrentVoice();
              onClose();
            }}
            className="p-1.5 rounded-lg text-amber-400 hover:text-white hover:bg-amber-900/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Backend Engine Status Banner */}
        <div className="bg-amber-950/70 border border-amber-700/60 rounded-xl p-3 mb-4 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              Hệ thống âm thanh: <strong>Gemini TTS 3.8 (Tiếng Việt)</strong>
            </span>
          </div>
          <span className="text-[11px] text-amber-300 bg-amber-900/60 px-2 py-0.5 rounded border border-amber-700/50">
            {backendStatus.hasKey ? 'Đã kích hoạt API Key' : 'Chế độ an toàn máy chủ'}
          </span>
        </div>

        {/* 4 Audition Role Cards */}
        <div className="space-y-3 overflow-y-auto flex-1 pr-1 mb-3">
          {AUDITION_VOICE_SAMPLES.map((sample) => {
            const isPlaying = playingRole === sample.role;
            const hasCustom = customAudioUploaded[sample.role];

            return (
              <div
                key={sample.role}
                className={`p-3.5 rounded-xl border-2 transition-all ${
                  isPlaying
                    ? 'border-amber-400 bg-amber-900/50 ring-2 ring-amber-400/50 shadow-lg'
                    : 'border-amber-800/60 bg-amber-950/40 hover:bg-amber-900/30'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  {/* Avatar & Role Info */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl border-2 shadow-inner relative ${
                        isPlaying
                          ? 'border-amber-300 bg-amber-700/80 scale-105 transition-transform'
                          : 'border-amber-700 bg-amber-900/60'
                      }`}
                    >
                      <span>{sample.avatar}</span>
                      {isPlaying && (
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400"></span>
                        </span>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm text-amber-200 uppercase tracking-wide">
                          {sample.roleTitle}
                        </span>
                        {sample.isIllustrative ? (
                          <span className="text-[10px] font-semibold text-amber-400 bg-amber-950/80 px-1.5 py-0.2 rounded border border-amber-700/60">
                            Lời thoại minh họa
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-950/80 px-1.5 py-0.2 rounded border border-emerald-700/60">
                            Lời kể chính
                          </span>
                        )}
                        {hasCustom && (
                          <span className="text-[10px] font-bold text-cyan-300 bg-cyan-950/80 px-1.5 py-0.2 rounded border border-cyan-700">
                            Tệp riêng
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-stone-300 font-serif-vintage italic mt-1 leading-relaxed">
                        &quot;{sample.text}&quot;
                      </p>
                    </div>
                  </div>

                  {/* Play / Upload Controls */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handlePlaySample(sample)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition-all ${
                        isPlaying
                          ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                          : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950'
                      }`}
                    >
                      {isPlaying ? (
                        <>
                          <Square className="w-3.5 h-3.5 fill-current" />
                          <span>Dừng</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Phát thử</span>
                        </>
                      )}
                    </button>

                    {/* Teacher Upload Voice Button */}
                    <label
                      className="p-2 bg-amber-900/60 hover:bg-amber-800 text-amber-300 hover:text-white rounded-xl border border-amber-700/60 cursor-pointer transition-colors"
                      title="Tải tệp âm thanh WAV/MP3 riêng cho vai này"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <input
                        type="file"
                        accept="audio/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(sample.role, sample.text, e)}
                      />
                    </label>

                    {hasCustom && (
                      <button
                        onClick={() => handleResetCustom(sample.role, sample.text)}
                        className="p-2 bg-stone-800/80 hover:bg-stone-700 text-stone-400 hover:text-white rounded-xl border border-stone-700 transition-colors"
                        title="Xóa âm thanh riêng, trở về giọng AI"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Synchronized Subtitles Display */}
        {activeSubtitle && (
          <div className="p-3 bg-amber-950/90 border-2 border-amber-400/80 rounded-xl mb-3 animate-fadeIn">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Phụ đề tiếng Việt đang phát:</span>
            </div>
            <p className="text-xs sm:text-sm text-white font-serif-vintage italic leading-relaxed">
              &quot;{activeSubtitle}&quot;
            </p>
          </div>
        )}

        {/* Footer Note */}
        <div className="flex items-center justify-between text-[11px] text-amber-300/70 border-t border-amber-800/60 pt-2.5">
          <span className="flex items-center gap-1">
            <FileAudio className="w-3.5 h-3.5 text-amber-400" />
            Giáo viên có thể tải lên tệp ghi âm giọng thật của mình và học sinh.
          </span>
          <button
            onClick={() => {
              soundService.stopCurrentVoice();
              onClose();
            }}
            className="px-4 py-1.5 bg-amber-700 hover:bg-amber-600 text-white font-bold rounded-lg text-xs"
          >
            Đóng bảng thử giọng
          </button>
        </div>
      </div>
    </div>
  );
};
