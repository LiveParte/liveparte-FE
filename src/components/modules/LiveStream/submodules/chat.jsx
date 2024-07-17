import ButtonComp from "@/components/Ui/button";
import React, { memo, useEffect, useRef, useState } from "react";
import GiftingCoins from "./giftingCoins";
import PurchasePaartyCoins from "./PurchasePaartyCoins";
import WebSocket from 'isomorphic-ws';
import { useSelector } from "react-redux";
import { selectCoins } from "@/store/User";
import { TextInputComp } from "./chatsubmodules/textInputComp";
import { SendCoinsComp } from "./chatsubmodules/sendCoins";
import { ChatList } from "./chatsubmodules/chatList";
import useWebSocket, { ReadyState } from "react-use-websocket";

import ChatBody from "./Chat/chatbody/chatBody";
import DropDownBootstrap from "@/components/Ui/DropDownBootsrap";
import Image from "next/image";

function Chat({ onLeave, liveStreamDetail, }) {
  // const [message, setMessage] = useState('');
  const WS_URL = "ws://staging-be.liveparte.com";

  // const ws = new WebSocket("wss://ws.bitstamp.net");
  const [bids, setBids] = useState([0]);

  



  const [showComment, setShowComment] = useState(true);
  const userCoinsBalance = useSelector(selectCoins);
  // alert(userCoinsBalance,'userCoinsBalance')
  const chatBoxRef = useRef(null);
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
    if (userCoinsBalance === 0) {
      const showMessage = () => {
        if (messageRef.current) {
          messageRef.current.style.display = "block";
          setTimeout(() => {
            if (messageRef.current) {
              messageRef.current.style.display = "block";
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
  }, [userCoinsBalance]);

  const handleChatToTheBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };



  const [payFlow, setPayFlow] = useState(null);
  const paymentFlow = [
    {
      name: "giftCoins",
      component: (
        <GiftingCoins
          usersCoinsBalance={userCoinsBalance}
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
      <div className="absolute dropdownIII transform translate-x-1 -translate-y-[20px] w-full mr-2  lg:-translate-y-[40px] z-50 bg-black rounded-[16px] widthFillSpace overflow-hidden">
        {paymentFlow?.find((item) => item?.name === payFlow)?.component}
      </div>
    );
  };

  const handleOnChange = (e) => {
    setTextMessages(e.target.value);
  };

  const [message, setMessage] = useState('');

   
  const options = [
    { label: "Option 1", href: "#" },
    { label: "Option 2", href: "#" },
    { label: "Option 3", href: "#" },
  ];

  return (
    <div className="flex flex-col  lg:px-[0px]   h-full lg:h-full  w-full lg:w-[356px] relative  rounded-sm flex-1 ">
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
          <div className="text-[15px] uppercase line-clamp-1 font-1 font-bold mb-[8px]">
            {liveStreamDetail?.name}
          </div>
          <h2 className="text-[13px]  ">Chat</h2>
        </div>

        <ButtonComp
          onClick={onLeave}
          className="!h-[30px] text-[13px] !bg-[#BAD6F70F] text-white px-[24px] rounded-full font500 border-[1px] border-[#262C32] leading-none items-center py-[10px] "
          btnText="Leave"
        />
      </div>

      <div className="flex flex-col justify-end flex-1 ">
      <div className="flex flex-col justify-end">
        <ChatBody
          chatBoxRef={chatBoxRef}
          setShowComment={setShowComment}
          showComment={showComment}
          data={chatMessages}
        />
        {!showComment && (
          <div className="text-[11px] text-[#FFFFFF] font500 text-end py-[7px] px-[16px]">
            <div
              className="cursor-pointer inline"
              onClick={() => {
                handleChatToTheBottom();
                setShowComment(true);
              }}
            >
              Show comments
            </div>
          </div>
        )}
      </div>
      <div className="px-[4px] lg:px-0 mb-3 md:mb-0 border-t-[#343F4B] border-t-[1px] lg:border-0 pt-[10px]">
        <div className="relative w-full lg:hidden">
          {payFlow && <GiftCoin />}
        </div>
        <TextInputComp
          handleOnChange={handleOnChange}
          messageRef={messageRef}
          options={options}
          setPayFlow={setPayFlow}
          textMessages={textMessages}
          userCoinsBalance={userCoinsBalance}
          handleSendChat={handleSendChat}
        />
        <div className="hidden lg:flex justify-between items-center relative">
          <SendCoinsComp
            setPayFlow={setPayFlow}
            userCoinsBalance={userCoinsBalance}
          />
          {payFlow && <GiftCoin />}
          <div className="relative hidden lg:flex text-white element rounded-[96px]">
            <div
              className="px-[17px] h-[32px] rounded-[96px] flex gap-[9px] text-white text-[10px] lg:text-[11px] font500 items-center bg-[#BACFF70A] cursor-pointer w-fit"
              onClick={() => setPayFlow("purchasePartyCoins")}
            >
              <div>Add Coins</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default memo(Chat);
