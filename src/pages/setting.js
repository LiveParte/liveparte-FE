import AuthHeader from "@/components/Common/AuthHeader";
import Footer from "@/components/Common/Footer";
import Header from "@/components/modules/MyShow/Header";
import SettingForm from "@/components/modules/Setting/form";
import React, { useState } from "react";

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

  return (
    <div className="bg-[#060809] min-h-[100vh]  flex flex-col  relative">
      <AuthHeader showNav />
      <Header
        Data={HeaderData}
        isActive={isActive}
        setIsActive={setIsActive}
        title="Settings"
        containerStyle={`!mb-[40px]`}
      />
      {/* <Form/> */}
      <div className={`${isActive==="Profile"?'mb-[150px]':'mb-[200px]'}`}>
      <SettingForm  isActive={isActive}/>
      </div>
      <div className="absolute left-0 right-0 bottom-0">
      <Footer />
      </div>
    </div>
  );
}
