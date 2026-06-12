import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import CategoryTabs from '../components/CategoryTabs';
import { tips, tipCategories } from '../data/mockData';

export default function TipsListPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('전체');

  const popularTip = tips.find((t) => t.isPopular);
  const filteredTips = tips.filter(
    (t) => activeCategory === '전체' || t.category === activeCategory
  );

  return (
    <div className="page-container bg-bg">
      <Header title="업무 팁" />
      <CategoryTabs
        categories={tipCategories}
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />

      {/* 🔥 인기 팁 */}
      {popularTip && activeCategory === '전체' && (
        <section className="px-5 pb-6">
          <button
            onClick={() => navigate(`/tips/${popularTip.id}`)}
            className="w-full gradient-blue rounded-none p-6.5 text-left cursor-pointer border-none transition-smooth card-hover animate-fade-in relative overflow-hidden"
          >
            {/* Decorative circle */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-white/[0.08]" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-sm">🔥</span>
                <span className="text-[13px] font-bold text-white/80">이번 주 인기 팁</span>
              </div>
              <h3 className="text-[17px] font-bold text-white mb-1.5">{popularTip.title}</h3>
              <p className="text-[14px] text-white/70 leading-relaxed line-clamp-2 mb-3">
                {popularTip.preview}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-[13px] text-white/60">👍 {popularTip.likes}</span>
                <span className="text-[13px] text-white/60">💬 {popularTip.comments}</span>
              </div>
            </div>
          </button>
        </section>
      )}

      {/* Tip List */}
      <section className="px-5 pb-5">
        {activeCategory === '전체' && (
          <h2 className="text-[16px] font-bold text-text-primary mb-4.5 pl-1">전체</h2>
        )}
        {filteredTips.length > 0 ? (
          <div className="space-y-5">
            {filteredTips.map((tip, index) => (
              <button
                key={tip.id}
                onClick={() => navigate(`/tips/${tip.id}`)}
                className="w-full card-elevated p-5 text-left cursor-pointer border border-border animate-fade-in block"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-none bg-[#F4F3F1] flex items-center justify-center shrink-0">
                    <span className="text-xl">{tip.emoji}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[12px] font-semibold text-primary bg-primary-light px-3 py-1.5 rounded-none">
                        {tip.category}
                      </span>
                    </div>
                    <h3 className="text-[16px] font-bold text-text-primary mb-1.5">{tip.title}</h3>
                    <p className="text-[14px] text-text-secondary leading-[1.6] line-clamp-2 mb-2.5">
                      {tip.preview}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-[12.5px] text-text-secondary">👍 {tip.likes}</span>
                      <span className="text-[12.5px] text-text-secondary">💬 {tip.comments}</span>
                      <div className="flex gap-1.5 ml-auto">
                        {tip.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-[12px] text-primary/70 font-semibold">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-text-secondary text-[14px]">
            작성된 팁이 없습니다.
          </div>
        )}
      </section>

      <BottomNav />
    </div>
  );
}
