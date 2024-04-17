import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isAuth, logout, selectCurrentUserData } from "@/store/User";
import { useGetUserProfileQuery } from "@/store/User/userApi";
import { decryptObject, storage, userDetailStorageName } from "@/utils/helper";
import {  useSelector,useDispatch } from 'react-redux';


function WithAuth({ children }) {
  const router = useRouter();
  const userInfo =useSelector(selectCurrentUserData);

  // let userInfo =storage["localStorage"]?.get(userDetailStorageName)
  const {isLoading,isError} =useGetUserProfileQuery();
  const [isAuth,setIsAuth] =useState(false);
  // alert("hello")
  const isAuthenticated =userInfo?._id;
  //  console.log(userInfo,isError,'useSelector')
  // const isAuthenticated =false;

  // console.log(isAuthenticated,user,'isAuthenticated')

  useEffect(() => {
    setIsAuth()
  }, [userInfo?._id])
  

  useEffect(() => {
    if (!userInfo?._id) {
      router.push("/");
      
    }
  }, [userInfo?._id]);

  // useEffect(() => {
  //   if (!user?._id) {
  //     router.push("/");
  //     // dispatch(logout())
  //   }
  // }, [user,userInfo]);

  useEffect(() => {
    if(!isLoading){
    if (!userInfo?._id) {
      router.push("/");
      // dispatch(logout())
      // dispatch(logout())
    }
  }
  }, [userInfo?.id,isLoading]);

  useEffect(() => {
    if(!isLoading && isError){
 
      router.push("/");
      // dispatch(logout())
    
  }
  }, [isError,isLoading]);

  
  // if(typeof window !== "undefined"){
  //   return <div>isLoading</div>
  // }

  

  return (
    <div className="min-h-[100vh] bg-black flex flex-col justify-end">
      {isAuth ? children : <div></div>}
    </div>
  );
}

export default WithAuth;
