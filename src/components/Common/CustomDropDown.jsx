import React, { useEffect, useRef } from "react";

export default function CustomDropDown({ dropdownRef, setIsOpen, className, children }) {
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef&&dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Clicked outside the dropdown, so close it
        setIsOpen(false);
      }
    }
  
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
  
    // Unbind the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]); // Removed setIsOpen from the dependency array
  
  function handleCloseModal() {
    setModalName();
  }

  // inset: -8px 16px 15px auto;
  //   transform: translate3d(0px, 61.5px, 0px);
  
  return (
    <div
      ref={dropdownRef}
      className={`absolute dropdownII transform translate-x-0 translate-y-[130px] z-30 ${className}`}
    >
      {children}
    </div>
  );
}
