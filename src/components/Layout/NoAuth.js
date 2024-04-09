import React from "react";
import ProgressBar from "../Common/ProgressBar/progressBar";

function NoAuth({ children }) {
  return (
    <>
      {/* <Head> */}
        {/* <title>My page title</title> */}
        {/* <meta property="og:title" content="My page title" key="title" /> */}
      {/* </Head> */}
    {/* <ProgressBar/> */}
      <div className="min-h-[100vh] bg-[#000000]">{children}</div>
    </>
  )
}

export default NoAuth;
