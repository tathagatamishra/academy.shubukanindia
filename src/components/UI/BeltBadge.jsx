"use client";

const KYU_LEVELS = {
  "10th Kyu": { color: "#FFFFFF", textColor: "#000000" },
  "9th Kyu": { color: "#FFEC44", textColor: "#000000" },
  "8th Kyu": { color: "#FF9736", textColor: "#000000" },
  "7th Kyu": { color: "#56CA5B", textColor: "#000000" },
  "6th Kyu": { color: "#2BA1FF", textColor: "#FFFFFF" },
  "5th Kyu": { color: "#A43AD6", textColor: "#FFFFFF" },
  "4th Kyu": { color: "#72331C", textColor: "#FFFFFF" },
  "3rd Kyu": { color: "#72331C", textColor: "#FFFFFF" },
  "2nd Kyu": { color: "#72331C", textColor: "#FFFFFF" },
  "1st Kyu": { color: "#72331C", textColor: "#FFFFFF" },
  "1st Dan": { color: "#000000", textColor: "#FFFFFF" },
};

export default function BeltBadge({
  kyu,
  size = "md",
}) {
  const colors = KYU_LEVELS[kyu] || KYU_LEVELS["10th Kyu"];

  const sizeClasses = {
    sm: "text-xs px-3 py-1",
    md: "text-sm px-4 py-1.5",
    lg: "text-base px-5 py-2",
  };

  const safeSize = sizeClasses[size] || sizeClasses["md"];

  return (
    <div
      className={`belt-badge ${safeSize} inline-flex items-center gap-2`}
      style={{
        backgroundColor: colors.color,
        color: colors.textColor,
        border: `2px solid ${colors.textColor}20`,
      }}
    >
      <div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: colors.textColor }}
      />
      <span>{kyu}</span>
    </div>
  );
}