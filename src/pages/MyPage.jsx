import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import MascotIcon from '../components/MascotIcon';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export default function MyPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { todos, toggleTodo, posts } = useApp();

  const displayUser = user || {
    name: '김서연',
    internPeriod: '2026.05 ~ 2026.12',
    department: '운영지원과',
    role: '청년인턴',
    stats: { tips: 3, comments: 12, questions: 2, likes: 47 },
    savedPosts: ['첫 출근 팁 모음', '식권 이용법', '보고서 양식 정리', '복무 규정 요약'],
  };

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const todayTasks = todos.find((t) => t.date === todayStr)?.tasks || todos[0]?.tasks || [];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const stats = [
    { icon: '💡', value: displayUser.stats.tips, label: '작성한 팁', color: '#FFF3E0' },
    { icon: '💬', value: displayUser.stats.comments, label: '작성한 댓글', color: '#E8F0FA' },
    { icon: '❓', value: displayUser.stats.questions, label: '작성한 질문', color: '#F3E5F5' },
    { icon: '👍', value: displayUser.stats.likes, label: '받은 공감', color: '#E8F5E9' },
  ];

  // Find board post for saved post navigation
  const handleSavedPostClick = (postTitle) => {
    const found = posts.find((p) => p.title.includes(postTitle) || postTitle.includes(p.title.substring(0, 5)));
    if (found) navigate(`/board/${found.id}`);
    else navigate('/board');
  };

  return (
    <div className="page-container bg-bg">
      {/* Profile Header with gradient */}
      <div className="gradient-blue px-5 pt-5 pb-14 relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/[0.06]" />
        <div className="absolute bottom-2 left-8 w-20 h-20 rounded-full bg-white/[0.04]" />

        {/* Top bar */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          <h1 className="text-[18px] font-semibold text-white">내 프로필</h1>
          <button
            onClick={handleLogout}
            className="text-[13.5px] text-white/70 bg-white/10 px-3.5 py-2 rounded-full border-none cursor-pointer hover:bg-white/20 transition-smooth font-medium"
          >
            로그아웃
          </button>
        </div>

        {/* Profile Info */}
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center"
            style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          >
            <MascotIcon size={44} />
          </div>
          <div>
            <h2 className="text-[20px] font-bold text-white">{displayUser.name}</h2>
            <p className="text-[14px] text-white/70 mt-0.5">{displayUser.department} · {displayUser.role || '청년인턴'}</p>
            <p className="text-[12.5px] text-white/50 mt-0.5">{displayUser.internPeriod}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid - overlapping gradient */}
      <div className="px-5 -mt-8 relative z-10">
        <div className="grid grid-cols-4 gap-2.5">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="card-elevated-lg p-3 flex flex-col items-center animate-fade-in"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="w-9 h-9 rounded-none flex items-center justify-center mb-1.5"
                style={{ backgroundColor: stat.color }}
              >
                <span className="text-sm">{stat.icon}</span>
              </div>
              <span className="text-[18px] font-bold text-text-primary">{stat.value}</span>
              <span className="text-[11px] text-text-secondary mt-0.5 text-center">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 pt-5 space-y-8.5">
        {/* Saved Posts */}
        <div className="animate-fade-in" style={{ animationDelay: '0.15s' }}>
          <h3 className="text-[16px] font-bold text-text-primary mb-3.5 pl-1">📝 저장한 게시글</h3>
          <div className="flex flex-wrap gap-2.5">
            {displayUser.savedPosts.map((post, i) => (
              <button
                key={i}
                onClick={() => handleSavedPostClick(post)}
                className="text-[13.5px] bg-white px-4 py-2.5 rounded-none text-text-primary cursor-pointer transition-smooth hover:text-primary hover:bg-primary-light font-semibold border-none active:scale-95"
                style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
              >
                {post}
              </button>
            ))}
          </div>
        </div>

        {/* Today's Tasks Preview */}
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-3.5">
            <h3 className="text-[16px] font-bold text-text-primary pl-1">📅 오늘의 할 일</h3>
            <button
              onClick={() => navigate('/todo')}
              className="text-[13px] text-primary bg-transparent border-none cursor-pointer font-semibold hover:opacity-70 transition-smooth"
            >
              전체 보기 →
            </button>
          </div>
          <div className="card-elevated p-5 border border-border">
            {todayTasks.length > 0 ? (
              <div className="space-y-4.5">
                {todayTasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-3">
                    <button
                      onClick={() => toggleTodo(task.id)}
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 cursor-pointer transition-smooth ${
                        task.completed
                          ? 'bg-primary border-primary'
                          : 'border-[#D1D1D6] hover:border-primary bg-white'
                      }`}
                    >
                      {task.completed && (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12l5 5L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                      )}
                    </button>
                    <div className="flex-1">
                      <span className={`text-[14.5px] ${
                        task.completed ? 'text-text-secondary line-through' : 'text-text-primary font-semibold'
                      }`}>
                        {task.title}
                      </span>
                    </div>
                    <span className="text-[12px] text-text-secondary">{task.time}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-text-secondary text-[14px]">
                오늘의 할 일이 없습니다 🎉
              </div>
            )}
          </div>
        </div>

        {/* Menu Links */}
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.25s' }}>
          {['알림 설정', '문의하기', '이용약관'].map((item, i) => (
            <div key={item} className="card-elevated border border-border overflow-hidden">
              <button className="w-full flex items-center justify-between px-5 py-4.5 bg-transparent border-none cursor-pointer text-left">
                <span className="text-[15px] text-text-primary font-semibold">{item}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M9 5l7 7-7 7" stroke="#ACACAC" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="pb-4" />
      </div>

      <BottomNav />
    </div>
  );
}
