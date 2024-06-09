// components/NetworkQualityMonitor.js
import { WarningNotification } from '@/utils/reusableComponent';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const NetworkQualityMonitor = () => {
  const [networkQuality, setNetworkQuality] = useState('Unknown');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const updateNetworkQuality = () => {
      if (navigator.connection) {
        const connection = navigator.connection;
        const quality = connection.effectiveType;
        // console.log(quality,['slow-2g', '2g']?.includes(quality),'updateNetworkQuality')
        // const closeToast=['slow-2g', '2g']?.includes(quality)
        // {['slow-2g', '2g']?.includes(quality) ? WarningNotification({message:'Your internet connection is currently not stable',closeToast}):null}

        setNetworkQuality(quality);

        if (!navigator.onLine) {
          setShowAlert(true);
          //        } else if (['slow-2g', '2g', '3g','4g'].includes(quality)) {

        } else if (['slow-2g', '2g'].includes(quality)) {
          WarningNotification({message:'Your internet connection is currently not stable'})
          setShowAlert(true);
        } else {
          setShowAlert(false);
          !['slow-2g', '2g']?.includes(quality)&&  toast.dismiss();
          // WarningNotification({message:''})

        }

      } else {
        setShowAlert(!navigator.onLine);
      }

    };

    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
      if (!navigator.onLine) {
        setShowAlert(true);
      } else {
        updateNetworkQuality();
      }
    };

    updateNetworkQuality();

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    if (navigator.connection) {
      navigator.connection.addEventListener('change', updateNetworkQuality);
    }

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
      if (navigator.connection) {
        navigator.connection.removeEventListener('change', updateNetworkQuality);
      }
    };
  }, []);

  return (
    <>
      {/* {showAlert && (
        <div className="alert alert-warning">
          {isOnline ? (
            `Network Quality is ${networkQuality}. Please check your connection.`
          ) : (
            'You are offline. Please check your connection.'
          )}
        </div>
      )} */}
    </>
  );
};

export default NetworkQualityMonitor;
