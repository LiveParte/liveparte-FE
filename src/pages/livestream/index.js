import AuthHeader from '@/components/Common/AuthHeader'
import NoAuth from '@/components/Layout/NoAuth'
import LiveStream from '@/components/modules/LiveStream/LiveStream'
import React from 'react'

export default function index() {
  return (
   <>
    <div className='bg-[#060809] min-h-[100vh]'>
        <div className='hidden lg:block'>
        <AuthHeader/>
        </div>
        <LiveStream/>
    </div>
   </>
  )
}
