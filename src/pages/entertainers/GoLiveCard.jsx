import Image, { StaticImageData } from 'next/image';
import React from 'react';



const GoLiveCard = ({ title, description, bgColor, bgImg }) => {
    return (
        <div className='md:w-[276px] w-[343px] md:mx-0 mx-auto bg-grey.300 rounded-[16px] p-5'>
            <div className={`${bgColor} h-[181px] rounded-[12px] pt-5 pl-5`}>
                <Image className='w-full h-full rounded-tl-[8px]' src={bgImg} alt="liveparte" />
            </div>
            <h1 className='font-mdtest font-medium text-[24px] leading-6 uppercase mt-4 tracking-[-0.12px]'>{title}</h1>
            <p className='font-mattersq text-[14px] leading-[16.8px] tracking-[-0.12px] text-grey.200 mt-3 mb-6'>{description}</p>
        </div>
    );
};

export default GoLiveCard;