import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import AuthHeader from "./AuthHeader";
import { selectCurrentUserData } from "@/store/User";
import LoginSignUp from "@/components/modules/Event/Modal/Login&SignUp";
import ForgetPassword from "@/components/modules/Event/Modal/submodules/ForgetPassword/ForgetPassword";
import MyModal from "@/components/Ui/Modal";

export default function IfHeaderIsAuth({ openModalLoginSignUp, }) {
  const [userDetail,setUserDetail]=useState(false)
  const user = useSelector(selectCurrentUserData)||{};
  let [isOpen, setIsOpen] = useState(false);

  // console.log(user,'user')
  useEffect(() => {
    setUserDetail(user?._id)
  }, [user?._id])

  function closeModal() {
    setIsOpen();
  }

  function openModal(pageName) {
    setIsOpen(pageName);
  }

  const modalPage =[
    {
      name:'Login',
      component:<LoginSignUp
      handleForgetPasswordToggle={()=>openModal('ForgetPassword')}
    className={``} closeModal={closeModal} />
    },
    {
      name:'SignUp',
      component:<LoginSignUp className={`xl:min-h-[75vh] tallT:min-h-[65vh]`} pageName="signUp" closeModal={closeModal} />
    },
    {
      name:`ForgetPassword`,
      component:<ForgetPassword closeModal={closeModal} openModal={openModal}/>
    }
  ]
  
  return  <>
    {isOpen && <MyModal
        bodyComponent={modalPage?.find((item)=>item?.name===isOpen)?.component}
        containerStyle={`!bg-[#1B1C20]  border-[1px] border-[#343F4B] rounded-[16px]  !w-[586px]  `}
        isOpen={isOpen?true:false}
        closeModal={()=>isOpen==="ForgetPassword"?openModal("ForgetPassword"):closeModal()}
        openModal={openModal}
      />}
    {userDetail ? 
   

    <AuthHeader showNav={true}  />
   
   : 
    <Header
    openModal={openModal||openModalLoginSignUp }
    className="absolute top-0 left-0 right-0"
  />
    }
  
  </>
}
