// import GoLiveCard from '@/components/Cards/GoLiveCard';
import liveparte from '../../../../public/images/golive.png';
import liveparte1 from '../../../../public/images/golive2.png';
import liveparte2 from '../../../../public/images/golive3.png';
import tracks from '../../../../public/images/tracks.png';
import artist_a from '../../../../public/images/artist_a.png';
import artist_b from '../../../../public/images/artist_b.png';
import artist_c from '../../../../public/images/artist_c.png';
import artist_d from '../../../../public/images/artist_d.png';
import artist_e from '../../../../public/images/artist_e.png';
import artist_f from '../../../../public/images/artist_f.png';
import artist_g from '../../../../public/images/artist_g.png';
import artist_h from '../../../../public/images/artist_h.png';
import artist_i from '../../../../public/images/artist_i.png';
import Image from 'next/image';
import ProtectedFraud from './ProtectedFraud';
import GoLiveCard from './GoLiveCard';

export default function Random() {
  return (
    <div className='mt-32'>
                <h1 className='font-mdtest font-bold text-center md:text-[62px] md:w-full w-[70%] mx-auto text-[32px] md:leading-[62px] leading-[32px] tracking-[0.48px]'>GO LIVE IN MINUTES, NOT WEEKS</h1>
                <div className='flex md:flex-row flex-col justify-center mx-auto  mt-16 gap-[30px] items-center'>
                    <GoLiveCard
                        title='1.Create your Account'
                        description='Join as an artist or event organizer on Liveparte to access our platform.'
                        bgColor='bg-yellow.500'
                        bgImg={liveparte}
                    />
                    <GoLiveCard
                        title='2.Get Verified'
                        description='Once your account is verified, you can access Studio to create events.'
                        bgColor='bg-blue.200'
                        bgImg={liveparte1}
                    />
                    <GoLiveCard
                        title='3.Go Live'
                        description='Create your event, get streaming key and go live'
                        bgColor='bg-red.200'
                        bgImg={liveparte2}
                    />
                </div>
                <ProtectedFraud/>
              
                <div className='mt-20'>
                    <div className="mt-28 md:w-[80%] w-[90%] mx-auto">
                        <h1 className="text-center md:text-[122px] text-[37.14px] flex items-center justify-center md:leading-[122px] leading-[37.14px] font-bold font-mdtest tracking-[0.48px]">
                            MADE FOR YOU ❤️
                        </h1>
                        <p className="text-white.100 md:text-[80px] text-[24.37px] md:leading-[80px] leading-[24.37px] text-center md:mt-0 mt-2 tracking-[0.48px] font-bold font-mdtest">
                            We are making it possible for you to reach your fans, create unique experiences, expand your revenue and unlock fan engagements.
                        </p>
                    </div>
                    <div className='flex justify-center flex-col items-center md:mt-32 mt-10'>
                        <div className='flex'>
                            <div className='rounded-full relative z-30 w-[89px] h-[89px] md:w-[220px] md:h-[220px]'>
                                <Image className='w-full h-full' src={artist_a} alt='liveparte artist' />
                            </div>
                            <div className='rounded-full md:-ml-12 -ml-6 relative z-40 w-[89px] h-[89px] md:w-[220px] md:h-[220px]'>
                                <Image className='w-full h-full' src={artist_b} alt='liveparte artist' />
                            </div>
                            <div className='rounded-full md:-ml-12 -ml-6 relative z-50 w-[89px] h-[89px] md:w-[220px] md:h-[220px]'>
                                <Image className='w-full h-full' src={artist_c} alt='liveparte artist' />
                            </div>
                        </div>
                        <div className='flex'>
                            <div className='rounded-full relative z-30 w-[89px] h-[89px] md:w-[220px] md:h-[220px]'>
                                <Image className='w-full h-full' src={artist_d} alt='liveparte artist' />
                            </div>
                            <div className='rounded-full md:-ml-12 -ml-6 relative z-40 w-[89px] h-[89px] md:w-[220px] md:h-[220px]'>
                                <Image className='w-full h-full' src={artist_e} alt='liveparte artist' />
                            </div>
                            <div className='rounded-full md:-ml-12 -ml-6 relative z-50 w-[89px] h-[89px] md:w-[220px] md:h-[220px]'>
                                <Image className='w-full h-full' src={artist_f} alt='liveparte artist' />
                            </div>
                        </div>
                        <div className='flex'>
                            <div className='rounded-full relative z-30 w-[89px] h-[89px] md:w-[220px] md:h-[220px]'>
                                <Image className='w-full h-full' src={artist_g} alt='liveparte artist' />
                            </div>
                            <div className='rounded-full md:-ml-12 -ml-6 relative z-40 w-[89px] h-[89px] md:w-[220px] md:h-[220px]'>
                                <Image className='w-full h-full' src={artist_h} alt='liveparte artist' />
                            </div>
                            <div className='rounded-full md:-ml-12 -ml-6 relative z-50 w-[89px] h-[89px] md:w-[220px] md:h-[220px]'>
                                <Image className='w-full h-full' src={artist_i} alt='liveparte artist' />
                            </div>
                        </div>
                    </div>
                    <div className='md:-mt-44 -mt-5'>
                        <Image className='bg-cover object-cover' src={tracks} alt='liveparte' />
                    </div>
                </div>
            </div>
  )
}
