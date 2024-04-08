import React from "react";

function NoAuth({ children }) {
  return (
    <>
      {/* <Head> */}
        {/* <title>My page title</title> */}
        {/* <meta property="og:title" content="My page title" key="title" /> */}
      {/* </Head> */}

      <div className="min-h-[100vh] bg-[bg-[#000000]]">{children}</div>
    </>
  )
}

export default NoAuth;
