import React, { useEffect, useRef, useState } from 'react';

const DropDown = ({ isOpen, onClose, buttonRef }) => {
  const modalRef = useRef(null);
  const [position, setPosition] = useState('bottom'); // Position state ('top' or 'bottom')

  // Function to handle modal positioning
  const updateModalPosition = () => {
    const buttonRect = buttonRef?.current.getBoundingClientRect();
    const modalRect = modalRef.current.getBoundingClientRect();

    const spaceBelow = window.innerHeight - buttonRect?.bottom;
    const spaceAbove = buttonRect?.top;

    if (spaceBelow < modalRect.height && spaceAbove >= modalRect.height) {
      setPosition('top');
    } else {
      setPosition('bottom');
    }
  };

  // Effect to update modal position on mount and resize
  useEffect(() => {
    updateModalPosition();
    window.addEventListener('resize', updateModalPosition);
    return () => {
      window.removeEventListener('resize', updateModalPosition);
    };
  }, []);

  // Modal classes based on position
  const modalClasses = position === 'top' ? 'absolute top-0' : 'absolute bottom-0';

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${isOpen ? 'visible' : 'hidden'}`} onClick={onClose}>
      <div ref={modalRef} className={`${modalClasses} bg-white p-4 rounded shadow-lg`}>
        {/* Modal content */}
      </div>
    </div>
  );
};

export default DropDown;
