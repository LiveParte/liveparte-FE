import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import AuthHeader from "./AuthHeader";
import { selectCurrentUserData } from "@/store/User";
import LoginSignUp from "@/components/modules/Event/Modal/Login&SignUp";
import ForgetPassword from "@/components/modules/Event/Modal/submodules/ForgetPassword/ForgetPassword";
import MyModal from "@/components/Ui/Modal";
import { useRouter } from "next/router";

export default function IfHeaderIsAuth({ openModalLoginSignUp }) {
  const [userDetail, setUserDetail] = useState(false);
  const router = useRouter();
  const user = useSelector(selectCurrentUserData) || {};
  let [isOpen, setIsOpen] = useState();
  const { token } = router.query;
 
  useEffect(() => {
    setUserDetail(user?._id);
  }, [user?._id]);

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
   {/* {isRoute && 
   <div className="absolute right-3 z-[999px] top-3">
    <div
          className="inline-block h-10 w-10 animate-spin rounded-full border-3 border-solid border-[#fff] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
    </div>
} */}
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
        <AuthHeader showNav={true} />
      ) : (
        <Header
          openModal={openModal || openModalLoginSignUp}
          className="absolute top-0 left-0 right-0"
        />
      )}
    </div>
  );
}
