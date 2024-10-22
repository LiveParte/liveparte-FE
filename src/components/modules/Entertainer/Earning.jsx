'use client';
import Image from 'next/image';
import React, { ChangeEvent, useState } from 'react';
// import comment from '../../../public/images/comment-ent.png';
// import comment1 from '../../../public/images/comment-ent1.png';
import liveparte from '../../../../public/svgs/group-ent.svg';
import enage_comment1 from '../../../../public/images/enage-comment1.png';
import enage_comment2 from '../../../../public/svgs/enage-comment2.svg';
import enage_comment3 from '../../../../public/svgs/enage-comment3.svg';
import { thousand } from '../../../../helpers';
// import { thousand } from '@/helper';

const Earning = () => {
    const [rangeValue, setRangeValue] = useState(1000);

    const [ticket, setTicket] = useState('1');

    const handleRangeChange = (e) => {
        setRangeValue(Number(e.target.value)); // Update state when range changes
    };

    return (
        <div className='text-white'>
            <div className='w-[90%] mx-auto mt-6'>
                <div className='bg-grey.300 md:h-[426px] pb-10 h-auto md:rounded-[40px] mx-auto rounded-[12px] mt-6 flex md:flex-row flex-col justify-between items-center'>
                    <div className=' h-full'>
                        <div className='md:pl-16 pl-6 md:pt-10 pb-12 flex flex-col justify-between h-full'>
                            <div>
                                <h1 className='text-[35px] uppercase font-mdtest font-bold leading-[35px] tracking-[-0.12px] mt-6'>Engage with Fans</h1>
                                <p className='text-grey.200 font-mattersq leading-[19.2px] text-base tracking-[-0.12px] md:w-[50%] mt-2'>
                                    Create more than a fanbase - engage your fans with personalized messages and drive more revenue.
                                </p>
                            </div>
                            {/* <div>
                                <Image className='w-[344px] relative z-50' src={comment} alt="liveparte_comment" />
                                <Image className='w-[288px] relative z-40 -mt-7 ml-20' src={comment1} alt="liveparte_comment" />
                            </div> */}
                        </div>
                    </div>
                    <div className='md:pr-44 relative md:mt-0 mt-10'>
                        <Image className='absolute top-0 z-40 md:-ml-24 -ml-10 md:h-[80px] md:w-[344px] w-[141px] h-[39.86px] bg-cover object-center' src={enage_comment1} alt='' />
                        <Image className='absolute md:bottom-12 bottom-2 md:-ml-52 -ml-20 z-40 md:w-[344px] md:h-[54px] w-[171.14px] h-[22.13px]' src={enage_comment2} alt='' />
                        <Image className='absolute md:top-32 top-10 pt-2 w-[174px] md:w-[288px] md:h-[55px] h-[33.23px] md:ml-32 ml-16 z-40' src={enage_comment3} alt='' />

                        <Image className='relative md:w-full w-[145.67px] z-30' src={liveparte} alt='' />

                    </div>
                </div>
            </div>
            <div>
                <h1 className='text-center mt-28 font-mdtest md:text-[62px] text-[32px] md:leading-[62px] leading-[32px] font-bold uppercase tracking-[0.48px] md:w-[45%] w-[90%] mx-auto'>See how much you can earn on liveparte</h1>
                <div className='flex md:flex-row flex-col md:w-[70%] w-[90%] mt-14 mx-auto gap-6'>
                    <div className='bg-grey.300 md:w-[378px] p-6 h-[428px] rounded-[12px]'>
                        <h1 className='text-center font-mdtest font-bold text-[52px] leading-[52px] tracking-[0.48px]'>{thousand(rangeValue)}</h1>
                        <p className='text-center text-[14px] leading-[16.8px] tracking-[-0.12px] text-[#63768D] mt-2'>Fans</p>
                        <input className='custom-range w-full mt-8'
                            min="1000"
                            max="1000000"
                            value={rangeValue}
                            onChange={handleRangeChange}
                            type='range'
                        />
                        <div className='bg-grey.500 border border-grey.400 h-[50px] mt-6 p-2 rounded-[8px]'>
                            <p className='text-grey.600 text-[11px] font-medium font-mattersq mb-0'>Ticket Amount</p>
                            <p className='text-[13px] font-mattersq leading-4 tracking-[-0.12px]'><span className='text-grey.600'>$</span>
                                <input onChange={(e) => setTicket(e.target.value)} className='bg-grey.500 ml-1 outline-none focus:outline-none' value={ticket} />
                            </p>
                        </div>
                        <div className='bg-green.400 h-[133px] flex justify-center items-center rounded-[8px] mt-10'>
                            <h1 className='text-[52px] leading-[52px] tracking-[0.48px] font-mdtest font-bold'>${thousand(rangeValue * Number(ticket))}</h1>
                        </div>
                    </div>
                    <div className='md:w-[306px] rounded-[12px] border-[1px] !border-green.400  bg-grey.300 p-6'>
                        <h1 className='uppercase font-mdtest text-[32px] leading-[32px] font-bold tracking-[0.48px]'>Liveparte</h1>
                        <div className='mt-8'>
                            <h2 className='font-mattersq text-[14px] leading-[16.8px] tracking-[-0.12px] text-grey.600'>Fans needed</h2>
                            <p className='font-medium text-base font-mattersq leading-[19.8px] tracking-[-0.12px] mt-1.5'>{thousand(rangeValue)}</p>
                        </div>
                        <div className='mt-8'>
                            <h2 className='font-mattersq text-[14px] leading-[16.8px] tracking-[-0.12px] text-grey.600'>Amount per stream</h2>
                            <p className='font-medium text-base font-mattersq leading-[19.8px] tracking-[-0.12px] mt-1.5'>${ticket}</p>
                        </div>
                        <div className='mt-8'>
                            <h2 className='font-mattersq text-[14px] leading-[16.8px] tracking-[-0.12px] text-grey.600'>Payout</h2>
                            <p className='font-medium text-base font-mattersq leading-[19.8px] tracking-[-0.12px] mt-1.5'>Within 7 days</p>
                        </div>
                        <div className='mt-8'>
                            <h2 className='font-mattersq text-[14px] leading-[16.8px] tracking-[-0.12px] text-grey.600'>Data</h2>
                            <p className='font-medium text-base font-mattersq leading-[19.8px] tracking-[-0.12px] mt-1.5'>Full Access</p>
                        </div>
                    </div>
                    <div className='md:w-[306px] rounded-[12px] bg-grey.300 p-6'>
                        <h1 className='uppercase font-mdtest text-[32px] leading-[32px] font-bold tracking-[0.48px]'>Other platforms</h1>
                        <div className='mt-8'>
                            <h2 className='font-mattersq text-[14px] leading-[16.8px] tracking-[-0.12px] text-grey.600'>Streams needed</h2>
                            <p className='font-medium text-base font-mattersq leading-[19.8px] tracking-[-0.12px] mt-1.5'>{(thousand(rangeValue * Number(ticket) / 0.0025))}</p>
                        </div>
                        <div className='mt-8'>
                            <h2 className='font-mattersq text-[14px] leading-[16.8px] tracking-[-0.12px] text-grey.600'>Amount per stream</h2>
                            <p className='font-medium text-base font-mattersq leading-[19.8px] tracking-[-0.12px] mt-1.5'>$0.0025</p>
                        </div>
                        <div className='mt-8'>
                            <h2 className='font-mattersq text-[14px] leading-[16.8px] tracking-[-0.12px] text-grey.600'>Payout</h2>
                            <p className='font-medium text-base font-mattersq leading-[19.8px] tracking-[-0.12px] mt-1.5'>60-90 Days</p>
                        </div>
                        <div className='mt-8'>
                            <h2 className='font-mattersq text-[14px] leading-[16.8px] tracking-[-0.12px] text-grey.600'>Data</h2>
                            <p className='font-medium text-base font-mattersq leading-[19.8px] tracking-[-0.12px] mt-1.5'>Demography</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Earning;