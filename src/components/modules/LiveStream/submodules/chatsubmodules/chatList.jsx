import Avatar from "@/utils/functions/resubleImage";

export const ChatList = ({ message, userName,avatar }) => {
    return (
      <div className="pb-[16px] flex items-start  lg:items-center gap-[8px]  max-w-[90%] lg:w-full">
        <Avatar
         width={30}
         height={30}
         className="object-cover w-[20px] h-[20px] lg:h-[30px] md:w-[30px] rounded-full"
         alt="profile-image-user"
        />
       
        <div>
          <div className="text-[#B4BECB] text-[10px] md:text-[11px] font500 leading-[14px] font500">
            {userName}
          </div>
          <div className="text-[#FFFFFF] text-[10px] leading-[14px] -tracking-[0.12px]  font400">
            {message}
          </div>
        </div>
      </div>
    );
  };