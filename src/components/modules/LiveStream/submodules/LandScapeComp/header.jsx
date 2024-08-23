import LogoImage2 from "@/utils/LogoImage";
import Image from "next/image";
import React from "react";
import {
  ExitFullScreenIcon,
  ThreeDotSmall,
} from "../../../../../../public/svg";
import DropDown from "@/components/Ui/DropDown";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { setMobileSize } from "@/store/settings";
import { useDispatch } from "react-redux";

export default function Header({ ShareAndGiftDropdown, unlockOrientation }) {
  const dispatch = useDispatch();
  return (
    <div className="lg:hidden left-0 right-0 pt-[10px] top-[0px] pb-[10px] px-[56px] z-50 text-white absolute     ">
      <div className="absolute  left-0 right-0 px-[16px]  top-0 py-[17px] flex justify-between text-white z-0 bg-gradient-to-b h-[50px] items-start from-black lg:rounded-[16px]"></div>

      <div className="flex justify-between items-center  relative z-30">
        <div className="flex items-center gap-[20px] z-0">
          <Image
            // onClick={handleRoute}
            src="/svg/logoBeta.svg"
            width={136}
            height={16}
            alt="Picture of the author"
            className=" cursor-pointer"
            // style={{ width: "20vw" }}
            // fill
          />

          <div className="flex justify-center items-center gap-[8px]  text-[13px] text-white font500">
            <div className="h-[8px] w-[8px] rounded-full bg-[#FA4354]"></div>
            <span className="mt-[3px]">Live</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="flex gap-[8px] items-center leading-none z-30"
            onClick={() => dispatch(setMobileSize("mobile"))}
          >
            <ExitFullScreenIcon />
            <div className="text-[10px] font500 text-white leading-none">
              Normal view
            </div>
          </div>
          <div className="z-50">
            <DropdownButton
              id="dropdown-basic-button"
              title={
                <div className="#333D474D">
                  <ThreeDotSmall />
                </div>
              }
            >
              <Dropdown.Item href="#/action-1">
                {/* {ShareAndGiftDropdown()} */}
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      </div>
    </div>
  );
}
