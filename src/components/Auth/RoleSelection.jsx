"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Users, GraduationCap } from "lucide-react";
import ScrollCard from "../UI/ScrollCard";

export default function RoleSelection() {
  const [userRole, setUserRole] = useState(null);

  const router = useRouter();

  const handleSelect = (role) => {
    setUserRole(role)
    router.push(`/login?role=${role}`);
  };

  return (
    <div className="min-h-screen flex sm:items-center items-start justify-center p-4 pattern-seigaiha">
      <div className="w-full max-w-3xl">
        <div className="flex sm:flex-col flex-row items-center sm:gap-0 gap-3 text-center sm:mb-12 mb-6">
          <div className="flex justify-center sm:mb-4 mb-0">
            <Image
              src="/shubukanindia.png"
              width={720}
              height={720}
              alt="shubukanindia"
              className="stamp-animation sm:w-28 w-17.5 object-contain"
            />
          </div>

          <div className="flex flex-col sm:items-center items-start">
            <h1 className="sm:text-3xl text-[24px] sm:tracking-wider tracking-normal uppercase sm:mb-2 mb-1">
              Shubukan India
            </h1>
            <p className="sm:text-lg text-md text-[#5A5854]">
              Online Exam Portal
            </p>
          </div>
        </div>

        <ScrollCard className="max-w-2xl mx-auto">
          <h2 className="text-center mb-6 text-[#1C1A17]">Select Your Role</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => handleSelect("student")}
              className="group p-8 rounded-xl border-2 border-[#1C1A17]/10 hover:border-[#A61B1B] hover:bg-[#FEFBF5] transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-[#A61B1B]/10 flex items-center justify-center group-hover:bg-[#A61B1B] transition-colors">
                  <GraduationCap className="w-10 h-10 text-[#A61B1B] group-hover:text-white transition-colors" />
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-bold text-[#1C1A17] mb-2">
                    Student
                  </h3>
                  <p className="text-sm text-[#5A5854]">
                    Take exams, view results, and track your progress
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleSelect("instructor")}
              className="group p-8 rounded-xl border-2 border-[#1C1A17]/10 hover:border-[#C6A75E] hover:bg-[#FEFBF5] transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-[#C6A75E]/10 flex items-center justify-center group-hover:bg-[#C6A75E] transition-colors">
                  <Users className="w-10 h-10 text-[#C6A75E] group-hover:text-white transition-colors" />
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-bold text-[#1C1A17] mb-2">
                    Instructor
                  </h3>
                  <p className="text-sm text-[#5A5854]">
                    Manage students, view results, and oversee exams
                  </p>
                </div>
              </div>
            </button>
          </div>
        </ScrollCard>

        <div className="text-center mt-6 text-sm text-[#5A5854]">
          <p>
            • Designed for both students and instructors of the Shubukan India •
          </p>
        </div>
      </div>
    </div>
  );
}
