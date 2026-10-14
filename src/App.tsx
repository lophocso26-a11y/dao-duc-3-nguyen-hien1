import React, { useState, useEffect } from 'react';
import { FlipBook } from './components/FlipBook';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { MiniGameQuiz } from './components/MiniGameQuiz';
import { CommitmentCard } from './components/CommitmentCard';
import { TableOfContentsModal } from './components/TableOfContentsModal';
import { VoiceAuditionModal } from './components/VoiceAuditionModal';
import { AudioDiagnosticModal } from './components/AudioDiagnosticModal';
import { BOOK_METADATA, BOOK_PAGES } from './data/bookData';
import { soundService } from './utils/audio';
import { BookOpen, Trophy, Award, Menu, HelpCircle, Volume2, VolumeX, Sparkles, GraduationCap, Mic, Activity } from 'lucide-react';

export default function App() {
  const [currentPageIdx, setCurrentPageIdx] = useState<number>(() => {
    const saved = localStorage.getItem('hien_current_page');
    return saved ? Math.min(Math.max(Number(saved), 0), 9) : 0;
  });

  const [activeView, setActiveView] = useState<'book' | 'quiz' | 'commitment'>('book');
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isAuditionOpen, setIsAuditionOpen] = useState(false);
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const [totalStars, setTotalStars] = useState<number>(() => {
    const saved = localStorage.getItem('hien_stars_total');
    return saved ? Number(saved) : 3;
  });

  // Save current page
  useEffect(() => {
    localStorage.setItem('hien_current_page', currentPageIdx.toString());
  }, [currentPageIdx]);

  // Save stars
  const handleAddStar = () => {
    const next = totalStars + 1;
    setTotalStars(next);
    localStorage.setItem('hien_stars_total', next.toString());
  };

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundService.setMuted(next);
  };

  // Get active page data for audio player
  const currentStoryPage =
    currentPageIdx >= 1 && currentPageIdx <= 8
      ? BOOK_PAGES[currentPageIdx - 1]
      : {
          pageNumber: currentPageIdx,
          title: BOOK_METADATA.title,
          subheading: BOOK_METADATA.subtitle,
          paragraphText: `${BOOK_METADATA.title} - ${BOOK_METADATA.subtitle}. Môn Đạo đức lớp 3, chủ đề Ham học hỏi. Giáo viên: ${BOOK_METADATA.teacher}, ${BOOK_METADATA.classroom}, ${BOOK_METADATA.school}.`,
          dialogues: [
            {
              id: 'c-1',
              role: 'narrator' as const,
              speakerName: 'Cô giáo Hồng Minh',
              text: `Chào mừng các em học sinh lớp ${BOOK_METADATA.classroom} đến với học liệu số sách lật tương tác: ${BOOK_METADATA.title}!`,
              avatar: '👩‍🏫',
            },
          ],
          illustrationKey: 'cover',
          moralLesson: BOOK_METADATA.objective,
        };

  return (
    <div className="min-h-screen bg-[#241711] text-amber-50 flex flex-col justify-between selection:bg-amber-600 selection:text-white">
      {/* Top Main Navigation Bar */}
      <header className="bg-[#1c110b] border-b border-amber-800/80 px-3 py-2 md:px-6 shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Logo & School Info */}
          <div
            onClick={() => {
              setActiveView('book');
              setCurrentPageIdx(0);
            }}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-950 font-bold shadow-md group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs md:text-sm font-extrabold font-serif-vintage tracking-wide text-amber-200 group-hover:text-amber-100 transition-colors">
                  CẬU HỌC TRÒ NGHÈO HAM HỌC
                </span>
                <span className="hidden sm:inline px-1.5 py-0.2 bg-red-900/80 text-amber-200 border border-red-700 rounded text-[10px] font-bold">
                  ĐẠO ĐỨC 3
                </span>
              </div>
              <p className="text-[10px] text-amber-300/70 truncate hidden md:block">
                Hành trình Trạng nguyên Nguyễn Hiền • GV: {BOOK_METADATA.teacher} • {BOOK_METADATA.classroom} - {BOOK_METADATA.school}
              </p>
            </div>
          </div>

          {/* Navigation Action Buttons */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveView('book')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeView === 'book'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-amber-200 hover:bg-amber-900/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Sách lật 3D</span>
            </button>

            <button
              onClick={() => setActiveView('quiz')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeView === 'quiz'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-amber-200 hover:bg-amber-900/60'
              }`}
            >
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span className="hidden sm:inline">Ngôi sao Ham học</span>
            </button>

            <button
              onClick={() => setActiveView('commitment')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeView === 'commitment'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-amber-200 hover:bg-amber-900/60'
              }`}
            >
              <Award className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Phiếu cam kết</span>
            </button>

            {/* Audition Button: Thử giọng 4 vai */}
            <button
              onClick={() => setIsAuditionOpen(true)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all bg-gradient-to-r from-amber-700 to-amber-800 text-amber-100 hover:from-amber-600 hover:to-amber-700 border border-amber-600/60 shadow-sm"
              title="Kiểm tra giọng 4 vai nhân vật (Gemini TTS)"
            >
              <Mic className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden md:inline">Thử giọng 4 vai</span>
            </button>

            {/* AI Audio Diagnostic Button */}
            <button
              onClick={() => setIsDiagnosticOpen(true)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all bg-gradient-to-r from-red-900 to-amber-950 text-amber-200 hover:text-white border border-amber-700/80 shadow-sm"
              title="Bảng kiểm tra âm thanh AI PCM/WAV (Chế độ giáo viên)"
            >
              <Activity className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden lg:inline">Kiểm tra Âm thanh AI</span>
            </button>

            {/* TOC Drawer Button */}
            <button
              onClick={() => setIsTocOpen(true)}
              className="p-1.5 text-amber-300 hover:text-white hover:bg-amber-900/60 rounded-xl transition-colors border border-amber-800"
              title="Mục lục các trang"
            >
              <Menu className="w-4 h-4" />
            </button>

            {/* Help Guide */}
            <button
              onClick={() => setIsHelpOpen(true)}
              className="p-1.5 text-amber-300 hover:text-white hover:bg-amber-900/60 rounded-xl transition-colors border border-amber-800"
              title="Hướng dẫn sử dụng"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* Global Mute toggle */}
            <button
              onClick={handleToggleMute}
              className={`p-1.5 rounded-xl border transition-colors ${
                isMuted
                  ? 'bg-rose-950/80 border-rose-600 text-rose-300'
                  : 'border-amber-800 text-amber-300 hover:bg-amber-900/60'
              }`}
              title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main View Area */}
      <main className="flex-1 flex flex-col justify-center py-2 px-1 sm:px-3">
        {activeView === 'book' && (
          <FlipBook
            currentPageIdx={currentPageIdx}
            onPageChange={(newIdx) => setCurrentPageIdx(newIdx)}
            onOpenQuiz={() => setActiveView('quiz')}
            onOpenCommitment={() => setActiveView('commitment')}
            totalStars={totalStars}
            onAddStar={handleAddStar}
          />
        )}

        {activeView === 'quiz' && (
          <div className="py-4">
            <MiniGameQuiz
              onBackToBook={() => setActiveView('book')}
              onOpenCommitment={() => setActiveView('commitment')}
            />
          </div>
        )}

        {activeView === 'commitment' && (
          <div className="py-4">
            <CommitmentCard onBack={() => setActiveView('book')} />
          </div>
        )}
      </main>

      {/* Audio Player Bar (Active whenever reading the book) */}
      {activeView === 'book' && (
        <AudioPlayerBar
          currentPage={currentStoryPage}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          onOpenAuditionModal={() => setIsAuditionOpen(true)}
        />
      )}

      {/* Voice Audition Modal (Kiểm tra giọng 4 vai) */}
      <VoiceAuditionModal
        isOpen={isAuditionOpen}
        onClose={() => setIsAuditionOpen(false)}
      />

      {/* Audio Diagnostic Modal (Kiểm tra âm thanh AI) */}
      <AudioDiagnosticModal
        isOpen={isDiagnosticOpen}
        onClose={() => setIsDiagnosticOpen(false)}
      />

      {/* Table of Contents Modal */}
      <TableOfContentsModal
        currentPageIdx={currentPageIdx}
        isOpen={isTocOpen}
        onClose={() => setIsTocOpen(false)}
        onSelectPage={(newIdx) => {
          setCurrentPageIdx(newIdx);
          setActiveView('book');
        }}
      />

      {/* Help / Guide Modal */}
      {isHelpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#24160f] border-2 border-amber-600 rounded-2xl max-w-lg w-full p-5 md:p-6 shadow-2xl text-amber-100">
            <div className="flex items-center justify-between border-b border-amber-800 pb-2 mb-3">
              <h3 className="font-bold text-lg font-serif-vintage text-amber-200 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-400" />
                HƯỚNG DẪN SỬ DỤNG HỌC LIỆU SỐ
              </h3>
              <button
                onClick={() => setIsHelpOpen(false)}
                className="text-amber-400 hover:text-white text-sm"
              >
                Đóng ✕
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-stone-200">
              <div className="p-2.5 bg-amber-950/60 rounded-xl border border-amber-800/80">
                <strong className="text-amber-300 block mb-1">📖 Dành cho Thầy/Cô trên lớp:</strong>
                <ul className="list-disc list-inside space-y-1 text-stone-300">
                  <li>Tối ưu tỉ lệ 16:9 khi kết nối máy chiếu, tivi hoặc bảng tương tác thông minh.</li>
                  <li>Nhấn biểu tượng toàn màn hình ở góc trên bên phải để mở chế độ trình chiếu.</li>
                  <li>
                    Sử dụng thanh phát giọng đọc để nghe lời thoại mẫu của Cô giáo, Nguyễn Hiền và Người mẹ.
                  </li>
                </ul>
              </div>

              <div className="p-2.5 bg-amber-950/60 rounded-xl border border-amber-800/80">
                <strong className="text-amber-300 block mb-1">👦 Dành cho các em học sinh lớp 3A6:</strong>
                <ul className="list-disc list-inside space-y-1 text-stone-300">
                  <li>Nhấn nút mũi tên hoặc kéo thanh trượt để lật trang sách chân thực.</li>
                  <li>
                    Tại Trang 2: Chạm vào 4 điểm sáng trong tranh để khám phá biểu hiện ham học hỏi.
                  </li>
                  <li>
                    Tại Trang 4 & 5: Tham gia suy ngẫm và giải quyết tình huống để nhận Sao Đạo Đức.
                  </li>
                  <li>Sau khi đọc xong, tham gia trò chơi Ngôi sao và in Phiếu cam kết rèn luyện!</li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => setIsHelpOpen(false)}
              className="w-full mt-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-stone-950 font-bold rounded-xl text-xs"
            >
              Đã hiểu, sẵn sàng học tập!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
