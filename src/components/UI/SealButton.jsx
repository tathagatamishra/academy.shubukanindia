"use client";

export default function SealButton({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const variantType =
    variant === "secondary" ? "secondary" : "primary";

  const variantClasses =
    variantType === "primary"
      ? "seal-button"
      : "bg-[#C6A75E] text-[#1C1A17] hover:bg-[#B39650] border-2 border-[#1C1A17]/10";

  return (
    <button
      className={`${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}