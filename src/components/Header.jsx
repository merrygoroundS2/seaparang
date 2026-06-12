import { useNavigate } from 'react-router-dom';
import MascotIcon from './MascotIcon';

export default function Header({ title, showBack = true, showMascot = true }) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 glass-dark z-40 px-5 h-[56px] flex items-center justify-between"
      style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}
    >
      <div className="w-10">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-10 h-10 cursor-pointer bg-transparent border-none rounded-full hover:bg-black/5 transition-smooth"
            aria-label="뒤로가기"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M15 19L8 12L15 5" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>
      <h1 className="text-[18px] font-bold text-text-primary text-center flex-1">{title}</h1>
      <div className="w-10 flex items-center justify-end">
        {showMascot && <MascotIcon size={30} />}
      </div>
    </header>
  );
}
