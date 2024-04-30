import React, { useEffect } from "react";
import IfHeaderIsAuth from "../Common/Header/IfHeaderIsAuth";
import { logout, selectCurrentUserData, setUserData } from "@/store/User";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserProfileQuery } from "@/store/User/userApi";
import axios from 'axios'
import { storage } from "@/utils/helper";
import { isJSON } from "@/utils/reusableComponent";

function NoAuth({ children }) {
  const router = useRouter();
  const userInfo = useSelector(selectCurrentUserData);
  const dispatch = useDispatch();

  const { data, isLoading, isError,status,error } = useGetUserProfileQuery(undefined,{
    skip: !userInfo?._id,
  });

  const getLocationDetails =()=>{
    axios.get('https://ipapi.co/json/')
  .then(response => {
    console.log(response,'response')
    storage.cookieStorage.set('userLo',JSON.stringify(response?.data))
    
    // Handle the response
  })
  .catch(error => {
    // Handle errors
  });
  }


  // console.log(isJSON(storage.cookieStorage.get('userLo'))&&JSON.parse())


  useEffect(() => {
    getLocationDetails();
    if(!userInfo?._id){
      // router.push('/');
      // alert('you are out')
      dispatch(logout());
      
    }
    if(error?.message==="Unauthorized"){
      dispatch(setUserData({}))
    }
  
  }, [ router,userInfo?._id,error,error?.message]);

  // console.log(error?.message,'status')
  return (
    <div className="min-h-[100vh] bg-[#000000] flex flex-col justify-end relative">
      <div className="absolute left-0 right-0 z-50 top-0">
        <IfHeaderIsAuth />
      </div>
      {children}
    </div>
  );
}

export default NoAuth;
