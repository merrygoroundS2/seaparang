import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { qnaCategories } from '../data/mockData';
import { useApp } from '../context/AppContext';

export default function QnANewPage() {
  const navigate = useNavigate();
  const { addQna } = useApp();
  const [department, setDepartment] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [question, setQuestion] = useState('');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim() || !category) return;
    addQna({ department, name, category, question });
    setSubmitted(true);
    setTimeout(() => navigate('/qna'), 1000);
  };

  return (
    <div className="page-container bg-bg">
      <Header title="질문 등록하기" />

      <form onSubmit={handleSubmit} className="px-5 pt-7 space-y-8.5 relative">
        {/* 소속부서 */}
        <div className="animate-fade-in relative z-10">
          <label className="text-[14.5px] font-bold text-text-primary mb-2 block pl-1">소속부서</label>
          <input
            type="text"
            placeholder="부서명을 입력해주세요"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full h-12 bg-white rounded-none px-4 text-[15px] text-text-primary border-none"
            style={{ outline: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
          />
        </div>

        {/* 이름 */}
        <div className="animate-fade-in relative z-10" style={{ animationDelay: '0.05s' }}>
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
        <div className={`animate-fade-in relative ${isCategoryOpen ? 'z-40' : 'z-20'}`} style={{ animationDelay: '0.1s' }}>
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
              {qnaCategories.map((cat) => (
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

        {/* 질문 */}
        {category && (
          <div className="animate-fade-in relative z-10">
            <label className="text-[14.5px] font-bold text-text-primary mb-2 block pl-1">질문</label>
            <textarea
              placeholder="질문을 작성해주세요"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={5}
              className="w-full bg-white rounded-none p-4 text-[15px] text-text-primary resize-y min-h-[130px] border-none leading-[1.65]"
              style={{ outline: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
            />
          </div>
        )}

        {/* Submit Button */}
        {category && (
          <button
            type="submit"
            disabled={submitted || !question.trim()}
            className={`w-full h-12 rounded-none font-bold text-[16.5px] cursor-pointer border-none transition-smooth mt-6 relative z-10 ${
              submitted
                ? 'bg-success text-white'
                : 'gradient-blue text-white active:scale-95'
            }`}
            style={{ boxShadow: submitted ? 'none' : '0 4px 12px rgba(49, 113, 198, 0.3)' }}
          >
            {submitted ? '✓ 등록 완료!' : '질문 등록'}
          </button>
        )}
      </form>

      <BottomNav />
    </div>
  );
}
