import React, { useEffect } from "react";
import IfHeaderIsAuth from "../Common/Header/IfHeaderIsAuth";
import { logout, selectCurrentUserData, setUserData } from "@/store/User";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserProfileQuery, useUpdateUserLocationMutation } from "@/store/User/userApi";
import axios from "axios";
import { storage } from "@/utils/helper";

function NoAuth({ children }) {
  const router = useRouter();
  const [updateUserLocation]=useUpdateUserLocationMutation();
  const userInfo = useSelector(selectCurrentUserData);
  const dispatch = useDispatch();

  const {address,country,state,country_code,countryInfo}=userInfo;

  const { data, isLoading, isError, status, error,isSuccess } = useGetUserProfileQuery(
    userInfo?._id,
    {
      skip: !userInfo?._id?true:false
    }
  );
  const handleUpdateUserLocation=async(data)=>{
    const payload={
      "country":data?.country_name,
      "state": data?.region,
      "country_code": data?.country_code,
      "currency_code": data?.currency,
      "currency_name": data?.currency_name,
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

  console.log(userInfo,'countryInfo')
  // console.log(status,userInfo,'status')

  useEffect(() => {
    if(!isLoading){
    if(!state || !country || !address || !country_code ||!countryInfo?.code ||!countryInfo?.name){
      // getLocationDetails();
    }
  
    if (!userInfo?._id) {
    
      dispatch(logout());
    }
    if (error?.message === "Unauthorized") {
      dispatch(setUserData({}));
    }
  }
  }, [ error?.message,userInfo?._id]);

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
