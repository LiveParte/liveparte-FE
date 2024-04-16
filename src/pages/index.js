import NoAuth from "@/components/Layout/NoAuth";
import Footer from "@/components/Common/Footer";
import { useRouter } from "next/router";
import dynamic from 'next/dynamic';
import MyLocation from '../components/Common/GetLOcation.jsx'
const Hero = dynamic(() => import('@/components/modules/LandingPage/Hero'), {
  ssr: false
});
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
// import Hero  from "@/components/modules/LandingPage/Hero";
// import FavoriteShow from "@/components/modules/LandingPage/FavoriteShows";
// import Features from "@/components/modules/LandingPage/Features";
// import ArtistList from "@/components/modules/LandingPage/Artist";
// import FAQ from "@/components/modules/LandingPage/FAQ";

// import MyLocationComponent from "@/components/Common/GetLOcation";
// const LazyComponentWithLazyLoad = withLazyLoad(Hero);
// const LazyComponentWithLazyLoad1 = withLazyLoad(FavoriteShow);
// const LazyComponentWithLazyLoad2= withLazyLoad(Features);
// const LazyComponentWithLazyLoad3 = withLazyLoad(FAQ);
// const LazyComponentWithLazyLoad4 = withLazyLoad(Hero);
// const LazyComponentWithLazyLoad5 = withLazyLoad(ArtistList);

export default function Home() {
  const router = useRouter();
  const { token } = router.query;
  // console.log(router?.pathname,token)

  return (
    <NoAuth>
      <Hero/>
      <FavoriteShow/>
      <Features/>
      <ArtistList/>
      <FAQ/>
      

      {/* <LazyLoader> */}
      {/* <MyLocationComponent/> */}
      {/* <Hero/>
      <Hero
    
      <LazyComponentWithLazyLoad1 />
   
      <LazyComponentWithLazyLoad2 />
      <LazyComponentWithLazyLoad5 />
      <LazyComponentWithLazyLoad3 /> */}
      <div className="mb-[70px] md:mb-0">
        <Footer />
      </div>
    </NoAuth>
  );
}
