import Image from "next/image";
import React from "react";
import union from "../../../../public/images/young-man.png";
import oletter from "../../../../public/svgs/o.svg";
import os from "../../../../public/svgs/os.svg";
import of from "../../../../public/svgs/of.svg";
import oc from "../../../../public/svgs/oc.svg";
import coc from "../../../../public/svgs/coc.svg";
import Link from "next/link";
// import hjhf from '../../../../'
export default function MakePossible() {
  return (
    <div>
    <div className="mt-28 lg:w-[75%] w-[95%] mx-auto">
      <h1 className="text-center lg:text-[122px] font-mdtest text-[38.92px] flex items-center justify-center lg:leading-[122px] leading-[38.92px] font-bold tracking-[0.48px] whitespace-nowrap">
        MADE F
        <Image
          className="lg:w-[89px] lg:h-[91px] w-[28.39px] h-[29.02px] rounded-full"
          src={oletter}
          alt="liveparte"
        />
        R Y
        <Image
          className="lg:w-[89px] lg:h-[91px] w-[28.39px] h-[29.02px]"
          src={os}
          alt="liveparte"
        />
        U ❤️
      </h1>
      <p className="text-white lg:text-[80px] text-[25.52px] lg:leading-[80px] leading-[25.52px] text-[#B4BECB] text-center tracking-[0.48px] font-bold font-mdtest">
        We are making it possible for you to watch your fav
        <Image
          className="inline-block align-middle lg:w-[45px] lg:h-[45px] w-[14.35px] h-[14.35px]"
          src={of}
          alt="liveparte"
        />
        urite events, <br /> c
        <Image
          className="inline-block align-middle lg:w-[45px] lg:h-[45px] w-[14.35px] h-[14.35px]"
          src={oc}
          alt="liveparte"
        />
        nnect with your fav
        <Image
          className="inline-block align-middle lg:w-[45px] lg:h-[45px] w-[14.35px] h-[14.35px]"
          src={coc}
          alt="liveparte"
        />
        rite artiste and chat with friends.
      </p>
    </div>
    <div className="relative lg:w-[85%] w-[90%] mx-auto mt-28">
      <div className="w-full h-full relative lg:bg-[#060809] bg-grey.300 lg:p-0 p-4 rounded-[30px]">
        <svg
          className="w-full lg:block hidden h-full"
          viewBox="0 0 1200 490"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M668.618 29C668.618 12.9837 655.635 0 639.618 0H50C22.3858 0 0 22.3858 0 50V440C0 467.614 22.3858 490 50 490H652H668.618H1150C1177.61 490 1200 467.614 1200 440V108C1200 80.3858 1177.61 58 1150 58H697.618C681.602 58 668.618 45.0163 668.618 29Z"
            fill="#1B1C20"
          />
        </svg>
        <div className="lg:absolute lg:top-1.5 w-full lg:flex gap-5">
          <div className="lg:w-[56%] w-full lg:p-8">
            <Image
              className="w-full lg:h-[426px] h-[340px] bg-cover object-cover rounded-[25px]"
              src={union}
              alt=""
            />
          </div>
          <div className="lg:w-[40%] mt-2 ml-2">
            <div className="flex justify-end w-full">
              <div className="lg:bg-none bg-[#060809] lg:h-10 rounded-r-[50px] w-full" />
            </div>
            <div className="lg:pb-8 pb-3 pr-3">
              <h1 className="font-mdtest lg:text-[62px] lg:leading-[62px] leading-[32px] text-[32px] lg:mt-10 mt-4 font-bold tracking-[0.48px] uppercase">
                FOR Entertainers
              </h1>
              <p className="lg:text-base text-[13px] lg:leading-[19.2px] leading-[15.6px] tracking-[-0.12px] text-[#B4BECB] lg:mt-3 mt-2">
                Liveparte empowers artists and entertainers to reach more
                fans, create unique experiences, expand revenue, and
                unlock fan engagement through live events.
              </p>
              <div className="grid lg:grid-cols-1 grid-cols-2">
                <div className="flex items-center mt-5 gap-2">
                  <div className="bg-red.200 w-[24px] rounded-full h-[24px] flex justify-center items-center">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6 1.5C3.51472 1.5 1.5 3.51472 1.5 6C1.5 8.48528 3.51472 10.5 6 10.5C8.48528 10.5 10.5 8.48528 10.5 6C10.5 3.51472 8.48528 1.5 6 1.5ZM0.5 6C0.5 2.96243 2.96243 0.5 6 0.5C9.03757 0.5 11.5 2.96243 11.5 6C11.5 9.03757 9.03757 11.5 6 11.5C2.96243 11.5 0.5 9.03757 0.5 6ZM3.99994 4.87171C3.99994 4.11413 4.61407 3.5 5.37165 3.5H5.49994V3.25C5.49994 2.97386 5.7238 2.75 5.99994 2.75C6.27608 2.75 6.49994 2.97386 6.49994 3.25V3.5C7.32837 3.5 7.99994 4.17157 7.99994 5C7.99994 5.27614 7.77608 5.5 7.49994 5.5C7.2238 5.5 6.99994 5.27614 6.99994 5C6.99994 4.72386 6.77608 4.5 6.49994 4.5V5.63962L7.062 5.82697C7.62213 6.01368 7.99994 6.53787 7.99994 7.12829C7.99994 7.88587 7.3858 8.5 6.62823 8.5H6.49994V8.75C6.49994 9.02614 6.27608 9.25 5.99994 9.25C5.7238 9.25 5.49994 9.02614 5.49994 8.75V8.5C4.67151 8.5 3.99994 7.82843 3.99994 7C3.99994 6.72386 4.2238 6.5 4.49994 6.5C4.77608 6.5 4.99994 6.72386 4.99994 7C4.99994 7.27614 5.2238 7.5 5.49994 7.5V6.36038L4.93787 6.17303C4.37775 5.98632 3.99994 5.46213 3.99994 4.87171ZM5.49994 5.30629V4.5H5.37165C5.16636 4.5 4.99994 4.66642 4.99994 4.87171C4.99994 5.0317 5.10232 5.17375 5.2541 5.22434L5.49994 5.30629ZM6.49994 6.69371V7.5H6.62823C6.83352 7.5 6.99994 7.33358 6.99994 7.12829C6.99994 6.9683 6.89756 6.82625 6.74577 6.77566L6.49994 6.69371Z"
                        fill="#F7F8F8"
                      />
                    </svg>
                  </div>
                  <p className="text-grey.200 lg:text-base text-[13px] lg:leading-[19.2px] leading-[15.6px] tracking-[-0.12px] font-mattersq">
                    Set your own price
                  </p>
                </div>
                <div className="flex items-center mt-5 gap-2">
                  <div className="bg-red.200 w-[24px] rounded-full h-[24px] flex justify-center items-center">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.6 7.00002C8.7385 7.00002 8.80775 7.00002 8.86388 7.03078C8.91018 7.05615 8.95327 7.10378 8.97389 7.15238C8.99889 7.2113 8.9926 7.27399 8.98002 7.39937C8.9148 8.0494 8.69108 8.67574 8.32588 9.22231C7.88635 9.8801 7.26164 10.3928 6.53074 10.6955C5.79983 10.9983 4.99556 11.0775 4.21964 10.9232C3.44372 10.7688 2.73098 10.3879 2.17157 9.82845C1.61216 9.26904 1.2312 8.55631 1.07686 7.78039C0.92252 7.00446 1.00173 6.20019 1.30448 5.46929C1.60723 4.73839 2.11992 4.11367 2.77772 3.67415C3.32428 3.30895 3.95063 3.08523 4.60065 3.02001C4.72603 3.00743 4.78872 3.00114 4.84764 3.02613C4.89624 3.04675 4.94388 3.08985 4.96925 3.13615C5 3.19228 5 3.26153 5 3.40002V6.60002C5 6.74004 5 6.81004 5.02725 6.86352C5.05122 6.91056 5.08946 6.94881 5.1365 6.97278C5.18998 7.00002 5.25999 7.00002 5.4 7.00002H8.6Z"
                        stroke="#F7F8F8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M7 1.40002C7 1.26152 7 1.19227 7.03075 1.13614C7.05612 1.08984 7.10376 1.04675 7.15236 1.02613C7.21127 1.00113 7.27397 1.00742 7.39935 1.02C8.31355 1.1117 9.17301 1.51617 9.82843 2.1716C10.4839 2.82702 10.8883 3.68647 10.98 4.60067C10.9926 4.72606 10.9989 4.78875 10.9739 4.84767C10.9533 4.89627 10.9102 4.9439 10.8639 4.96927C10.8078 5.00002 10.7385 5.00002 10.6 5.00002L7.4 5.00002C7.25999 5.00002 7.18998 5.00002 7.1365 4.97278C7.08946 4.94881 7.05122 4.91056 7.02725 4.86352C7 4.81004 7 4.74004 7 4.60002V1.40002Z"
                        stroke="#F7F8F8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="text-grey.200 lg:text-base text-[13px] lg:leading-[19.2px] leading-[15.6px] tracking-[-0.12px] font-mattersq">
                    Own your fan data
                  </p>
                </div>
                <div className="flex items-center mt-5 gap-2">
                  <div className="bg-red.200 w-[24px] rounded-full h-[24px] flex justify-center items-center">
                    <svg
                      width="14"
                      height="12"
                      viewBox="0 0 14 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.12"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5 5C6.10457 5 7 4.10457 7 3C7 1.89543 6.10457 1 5 1C3.89543 1 3 1.89543 3 3C3 4.10457 3.89543 5 5 5ZM3.9 7C2.57452 7 1.5 8.07452 1.5 9.4C1.5 10.2837 2.21634 11 3.1 11H6.9C7.78366 11 8.5 10.2837 8.5 9.4C8.5 8.07452 7.42548 7 6.1 7H3.9Z"
                        fill="#F7F8F8"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M3.75 3C3.75 2.30964 4.30964 1.75 5 1.75C5.69036 1.75 6.25 2.30964 6.25 3C6.25 3.69036 5.69036 4.25 5 4.25C4.30964 4.25 3.75 3.69036 3.75 3ZM5 0.25C3.48122 0.25 2.25 1.48122 2.25 3C2.25 4.51878 3.48122 5.75 5 5.75C6.51878 5.75 7.75 4.51878 7.75 3C7.75 1.48122 6.51878 0.25 5 0.25ZM8.5 0.25C8.08579 0.25 7.75 0.585786 7.75 1C7.75 1.41421 8.08579 1.75 8.5 1.75C9.19036 1.75 9.75 2.30964 9.75 3C9.75 3.69036 9.19036 4.25 8.5 4.25C8.08579 4.25 7.75 4.58579 7.75 5C7.75 5.41421 8.08579 5.75 8.5 5.75C10.0188 5.75 11.25 4.51878 11.25 3C11.25 1.48122 10.0188 0.25 8.5 0.25ZM0.75 9.4C0.75 7.6603 2.1603 6.25 3.9 6.25H6.1C7.8397 6.25 9.25 7.6603 9.25 9.4C9.25 9.76927 9.16483 10.1186 9.01306 10.4296C9.14409 10.3176 9.31415 10.25 9.5 10.25H10.9C11.3694 10.25 11.75 9.86944 11.75 9.4C11.75 8.48873 11.0113 7.75 10.1 7.75H9.5C9.08579 7.75 8.75 7.41421 8.75 7C8.75 6.58579 9.08579 6.25 9.5 6.25H10.1C11.8397 6.25 13.25 7.6603 13.25 9.4C13.25 10.6979 12.1979 11.75 10.9 11.75H9.5C9.08579 11.75 8.75 11.4142 8.75 11C8.75 10.9386 8.75739 10.8789 8.77132 10.8217C8.34207 11.3858 7.66357 11.75 6.9 11.75H3.1C1.80213 11.75 0.75 10.6979 0.75 9.4ZM3.9 7.75C2.98873 7.75 2.25 8.48873 2.25 9.4C2.25 9.86944 2.63056 10.25 3.1 10.25H6.9C7.36944 10.25 7.75 9.86944 7.75 9.4C7.75 8.48873 7.01127 7.75 6.1 7.75H3.9Z"
                        fill="#F7F8F8"
                      />
                    </svg>
                  </div>
                  <p className="text-grey.200 lg:text-base text-[13px] lg:leading-[19.2px] leading-[15.6px] tracking-[-0.12px] font-mattersq">
                    Engage with fans
                  </p>
                </div>
              </div>
              <Link target='_blank' href={'https://studio-staging.liveparte.com/signup'} className="text-black.100 text-[13px] lg:w-[160.29px] w-full bg-white.200 lg:mt-12 mt-8 h-[44px] rounded-[8px] font-mattersq font-medium tracking-[-0.12px] underline">
                Go Live
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
