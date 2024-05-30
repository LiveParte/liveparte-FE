import ButtonComp from "@/components/Ui/button";
import React, { memo, useEffect, useRef, useState } from "react";
import Image from "next/image";
import GiftingCoins from "./giftingCoins";
import PurchasePaartyCoins from "./PurchasePaartyCoins";
import {
  ChatIcon,
  CommentIcon,
  LiveParteCoins,
  LiveParteCoinsII,
  SendButton,
  SmileyFaceIcon,
} from "../../../../../public/svg";
import { formatMoney } from "@/utils/formatMoney";
import { useSelector } from "react-redux";
import { selectCoins } from "@/store/User";
import DropdownButton from "@/components/Ui/DropDown";

 function Chat({ onLeave, liveStreamDetail, userProfileData }) {
  const userCoinsBalance = useSelector(selectCoins);
  const chatBoxRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [textMessages, setTextMessages] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      name: "Bola",
      message: "Please Wait for me to join",
    },
    {
      name: "Bola",
      message: "Please Wait for me to join",
    },
    {
      name: "Bola",
      message: "Please Wait for me to join",
    },
    {
      name: "Bola",
      message: "Please Wait for me to join",
    },
    {
      name: "Bola",
      message: "Please Wait for me to join",
    },
    {
      name: "Bola",
      message: "Please Wait for me to join",
    },
    {
      name: "Bola",
      message: "Please Wait for me to join",
    },
    {
      name: "Bola",
      message: "Please Wait for me to join",
    },
    {
      name: "Bola",
      message: "Please Wait for me to join",
    },
    {
      name: "Bola",
      message: "Please Wait for me to join",
    },
    {
      name: "Bola",
      message: "Please Wait for me to join",
    },
    {
      name: "Bola",
      message: "Please Wait for me to join",
    },
    {
      name: "Bola",
      message: "Please Wait for me to join",
    },
    {
      name: "Bola",
      message: "Please Wait for me to join",
    },
    {
      name: "Bola",
      message: "Please Wait for me to join",
    },
    {
      name: "Bola",
      message: "Please Wait for me to join",
    },
  ]);

  const messageRef = useRef(null);

  useEffect(() => {
    if (userProfileData?.totalCoin === 0) {
      const showMessage = () => {
        if (messageRef.current) {
          messageRef.current.style.display = 'block';
          setTimeout(() => {
            if (messageRef.current) {
              messageRef.current.style.display = 'block';
            }
          }, 10000); // Hide after 10 seconds
        }
      };

      // Show message immediately if coins are 0
      showMessage();

      // Set interval to show message every 15 minutes
      const intervalId = setInterval(showMessage, 15 * 60 * 1000);

      // Cleanup interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [userProfileData?.totalCoin]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatMessages]);
  
  const [payFlow, setPayFlow] = useState(null);
  const paymentFlow = [
    {
      name: "giftCoins",
      component: (
        <GiftingCoins
          usersCoinsBalance={userProfileData?.totalCoin}
          eventId={liveStreamDetail}
          onNext={() => setPayFlow("purchasePartyCoins")}
          onClose={() => setPayFlow(null)}
          containerStyle={`!w-full`}
        />
      ),
    },
    {
      name: "purchasePartyCoins",
      component: (
        <PurchasePaartyCoins
          onBack={() => setPayFlow("giftCoins")}
          onClose={() => setPayFlow(null)}
          containerStyle={`!w-full`}
        />
      ),
    },
  ];

  const ChatList = ({ message, userName }) => {
    return (
      <div className="pb-[16px] flex items-center gap-[8px]  max-w-[90%] lg:w-full">
        <Image
          src={`/webp/profile.png`}
          width={30}
          height={30}
          className="object-cover h-[30px] w-[30px]"
          alt="profile-image-user"
        />
        <div>
          <div className="text-[#B4BECB] text-[11px] font500 leading-[14px] font500">
            {userName}
          </div>
          <div className="text-[#FFFFFF] text-[10px] leading-[14px] -tracking-[0.12px]  font400">
            {message}
          </div>
        </div>
      </div>
    );
  };

  function handleSendChat() {
    if (textMessages.trim() !== "") {
      const payload = {
        name: "Bola",
        message: textMessages,
      };
      setChatMessages([...chatMessages, payload]);
      // setTextMessages("");
    }
  }

  const GiftCoin = () => {
    return (
      <div className="absolute dropdownIII transform translate-x-1 -translate-y-[20px] w-full lg:w-max  lg:-translate-y-[40px] z-50 bg-black rounded-[16px] overflow-hidden">
        {paymentFlow?.find((item) => item?.name === payFlow)?.component}
      </div>
    );
  };

  const handleOnChange = (e) => {
    setTextMessages(e.target.value);
  };

  const options = [
    { label: "Option 1", href: "#" },
    { label: "Option 2", href: "#" },
    { label: "Option 3", href: "#" },
  ];

  const TextInputComp = () => {
    return (
      <div className="flex items-center flex-1 gap-[16px]">
        <div className="flex flex-1 items-center gap-[8px] border-[1px] py-[4px] border-[#343F4B] lg:mb-[13px] bg-[#27292E] rounded-[8px] h-[35px] pr-[4px]">
          <input
            className=" lg:h-[35px] bg-transparent w-[23px] border-[#343F4B] flex-1 placeholder:text-[#495969] placeholder:text-[11px] pl-[10px] text-white outline-none text-[11px]"
            placeholder="Comment is disabled..."
            value={textMessages}
            onChange={handleOnChange}
            autoFocus={false}
            disabled
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
      className="bg-white absolute bottom-[70px] right-[9px] text-[11px] font-normal leading-[15px] px-[13px] py-[11px] rounded-[6px] animate-bounce duration-5000 delay-4000"
      style={{ display: 'none' }}
    >
      <div className="relative">
        Click here to send your<br /> fav some coins
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
          className="lg:hidden text-white flex flex-col items-center"
        >
          {/* {payFlow && <GiftCoin />} */}
          <Image
            src={`/svg/Liveparte coin.svg`}
            width={24}
            height={24}
            alt="coins"
          />
          <div className="text-[10px]">
            {formatMoney(userProfileData?.totalCoin || "0", false)}
          </div>
        </div>
      </div>
    );
  };

  const SendCoinsComp = () => (
    <div className="relative text-white element rounded-[98px] p-[4px]">
      <div
        className="p-[4px] pr-[10px] rounded-[96px] hidden lg:flex gap-[9px] text-white text-[10px] md:text-[11px] font500 items-center bg-[#BACFF70A] cursor-pointer relative w-fit"
        onClick={() => setPayFlow("giftCoins")}
      >
        <Image
          src={`/svg/Liveparte coin.svg`}
          width={24}
          height={24}
          alt="coins"
        />
        <div>
          {formatMoney(userCoinsBalance || "0", false)}{" "}
          {userCoinsBalance > 1 ? "Coins" : "Coin"}
        </div>
        <div
          className="py-[4px] px-[9px] rounded-[96px] hidden lg:flex gap-[9px] text-white text-[10px] font500 items-center shadow-1 shadow-2 shadow-3 bg-[#BACFF70A] cursor-pointer relative w-fit"
          onClick={() => setPayFlow("giftCoins")}
        >
          <div className=""> Send</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col  lg:px-[0px]   lg:pl-[48px] lg:pr-[80px] h-full lg:h-full  w-full lg:w-[407px] relative overflow-auto bg-gradient-to-l from-black  rounded-sm">
      <div>
        {/* <div className="lg:hidden flex flex-col items-end gap-[16px] pb-[16px] absolute right-[16px] bottom-16">
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
        </div> */}
      </div>
      <div className=" justify-between items-center   py-[7px]  flex lg:hidden border-b-[1px] border-b-[#262C32] px-[16px]">
        <div className="text-white font700">
          <div className="text-[15px] uppercase line-clamp-1" >{liveStreamDetail?.name}</div>
          <h2 className="text-[13px]  ">Chat</h2>
        </div>
       
        <ButtonComp
          onClick={onLeave}
          className="!h-[30px] text-[13px] !bg-[#BAD6F70F] text-white px-[24px] rounded-full font500 border-[1px] border-[#262C32] leading-none items-center py-[10px] "
          btnText="Leave"
        />
      </div>
      {/* bg-gradient-to-r from-[#06080917] to-[#06080903] */}
      <div
        className="flex-1   w-full  overflow-hidden customScrollHorizontal overflow-y-auto  relative px-[16px]"
        ref={chatBoxRef}
      >
         <div className="flex-grow-1 flex flex-col justify-center items-center h-full w-full lg:mt-10">
            <div className="mb-[17px]">
              <CommentIcon />
            </div>
            <div className=" text-[13px] leading-[20px] text-[#788AA1] px-[33px] font400 text-center">
            Comment section is currently<br/>disabled
            </div>
          </div>
        {/* <div  ref={chatBoxRef} className="flex flex-col lg:h-[90vh] lg:overflow-hidden customScrollHorizontal ">
       
        {chatMessages.map((item, i) => (
          <ChatList key={i} message={item.message} userName={item.name} />
        ))}
         <div className="z-20 mt-[100px]  bg-black flex-[0.4]
        "></div>
        </div> */}
        <div className="z-20 h-[100px]  bottom-24 absolute bg-gradient-to-t from-[#0000000f] to-[#0000000a] left-0 right-0   flex-[0.4]
        "></div>
      </div>
      <div className=" px-[16px]  mb-3 md:mb-0 border-t-[#343F4B] border-t-[1px] lg:border-0 pt-[10px]">
      <div className="relative w-full">
      {payFlow && <GiftCoin />}
      </div>
        <TextInputComp />
        <div className="hidden lg:flex justify-between items-center relative">
       
          <SendCoinsComp />
          <div className="relative hidden lg:flex text-white element rounded-[96px]">
            <div
              className="px-[17px] h-[32px] rounded-[96px] flex gap-[9px] text-white text-[10px] lg:text-[11px] font500 items-center bg-[#BACFF70A] cursor-pointer relative w-fit"
              onClick={() => setPayFlow("purchasePartyCoins")}
            >
              <div>Add Coins</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Chat);