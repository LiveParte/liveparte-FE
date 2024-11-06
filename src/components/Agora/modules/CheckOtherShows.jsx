import WithAuth from "@/components/Layout/WithAuth";
import ShowsCard from "@/components/Common/MyShow/Shows";
import ButtonComp from "@/components/Ui/button";
import { useGetAllEventQuery } from "@/store/Event/eventApi";
import { isArray } from "@/utils/helper";
import Image from "next/image";
import React from "react";
import withLazyLoad from "@/components/Common/LazyLoading/lazyLoading";
import { MainContainer } from "@/utils/styleReuse";
import { useSelector } from "react-redux";
import { selectLastEventAttended } from "@/store/User";
import { useRouter } from "next/router";
// import { selectLastEventAttended } from "@/store/Event";

const ShowCardLazy = withLazyLoad(ShowsCard);

export default function CheckOtherShows() {
  const getLastEvent = useSelector(selectLastEventAttended);
  const router = useRouter();

  const {
    data,
    isLoading,
    isError,
    refetch: getAllEventRefetch,
  } = useGetAllEventQuery();

  const allEvent = data?.event || [];
  // console.log(allEvent[0]?.thumbnail_url, "datadatadatadata");

  const filteredUpcoming = isArray(data?.event)
    ? data?.event.filter(
        (event) => event?.isLiveStreamed && event?._id !== getLastEvent?._id
      )
    : [];

  // console.log(getLastEvent?.thumbnail_url,'getLastEventgetLastEvent')

  return (
    <WithAuth showNav={false}>
      <div
        className={`bg-[#060809] min-h-[100vh]  relative pt-16 pb-[77px] ${MainContainer}`}
      >
        <div className=" text-white flex flex-col  items-center mb-[64px]">
          <div className="font-bold font-1 text-3xl uppercase relative text-center mb-[24px]">
            Event has ended
          </div>
          {getLastEvent?.thumbnail_url && (
            <Image
              src={getLastEvent?.thumbnail_url}
              width={293}
              height={242}
              className="w-[293px] h-[242px] object-cover mb-[24px] rounded-md"
              alt="thumbnail"
            />
          )}
          <div className="max-w-[292px] text-center text-[15px] font400 leading-5 mb-[25px]">
            Go to “My show” in the menu to rewatch this event anytime until 12
            June, 2024
          </div>
          <div>
            <ButtonComp
              btnText={"Go to Browse event"}
              className={`h-[44px] px-[30px] text-[#060809] text-[13px] font500`}
              onClick={() => router.push("/event")}
            />
          </div>
        </div>

        <div>
          <div className="text-center font-1 font-bold text-white uppercase text-[32px] leading-9 mb-[40px]">
            Get your ticket for other
            <br />
            exciting events
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {!isLoading &&filteredUpcoming?.slice(0, 4)?.map((item, i) => (
              <ShowCardLazy
                onDemand={true}
                key={i}
                item={item}
                showVideo={false}
              />
            ))}
          </div>
        </div>
      </div>
    </WithAuth>
  );
}
