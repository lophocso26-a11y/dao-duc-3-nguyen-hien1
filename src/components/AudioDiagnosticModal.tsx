import React, { useState } from 'react';
import { soundService, TTSDiagnosticResult } from '../utils/audio';
import {
  Volume2,
  Play,
  Square,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  X,
  Activity,
  Layers,
  Music,
  Upload,
} from 'lucide-react';

interface AudioDiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AudioDiagnosticModal: React.FC<AudioDiagnosticModalProps> = ({ isOpen, onClose }) => {
  const [testText, setTestText] = useState(
    'Xin chào các em học sinh lớp 3A6! Hôm nay, cô và các em sẽ cùng khám phá câu chuyện Cậu học trò nghèo ham học. Các em đã sẵn sàng chưa nào?'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [diagnostic, setDiagnostic] = useState<TTSDiagnosticResult | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bgmEnabled, setBgmEnabled] = useState(soundService.getBgmEnabled());

  if (!isOpen) return null;

  const handleGenerateTeacherVoice = async () => {
    setIsLoading(true);
    soundService.stopCurrentVoice();
    setIsPlaying(false);

    const result = await soundService.testTeacherAudio(testText);
    setDiagnostic(result);
    setIsLoading(false);

    if (result.success) {
      soundService.playStarChime();
    }
  };

  const handlePlayAudio = () => {
    if (!diagnostic?.audioUrl) return;

    if (isPlaying) {
      soundService.stopCurrentVoice();
      setIsPlaying(false);
      return;
    }

    soundService.stopCurrentVoice();
    const audio = new Audio(diagnostic.audioUrl);
    setIsPlaying(true);

    audio.onended = () => {
      setIsPlaying(false);
    };
    audio.onerror = () => {
      setIsPlaying(false);
    };

    audio.play().catch((err) => {
      console.warn('Audio play error:', err);
      setIsPlaying(false);
    });
  };

