"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { logout, selectCurrentUserData, setUserData } from "@/store/User";
import {
  useGetUserProfileQuery,
  useUpdateUserLocationMutation,
} from "@/store/User/userApi";
import { storage, userDetailStorageName } from "@/utils/helper";
import { useSelector, useDispatch } from "react-redux";
import IfHeaderIsAuth from "../Common/Header/IfHeaderIsAuth";

function WithAuth({ children, showHeader = true, showNav = true }) {
  const router = useRouter();
  const [updateUserLocation] = useUpdateUserLocationMutation();

  const userInfo = useSelector(selectCurrentUserData);
  const [isAuth, setIsAuth] = useState(false);
  const isAuthenticated = userInfo?._id;
  const dispatch = useDispatch();
  //
  const { address, state, countryInfo } = userInfo || {};

  const { data, isLoading, isError, error, isSuccess, status } =
    useGetUserProfileQuery(undefined, {
      skip: true,
      // selectFromResult: (result) => ({
      //   ...result,
      //   statusCode: result.meta?.statusCode,
      // }),
    });

  //  console.log(status,'UserString')

  // console.log(userInfo,'countryInfo')
  useEffect(() => {
    if (!isLoading) {
      // getLocationDetails();

      if (!userInfo?._id) {
        router.push("/");
        // dispatch(setUserData({}));
        // alert('you are out')
        // dispatch(logout());
      }
      if (error?.message === "Unauthorized") {
        // dispatch(setUserData({}))
        dispatch(logout());
      }
      // if(userInfo)
      if (!isAuthenticated) {
        router.push("/");
      } else {
        setIsAuth(true);
      }
    }
  }, [
    isAuthenticated,
    router,
    userInfo?._id,
    error,
    error?.message,
    isLoading,
  ]);

  if (!isAuth) {
    return <div>...</div>;
  }

  return (
    <div className="min-h-[100dvh] md:min-h-[100vh] bg-black flex flex-col justify-end ">
      {showHeader && (
        <div className="absolute left-0 right-0 z-50 top-0">
          <IfHeaderIsAuth showNav={showNav} />
        </div>
      )}
      {children}
    </div>
  );
}

export default WithAuth;
