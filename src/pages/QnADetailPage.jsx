import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import MascotIcon from '../components/MascotIcon';
import { useApp } from '../context/AppContext';

export default function QnADetailPage() {
  const { id } = useParams();
  const { qnas } = useApp();
  const item = qnas.find((q) => q.id === id);

  if (!item) {
    return (
      <div className="page-container bg-bg">
        <Header title="Q&A 상세" />
        <div className="flex flex-col items-center justify-center h-64 text-text-secondary">
          <span className="text-3xl mb-3">🔍</span>
          <p className="text-[15px]">질문을 찾을 수 없습니다.</p>
        </div>
        <BottomNav />
      </div>
    );
  }

  const hasAnswer = item.answer && item.answer !== '아직 답변이 없습니다. 선배 인턴의 답변을 기다려주세요!';

  return (
    <div className="page-container bg-bg">
      <Header title="Q&A 상세" />

      <div className="px-5 pt-5 pb-6 flex flex-col space-y-8.5">

        {/* ① 상단: 답변자 프로필 - 답변이 있을 때만 표시 */}
        {hasAnswer && (
          <div className="flex flex-col items-center text-center animate-fade-in">
            <div
              className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center mb-2.5"
              style={{ boxShadow: '0 3px 10px rgba(49, 113, 198, 0.12)' }}
            >
              <MascotIcon size={34} />
            </div>
            <p className="text-[17px] font-bold text-text-primary">{item.author.name}</p>
            <p className="text-[13px] text-text-secondary mt-0.5">{item.author.role}</p>
            {item.keyTip && (
              <div className="mt-3 px-4.5 py-2 bg-primary-light rounded-none">
                <p className="text-[13.5px] font-bold text-primary">💡 {item.keyTip}</p>
              </div>
            )}
          </div>
        )}

        {/* ② 질문 버블 */}
        <div className="animate-fade-in flex flex-col items-start gap-1" style={{ animationDelay: '0.1s' }}>
          <span className="text-[13px] text-text-secondary pl-2.5">질문</span>
          <div className="chat-bubble-q text-[15px] leading-[1.65] font-medium">
            {item.question}
          </div>
        </div>

        {/* ③ 카테고리 */}
        {item.category && (
          <div className="flex animate-fade-in" style={{ animationDelay: '0.13s' }}>
            <span className="text-[12px] font-semibold text-primary bg-primary-light px-3 py-1.5 rounded-none ml-2.5">
              {item.category}
            </span>
          </div>
        )}

        {/* ④ 답변 버블 */}
        {hasAnswer ? (
          <div className="animate-fade-in flex flex-col items-start gap-1" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-1.5 pl-2.5 mb-0.5">
              <div className="w-4.5 h-4.5 rounded-full bg-primary-light flex items-center justify-center shrink-0">
                <MascotIcon size={12} />
              </div>
              <span className="text-[13px] text-text-primary font-bold">{item.author.name}</span>
              <span className="text-[12px] text-text-secondary">{item.author.role}</span>
            </div>
            <div className="chat-bubble-a text-[15px] leading-[1.7] whitespace-pre-line">
              {item.answer}
            </div>
          </div>
        ) : (
          <div
            className="bg-white border border-dashed border-border p-6 text-center animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="text-xl mb-2 block">⏳</span>
            <p className="text-[14px] font-bold text-text-primary">답변 대기 중</p>
            <p className="text-[12.5px] text-text-secondary mt-1">
              선배 인턴의 답변을 기다리는 중입니다.
            </p>
          </div>
        )}

        {/* ⑤ 꿀팁 박스 */}
        {item.tip && hasAnswer && (
          <div
            className="bg-[#FFFDF6] border border-[#FFF1D0] rounded-none p-4.5 animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="flex items-start gap-2.5">
              <span className="text-base select-none mt-0.5">💡</span>
              <div className="space-y-1">
                <span className="text-[14px] font-bold text-[#D35400]">꿀팁!</span>
                <p className="text-[15px] text-text-primary leading-[1.7] font-semibold">
                  {item.tip}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

      <BottomNav />
    </div>
  );
}
