import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BookPageData, DialogueLine } from '../types/book';
import { soundService } from '../utils/audio';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, BookOpen, UserCheck } from 'lucide-react';

interface AudioPlayerBarProps {
  currentPage: BookPageData;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenAuditionModal?: () => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  currentPage,
  isMuted,
  onToggleMute,
  onOpenAuditionModal,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [readingSpeed, setReadingSpeed] = useState<number>(1.0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isPlayingRef = useRef(false);
  isPlayingRef.current = isPlaying;

  const currentDialogue: DialogueLine | undefined = currentPage.dialogues[currentLineIndex];

  // Stop previous audio whenever user turns the page
  useEffect(() => {
    soundService.stopCurrentVoice();
    setIsPlaying(false);
    setCurrentLineIndex(0);
    setErrorMessage(null);
  }, [currentPage.pageNumber]);

  const playLineAtIndex = useCallback(
    (index: number) => {
      if (index >= currentPage.dialogues.length) {
        setIsPlaying(false);
        setCurrentLineIndex(0);
        return;
      }

      setCurrentLineIndex(index);
      const line = currentPage.dialogues[index];

      soundService.playVoiceLine({
        text: line.text,
        role: line.role,
        speed: readingSpeed,
        onStart: () => {
          setIsPlaying(true);
          setErrorMessage(null);
        },
        onEnd: () => {
          if (isPlayingRef.current) {
            setTimeout(() => {
              playLineAtIndex(index + 1);
            }, 450);
          }
        },
        onError: (err) => {
          setErrorMessage(err);
          setIsPlaying(false);
        },
      });
    },
    [currentPage.dialogues, readingSpeed]
  );

  const handlePlayTeacherOnly = () => {
    if (isMuted) onToggleMute();
    soundService.stopCurrentVoice();

    // Find first narrator line or read paragraphText
    const teacherLine = currentPage.dialogues.find((d) => d.role === 'narrator');
    const textToRead = teacherLine?.text || currentPage.paragraphText;

    setCurrentLineIndex(0);
    setIsPlaying(true);
    soundService.playVoiceLine({
      text: textToRead,
      role: 'narrator',
      speed: readingSpeed,
      onStart: () => setIsPlaying(true),
      onEnd: () => setIsPlaying(false),
      onError: (err) => {
        setErrorMessage(err);
        setIsPlaying(false);
      },
    });
  };

  const handlePlayToggle = () => {
    if (isMuted) {
      onToggleMute();
      return;
    }

    if (isPlaying) {
      soundService.stopCurrentVoice();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      playLineAtIndex(currentLineIndex);
    }
  };

  const handleReplay = () => {
    soundService.stopCurrentVoice();
    setIsPlaying(true);
    playLineAtIndex(0);
  };

  const handleChangeSpeed = (speed: number) => {
    setReadingSpeed(speed);
    if (isPlaying) {
      soundService.stopCurrentVoice();
      setTimeout(() => playLineAtIndex(currentLineIndex), 100);
    }
  };

  return (
    <div className="bg-[#241711]/95 text-amber-100 border-t-2 border-amber-600/70 p-2.5 md:p-3 shadow-2xl backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Active speaker info & synchronized subtitles */}
        <div className="flex items-center gap-3 w-full md:w-3/5">
          {/* Character Avatar with speaking glow */}
          <div
            className={`w-11 h-11 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center shrink-0 text-xl shadow-inner relative transition-transform ${
              isPlaying
                ? 'border-amber-400 bg-amber-700/80 scale-105 ring-2 ring-amber-400/50'
                : 'border-amber-800 bg-amber-950/80'
            }`}
          >
            <span>{currentDialogue?.avatar || '👩‍🏫'}</span>
            {isPlaying && (
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-400"></span>
              </span>
            )}
          </div>

          {/* Subtitle & Role details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                {currentDialogue?.speakerName || 'Cô giáo Lã Thị Hồng Minh'}
              </span>

              {currentDialogue?.isCreativeDialogue ? (
                <span className="text-[10px] text-amber-300 bg-amber-950/80 px-1.5 py-0.2 rounded border border-amber-800 font-medium">
                  Lời thoại minh họa
                </span>
              ) : (
                <span className="text-[10px] text-emerald-300 bg-emerald-950/80 px-1.5 py-0.2 rounded border border-emerald-800 font-medium">
                  Lời kể chính
                </span>
              )}

              <span className="text-[10px] text-amber-200/70 bg-stone-900/60 px-1.5 py-0.2 rounded">
                {currentLineIndex + 1}/{currentPage.dialogues.length}
              </span>
            </div>

            {/* Synchronized Vietnamese Subtitles */}
            <p className="text-xs md:text-sm text-stone-100 italic truncate font-serif-vintage mt-0.5">
              &quot;{currentDialogue?.text || currentPage.paragraphText}&quot;
            </p>
          </div>
        </div>

        {/* Player controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 w-full md:w-auto justify-end">
          {/* Quick button: Nghe cô kể */}
          <button
            onClick={handlePlayTeacherOnly}
            className="px-2.5 py-1.5 bg-amber-900/70 hover:bg-amber-800 text-amber-200 hover:text-white rounded-xl border border-amber-700/60 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
            title="Chỉ nghe cô giáo kể câu chuyện này"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Nghe cô kể</span>
          </button>

          {/* Speed Selector */}
          <div className="flex items-center bg-amber-950/80 border border-amber-700/60 rounded-lg p-0.5 text-[11px]">
            <button
              onClick={() => handleChangeSpeed(0.85)}
              className={`px-1.5 py-1 rounded transition-colors ${
                readingSpeed === 0.85 ? 'bg-amber-600 text-white font-bold' : 'text-amber-300 hover:text-white'
              }`}
              title="Đọc chậm cho học sinh lớp 3 rèn đọc"
            >
              0.8x
            </button>
            <button
              onClick={() => handleChangeSpeed(1.0)}
              className={`px-1.5 py-1 rounded transition-colors ${
                readingSpeed === 1.0 ? 'bg-amber-600 text-white font-bold' : 'text-amber-300 hover:text-white'
              }`}
              title="Tốc độ chuẩn"
            >
              1.0x
            </button>
            <button
              onClick={() => handleChangeSpeed(1.15)}
              className={`px-1.5 py-1 rounded transition-colors ${
                readingSpeed === 1.15 ? 'bg-amber-600 text-white font-bold' : 'text-amber-300 hover:text-white'
              }`}
              title="Đọc nhanh"
            >
              1.2x
            </button>
          </div>

          {/* Replay */}
          <button
            onClick={handleReplay}
            className="p-2 bg-amber-900/60 hover:bg-amber-800 text-amber-200 hover:text-white rounded-xl border border-amber-700/60 transition-all shadow-sm"
            title="Nghe lại trang này từ đầu"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Main Play / Pause Button */}
          <button
            onClick={handlePlayToggle}
            className={`px-3.5 py-2 font-bold rounded-xl shadow-lg flex items-center gap-1.5 transition-all transform active:scale-95 ${
              isPlaying
                ? 'bg-rose-600 hover:bg-rose-700 text-white'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950'
            }`}
            title={isPlaying ? 'Dừng đọc' : 'Nghe đọc toàn trang'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span className="text-xs">Dừng</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span className="text-xs">Nghe đọc</span>
              </>
            )}
          </button>

          {/* Audition Testing Modal trigger button */}
          {onOpenAuditionModal && (
            <button
              onClick={onOpenAuditionModal}
              className="p-2 bg-amber-900/60 hover:bg-amber-800 text-amber-200 hover:text-white rounded-xl border border-amber-700/60 transition-colors"
              title="Bảng kiểm tra giọng nhân vật (4 vai)"
            >
              <UserCheck className="w-4 h-4 text-amber-300" />
            </button>
          )}

          {/* Mute / Unmute */}
          <button
            onClick={onToggleMute}
            className={`p-2 rounded-xl border transition-all ${
              isMuted
                ? 'bg-rose-900/60 border-rose-500 text-rose-300'
                : 'bg-amber-900/60 border-amber-700/60 text-amber-200 hover:text-white'
            }`}
            title={isMuted ? 'Bật âm thanh' : 'Tắt tiếng'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="max-w-6xl mx-auto mt-1 text-[11px] text-amber-300/90 flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
