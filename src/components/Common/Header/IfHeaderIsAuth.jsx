import React from "react";
import { useSelector } from "react-redux";
import Header from "../Header";
import AuthHeader from "../AuthHeader";
import { selectCurrentUserData } from "@/store/User";

export default function IfHeaderIsAuth({ openModalLoginSignUp, openModal }) {
  const user = useSelector(selectCurrentUserData);
  return user?._id ? (
    <AuthHeader showNav={true} />
   
  ) : (
    <Header
    openModal={openModalLoginSignUp || openModal}
    className="absolute top-0 left-0 right-0"
  />
  );
}
