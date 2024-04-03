// Define MainContainer as a string containing CSS code
import Image from 'next/image'
export const MainContainer = `px-[20px] md:px-[40px] lg:px-[120px]`;
export const HeaderOnSelect =`rounded-[8px]  border-[0px] font500 backdrop-blur-[60px] !bg-[#FFFFFF26]`
export const IsHover =`hover:!bg-[#FFFFFF26] hover:rounded-[8px]  hover:border-[0px] hover:font500  hover:backdrop-blur-[60px]`;

export const LogoImage  = ({router}) =>(
    <>
    <Image
              onClick={() => router.push("/")}
              src="/svg/logo.svg"
              width={130}
              height={23}
              alt="Picture of the author"
              className="hidden md:block"
            />
            <Image
              onClick={() => router.push("/")}
              src="/svg/logo.svg"
              width={103}
              height={19}
              alt="Picture of the author"
              className="md:hidden"
            />
    </>
)