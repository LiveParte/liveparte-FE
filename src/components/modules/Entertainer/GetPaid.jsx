import Image from 'next/image';
import React from 'react';
import comment_ent from '../../../../public/svgs/comment-ent.svg'
import comment_ent1 from '../../../../public/svgs/comment-ent1.svg'
import comment_ent2 from '../../../../public/svgs/comment-ent2.svg'
import comment_loc from '../../../../public/svgs/comment-loc.svg'
import comment_loc1 from '../../../../public/svgs/comment-loc1.svg'

const GetPaid = () => {
    return (
        <div className='w-[90%] mx-auto'>
            <div className='flex lg:flex-row flex-col gap-6 md:mt-40 mt-20'>
                <div className='flex-1 bg-grey.300 h-[426px] md:rounded-[40px] rounded-[12px] py-9'>
                    <div className='flex justify-center h-full'>
                        <div className='flex justify-between flex-col h-full'>
                            <div className='flex justify-center flex-col items-center'>
                                <h1 className='font-mdtest font-bold text-[35px] uppercase leading-[35px] tracking-[-0.12px]'>Get Paid</h1>
                                <p className='text-base text-grey.200 tracking-[-0.12px] md:w-[55%] mt-2.5 text-center leading-[19.2px]'>Set your price and be in full control and visibility over your event revenue. </p>
                            </div>
                            <div className='pb-6 flex justify-center'>
                                <div className='md:px-0 px-6 md:mt-0 mt-10'>
                                    <Image className='z-50 w-full relative' src={comment_ent} alt='liveparte_comment' />
                                    <Image className='flex w-[90%] justify-center mx-auto md:-mt-9 -mt-8 z-40 relative' src={comment_ent1} alt='liveparte_comment' />
                                    <Image className='flex w-[80%] justify-center mx-auto md:-mt-9 -mt-8 z-30 relative' src={comment_ent2} alt='liveparte_comment' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex-1 bg-grey.300 md:h-[426px] h-[296px] md:rounded-[40px] rounded-[12px] py-9'>
                    <div className='flex justify-center h-full'>
                        <div className='flex justify-between flex-col h-full'>
                            <div className='flex justify-center flex-col items-center'>
                                <h1 className='font-mdtest font-bold text-[35px] uppercase leading-[35px] tracking-[-0.12px]'>Own Your Fan Data</h1>
                                <p className='text-base text-grey.200 tracking-[-0.12px] md:w-[55%] w-[90%] mt-2.5 text-center leading-[19.2px]'>Get unparalleled access to all your fan’s anonymized data, including: demographic information, contact information and more. </p>
                            </div>
                            <div className='md:pb-6 pt-14 flex justify-center relative'>
                                <Image className='z-40 relative md:w-[277px] w-[207px]' src={comment_loc} alt='liveparte_comment' />
                                <Image className='z-50 absolute md:ml-72 ml-44 md:w-[103px] w-[75px] -mt-5' src={comment_loc1} alt='liveparte_comment' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GetPaid;