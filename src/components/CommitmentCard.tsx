import React, { useState, useEffect } from 'react';
import { CommitmentData } from '../types/book';
import { soundService } from '../utils/audio';
import { Printer, Heart, ArrowLeft, Star } from 'lucide-react';

interface CommitmentCardProps {
  onBack: () => void;
}

export const CommitmentCard: React.FC<CommitmentCardProps> = ({ onBack }) => {
  const [data, setData] = useState<CommitmentData>(() => {
    const saved = localStorage.getItem('hien_moral_commitment');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback
      }
    }
    return {
      studentName: 'Nguyễn Văn An',
      className: '3A6',
      actionChoice: 'Mỗi ngày tự giác đọc sách 20 phút và ghi nhớ 1 bài học hay',
      customAction: 'Em sẽ chú ý nghe cô giáo giảng bài và giơ tay phát biểu nhiều hơn.',
      targetDate: new Date().toLocaleDateString('vi-VN'),
    };
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const presetChoices = [
    'Mỗi ngày tự giác đọc sách 20 phút và ghi nhớ 1 bài học hay',
    'Tự giác hoàn thành bài tập về nhà trước khi đi chơi, không đợi bố mẹ nhắc',
    'Bình tĩnh suy nghĩ khi gặp bài khó, không chép bài bạn, dũng cảm hỏi cô giáo',
    'Khiêm tốn học hỏi bạn bè và nhiệt tình giúp đỡ bạn khi bạn chưa hiểu bài',
    'Quan sát thế giới xung quanh, luôn đặt câu hỏi "Vì sao?" để hiểu tường tận',
  ];

  const handleSave = () => {
    localStorage.setItem('hien_moral_commitment', JSON.stringify(data));
    soundService.playStarChime();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handlePrint = () => {
    handleSave();
    window.print();
  };

  useEffect(() => {
    // Keep local storage synced
    localStorage.setItem('hien_moral_commitment', JSON.stringify(data));
  }, [data]);

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 bg-gradient-to-b from-amber-50 to-orange-50 rounded-2xl border-4 border-amber-300 shadow-xl">
      {/* Navigation & Header */}
      <div className="flex items-center justify-between border-b-2 border-amber-200 pb-3 mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-white border border-amber-300 px-3 py-1.5 rounded-lg hover:bg-amber-100"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại Sách
        </button>

        <h2 className="text-lg md:text-xl font-bold font-serif-vintage text-amber-950 text-center">
          PHIẾU CAM KẾT: EM SẼ HAM HỌC HƠN MỖI NGÀY
        </h2>

        <button
          onClick={handlePrint}
          className="flex items-center gap-1.5 text-xs font-bold text-white bg-gradient-to-r from-amber-600 to-orange-600 px-3.5 py-1.5 rounded-lg shadow-sm hover:from-amber-700 hover:to-orange-700"
        >
          <Printer className="w-4 h-4" />
          In Huy Hiệu
        </button>
      </div>

      {/* Input Form Controls */}
      <div className="bg-white/90 p-4 rounded-xl border border-amber-200 mb-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-xs font-bold text-amber-950 mb-1">Họ và tên học sinh:</label>
            <input
              type="text"
              value={data.studentName}
              onChange={(e) => setData({ ...data, studentName: e.target.value })}
              className="w-full text-xs p-2 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold text-stone-800"
              placeholder="Nhập tên em..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-amber-950 mb-1">Lớp & Trường:</label>
            <input
              type="text"
              value={`Lớp ${data.className} - Tiểu học Đỗ Ngọc Du`}
              readOnly
              className="w-full text-xs p-2 rounded-lg border border-stone-200 bg-stone-100 text-stone-700 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Action Selection */}
        <div className="mb-3">
          <label className="block text-xs font-bold text-amber-950 mb-1.5">
            Chọn 1 việc làm cụ thể em quyết tâm thực hiện mỗi ngày:
          </label>
          <div className="space-y-1.5">
            {presetChoices.map((choice, idx) => (
              <label
                key={idx}
                className={`flex items-start gap-2 p-2 rounded-lg border text-xs cursor-pointer transition-all ${
                  data.actionChoice === choice
                    ? 'border-amber-500 bg-amber-50 font-semibold text-amber-950'
                    : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                }`}
              >
                <input
                  type="radio"
                  name="actionChoice"
                  checked={data.actionChoice === choice}
                  onChange={() => setData({ ...data, actionChoice: choice })}
                  className="mt-0.5 text-amber-600 focus:ring-amber-500"
                />
                <span>{choice}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Custom text */}
        <div>
          <label className="block text-xs font-bold text-amber-950 mb-1">
            Viết thêm lời hứa quyết tâm của riêng em (nếu có):
          </label>
          <textarea
            rows={2}
            value={data.customAction}
            onChange={(e) => setData({ ...data, customAction: e.target.value })}
            className="w-full text-xs p-2 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-800"
            placeholder="Lời nhắn nhủ đến bản thân hoặc cô giáo..."
          />
        </div>

        {savedSuccess && (
          <div className="mt-2 text-center text-xs font-bold text-emerald-700 animate-fadeIn flex items-center justify-center gap-1">
            <Heart className="w-3.5 h-3.5 fill-emerald-600" />
            Đã lưu phiếu cam kết thành công!
          </div>
        )}
      </div>

      {/* Printable Certificate View ("Huy Hiệu & Giấy Khen Trạng Nguyên Nhí 3A6") */}
      <div
        id="printable-certificate"
        className="relative bg-gradient-to-b from-amber-50 via-yellow-50 to-orange-50 p-6 md:p-8 rounded-2xl border-8 border-amber-500 shadow-2xl text-center text-stone-900"
        style={{
          boxShadow: 'inset 0 0 20px rgba(217, 119, 6, 0.2), 0 10px 25px -5px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Ornate corners */}
        <div className="absolute top-2 left-2 text-amber-600 text-xl font-serif">❖</div>
        <div className="absolute top-2 right-2 text-amber-600 text-xl font-serif">❖</div>
        <div className="absolute bottom-2 left-2 text-amber-600 text-xl font-serif">❖</div>
        <div className="absolute bottom-2 right-2 text-amber-600 text-xl font-serif">❖</div>

        {/* Header Ribbon */}
        <div className="inline-block px-6 py-1 bg-gradient-to-r from-red-700 via-amber-600 to-red-700 text-amber-100 font-bold text-xs uppercase tracking-widest rounded-full shadow-md mb-2">
          TRƯỜNG TIỂU HỌC ĐỖ NGỌC DU • LỚP 3A6
        </div>

        <h3 className="text-xl md:text-2xl font-bold font-serif-vintage text-red-900 tracking-wide mt-1 mb-1">
          GIẤY KHEN VÀ HUY HIỆU ĐẠO ĐỨC
        </h3>
        <p className="text-xs uppercase font-bold text-amber-800 tracking-wider mb-4">
          DANH HIỆU: TRẠNG NGUYÊN NHÍ HAM HỌC HỎI
        </p>

        {/* Badge Medallion */}
        <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-yellow-300 via-amber-400 to-amber-600 rounded-full flex items-center justify-center border-4 border-amber-200 shadow-lg">
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-red-700 flex flex-col items-center justify-center bg-amber-100">
            <span className="text-xl">🎓</span>
            <span className="text-[9px] font-bold text-red-800 leading-none">3A6</span>
          </div>
        </div>

        <p className="text-xs text-stone-700 mb-1">Khen ngợi tấm gương học sinh:</p>
        <h4 className="text-xl md:text-2xl font-bold text-amber-950 font-serif-vintage underline decoration-amber-400 underline-offset-4 mb-2">
          {data.studentName || 'Học sinh Lớp 3A6'}
        </h4>

        <p className="text-xs text-stone-700 max-w-lg mx-auto leading-relaxed mb-3">
          Đã tích cực tham gia bài học <span className="font-bold text-amber-900">&quot;Cậu học trò nghèo ham học&quot;</span>,
          thấu hiểu ý nghĩa của việc trau dồi tri thức và có lời cam kết rèn luyện mỗi ngày:
        </p>

        <div className="bg-white/80 border border-amber-300 rounded-xl p-3 max-w-lg mx-auto mb-4 text-xs font-semibold text-amber-950 italic">
          &quot;{data.actionChoice}&quot;
          {data.customAction && (
            <div className="text-[11px] font-normal text-stone-600 mt-1 not-italic">
              Lời hứa thêm: &quot;{data.customAction}&quot;
            </div>
          )}
        </div>

        {/* Teacher Signature & Date */}
        <div className="flex justify-between items-end max-w-md mx-auto pt-2 border-t border-amber-200 text-xs text-stone-700">
          <div className="text-left">
            <p className="text-[11px] text-stone-500">Ngày ghi nhận:</p>
            <p className="font-bold text-amber-900">{data.targetDate}</p>
          </div>

          <div className="text-right">
            <p className="text-[11px] text-stone-500">Giáo viên chủ nhiệm:</p>
            <p className="text-sm font-bold text-red-900 font-serif-vintage">Cô Lã Thị Hồng Minh</p>
            <span className="text-[10px] text-emerald-700 font-semibold flex items-center justify-end gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-500" /> Đã xác nhận khen thưởng
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
