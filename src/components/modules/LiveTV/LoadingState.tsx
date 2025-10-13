import React from 'react';

interface LoadingStateProps {
  className?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ className = "" }) => {
  return (
    <div className={`flex justify-center items-center h-[400px] ${className}`}>
      <div className="text-white text-[18px]">Loading live events...</div>
    </div>
  );
};

export default LoadingState;
