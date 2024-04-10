// ProgressBar.js

import { motion, useScroll, useSpring } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ProgressBar = () => {
  const router = useRouter();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleRouteChangeStart = () => {
      // Show the progress bar when a route change starts
      // You can add more animations here if needed
      scaleX.set(0);
    };

    const handleRouteChangeComplete = () => {
      // Hide the progress bar when a route change completes
      // You can add more animations here if needed
      scaleX.set(1);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router.events, scaleX]);

  return (
    <motion.div className="progress-bar" style={{ scaleX }} />
  );
};

export default ProgressBar;
