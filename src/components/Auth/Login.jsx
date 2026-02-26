"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InkInput from "../UI/InkInput";
import ScrollCard from "../UI/ScrollCard";
import SealButton from "../UI/SealButton";
import BackButton from "../UI/BackButton";

export default function Login({ role }) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: call backend
    console.log("Login:", { role, email, password });

    router.push("/"); // redirect after login
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pattern-asanoha">
      <div className="w-full max-w-md">
        <BackButton fallback="/" />

        <ScrollCard>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-[#1C1A17] mb-2">
              {role === "student" ? "Student Login" : "Instructor Login"}
            </h2>
            <p className="text-sm text-[#5A5854]">
              Enter your credentials to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <InkInput
              label="Email Address"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <InkInput
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-[#1C1A17]/20"
                />
                <span className="text-[#5A5854]">Remember me</span>
              </label>
              <button type="button" className="text-[#A61B1B] hover:underline">
                Forgot Password?
              </button>
            </div>

            <SealButton type="submit" className="w-full">
              Login
            </SealButton>

            <div className="text-center text-sm">
              <span className="text-[#5A5854]">Don't have an account? </span>
              <button
                type="button"
                onClick={() => router.push(`/signup?role=${role}`)}
                className="text-[#A61B1B] hover:underline font-medium"
              >
                Sign Up
              </button>
            </div>
          </form>
        </ScrollCard>
      </div>
    </div>
  );
}
