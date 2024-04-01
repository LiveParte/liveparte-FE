import { NoImageUser, storage } from "@/utils/helper";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { selectCurrentUserData } from "@/store/User";
import {  useSelector,useDispatch } from 'react-redux';
import { Avatar3 } from "../../../public/svg/avatars";



export default function UserProfile({onClick}) {
  const checkIfNonImageExist = storage.localStorage.get("noUserProfileImage");
  const [userProfile,setUserProfile]=useState();
  const user =useSelector(selectCurrentUserData);
  useEffect(() => {
    setUserProfile(NoImageUser[checkIfNonImageExist?.nonProfileImage]||Avatar3)
  }, [checkIfNonImageExist?.nonProfileImage])
  
  // console.log(userProfile,NoImageUser[checkIfNonImageExist?.nonProfileImage],'user')
  return (
    <div onClick={onClick}>
        {userProfile}
    </div>
  );
}
