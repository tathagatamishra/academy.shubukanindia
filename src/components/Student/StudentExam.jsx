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
  const onLogout = () => {};

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
          {/* Header */}
          <div className="flex flex-row gap-[20px] mb-8">
            <Image
              src={student.profileImage}
              width={480}
              height={480}
              alt={student.name}
              className="w-[80px] h-[80px] object-contain rounded-full shadow bg-[#fff] border border-4 border-[#fff]"
            />
            <div>
              <h1 className="text-3xl font-bold text-[#1C1A17] mb-2">
                Upcoming Exam
              </h1>
              <p className="text-[#5A5854]">
                Track your progress and prepare for your next exam
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
