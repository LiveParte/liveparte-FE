import Image from "next/image";
import React from "react";
import card1 from "../../../../public/images/liveparte-img5.png";
import mastercard from "../../../../public/images/mastercard.png";
import express from "../../../../public/images/express.png";
import visa from "../../../../public/images/visa.png";
import verve from "../../../../public/images/verve.png";
import ebay from "../../../../public/images/ebay.png";
import google from "../../../../public/images/google.png";

const PayAnyhow = () => {
  return (
    <div className=" lg:px-0 px-2 relative  lg:h-auto min-h-[741px] md:w-[60%] lg:w-[80%] w-[90%] mx-auto mt-28">
      <div className="max-w-sm mx-auto p-4 bg-teal-500 rounded-3xl shadow-lg hidden"></div>
    
      {/*  */}
      <div className=" hidden lg:flex    rounded-[30px] ">
        <div className="flex-1 rounded-[30px] bg-[#00A699]">
          <div className="flex-1 p-[56px]  w-[95%]">
            <div className="font-mdtest text-[62px] font-bold  leading-[62px] mb-[30px]">
              PAY ANYHOW  <br className="hidden lg:block"/>YOU WANT IT.
            </div>

            <div className="font-mattersq font-normal  mb-[66px]">
              Liveparte makes it easy to watch your favorite live events and
              artist from anywhere in the world. We support 22 global payment
              methods, over 135 currencies, and flexible payment options in more
              than 150 countries.
            </div>

            <div className="lg:mt-20 mt-8 grid grid-cols-3 gap-3  mr-5">
                <div className="bg-green.300 h-[41px] rounded-[8px] flex justify-center items-center">
                  <Image
                    className="w-[35px] h-[22px]"
                    src={mastercard}
                    alt="mastercard"
                  />
                </div>
                <div className="bg-green.300 h-[41px] rounded-[8px] flex justify-center items-center">
                  <Image
                    className="w-[53px] h-[16px]"
                    src={visa}
                    alt="mastercard"
                  />
                </div>
                <div className="bg-green.300 h-[41px] rounded-[8px] flex justify-center items-center">
                  <Image
                    className="w-[60.52px] h-[16.36px]"
                    src={express}
                    alt="mastercard"
                  />
                </div>
                <div className="bg-green.300 h-[41px] rounded-[8px] flex justify-center items-center">
                  <Image
                    className="w-[53.3px] h-[18.42px]"
                    src={verve}
                    alt="mastercard"
                  />
                </div>
                <div className="bg-green.300 h-[41px] rounded-[8px] flex justify-center items-center">
                  <Image
                    className="w-[47px] h-[20px]"
                    src={ebay}
                    alt="mastercard"
                  />
                </div>
                <div className="bg-green.300 h-[41px] rounded-[8px] flex justify-center items-center">
                  <Image
                    className="w-[53px] h-[21px]"
                    src={google}
                    alt="mastercard"
                  />
                </div>
              </div>
          </div>
        </div>
        <div className="bg-[#00A699] rounded-[30px] w-[100px] relative">
        <div className="bg-[#000] h-[70px] w-[100px] absolute top-[-20px] left-0 right-0 z-20 rounded-[30px]"/>
        <div className="bg-[#000] h-[50px] w-[100px] absolute top-[-40px] left-0 right-0 z-30"/> 
            <div className="bg-[#000] h-[215.29px] w-[100px] absolute bottom-[-20px] left-0 right-0 z-20 rounded-[30px]"/>
            <div className="bg-[#000] h-[50px] w-[100px] absolute bottom-[-40px] left-0 right-0 z-30"/>

        </div>
        <div className="flex-1  rounded-[30px] bg-[#00A699]">
          <div className=" p-[32px] h-full ">
            <Image
            src={'/images/webpay.webp'}
            alt=""
            width={493}
            height={434}
            className="h-full w-full object-cover rounded-[12px]"
            />
          </div>
        </div>
      </div>
{/* mobile */}
      <div className=" !flex-col flex lg:hidden">
        <div className="bg-[#00A699] p-[16px] rounded-[30px]">
        <Image
            src={'/images/webpay.webp'}
            alt=""
            width={311}
            height={281}
            className="h-full w-full object-cover rounded-[12px]"
            />
        </div>
        <div className="bg-[#00A699] h-[80px] w-full relative">
        <div className="bg-[#000] h-[80px] w-[120px] absolute  left-[-40px] right-0 z-20 rounded-[30px]"/>
        <div className="bg-[#000] h-[80px] w-[180px] absolute  right-[-40px] z-20 rounded-[30px]"/>

        {/* <div className="bg-[#000] h-[50px] w-[50px] absolute top-[-40px] left-0 right-0 z-30"/> 

            <div className="bg-[#000] h-[50px] w-[100px] absolute bottom-[-20px] left-0 right-0 z-20 rounded-[30px]"/>

            <div className="bg-[#000] h-[50px] w-[100px] absolute  left-0  z-30"/> */}
        </div>
        <div className="bg-[#00A699] p-[16px] pt-[50px] rounded-[30px]">
        <div className="font-mdtest text-[42px] font-bold  leading-[42px] mb-[14px]">
              PAY ANYHOW  YOU<br className=""/> WANT IT.
            </div>

            <div className="font-mattersq text-[13px] font-normal  mb-[40px]">
              Liveparte makes it easy to watch your favorite live events and
              artist from anywhere in the world. We support 22 global payment
              methods, over 135 currencies, and flexible payment options in more
              than 150 countries.
            </div>

            <div className="lg:mt-20 mt-8 grid grid-cols-3 gap-3  mr-5">
                <div className="bg-green.300 h-[41px] rounded-[8px] flex justify-center items-center">
                  <Image
                    className="w-[35px] h-[22px]"
                    src={mastercard}
                    alt="mastercard"
                  />
                </div>
                <div className="bg-green.300 h-[41px] rounded-[8px] flex justify-center items-center">
                  <Image
                    className="w-[53px] h-[16px]"
                    src={visa}
                    alt="mastercard"
                  />
                </div>
                <div className="bg-green.300 h-[41px] rounded-[8px] flex justify-center items-center">
                  <Image
                    className="w-[60.52px] h-[16.36px]"
                    src={express}
                    alt="mastercard"
                  />
                </div>
                <div className="bg-green.300 h-[41px] rounded-[8px] flex justify-center items-center">
                  <Image
                    className="w-[53.3px] h-[18.42px]"
                    src={verve}
                    alt="mastercard"
                  />
                </div>
                <div className="bg-green.300 h-[41px] rounded-[8px] flex justify-center items-center">
                  <Image
                    className="w-[47px] h-[20px]"
                    src={ebay}
                    alt="mastercard"
                  />
                </div>
                <div className="bg-green.300 h-[41px] rounded-[8px] flex justify-center items-center">
                  <Image
                    className="w-[53px] h-[21px]"
                    src={google}
                    alt="mastercard"
                  />
                </div>
              </div>
        </div>
      </div>
    </div>
  );
};

export default PayAnyhow;
