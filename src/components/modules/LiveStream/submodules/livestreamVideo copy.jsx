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
import Video from "./Video";
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
      channel: liveStreamDetail?._id,
      token:null,
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
  console.log(remoteUsers,'liveStreamDetail')
  return (
    <div className="w-full min-h-[30vh] lg:h-[70vh]  bg-cover lg:rounded-[16px] overflow-hidden ">
      {!isLive ? (
        <Video
        liveStreamDetail={liveStreamDetail}
        />
      ) : (
        <div id="remoteVideoGrid" className="h-full w-full">
          {remoteUsers?.map((user) => (
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
