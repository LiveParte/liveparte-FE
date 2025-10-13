import React from 'react';
import { useRouter } from "next/router";

interface EmptyStateProps {
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ className = "" }) => {
  const router = useRouter();

  return (
    <div className={`flex flex-col items-center justify-center h-[400px] text-center ${className}`}>
      {/* Large circular icon */}
      <div className="w-[120px] h-[120px] bg-[#2D3748] rounded-full flex items-center justify-center mb-[32px]">
        <svg 
          className="w-[48px] h-[48px] text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" 
          />
        </svg>
      </div>
      
      {/* Main heading */}
      <h3 className="text-white text-[24px] font-semibold mb-[12px]">
        No Live Events
      </h3>
      
      {/* Description */}
      <p className="text-gray-400 text-[16px] max-w-[400px] mb-[32px]">
        There are currently no live events. Check back later or browse our upcoming events.
      </p>
      
      {/* Action button */}
      <button
        onClick={() => router.push('/event')}
        className="bg-[#4A90E2] text-white px-[24px] py-[12px] rounded-[8px] font-medium hover:bg-[#357ABD] transition-colors"
      >
        Browse Events
      </button>
    </div>
  );
};

export default EmptyState;
