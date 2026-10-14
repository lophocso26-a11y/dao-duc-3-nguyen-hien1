import React from 'react';
import { BOOK_PAGES } from '../data/bookData';
import { soundService } from '../utils/audio';
import { BookMarked, X, Sparkles, ScrollText, CheckCircle } from 'lucide-react';

interface TableOfContentsModalProps {
  currentPageIdx: number;
  isOpen: boolean;
  onClose: () => void;
  onSelectPage: (idx: number) => void;
}

export const TableOfContentsModal: React.FC<TableOfContentsModalProps> = ({
  currentPageIdx,
  isOpen,
  onClose,
  onSelectPage,
}) => {
  if (!isOpen) return null;

  const handleSelect = (idx: number) => {
    soundService.stopCurrentVoice();
    soundService.playPageTurn();
    onSelectPage(idx);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#24160f] border-2 border-amber-600 rounded-2xl max-w-xl w-full p-4 md:p-6 shadow-2xl text-amber-100 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-800 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-lg font-serif-vintage text-amber-200">MỤC LỤC TRUYỆN TRANH</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-amber-400 hover:text-white hover:bg-amber-900/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Page List */}
        <div className="space-y-2 overflow-y-auto flex-1 pr-1">
          {/* Cover */}
          <button
            onClick={() => handleSelect(0)}
            className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between text-xs ${
              currentPageIdx === 0
                ? 'bg-amber-800/80 border-amber-400 text-white font-bold'
                : 'bg-amber-950/40 border-amber-900/60 hover:bg-amber-900/40 text-stone-300'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-amber-900/80 text-amber-300 flex items-center justify-center font-bold text-[11px] border border-amber-700">
                0
              </span>
              <div>
                <span className="font-bold text-amber-200">Bìa Sách: Cậu Học Trò Nghèo Ham Học</span>
                <p className="text-[10px] text-stone-400">Giới thiệu bài học • Cô giáo Lã Thị Hồng Minh - Lớp 3A6</p>
              </div>
            </div>
            {currentPageIdx === 0 && <CheckCircle className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Pages 1-8 */}
          {BOOK_PAGES.map((page, i) => {
            const pageIndex = i + 1;
            const isCurrent = currentPageIdx === pageIndex;
            return (
              <button
                key={page.pageNumber}
                onClick={() => handleSelect(pageIndex)}
                className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between text-xs ${
                  isCurrent
                    ? 'bg-amber-800/80 border-amber-400 text-white font-bold'
                    : 'bg-amber-950/40 border-amber-900/60 hover:bg-amber-900/40 text-stone-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-amber-900/80 text-amber-300 flex items-center justify-center font-bold text-[11px] border border-amber-700">
                    {page.pageNumber}
                  </span>
                  <div>
                    <span className="font-bold text-amber-200">
                      Trang {page.pageNumber}: {page.title}
                    </span>
                    <p className="text-[10px] text-stone-400 truncate max-w-xs">{page.subheading}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {page.activity && (
                    <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      Tương tác
                    </span>
                  )}
                  {page.isPreservedSource && (
                    <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      <ScrollText className="w-3 h-3 text-emerald-400" />
                      Văn bản gốc
                    </span>
                  )}
                  {isCurrent && <CheckCircle className="w-4 h-4 text-amber-400 ml-1" />}
                </div>
              </button>
            );
          })}

          {/* End Page */}
          <button
            onClick={() => handleSelect(9)}
            className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between text-xs ${
              currentPageIdx === 9
                ? 'bg-amber-800/80 border-amber-400 text-white font-bold'
                : 'bg-amber-950/40 border-amber-900/60 hover:bg-amber-900/40 text-stone-300'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-amber-900/80 text-amber-300 flex items-center justify-center font-bold text-[11px] border border-amber-700">
                9
              </span>
              <div>
                <span className="font-bold text-amber-200">Trang Kết Thúc: Tổng Kết & Khen Thưởng</span>
                <p className="text-[10px] text-stone-400">Trò chơi Ngôi sao • Lập phiếu cam kết rèn luyện 3A6</p>
              </div>
            </div>
            {currentPageIdx === 9 && <CheckCircle className="w-4 h-4 text-amber-400" />}
          </button>
        </div>
      </div>
    </div>
  );
};
