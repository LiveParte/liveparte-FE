import { NoImageUser, storage } from "@/utils/helper";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { selectCurrentUserData } from "@/store/User";
import {  useSelector,useDispatch } from 'react-redux';
import { Avatar3 } from "../../../public/svg/avatars";
import Image from 'next/image';


export default function UserProfile({onClick}) {
  const checkIfNonImageExist = storage.localStorage.get("noUserProfileImage");
  const UserLiveParte = storage.localStorage.get("UserLiveParte");
  // 
  const [userProfile,setUserProfile]=useState();
  const user =useSelector(selectCurrentUserData);
  useEffect(() => {
    setUserProfile(NoImageUser[checkIfNonImageExist?.nonProfileImage]||Avatar3)
  }, [checkIfNonImageExist?.nonProfileImage])
  
  // console.log(UserLiveParte,'user')
  return (
    <div onClick={onClick}>
     {UserLiveParte?.profile_image? <Image src={UserLiveParte?.profile_image} width={40} height={40} className="object-cover"/>:
        userProfile}
    </div>
  );
}
