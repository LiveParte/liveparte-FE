import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { selectCurrentUserData } from "@/store/User";
import { useGetUserProfileQuery } from "@/store/User/userApi";
import { decryptObject, storage, userDetailStorageName } from "@/utils/helper";
import {  useSelector } from 'react-redux';


function WithAuth({ children }) {
  const router = useRouter();
  // let userInfo =storage["localStorage"]?.get(userDetailStorageName)&& decryptObject(storage["localStorage"]?.get(userDetailStorageName));
  const {isLoading,isError} =useGetUserProfileQuery();
  alert("hello")
  const user =useSelector(selectCurrentUserData);
   console.log(user,'useSelector')
  const isAuthenticated =false;

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if(!isLoading){
    if (isError) {
      router.push("/");
    }
  }
  }, [isError,isLoading]);

  return (
    <div className="min-h-[100vh] bg-white">
      {!isAuthenticated ? children : <div></div>}
    </div>
  );
}

export default WithAuth;
