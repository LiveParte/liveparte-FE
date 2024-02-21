import Footer from '@/components/Common/Footer'
import Hero from '@/components/modules/Event/Hero'
import HeroTime from '@/components/modules/Event/HeroTime'
import { useRouter } from 'next/router';
import React from 'react'

export default function EventTimeOut() {
  const router = useRouter();
  return (
    <div className='h-[100vh] flex flex-col'>
        <HeroTime onClick={()=>router.push('/event/2')}/>
        <Footer/>
    </div>
  )
}
