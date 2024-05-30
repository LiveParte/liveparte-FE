// components/JoinAudience.js
import { initializeAgoraClient, joinChannel, leaveChannel } from '@/lib/agoraServiceAudience';
import React, { useState, useEffect, useRef } from 'react';

const JoinAudience = ({ eventId }) => {
  const [joined, setJoined] = useState(false);
  const [hostDimensions, setHostDimensions] = useState({ width: '100%', height: '100%' });
  const videoContainerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      initializeAgoraClient(videoContainerRef.current, setHostDimensions);

      if (eventId) {
        handleJoin();
      }

      // Cleanup function to leave the channel and remove video container when component unmounts
      return () => {
        handleLeave();
      };
    }
  }, [eventId]);

  const handleJoin = async () => {
    try {
      await joinChannel(eventId);
      setJoined(true);
    } catch (error) {
      console.error('Failed to join as audience:', error);
    }
  };

  const handleLeave = async () => {
    try {
      await leaveChannel();
      setJoined(false);
    } catch (error) {
      console.error('Failed to leave the channel:', error);
    }
  };

  // console.log(hostDimensions,'hostDimensions')
// 
  return (
    <div className="text-white relative h-full">
      <div ref={videoContainerRef} className="relative w-full  h-full bg-black" ></div>
    </div>
  //   <div className="text-white relative h-full">
  //   {/* {joined ? (
  //     <button className="pt-30" onClick={handleLeave}>Leave</button>
  //   ) : (
  //     <button onClick={handleJoin}>Join as Audience</button>
  //   )} */}
  //   <div ref={videoContainerRef} className="relative w-full h-[90vh]  bg-black"></div>
  // </div>
  );
};

export default JoinAudience;
