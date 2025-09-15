import React from 'react';

interface ProgramGuideProps {
  className?: string;
}

const ProgramGuide: React.FC<ProgramGuideProps> = ({ className = "" }) => {
  const timeSlots = ['20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00'];
  const currentTime = '20:45';

  const channels = [
    {
      id: 'cnn',
      name: 'CNN',
      logo: 'CNN',
      programs: [
        {
          title: 'International Desk',
          time: '20:00 - 21:00',
          status: 'live',
          description: 'Live coverage of today\'s most important stories',
          genre: 'TV-PG News',
          timeLeft: '30m Left',
          breaking: true
        },
        {
          title: 'International Desk',
          time: '21:00 - 22:00',
          status: 'upcoming',
          description: 'Upcoming episode',
          genre: 'News',
          timeLeft: null,
          breaking: false
        },
        {
          title: 'International Desk',
          time: '22:00 - 23:00',
          status: 'upcoming',
          description: 'Upcoming episode',
          genre: 'News',
          timeLeft: null,
          breaking: false
        }
      ]
    },
    {
      id: 'bbc',
      name: 'BBC World',
      logo: 'BBC',
      programs: [
        {
          title: 'International Desk',
          time: '20:00 - 21:00',
          status: 'live',
          description: 'Live coverage of today\'s most important stories',
          genre: 'News',
          timeLeft: '30m Left',
          breaking: false
        },
        {
          title: 'International Desk',
          time: '21:00 - 22:00',
          status: 'upcoming',
          description: 'Upcoming episode',
          genre: 'News',
          timeLeft: null,
          breaking: false
        },
        {
          title: 'International Desk',
          time: '22:00 - 23:00',
          status: 'upcoming',
          description: 'Upcoming episode',
          genre: 'News',
          timeLeft: null,
          breaking: false
        }
      ]
    }
  ];

  return (
    <div className={`flex-1 ${className}`}>
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

      {/* Time slots header */}
      <div className="flex mb-[16px]">
        <div className="w-[120px]"></div> {/* Channel name column */}
        <div className="flex-1 flex">
          {timeSlots.map((time, index) => (
            <div key={time} className="flex-1 text-center text-gray-400 text-[12px] font-medium">
              {time}
            </div>
          ))}
        </div>
      </div>

      {/* Channels and programs */}
      <div className="space-y-[12px]">
        {channels.map((channel) => (
          <div key={channel.id} className="flex">
            {/* Channel name */}
            <div className="w-[120px] flex items-center">
              <div className="bg-gray-800 text-white px-[8px] py-[4px] rounded-[4px] text-[12px] font-bold">
                {channel.logo}
              </div>
            </div>
            
            {/* Programs */}
            <div className="flex-1 flex">
              {channel.programs.map((program, index) => (
                <div
                  key={index}
                  className={`flex-1 p-[12px] rounded-[8px] border cursor-pointer transition-all ${
                    program.status === 'live'
                      ? 'bg-white border-white text-black'
                      : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-start justify-between mb-[8px]">
                    <h4 className={`text-[14px] font-semibold ${
                      program.status === 'live' ? 'text-black' : 'text-white'
                    }`}>
                      {program.title}
                    </h4>
                    {program.status === 'live' && (
                      <span className="bg-red-600 text-white px-[6px] py-[2px] rounded-[4px] text-[10px] font-bold">
                        LIVE
                      </span>
                    )}
                  </div>
                  
                  {program.breaking && (
                    <div className="bg-red-600 text-white px-[6px] py-[2px] rounded-[4px] text-[10px] font-bold mb-[4px] inline-block">
                      BREAKING NEWS
                    </div>
                  )}
                  
                  <div className={`text-[12px] mb-[4px] ${
                    program.status === 'live' ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {program.genre}
                  </div>
                  
                  <p className={`text-[12px] mb-[4px] ${
                    program.status === 'live' ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {program.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-[12px] ${
                      program.status === 'live' ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {program.time}
                    </span>
                    {program.timeLeft && (
                      <span className={`text-[12px] font-medium ${
                        program.status === 'live' ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {program.timeLeft}
                      </span>
                    )}
                  </div>
                  
                  {program.status === 'live' && (
                    <div className="w-full bg-gray-200 rounded-full h-[4px] mt-[8px]">
                      <div className="bg-red-600 h-[4px] rounded-full w-[70%]"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramGuide;
