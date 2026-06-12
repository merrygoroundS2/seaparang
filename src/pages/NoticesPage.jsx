import { useState } from 'react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import SearchBar from '../components/SearchBar';
import { notices } from '../data/mockData';

export default function NoticesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const filteredNotices = notices.filter(
    (n) =>
      n.title.includes(searchQuery) ||
      n.department.includes(searchQuery) ||
      n.content.includes(searchQuery)
  );

  return (
    <div className="page-container bg-bg">
      <Header title="공지사항" />
      <div className="mx-1">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      <div className="px-5 pb-5">
        <div className="space-y-5">
          {filteredNotices.map((notice, idx) => (
            <div key={notice.id} className="card-elevated border border-border overflow-hidden">
              <button
                onClick={() => setExpandedId(expandedId === notice.id ? null : notice.id)}
                className="w-full flex items-start gap-3.5 px-5 py-5 text-left bg-transparent border-none cursor-pointer hover:bg-black/[0.02] transition-smooth"
              >
                {notice.isPinned ? (
                  <div className="w-8 h-8 rounded-full gradient-blue flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[12px]">📌</span>
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[12px] font-bold text-primary">공</span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className={`text-[15.5px] leading-relaxed ${
                    expandedId === notice.id ? 'font-bold' : 'font-semibold'
                  } text-text-primary`}>
                    {notice.title}
                  </p>
                  <p className="text-[13px] text-text-secondary mt-1">{notice.department} · {notice.date}</p>
                </div>
                <svg
                  className={`w-4 h-4 text-text-secondary mt-1.5 shrink-0 transition-transform duration-200 ${
                    expandedId === notice.id ? 'rotate-180' : ''
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              {expandedId === notice.id && (
                <div className="px-5 pb-5 animate-fade-in">
                  <div className="text-[15px] text-text-primary leading-[1.75] whitespace-pre-line bg-[#F4F3F1] rounded-none border-t border-border p-4.5">
                    {notice.content}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredNotices.length === 0 && (
          <div className="text-center py-16 text-text-secondary text-[14px]">
            검색 결과가 없습니다.
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
