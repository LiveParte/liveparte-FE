import ButtonComp from "@/components/Ui/button";
import React, { useRef, useState } from "react";
import { useCopyToClipboard } from "usehooks-ts";
import {
  CopyEventLink,
  CountdownTimerII,
  SuccessNotification,
} from "@/utils/reusableComponent";
import { useRouter } from "next/router";
import { CloseII } from "../../../../../public/svg";
import { formatMoney } from "@/utils/formatMoney";
import CopyToClipboard from "react-copy-to-clipboard";
import Image from "next/image";

export default function ShareEvent({ closeModal, Data }) {
  const [copiedText, copy] = useCopyToClipboard();
  const router = useRouter();
  const inputRef = useRef(null);
  const { showId } = router?.query;
  const [value, setValue] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const handleAction = () => {
    // router.push('/event_time_out')
  };

  // async function copyTextToClipboard(text) {
  //   if ('clipboard' in navigator) {
  //      await navigator.clipboard.writeText(text);

  //   } else {
  //     return document.execCommand('copy', true, text);
  //   }

  // }

  const handleCopy = (text, result) => {
    if (result) {
      setCopied(true);
      setCopyStatus("Copied successfully!");
      SuccessNotification({ message: "Copied successfully" });
    } else {
      setCopied(false);
      setCopyStatus("Copy failed!");
    }
  };

  return (
    <div className="bg-[#1B1C20] pb-[56px] px-[16px] lg:px-[56px] pt-[16px] lg:pt-[24px]">
      <nav className="flex justify-between items-center mb-[32px]">
        <div className="text-[18px]  text-white">Share event</div>
        <div className="text-[#63768D] text-[18px] flex items-center gap-[12px]">
          {/* <CountdownTimerII initialTime={5} onTimerEnd={handleAction}/> */}
          <div
            className="cursor-pointer absolute right-5 md:right-5"
            onClick={closeModal && closeModal}
          >
            {" "}
            <CloseII />
          </div>
        </div>
      </nav>

      <main>
        <div className="flex items-center gap-[17px]  mb-[54px]">
          <div>
            <Image
              src={Data?.thumbnail_url}
              className="w-[89px] h-[89px] object-cover rounded-[8px]"
              width={89}
              height={89}
              placeholder="blur"
              blurDataURL={Data?.thumbnail_url}
              alt="show-image"
            />
          </div>
          <div>
            <div className="text-[14px] text-white font500 mb-[8px]">
              Timeless tour - Newyork
            </div>
            <div className="text-[#B4BECB] text-[15px] mb-[6px] flex items-center ">
              Apr 24{" "}
              <div className="rounded-full h-[4px] w-[4px] bg-[#D9D9D9] mx-[8px] hidden md:block"></div>{" "}
              O2 Cinema Arena Concert
            </div>
            <div className="text-[14px] text-white font500">
              {Data?.ticket?.code}{" "}
              {formatMoney(Data?.ticket?.price, false || "0")}{" "}
            </div>
          </div>
        </div>

        <div className="flex items-center h-[50px] border-none rounded-[8px] bg-[#222428] border-[#343F4B] border-[1px]">
          <input
            className="flex-1 flex-grow-1 bg-transparent px-[16px] outline-none text-[#63768D] text-[13px] w-full"
            ref={inputRef}
            value={CopyEventLink({ link: showId })}
            disabled
          />

          <div className="mr-[2px]">
            <CopyToClipboard
              text={CopyEventLink({ link: showId })}
              onCopy={handleCopy}
            >
              <ButtonComp
                btnText={`Copy link `}
                className={` text-[13px] font500 h-[34px]`}
              />
            </CopyToClipboard>
          </div>
        </div>
      </main>
    </div>
  );
}
