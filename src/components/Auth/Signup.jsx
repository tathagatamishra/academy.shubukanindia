"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ScrollCard from "../UI/ScrollCard";
import InkInput from "../UI/InkInput";
import SealButton from "../UI/SealButton";
import BackButton from "../UI/BackButton";

export default function Signup({ role }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    instructorName: "",
    instructorId: "",
    presentKyu: "10th Kyu",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Signup Data:", { role, ...formData });

    // TODO: call backend here

    router.push(`/login?role=${role}`);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-12 pattern-asanoha">
      <div className="w-full max-w-2xl">
        <BackButton fallback="/" />

        <ScrollCard>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-[#1C1A17] mb-2">
              {role === "student"
                ? "Student Registration"
                : "Instructor Registration"}
            </h2>
            <p className="text-sm text-[#5A5854]">
              Create your account to get started
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InkInput
                label="Full Name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <InkInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <InkInput
                label="Mobile Number"
                name="mobile"
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.mobile}
                onChange={handleChange}
                required
              />

              {role === "instructor" && (
                <InkInput
                  label="Instructor ID"
                  name="instructorId"
                  type="text"
                  placeholder="INS-XXX"
                  value={formData.instructorId}
                  onChange={handleChange}
                  required
                />
              )}

              {role === "student" && (
                <>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-[#1C1A17] font-medium">
                      Present Kyu Level
                    </label>
                    <select
                      name="presentKyu"
                      value={formData.presentKyu}
                      onChange={handleChange}
                      className="ink-input"
                      required
                    >
                      <option value="10th Kyu">10th Kyu (White)</option>
                      <option value="9th Kyu">9th Kyu (Yellow)</option>
                      <option value="8th Kyu">8th Kyu (Orange)</option>
                      <option value="7th Kyu">7th Kyu (Green)</option>
                      <option value="6th Kyu">6th Kyu (Blue)</option>
                      <option value="5th Kyu">5th Kyu (Purple)</option>
                      <option value="4th Kyu">4th Kyu (Brown)</option>
                    </select>
                  </div>

                  <InkInput
                    label="Instructor Name"
                    name="instructorName"
                    type="text"
                    placeholder="Sensei Name"
                    value={formData.instructorName}
                    onChange={handleChange}
                    required
                  />

                  <InkInput
                    label="Instructor ID"
                    name="instructorId"
                    type="text"
                    placeholder="INS-XXX"
                    value={formData.instructorId}
                    onChange={handleChange}
                    required
                  />
                </>
              )}

              <InkInput
                label="Password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <InkInput
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 rounded border-[#1C1A17]/20"
                required
              />
              <label htmlFor="terms" className="text-sm text-[#5A5854]">
                I agree to the Terms & Conditions and Privacy Policy of
                Shubukan India
              </label>
            </div>

            <SealButton type="submit" className="w-full">
              Create Account
            </SealButton>

            <div className="text-center text-sm">
              <span className="text-[#5A5854]">
                Already have an account?{" "}
              </span>
              <button
                type="button"
                onClick={() => router.push(`/login?role=${role}`)}
                className="text-[#A61B1B] hover:underline font-medium"
              >
                Login
              </button>
            </div>
          </form>
        </ScrollCard>
      </div>
    </div>
  );
}