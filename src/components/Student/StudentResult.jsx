"use client";

import {
  ArrowLeft,
  Trophy,
  CheckCircle2,
  XCircle,
  Calendar,
  LayoutDashboard,
  BookOpen,
  User,
  Image as ImageIcon,
  LogOut,
} from "lucide-react";

import ScrollCard from "../UI/ScrollCard";
import BeltBadge from "../UI/BeltBadge";
import SealButton from "../UI/SealButton";
import ProgressBar from "../UI/ProgressBar";
import { usePathname, useRouter } from "next/navigation";
import BrushDivider from "../UI/BrushDivider";
import { mockExamAttempts, mockExams } from "../variables";

export default function StudentResult({ student }) {
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

  const getExamDetails = (examId) => {
    return mockExams.find((e) => e.id === examId);
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

      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => onNavigate(basePath)}
            className="mb-6 flex items-center gap-2 text-[#1C1A17] hover:text-[#A61B1B] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#1C1A17] mb-2">
              Exam Results
            </h1>
            <p className="text-[#5A5854]">
              Review your performance and track your progress
            </p>
          </div>

          {mockExamAttempts.length === 0 ? (
            <ScrollCard>
              <div className="text-center py-12">
                <Trophy className="w-16 h-16 text-[#C6A75E] mx-auto mb-4 opacity-50" />
                <p className="text-lg text-[#5A5854] mb-2">
                  No exam results yet
                </p>
                <p className="text-sm text-[#5A5854]">
                  Take your first exam to see your results here
                </p>
              </div>
            </ScrollCard>
          ) : (
            <div className="space-y-6">
              {mockExamAttempts.map((attempt, index) => {
                const exam = getExamDetails(attempt.examId);
                const percentage = Math.round(
                  (attempt.marksObtained / attempt.totalMarks) * 100,
                );
                const isPassed = percentage >= 60;

                return (
                  <ScrollCard key={index}>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-[#1C1A17]">
                            {exam?.examSet || `Exam ${attempt.examId}`}
                          </h3>

                          {exam && <BeltBadge kyu={exam.kyu} size="sm" />}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-[#5A5854]">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(
                                attempt.submittedAt,
                              ).toLocaleDateString()}
                            </span>
                          </div>

                          <span>Exam ID: {attempt.examId}</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      {/* Score */}
                      <div className="text-center p-4 bg-[#F5E9D8] rounded-lg">
                        <p className="text-sm text-[#5A5854] mb-2">Score</p>
                        <p className="text-3xl font-bold text-[#A61B1B]">
                          {percentage}%
                        </p>
                        <p className="text-sm text-[#5A5854] mt-1">
                          {attempt.marksObtained} / {attempt.totalMarks}
                        </p>
                      </div>

                      {/* Correct */}
                      <div className="text-center p-4 bg-[#F5E9D8] rounded-lg">
                        <p className="text-sm text-[#5A5854] mb-2">Correct</p>
                        <div className="flex items-center justify-center gap-2">
                          <CheckCircle2 className="w-6 h-6 text-green-600" />
                          <p className="text-3xl font-bold text-green-600">
                            {attempt.correctCount}
                          </p>
                        </div>
                        <p className="text-sm text-[#5A5854] mt-1">Questions</p>
                      </div>

                      {/* Wrong */}
                      <div className="text-center p-4 bg-[#F5E9D8] rounded-lg">
                        <p className="text-sm text-[#5A5854] mb-2">Wrong</p>
                        <div className="flex items-center justify-center gap-2">
                          <XCircle className="w-6 h-6 text-red-600" />
                          <p className="text-3xl font-bold text-red-600">
                            {attempt.wrongCount}
                          </p>
                        </div>
                        <p className="text-sm text-[#5A5854] mt-1">Questions</p>
                      </div>
                    </div>

                    {/* Performance Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-[#5A5854]">
                          Performance
                        </span>
                        <span className="text-sm font-medium text-[#1C1A17]">
                          {isPassed ? "Passed" : "Needs Improvement"}
                        </span>
                      </div>

                      <ProgressBar
                        value={percentage}
                        className="h-3"
                        style={{
                          "--progress-background": isPassed
                            ? "#4CAF50"
                            : "#A61B1B",
                        }}
                      />
                    </div>
                  </ScrollCard>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
