import MenuDropdown from '@/components/Common/Header/submodules/NavDropDown';
import ButtonComp from '@/components/Ui/button'
import { VideoPlayer } from '@/components/VideoPlayer';
import React, { useState } from 'react'

export default function TestPage() {
    const [dropDown, setDropDown] = useState(false);
    function handleLogOut(){

    };
    function setModalName(){
        setDropDown(!dropDown)
    }
  return (
    <div className='text-white h-[40vh] relative w-[40vw]'>
    <VideoPlayer/>
</div>
  )
}
