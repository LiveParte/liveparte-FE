import React from "react";
import LiveTV from "@/components/modules/LiveTV";
import Footer from "../entertainers/Footer";
import Navbar from "@/custom-ui/reusable/navbar";
import OptimizedTransition from "@/components/Common/PageTransition/OptimizedTransition";

const LiveTVPage: React.FC = () => {
  return (
    <div className="min-h-[100vh] bg-black-background">
      <Navbar />
      <OptimizedTransition>
        <LiveTV />
        <Footer />
      </OptimizedTransition>
    </div>
  );
};

export default LiveTVPage;
