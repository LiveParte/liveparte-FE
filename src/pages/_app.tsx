import Head from "next/head";
import { AppProps } from "next/app";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import NextNProgress from "nextjs-progressbar";
import { PersistGate } from "redux-persist/integration/react";
import { SessionProvider } from "next-auth/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { persistor, store } from "../store";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ObjectProvider } from "@/Context/ObjectProvider";
import { VideoJSProvider } from "@/Context/VideoJsContext";
import { TransitionProvider } from "@/Context/TransitionContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/lib/queryClient";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Liveparte - Watch Live Concerts and Performances</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
        <link rel="icon" href="/logo.svg" sizes="any" />

        {/* Meta tag for Google Search  */}
        <meta
          name="description"
          content="Get direct access to live and on-demand concerts and performances by your favorite artistes and comedians anywhere in the world from the comfort of your devices."
        />
        <meta
          property="og:description"
          content="Get direct access to live and on-demand concert, performances by your award-winning artistes and comedians anywhere in the world from the comfort of your devices."
        />
        <meta
          property="og:title"
          content="Get direct access to live and on-demand concert, performances by your award-winning artistes and comedians anywhere in the world from the comfort of your devices."
        />
      </Head>
      <ErrorBoundary>
        <VideoJSProvider>
          <ObjectProvider>
            <TransitionProvider>
              <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                  <GoogleOAuthProvider clientId="845158309668-olf8vmklh4baunlh2m7jb3fnidupl1u2.apps.googleusercontent.com">
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
                    />

                    <NextNProgress />

                    <QueryClientProvider client={queryClient}>
                      <Component {...pageProps} />
                      <ReactQueryDevtools initialIsOpen={false} />
                    </QueryClientProvider>
                  </GoogleOAuthProvider>
                </PersistGate>
              </Provider>
            </TransitionProvider>
          </ObjectProvider>
        </VideoJSProvider>
      </ErrorBoundary>
    </>
  );
}
