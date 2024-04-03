import NoAuth from "@/components/Layout/NoAuth";
import Footer from "@/components/Common/Footer";
import { useRouter } from "next/router";
import Hero from "@/components/modules/LandingPage/Hero";
import FavoriteShow from "@/components/modules/LandingPage/FavoriteShows";
import Features from "@/components/modules/LandingPage/Features";
import ArtistList from "@/components/modules/LandingPage/Artist";
import FAQ from "@/components/modules/LandingPage/FAQ";

export default function Home() {
  const router = useRouter();

  return (
    <NoAuth>
      <Hero router={router} notEvent={true} />
      <FavoriteShow />
      <Features />
      <ArtistList />
      <FAQ />
      <div className="mb-[70px] md:mb-0">
        <Footer />
      </div>
    </NoAuth>
  );
}
