import Image from 'next/image';
import React from 'react';
import liveparte_e from '../../../public/images/liveparte-e.png';
import mobile_e from '../../../public/images/mobile_view.png'
import Link from 'next/link';

const EntertainerBanner = () => {
    return (
        <>
            <div className="text-white.200 h-[400px] mt-32 lg:w-full w-[95%] mx-auto">
                <div className="flex flex-col justify-center items-center h-full">
                    <h1 className="font-mdtest font-bold lg:text-[92px] lg:leading-[92px] text-center text-[69px] leading-[69px] tracking-[0.48px] uppercase">BRING THE SHOWS HOME</h1>
                    <p className="font-mattersq lg:text-[20px] text-[13px] leading-[28px] font-normal tracking-[-0.2px] lg:w-[45%] w-[95%] mt-3 text-center">Reach more fans with real-time broadcasts of incredible performances. Create immersive experiences, expand your revenue and unlock fan engagements.</p>

                    <Link target='_blank' href={'https://studio-staging.liveparte.com/signup'}  className='text-black.100 text-[13px] bg-white.200 mt-10 px-5 rounded-[8px] font-medium py-3 tracking-[-0.12px] no-underline'>Create An Account</Link>
                </div>
            </div>

            <div className='lg:w-[90%] w-[70%] mx-auto lg:mt-5 mt-14'>
                <Image className='w-full h-full bg-cover hidden lg:block  object-cover' src={liveparte_e} alt='liveparte' />
                <Image className='w-full h-full bg-cover lg:hidden block object-cover' src={mobile_e} alt='liveparte' />
            </div>
        </>
    );
};

export default EntertainerBanner;