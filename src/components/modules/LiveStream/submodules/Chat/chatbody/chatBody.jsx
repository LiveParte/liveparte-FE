import React from "react";
import { ChatList } from "../../chatsubmodules/chatList";
import { CommentIcon } from "../../../../../../../public/svg";

export default function ChatBody({
  data = [],
  setShowComment,
  showComment,
  chatBoxRef,
  isOrientation,
}) {
  // console.log(isOrientation, "isOrientation");
  return (
    showComment ? (
      <div className="backdrop-blur-[8px] bg-black/30 rounded-[8px] overflow-hidden h-full min-w-[236px]">
        <div
          className={`hidden lg:block text-[11px] text-[#FFFFFF] backdrop-blur-xl bg-black/10 font500 text-end py-[7px]  px-[16px] ${
            isOrientation && "!block"
          }`}
        >
          <div
            className="cursor-pointer inline"
            onClick={() => setShowComment && setShowComment(false)}
          >
            Hide comments
          </div>
        </div>

        <div
          className={`flex flex-col pb-[21px] overflow-hidden customScrollHorizontal ${
            showComment && "overflow-y-auto lg:overflow-auto"
          }  max-h-[40dvh] lg:max-h-[50vh] `}
        >
          {showComment && (
            <>
              <div
                ref={chatBoxRef ? chatBoxRef : {}}
                className="flex flex-col pt-[10px] px-[14px] lg:overflow-y-auto customScrollHorizontal"
              >
              {data?.length===0 &&  <div className="flex flex-col justify-center items-center py-[81px]">
                 
                  <div className="mb-[17px] flex items-center">
                  <CommentIcon/>
                  </div>
                  <div className="text-center text-[#788AA1] text-[13px] font400"> 
                  Comment section is currently<br className="hidden lg:block"/> disabled
                  </div>
                </div>}
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
        <div className=" h-[10px] max-h-[57vh]"></div>
      </div>
    ):<div className=" max-h-[57vh]"></div>
  );
}
