import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { boardCategories } from '../data/mockData';
import { useApp } from '../context/AppContext';

const writeCategories = boardCategories.filter((c) => c !== '전체' && c !== 'HOT');

export default function BoardNewPage() {
  const navigate = useNavigate();
  const { addPost } = useApp();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !category) return;
    addPost({
      author: name || '익명',
      department: '운영지원과',
      category,
      title,
      content,
      preview: content.substring(0, 60) + (content.length > 60 ? '...' : ''),
      thumbnail: null,
    });
    setSubmitted(true);
    setTimeout(() => navigate('/board'), 1000);
  };

  return (
    <div className="page-container bg-bg">
      <Header title="게시글 작성" />

      <form onSubmit={handleSubmit} className="px-5 pt-7 space-y-8.5 relative">
        {/* 이름 */}
        <div className="animate-fade-in relative z-10">
          <label className="text-[14.5px] font-bold text-text-primary mb-2 block pl-1">이름</label>
          <input
            type="text"
            placeholder="이름을 입력해주세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-12 bg-white rounded-none px-4 text-[15px] text-text-primary border-none"
            style={{ outline: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
          />
        </div>

        {/* 카테고리 */}
        <div className={`animate-fade-in relative ${isCategoryOpen ? 'z-40' : 'z-20'}`} style={{ animationDelay: '0.05s' }}>
          <label className="text-[14.5px] font-bold text-text-primary mb-2 block pl-1">카테고리</label>
          <button
            type="button"
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="w-full h-12 bg-white rounded-none px-4 text-[15px] text-left flex items-center justify-between cursor-pointer border-none"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
          >
            <span className={category ? 'text-text-primary font-medium' : 'text-text-secondary'}>
              {category || '카테고리를 선택해주세요'}
            </span>
            <svg
              className={`w-4.5 h-4.5 text-text-secondary transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`}
              viewBox="0 0 24 24" fill="none"
            >
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          {isCategoryOpen && (
            <div className="absolute top-full left-0 w-full bg-white rounded-none mt-2 z-50 overflow-hidden animate-scale-in"
              style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
            >
              {writeCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setCategory(cat);
                    setIsCategoryOpen(false);
                  }}
                  className={`w-full px-4 py-3.5 text-[15px] text-left cursor-pointer border-none bg-transparent hover:bg-[#F4F3F1] transition-smooth ${
                    category === cat ? 'text-primary font-bold' : 'text-text-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 제목 */}
        <div className="animate-fade-in relative z-10" style={{ animationDelay: '0.1s' }}>
          <label className="text-[14.5px] font-bold text-text-primary mb-2 block pl-1">제목</label>
          <input
            type="text"
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-12 bg-white rounded-none px-4 text-[15px] text-text-primary border-none"
            style={{ outline: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
          />
        </div>

        {/* 내용 */}
        <div className="animate-fade-in relative z-10" style={{ animationDelay: '0.15s' }}>
          <label className="text-[14.5px] font-bold text-text-primary mb-2 block pl-1">내용</label>
          <textarea
            placeholder="내용을 입력해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="w-full bg-white rounded-none p-4 text-[15px] text-text-primary resize-y min-h-[160px] border-none leading-[1.65]"
            style={{ outline: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
          />
        </div>

        {/* Image Upload Button */}
        <button
          type="button"
          className="w-full h-12 bg-white rounded-none text-[14.5px] font-semibold text-text-secondary cursor-pointer flex items-center justify-center gap-2 hover:text-primary transition-smooth animate-fade-in border-none relative z-10"
          style={{ animationDelay: '0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '2px dashed #E8E8E6' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="0" stroke="currentColor" strokeWidth="2" />
            <circle cx="8.5" cy="8.5" r="2" fill="currentColor" />
            <path d="M3 16l5-5 4 4 3-3 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          이미지 등록하기
        </button>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitted || !title.trim() || !content.trim() || !category}
          className={`w-full h-12 rounded-none font-bold text-[16.5px] cursor-pointer border-none transition-smooth relative z-10 ${
            submitted
              ? 'bg-success text-white'
              : 'gradient-blue text-white active:scale-95'
          }`}
          style={{ boxShadow: submitted ? 'none' : '0 4px 12px rgba(49, 113, 198, 0.3)' }}
        >
          {submitted ? '✓ 등록 완료!' : '게시글 등록'}
        </button>
      </form>

      <BottomNav />
    </div>
  );
}
