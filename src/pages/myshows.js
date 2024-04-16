import AuthHeader from "@/components/Common/Header/AuthHeader";
import dynamic from "next/dynamic";
import Footer from "@/components/Common/Footer";
import { useUserShowsQuery } from "@/store/Event/eventApi";
import { selectCurrentUserData } from "@/store/User";
import React, { useEffect, useState } from "react";
import {  useSelector } from 'react-redux';
import WithAuth from "@/components/Layout/WithAuth";
import { storage, userDetailStorageName } from "@/utils/helper";
import IfHeaderIsAuth from "@/components/Common/Header/IfHeaderIsAuth";
// import Header from "@/components/modules/MyShow/Header";
const Shows =dynamic(()=>import('@/components/modules/MyShow/Shows'),{ssr:false})
const Header =dynamic(()=>import('@/components/modules/MyShow/Header'),{ssr:false})
export default function MyShows() {
  const userInfo =useSelector(selectCurrentUserData);
  // let userInfo =storage["localStorage"]?.get(userDetailStorageName)
  // console.log(user,'user')
  const {data:userShows,isLoading,refetch,isSuccess}=useUserShowsQuery(userInfo?._id,{
    skip:!userInfo?._id
  })
  const HeaderData = [
    {
      name: "Upcoming",
    },
    {
      name: "On Demand",
    },
    // {
    //   name: "Past",
    // },
  ];

  useEffect(() => {
    isSuccess&&refetch()
  }, [isSuccess,refetch])
  

  // console.log(userShows?.event,user,'userShows')
  const [isActive, setIsActive] = useState(HeaderData[0]?.name);
  return (
    <WithAuth>
    <div className="bg-[#060809] min-h-[100vh]  relative">
      <IfHeaderIsAuth/>

      <Header
        Data={HeaderData}
        isActive={isActive}
        setIsActive={setIsActive}
        title="My Shows"
      />
      <Shows Data={userShows?.event} isLoading={isLoading} isActive={isActive} />
      <div className="absolute bottom-0 left-0 right-0">
        <Footer />
      </div>
    </div>
    </WithAuth>
  );
}
