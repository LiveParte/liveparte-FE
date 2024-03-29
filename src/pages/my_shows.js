import AuthHeader from "@/components/Common/AuthHeader";
import Footer from "@/components/Common/Footer";
import Header from "@/components/modules/MyShow/Header";
import Shows from "@/components/modules/MyShow/Shows";
import { useUserShowsQuery } from "@/store/Event/eventApi";
import { selectCurrentUserData } from "@/store/User";
import React, { useState } from "react";
import {  useSelector } from 'react-redux';

export default function MyShows() {
  const user =useSelector(selectCurrentUserData);
  const {data:userShows,isLoading}=useUserShowsQuery(user?._id,{
    skip:!user?._id
  })
  const HeaderData = [
    {
      name: "Upcoming",
    },
    {
      name: "On demand",
    },
    // {
    //   name: "Past",
    // },
  ];

  // console.log(userShows?.event,user,'userShows')
  const [isActive, setIsActive] = useState(HeaderData[0]?.name);
  return (
    <div className="bg-[#060809] min-h-[100vh]  relative">
      <AuthHeader showNav={true} />

      <Header
        Data={HeaderData}
        isActive={isActive}
        setIsActive={setIsActive}
        title="My Shows"
      />
      <Shows Data={userShows?.event} isLoading={isLoading} />
      <div className="absolute bottom-0 left-0 right-0">
        <Footer />
      </div>
    </div>
  );
}
