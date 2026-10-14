import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../data/bookData';
import { soundService } from '../utils/audio';
import { Trophy, Star, RotateCcw, ArrowRight, Award, CheckCircle, HelpCircle } from 'lucide-react';

interface MiniGameQuizProps {
  onBackToBook: () => void;
  onOpenCommitment: () => void;
}

export const MiniGameQuiz: React.FC<MiniGameQuizProps> = ({ onBackToBook, onOpenCommitment }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [starsScore, setStarsScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      soundService.playStarChime();
      setStarsScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      soundService.playTriumphFanfare();
      // Trigger festive fireworks confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#facc15', '#ef4444', '#10b981', '#3b82f6'],
      });
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setStarsScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6 bg-gradient-to-b from-amber-50 to-orange-50 rounded-2xl border-4 border-amber-300 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-amber-200 pb-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-amber-400 text-amber-950 rounded-xl shadow-sm">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-serif-vintage text-amber-950">TRÒ CHƠI: NGÔI SAO HAM HỌC</h2>
            <p className="text-xs text-amber-800">Thử tài hiểu biết & nhận Huy hiệu Trạng Nguyên Nhí 3A6</p>
          </div>
        </div>

        {/* Star Counter */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-amber-300 rounded-full shadow-inner">
          <Star className="w-5 h-5 text-amber-500 fill-amber-400 animate-pulse" />
          <span className="font-bold text-amber-900 text-sm">
            {starsScore}/{QUIZ_QUESTIONS.length} Sao
          </span>
        </div>
      </div>

      {!quizFinished ? (
        <div>
          {/* Progress bar */}
          <div className="w-full bg-amber-200 h-2 rounded-full overflow-hidden mb-4">
            <div
              className="bg-amber-600 h-full transition-all duration-300"
              style={{
                width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%`,
              }}
            />
          </div>

          <div className="mb-4">
            <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
              Câu {currentQuestionIndex + 1} / {QUIZ_QUESTIONS.length}
            </span>
            <h3 className="text-base font-bold text-stone-900 mt-2 leading-relaxed">{currentQ.question}</h3>
          </div>

          {/* Options */}
          <div className="space-y-2.5 mb-5">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let btnStyle = 'border-stone-200 bg-white hover:bg-amber-50 text-stone-800';
              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-400 font-semibold';
                } else if (isSelected) {
                  btnStyle = 'border-rose-400 bg-rose-50 text-rose-950 ring-1 ring-rose-400';
                } else {
                  btnStyle = 'border-stone-200 bg-stone-50 text-stone-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-3 rounded-xl border-2 transition-all flex items-start gap-3 text-sm ${btnStyle}`}
                >
                  <span className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center font-bold text-xs bg-amber-100 text-amber-900 mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 leading-snug">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Answer explanation card */}
          {isAnswered && (
            <div
              className={`p-3.5 rounded-xl border mb-4 animate-fadeIn ${
                selectedOption === currentQ.correctIndex
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm mb-1">
                {selectedOption === currentQ.correctIndex ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <span>{currentQ.praise}</span>
                  </>
                ) : (
                  <>
                    <HelpCircle className="w-5 h-5 text-amber-600" />
                    <span>Bài học cần ghi nhớ:</span>
                  </>
                )}
              </div>
              <p className="text-xs leading-relaxed text-stone-800">{currentQ.explanation}</p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={onBackToBook}
              className="text-xs text-amber-900 hover:text-amber-950 font-medium px-3 py-1.5 rounded-lg border border-amber-200 bg-white"
            >
              ← Trở về Sách
            </button>

            {isAnswered && (
              <button
                onClick={handleNext}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-sm rounded-xl shadow-md flex items-center gap-2 transition-all"
              >
                <span>{currentQuestionIndex + 1 < QUIZ_QUESTIONS.length ? 'Câu tiếp theo' : 'Xem kết quả'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Victory Screen */
        <div className="text-center py-6 px-2 animate-fadeIn">
          <div className="w-20 h-20 mx-auto mb-3 bg-amber-100 rounded-full flex items-center justify-center border-4 border-amber-400 shadow-lg">
            <Award className="w-12 h-12 text-amber-600 animate-bounce" />
          </div>

          <h3 className="text-2xl font-bold font-serif-vintage text-amber-950 mb-1">CHÚC MỪNG EM ĐÃ HOÀN THÀNH!</h3>
          <p className="text-stone-700 text-sm mb-4">
            Em đã xuất sắc giành được <span className="font-bold text-amber-700">{starsScore}/5 Ngôi Sao Ham Học</span>!
          </p>

          <div className="bg-amber-100/80 border-2 border-amber-300 rounded-xl p-4 max-w-md mx-auto mb-6 text-xs text-amber-950 leading-relaxed">
            <p className="font-bold mb-1">Lời khen từ Cô giáo Lã Thị Hồng Minh:</p>
            <p className="italic">
              &quot;Cô rất tự hào về tinh thần chú ý lắng nghe và sự hiểu biết sâu sắc của em. Em chính là bông sen sáng ngời của
              tập thể lớp 3A6!&quot;
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleRestart}
              className="px-4 py-2 border-2 border-amber-300 bg-white hover:bg-amber-50 text-amber-950 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm"
            >
              <RotateCcw className="w-4 h-4" />
              Chơi lại
            </button>

            <button
              onClick={onOpenCommitment}
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5"
            >
              <Award className="w-4 h-4" />
              Lập Phiếu Cam Kết & In Huy Hiệu
            </button>

            <button
              onClick={onBackToBook}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-xs shadow-sm"
            >
              Về Trang Bìa Sách
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
