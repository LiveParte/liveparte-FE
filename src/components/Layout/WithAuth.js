"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isAuth, logout, selectCurrentUserData, setUserData } from "@/store/User";
import { useGetUserProfileQuery } from "@/store/User/userApi";
import { decryptObject, storage, userDetailStorageName } from "@/utils/helper";
import { useSelector, useDispatch } from 'react-redux';
import IfHeaderIsAuth from "../Common/Header/IfHeaderIsAuth";

function WithAuth({ children, showHeader = true }) {
  const router = useRouter();
  const userInfo = useSelector(selectCurrentUserData);
  const [isAuth, setIsAuth] = useState(false);
  const isAuthenticated = userInfo?._id;
  const dispatch = useDispatch();


  const { data, isLoading, isError,error } = useGetUserProfileQuery(undefined,{
    skip: !userInfo?._id,
  });


//  console.log(userInfo,'userInfo')



  useEffect(() => {
    if(!userInfo?._id){
      router.push('/');
      dispatch(setUserData({}));
      // alert('you are out')
      // dispatch(logout());
    }
    if(error?.message==="Unauthorized"){
      dispatch(setUserData({}))
    }
    // if(userInfo)
    if (!isAuthenticated) {
      router.push('/');
    }
    else{
      setIsAuth(true)
    }
  }, [isAuthenticated, router,userInfo?._id,error,error?.message]);


  if (!isAuth) {
    return <div>...</div>;
  }
  
  return (
    <div className="min-h-[100dvh] md:min-h-[100vh] bg-black flex flex-col justify-end ">
      {showHeader && <div className="absolute left-0 right-0 z-50 top-0">
        <IfHeaderIsAuth />
      </div>}
      {children}
    </div>
  );
}

export default WithAuth;
