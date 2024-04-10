import React from 'react'

export default function IsAuth({children,isAuthenticated}) {
  return (
    <div className="min-h-[100vh] bg-white">
      {isAuthenticated ? children:null}
    </div>
  )
}
