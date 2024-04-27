import React, { useEffect } from "react";
import ProgressBar from "../Common/ProgressBar/progressBar";
import { ObjectProvider } from "@/Context/ObjectProvider";
import IfHeaderIsAuth from "../Common/Header/IfHeaderIsAuth";
import { logout, selectCurrentUserData, setUserData } from "@/store/User";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserProfileQuery } from "@/store/User/userApi";

function NoAuth({ children }) {
  const router = useRouter();
  const userInfo = useSelector(selectCurrentUserData);
  const dispatch = useDispatch();

  const { data, isLoading, isError,status,error } = useGetUserProfileQuery(undefined,{
    skip: !userInfo?._id,
  });

  useEffect(() => {
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
