import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import MascotIcon from '../components/MascotIcon';
import { todayMenu, notices } from '../data/mockData';

export default function HomePage() {
  const navigate = useNavigate();
  const [expandedNotice, setExpandedNotice] = useState(null);
  const [menuTab, setMenuTab] = useState('breakfast');
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, icon: '📢', text: '6.17~6.18 워크숍 참석자 파악 공지가 등록되었습니다.', time: '1시간 전', unread: true },
    { id: 2, icon: '💬', text: '내 질문에 새 답변이 달렸습니다.', time: '3시간 전', unread: true },
    { id: 3, icon: '🔥', text: '내 게시글이 HOT에 선정되었습니다!', time: '1일 전', unread: false },
  ];

  return (
    <div className="page-container bg-bg">
      {/* ===== Gradient Header Banner ===== */}
      <div className="gradient-blue px-5 pt-5 pb-8 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-8 right-8 w-32 h-32 rounded-full bg-white/[0.06]" />
        <div className="absolute -bottom-6 -left-4 w-24 h-24 rounded-full bg-white/[0.08]" />

        {/* Top bar */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          <MascotIcon size={36} />
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setShowSearch(!showSearch); setShowNotifications(false); }}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border-none cursor-pointer hover:bg-white/20 transition-smooth"
              aria-label="검색"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="10.5" cy="10.5" r="6.5" stroke="white" strokeWidth="2" />
                <line x1="15.5" y1="15.5" x2="21" y2="21" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <button
              onClick={() => { setShowNotifications(!showNotifications); setShowSearch(false); }}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border-none cursor-pointer relative hover:bg-white/20 transition-smooth"
              aria-label="알림"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13.73 21a2 2 0 01-3.46 0" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
              {notifications.some(n => n.unread) && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-[#FF3B30] rounded-full" />
              )}
            </button>
          </div>
        </div>

        {/* 검색창 */}
        {showSearch && (
          <div className="relative z-10 animate-fade-in mb-2">
            <div className="flex items-center bg-white/15 rounded-xl px-4 h-11 gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="10.5" cy="10.5" r="6.5" stroke="white" strokeWidth="2" />
                <line x1="15.5" y1="15.5" x2="21" y2="21" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="검색어를 입력하세요..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    navigate(`/board`);
                    setShowSearch(false);
                  }
                  if (e.key === 'Escape') setShowSearch(false);
                }}
                autoFocus
                className="flex-1 bg-transparent border-none text-white placeholder-white/60 text-[15px] font-medium"
                style={{ outline: 'none' }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="bg-transparent border-none cursor-pointer text-white/70">
                  ✕
                </button>
              )}
            </div>
          </div>
        )}

        {/* Welcome */}
        {!showSearch && (
          <div className="relative z-10">
            <p className="text-white/70 text-[14.5px] mb-1">안녕하세요 👋</p>
            <h1 className="text-white text-[22px] font-bold">해양경찰청에 오신 걸 환영합니다</h1>
          </div>
        )}
      </div>

      {/* 알림 패널 */}
      {showNotifications && (
        <div className="mx-4 -mt-2 relative z-20 animate-fade-in">
          <div className="bg-white rounded-xl overflow-hidden" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <h3 className="text-[15px] font-bold text-text-primary">알림</h3>
              <button
                onClick={() => setShowNotifications(false)}
                className="text-[13px] text-text-secondary bg-transparent border-none cursor-pointer"
              >
                닫기
              </button>
            </div>
            {notifications.map((notif) => (
              <div key={notif.id} className={`flex items-start gap-3 px-4 py-3.5 border-b border-border last:border-0 ${notif.unread ? 'bg-primary-light/30' : ''}`}>
                <span className="text-lg shrink-0 mt-0.5">{notif.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[13.5px] text-text-primary leading-[1.5]">{notif.text}</p>
                  <p className="text-[12px] text-text-secondary mt-1">{notif.time}</p>
                </div>
                {notif.unread && (
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== Quick Access Cards ===== */}
      <section className="px-5 mt-6 relative z-10">
        <div className="grid grid-cols-2 gap-5">
          <button
            onClick={() => navigate('/qna')}
            className="card-elevated card-hover p-6 text-left cursor-pointer border-none"
          >
            <div className="w-10 h-10 rounded-none bg-primary-light flex items-center justify-center mb-3.5">
              <span className="text-lg">💬</span>
            </div>
            <h3 className="text-[15.5px] font-bold text-text-primary mb-1">무물보 Q&A</h3>
            <p className="text-[13px] text-text-secondary leading-relaxed">선배 인턴에게 물어보세요</p>
          </button>

          <button
            onClick={() => navigate('/cafeteria')}
            className="card-elevated card-hover p-6 text-left cursor-pointer border-none"
          >
            <div className="w-10 h-10 rounded-none bg-[#FFF3E0] flex items-center justify-center mb-3.5">
              <span className="text-lg">🍽️</span>
            </div>
            <h3 className="text-[15.5px] font-bold text-text-primary mb-1">구내식당</h3>
            <p className="text-[13px] text-text-secondary leading-relaxed">이번주 메뉴 확인하기</p>
          </button>
        </div>
      </section>

      {/* ===== 오늘의 메뉴 ===== */}
      <section className="px-5 pt-10">
        <h2 className="text-[18px] font-bold text-text-primary mb-4.5">오늘의 메뉴</h2>
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
                  className="text-[15px] text-text-primary flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                  <span className="font-semibold truncate">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 공지사항 ===== */}
      <section className="px-5 pt-10 pb-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[18px] font-bold text-text-primary">공지사항</h2>
          <button
            onClick={() => navigate('/notices')}
            className="text-[13.5px] text-primary bg-transparent border-none cursor-pointer font-semibold hover:opacity-70 transition-smooth"
          >
            더 보기 →
          </button>
        </div>

        {/* Highlighted Notice */}
        {notices.filter(n => n.isPinned).map((notice) => (
          <button
            key={notice.id}
            className="w-full gradient-blue rounded-none p-6 mb-6 cursor-pointer transition-smooth card-hover border-none text-left"
            onClick={() => navigate('/notices')}
          >
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-none bg-white/15 flex items-center justify-center shrink-0">
                <span className="text-base">📢</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-white/70 font-semibold mb-1">{notice.department}</p>
                <p className="text-[15px] text-white font-bold leading-relaxed line-clamp-2">
                  {notice.title}
                </p>
              </div>
            </div>
          </button>
        ))}

        {/* Notice List */}
        <div className="space-y-5">
          {notices.filter(n => !n.isPinned).map((notice) => (
            <div key={notice.id} className="card-elevated border border-border overflow-hidden">
              <button
                onClick={() => setExpandedNotice(expandedNotice === notice.id ? null : notice.id)}
                className="w-full flex items-start gap-3.5 px-5 py-5 text-left bg-transparent border-none cursor-pointer hover:bg-black/[0.02] transition-smooth"
              >
                <span className="text-[12px] font-semibold text-primary bg-primary-light px-3 py-1.5 rounded-none mt-0.5 whitespace-nowrap shrink-0">
                  {notice.department}
                </span>
                <div className="flex-1 min-w-0">
                  <p className={`text-[15px] leading-relaxed line-clamp-1 ${
                    expandedNotice === notice.id ? 'font-bold' : 'font-semibold'
                  } text-text-primary`}>
                    {notice.title}
                  </p>
                  <p className="text-[12px] text-text-secondary mt-0.5">{notice.date}</p>
                </div>
                <svg
                  className={`w-4 h-4 text-text-secondary mt-1 shrink-0 transition-transform duration-200 ${
                    expandedNotice === notice.id ? 'rotate-180' : ''
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              {expandedNotice === notice.id && (
                <div className="px-5 pb-5 animate-fade-in">
                  <div className="text-[15px] text-text-primary leading-[1.7] whitespace-pre-line bg-[#F4F3F1] rounded-none border-t border-border p-4.5">
                    {notice.content}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <BottomNav />
    </div>
  );
}
