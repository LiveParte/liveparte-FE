import NoAuth from "@/components/Layout/NoAuth";
import Hero from "@/components/modules/Home/Hero";
import Happening from "@/components/modules/Home/Happening";
import Footer from "@/components/Common/Footer";
import { useRouter } from "next/router";
import MyModal from "@/components/Ui/Modal";
import { useState } from "react";
import LoginSignUp from "@/components/modules/Home/Modal/Login&SignUp";

export default function Home() {
  const router = useRouter();
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <NoAuth>
      <MyModal
        bodyComponent={<LoginSignUp closeModal={closeModal} />}
        containerStyle={`bg-[#1B1C20] border-[1px] border-[#343F4B] rounded-[16px]  !w-[586px]`}
        isOpen={isOpen}
        closeModal={closeModal}
        openModal={openModal}
      />
      <Hero openModal={openModal} router={router} notEvent={true} />
      <Happening />
      <Footer />
    </NoAuth>
  );
}
