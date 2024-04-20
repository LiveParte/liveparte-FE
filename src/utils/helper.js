import Cookie from "js-cookie";
import CryptoJS from 'crypto-js';
import { useDispatch } from 'react-redux';
import { Avatar1, Avatar10, Avatar2, Avatar3, Avatar4, Avatar5, Avatar6, Avatar7, Avatar8, Avatar9 } from "../../public/svg/avatars";

const secretKey = 'hahahahah';

export const useAppDispatch = () => useDispatch();
export const accessTokenStorageName =`accessTokenLiveParte`;
export const userDetailStorageName=`UserLiveParte`;
export const storage = {
  localStorage: {
    set: (key, value) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value));
      }
    },
    get: (key) => {
      if (typeof window !== "undefined") {
        return JSON.parse(localStorage.getItem(key) || '""');
      }
      return "";
    },
    remove: (key) => {
      if (typeof window !== "undefined") {
        localStorage.removeItem(key);
      }
    },
  },
  cookieStorage: {
    set: (key, value, options) => {
      if (typeof window !== "undefined") {
        Cookie.set(key, value, options);
      }
    },
    get: (key) => {
      if (typeof window !== "undefined") {
        return Cookie.get(key) || "";
      }
      return "";
    },
    remove: (key, options) => {
      if (typeof window !== "undefined") {
        Cookie.remove(key, options);
      }
    },
  },
};

export const setToken = (token) => {
  localStorage.setItem("user:accesskey", token);
};
export const DeleteAuthTokenMaster = (name) => {
  localStorage.removeItem(name);
};
const isJSON = (str) => {
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
};

export function formatNumber(number) {
  const billion = 1000000000;
  const million = 1000000;
  const thousand = 1000;

  if (number >= billion) {
    return (number / billion).toFixed(1) + "b";
  } else if (number >= million) {
    return (number / million).toFixed(1) + "m";
  } else if (number >= thousand) {
    return (number / thousand).toFixed(1) + "k";
  } else {
    return number.toString();
  }
}

export function firstDateOfTheMonth() {
  // Get the current date
  const currentDate = new Date();

  // Subtract 10 days from the current date
  // const

  // Return the new date in international standard format
  return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
}

export const currentDate = new Date();

export const handleKeyPress = (event) => {
  if (!/[0-9]/.test(event.key)) {
    event.preventDefault();
  }
};

export const SortOrder = (dataset = []) => {
  return dataset?.sort((a, b) => {
    let bDate = new Date(b.createdAt);
    let aDate = new Date(a.createdAt);

    return aDate - bDate;
  });
};

export const NumberTable = (item, name) => {
  // console.log(item,'result')
  const index = item?.findIndex((object) => {
    // console.log(object._id, name,'result')
    return object?.id === name;
  });

  // console.log(index,item,'result'); // 👉️ 1
  return index ? index + 1 : 1;
};

export const StatusColor = (status) => {
  switch (status) {
    case "pending":
      return "bg-[#DBEBFE] px-3 py-2 rounded-md capitalize";
      break;
    case "completed":
      return "bg-[#DAF1E9] text-[#044E54] capitalize";
      break;
    default:
      break;
  }
};

export function isValidJson(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
}

export const CheckIfArray = (Item = []) => {
  if (Array?.isArray(Item)) {
    return true;
  }
  return false;
};



export const encryptText = (text) => {
  // Encrypt the text using AES encryption with a secret key
  const encryptedText = CryptoJS.AES.encrypt(text, secretKey).toString();
  return encryptedText;
}

// Function to decrypt text
export const decryptText = (encryptedText) => {
  // Decrypt the text using AES decryption with the secret key
  const decryptedText = CryptoJS.AES.decrypt(encryptedText, secretKey).toString(CryptoJS.enc.Utf8);
  return decryptedText;
}


export const encryptObject = (object) => {
  // Convert the object to a JSON string
  const jsonString =isJSON(object)&& JSON?.stringify(object);

  // Encrypt the JSON string using AES encryption with a secret key
  const encryptedJson = CryptoJS.AES.encrypt(JSON.stringify(object), secretKey).toString();
  return encryptedJson;
}

// Function to decrypt an object
export const decryptObject = (encryptedJson) => {
// console.log(encryptedJson,'encryptedJson')
//   var data = [{id: 1}, {id: 2}]

// //   // Encrypt
//   var encryptedJson1 = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  var bytes  = CryptoJS.AES.decrypt(encryptedJson, secretKey);
var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
// console.log(decryptedData); 
return decryptedData;
 
  if(encryptedJson){
    var bytes  = CryptoJS.AES.decrypt(encryptedJson, secretKey);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    
  return decryptedData;
  ;}
}



export const NoImageUser = [
  <Avatar1 key="avatar1" />,
  <Avatar2 key="avatar2" />,
  <Avatar3 key="avatar3" />,
  <Avatar4 key="avatar4" />,
  <Avatar5 key="avatar5" />,
  <Avatar6 key="avatar6" />,
  <Avatar7 key="avatar7" />,
  <Avatar8 key="avatar8" />,
  <Avatar9 key="avatar9" />,
  <Avatar10 key="avatar10" />,
];

export function isArray(data) {
  return Array.isArray(data);
}