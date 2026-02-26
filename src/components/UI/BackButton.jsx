"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton({ fallback = "/" }) {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback);
    }
  };

  return (
    <button
      onClick={handleBack}
      className="mb-4 flex items-center gap-2 text-[#1C1A17] hover:text-[#A61B1B] transition-colors"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>Back</span>
    </button>
  );
}