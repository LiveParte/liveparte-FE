import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {  ErrorNotificationIcon, SuccessNotificationIcon, WarningIcon } from "../../public/svg";
import 'react-toastify/dist/ReactToastify.css';
import { storage, userDetailStorageName } from "./helper";
import { eventCopyLink } from "@/store/baseApi/baseUrl";

export function CountdownTimerII({ initialTime, onTimerEnd,onNext }) {
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
  // if(onNext){
  //  return  onNext&&onNext(time)
  // }

  return (
    <span>
      {`${Math.floor(time / 60)}`.padStart(2, "0")}:
      {`${time % 60}`.padStart(2, "0")}
    </span>
  );
}

// import React, { useState, useEffect } from 'react';

export function CountdownTimerIII({ targetDate, onTimerEnd={} }) {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      if (onTimerEnd && typeof onTimerEnd === 'function') {
        onTimerEnd();
      }
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onTimerEnd]);

  const formatTime = (value) => String(value).padStart(2, '0');

  return (
    <div className="flex justify-center text-[64px] text-[#FFFFFF] font-1 font-bold">
      <div className="flex flex-col justify-center items-center relative">
        {formatTime(timeLeft.days)}
        <div className="text-[#63768D] text-[13px] font400 absolute -bottom-[10px]">
          Days
        </div>
      </div>
      :
      <div className="flex flex-col justify-center items-center relative">
        {formatTime(timeLeft.hours)}
        <div className="text-[#63768D] text-[13px] font400 absolute -bottom-[10px]">
          Hours
        </div>
      </div>
      :
      <div className="flex flex-col justify-center items-center relative">
        {formatTime(timeLeft.minutes)}
        <div className="text-[#63768D] text-[13px] font400 absolute -bottom-[10px]">
          Minutes
        </div>
      </div>
      :
      <div className="flex flex-col justify-center items-center relative">
        {formatTime(timeLeft.seconds)}
        <div className="text-[#63768D] text-[13px] font400 absolute -bottom-[10px]">
          Seconds
        </div>
      </div>
    </div>
  );
}

// export default CountdownTimer;

export function GetTransformedImageUrl(
  cloudinaryUrl,
  width = 300,
  height = 300
) {
  const urlParts = cloudinaryUrl?.split("/");
  const imageName = urlParts[urlParts?.length - 1]; // Get the image name from the URL

  const cloudNameIndex = urlParts?.indexOf("upload") + 1;
  const cloudName = urlParts[cloudNameIndex]; // Get the cloud name from the URL

  const transformedImageUrl = `https://res.cloudinary.com/dammymoses/image/upload/w_${width}/h_${height}/${cloudName}/LiveParte/${imageName}`;
  return transformedImageUrl;
}

export   const termsUrl=`/terms`
export const PolicyUrl='/privacy'
export const ContactUs =`mailto:support@liveparte.com`
export const FaqUrl='https://liveparte.freshdesk.com/a/solutions '
export function randomBetweenOneAndTen(ArrayLength=9) {
  return Math.floor(Math.random() * (ArrayLength-1)); // Generate a random number between 0 and 9

}

export function SuccessNotification({ message }) {
   toast?.success(message, {
    icon: <SuccessNotificationIcon />,
    hideProgressBar: true,
    style: { background: "#CCEDEB", color: "#060809",fontSize:13,height:30 },
    className:'font400  min-w-max'
  });
  
}


export function ErrorNotification({ message }) {
  toast?.error(message, {
   icon: <ErrorNotificationIcon />,
   style: { background: "#FED9DD", color: "#060809",fontSize:13, },
   className:'font400'
 });
 
}

export function WarningNotification({ message ,closeToast}) {
  toast?.error(message, {
   icon: <WarningIcon />,
   hideProgressBar: true,
   autoClose: false,
   closeOnClick: true,
   closeButton:false,
   draggable: true,
   pauseOnHover: true,
   pauseOnFocusLoss: true,
   style: { background: "#FFF3D1", color: "#060809",fontSize:13, },
   className:'font400 w-max'
 });
 
}


// WarningIcon


