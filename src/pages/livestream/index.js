import AuthHeader from '@/components/Common/AuthHeader'
import NoAuth from '@/components/Layout/NoAuth'
// import LiveStream from '@/components/modules/LiveStream/LiveStream'
import React from 'react'
import dynamic from 'next/dynamic'

const LiveStream =dynamic(()=>import('@/components/modules/LiveStream/LiveStream'),{ssr:false})

export default function index() {
  return (
   <>
    <div className='bg-[#060809] h-[100vh] overflow-hidden'>
        {/* <div className='hidden lg:block'>
        <AuthHeader className={`!mb-[32px]`}/>
        </div> */}
      <LiveStream/>
    </div>
   </>
  )
}
