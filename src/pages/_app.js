import Head from "next/head";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import NextNProgress from 'nextjs-progressbar';
import { PersistGate } from 'redux-persist/integration/react';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { persistor, store } from "@/store";

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* <Head><title>This is the title</title></Head> */}

      <Head>
        <title>Liveparte - Watch Live Concerts and Performances</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
        <link rel="icon" href="/logo.svg" sizes="any" />
        <meta property="og:description" content="Get direct access to live and on-demand concert, performances by your award-winning artistes and comedians anywhere in the world from the comfort of your devices." />

      </Head>
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ToastContainer
            className={`z-[9999]`}
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover

            // style={{}}
          />
          <NextNProgress />
         

          <Component {...pageProps} />
          </PersistGate>
        </Provider>
    </>
  );
}
