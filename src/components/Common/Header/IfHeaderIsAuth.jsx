import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import AuthHeader from "./AuthHeader";
import { selectCurrentUserData } from "@/store/User";

export default function IfHeaderIsAuth({ openModalLoginSignUp, openModal }) {
  const [userDetail,setUserDetail]=useState(false)
  const user = useSelector(selectCurrentUserData)||false;

  console.log(user,'user')
  useEffect(() => {
    setUserDetail(user?._id)
  }, [user?._id])
  
  return userDetail ? (
    <AuthHeader showNav={true} />
   
  ) : (
    <Header
    openModal={openModalLoginSignUp || openModal}
    className="absolute top-0 left-0 right-0"
  />
  );
}
