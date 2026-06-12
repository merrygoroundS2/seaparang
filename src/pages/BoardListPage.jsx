import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import SearchBar from '../components/SearchBar';
import CategoryTabs from '../components/CategoryTabs';
import FloatingButton from '../components/FloatingButton';
import { boardCategories } from '../data/mockData';
import { useApp, CURRENT_USER } from '../context/AppContext';

function ConfirmModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6" style={{ background: 'rgba(0,0,0,0.45)' }}>
      <div className="bg-white w-full max-w-[340px] rounded-2xl p-6 animate-fade-in" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}>
        <p className="text-[16px] font-bold text-text-primary text-center mb-6 leading-relaxed">게시글을 삭제할까요?{'\n'}삭제 후 복구가 불가능합니다.</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 h-11 bg-[#F4F3F1] text-text-secondary rounded-xl text-[15px] font-semibold border-none cursor-pointer">취소</button>
          <button onClick={onConfirm} className="flex-1 h-11 bg-[#FF3B30] text-white rounded-xl text-[15px] font-bold border-none cursor-pointer active:scale-95">삭제</button>
        </div>
      </div>
    </div>
  );
}

export default function BoardListPage() {
  const navigate = useNavigate();
  const { posts, deletePost } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('전체');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.includes(searchQuery) || post.preview.includes(searchQuery);
    const matchesCategory =
      activeCategory === '전체' ||
      (activeCategory === 'HOT' && post.isHot) ||
      post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categoryColors = {
    '신입': { bg: '#E8F5E9', text: '#2E7D32' },
    '수료자': { bg: '#F3E5F5', text: '#7B1FA2' },
    '자유': { bg: '#E3F2FD', text: '#1565C0' },
    'Q&A': { bg: '#FFF3E0', text: '#E65100' },
  };

  return (
    <div className="page-container bg-bg">
      <Header title="게시판" />
      <div className="mx-1">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>
      <CategoryTabs
        categories={boardCategories}
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />

      {activeCategory === 'HOT' && (
        <div className="mx-5 mb-5 px-4 py-3.5 bg-[#FFF8E1] rounded-none text-[12px] text-[#F57F17] text-center font-medium">
          🔥 좋아요 10개를 받으면 HOT 게시물로 자동 선정됩니다
        </div>
      )}

      {/* Post List */}
      <div className="px-5 pb-5">
        {filteredPosts.length > 0 ? (
          <div className="space-y-5">
            {filteredPosts.map((post, index) => {
              const isMine = post.author === CURRENT_USER;
              return (
                <div
                  key={post.id}
                  className="relative card-elevated border border-border animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <button
                    onClick={() => navigate(`/board/${post.id}`)}
                    className="w-full p-5 text-left cursor-pointer border-none bg-transparent block"
                  >
                    <div className="flex gap-3">
                      <div className="flex-1 min-w-0">
                        {/* Tags */}
                        <div className="flex gap-2 mb-3.5">
                          <span
                            className="text-[12px] font-bold px-3 py-1.5 rounded-none"
                            style={{
                              backgroundColor: categoryColors[post.category]?.bg || '#E8F0FA',
                              color: categoryColors[post.category]?.text || '#3171C6',
                            }}
                          >
                            {post.category}
                          </span>
                          {post.isHot && (
                            <span className="text-[12px] font-bold px-3 py-1.5 rounded-none bg-[#FFF3E0] text-[#E65100]">
                              🔥 HOT
                            </span>
                          )}
                          {isMine && (
                            <span className="text-[11px] font-semibold px-2.5 py-1.5 rounded-none bg-[#E8F0FA] text-primary">
                              내 글
                            </span>
                          )}
                        </div>
                        {/* Title & Preview */}
                        <h3 className="text-[16px] font-bold text-text-primary mb-2 line-clamp-1 pr-6">{post.title}</h3>
                        <p className="text-[14px] text-text-secondary leading-[1.65] line-clamp-2">{post.preview}</p>
                        {/* Stats */}
                        <div className="flex items-center gap-3.5 mt-4">
                          <span className="text-[12.5px] text-text-secondary flex items-center gap-1.5">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                              <path d="M12 21C12 21 4 14.36 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12 4 12 4S12.76 3 14.5 3C17.58 3 20 5.42 20 8.5C20 14.36 12 21 12 21Z" fill="#FFB3B3" stroke="#FF8A8A" strokeWidth="1"/>
                            </svg>
                            {post.likes}
                          </span>
                          <span className="text-[12.5px] text-text-secondary flex items-center gap-1.5">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="#ACACAC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            {post.comments}
                          </span>
                          <span className="text-[12.5px] text-text-secondary ml-auto">{post.timeAgo}</span>
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* 내 게시글 삭제/수정 버튼 */}
                  {isMine && (
                    <div className="absolute top-3.5 right-3.5 flex gap-1.5">
                      <button
                        onClick={(e) => { e.stopPropagation(); navigate(`/board/${post.id}`); }}
                        className="w-7 h-7 rounded-full hover:bg-primary-light flex items-center justify-center bg-transparent border-none cursor-pointer transition-smooth"
                        title="수정"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="#3171C6" strokeWidth="2" strokeLinecap="round" />
                          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#3171C6" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setConfirmDeleteId(post.id); }}
                        className="w-7 h-7 rounded-full hover:bg-[#FFF0F0] flex items-center justify-center bg-transparent border-none cursor-pointer transition-smooth"
                        title="삭제"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                          <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 text-text-secondary text-sm">
            게시글이 없습니다.
          </div>
        )}
      </div>

      <FloatingButton to="/board/new" />
      <BottomNav />

      {confirmDeleteId && (
        <ConfirmModal
          onCancel={() => setConfirmDeleteId(null)}
          onConfirm={() => { deletePost(confirmDeleteId); setConfirmDeleteId(null); }}
        />
      )}
    </div>
  );
}
