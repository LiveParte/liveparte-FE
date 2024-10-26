import React from "react";

export default function ContainerLayout({ children }) {
  return (
    <div className="md:px-10 xxl:px-0  max-w-container mx-auto">{children}</div>
  );
}
