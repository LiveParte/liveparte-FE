import NoAuth from "@/components/Layout/NoAuth";
import Hero from "@/components/modules/Event/Hero";
import Happening from "@/components/modules/Event/Happening";
import Footer from "@/components/Common/Footer";
import { useRouter } from "next/router";
import MyModal from "@/components/Ui/Modal";
import { useState } from "react";
import LoginSignUp from "@/components/modules/Event/Modal/Login&SignUp";
import WithAuth from "@/components/Layout/WithAuth";
import { useGetAllEventQuery, useGetEventOnDemandQuery } from "@/store/Event/eventApi";
import moment from "moment";

export default function Home() {
  const router = useRouter();
  let [isOpen, setIsOpen] = useState(false);
  const {data,isLoading,isError}=useGetAllEventQuery();
  const {data:onDemandEvent,isLoading:onDemandEventLoader}=useGetEventOnDemandQuery();
  const randomIndex = Math.floor(Math.random() * data?.event.length);
// const randomEvent = events[randomIndex];

  const HappeningNow = data?.event?.filter((item)=>item?.eventStarted==true);
  const OnDemandEvent =onDemandEvent?.event;
  const HeroSectionEvent =data?.event[randomIndex];
    const filteredEvents = data?.event.filter(event => {
    // Check if the 'event_date' is not equal to "Event Date"
    if (event.event_date !== "Event Date") {
        // Parse the 'event_date' string into a moment object
        const eventDate = moment(event.event_date);
        // Get the current date as a moment object
        const currentDate = moment();
        // Check if the 'event_date' is in the future (upcoming event)
        return eventDate.isAfter(currentDate);
    }
    // Exclude events with "Event Date"
    return false;
});

  console.log(HeroSectionEvent,'HappeningNow');

  function closeModal() {
    setIsOpen();
  }

  function openModal(pageName) {
    setIsOpen(pageName);
  }

  const modalPage =[
    {
      name:'Login',
      component:<LoginSignUp className={`min-h-[75vh] tallT:min-h-[65vh]`} closeModal={closeModal} />
    },
    {
      name:'SignUp',
      component:<LoginSignUp className={`xl:min-h-[75vh] tallT:min-h-[65vh]`} pageName="signUp" closeModal={closeModal} />
    },
  ]

  return (
    <NoAuth>
      <MyModal
        bodyComponent={modalPage?.find((item)=>item?.name===isOpen)?.component}
        containerStyle={`!bg-[#1B1C20]  border-[1px] border-[#343F4B] rounded-[16px]  !w-[586px] min-h-[75vh] tallT:min-h-[65vh]`}
        isOpen={isOpen?true:false}
        closeModal={closeModal}
        openModal={openModal}
      />
      <Hero HeroSectionEvent={HeroSectionEvent} openModal={openModal} router={router} notEvent={true} />
      <Happening events={HappeningNow} upComingEvent={filteredEvents}  OnDemandEvent={OnDemandEvent}/>
      <Footer />
    </NoAuth>
  );
}
