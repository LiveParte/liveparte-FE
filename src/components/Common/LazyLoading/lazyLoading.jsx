import React, { useEffect, useState } from 'react';
import useIntersectionObserver from '.';
// import useIntersectionObserver from './useIntersectionObserver';

const withLazyLoad = (WrappedComponent, threshold = 0.5) => {
  return (props) => {
    const [isInView, ref] = useIntersectionObserver(threshold);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
      if (isInView && !hasLoaded) {
        setHasLoaded(true);
      }
    }, [isInView, hasLoaded]);

    return (
      <div ref={ref}>
        {hasLoaded ? <WrappedComponent {...props} /> : <div className='bg-[#060809] h-[100vh]'></div>}
      </div>
    );
  };
};

export default withLazyLoad;
