import Cookie from "js-cookie";


export const storage = {
  localStorage: {
    set: (key, value) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
      }
    },
    get: (key) => {
      if (typeof window !== 'undefined') {
        return JSON.parse(localStorage.getItem(key) || '""');
      }
      return "";
    },
    remove: (key) => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
      }
    }
  },
  cookieStorage: {
    set: (key, value, options) => {
      if (typeof window !== 'undefined') {
        Cookie.set(key, value, options);
      }
    },
    get: (key) => {
      if (typeof window !== 'undefined') {
        return Cookie.get(key) || "";
      }
      return "";
    },
    remove: (key, options) => {
      if (typeof window !== 'undefined') {
        Cookie.remove(key, options);
      }
    }
  }
};

export const setToken = (token) =>{
    localStorage.setItem("user:accesskey", token);
}
export const DeleteAuthTokenMaster = (name) =>{
    localStorage.removeItem(name);
}


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


    export  function firstDateOfTheMonth() {
      // Get the current date
      const currentDate = new Date();
    
      // Subtract 10 days from the current date
      // const 
    
      // Return the new date in international standard format
      return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    }

    export const currentDate = new Date();


    export   const handleKeyPress = (event) => {
      if (!/[0-9]/.test(event.key)) {
        event.preventDefault();
      }
    };

    export const SortOrder = (dataset = []) => {
    
  
      return dataset?.sort((a, b) => {
          let bDate = new Date(b.createdAt);
          let aDate = new Date(a.createdAt);
  
          return  aDate-bDate;
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


export const StatusColor = (status)=>{
  switch (status) {
    case 'pending':
      return 'bg-[#DBEBFE] px-3 py-2 rounded-md capitalize'
      break;
      case 'completed':
        return 'bg-[#DAF1E9] text-[#044E54] capitalize'
        break;
    default:
      break;
  }
}

export function isValidJson(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
}

