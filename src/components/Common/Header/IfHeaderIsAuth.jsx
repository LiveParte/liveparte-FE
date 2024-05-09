import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import AuthHeader from "./AuthHeader";
import { selectCurrentUserData, setCoins, setUserData } from "@/store/User";
import LoginSignUp from "@/components/modules/Event/Modal/Login&SignUp";
import ForgetPassword from "@/components/modules/Event/Modal/submodules/ForgetPassword/ForgetPassword";
import MyModal from "@/components/Ui/Modal";
import { useRouter } from "next/router";
import { useGetAllCoinsQuery } from "@/store/Transaction/transactionApi";
import { useGetUserProfileQuery, userApi, useUpdateUserLocationMutation } from "@/store/User/userApi";
import { useGetUserLocationQuery } from "@/store/others/othersApi";
import { storage, userDetailStorageName } from "@/utils/helper";

export default function IfHeaderIsAuth({ openModalLoginSignUp }) {
  const [userDetail, setUserDetail] = useState(false);
  const dispatch = useDispatch();
  const userInfo = useSelector(selectCurrentUserData) || {};
  const { data:userProfileData, isLoading:userProfileLoader,refetch } = useGetUserProfileQuery(undefined,{
    skip: !userInfo?._id,
  });
  const {address,state,countryInfo}=userProfileData||userInfo;
  const { data, isLoading: isLoadingCoins } = useGetAllCoinsQuery();
  const [updateUserLocation,{isSuccess:updateUserLocationIsSuccess}]=useUpdateUserLocationMutation();
  const check =!address||!state||!countryInfo?.name;
  const {data:extraDetails,isLoading,isSuccess}=useGetUserLocationQuery({
    skip:true
  });

  const router = useRouter();
  let [isOpen, setIsOpen] = useState();
  const { token } = router.query;


  // console.log(address,state,countryInfo,userProfileData,'Hellocheck')
   useEffect(() => {
    
      if(check&&isSuccess){
      userInfo?._id&&handleUpdateUserLocation(extraDetails)
      }
    
   }, [check, userInfo?._id])
   

  // console.log(userProfileData,check,isSuccess,userInfo,'userProfileData')

  const handleUpdateUserLocation=async(data)=>{
    const payload={
      "country":data?.country_name,
      "state": data?.region,
      "country_code": data?.country_code,
      "currency_code": data?.currency,
      "currency_name": data?.currency_name,
      "address": data?.ip,
      id:userInfo?._id
    }
    const response = await updateUserLocation(payload);
    const UserString = JSON.stringify(response?.data?.updatedUser);
    if(response?.data?.message==="User has been successfully updated"){
     
      if(!address||!state||!countryInfo?.name){
        UserString&&storage.localStorage.set(userDetailStorageName, UserString);
      dispatch(setUserData(response?.data?.updatedUser));
     
      }
    }
    

    // console.log(response,response?.data?.message,'response')
  }



 


  useEffect(() => {
  
    if (data?.coins?.length > 0) {
      dispatch(setCoins(data?.coins));
    }
  }, [isLoadingCoins]);

  useEffect(() => {
    setUserDetail(userInfo?._id);
  }, [userInfo?._id]);

  // console.log(userDetail,user,'user')
  useEffect(() => {
    if (router?.pathname === "/reset-password") {
      openModal("ForgetPassword");
    }
    if (router?.pathname === "/login") {
      openModal("Login");
    }
  }, [router?.pathname]);

  function closeModal() {
    setIsOpen();
  }

  function openModal(pageName) {
    setIsOpen(pageName);
  }

  const modalPage = [
    {
      name: "Login",
      component: (
        <LoginSignUp
          handleForgetPasswordToggle={() => openModal("ForgetPassword")}
          className={``}
          closeModal={closeModal}
        />
      ),
    },
    {
      name: "SignUp",
      component: (
        <LoginSignUp
          className={``}
          pageName="signUp"
          closeModal={closeModal}
          handleForgetPasswordToggle={() => openModal("ForgetPassword")}
        />
      ),
    },
    {
      name: `ForgetPassword`,
      component: (
        <ForgetPassword
          token={token}
          Path={router?.pathname === "/reset-password" ? "EnterPassword" : ""}
          closeModal={() => {
            closeModal();
            router.push("/");
          }}
          openModal={openModal}
        />
      ),
    },
  ];

  return (
    <div className="relative">
     
      {isOpen && (
        <MyModal
          bodyComponent={
            modalPage?.find((item) => item?.name === isOpen)?.component
          }
          containerStyle={`!bg-[#1B1C20]  border-[1px] border-[#343F4B] rounded-[16px]  !w-[447px]  `}
          isOpen={isOpen ? true : false}
          closeModal={() =>
            isOpen === "ForgetPassword"
              ? openModal("ForgetPassword")
              : closeModal()
          }
          openModal={openModal}
        />
      )}
      {userDetail ? (
        <AuthHeader  userInfo={userProfileData||userInfo} showNav={true} />
      ) : (
        <Header
          openModal={openModal || openModalLoginSignUp}
          className="absolute top-0 left-0 right-0"
        />
      )}
    </div>
  );
}
