import React from 'react';
import HeroSection from './HeroSection';
import CategoriesSidebar from './CategoriesSidebar';
import ProgramGuide from './ProgramGuide';

interface LiveTVProps {
  className?: string;
}

const LiveTV: React.FC<LiveTVProps> = ({ className = "" }) => {
  return (
    <div className={`${className}`}>
      {/* Hero Section - Full width, directly below navigation with proper spacing */}
      <div className="mt-[80px]">
        <HeroSection />
      </div>
      
      {/* Bottom Section - Categories and Program Guide with padding */}
      <div className="px-[20px] md:px-[40px] lg:px-[120px] py-[40px]">
        <div className="flex flex-col lg:flex-row gap-[32px]">
          {/* Categories Sidebar */}
          <div className="relative">
            <CategoriesSidebar />
            {/* Faint vertical separator line */}
            <div className="hidden lg:block absolute top-0 right-0 w-[1px] h-full bg-white/10" />
          </div>
          
          {/* Program Guide */}
          <ProgramGuide />
        </div>
      </div>
    </div>
  );
};

export default LiveTV;
