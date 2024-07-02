import Footer from "@/components/Common/Footer";
import NoAuth from "@/components/Layout/NoAuth";
import dynamic from "next/dynamic";
// import DropDown from '@/components/Ui/DropDown'
import MyModal from "@/components/Ui/Modal";
import EventDetails from "@/components/modules/EventDetails";
import React, { useState } from "react";
const Hero = dynamic(() => import("@/components/modules/onDemand/Hero"), {
  ssr: false,
});
import { useGetEventDetailViaIdQuery } from "@/store/Event/eventApi";
import { useDispatch, useStore } from "react-redux";

import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectCurrentUserData, selectEvent } from "@/store/User";
import { CloseIcon } from "../../../public/svg";
import CountDown from "@/components/Common/Coundown";

export default function EventId() {
  const dispatch = useDispatch();

  // const { event, setEvent } = useStore();

  const [userDetail, setUserDetail] = useState(true);
  const userInfo = useSelector(selectCurrentUserData) || {};
  const shows = useSelector(selectEvent) || {};

  // let userInfo =storage["localStorage"]?.get(userDetailStorageName)

  // useEffect(() => {
  //   setUserDetail(user);
  // }, [user?._id, user]);
  const router = useRouter();
  const { id } = router.query;
  let [isOpen, setIsOpen] = useState();
  const { data, isLoading, refetch, isSuccess } = useGetEventDetailViaIdQuery(
    id,
    {
      skip: !id,
    }
  );

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

  const eventsData = { ...data, ...data?.event, ...shows };

  console.log(router,'routerrouter')

  return (
    <NoAuth>
      <Hero
        HeroSectionEvent={eventsData}
        openModalLoginSignUp={openModalLoginSignUp}
        openModal={openModal}
        giftTicket={openModalGiftTicket}
        openModalShareEvent={openModalShareEvent}
        notEvent={false}
        isSingleEvent={true}
      />
      {eventsData?._id || eventsData?.event?._id ? (
        <EventDetails HeroSectionEvent={eventsData} />
      ) : null}
      <Footer />
    </NoAuth>
  );
}
