import React, { useEffect, useState } from 'react';
import useIntersectionObserver from '.';

const withLazyLoad = (WrappedComponent, threshold = 0.5) => {
  const Wrapped = (props) => {
    const [isInView, ref] = useIntersectionObserver(threshold);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
      if (isInView && !hasLoaded) {
        setHasLoaded(true);
      }
    }, [isInView, hasLoaded]);

    return (
      <span ref={ref}>
        {hasLoaded ? <WrappedComponent {...props} /> : <div className='bg-[#060809] h-[100vh]'></div>}
      </span>
    );
  };

  // Set displayName for better debugging
  Wrapped.displayName = `withLazyLoad(${getDisplayName(WrappedComponent)})`;

  return Wrapped;
};

// Helper function to get component name
const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

export default withLazyLoad;
