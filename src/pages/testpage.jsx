import MenuDropdown from '@/components/Common/Header/submodules/NavDropDown';
import ButtonComp from '@/components/Ui/button'
import React, { useState } from 'react'

export default function TestPage() {
    const [dropDown, setDropDown] = useState(false);
    function handleLogOut(){

    };
    function setModalName(){
        setDropDown(!dropDown)
    }
  return (
    <div className='text-white'>
    {dropDown && (
        <MenuDropdown
            handleLogOut={handleLogOut}
            setDropDown={setDropDown}
            setModalName={setModalName}
            userInfo={{}}
        />
    )}
    <ButtonComp
        onClick={setModalName} // Toggle dropdown state
        btnText="Menu"
        className="text-[13px] font-medium !h-[30px]  lg:hidden  !px-[24px] gap-[10px] !bg-[#BAD6F70F] leading-none rounded-[999px] border-[#262C32] border-[1px] font500 text-white backdrop-blur-[60px] md:h-fit "
    />
</div>
  )
}
