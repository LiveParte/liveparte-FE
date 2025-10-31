import React, { useState } from "react";

interface CategoriesSidebarProps {
  className?: string;
}

const CategoriesSidebar: React.FC<CategoriesSidebarProps> = ({
  className = "",
}) => {
  const categories = [
    { id: "favorite", name: "Favorite", icon: "❤️" },
    { id: "music", name: "Music", icon: "🎵" },
    { id: "kids", name: "Kids", icon: "😊" },
    { id: "news", name: "News", icon: "🌍" },
    { id: "sports", name: "Sports", icon: "⚽" },
    { id: "entertainment", name: "Entertainment", icon: "🎭" },
  ];

  const [selectedId, setSelectedId] = useState<string>("news");

  return (
    <>
      {/* Mobile: Horizontal tabs with icons only */}
      <nav
        className="md:hidden flex items-center gap-2 overflow-x-auto pb-2 px-1 scrollbar-hide"
        aria-label="Live TV categories"
      >
        {categories.map((category) => {
          const isActive = selectedId === category.id;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedId(category.id)}
              aria-pressed={isActive}
              className={`flex-shrink-0 flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors focus:outline-none focus:ring-0 ${
                isActive ? "bg-white/20" : "bg-white/5 hover:bg-white/10"
              }`}
              title={category.name}
            >
              <span
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg select-none ${
                  isActive ? "bg-white text-black" : "bg-white/10 text-white"
                }`}
              >
                {category.icon}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Desktop: Vertical sidebar with icons and labels */}
      <aside className={`hidden md:block w-full md:w-[240px] ${className}`}>
        <div className="sticky top-[88px]">
          <div className="mb-[12px]">
            <h3 className="text-white text-[16px] tracking-wide uppercase">
              Categories
            </h3>
          </div>

          <nav className="space-y-[2px]" aria-label="Live TV categories">
            {categories.map((category) => {
              const isActive = selectedId === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedId(category.id)}
                  aria-pressed={isActive}
                  className={`group relative w-full flex items-center gap-[12px] pl-[14px] pr-[10px] py-[10px] rounded-[6px] text-left transition-colors focus:outline-none focus:ring-0`}
                >
                  {/* Active rail */}
                  <span
                    className={`absolute left-0 top-0 h-full w-[3px] transition-colors ${
                      isActive
                        ? "bg-white"
                        : "bg-transparent group-hover:bg-white/40"
                    }`}
                  />

                  {/* Icon badge */}
                  <span
                    className={`w-[30px] h-[30px] rounded-full flex items-center justify-center text-[15px] select-none ${
                      isActive
                        ? "bg-white text-black"
                        : "bg-white/10 text-white"
                    }`}
                  >
                    {category.icon}
                  </span>

                  {/* Label */}
                  <span
                    className={`text-[14px] font-medium select-none transition-colors ${
                      isActive
                        ? "text-white"
                        : "text-gray-300 group-hover:text-white"
                    }`}
                  >
                    {category.name}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default CategoriesSidebar;
