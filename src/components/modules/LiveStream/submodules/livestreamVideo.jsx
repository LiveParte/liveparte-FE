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
}) {
  const appId = "Agora Project App ID";
  const user = useSelector(selectCurrentUserData);

  // console.log(user, "user");

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
      <div id="remoteVideoGrid">
        {/* {console.log(remoteUsers, "remoteUsers")} */}
        {remoteUsers.map((user) => (
          <div
            key={user.uid}
            className=" relative w-full overflow-hidden aspect-square h-full max-w-full"
          >
            <RemoteUser user={user} />
          </div>
        ))}
      </div>
    </div>
  );
}
