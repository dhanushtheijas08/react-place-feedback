import React from "react";
import BackButton from "./BackButton";
export default function Message({ children, hasBackButton }) {
  return (
    <div>
      <p className="text-text-secondary-color text-center font-bold text-xl mt-20">
        {children}
      </p>
      {hasBackButton && (
        <div className="w-1/2 mx-auto mt-5">
          <BackButton>Back</BackButton>
        </div>
      )}
    </div>
  );
}
