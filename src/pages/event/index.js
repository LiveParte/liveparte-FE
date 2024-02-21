import NoAuth from "@/components/Layout/NoAuth";
import Hero from "@/components/modules/Event/Hero";
import Happening from "@/components/modules/Event/Happening";
import Footer from "@/components/Common/Footer";
import { useRouter } from "next/router";
import MyModal from "@/components/Ui/Modal";
import { useState } from "react";
import LoginSignUp from "@/components/modules/Event/Modal/Login&SignUp";

export default function Home() {
  const router = useRouter();
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen();
  }

  function openModal(pageName) {
    setIsOpen(pageName);
  }

  const modalPage =[
    {
      name:'Login',
      component:<LoginSignUp className={`min-h-[75vh] tallT:min-h-[65vh]`} closeModal={closeModal} />
    },
    {
      name:'SignUp',
      component:<LoginSignUp className={`xl:min-h-[75vh] tallT:min-h-[65vh]`} pageName="signUp" closeModal={closeModal} />
    },
  ]

  return (
    <NoAuth>
      <MyModal
        bodyComponent={modalPage?.find((item)=>item?.name===isOpen)?.component}
        containerStyle={`!bg-[#1B1C20]  border-[1px] border-[#343F4B] rounded-[16px]  !w-[586px] min-h-[75vh] tallT:min-h-[65vh]`}
        isOpen={isOpen?true:false}
        closeModal={closeModal}
        openModal={openModal}
      />
      <Hero openModal={openModal} router={router} notEvent={true} />
      <Happening />
      <Footer />
    </NoAuth>
  );
}
