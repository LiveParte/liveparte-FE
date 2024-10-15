import React from "react";
import NoAuth from "@/components/Layout/NoAuth";
// import Footer from "@/components/Common/Footer";
import MakePossible from "@/components/modules/Entertainer/makePossible";
import EntertainerBanner from "./EntertainerBanner";
import Studio from "./Studio";
import GetPaid from "./GetPaid";
import Earning from "./Earning";
import Engagement from "./Enagement";
import Faq from "./Faq";
import Footer from "./Footer";
import Random from "./Random";
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
