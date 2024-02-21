import React, { useState } from "react";




const BlurryImage = ({ src, alt, width, height, className,classNameMain }) => {
  const [loaded, setLoaded] = useState(true);

  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <div
    className={`overflow-hidden ${classNameMain}`}
      style={{ position: "relative", width: width || "100%", height: height||"100%" }}
    >
      <img
        src={src}
        alt={alt}
        onLoad={handleLoad}
        className={`${className} `}
        style={{
          filter: loaded ? "none" : "blur(10px)",
          // width: "100%",
          // height: "100%",
        }}
      />
      {!loaded && (
        <div
        className="absolute top-0  left-0 right-0 w-[100%] h-[100%] backdrop:blur-[5px] flex justify-center items-center text-white font-bold "
        //   style={{
        //     position: "absolute",
        //     top: 0,
        //     left: 0,
        //     width: "100%",
        //     height: "100%",
        //     backdropFilter: "blur(5px)",
        //     display: "flex",
        //     justifyContent: "center",
        //     alignItems: "center",
        //     color: "white",
        //     fontWeight: "bold",
        //   }}
        >
          Loading...
        </div>
      )}
    </div>
  );
};

export default BlurryImage;
