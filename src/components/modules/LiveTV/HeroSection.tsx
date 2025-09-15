import React from 'react';

interface HeroSectionProps {
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ className = "" }) => {
  return (
    <div className={`relative h-[500px] md:h-[600px] w-full ${className}`}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/liveparte_banner.png')",
          filter: 'brightness(0.6)'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="px-[60px] md:px-[80px] lg:px-[120px] max-w-[800px]">
          {/* Channel Info - CNN logo and LIVE indicator */}
          <div className="flex items-center gap-[16px] mb-[24px]">
            <div className="bg-red-600 text-white px-[16px] py-[8px] rounded-[6px] text-[16px] font-bold">
              CNN
            </div>
            <div className="flex items-center gap-[8px]">
              <div className="w-[6px] h-[6px] bg-red-500 rounded-full"></div>
              <span className="text-white text-[16px] font-medium">LIVE NOW</span>
            </div>
          </div>
          
          {/* Title - No text wrapping */}
          <h1 className="text-white text-[56px] md:text-[72px] font-bold mb-[24px] leading-[0.9] whitespace-nowrap">
            International Desk
          </h1>
          
          {/* Description */}
          <p className="text-gray-200 text-[20px] md:text-[22px] mb-[32px] leading-relaxed max-w-[600px]">
            Experience the latest episode of this gripping series as secrets unfold and alliances shift in real-time.
          </p>
          
          {/* Metadata */}
          <div className="flex flex-wrap gap-[20px] mb-[40px]">
            <span className="text-gray-300 text-[16px]">Started 8:00 PM</span>
            <span className="text-gray-300 text-[16px]">•</span>
            <span className="text-gray-300 text-[16px]">Drama</span>
            <span className="text-gray-300 text-[16px]">•</span>
            <span className="text-gray-300 text-[16px]">Season 3, Episode 12</span>
            <span className="text-gray-300 text-[16px]">•</span>
            <span className="text-gray-300 text-[16px]">TV-14</span>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-[20px]">
            <button className="bg-white text-black px-[32px] py-[16px] rounded-[8px] font-semibold text-[16px] flex items-center gap-[12px] hover:bg-gray-100 transition-colors border-2 border-black">
              <svg className="w-[20px] h-[20px]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Watch Live
            </button>
            <button className="bg-gray-600 text-white px-[32px] py-[16px] rounded-[8px] font-medium text-[16px] flex items-center gap-[12px] hover:bg-gray-500 transition-colors">
              <svg className="w-[20px] h-[20px]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              Add Channel To Favorites
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
