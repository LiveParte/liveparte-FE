import React from 'react'
import Home from './event'
import Banner from '@/components/modules/Home/Banner'
import NoAuth from '@/components/Layout/NoAuth'
import DisplayCard from '@/components/modules/Home/DisplayCard'
import PayAnyhow from '@/components/modules/Home/PayAnyhow'
import Entertainer from '@/components/modules/Home/Entertainer'
import Faq from './entertainers/Faq'
import Footer from './entertainers/Footer'
import ForEnter from '@/components/modules/Home/ForEnter'

export default function index() {
  return (
    <div className="min-h-[100vh] bg-black over text-white">
    {/* <ButtonComp> */}
    <NoAuth>
      <Banner/>
      <DisplayCard/>
      <PayAnyhow/>
      <Entertainer/>
      <ForEnter/>
      <Faq />
      <Footer />
      </NoAuth>
    </div>
 
  
  )
}
