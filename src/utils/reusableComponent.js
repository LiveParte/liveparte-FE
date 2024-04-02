import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {  ErrorNotificationIcon, SuccessNotificationIcon } from "../../public/svg";
import 'react-toastify/dist/ReactToastify.css';

export function CountdownTimerII({ initialTime, onTimerEnd }) {
  const [time, setTime] = useState(240);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timer);
          if (onTimerEnd && typeof onTimerEnd === "function") {
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

export function GetTransformedImageUrl(
  cloudinaryUrl,
  width = 300,
  height = 300
) {
  // console.log(cloudinaryUrl,'cloudinaryUrl')
  const urlParts = cloudinaryUrl?.split("/");
  const imageName = urlParts[urlParts?.length - 1]; // Get the image name from the URL

  const cloudNameIndex = urlParts?.indexOf("upload") + 1;
  const cloudName = urlParts[cloudNameIndex]; // Get the cloud name from the URL

  const transformedImageUrl = `https://res.cloudinary.com/dammymoses/image/upload/w_${width}/h_${height}/${cloudName}/LiveParte/${imageName}`;
  // console.log(cloudinaryUrl, urlParts, transformedImageUrl, "cloudinaryUrl");
  return transformedImageUrl;
}

export function randomBetweenOneAndTen() {
  return Math.floor(Math.random() * 9) + 1;
}

export function SuccessNotification({ message }) {
   toast?.success(message, {
    icon: <SuccessNotificationIcon />,
    style: { background: "#CCEDEB", color: "#060809",fontSize:13,height:30 },
    className:'font400'
  });
  
}


export function ErrorNotification({ message }) {
  toast?.error(message, {
   icon: <ErrorNotificationIcon />,
   style: { background: "#FED9DD", color: "#060809" },
 });
 
}


export function replaceSpaceWithDash(str) {
  return str.replace(/\s+/g, '999');

}


export function replaceDashWithSpace(str) {
  return str?.replace(/999/g, ' ');

}
