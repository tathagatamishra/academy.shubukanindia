"use client";

export default function ProgressBar({
  value = 0,
  className = "",
  style = {},
}) {
  // Clamp value between 0–100
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div
      data-slot="progress"
      className={`relative w-full overflow-hidden rounded-full bg-[#1C1A17]/10 ${className}`}
      style={{ height: "8px" }}
    >
      <div
        data-slot="progress-indicator"
        className="h-full transition-all duration-500 ease-out"
        style={{
          width: `${safeValue}%`,
          backgroundColor:
            style?.["--progress-background"] || "#A61B1B",
        }}
      />
    </div>
  );
}