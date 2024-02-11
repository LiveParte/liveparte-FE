import Footer from '@/components/Common/Footer'
import NoAuth from '@/components/Layout/NoAuth'
import DropDown from '@/components/Ui/DropDown'
// import DropDown from '@/components/Ui/DropDown'
import MyModal from '@/components/Ui/Modal'
import EventDetails from '@/components/modules/EventDetails'
import CheckOut from '@/components/modules/EventDetails/modal/CheckOut'
import GiftTicket from '@/components/modules/EventDetails/modal/GiftTicket'
import Hero from '@/components/modules/Home/Hero'
import LoginSignUp from '@/components/modules/Home/Modal/Login&SignUp'
import React, { useState } from 'react'
import { Dropdown, DropdownItem } from 'flowbite-react';

export default function EventId () {
  let [isOpen, setIsOpen] = useState();

  function closeModal() {
    setIsOpen(null);
  }

  function openModal() {
    setIsOpen('checkout');
  }

  function openModalLoginSignUp() {
    setIsOpen('login/signup');
  }


  const ModalList =[
    {
      name:'checkout',
      component:<CheckOut closeModal={closeModal}/>
    },
    {
      name:'gift ticket',
      component:<GiftTicket closeModal={closeModal}/>
    },
    {
      name:'login/signup',
      component:<LoginSignUp closeModal={closeModal}/>
    }
  ]
  return (
    <NoAuth>
      {/* <DropDown/> */}
     
      <MyModal
        bodyComponent={ModalList?.find((item,index)=>item?.name ==isOpen)?.component}
        containerStyle={`bg-[#1B1C20] border-[1px] border-[#343F4B] rounded-[16px]  !w-[586px]`}
        isOpen={isOpen?true:false}
        closeModal={closeModal}
        openModal={openModal}
      />
    <Hero openModalLoginSignUp={openModalLoginSignUp} openModal={openModal} notEvent={false}/>
    {/* <Dropdown  placement="top" label="Dropdown button" dismissOnClick={false}>
      <DropdownItem>Dashboard</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
      <DropdownItem>Earnings</DropdownItem>
      <DropdownItem>Sign out</DropdownItem>
    </Dropdown> */}
    <EventDetails/>
    {/* <Happening/> */}
    <Footer/>

    
  </NoAuth>
  )
}
