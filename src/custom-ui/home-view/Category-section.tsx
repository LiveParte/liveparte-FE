import React from "react";
import { Newspaper, Film, Trophy, Globe, Music, Palette } from "lucide-react";

export default function CategorySection() {
  const categories = [
    {
      icon: Newspaper,
      name: "News",
      channels: "12 channels",
    },
    {
      icon: Film,
      name: "Movies",
      channels: "18 channels",
    },
    {
      icon: Trophy,
      name: "Sports",
      channels: "8 channels",
    },
    {
      icon: Globe,
      name: "Documentary",
      channels: "6 channels",
    },
    {
      icon: Music,
      name: "Music",
      channels: "4 channels",
    },
    {
      icon: Palette,
      name: "Kids",
      channels: "5 channels",
    },
  ];

  return (
    <section className="py-24 px-[20px] sm:px-[40px] lg:px-[120px] bg-black-background">
      <div className="w-full">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-white.200 text-xl font-bold">
            Browse by Category
          </h2>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div
                key={index}
                className="bg-grey.300/10 rounded-2xl p-6 text-center hover:bg-grey.300/20 transition-colors cursor-pointer group"
              >
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <IconComponent className="w-8 h-8 text-white.200 group-hover:text-blue-400 transition-colors" />
                </div>

                {/* Category Name */}
                <h3 className="text-white.200 font-bold text-lg mb-2">
                  {category.name}
                </h3>

                {/* Channel Count */}
                <p className="text-grey.200 text-sm">{category.channels}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
