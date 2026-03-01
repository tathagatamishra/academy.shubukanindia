"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ScrollCard from "../UI/ScrollCard";
import SealButton from "../UI/SealButton";
import OTPInput from "../UI/OTPInput";
import BackButton from "../UI/BackButton";
import { student } from "../variables";
import { instructor } from "../variables";

export default function OTPVerification({ email, role }) {
  const router = useRouter();
  const [otp, setOtp] = useState("");

  const onVerify = (username) => {
    router.push(`/${role}/${username}`);
  };
  const onResend = () => {};

  const handleVerify = () => {
    console.log(role);
    console.log(role.userName);

    if (otp.length === 6) {
      onVerify(
        role == "student"
          ? student.userName
          : role == "instructor" && instructor.userName,
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pattern-seigaiha">
      <div className="w-full max-w-md">
        <BackButton fallback="/" />

        <ScrollCard>
          <div className="text-center mb-8">
            <div className="flex justify-center">
              <Image
                src="/shubukanindia.png"
                width={720}
                height={720}
                alt="shubukanindia"
                className="stamp-animation sm:w-24 w-17.5 object-contain"
              />
            </div>

            <h2 className="font-bold text-[#1C1A17] mb-2">Verify Your Email</h2>

            <p className="text-sm text-[#5A5854]">
              We've sent a 6-digit code to
            </p>

            <p className="text-sm font-medium text-[#1C1A17] mt-1">{email}</p>
          </div>

          <div className="space-y-6">
            <div className="flex justify-center">
              <OTPInput length={6} value={otp} onChange={setOtp} />
            </div>

            <SealButton
              onClick={handleVerify}
              className="w-full"
              disabled={otp.length !== 6}
            >
              Verify OTP
            </SealButton>

            <div className="text-center text-sm">
              <span className="text-[#5A5854]">Didn't receive the code? </span>

              <button
                type="button"
                onClick={onResend}
                className="text-[#A61B1B] hover:underline font-medium"
              >
                Resend OTP
              </button>
            </div>
          </div>
        </ScrollCard>
      </div>
    </div>
  );
}
