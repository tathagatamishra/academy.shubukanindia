"use client";

import { useRef } from "react";

export default function OTPInput({
  length = 6,
  value,
  onChange,
  className = "",
}) {
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const digit = e.target.value.replace(/\D/g, "");

    if (!digit) return;

    const newOtp =
      value.substring(0, index) + digit + value.substring(index + 1);

    onChange(newOtp);

    if (index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (value[index]) {
        const newOtp =
          value.substring(0, index) + "" + value.substring(index + 1);
        onChange(newOtp);
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    if (!paste) return;

    onChange(paste);

    const nextIndex = Math.min(paste.length, length - 1);
    inputsRef.current[nextIndex]?.focus();
  };

  return (
    <div
      className={`flex items-center sm:gap-2 gap-1 ${className}`}
      onPaste={handlePaste}
    >
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className={`sm:h-12 h-10 sm:w-12 w-10 text-center text-lg border border-[#1C1A17]/20 sm:rounded-sm rounded-xs ${index == 0 && "sm:rounded-l-xl! rounded-l-md"} ${index == length - 1 && "sm:rounded-r-xl! rounded-r-md"} focus:outline-none focus:ring-2 focus:ring-[#A61B1B]`}
        />
      ))}
    </div>
  );
}
