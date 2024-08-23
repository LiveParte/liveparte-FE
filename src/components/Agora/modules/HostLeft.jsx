import React from 'react'
import { HostLeftIcon } from '../../../../public/svg'

export default function HostLeft({
    isHostAvailable
}) {
  return (
    <div className={`flex flex-col justify-center items-center text-center h-full bg-[#060809] w-full ${isHostAvailable?'':'hidden'}`}>
      <HostLeftIcon/>
      <div className='text-[14px] text-[#788AA1] font400 mt-[16px] leading-5'>Oops, what just happened? The<br/> event will come up shortly</div>
    </div> 
  )
}