export function replaceSpaceWithDashFunc(str) {
  return str.replace(/\s+/g, '_');

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
  return  `${eventCopyLink}${link}`
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


export function convertDateTime(inputDateTime) {
  // Extract date and time components
  const [date, time] = inputDateTime.split('T');
  
  // Extract year, month, and day
  const [year, month, day] = date.split('-');
  
  // Extract hour, minute, and second
  const [hour, minute] = time.split(':');
  
  // Convert to desired format
  const formattedDateTime = `${year}${month}${day}T${hour}${minute}`;
  
  return formattedDateTime;
}


export function convertToUTC(inputDateTime) {
  // function convertWATToUTC(inputDateTime) {
    // Extract date and time components
    const [date, time] = inputDateTime.split('T');
    
    // Extract year, month, and day
    const [year, month, day] = date.split('-');
    
    // Extract hour and minute
    const [hour, minute] = time.split(':');
    
    // Convert to UTC format considering WAT is UTC+1
    const watDate = new Date(Date.UTC(year, month - 1, day, hour - 1, minute));
  
    // Format the new date and time
    const newYear = watDate.getUTCFullYear();
    const newMonth = String(watDate.getUTCMonth() + 1).padStart(2, '0');
    const newDay = String(watDate.getUTCDate()).padStart(2, '0');
    const newHour = String(watDate.getUTCHours()).padStart(2, '0');
    const newMinute = String(watDate.getUTCMinutes()).padStart(2, '0');
    const newSecond = String(watDate.getUTCSeconds()).padStart(2, '0');
    
    const newDateTime = `${newYear}${newMonth}${newDay}T${newHour}${newMinute}${newSecond}Z`;
    
    return newDateTime;
  // }
  
}

export function convertAndAddOneHour(inputDateTime) {
  // Extract date and time components
  //lagos(West Africa)is WAT
  const [date, time] = inputDateTime.split('T');
  
  // Extract year, month, and day
  const [year, month, day] = date.split('-');
  
  // Extract hour and minute
  const [hour, minute] = time.split(':');
  
  // Convert to UTC format
  const utcDateTime = `${year}${month}${day}T${hour}${minute}`;

  // Convert UTC string to Date object
  const utcDate = new Date(Date.UTC(year, month - 1, day, hour, minute));

  // Add one hour
  utcDate.setUTCHours(utcDate.getUTCHours() + 2);

  // Format the new date and time
  const newYear = utcDate.getUTCFullYear();
  const newMonth = String(utcDate.getUTCMonth() + 1).padStart(2, '0');
  const newDay = String(utcDate.getUTCDate()).padStart(2, '0');
  const newHour = String(utcDate.getUTCHours()).padStart(2, '0');
  const newMinute = String(utcDate.getUTCMinutes()).padStart(2, '0');
  const newSecond = String(utcDate.getUTCSeconds()).padStart(2, '0');

  const newDateTime = `${newYear}${newMonth}${newDay}T${newHour}${newMinute}${newSecond}Z`;

  return newDateTime;
}

// Test the function
const inputDateTime = "2024-07-05T19:00";
const newDateTime = convertAndAddOneHour(inputDateTime);
// console.log(newDateTime);  // Output: "20240705T200000Z"


export function checkShowDuration(targetDateTime, durationMins) {
    // Current date and time
    // console.log(durationMins,'durationMins')
    const currentDate = new Date();

    // Convert targetDateTime string to Date object
    const targetDate = new Date(targetDateTime);
    
    // Calculate target date and time after adding durationMins
    const targetDatePlusDuration = new Date(targetDate.getTime() + (durationMins * 60 * 1000));

    // console.log(targetDate,targetDatePlusDuration,'targetDatePlusDuration')
    // Check conditions
    if (currentDate >= targetDate && currentDate <= targetDatePlusDuration) {
        return true;
    } else {
        return false;
    }
}

export function checkShowDurationAfter(targetDateTime, durationMins) {
  const currentDate = new Date(); // Current date and time
  const targetDate = new Date(targetDateTime); // Convert targetDateTime string to Date object
  const targetDatePlusDuration = new Date(targetDate.getTime() + (durationMins * 60 * 1000)); // Calculate target date and time after adding durationMins
  return currentDate <= targetDatePlusDuration; //
}



export function replaceAmpersandWithAnd(str) {
  return str.replace(/&/g, 'and');
}


export function handleCloseModalAll (functionModal){
  return functionModal &&functionModal(false)

}

export function handleOpenModalAll (functionModal){
  return functionModal &&functionModal(true)

}


export function isFutureDate(dateStr) {

  try {
    // Parse the date string into a Date object
    const dateObj = new Date(dateStr);

    // Get the current time
    const now = new Date();

    // Check if the date is in the future (greater than current time)
    return dateObj > now;
  } catch (error) {
    console.error(`Invalid date format: ${dateStr}`, error);
    return false; // Handle invalid date format gracefully
  }
}


export function checkDateStatus(dateString) {
  const inputDate = new Date(dateString);
  const currentDate = new Date();

  if (inputDate < currentDate) {
      return "Past";
  } else if (inputDate > currentDate) {
      return "Future";
  } else {
      return "Present";
  }
}