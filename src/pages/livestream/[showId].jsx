// import LiveStream from '@/components/modules/LiveStream/LiveStream'
import React, { useState } from "react";
import dynamic from "next/dynamic";
import WithAuth from "@/components/Layout/WithAuth";
import { useSelector } from "react-redux";
import { selectLiveStreamEvent } from "@/store/Event";
import GiftTicket from "@/components/modules/EventDetails/modal/GiftTicket";
import ShareEvent from "@/components/modules/EventDetails/modal/ShareEvent";
import MyModal from "@/components/Ui/Modal";
import { useGetEventDetailViaIdQuery } from "@/store/Event/eventApi";
import { useRouter } from "next/router";
import { useGetUserProfileQuery } from "@/store/User/userApi";
import { selectCurrentUserData } from "@/store/User";
import { isFutureDate } from "@/utils/reusableComponent";

const LiveStream = dynamic(
  () => import("@/components/modules/LiveStream/LiveStream"),
  { ssr: false }
);

export default function Index() {
  const  router = useRouter();
  const {showId} =router?.query
  const userInfo = useSelector(selectCurrentUserData) || {};
  const { data, isLoading,refetch ,isSuccess} = useGetEventDetailViaIdQuery(showId, {
    skip: !showId,
  });
  const { data:userProfileData, isLoading:userProfileLoader } = useGetUserProfileQuery(undefined,{
    skip:!userInfo?._id,
  });
  const NestedLiveStreamData = useSelector(selectLiveStreamEvent)||data;
  const liveStream ={...NestedLiveStreamData}
  let [isOpen, setIsOpen] = useState();
  const handleCloseModal = ()=>{
    setIsOpen(null)
    
  }

  console.log(liveStream,data,NestedLiveStreamData,'NestedLiveStreamData')

  const handleOpenModal = (modalName)=>{
    setIsOpen(modalName)
  }
  const ModalList = [
   
    {
      name: "giftTicket",
      component: (
        <GiftTicket Data={liveStream} closeModal={handleCloseModal} />
      ),
    },
  
    {
      name: "shareEvent",
      component: (
        <ShareEvent Data={liveStream} closeModal={handleCloseModal} />
      ),
    },
  ];

  console.log(isFutureDate(liveStream?.event_date),liveStream?.event_date,'isFutureDate(liveStream?.event_date)')

  return (
    <WithAuth showHeader={false}>
       {isOpen && (
        <MyModal
          bodyComponent={
            ModalList?.find((item, index) => item?.name == isOpen)?.component
          }
          containerStyle={`bg-[#1B1C20] border-[1px] border-[#343F4B] rounded-[16px]  !w-[486px]`}
          isOpen={isOpen ? true : false}
          closeModal={handleCloseModal}
          // openModal={openModal}
        />
      )}
      <div className="flex-1 flex flex-col  bg-[#060809] overflow-hidden ">
        <LiveStream
          isLive={isFutureDate(liveStream?.event_date)}
          liveStreamDetail={liveStream}
          handleOpenModal={handleOpenModal}
          handleCloseModal={handleCloseModal}
          userProfileData={userProfileData||userInfo}
          isLoading={isLoading}
        />
      </div>
    </WithAuth>
  );
}
