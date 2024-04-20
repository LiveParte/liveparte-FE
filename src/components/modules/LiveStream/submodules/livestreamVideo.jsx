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
  liveStreamDetail
}) {
  
  const appId = "Agora Project App ID";
  const user = useSelector(selectCurrentUserData);


  const [micOn, setMic] = useState(true);
  const [cameraOn, setCamera] = useState(true);
  

  useJoin(
    {
      appid: "8345cf82e4054c9fb9a29a3471f03e09",
      channel: "65ef36b6ec4a525d41da3642",
      token: null,
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
  return (
    <div className="w-full h-[40vh] lg:h-[70vh]  bg-cover lg:rounded-[16px] overflow-hidden ">
        {!isLive?
        <video
        controls
        // ref={videoRef}
        autoPlay
        // loop
        // muted
        className={`absolute left-0 right-0 top-0 rounded-[16px] bottom-0 object-cover h-full w-full z-20  `}
        poster={liveStreamDetail?.thumbnail_url
}
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
      >
        <source
          src={liveStreamDetail?.promotional_url||'https://res.cloudinary.com/dnvwcmqhw/video/upload/v1713115469/Event%20Images/videos/1109352_1080p_Entertainment_Nightclub_1280x720_odt4dn.mp4'}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>:
      <div id="remoteVideoGrid">
        {remoteUsers.map((user) => (
          <div
            key={user.uid}
            className=" relative w-full overflow-hidden aspect-square h-full max-w-full"
          >
            <RemoteUser user={user} />
          </div>
        ))}
      </div> }
    </div>
  );
}
