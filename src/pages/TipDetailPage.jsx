import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { tips, relatedTips } from '../data/mockData';

export default function TipDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tip = tips.find((t) => t.id === id) || tips[0];
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className="page-container bg-bg">
      <Header title="업무 팁" />

      <div className="px-5 pt-4 pb-6 space-y-8">
        {/* Title */}
        <div className="animate-fade-in">
          <div className="flex items-center gap-3.5 mb-2.5">
            <div className="w-12 h-12 rounded-none bg-primary-light flex items-center justify-center shrink-0">
              <span className="text-2xl">{tip.emoji}</span>
            </div>
            <div className="flex-1">
              <h1 className="text-[19px] font-bold text-text-primary leading-snug">
                {tip.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-center flex-wrap gap-2.5 animate-fade-in" style={{ animationDelay: '0.05s' }}>
          <span className="text-[13px] text-text-secondary">{tip.author}</span>
          <span className="w-0.5 h-0.5 rounded-full bg-text-secondary/40" />
          <span className="text-[13px] text-text-secondary">{tip.date}</span>
          <span className="w-0.5 h-0.5 rounded-full bg-text-secondary/40" />
          <span className="text-[13px] text-text-secondary">👁 {tip.views}</span>
          <button
            onClick={() => setSaved(!saved)}
            className={`ml-auto text-[13px] px-4.5 py-2.5 rounded-none border-none cursor-pointer transition-smooth font-semibold ${
              saved
                ? 'bg-primary-light text-primary'
                : 'bg-white text-text-secondary'
            }`}
            style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
          >
            🔖 {saved ? '저장됨' : '저장'}
          </button>
        </div>

        {/* Tags */}
        <div className="flex gap-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {tip.tags.map((tag) => (
            <span key={tag} className="text-[13px] text-primary bg-primary-light px-3.5 py-1.5 rounded-none font-semibold">
              {tag}
            </span>
          ))}
        </div>

        {/* Content */}
        <div className="card-elevated p-5 space-y-6.5 animate-fade-in" style={{ animationDelay: '0.15s' }}>
          {tip.content.sections.map((section, sIndex) => (
            <div key={sIndex} className="space-y-3.5">
              <h3 className="text-[16px] font-bold text-text-primary flex items-center gap-2">
                <div className="w-1.5 h-4.5 rounded-none bg-primary" />
                {section.title}
              </h3>
              {section.items && (
                <div className="space-y-4 pl-3">
                  {section.items.map((item, iIndex) => (
                    <div key={iIndex} className="flex items-start gap-2.5">
                      <span className="text-sm mt-0.5 shrink-0 select-none">
                        {item.type === 'do' ? '✅' : '🚫'}
                      </span>
                      <p className="text-[15px] text-text-primary leading-[1.7]">{item.text}</p>
                    </div>
                  ))}
                </div>
              )}
              {section.body && (
                <p className="text-[15px] text-text-primary leading-[1.8] whitespace-pre-line pl-3">
                  {section.body}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Like Button */}
        <div className="flex justify-center py-1">
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-none text-[15px] font-bold cursor-pointer border-none transition-smooth active:scale-95 ${
              liked
                ? 'bg-primary-light text-primary'
                : 'bg-white text-text-secondary'
            }`}
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
          >
            <span>👍</span>
            <span>도움이 됐어요</span>
          </button>
        </div>

        {/* AI Related Tips */}
        <div className="bg-[#FFFDF6] border border-[#FFF1D0] rounded-none p-5 animate-fade-in relative overflow-hidden" style={{ animationDelay: '0.2s' }}>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3.5">
              <div className="w-7 h-7 rounded-none bg-[#FFF3E0] flex items-center justify-center shrink-0">
                <span className="text-sm">✨</span>
              </div>
              <span className="text-[14px] font-bold text-[#D35400]">
                AI가 관련 팁 {relatedTips.length}건을 찾았어요!
              </span>
            </div>
            <div className="space-y-3">
              {relatedTips.map((related) => (
                <button
                  key={related.id}
                  onClick={() => navigate(`/tips/${related.id}`)}
                  className="w-full flex items-center justify-between py-3 px-4.5 bg-[#FFFFFF] border border-[#FFE8B5] rounded-none text-left cursor-pointer transition-smooth hover:bg-[#FFFDF6]"
                >
                  <span className="text-[13.5px] text-text-primary font-semibold">{related.title}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M9 5l7 7-7 7" stroke="#D35400" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
