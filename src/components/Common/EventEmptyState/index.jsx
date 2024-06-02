import Image from "next/image";

export default function EventEmptyState() {
  return (
    <div className="h-[90vh] flex justify-center flex-col items-center">
      <div className="mb-[32px]">
        <Image
          width={0}
          height={0}
          src={`/svg/emptyEventState.svg`}
          alt="eventEmptyState"
          className="w-[103px] h-[75px]"
        />
      </div>
      <div className="text-[18px] font500 text-[#FFFFFF] leading-[20px] text-center">
        There are no events at the moment.
        <br /> Please check back later.
      </div>
    </div>
  );
}
