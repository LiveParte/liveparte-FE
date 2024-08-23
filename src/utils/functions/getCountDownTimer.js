import React, { useState, useEffect } from 'react';

export function CountdownTimerIII({ targetDate, onTimerEnd }) {
  const calculateTimeLeft = () => {
    const currentDate = new Date();
    const targetDateTime = new Date(targetDate);

    // Check if targetDateTime is a valid date
    if (isNaN(targetDateTime.getTime())) {
      console.error('Invalid date format for targetDate:', targetDate);
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    // Calculate the difference in milliseconds between target date and current date
    const difference = targetDateTime.getTime() - currentDate.getTime();

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      // If the target date has passed, execute onTimerEnd callback if it's a function
      if (onTimerEnd && typeof onTimerEnd === 'function') {
        onTimerEnd();
      }
      // Set timeLeft to all zeros if target date has passed
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    // Calculate initial timeLeft
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(timer);
  }, [targetDate, onTimerEnd]);

  const formatTime = (value) => String(value).padStart(2, '0');

  return (
    <div className="flex justify-center text-[64px] text-[#FFFFFF] font-1 font-bold">
      <div className="flex flex-col justify-center items-center relative">
        {formatTime(timeLeft.days)}
        <div className="text-[#63768D] text-[13px] font400 absolute -bottom-[10px]">
          Days
        </div>
      </div>
      :
      <div className="flex flex-col justify-center items-center relative">
        {formatTime(timeLeft.hours)}
        <div className="text-[#63768D] text-[13px] font400 absolute -bottom-[10px]">
          Hours
        </div>
      </div>
      :
      <div className="flex flex-col justify-center items-center relative">
        {formatTime(timeLeft.minutes)}
        <div className="text-[#63768D] text-[13px] font400 absolute -bottom-[10px]">
          Minutes
        </div>
      </div>
      :
      <div className="flex flex-col justify-center items-center relative">
        {formatTime(timeLeft.seconds)}
        <div className="text-[#63768D] text-[13px] font400 absolute -bottom-[10px]">
          Seconds
        </div>
      </div>
    </div>
  );
}
