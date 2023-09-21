import React from "react";

export default function Button({ children, classname, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`text-white bg-primay-color rounded text-2xl w-full py-1 ${classname}`}
    >
      {children}
    </button>
  );
}
