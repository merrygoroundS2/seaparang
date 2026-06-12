import { useState } from 'react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { todayMenu, weeklyMenu } from '../data/mockData';

export default function CafeteriaPage() {
  const [menuTab, setMenuTab] = useState('breakfast');

  return (
    <div className="page-container bg-bg">
      <Header title="구내식당 메뉴" />

      {/* 오늘의 메뉴 */}
      <section className="px-5 pt-9">
        <h2 className="text-[18px] font-bold text-text-primary mb-4.5">🍽️ 오늘의 메뉴</h2>
        <div className="card-elevated overflow-hidden">
          {/* Tab Switch */}
          <div className="flex p-1.5 bg-[#F4F3F1] m-3.5 rounded-none">
            <button
              onClick={() => setMenuTab('breakfast')}
              className={`flex-1 py-3.5 rounded-none text-[14.5px] font-semibold border-none cursor-pointer transition-smooth ${
                menuTab === 'breakfast'
                  ? 'bg-white text-text-primary'
                  : 'bg-transparent text-text-secondary'
              }`}
              style={menuTab === 'breakfast' ? { boxShadow: '0 1px 4px rgba(0,0,0,0.08)' } : {}}
            >
              조식
            </button>
            <button
              onClick={() => setMenuTab('lunch')}
              className={`flex-1 py-3.5 rounded-none text-[14.5px] font-semibold border-none cursor-pointer transition-smooth ${
                menuTab === 'lunch'
                  ? 'bg-white text-text-primary'
                  : 'bg-transparent text-text-secondary'
              }`}
              style={menuTab === 'lunch' ? { boxShadow: '0 1px 4px rgba(0,0,0,0.08)' } : {}}
            >
              중식
            </button>
          </div>
          {/* Menu Items */}
          <div className="px-5 pb-7">
            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
              {(menuTab === 'breakfast' ? todayMenu.breakfast : todayMenu.lunch).map((item, i) => (
                <div
                  key={i}
                  className="text-[15.5px] text-text-primary flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                  <span className="font-semibold truncate">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 이번주 메뉴 */}
      <section className="px-5 pt-10 pb-9">
        <h2 className="text-[18px] font-bold text-text-primary mb-4.5">📋 이번주 메뉴</h2>
        <div className="space-y-5">
          {weeklyMenu.map((day, index) => (
            <div key={day.day} className="card-elevated p-6 flex gap-4 animate-fade-in border border-border" style={{ animationDelay: `${index * 0.05}s` }}>
              <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center shrink-0">
                <span className="text-[15px] font-bold text-primary">{day.day}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="mb-3">
                  <h4 className="text-[12.5px] font-bold text-primary mb-2">조식</h4>
                  <div className="flex flex-wrap gap-2">
                    {day.breakfast.map((item, i) => (
                      <span key={i} className="text-[12.5px] text-text-primary bg-[#F4F3F1] px-3.5 py-1.5 rounded-none font-semibold">{item}</span>
                    ))}
                  </div>
                </div>
                <div className="h-px bg-border my-3.5" />
                <div>
                  <h4 className="text-[12.5px] font-bold text-[#E67E22] mb-2">중식</h4>
                  <div className="flex flex-wrap gap-2">
                    {day.lunch.map((item, i) => (
                      <span key={i} className="text-[12.5px] text-text-primary bg-[#F4F3F1] px-3.5 py-1.5 rounded-none font-semibold">{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <BottomNav />
    </div>
  );
}
