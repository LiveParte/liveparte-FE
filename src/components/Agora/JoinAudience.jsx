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

const showTokens = [
  {
    tokenId:
      "007eJxTYMh1nTHtap38Czunqa3F/pO+2jLu3JOor8v4l6Xq8k6FeB4FBgtjE9PkNAujVBMDU5Nky7Qky0Qjy0RjE3PDNAPjVAPL63yn0xoCGRlWWlUxMjJAIIgvwWBmlmxubmRmaZKWaGKQbJFqkZKaYplsaszAAABWbyKk",
    eventId: "66c772694fa40c8e8ded9c53",
  },
  {
    tokenId:
      "007eJxTYGBm9F7Q5DlXoal492zZv4r8jFyeTu6rTtRKTdzXUbEmwUuBwcLYxDQ5zcIo1cTA1CTZMi3JMtHIMtHYxNwwzcA41cDSlv90WkMgI0NAmw8LIwMEgvgSDGZmyeaJ5qZmJmmJJgbJFqkWKakpicbJxgwMAHbcIJs=",
    eventId: "66c7a7564fa40c8e8deda3c3",
  },
  {
    tokenId:'007eJxTYGjILxLnflYj8DgqhkNWf4t1xfXj77PWHnLfw7A1RP/UpwMKDBbGJqbJaRZGqSYGpibJlmlJlolGlonGJuaGaQbGqQaWf/hPpzUEMjII5e9gZWSAQBBfgsHMLNkizcjSJDkpxTQx2dg8zTzVMM0o1ZKBAQC6UyRL',
    eventId: "66c8f294cbd5ac37f7e1f2e9"
  },
  {
    tokenId:'007eJxTYOCqrNNae2vmEuZlkyZI3dqy2TJt2kapyuedG6JDHtt9nrxfgcHC2MQ0Oc3CKNXEwNQk2TItyTLRyDLR2MTcMM3AONXAMkXwdFpDICNDH08sIyMDBIL4EgxmZskWKckpFmbGaZZpaSkpqUCtJslpiQwMACwYJZA=',
    eventId:'66c8dcd863f9ffddeb9a4cfa'
  }
];

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
            // checkIfEventDurationHaveEnded &&
            newStatus === "Host has left the stream"
          ) {
            router.replace("/livestream/ended");
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
   let token  = showTokens?.find((item) => item.eventId === eventId)?.tokenId;
    try {
      await joinChannel(eventId, token);
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
      // router.push("/myshows");
      console.log("Left channel as audience");
    } catch (error) {
      console.error("Failed to leave the channel:", error);
    }
  };

  // console.log(status,'statusstatusstatus')
  return (
    <>
      <div className="text-white relative    flex-col flex h-full">
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
