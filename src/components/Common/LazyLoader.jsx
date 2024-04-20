import React, { useState } from "react";
import Image from 'next/image';

const BlurryImage = ({ src, alt, width, height, className,  }) => {
  const [loaded, setLoaded] = useState(true);

  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <div
      className={`overflow-hidden `}
      style={{ position: "relative", width: width || "100%", height: height || "100%" }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoad={handleLoad}
        className={className}
        style={{
          filter: loaded ? "none" : "blur(10px)",
        }}
      />
      {!loaded && (
        <div
          className="absolute top-0 left-0 right-0 w-[100%] h-[100%] backdrop:blur-[5px] flex justify-center items-center text-white font-bold"
        >
          {/* Loading... */}
        </div>
      )}
    </div>
  );
};

export default BlurryImage;
