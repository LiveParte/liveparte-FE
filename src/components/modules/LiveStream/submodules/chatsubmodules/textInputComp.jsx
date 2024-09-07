import DropdownButton from "@/components/Ui/DropDown";
import {
  ChatIcon,
  SendButton,
  SmileyFaceIcon,
} from "../../../../../../public/svg";
import Image from "next/image";
import { formatMoney } from "@/utils/formatMoney";

export const TextInputComp = ({
  textMessages,
  handleOnChange,
  options,
  messageRef,
  setPayFlow,
  userCoinsBalance,
  handleSendChat
}) => {

  console.log(textMessages,'liveStreamDetail1')
  return (
    <div className="z-20 flex items-center flex-1 gap-[16px] mx-[10px] lg:mx-0 ">
      <div className="z-20 flex flex-1 items-center gap-[8px] border-[1px] py-[4px] border-[#343F4B] lg:mb-[13px] bg-[#27292E] rounded-[8px] h-[35px] pr-[4px]">
        <input
          className=" lg:h-[35px] bg-transparent w-[23px] border-[#343F4B] flex-1 placeholder:text-[#495969] placeholder:text-[11px] pl-[10px] text-white outline-none text-[11px]"
          // placeholder="Comment is disabled for this event..."
          placeholder="Comment here..."
          value={textMessages}
          onChange={handleOnChange}
          // autoFocus={false}
          // disabled
          // onKeyDown={(e) => e.key === 'Enter' && handleOnChange()}
        />
        <span className="hidden md:block">
          <DropdownButton
            position={"top"}
            label={<SmileyFaceIcon />}
            options={options}
          >
            <div className="inline-block">
              <div className="flex items-center justify-between rounded-[8px] bg-[#060809B2] gap-3 min-w-[110px] w-full border-[#343F4B] border-[1px] p-[10px] ">
                <Image
                  src={`/svg/reaction1.svg`}
                  width={32}
                  height={32}
                  alt="reaction1"
                />
                <Image
                  src={`/svg/reaction2.svg`}
                  width={32}
                  height={32}
                  alt="reaction2"
                />
                <Image
                  src={`/svg/reaction3.svg`}
                  width={32}
                  height={32}
                  alt="reaction3"
                />
              </div>
            </div>
          </DropdownButton>
        </span>
        <div
          ref={messageRef}
          className={`bg-white absolute  bottom-[70px] right-[9px] text-[11px] font-normal leading-[15px] px-[13px] py-[11px] rounded-[6px] animate-bounce duration-5000 delay-4000 ${userCoinsBalance>0 &&'hidden'}`}
          style={{ display: "none" }}
        >
          <div className="relative">
            Click here to send your
            <br /> fav some coins
            <div className="absolute -bottom-[18px] right-0">
              <ChatIcon />
            </div>
          </div>
        </div>
        {textMessages?.length > 0 ? (
          <div className=" ">
            <button
              onClick={handleSendChat}
              className={`!h-[27px] rounded-[8px] !bg-[#FA4354] !w-[43px] hidden lg:flex justify-center items-center`}
            >
              <SendButton />
            </button>
          </div>
        ) : null}
      </div>
      {/*  */}
      <div
        onClick={() => setPayFlow("giftCoins")}
        className="lg:hidden text-white flex gap-[8px] items-center  element rounded-[96px] bg-[#BACFF70A] p-[4px] pr-[27px]"
      >
        {/* {payFlow && <GiftCoin />} */}
        <Image
          src={`/svg/Liveparte coin.svg`}
          width={24}
          height={24}
          alt="coins"
        />
        <div className="text-[10px] font500 leading-none pt-1 ">
          {formatMoney(userCoinsBalance || "0", false)}{" "} Coins
        </div>
      </div>
    </div>
  );
};
