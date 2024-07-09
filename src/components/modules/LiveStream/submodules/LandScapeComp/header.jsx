import LogoImage2 from "@/utils/LogoImage";
import Image from "next/image";
import React from "react";
import {
  ExitFullScreenIcon,
  ThreeDotSmall,
} from "../../../../../../public/svg";
import DropDown from "@/components/Ui/DropDown";
import { Dropdown, DropdownButton } from "react-bootstrap";

export default function Header() {
  return (
    <div className="absolute top-2 left-0 right-0 z-30  py-[21px] px-[56px] md:hidden">
      <div className="flex justify-between items-center ">
        <div className="absolute  left-0 right-0 px-[16px] lg:px-[18px] top-0 py-[17px] flex justify-between text-white z-30 bg-gradient-to-b h-[50px] items-start from-black lg:rounded-[16px]"></div>
        <div className="flex items-center gap-[20px]">
          <Image
            // onClick={handleRoute}
            src="/svg/logoBeta.svg"
            width={136}
            height={16}
            alt="Picture of the author"
            className="md:hidden cursor-pointer"
            // style={{ width: "20vw" }}
            // fill
          />

          <div className="flex justify-center items-center gap-[8px]  text-[13px] text-white font500">
            <div className="h-[8px] w-[8px] rounded-full bg-[#FA4354]"></div>
            <span className="mt-[3px]">Live</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex gap-[8px] items-center leading-none">
            <ExitFullScreenIcon />
            <div className="text-[10px] font500 text-white leading-none">
              Normal view
            </div>
          </div>
          <DropdownButton
            id="dropdown-basic-button"
            title={
              <div className="#333D474D">
                <ThreeDotSmall />
              </div>
            }
          >
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </div>
  );
}
