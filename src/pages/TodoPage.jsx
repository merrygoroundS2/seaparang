import { useState, useMemo } from 'react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { useApp } from '../context/AppContext';

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

// 시간 옵션 생성 (오전/오후 30분 단위)
const TIME_OPTIONS = [];
for (let h = 0; h < 24; h++) {
  for (let m = 0; m < 60; m += 30) {
    const period = h < 12 ? '오전' : '오후';
    const displayH = h === 0 ? 12 : h > 12 ? h - 12 : h;
    const displayM = String(m).padStart(2, '0');
    TIME_OPTIONS.push(`${period} ${displayH}:${displayM}`);
  }
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

export default function TodoPage() {
  const today = new Date();
  const { todos, toggleTodo, addTodo, editTodo, deleteTodo } = useApp();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const [calendarExpanded, setCalendarExpanded] = useState(true);

  // 추가 모달
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskTime, setNewTaskTime] = useState('');

  // 수정 모달
  const [editingTask, setEditingTask] = useState(null); // { id, title, time }
  const [editTitle, setEditTitle] = useState('');
  const [editTime, setEditTime] = useState('');

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const calendarDays = useMemo(() => {
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  }, [firstDay, daysInMonth]);

  const isToday = (day) =>
    day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();

  const selectedDateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`;
  const selectedTasks = todos.find((t) => t.date === selectedDateStr)?.tasks || [];

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); }
    else setCurrentMonth(currentMonth - 1);
  };

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); }
    else setCurrentMonth(currentMonth + 1);
  };

  const hasTasksOnDate = (day) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return todos.some((t) => t.date === dateStr && t.tasks.length > 0);
  };

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    addTodo(selectedDateStr, { title: newTaskTitle.trim(), time: newTaskTime });
    setNewTaskTitle('');
    setNewTaskTime('');
    setShowAddModal(false);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditTime(task.time || '');
  };

  const handleEditTask = () => {
    if (!editTitle.trim()) return;
    editTodo(editingTask.id, { title: editTitle.trim(), time: editTime });
    setEditingTask(null);
  };

  const openModal = () => {
    setNewTaskTitle('');
    setNewTaskTime('');
    setShowAddModal(true);
  };

  // 할일 모달 컴포넌트 (추가/수정 공용)
  const TaskModal = ({ isEdit }) => (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-5"
      style={{ background: 'rgba(0,0,0,0.45)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          isEdit ? setEditingTask(null) : setShowAddModal(false);
        }
      }}
    >
      <div className="bg-white w-full max-w-[420px] rounded-2xl p-6 animate-fade-in"
        style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[17px] font-bold text-text-primary">{isEdit ? '할 일 수정' : '할 일 추가'}</h3>
          <button
            onClick={() => isEdit ? setEditingTask(null) : setShowAddModal(false)}
            className="w-8 h-8 rounded-full bg-[#F4F3F1] flex items-center justify-center border-none cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="#666" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-[14px] font-bold text-text-primary mb-1.5 block">할 일</label>
            <input
              type="text"
              placeholder="할 일을 입력해주세요"
              value={isEdit ? editTitle : newTaskTitle}
              onChange={(e) => isEdit ? setEditTitle(e.target.value) : setNewTaskTitle(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') isEdit ? handleEditTask() : handleAddTask(); }}
              autoFocus
              className="w-full h-12 bg-[#F4F3F1] rounded-xl px-4 text-[15px] text-text-primary border-none"
              style={{ outline: 'none' }}
            />
          </div>
          <div>
            <label className="text-[14px] font-bold text-text-primary mb-1.5 block">시간 (선택)</label>
            <div className="relative">
              <select
                value={isEdit ? editTime : newTaskTime}
                onChange={(e) => isEdit ? setEditTime(e.target.value) : setNewTaskTime(e.target.value)}
                className="w-full h-12 bg-[#F4F3F1] rounded-xl px-4 text-[15px] text-text-primary border-none appearance-none cursor-pointer"
                style={{ outline: 'none' }}
              >
                <option value="">시간 선택 안 함</option>
                {TIME_OPTIONS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9l6 6 6-6" stroke="#999" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>
          <button
            onClick={isEdit ? handleEditTask : handleAddTask}
            disabled={isEdit ? !editTitle.trim() : !newTaskTitle.trim()}
            className="w-full h-12 gradient-blue text-white rounded-xl text-[15.5px] font-bold border-none cursor-pointer active:scale-95 transition-smooth disabled:opacity-50 mt-2"
            style={{ boxShadow: '0 4px 12px rgba(49, 113, 198, 0.3)' }}
          >
            {isEdit ? '저장하기' : '추가하기'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="page-container bg-bg">
      <Header title="오늘의 할 일" />

      {/* Calendar */}
      <div className="card-elevated mx-5 mt-8 overflow-hidden animate-fade-in">
        <div className="flex items-center justify-between px-5 py-4">
          <button onClick={prevMonth} className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center bg-transparent border-none cursor-pointer transition-smooth">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M15 19L8 12L15 5" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <span className="text-[17px] font-bold text-text-primary">
            {currentYear}년 {currentMonth + 1}월
          </span>
          <button onClick={nextMonth} className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center bg-transparent border-none cursor-pointer transition-smooth">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M9 5L16 12L9 19" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {calendarExpanded && (
          <>
            <div className="grid grid-cols-7 px-3">
              {DAYS.map((day) => (
                <div key={day} className={`text-center text-[12.5px] font-bold py-2 ${
                  day === '일' ? 'text-[#FF3B30]' : day === '토' ? 'text-primary' : 'text-text-secondary'
                }`}>
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 px-3 pb-3">
              {calendarDays.map((day, index) => (
                <button
                  key={index}
                  disabled={!day}
                  onClick={() => day && setSelectedDate(day)}
                  className={`aspect-square flex flex-col items-center justify-center text-[14px] cursor-pointer border-none bg-transparent relative transition-smooth ${
                    !day ? 'invisible' : ''
                  } ${day === selectedDate ? 'font-bold' : 'font-medium text-text-primary'}`}
                >
                  <span className={`w-9 h-9 flex items-center justify-center rounded-full transition-smooth ${
                    isToday(day) ? 'gradient-blue text-white font-bold'
                    : day === selectedDate ? 'bg-primary-light text-primary'
                    : 'hover:bg-black/5'
                  }`}>
                    {day}
                  </span>
                  {day && hasTasksOnDate(day) && (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-0.5 absolute bottom-1" />
                  )}
                </button>
              ))}
            </div>
          </>
        )}

        <button
          onClick={() => setCalendarExpanded(!calendarExpanded)}
          className="w-full py-2 flex items-center justify-center bg-transparent border-none cursor-pointer hover:bg-black/[0.02] transition-smooth"
        >
          <svg
            className={`w-5 h-5 text-text-secondary transition-transform duration-200 ${calendarExpanded ? '' : 'rotate-180'}`}
            viewBox="0 0 24 24" fill="none"
          >
            <path d="M6 15l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Tasks */}
      <div className="px-5 pt-14 pb-5">
        <div className="flex flex-col items-center mb-10">
          <h3 className="text-[17px] font-bold text-text-primary mb-5">
            {currentMonth + 1}월 {selectedDate}일 {DAYS[new Date(currentYear, currentMonth, selectedDate).getDay()]}요일
          </h3>
          <button
            onClick={openModal}
            className="w-9 h-9 gradient-blue rounded-full flex items-center justify-center border-none cursor-pointer active:scale-90 transition-smooth"
            style={{ boxShadow: '0 4px 12px rgba(49, 113, 198, 0.35)' }}
            aria-label="할 일 추가"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {selectedTasks.length > 0 ? (
          <div className="space-y-4.5">
            {selectedTasks.map((task, index) => (
              <div
                key={task.id}
                className="card-elevated p-5 flex items-center gap-3.5 animate-fade-in border border-border"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* 체크박스 */}
                <button
                  onClick={() => toggleTodo(task.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer shrink-0 transition-smooth ${
                    task.completed ? 'bg-primary border-primary' : 'bg-white border-[#D1D1D6] hover:border-primary'
                  }`}
                >
                  {task.completed && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12l5 5L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>

                {/* 내용 */}
                <div className="flex-1 min-w-0">
                  <p className={`text-[15.5px] font-semibold ${
                    task.completed ? 'text-text-secondary line-through' : 'text-text-primary'
                  }`}>
                    {task.title}
                  </p>
                  {task.time && <p className="text-[13px] text-text-secondary mt-0.5">{task.time}</p>}
                </div>

                {/* 수정 버튼 */}
                <button
                  onClick={() => openEditModal(task)}
                  className="w-7 h-7 rounded-full hover:bg-primary-light flex items-center justify-center bg-transparent border-none cursor-pointer transition-smooth shrink-0"
                  title="수정"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="#3171C6" strokeWidth="2" strokeLinecap="round" />
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#3171C6" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>

                {/* 삭제 버튼 */}
                <button
                  onClick={() => deleteTodo(task.id)}
                  className="w-7 h-7 rounded-full hover:bg-[#FFF0F0] flex items-center justify-center bg-transparent border-none cursor-pointer transition-smooth shrink-0"
                  title="삭제"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-text-secondary text-[14px]">
            <span className="text-3xl block mb-2">🎉</span>
            할 일이 없습니다
            <p className="mt-2 text-[13px]">+ 버튼을 눌러 할 일을 추가해보세요</p>
          </div>
        )}
      </div>

      {/* 추가 모달 */}
      {showAddModal && <TaskModal isEdit={false} />}

      {/* 수정 모달 */}
      {editingTask && <TaskModal isEdit={true} />}

      <BottomNav />
    </div>
  );
}
