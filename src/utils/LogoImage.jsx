// Import dependencies and components
import Image from "next/image";
import { useRouter } from "next/router";

// Export constants and components
export const MainContainer = `px-[20px] md:px-[40px] lg:px-[120px]`;
export const HeaderOnSelect = `rounded-[8px]  border-[0px] font500 backdrop-blur-[60px] !bg-[#FFFFFF26]`;
export const IsHover = `hover:!bg-[#FFFFFF26] hover:rounded-[8px]  hover:border-[0px] hover:font500  hover:backdrop-blur-[60px]`;

export default function LogoImage2({  }) {
  const router =useRouter();
  // setRouterLoader(eventLink)
  
  const handleRoute = () => {
    router.push("/");
  };

  return (
    <>
      <Image
        onClick={handleRoute}
        src="/svg/logoBeta.svg"
        width={130}
        height={23}
        alt="Picture of the author"
        className="hidden md:block cursor-pointer"
      />
      <Image
        onClick={handleRoute}
        src="/svg/logoBeta.svg"
        width={130}
        height={19}
        alt="Picture of the author"
        className="md:hidden cursor-pointer"
        style={{ width: "30vw" }}
        // fill
      />
    </>
  );
}

