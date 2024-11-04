import React, { useState } from 'react';
import Image from 'next/image';

// Default image URL
const DEFAULT_IMAGE = 'https://avatar.iran.liara.run/public/avatar.png';

const Avatar = ({ src, alt = 'profile-image-user', width = 30, height = 30 }) => {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  return (
    <Image
    src={hasError || !src ? DEFAULT_IMAGE : src}
    width={width}
    height={height}
    className="object-cover w-[20px] h-[20px] md:h-[30px] md:w-[30px] rounded-full"
    alt={alt}
    onError={handleError}
  />
  );
};

export default Avatar;
