import "@/styles/globals.css";
// import "@/styles/moving.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { Provider } from "react-redux";
import store from "@/store";
import Head from 'next/head';;

// import "node_modules/video-react/dist/video-react.css"; 
export default function App({ Component, pageProps }) {




  return(
<>
{/* <Head><title>This is the title</title></Head> */}

<Head>
        <title>Live Parte</title>
      </Head>
      <Provider store={store}>
    <Component {...pageProps} />
  </Provider>;
</>

  ) 
}
