import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  LocalUser,
  RemoteUser,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteAudioTracks,
  useRemoteUsers,
} from "agora-rtc-react";
import { selectCurrentUserData } from "@/store/User";
export default function LiveStreamVideo({
  activeConnection,
  setActiveConnection,
  isLive,
  liveStreamDetail,
}) {
  const appId = "Agora Project App ID";
  const user = useSelector(selectCurrentUserData);

  const [micOn, setMic] = useState(true);
  const [cameraOn, setCamera] = useState(true);

  useJoin(
    {
      appid: "8345cf82e4054c9fb9a29a3471f03e09",
      channel: "662bfaf6c2c47d26607b2af8",
      token:
        "007eJxTYCj5PuOCdHGByLfXhZeOTa3IkAwV0vuXMUWzu4l1k027o7ICg4WxiWlymoVRqomBqUmyZVqSZaKRZaKxiblhmoFxqoHlnX",
      userId: "272740306",
    },
    activeConnection
  );

  usePublish([]);

  //remote users
  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);

  // play the remote user audio tracks
  audioTracks.forEach((track) => track.play());

  //bg-[url('/webp/livestream.webp')]
  // console.log(liveStreamDetail,'liveStreamDetail')
  return (
    <div className="w-full min-h-[30vh] lg:h-[70vh]  bg-cover lg:rounded-[16px] overflow-hidden ">
      {!isLive ? (
        <video
          controls
          // ref={videoRef}
          autoPlay
          // loop
          // muted
          className={`absolute left-0 right-0 top-0 rounded-[16px] bottom-0 object-contain md:object-cover h-full w-full z-20  `}
          poster={liveStreamDetail?.promotional_url||liveStreamDetail?.streaming_url}
          // onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
        >
          <source src={liveStreamDetail?.promotional_url||liveStreamDetail?.streaming_url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div id="remoteVideoGrid">
          {remoteUsers.map((user) => (
            <div
              key={user.uid}
              className=" relative w-full overflow-hidden aspect-square h-full max-w-full"
            >
              <RemoteUser user={user} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
