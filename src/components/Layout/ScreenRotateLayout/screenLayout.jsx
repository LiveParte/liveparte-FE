import { lockOrientation, selectOrientationLocked, unlockOrientation } from '@/store/User';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { lockOrientation, unlockOrientation, selectOrientationLocked } from './orientationSlice';

const ScreenOrientationLayout = ({ children }) => {
  const dispatch = useDispatch();
  const orientationLocked = useSelector(selectOrientationLocked);

  const [orientation, setOrientation] = useState(null);

  useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation(window.screen.orientation.type);
      if (window.screen.orientation.type.includes('portrait')) {
        dispatch(unlockOrientation()); // Unlock on portrait orientation
      }
    };

    if (typeof window !== 'undefined' && window.screen && window.screen.orientation) {
      setOrientation(window.screen.orientation.type);
      window.screen.orientation.addEventListener('change', handleOrientationChange);

      return () => {
        window.screen.orientation.removeEventListener('change', handleOrientationChange);
      };
    }
  }, [dispatch]);

  const goFullscreen = async () => {
    const container = document.querySelector('#container');
    if (container) {
      if (container.requestFullscreen) {
        await container.requestFullscreen();
      } else if (container.webkitRequestFullScreen) {
        // await container.webkitRequestFullScreen();
      }
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  };

  const lockOrientationHandler = async () => {
    try {
      await goFullscreen();
      await window.screen.orientation.lock('landscape-primary');
      // document.webkitExitFullscreen();
      dispatch(lockOrientation());
    } catch (error) {
      alert(error);
    }
    // document.webkitExitFullscreen();
  };

  const unlockOrientationHandler = () => {
    window.screen.orientation.unlock();
    dispatch(unlockOrientation());
    document.webkitExitFullscreen();
  };

  return (
    <div id="container" >
      {/* <p className='text-white' id="orientation-status">
        {orientation ? `${orientation} mode` : 'Loading...'}
      </p>
      <button
        className='text-white mt-5'
        id="lock-landscape-button"
        onClick={lockOrientationHandler}
        disabled={orientationLocked}
      >
        Lock to Landscape Mode
      </button>
      <button
        className='text-white'
        id="unlock-button"
        onClick={unlockOrientationHandler}
        style={{ display: orientationLocked ? 'block' : 'none' }}
      >
        Unlock
      </button> */}
      <div>
        {/* Pass lock and unlock functions to children */}
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              lockOrientation: lockOrientationHandler,
              unlockOrientation: unlockOrientationHandler,
              orientation:orientation==='landscape-primary'?false:true
            });
          }
          return child;
        })}
      </div>
    </div>
  );
};

export default ScreenOrientationLayout;
