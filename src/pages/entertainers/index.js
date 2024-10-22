import React from "react";
import NoAuth from "@/components/Layout/NoAuth";
// import Footer from "@/components/Common/Footer";
import MakePossible from "@/components/modules/Entertainer/makePossible";
import EntertainerBanner from "../../components/modules/Entertainer/EntertainerBanner";
import Studio from "../../components/modules/Entertainer/Studio";
import GetPaid from "../../components/modules/Entertainer/GetPaid";
import Earning from "../../components/modules/Entertainer/Earning";
import Engagement from "../../components/modules/Entertainer/Enagement";
import Faq from "../../components/modules/Entertainer/Faq";
import Footer from "../../components/modules/Entertainer/Footer";
import Random from "../../components/modules/Entertainer/Random";
import ForEnter from "@/components/modules/Home/ForEnter";
// import Footer from "@/components/Common/Footer";

const Entertainer = () => {
  return (
    <div className="min-h-[100vh] bg-black over text-white">
      {/* <ButtonComp> */}
      <NoAuth>
      <EntertainerBanner />
      <Studio/>
      <GetPaid/>
      <Earning/>
      <Engagement/>
      <Random/>
     
        {/* <MakePossible /> */}
        <Faq/>
      <Footer/>
        {/* <Footer /> */}
      </NoAuth>
    </div>
  );
};

export default Entertainer;
