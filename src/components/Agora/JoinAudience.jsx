import {
  initializeAgoraClient,
  joinChannel,
  leaveChannel,
  setNetworkQualityCallback,
} from "@/lib/agoraServiceAudience";
import React, { useState, useEffect, useRef } from "react";
import NetworkQualityMonitor from "../NetworkQualityMonitor";
import HostLeft from "./modules/HostLeft";
import CheckOtherShows from "./modules/CheckOtherShows";
import { checkShowDurationAfter } from "@/utils/reusableComponent";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { selectLastEventAttended, setLastEventAttended } from "@/store/User";
// import { selectLiveStreamEvent, setLastEventAttended } from '@/store/Event';

const JoinAudience = ({ eventId, liveStreamDetail }) => {
  const router = useRouter();
  const [joined, setJoined] = useState(false);
  const dispatch = useDispatch();
  const [hostDimensions, setHostDimensions] = useState({
    width: "100%",
    height: "100%",
  });
  const [networkQuality, setNetworkQuality] = useState("Unknown");
  const [status, setStatus] = useState("");
  const videoContainerRef = useRef(null);

  // console.log(useSelector(selectLastEventAttended),'getLastEventgetLastEvent')
  //checkShowDurationAfter event_date event_length
  const checkIfEventDurationHaveEnded = checkShowDurationAfter(
    liveStreamDetail?.event_date,
    liveStreamDetail?.event_length
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      dispatch(setLastEventAttended(liveStreamDetail));
      const client = initializeAgoraClient(
        videoContainerRef.current,
        setHostDimensions,
        setNetworkQuality,
        (newStatus) => {
          setStatus(newStatus);
          // console.log('Status updated:', newStatus);
          if (
            checkIfEventDurationHaveEnded &&
            newStatus === "Host has left the stream"
          ) {
            router.push("/livestream/ended");
          }
        }
      );

      if (eventId) {
        handleJoin();
      }

      // Cleanup function to leave the channel and remove video container when component unmounts
      return () => {
        handleLeave();
      };
    }
  }, [eventId, checkIfEventDurationHaveEnded]);

  const handleJoin = async () => {
    try {
      await joinChannel(eventId);
      setJoined(true);
      console.log("Joined channel as audience");
    } catch (error) {
      console.error("Failed to join as audience:", error);
    }
  };

  const handleLeave = async () => {
    try {
      await leaveChannel();
      setJoined(false);
      console.log("Left channel as audience");
    } catch (error) {
      console.error("Failed to leave the channel:", error);
    }
  };

  // console.log(status,'statusstatusstatus')
  return (
    <>
      <div className="text-white relative h-full">
        <NetworkQualityMonitor />
        {/* <CheckOtherShows/> */}
        <HostLeft
          isHostAvailable={status === "Host has left the stream" ? true : false}
        />
        <div
          ref={videoContainerRef}
          className={`relative w-full h-full bg-black ${
            status === "Host is live" ? "" : "hidden"
          }`}
        ></div>
        {/* } */}
      </div>
    </>
  );
};

export default JoinAudience;
