import React from 'react'
import { CloseIcon } from '../../../../../public/svg'
import LiveStreamVideo from '../submodules/livestreamVideo'

export default function FullScreen({
    onBack,
    setActiveConnection,
    activeConnection,
    isLive,
    liveStreamDetail
}) {
  return (
    <div className='bg-black h-full relative'>
        <div className='absolute right-5 top-5 cursor-pointer z-40' onClick={onBack}>
            <CloseIcon/>
        </div>
        <LiveStreamVideo
                setActiveConnection={setActiveConnection}
                activeConnection={activeConnection}
                isLive={isLive}
                liveStreamDetail={liveStreamDetail}
              />
    </div>
  )
}
