import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {  ErrorNotificationIcon, SuccessNotificationIcon } from "../../public/svg";
import 'react-toastify/dist/ReactToastify.css';
import { storage, userDetailStorageName } from "./helper";

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


export const myShowLink=`/myshows`;
export const eventLink=`/event`;
export const singleEventLink=`/event/[id]`;
export const onDemandLink=`/event/ondemand`;
export const settingLink=`/setting`
export const liveStreamLink=`/livestream`

export const CopyEventLink =({link})=>{
  return  `https://staging.liveparte.com/event/${link}`
}


export function GetEmailSearchUrl(email) {
  const searchQuery = encodeURIComponent('partylive762');

  // Check if the email domain matches Gmail
  if (email.endsWith('@gmail.com')) {
      return `https://mail.google.com/mail/u/0/#search/${searchQuery}`;
  }

  // Check if the email domain matches Yahoo Mail
  if (email.endsWith('@yahoo.com')) {
      return `https://mail.yahoo.com/search/?fr=uh3_mail_web_gs&type=10&searchTerm=${searchQuery}`;
  }

  // Check if the email domain matches Zoho Mail
  if (email.endsWith('@zoho.com')) {
      return `https://mail.zoho.com/${searchQuery}`;
  }

  // For other email providers, return a generic URL
  // You might need to update this to match the search functionality of other email providers
  return `https://www.example.com/search?email=${email}&q=${searchQuery}`;
}

export const isJSON = (str) => {
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
};

const userData = storage.localStorage.get(userDetailStorageName);
export const CheckUser =isJSON(userData)&&JSON?.parse(userData)