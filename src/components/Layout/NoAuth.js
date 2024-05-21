import React, { useEffect } from "react";
import IfHeaderIsAuth from "../Common/Header/IfHeaderIsAuth";
import { logout, selectCurrentUserData, setUserData } from "@/store/User";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserProfileQuery, useUpdateUserLocationMutation } from "@/store/User/userApi";

function NoAuth({ children }) {
  const router = useRouter();
  // const [updateUserLocation]=useUpdateUserLocationMutation();
  // const userInfo = useSelector(selectCurrentUserData);
  const dispatch = useDispatch();


  const { data, isLoading, isError,error, isSuccess,status} = useGetUserProfileQuery(undefined,{
    skip: true,
    // selectFromResult: (result) => ({
    //   ...result,
    //   statusCode: result.meta?.statusCode,
    // }),
  });

 

  // console.log(userInfo,'countryInfo')
  useEffect(() => {
    if(!isLoading){
    
   
    if(error?.message==="Unauthorized"){
      // dispatch(setUserData({}))
      dispatch(logout());
    }
    
   
  }
  }, [ router,error?.message,isLoading]);

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
