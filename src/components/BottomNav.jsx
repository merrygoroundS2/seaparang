import { useNavigate, useLocation } from 'react-router-dom';

const tabs = [
  {
    path: '/home',
    label: '홈',
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V9.5Z"
          fill={active ? '#3171C6' : 'none'}
          stroke={active ? '#3171C6' : '#ACACAC'}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    path: '/board',
    label: '게시판',
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3"
          fill={active ? '#3171C6' : 'none'}
          stroke={active ? '#3171C6' : '#ACACAC'}
          strokeWidth="1.5"
        />
        <line x1="7" y1="8" x2="17" y2="8" stroke={active ? '#FFFFFF' : '#ACACAC'} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="7" y1="12" x2="17" y2="12" stroke={active ? '#FFFFFF' : '#ACACAC'} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="7" y1="16" x2="13" y2="16" stroke={active ? '#FFFFFF' : '#ACACAC'} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    path: '/todo',
    label: '할 일',
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="17" rx="3"
          fill={active ? '#3171C6' : 'none'}
          stroke={active ? '#3171C6' : '#ACACAC'}
          strokeWidth="1.5"
        />
        <line x1="3" y1="9" x2="21" y2="9" stroke={active ? '#FFFFFF' : '#ACACAC'} strokeWidth="1.5" />
        <line x1="8" y1="3" x2="8" y2="6" stroke={active ? '#3171C6' : '#ACACAC'} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="16" y1="3" x2="16" y2="6" stroke={active ? '#3171C6' : '#ACACAC'} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8.5" cy="13.5" r="1" fill={active ? '#FFFFFF' : '#ACACAC'} />
        <circle cx="12" cy="13.5" r="1" fill={active ? '#FFFFFF' : '#ACACAC'} />
        <circle cx="15.5" cy="13.5" r="1" fill={active ? '#FFFFFF' : '#ACACAC'} />
      </svg>
    ),
  },
  {
    path: '/tips',
    label: '팁',
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="10" r="7"
          fill={active ? '#3171C6' : 'none'}
          stroke={active ? '#3171C6' : '#ACACAC'}
          strokeWidth="1.5"
        />
        <line x1="10" y1="17" x2="14" y2="17" stroke={active ? '#3171C6' : '#ACACAC'} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="10" y1="20" x2="14" y2="20" stroke={active ? '#3171C6' : '#ACACAC'} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="8" r="1" fill={active ? '#FFFFFF' : '#ACACAC'} />
        <line x1="12" y1="9" x2="12" y2="13" stroke={active ? '#FFFFFF' : '#ACACAC'} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    path: '/mypage',
    label: '마이',
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4"
          fill={active ? '#3171C6' : 'none'}
          stroke={active ? '#3171C6' : '#ACACAC'}
          strokeWidth="1.5"
        />
        <path d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20"
          stroke={active ? '#3171C6' : '#ACACAC'}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/home') return location.pathname === '/home';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] glass-dark z-50"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)', boxShadow: '0 -1px 12px rgba(0,0,0,0.06)' }}
    >
      <div className="flex items-center justify-around h-[64px]">
        {tabs.map((tab) => {
          const active = isActive(tab.path);
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center gap-1 flex-1 py-1.5 cursor-pointer bg-transparent border-none transition-smooth"
            >
              <div className="relative">
                {tab.icon(active)}
              </div>
              <span
                className={`text-[11.5px] font-semibold transition-smooth ${
                  active ? 'text-primary' : 'text-[#ACACAC]'
                }`}
              >
                {tab.label}
              </span>
              {active && (
                <span className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
