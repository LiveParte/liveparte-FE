
// import React, { useState , useRef , useEffect } from "react";
// import { ArrowDownSelectIcon } from "../../../public/svg";

// export const FloatingLabelSelect = ({
//   label,
//   value,
//   onChange,
//   error,
//   name,
//   disabled = false,
//   onBlur,
//   options = [],
//   placeholder
// }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//         setIsFocused(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);


//   const handleSelectClick = () => {
//     if (!disabled) {
//       setIsOpen(!isOpen);
//       setIsFocused(true);
//     }
//   };

//   const handleOptionClick = (optionValue) => {
//     onChange({ target: { value: optionValue } });
//     setIsOpen(false);
//     setIsFocused(false);
//   };

//   const handleBlur = (e) => {
//     // Small delay to allow option click to register
//     setTimeout(() => {
//       setIsOpen(false);
//       setIsFocused(false);
//       onBlur && onBlur(e);
//     }, 200);
//   };

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <div 
//         className="relative bg-[#222428] rounded-[8px] cursor-pointer"
//         onClick={handleSelectClick}
//       >
//         <div className="flex items-center relative">
//           <div className="flex w-full items-center">
//             <div
//               className={`block flex-1 rounded-[8px] px-[16px] pb-1.5 pt-[25px] w-full text-[13px] border-[0px] dark:text-white peer h-[50px] relative bg-transparent ${
//                 disabled ? "cursor-not-allowed !text-[#63768D]" : "text-white"
//               }`}
//             >
//               {value ? options.find(opt => opt.value === value)?.label : ""}
//             </div>
//             <span className={`text-white absolute right-[9.2px] transition-transform ${isOpen ? 'rotate-180' : ''}`}>
//               <ArrowDownSelectIcon/>
//             </span>
//           </div>
//         </div>
        
//         <label
//           htmlFor={name}
//           className={`absolute z-30 text-[13px] duration-300 transform -translate-y-[8px] ${
//             isFocused || value
//               ? "top-[13px] scale-75"
//               : "top-[25px] -translate-y-[60%] scale-100"
//           } origin-[0] start-[14px] text-[#63768D] peer-focus:text-[#63768D] peer-focus:dark:text-[#63768D] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto ${disabled ? "cursor-not-allowed" : "cursor-pointer"} font400`}
//         >
//           {label}
//         </label>
//       </div>

//       {isOpen && !disabled && (
//         <div className="absolute z-50 w-full mt-1 bg-[#222428] rounded-[8px] shadow-lg ">
//           {options.map((option) => (
//             <div
//               key={option.value}
//               className="px-[16px] py-3 text-[13px] text-white hover:bg-[#63768D] cursor-pointer "
//               onClick={() => handleOptionClick(option.value)}
//             >
//               {option.label}
//             </div>
//           ))}
//         </div>
//       )}

//       {error && (
//         <div className="text-red-600 font400 text-[12px] mt-1">
//           {error}
//         </div>
//       )}
//     </div>
//   );
// };


import React, { useState, useRef, useEffect } from "react";
import { ArrowDownSelectIcon } from "../../../public/svg";

export const FloatingLabelSelect = ({
  label,
  value,
  onChange,
  error,
  name,
  disabled = false,
  onBlur,
  options = [],
  placeholder
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setIsFocused(true);
    }
  };

  const handleOptionClick = (optionValue) => {
    onChange({ target: { value: optionValue } });
    setIsOpen(false);
    setIsFocused(false);
  };

  const handleBlur = (e) => {
    // Small delay to allow option click to register
    setTimeout(() => {
      setIsOpen(false);
      setIsFocused(false);
      onBlur && onBlur(e);
    }, 200);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="relative bg-[#222428] rounded-[8px] cursor-pointer"
        onClick={handleSelectClick}
      >
        <div className="flex items-center relative">
          <div className="flex w-full items-center">
            <div
              className={`block flex-1 rounded-[8px] px-[16px] pb-1.5 pt-[25px] w-full text-[13px] border-[0px] dark:text-white peer h-[50px] relative bg-transparent ${
                disabled ? "cursor-not-allowed !text-[#63768D]" : "text-white"
              }`}
            >
              {value ? options.find(opt => opt.value === value)?.label : ""}
            </div>
            <span className={`text-white absolute right-[9.2px] transition-transform ${isOpen ? 'rotate-180' : ''}`}>
              <ArrowDownSelectIcon/>
            </span>
          </div>
        </div>
        
        <label
          htmlFor={name}
          className={`absolute z-30 text-[13px] duration-300 transform -translate-y-[8px] ${
            isFocused || value
              ? "top-[13px] scale-75"
              : "top-[25px] -translate-y-[60%] scale-100"
          } origin-[0] start-[14px] text-[#63768D] peer-focus:text-[#63768D] peer-focus:dark:text-[#63768D] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto ${disabled ? "cursor-not-allowed" : "cursor-pointer"} font400`}
        >
          {label}
        </label>
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-[#222428] rounded-[8px] shadow-lg max-h-[150px] overflow-y-auto  scrollbar-none ">
          {options.map((option) => (
            <div
              key={option.value}
              className="px-[16px] py-3 text-[13px] text-white hover:bg-[#63768D] cursor-pointer"
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="text-red-600 font400 text-[12px] mt-1">
          {error}
        </div>
      )}
    </div>
  );
};


