import Navbar from "../reusable/navbar";
import ActiveStream from "./active-stream";
import CategorySection from "./Category-section";
import HeroSection from "./hero-section";
import LiveTVInfo from "./live-tv-info";

export default function HomeView() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <LiveTVInfo />
      <CategorySection />
      <ActiveStream />
    </>
  );
}
