import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import FloatingButton from '../components/FloatingButton';
import { useApp, CURRENT_USER } from '../context/AppContext';

function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      style={{ background: 'rgba(0,0,0,0.45)' }}
    >
      <div className="bg-white w-full max-w-[340px] rounded-2xl p-6 animate-fade-in"
        style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}
      >
        <p className="text-[16px] font-bold text-text-primary text-center mb-6 leading-relaxed">{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 h-11 bg-[#F4F3F1] text-text-secondary rounded-xl text-[15px] font-semibold border-none cursor-pointer">취소</button>
          <button onClick={onConfirm} className="flex-1 h-11 bg-[#FF3B30] text-white rounded-xl text-[15px] font-bold border-none cursor-pointer active:scale-95">삭제</button>
        </div>
      </div>
    </div>
  );
}

export default function QnAListPage() {
  const navigate = useNavigate();
  const { qnas, deleteQna } = useApp();
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  return (
    <div className="page-container bg-bg">
      <Header title="무물보 : 해경편" />

      {/* 자주 묻는 질문 - Horizontal scroll (최대 2개만 표시) */}
      <section className="pt-4 pb-2">
        <h2 className="text-[18px] font-bold text-text-primary px-5 mb-3">자주 묻는 질문</h2>
        <div className="flex gap-3 overflow-x-auto no-scrollbar px-5 pb-2">
          {qnas.filter(item => item.keyTip).slice(0, 2).map((item, i) => (
            <button
              key={item.id}
              onClick={() => navigate(`/qna/${item.id}`)}
              className="min-w-[200px] max-w-[220px] card-elevated card-hover p-4.5 text-left cursor-pointer border-none shrink-0 animate-fade-in"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center mb-3">
                <span className="text-sm font-bold text-primary">Q</span>
              </div>
              <h3 className="text-[15px] font-bold text-text-primary mb-2 line-clamp-2 leading-relaxed">
                {item.question}
              </h3>
              <p className="text-[13px] text-text-secondary leading-[1.6] line-clamp-2">
                {item.answer.substring(0, 60)}...
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* 전체 List */}
      <section className="px-5 pt-8 pb-5">
        <h2 className="text-[16px] font-bold text-text-primary mb-4 pl-1">전체</h2>
        <div className="space-y-5">
          {qnas.map((item, index) => {
            const isMine = item.author?.name === CURRENT_USER || item.name === CURRENT_USER;
            return (
              <div
                key={item.id}
                className="w-full card-elevated border border-border animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative">
                  <button
                    onClick={() => navigate(`/qna/${item.id}`)}
                    className="w-full p-5 text-left cursor-pointer border-none bg-transparent block"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-7 h-7 rounded-full bg-primary-light flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-[12.5px] font-bold text-primary">Q</span>
                      </div>
                      <div className="flex-1 min-w-0 pr-8">
                        <h3 className="text-[16px] font-bold text-text-primary mb-1.5 leading-relaxed">
                          {item.question}
                        </h3>
                        <p className="text-[14px] text-text-secondary leading-[1.6] line-clamp-2">
                          {item.answer.substring(0, 100)}...
                        </p>
                        <div className="flex items-center gap-2 mt-2.5">
                          <span className="text-[12px] font-semibold text-primary bg-primary-light px-3 py-1.5 rounded-none">{item.category}</span>
                          {isMine && (
                            <span className="text-[11px] font-semibold text-[#E65100] bg-[#FFF3E0] px-2.5 py-1 rounded-none">내 질문</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                  {/* 내 질문 삭제 버튼 */}
                  {isMine && (
                    <button
                      onClick={(e) => { e.stopPropagation(); setConfirmDeleteId(item.id); }}
                      className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-[#FFF0F0] flex items-center justify-center bg-transparent border-none cursor-pointer transition-smooth"
                      title="삭제"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                        <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <FloatingButton to="/qna/new" />
      <BottomNav />

      {/* 삭제 확인 모달 */}
      {confirmDeleteId && (
        <ConfirmModal
          message={'질문을 삭제할까요?\n삭제 후 복구가 불가능합니다.'}
          onCancel={() => setConfirmDeleteId(null)}
          onConfirm={() => { deleteQna(confirmDeleteId); setConfirmDeleteId(null); }}
        />
      )}
    </div>
  );
}
