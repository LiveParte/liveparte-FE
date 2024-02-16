import AuthHeader from '@/components/Common/AuthHeader'
import Footer from '@/components/Common/Footer'
import Header from '@/components/modules/MyShow/Header'
import Shows from '@/components/modules/MyShow/Shows'
import React, { useState } from 'react'

export default function myShows() {
  const HeaderData = [
    {
      name: "Upcoming",
    },
    {
      name: "On demand",
    },
    {
      name: "Past",
    },
  ];
  const [isActive, setIsActive] = useState(HeaderData[0]?.name);
  return (
    <div className='bg-[#060809] min-h-[100vh] '>
      <AuthHeader/>

      <Header Data={HeaderData} isActive={isActive} setIsActive={setIsActive} title='My Shows'/>
      <Shows/>
      <Footer/>
    </div>
  )
}
