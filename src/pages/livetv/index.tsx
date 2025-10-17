import React from "react";
import LiveTV from "@/components/modules/LiveTV";
import Footer from "../entertainers/Footer";
import Navbar from "@/custom-ui/reusable/navbar";
import OptimizedTransition from "@/components/Common/PageTransition/OptimizedTransition";
import ScrollAnimation, {
  ScrollAnimations,
} from "@/components/Common/ScrollAnimation/ScrollAnimation";

const LiveTVPage: React.FC = () => {
  return (
    <div className="min-h-[100vh] bg-black-background">
      <Navbar />
      <OptimizedTransition>
        <ScrollAnimation {...ScrollAnimations.fadeUp} delay={0.1}>
          <LiveTV />
        </ScrollAnimation>

        <ScrollAnimation {...ScrollAnimations.fadeUp} delay={0.2}>
          <Footer />
        </ScrollAnimation>
      </OptimizedTransition>
    </div>
  );
};

export default LiveTVPage;
