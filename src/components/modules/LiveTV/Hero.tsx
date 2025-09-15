import React from 'react';

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className = "" }) => {
  return (
    <div className={`mb-[40px] ${className}`}>
      <h1 className="text-white text-[32px] md:text-[48px] font-bold mb-[16px]">
        Live TV
      </h1>
      <p className="text-gray-400 text-[16px] md:text-[18px]">
        Watch live concerts and performances happening right now
      </p>
    </div>
  );
};

export default Hero;
