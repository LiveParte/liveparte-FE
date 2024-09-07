import React from 'react'
import VideoJS from "@/components/VideoPlayer";

export default function OnStreamVideo({
    videoJsOptions,
    handlePlayerReady
}) {
  return (
    <VideoJS options={videoJsOptions} onReady={handlePlayerReady}  />
  )
}
