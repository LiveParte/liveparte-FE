import Navbar from "../reusable/navbar";
import HeroSection from "./hero-section";
import LiveTVInfo from "./live-tv-info";

export default function HomeView() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <LiveTVInfo />
    </>
  );
}
