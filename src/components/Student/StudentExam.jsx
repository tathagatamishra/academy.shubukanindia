"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Trophy,
  User,
  Image as ImageIcon,
  LogOut,
  Clock,
  Award,
  GraduationCap,
} from "lucide-react";

import ScrollCard from "../UI/ScrollCard";
import BrushDivider from "../UI/BrushDivider";
import BeltBadge from "../UI/BeltBadge";
import SealButton from "../UI/SealButton";
import Image from "next/image";
import { mockExams } from "../variables";

export default function StudentExam({ student }) {
  const pathname = usePathname();
  const router = useRouter();

  const basePath = `/student/${student.userName}`;

  const menuItems = [
    { id: basePath, label: "Dashboard", icon: LayoutDashboard },
    { id: `${basePath}/exams`, label: "Upcoming Exams", icon: BookOpen },
    { id: `${basePath}/results`, label: "Exam Results", icon: Trophy },
    { id: `${basePath}/katasheet`, label: "Katasheet Upload", icon: ImageIcon },
    { id: `${basePath}/account`, label: "Account Details", icon: User },
  ];

  const onNavigate = (path) => {
    router.push(path);
  };
  const onLogout = () => {onNavigate('/')};

  const handleNavClick = (id) => {
    onNavigate(id);
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#FEFBF5] border-r-2 border-[#1C1A17]/10 p-6 flex flex-col">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#A61B1B] mb-1">
            Shubukan India
          </h2>
          <p className="text-sm text-[#5A5854]">Student Portal</p>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`sidebar-item w-full ${
                  pathname === item.id ? "active" : ""
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto">
          <BrushDivider />
          <button
            onClick={onLogout}
            className="sidebar-item w-full text-[#A61B1B] hover:bg-[#A61B1B]/10"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => onNavigate(basePath)}
            className="mb-6 flex items-center gap-2 text-[#1C1A17] hover:text-[#A61B1B] transition-colors"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-[#1C1A17] mb-8">
            Upcoming Exams
          </h1>
          <div className="space-y-4">
            {mockExams.map((exam) => (
              <div key={exam.id} className="scroll-card p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#1C1A17] mb-2">
                      {exam.examSet}
                    </h3>
                    <p className="text-sm text-[#5A5854] mb-4">
                      {exam.totalQuestionCount} Questions • {exam.examDuration}{" "}
                      Minutes • {exam.eachQuestionMarks} Mark(s) Each
                    </p>
                    <div className="flex items-center gap-2">
                      <span
                        className="belt-badge text-sm px-3 py-1"
                        style={{
                          backgroundColor: "#C6A75E",
                          color: "#1C1A17",
                        }}
                      >
                        {exam.kyu}
                      </span>
                      <span className="text-sm text-[#5A5854]">
                        {exam.isPublic ? "Public Exam" : "Private Exam"}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleStartExam(exam.id)}
                    className="seal-button"
                  >
                    Start Exam
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* <Toaster position="top-right" /> */}
        </div>
      </main>
    </div>
  );
}
