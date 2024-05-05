"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isAuth, logout, selectCurrentUserData, setUserData } from "@/store/User";
import { useGetUserProfileQuery, useUpdateUserLocationMutation } from "@/store/User/userApi";
import { decryptObject, storage, userDetailStorageName } from "@/utils/helper";
import { useSelector, useDispatch } from 'react-redux';
import IfHeaderIsAuth from "../Common/Header/IfHeaderIsAuth";
import axios from "axios";

function WithAuth({ children, showHeader = true }) {
  const router = useRouter();
  const [updateUserLocation]=useUpdateUserLocationMutation();

  const userInfo = useSelector(selectCurrentUserData);
  const [isAuth, setIsAuth] = useState(false);
  const isAuthenticated = userInfo?._id;
  const dispatch = useDispatch();
  // 
  const {address,country,state,country_code}=userInfo;

  const handleUpdateUserLocation=async(data)=>{
    const payload={
      "country":data?.country_name,
      "state": data?.region,
      "country_code": data?.country_code,
      "address": data?.ip,
      id:userInfo?._id
    }
    const response = await updateUserLocation(payload);
    // console.log(response,'response')
  }

  const getLocationDetails = () => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        console.log(response,userInfo,'response')
        storage.cookieStorage.set("userLo", JSON.stringify(response?.data));
        userInfo?._id&&handleUpdateUserLocation(response?.data)
        // Handle the response
      })
      .catch((error) => {
        // Handle errors
      });
  };

  const { data, isLoading, isError,error, } = useGetUserProfileQuery(undefined,{
    skip: !userInfo?._id,
  });


//  console.log(userInfo,'userInfo')



  useEffect(() => {
    if(!state || !country || !address || !country_code){
      getLocationDetails();
    }
  
    
    if(!userInfo?._id){
      router.push('/');
      dispatch(setUserData({}));
      // alert('you are out')
      // dispatch(logout());
    }
    if(error?.message==="Unauthorized"){
      dispatch(setUserData({}))
      dispatch(logout());
    }
    // if(userInfo)
    if (!isAuthenticated) {
      router.push('/');
    }
    else{
      setIsAuth(true)
    }
  }, [isAuthenticated, router,userInfo?._id,error,error?.message,isLoading]);


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
