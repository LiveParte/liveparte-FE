
// import LiveStream from '@/components/modules/LiveStream/LiveStream'
import React from 'react'
import dynamic from 'next/dynamic'

const LiveStream =dynamic(()=>import('@/components/modules/LiveStream/LiveStream'),{ssr:false})

export default function index() {
  return (
   <>
    <div className='bg-[#060809] h-[100vh] overflow-hidden'>
      <LiveStream/>
    </div>
   </>
  )
}
