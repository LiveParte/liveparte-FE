import React, { useState, FocusEvent, ChangeEvent } from "react";
import { ArrowDownSelectIcon } from "../../../public/svg";
// import { Placeholder } from "react-bootstrap";


export const FloatingLabelSelect = ({
  label,
  value,
  onChange,
  error,
  name,
  disabled = false,
  onBlur,
  options=[],
  placeholder
}) => {
  const [isFocused, setIsFocused] = useState(false);
    console.log(value,'valuevaluevalue')
  return (
    <div className="relative">
      <div className="relative bg-[#222428] rounded-[8px] cursor-pointer">
       <div className="flex items-center relative">
        {/* <div>NGN</div> */}
      <div className="flex w-full items-center">
      <select
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur && onBlur(e);
          }}
          className={`block flex-1 rounded-[8px] z-10 px-[16px] pb-2.5 pt-[25px] w-full text-[13px] focus:border-[1px] border-[0px] appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-[#63768D] peer h-[50px] relative bg-transparent ${
            disabled ? "cursor-not-allowed !text-[#63768D]" : "text-white"
          }`}
          // style={{ paddingTop: '10px' }}
        >
          <option value="" disabled hidden>{placeholder}</option>
          {options?.map((option) => (
            <option key={option.value} className="text-white  bg-[#222428] hover:bg-[#63768D] " value={option.value}>
              {option.label}
            </option>
          ))}
        </select> 
        <span className="text-white absolute right-[9.2px] "><ArrowDownSelectIcon/></span>
      </div>
       </div>
        <label
          htmlFor={name}
          className={`absolute z-30 text-[13px] duration-300 transform -translate-y-[8px] ${
            isFocused || value
              ? "top-[13px] scale-75"
              : "top-[18px] -translate-y-[60%] scale-100"
          } origin-[0] start-[14px] text-[#63768D] peer-focus:text-[#63768D] peer-focus:dark:text-[#63768D] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto cursor-not-allowed font400`}
        >
          {label}
        </label>
      </div>
      {error && (
        <div className="text-red-600 font400 text-[12px]">{error}</div>
      )}
    </div>
  );
};
 

