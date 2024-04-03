import store from "@/store";
import Head from "next/head";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { ObjectProvider } from "@/Context/ObjectProvider";

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* <Head><title>This is the title</title></Head> */}

      <Head>
        <title>Live Parte</title>
      </Head>
      <ObjectProvider>
        <Provider store={store}>
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
          <Component {...pageProps} />
        </Provider>
      </ObjectProvider>
    </>
  );
}
