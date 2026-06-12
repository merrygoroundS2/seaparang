import { useNavigate } from 'react-router-dom';

export default function FloatingButton({ to }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="fixed bottom-[96px] w-14 h-14 gradient-blue rounded-full flex items-center justify-center cursor-pointer border-none z-40 active:scale-90 transition-smooth animate-float"
      style={{ 
        right: 'max(calc(50% - 240px + 24px), 24px)',
        boxShadow: '0 4px 16px rgba(49, 113, 198, 0.4)'
      }}
      aria-label="새로 작성"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <line x1="12" y1="5" x2="12" y2="19" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="5" y1="12" x2="19" y2="12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </button>
  );
}
