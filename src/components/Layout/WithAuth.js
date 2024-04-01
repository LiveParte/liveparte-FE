import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { isAuth, logout, selectCurrentUserData } from "@/store/User";
import { useGetUserProfileQuery } from "@/store/User/userApi";
import { decryptObject, storage, userDetailStorageName } from "@/utils/helper";
import {  useSelector,useDispatch } from 'react-redux';


function WithAuth({ children }) {
  const router = useRouter();
  const dispatch = useDispatch()
  let userInfo =storage["localStorage"]?.get(userDetailStorageName)
  const {isLoading,isError} =useGetUserProfileQuery();
  // alert("hello")
  const user =useSelector(selectCurrentUserData);
  const isAuthenticated =userInfo?._id;
   console.log(userInfo,'useSelector')
  // const isAuthenticated =false;

  console.log(isAuthenticated,user,'isAuthenticated')

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
      
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!user?._id) {
      router.push("/");
      // dispatch(logout())
    }
  }, [user,userInfo]);

  useEffect(() => {
    if(!isLoading){
    if (!userInfo?._id) {
      router.push("/");
      dispatch(logout())
      // dispatch(logout())
    }
  }
  }, [userInfo?.id]);

  useEffect(() => {
    if(!isLoading){
    if (isError) {
      // router.push("/");
      // dispatch(logout())
    }
  }
  }, [isError,isLoading]);

  return (
    <div className="min-h-[100vh] bg-white">
      {true ? children : <div></div>}
    </div>
  );
}

export default WithAuth;
