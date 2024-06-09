import Image from "next/image";

export const ChatList = ({ message, userName }) => {
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