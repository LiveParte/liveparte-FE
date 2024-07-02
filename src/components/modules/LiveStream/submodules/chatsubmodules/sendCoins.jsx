import { formatMoney } from "@/utils/formatMoney";
import Image from "next/image";

export const SendCoinsComp = ({ setPayFlow, userCoinsBalance }) => (
  <div className="relative text-white element rounded-[98px] p-[4px]">
    <div
      className="p-[4px] pr-[10px] rounded-[96px] hidden lg:flex gap-[9px] text-white text-[10px] md:text-[11px] font500 items-center bg-[#BACFF70A] cursor-pointer relative w-fit"
      onClick={() => setPayFlow&&setPayFlow("giftCoins")}
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
        onClick={() => setPayFlow&&setPayFlow("giftCoins")}
      >
        <div className=""> Send</div>
      </div>
    </div>
  </div>
);
