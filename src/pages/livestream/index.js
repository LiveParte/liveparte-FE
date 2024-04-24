// import LiveStream from '@/components/modules/LiveStream/LiveStream'
import React from 'react';
import dynamic from 'next/dynamic';
import WithAuth from '@/components/Layout/WithAuth';

const LiveStream = dynamic(() => import('@/components/modules/LiveStream/LiveStream'), { ssr: false });

export default function Index() {

  return (
    <WithAuth showHeader={false}>
      <div className='bg-[#060809] h-[100dvh] md:h-[100vh] overflow-hidden'>
        <LiveStream isLive={{}} />
      </div>
    </WithAuth>
  );
}
