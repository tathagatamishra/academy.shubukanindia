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

export default function StudentDashboard({ student }) {
  const pathname = usePathname();
  const router = useRouter();

  const [upcomingExamDate, setUpcomingExamDate] = useState(
    new Date("2026-03-01"),
  );

  const mockExamAttempts = [
    {
      examId: "exam1",
      studentId: "s1",
      answers: {},
      marksObtained: 24,
      totalMarks: 30,
      correctCount: 24,
      wrongCount: 6,
      submittedAt: new Date("2026-02-15"),
    },
    {
      examId: "exam2",
      studentId: "s1",
      answers: {},
      marksObtained: 32,
      totalMarks: 40,
      correctCount: 16,
      wrongCount: 4,
      submittedAt: new Date("2026-02-18"),
    },
  ];

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

  const daysUntilExam = Math.ceil(
    (new Date(upcomingExamDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24),
  );

  const recentResults = mockExamAttempts
    .filter((a) => a.studentId === student.id)
    .slice(0, 2);

  const avgScore =
    recentResults.length > 0
      ? Math.round(
          recentResults.reduce(
            (acc, r) => acc + (r.marksObtained / r.totalMarks) * 100,
            0,
          ) / recentResults.length,
        )
      : 0;

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
                Welcome, {student.name}
              </h1>
              <p className="text-[#5A5854]">
                Track your progress and prepare for your next exam
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Profile */}
            <ScrollCard>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#1C1A17] mb-4">
                    Your Profile
                  </h3>

                  <div className="space-y-3">
                    <BeltBadge kyu={student.presentKyu} />

                    <div className="flex items-center gap-2 text-[#5A5854]">
                      <GraduationCap className="w-4 h-4" />
                      <span className="text-sm">
                        Instructor: {student.instructorName}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[#5A5854]">
                      <Award className="w-4 h-4" />
                      <span className="text-sm">
                        Certificate: {student.lastCertificateNum}
                      </span>
                    </div>
                  </div>
                </div>

                <SealButton
                  variant="secondary"
                  onClick={() => handleNavClick("account")}
                >
                  Edit Profile
                </SealButton>
              </div>
            </ScrollCard>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Countdown */}
              <ScrollCard className="text-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-[#A61B1B]/10 flex items-center justify-center">
                    <Clock className="w-8 h-8 text-[#A61B1B]" />
                  </div>

                  <div>
                    <p className="text-sm text-[#5A5854] mb-1">Next Exam In</p>
                    <p className="text-3xl font-bold text-[#A61B1B]">
                      {daysUntilExam}
                    </p>
                    <p className="text-sm text-[#5A5854]">Days</p>
                  </div>
                </div>
              </ScrollCard>

              {/* Average */}
              <ScrollCard className="text-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-[#C6A75E]/10 flex items-center justify-center">
                    <Trophy className="w-8 h-8 text-[#C6A75E]" />
                  </div>

                  <div>
                    <p className="text-sm text-[#5A5854] mb-1">Average Score</p>
                    <p className="text-3xl font-bold text-[#C6A75E]">
                      {avgScore}%
                    </p>
                    <p className="text-sm text-[#5A5854]">Overall</p>
                  </div>
                </div>
              </ScrollCard>

              {/* Exams */}
              <ScrollCard className="text-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-[#1C1A17]/10 flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-[#1C1A17]" />
                  </div>

                  <div>
                    <p className="text-sm text-[#5A5854] mb-1">Exams Taken</p>
                    <p className="text-3xl font-bold text-[#1C1A17]">
                      {recentResults.length}
                    </p>
                    <p className="text-sm text-[#5A5854]">Total</p>
                  </div>
                </div>
              </ScrollCard>
            </div>

            {/* Recent Results */}
            <ScrollCard>
              <h3 className="text-xl font-bold text-[#1C1A17] mb-4">
                Recent Results
              </h3>

              {recentResults.length > 0 ? (
                <div className="space-y-3">
                  {recentResults.map((result, index) => {
                    const percentage = Math.round(
                      (result.marksObtained / result.totalMarks) * 100,
                    );

                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-[#F5E9D8] rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-[#1C1A17]">
                            Exam #{result.examId}
                          </p>
                          <p className="text-sm text-[#5A5854]">
                            {new Date(result.submittedAt).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-2xl font-bold text-[#A61B1B]">
                            {percentage}%
                          </p>
                          <p className="text-sm text-[#5A5854]">
                            {result.marksObtained}/{result.totalMarks}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center text-[#5A5854] py-8">
                  No exams taken yet. Start your first exam!
                </p>
              )}

              <SealButton
                onClick={() => handleNavClick("results")}
                variant="secondary"
                className="w-full mt-4"
              >
                View All Results
              </SealButton>
            </ScrollCard>

            {/* Quick Actions */}
            <ScrollCard>
              <h3 className="text-xl font-bold text-[#1C1A17] mb-4">
                Quick Actions
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SealButton onClick={() => handleNavClick("exams")}>
                  Take an Exam
                </SealButton>

                <SealButton
                  variant="secondary"
                  onClick={() => handleNavClick("kata")}
                >
                  Upload Kata Images
                </SealButton>
              </div>
            </ScrollCard>
          </div>
        </div>
      </main>
    </div>
  );
}
