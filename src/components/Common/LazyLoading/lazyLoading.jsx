// lazyLoading.jsx

import { useRef } from "react";
import { useInView } from "framer-motion";

function withLazyLoad(WrappedComponent) {
  return function LazyLoadedComponent(props) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
      <div ref={ref}>
        <WrappedComponent {...props} isInView={isInView} />
      </div>
    );
  };
}

export default withLazyLoad;
