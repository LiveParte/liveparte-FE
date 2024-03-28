import { NoImageUser, storage } from "@/utils/helper";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { selectCurrentUserData } from "@/store/User";
import {  useSelector,useDispatch } from 'react-redux';



export default function UserProfile({onClick}) {
  const checkIfNonImageExist = storage.localStorage.get("noUserProfileImage");
  const [userProfile,setUserProfile]=useState();
  const user =useSelector(selectCurrentUserData);
  useEffect(() => {
    setUserProfile(NoImageUser[checkIfNonImageExist?.nonProfileImage])
  }, [checkIfNonImageExist?.nonProfileImage,user])
  
  // console.log(userProfile,NoImageUser[checkIfNonImageExist?.nonProfileImage],'user')
  return (
    <div onClick={onClick}>
        {userProfile}
    </div>
  );
}
