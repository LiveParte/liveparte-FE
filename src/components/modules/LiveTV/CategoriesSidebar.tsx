import React from 'react';

interface CategoriesSidebarProps {
  className?: string;
}

const CategoriesSidebar: React.FC<CategoriesSidebarProps> = ({ className = "" }) => {
  const categories = [
    { id: 'favorite', name: 'Favorite', icon: '❤️', active: false },
    { id: 'music', name: 'Music', icon: '🎵', active: false },
    { id: 'kids', name: 'Kids', icon: '😊', active: false },
    { id: 'news', name: 'News', icon: '🌍', active: true },
    { id: 'sports', name: 'Sports', icon: '⚽', active: false },
    { id: 'entertainment', name: 'Entertainment', icon: '🎭', active: false },
  ];

  return (
    <div className={`w-full md:w-[200px] ${className}`}>
      <h3 className="text-white text-[18px] font-bold mb-[20px]">Categories</h3>
      <div className="space-y-[8px]">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`w-full flex items-center gap-[12px] px-[16px] py-[12px] rounded-[8px] text-left transition-colors ${
              category.active
                ? 'bg-white text-black'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <span className="text-[16px]">{category.icon}</span>
            <span className="text-[14px] font-medium">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSidebar;
