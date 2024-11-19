import Image, { StaticImageData } from "next/image";



const AccessCard = ({ cardImg, commentImg, title, description, gradient, gradientColor, imgBgColor, commentWidth = "w-[160px]", hasComment }) => {
  return (
    <div className="bg-grey.100 lg:w-full w-full h-[332px] rounded-[16px] p-4 mx-auto">
      <div className={`h-[181px] ${imgBgColor} rounded-[8px] relative p-3.5`}>
        <Image className="overflow-y-hidden h-full bg-cover object-cover rounded-[6px]" src={cardImg} alt="card1" />
        {gradient && <div className={`h-[45px] ${gradientColor} rounded-[6px] left-0 absolute w-full bottom-0`}></div>}
        {hasComment && <Image className={`absolute left-1.5 bottom-2 ${commentWidth}`} src={commentImg} alt="comment" />}
      </div>
      <h1 className="font-mdtest text-[24px] font-medium leading-6 tracking-[-0.12px] mt-6">{title}</h1>
      <p className="font-mattersq text-sm text-white.100 leading-[16.8px] tracking-[-0.12px] mt-3">{description}</p>
    </div>
  );
};

export default AccessCard;