import React, { useState } from "react";
import NoAuth from "./NoAuth";
// import Footer from "../Common/Footer";
import { useRouter } from "next/router";
import Footer from "@/pages/entertainers/Footer";
import Image from "next/image";

export default function PrivacyTermsLayout({ children }) {
  const router =useRouter();
  // console.log(router?.pathname,'router')

  return (
    <NoAuth>
      <div className="min-h-[100vh] bg-black  flex flex-col justify-start pb-24">
        <div className="relative">
          <picture>
          <Image
            alt="privacy_img"
            width={0}
            height={0}
            className="w-full h-[300px] lg:h-[381px] object-cover"
            src={"/Image/privacy.webp"}
          />
          </picture>
          <div className=" absolute -bottom-1 left-0 right-0 h-[20vh] lg:h-[50vh]   bg-contain xl:bg-cover !bg-no-repeat bg-gradient-to-t from-black"></div>
        </div>
        <div className="pt-[86px] px-[20px] lg:px-[70px]">
          <div className="flex  gap-[72px]">
            <div className=" w-[180px] hidden lg:flex flex-col items-start">
              <button
                onClick={() => router.push("privacy")}
                className={`px-[12px] py-[13px] w-full text-start  text-[14px]  min-h-[48px] ${
                    router?.pathname === "/privacy"
                    ? "bg-[#22272F] text-white font500 border-l-[2px]"
                    : "text-[#8F96A3]"
                }`}
              >
                Privacy Policy
              </button>
              <button
                onClick={() => router.push("terms")}
                className={`text-[14px] w-full text-start  font400 px-[12px] py-[14px]  min-h-[48px] ${
                    router?.pathname === "/terms"
                    ? "bg-[#22272F] text-white font500 border-l-[2px]"
                    : "text-[#8F96A3]"
                }`}
              >
                Term of Service
              </button>
              <button
                onClick={() => router.push("purchase-policy")}
                className={`text-[14px] w-full text-start  font400 px-[12px] py-[14px]  min-h-[48px] ${
                    router?.pathname === "/purchase-policy"
                    ? "bg-[#22272F] text-white font500 border-l-[2px]"
                    : "text-[#8F96A3]"
                }`}
              >
                Purchase Policy
              </button>
              
            </div>
            <div className="w-full">{children}</div>
          </div>
        </div>
      </div>
      <div className="mb-[70px] md:mb-0">
        <Footer />
      </div>
    </NoAuth>
  );
}