  const handleToggleBgm = () => {
    const next = !bgmEnabled;
    setBgmEnabled(next);
    soundService.setBgmEnabled(next);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-gradient-to-b from-[#281810] via-[#1e110a] to-[#140b07] border-2 border-amber-500 rounded-2xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl text-amber-100 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-800/80 pb-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl text-stone-950 font-bold shadow">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg font-serif-vintage text-amber-200">
                KIỂM TRA ÂM THANH AI (CHẾ ĐỘ GIÁO VIÊN)
              </h3>
              <p className="text-[11px] text-amber-300/80">
                Kiểm định luồng âm thanh PCM/WAV 24kHz từ Gemini TTS và loại trừ méo tiếng
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

        {/* Text Area to Test */}
        <div className="mb-3">
          <label className="block text-xs font-bold text-amber-300 mb-1">
            Văn bản thử giọng Cô giáo (Tiếng Việt):
          </label>
          <textarea
            rows={2}
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            className="w-full text-xs p-2.5 rounded-xl border border-amber-700/80 bg-amber-950/60 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium leading-relaxed"
          />
        </div>

        {/* Main Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <button
            onClick={handleGenerateTeacherVoice}
            disabled={isLoading}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all ${
              isLoading
                ? 'bg-amber-800 text-stone-300 cursor-wait'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{isLoading ? 'Đang gọi Gemini TTS...' : 'TẠO GIỌNG CÔ GIÁO'}</span>
          </button>

          <button
            onClick={handlePlayAudio}
            disabled={!diagnostic?.audioUrl}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all ${
              !diagnostic?.audioUrl
                ? 'bg-amber-950/40 text-stone-500 border border-amber-900/30 cursor-not-allowed'
                : isPlaying
                ? 'bg-rose-600 hover:bg-rose-700 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {isPlaying ? (
              <>
                <Square className="w-4 h-4 fill-current" />
                <span>DỪNG PHÁT</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>NGHE THỬ</span>
              </>
            )}
          </button>

          {/* Toggle Background Sound Effects */}
          <button
            onClick={handleToggleBgm}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              bgmEnabled
                ? 'border-amber-700 bg-amber-950/60 text-amber-300'
                : 'border-stone-700 bg-stone-900 text-stone-400'
            }`}
            title="Bật/Tắt hiệu ứng lật trang để thử giọng cô giáo rõ ràng hơn"
          >
            <Music className="w-3.5 h-3.5" />
            <span>Hiệu ứng âm thanh: {bgmEnabled ? 'BẬT' : 'TẮT'}</span>
          </button>
        </div>

        {/* Diagnostic Results Grid */}
        <div className="bg-[#180e08] border border-amber-800/80 rounded-xl p-3.5 mb-3 flex-1 overflow-y-auto">
          <div className="flex items-center gap-2 mb-2.5 border-b border-amber-900 pb-2">
            <Layers className="w-4 h-4 text-amber-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Thông số kỹ thuật âm thanh thực tế:
            </h4>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs mb-3">
            <div className="p-2 bg-amber-950/60 rounded-lg border border-amber-900/60">
              <span className="text-[10px] text-stone-400 block">Tên Model:</span>
              <span className="font-bold text-amber-200">
                {diagnostic?.model || 'gemini-3.8-flash-tts'}
              </span>
            </div>

            <div className="p-2 bg-amber-950/60 rounded-lg border border-amber-900/60">
              <span className="text-[10px] text-stone-400 block">MIME Type:</span>
              <span className="font-bold text-amber-200">
                {diagnostic?.mimeType || 'Chưa nhận diện'}
              </span>
            </div>

            <div className="p-2 bg-amber-950/60 rounded-lg border border-amber-900/60">
              <span className="text-[10px] text-stone-400 block">Sample Rate:</span>
              <span className="font-bold text-emerald-400">
                {diagnostic?.sampleRate ? `${diagnostic.sampleRate.toLocaleString()} Hz` : '24,000 Hz'}
              </span>
            </div>

            <div className="p-2 bg-amber-950/60 rounded-lg border border-amber-900/60">
              <span className="text-[10px] text-stone-400 block">Kích thước dữ liệu:</span>
              <span className="font-bold text-amber-200">
                {diagnostic?.dataSize
                  ? `${Math.round(diagnostic.dataSize / 1024)} KB (${diagnostic.dataSize} bytes)`
                  : '0 bytes'}
              </span>
            </div>

            <div className="p-2 bg-amber-950/60 rounded-lg border border-amber-900/60">
              <span className="text-[10px] text-stone-400 block">Thời lượng âm thanh:</span>
              <span className="font-bold text-amber-200">
                {diagnostic?.durationSec ? `${diagnostic.durationSec} giây` : '0 giây'}
              </span>
            </div>

            <div className="p-2 bg-amber-950/60 rounded-lg border border-amber-900/60">
              <span className="text-[10px] text-stone-400 block">Trạng thái giải mã:</span>
              <span
                className={`font-bold ${
                  diagnostic?.success ? 'text-emerald-400' : 'text-stone-400'
                }`}
              >
                {diagnostic?.decodeStatus || 'Chờ tín hiệu'}
              </span>
            </div>
          </div>

          {/* Diagnostic Message Alert */}
          {diagnostic && (
            <div
              className={`p-3 rounded-xl border text-xs leading-relaxed ${
                diagnostic.success
                  ? 'bg-emerald-950/70 border-emerald-500/80 text-emerald-200'
                  : 'bg-amber-950/80 border-amber-500/80 text-amber-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold mb-1">
                {diagnostic.success ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Tạo giọng thành công! Không còn méo tiếng hoặc âm thanh điện tử.</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Thông báo trạng thái Gemini TTS:</span>
                  </>
                )}
              </div>
              <p>
                {diagnostic.success
                  ? 'Dữ liệu âm thanh đã được đóng gói chuẩn PCM 16-bit 24kHz Mono với header WAV hợp lệ. Bấm "NGHE THỬ" để nghe phát tiếng Việt rõ ràng.'
                  : diagnostic.errorMessage}
              </p>
            </div>
          )}
        </div>

        {/* Footer info & close */}
        <div className="flex items-center justify-between text-[11px] text-stone-400 border-t border-amber-900/80 pt-2.5">
          <span>Cam kết: 100% tiếng Việt tự nhiên, không dùng giọng tiếng Anh đọc tiếng Việt.</span>
          <button
            onClick={() => {
              soundService.stopCurrentVoice();
              onClose();
            }}
            className="px-4 py-1.5 bg-amber-700 hover:bg-amber-600 text-white font-bold rounded-lg text-xs"
          >
            Đóng bảng kiểm tra
          </button>
        </div>
      </div>
    </div>
  );
};
