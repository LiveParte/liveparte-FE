import Footer from "../reusable/footer";
import Navbar from "../reusable/navbar";
import ActiveStream from "./active-stream";
import CategorySection from "./Category-section";
import FeaturedEvents from "./featured-events";
import HeroSection from "./hero-section";
import LiveTVInfo from "./live-tv-info";
import OptimizedTransition from "@/components/Common/PageTransition/OptimizedTransition";
import ScrollAnimation, {
  ScrollAnimations,
} from "@/components/Common/ScrollAnimation/ScrollAnimation";

export default function HomeView() {
  return (
    <>
      <Navbar />
      <OptimizedTransition>
        <HeroSection />

        <ScrollAnimation {...ScrollAnimations.fadeUp} delay={0.2}>
          <LiveTVInfo />
        </ScrollAnimation>

        <ScrollAnimation {...ScrollAnimations.slideUp} delay={0.1}>
          <CategorySection />
        </ScrollAnimation>

        <ScrollAnimation {...ScrollAnimations.fadeUp} delay={0.3}>
          <ActiveStream />
        </ScrollAnimation>

        <ScrollAnimation {...ScrollAnimations.staggerUp} delay={0.2}>
          <FeaturedEvents />
        </ScrollAnimation>

        <ScrollAnimation {...ScrollAnimations.fadeUp} delay={0.1}>
          <Footer />
        </ScrollAnimation>
      </OptimizedTransition>
    </>
  );
}
