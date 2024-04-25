import React, { useEffect, useState } from 'react';
import useIntersectionObserver from '.';

const withLazyLoad = (WrappedComponent, threshold = 0) => {
  const Wrapped = (props) => {
    const [isInView, ref] = useIntersectionObserver(threshold);
    const [hasLoaded, setHasLoaded] = useState(false);

    console.log(isInView, hasLoaded, 'isInView');

    useEffect(() => {
      if (isInView && !hasLoaded) {
        setHasLoaded(true);
      }
    }, [isInView, hasLoaded]);

    if (!hasLoaded) {
      return <div ref={ref}>Loading...</div>; // Placeholder or loader while loading
    }

    return (
      <div ref={ref}>
        {hasLoaded && <WrappedComponent {...props} />}
      </div>
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
