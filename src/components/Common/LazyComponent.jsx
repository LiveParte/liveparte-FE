import { useEffect, useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const LazyComponent = dynamic(() => import('./LazyComponent'));

function MyComponent() {
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(ref.current);
          ref.current.load();
        }
      });
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return (
    <div ref={ref}>
      <div>Some content</div>
      <LazyComponent />
    </div>
  );
}

export default MyComponent;