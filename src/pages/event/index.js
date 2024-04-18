import dynamic from 'next/dynamic';
import { useRouter } from "next/router";
import { useGetAllEventQuery, useGetEventOnDemandQuery } from "@/store/Event/eventApi";
import moment from "moment";
import { isArray, storage, userDetailStorageName } from '@/utils/helper';

// Dynamic imports
const Hero = dynamic(() => import('@/components/modules/Event/Hero'), { ssr: false });
const Happening = dynamic(() => import('@/components/modules/Event/Happening'), { ssr: false });
const Footer = dynamic(() => import('@/components/Common/Footer'), { ssr: false });
import NoAuth from "@/components/Layout/NoAuth";
import { isJSON } from '@/utils/reusableComponent';
const userData = storage.localStorage.get(userDetailStorageName);
const CheckUser =isJSON(userData)&&JSON.parse(userData)
// console.log(CheckUser,'userData')
export default function Home() {
  const router = useRouter();

  // Queries
  const { data, isLoading, isError } = useGetAllEventQuery();
  const { data: onDemandEvent, isLoading: onDemandEventLoader } = useGetEventOnDemandQuery();

  // Data processing
  const happeningNowEvents = data?.event?.filter(item => item?.eventStarted === true);
  const onDemandEvents = onDemandEvent?.event;
  const heroEvent = isArray(data?.event) ? data?.event[2] : null;
  const filteredEvents = isArray(data?.event)
    ? data?.event.filter(event => moment(event.event_date) > moment())
    : [];

  return (
    <div className='min-h-[100vh] bg-black'>
      <NoAuth>
        {heroEvent && <Hero isOnDemand={false} HeroSectionEvent={heroEvent} router={router} notEvent={true} />}
        <Happening events={happeningNowEvents} upComingEvent={filteredEvents} OnDemandEvent={onDemandEvents} />
        <Footer />
      </NoAuth>
    </div>
  );
}
