// import Footer from "@/components/Common/Footer";
import NoAuth from "@/components/Layout/NoAuth";
import dynamic from 'next/dynamic'
// import DropDown from '@/components/Ui/DropDown'
import MyModal from "@/components/Ui/Modal";
import EventDetails from "@/components/modules/EventDetails";
import React, {  useState } from "react";
const Hero = dynamic(() => import('@/components/modules/onDemand/Hero'), {
  ssr: false
});
import {
  useGetEventDetailViaIdQuery,
 
} from "@/store/Event/eventApi";  
import { useDispatch, useStore } from "react-redux";

import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectCurrentUserData, selectEvent } from "@/store/User";
import { CloseIcon } from "../../../public/svg";
import CountDown from "@/components/Common/Coundown";
import { isArray } from "@/utils/helper";
import Footer from "../../components/modules/Entertainer/Footer";

export default function EventId() {
  const dispatch = useDispatch()
  
  // const { event, setEvent } = useStore();

  const [userDetail, setUserDetail] = useState(true);
  const userInfo = useSelector(selectCurrentUserData) || {};
  const shows = useSelector(selectEvent) || {};


  // let userInfo =storage["localStorage"]?.get(userDetailStorageName)

  // useEffect(() => {
  //   setUserDetail(user);
  // }, [user?._id, user]);
  const router = useRouter();
//   const { id } = router.query;
  const id =isArray(router.query?.slug)&&router.query?.slug[1]
  // const eventName =router.query?.slug[0]
  let [isOpen, setIsOpen] = useState();
  const { data, isLoading,refetch ,isSuccess} = useGetEventDetailViaIdQuery(id, {
    skip: !id,
  });
 


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

  const eventsData={...shows, ...data,...data?.event,   }

  // console.log(data,'eventsDataeventsDataeventsData')
 
  return (
    <NoAuth>
      {/* <MyModal
      isOpen={userDetail}
      containerStyle={`!w-[543px]`}
      closeModal={()=>setUserDetail(false)}
      bodyComponent={<CountDown/>
     }
      /> */}
     
      <Hero
        HeroSectionEvent={eventsData}
        openModalLoginSignUp={openModalLoginSignUp}
        openModal={openModal}
        giftTicket={openModalGiftTicket}
        openModalShareEvent={openModalShareEvent}
        notEvent={false}
        isSingleEvent={true}
        
      />
     {eventsData?._id||eventsData?.event?._id ? <EventDetails HeroSectionEvent={eventsData}  />:null}
      <Footer />
    </NoAuth>
  );
}
