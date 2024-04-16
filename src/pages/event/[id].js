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
import { useObject } from "@/Context/ObjectProvider";
const Hero = dynamic(() => import('@/components/modules/Event/Hero'), {
  ssr: false
});
import {
  eventApi,
  useGetEventDetailViaIdQuery,
  useLazyUserShowsQuery,
  useUserShowsQuery,
} from "@/store/Event/eventApi";
import { useDispatch } from "react-redux";

import { useRouter } from "next/router";
import { usePaystackPayment } from "react-paystack";
// import { PaystackConsumer } from 'react-paystack';
import { useCreatePurchaseMutation } from "@/store/Transaction/transactionApi";
import { useSelector } from "react-redux";
import { selectCurrentUserData } from "@/store/User";
import { storage, userDetailStorageName } from "@/utils/helper";
import { myShowLink } from "@/utils/reusableComponent";

export default function EventId() {
  const dispatch = useDispatch()
  const [userDetail, setUserDetail] = useState(false);
  const userInfo = useSelector(selectCurrentUserData) || {};
  // let userInfo =storage["localStorage"]?.get(userDetailStorageName)

  // useEffect(() => {
  //   setUserDetail(user);
  // }, [user?._id, user]);
  const router = useRouter();
  const { id } = router.query;
  let [isOpen, setIsOpen] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [CreatePurchase, { isLoading: cpLoader }] = useCreatePurchaseMutation();
  const { data, isLoading,refetch ,isSuccess} = useGetEventDetailViaIdQuery(id, {
    skip: !id,
  });
 
  // const [handleUserShow,{isLoading:userShowLoader}] =useLazyUserShowsQuery();

  // const handleUserShowFun = async() =>{
  //     const response = await handleUserShow(user?.id);
  //     console.log(response)
  // }

  useEffect(() => {
    if(userInfo?._id&&isSuccess){
      refetch();
    }
  }, [userInfo?._id,isSuccess,refetch])
  



  
  // console.log(user ,"userShows");
  const config = {
    reference: new Date().getTime().toString(),
    email: userDetail?.email || "user@example.com",
    amount: data?.ticket?.price * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: "pk_test_9b34d7cad3b54108b6eb034c951d89366eadcc3d",
    metadata: {
      custom_fields: [
        {
          event_id: data?._id,
          ticket_id: data?.ticket?._id,
          purchase_date: new Date(),
        },
        // To pass extra metadata, add an object with the same fields as above
      ],
    },
  };

  const initializePayment = usePaystackPayment(config);
  const { myObject } = useObject();

  console.log(myObject,'myObject')

 
  // useEffect(() => {
  //   setEvent(myObject);
  // }, [myObject?._id]);

  function closeModal() {
    setIsOpen(null);
  }

  function openModal() {
    // console.log(userDetail, "userDetail");
    if (!userInfo?._id) {
      return openModalLoginSignUp();
    }
    setIsOpen("checkout");
  }

  function openModalLoginSignUp() {
    setIsOpen("login/signup");
  }

  function openModalGiftTicket() {
    setIsOpen("gift ticket");
  }

  function openModalShareEvent() {
    setIsOpen("share event");
  }

  const handleSuccess = async (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    // console.log(reference, "reference");
    const payload = {
      event_id: data?._id,
      ticket_id: data?.ticket?.id,
      user_id: userInfo?._id,
      purchase_date: new Date(),
    };
    const response = await CreatePurchase(payload);
    // console.log(response);
    if (response?.data?.createdPurchase?._id) {
      closeModal();
      router.push(myShowLink);
    }
  };
  // you can call this function anything
  const handleClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    // console.log("closed");
  };

  const componentProps = {
    ...config,
    text: "Paystack Button Implementation",
    onSuccess: (reference) => handleSuccess(reference),
    onClose: handleClose,
  };
  const ModalList = [
    {
      name: "checkout",
      component: (
        <CheckOut
          Data={{ ...data, ...myObject }}
          makePayment={() => initializePayment(handleSuccess, handleClose)}
          componentProps={componentProps}
          handleSuccess={handleSuccess}
          handleClose={handleClose}
          closeModal={closeModal}
          IsBought={false}
        />
      ),
    },
    {
      name: "gift ticket",
      component: (
        <GiftTicket Data={{ ...data, ...myObject }} closeModal={closeModal} />
      ),
    },
    {
      name: "login/signup",
      component: (
        <LoginSignUp
          closeModal={closeModal}
          onNext={(userDetail) => {
            dispatch(eventApi.endpoints.userShows.initiate(userDetail?._id, {forceRefetch: true}));

            // userShowRefetch();
            setIsOpen("checkout");
          }}
        />
      ),
    },
    {
      name: "share event",
      component: (
        <ShareEvent Data={{ ...data, ...myObject }} closeModal={closeModal} />
      ),
    },
  ];

  return (
    <NoAuth>
      {isOpen && (
        <MyModal
          bodyComponent={
            ModalList?.find((item, index) => item?.name == isOpen)?.component
          }
          containerStyle={`bg-[#1B1C20] border-[1px] border-[#343F4B] rounded-[16px]  !w-[586px]`}
          isOpen={isOpen ? true : false}
          closeModal={closeModal}
          openModal={openModal}
        />
      )}
      <Hero
        HeroSectionEvent={{ ...data?.event,...data, ...myObject }}
        openModalLoginSignUp={openModalLoginSignUp}
        openModal={openModal}
        giftTicket={openModalGiftTicket}
        openModalShareEvent={openModalShareEvent}
        notEvent={false}
        
      />
      {/* <Dropdown  placement="top" label="Dropdown button" dismissOnClick={false}>
      <DropdownItem>Dashboard</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
      <DropdownItem>Earnings</DropdownItem>
      <DropdownItem>Sign out</DropdownItem>
    </Dropdown> */}
      <EventDetails HeroSectionEvent={data || myObject}  />

      {/* <PaystackHookExample/> */}
      {/* <Happening/> */}
      <Footer />
    </NoAuth>
  );
}
