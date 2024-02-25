import "@/styles/globals.css";
// import "@/styles/moving.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
// import "node_modules/video-react/dist/video-react.css"; 
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
