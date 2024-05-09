import Footer from "@/components/Common/Footer";
import NoAuth from "@/components/Layout/NoAuth";
import dynamic from 'next/dynamic'
// import DropDown from '@/components/Ui/DropDown'
import MyModal from "@/components/Ui/Modal";
import EventDetails from "@/components/modules/EventDetails";
import CheckOut from "@/components/modules/EventDetails/modal/CheckOut";
import GiftTicket from "@/components/modules/EventDetails/modal/GiftTicket";
// import Hero from "@/components/modules/Event/Hero";
import LoginSignUp from "@/components/modules/Event/Modal/Login&SignUp";
import React, { useEffect, useState } from "react";
import ShareEvent from "@/components/modules/EventDetails/modal/ShareEvent";
const Hero = dynamic(() => import('@/components/modules/onDemand/Hero'), {
  ssr: false
});
import {
  eventApi,
  useGetEventDetailViaIdQuery,
 
} from "@/store/Event/eventApi";
import { useDispatch, useStore } from "react-redux";

import { useRouter } from "next/router";
import { usePaystackPayment } from "react-paystack";
// import { PaystackConsumer } from 'react-paystack';
import { useCreatePurchaseMutation } from "@/store/Transaction/transactionApi";
import { useSelector } from "react-redux";
import { selectCurrentUserData } from "@/store/User";
import { storage, userDetailStorageName } from "@/utils/helper";
import { myShowLink } from "@/utils/reusableComponent";
import { selectEvent, selectLiveStreamEvent } from "@/store/Event";

export default function EventId() {
  const dispatch = useDispatch()
  
  // const { event, setEvent } = useStore();

  const [userDetail, setUserDetail] = useState(false);
  const userInfo = useSelector(selectCurrentUserData) || {};
  const shows = useSelector(selectEvent) || {};


  // let userInfo =storage["localStorage"]?.get(userDetailStorageName)

  // useEffect(() => {
  //   setUserDetail(user);
  // }, [user?._id, user]);
  const router = useRouter();
  const { id } = router.query;
  let [isOpen, setIsOpen] = useState();
  const { data, isLoading,refetch ,isSuccess} = useGetEventDetailViaIdQuery(id, {
    skip: !id,
  });
 
//  const event =userInfo?._id?data?.event:event

console.log(data,'datadatadata')

  

  function closeModal() {
    setIsOpen(null);
  }

  function openModal() {
    if (!userInfo?._id) {
      return openModalLoginSignUp();
    }
    setIsOpen("checkout");
  }

  function openModalLoginSignUp() {
    setIsOpen("login/signup");
  }

  function openModalGiftTicket() {
    if (!userInfo?._id) {
      return openModalLoginSignUp();
    }
    setIsOpen("gift ticket");
  }

  function openModalShareEvent() {

   
    setIsOpen("share event");
  }

  console.log(data,'datadata')
 
  return (
    <NoAuth>
     
      <Hero
        HeroSectionEvent={{ ...data,...data?.event, ...shows   }}
        openModalLoginSignUp={openModalLoginSignUp}
        openModal={openModal}
        giftTicket={openModalGiftTicket}
        openModalShareEvent={openModalShareEvent}
        notEvent={false}
        isSingleEvent={true}
        
      />
     {data?._id && <EventDetails HeroSectionEvent={{ ...data,...data?.event, ...shows }}  />}
      <Footer />
    </NoAuth>
  );
}
