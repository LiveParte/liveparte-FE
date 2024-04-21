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

const LiveStream = dynamic(
  () => import("@/components/modules/LiveStream/LiveStream"),
  { ssr: false }
);

export default function Index() {
  const  router = useRouter();
  const {showId} =router?.query
  const { data, isLoading,refetch ,isSuccess} = useGetEventDetailViaIdQuery(showId, {
    skip: !showId,
  });
  const NestedLiveStreamData = useSelector(selectLiveStreamEvent)||data;
  const liveStream =data||NestedLiveStreamData
  let [isOpen, setIsOpen] = useState();
  const handleCloseModal = ()=>{
    setIsOpen(null)
  }

  // console.log(data,'data')
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
          isLive={liveStream?.isLiveStreamed}
          liveStreamDetail={liveStream}
          handleOpenModal={handleOpenModal}
          handleCloseModal={handleCloseModal}
        />
      </div>
    </WithAuth>
  );
}
