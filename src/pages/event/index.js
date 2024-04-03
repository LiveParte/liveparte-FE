import NoAuth from "@/components/Layout/NoAuth";
import Hero from "@/components/modules/Event/Hero";
import Happening from "@/components/modules/Event/Happening";
import Footer from "@/components/Common/Footer";
import { useRouter } from "next/router";
import { useGetAllEventQuery, useGetEventOnDemandQuery } from "@/store/Event/eventApi";
import moment from "moment";

export default function Home() {
  const router = useRouter();
  const {data,isLoading,isError}=useGetAllEventQuery();
  const {data:onDemandEvent,isLoading:onDemandEventLoader}=useGetEventOnDemandQuery();
  const randomIndex = Math.floor(Math.random() * data?.event.length);
// const randomEvent = events[randomIndex];

  const HappeningNow = data?.event?.filter((item)=>item?.eventStarted==true);
  const OnDemandEvent =onDemandEvent?.event;
  const HeroSectionEvent =data?.event[1];
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

 


  return (
    <NoAuth>
      <Hero HeroSectionEvent={HeroSectionEvent}  router={router} notEvent={true} />
      <Happening events={HappeningNow} upComingEvent={filteredEvents}  OnDemandEvent={OnDemandEvent}/>
      <Footer />
     
    </NoAuth>
  );
}
