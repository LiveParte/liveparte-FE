import React from "react";
import NoAuth from "@/components/Layout/NoAuth";
import LiveTV from "@/components/modules/LiveTV";
import Footer from "../entertainers/Footer";

const LiveTVPage: React.FC = () => {
  return (
    <div className="min-h-[100vh] bg-black-background">
      <NoAuth>
        <LiveTV />
        <Footer />
      </NoAuth>
    </div>
  );
};

export default LiveTVPage;
