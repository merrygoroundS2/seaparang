export default function SearchBar({ placeholder = '검색어를 입력해주세요', value, onChange }) {
  return (
    <div className="relative mx-4 my-3.5">
      <div className="absolute left-4 top-0 bottom-0 flex items-center justify-center pointer-events-none z-10">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="10.5" cy="10.5" r="6.5" stroke="#ACACAC" strokeWidth="2.5" />
          <line x1="15.5" y1="15.5" x2="21" y2="21" stroke="#ACACAC" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full h-12 bg-[#EEEDEB] rounded-none pr-5 text-[15px] font-medium text-text-primary border-none focus:bg-[#EAE8E5] transition-smooth"
        style={{ outline: 'none', paddingLeft: '44px' }}
      />
    </div>
  );
}
