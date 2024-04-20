import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const LazyComponent = dynamic(() => import('./LazyComponent'));

function MyComponent() {
  const ref = useRef();

  useEffect(() => {
    const currentRef = ref.current; // Copy ref.current to a variable

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(currentRef); // Use the variable instead of ref.current
          currentRef.load();
        }
      });
    });

    if (currentRef) {
      observer.observe(currentRef); // Use the variable instead of ref.current
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef); // Use the variable instead of ref.current
      }
    };
  }, [ref]); // Removed ref.current from the dependency array

  return (
    <div ref={ref}>
      {/* <div>Some content</div> */}
      <LazyComponent />
    </div>
  );
}

export default MyComponent;
