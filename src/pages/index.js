import NoAuth from "@/components/Layout/NoAuth";
import Footer from "@/components/Common/Footer";
import { useRouter } from "next/router";
import dynamic from 'next/dynamic';
import Hero from "@/components/modules/LandingPage/Hero.jsx";
import IfHeaderIsAuth from "@/components/Common/Header/IfHeaderIsAuth";
// const Hero = dynamic(() => import('@/components/modules/LandingPage/Hero'), {
//   ssr: false
// });
const FavoriteShow = dynamic(() => import('@/components/modules/LandingPage/FavoriteShows'), {
  ssr: false
});
const Features = dynamic(() => import('@/components/modules/LandingPage/Features'), {
  ssr: false
});
const ArtistList = dynamic(() => import('@/components/modules/LandingPage/Artist'), {
  ssr: false
});
const FAQ = dynamic(() => import('@/components/modules/LandingPage/FAQ'), {
  ssr: false
});
;

export default function Home() {
  const router = useRouter();
  const { token } = router.query;
  // console.log(router?.pathname,token)

  return (
    <NoAuth>
       <div className="absolute left-0 right-0 z-90">
          <IfHeaderIsAuth
           
          />
        </div>
      <Hero/>
      <FavoriteShow/>
      <Features/>
      <ArtistList/>
      <FAQ/>
   
      <div className="mb-[70px] md:mb-0">
        <Footer />
      </div>
    </NoAuth>
  );
}
