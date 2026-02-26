"use client";

export default function InkInput({
  label,
  className = "",
  ...props
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm text-[#1C1A17] font-medium">
          {label}
        </label>
      )}

      <input
        className={`ink-input ${className}`}
        {...props}
      />
    </div>
  );
}