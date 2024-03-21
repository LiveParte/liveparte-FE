import { useEffect, useState, useMemo } from 'react';

function useMultilineCheck(ref) {
  const [isMultiline, setIsMultiline] = useState(false);

  useEffect(() => {
    if (!ref || !ref.current) return; // Check if ref or ref.current is undefined

    const observer = new ResizeObserver((entries) => {
      const { height, lineHeight } = window.getComputedStyle(ref.current);
      setIsMultiline(parseInt(height) > parseInt(lineHeight));
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isMultiline;
}

function useMemoizedMultilineCheck(ref) {
  if (ref && ref.current) { // Ensure that ref and ref.current are defined
    return useMemo(() => useMultilineCheck(ref), [ref]);
  }
}

export default useMemoizedMultilineCheck;
