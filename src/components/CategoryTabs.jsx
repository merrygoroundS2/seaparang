export default function CategoryTabs({ categories, activeCategory, onSelect }) {
  return (
    <div className="flex border-b border-border bg-white">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`relative flex-1 py-3.5 text-[14px] font-semibold whitespace-nowrap border-none cursor-pointer transition-smooth bg-transparent text-center ${
            activeCategory === cat
              ? 'text-primary'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          {cat}
          {activeCategory === cat && (
            <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-primary rounded-t-full" />
          )}
        </button>
      ))}
    </div>
  );
}
