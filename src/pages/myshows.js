import dynamic from "next/dynamic";
import Footer from "@/components/Common/Footer";
import { useUserShowsQuery } from "@/store/Event/eventApi";
import { selectCurrentUserData } from "@/store/User";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import WithAuth from "@/components/Layout/WithAuth";
import { separateEventsByDate } from "@/utils/helper";
import MyModal from "@/components/Ui/Modal";
import CountDown from "@/components/Common/Coundown";
import { useRouter } from "next/router";
// import OnDemand from "@/components/modules/MyShow/onDemand";
const OnDemand = dynamic(() => import("@/components/modules/MyShow/onDemand"), {
  ssr: false,
});
const Shows = dynamic(() => import("@/components/modules/MyShow/Shows"), {
  ssr: false,
});
const Header = dynamic(() => import("@/components/modules/MyShow/Header"), {
  ssr: false,
});
export default function MyShows() {
  const userInfo = useSelector(selectCurrentUserData);
  const router = useRouter();
  const {show} =router?.query
  // console.log(router,show,'MyShows')
  const {
    data: userShows,
    isLoading,
    refetch,
    isSuccess,
  } = useUserShowsQuery(userInfo?._id, {
    skip: !userInfo?._id,
  });
  const HeaderData = [
    {
      name: "Upcoming",
      link:'upcoming',
    },
    {
      name: "On Demand",
      link:'onDemand',
    },
  ];

  useEffect(() => {
    isSuccess && refetch();
  }, [isSuccess, refetch]);

  // console.log(userShows, separateEventsByDate(userShows?.event),'userShows')

  const [isActive, setIsActive] = useState(HeaderData[0]?.name);

  useEffect(() => {
    if(show==="onDemand"){
      setIsActive(HeaderData[1]?.name)
    }
    if(show==="upcoming"){
      setIsActive(HeaderData[0]?.name)
    }
   
  }, [show])

  // alert(show)
  
  return (
    <WithAuth>
     
      <div className="bg-[#060809] min-h-[100vh]  relative pt-32">
        <Header
          Data={HeaderData}
          isActive={isActive}
          // setIsActive={setIsActive}
          title="My Shows"
        />
        {isActive === "On Demand" && (
          <OnDemand
            Data={separateEventsByDate(userShows?.event)?.oldEvents}
            isLoading={isLoading}
            isActive={isActive}
          />
        )}
        {isActive === "Upcoming" && (
          <Shows
            Data={separateEventsByDate(userShows?.event)?.newEvents}
            isLoading={isLoading}
            isActive={isActive}
          />
        )}
        <div className="absolute bottom-0 left-0 right-0">
          <Footer />
        </div>
      </div>
    </WithAuth>
  );
}
