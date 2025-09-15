"use client";
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface ProgramGuideProps {
  className?: string;
}

const ProgramGuide: React.FC<ProgramGuideProps> = ({ className = "" }) => {
  const timeSlots = ['20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00'];
  const currentTime = '20:45';

  const channels = [
    {
      id: 'cnn',
      name: 'CNN',
      logo: 'CNN',
      programs: [
        {
          title: 'Breaking News Tonight',
          time: '20:00 - 21:00',
          status: 'live',
          description: 'Live coverage of today\'s most important stories',
          genre: 'TV-PG News',
          timeLeft: '30m Left',
          breaking: true,
          progress: 70
        },
        {
          title: 'Anderson Cooper 360',
          time: '21:00 - 22:00',
          status: 'upcoming',
          description: 'In-depth analysis of current events',
          genre: 'News',
          timeLeft: null,
          breaking: false,
          progress: 0
        },
        {
          title: 'CNN Tonight',
          time: '22:00 - 23:00',
          status: 'upcoming',
          description: 'Late night news and commentary',
          genre: 'News',
          timeLeft: null,
          breaking: false,
          progress: 0
        },
        {
          title: 'CNN Newsroom',
          time: '23:00 - 00:00',
          status: 'upcoming',
          description: 'Overnight news coverage',
          genre: 'News',
          timeLeft: null,
          breaking: false,
          progress: 0
        },
        {
          title: 'Early Start',
          time: '00:00 - 01:00',
          status: 'upcoming',
          description: 'Early morning news program',
          genre: 'News',
          timeLeft: null,
          breaking: false,
          progress: 0
        },
        {
          title: 'CNN This Morning',
          time: '01:00 - 02:00',
          status: 'upcoming',
          description: 'Morning news and weather',
          genre: 'News',
          timeLeft: null,
          breaking: false,
          progress: 0
        },
        {
          title: 'New Day',
          time: '02:00 - 03:00',
          status: 'upcoming',
          description: 'Early morning news program',
          genre: 'News',
          timeLeft: null,
          breaking: false,
          progress: 0
        }
      ]
    },
    {
      id: 'bbc',
      name: 'BBC World',
      logo: 'BBC',
      programs: [
        {
          title: 'BBC World News',
          time: '20:00 - 21:00',
          status: 'live',
          description: 'Global news and current affairs',
          genre: 'News',
          timeLeft: '30m Left',
          breaking: false,
          progress: 0
        },
        {
          title: 'Hardtalk',
          time: '21:00 - 22:00',
          status: 'upcoming',
          description: 'In-depth interviews with world leaders',
          genre: 'News',
          timeLeft: null,
          breaking: false,
          progress: 0
        },
        {
          title: 'Newsday',
          time: '22:00 - 23:00',
          status: 'upcoming',
          description: 'Morning news program',
          genre: 'News',
          timeLeft: null,
          breaking: false,
          progress: 0
        },
        {
          title: 'BBC World News',
          time: '23:00 - 00:00',
          status: 'upcoming',
          description: 'Late night global news',
          genre: 'News',
          timeLeft: null,
          breaking: false,
          progress: 0
        },
        {
          title: 'World Business Report',
          time: '00:00 - 01:00',
          status: 'upcoming',
          description: 'Global business and financial news',
          genre: 'Business',
          timeLeft: null,
          breaking: false,
          progress: 0
        },
        {
          title: 'BBC News',
          time: '01:00 - 02:00',
          status: 'upcoming',
          description: 'Overnight news coverage',
          genre: 'News',
          timeLeft: null,
          breaking: false,
          progress: 0
        },
        {
          title: 'World News Today',
          time: '02:00 - 03:00',
          status: 'upcoming',
          description: 'Global news and analysis',
          genre: 'News',
          timeLeft: null,
          breaking: false,
          progress: 0
        }
      ]
    }
  ];

  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  // Horizontal scroll component with proper drag functionality
  const HorizontalScrollView = ({ 
    children, 
    className = ""
  }: { 
    children: React.ReactNode; 
    className?: string;
  }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    return (
      <div className={`relative w-full ${className}`}>
        {/* Scrollable container with drag functionality */}
        <div
          ref={containerRef}
          className="overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            touchAction: 'pan-x',
            overscrollBehavior: 'contain'
          }}
        >
          <motion.div 
            ref={scrollRef}
            className="flex gap-4 py-2"
            style={{ width: 'max-content' }}
            drag="x"
            dragConstraints={containerRef}
            dragElastic={0.1}
            dragMomentum={true}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            whileDrag={{ 
              cursor: 'grabbing',
              scale: 0.98
            }}
            animate={{ 
              cursor: isDragging ? 'grabbing' : 'grab',
              scale: isDragging ? 0.98 : 1
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30 
            }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    );
  };

  return (
    <div className={`flex-1 ${className}`} style={{ overflow: 'hidden' }}>
      {/* Header with current time */}
      <div className="flex justify-between items-center mb-[20px]">
        <h3 className="text-white text-[18px] font-bold">Program Guide</h3>
        <div className="flex items-center gap-[8px] text-gray-400">
          <svg className="w-[16px] h-[16px]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          <span className="text-[14px] font-medium">{currentTime}</span>
        </div>
      </div>

      {/* Time slots header - horizontal scrollable */}
      <div className="flex mb-[16px]">
        <div className="w-[120px] flex-shrink-0"></div>
        <div className="flex-1 min-w-0">
          <HorizontalScrollView>
            {timeSlots.map((time, index) => (
              <motion.div
                key={`time-${index}`}
                className="text-center text-gray-400 text-[12px] font-medium py-[8px] min-w-[120px] flex-shrink-0"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {time}
              </motion.div>
            ))}
          </HorizontalScrollView>
        </div>
      </div>

      {/* Channels and programs */}
      <div className="space-y-[24px]">
        {channels.map((channel) => (
          <div key={channel.id} className="space-y-[12px]">
            {/* Channel logo and name */}
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-[120px] flex-shrink-0 flex items-center">
                <div className="flex items-center gap-[8px]">
                  <div className="bg-gray-800 text-white px-[8px] py-[4px] rounded-[4px] text-[12px] font-bold">
                    {channel.logo}
                  </div>
                  <span className="text-white text-[14px] font-medium">{channel.name}</span>
                </div>
              </div>
            </motion.div>
            
            {/* Programs timeline - horizontal scrollable with drag */}
            <div className="flex">
              <div className="w-[120px] flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <HorizontalScrollView>
                  {channel.programs.map((program, index) => (
                    <motion.div
                      key={`${channel.id}-${program.title}-${index}`}
                      className={`min-w-[300px] flex-shrink-0 rounded-[8px] border cursor-pointer transition-all relative p-[16px] ${
                        program.status === 'live'
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
                      } ${selectedProgram === `${channel.id}-${index}` ? 'ring-2 ring-blue-500' : ''}`}
                      whileHover={{ 
                        scale: 1.05,
                        y: -2,
                        transition: { type: "spring", stiffness: 300 }
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedProgram(`${channel.id}-${index}`)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {/* LIVE badge */}
                      {program.status === 'live' && (
                        <motion.div 
                          className="absolute top-[12px] right-[12px] bg-red-600 text-white px-[8px] py-[3px] rounded-[4px] text-[11px] font-bold"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                        >
                          LIVE
                        </motion.div>
                      )}

                      {/* BREAKING NEWS badge */}
                      {program.breaking && (
                        <motion.div 
                          className="bg-blue-600 text-white px-[8px] py-[3px] rounded-[4px] text-[11px] font-bold mb-[12px] inline-block"
                          initial={{ opacity: 0, scale: 0.8, x: -20 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                        >
                          BREAKING NEWS
                        </motion.div>
                      )}

                      {/* Bell icon for upcoming programs */}
                      {program.status === 'upcoming' && (
                        <motion.div 
                          className="absolute top-[12px] right-[12px] text-gray-400"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                          </svg>
                        </motion.div>
                      )}

                      <div className="mb-[12px]">
                        <h4 className={`text-[16px] font-semibold ${
                          program.status === 'live' ? 'text-white' : 'text-white'
                        }`}>
                          {program.title}
                        </h4>
                      </div>
                      
                      <div className={`text-[13px] mb-[6px] ${
                        program.status === 'live' ? 'text-gray-300' : 'text-gray-400'
                      }`}>
                        {program.genre}
                      </div>
                      
                      <p className={`text-[13px] mb-[8px] leading-relaxed ${
                        program.status === 'live' ? 'text-gray-300' : 'text-gray-400'
                      }`}>
                        {program.description}
                      </p>
                      
                      <div className="flex items-center justify-between mb-[12px]">
                        <span className={`text-[13px] ${
                          program.status === 'live' ? 'text-gray-300' : 'text-gray-400'
                        }`}>
                          {program.time}
                        </span>
                        {program.timeLeft && (
                          <span className={`text-[13px] font-medium ${
                            program.status === 'live' ? 'text-gray-300' : 'text-gray-400'
                          }`}>
                            {program.timeLeft}
                          </span>
                        )}
                      </div>
                      
                      {/* Progress bar for live programs */}
                      {program.status === 'live' && (
                        <div className="w-full bg-gray-600 rounded-full h-[6px] overflow-hidden">
                          <motion.div 
                            className="bg-red-600 h-[6px] rounded-full" 
                            initial={{ width: 0 }}
                            animate={{ width: `${program.progress}%` }}
                            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                          />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </HorizontalScrollView>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ProgramGuide;
