import { useState, useEffect, useRef, memo } from 'react';

const DropdownButton = ({ label, options, position, children,onNext,modalState,className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [adjustedPosition, setAdjustedPosition] = useState(position);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const calculateDropdownPosition = () => {
    if (!dropdownRef.current || !buttonRef.current) return position;

    const dropdownRect = dropdownRef.current.getBoundingClientRect();
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    switch (position) {
      case 'top':
        if (buttonRect.top >= dropdownRect.height) {
          return 'top';
        }
        break;
      case 'bottom':
        if (viewportHeight - buttonRect.bottom >= dropdownRect.height) {
          return 'bottom';
        }
        break;
      case 'left':
        if (buttonRect.left >= dropdownRect.width) {
          return 'left';
        }
        break;
      case 'right':
        if (viewportWidth - buttonRect.right >= dropdownRect.width) {
          return 'right';
        }
        break;
    }

    if (viewportHeight - buttonRect.bottom >= dropdownRect.height) {
      return 'bottom';
    }

    if (buttonRect.top >= dropdownRect.height) {
      return 'top';
    }

    if (buttonRect.left >= dropdownRect.width) {
      return 'left';
    }

    if (viewportWidth - buttonRect.right >= dropdownRect.width) {
      return 'right';
    }

    return 'bottom';
  };

  const getDropdownPositionStyles = (position) => {
    switch (position) {
      case 'top':
        return 'bottom-full mb-2  right-0 transform ';
      case 'bottom':
        return 'top-full mt-2 left-1/2 transform -translate-x-1/2';
      case 'left':
        return 'right-full mr-2 top-1/2 transform -translate-y-1/2';
      case 'right':
        return 'left-full ml-2 top-1/2 transform -translate-y-1/2';
      default:
        return 'top-full mt-2 left-1/2 transform -translate-x-1/2';
    }
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current && 
      !dropdownRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsOpen(false);
      onNext&& onNext(false)
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      const newPosition = calculateDropdownPosition();
      setAdjustedPosition(newPosition);
    }
  }, [isOpen, position]);

  return (
    <div className="relative text-left flex" ref={dropdownRef}>
      <div className='flex'>
        <button
          type="button"
          className=""
          onClick={() => {
             onNext&&onNext(!isOpen)
            setIsOpen(!isOpen);
           
          }}
          ref={buttonRef}
        >
          {label}
        </button>
      </div>

      {modalState&&isOpen && (
        <div className={`absolute z-40 ${getDropdownPositionStyles(adjustedPosition)} w-max ${className}`}>
          <div className="py-1 inline-block" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <div className="">
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(DropdownButton);
