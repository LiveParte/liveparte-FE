import AuthHeader from "@/components/Common/AuthHeader";
import Footer from "@/components/Common/Footer";
import WithAuth from "@/components/Layout/WithAuth";
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

  const CloudinaryUpload = photo => {
    const data = new FormData();
    console.log(photo, 'photophoto');
    data.append('file', photo);
    data.append('upload_preset', 'ohxuujig');
    data.append('cloud_name', 'dammymoses');
    fetch('https://api.cloudinary.com/v1_1/dammymoses/image/upload', {
      method: 'post',
      body: data,
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.secure_url);
        // const payload = {
        //   profileUrl: data.secure_url,
        // };
        // updateProfileImage.mutate(payload);
      })
      .catch(err => {
        console.log('An Error Occured While Uploading', err);
      });
  };


  return (
    <WithAuth>
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
      <div 
      className={`${isActive==="Profile"?'mb-[150px]':'mb-[150px]'}`}
      >
      <SettingForm  CloudinaryUpload={CloudinaryUpload} isActive={isActive}/>
      </div>
      <div className="absolute left-0 right-0 bottom-0">
      <Footer />
      </div>
    </div>
    </WithAuth>
  );
}
