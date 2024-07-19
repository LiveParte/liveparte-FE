import React, { useRef } from "react";
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
import { isArray } from "@/utils/helper";

const LiveStream = dynamic(
  () => import("@/components/modules/LiveStream/LiveStreamMain"),
  { ssr: false }
);

export default function Index() {
  const router = useRouter();
  const showId = isArray(router.query?.slug) && router.query?.slug[1];
  const userInfo = useSelector(selectCurrentUserData) || {};
  const { data, isLoading, refetch, isSuccess } = useGetEventDetailViaIdQuery(showId, {
    skip: !showId,
  });
  const { data: userProfileData, isLoading: userProfileLoader } = useGetUserProfileQuery(undefined, {
    skip: !userInfo?._id,
  });
  const NestedLiveStreamData = useSelector(selectLiveStreamEvent) || data;
  const liveStream = { ...data, ...NestedLiveStreamData?.event };
  const modalRef = useRef(null);

  const handleCloseModal = () => {
    modalRef.current = null;
    forceUpdate();
  };

  // console.log(data,'NestedLiveStreamData')

  const handleOpenModal = (modalName) => {
    modalRef.current = modalName;
    forceUpdate();
  };

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

  const forceUpdate = React.useReducer(() => ({}), {})[1]; // Force update for re-render

  return (
    <WithAuth showHeader={false}>
      {modalRef.current && (
        <MyModal
          bodyComponent={
            ModalList?.find((item, index) => item?.name === modalRef.current)?.component
          }
          containerStyle={`bg-[#1B1C20] border-[1px] border-[#343F4B] rounded-[16px]  !w-[486px]`}
          isOpen={!!modalRef.current}
          closeModal={handleCloseModal}
        />
      )}
      <div className="flex-1 flex flex-col bg-[#060809] overflow-hidden h-[100dvh] lg:h-[100vh]">
        <LiveStream
          isLive={liveStream?.isLiveStreamed}
          liveStreamDetail={liveStream}
          handleOpenModal={handleOpenModal}
          handleCloseModal={handleCloseModal}
          userProfileData={userProfileData || userInfo}
          isLoading={isLoading}
        />
      </div>
    </WithAuth>
  );
}
