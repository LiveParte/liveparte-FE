import React from "react";
import LiveTV from "@/components/modules/LiveTV";
import Footer from "../entertainers/Footer";
import Navbar from "@/custom-ui/reusable/navbar";

const LiveTVPage: React.FC = () => {
  return (
    <div className="min-h-[100vh] bg-black-background">
      <Navbar />
      <LiveTV />
      <Footer />
    </div>
  );
};

export default LiveTVPage;
