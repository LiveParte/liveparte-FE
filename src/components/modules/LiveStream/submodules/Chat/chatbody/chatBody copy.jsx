import React from "react";
import { ChatList } from "../../chatsubmodules/chatList";

export default function ChatBody({
  data = [],
  setShowComment,
  showComment,
  chatBoxRef,
}) {
  return (
    showComment && (
      <div className="backdrop-blur-[8px] bg-black/30 rounded-[8px] overflow-hidden h-full">
        <div className=" lg:block text-[11px] text-[#FFFFFF] backdrop-blur-xl bg-black/10 font500 text-end py-[7px]  px-[16px] ">
          <div
            className="cursor-pointer inline"
            onClick={() => setShowComment && setShowComment(false)}
          >
            Hide comments
          </div>
        </div>
        <div
          className={`flex flex-col pb-[21px]   overflow-hidden  customScrollHorizontal ${
            showComment && " overflow-y-auto lg:overflow-auto "
          }    max-h-[57vh] h-full `}
        >
          {showComment && (
            <>
              <div
                ref={chatBoxRef ? chatBoxRef : {}}
                className="flex flex-col pt-[10px] px-[14px] lg:overflow-y-auto customScrollHorizontal "
              >
                {data.map((item, i) => (
                  <ChatList
                    key={i}
                    message={item?.message}
                    userName={item?.name}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    )
  );
}
