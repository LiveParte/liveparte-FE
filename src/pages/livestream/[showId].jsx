// import LiveStream from '@/components/modules/LiveStream/LiveStream'
import React from 'react';
import dynamic from 'next/dynamic';
import WithAuth from '@/components/Layout/WithAuth';
import { useSelector } from 'react-redux';
import { selectLiveStreamEvent } from '@/store/Event';

const LiveStream = dynamic(() => import('@/components/modules/LiveStream/LiveStream'), { ssr: false });

export default function Index() {
    const liveStream = useSelector(selectLiveStreamEvent);
    // console.log(liveStream,'liveStream')


  return (
    <WithAuth showHeader={false}>
      <div className='flex-1 flex flex-col  bg-[#060809] overflow-hidden '>
        <LiveStream isLive={liveStream?.isLiveStreamed}liveStreamDetail={liveStream}  />
      </div>
    </WithAuth>
  );
}
