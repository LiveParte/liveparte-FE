import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { logout, selectCurrentUserData } from "@/store/User";
import { useGetUserProfileQuery } from "@/store/User/userApi";
import { decryptObject, storage, userDetailStorageName } from "@/utils/helper";
import {  useSelector,useDispatch } from 'react-redux';


function WithAuth({ children }) {
  const router = useRouter();
  const dispatch = useDispatch()
  // let userInfo =storage["localStorage"]?.get(userDetailStorageName)&& decryptObject(storage["localStorage"]?.get(userDetailStorageName));
  const {isLoading,isError} =useGetUserProfileQuery();
  // alert("hello")
  const user =useSelector(selectCurrentUserData);
   console.log(user,'useSelector')
  const isAuthenticated =false;

  console.log(isAuthenticated,user,'isAuthenticated')

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
      
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if(!isLoading){
    if (isError) {
      router.push("/");
      dispatch(logout())
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
