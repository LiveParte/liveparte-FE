import { Head } from "next/document";
import React from "react";

function NoAuth({ children }) {
  return (
    <>
      {/* <Head> */}
        {/* <title>My page title</title> */}
        {/* <meta property="og:title" content="My page title" key="title" /> */}
      {/* </Head> */}

      <div className="min-h-[100vh] bg-white">{children}</div>
    </>
  )
}

export default NoAuth;
