

  import React, { useEffect, useState } from "react";

export function CountdownTimerII({ initialTime, onTimerEnd }) {
  const [time, setTime] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timer);
          if (onTimerEnd && typeof onTimerEnd === 'function') {
            onTimerEnd();
          }
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, [initialTime, onTimerEnd]);

  return (
  <span>
      {`${Math.floor(time / 60)}`.padStart(2, "0")}:
        {`${time % 60}`.padStart(2, "0")}
        </span>
  );
}

// export default CountdownTimer;
