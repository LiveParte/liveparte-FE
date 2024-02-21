import React from 'react'
import { FAQData } from '../Data'

export default function FAQ() {
  return (
    
    <div className='px-[20px] md:px-[72px] bg-[#060809]'>
        <div className='text-center font-1 font-bold text-white text-[30px] md:text-[54px] mb-[64px] leading-normal md:leading-[67px]'>Frequently Asked Questions</div>
         <div className=" bg-[#060809] pb-[164px]">
      <div className="grid grid-cols-1 gap-4  md:grid-cols-2 md:gap-6 xl:grid-cols-3 xl:gap-x-[178px] text-white">
        {FAQData?.map((item, i) => (
          <div
            className={`flex flex-col justify-start `}
            key={i}
          >
            <div className="font-1 text-[20px] md:text-[27px] font-bold mb-[10px] md:mb-[33px]">
              {item?.name}
            </div>
            <div className="md:text-[18px] leading-[28px]  font400">
              {item?.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}
