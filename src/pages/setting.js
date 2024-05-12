import AuthHeader from "@/components/Common/Header/AuthHeader";
import Footer from "@/components/Common/Footer";
import WithAuth from "@/components/Layout/WithAuth";
import Header from "@/components/modules/MyShow/Header";
// import SettingForm from "@/components/modules/Setting/form";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import IfHeaderIsAuth from "@/components/Common/Header/IfHeaderIsAuth";

const SettingForm = dynamic(() => import("@/components/modules/Setting/form"), {
  ssr: false,
});

export default function Setting() {
  const HeaderData = [
    {
      name: "Profile",
    },
    {
      name: "Security",
    },
    // {
    //   name: "Past",
    // },
  ];

  const [isActive, setIsActive] = useState(HeaderData[0]?.name);
 
  const [imageUrl, setImageUrl] = useState(null);

  const scrollToBottom = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

 

  return (
    <WithAuth>
      <div className="bg-[#060809] min-h-[100vh]  flex flex-col  relative">
        <IfHeaderIsAuth showNav />
        <Header
          Data={HeaderData}
          isActive={isActive}
          setIsActive={setIsActive}
          title="Settings"
          containerStyle={`!mb-[40px]`}
        />
        {/* <Form/> */}
        <div
          className={`${isActive === "Profile" ? "mb-[150px]" : "mb-[150px]"}`}
        >
          <SettingForm
            // isImageUrlLoading={isLoading}
            imageUrl={imageUrl}
            // CloudinaryUpload={CloudinaryUpload}
            isActive={isActive}
            setImageUrl={setImageUrl}
          />
        </div>
        <div className="absolute left-0 right-0 bottom-0">
          <Footer />
        </div>
      </div>
    </WithAuth>
  );
}
