import React, { useState } from 'react';
import { BOOK_METADATA, BOOK_PAGES } from '../data/bookData';
import { BookPageData } from '../types/book';
import { soundService } from '../utils/audio';
import {
  CoverIllustration,
  Page1Illustration,
  Page2Illustration,
  Page3Illustration,
  Page4Illustration,
  Page5Illustration,
  Page6Illustration,
  Page7Illustration,
  Page8Illustration,
  EndCoverIllustration,
} from './illustrations/StoryIllustrations';
import {
  ActivityDiscovery,
  ActivityReflection,
  ActivityScenario,
  ActivityApplication,
} from './activities/InteractiveActivities';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Award,
  Maximize2,
  Minimize2,
  Sparkles,
  Info,
  Compass,
  ScrollText,
} from 'lucide-react';

interface FlipBookProps {
  currentPageIdx: number;
  onPageChange: (newPageIdx: number) => void;
  onOpenQuiz: () => void;
  onOpenCommitment: () => void;
  totalStars: number;
  onAddStar: () => void;
}

export const FlipBook: React.FC<FlipBookProps> = ({
  currentPageIdx,
  onPageChange,
  onOpenQuiz,
  onOpenCommitment,
  totalStars,
  onAddStar,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showObjectives, setShowObjectives] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev' | null>(null);

  // Hotspots for page 2
  const [foundHotspots, setFoundHotspots] = useState<string[]>([]);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);

  // Total pages: Cover (0), Pages 1-8 (1-8), End Page (9) = 10 pages total
  const totalPagesCount = 10;

  const handleNextPage = () => {
    if (currentPageIdx < totalPagesCount - 1) {
      soundService.stopCurrentVoice();
      soundService.playPageTurn();
      setFlipDirection('next');
      setTimeout(() => setFlipDirection(null), 400);
      onPageChange(currentPageIdx + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIdx > 0) {
      soundService.stopCurrentVoice();
      soundService.playPageTurn();
      setFlipDirection('prev');
      setTimeout(() => setFlipDirection(null), 400);
      onPageChange(currentPageIdx - 1);
    }
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleHotspotSelect = (spotId: string) => {
    setActiveHotspotId(spotId);
    if (!foundHotspots.includes(spotId)) {
      const next = [...foundHotspots, spotId];
      setFoundHotspots(next);
      soundService.playStarChime();
      if (next.length === 4) {
        onAddStar();
      }
    }
  };

  const renderIllustration = (key: string) => {
    switch (key) {
      case 'cover':
        return <CoverIllustration />;
      case 'page1':
        return <Page1Illustration />;
      case 'page2':
        return (
          <Page2Illustration
            onClickHotspot={handleHotspotSelect}
            activeHotspotId={activeHotspotId}
            foundHotspots={foundHotspots}
          />
        );
      case 'page3':
        return <Page3Illustration />;
      case 'page4':
        return <Page4Illustration />;
      case 'page5':
        return <Page5Illustration />;
      case 'page6':
        return <Page6Illustration />;
      case 'page7':
        return <Page7Illustration />;
      case 'page8':
        return <Page8Illustration />;
      case 'end':
        return <EndCoverIllustration />;
      default:
        return <CoverIllustration />;
    }
  };

  const currentPageData: BookPageData | undefined =
    currentPageIdx >= 1 && currentPageIdx <= 8 ? BOOK_PAGES[currentPageIdx - 1] : undefined;

  return (
    <div className="flex-1 flex flex-col justify-between p-2 sm:p-4 max-w-7xl mx-auto w-full">
      {/* Top Utility Bar */}
      <div className="flex items-center justify-between gap-2 mb-2 px-1">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-950/70 text-amber-200 border border-amber-700/60 rounded-full text-xs font-semibold shadow-inner">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Trường TH Đỗ Ngọc Du • Lớp 3A6</span>
            <span className="sm:hidden">Lớp 3A6</span>
          </div>

          <button
            onClick={() => setShowObjectives(!showObjectives)}
            className="flex items-center gap-1 px-2.5 py-1 bg-amber-900/60 hover:bg-amber-800 text-amber-200 rounded-full text-xs border border-amber-700/50 transition-colors"
            title="Mục tiêu bài học Đạo đức lớp 3"
          >
            <Info className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden md:inline">Mục tiêu bài học</span>
          </button>
        </div>

        {/* Stars count & fullscreen */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-3 py-1 bg-amber-950/80 border border-amber-600/70 rounded-full text-xs font-bold text-amber-300 shadow">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            <span>{totalStars} Sao Đạo Đức</span>
          </div>

          <button
            onClick={handleToggleFullscreen}
            className="p-1.5 bg-amber-900/60 hover:bg-amber-800 text-amber-200 rounded-lg border border-amber-700/50 transition-colors"
            title={isFullscreen ? 'Thoát toàn màn hình' : 'Toàn màn hình máy chiếu'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Objectives Popover / Banner */}
      {showObjectives && (
        <div className="mb-3 p-3 bg-amber-900/95 border-2 border-amber-400/80 rounded-xl text-amber-100 text-xs shadow-xl backdrop-blur-md animate-fadeIn">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="font-bold text-amber-300 uppercase tracking-wider block mb-1">
                🎯 Mục tiêu bài học (Đạo đức lớp 3 - Chủ đề: Ham học hỏi):
              </span>
              <p className="leading-relaxed">{BOOK_METADATA.objective}</p>
              <div className="mt-1 text-[11px] text-amber-300">
                Giáo viên: <strong>{BOOK_METADATA.teacher}</strong> • Lớp <strong>{BOOK_METADATA.classroom}</strong> •{' '}
                {BOOK_METADATA.school}
              </div>
            </div>
            <button
              onClick={() => setShowObjectives(false)}
              className="text-amber-400 hover:text-white font-bold p-1"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* 3D Book Container */}
      <div className="book-perspective flex-1 flex items-center justify-center my-1 min-h-[460px] md:min-h-[540px]">
        <div
          className={`relative w-full max-w-5xl aspect-[16/10] max-h-[75vh] rounded-2xl book-shadow overflow-hidden flex flex-col md:flex-row transition-transform duration-500 ${
            flipDirection === 'next'
              ? 'scale-[0.99] -rotate-y-1'
              : flipDirection === 'prev'
              ? 'scale-[0.99] rotate-y-1'
              : ''
          }`}
          style={{
            background: '#2b1b12',
          }}
        >
          {/* Cover Page (Page 0) */}
          {currentPageIdx === 0 && (
            <div className="w-full h-full flex flex-col md:flex-row bg-[#fbf5e6] paper-parchment relative">
              {/* Left Side: Art & Cover Visual */}
              <div className="w-full md:w-1/2 h-56 md:h-full relative overflow-hidden border-b md:border-b-0 md:border-r border-amber-300">
                <CoverIllustration />
                {/* Decorative title badge */}
                <div className="absolute top-3 left-3 px-3 py-1 bg-red-800/90 text-amber-200 text-[11px] font-bold uppercase tracking-widest rounded shadow border border-amber-400/50">
                  {BOOK_METADATA.subject}
                </div>
              </div>

              {/* Right Side: Title details & Open Book button */}
              <div className="w-full md:w-1/2 flex-1 p-5 md:p-8 flex flex-col justify-between paper-crease-right">
                <div>
                  <div className="inline-block px-3 py-1 bg-amber-200/80 text-amber-900 text-xs font-bold uppercase rounded-full mb-2">
                    {BOOK_METADATA.topic}
                  </div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-serif-vintage text-amber-950 tracking-tight leading-tight mb-2">
                    {BOOK_METADATA.title}
                  </h1>
                  <h2 className="text-sm md:text-base text-amber-800 font-serif-vintage italic mb-4 font-semibold">
                    {BOOK_METADATA.subtitle}
                  </h2>

                  <div className="space-y-1 text-xs text-stone-700 bg-amber-100/60 p-3 rounded-xl border border-amber-300/60 mb-4">
                    <p>
                      <strong>Giáo viên:</strong> {BOOK_METADATA.teacher}
                    </p>
                    <p>
                      <strong>Lớp:</strong> {BOOK_METADATA.classroom} - {BOOK_METADATA.school}
                    </p>
                    <p className="text-[11px] text-stone-600 italic pt-1">
                      Sách lật truyện tranh hoạt hình 3D tương tác - Âm thanh lật trang & Giọng đọc truyền cảm.
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <button
                    onClick={handleNextPage}
                    className="w-full py-3 bg-gradient-to-r from-red-700 via-amber-600 to-red-700 hover:from-red-800 hover:to-amber-700 text-white font-bold text-sm md:text-base rounded-xl shadow-lg flex items-center justify-center gap-2 transform active:scale-98 transition-all"
                  >
                    <BookOpen className="w-5 h-5 text-amber-300" />
                    <span>Mở Sách Khám Phá Câu Chuyện</span>
                    <ChevronRight className="w-5 h-5 text-amber-300" />
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={onOpenQuiz}
                      className="py-2 px-3 bg-amber-200/80 hover:bg-amber-300 text-amber-950 text-xs font-bold rounded-lg border border-amber-400 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Sparkles className="w-4 h-4 text-amber-700" />
                      Trò chơi Ngôi sao
                    </button>
                    <button
                      onClick={onOpenCommitment}
                      className="py-2 px-3 bg-amber-200/80 hover:bg-amber-300 text-amber-950 text-xs font-bold rounded-lg border border-amber-400 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Award className="w-4 h-4 text-amber-700" />
                      Phiếu Cam Kết 3A6
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Story Pages 1-8 */}
          {currentPageIdx >= 1 && currentPageIdx <= 8 && currentPageData && (
            <div className="w-full h-full flex flex-col md:flex-row bg-[#fdfbf6] paper-parchment relative">
              {/* Left Page: 3D Illustration & Hotspots */}
              <div className="w-full md:w-1/2 h-56 sm:h-64 md:h-full relative overflow-hidden border-b md:border-b-0 md:border-r border-amber-300 paper-crease-left">
                {renderIllustration(currentPageData.illustrationKey)}

                {/* Page Number Stamp on left page */}
                <div className="absolute bottom-2 left-3 text-[10px] text-amber-900/60 font-serif-vintage font-bold">
                  Trang {currentPageData.pageNumber} • Đạo đức 3
                </div>

                {/* Source text badge if preserved original text */}
                {currentPageData.isPreservedSource && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 bg-amber-900/80 text-amber-200 rounded text-[10px] font-semibold shadow">
                    <ScrollText className="w-3 h-3 text-amber-400" />
                    <span>Văn bản nguồn chuẩn</span>
                  </div>
                )}
              </div>

              {/* Book Spine Center Shadow (Thước gáy sách 3D) */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-8 -ml-4 spine-shadow pointer-events-none z-10" />

              {/* Right Page: Text, Dialogue, and Educational Interactive Activity */}
              <div className="w-full md:w-1/2 flex-1 p-4 sm:p-5 md:p-6 flex flex-col justify-between overflow-y-auto paper-crease-right">
                <div>
                  {/* Chapter Header */}
                  <div className="flex items-center justify-between border-b border-amber-200 pb-2 mb-3">
                    <div>
                      <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">
                        Đạo đức lớp 3 - Bài học {currentPageData.pageNumber}
                      </span>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold font-serif-vintage text-amber-950 leading-snug">
                        {currentPageData.title}
                      </h3>
                    </div>
                    <span className="w-7 h-7 rounded-full bg-amber-200 text-amber-950 font-serif-vintage font-bold flex items-center justify-center text-xs shrink-0 shadow-inner">
                      {currentPageData.pageNumber}
                    </span>
                  </div>

                  {/* Main Story Paragraph */}
                  <div className="mb-4">
                    <p
                      className={`text-xs sm:text-sm leading-relaxed text-stone-900 font-serif-vintage ${
                        currentPageData.isPreservedSource
                          ? 'border-l-4 border-amber-600 pl-3 py-1 bg-amber-100/50 rounded-r'
                          : ''
                      }`}
                    >
                      {currentPageData.paragraphText}
                    </p>
                  </div>

                  {/* Interactive Activity Section (if any on this page) */}
                  {currentPageData.activity && (
                    <div className="my-3">
                      {currentPageData.activity.type === 'discovery' && (
                        <ActivityDiscovery
                          activity={currentPageData.activity}
                          foundHotspots={foundHotspots}
                          activeHotspotId={activeHotspotId}
                          onSelectHotspot={handleHotspotSelect}
                          onCloseDetail={() => setActiveHotspotId(null)}
                        />
                      )}
                      {currentPageData.activity.type === 'reflection' && (
                        <ActivityReflection
                          activity={currentPageData.activity}
                          onAnswerAward={() => onAddStar()}
                        />
                      )}
                      {currentPageData.activity.type === 'scenario' && (
                        <ActivityScenario
                          activity={currentPageData.activity}
                          onAnswerAward={() => onAddStar()}
                        />
                      )}
                      {currentPageData.activity.type === 'application' && (
                        <ActivityApplication
                          activity={currentPageData.activity}
                          onCommitmentChange={() => onAddStar()}
                        />
                      )}
                    </div>
                  )}
                </div>

                {/* Moral Lesson Footer */}
                <div className="mt-3 pt-2.5 border-t border-amber-200/80 flex items-center justify-between text-xs text-amber-900 bg-amber-50/70 p-2 rounded-lg">
                  <div className="flex items-center gap-1.5 font-medium text-[11px] sm:text-xs">
                    <span className="text-base">💡</span>
                    <span>
                      <strong>Bài học:</strong> {currentPageData.moralLesson}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* End Page (Page 9) */}
          {currentPageIdx === 9 && (
            <div className="w-full h-full flex flex-col md:flex-row bg-[#2b1b12] text-amber-100 relative paper-parchment">
              <div className="w-full md:w-1/2 h-56 md:h-full relative overflow-hidden border-b md:border-b-0 md:border-r border-amber-800">
                <EndCoverIllustration />
              </div>

              {/* Summary & Quiz/Commitment actions */}
              <div className="w-full md:w-1/2 flex-1 p-5 md:p-8 flex flex-col justify-between bg-gradient-to-b from-[#3a2216] to-[#25150d] text-amber-100">
                <div>
                  <div className="inline-block px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold uppercase rounded-full border border-amber-500/40 mb-2">
                    Tổng kết bài học
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold font-serif-vintage text-amber-200 mb-2">
                    GƯƠNG SÁNG TRẠNG NGUYÊN NGUYỄN HIỀN
                  </h2>

                  <div className="text-xs text-stone-200 space-y-2 bg-black/30 p-3.5 rounded-xl border border-amber-700/50 mb-4 leading-relaxed">
                    <p className="italic text-amber-200">
                      &quot;Dù hoàn cảnh có khó khăn đến đâu, chỉ cần có ước mơ, biết chăm chỉ học tập và không ngừng cố gắng,
                      mỗi người đều có thể tiến bộ và đạt được những điều tốt đẹp.&quot;
                    </p>
                    <p className="pt-1 text-[11px] text-amber-300/90">
                      Lời chúc từ <strong>Cô giáo Lã Thị Hồng Minh</strong> gửi tới tất cả các em học sinh thân yêu lớp 3A6!
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={onOpenQuiz}
                    className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-bold text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 transform active:scale-98 transition-all"
                  >
                    <Sparkles className="w-5 h-5 fill-stone-950" />
                    <span>Chơi Trò Chơi: NGÔI SAO HAM HỌC</span>
                  </button>

                  <button
                    onClick={onOpenCommitment}
                    className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow flex items-center justify-center gap-2 transition-all"
                  >
                    <Award className="w-4 h-4 text-emerald-300" />
                    <span>Lập Phiếu Cam Kết & In Huy Hiệu 3A6</span>
                  </button>

                  <button
                    onClick={() => onPageChange(0)}
                    className="w-full py-2 text-xs text-amber-300 hover:text-white border border-amber-700/60 rounded-lg hover:bg-amber-900/40 transition-colors"
                  >
                    Trở về Bìa Sách Đầu Tiên
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Page Flipping Controls & Progress Slider */}
      <div className="flex items-center justify-between gap-2 mt-2 px-1">
        {/* Previous Button */}
        <button
          onClick={handlePrevPage}
          disabled={currentPageIdx === 0}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold shadow-md transition-all ${
            currentPageIdx === 0
              ? 'bg-amber-950/40 text-amber-700/50 cursor-not-allowed border border-amber-900/30'
              : 'bg-amber-900/80 hover:bg-amber-800 text-amber-200 border border-amber-600/70 active:scale-95'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Trang trước</span>
        </button>

        {/* Page Slider & Indicator */}
        <div className="flex-1 max-w-md mx-2 flex items-center gap-2">
          <input
            type="range"
            min={0}
            max={totalPagesCount - 1}
            value={currentPageIdx}
            onChange={(e) => {
              soundService.stopCurrentVoice();
              soundService.playPageTurn();
              onPageChange(Number(e.target.value));
            }}
            className="w-full accent-amber-500 h-1.5 bg-amber-950/80 rounded-lg cursor-pointer"
          />
          <span className="text-xs font-bold text-amber-300 font-serif-vintage whitespace-nowrap min-w-[55px] text-right">
            {currentPageIdx === 0 ? 'Bìa sách' : currentPageIdx === 9 ? 'Kết thúc' : `${currentPageIdx}/8`}
          </span>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNextPage}
          disabled={currentPageIdx === totalPagesCount - 1}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold shadow-md transition-all ${
            currentPageIdx === totalPagesCount - 1
              ? 'bg-amber-950/40 text-amber-700/50 cursor-not-allowed border border-amber-900/30'
              : 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white border border-amber-500 active:scale-95'
          }`}
        >
          <span className="hidden sm:inline">Trang sau</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
