import { NoImageUser, storage } from "@/utils/helper";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { selectCurrentUserData } from "@/store/User";
import { useSelector, useDispatch } from "react-redux";
import { Avatar3 } from "../../../public/svg/avatars";
import Image from "next/image";

export default function UserProfile({ onClick }) {
  const checkIfNonImageExist = storage.localStorage.get("noUserProfileImage");
  const UserLiveParte = storage.localStorage.get("UserLiveParte");
  const [userProfilePic,setUserProfilePic]=useState();
  //
  const [userProfile, setUserProfile] = useState();
  const user = useSelector(selectCurrentUserData);
  useEffect(() => {
    setUserProfile(
      NoImageUser[checkIfNonImageExist?.nonProfileImage] || Avatar3
    );
  }, [checkIfNonImageExist?.nonProfileImage]);

 useEffect(() => {
  setUserProfilePic(UserLiveParte?.profile_image)
 }, [UserLiveParte?.profile_image])
 
  console.log(UserLiveParte,'UserLiveParte?.profile_image')
  return (
    <div onClick={onClick}>
      {userProfilePic ? (
        <Image
          src={userProfilePic}
          width={40}
          height={40}
          className="object-cover rounded-full h-[40px] w-[40px]"
        />
      ) : (
        userProfile
      )}
    </div>
  );
}
