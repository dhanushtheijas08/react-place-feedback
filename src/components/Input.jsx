import React from "react";

export default function Input({
  placeholder,
  type,
  onChange,
  name,
  value,
  isError = false,
  errorPlaceholder = "",
}) {
  return (
    <input
      type={type}
      className={`text-lg border-text-secondary-color rounded px-3 py-0.5 border-[1.75px] outline-2 ${
        isError
          ? " border-red-400 outline-none"
          : "  focus:outline-primay-color"
      }`}
      placeholder={isError ? errorPlaceholder : placeholder}
      onChange={onChange}
      name={name}
      value={value}
    />
  );
}
