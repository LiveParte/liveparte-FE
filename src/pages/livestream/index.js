// import LiveStream from '@/components/modules/LiveStream/LiveStream'
import React from 'react';
import dynamic from 'next/dynamic';
import { useObject } from '@/Context/ObjectProvider';
import WithAuth from '@/components/Layout/WithAuth';

const LiveStream = dynamic(() => import('@/components/modules/LiveStream/LiveStream'), { ssr: false });

export default function Index() {
  const { liveStreamShow } = useObject();
  console.log(liveStreamShow, 'liveStreamShow');

  return (
    <WithAuth>
      <div className='bg-[#060809] h-[100dvh] md:h-[100vh] overflow-hidden'>
        <LiveStream isLive={liveStreamShow?.isLiveStreamed} />
      </div>
    </WithAuth>
  );
}
