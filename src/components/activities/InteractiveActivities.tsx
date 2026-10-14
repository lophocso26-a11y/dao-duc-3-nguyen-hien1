import React, { useState } from 'react';
import { PageActivity, Hotspot, ChoiceOption } from '../../types/book';
import { soundService } from '../../utils/audio';
import { Sparkles, CheckCircle2, AlertCircle, HelpCircle, Star, Heart, Compass } from 'lucide-react';

interface DiscoveryProps {
  activity: PageActivity;
  foundHotspots: string[];
  activeHotspotId: string | null;
  onSelectHotspot: (spotId: string) => void;
  onCloseDetail: () => void;
}

export const ActivityDiscovery: React.FC<DiscoveryProps> = ({
  activity,
  foundHotspots,
  activeHotspotId,
  onSelectHotspot,
  onCloseDetail,
}) => {
  const selectedHotspot: Hotspot | undefined = activity.hotspots?.find((h) => h.id === activeHotspotId);

  return (
    <div className="bg-amber-50/90 border-2 border-amber-300 rounded-xl p-4 shadow-sm text-sm">
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-amber-200 text-amber-900 rounded-lg">
            <Compass className="w-4 h-4" />
          </span>
          <h4 className="font-bold text-amber-950 font-serif-vintage text-base">{activity.title}</h4>
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 bg-amber-200 text-amber-900 rounded-full">
          Đã tìm: {foundHotspots.length}/{activity.hotspots?.length || 4}
        </span>
      </div>

      <p className="text-stone-700 text-xs mb-3">{activity.instruction}</p>

      {/* Hotspots mini-cards list */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        {activity.hotspots?.map((spot, idx) => {
          const isFound = foundHotspots.includes(spot.id);
          const isSelected = activeHotspotId === spot.id;
          return (
            <button
              key={spot.id}
              onClick={() => onSelectHotspot(spot.id)}
              className={`text-left p-2 rounded-lg border transition-all text-xs flex items-center justify-between ${
                isSelected
                  ? 'border-amber-600 bg-amber-100 ring-2 ring-amber-400 font-bold text-amber-950'
                  : isFound
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
                  : 'border-dashed border-stone-300 bg-white/70 text-stone-700 hover:border-amber-400'
              }`}
            >
              <div className="flex items-center gap-1.5 truncate">
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold bg-amber-200 text-amber-900">
                  {idx + 1}
                </span>
                <span className="truncate">{spot.title}</span>
              </div>
              {isFound ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              ) : (
                <span className="text-[10px] text-amber-600 font-medium">Chạm</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Hotspot Detailed Pedagogical Modal/Card */}
      {selectedHotspot && (
        <div className="mt-3 p-3 bg-white rounded-xl border border-amber-200 shadow-md animate-fadeIn">
          <div className="flex items-center justify-between border-b border-amber-100 pb-1.5 mb-2">
            <span className="font-bold text-amber-900 flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
              {selectedHotspot.title}
            </span>
            <button
              onClick={onCloseDetail}
              className="text-stone-400 hover:text-stone-700 text-xs px-2 py-0.5 rounded hover:bg-stone-100"
            >
              Đóng ✕
            </button>
          </div>

          <p className="text-xs text-stone-800 mb-2 leading-relaxed font-medium">{selectedHotspot.description}</p>

          <div className="bg-amber-50 rounded-lg p-2 mb-2 text-xs text-amber-950 border-l-4 border-amber-500">
            <strong>Ghi nhận bài học:</strong> {selectedHotspot.meaning}
          </div>

          <div className="bg-emerald-50 rounded-lg p-2 text-xs text-emerald-950 border-l-4 border-emerald-500">
            <strong>Gợi ý cho học sinh lớp 3:</strong> {selectedHotspot.tip}
          </div>
        </div>
      )}
    </div>
  );
};

interface ReflectionProps {
  activity: PageActivity;
  onAnswerAward?: () => void;
}

export const ActivityReflection: React.FC<ReflectionProps> = ({ activity, onAnswerAward }) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const selectedOption: ChoiceOption | undefined = activity.options?.find((o) => o.id === selectedOptionId);

  const handleSelect = (option: ChoiceOption) => {
    setSelectedOptionId(option.id);
    if (option.feedback.isOptimal) {
      soundService.playStarChime();
      onAnswerAward?.();
    }
  };

  return (
    <div className="bg-amber-50/95 border-2 border-amber-300 rounded-xl p-4 shadow-sm text-sm">
      <div className="flex items-center gap-2 mb-2">
        <span className="p-1.5 bg-amber-200 text-amber-900 rounded-lg">
          <HelpCircle className="w-4 h-4" />
        </span>
        <h4 className="font-bold text-amber-950 font-serif-vintage text-base">{activity.title}</h4>
      </div>

      <p className="text-stone-800 text-xs font-semibold mb-3 leading-relaxed">{activity.question}</p>

      {/* Options list */}
      <div className="space-y-2 mb-3">
        {activity.options?.map((opt, idx) => {
          const isSelected = selectedOptionId === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt)}
              className={`w-full text-left p-2.5 rounded-lg border transition-all text-xs flex items-start gap-2.5 ${
                isSelected
                  ? opt.feedback.isOptimal
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-400'
                    : 'border-amber-500 bg-amber-100 text-amber-950 ring-1 ring-amber-400'
                  : 'border-stone-200 bg-white hover:bg-amber-50/60 text-stone-800'
              }`}
            >
              <span className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center font-bold text-[10px] bg-amber-200 text-amber-900 mt-0.5">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="leading-snug">{opt.text}</span>
            </button>
          );
        })}
      </div>

      {/* Detailed 4-part feedback card */}
      {selectedOption && (
        <div
          className={`p-3 rounded-xl border shadow-sm animate-fadeIn ${
            selectedOption.feedback.isOptimal
              ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
              : 'bg-amber-100/90 border-amber-300 text-amber-950'
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-xs mb-1.5">
            {selectedOption.feedback.isOptimal ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-600" />
            )}
            <span>{selectedOption.feedback.title}</span>
          </div>

          <p className="text-xs mb-2 leading-relaxed">{selectedOption.feedback.description}</p>

          <div className="text-xs bg-white/80 p-2 rounded-lg mb-1.5 border border-amber-200">
            <strong>Gợi ý hành động:</strong> {selectedOption.feedback.actionAdvice}
          </div>

          <div className="text-xs italic text-stone-700 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-400 shrink-0" />
            <span>{selectedOption.feedback.encouragement}</span>
          </div>
        </div>
      )}
    </div>
  );
};

interface ScenarioProps {
  activity: PageActivity;
  onAnswerAward?: () => void;
}

export const ActivityScenario: React.FC<ScenarioProps> = ({ activity, onAnswerAward }) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);
  const selectedScenario: ChoiceOption | undefined = activity.options?.find((o) => o.id === selectedScenarioId);

  const handleSelect = (scenario: ChoiceOption) => {
    setSelectedScenarioId(scenario.id);
    if (scenario.feedback.isOptimal) {
      soundService.playStarChime();
      onAnswerAward?.();
    }
  };

  return (
    <div className="bg-amber-50/95 border-2 border-amber-300 rounded-xl p-4 shadow-sm text-sm">
      <div className="flex items-center gap-2 mb-2">
        <span className="p-1.5 bg-amber-200 text-amber-900 rounded-lg">
          <Sparkles className="w-4 h-4" />
        </span>
        <h4 className="font-bold text-amber-950 font-serif-vintage text-base">{activity.title}</h4>
      </div>

      <p className="text-stone-800 text-xs font-semibold mb-3 leading-relaxed">{activity.question}</p>

      {/* Scenarios */}
      <div className="space-y-2 mb-3">
        {activity.options?.map((opt, idx) => {
          const isSelected = selectedScenarioId === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt)}
              className={`w-full text-left p-2.5 rounded-lg border transition-all text-xs flex items-start gap-2.5 ${
                isSelected
                  ? opt.feedback.isOptimal
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-400'
                    : 'border-amber-500 bg-amber-100 text-amber-950 ring-1 ring-amber-400'
                  : 'border-stone-200 bg-white hover:bg-amber-50/60 text-stone-800'
              }`}
            >
              <span className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center font-bold text-[10px] bg-amber-200 text-amber-900 mt-0.5">
                {idx + 1}
              </span>
              <span className="leading-snug">{opt.text}</span>
            </button>
          );
        })}
      </div>

      {/* Detailed Feedback */}
      {selectedScenario && (
        <div
          className={`p-3 rounded-xl border shadow-sm animate-fadeIn ${
            selectedScenario.feedback.isOptimal
              ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
              : 'bg-amber-100/90 border-amber-300 text-amber-950'
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-xs mb-1.5">
            {selectedScenario.feedback.isOptimal ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-600" />
            )}
            <span>{selectedScenario.feedback.title}</span>
          </div>

          <p className="text-xs mb-2 leading-relaxed">{selectedScenario.feedback.description}</p>

          <div className="text-xs bg-white/80 p-2 rounded-lg mb-1.5 border border-amber-200">
            <strong>Lời khuyên bổ ích:</strong> {selectedScenario.feedback.actionAdvice}
          </div>

          <div className="text-xs italic text-stone-700 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-400 shrink-0" />
            <span>{selectedScenario.feedback.encouragement}</span>
          </div>
        </div>
      )}
    </div>
  );
};

interface ApplicationProps {
  activity: PageActivity;
  onCommitmentChange?: (count: number) => void;
}

export const ActivityApplication: React.FC<ApplicationProps> = ({ activity, onCommitmentChange }) => {
  const [selectedActionIds, setSelectedActionIds] = useState<string[]>(['act-1', 'act-3']);

  const toggleAction = (id: string) => {
    let next: string[];
    if (selectedActionIds.includes(id)) {
      next = selectedActionIds.filter((item) => item !== id);
    } else {
      next = [...selectedActionIds, id];
      soundService.playStarChime();
    }
    setSelectedActionIds(next);
    onCommitmentChange?.(next.length);
  };

  return (
    <div className="bg-amber-50/95 border-2 border-amber-300 rounded-xl p-4 shadow-sm text-sm">
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-amber-200 text-amber-900 rounded-lg">
            <Sparkles className="w-4 h-4" />
          </span>
          <h4 className="font-bold text-amber-950 font-serif-vintage text-base">{activity.title}</h4>
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
          {selectedActionIds.length} việc đã cam kết
        </span>
      </div>

      <p className="text-stone-700 text-xs mb-3">{activity.instruction}</p>

      {/* Action check cards */}
      <div className="space-y-2 mb-3">
        {activity.applicationActions?.map((act) => {
          const isSelected = selectedActionIds.includes(act.id);
          return (
            <button
              key={act.id}
              onClick={() => toggleAction(act.id)}
              className={`w-full text-left p-2.5 rounded-lg border transition-all text-xs flex items-center justify-between ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-medium'
                  : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{act.icon}</span>
                <div>
                  <div className="font-bold text-[11px] text-amber-900">{act.category}</div>
                  <div>{act.text}</div>
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                  isSelected ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-stone-300 bg-white'
                }`}
              >
                {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Lotus bloom visual feedback */}
      <div className="bg-gradient-to-r from-rose-50 to-amber-50 p-2.5 rounded-lg border border-rose-200 text-center text-xs">
        <span className="font-bold text-rose-800">
          🌸 Búp Sen Tri Thức của em đang nở {selectedActionIds.length}/5 cánh hoa rực rỡ!
        </span>
        <p className="text-[11px] text-stone-600 mt-0.5">
          Mỗi ngày thực hiện một việc nhỏ, em đang từng bước noi gương Trạng nguyên Nguyễn Hiền.
        </p>
      </div>
    </div>
  );
};
