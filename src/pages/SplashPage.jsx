import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SplashPage() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();
  const { verifyInviteCode } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (verifyInviteCode(code)) {
      navigate('/login');
    } else {
      setError('유효하지 않은 초대코드입니다.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-dvh flex flex-col relative overflow-hidden bg-primary">
      {/* ===== Top Beige/White Section ===== */}
      <div className="relative bg-[#F4F3F1] h-[68dvh] flex flex-col items-center z-10">
        {/* SAE PA RANG Title */}
        <div 
          className="w-full flex flex-col justify-center items-center"
          style={{ height: 'calc(100% - ((min(100vw, 800px) - 48px) / 2.72 + 12px))' }}
        >
          <div className="flex flex-col items-center leading-[0.92] text-center w-full animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', textAlign: 'center' }}>
            <span
              className="text-[64px] font-black tracking-[-1px] text-[#1B3A7B] w-full block text-center"
              style={{ fontFamily: "'Arial Black', 'Impact', sans-serif", fontStyle: 'italic', display: 'block', width: '100%', textAlign: 'center' }}
            >
              SAE
            </span>
            <span
              className="text-[64px] font-black tracking-[-1px] text-[#1B3A7B] w-full block text-center"
              style={{ fontFamily: "'Arial Black', 'Impact', sans-serif", fontStyle: 'italic', display: 'block', width: '100%', textAlign: 'center' }}
            >
              PA
            </span>
            <span
              className="text-[64px] font-black tracking-[-1px] text-[#1B3A7B] w-full block text-center"
              style={{ fontFamily: "'Arial Black', 'Impact', sans-serif", fontStyle: 'italic', display: 'block', width: '100%', textAlign: 'center' }}
            >
              RANG
            </span>
          </div>
        </div>

        {/* Mascot Characters (Absolute Positioned at the bottom, enlarged to 2x) */}
        <div style={{ position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '800px', padding: '0 24px', zIndex: 20, display: 'flex', justifyContent: 'center' }}>
          <div className="animate-fade-in w-full flex justify-center" style={{ animationDelay: '0.15s' }}>
            <img
              src="./mascot-characters.png"
              alt="해양경찰청 마스코트"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Curved wave transition to blue */}
        <div className="absolute bottom-[-1px] left-0 w-full z-10">
          <svg
            viewBox="0 0 480 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full block"
            preserveAspectRatio="none"
            style={{ height: '90px' }}
          >
            <path
              d="M0 90 L0 55 Q80 5 200 30 Q320 55 420 15 Q450 5 480 10 L480 90Z"
              fill="#3171C6"
            />
          </svg>
        </div>
      </div>

      {/* ===== Bottom Blue Section ===== */}
      <div className="h-[32dvh] bg-primary px-6 pt-10 pb-6 flex flex-col items-center justify-center gap-5 relative z-10">
        {/* Invite Code Input */}
        <div className={`w-full max-w-[340px] animate-slide-up ${shake ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>
          <form onSubmit={handleSubmit} className="flex gap-3 mb-2">
            <input
              type="text"
              placeholder="초대코드를 입력하세요"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError('');
              }}
              className="flex-1 h-[48px] bg-white rounded-[8px] px-4 text-sm text-text-primary border-none"
              style={{ outline: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
            />
            <button
              type="submit"
              className="h-[48px] px-5 bg-[#1A1A1A] text-white rounded-[8px] font-semibold text-sm cursor-pointer border-none hover:bg-[#333] active:scale-95 transition-smooth"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
            >
              Submit
            </button>
          </form>
          {error && (
            <p className="text-white/90 text-xs text-center">{error}</p>
          )}
        </div>

        {/* KCG Logo */}
        <div className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <img src="./kcg-logo.png" alt="해양경찰청 로고" className="w-12 h-12 object-contain" />
          <div className="flex flex-col">
            <span className="text-[14px] font-bold text-white tracking-wide">해양경찰청</span>
            <span className="text-[9px] text-white/60 tracking-widest">KOREA COAST GUARD</span>
          </div>
        </div>
      </div>
    </div>
  );
}
