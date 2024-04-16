import { NoImageUser, storage } from "@/utils/helper";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { selectCurrentUserData } from "@/store/User";
import { useSelector, useDispatch } from "react-redux";
import { Avatar3 } from "../../../public/svg/avatars";
import Image from "next/image";
import { useGetUserProfileQuery } from "@/store/User/userApi";

export default function UserProfile({ onClick }) {
  const checkIfNonImageExist = storage.localStorage.get("noUserProfileImage");
  // const UserLiveParte = storage.localStorage.get("UserLiveParte");
  const [userProfilePic, setUserProfilePic] = useState();
  const { data, isLoading, isError } = useGetUserProfileQuery();

  console.log(data?.profile_image, "datadata");

  //
  const [userProfile, setUserProfile] = useState();
  const UserLiveParte = useSelector(selectCurrentUserData);
  useEffect(() => {
    if(UserLiveParte?.profile_image){
      return setUserProfilePic(UserLiveParte?.profile_image);
    }
    setUserProfile(
      NoImageUser[checkIfNonImageExist?.nonProfileImage] || Avatar3
    );
  }, [checkIfNonImageExist?.nonProfileImage,UserLiveParte?.profile_image]);


  // console.log(UserLiveParte,data, "UserLiveParte?.profile_image");
  return (
    <div onClick={onClick}>
      {data?.profile_image ? (
        <Image
          src={data?.profile_image || userProfilePic}
          width={40}
          height={40}
          className="object-cover rounded-full h-[40px] w-[40px]"
          alt="profile-image"
        />
      ) : (
        userProfile
      )}
    </div>
  );
}
