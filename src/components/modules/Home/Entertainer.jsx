import Image from 'next/image'
import React from 'react';
import oletter from "../../../../public/svgs/o.svg";
import os from "../../../../public/svgs/os.svg";
import of from "../../../../public/svgs/of.svg";
import oc from "../../../../public/svgs/oc.svg";
import coc from "../../../../public/svgs/coc.svg";

const Entertainer = () => {
    return (
        <div>
            <div className="mt-28 lg:w-[75%] w-[95%] mx-auto">
                <h1 className="text-center lg:text-[122px] font-mdtest text-[38.92px] flex items-center justify-center lg:leading-[122px] leading-[38.92px] font-bold tracking-[0.48px] whitespace-nowrap">
                    MADE F
                    <Image
                        className="lg:w-[89px] lg:h-[91px] w-[28.39px] h-[29.02px] rounded-full"
                        src={oletter}
                        alt="liveparte"
                    />
                    R Y
                    <Image
                        className="lg:w-[89px] lg:h-[91px] w-[28.39px] h-[29.02px]"
                        src={os}
                        alt="liveparte"
                    />
                    U ❤️
                </h1>
                <p className="text-white lg:text-[80px] text-[25.52px] lg:leading-[80px] leading-[25.52px] text-[#B4BECB] text-center tracking-[0.48px] font-bold font-mdtest">
                    We are making it possible for you to watch your fav
                    <Image
                        className="inline-block align-middle lg:w-[45px] lg:h-[45px] w-[14.35px] h-[14.35px]"
                        src={of}
                        alt="liveparte"
                    />
                    urite events, <br /> c
                    <Image
                        className="inline-block align-middle lg:w-[45px] lg:h-[45px] w-[14.35px] h-[14.35px]"
                        src={oc}
                        alt="liveparte"
                    />
                    nnect with your fav
                    <Image
                        className="inline-block align-middle lg:w-[45px] lg:h-[45px] w-[14.35px] h-[14.35px]"
                        src={coc}
                        alt="liveparte"
                    />
                    rite artiste and chat with friends.
                </p>
            </div>
           
        </div>
    );
};

export default Entertainer;